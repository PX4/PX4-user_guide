# 基本概念

本主题提供了无人机和使用 PX4 的基本介绍（主要面向新手用户，但对有经验的用户也是一个很好的介绍）。

如果你已经熟悉了基本概念，你可以转到 [基本组装](../assembly/README.md) 以了解如何连接特定的自驾仪硬件。 要加载固件并使用 *QGC 地面站* 设置飞行器，请查看 [基本配置](../config/README.md)。

## 无人机是什么？

无人机是无人驾驶的“机器人”设备，可以远程或自动控制。

无人机可被用于 [消费级、工业级、政府、军工应用](https://px4.io/ecosystem/commercial-systems/)。 这包括（非详尽）：航空摄影/录像，载货，竞速，搜索和测绘等。

:::tip
不同类型的无人机可用于空中、地面、海上和水下。 这些（更正式地）被称为无人驾驶飞行器（UAV），无人驾驶飞行器系统（UAS），无人驾驶地面车辆（UGV），无人驾驶水面船只（USV），无人驾驶水下潜航器（UUV）。
:::

无人机的“大脑”被称为自动驾驶仪。 它由 *载具控制器*（“飞行控制器”）硬件和运行其上的 *飞行栈* 软件组成。

## PX4 自动驾驶仪

[PX4](https://px4.io/)是强大的开源自动驾驶*飞行栈*。

PX4的一些主要功能包括：

- 可控制[许多不同的设备机架/类型](../airframes/airframe_reference.md)，包括：飞机（多旋翼，固定翼和垂直起降），地面车辆和水下潜航器。 
- 适用于[设备控制器](#vehicle-flight-controller-board)，传感器和其他外围设备的硬件选择。
- 灵活而强大的[飞行模式](#flight-modes)和[安全功能](#safety-settings-failsafe)。

PX4是一个大型无人机平台的核心部分，整个平台包括了[QGroundControl](#qgroundcontrol)地面站，[Pixhawk硬件设备](https://pixhawk.org/)，以及[MAVSDK](http://mavsdk.mavlink.io)用于集成记载计算机，相机和其他使用MAVLink协议的硬件设备。 PX4 由 [Dronecode 项目](https://www.dronecode.org/) 支持。

## QGroundControl

Dronecode 地面控制站称为 [QGC 地面站](http://qgroundcontrol.com/)。 您可以使用*QGroundControl*将PX4加载（闪存）到[飞行器控制硬件](flight_controller_selection.md)中，您可以设置飞行器，修改不同的参数，获取实时飞行信息，创建并执行全自主任务。

*QGroundControl*可以在Windows，安卓，MacOS或Linux平台上运行。 从[这里](http://qgroundcontrol.com/downloads/)下载并安装。

![QGC Main Screen](../../assets/concepts/qgc_main_screen.jpg)

## 机体/飞行控制板

PX4最初设计用于在[Pixhawk系列](../flight_controller/pixhawk_series.md)飞控上运行，但是现在可以在Linux计算机或者其他硬件上运行。 在选择飞控板时你应当考虑飞机的物理尺寸限制、想要进行的活动，当然还需要考虑成本。

更多信息，请参阅[飞行控制器选择](flight_controller_selection.md)。

## 传感器

PX4使用传感器确定机体状态（这是稳定和启动自动控制所必须的）。 该系统*最低要求*为一套陀螺仪，加速度计，磁力计（罗盘）和气压计。 GPS和其他定位系统是启用所有的自动[模式](../getting_started/flight_modes.md#categories)以及部分辅助模式所必须的。 固定翼和 VTOL 飞行器还应包括空速传感器（强烈推荐）。

更多信息请参阅：

- [传感器](../getting_started/sensor_selection.md) 
- [外设](../peripherals/README.md)

## 输出:电机，舵机，执行器

PX4使用*输出*来控制：电机转速（例如通过[ECS（电调）](#escs-motors)），飞行器表面如副翼和襟翼，相机快门，降落伞，抓手以及多种其他类型的有效载荷。

输出可能是PWM端口或映射到UAVCAN节点（例如，UAVCAN[电机控制器](../peripherals/uavcan_escs.md)）。 The same airframe mapping of outputs to nodes is used in both cases case.

下面的图片显示了[Pixhawk 4](../flight_controller/pixhawk4.md)和[Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md)的PWM输出端口。

![Pixhawk 4 output ports](../../assets/flight_controller/pixhawk4/pixhawk4_main_aux_ports.jpg) ![Pixhawk4 mini MAIN ports](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_pwm.png)

输出分为 `MAIN` 和 `AUX`，并单独编号(`MAINn` 和 `AUXn`, `n` 通常是从1到6或8)。

:::tip
每个输出的特定目的是在每个机身的基础上硬编码的。 所有机架的输出映射都在 [机架参考](../airframes/airframe_reference.md) 中。
:::

:::warning
每个飞行控制器可能只有`MAIN`PWM输出（例如*Pixhawk 4 Mini*），也可能只有6个`MIAN`或`AUX`输出。 确保您选择的控制器有足够且正确的端口/输出接口能够适配您的[机架](../airframes/airframe_reference.md)。
:::

通常情况下，`MAIN`端口用于核心飞行控制，`AUX`用于非关键的执行器/有效载荷（但是，如果`MAIN`没有足够的接口，比如VTOL机型，`AUX`也可能用于飞行控制）。 例如，对于一架[通用四旋翼](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter)，`MAIN`输出中的1-4用于控制电机，剩余的`MAIN`和一些`AUX`用来做遥控透传（透传：输入内容直接给到输出，中途不经过任何修改）。

[飞行控制器](#vehicle_controller) 上的实际输出端口/总线取决于硬件和 PX4 配置。 *通常* 端口像如上所示地被映射为PWM输出，通常都会印有 `MAIN OUT` and `AUX OUT`。

它们也可能被标记为`FMU PWM OUT`或`IO PWM Out`（或类似的形式）。 Pixhawk控制器有一个"主“FMU板并且*可能*有一个分开的IO（输入输出）板。 如果有IO 板, `AUX` 端口直接连接到 FMU 和 `MIAN` 端口连接到IO板。 否则， `MAIN` 端口连接到FMU，没有 `AUX` 端口。 FMU输出端口可以使用 [D-shot](../peripherals/dshot.md) 或 *One-shot* 协议 (当然也有 PWM), 它们的延迟低很多。 这对于竞速机和其他需要更好性能的机体来说是有用的。

**备注：**

- `MAIN` 和 `AUX` 中仅有6-8个输出，因为大多数飞行控制器只有这么多的 PWM/Dshot/Oneshot 输出。 理论上来说，如果总线支持，可以有更多的输出（比如UAVCAN总线就不限于这几个节点）。

## 电调 & 电机

许多 PX4 无人机使用由飞行控制器通过电子调速器（ESC）驱动的无刷电机（ESC将来自飞行控制器的信号转换为合适的功率水平，并传递给电机）。

有关 PX4 支持的电调和电机的信息，请参阅：

- [电调 & 电机](../peripherals/esc_motors.md)
- [电调（ESC）校准](../advanced_config/esc_calibration.md)
- [电调固件和协议概述](https://oscarliang.com/esc-firmware-protocols/)（oscarliang.com）

## 电池/电源

PX4无人机最常使用的是锂聚合物（LiPo）电池。 电池通常使用*电源模块 *或*电源管理板 *连接到系统，它为飞行控制器和 电调（用于电动机）提供单独的动力。

有关电池和电池配置的信息，请参见[电池配置](../config/battery.md)和[基本组件](../assembly/README.md)（例如[ Pixhawk 4 接线快速入门>电源](../assembly/quick_start_pixhawk4.md#power)）。

## 无线电控制（遥控）

[遥控（RC）](../getting_started/rc_transmitter_receiver.md)系统用于 *手动* 控制载具。 它由一个遥控装置组成，使用发射机来与飞行器上的接收机通信。 一些遥控系统还可以额外接收自动驾驶仪传回的数传信息。

:::note PX4 在自主飞行模式中不需要遥控系统。
:::

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[遥控系统选择](../getting_started/rc_transmitter_receiver.md)解释了如何选择遥控系统。 其他相关主题包括：

- [遥控设置](../config/radio.md) - *QGC 地面站* 中的遥控配置。
- [飞行 101](../flying/basic_flying.md) - 学习如何使用遥控器飞行。
- [FrSky 数传](../peripherals/frsky_telemetry.md) - 设置遥控发射机以从 PX4 接收数传/状态更新。

## 地面站游戏手柄控制器

通过 *QGC 地面站* 连接 [计算机游戏手柄](../config/joystick.md) 也可以用来手动控制 PX4（QGC 将游戏手柄的动作转换为 MAVLink 消息通过数传链接发送）。 这种方法用于一些集成了地面站的地面端遥控器，如 *Auterion* [Skynav](https://auterion-gs.com/skynav/) or *UAVComponents* [MicroNav](https://www.uavcomp.com/command-control/micronav/)。 游戏手柄也常被用于控制仿真中的无人机。

![Photo of MicroNav, a ground controller with integrated joysticks](../../assets/peripherals/joystick/micronav.jpg)

## 安全开关

无人机通常需要一个*安全开关*，只有当安全开关激活时无人机才能[解锁](#arming-and-disarming)（一旦解锁，电机会供上电，并且螺旋桨可以开始旋转）。 通常，安全开关被整合到GPS设备中，但也可能是一个单独的物理组件。

:::warning
解锁后的载具有潜在危险。 安全开关是防止意外解锁发生的一个附加机制。
:::

## 数传电台

[数据/遥测无线电](../telemetry/README.md)可以在诸如* QGroundControl *地面站与运行 PX4 的载具之间提供无线 MAVLink 连接。 这使得在飞行过程中调整参数，实时监视遥测信息，更改任务等成为可能。

## 机载计算机

PX4可以通过串行电缆或wifi由一个独立的记载计算机控制。 The companion computer will usually communicate using a MAVLink API like the MAVSDK or MAVROS.

Relevent topics include:

- [Offboard 模式](../flight_modes/offboard.md) - 用于从地面站或机载计算机对 PX4 进行 Offboard 控制的飞行模式。 
- [Robotics APIs](../robotics/README.md)

## SD卡（可移除储存器）

PX4 uses SD memory cards for storing [flight logs](../getting_started/flight_reporting.md), and they are also required in order to use UAVCAN peripherals and fly [missions](../flying/missions.md).

By default, if no SD card is present PX4 will play the [format failed (2-beep)](../getting_started/tunes.md#format-failed) tune twice during boot (and none of the above features will be available).

:::tip
The maximum supported SD card size on Pixhawk boards is 32GB. The *SanDisk Extreme U3 32GB* is [highly recommended](../dev_log/logging.md#sd-cards).
:::

SD cards are never-the-less optional. Flight controllers that do not include an SD Card slot may:

- 使用参数 [CBRK_BUZZER](../advanced_config/parameter_reference.md#CBRK_BUZZER) 禁用通知蜂鸣器。
- [推流日志](../dev_log/logging.md#log-streaming) 到另一个组件（机载计算机）。
- 在 RAM/FLASH 中储存任务。<!-- Too low-level for this. But see FLASH_BASED_DATAMAN in  Intel Aero: https://github.com/PX4/PX4-Autopilot/blob/master/boards/intel/aerofc-v1/src/board_config.h#L115 -->

## 解锁和加锁

Vehicles may have moving parts, some of which are dangerous when powered (in particular motors and propellers)!

To reduce accidents, PX4 defines three power states:

- **Disarmed:** All motors and actuators are unpowered.
- **Prearmed:** Motors are unpowered, but actuators are not (allowing non-dangerous actuators to be bench-tested).
- **Armed:** Motors and other actuators are powered, and propellers may be spinning. 

Vehicles are *armed* only when necessary. Some vehicles may even have a [safety switch](#safety-switch) that must be disengaged before arming can succeed (often this switch is part of the GPS).

By default:

- Vehicles are *disarmed* (unpowered) when not in use, and must be explicitly *armed* before taking off.
- Vehicles automatically disarm if a pilot does not take off quickly enough (the disarm time is configurable).
- Vehicles automatically disarm after landing (the disarm time is configurable).
- Arming is prevented if the vehicle is not in a "healthy" state.
- Arming is prevented if a VTOL vehicle is in fixed-wing mode ([by default](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).
- Prearming may be used safely bench-test actuators, while still keeping motors unpowered.

Arming is triggered by default (Mode 2 transmitters) by holding the RC throttle/yaw stick on the *bottom right* for one second (to disarm, hold stick on bottom left). It is alternatively possible to configure PX4 to arm using an RC switch or button (and arming MAVLink commands can also be sent from a ground station).

A detailed overview of arming and disarming configuration can be found here: [Prearm, Arm, Disarm Configuration](../advanced_config/prearm_arm_disarm.md).

## 飞行模式

Flight modes provide different types/levels of vehicle automation and autopilot assistance to the user (pilot). *Autonomous modes* are fully controlled by the autopilot, and require no pilot/remote control input. These are used, for example, to automate common tasks like takeoff, returning to the home position, and landing. Other autonomous modes execute pre-programmed missions, follow a GPS beacon, or accept commands from an offboard computer or ground station.

*Manual modes* are controlled by the user (via the RC control sticks/joystick) with assistance from the autopilot. Different manual modes enable different flight characteristics - for example, some modes enable acrobatic tricks, while others are impossible to flip and will hold position/course against wind.

:::tip
Not all flight modes are available on all vehicle types, and some modes can only be used when specific conditions have been met (e.g. many modes require a global position estimate).
:::

An overview of the available flight modes [can be found here](../getting_started/flight_modes.md). Instructions for how to set up your remote control switches to turn on different flight modes is provided in [Flight Mode Configuration](../config/flight_mode.md).

## 安全设置（故障保护）

PX4 has configurable failsafe systems to protect and recover your vehicle if something goes wrong! These allow you to specify areas and conditions under which you can safely fly, and the action that will be performed if a failsafe is triggered (for example, landing, holding position, or returning to a specified point).

:::note
You can only specify the action for the *first* failsafe event. Once a failsafe occurs the system will enter special handling code, such that subsequent failsafe triggers are managed by separate system level and vehicle specific code.
:::

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

## 航向和运动方向

All the vehicles, boats and aircraft have a heading direction or an orientation based on their forward motion.

![Frame Heading](../../assets/concepts/frame_heading.png)

:::note
For a VTOL Tailsitter the heading is relative to the multirotor configuration (i.e. vehicle pose during takeoff, hovering, landing).
:::

It is important to know the vehicle heading direction in order to align the autopilot with the vehicle vector of movement. Multicopters have a heading even when they are symmetrical from all sides! Usually manufacturers use a colored props or colored arms to indicate the heading.

![Frame Heading TOP](../../assets/concepts/frame_heading_top.png)

In our illustrations we will use red coloring for the front propellers of multicopter to show heading.

You can read in depth about heading in [Flight Controller Orientation](../config/flight_controller_orientation.md)