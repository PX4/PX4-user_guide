# カメラのトリガー

カメラトリガードライバーを用いると，AUXポートを使用して，カメラトリガー用のパルス信号を出力することができます。 本機能は，航空測量や3次元復元のためのタイムスタンプ付き画像の取得や，複数のカメラの同期撮影，VIO(Visual Inertial Navigation, 光学慣性航法) に役立ちます。

パルス信号の計測に加えて，連番(つまり，現在のセッションの画像番号) とタイムスタンプを含んだMAVLinkメッセージも出力されます。

## トリガー設定 {#trigger_setup_qgc}

トリガー設定は通常 *QGroundControl* を用いて、 [Vehicle Setup > Camera](https://docs.qgroundcontrol.com/en/SetupView/Camera.html#px4-camera-setup) セクションより行います。

![Trigger pins](../../assets/camera/trigger_pins.png)

[トリガーモード](#trigger_mode)の違い, [バックエンドインターフェース](#trigger_backend),[ハードウェア設定](#hardware_setup) について、以下で説明します。(各項目は[パラメータ](../advanced_config/parameters.md)を用いて設定することも可能です)。

> **Note** カメラ設定は、通常FMU-v2ベースのフライトコントローラ (例. 3DR Pixhawk) では、ファームウェアに標準では含まれていないため、利用不可能です。 詳細については [パラメータの検索/変更 > ファームウェアに含まれないパラメータ](../advanced_config/parameters.md#parameter-not-in-firmware)を参照してください。

## トリガーモード {#trigger_mode}

トリガーモードは全部で4種類あり, [TRIG_MODE](../advanced_config/parameter_reference.md#TRIG_MODE) パラメータを用いて変更可能です。:

| モード | 説明                                                                                                                        |
| --- | ------------------------------------------------------------------------------------------------------------------------- |
| 0   | カメラトリガーは無効                                                                                                                |
| 1   | MAVLinkの`MAV_CMD_DO_TRIGGER_CONTROL` コマンドによってオンオフ可能なインターバル撮影モードとして機能します。 詳細は[コマンドインターフェース](#command_interface) を参照してください。 |
| 2   | インターバル撮影を常に行います。                                                                                                          |
| 3   | 距離に応じてトリガーを行うモードです。 あらかじめ設定された水平距離を飛行するたびに，撮影が行われます。 ただし，2トリガー間の最短時間は設定されたトリガーインターバル時間以上となるよう制限されます。                      |
| 4   | Missionモードで飛行中，ミッション設定に応じて自動的にトリガーされます。                                                                                   |

> **Info** はじめてカメラーのトリガー設定を行う場合, `TRIG_MODE` パラメータの変更後に再起動を忘れずに行ってください。

## トリガーハードウェア設定 {#hardware_setup}

どのピンを用いてトリガーを行うかは，[TRIG_PINS](../advanced_config/parameter_reference.md#TRIG_PINS) パラメータを用いて設定することができます。 標準値は56となっており、これは *FMU* の5番と6番のピンを使用することを意味しています。

> **Note** FMU 基板と I/O 基板を両方有するPixhawkフライトコントローラでは、このFMUピン設定は `AUX5` と `AUX6` を使用することを意味します(例： Pixhawk 4, CUAV v5+)。 FMU基板のみを有するフライトコントローラでは、`MAIN5` と `MAIN6` です(例：Pixhawk 4 mini, CUAV v5 nano)。 現時点では，トリガー機能はFMUピンでのみ動作し，I/Oボード上のピンではトリガーを行うことはできません。

<span></span>

> **Warning** `TRIG_PINS` を **標準の** 56に設定した場合のみ、 AUXピンの1, 2, 3, 4番を(サーボ/ESCなどの) アクチュエータ出力として利用可能です。 ハードウェアタイマーの実装方法の都合で (1234 と 56 はそれぞれ2つの独立したタイマーで駆動される別々のグループとなっています), 本設定がカメラトリガーとFMUからのアクチュエータ出力を同時に可能とする唯一の設定です。 **アクチュエータ出力が必要な場合 `TRIG_PINS` の設定を絶対に変更しないでください。**

## トリガーインターフェースのバックエンド {#trigger_backend}

カメラトリガードライバーは、用途に応じていくつかのバックエンドをサポートしており、[TRIG_INTERFACE](../advanced_config/parameter_reference.md#TRIG_INTERFACE)パラメータを用いて切り替えることができます。

| 番号 | 説明                                                                                                                                                                                                                                                                                           |
| -- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | GPIOインターフェースを有効にします。 AUX出力からHIGHもしくはLOWのパルス信号 (`TRIG_POLARITY` パラメータによって極性は設定されます) が [TRIG_INTERVAL](../advanced_config/parameter_reference.md#TRIG_INTERVAL) で設定した間隔で出力されます。 本設定は多くのマシンビジョンカメラのトリガーに直接使用することができます。 なお、PX4FMUシリーズのハードウェア (Pixhawk, Pixracerなど) では信号レベルが3.3Vであることに注意してください。   |
| 2  | Seagull MAP2用のインターフェースを有効にします。 本設定を選択すると、 [Seagull MAP2](http://www.seagulluav.com/product/seagull-map2/) を用いて様々なカメラの制御が可能となります。 MAP2 の1番ピンは`TRIG_PINS`で支持されたAUXピンの小さい番号の方 (つまり、1番ピンはAUX 5に、2番ピンはAUX 6に) に接続するのが標準となります。 本モードでは、QX-1などのSonyのMultiportを使用するカメラを用いた場合、PX4は自動起動や電源保持機能もサポートします。 |
| 3  | MAVLinkインターフェースを有効にします。 本モードでは，ハードウェア的な出力は行われません。 MAVLinkの `CAMERA_TRIGGER` メッセージのみが出力されます。(標準の設定では，`onboard`モードでのみ動作します。 その他のモードで使用する場合，カスタムのストリーミング設定を行う必要があります)。                                                                                                                          |
| 4  | 汎用的なPWMインターフェースを有効にします。 本モードでは、 [赤外線トリガー](https://hobbyking.com/en_us/universal-remote-control-infrared-shutter-ir-rc-1g.html) やサーボを用いたトリガーが可能となります。                                                                                                                                         |

## その他のパラメータ

| パラメータ                                                                      | 説明                                                                                                            |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [TRIG_POLARITY](../advanced_config/parameter_reference.md#TRIG_POLARITY)   | GPIOインターフェースを使用している時のみ反映されます。 トリガーピンの極性を設定します。 アクティブハイは、通常はロー状態であり、トリガーイベント発生時にハイとなることを意味します。 アクティブローはその反対です。 |
| [TRIG_INTERVAL](../advanced_config/parameter_reference.md#TRIG_INTERVAL)   | 連続する2つのトリガーイベント間の時間をミリ秒単位で設定します。                                                                              |
| [TRIG_ACT_TIME](../advanced_config/parameter_reference.md#TRIG_ACT_TIME) | トリガー信号は”アクティブ”に保持される時間の長さをミリ秒単位で設定します。 PWMモードでは、アクティブパルスを常に50Hz PWM信号に適合させるために、最小値は40ミリ秒に制限されています。            |

カメラトリガーモジュールに関連するパラメーターの完全なリストは、[パラメーターリファレンス](../advanced_config/parameter_reference.md#camera-trigger)ページにあります。

## コマンドインターフェイス {#command_interface}

**TODO : アップデートが必要な項目です。**

カメラトリガードライバーはいくつかのコマンドをサポートしています。:

[MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) は "コマンド制御"モードの最中に有効となります (`TRIG_MODE` 1)。

| コマンドパラメーター | 説明                                                     |
| ---------- | ------------------------------------------------------ |
| Param #1   | トリガーの有効化/無効化 (0は無効，1は有効)                               |
| Param #2   | トリガーのサイクル時間をミリ秒単位で指定します。(`TRIG_INTERVAL` パラメータを設定します。) |
| Param #3   | シーケンスのリセット(1を指定すると画像の連番のリセットを、0を指定すると現在のカウントを保持します。)   |

[MAV_CMD_DO_DIGICAM_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_DIGICAM_CONTROL) はすべてのモードで利用可能です。 本コマンドは、地上局ソフトから試し撮りを行うために使用されます。 トリガードライバーは、MAVLinkで規定されているすべてのパラメータのサポートをまだ実現できていません。

| コマンドパラメータ | 説明                                     |
| --------- | -------------------------------------- |
| Param #5  | 1枚のみの撮影信号をトリガーします(1を指定すると1枚のみ撮影を行います)。 |

[MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - "ミッション制御"モードでのみ有効です。 (`TRIG_MODE` 4)

本コマンドはミッションの最中に地上局ソフトから指定されたミッションの設定に応じてトリガーが行われるたびに、自動生成されます。

## トリガー機能の動作確認

1. PX4 のコンソール画面にて: ```camera_trigger test```
2. *QGroundControl*にて:
    
    **Trigger Camera** と書かれたメイン画面上のボタンをクリックします。 これらの撮影はログに反映されず、ジオタグにもカウントされません。
    
    ![QGC Test Camera](../../assets/camera/qgc_test_camera.png)

## Sony QX-1 の例 (写真測量)

![photogrammetry](../../assets/camera/photogrammetry.png)

本例では、Seagull MAP2トリガーケーブルをSony QX-1と組み合わせて、自動航行でサーベイミッションを行ったあとに、オルソモザイク画像を生成します。

### トリガー設定

推奨カメラ設定は以下の通りです。:

* `TRIG_INTERFAC=2`(Seagull MAP2) とします 。
* `TRIG_MODE=4` (Mission による制御) とします。
* その他のパラメータはデフォルト値のままにします。

Seagull MAP2をオートパイロットのAUX/FMUピンに接続します。 Pin 1 は`AUX 5`に、 Pin 2 は`AUX 6`に接続します。 MAP2 のもう一端はQX-1の "MULTI" ポートに接続します。

### カメラ設定

ここでは、Sony QX-1を16-50mm f3.5-5.6 レンズと組み合わせて使用します。

カメラがトリガーされた際にオートフォーカスと測光の遅れを避けるために、次のガイドラインに従う必要があります。

* マニュアルにてフォーカスを無限遠に設定
* カメラを連続撮影モードに設定
* 露出と絞りを手動で設定する
* ISOは可能な限り低く設定する
* シーンに応じて、ホワイトバランスを手動で設定する

### ミッションプランニング

![QGC Survey Polygon](../../assets/camera/qgc_survey_polygon.jpeg)

![QGC Survey Parameters](../../assets/camera/qgc_survey_parameters.jpg)

### ジオタグの付与

Download/copy the logfile and images from the flight and point QGroundControl to them. Then click on "Start Tagging".

![QGC Geotagging](../../assets/camera/qgc_geotag.png)

You can verify the geotagging using a free online service like [Pic2Map](https://www.pic2map.com/). Note that Pic2Map is limited to only 40 images.

### Reconstruction

We use [Pix4D](https://pix4d.com/) for 3D reconstruction.

![GeoTag](../../assets/camera/geotag.jpg)

## Camera-IMU sync example (VIO)

In this example, we will go over the basics of synchronising IMU measurements with visual data to build a stereo Visual-Inertial Navigation System (VINS). To be clear, the idea here isn't to take an IMU measurement exactly at the same time as we take a picture but rather to correctly time stamp our images so as to provide accurate data to our VIO algorithm.

The autopilot and companion have different clock bases (boot-time for the autopilot and UNIX epoch for companion), so instead of skewing either clock, we directly observe the time offset between the clocks. This offset is added or subtracted from the timestamps in the MAVLink messages (e.g `HIGHRES_IMU`) in the cross-middleware translator component (e.g MAVROS on the companion and `mavlink_receiver` in PX4). The actual synchronisation algorithm is a modified version of the Network Time Protocol (NTP) algorithm and uses an exponential moving average to smooth the tracked time offset. This synchronisation is done automatically if MAVROS is used with a high-bandwidth onboard link (MAVLink mode `onboard`).

For acquiring synchronised image frames and inertial measurements, we connect the trigger inputs of the two cameras to a GPIO pin on the autopilot. The timestamp of the inertial measurement from start of exposure and a image sequence number is recorded and sent to the companion computer (`CAMERA_TRIGGER` message), which buffers these packets and the image frames acquired from the camera. They are matched based on the sequence number (first image frame is sequence 0), the images timestamped (with the timestamp from the `CAMERA_TRIGGER` message) and then published.

The following diagram illustrates the sequence of events which must happen in order to correctly timestamp our images.

![Sequence diag](../../assets/camera/sequence_diagram.jpg)

<!-- Could generate using Mermaid: https://mermaidjs.github.io/mermaid-live-edito
{/% mermaid %/}
sequenceDiagram
  Note right of PX4 : Time sync with mavros is done automatically
  PX4 ->> mavros : Camera Trigger ready
  Note right of camera driver : Camera driver boots and is ready
  camera driver ->> mavros : mavros_msgs::CommandTriggerControl
  mavros ->> PX4 : MAVLink::MAV_CMD_DO_TRIGGER_CONTROL
  loop Every TRIG_INTERVAL milliseconds
  PX4 ->> mavros : MAVLink::CAMERA_TRIGGER
  mavros ->> camera driver : mavros_msgs::CamIMUStamp
  camera driver ->> camera driver : Match sequence number
  camera driver ->> camera driver : Stamp image and publish
end
{/% endmermaid %/}
-->

### Step 1

First, set the TRIG_MODE to 1 to make the driver wait for the start command and reboot your FCU to obtain the remaining parameters.

### Step 2

For the purposes of this example we will be configuring the trigger to operate in conjunction with a Point Grey Firefly MV camera running at 30 FPS.

* `TRIG_INTERVAL`: 33.33 ms
* `TRIG_POLARITY`: 0 (active low)
* `TRIG_ACT_TIME`: 0.5 ms. The manual specifies it only has to be a minimum of 1 microsecond.
* `TRIG_MODE`: 1, because we want our camera driver to be ready to receive images before starting to trigger. This is essential to properly process sequence numbers.
* `TRIG_PINS`: 56, Leave default.

### Step 3

Wire up your cameras to your AUX port by connecting the ground and signal pins to the appropriate place.

### Step 4

You will have to modify your driver to follow the sequence diagram above. Public reference implementations for [IDS Imaging UEye](https://github.com/ProjectArtemis/ueye_cam) cameras and for [IEEE1394 compliant](https://github.com/andre-nguyen/camera1394) cameras are available.