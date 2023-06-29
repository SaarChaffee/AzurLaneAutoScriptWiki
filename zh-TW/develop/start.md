# 开始

## Alas 的应用场景

Alas 是为长时间运行，甚至是 7\*24 运行而设计的，这一点与市面上多数针对手机的脚本不同。Alas 在早期已经放弃了对安卓真机的支持，同时也放弃了对除 1280x720 以外的分辨率的支持。

放弃安卓真机的原因是：

- 安卓机在长时间运行下，容易出现黑屏/假死的情况
- 部分安卓机型截图会压缩，早期代码中有不少基于颜色识别的方法
- 需要另外占用一台安卓机。由于 ocr 模型的存在，将 Alas 迁移至安卓存在困难

使用 1280x720 分辨率的原因是：

- 720p 在图像清晰度和截图耗时之间有较好的平衡，480p 下海图识别正确率明显下降，1080p 截图耗时几乎翻倍
- 异型屏没有统一的标准，适配非 16:9 分辨率带来的维护成本和获得的收益不符

## 基本运作模式

在低级的脚本中，往往充斥着这样的代码：

```python
click(XXXX)
sleep(2)
click(YYYY)
sleep(3)
```

这样的代码稳定性很差，如果游戏卡顿，或者脚本需要对低配设备优化，就得延长等待的间隔，最后等待变得越来越长。很多时候，脚本慢，并不是因为截图慢，语言运行慢，而是因为开发者写了大量的固定时长的等待。

对于 Alas 而言，“快” 是最主要的目标。

针对快慢设备的兼容问题，Alas 使用了这样的运作模式，也希望开发者使用它，以减少对 `sleep()` 的依赖。这种模式在高配电脑上可以运行得很快，在低配电脑上也有很好的兼容性，它可以在点击失败时自动重试，我们也不再需要关心点击的执行顺序。

以进入地图为例：

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

## 处理死循环

在上面示例代码中，如果陷入死循环，Alas 会抛出异常。

- `GameStuckError` 无操作连续截图超过 1 分钟。战斗中和客户端启动中，将延长至 5 分钟。
- `GameTooManyClickError` 最后 15 次操作中，有一项操作 >= 12 次，或有两项操作都 >= 6 次。

这两个异常只会在最顶层捕获。捕获后，Alas 会将 log 和最近截图保存在单独的文件夹，并处理其中可能会暴露用户身份的信息，包括混淆路径名称，遮挡游戏昵称等。处理完成后 Alas 停止。

::: code-group

```sh [GameStuckError]
2023-06-10 17:14:48.651 | WARNING | Wait too long
2023-06-10 17:14:48.653 | WARNING | Waiting for {'FOO_BAR'}
2023-06-10 17:14:48.851 | INFO | [Package_name] com.bilibili.azurlane
2023-06-10 17:14:48.853 | ERROR | GameStuckError: Wait too long
2023-06-10 17:14:48.858 | WARNING | Saving error: ./log/error/1145141919810
```

```sh [GameTooManyClickError]
2023-06-29 09:51:22.914 | WARNING | Too many click for a button: FOO_BAR
2023-06-29 09:51:22.916 | WARNING | History click: ['FOO_BAR']
2023-06-29 09:51:22.918 | ERROR | GameTooManyClickError: Too many click for a button: FOO_BAR
2023-06-29 09:51:22.920 | WARNING | Saving error: ./log/error/1145141919810
```

:::

## 性能优化

与一般认知不同，开发者在编写 Alas 时，不需要特别注意性能优化。因为在 Alas 运行时，超过 99% 的时间是在等待模拟器截图。

在配置过关的电脑上，截图耗时约 350 ms，而 Alas 处理只花费约 2.5 ms。在海图识别或者 OCR 时，Alas 耗时也不过 100-180 ms。

## 基于图片的 assets 管理

手动写坐标会给后期维护带来麻烦，因为没人知道这个坐标是在哪里。它也会大量占据开发者的时间，以至于脚本的规模受限。

```python
area = (790, 275, 911, 321)
```

Alas 编写了一个简单粗暴的代码生成器 dev_tools/button_extract.py，来管理 assets ，它优势在：

- 打开图片即可方便地查看这个区域在哪里，以及这个区域所包含的内容，方便后期维护。
- 设置好 PhotoShop 动作后，制作一张 assets，比手动输入坐标快。
- 多服务器适配。
- 可以在 IDE 中使用自动补全。

## OCR

Alas 使用了 [cnocr](https://github.com/breezedeus/cnocr) 作为 OCR 库，也针对碧蓝航线内的字体训练了两个 OCR 模型。许多脚本都迈不过 OCR 这道坎，需要依赖在线 OCR，但是在 Alas 里，你可以大量地调用 OCR。

以识别石油量为例：

```python
OCR_OIL = Digit(OCR_OIL, name='OCR_OIL', letter=(247, 247, 247), threshold=128)
oil = OCR_OIL.ocr(self.device.image)
```

## 注释

使用 Google 注释规范，例如：

```python
"""
Re-focus to the center of a grid.

Args:
    tolerance (float): 0 to 0.5. If None, use MAP_GRID_CENTER_TOLERANCE

Returns:
    bool: Map swiped.
"""
```

同时增加 Pages，说明函数进出时的游戏界面，可以是 UI Page，也可以是 Button。(旧代码中可能缺少 Pages 注释)

```python
"""
Pages:
    in: page_moewfficer
    out: MEOWFFICER_BUY
"""
```

在注释中，应当全部使用英语，不能使用汉语拼音或者拼音缩写。

尽量做到：

- 一个函数的注释占 1/3 ~ 1/2
- 一个函数不超过一个屏幕
- 一个 .py 文件不超过 500 行。
