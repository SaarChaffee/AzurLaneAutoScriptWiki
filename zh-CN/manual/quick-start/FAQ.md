# 常见问题

这里列举了一些常见问题。

## 如何修改 Alas 源以及分支

首先在 Alas 下的 `config` 文件夹中找到 `deploy.yaml` 文件

以记事本或者你喜欢的编辑器打开，我们只需要关注高亮的几行：

```yaml{6,10,18:line-numbers}
Deploy:
  Git:
    # URL of AzurLaneAutoScript repository
    # [CN user] Use 'git://git.lyoko.io/AzurLaneAutoScript' for faster and more stable download
    # [Other] Use 'https://github.com/LmeSzinc/AzurLaneAutoScript'
    Repository: https://github.com/LmeSzinc/AzurLaneAutoScript // [!code focus] 
    # Branch of Alas
    # [Developer] Use 'dev', 'app', etc, to try new features
    # [Other] Use 'master', the stable branch
    Branch: master  // [!code focus]
    # Filepath of git executable `git.exe`
    # [Easy installer] Use './toolkit/Git/mingw64/bin/git.exe'
    # [Other] Use you own git
    GitExecutable: ./toolkit/Git/mingw64/bin/git.exe 
    # Set git proxy
    # [CN user] Use your local http proxy (http://127.0.0.1:{port}) or socks5 proxy (socks5://127.0.0.1:{port})
    # [Other] Use null
    GitProxy: null  // [!code focus]
```
### Repository
即为你所需要更换的 Alas 源。你需要注意以下内容：

1. 如果你有能力连接 Github，建议使用 Github 源：`https://github.com/LmeSzinc/AzurLaneAutoScript`，同时不要忘记在 `GitProxy` 配置稳定的代理。
2. 如果你没有能力连接 Github，或者想自动更新时快一些，建议使用 CN 源。默认 CN 源为 `git://git.lyoko.io/AzurLaneAutoScript`，当然你也可以在注释中找到它。

### Branch
为你当前源的分支。正常情况下不需要修改。
::: danger
除非你知道自己在做什么否则不要修改。
:::

## 如何查询 ADB/Serial

在 Alas 的文件夹里有 `console.bat` 文件  
![Console_Path](/manual/quick-start/faq/Console_Path.png)
打开它，之后输入 `adb devices`
将会显示当前可用的地址。填写到 Alas 里对应的栏目里即可。

```sh{3}
>>>adb devices
List of devices attached
127.0.0.1:16416 device
```
## 可以关闭科研/委托吗

不可以，这些是 Alas 的**重要基础功能**，使用一个没这些功能的 Alas 真不如去使用其他游玩方式了，您如果因为这些功能遇到了困扰，请描述你的详细情况寻求帮助。

## 如何设置开荒

这里以主线图为例：

1. 在`停止条件`下的`达成关卡成就后停止`中选择`100%通关`或`100%通关+三星`
![Set_Stop_Condition](/manual/quick-start/faq/Set_Stop_Condition.png)

2. 勾选`达成关卡成就后向前开荒`
![Set_Forword](/manual/quick-start/faq/Set_Forword.png)

## 新的活动图为何选不了

开发需要时间更新适配并检查，**请耐心等待一至两天**。

## 如何贪绿闪/贪绿闪是什么

绿闪：
 - 放于后宅的舰船在一定心情下会获得经验加成（**心情>120**）

使用 Alas 贪绿闪具体操作如下：
1. 将你刷图用的舰娘全部放于**后宅一楼/二楼**。
2. 在`心情设置`中将`X队心情控制`更改为`保持经验加成（>120）`，并设置`X队心情回复`为`后宅一楼/二楼`。这里我们以第一队为例：
![Set_Emotion](/manual/quick-start/faq/Set_Emotion.png)

:::warning
Alas 的心情设置是根据出击频率计算的，而不是读取你的账号数据。因此请保证设置的准确性，**不要多个任务共用同一编队/舰娘**
:::

## 大型作战（大世界）任务如何设置

首先，使用此功能前必须满足以下条件：

- 通关大世界 **主线任务** + **模拟战**：点开`任务列表`，出现`月度BOSS`即为完成。

启动除`侵蚀1练级`以外所有大型作战功能，之后只需要保持 Alas 尽可能长时间运行即可，无需去管 Alas 是如何运行大型作战的

## 侵蚀 1 练级是什么

消耗大量的时间，换取一定量的舰船经验，并依靠`短猫相接`补充凭证和换取少量的强化部件 T4。整体收益比不上 Alas 的其他功能，**除了让你感到十分充实以外没有其他作用**。如果你的 Alas 正在长时间运行侵蚀 1，说明它还不是最高效率运行。
:::warning
启动侵蚀 1 后，大型作战中将**不会购买紫币**，从而节约黄币开销。
:::
