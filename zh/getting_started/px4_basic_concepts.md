# 基本概念

本主题提供了无人机和使用 PX4 的基本介绍（主要面向新手用户，但对有经验的用户也是一个很好的介绍）。

如果你已经熟悉了基本概念，你可以转到[基本组件](../assembly/README.md)以了解如何连接特定的自驾仪硬件。 要加载固件并使用 *QGroundControl*设置飞行器，请查看[基本配置](../config/README.md)。

## 无人机是什么？

无人机是无人驾驶的 ”机器人“ 设备，可以远程或自动控制。

无人机可应用在消费、工业、军事领域[使用情形和应用案例](http://px4.io/applications/)。 这包括（非详尽）：航空摄影/录像，载货，竞速，搜索和测绘等。

> **Tip**存在用于空中、地面、海洋和水下各种不同类型的无人机。 这些（更正式地）被称为无人驾驶飞行器（UAV），无人驾驶飞行器系统（UAS），无人驾驶地面车辆（UGV），无人驾驶水面船只（USV），无人驾驶水下潜航器（UUV）。

无人机的 ”大脑“ 被称为自动驾驶仪。 它由在*设备控制器</ 0>（“飞行控制器”）硬件上运行的*飞行堆栈</ 0>软件组成。</p> 

## Dronecode 平台 {#dronecode}

PX4 是[ Dronecode平台](https://www.dronecode.org/platform/)的一部分 - 一个完整的无人机开发端到端平台，在一个通用的行业友好型开源许可下提供。 其中包括[PX4 飞行堆栈](#autopilot)，[QGroundControl ](#qgc)地面控制站，[ Dronecode SDK ](https://www.dronecode.org/sdk/)和[ Dronecode相机管理器](https://camera-manager.dronecode.org/en/)。

## PX4 自动驾驶仪 {#autopilot}

[ PX4 ](http://px4.io/)是强大的开源自动驾驶仪*飞行堆栈*。

PX4 的一些主要功能包括：

- 可控制[许多不同的设备机架/类型](../airframes/airframe_reference.md)，包括：飞机（多旋翼，固定翼和垂直起降），地面车辆和水下潜航器。 
- 适用于[设备控制器](#vehicle_controller)，传感器和其他外围设备的硬件选择。
- 灵活而强大的[飞行模式](#flight_modes)和[安全功能](#safety)。

## QGroundControl {#qgc}

Dronecode地面控制站称为[ QGroundControl ](http://qgroundcontrol.com/)。 您可以使用* QGroundControl *将（闪存）PX4 加载到[飞行器控制硬件上](flight_controller_selection.md)，您可以设置飞行器，更改不同参数，获取实时航班信息以及创建和执行完全自主的任务。

* QGroundControl *在 Windows，Android，MacOS 或 Linux 上运行。 从[这里](http://qgroundcontrol.com/downloads/)下载并安装。

![QGC Main Screen](../../images/qgc_main_screen.jpg)

## 设备/飞行控制板 {#vehicle_controller}

PX4最初设计为在 [ Pixhawk Series ](../flight_controller/pixhawk_series.md)控制器上运行，但现在可以在 Linux 计算机和其他硬件上运行。 选择飞行控制板时，您应当考虑飞行器的物理尺寸限制，想要执行的活动，还有必不可少的成本。

有关更多信息，请参阅：[飞行控制器选择](flight_controller_selection.md)。

## 传感器

PX4 使用传感器来确定飞行器状态（稳定和启用自动控制所需）。 系统*最低要求 *陀螺仪，加速度计，磁力计（罗盘）和气压计。 需要 GPS 或其他定位系统来启用所有自动[模式](../getting_started/flight_modes.md#categories)和一些辅助模式。 固定翼和 VTOL 飞行器还应包括空速传感器（特别推荐）。

有关详细信息，请参阅︰

- [传感器](../getting_started/sensor_selection.md) 
- [外设](../peripherals/README.md)

## 电调 & 电机

许多 PX4 无人机使用无刷电机，其由飞行控制器通过电子调速器（ESC）驱动（ESC将来自飞行控制器的信号转换为传递给电动机的合适功率水平）。

有关 PX4 支持的 ESC/Motors 的信息，请参阅：

- [电调 & 电机](../peripherals/esc_motors.md)
- [电调校准](../advanced_config/esc_calibration.md)
- [ESC 固件和协议概述](https://oscarliang.com/esc-firmware-protocols/)（oscarliang.com）

## 电池/电源

PX4 无人机通常由锂聚合物（LiPo）电池供电。 电池通常使用*电源模块 *或*电源管理板 *连接到系统，它为飞行控制器和 ESC（用于电动机）提供单独的动力。

有关电池和电池配置的信息，请参见[电池配置](../config/battery.md)和[基本组件](../assembly/README.md)（例如[ Pixhawk 4 接线快速入门>电源](../assembly/quick_start_pixhawk4.md#power)）。

## 无线电控制（遥控） {#rc_systems}

[无线电控制（RC ）](../getting_started/rc_transmitter_receiver.md)系统用于*手动 *控制飞行器。 It consists of a remote control unit that uses a transmitter to communicate stick/control positions with a receiver based on the vehicle. Some RC systems can additionally receive telemetry information back from the autopilot.

> **Note** PX4 does not require a remote control system for autonomous flight modes.

![Taranis X9D遥控器。](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[RC System Selection](../getting_started/rc_transmitter_receiver.md) explains how to choose an RC system. Other related topics include:

- [Radio/Remote Control Setup](../config/radio.md) - Remote control configuration in *QGroundControl*.
- [飞行 101](../flying/basic_flying.md) - 学习如何使用遥控器飞行。
- [FrSky Telemetry](../peripherals/frsky_telemetry.md) - Set up the RC transmitter to receive telemetry/status updates from PX4.

## 数传电台

[Data/Telemetry Radios](../telemetry/README.md) can provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. 这使得飞机飞行时调试、检查数传、更改任务等等成为了可能。

## Offboard/Companion Computer

PX4 can be controlled from a separate on-vehicle companion computer via a serial cable or wifi. The companion computer will usually communicate using a MAVLink API like the Dronecode SDK or MAVROS.

> **Note** Using a Robotics API requires software development skills, and is outside the scope of this guide.

- [Off-board Mode](../flight_modes/offboard.md) - Flight mode for offboard control of PX4 from a GCS or companion computer. 
- [Robotics APIs](https://dev.px4.io/en/robotics/) (PX4 Developer Guide)

## Removable Memory/Logging

PX4 uses SD memory cards for storing [flight logs](../getting_started/flight_reporting.md) (SD support may not be present on every flight controller).

> **Tip** The maximum supported SD card size on Pixhawk boards is 32GB.

A number of recommended cards are listed in: [Developer Guide > Logging](http://dev.px4.io/en/log/logging.html#sd-cards)

## 飞行模式 {#flight_modes}

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