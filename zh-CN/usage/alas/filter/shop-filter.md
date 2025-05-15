# 商店过滤器

## 选择商品

### 军火商

| 过滤项 | 描述         |
| ------ | ------------ |
| Box    | 科技箱       |
| Book   | 舰艇教材     |
| Food   | 后宅食物     |
| Plate  | 强化部件     |
| Cube   | 魔方         |
| Drill  | 快速完成工具 |

### 舰队商店

| 过滤项   | 描述       |
| -------- | ---------- |
| Box      | 科技箱     |
| Book     | 舰艇教材   |
| Food     | 后宅食物   |
| Plate    | 强化部件   |
| Retrofit | 改造图纸   |
| PR       | 金定向蓝图 |
| Cat      | 喵箱       |
| Chip     | 心智单元   |

### 兑换商店

| 过滤项          | 描述       |
| --------------- | ---------- |
| Book            | 舰艇教材   |
| Food            | 后宅食物   |
| Plate           | 强化部件   |
| Retrofit        | 改造图纸   |
| PR              | 金定向蓝图 |
| DR              | 彩定向蓝图 |
| Bulin           | 布里       |
| SpecializedCore | 特装原型   |

### 军需商店

| 过滤项 | 描述   |
| ------ | ------ |
| Box    | 科技箱 |
| Bulin  | 布里   |
| Cube   | 魔方   |

### 核心商店

| 过滤项  | 描述       |
| ------- | ---------- |
| Chip    | 心智单元   |
| Array Ⅱ | 心智单元 Ⅱ |

### 大世界特别兑换商店（白票商店）

| 过滤项       | 描述         |
| ------------ | ------------ |
| Book         | 舰艇教材     |
| Coin         | 物资         |
| HECombatPlan | 高效作战指令 |
| Logger       | 坐标记录仪   |
| Tuning       | 效能样本     |

### 大世界港口商店

| Expression                     | 描述                 |
| ------------------------------ | -------------------- |
| ActionPoint                    | 能源补给箱（行动力） |
| CrystallizedHeatResistantSteel | 结晶化热强钢         |
| DevelopmentMaterial            | 装备研发物资箱       |
| EnergyStorageDevice            | 塞壬能源储存容器     |
| GearDesignPlan                 | 装备研发图纸         |
| GearPart                       | 装备突破部件         |
| Logger                         | 坐标记录仪           |
| METARedBook                    | META 通用战术教材    |
| NanoceramicAlloy               | 纳米陶铝合金         |
| NeuroplasticProstheticArm      | 可塑性机械臂         |
| OrdnanceTestingReport          | 实验计划             |
| PlateRandom                    | 未知装备部件         |
| PurpleCoins                    | 特别兑换凭证（紫币） |
| RepairPack                     | 维修箱               |
| SupercavitationGenerator       | 超空泡发生器         |
| Tuning                         | 效能样本             |

## 选择种类及稀有度

### 种类

:::warning
不支持在舰队商店过滤字符串中指定科技箱、教材、强化部件、改造图纸的种类。使用不带种类的字符串，然后在其对应的下拉框中选择种类。
:::

| Box 类 | 描述             |
| ------ | ---------------- |
| `Box`  | 任意类型的科技箱 |

| Book 类      | 描述           |
| ------------ | -------------- |
| `Book`       | 任意类型的教材 |
| `BookRed`    | 红书           |
| `BookBlue`   | 蓝书           |
| `BookYellow` | 黄书           |

| Plate 类       | 描述               |
| -------------- | ------------------ |
| `Plate`        | 任意类型的强化部件 |
| `PlateGeneral` | 通用部件           |
| `PlateGun`     | 主炮部件           |
| `PlateTorpedo` | 鱼雷部件           |
| `PlateAntiair` | 防空炮部件         |
| `PlatePlane`   | 舰载机部件         |
| `PlateRandom`  | 未知装备部件       |

| Retrofit 类  | 描述           |
| ------------ | -------------- |
| `Retrofit`   | 任意类型的教材 |
| `RetrofitDD` | 驱逐改造图纸   |
| `RetrofitCL` | 巡洋改造图纸   |
| `RetrofitBB` | 战列改造图纸   |
| `RetrofitCV` | 航母改造图纸   |

| Logger 类       | 描述                 |
| --------------- | -------------------- |
| `Logger`        | 任意类型的坐标记录仪 |
| `LoggerAbyssal` | 塞壬坐标记录仪       |
| `LoggerObscure` | 海域坐标记录仪       |

| Tuning 类              | 描述               |
| ---------------------- | ------------------ |
| `Tuning`               | 任意类型的效能样本 |
| `TuningCombat`         | 强力效能样本-攻击  |
| `TuningOffense`        | 强力效能样本-耐久  |
| `TuningSurvival`       | 强力效能样本-恢复  |
| `TuningSampleCombat`   | 效能样本-攻击      |
| `TuningSampleOffense`  | 效能样本-耐久      |
| `TuningSampleSurvival` | 效能样本-恢复      |

