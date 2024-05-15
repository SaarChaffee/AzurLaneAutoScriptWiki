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

## ✅ 在MuMu12上运行Alas【推荐】

完美支持。MuMu 12 对较低配置的电脑支持更好，整体流畅度会提升。支持控制模拟器启动和重启。

建议使用 3.8.13 版本或以上版本，因为从这个版本开始的MuMu增加了专属截图方案 `nemu_ipc`，拥有最快的速度和最少的占用。

MuMu 模拟器国内版： https://mumu.163.com/ ，MuMu 模拟器国际版：https://www.mumuplayer.com/

:::warning
1. MUMU 12 和  MuMu X 和 MuMu 6（老MuMu）也不能同时使用。
2. 关闭`后台应用保活功能`。
:::

## ⚠ 在雷电模拟器上运行Alas

支持，需要在模拟器 `设置` 处，将 `ADB 调试` 设置为 `开启本地连接`，但非常不建议使用雷电模拟器。

雷电模拟器国内版：https://www.ldmnq.com/ ，雷电模拟器国际版：https://www.ldplayer.net/

使用雷电模拟器可能遇到以下问题，如果你不幸不到了这些问题，我们只会建议你换模拟器。

1. ADB 连接报错 `unknown host service`。
2. serial 在 `127.0.0.1:555X` 和 `emulator-555X` 之间横跳。
3. 随机发生的屏幕上下翻转。
4. 随机发生的控制不生效，模拟器控制方案里使用 MaaTouch 或许可以缓解这个问题。

![LDPlayer_ADB](/manual/emulator/support/LDPlayer_ADB.png)

## ⚠ 在逍遥模拟器上运行Alas

支持，但不建议。

逍遥模拟器国内版：https://www.xyaz.cn/ ，逍遥模拟器国际版：https://www.memuplay.com/

如果在使用逍遥模拟器时出现点击不生效的情况，需要将控制方式设置为 `MaaTouch`。

## 🚫 在Win11 WSA上运行Alas

不再提供支持，快跑。https://learn.microsoft.com/zh-cn/windows/android/wsa/

::: warning
Microsoft 正在停止为适用于 Android™️ 的 Windows 子系统 (WSA) 提供支持。 自 2025 年 3 月 5 日起，将不再支持 Windows 上的 Amazon Appstore 以及依赖于 WSA 的所有应用程序和游戏。
:::

WSA 现在还是有一堆的 bug 微软也不修，对于普通的游戏玩家，我们非常建议卸载 WSA、关闭 Hyper-V、并使用模拟器。

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

## ✅ 使用星界链云手机Alas版本

支持，参考 [星界链提供的教程](https://www.chinac.com/docs/help/anc/content/third/Alas) 。

星界链云手机的Alas版内置后台运行的Alas服务与云手机内网连接，方便上云使用。

> 这里有一个充值满 36 送 4 的推荐码，每个帐号可以使用三次：qpCoSu
>
> 注意这个是充值推荐码，需要先充值，充值的时候才能用。当然，你使用这个推荐码 lme 并不会收到一分钱，但是你确实可以省12块钱。

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
