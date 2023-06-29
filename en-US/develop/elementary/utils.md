# 工具类

这里介绍 module/base/utils.py 下的函数。

## random_normal_distribution_int(a, b, n=3)

在区间 `[a, b)` 内产生符合正态分布的随机数，原理是取多个随机数的平均值来模拟正态分布，Alas 中绝大部分随机数由这个函数产生。`n` 值是随机数的数量，值越大分布越集中。

```python
import matplotlib.pyplot as plt
data = [random_normal_distribution_int(0, 100) for _ in range (1000)]
plt.hist(data, bins=50, edgecolor="black", alpha=0.7)
```

![](/develop/elementary/utils/random_normal_distribution_int.png)

## random_rectangle_point(area)

在区域内产生符合二维正态分布的随机点，通常在点击操作中使用。下图展示在 BATTLE_PREPARATION 上产生的随机点。（背景图片由 Photoshop 添加）

```python
fig = plt.figure(figsize=(11,4))
plt.axis([-10, 210, -10, 70])
data = np.array([random_rectangle_point((0, 0, 200, 60)) for _ in range (500)])
x, y = data.T
plt.scatter(x,y,s=2, alpha=0.5)
```

![](/develop/elementary/utils/random_rectangle_point.png)

## random_rectangle_vector(vector, box, random_range=(0, 0, 0, 0), padding=15)

在区域按二维正态分布放置一个向量，通常在滑动操作中使用。

`box` 是放置向量的区域，`random_range` 是给滑动向量加的随机值，`padding` 是到边缘的最小距离。

## random_line_segments(p1, p2, n, random_range=(0, 0, 0, 0))

在两点之间插入中间值，通常在滑动操作中使用。

## Area operations

区域操作的函数有:`area_offset`，`area_pad`，`point_in_area`，`area_in_area`，`area_cross_area`。

`location` 和 `node`相互转换：`node2location`，`location2node`。

关于 Alas 中的命名:

- point：是含 2 个元素的 tuple。(x, y)：指屏幕上的一个点。原点是屏幕左上角，x 方向沿屏幕水平向右递增，y 方向沿屏幕竖直向下递增。
- area：是含 4 个元素的 tuple。四个元素的值是：`(upper_left_x, upper_left_y, bottom_right_x, bottom_right_y)`。指屏幕上的矩形区域。
- location：是含 2 个元素的 tuple。(x, y)：指游戏海域中的网格坐标，(0, 0) 是海图最左上角的格子，也就是 A1。
- node：是 str。比如 `E3`，指游戏海域中的网格坐标。node 相比 location 更容易阅读，所以在逻辑编写和日志中一般使用 node，运行时使用 location。

## crop(image, area)

裁切图片，`image` 需要是 numpy 数组，相当于 pillow 库中的 crop。当裁切区域超出图片大小时，显示为黑色，这点与 pillow 一致。以下两种裁切方式效果相同。裁切大量图片时，操作 numpy 数组会比较快。

```python
image = self.device.image.crop(area)
```

```python
image = crop(np.array(self.device.image), area)
```

## get_color(image, area)

计算区域的平均颜色。

## color_similarity(color1, color2)

计算两个颜色之间的差值。这里使用了 PhotoShop 中魔棒的容差的算法。先计算 RGB 的差值，容差等于最大正差值减最小负差值。使用容差而非 RGB 的简单相减，是为了方便在 PS 中查看图片颜色，同时也更符合人眼对颜色的感知。

```python
Tolerance = Max(Positive(difference_rgb)) + Max(- Negative(difference_rgb))
```

## color_similar(color1, color2, threshold=10)

判断颜色是否相似，判断容差是否小于阈值。

## color_similar_1d(image, color, threshold=10)

在一维数组上判断颜色是否相似。

## color_similarity_2d(image, color)