### 稀有度

:::tip
在商品后添加 T[Tier] 可以指定稀有度。其中，兑换商店中的 深海潜航新手装备箱 是 BoxT1。
:::

| Item                  | 可用的稀有度                                       | 示例                                                 |
| --------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| ActionPoint           | `20, 50, 100`                                      | `ActionPoint20`, `ActionPoint100`                    |
| Book                  | `1-3`(General), `2-3`(Guild, Medal), `4` (Voucher) | `BookT3`, `BookRedT3`                                |
| Box                   | `1-4`(General, Merit), `3-4`(Guild), `1`(Medal)    | `BoxT1`, `BoxT4`                                     |
| Bulin                 | `1-2`(Medal, Merit)                                | `BulinT1`, `BulinT2`                                 |
| DevelopmentMaterial   | `1-3`                                              | `DevelopmentMaterialT1`, `DevelopmentMaterialT3`     |
| Food                  | `1, 2, 4-6`(General), `4-6`(Guild)                 | `FoodT1`, `FoodT6`                                   |
| GearDesignPlan        | `2, 3`                                             | `GearDesignPlanT2`, `GearDesignPlanT3`               |
| Logger                | `5-6`(Voucher)                                     | `LoggerT5`, `LoggerT6`                               |
| METARedBook           | `1, 2`(Voucher)                                    | `METARedBookT1`, `METARedBookT2`                     |
| OrdnanceTestingReport | `1-3`                                              | `OrdnanceTestingReportT1`, `OrdnanceTestingReportT3` |
| Plate                 | `1-3`(General), `2-4`(Guild)                       | `PlateT4`, `PlateGeneralT3`                          |
| PlateRandom           | `4`                                                | `PlateRandomT4`                                      |
| Retrofit              | `1-3`(Medal), `2-3`(Guild)                         | `RetrofitT3`, `RetrofitDDT3`                         |
| Retrofit              | `1-3`(Medal), `2-3`(Guild)                         | `RetrofitT3`, `RetrofitDDT3`                         |
| Tuning                | `Tuning`(Voucher), `TuningSample`(Voucher)         | `TuningCombat` ,`   TuningSampleCombat`              |

### 科研蓝图

:::warning
舰队商店中只支持 `PRS1`, `PRS2`, `PRS3` 和 `PR`，然后在对应的下拉框中选择舰船
:::

| 过滤项           | 描述           |
| ---------------- | -------------- |
| `PR`             | 金定向蓝图     |
| `DR`             | 彩定向蓝图     |
| `PRS1`           | 一期金定向蓝图 |
| `PRS2`           | 二期金定向蓝图 |
| `PRS3`           | 三期金定向蓝图 |
| `DRS1`           | 一期彩定向蓝图 |
| `DRS2`           | 二期彩定向蓝图 |
| `DRS3`           | 三期彩定向蓝图 |
| `PRNeptuneS1`    | 海王星         |
| `PRMonarchS1`    | 君主           |
| `PRIbukiS1`      | 伊吹           |
| `PRIzumoS1`      | 出云           |
| `PRRoonS1`       | 罗恩           |
| `PRSaintLouisS1` | 路易九世       |
| `PRSeattleS2`    | 西雅图         |
| `PRGeorgiaS2`    | 佐治亚         |
| `PRKitakazeS2`   | 北风           |
| `DRAzumaS2`      | 吾妻           |
| `DRFriedrichS2`  | 腓特烈大帝     |
| `PRGascogneS2`   | 加斯科涅       |
| `PRChampagneS3`  | 香槟           |
| `PRCheshireS3`   | 柴郡           |
| `DRDrakeS3`      | 德雷克         |
| `PRMainzS3`      | 美因茨         |
| `PROdinS3`       | 奥丁           |

## 创建过滤字符串

用大于号 `>` 连接商品, 比如

```text
Cube > PlateGeneralT3 > PlateT3 > FoodT6 > Food > BoxT3
```

Alas 会从左到右地选择商品进行购买。如果没有商品符合要求，则什么都不做。

## 过滤字符串示例

### 军火商

```text
Cube > BookRedT3 > BookYellowT3 > FoodT6 > FoodT5 > PlateGeneralT3
```

### 舰队商店

```text
PlateT4 > BookT3 > PRBP > CatT3 > Chip > Retrofit > FoodT6 > FoodT5 > CatT2 > BoxT4
```

### 兑换商店

```text
DRBP > PRBP > BookRed > BookYellow > Bulin > RetrofitT3 > PlateGeneralT3 > Food
```

### 军需商店

```text
Cube > Bulin > BoxT3
```

### 核心商店

```text
Chip > Array
```

### 大世界特别兑换商店（白票商店）

```text
LoggerAbyssal > LoggerObscure > HECombatPlan > Tuning > Book > Coin
```

### 大世界港口商店过滤器

```text
ActionPoint > DevelopmentMaterialT3 > GearDesignPlan > GearPart > Logger > OrdnanceTestingReport > PlateRandom
```
