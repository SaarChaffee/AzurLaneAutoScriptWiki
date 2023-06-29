# 多服务器支持

## 设置服务器

这段代码所设置的服务器，将在全局生效。未设置服务器时，默认为 `cn`。

可以设置的服务器有 `cn`，`en`，`jp`，`tw`。

```python
import module.config.server as server
server.server = 'cn'  # 此处修改为你的服务器。
```

:::warning
你需要在导入任意 Alas 模块之前设置服务器。在模块导入时，就会读取服务器设置，如果服务器设置晚于模块导入，设置不生效。
:::

使用例子：

```python
import numpy as np
from tqdm import tqdm

import module.config.server as server

server.server = 'cn'  # 此处修改为你的服务器。

from module.logger import logger
from module.statistics.battle_status import BattleStatusStatistics
from module.statistics.get_items import GetItemsStatistics
from module.statistics.utils import *
```

## 时区

一些用户可能不与服务器在同一时区，所以不能简单地使用本地时间或本地日期。

以下是一些服务器的时区：

| 服务器 | 时区 |
| ------ | -------- |
| CN     | UTC+8    |
| EN     | UTC-7    |
| JP     | UTC+9    |

在 module/config/config.py 类 AzurLaneConfig 中有处理时区的函数。

### get_server_timezone(self)

返回当前服务器的时区。

### get_server_last_update(self, since)

返回服务器上次刷新时，所对应的本地时间。这个时间可以直接与本地时间进行比较。`since` 是含有一个或多个元素的集合，表示服务器在一天内刷新的整点时间。

```python
# 2020-06-06 12:56:45 UTC+2
import module.config.server as server
server.server = 'en'
from module.config.config import AzurLaneConfig
cfg = AzurLaneConfig()
cfg.get_server_last_update(since=(0,))
```

```sh
2020-06-06 09:00:00
```

## 增加新的服务器支持

:::danger
此条目已弃用，不再维护。
:::

### GUI

Copy `./module/config/argparser.py` to `argparser_xx.py` and change the args.

Create a dictionary in `./module/config/dictionary.py` that translate your language to english.

Copy `alas_cn.py` to `alas_xx.py` and import `argparser_xx.py`. Then, edit server name.

> Format of .pyw file name: <sctipt*name>*<server_name>.pyw
>
> Script name is used to load ini file under `./config`, For example, alas_cn.pyw and alas_en.pyw both loads`./config/alas.ini`, but in different languages.

### Assets

Copy folder `./assets/cn` to `./assets/<your server>`, and replace the image. This will cost a lot of time to find, crop and test. Fortunately, if a image does not contain any charactors, it may works in all servers.

Add server name to dev_tools/button_extract.py `VALID_SERVER = ['cn', 'en', 'jp']`.

After replacing an image, don't forget to run `./dev_tools/button_extract.py`

### Class methods

Some method may be different in different servers. This decoractor is use to calls different function with a same name according to config (AzurLaneConfig instance).

```python
from module.base.decorator import Config
from module.base.base import ModuleBase

class AnotherModule(ModuleBase):
    @Config.when(SERVER='en')
    def function(self):
        # This method will be called only in EN server
        pass

    @Config.when(SERVER=None)
    def function(self):
        # This method will be called in other server
        pass
```

**OCR**

There area also some modules difficult to change: the commission module.

In `./module/reward/commission.py`, I use [cnocr](https://github.com/breezedeus/cnocr) to recognize commission name in chinese, it may not works well in other languages.
