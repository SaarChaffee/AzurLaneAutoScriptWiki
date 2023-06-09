# AzurLaneAutoScript

简称 Alas，是一个带GUI的碧蓝航线脚本，适配多服务器，为 7x24 运行的场景而设计，能接管近乎全部的碧蓝航线玩法。

## 功能 Features

- **出击**：主线图，活动图，共斗活动，紧急委托刷钻石。
- **收获**：委托，战术学院，科研，后宅，指挥喵，大舰队，收获，商店购买，开发船坞，每日抽卡，档案密钥。
- **每日**：每日任务，困难图，演习，潜艇图，活动每日AB图，活动每日SP图，共斗活动每日，作战档案。
- **大世界**：余烬信标，每月开荒，大世界每日，隐秘海域，短猫相接，深渊海域，塞壬要塞。

### 突出特性

- **心情控制**：计算心情防止红脸或者保持经验加成状态。
- **活动图开荒**：支持在非周回模式下运行，能处理移动距离限制，光之壁，岸防炮，地图解谜，地图迷宫等特殊机制。
- **无缝收菜**：时间管理大师，计算委托科研等的完成时间，完成后立即收获。
- **大世界**：一条龙完成，接大世界每日，买空港口商店，做大世界每日，短猫相接，购买明石商店，每27分钟清理隐秘海域，清理深渊海域和塞壬要塞，~~计划作战模式是什么垃圾，感觉不如Alas......好用~~。
- **大世界月初开荒**：大世界每月重置后，不需要购买作战记录仪(5000油道具)即可开荒。

## 已知问题

- **无法处理网络波动**，重连弹窗，跳小黄鸡。
- **在极低配电脑上运行可能会出现各种问题**，极低配指截图耗时大于1s，一般电脑耗时约0.5s，高配耗时约0.3s。
- **演习可能SL失败**，演习看的是屏幕上方的血槽，血槽可能被立绘遮挡，因此需要一定时间(默认1s)血量低于一定值(默认40%)才会触发SL.一个血皮后排就有30%左右的血槽，所以有可能在 1s 内被打死。
- **极少数情况下 ADB 和 uiautomator2 会抽风**，是模拟器的问题，重启模拟器即可。
- **拖动操作在模拟器卡顿时，会被视为点击**


## 如何上报bug

在提问题之前至少花费 5 分钟来思考和准备，才会有人花费他的 5 分钟来帮助你."XX怎么运行不了"，"XX卡住了"，这样的描述将不会得到回复。

- 在提问题前，请先阅读 [常见问题(FAQ)](./quick-start/FAQ)。
- 检查 Alas 的更新和最近的 commit，确认使用的是最新版。
- 上传出错 log，在 `log/error` 目录下，以毫秒时间戳为文件夹名，包含 log.txt 和最近的截图.若不是错误而是非预期的行为，提供在 `log` 目录下当天的 log和至少一张游戏截图。


## Alas 社区准则

### **概述**
这个社区的目标是让 Alas 用户**体验到 Lme 的温柔！**

为了实现这个社区的目标，我们要求您阅读并遵守以下准则。

### **方针**

- 就事论事
- 己所不欲勿施于人
- 对他人的观点要求同存异
- 尊重其他用户的隐私和个人信息
- 以礼貌和尊重的态度进行沟通

