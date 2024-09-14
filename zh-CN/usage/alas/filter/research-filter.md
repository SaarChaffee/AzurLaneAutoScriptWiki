# 科研过滤器

## 属性

```text
{series}-{genre}-{duration}
```

## Series

科研期数

| Series | 描述     |
| ------ | -------- |
| S1     | 一期科研 |
| S2     | 二期科研 |
| S3     | 三期科研 |
| S4     | 四期科研 |
| S5     | 五期科研 |
| S6     | 六期科研 |
| S7     | 七期科研 |

## Genre

以下三种格式中的一种：

- 科研类型

| Genre | 描述               | 消耗（条件） |
| ----- | ------------------ | ------------ |
| Q     | 舰装解析           | 强化部件     |
| H     | 魔方解析(心智补全) | 心智魔方     |
| D     | 定向研发           | 物资         |
| G     | 资金募集           | 物资         |
| B     | 数据收集           | 通关主线     |
| C     | 基础研究           | 无           |
| E     | 试验品募集         | 分解装备     |
| T     | 研究委托           | 进行委托     |

- 定向研发中的舰船稀有度，DR 表示彩科研船，PRY 表示金科研船。

```text
DR|PRY
```

- 定向研发中的舰船名称

### S1|一期

| Name       | 舰娘名称 |
| ---------- | -------- |
| Neptune    | 海王星   |
| Monarch    | 君主     |
| Ibuki      | 伊吹     |
| Izumo      | 出云     |
| Roon       | 罗恩     |
| SaintLouis | 路易九世 |

### S2|二期

| Name      | 舰娘名称   |
| --------- | ---------- |
| Seattle   | 西雅图     |
| Georgia   | 佐治亚     |
| Kitakaze  | 北风       |
| Azuma     | 吾妻       |
| Friedrich | 腓特烈大帝 |
| Gascogne  | 加斯科涅   |

### S3|三期

| Name      | 舰娘名称 |
| --------- | -------- |
| Champagne | 香槟     |
| Cheshire  | 柴郡     |
| Drake     | 德雷克   |
| Mainz     | 美因茨   |
| Odin      | 奥丁     |

### S4|四期

| Name      | 舰娘名称 |
| --------- | -------- |
| Anchorage | 安克雷奇 |
| Hakuryu   | 白龙     |
| Agir      | 埃吉尔   |
| August    | 奥古斯特 |
| MarcoPolo | 马可波罗 |

### S5|五期

| Name      | 舰娘名称   |
| --------- | ---------- |
| Plymouth  | 普利茅斯   |
| Rupprecht | 普鲁雷希特 |
| Harbin    | 哈尔滨     |
| Chkalov   | 契卡洛夫   |
| Brest     | 布雷斯特   |

### S6|六期

| Name       | 舰娘名称          |
| ---------- | ----------------- |
| Kearsarge  | 奇尔沙治          |
| Shimanto   | 四万十            |
| Schultz    | 弗郎西斯卡·舒伯特 |
| Hindenburg | 兴登堡            |
| Flandre    | 弗兰德尔          |

### S7|七期

| Name     | 舰娘名称         |
| -------- | ---------------- |
| Napoli   | 那不勒斯         |
| Nakhimov | 纳希莫夫海军上将 |
| Halford  | 哈尔福德         |
| Bayard   | 贝亚德           |
| Daisen   | 大山             |

## Duration

科研项目的时长，单位小时，整数或是小数

```text
\d.\d|\d\d?
```

## 内置名称

- `reset` 刷新科研列表。刷新后 Alas 将重新识别科研项目，并返回过滤器的头部重新查找。如果当天的刷新次数耗尽， Alas 将跳过 `reset`。
- `shortest` 时长最短的科研，相当于 `0.5 > 1 > 1.5 > 2 > 2.5 > 3 > 4 > 5 > 6 > 8 > 10 > 12`
- `cheapest` 消耗最低的科研，相当于 `Q1 > Q2 > T3 > T4 > Q4 > C6 > T6 > C8 > C12 > G1.5 > D2.5 > G2.5 > D5 > Q0.5 > G4 > D8 > H1 > H2 > H0.5 > D0.5 > H4`

注意：shortest 和 cheapest 必然会选择一个科研项目，在它们之后的内容将不会被执行。因此，建议科研过滤器以 `> reset > shortest ` 或 `> reset > cheapest  ` 结尾，以保证充分利用刷新和防止空选。

## 例子

内置过滤器：

- 五期仅 152 且切魔方

```text
S5-Q0.5 > S5-DR0.5 > S5-PRY0.5 > Q0.5 > S5-Q4 > S5-Q2 > S5-Q1 > 0.5
> S5-E-315 > S5-G1.5 > S5-G4 > Q1 > reset > S5-H1 > H1 > 1 > S5-E-031
> S5-DR2.5 > S5-PRY2.5 > S5-G2.5 > G1.5 > 1.5 > Q2 > E2 > S5-H2 > H2
> 2 > DR2.5 > PRY2.5 > G2.5 > 2.5 > S5-DR5 > S5-PRY5 > Q4 > G4
> S5-H4 > H4 > 4 > S5-C6 > DR5 > PRY5 > 5 > S5-DR8 > S5-PRY8 > S5-C8
> C6 > 6 > S5-C12 > DR8 > PRY8 > C8 > 8 > C12 > 12
```

- 五期仅蓝图且切魔方

```text
S5-DR0.5 > S5-PRY0.5 > S5-H0.5 > S5-H1 > S5-H2 > S5-DR2.5 > S5-DR5
> 0.5 > S5-DR8 > reset > S5-H4 > S5-Q1 > Q1 > H1 > 1 > S5-G1.5 > G1.5
> 1.5 > S5-G2.5 > S5-Q2 > S5-E-315 > S5-E-031 > Q2 > E2 > H2 > 2
> S5-PRY2.5 > S5-G4 > DR2.5 > PRY2.5 > G2.5 > 2.5 > S5-Q4 > Q4 > G4
> H4 > 4 > S5-PRY5 > S5-PRY8 > S5-C6 > DR5 > PRY5 > 5 > C6 > 6
> S5-C8 > S5-C12 > DR8 > PRY8 > C8 > 8 > C12 > 12
```
