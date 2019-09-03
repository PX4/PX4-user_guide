# 基本コンセプト

本章では，ドローンの簡単な解説と，PX4の使い方について説明します。(初心者向けの内容ですが，熟練者にも良い紹介になると思われます)。

もし，すでに基本コンセプトについてご存知であれば，[基本構成](../assembly/README.md)にジャンプし，オートパイロット用機器の接続方法について学ぶことができます。 *QGroundControl*を用いてファームウェアを書き込んだり，機体のセットアップを行うには，[Basic Configuration](../config/README.md)を参照してください。

## ドローンってなに？

ドローンは遠隔操縦または自律操縦可能な無人の”ロボット型”移動体です。

ドローンは産業用や軍用等，[様々な用途で](http://px4.io/applications/)多くの人に利用されています。 その活用例としては以下などがあります。(もちろん，これに限られません): 空撮．運送，レース，探査，調査等

> **Tip** ドローンには空，水上，海中用のものがあります。 これらは (より正確に言うと) Unmanned Aerial Vehicles (UAV), Unmanned Aerial Systems (UAS), Unmanned Ground Vehicles (UGV), Unmanned Surface Vehicles (USV), Unmanned Underwater Vehicles (UUV) などと呼ばれます。

ドローンの"頭脳"はオートパイロットと呼ばれます。 オートパイロットは *ビークルコントローラ* ("フライトコントローラ") と呼ばれるハードウェアと，そのうえで走る*フライトスタック* というソフトウェアで構成されています。

## PX4 オートパイロット {#autopilot}

[PX4](http://px4.io/) は強力なオープンソースのオートパイロット用 *フライトスタック*です。

PX4の主な特徴は以下の通りです:

- [様々な構造/タイプの機体](../airframes/airframe_reference.md)を制御することができます。例: 航空機 (マルチコプター, 固定翼機，VTOL機), 地上走行型ロボット，水中ドローン。 
- [ビークルコントローラ](#vehicle_controller)，センサー，周辺機器には，様々な選択肢があります。
- 柔軟かつパワフルな [フライトモード](#flight_modes) と [安全機能](#safety)。

PX4は地上局ソフト [QGroundControl](#qgc) や，[Pixhawk ハードウェア](https://pixhawk.org/)，機載PCやカメラ等の周辺機器とのMAVLink通信に用いられる[MAVSDK](http://mavsdk.mavlink.io) などの幅広いドローン用プラットフォームのコアとなります。 PX4は[Dronecode プロジェクト](https://www.dronecode.org/)によってサポートされています。

## QGroundControl {#qgc}

ドローンコードにおける地上局ソフトは [QGroundControl](http://qgroundcontrol.com/)と呼ばれています。 *QGroundControl* を用いることで，[コントローラ用ハードウェア](flight_controller_selection.md)にPX4のソフトウェアを書き込んだり，機体のセットアップ，パラメータの設定，リアルタイムでの機体情報取得，自動操縦の経路設定・実行などができます。

*QGroundControl* は，Windows・Android・MacOS・Linuxで動作します。 ダウンロード・インストールは [こちら](http://qgroundcontrol.com/downloads/)から。

![QGC Main Screen](../../images/qgc_main_screen.jpg)

## 機体コントローラ {#vehicle_controller}

PX4 は元々[Pixhawk シリーズ](../flight_controller/pixhawk_series.md) で動作するよう設計されていましたが, 現在ではLinuxコンピュータをはじめ，様々なハードウェアで動作可能です。 機体の物理的制約や，実現したい機能，そしてもちろんコストを考慮して，適切なハードウェアを選定してください。

より詳しい情報は以下を参照してください。: [コントローラの選択](flight_controller_selection.md).

## センサー

PX4 は機体の状態推定を行うために複数のセンサーを使用しています (安定化や，自動制御を行うために必要です)。 システムは *最低限* ジャイロセンサー，加速度センサー，磁気センサー (コンパス) ，気圧計を必要とします。 GPSやその他の測位システムは自動航行用の[モード](../getting_started/flight_modes.md#categories)を適用する場合や，各種操縦補助モードを適用する場合に必要です。 さらに，固定翼機やVTOL機では，大気速度センサーを使用するべきです (強く推奨します)。

詳細は以下を参照ください：

- [センサー](../getting_started/sensor_selection.md) 
- [周辺機器](../peripherals/README.md)

## ESC & モータ

多くのPX4ドローンでは，Electronic Speed Controller (ESC) によって駆動される，ブラシレスモータを使用します。 (ESCはフライトコントローラからの信号を受けて，モータへ供給する動力を適切に制御します)。

PX4によってサポートされているESC/モータについて，詳しくは以下をご参照ください：

- [ESC & モータ](../peripherals/esc_motors.md)
- [ESCキャリブレーション](../advanced_config/esc_calibration.md)
- [ESC ファームウェアとプロトコルの概要](https://oscarliang.com/esc-firmware-protocols/) (oscarliang.com)

## バッテリー/動力源

PX4ドローンの多くはリチウムポリマー(LiPo) バッテリーによって駆動されています。 バッテリーは多くの場合， *パワーモジュール* や *パワーマネージメント基板*を介してシステムに接続され，これらからフライトコントローラやESCへの電源供給が行われます。

バッテリーおよびバッテリーに関する設定については [バッテリー設定](../config/battery.md)および [基本構成](../assembly/README.md) に記載されています。(例： [Pixhawk 4 簡易設定 > 電源](../assembly/quick_start_pixhawk4.md#power)).

## 無線操縦 (RC) {#rc_systems}

[無線操縦 \(RC\)](../getting_started/rc_transmitter_receiver.md) システムは *手動で* 機体を制御するために使用します。 無線操縦システムはスティックやスイッチの情報を送る送信機と，機体に取り付けられた受信機によって構成されます。 一部の無線操縦システムでは，オートパイロットからのテレメトリー情報を受信することもできます。

> **Note** PX4 は自動操縦モードでは無線操縦システムを必要としません。

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[RCシステムの選択](../getting_started/rc_transmitter_receiver.md) ではどのように無線操縦システムの選択方法について説明しています。 その他，以下の関連コンテンツがあります。

- [無線/遠隔操縦のセットアップ](../config/radio.md) - *QGroundControl*を用いた遠隔操縦システムの設定について
- [Flying 101](../flying/basic_flying.md) - 遠隔操縦を使用しての飛行方法。
- [FrSky テレメトリー](../peripherals/frsky_telemetry.md) - RC送信機を用いたPX4からのテレメトリー・ステータス情報の受信設定方法。

## Safety Switch {#safety_switch}

It is common for vehicles to have a *safety switch* that must be engaged before the vehicle can be [armed](#arming) (when armed, motors are powered and propellers can turn). Commonly the safety switch is integrated into a GPS unit, but it may also be a separate physical component.

> **Note** A vehicle that is armed is potentially dangerous. The safety switch is an additional mechanism that prevents arming from happening by accident.

## Data/Telemetry Radios

[Data/Telemetry Radios](../telemetry/README.md) can provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. This makes it possible to tune parameters while a vehicle is in flight, inspect telemetry in real-time, change a mission on the fly, etc.

## Offboard/Companion Computer

PX4 can be controlled from a separate on-vehicle companion computer via a serial cable or wifi. The companion computer will usually communicate using a MAVLink API like the MAVSDK or MAVROS.

> **Note** Using a Robotics API requires software development skills, and is outside the scope of this guide.

- [オフボードモード](../flight_modes/offboard.md) - 地上局(GCS) や機載コンピュータからPX4を用いて飛行を行うためのモード。 
- [ロボティクスAPI APIs](https://dev.px4.io/en/robotics/) (PX4 Developer Guideへ移動します。)

## Removable Memory/Logging

PX4 uses SD memory cards for storing [flight logs](../getting_started/flight_reporting.md) (SD support may not be present on every flight controller).

> **Tip** The maximum supported SD card size on Pixhawk boards is 32GB.

A number of recommended cards are listed in: [Developer Guide > Logging](http://dev.px4.io/en/log/logging.html#sd-cards)

## Disarmed/Pre-armed/Armed {#arming}

Vehicles may have moving parts, some of which are potentially dangerous when powered (in particular motors and propellers)!

To reduce the chance of accidents, PX4 has explicit state(s) for powering the vehicle components:

- **Disarmed:** There is no power to motors or actuators.
- **Pre-armed:** Actuators and other non-dangerous electronics are powered. 
  - In this state you can move ailerons, flaps etc, but motors/propellers are locked.
- **Armed:** Vehicle is fully powered, including motors/propellers.

By default, a [safety switch](../getting_started/px4_basic_concepts.md#safety_switch) is used to enter the pre-armed state. Arming is then enabled using an arming sequence, switch or MAVLink command.

The vehicle is initially disarmed, and must be armed before flight; if you don't take off quickly enough it will automatically disarm (returning the vehicle to a safe state). Similarly, when you land the vehicle will usually automatically disarm so that it can be approached safely.

> **Note** The arming behaviour can be [configured](../advanced_config/prearm_arm_disarm.md) (e.g. the time until vehicle automatically disarms after landing).

## Flight Modes {#flight_modes}

Flight modes provide different types/levels of vehicle automation and autopilot assistance to the user (pilot). *Autonomous modes* are fully controlled by the autopilot, and require no pilot/remote control input. These are used, for example, to automate common tasks like takeoff, returning to the home position, and landing. Other autonomous modes execute pre-programmed missions, follow a GPS beacon, or accept commands from an offboard computer or ground station.

*Manual modes* are controlled by the user (via the RC control sticks/joystick) with assistance from the autopilot. Different manual modes enable different flight characteristics - for example, some modes enable acrobatic tricks, while others are impossible to flip and will hold position/course against wind.

> **Tip** Not all flight modes are available on all vehicle types, and some modes can only be used when specific conditions have been met (e.g. many modes require a global position estimate).

An overview of the available flight modes [can be found here](../getting_started/flight_modes.md). Instructions for how to set up your remote control switches to turn on different flight modes is provided in [Flight Mode Configuration](../config/flight_mode.md).

## Safety Settings (Failsafe) {#safety}

PX4 has configurable failsafe systems to protect and recover your vehicle if something goes wrong! These allow you to specify areas and conditions under which you can safely fly, and the action that will be performed if a failsafe is triggered (for example, landing, holding position, or returning to a specified point).

> **Note** You can only specify the action for the *first* failsafe event. Once a failsafe occurs the system will enter special handling code, such that subsequent failsafe triggers are managed by separate system level and vehicle specific code.

The main failsafe areas are listed below:

- Low Battery
- Remote Control (RC) Loss
- Position Loss (global position estimate quality is too low).
- Offboard Loss (e.g. lose connection to companion computer)
- Data Link Loss (e.g. lose telemetry connection to GCS).
- Geofence Breach (restrict vehicle to flight within a virtual cylinder).
- Mission Failsafe (prevent a previous mission being run at a new takeoff location).
- Traffic avoidance (triggered by transponder data from e.g. ADSB transponders).

For more information see: [Safety](../config/safety.md) (Basic Configuration).

## Heading and Directions

All the vehicles, boats and aircraft have a heading direction or an orientation based on their forward motion.

![Frame Heading](../../images/frame_heading.png)

It is important to know the vehicle heading direction in order to align the autopilot with the vehicle vector of movement. Multicopters have a heading even when they are symmetrical from all sides! Usually manufacturers use a colored props or colored arms to indicate the heading.

![Frame Heading TOP](../../images/frame_heading_top.png)

In our illustrations we will use red coloring for the front propellers of multicopter to show heading.

You can read in depth about heading in [Flight Controller Orientation](../config/flight_controller_orientation.md)