# 4.4 State Loop

在低级的脚本中，往往充斥着 “点击-等待” 模式的代码：

```python
click(XXXX)
sleep(2)
click(YYYY)
sleep(3)
```

这样的代码稳定性很差，如果游戏卡顿，或者脚本需要对低配设备优化，就得延长等待的间隔，最后等待变得越来越长。很多时候，脚本慢，并不是因为截图慢，语言运行慢，而是因为开发者写了大量的固定时长的等待。

**在 Alas 内使用  “点击-等待” 模式是禁止的**，所有对游戏的操作都必须使用 “状态循环” 。

针对快慢设备的兼容问题，Alas 使用了这样的运作模式，也希望开发者使用它，以减少对 `sleep()` 的依赖。这种模式在高配电脑上可以运行得很快，在低配电脑上也有很好的兼容性，它可以在点击失败时自动重试，我们也不再需要关心点击的执行顺序。

## Alas状态机

Alas 状态机并没有一个正式的称呼，它是在多年的游戏脚本实践中逐渐形成的代码结构，你可以叫它 “状态循环” 也可以叫它 “Alas状态机”。Alas状态机写出来像这样：

```python
while 1:
    self.device.screenshot()

    if self.appear_then_click(ENTRANCE):
        continue
    if self.appear_then_click(MAP_PREPARATION):
        continue
    if self.appear_then_click(FLEET_PREPARATION):
        continue

    # End
    if self.handle_in_map_with_enemy_searching():
        break
```

Alas 状态机的目标是在最不利的运行环境下保持高鲁棒性和高运行速度。

- 假设对游戏的控制随机不生效，假设游戏截图随机损坏，假设用户设备随机卡顿
- 在上述场景下保持运行的鲁棒性，并且做到当前硬件条件下的最快

状态循环，顾名思义就是把游戏内的不同 UI 界面视为 “状态”，根据不同状态对游戏进行相应的操作。收到游戏截图后遍历所有状态，执行相应操作。

状态循环是对经典状态机的简化，因为在经典状态机中我们需要定义状态切换表，而在游戏脚本中游戏的 UI 状态是游戏定义的，比如点击了地图入口（ENTRANCE）那游戏马上就会展示地图准备按钮（MAP_PREPARATION）。如果我们需要编写状态切换表，那么必须也只能和游戏里的状态切换一样，这其实是重复劳动。

因此 Alas 状态机选择了遍历所有状态，**Alas状态机其实就是，在一个循环里遍历所有需要处理的状态，判断到就处理，判断到结束状态就跳出**，反正游戏自身会保证所有状态是顺序执行的，不需要我们操心。

## 串联状态循环

当你编写了多个状态循环之后，像线性流程一样串联起每个状态循环就可以了。

其中的 `enter_map`, `execute_a_battle`, `auto_search_execute_a_battle` 函数内部都是状态循环。

```python{2,8,10}
def run(self):
    self.enter_map(self.ENTRANCE, mode=self.config.Campaign_Mode)

    # Run
    for _ in range(20):
        try:
            if not self.map_is_auto_search:
                self.execute_a_battle()
            else:
                self.auto_search_execute_a_battle()
        except CampaignEnd:
            logger.hr('Campaign end')
            return True
```

## 状态循环的性能优化

与一般认知不同，开发者在编写 Alas 时不需要特别注意性能优化。因为在 Alas 运行时超过 99% 的时间是在等待模拟器截图，Alas 状态机遍历所有状态的开销是忽略不计的。在配置过关的电脑上，截图耗时约 350 ms，而 Alas 处理只花费约 2.5 ms。在海图识别或者 OCR 时，Alas 耗时也不过 100-180 ms。

忽略遍历状态开销的关键在于缩小识别区域。游戏脚本的识别最普遍使用的方式就是模板匹配，减少模板匹配开销的关键，就是缩小模板图片的大小和缩小搜索区域的大小。游戏内元素往往都出现在固定位置或者某个位置的附近，那么我们就可以只在已知位置的附近进行搜索。Alas 框架已经包含了这项优化，不需要特别在意，但如果你是自己的脚本就千万要注意不要去匹配一整张图片。

一般而言，人的反应速度是 300ms，如果你的脚本从游戏画面出现到执行游戏操作的耗时小于 300ms，用户就会感觉你的脚本运行速度快，感觉脚本操作比自己手动操作快。

