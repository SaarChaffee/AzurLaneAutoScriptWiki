# 创建全局地图

这里介绍 `module/map/map_base.py` 内 `CampaignBase` 类构造的[全局地图](./globe-map)。

## 创建全局地图

早期，地图信息都是手动编写的，以 7-2 的地图为例：

现在，交由 `dev_tools/map_extractor.py` 根据游戏解包数据自动生成就可以了，开发者只需要检查是否有错误，或进行优化。

```python
MAP = CampaignMap('7-2')
MAP.shape = 'H5'
MAP.map_data = '''
    ME ++ ME -- ME ME -- SP
    MM ++ ++ MM -- -- ME --
    ME -- ME MB ME -- ME MM
    -- ME -- MM -- ME ++ ++
    SP -- ME ME -- ME ++ ++
'''
MAP.weight_data = '''
    40 30 30 30 30 30 30 30
    20 20 20 10 20 20 20 20
    10 10 10 10 10 10 10 10
    20 20 20 10 20 20 20 20
    30 30 30 30 30 30 30 30
'''
MAP.camera_data = ['D3', 'D2']
MAP.camera_data_spawn_point = ['D3', 'D2']
MAP.spawn_data = [
    {'battle': 0, 'enemy': 3},
    {'battle': 1, 'enemy': 2, 'mystery': 1},
    {'battle': 2, 'enemy': 2, 'mystery': 1},
    {'battle': 3, 'enemy': 1, 'mystery': 2},
    {'battle': 4, 'enemy': 1},
    {'battle': 5, 'boss': 1},
]
A1, B1, C1, D1, E1, F1, G1, H1, \
A2, B2, C2, D2, E2, F2, G2, H2, \
A3, B3, C3, D3, E3, F3, G3, H3, \
A4, B4, C4, D4, E4, F4, G4, H4, \
A5, B5, C5, D5, E5, F5, G5, H5 = MAP.flatten()
```

## shape

地图网格大小，未设置时，根据 map_data 产生

## map_data

地图中所有网格的信息，以 7-2 为例

![](/develop/advance/create-global-map/wiki_7_2.jpg)

地图信息定义为

```python
MAP.map_data = '''
    ME ++ ME -- ME ME -- SP
    MM ++ ++ MM -- -- ME --
    ME -- ME MB ME -- ME MM
    -- ME -- MM -- ME ++ ++
    SP -- ME ME -- ME ++ ++
'''
```

这些符号的含义，在 `module.map_detection.grid_info.py` 中。

| print_name | property_name  | description             |
| ---------- | -------------- | ----------------------- |
| ++         | is_land        | fleet can't go to land  |
| --         | is_sea         | sea                     |
| \_\_       |                | submarine spawn point   |
| SP         | is_spawn_point | fleet may spawns here   |
| ME         | may_enemy      | enemy may spawns here   |
| MB         | may_boss       | boss may spawns here    |
| MM         | may_mystery    | mystery may spawns here |
| MA         | may_ammo       | fleet can get ammo here |
| MS         | may_siren      | Siren/Elite enemy spawn |

## map_data_loop

周回模式下的地图信息，部分活动图在周回模式前后有变化，需要额外定义。

## camera_data

Alas 会将画面中心对准这些格子，来扫描海域。未定义时，根据 shape 生成。

```python
MAP.camera_data = ['D4', 'E4', 'E2']
```

- 镜头信息需要覆盖到所有会刷怪的格子
- 镜头信息需要尽可能地少，位置尽可能接近，来加快扫描速度

在大部分地图中，有效的区域只有 `(-3, -1, 3, 2)`，也就是镜头中心左右三排以内，往上一行到往下两行的区域。往上第二行，由于地图 buff 会遮挡敌人星级，一般视为无效。但如果刚好那个格子不会刷怪，可以视作有效，从而减少 camera_data

## camera_data_spawn_point

在进入地图后的第一次扫描，Alas 会扫描舰队刷新点，来找到己方舰队的位置。由于全图扫描在扫描到所有预期的敌人之后便会停止（早停，early stop），这可能会漏掉舰队刷新点。camera_data_spawn_point 可以强迫 Alas 在第一次扫描时经过这些点。

camera_data_spawn_point 通常是 camera_data 中，可以看到舰队刷新点的格子。

## spawn_data

定义每一战过后的敌人刷新信息。由于全图扫描具有早停（early stop）的特性，spawn_data 需要尽可能地准确来触发早停。否则 Alas 会经过 camera_data 中所有定义的点。

例如 7-2

```python
MAP.spawn_data = [
    {'battle': 0, 'enemy': 3},
    {'battle': 1, 'enemy': 2, 'mystery': 1},
    {'battle': 2, 'enemy': 2, 'mystery': 1},
    {'battle': 3, 'enemy': 1, 'mystery': 2},
    {'battle': 4, 'enemy': 1},
    {'battle': 5, 'boss': 1},
]
```

