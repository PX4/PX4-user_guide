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

[无线电控制（RC ）](../getting_started/rc_transmitter_receiver.md)系统用于*手动 *控制飞行器。 它由一个遥控装置组成，该遥控装置利用发射机来与飞行器上的接收机通信。 一些 RC 系统还可以从自动驾驶仪接收遥测信息。

> **Note** PX4 在自主飞行模式中不需要遥控系统。

![Taranis X9D遥控器。](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[ RC系统选择](../getting_started/rc_transmitter_receiver.md)说明如何选择 RC 系统。 其他相关主题包括：

- [无线电/远程控制设置](../config/radio.md) - * QGroundControl *中的遥控配置。
- [飞行 101](../flying/basic_flying.md) - 学习如何使用遥控器飞行。
- [ FrSky遥测](../peripherals/frsky_telemetry.md) - 设置 RC 发射机以从 PX4 接收遥测/状态更新。

## 数传电台

[数据/遥测无线电](../telemetry/README.md)可以在诸如* QGroundControl *的地面控制站与运行 PX4 的飞行器之间提供无线 MAVLink 连接。 这使得飞机飞行时调试、检查数传、更改任务等等成为了可能。

## 机载计算机

PX4 可以通过串行电缆或 wifi 由独立的机载计算机进行控制。 机载计算机通常使用 MAVLink API（如 Dronecode SDK 或 MAVROS）进行通信。

> **Note**使用 Robotics API 需要软件开发技能，并且超出了本指南的范围。

- [板外控制模式](../flight_modes/offboard.md) - 用于从 GCS 或机载计算机对 PX4 进行板外控制的飞行模式。 
- [Robotics APIs ](https://dev.px4.io/en/robotics/)（PX4开发人员指南）

## 可移动内存/日志记录

PX4 使用 SD 存储卡存储[飞行日志](../getting_started/flight_reporting.md)（并不是每个飞行控制器都支持 SD 卡）。

> **Tip** Pixhawk 主板支持的最大 SD 卡大小为 32 GB 。

许多推荐的 SD 卡列在：开发人员指南>日志记录</ 0>中</p> 

## 飞行模式 {#flight_modes}

飞行模式为用户（飞行员）提供不同类型/级别的飞行器自动化和自动驾驶辅助。 自主模式完全由自驾仪控制，无需飞行员/遥控输入。 例如，它们用于自动执行诸如起飞，返回原位和着陆等常见任务。 其他自主模式执行预编程任务，跟随 GPS 信标，或接受来自机载计算机或地面站的命令。

*手动模式 *由用户（通过 RC 控制杆/操纵杆）在自驾仪的帮助下实现控制。 不同的手动模式可以实现不同的飞行特性- 例如，某些模式可以实现特技动作，然而其他模式则无法翻转或抵抗风以保持位置/航向。

> **Tip**并非所有的飞行模式都适用于所有飞行器，并且某些模式只能在满足特定条件时使用（例如，许多模式需要全局位置估计）。

可用飞行模式的概述可在 [这里](../getting_started/flight_modes.md)找到。 [飞行模式配置 ](../config/flight_mode.md)中提供了有关如何设置遥控开关以打开不同飞行模式的说明。

## 安全设置（故障保护） {#safety}

PX4 具有可配置的故障安全系统，可在出现问题时保护和恢复您的飞行器！ 这些允许您指定可以安全飞行的区域和条件，以及触发故障保护时将执行的操作（例如，着陆，保持位置或返回指定点）。

> **Note**您只能为 *第一个* 故障保护事件指定操作。 Once a failsafe occurs the system will enter special handling code, such that subsequent failsafe triggers are managed by separate system level and vehicle specific code.

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