计算二维数组上的颜色差值。注意，返回的 numpy 数组中，255 代表完全相等，数值越小颜色相差越大。在计算二维图片的颜色差值时，使用了 opencv 计算，速度是使用 numpy 的 3 倍以上。这个函数也是一个常用函数，一般用来进行简单的颜色计数。

```python
image
```

![](/develop/elementary/utils/color_similarity_2d.png)

```python
Image.fromarray(color_similarity_2d(image, (255, 77, 82)))
```

![](/develop/elementary/utils/color_similarity_2d_2.png)

```python
np.sum(color_similarity_2d(image, (255, 77, 82)) > 221) > 100
```

```sh
True
```

## extract_letters(image, letter=(255, 255, 255), threshold=128)

将含文字的图片转换为白底黑字的图片，threshold 越小，背景越白。除了 cnocr 的预训练的模型外，Alas 中的 ocr 模型都是使用浅色背景和深色字体训练的。所以需要使用 `extract_letters` 进行预处理。Ocr 类已经封装了这一步，你不需要进行额外的操作，只需要输入字体的颜色即可。

```python
image
```

![](/develop/elementary/utils/extract_letters.png)

```python
Image.fromarray(extract_letters(image, letter=(173, 247, 74), threshold=128))
```

![](/develop/elementary/utils/extract_letters_2.png)

## extract_white_letters(image, threshold=128)

与 `extract_letters` 基本相同，但针对白色字体，若颜色不是黑白灰，输出的颜色会更浅。

## red_overlay_transparency(color1, color2, red=247)

假设 color_2 是由 color_1 叠加一个半透明的红色色块得到的，即 `color_2 = color_1 *  (1 - alpha) + (red, 0, 0) * alpha`，然后计算红色色块的不透明度，Alas 根据不透明度是否超过阈值来判断空袭、伏击和索敌的动画. 当颜色较深时（40 以下）结果不准确。

### MAP_AIR_RAID 空袭

![](/develop/elementary/utils/red_overlay_transparency_1.gif)

```python
red_overlay_transparency(
    MAP_AIR_RAID.color, get_color(self.device.image, MAP_AIR_RAID.area)
)
```

```sh
0.0
0.5289717702159051
0.5291491967723716
0.5146182778247053
0.5292370071164753
0.0023695248896050164
```

### MAP_AMBUSH 伏击

![](/develop/elementary/utils/red_overlay_transparency_2.gif)

```python
red_overlay_transparency(
    MAP_AMBUSH.color, get_color(self.device.image, MAP_AMBUSH.area)
)
```

```sh
0.0
-0.16425414634481073
0.44761270077818777
0.4374642521684831
0.4481979863753585
0.444644697332672
0.06879890918910499
0.05134165622907348
0.05226963663451904
-0.007069039078106552
0.0006615745474228571
```

### MAP_ENEMY_SEARCHING 索敌

![](/develop/elementary/utils/red_overlay_transparency_3.gif)

```python
red_overlay_transparency(
    MAP_ENEMY_SEARCHING.color, get_color(self.device.image, MAP_ENEMY_SEARCHING.area
)
```

```sh
0.0
-0.17394681611846782
-0.1864791203625967
0.7091334931036758
0.7207363797991225
0.7653337334792214
0.40077538826295694
0.045037725366474775
-0.12609578098579324
```

## color_bar_percentage(image, area, prev_color, reverse=False, starter=0, threshold=30)

计算进度条的百分比，可以计算纯色的、渐变色的、甚至是不连续的有遮挡的进度条。用于检测地图通关百分比，演习时敌我的血条，强化角色时的装填属性等。有一定的误差，满进度时，可能返回 0.99 或 0.98。执行耗时较长, 约 10ms，取决于长度和复杂度。

![](/develop/elementary/utils/color_bar_percentage.png)

```python
self._calculate_hp(image, area=DEFENDER_HP_AREA.area, reverse=False)
```
```sh
0.7603833865814696
```