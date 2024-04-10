# 设备支持文档

## ⚙️ 更换设备运行时的注意事项【必看】

1. 分辨率设置为 `1280x720`。
2. 按 [要求](../game/game-settings) 修改游戏设置。
3. 在新设备上配好当期 Meta 和往期 Meta 的出击阵容，因为游戏客户端的 Meta 阵容只保存在本地不是云同步的。这点非常重要，很多用户上云后都因为没有 Meta 队伍而报错。

## ✅ 在蓝叠模拟器上运行Alas

支持。需要在模拟器 `设置` 中打开 `ADB调试`。

蓝叠在国外模拟器市场有近乎垄断的地位，Alas 的 EN 开发和绝大部分 EN 用户正在使用蓝叠模拟器。

建议使用蓝叠5国际版，国际版的广告比较少，但是如果你人在国外的话，中国版的广告反而少，无论中国版和国际版都可以设置为简体中文，使用是没有区别的。去广告的原理就是广告跨墙就加载不出来了。

蓝叠中国版：https://www.bluestacks.cn/ ，蓝叠国际版 https://www.bluestacks.com/ ，注意不要下载蓝叠X，那个是云游戏不是模拟器。

蓝叠有蓝叠4和蓝叠5、Hyper-V 版和非 Hyper-V版、中国版和国际版，排列组合起来有非常多的版本，ADB设置的名称和位置可能和图里的不一样，仔细找到它并打开。

![BlueStacks_ADB](/manual/emulator/support/BlueStacks_ADB.png)


## ✅ 在夜神模拟器上运行Alas

支持。

不需要额外设置就可以直接运行 Alas。

建议使用夜神国际版，国际版的广告比较少，夜神模拟器中国版：https://www.yeshen.com/ ，夜神模拟器国际版：https://www.bignox.com/

:::warning
夜神模拟器在设备性能一般的情况下表现会明显下滑，而在高配设备则几乎没有影响。
:::

## ⚠ 在 MuMu 6（老MuMu）模拟器上运行Alas

支持。但 MuMu 6 相较于 MuMu X 以及 MuMu 12，已经显得老旧，不推荐使用。

MuMu 模拟器国内版： https://mumu.163.com/ ，MuMu 模拟器国际版：https://www.mumuglobal.com/

:::warning
1. 不能使用 MuMu 6 模拟器的多开，因为使用的是同一个 ADB 端口。
2. 由于 MuMu 6 模拟器需要管理员权限启动，Alas 也需要以管理员权限启动才能启停 MuMu 6 模拟器。
:::

## 🚫 在MuMu手游助手上运行Alas

不支持。

MuMu 手游助手，又称 MuMu星云引擎、黄MuMu，是已经被网易放弃的项目，~~下载链接在官网都找不到了~~，不建议使用。MuMu 手游助手不支持 ADB，所以无法运行 Alas 及所有基于 ADB 的脚本。

## ✅ 在MuMu X 模拟器上运行Alas【推荐】

完美支持。MuMu X 对较低配置的电脑支持更好，整体流畅度会提升。

MuMu 模拟器国内版： ~~https://mumu.163.com/~~ ，MuMu 模拟器国际版：https://www.mumuglobal.com/

下载链接已经被官方下了，现在国内版安装包以及国际版安装包都需要在群文件里下载

:::warning
1. MuMu X 需要更新到 12.1.6 或更高版本，否则截图和识别会出现问题。
2. 虽然 MuMu X 增加了模拟器多开，但还是不能多开运行，因为它们共享同一个 ADB 端口无法区分。
3. 由于 MuMu X 模拟器需要管理员权限启动，Alas 也需要以管理员权限启动才能启停 MuMu X 模拟器。
4. MuMu X 和 MuMu 6（老MuMu）也不能同时使用，因为他们共享同一个 ADB 端口无法区分。
5. Alas不能使用auto主动连接到MuMu X ，需要填写正确的端口号 `127.0.0.1:7555` 才能连接。
6. 最新版MuMu X国内版启动有更新MuMu 12的弹窗，而国际版没有。
:::

