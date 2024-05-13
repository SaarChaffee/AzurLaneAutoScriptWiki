# GUI 配置

这里介绍 Alas 的 GUI 的设置生成，以及如何在代码中使用它们。修改 Alas 的选项不需要具备前端知识，因为 GUI 中的选项是靠 json 生成的。

下面的文件均在 module/config 中，为了防止路径过长，会省略 module/config。

## 选项生成

GUI 中选项储存在 argument/args.json 中，它有 3 个层级。

- 任务（task）：每个任务可以包含多个选项组。
- 选项组（group）：每个选项选项组可以包含选项。
- 选项（argument）：每个选项会有以下属性：

| 属性名   | 备注                                 |
| -------- | ------------------------------------ |
| type     | 类型                                 |
| value    | 值                                   |
| option   | （可选）下拉菜单列表中的元素         |
| validate | （可选）校验类型，比如时间格式的校验 |
| display | （可选）显示类型，比如禁止更改或在界面上隐藏 |

args.json 是由 config_updater.py 生成的，每次修改选项后，都应该运行 config_updater.py 来生成，而不是手动修改 args.json。

需要开发者手动编写的有：

- task.yaml：定义每个任务所包含的选项组
- argument.yaml：定义每个选项组包含的选项，以及每个选项的属性
- override.yaml：覆盖某些特殊选项的值，比如硬编码服务器刷新时间
- gui.yaml：定义 GUI 上会出现的其他文本

由 config_updater.py 自动生成的文件有：

- args.json：用于生成 GUI
- menu.json：生成 GUI 侧边栏的任务卡组
- config_generated.py：提供 IDE 的代码自动提示
- template.json：默认用户设置
- i18n/{lang}.json：翻译文件

完整生成流程以 config_updater.py 末尾的注释为准。

```sh
                 task.yaml -+----------------> menu.json
             argument.yaml -+-> args.json ---> config_generated.py
             override.yaml -+       |
                  gui.yaml --------\|
                                   ||
    (old) i18n/<lang>.json --------\\========> i18n/<lang>.json
    (old)    template.json ---------\========> template.json
```

## 新增选项

假设我们需要新增一个选项：`每天购买 X 个指挥喵`，它位于 `指挥喵` 任务中的 `指挥喵` 选项组中。

在 argument/argument.yaml 中定义选项组 `指挥喵（Meowfficer）` 和选项 `每天购买 X 个指挥喵（BuyAmount）`：

```yaml
Meowfficer:
  BuyAmount:
    type: input
    value: 1
```

在这里填写的值（value）将成为选项默认值。

#### 选项定义的简写

你也可以只填写默认值，这是非常方便的：

```yaml
Meowfficer:
  BuyAmount: 1
```

经过 config_updater.py 生成，将得到：

```json
"Meowfficer": {
    "BuyAmount": {
        "type": "input",
        "value": 1
    }
}
```

config_updater.py 将会根据默认值的数据类型生成 `选项类型（type）`，生成规则如下，实际以 `data_to_type()` 函数为准：

| 选项                          | type     |
| ----------------------------- | -------- |
| 默认值为 bool                 | checkbox |
| 选项的定义含有 _options_ 属性 | select   |
| 选项名称包含 `Filter`         | textarea |
| 其余全部                      | input    |

#### 覆盖自动生成的属性

另外，手动填写的属性会优先于自动生成的属性。比如按照上面的定义，选项 `每天购买 X 个指挥喵（BuyAmount）` 的 `选项类型（type）` 应该是 `input`，你但也可以强行指定 `type` 为 `textarea`：

```yaml
Meowfficer:
  BuyAmount:
    type: textarea
    value: 1
```

#### 传递特殊属性

除了 type、value、option、validate 这几个基本属性外，你还可以定义其他属性：

```yaml
Meowfficer:
  BuyAmount:
    something_special: 100
    value: 1
```

其他属性会被复制到 args.json 中：

```json
"Meowfficer": {
    "BuyAmount": {
        "type": "input",
        "value": 1,
        "something_special": 100
    }
}
```

## 新增任务

假设我们需要新增一个任务：`指挥喵（Meowfficer）`

在 argument/task.yaml 中定义任务所包含的选项组，一个任务应当包含 `调度器设置（Scheduler）`

```yaml
Meowfficer:
  - Scheduler
  - Meowfficer
```

#### 任务调度优先级

修改 config_manual.py 中的 `SCHEDULER_PRIORITY` 值，将 Meowfficer 插入其中。

