---
prev:
  text: 介绍
  link: /zh-CN/manual/
next:
  text: 目录内容
  link: /zh-CN/manual/quick-start/folder
---

# 在容器中安装

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

3. 添加文件夹为 Git 安全文件夹

如果宿主机系统为 Windows 且 Git 版本为 `2.35.2` 或更高，则需要执行此步骤。详情请参阅[CVE-2022-24765](https://github.com/git-for-windows/git/security/advisories/GHSA-vw2c-22j4-2fh2)。

:::tabs code
```powershell
git config --global --add safe.directory $pwd
```
```cmd
git config --global --add safe.directory %cd%
```
:::

## 部署 Alas

:::warning
以下内容仅适用于 X86 / AMD64 平台，如需在 ARM 上运行请参阅群友 [binss的博客](https://www.binss.me/blog/run-azurlaneautoscript-on-arm64/)。
:::

1. 创建配置文件

```sh
cp config/deploy.template-docker-cn.yaml config/deploy.yaml
```

修改 `docker-compose.yml` 中的 `dockerfile` 为 `./Dockerfile.cn` 以在容器内使用国内源安装运行 Alas 所需环境

```yaml{13,14}
version: '3.7'
services:
    ALAS:
        network_mode: host
        volumes:
            - '.:/app/AzurLaneAutoScript:rw'
            # - '../MAA:/app/MAA:rw'
            - '/etc/localtime:/etc/localtime:ro'
        container_name: 'alas'
        image: 'alas'
        build:
            context: ./deploy/docker/
            # dockerfile: ./Dockerfile
            dockerfile: ./Dockerfile.cn
```

2. 启动容器

:::tabs code
```docker
docker-compose up -d
```
```podman
podman-compose up -d
```
:::

Alas 容器的网络模式为 host，这能让 Alas 容器内的 ADB 直接访问宿主机上模拟器，同时也能直接通过 http://localhost:22267 访问 Alas 面板。