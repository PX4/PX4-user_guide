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

PX4 uses sensors to determine vehicle state (needed for stabilization and to enable autonomous control). The system *minimally requires* a gyroscope, accelerometer, magnetometer (compass) and barometer. A GPS or other positioning system is needed to enable all automatic [modes](../getting_started/flight_modes.md#categories), and some assisted modes. Fixed wing and VTOL-vehicles should additionally include an airspeed sensor (very highly recommended).

For more information see:

- [Sensors](../getting_started/sensor_selection.md) 
- [Peripherals](../peripherals/README.md)

## ESCs & Motors

Many PX4 drones use brushless motors that are driven by the flight controller via an Electronic Speed Controller (ESC) (the ESC converts a signal from the flight controller to an appropriate level of power delivered to the motor).

For information about what ESC/Motors are supported by PX4 see:

- [ESC & Motors](../peripherals/esc_motors.md)
- [ESC Calibration](../advanced_config/esc_calibration.md)
- [ESC Firmware and Protocols Overview](https://oscarliang.com/esc-firmware-protocols/) (oscarliang.com)

## Battery/Power

PX4 drones are mostly commonly powered from Lithium-Polymer (LiPo) batteries. The battery is typically connected to the system using a *Power Module* or *Power Management Board*, which provide separate power for the flight controller and to the ESCs (for the motors).

Information about batteries and battery configuration can be found in [Battery Configuration](../config/battery.md) and the guides in [Basic Assembly](../assembly/README.md) (e.g. [Pixhawk 4 Wiring Quick Start > Power](../assembly/quick_start_pixhawk4.md#power)).

## Radio Control (RC) {#rc_systems}

A [Radio Control \(RC\)](../getting_started/rc_transmitter_receiver.md) system is used to *manually* control the vehicle. It consists of a remote control unit that uses a transmitter to communicate stick/control positions with a receiver based on the vehicle. Some RC systems can additionally receive telemetry information back from the autopilot.

> **Note** PX4 does not require a remote control system for autonomous flight modes.

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[RC System Selection](../getting_started/rc_transmitter_receiver.md) explains how to choose an RC system. Other related topics include:

- [Radio/Remote Control Setup](../config/radio.md) - Remote control configuration in *QGroundControl*.
- [Flying 101](../flying/basic_flying.md) - Learn how to fly with a remote control.
- [FrSky Telemetry](../peripherals/frsky_telemetry.md) - Set up the RC transmitter to receive telemetry/status updates from PX4.

## Data/Telemetry Radios

[Data/Telemetry Radios](../telemetry/README.md) can provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. This makes it possible to tune parameters while a vehicle is in flight, inspect telemetry in real-time, change a mission on the fly, etc.

## Offboard/Companion Computer

PX4 can be controlled from a separate on-vehicle companion computer via a serial cable or wifi. The companion computer will usually communicate using a MAVLink API like the MAVSDK or MAVROS.

> **Note** Using a Robotics API requires software development skills, and is outside the scope of this guide.

- [Off-board Mode](../flight_modes/offboard.md) - Flight mode for offboard control of PX4 from a GCS or companion computer. 
- [Robotics APIs](https://dev.px4.io/en/robotics/) (PX4 Developer Guide)

## Removable Memory/Logging

PX4 uses SD memory cards for storing [flight logs](../getting_started/flight_reporting.md) (SD support may not be present on every flight controller).

> **Tip** The maximum supported SD card size on Pixhawk boards is 32GB.

A number of recommended cards are listed in: [Developer Guide > Logging](http://dev.px4.io/en/log/logging.html#sd-cards)

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