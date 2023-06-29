# 日志

这里介绍 module/logger.py。

## 格式

- 日志格式: `%(asctime)s.%(msecs)03d | %(levelname)s | %(message)s`。
- 时间格式: `%Y-%m-%d %H:%M:%S`。

例子: `2020-09-11 08:35:59.460 | INFO | XXXXXXXX`。

Log 会打印在控制台上，也会写入到文件中，位置为 `f'./log/{datetime.date.today()}_{pyw_name}.txt'`

logger 支持基本的调用，比如 `logger.info`，`logger.warning`。此外，还有一些额外的函数，用来增强 log 文件的可读性。

## 关于日志

目前，Alas 的 log 需要人工阅读，为了 log 的可读性，请避免大量使用 `logger.hr()`，`logger.warning()`，感叹号 ( `!` ) 等表示强调的字符。强调是一个相对的概念，我们之所以看到某个事物被强调了，并不是因为它本身被强调了，而是因为存在大量其他事物并没有被强调。如果你强调了所有的事物，那么相当于你没有强调任何一个事物。

## logger.hr(title, level=0)

仅在脚本开始运行时使用。

```sh
2020-01-01 00:00:00.000 | INFO | +---------------------------------------------+
2020-01-01 00:00:00.000 | INFO | |                    TITLE                    |
2020-01-01 00:00:00.000 | INFO | +---------------------------------------------+
```

## logger.hr(title, level=1)

表示开始执行 GUI 中的某个功能。

```sh
2020-01-01 00:00:00.000 | INFO | ==================== TITLE ====================
```

## logger.hr(title, level=2)

表示功能的某个阶段的开始。比如开始第一场战斗。

```sh
2020-01-01 00:00:00.000 | INFO | -------------------- TITLE --------------------
```

## logger.hr(title, level=3)

表示功能的某个细分阶段的开始。

```sh
2020-01-01 00:00:00.000 | INFO | <<< TITLE >>>
```

## logger.attr(name, text)

用于打印属性值.

```sh
2020-01-01 00:00:00.000 | INFO | [name] text
```

## logger.attr_align(name, text, front='', align=22)

用于打印属性值，有一定的格式。一般用在海图识别的属性打印中。

```sh
2020-09-11 02:16:51.542 | INFO |           vanish_point: (  635，-1676)
2020-09-11 02:16:51.543 | INFO |          distant_point: (-2245，-1676)
2020-09-11 02:16:51.568 | INFO | 0.109s  _   Horizontal: 6 (6 inner，2 edge)
2020-09-11 02:16:51.568 | INFO | Edges: /_\    Vertical: 9 (9 inner，2 edge)
2020-09-11 02:16:51.617 | INFO |            tile_center: 0.955 (good match)
2020-09-11 02:16:51.627 | INFO | 0.058s  _   edge_lines: 3 hori，2 vert
2020-09-11 02:16:51.627 | INFO | Edges: /_\   homo_loca: ( 24， 54)
2020-09-11 02:16:51.630 | INFO |            center_loca: (3，2)
2020-09-11 02:16:51.630 | INFO |       camera_corrected: A1 -> D3
2020-09-11 02:16:51.630 | INFO |                 Camera: D3
```

## Misc

- 如果在 Alas 的子目录中运行任意文件，但该文件导入了 logger，就会将运行目录切换至 Alas 的根目录。这样在调试或者运行 dev_tools 的时候，就不会因为忘记切换目录而导致找不到模块。
