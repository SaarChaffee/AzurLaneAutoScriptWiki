---
prev:
  text: 介绍
  link: /zh-CN/manual/
next:
  text: 快速上手
  link: /zh-CN/manual/quick-start/
---

# 在 Linux 中安装

:::tip
如有在容器中部署的需求，我们还提供了[基于 Docker 的安装文档](./docker)。
:::

:::tip
限制于不同系统的软件源，可能会出现不能指定旧版本 python 的情况。因此在本文最后会附上[从源码安装任意版本 python 的教程](#从源码安装-python)。
:::

本安装教程编写时的系统环境为 AMD64 上的 Ubuntu 22.04、Debian 12、CentOS 9、Arch Linux。

## 准备运行所需工具

如果你的 Linux 运行环境在国内，我们建议先更换 source 源。具体方法可以参考[阿里镜像站](https://developer.aliyun.com/mirror/)，这里不再过多赘述。

:::tabs code
```dpkg
apt update && apt install -y git adb libgomp1
```
```rpm
yum update && yum install -y git adb libgomp
```
```pacman
pacman -Syy --noconfirm git android-tools gcc-libs
```
:::

部分 Debian 系的系统用 venv 创建虚拟环境还需要安装

```sh
apt install -y python3-venv
```

## 获取 Alas 源码

1. 在你希望放置 Alas 文件夹的位置打开任何终端，执行

```sh
git clone https://github.com/LmeSzinc/AzurLaneAutoScript
```
当然你也可以按照自己喜欢的方式取得 Alas 源码

2. 进入目录

```sh
cd ./AzurLaneAutoScript
```

## 准备运行环境

建议在 Linux 中运行 Alas 使用 [Python 3.8.18](https://www.python.org/downloads/release/python-3810/)，你需要自己安装它，这里我们假定你已经安装完成了。同时我们建议创建新的虚拟环境来运行 Alas，下面会以 venv 和 Anaconda 为例，当然你也可以选择自己喜欢的工具。

:::tip
如果实在无法安装 Python `3.8.10`，可以按照[从源码安装 python](#从源码安装-python)来安装
:::

1. 创建一个虚拟环境，当然这个环境的名称可以随意命名，这里用 alas_venv 作为示例

    :::tabs code
    ```venv
    python3 -m venv alas_venv
    ```
    ```conda
    conda create -n alas_venv python==3.7.6 -y
    ```
    :::

2. 激活刚才创建的虚拟环境

    :::tabs code
    ```venv
    source alas_venv/bin/activate
    ```
    ```conda
    conda activate alas_venv
    ```
    :::

3. 安装依赖，这里以清华源为例

    ```sh
    pip install -r deploy/headless/requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
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

  <details>
  <summary>依赖安装常见问题</summary>
  如果你遇到了网络连接问题，重试即可

  如果你遇到了 pip 需要更新的问题
  ```sh
  WARNING: You are using pip version 21.0.1; however, version 21.1.3 is available.
  ```
  可以执行以下命令解决，也可以无视
  ```sh
  python -m pip install --upgrade pip
  ```
  ```sh
  ERROR: Can not execute `setup.py` since setuptools is not available
  ```
  需要安装或更新setuptools
  ```sh
  pip install --upgrade setuptools -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```
  </details>

4. 创建配置文件

    ```sh
    cp config/deploy.template-linux-cn.yaml config/deploy.yaml
    ```
5. 至此，已经完成了 Alas 的安装，可以开始使用或者开发了！

    ```sh
    python gui.py
    ```

## 从源码安装 python

:::tip
由于 Python `3.7.6` 从源码安装完成后，安装 alas 时会出现 `pkg-config` 等依赖安装失败的情况，不建议首先使用 Python `3.7.6`
:::
### 获取 python 源码

在 python 官网的 [ftp目录](https://python.org/ftp/python/) 进入你想要的版本的文件夹，并复制其中的 `Python-x.x.x.tgz` 的链接，本教程以 Python 3.8.10 为例。在 Linux 终端进入一个你认为合适的位置，使用你喜欢的工具获取 Python 源码，这里以 wget 为例。

```sh
wget https://python.org/ftp/python/3.8.10/Python-3.8.10.tgz
```

下载完成后解压。

```sh
tar -zxvf Python-3.8.10.tgz
```

### 准备编译环境

编译 Python 需要 gcc、make 以及 zlib、libffi、bzip2、openssl 等等一大堆依赖库。
:::tabs code
```dpkg
apt update && apt install -y gcc make zlib1g-dev libffi-dev libssl-dev libbz2-dev
```
```rpm
yum update && yum install -y gcc make zlib-devel libffi-devel openssl-devel bzip2-devel
```
```pacman
pacman -Syy --noconfirm gcc make zlib libffi openssl bzip2
```
:::

### 编译 python

进入解压的 python 文件夹，为了链接 openssl相关库，我们需要修改 `Modules/Setup`。找到以下内容：

```sh
#SSL=/usr/local/ssl
#_ssl _ssl.c \
#	-DUSE_SSL -I$(SSL)/include -I$(SSL)/include/openssl \
#	-L$(SSL)/lib -lssl -lcrypto

(line 210-213)
```

取消注释后保存并退出。
```sh
SSL=/usr/local/ssl
_ssl _ssl.c \
	-DUSE_SSL -I$(SSL)/include -I$(SSL)/include/openssl \
	-L$(SSL)/lib -lssl -lcrypto
```

初始化编译参数。这一步的参数 `--enable-optimizations` 建议加上，编译用时会增加，但编译后的 python 运行效率比没加这个参数的高 10% 左右甚至更高。
```sh
./configure --enable-optimizations
```
当看初始化完成后可以看到以下内容
```sh{7}
checking for openssl/ss1.h in /usr/local/ss1... no
checking for openssl/ssl.h in /usr/lib/ss1... no
checking for openss1/ssl.h in /usr/ssl... no
checking for openss1/ssl.h in /usr/pkg... no
checking for openss1/ssl.h in /usr/local... yes
checking for openss1/ssl.h in /usr... no
checking whether compiling and linking against OpenSSL works... yes
checking for --with-ssl-default-suites... python
configure : creating ./config .status
config.status : creating Makefile.pre
config.status : creating Misc/python.pc
config.status : creating Misc/python-embed.pc
config.status : creating Misc/python-conf ig.sh
config.status: creating Modules/ld_so_aix
config.status : creating pyconfig.h
config.status : puconfig.h is unchanged
creating Modules/Setup . local
creating Makefile
```
可以看到第 5 行以及第 7 行结果都为yes，表示初始化脚本成功找到了需要链接的 openssl 库文件。请确保第 7 行为 yes 的结果。当然，检测到库文件之后就不会继续检测下去了，所以第 6 行这种正常是不会显示出来的。如果没有这个结果就进行下面的步骤只会被编译器狠狠地骂

```sh
./Modules/_ssl.c:56:10: fatal error: openss1/rsa.h: No such file or directory
  56  | inc lude "openssl/rsa .h"
      |           ^~~~~~~~~~~~~~
compilation terminated.
make: *** [Makefile:1952: Modules/_ssl.o] Error 1
```

现在，可以开始编译了，这会花上一些时间。
```sh
make install
```

当出现下面内容时，表示 pip 已经编译好了。当然，版本不一定是一样的。

```sh
Installing collected packages: setuptools, pip
Successfully installed pip-21.1.1 setuptools-56.0.0
```
那 python 呢？pip 都好了那 python 肯定也好了啊（

### 安装 python

::: danger
如果你不知道接下来自己在做什么，请不要随意替换接下来的代码内容。
:::

上一步我们编译好的 python 可执行文件默认会放在 `/usr/local/bin` 下，命名为 `python3.8`。
```sh
ls -alF /usr/local/bin | grep python3
```
```sh
-rwxr-xr-x  1 root root 14732360 Jun 19 17:22 python3.8*
-rwxr-xr-x  1 root root     3053 Jun 19 17:23 python3.8-config*
lrwxrwxrwx  1 root root       16 Jun 19 17:23 python3-config -> python3.8-config*
```
同时我们可以查看原有的 python3 执行文件指向是什么。
```sh
ls -alf /usr/bin | grep python3
```
```sh
lrwxrwxrwx 1 root root       24 Jun 19 17:23 python3 -> /usr/local/bin/python3.8*
```

为了不影响原有的 python3 环境，这里我们删除 `/usr/local/bin` 下刚刚创建的 `python3` 软链接，当然别忘记 pip 的。

```sh
rm /usr/local/bin/puthon3 /usr/local/bin/pip3
```

同时使用 python38 以及 pip38 作为以后的运行命令，这里我们在 `/usr/bin` 创建软链接。
```sh
ln -s /usr/local/bin/python3.8 /usr/bin/py38
ln -s /usr/local/bin/pip3.8 /usr/bin/pip38
```

查看版本。
```sh
py38 --version && pip38 --version
```
```sh
Python 3.8.10
pip 21.1.1 from /usr/local/lib/python3.8/site-packages/pip (puthon 3.8)

```

:::tip
另外如果按照上面的步骤，成功部署了模拟器和脚本运行环境，你可能会遇到以下错误：

`ModlueNotFoundError: No module named '_bz2'`

如果能正常运行，请跳过该步骤
:::

获取相关文件
```sh
wget https://github.com/nuaalyh/Note/blob/master/python/_bz2.cpython-38-x86_64-linux-gnu.so
```
复制到对应位置，注意目标文件路径，一定是`lib-dynload`这个文件夹
```sh
sudo cp ./_bz2.cpython-38-x86_64-linux-gnu.so /usr/local/lib/python3.8/lib-dynload
```
恭喜，你已经成功编译并安装了一个 python！接下来可以继续[安装 Alas ](#准备运行所需工具)了。