## ✅ 在MuMu 12模拟器上运行Alas【推荐】

完美支持。MuMu 12 对较低配置的电脑支持更好，整体流畅度会提升。支持控制模拟器启动和重启。

对于 3.8.13 及以上的版本支持直接调用 nemu ipc，拥有最快的性能和最少的占用。

MuMu 模拟器国内版： https://mumu.163.com/ 

:::warning
1. MUMU 12 和  MuMu X 和 MuMu 6（老MuMu）也不能同时使用。
2. Alas 可以使用 `auto` 主动连接到MuMu 12 ，也可以多开分别填写ADB地址。
3. 要使用 nemu ipc，需要手动填写正确的 `Serial`，这可以在模拟器启动后，在多开器右上角 ADB 字样的按钮中找到；需要填写正确的模拟器设置，建议配置好 `Serial` 后，将模拟器类型置于自动检测，让 Alas 自动配置。
:::

## ⚠ 在雷电模拟器上运行Alas

支持，需要在模拟器 `设置` 处，将 `ADB 调试` 设置为 `开启本地连接`，但非常不建议使用雷电模拟器。

雷电模拟器国内版：https://www.ldmnq.com/ ，雷电模拟器国际版：https://www.ldplayer.net/

使用雷电模拟器可能遇到以下问题，如果你不幸不到了这些问题，我们只会建议你换模拟器。

1. ADB 连接报错 `unknown host service`。
2. serial 在 `127.0.0.1:555X` 和 `emulator-555X` 之间横跳。
3. 随机发生的屏幕上下翻转。
4. 随机发生的控制不生效，模拟器控制方案里使用 MaaTouch 或 ADB 或许可以缓解这个问题。

![LDPlayer_ADB](/manual/emulator/support/LDPlayer_ADB.png)

## ⚠ 在逍遥模拟器上运行Alas

支持，但不建议。

逍遥模拟器国内版：https://www.xyaz.cn/ ，逍遥模拟器国际版：https://www.memuplay.com/

如果在使用逍遥模拟器时出现点击不生效的情况，需要将控制方式设置为 `uiautomator2`。

## ⚠ 在Win11 WSA上运行Alas

支持，但需要折腾。

