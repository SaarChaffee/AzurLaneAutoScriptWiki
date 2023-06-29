# 用于识别的类

这里介绍 Alas 中用于识别的类。

## Button

在 Alas 中，用于识别的图片称为 Assets，经过 button_extract 提取后，得到 Button 对象。

### Button.appear_on(self, image, threshold=10)

判断在图片上是否出现当前 button，使用平均颜色识别。

### Button.match(self, image, offset=30, threshold=0.85)

判断在图片上是否出现当前 button，使用模板匹配识别。offset 表示搜索的范围，为整数时上下搜索，为 tuple 时在四周搜索。匹配成功后会设置 `_button_offset`，表示识别的区域相对原始区域的偏移，将影响未来的点击区域。

首次调用时，会重新读取 assets 文件并缓存。

### Button.button

产生一个在点击区域内的随机点。原始的点击区域加上 `_button_offset` 得到当前的点击范围。碧蓝航线曾经有过 `确认` 和 `取消` 按钮的上下抖动，`_button_offset` 可以自动处理这个问题。

### Button.load_color(self, image)

重新从截图中载入 button 的颜色和图像。只在伏击空袭的识别中使用。

## 添加一个 Button

Button 对象按模块保存于 ./asset 目录下，按钮定义于每个模块的 asset.py 文件中。比如 BATTLE_PREPARATION 的 Assets 图片是这样的：

![](/develop/intermediate/detection/BATTLE_PREPARATION.png)

在 assets.py 中，它是这样的：

```python
BATTLE_PREPARATION = Button(area=(1043, 607, 1241, 667), color=(234, 179, 97), button=(1043, 607, 1241, 667), file='./assets/combat/BATTLE_PREPARATION.png')
```

area 是识别的区域，color 是平均颜色，button 是出现后的点击区域，file 是 assets 文件的位置。

注意，所有的 asset.py 都是由 button_extract 生成的，不要手动去修改它。

假设我们希望添加一个 `确定` 按钮，它出现于潜艇信号扫描时。

1. 截图，使用模拟器自带的截图工具截图，并保证分辨率是 1280x720

![](/develop/intermediate/detection/screenshot.png)

2. 将图片复制到 ./asset 下相应的目录中，更改文件名，比如 `SEARCH_CONFIRM.png`

3. 拖动至 Photoshop 中打开

4. 使用选区工具框选按钮区域

5. 播放动作

直接点击 `播放动作` 的按钮，自动执行图片处理的操作。处理完的图片是这样的：

![](/develop/intermediate/detection/screenshot_result.png)

下面以 Photoshop CS6 为例。当然，你也可以使用别的软件来进行下面的操作，能把剩下的区域涂黑就行。使用 PS 只是因为它有录制动作的功能，会更快一些。

在第一次操作时，需要按照以下步骤添加动作。

在菜单栏的 `窗口` 中，点击 `动作` ，弹出动作窗口。

在添加动作之前，最好备份当前图片，因为接下来需要记录的操作是不可逆的。

1.  在动作窗口中，点击新建动作的图标，按照自己的喜好命名，比如 `button_image`。点击 `记录` ，注意灰色的圆圈变红了，这表示动作录制开始了。
2.  在图片区域单击鼠标右键，点击 `选择反向` 。
3.  在菜单栏的 `编辑` 中，点击 `填充` 。
4.  在弹出的填充选项窗口中，填充内容使用 `黑色`，填充模式选择 `正常`，不透明度选择 `100`，点击 `确定`。
5.  在菜单栏的 `文件` 中，点击 `保存`。
6.  在菜单栏的 `文件` 中，点击 `关闭。`
7.  在动作窗口中，单击停止录制的图标，此时动作录制停止。

录制完成后，会得到动作如下，以后就可以直接使用，不需要手动操作了。

![](/develop/intermediate/detection/ps_action.png)

6. (可选) 添加属性覆盖图片

一个按钮具有三个属性：

- area，按钮识别的区域。
- color，按钮的颜色。
- button，按钮出现后的点击区域。

假如添在同一目录下放置图片文件 `SEARCH_CONFIRM.BUTTON.png` ，并按照刚才描述的方法处理图片。那么这张图片的 `button` 属性将覆盖 `SEARCH_CONFIRM.png` 的 `button` 属性。

