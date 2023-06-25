# 目录内容

本篇主要展示 Alas 的目录结构以及主要文件和文件夹。注意，这并不是完整的 Alas 目录内容，仅作演示。

```sh
AzurLaneAutoScript:
│  Alas.exe               === Alas 启动器
│  alas.py                ··· Alas 入口文件
│  console.bat            --- 带有 Alas 运行环境的命令行
│  gui.py                 ··· Alas 前端入口文件
│  requirements.txt       ··· Alas 依赖
│
├─config
│      alas.json          === Alas 运行设置
│      deploy.yaml        === Alas 环境配置
│
├─deploy
│  └─install
│          Alas.bat       ··· Alas 启动脚本
│
├─submodule               ··· 插件文件夹
│
├─toolkit
│  └─WebApp
│          alas.exe       ··· Alas Electron 界面
│
├─log
│  │  2020-03-29_alas.txt ··· (运行日志)
│  │
│  └─error
│      └─1585417260       === (错误日志文件夹)
│              2020-03-29_01-41-00-114514.png
│              log.txt
│
└─screenshots             ··· (截图文件夹)

注：
===：重要，请务必牢记
---：一般，也许会用上
···：了解即可
( )：运行后才会生成
```