随着电脑硬件更新、模拟器更新、截图方式的换代，现在大部分用户的 Alas 截图耗时在 50ms ~ 100ms，特定组合更是只有 5ms ~ 10ms。为了防止截图速度过快导致 CPU 占用增加，Alas 中的 `Screenshot._screenshot_interval` 计时器默认会把 对设备发起截图操作 的间隔限制到 300ms。发起间隔的意思是，假如截图耗时 50ms 处理耗时 10ms，Alas 会 sleep 240ms 再进行下一次截图。

## 复用截图

加速状态循环的另一个关键点是复用上一张游戏截图，也是就是**状态循环需要设置 skip_first_screenshot**。大部分 Alas 方法都会复用上一张截图，这样连续调用的时候就不会产生多余的截图操作。

```python{8}
def map_offensive(self, skip_first_screenshot=True):
    """
    Pages:
        in: in_map, MAP_OFFENSIVE
        out: combat_appear
    """
    while 1:
        if skip_first_screenshot:
            skip_first_screenshot = False
        else:
            self.device.screenshot()
        # Do something
        pass
```

如果每一步都复用了上一张截图，那么第一张截图从何而来呢？在运行之前，需要显式地执行一次 `self.device.screenshot()` 。

```python
self = Combat('alas')
self.device.screenshot()
self.map_offensive()
self.combat()
```

## 在状态循环中的interval参数

状态循环由三部分组成：截图、判断退出、判断点击。识别点击一般使用 `appear_then_click` 方法。

```python{10,14}
def dorm_view_reset(self, skip_first_screenshot=True):
    logger.info('Dorm view reset')
    while 1:
        if skip_first_screenshot:
            skip_first_screenshot = False
        else:
            self.device.screenshot()
        if self.appear(DORM_MANAGE_CHECK, offset=(20, 20)):
            break
        if self.appear_then_click(DORM_MANAGE, offset=(20, 20), interval=2):
            continue
        if self.ui_additional():
            continue
        if self.appear_then_click(DORM_FURNITURE_CONFIRM, offset=(30, 30), interval=2):
            continue
```

我们一般会给 `appear_then_click` 方法加上 `interval` 参数，表示两次点击之间的最短间隔（秒）。

以 `self.appear_then_click(DORM_FURNITURE_CONFIRM, interval=2)` 为例：

- 当 `DORM_FURNITURE_CONFIRM` 首次出现时，interval 不生效，按钮会被点击。
- 点击之后的 2s 内，interval 生效，Alas 不检查 `DORM_FURNITURE_CONFIRM` 是否出现，即便它出现也不会触发点击。
- 2s 过去后，interval 失效，Alas 将重新开始检查 `DORM_FURNITURE_CONFIRM`。

interval 的作用是防止连击。游戏客户端对点击是需要一些时间响应的，虽然大部分时候响应非常快，但是这个时间不能被忽略。假如没有 interval，点击第一次之后游戏仍然停留在先前的页面（可能在等待服务器响应），那么就会触发二次点击。

**大部分情况下，你只需要给所有的操作都设置上 interval**。间隔一般取 2/3/5 都可以，interval=2 意味着这个状态循环在延迟<2s 的设备上能稳定运行，这已经涵盖绝大多数设备了。interval 的取值不建议过大，这样在点击不生效的时候状态循环可以快速重试。

interval 的实现其实是一个全局计时器字典 `self.interval_timer`，如果你在两个连续的状态循环之间共用了同一个 assets，那么就需要清除上一个状态循环遗留的 interval。

```python
self.interval_clear(DORM_CHECK)
```

## handle系方法

`handle_*()` 方法是约定的命名（当然实际命名有点混乱） ，定义对一系列状态的处理，以便在不同的状态循环中复用。

handle系方法只返回 bool，True 表示在方法内对游戏进行了操作，需要状态循环获取新的游戏截图。

```python
def handle_blessing(self):
    """
    Returns:
        bool: If handled
    """
    if self.is_page_choose_blessing():
        logger.hr('Choose blessing', level=2)
        selector = RogueBlessingSelector(self)
        selector.recognize_and_select()
        return True
    if self.is_page_choose_curio():
        logger.hr('Choose curio', level=2)
        selector = RogueCurioSelector(self)
        selector.recognize_and_select()
        return True
    if self.is_page_choose_bonus():
        logger.hr('Choose bonus', level=2)
        selector = RogueBonusSelector(self)
        selector.recognize_and_select()
        return True
    if self.handle_blessing_popup():
        return True

    return False
```

