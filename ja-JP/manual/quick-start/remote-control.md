# 远程控制
Alas 远程访问服务

## 使用方式

在 `./config/deploy.yaml` 中找到这些

```yaml{4,7,11,20}
RemoteAccess:
    # Enable remote access (using ssh reverse tunnel serve by https://github.com/wang0618/localshare)
    # ! You need to set Password below to enable remote access since everyone can access to your alas if they have your url.
    EnableRemoteAccess: false
    # Username when login into ssh server
    # [Default] null (will generate a random one when startup)
    SSHUser: null
    # Server to connect
    # [Default] null
    # [Format] host:port
    SSHServer: null
    # Filepath of SSH executable `ssh.exe`
    # [Default] ssh (find ssh in system PATH)
    # If you don't have one, install OpenSSH or download it here (https://github.com/PowerShell/Win32-OpenSSH/releases)
    SSHExecutable: ssh

Webui:
    # --key. Password of web ui
    # Useful when expose Alas to the public network
    Password: null
```

启用 `EnableRemoteAccess` 。

设置 Webui 密码 `Password` 。

### SSHServer

在可用服务器中选择一个填入 `SSHServer`

|      |SSHServer                   |服务器位置|
|------|:--------------------------:|:---------:|
|hk1	 |app.hk1.azurlane.cloud:10022|	中国香港    |	
|us1	 |app.us1.azurlane.cloud:10022|	美国       |

延迟测试 http://app.azurlane.cloud/speedtest.html

:::warning
延迟测试仅供测试延迟，下载速度并非真实速度（限制在约4.5Mbps）。
:::

### SSHUser
默认情况下，填写 `null` 时启动远程服务后会自动生成一个长度 24 的随机用户名。
无特殊情况不需要你更改。
⚠️ 如果多个客户端共用一个用户名，新连接的客户端会顶替旧的客户端，且旧的客户端`不会掉线`。如果你想使用自己的用户名请确保不会被别人猜到，`后果自负`。

:::info
由于每次连接都会生成一个不同的路径后缀，在连接不稳定被断开重连或者重启 Alas 后远程连接地址会变化。
所以列表中的服务器使用了修改后的 localshare，其中 ssh 的连接用户名会作为 token 使用。
使用至少 8 位 的用户名会在内存中缓存远程连接地址，下一次重新连接时会分配相同的路径。
:::

### SSHExecutable

远程访问依赖于 ssh 工作。一般 Windows 10 自带 ssh 工具，如果提示你没有，安装 OpenSSH 或者在 Github 的 [Release](https://github.com/PowerShell/Win32-OpenSSH/releases) 下载 SSH (OpenSSH-Win64.zip)，解压出里面的 ssh.exe ，将文件路径填入 SSHExecutable 或自行配置环境变量。

点击直接下载 [ssh.exe](https://app.azurlane.cloud/ssh.exe)