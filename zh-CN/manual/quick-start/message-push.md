# 消息推送

Alas 使用 [Onepush](https://github.com/y1ndan/onepush) 提供消息推送。可接入各种消息平台，例如 Bark，ServerChan，Discord，邮件等。
支持列表见 [Onepush providers](https://github.com/y1ndan/onepush/tree/main/onepush/providers)  
但要注意， [Onepush](https://github.com/y1ndan/onepush) 在 Windows 下使用时需要设置设备名称为英文（右键此电脑-属性-重命名这台电脑），不然可能会导致Python报错。

## 获取推送参数

在推送配置部分中的各服务文档获取需要的推送参数。

没写到的欢迎补充 ![](https://img.shields.io/badge/help-wanted-blueviolet) 

## 推送配置

配置为 yaml 格式，需要提供 推送服务名 `provider` 和对应的参数。

### Bark

> [使用文档](https://bark.day.app)

```yaml
provider: bark
key: Vg*******************
```

更多可选参数，例如添加 `sound`

```yaml
provider: bark
key: Vg*******************
sound: alert
```

<details>
<summary>Key 的详细获取方式</summary>

以 [Bark](https://apps.apple.com/us/app/bark-customed-notifications/id1403753865) 为例，在 Onepush 仓库中，查看 [providers/bark.py](https://github.com/y1ndan/onepush/blob/main/onepush/providers/bark.py) 
```python
    _params = {
        'required': ['key'],
```
表示该推送方法需要填写参数 `key`。

使用默认服务器时，在服务器列表中可以找到 `key` (红框标示处)
<details>
<summary>展开图片</summary>

![image](https://user-images.githubusercontent.com/22175295/185565400-e7d99352-be45-403b-9d10-463da6863c31.png)
</details>

即 `Vg*******************`

如果你有自己的 bark 服务器，需要将完整链接作为 `key`  

即 `https://bark.xxx.xxx/Fkq5***************`  
</details>


### 邮件

```yaml
provider: smtp
host: smtp.qq.com      # smtp：服务器地址
user: 123456789@qq.com # 用户名：通常是你的邮箱。
password: Passw0rd!    # 登录密码：一般为需要单独申请的授权码。
port: 465              # smtp：服务器端口，如果有提供ssl端口(465)建议使用。不填写时默认为 25
# ssl: true            # 显式指定使用ssl连接，端口是465时默认为true。
```

```yaml
provider: smtp
host: smtp.gmail.com
user: your@gmail.com
password: Passw0rd!
port: 587
ssl: true

```

<details>
<summary>常见邮箱</summary>

* 163邮箱: https://note.youdao.com/ynoteshare/index.html?id=f9fef46114fb922b45460f4f55d96853
  - host: `smtp.163.com`
  - port: `465`

* qq邮箱: https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=166&&id=28
  - host: `smtp.qq.com`
  - port: `465`

* gmail: https://support.google.com/mail/answer/7104828?hl=zh-Hans
  - host: `smtp.gmail.com`
  - port: `587`
  - ssl: `true`

</details>


### Pushplus

> [官网](https://www.pushplus.plus/)

```yaml
provider: pushplus
token: ********************
```

### Pushdeer

> [官网](https://www.pushdeer.com/product.html)

```yaml
provider: pushdeer
pushkey: **********************
```

### Server 酱 Turbo 版

> [官网](https://sct.ftqq.com/)
> 
> Server 酱已停止运行，需使用 Turbo 版，免费版每天限制五条。

```yaml
provider: serverchanturbo 
sctkey: SCT16*************************
```

### Discord Webhook

> [文档](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

```yaml
provider: discord 
webhook: https://discord.com/api/webhooks/12345678912345678900/verylongstring_veryveryverylongrandomstring
```

### Telegram Bot

> [文档](https://core.telegram.org/bots/api#sendmessage)

```yaml
provider: telegram
token: 16xxxxxxx:xxxxxxxxxxx       # 从 @BotFather 获取
userid: 10000000                   # 从 @userinfobot 获取
api_url: api.telegram.org          # 国内需使用反代 API 或网络代理
```

### 企业微信应用

> [文档](https://work.weixin.qq.com/api/doc/90000/90135/90236)

```yaml
provider: wechatworkapp
corpid: xxxxxxxx
corpsecret: xxxxxxxx
agentid: 10001
```

### 企业微信机器人

> [文档](https://work.weixin.qq.com/api/doc/90000/90136/91770)

```yaml
provider: wechatworkbot
key: xxxxxxxx
```

### 钉钉群机器人

> [文档](https://open.dingtalk.com/document/robots/custom-robot-access)

```yaml
provider: dingtalk
token: xxxxxxxx
```

### go-cqhttp

> [文档](https://docs.go-cqhttp.org/api/#%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF)

```yaml
provider: gocqhttp
endpoint: http://cqhttp.example.com:5700
token: YOUR_TOKEN       # 设置了 access_token 时需要
message_type: private          # private 为私聊消息，group 为群聊消息
# user_id: 12345678             # message_type 为 private 时需要
# group_id: 12345678            # message_type 为 group 时需要
```

### 自定义 Webhook
```yaml
provider: custom
url: https://your.web.hook/path
method: post                      # http 请求方法
data:                             # data 字典
  your_arg: aaa
  your_arg2: bbb
```

## 导入推送配置到Alas
最后将得到的 json 填入 `Alas` -> `Alas设置` -> `调试设置` -> `错误推送设置` 即可。

## 测试推送
![邮件](/manual/quick-start/message/mail.png)

打开游戏的邮件页面，找一个任务清空下次运行时间加入队列，启动 Alas 即可。等待10秒左右会报错并发送 GamePageUnknownError。
