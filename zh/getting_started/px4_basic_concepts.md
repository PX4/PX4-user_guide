# 基本概念

本主题提供了无人机和使用 PX4 的基本介绍（主要面向新手用户，但对有经验的用户也是一个很好的介绍）。

如果你已经熟悉了基本概念，你可以转到 [基本组装](../assembly/README.md) 以了解如何连接特定的自驾仪硬件。 要加载固件并使用 *QGC 地面站* 设置飞行器，请查看 [基本配置](../config/README.md)。

## 无人机是什么？

无人机是无人驾驶的“机器人”设备，可以远程或自动控制。

无人机可被用于 [消费级、工业级、政府、军工应用](https://px4.io/ecosystem/commercial-systems/)。 这包括（非详尽）：航空摄影/录像，载货，竞速，搜索和测绘等。

> **Tip** 存在用于空中、地面、海洋和水下各种不同类型的无人机。 这些（更正式地）被称为无人驾驶飞行器（UAV），无人驾驶飞行器系统（UAS），无人驾驶地面车辆（UGV），无人驾驶水面船只（USV），无人驾驶水下潜航器（UUV）。

无人机的“大脑”被称为自动驾驶仪。 它由在 *载具控制器*（“飞行控制器”）硬件上运行的 *飞行栈* 软件组成。

<span id="autopilot"></span>

## PX4 自动驾驶仪

[ PX4 ](http://px4.io/)是强大的开源自动驾驶仪 *飞行堆栈*。

PX4 的一些主要功能包括：

- 可控制[许多不同的设备机架/类型](../airframes/airframe_reference.md)，包括：飞机（多旋翼，固定翼和垂直起降），地面车辆和水下潜航器。 
- 适用于[设备控制器](#vehicle_controller)，传感器和其他外围设备的硬件选择。
- 灵活而强大的[飞行模式](#flight_modes)和[安全功能](#safety)。

PX4 是一个大型无人机平台的核心部分，它们都包括 [QGC 地面站](#qgc)，[Pixhawk 硬件](https://pixhawk.org/)，还有[MAVSDK](http://mavsdk.mavlink.io) 用于与机载计算机集成，相机还有其他使用 MAVLink 协议的硬件。 PX4 由 [Dronecode 项目](https://www.dronecode.org/) 支持。

<span id="qgc"></span>

## QGroundControl

Dronecode 地面控制站称为 [QGC 地面站](http://qgroundcontrol.com/)。 您可以使用* QGroundControl *将（闪存）PX4 加载到[飞行器控制硬件上](flight_controller_selection.md)，您可以设置飞行器，更改不同参数，获取实时飞行信息以及创建和执行完全自主的任务。

*QGroundControl* 可以在 Windows，Android，MacOS 或 Linux 上运行。 从 [这里](http://qgroundcontrol.com/downloads/) 下载并安装。

![QGC 主屏幕](../../assets/concepts/qgc_main_screen.jpg)

<span id="vehicle_controller"></span>

## 机体/飞行控制板

PX4最初设计为在 [Pixhawk 系列](../flight_controller/pixhawk_series.md) 飞控上运行，但现在可以在 Linux 计算机和其他硬件上运行。 选择飞行控制板时，您应当考虑飞行器的物理尺寸限制，想要执行的活动，还有必不可少的成本。

更多信息，请参阅：[飞行控制器选择](flight_controller_selection.md)。

## 传感器

PX4 使用传感器来确定飞行器状态（稳定和启用自动控制所需）。 系统*最低要求 *陀螺仪，加速度计，磁力计（罗盘）和气压计。 需要 GPS 或其他定位系统来启用所有自动[模式](../getting_started/flight_modes.md#categories)和一些辅助模式。 固定翼和 VTOL 飞行器还应包括空速传感器（强烈推荐）。

有关详细信息，请参阅︰

- [传感器](../getting_started/sensor_selection.md) 
- [外设](../peripherals/README.md)

<span id="outputs"></span>

## Outputs: Motors, Servos, Actuators

PX4 uses *outputs* to control: motor speed (e.g. via [ESC](#esc_and_motors)), flight surfaces like ailerons and flaps, camera triggers, parachutes, grippers, and many other types of payloads.

For example, the images below show the PWM output ports for [Pixhawk 4](/flight_controller/pixhawk4.md) and [Pixhawk 4 mini](../flight_controller/pixhawk4_mini.md).

![Pixhawk 4 output ports](../../assets/flight_controller/pixhawk4/pixhawk4_main_aux_ports.jpg) ![Pixhawk4 mini MAIN ports](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_pwm.png)

The outputs are divided into `MAIN` and `AUX` outputs, and individually numbered (i.e. `MAINn` and `AUXn`, where `n` is 1 to usually 6 or 8).

> **Tip** The specific purpose for each output is hard coded on a per-airframe basis. The output mapping for all airframes is given in the [Airframe Reference](../airframes/airframe_reference.md).

<span></span>

> **Warning** A flight controller may only have `MAIN` outputs (like the *Pixhawk 4 Mini*), or may have only 6 outputs on either `MAIN` or `AUX`. Ensure that you select a controller that has enough of the right types of ports/outputs for your [airframe](../airframes/airframe_reference.md).

Typically the `MAIN` port is used for core flight controls while `AUX` is used for non-critical actuators/payloads (though `AUX` may be used for flight controls if there aren't enough `MAIN` ports for the vehicle type- e.g. VTOL). For example, in a [Generic Quadcopter](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter) the `MAIN` outputs 1-4 are used for corresponding motors, while the remaining `MAIN` and some `AUX` outputs are used for RC passthrough.

The actual ports/bus used for the outputs on the [flight controller](#vehicle_controller) depends on the hardware and PX4 configuration. *Usually* the ports are mapped to PWM outputs as shown above, which are commonly screen printed `MAIN OUT` and `AUX OUT`.

They might also be marked as `FMU PWM OUT` or `IO PWM Out` (or similar). Pixhawk controllers have a "main" FMU board and *may* have a separate IO board. If there is an IO board, the `AUX` ports are connected directly to the FMU and the `MAIN` ports are connected to the IO board. Otherwise the `MAIN` ports are connected to the FMU, and there are no `AUX` ports. The FMU output ports can use [D-shot](../peripherals/dshot.md) or *One-shot* protocols (as well as PWM), which provide much lower-latency behaviour. This can be useful for racers and other airframes that require better performance.

The output ports may also be mapped to UAVCAN nodes (e.g. UAVCAN [motor controllers](../peripherals/uavcan_escs.md)). The (same) airframe mapping of outputs to nodes is used in this case.

**备注：**

- There are only 6-8 outputs in `MAIN` and `AUX` because most flight controllers only have this many PWM/Dshot/Oneshot outputs. In theory there can be many more outputs if the bus supports it (i.e. a UAVCAN bus is not limited to this few nodes).

<span id="esc_and_motors"></span>

## 电调 & 电机

许多 PX4 无人机使用无刷电机，其由飞行控制器通过电子调速器（ESC）驱动（ESC将来自飞行控制器的信号转换为合适的功率水平，传递给电机）。

有关 PX4 支持的电调和电机的信息，请参阅：

- [电调 & 电机](../peripherals/esc_motors.md)
- [电调（ESC）校准](../advanced_config/esc_calibration.md)
- [电调固件和协议概述](https://oscarliang.com/esc-firmware-protocols/)（oscarliang.com）

## 电池/电源

PX4 无人机通常由锂聚合物（LiPo）电池供电。 电池通常使用*电源模块 *或*电源管理板 *连接到系统，它为飞行控制器和 ESC（用于电动机）提供单独的动力。

有关电池和电池配置的信息，请参见[电池配置](../config/battery.md)和[基本组件](../assembly/README.md)（例如[ Pixhawk 4 接线快速入门>电源](../assembly/quick_start_pixhawk4.md#power)）。

<span id="rc_systems"></span>

## 无线电控制（遥控）

[遥控（RC）](../getting_started/rc_transmitter_receiver.md)系统用于 *手动* 控制机体。 它由一个遥控装置组成，使用发射机来与飞行器上的接收机通信。 一些 RC 系统还可以接自动驾驶仪传回的收遥测信息。

> **Note** PX4 在自主飞行模式中不需要遥控系统。

![Taranis X9D遥控器。](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[遥控系统选择](../getting_started/rc_transmitter_receiver.md) 说明如何选择遥控系统。 其他相关主题包括：

- [遥控设置](../config/radio.md) - *QGC 地面站* 中的遥控配置。
- [飞行 101](../flying/basic_flying.md) - 学习如何使用遥控器飞行。
- [FrSky 数传](../peripherals/frsky_telemetry.md) - 设置遥控发射机以从 PX4 接收数传/状态更新。

<span id="joystick"></span>

## 地面站游戏手柄控制器

通过 *QGC 地面站* 连接 [计算机游戏手柄](../config/joystick.md) 也可以用来手动控制 PX4（QGC 将游戏手柄的动作转换为 MAVLink 消息通过数传链接发送）。 这种方法被一些集成了地面站的地面端遥控器所使用的，如下图中的 *UAVComponents* [MicroNav](https://www.uavcomp.com/command-control/micronav/) 所示。 游戏手柄也经常被用于无人机的飞行仿真中。

![Joystick MicroNav.](../../assets/peripherals/joystick/micronav.jpg)

<span id="safety_switch"></span>

## 安全开关

机体通常必须有一个 *安全开关*，然后才能使用 [解锁](#arming)（解锁后，电机会供电，螺旋桨开始旋转）。 通常，安全开关被整合到GPS设备中，但也可能是一个单独的物理组件。

> **Note** 解锁后的机体是有潜在危险的。 安全开关是防止意外解锁发生的一个附加机制。

## 数传电台

[数据/遥测无线电](../telemetry/README.md)可以在诸如* QGroundControl *的地面控制站与运行 PX4 的飞行器之间提供无线 MAVLink 连接。 这使得飞机飞行时调试、检查数传、更改任务等等成为了可能。

## 机载计算机

PX4 可以通过串行电缆或 wifi 由独立的机载计算机进行控制。 机载计算机通常使用 MAVLink API（如 MAVSDK 或 MAVROS）进行通信。

> **Note**使用 Robotics API 需要软件开发技能，并且超出了本指南的范围。

- [Offboard 模式](../flight_modes/offboard.md) - 用于从地面站或机载计算机对 PX4 进行 Offboard 控制的飞行模式。 
- [Robotics APIs ](../robotics/README.md)（PX4开发人员指南）

<span id="sd_cards"></span>

## SD卡（可移除储存器）

PX4 使用 SD 储存卡存储 [飞行日志](../getting_started/flight_reporting.md)，而且还需要内存卡才能使用 UAVCAN 外围设备，运行 [飞行任务](../flying/missions.md)。

默认情况下，如果没有 SD 卡，PX4 将在启动时播放 [格式化失败（2-声短响）](../getting_started/tunes.md#format-failed) 两次（且上述需要储存卡的功能都不可用）。

> **Tip** Pixhawk 主板支持的最大 SD 卡大小为 32 GB 。 [强烈推荐使用](../dev_log/logging.md#sd-cards) SanDisk Extreme U3 32GB（开发者指南）。

SD 卡在某些情况下也是可选的。 不包含 SD 卡槽的飞行控制器可以：

- 使用参数 [CBRK_BUZZER](../advanced_config/parameter_reference.md#CBRK_BUZZER) 禁用通知蜂鸣器。
- [推流日志](../dev_log/logging.md#log-streaming) 到另一个组件（机载计算机）。
- 在 RAM/FLASH 中储存任务。<!-- Too low-level for this. But see FLASH_BASED_DATAMAN in  Intel Aero: https://github.com/PX4/PX4-Autopilot/blob/master/boards/intel/aerofc-v1/src/board_config.h#L115 -->

<span id="arming"></span>

## 解锁和加锁

机体是有可移动的部件的，其中一些在通电后会有潜在的危险性（特别是电机和螺旋桨）！

为了减少事故概率：

- 当不在使用时， PX4 机体是 *加锁状态的*（未供电的），必须在起飞前进行 *解锁*。
- 一些机体还需要长按 [安全开关](../getting_started/px4_basic_concepts.md#safety_switch) 后才能解锁成功。
- 机体如果不是在“健康”状态，则会解锁不通过。
- Arming is prevented if a VTOL vehicle is in fixed-wing mode ([by default](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).
- 机体也会在着陆后或者飞手长时间未执行起飞时，自动切回到加锁状态。

解锁默认情况下（美国手发射机）可以通过保持遥控油门+ YAW 摇杆到*右下角*一秒钟来解锁，要想加锁，则保持摇杆在左下角。 还可以使用遥控上的按钮来配置 PX4 解锁（也可以从地面站发送解锁命令）。

A detailed overview of arming and disarming configuration can be found here: [Prearm, Arm, Disarm Configuration](../advanced_config/prearm_arm_disarm.md).

<span id="flight_modes"></span>

## 飞行模式

飞行模式为用户（飞行员）提供不同类型/级别的飞行器自动化和自动驾驶辅助。 自主模式完全由自驾仪控制，无需飞行员/遥控输入。 例如，它们用于自动执行诸如起飞，返回原位和着陆等常见任务。 其他自主模式执行预编程任务，跟随 GPS 信标，或接受来自机载计算机或地面站的命令。

*手动模式 *由用户（通过 RC 控制杆/操纵杆）在自驾仪的帮助下实现控制。 不同的手动模式可以实现不同的飞行特性- 例如，某些模式可以实现特技动作，然而其他模式则无法翻转或抵抗风以保持位置/航向。

> **Tip**并非所有的飞行模式都适用于所有飞行器，并且某些模式只能在满足特定条件时使用（例如，许多模式需要全局位置估计）。

可用飞行模式的概述可在 [这里](../getting_started/flight_modes.md)找到。 [飞行模式配置 ](../config/flight_mode.md)中提供了有关如何设置遥控开关以打开不同飞行模式的说明。

<span id="safety"></span>

## 安全设置（故障保护）

PX4 具有可配置的故障安全系统，可在出现问题时保护和恢复您的飞行器！ 这些允许您指定可以安全飞行的区域和条件，以及触发故障保护时将执行的操作（例如，着陆，保持位置或返回指定点）。

> **Note**您只能为 *第一个* 故障保护事件指定操作。 一旦发生故障保护，系统将执行特殊处理代码，以便后续故障保护触发器由单独的系统层级和飞行器特定代码管理。

主要的故障保护事件如下：

- 低电量
- 遥控(RC) 信号丢失
- 位置信息丢失（全局位置估计质量太低）
- 机载计算机控制指令丢失（如与机载计算机失去连接）
- 数传信号丢失（如失去与 GCS 的遥测连接）
- 超出地理围栏 (限制飞行器在虚拟圆柱体内飞行)。
- 任务故障保护（防止先前的任务在新的起飞地点运行）。
- 交通避障（由来自如 ADS-B 转发器的数据触发）。

有关详细信息，请参阅：[安全](../config/safety.md)（基本配置）。

## 航向和运动方向

所有车辆，船只和飞机都具有航向（机头朝向）或基于其前进运动的方向。

![机架航向](../../assets/concepts/frame_heading.png)

> **Note** For a VTOL Tailsitter the heading is relative to the multirotor configuration (i.e. vehicle pose during, takeoff, hovering, landing).

知道设备航向，以使自驾仪与设备运动矢量对齐是重要的。 即使多旋翼从各个方向都对称，但其也有航向。 通常制造商使用彩色螺旋桨或带颜色的机臂来表示航向。

![机架航向 TOP](../../assets/concepts/frame_heading_top.png)

在我们的插图中，我们将使用红色的前螺旋桨来显示多旋翼的航向。

您可以在 [飞行控制器方向](../config/flight_controller_orientation.md) 中深入了解航向。