这是一个非常有用的特性，因为脚本通常需要判断截图中出现的元素，然后点击按钮，需要判断的地方和需要点击的地方可能不出于同一位置。

7. 运行 button_extract

```sh
python -m dev_tools.button_extract
```

## ButtonGrid

生成 Button 的二维阵列。

![](/develop/intermediate/detection/ButtonGrid.png)

`origin` 是最左上角 button 的坐标，`delta` 是每个 button 移动的距离，`button_shape` 是每个 button 的大小，`grid_shape` 是网格的大小。

## ButtonGrid.buttons(self)

将网格展平为 list。

## Button.getitem(self, item)

获取某个位置的 Button。

## Template

模板图片。Template 需要以 `TEMPLATE_` 开头，不需要像处理 Button 一样处理，直接裁切即可，但同样需要运行 button_extract。首次调用时，会重新读取 assets 文件并缓存。

Template 可以是 GIF 图片，GIF 中的每一帧都会用于匹配。

### Template.match(self, image, similarity=0.85)

模板匹配。

### Template.match_result(self, image)

模板匹配。返回相似度和最相似点。

### Template.match_multi(self, image, similarity=0.85)

多点模板匹配，自动合并相邻的点。返回一个 list 的 Button 对象。

## 添加用于敌人识别的模板图片

首先，我们不能直接裁切截图来制作模板图片，因为地图中的物体是有透视的，而模板匹配是对图片的缩放敏感的。我们需要使用 `dev_tools/relative_crop.py` 来获取图片。其中的 `get_relative_image` 可以根据透视裁剪出相对位置的图片，并放大到固定的大小。

下图展示了 `self.get_relative_image((-1, -1, 1, 0), output_shape=(120, 60))` 的裁切区域。

![](/develop/intermediate/detection/relative_crop.png)

1. 编辑 dev_tools/relative_crop.py，粘贴地图文件中的设置

```python
class Config:
    """
    将地图文件的配置粘贴到这里
    """
    pass
```

2. 修改保存目录和截图文件路径

```python
# 保存临时图像的文件夹
folder = './screenshots/temp/'
# 把截图放在这里
file = './screenshots/TEMPLATE_AMBUSH_EVADE_FAILED.png'
```

3. 运行 relative_crop

```python
python -m dev_tools.relative_crop
```

4. 在保存目录里找到对应格子的图片，在图片中裁切出需要的模板。将模板图片放置于 `assets/<server>/template` 目录下，文件名需以 `TEMPLATE_` 开头。

5. 运行 button_extract

## 添加识别动态敌人的 GIF 模板图片

在活动永夜幻光（event_20200723_cn）中，游戏里的精英敌人身上会覆盖一层动态的黑色烟雾，影响常规模板匹配，因此添加了对 GIF 模板的支持。原理是先大量截图并裁切，再去重，将剩下的图片储存为 GIF，用 GIF 中的帧当作多个模板去匹配一个敌人。即便没有黑雾，使用多模板匹配，也能提高识别正确率。

1. 进入关卡，找到精英敌人。

2. 编辑 dev_tools/relative_record.py，粘贴地图文件中的设置

```python
class Config:
    """
    将地图文件的配置粘贴到这里
    """
    pass
```

3. 修改设置

```python
CONFIG = 'alas'       # 要加载的配置文件。
FOLDER = ''           # 要保存的文件夹。
NAME = 'Deutschland'  # 塞壬名称, 图片将保存在 <FOLDER>/<NAME> 中
NODE = 'D5'           # 要裁剪的当前视角下的格子，不是在整个地图中的格子。
```

4. 运行 dev_tools/relative_record.py

这会执行 300 次截图，然后使用 `get_relative_image` 函数裁切出特定格子中的塞壬图像。得到第一张截图时，会弹出裁切的预览，需要人工确认是否裁切到了正确的格子。如果裁到别的格子上，要停止运行，修改 NODE，再重新运行。

5. 运行 dev_tools/relative_record_gif.py

暴力搜索帧数最少的 gif 模板，生成在 `{FOLDER}/{NAME}_gif` 。然后手动挑选帧数较少且能反应主要特征的 gif。如果有符合要求的，跳转至第 9 步，否则继续第 6 步，改用人工优化。

