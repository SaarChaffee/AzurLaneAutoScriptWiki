# 全局地图

这里介绍 `module/map/map_base.py` 内 `CampaignBase` 全局地图。

## 初始化全局地图

每次进入地图都需要初始化，重置地图信息

```python
self.map = map_  # 来自地图文件的定义
self.map.reset()
self.map.load_map_data(use_loop=self.map_is_clear_mode)
self.map.load_spawn_data(use_loop=self.map_is_clear_mode)
self.map.load_mechanism(land_based=self.config.MAP_HAS_LAND_BASED)
self.map.grid_connection_initial(
    wall=self.config.MAP_HAS_WALL,
    portal=self.config.MAP_HAS_PORTAL,
)
```

## update()

将局部地图合并至全局地图中，并检查属性是否正确，否则记为错误。若错误数量超过 2，不会合并，同时返回 False。

检查规则非常啰嗦，建议直接看 `module/map_detection/grid_info.py` 中的` GridInfo.merge()`，大致规则是 `is_XXX` 只能合并到 `may_XXX` 的点上。比如局部地图中的 `is_enemy` 只能合并在全局地图中 `may_enemy` 的点上，否则记为错误。

- grids：局部地图，View 对象。
- camera：当前镜头对准的格子。
- mode：更新模式，一般是 `normal`。

  踩问号遇到运输船时，使用 `carrier`。运输船只会刷新在无刷新事件的点（`--`）

## grid_connection_initial()

连接所有相邻的网格，用于寻路

- wall：是否有墙的阻隔，有就引入 wall_data。
- portal：是否有传送门，有就引入 portal_data。

## show()

在 log 里展示当前地图的信息，例如

```sh
INFO |     A  B  C  D  E  F  G  H
INFO |  1 -- ++ -- -- -- 3L -- --
INFO |  2 MY ++ ++ MY -- -- 2M --
INFO |  3 Fl -- FL -- -- -- == MY
INFO |  4 -- 2L -- -- -- 2M ++ ++
INFO |  5 -- -- -- 2L -- == ++ ++
```

## show_cost()

```sh
INFO |       A    B    C    D    E    F    G    H
INFO |  1    4 9999    4    3    4    5    8    7
INFO |  2    3 9999 9999    2    3    4    5    6
INFO |  3    2    1    0    1    2    3    4    5
INFO |  4    3    2    1    2    3    4 9999 9999
INFO |  5    4    3    2    3    4    5 9999 9999
```

## show_connection()

```sh
INFO |     A  B  C  D  E  F  G  H
INFO |  1 A2    D1 D2 D1 E1 H1 H2
INFO |  2 A3       D3 D2 E2 F2 H3
INFO |  3 B3 C3    C3 D3 E3 F3 G3
INFO |  4 A3 C4 C3 C4 D4 E4
INFO |  5 B5 C5 C4 C5 E4 E5
```

## reset(self)

重置所有地图信息

## reset_fleet(self)

重置当前舰队标记 grid.is_current_fleet

## find_path_initial(self, location, has_ambush=True)

初始化寻路参数

## find_path_initial_multi_fleet(self, location_dict, current, has_ambush)

初始化多舰队的寻路参数

## find_path(self, location, step=0)

A\*寻路

## missing_get(self, battle_count, mystery_count=0, siren_count=0, carrier_count=0, mode='normal')

## missing_is_none(self, battle_count, mystery_count=0, siren_count=0, carrier_count=0, mode='normal')

## missing_predict(self, battle_count, mystery_count=0, siren_count=0, carrier_count=0, mode='normal')

## select(self, \*\*kwargs)

选择某个格子
