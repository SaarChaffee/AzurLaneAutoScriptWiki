# 异常

介绍 module/exception.py 中的异常。

## CampaignEnd

关卡战斗结束

- 抛出

  - `BOSS Clear.` BOSS 战斗结束。
  - `In stage.` 战斗结束后退出至章节界面。
  - `Image is in stage` 对章节界面执行海图识别。
  - `Withdraw` 关卡撤退。

- 捕获

  - 结束当前关卡出击。

## MapDetectionError

海域地图识别错误

- 抛出

  - `Vanish point and distant point too close` 仅海图识别方法为 perspective 时，拟合得到的灭点和距点距离太近，拟合结果对于一点透视的计算无意义。通常是因为网格线太少，导致拟合出错，此时需要调整识别的参数。
  - `No data feed to load_homography, please input at least one.` 仅海图识别方法为 homography 时，未输入任何初始化透视参数。
  - `Failed to find a free tile` 仅海图识别方法为 homography 时，无法找到定位点。通常是因为识别的图像并不是海域地图的图像，或者地图地面的杂物较多影响识别。
  - `Camera outside map: offset=({x}, {y})` 海图识别时，镜头（画面中心）在地图外。`(x, y)` 是超出地图边界的距离。

- 捕获

  - 若信息为 `Camera outside map: offset=({x}, {y})`，将镜头重新对准至最近的海域网格内，并重新识别。

## MapWalkError

无法移动至目标点。目标点超出舰队的移动距离，或者通往目标点的道路被敌舰阻挡。

- 抛出

  - `walk_out_of_step` 在舰队移动时，在第一个消息框（INFO_BAR_1）出现 `移动` 二字。

- 捕获

  - 捕捉到第一次 MapWalkError 时，尝试降低舰队步长（FLEET_STEP）至 1，也就是一格一格地移动。若降低舰队步长后仍然捕捉到 MapWalkError，通常是因为敌人信息丢失，舰队位置错误，镜头位置错误。直接设置舰队步长为 1，一般不能解决问题。

## MapEnemyMoved

敌人已经移动，需要重新进行地图扫描。

- 抛出

  - 计算移动回合，若当前回合后精英敌人会移动，对已移动敌人的进行扫描，并抛出。玩家舰队移动 2 次或 3 次后，精英敌人移动。具体是 2 次还是 3 次，根据敌人不同而不同，可以查看 expedition_data_template.lua 中的 ai_mov 属性。若使用 map_extractor.py 生成地图文件，将自动提取至 MOVABLE_ENEMY_TURN。

- 捕获

  - 捕捉后，重新执行当前 battle_function，上限 10 次。超出次数后，抛出 `ScriptError('No combat executed.')`

## CampaignNameError

无法识别关卡名称。

- 抛出

  - `Stage not found: {name}` 无法在当前界面找到所请求的关卡名称。
  - 无法在当前界面找到所请求的章节序号。

- 捕获

  - 捕捉后重新识别，上限 20 次。超出次数后，抛出 `ScriptEnd('Campaign name error')`

## ScriptError

发生脚本内部错误，且无法处理。若开启 ENABLE_EXCEPTION，撤退，不抛出异常。

- 抛出

  - `No combat executed.` 未攻击敌人。当前 battle_function 执行后未攻击任何一个敌人。
  - `Battle function exhausted.` battle_function 耗尽。执行了超过 20 次 battle_function，尝试攻击了超过 20 个敌人。
  - `{key} filter switch object does not exist in module/retire/dock.py` 船坞筛选条件未在 module/retire/dock.py 中定义。
  - `No book found.` 在战术学院，检测不到任何一本技能书。
  - `Login failed more than 3` 游戏登录失败次数超过 3。
  - `'No ocr-tool found, please install tesseract by yourself and make sure to set correct env vars.'` 仅日服，未安装 tesseract。
  - `No jpn found in tesseract langs, please install japanese data files.` 仅日服，tesseract 中未安装 jpn 训练数据。

## ScriptEnd

脚本运行结束。

- 抛出

  - `Reach condition: {self.config.STOP_IF_MAP_REACH}` 触发用户设置中的停止条件。
  - `Campaign name error` 无法识别关卡名称，无法进入关卡。

- 捕获

  - `Script end` 停止脚本的运行。

## GameStuckError

游戏卡死。

- 抛出

  - `Wait too long` 等待时间过长。超过 60 秒和 60 张截图后无任何操作，或在战斗中超过 300 秒和 300 张截图后无任何操作，抛出。（若识别对象包含`BATTLE_STATUS_S` 或 `PAUSE`，认为在战斗中。）
  - `Triggered commission list flashing bug` 执行委托时，失败次数超过 3，可能触发游戏内的委托列表闪烁 bug，导致无法委托开始。

