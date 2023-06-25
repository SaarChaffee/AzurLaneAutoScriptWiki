# 过滤器

Alas 使用过滤器来选择游戏内容，例如使用 `Q-0.5 > Drake-0.5 > D-2.5 > reset > shortest` 来选择科研项目。过滤器给予用户极大的自由来设置 Alas，同时在面对复杂情况时会比权重和优先级更直观和更便于理解。

Alas 会从左到右从上到下地选择过滤项。如果没有符合要求的，则什么都不做。详细规则请参阅[过滤器规则](../../usage/alas/filter/#过滤器规则)。


## 委托过滤器
:::danger
此项强制启用，不要试图关闭。
:::
在 Alas 界面中，点击左边任意的 Alas 实例配置，然后在功能区点击 收获 展开子菜单，点击 委托 进入界面。

![](/manual/quick-start/filter/goto_commission.png)

:::warning
如果对委托的产出和收益没有足够的了解，不建议编写自定义过滤器，建议使用预优化委托过滤器。如果24小时运行刷紧急委托功能，应当使用（7x24刷委托）的过滤器。
:::
指挥官大于100级用户委托过滤器默认选择 `钻石>魔方>石油`。

详细过滤项请参阅[委托过滤器](../../usage/alas/filter/commission-filter)。

<details>
<summary>购买LV70级直升包的用户需要注意这里面的内容</summary>
在之类会遇到第一个问题，那就是指挥官等级过高，导致委托需求更改，而自身又没有高级的船，无法进行委托。这里提供几个临时解决办法：

1. 使用你能想到的任何办法，尽快度过新手期，有15-20个100级后，基本可以避免这个情况。

2. 清除你的所有的困难图阵容、清除你的所有的大世界阵容、清除你的所有的演习阵容（他们被占用、委托不会自动选择）。

3. 使用临时更改的委托过滤器，暂时去掉几个高等级的过滤器。

```text
DailyEvent > Gem-4 > Gem-2 > Gem-8 > ExtraCube-0:30
> UrgentCube-1:30 > UrgentCube-1:45 > UrgentCube-3
> ExtraDrill-5:20 > ExtraDrill-2 > ExtraDrill-3:20
> UrgentCube-2:15 > UrgentCube-4
> ExtraDrill-1 > UrgentCube-6 > ExtraCube-1:30
> ExtraDrill-2:40 > ExtraDrill-0:20
> Major >
> ExtraPart-0:30 > ExtraOil-1 > UrgentBox-6
> ExtraCube-3 > ExtraPart-1 > UrgentBox-3
> ExtraCube-4 > ExtraPart-1:30 > ExtraOil-4
> UrgentBox-1 > ExtraCube-5 > UrgentBox-1
> ExtraCube-8 > ExtraOil-8
> UrgentDrill-4 > UrgentDrill-2:40 > UrgentDrill-2
> UrgentDrill-1 > UrgentDrill-1:30 > UrgentDrill-1:10
> Extra-0:20 > Extra-0:30 > Extra-1:00 > Extra-1:30 > Extra-2:00
> shortest
```
复制并替换自定义委托过滤器中的内容，然后委托过滤器切换到自定义。

:::warning
这只是临时解决办法，有一定练度后一定要换回来，以免损失收益。
:::

![自定义委托](/manual/quick-start/filter/manual_commission.png)
</details>

## 科研过滤器
:::danger
此项强制启用，不要试图关闭。
:::

在 Alas 界面中，点击左边任意的 Alas 实例配置，然后在功能区点击 收获 展开子菜单，点击 委托 进入界面。

![](/manual/quick-start/filter/goto_research.png)

详细过滤项请参阅[科研过滤器](../../usage/alas/filter/research-filter)。

### 项目设置
当过滤器和其他设置一起工作时，Alas 会寻找同时满足所有用户设置的项目。

![](/manual/quick-start/filter/research_config.png)

- 对于萌新

四个项目设置 ，**不要去更改**，把下面的科研过滤器改成你希望做的就行，其余不要更改任何东西！

Alas 使用的全局毕业策略，全部蓝图同步毕业 + 彩装备X2。开发组考虑并且充分模拟过，所以请不要使用手操的思维来使用alas，用惯性去先优先做某个船，这样会很蠢，而且速度也比不过alas。

- 对于攻略组 （彩装备）

条件过滤器，请改为三总是。

把科研过滤器改成你希望做的装备。


- 对于攻略组 （某项蓝图）

条件过滤器，请改为三总是。

阅读[科研过滤器](../../usage/alas/filter/research-filter)，并且实际运行 Alas 路径下的模拟器跑过以后，把下面的科研过滤器改成自定义过滤器后使用。


## 战术学院过滤器

在 Alas 界面中，点击左边任意的 Alas 实例配置，然后在功能区点击 收获 展开子菜单，点击 战术学院 进入界面。

![](/manual/quick-start/filter/goto_tactical.png)

### 过滤器

详细过滤项请参阅[战术学院过滤器](../../usage/alas/filter/tactical-filter)。

如果不希望使用彩书，仅需要把含有的T4过滤项删掉即可。

```diff
- SameT4 > SameT3 > SameT2 > SameT1
+ SameT3 > SameT2 > SameT1
  > BlueT2 > YellowT2 > RedT2
  > BlueT3 > YellowT3 > RedT3
- > BlueT4 > YellowT4 > RedT4
  > BlueT1 > YellowT1 > RedT1
  > first
```
#### 使用快速学习
选择一个角色，在活动开启期间，自动选择快速技能学习。

### 溢出经验控制
不建议更改。当下一次使用经验书会溢出经验时，会自动选择溢出经验最少的经验书。

### 学习新技能
打开后，当战术学院有空余的位置时，将自动指派一个舰娘，并学习第一个未满级的技能。

## 商店过滤器
:::tip
此部分要求有一定的游戏理解，否则不需要关注。
:::
请参阅[商店过滤器](../../usage/alas/filter/shop-filter)。