## spawn_data_loop

周回模式下的敌人刷新信息，部分活动图在周回模式前后有变化，需要额外定义。

## weight_data

每个格子的权重，优先选择值权重小的点。默认情况下，Alas 将优先选择权重小的点，权重相同时，再选择距离短的点。

权重需要是 1-99 之间的整数。

```python
MAP.weight_data = '''
    40 30 30 30 30 30 30 30
    20 20 20 10 20 20 20 20
    10 10 10 10 10 10 10 10
    20 20 20 10 20 20 20 20
    30 30 30 30 30 30 30 30
'''
```

## wall_data

穹顶下的圣咏曲（event_20200521_cn）中定义 “光之壁”。“光之壁” 将阻挡舰队从一个格子去往另一个格子。

以 D2 为例，`·` 代表格子，用 `-` 和 `|` 定义 “光之壁”。这将在寻路中断开两个格子之间的连接。

```python
MAP.wall_data = """
    ·   · | ·   ·   ·   ·   ·   ·   ·   ·   · ,
          +                                   ,
    ·   ·   ·   ·   ·   ·   ·   ·   ·   · | · ,
          +       +   +               +   +   ,
    ·   · | ·   · | · | ·   ·   ·   · | ·   · ,
          +---+---+   |               |   +   ,
    ·   ·   · | ·   · | ·   ·   ·   · | · | · ,
              +---+   +---+       +---+   +-- ,
    ·   ·   ·   ·   ·   ·   ·   ·   ·   ·   · ,
                                              ,
    ·   ·   ·   ·   ·   ·   ·   ·   ·   ·   · ,
                                              ,
    ·   ·   ·   ·   ·   ·   ·   ·   ·   ·   · ,
"""
```

## portal_data

蝶海梦花 （event_20200917_cn） 活动中定义 “传送门”。玩家舰队到达至 “传送门” 的一端后，将被移动至另一端，同时镜头重新对准当前舰队。

以 HT5 为例，定义两个传送门之间的连接，这将在寻路中额外连接两个格子。

```python
MAP.portal_data = [('D3', 'F3'), ('G4', 'G6'), ('F7', 'D7'), ('C6', 'C4')]
```

## land_based_data

复刻峡湾间的星辰（event_20200921_en）活动中定义 “岸防炮”。“岸防炮” 会炮击它朝向的三格以内，玩家舰队经过时会被打断，前往岸防炮四周的格子可摧毁岸防炮。

以 SP3 为例，定义岸防炮的位置和朝向。

```python
MAP.land_based_data = [['H7', 'up'], ['D5', 'left'], ['G3', 'down'], ['C2', 'right']]
```

## maze_data

复兴的赞美诗（event_20210421_cn）活动中定义 “迷宫”。“迷宫“ 会产生 ”障碍“ 阻挡玩家移动，玩家舰队每移动 3 次，迷宫改变一次。

以 D2 为例，定义一个循环里，迷宫产生的障碍。障碍将在寻路中，与陆地一样，被 Alas 视为不可到达的海域。

```python
MAP.maze_data = [('A4', 'I6'), ('F9', 'D1', 'E5'), ('A7', 'C9', 'G1', 'I3')]
```

## fortress_data

碧海光粼（event_20210916_cn）活动中定义 “机关”，玩家需要击败所有机关中的敌人，才能解锁被锁定的格子，通往 BOSS 点。

以 D3 为例，定义机关位置和被锁定的格子，机关将被视作精英（siren），在机关未解锁之前，被锁定的格子视作不可到达。

```python
MAP.fortress_data = [('B5', 'E2', 'H5', 'E8'), 'G3']
```

## 展平地图

这是为后续编写索敌逻辑做的准备

```python
A1, B1, C1, D1, E1, F1, G1, H1, \
A2, B2, C2, D2, E2, F2, G2, H2, \
A3, B3, C3, D3, E3, F3, G3, H3, \
A4, B4, C4, D4, E4, F4, G4, H4, \
A5, B5, C5, D5, E5, F5, G5, H5, \
    = MAP.flatten()
```

可以使用以下代码生成

```python
shape = 'H5'
def location2node(location):
    return chr(location[0] + 64 + 1) + str(location[1] + 1)
def node2location(node):
    return ord(node[0]) % 32 - 1, int(node[1]) - 1
shape = node2location(shape.upper())
for y in range(shape[1]+1):
    text = ', '.join([location2node((x, y)) for x in range(shape[0]+1)]) + ', \\'
    print(text)
print('    = MAP.flatten()')
```