- 捕获

  - 仅在使用 GUI 运行时，重启游戏。在重启时，若再次发生 GameStuckError，不再捕捉，通常是因为服务器在维护，或者网络连接已断开。

## GameTooManyClickError

点击游戏内同一按钮， 或者执行相同滑动的次数过多。

- 抛出

  - `Too many click for a button: {button}` 点击或滑动某个按钮次数过多。若在最后 15 次点击中，包含 12 次当前点击，则抛出。

- 捕获

  - 仅在登录时，重启游戏，最大次数 3。超过次数后，抛出 `ScriptError('Login failed more than 3')`

## GameNotRunningError

游戏未运行。

- 抛出

  - `Game not running` 在无法识别的界面启动 Alas，且游戏未运行。

- 捕获

  - 仅在使用 GUI 运行时，重启游戏。

## AscreencapError

调用 ascreencap 发生错误。

- 抛出

  - `Repositioning byte pointer failed, corrupted aScreenCap data received` 无法定位 ascreencap 数据中的图片。
  - `aScreenCap header verification failure, corrupted image received.` 接收到的数据有误。

- 捕获

  - 重新安装 ascreencap。

## Exit without error

Alas 停止运行，不报错。通常是用户设置有误或者使用方式不对。

- ```sh
  Not supported screen size: {width}x{height}
  Alas requires 1280x720
  ```

  不支持的分辨率，Alas 需要在 1280x720 下运行。

- ```sh
  Received a pure black screenshot
  Color: {color}
  ```

  截图为纯黑色。通常是设备处于锁屏状态，或者当前模拟器不支持当前截图方式。

- ```sh
  Map file not found: campaign.{folder}.{name}
  ```

  未找到地图文件。通常是用户出击未适配的地图，或者运行目录有误。

- ```sh
  Unable to goto page_main
  Starting from current page is not supported
  Supported page: {[str(page) for page in self.ui_pages]}
  Supported page: Any page with a "HOME" button on the upper-right
  ```

  无法前往游戏主界面，不支持从当前游戏界面启动。Alas 可以自动切换到需要的游戏界面, 但是只允许在这些界面下启动：主界面，出击，编队，演习，每日，活动，SP 活动，任务领取。共斗活动。Alas 也可以在右上角有 “一键回港” 按钮的界面下启动。游戏中大部分界面都有这个按钮，除了主界面本身，后宅，指挥喵。

- ```sh
  UI route too long
  ```

  寻找到的游戏界面切换路径过长。防止自动切换游戏界面时进入死循环，快速占满内存。已经修复。

- ```sh
  Unknown raid mode: {mode}
  ```

  不支持的共斗活动难度。

- ```sh
  Unable to connect %s' % serial
  ```

  ADB 无法连接至该模拟器。

- ```sh
  No ship retired, exit
  This may happens because wrong options of one click retirement in game
  ```

  仅使用一键退役时，未退役任何船只，通常是游戏内的一键退役设置有误。

- ```sh
  No ship retired, exit
  This may happens because some filters are set in dock
  ```

  仅使用传统退役时，未退役任何船只，通常是在游戏内的船坞设置了别的筛选条件。

- ```sh
  Frame body does not strt with JPEG header
  ```

  仅使用 minicap 截图时，接收到的数据不是 JPEG 图像。

- ```sh
  Mob fleet [{self.FLEET_1}] and boss fleet [{self.FLEET_2}] is the same
  They should to be set to different fleets
  ```

  将道中队和 BOSS 队设置为同一队。企图使用骚操作绕过 Alas 必须使用两队的限制，最终也会在 BOSS 出现时报错，所以在保存设置时增加了检查。

- ```sh
  You should use 2 fleets from chapter 7 to 13
  Current: mob fleet [{self.FLEET_1}], boss fleet [{self.FLEET_2}]
  ```

  在 7 到 13 章需要使用两队。解释同上。

- ```sh
  Ocr model not prepared: {model_dir}
  ```

  未找到 OCR 模型，或 OCR 模型不符合要求。

- ```sh
  Enemy detection template not found: {name}
  ```

  未找到精英敌人的识别模板，通常是开发者适配地图时有遗漏，或者命名有误。

- ```sh
  No suitable version of aScreenCap lib is available
  Please use ADB or uiautomator2 screenshot instead
  ```

  acreencap 不支持这个模拟器或这个安卓版本，请使用 ADB 或 uiautomator2 截图。
