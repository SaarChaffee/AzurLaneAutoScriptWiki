# 过滤器

## 过滤器规则

- 用大于号 `>` 连接每一个选择（selection），`>` 两端的空格是可选的。例如 `selection1 > selection2 > selection3`。

  Alas 将从前到后地查找符合选择要求的项目，一旦找到符合要求的项目，停止向后查找。当查找至末端时，仍未有符合要求的项目，Alas 什么也不会选择。

- 每个选择（selection）内用横杠 `-` 连接需要选择的属性（property）。`-` 是可选的，属性不区分大小写，属性也是可选的，并且可以自由组合，但你需要选择至少一项属性。例如 `Property1-Property2-Property3`，`property1property3`。

  横杠、大小写和大于号两端的空格的作用只是方便阅读，换行也是允许的。Alas 使用正则表达式解析用户编写的过滤器，如果某个选择解析失败，将跳过这个选择。

- 存在一些内置名称（build-in names）可作为选择（selection）使用。例如科研过滤器中内置的 `shortest` 代表时长最短的科研。

- 当过滤器和其他设置一起工作时，Alas 会寻找同时满足所有用户设置的项目。例如，你设置科研过滤器是 `H1 > D2.5 > shortest` （包含消耗魔方的科研），但又设置了不允许消耗魔方，最终的结果是 Alas 不会选择消耗魔方的科研。

  当你突然想切魔方的时候，只需打开消耗魔方，而不需要修改过滤器，这是比较方便的。

## 例

- 在科研项目中选择任意 0.5 小时舰装解析，0.5 小时德雷克定向研发，任意 2.5 小时定向研发，刷新科研列表，时长最短的科研。`Q-0.5 > Drake-0.5 > D-2.5 > reset > shortest`
- 在委托列表选择 8 小时钻石委托，6 小时装备委托，任意每日委托，8 小时夜间石油委托，任意额外石油委托。`gem-8 > box-6 > daily > night-oil-8 > extra-oil`