6. 观察精英敌人

用 PhotoShop 打开 `<FOLDER>/<NAME>` 文件夹下的第一张图片，在游戏中观察精英敌人的上下呼吸运动。通常小人的身体是上下运动的，四肢是旋转的。模板匹配对缩放和旋转的识别很差，所以需要找到小人身上的不旋转的区域来裁切出模板，这个区域称为 AREA。AREA 选择时的一些经验：

- 不要选择小人的面部（容易误判）或眼睛（小人会眨眼睛）。
- 不要包含小人身后的海面（海面颜色会变化）。
- AREA 的长宽都应大于 15 像素（减少误判）。
- 可以接受部分图像是旋转的。

例如在塞壬航母的中，选择了身体作为模板。（左：300 张截图中的前 30 张，右：提取的 GIF 模板）

![](/develop/intermediate/detection/relative_record.gif)

7. 编辑 dev_tools/relative_record_gif.py，修改设置

```python
# FOLDER = ''
# NAME = 'Deutschland'
AREA = (32, 32, 54, 52) # 要裁剪的区域，选择一个东西不会旋转太多的区域。
THRESHOLD = 0.92        # 如果模板和现有模板之间的相似度大于 THRESHOLD，这个模板将会被删除。实际检测中的阈值是 0.85，为了更高的准确度，这里的阈值应该高于 0.85。
```

:::warning
FOLDER 和 NAME 从 relative_crop 中导入，一般不需要修改。
:::

1. 运行 dev_tools/relative_record_gif.py。运行时会打印哪一张截图产生了新的模板，在 300 张截图中得到的模板数量应小于 5。产生的模板数量越少越好，过多的模板会拖慢识别速度，也意味着裁切区域不对。此时需要重复第 5 步至第 7 步，人工优化 AREA。

2. 使用新的模板。将新的 GIF 模板复制到 `./assets/<server>/template` 文件夹中，然后运行 button_extract。在地图文件的设置中开启塞壬识别，并设置模板名称。

```python
MAP_HAS_SIREN = True
MAP_SIREN_TEMPLATE = ['U101', 'U73', 'U552']
```

`U101` 是第 3 步中的 NAME，表示使用 `TEMPLATE_U101.gif` 或 `TEMPLATE_U101.png`。它是大小写敏感的，如果在运行时找不到模板文件，会提示 `Enemy detection template not found: {name}`。

## 游戏内容识别

### self.appear(self, button, offset=0, interval=0, threshold=None)

判断 button 是否出现在画面中

- offset

  button 的偏移量。假设 `button.area=(100, 200, 300, 400)`，`offset=(30, 20)`，那么 Alas 将在 `(100-30, 200-20, 300+30, 400+30)` 的区域内搜索按钮。

  offset=None 时，使用平均颜色识别 `Button.appear_on()`

  设置 offset 后，使用模板匹配识别 `Template.match()`

- interval

  按钮出现间隔。按钮出现后的若干秒内，对这个按钮的识别返回 False。一般设置 2 或 3 秒，能避免连击。

### self.appear_then_click()

判断 button 是否出现在画面中，出现了就点击。

`appear_then_click()` 的本质是：

```python
if self.appear(button):
    self.device.click(button)
```

它们的连续调用会带来一个非常方便的特性：在设置了 offset 的情况下，即便游戏内的按钮相对 asset 图片有所移动，Alas 也能点击被移动后的按钮。这会降低 assets 维护成本，避免把时间浪费在应对游戏 UI 的微调上。它的原理是，上面已经提到过的 `Button.match()` 在匹配成功时会设置 `_button_offset`，而 `self.device.click()` 也会使用 `_button_offset`。

### image_color_count(self, button, color, threshold=221, count=50)

判断颜色相似的像素的个数。有时候土办法会意外地好用。

### 其他方法

```python
wait_until_appear()
wait_until_appear_then_click()
wait_until_disappear()
wait_until_stable()
```

已经较少使用。

:::warning
不要把 wait_until_stable() 当作 sleep() 使用，建议优化逻辑以减少对等待的依赖。
:::
