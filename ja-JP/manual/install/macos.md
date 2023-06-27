---
prev:
  text: 介绍
  link: /zh-CN/manual/
next:
  text: 快速上手
  link: /zh-CN/manual/quick-start/
---

# 在 MacOS 中安装

:::tip
如有在容器中部署的需求，我们还提供了[基于 Docker 的安装文档](./docker)。
:::

## 获取 Alas 源码

1. 在你希望放置 Alas 文件夹的位置打开终端，执行

```sh
git clone https://github.com/LmeSzinc/AzurLaneAutoScript
```
当然你也可以按照自己喜欢的方式取得 Alas 源码

2. 进入目录

```sh
cd ./AzurLaneAutoScript
```

## 准备运行环境

由于 Alas 使用的是 [Python 3.7.6](https://www.python.org/downloads/release/python-376/)，你需要自己安装它，这里我们假定你已经安装完成了。同时我们建议创建新的虚拟环境来运行 Alas，下面会以 venv 为例，当然你也可以选择自己喜欢的工具。

1. 创建一个虚拟环境，当然这个环境的名称可以随意命名，这里用 alas_venv 作为示例

    ```sh
    python3.7 -m venv alas_venv

    ```
2. 激活刚才创建的虚拟环境

    ```sh
    source alas_venv/bin/activate

    ```
3. 安装依赖，这里以清华源为例

    ```sh
    pip install -r .deploy/headless/requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
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

4. 配置 ADB

    在 [这里](https://developer.android.com/studio/releases/platform-tools) 获取最新的 ADB，并把它配置于环境变量中。

    由于新版 MacOS 不支持直接将文件放入 /usr/bin中，提供两种结局方案：

    - 关闭SIP文件保护系统后再放进去（不推荐，故不进行教学）。
    - 放入任意文件夹然后将该文件夹加入环境变量。

    ​如：我在`/Users/你的用户名`下创建文件夹 `bin` 存放 adb，则在环境变量文件中添加 `PATH=$HOME/bin/:$PATH` 即可。注意，不要遗漏最后的 `:$PATH`！

5. 创建配置
    复制一份带有 template 的配置文件并重命名为 `deploy.yaml`。根据你的实际情况修改其中的配置，包括 git、python、adb 等可执行文件的路径。

6. 至此，已经完成了 Alas 的安装，可以开始使用或者开发了！

    ```sh
    python gui.py
    ```