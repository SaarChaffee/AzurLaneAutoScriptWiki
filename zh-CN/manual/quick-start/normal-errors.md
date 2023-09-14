# 常见错误

这里列举了一些常见的 Alas 错误。


## Alas 白屏 ([#876](https://github.com/LmeSzinc/AzurLaneAutoScript/issues/876))
由未知原因引起的问题. (~~Electron 特性~~)

可以尝试以下操作:
 - Ctrl + R 刷新
 - 打开 Alas 根目录下的 `console.bat` 或者任何命令行终端，运行命令 [`netsh winsock reset`](https://support.microsoft.com/zh-cn/windows/%E4%BF%AE%E5%A4%8D-windows-%E4%B8%AD%E7%9A%84%E4%BB%A5%E5%A4%AA%E7%BD%91%E8%BF%9E%E6%8E%A5%E9%97%AE%E9%A2%98-2311254e-cab8-42d6-90f3-cb0b9f63645f) 并重启电脑
 - 在 `config/deploy.yaml` 中禁用 reload ([`EnableReload: false`](https://github.com/LmeSzinc/AzurLaneAutoScript/blob/master/config/deploy.template.yaml#L88-L91))
 - 重装 Alas
 - 1. 打开位于 Alas 根目录下的 `console.bat`，键入 `python gui.py` 后回车
   2. 当出现 `Uvicorn running on http://0.0.0.0:22267 (Press CTRL+C to quit)` 时在浏览器中打开 http://127.0.0.1:22267
   3. 通过这种方式启动，使用 Alas 时不要关闭 `console.bat` 的窗口

## Alas 引导完成后闪退 ([#2481](https://github.com/LmeSzinc/AzurLaneAutoScript/issues/2481))
由未知原因引起的问题. (~~Electron 特性~~)

将会在未来某个版本修复。

目前已知的解决办法
 - 1. 打开位于 Alas 根目录下的 `console.bat`，键入 `python gui.py` 后回车
   2. 当出现 `Uvicorn running on http://0.0.0.0:22267 (Press CTRL+C to quit)` 时在浏览器中打开 http://127.0.0.1:22267
   3. 通过这种方式启动，使用 Alas 时不要关闭 `console.bat` 的窗口

<hr/>

 - 1. 打开 Alas 根目录下的 `\toolkit\WebApp` 文件夹，右键 `alas.exe` 创建桌面快捷方式. 回到桌面，右键刚刚创建的快捷方式，打开属性
   2. 在 `目标(T)` 的输入路径的最后面加上 ` --no-sandbox`，注意不要遗漏前面的空格
   3. 在 `起始位置(S)` 的输入框中，你会看到如 `D:\...\AzurLaneAutoScript\toolkit\WebApp` 的路径，删除 `\toolkit\WebApp`，确保路径只到 Alas 的根目录文件夹
   4. 通过这个快捷方式启动 Alas


![Desktop 2023 05 29 - 12 04 08 02 00_00_00-00_00_30~1](/manual/quick-start/errors/whitescreen1.gif)


![8867](/manual/quick-start/errors/whitescreen2.gif)


## 舰队心情不足导致无法继续出击 ([#1849](https://github.com/LmeSzinc/AzurLaneAutoScript/issues/1849))

以下情况会导致心情计算错误：

  - 手动玩过游戏，Alas 无法追踪。
  - 出击沉船扣 10 心情。
  - Alas 内设置与游戏内不符，例如设置了后宅二楼但是有一艘忘记放进二楼。
  - 多个任务之间共享同一个角色。

出现心情计算错误时需要：
- 在游戏内后宅查看心情最低的角色的心情值，手动填入 Alas 内的心情设置中。

![Not enough fleet emotions](/manual/quick-start/errors/201313401-1eed6178-bf4d-411d-950e-74ab6fbef1c6.png)

## 没有符合委托要求的角色导致无法开始委托 ([#2460](https://github.com/LmeSzinc/AzurLaneAutoScript/issues/2460))

这是游戏策划的问题: 高级委托在玩家有一艘100级船的时候就会推送，但委托又不能指派队伍中的角色。

避免这个问题有以下方式：

- 将更多的船提升到 100 级。
- 清空所有困难图编队，只保留每日困难打的困难图的编队。
- 清空活动 CD 图编队，只保留要打的图的编队。
- 清空共斗编队，限界挑战编队等特殊活动的编队（如果有的话）。

![](/manual/quick-start/errors/230404498-2b5a07d8-fd2f-4a32-a80a-4fec6a911dc8.png)
![](/manual/quick-start/errors/230404599-2ebb89bd-b8f5-4898-b255-99731c64336c.png)
## 月度开荒报错 ([#2511](https://github.com/LmeSzinc/AzurLaneAutoScript/issues/2511))

```shell

YYYY-MM-DDTHH:mm:ss.sssZ | WARNING | Zone [xxx|XXXX] locked，neighbouring zones may not have been explored

```

`XXXX` 附近的某个海域无法完成。这通常是因为没有按要求修改游戏设置，特别是 `自律时自动提交道具` 的选项，或者是海域内有模拟战未完成。解决办法：
- 修改 [游戏设置](../game/game-settings.md)。
- 将 `上一次完成的区域` 设置清空，重新运行即可。

# 以下部分问题已经过时，仅供参考

## 为什么Alas不运行

```shell

INFO | No task pending
INFO | Wait until 2021-10-27 21:10:54 for task `Commission`

```

因为 Alas 已经完成了所有任务，现在无事可干，只能等待委托科研等结束。

```shell

CRITICAL | No task waiting or pending
CRITICAL | Please enable at least one task

```

正如 log 里描述的，你需要开启至少一项任务才能开始运行。



## 为什么Alas卡在心情回复里

```shell

INFO | Click ( 507，457) @ C3
INFO | Combat preparation。
INFO | [Emotion recovered] 2020-06-26 23:42:00
INFO | [Emotion recovered] 2020-06-26 23:42:00
INFO | [Emotion recovered] 2020-06-26 23:42:00

```

因为Alas正在等待心情回复。

如果你认为这不是你希望的，请检查你的"心情设置". 如果你希望红脸出击，关掉"启用心情消耗"，并开启"无视红脸出击警告". 如果你手动调整了队伍，在 `心情设置` 中更新 `心情值`。

## 怎样同时运行主线图出击和收获


你不需要做任何操作，这是自动的

当你运行"主线图"，"活动图"，"共斗活动"的时候，Alas会根据设置，时不时地检查收获。



## 不支持从当前界面启动

```shell

INFO | <<< UI ENSURE >>>
INFO | Unknown ui page
INFO | Unable to goto page_main
WARNING | Starting from current page is not supported
WARNING | Supported page: ['page_main'，'page_campaign'，'page_fleet'，'page_exercise'，'page_daily'，'page_event'，'page_sp'，'page_mission'，'page_raid']
WARNING | Supported page: Any page with a "HOME" button on the upper-right

```

请检查你在启动Alas时的游戏界面。

Alas可以自动切换到需要的游戏界面，但是只允许在这些界面下启动: 主界面，出击，编队，演习，每日，活动，SP活动，任务领取，共斗活动. Alas也可以在右上角有"一键回港"按钮的界面下启动，游戏中大部分界面都有这个按钮，除了主界面本身，后宅，指挥喵。



## 为什么我打开另一个模拟器时Alas会断开连接

```shell

adb server version (36) doesn't match this client (41); killing..。

```


因为你有两个不同版本的ADB

不同版本的ADB之间会互相结束对方. 国产模拟器 (夜神模拟器，雷电模拟器，逍遥模拟器，MuMu模拟器) 都会使用自己的ADB，而不会使用配置在环境变量中的ADB. 所以当它们启动时，就会结束Alas正在使用的 adb.exe. 解决这个问题:

- 将模拟器中的ADB替换为Alas使用的ADB。

  如果你使用傻瓜式安装包安装的Alas，找到位于 `<你的Alas安装目录>\toolkit\Lib\site-packages\adbutils\binaries` 下的ADB. 如果你使用的高级方法安装的Alas，找到位于环境变量中的ADB，把它替换为你自己的。

  以夜神模拟器为例，夜神模拟器安装目录下有两个ADB， `adb.exe` 和 `nox_adb.exe` 备份它们并删除. 复制两份 `adb.exe` 到夜神模拟器安装目录，重命名为 `adb.exe` 和 `nox_adb.exe`.