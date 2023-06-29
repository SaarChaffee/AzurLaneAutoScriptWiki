# 操作游戏界面的类和方法

这里介绍操作游戏 UI 的类和方法。

## Switch

操作游戏内的开关。使用场景：三种阵型的切换，周回模式开关等。

以切换普通图困难图为例：

```python
# 创建开关
MODE_SWITCH_1 = Switch('Mode_switch_1')
# 定义状态
MODE_SWITCH_1.add_status('normal', SWITCH_1_NORMAL, sleep=STAGE_SHOWN_WAIT)
MODE_SWITCH_1.add_status('hard', SWITCH_1_HARD, sleep=STAGE_SHOWN_WAIT)

class Test(ModuleBase):
    def test(self):
        # 判断开关是否出现在画面上
        MODE_SWITCH_1.appear(main=self)
        # 获取当前状态
        status = MODE_SWITCH_1.get(main=self)
        # 切换至某个状态
        MODE_SWITCH_1.set('normal', main=self)
```

## Scroll

操作游戏内的滚动条。

以委托列表滚动条为例：

```python
# 创建滚动条
COMMISSION_SCROLL = Scroll(COMMISSION_SCROLL_AREA, color=(247, 211, 66), name='COMMISSION_SCROLL')

class Test(ModuleBase):
    def test(self):
        # 判断是否有滚动条
        COMMISSION_SCROLL.appear(main=self)
        # 获取当前位置
        posi = COMMISSION_SCROLL.cal_position(main=self)
        # 判断是否在顶端或底端
        COMMISSION_SCROLL.at_top(main=self)
        COMMISSION_SCROLL.at_bottom(main=self)
        # 拖拽至指定位置
        COMMISSION_SCROLL.set(0.5, main=self)
        # 拖拽至顶端或底端
        # 与直接拖拽至指定位置的区别是，这两个会拖出头，以保证滚动条到达端部
        COMMISSION_SCROLL.set_top(main=self)
        COMMISSION_SCROLL.set_bottom(main=self)
        # 翻页，往下翻0.5页，翻页只是大致准确
        COMMISSION_SCROLL.drag_page(0.5, main=self)
        # 往上或往下翻一页，由于翻页只是大致准确，默认翻的是0.8页，以防止漏掉一些内容
        COMMISSION_SCROLL.prev_page(main=self)
        COMMISSION_SCROLL.next_page(main=self)
```

## NavBar

操作游戏内的标签页。

以建造页面的左侧边栏为例：

```python
# 每个标签的 Button 阵列
gacha_side_navbar = ButtonGrid(
    origin=(21, 126), delta=(0, 98),
    button_shape=(60, 80), grid_shape=(1, 5),
    name='GACHA_SIDE_NAVBAR')
# 创建标签页
GACHA = Navbar(grids=gacha_side_navbar,
    active_color=(247, 255, 173),
    inactive_color=(140, 162, 181))

class Test(ModuleBase):
    def test(self):
        # 获取标签页的序号
        current = GACHA.get_active(main=self)
        # 获取标签实际出现的个数
        total = GACHA.get_total(main=self)
        # 切换至指定的标签页，上下左右设置一个即可
        GACHA.set(main=self, left=None, right=None, upper=None, bottom=None)
        # 切换至从下往上数的第二个标签
        GACHA.set(main=self, bottom=2)
```

## Page

游戏界面类。

以收获界面为例：

```python
# 创建 Page 对象，使用的 check_button 需要是唯一的
# 如果画面中出现了 REWARD_CHECK，Alas 就认为现在在 page_reward 界面中
page_reward = Page(REWARD_CHECK)
# 定义界面切换
# 点击什么按钮，会到达什么界面
page_reward.link(button=REWARD_GOTO_MAIN, destination=page_main)
page_main.link(button=MAIN_GOTO_REWARD, destination=page_reward)
```

## 界面切换

Alas 的游戏界面切换是自动的，带有寻路的。Alas 可以在绝大多数的游戏界面下启动，并沿着最短路径切换到它需要的游戏界面，与许多脚本都需要在主界面中启动不同。

所有操作游戏界面的方法都包含重试。

### ui_click()

点击 UI 上的按钮，切换至下一界面。相当于是封装了：

```python
while 1:
    self.device.screenshot()
    if self.appear(appear_button):
        self.device.click(click_button)
    if self.appear(check_button):
        break
```

- appear_button：如果出现了这个按钮，就点击 click_button
- click_button：需要点击的按钮，为设置时，等于 appear_button
- check_button：如果出现了这个按钮，认为界面切换完成
- additional：点击可能会出现的按钮，例如弹窗确认

### ui_get_current_page()

获取当前界面。`self.ui_current` 即是当前界面。

Alas 启动时会调用这个方法，如果游戏未启动，抛出 `GameNotRunningError`，被顶层捕获后，启动游戏并继续。

### ui_goto()

沿最短路径切换到指定界面，即便歪去别的界面也能自动纠正。

### ui_ensure()

相当于 ui_get_current_page() + ui_goto()

### ui_ensure_index()

地图章节翻页，包含重试以防止没翻到或者翻过头。使用场景：设置地图章节，选择队伍，设置猫箱购买数量等。

- index：目标数字
- letter：当前数字，可以是获取当前数字的方法，也可以是 OCR 类
- prev_button：往前的按钮
- next_button：往后的按钮
- fast：True 则一次性点完，不对再重试。False 则点一下识别一下。False 用在队伍选择上，因为如果少了一队，数字就不连续了。

### ui_goto_main()

前往主界面

### ui_back()

点返回箭头

### ui_additional()

处理各种可能在界面切换期间出现的弹窗。
