# 地图识别

想必你已经阅读过 Alas 的海图识别的文档。在识别之后，`module/map_detection/view.py` 将两种识别方法封装了起来，并整合了敌人识别。

## 局部地图识别

`View` 对象的识别结果，称为局部地图（Local Map）。局部地图的识别只需要一张游戏截图，并且可以在 Alas 外运行，你可以使用以下代码来调试 Alas 的海图识别。

```python
class Config:
    # 在此处粘贴你的配置
    pass

# 这里是图片文件路径
file = ''

md = View(AzurLaneConfig('template').merge(Config()))
image = np.array(Image.open(file).convert('RGB'))

# 如果你的日志中有任何 “homo_storage”，请在此处粘贴并取消注释
# sto = ((8, 5), [(355, 117), (1265, 117), (288, 559), (1417, 559)])
# md.backend.load_homography(storage=sto)

md.load(image)
md.predict()
md.show()
md.backend.draw()
```

## View(config, mode='main')

创建一个 View 对象，需要 AzurLaneConfig，模式可选普通图 `main` 或者大世界 `os`。

默认情况下，局部地图识别使用 Homography 方法识别，你可以在 config 里指定识别方法

```python
DETECTION_BACKEND = 'perspective'  # Or 'homography'
```

在 Homography 方法下，第一次识别会调用 Perspective 方法计算透视变换参数，并缓存至 homo_storage。一般而言，海域内的透视不会变化，Alas 会一直使用同一个 View 对象，同一个 View 对象也会使用同一个 homo_storage，直到任务切换。如果第一次计算的透视变换参数不正确（比如镜头位于角落），会影响到接下来的识别。而在 Perspective 方法下，不会有这个影响。

## load(self, image)

载入一张截图，完成海图识别，获得以下属性：

- grids：海域中的每一个格子，`dict, key: (x, y), value: Grid object`。
- shape：局部海域的大小，`(x, y)`。
- center_loca：镜头中心对准的格子的坐标，`(x, y)`。
- center_offset：镜头中心偏离格子中心的向量，在计算滑动距离时使用。
- swipe_base：反映海域中网格大小的量，在计算滑动距离时使用。

## predict(self)

识别地图中的敌人，问号，己方舰队等。

## update(self, image)

在不重新进行海图识别的情况下，将图片载入至所有格子内。

## select(self, \*\*kwargs)

选择海域中任何你感兴趣格子，返回 SelectedGrids 对象。
