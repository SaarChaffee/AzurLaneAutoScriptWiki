# 委托过滤器

## 属性

```text
{category}-{genre}-{duration}
```

## Category

这里指的是委托的总类别，主要委托（1000油/1200油），每日委托，额外委托（10个每日做完之后出现的），紧急委托，夜间委托

```text
Major|Daily|Extra|Urgent|Night
```

## Genre

委托类型

```text
Resource|Chip|Event|Drill|Part|Cube|Oil|Book|Retrofit|Box|Gem|Ship
```

**Major** 主要委托（1000油/1200油）

**Daily** 每日委托

- Resource 日常资源开发
- Chip 高阶战术研发
- Event 活动委托（某些活动期间才有的委托，不占用同时进行委托的上限）

**Extra** 额外委托（10个每日做完之后出现的）

- Part 部件类
- Drill 钻头类
- Book 教材类
- Oil 石油类
- Cube 魔方类

**Urgent** 紧急委托

- Part 部件类
- Drill 钻头类
- Book 教材类
- Box 装备箱类
- Cube 魔方类
- Gem 钻石类
- Ship 观舰类

**Night** 夜间委托

- Part 部件类
- Drill 钻头类
- Book 教材类
- Oil 石油类
- Cube 魔方类

## Duration

委托时长，以下两种格式中的一种：

- 单位小时，整数或者小数。时长除不尽的时候，仅取前两位，例如时长 `1:10:00` 就是 `1.16`，时长 `2:40:00` 就是 `2:66`，时长 `1:30:00` 就是 `1.5`。，时长 `12:00:00` 就是 `12`。

```text
\d\d?.\d\d?|\d\d?
```

- `{hh}:{mm}`。例如时长 `1:10:00` 就是 `1:10`，时长 `2:40:00` 就是 `2:40`。

```text
\d\d?:\d\d
```

## 内置名称

- `shortest` 每日委托列表中，时长最短的委托。注意，是 **每日** 的列表，因为只有每日列表才会无限刷新。对于紧急列表中未被过滤器选择的委托，Alas 会任由它们过期。 

```text
0:30
> 1 > 1:10 > 1:20 > 1:30 > 1:40 > 1:45
> 2 > 2:15 > 2:30 > 2:40
> 3 > 3:20
> 4 > 5 > 5:20
> 6 > 7 > 8 > 9 > 10 > 12
```

## 例子

- 默认的委托过滤器

```text
DailyEvent
> Gem-8 > Gem-4 > Gem-2
> Box-6 > Box-3 > Box-1
> DailyCube-0:30 > UrgentCube-1:30 > DailyCube-1:30 > UrgentCube-1:40 > UrgentCube-2:15
> UrgentCube-3 > DailyCube-3 > UrgentCube-4 > UrgentCube-6
> Major
> DailyRescource > DailyChip
> UrgentBook-2:30 > UrgentBook-2 > UrgentBook-1:20 > UrgentBook-1:40
> Daily-0:20 > Daily-0:30 > Daily-1:00 > Daily-1:30 > Daily-2:00
> NightOil > NightCube
> shortest
```