SCHEDULER_PRIORITY 是一个过滤器，用大于号 `>` 连接任务，靠前的任务会先被调度器执行。基本的任务排序规则是：重启 > 收菜类 > 每日收获类 > 每日出击类 > 正常出击类 > 纯消磨时间类。为防止用户盲目地把自己想运行的任务放到前面，导致收菜类任务被延迟，SCHEDULER_PRIORITY 不会暴露到 GUI 中，需要开发者手动编写。

#### 运行任务

在根目录下的 alas.py AzurLaneAutoScript 类中添加任务的函数

```python
def meowfficer(self):
    from module.meowfficer.meowfficer import RewardMeowfficer
    RewardMeowfficer(config=self.config, device=self.device).run()
```

## 覆盖选项

在 argument/override.yaml 中覆盖一些选项，比如硬编码任务 `大舰队（Guild）` 的服务器刷新时间。

```yaml
Guild:
  Scheduler:
    SuccessInterval: 30
    FailureInterval: 30
    ServerUpdate: 00:00, 06:00, 12:00, 18:00, 21:00
```

选项被覆盖后，不会出现在 GUI 中。

## 调用选项

在 argument/argument.yaml 中定义的选项，会以 `{group}_{argument}` 的格式生成于 config_generated.py 中。

Alas 会绑定 config_generated.py 中的变量与用户设置中的值，例如在任务 `指挥喵（Meowfficer）` 中，根据 task.yaml 中的定义，绑定了选项组 `调度器设置（Scheduler）` 和 `指挥喵（Meowfficer）`。这个绑定是双向的和自动的。

#### 访问用户设置

访问刚刚添加的选项 `每天购买 X 个指挥喵（BuyAmount）` ：

```python
print(self.config.Meowfficer_BuyAmount)
# 1
```

修改这个变量的值，Alas 也会同步修改用户配置中的值：

```python
self.config.Meowfficer_BuyAmount = 15
```

```sh
INFO     23:54:29.501 │ Save config ./config\alas.json,
         Meowfficer.Meowfficer.Meowfficer_BuyAmount=15
```

如果要修改多个变量，应该使用 `multi_set()`，这只会触发一次文件保存：

```python
with self.config.multi_set():
    self.config.Meowfficer_BuyAmount = 15
    self.config.Meowfficer_FortChoreMeowfficer = True
```

```sh
INFO     23:57:15.458 │ Save config ./config\alas.json,
         Meowfficer.Meowfficer.BuyAmount=15,
         Meowfficer.Meowfficer.FortChoreMeowfficer=True
```

#### 访问未绑定的用户设置

一般来说，一个任务只需要访问它下属的选项组，不需要访问其他任务的选项。

比如任务 `指挥喵（Meowfficer）` 中并未包含选项组 `出击设置（Campaign）`，访问这些选项得到的将是默认值，修改它也不会同步到用户设置中。

```python
print(self.config.Campaign_Name)
```

```sh
7-2
```

但如果确实有需要，比如大世界，可以通过 `self.config.data` 访问完整的用户设置。

```python
from datetime import datetime
from module.config.utils import deep_get, deep_set
# 获取任务 隐秘海域(OpsiObscure) 的下一次运行时间
value = deep_get(self.config.data, keys='OpsiObscure.Scheduler.NextRun', default=datetime(2020, 1, 1, 0, 0))
# 修改任务 隐秘海域(OpsiObscure) 的下一次运行时间
self.config.modified['OpsiObscure.Scheduler.NextRun'] = datetime(2022, 2, 21, 19, 32)
# 保存
self.config.update()
```

#### 覆盖用户设置

强制地并在当前任务下永久地覆盖某些设置，但不会写入用户设置中

```python
self.config.override(
    Submarine_Fleet=1,
    Submarine_Mode='every_combat'
)
```

临时地覆盖某些用户设置

```python
backup = self.config.temporary(Campaign_UseAutoSearch=True)
```

然后回退

```python
backup.recover()
```

## 增加翻译

在 i18n/{lang}.json 下是翻译文件，每个任务、选项组和选项都会有名称（name）和帮助（help）两个属性。未添加翻译的条目默认是选项的路径。

```json
"Meowfficer": {
    "BuyAmount": {
        "name": "Meowfficer.BuyAmount.name",
        "help": "Meowfficer.BuyAmount.help"
    }
}
```

你可以在 GUI 的侧边栏 - 开发 - 翻译 处修改它。

注意：Alas 没有专人负责翻译，所以谁添加了选项，谁就负责全语言的翻译。

#### 更好地命名选项

Alas 希望选项翻译更接近自然语言，使得选项名称和选项值连起来能成为一个完整句子，比如这里是 `每天购买 X 个指挥喵` 而不是 `猫箱购买数量：X`。这似乎有些怪怪的，但 `每月 X 号后，不再开启新的大舰队作战` 会比 `大舰队作战开启阈值：X` 更容易理解。