像这样使用

```python
def _domain_exit_wait_next(self, skip_first_screenshot=True):
    while 1:
        if skip_first_screenshot:
            skip_first_screenshot = False
        else:
            self.device.screenshot()

        # End
        ...

        if self.handle_blessing():
            continue
        if self.handle_popup_confirm():
            continue
        if self.handle_reward():
            continue
        if self.handle_get_character():
            continue
```

## 退出状态循环

 将退出条件放到点击的前面，按照 截图-判断退出-判断点击 的顺序。

当设备慢到一定程度（截图耗时比 interval 还要长）的时候，状态循环依然能够退出，不会一直在点击。

```python
while 1:
    if skip_first_screenshot:
        skip_first_screenshot = False
    else:
        self.device.screenshot()
    # End
    if self.appear(...):
        break
    # Click
    if self.appear_then_click(..., interval=2):
        continue
    if self.handle_popup_confirm():
        continue
```

## 常见错误：在状态循环中加入sleep

状态循环兼容快设备及慢设备，加入 sleep 其实是一种自我安慰，除了让运行速度变慢之外并不会有其他影响，开发者需要改变 “脚本速度快，出错概率就高” 的认知。

解决办法，直接删除即可。

```python
def _storage_enter_disassemble(self, skip_first_screenshot=True):
    """
    Pages:
        in: page_storage, any
        out: page_storage, disassemble, DISASSEMBLE_CANCEL
    """
    logger.info('storage enter disassemble')
    while 1:
        if skip_first_screenshot:
            skip_first_screenshot = False
        else:
            self.device.screenshot()

        if self.appear(DISASSEMBLE_CANCEL, offset=(20, 20)):
            break

        # equipment -> disassemble
        if self.appear_then_click(DISASSEMBLE, offset=(20, 20), interval=3):
            self.device.sleep(1)
            continue
        # material -> equipment
        if self._storage_in_material(interval=3):
            logger.info('_storage_in_material -> EQUIPMENT_ENTER')
            continue
        # design -> equipment
        if self.appear(STORAGE_CHECK, offset=(20, 20), interval=3):
            logger.info('STORAGE_CHECK -> EQUIPMENT_ENTER')
            self.device.click(EQUIPMENT_ENTER)
            continue
```

## 常见错误：等价点击等待

避免使用 `wait_until_stable` 方法和 `confirm_timer` 形式，这些写法实际非常屎。

```python
direction = drag.reverse_direction(direction)
drag.drag_page(direction, self, (0.4, 0.4))
entry = self._get_path_click(path, direction)
self.wait_until_stable(CLICK_THE_HUNT_LEFT if direction == 'left' else CLICK_THE_HUNT_RIGHT, timer=Timer(0, count=0), timeout=Timer(1.5, count=5))
```

```python
def _guild_lobby_collect(self, skip_first_screenshot=True):
    confirm_timer = Timer(1.5, count=3).start()
    while 1:
        if skip_first_screenshot:
            skip_first_screenshot = False
        else:
            self.device.screenshot()

        # End
        if self.appear(GUILD_CHECK, offset=(20, 20)):
            if confirm_timer.reached():
                break
        else:
            confirm_timer.reset()
```

## 常见错误：循环未首先截图

因为状态循环需要跳过第一次截图，所以就有了将截图放在最后的写法。这种写法非常容易导致无新截图的死循环并且难以发现，还是 `skip_first_screenshot` 的写法比较好。

```python
while 1:
    if self.appear(DOCK_CHECK, offset=(20, 20)):
        break
    elif self.appear_then_click(RETIRE_APPEAR_1, offset=30):
        continue
    elif self.appear_then_click(RETIRE_APPEAR_2, offset=30):
        continue
    elif self.appear_then_click(RETIRE_APPEAR_3, offset=30):
        continue
    else:
        self.device.screenshot()
```

## 常见错误：使用负面条件

不能使用负面条件（`if not appear(xxx)`）作为状态循环的退出条件或是触发点击的条件。因为在游戏动画中、加载但是还未完全加载的情况下，不属于已知状态，非常容易触发 False 条件。

解决办法：完全使用正面条件（`if appear()`）。

