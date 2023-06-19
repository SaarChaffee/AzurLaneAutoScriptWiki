---
prev:
  text: 介绍
  link: /zh-CN/manual/
next:
  text: 目录内容
  link: /zh-CN/manual/quick-start/folder
---
# 在 Windows 中安装

:::tip
如有在容器中部署的需求，我们还提供了[基于 Docker 的安装文档](./docker)。
如果想手动安装 Alas，[点此跳转到手动安装的部分](#手动安装)。
:::

## 自动安装
### 获取自动安装包

在 [Github Releases](https://github.com/LmeSzinc/AzurLaneAutoScript/releases)、 [网盘](https://alas.saarcenter.com/download) 以及 QQ 群文件中 `Alas本体` 文件夹内下安装缩包。Alas 是使用 Git 来更新的，因此对于可以稳定连接 Github 的指挥官，推荐下载 full 包以使用 Github 源，对于其他指挥官则建议下载 full_cn 包以使用国内源。当然，对于有能力的指挥官，我们也十分欢迎使用自己的途径更新 Alas。

下载完成后请不要忘记解压安装包，推荐将安装包解压至一个没有中文的路径，完整安装将需要约 1.5 GB 的空间。

### 使用启动器

双击打开 `Alas.exe`，自动安装程序将完成从获取更新，安装环境到准备 ADB 的步骤。自动安装视网络环境通常需要花费 2 - 3 分钟不等，期间请耐心等待。安装完成后，Alas 桌面端将自动打开。

![](/manual/install/windows/install.png)

![](/manual/install/windows/home.png)

### 开始使用

恭喜你，你已经完成了 Alas 的安装并成功启动，现在你可以开始使用 Alas 了。

### 自动安装器常见问题

> #### 我的杀毒软件称 Alas.exe 是病毒
>
> 添加至白名单即可。Alas.exe 是一个由 bat 打包而成的 exe，可能会有杀毒软件误报。如果你不放心，可以使用 `deploy/install` 下的 `Alas.bat` 替换 `Alas.exe`，它们的功能是一样的。

> ```sh
>[ failure ], error-code: 128
>+-------------------------+
>|      UPDATE FAILED      |
>+-------------------------+
>```
>![](/manual/install/windows/error-code-128.jpg)
> 这是因为与 Git 源连接不稳定导致的，请确保选择了可以稳定连接的镜像源。官方镜像源如有问题请通过[交流平台](../#交流平台)联系我们。

> ```sh
>ERROR: Could not finda version that satisfies the requirement XXX
>ERROR: No matching distribution found for XXX 
>
> ```
>![](/manual/install/windows/pipy-mirror.jpg)
> 这是因为国内的 pypi 镜像不稳定，你可以尝试重新打开 `Alas.exe`。如果问题未能解决，可以尝试其他国内镜像。更换 pypi 镜像方法可以打开 Alas 根目录下的 `console.bat` 运行以下命令：
> ```sh 
> python -m deploy.set PypiMirror=新的 pypi 源
> ```
> - 清华源：`https://pypi.tuna.tsinghua.edu.cn/simple`
> - 豆瓣源：`https://pypi.douban.com/simple/`
> - 阿里源：`https://mirrors.aliyun.com/pypi/simple/`
> - 通过搜索引擎获得更多的国内 pypi 镜像

## 手动安装

:::tip
手动安装教程是为开发者编写的，使用手动安装教程需要有基本的编程知识。如果你不是正在或者有意开发 Alas，那么建议跟随[自动安装教程](#自动安装)。
:::

### 获取 Alas 源码

1. 在你希望放置 Alas 文件夹的位置打开任何终端，执行

```sh
git clone https://github.com/LmeSzinc/AzurLaneAutoScript
```
当然你也可以按照自己喜欢的方式取得 Alas 源码

2. 进入目录

```sh
cd ./AzurLaneAutoScript
```

### 准备运行环境

由于 Alas 使用的是 [Python 3.7.6](https://www.python.org/downloads/release/python-376/)，你需要自己安装它，这里我们假定你已经安装完成了。同时我们建议创建新的虚拟环境来运行 Alas，下面会以 Anaconda 和 venv 为例，当然你也可以选择自己喜欢的工具。

1. 创建一个虚拟环境，当然这个环境的名称可以随意命名，这里用 alas_venv 作为示例

    :::tabs code
    ```conda
    conda create -n alas_venv python==3.7.6 -y

    ```
    ```venv
    python -m venv alas_venv

    ```
    :::


2. 激活刚才创建的虚拟环境

    :::tabs code
    ```conda
    conda activate alas_venv
    ```
    ```venv
    ./alas_venv/Scripts/active
    ```
    :::

3. 安装依赖，这里以清华源为例

    ```sh
    pip install -r ./requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
    ```
    :::warning
    注意！在 ARM 环境下，为了让 Alas 能 native 运行，在安装完依赖后，还需要替换 mxnet。X86 及 AMD64 用户不需要看这一段。
    :::

    以下内容出自群友 [binss](https://github.com/binss) 的[博客](https://www.binss.me/blog/run-azurlaneautoscript-on-arm64/)。非常感谢 binss 解决了 ARM 运行 Alas 的问题并提供了编译后的 mxnet。

    在博客中或者[网盘](https://alas.saarcenter.com/download/Alas/%E4%BE%9D%E8%B5%96)下载编译好的 mxnet 后
    ```sh
    pip uninstall mxnet
    pip install mxnet-1.9.1-py3-none-any.whl
    ```
    <hr/>

    #### 依赖安装常见问题
  >如果你遇到了网络连接问题，重试即可

  > 如果你遇到了 pip 需要更新的问题
  >
  > ```sh
  > WARNING: You are using pip version 21.0.1; however, version 21.1.3 is available.
  > ```
  >
  > 可以执行以下命令解决，也可以无视
  >
  > ```sh
  > python -m pip install --upgrade pip
  > ```

  > ```sh
  > ERROR: Can not execute `setup.py` since setuptools is not available
  > ```
  > 需要安装或更新setuptools
  > ```sh
  > pip install --upgrade setuptools -i https://pypi.tuna.tsinghua.edu.cn/simple
  > ```
4. 至此，已经完成了 Alas 的安装，可以开始使用或者开发了！