仅支持 WSA 2203 或更老版本（版本号在子系统设置页面的上方），对于 WSA 2204 或更高版本可以参照 [#1560](https://github.com/LmeSzinc/AzurLaneAutoScript/pull/1560) 进行适配，适配完成后欢迎提交 PR。

WSA 现在还是有一堆的 bug 微软也不修，对于普通的游戏玩家，我们非常建议卸载 WSA、关闭 Hyper-V，并使用模拟器。

## ✅ 在AVD上运行Alas

支持，但需要折腾。

AVD：https://developer.android.com/studio/run/managing-avds

## ✅ 在Mac上运行Alas

支持，但需要折腾。

使用 AVD 模拟器，参照 [在 MacOS 中安装](../install/macos)。

## ✅ 在ARM架构CPU的Mac上运行Alas

支持，但需要折腾。

参照群友 binss 的博客文章：https://www.binss.me/blog/run-azurlaneautoscript-on-arm64/

## ✅ 在Docker上运行Alas

支持，但需要折腾。

参照 [在 Docker 中安装](../install/docker)。

## ✅ 在星界链云手机上运行游戏+在云服务器上运行Alas【推荐】

支持。

将游戏和 Alas 上云需要购买云手机和云服务器。[星界链](https://www.chinac.com/) 是目前唯一免费提供公网 ADB 的云手机厂商，所有基于 ADB 的脚本都可以完美迁移到星界链云手机上。云服务器可以购买腾讯云或者阿里云的，新用户首年只要大概几十块。Alas 对 CPU 和内存的要求很低，最低配置即可运行。

注册帐号并购买云手机，注意事项如下：

1. 必须购买带 `全新升级` 标签的区域，这里是江苏二区、福建一区、香港二区，不带 `全新升级` 标签的云手机打开碧蓝航线全是黑屏，建议购买江苏二区。
2. 云手机和云服务器的物理位置要相近，这样延迟低，并且不能过墙。深圳和香港地理位置相近但是因为中间有墙，延迟可能是绕地球10圈。
3. 建议购买 38 元每月的云手机，配置过低可能导致 Meta 战的时候游戏闪退。

![chinac_buy](/manual/emulator/support/chinac_buy.png)


购买了云手机之后，在网页控制台处进入 `ADB连接`。

![chinac_adb_1](/manual/emulator/support/chinac_adb_1.png)

勾选你的云手机，开通ADB连接服务；在 `IP白名单` 处填入你云服务器的 IP 地址，复制右边的 `ADB连接地址`，填入 `Alas` - `Alas 设置` - `模拟器 Serial`。

![chinac_adb_2](/manual/emulator/support/chinac_adb_2.png)

:::warning
1. 在公网ADB上不能使用带有 `_nc` 后缀的截图方案，一般使用 `ascreencap` 截图和 `minitouch` 点击。
2. 云手机不是本地模拟器，不能使用 Alas 内的重启模拟器功能。
:::

## ✅ 在传统云手机上运行游戏+在云服务器上运行Alas

支持，但需要折腾。

不提供公网ADB服务的云手机我们都统称为传统云手机了，传统云手机需要与云服务器组虚拟局域网，参考 Perfare 的博客文章：https://www.perfare.net/archives/1804

::: warning
云手机不是本地模拟器，不能使用 Alas 内的重启模拟器功能。
:::

## 🚫 在云服务器上运行Alas

不能。

模拟器需要 GPU 才能运行，带 GPU 的云服务器大概是 600 元/月起步，另外不少云服务器厂商是不允许用户进行二次虚拟化的，所以无法运行模拟器。

建议阅读[云手机+云服务器运行](#✅-在星界链云手机上运行游戏-在云服务器上运行alas【推荐】)。

## ⚠ 在安卓真机运行Alas

支持，但需要折腾。

在安卓真机运行 Alas 的方案已经被放弃，原因是：

1. VMOS 长时间运行后可能闪退的问题不能解决。
2. 手机长期发热会带来设备损耗，实际花销比云手机高。

不过你仍然可以加 Alas QQ 群来获取这份远古教程，执行教程需要你有 Linux 命令行基础知识和一台骁龙 855 + 8GB 内存的安卓手机，配置不够的后果是 Alas 打开闪退。

## ⚠ 在安卓真机运行游戏+电脑运行Alas

支持，但需要折腾。

这个方案需要占用两个设备，安卓机不能熄屏运行，真机截图也是非常慢，因此很少有人使用。

1. 使用 USB 线连接安卓机和电脑。
2. 在手机内的 `开发者模式`，打开 `ADB调试`。
3. 查询手机的 serial，这里的 `xxxxxxxx` 将是你手机的 serial，记录下来。

```shell
C:\Users\username>adb devices
List of devices attached
xxxxxxxx        device
```

4. 更改分辨率

```shell
adb -s <serial> shell wm size 720x1280
```

5. 运行 Alas

6. 恢复分辨率

```shell
adb -s <serial> shell wm size reset
```

需要注意的是，修改分辨率后 Alas 仍然可能报 Resolution not supported，这是因为 `wm size` 并不是一定生效的，具体因机型而异。Alas 并不会主动检查设备分辨率，而是以实际收到的截图的宽高为准，分辨率这关是绕不开的。如果你的设备执行 `wm size` 不生效，只能换设备或者换其他方式运行，见 [#1316](https://github.com/LmeSzinc/AzurLaneAutoScript/issues/1316)。