```python
def use_fuel(self, skip_first_screenshot=True):
    logger.info("Use Fuel")
    while 1:
        if skip_first_screenshot:
            skip_first_screenshot = False
        else:
            self.device.screenshot()

        if not self.appear(FUEL) and not self.appear(FUEL_SELECTED):
            logger.info("No fuel found")
            return
        if self.appear(FUEL_SELECTED):
            break
        if self.appear_then_click(FUEL):
            continue
        if self.appear_then_click(FUEL_ENTRANCE):
            continue
        if self.handle_reward():
            break
```

## 常见错误：使用带操作的语句退出循环

带操作的语句（appear_then_click，handle系方法）不能作为状态循环的退出条件，否则这个操作就不包含在状态循环内了，点击失败的时候也没有重试。

解决办法，只使用 `appear()` 作为退出条件。

```python
while 1:
    self.device.screenshot()
    if self.deal_popup():
        continue
    # choose game
    if self.appear_then_click(GAME_NEW_YEAR_BATTLE, offset=(5, 5)):
        break
    if swipe_interval.reached():
        self.device.swipe_vector(...)
        swipe_interval.reset()
```

## 常见错误：使用带interval的识别退出循环

interval 是用来控制点击间隔的，退出识别没有对游戏的操作，因此不需要设置 interval。

解决办法：删除 interval。

```python
if self.appear(GET_ITEMS_1, interval=1) or \
        self.appear(GET_ITEMS_2, interval=1) or \
        self.appear(GET_ITEMS_3, interval=1):
    success = True
    break
```

## 常见错误：嵌套使用状态循环

Alas 状态机希望开发者不再关心状态的执行顺序，因此嵌套使用状态循环是错误的。（下面的代码中， `ui_click` 是一个状态循环）

解决办法很简单，把子循环中的全部内容放到父循环中即可，保证只有一个循环。

```python
def shop_refresh(self, skip_first_screenshot=True):
    while 1:
        if skip_first_screenshot:
            skip_first_screenshot = False
        else:
            self.device.screenshot()

        if self.appear_then_click(SHOP_REFRESH, interval=3):
            continue
        if self.appear(SHOP_BUY_CONFIRM_MISTAKE, interval=3, offset=(200, 200)) \
                and self.appear(POPUP_CONFIRM, offset=(3, 30)):
            self.ui_click(SHOP_CLICK_SAFE_AREA,
                          appear_button=POPUP_CONFIRM, check_button=BACK_ARROW,
                          offset=(20, 30), skip_first_screenshot=True)
        if self.handle_popup_confirm('SHOP_REFRESH_CONFIRM'):
            continue
```

当然，规矩是死的人是活的，如果情况复杂并且你很清楚自己在干什么，嵌套使用也是可以接受的。

在 Alas 的退役模块中，`handle_retirement()` 封装了对退役弹窗的处理，这个方法会插入到所有战斗的状态循环中，处理退役弹窗需要点击弹窗然后在船坞退役角色。这是一个典型的嵌套。

```python
def handle_retirement(self):
    if self._unable_to_enhance:
        if self.appear_then_click(RETIRE_APPEAR_1, offset=(20, 20), interval=3):
        if self.appear(IN_RETIREMENT_CHECK, offset=(20, 20), interval=10):
    elif self.config.Retirement_RetireMode == 'enhance':
        if self.appear_then_click(RETIRE_APPEAR_3, offset=(20, 20), interval=3):
        if self.appear(DOCK_CHECK, offset=(20, 20), interval=10):
    else:
        if self.appear_then_click(RETIRE_APPEAR_1, offset=(20, 20), interval=3):
        if self.appear(IN_RETIREMENT_CHECK, offset=(20, 20), interval=10):
            self._retire_handler()
            return True
    return False
```

其中的 `_retire_handler()` 包含多个状态循环：`retire_ships_one_click()`, `_retirement_quit()` 等。

```python
def _retire_handler(self, mode=None):
    """
    Pages:
        in: IN_RETIREMENT_CHECK
        out: the page before retirement popup
    """
    if mode == 'one_click_retire':
        total = self.retire_ships_one_click()
        if not total:
            logger.warning(...)
            self.dock_filter_set()
            self.dock_favourite_set(False)
            total = self.retire_ships_one_click()
        total += self.retire_gems_farming_flagships(keep_one=total > 0)
    elif mode == 'old_retire':
        ...
    self._retirement_quit()
    return total
```

嵌套状态循环需要注意的地方是，子循环需要退出其内部状态（_retirement_quit），让父循环能够继续处理。