> 作为一个面向普通玩家的碧蓝航线脚本，我们将强制打开一些功能并且不会提供自动帐号切换.若用户对 Alas 的任何内容或功能有疑问，可以通过[以下平台](#交流平台)，进行询问。

### **禁止事项**

- 宣传或刻意抹黑其他碧蓝航线相关脚本
- 进行一系列 Alas 不提倡的游戏行为，如：红脸出击，刷侵蚀一等等
- 通过修改源码等方式关闭开发组强制开启的功能
- 修改作者名称或免费开源声明


### **负责任地使用 Issues / Pull Request(PR)** 

这些功能旨在激发参与 Alas 开发的兴趣，有机会成为 Alas 贡献者并参与到 Alas 的开发流程、未来规划中，以及更多有价值的内容。

对 `Issues / Pull Request(PR)` 的建议包括：

- 简单的问题请在[以下平台](#交流平台)进行提问
- 提出Issue前认真填写相关模板，以便开发组可以及时复现问题并修复缺陷
- 对 Alas 的 **游戏相关** 新内容开发请使用 `dev` 分支，对 Alas 的 **新功能** 开发请使用 `feature` 分支，对 **bug** 的修复请使用 `bug_fix`
- 为了保护 `master` 分支,禁止向 `master` 分支提 `Pull Request(PR)`
- 有关 `Pull Request(PR)` 的操作可以参考 [`Pull Request(PR)`流程](../develop/PR-steps)


### **协议**
下载并开始使用Alas，即表示您同意上述条款和条件以及 [Alas开源声明](https://github.com/LmeSzinc/AzurLaneAutoScript/blob/master/LICENSE)。

## 参与开发

Alas 仍在活跃开发中，我们会不定期发布未来的工作在 [Issues](https://github.com/LmeSzinc/AzurLaneAutoScript/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) 上并标记为 `help wanted`，欢迎向 Alas 提交 [Pull Requests](https://github.com/LmeSzinc/AzurLaneAutoScript/pulls)，我们会认真阅读你的每一行代码的。

哦对，别忘了阅读 [开发文档](../develop/index.md)。


## 相关项目
- [AzurStats](https://azur-stats.lyoko.io/)，基于 Alas 实现的碧蓝航线掉落统计平台。
- [AzurLaneUncensored](https://github.com/LmeSzinc/AzurLaneUncensored)，与 Alas 对接的碧蓝航线反和谐。
- [AzurLaneAutoScript](https://github.com/SaarChaffee/AzurLaneAutoScriptWiki)，由开发组成员维护的 Alas 官方文档
- [ALAuto](https://github.com/Egoistically/ALAuto)，EN服的碧蓝航线脚本，已不再维护，Alas 模仿了其架构。
- [ALAuto homg_trans_beta](https://github.com/asd111333/ALAuto/tree/homg_trans_beta)，Alas 引入了其中的单应性变换至海图识别模块中。
- [PyWebIO](https://github.com/pywebio/PyWebIO)，Alas 使用的 GUI 库。
- [MaaAssistantArknights](https://github.com/MaaAssistantArknights/MaaAssistantArknights)，明日方舟小助手，全日常一键长草，现已加入Alas豪华午餐 -> [MAA 插件使用教程](../plugins/maa)

## 交流平台

- QQ 一群(已满)：[1087735381](https://jq.qq.com/?_wv=1027&k=I4NSqX7g)
- QQ 二群：[576458886](https://jq.qq.com/?_wv=1027&k=FUIOAAOm)
- QQ 三群：[834210833](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Q611gtXy-y0ttnfHOQNegXjerUI2tWIy)
- QQ 频道：[https://qun.qq.com/qqweb/qunpro/share?inviteCode=20hHAfycu5p](https://qun.qq.com/qqweb/qunpro/share?inviteCode=20hHAfycu5p)
- Discord：[https://discord.gg/AQN6GeJ](https://discord.gg/AQN6GeJ)
- Github Discussions：[Discussions](https://github.com/LmeSzinc/AzurLaneAutoScript/discussions)
- ALAS-Official：[22501720](https://space.bilibili.com/22501720)
- Lme 的 Bilibili 直播间：[22216705](https://live.bilibili.com/22216705) ，偶尔直播写Alas，~~为了拯救Alas，Lme决定出道成为偶像~~
> 注意(加群潜规则，雾)：
> - Discord 频道可随意加入，但需要确认 Rules 频道中的规则才能解锁所有频道，且需要成为成员至少 5 分钟才能发言 (为了防止 bot spam)。
> - 加入 QQ 一群需要提供你的 Github 用户名，且该帐号不能是一周内注册的，并且 QQ 号需要至少 16 级 (有一个太阳，使用大约 1 年). 如果你确实没有 Github 帐号，或者不希望 Github 帐号与 QQ 号有所关联，可以加入二群与三群。

## 鸣谢

感谢所有参与到开发/测试中的指挥官们！

[![Contributors](https://contrib.rocks/image?repo=LmeSzinc/AzurLaneAutoScript)](https://github.com/LmeSzinc/AzurLaneAutoScript/graphs/contributors)