# 战术学院过滤器

## 属性

```text
{genre}-{tier}
```

## Genre

技能书类型。`same` 表示与要学的技能的类型相同的教材（使用可获得 150% 的技能经验）。

```text
Red|Blue|Yellow|Same
```

## Tier

技能书等级

```text
T[123]
```

## 内置名称

- `first` 第一本教材。

## 例子

- 默认的战术学院过滤器

```text
SameT3 > SameT2 > SameT1
> BlueT2 > YellowT2 > RedT2
> BlueT3 > YellowT3 > RedT3
> BlueT1 > YellowT1 > RedT1
> first
```