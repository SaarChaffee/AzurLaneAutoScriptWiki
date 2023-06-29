# 装饰器

这里介绍 module/base/decorators.py 下的装饰器。

## @Config.when()

让一个函数在特定的设置情况下运行，常用于同一函数在不同服务器间的切换。需要实例拥有 config 属性，且为 AzurLaneConfig 对象。任何继承 ModuleBase 的类都可以使用这个装饰器。

当指定的属性值为 None 时，表示任何情况下均可运行。它的定义应后于其他函数，也就是这个函数要写在最下面。当 config 中的值不满足任何一个装饰器的要求时，显示 warning，并运行最后一个定义的函数.

```python
from module.base.decorator import Config
from module.base.base import ModuleBase

class AnotherModule(ModuleBase):
    @Config.when(SERVER='en')
    def function(self):
        # 此方法将仅在 EN 服务器中调用
        pass

    @Config.when(SERVER=None)
    def function(self):
        # 此方法将在其他服务器中调用
        pass
```

选择的属性不仅限于 SERVER，可以是 AzurLaneConfig 中的任何属性：

```python
# module/config/config.py
DEVICE_CONTROL_METHOD = 'uiautomator2'  # ADB, uiautomator2, minitouch
```

```python
@Config.when(DEVICE_CONTROL_METHOD='minitouch')
    def _commission_swipe(self, distance=190):
        pass

@Config.when(DEVICE_CONTROL_METHOD=None)
    def _commission_swipe(self, distance=300):
        pass
```

也可以选择一个或多个属性：

```python
@Config.when(POOR_MAP_DATA=True, MAP_CLEAR_ALL_THIS_TIME=False)
    def battle_function(self):
        pass

@Config.when(MAP_CLEAR_ALL_THIS_TIME=True)
    def battle_function(self):
        pass

@Config.when(MAP_CLEAR_ALL_THIS_TIME=False, POOR_MAP_DATA=False)
    def battle_function(self):
        pass
```

## @cached_property

缓存属性。用 cached_property 装饰的类属性，只会计算一次。来自 [cached_property](https://github.com/pydanny/cached-property)。

```python
@cached_property
def bug_threshold(self):
    return random_normal_distribution_int(55, 105, n=2)
```

```python
self.bug_threshold
self.bug_threshold
```

```sh
87
87
```

重新计算属性：

```python
del self.__dict__['bug_threshold']
self.bug_threshold
```

```sh
74
```

## @timer

打印函数运行的耗时，这个装饰器在 module/base/timer.py 里。精度约 0.5ms，在调试使用。

```python
@timer
def do_something():
    pass
```

```python
do_something()
do_something: 0.123456789 s
```

## @function_drop(rate=0.5, default=None)

随机执行或者不执行某个函数，可以在测试中模拟模拟器卡顿。
