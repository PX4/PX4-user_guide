---
canonicalUrl: https://docs.px4.io/main/zh/getting_started/px4_basic_concepts
---

# 基本概念

本主题提供了无人机和使用 PX4 的基本介绍（主要面向新手用户，但对有经验的用户也是一个很好的介绍）。

如果你已经熟悉了基本概念，你可以转到 [基本组装](../assembly/README.md) 以了解如何连接特定的自驾仪硬件。 To load firmware and set up the vehicle with *QGroundControl*, see [Basic Configuration](../config/README.md).

## 无人机是什么？

无人机是无人驾驶的“机器人”设备，可以远程或自动控制。

无人机可被用于 [消费级、工业级、政府、军工应用](https://px4.io/ecosystem/commercial-systems/)。 这包括（非详尽）：航空摄影/录像，载货，竞速，搜索和测绘等。

:::tip
不同类型的无人机可用于空中、地面、海上和水下。 
这些（更正式地）被称为无人驾驶飞行器（UAV），无人驾驶飞行器系统（UAS），无人驾驶地面车辆（UGV），无人驾驶水面船只（USV），无人驾驶水下潜航器（UUV）。
:::

无人机的“大脑”被称为自动驾驶仪。 It consists of *flight stack* software running on *vehicle controller* ("flight controller") hardware.


## PX4 自动驾驶仪

[PX4](https://px4.io/) is powerful open source autopilot *flight stack*.

PX4的一些主要功能包括：
- 可控制[许多不同的设备机架/类型](../airframes/airframe_reference.md)，包括：飞机（多旋翼，固定翼和垂直起降），地面车辆和水下潜航器。
- 适用于[设备控制器](#vehicle-flight-controller-board)，传感器和其他外围设备的硬件选择。
- 灵活而强大的[飞行模式](#flight-modes)和[安全功能](#safety-settings-failsafe)。

PX4是一个大型无人机平台的核心部分，整个平台包括了[QGroundControl](#qgroundcontrol)地面站，[Pixhawk硬件设备](https://pixhawk.org/)，以及[MAVSDK](http://mavsdk.mavlink.io)用于集成记载计算机，相机和其他使用MAVLink协议的硬件设备。 PX4 由 [Dronecode 项目](https://www.dronecode.org/) 支持。


## QGroundControl

Dronecode 地面控制站称为 [QGC 地面站](http://qgroundcontrol.com/)。 You can use *QGroundControl* to load (flash) PX4 onto the [vehicle control hardware](flight_controller_selection.md), you can setup the vehicle, change different parameters, get real-time flight information and create and execute fully autonomous missions.

*QGroundControl* runs on Windows, Android, MacOS or Linux. 从[这里](http://qgroundcontrol.com/downloads/)下载并安装。

![QGC Main Screen](../../assets/concepts/qgc_main_screen.jpg)


## 机体/飞行控制板

PX4最初设计用于在[Pixhawk系列](../flight_controller/pixhawk_series.md)飞控上运行，但是现在可以在Linux计算机或者其他硬件上运行。 在选择飞控板时你应当考虑飞机的物理尺寸限制、想要进行的活动，当然还需要考虑成本。

更多信息，请参阅[飞行控制器选择](flight_controller_selection.md)。

## 传感器

PX4使用传感器确定机体状态（这是稳定和启动自动控制所必须的）。 The system *minimally requires* a gyroscope, accelerometer, magnetometer (compass) and barometer. GPS和其他定位系统是启用所有的自动[模式](../getting_started/flight_modes.md#categories)以及部分辅助模式所必须的。 固定翼和 VTOL 飞行器还应包括空速传感器（强烈推荐）。

更多信息请参阅：
* [传感器](../getting_started/sensor_selection.md)
* [外设](../peripherals/README.md)


## 输出:电机，舵机，执行器

PX4 uses *outputs* to control: motor speed (e.g. via [ESC](#escs-motors)), flight surfaces like ailerons and flaps, camera triggers, parachutes, grippers, and many other types of payloads.

输出可能是PWM端口或映射到UAVCAN节点（例如，UAVCAN[电机控制器](../peripherals/uavcan_escs.md)）。 The same airframe mapping of outputs to nodes is used in both cases case.

下面的图片显示了[Pixhawk 4](../flight_controller/pixhawk4.md)和[Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md)的PWM输出端口。

![Pixhawk 4 output ports](../../assets/flight_controller/pixhawk4/pixhawk4_main_aux_ports.jpg) ![Pixhawk4 mini MAIN ports](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_pwm.png)

输出分为 `MAIN` 和 `AUX`，并单独编号(`MAINn` 和 `AUXn`,  `n` 通常是从1到6或8)。

:::tip
每个输出的特定目的是在每个机身的基础上硬编码的。 所有机架的输出映射都在 [机架参考](../airframes/airframe_reference.md) 中。
:::

:::warning
A flight controller may only have `MAIN` PWM outputs (like the *Pixhawk 4 Mini*), or may have only 6 outputs on either `MAIN` or `AUX`. 确保您选择的控制器有足够且正确的端口/输出接口能够适配您的[机架](../airframes/airframe_reference.md)。
:::

通常情况下，`MAIN`端口用于核心飞行控制，`AUX`用于非关键的执行器/有效载荷（但是，如果`MAIN`没有足够的接口，比如VTOL机型，`AUX`也可能用于飞行控制）。 例如，对于一架[通用四旋翼](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter)，`MAIN`输出中的1-4用于控制电机，剩余的`MAIN`和一些`AUX`用来做遥控透传（透传：输入内容直接给到输出，中途不经过任何修改）。

[飞行控制器](#vehicle_controller) 上的实际输出端口/总线取决于硬件和 PX4 配置。 *Usually* the ports are mapped to PWM outputs as shown above, which are commonly screen printed `MAIN OUT` and `AUX OUT`.

它们也可能被标记为`FMU PWM OUT`或`IO PWM Out`（或类似的形式）。 Pixhawk controllers have a "main" FMU board and *may* have a separate IO board. 如果有IO 板, `AUX` 端口直接连接到 FMU 和 `MIAN` 端口连接到IO板。 否则， `MAIN` 端口连接到FMU，没有 `AUX` 端口。 The FMU output ports can use [D-shot](../peripherals/dshot.md) or *One-shot* protocols (as well as PWM), which provide much lower-latency behaviour. 这对于竞速机和其他需要更好性能的机体来说是有用的。

**备注：**
- `MAIN` 和 `AUX` 中仅有6-8个输出，因为大多数飞行控制器只有这么多的 PWM/Dshot/Oneshot 输出。 理论上来说，如果总线支持，可以有更多的输出（比如UAVCAN总线就不限于这几个节点）。


## 电调 & 电机

许多 PX4 无人机使用由飞行控制器通过电子调速器（ESC）驱动的无刷电机（ESC将来自飞行控制器的信号转换为合适的功率水平，并传递给电机）。

有关 PX4 支持的电调和电机的信息，请参阅：
* [电调 & 电机](../peripherals/esc_motors.md)
* [电调（ESC）校准](../advanced_config/esc_calibration.md)
* [电调固件和协议概述](https://oscarliang.com/esc-firmware-protocols/)（oscarliang.com）


## 电池/电源

PX4无人机最常使用的是锂聚合物（LiPo）电池。 The battery is typically connected to the system using a *Power Module* or *Power Management Board*, which provide separate power for the flight controller and to the ESCs (for the motors).

Information about batteries and battery configuration can be found in [Battery Configuration](../config/battery.md) and the guides in [Basic Assembly](../assembly/README.md) (e.g. [Pixhawk 4 Wiring Quick Start > Power](../assembly/quick_start_pixhawk4.md#power)).


## 无线电控制（遥控）

A [Radio Control \(RC\)](../getting_started/rc_transmitter_receiver.md) system is used to *manually* control the vehicle. 它由一个遥控装置组成，使用发射机来与飞行器上的接收机通信。 一些遥控系统还可以额外接收自动驾驶仪传回的数传信息。

:::note
PX4 在自主飞行模式中不需要遥控系统。
:::

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[遥控系统选择](../getting_started/rc_transmitter_receiver.md)解释了如何选择遥控系统。 其他相关主题包括：
* [Radio/Remote Control Setup](../config/radio.md) - Remote control configuration in *QGroundControl*.
* [飞行 101](../flying/basic_flying.md) - 学习如何使用遥控器飞行。
* [FrSky 数传](../peripherals/frsky_telemetry.md) - 设置遥控发射机以从 PX4 接收数传/状态更新。


## 地面站游戏手柄控制器

A [computer joystick](../config/joystick.md) connected through *QGroundControl* can also be used to manually control PX4 (QGC converts joystick movements into MAVLink messages that are sent over the telemetry link). This approach is used by ground control units that have an integrated ground control station, like the *Auterion* [Skynav](https://auterion-gs.com/skynav/) or *UAVComponents* [MicroNav](https://www.uavcomp.com/command-control/micronav/). 游戏手柄也常被用于控制仿真中的无人机。

![Photo of MicroNav, a ground controller with integrated joysticks](../../assets/peripherals/joystick/micronav.jpg)


## 安全开关

It is common for vehicles to have a *safety switch* that must be engaged before the vehicle can be [armed](#arming-and-disarming) (when armed, motors are powered and propellers can turn). 通常，安全开关被整合到GPS设备中，但也可能是一个单独的物理组件。

:::warning
解锁后的载具有潜在危险。
安全开关是防止意外解锁发生的一个附加机制。
:::

## 数传电台

[Data/Telemetry Radios](../telemetry/README.md) can provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. 这使得在飞行过程中调整参数，实时监视遥测信息，更改任务等成为可能。


## 机载计算机

PX4可以通过串行电缆或wifi由一个独立的记载计算机控制。 机载计算机通常使用MAVLink API（如MAVSDK或MAVROS）进行通讯。

Relevant topics include:
* [Offboard 模式](../flight_modes/offboard.md) - 用于从地面站或机载计算机对 PX4 进行 Offboard 控制的飞行模式。
* [机器人（Robotics) APIs](../robotics/README.md)


## SD卡（可移除储存器）

PX4 使用 SD 储存卡存储 [飞行日志](../getting_started/flight_reporting.md)，而且还需要内存卡才能使用 UAVCAN 外围设备，运行 [飞行任务](../flying/missions.md)。

默认情况下，如果没有 SD 卡，PX4 将在启动时播放 [格式化失败（2-声短响）](../getting_started/tunes.md#format-failed) 两次（且上述需要储存卡的功能都不可用）。

:::tip
Pixhawk 飞控板支持的最大 SD 卡大小为 32 GB 。 The *SanDisk Extreme U3 32GB* is [highly recommended](../dev_log/logging.md#sd-cards).
:::

尽管如此，SD卡也只是可选的。 不包含 SD 卡槽的飞行控制器可以：
- 使用参数 [CBRK_BUZZER](../advanced_config/parameter_reference.md#CBRK_BUZZER) 禁用通知蜂鸣器。
- [推流日志](../dev_log/logging.md#log-streaming) 到另一个组件（机载计算机）。
- Store missions in RAM/FLASH. 
  <!-- Too low-level for this. But see FLASH_BASED_DATAMAN in  Intel Aero: https://github.com/PX4/PX4-Autopilot/blob/release/1.13/boards/intel/aerofc-v1/src/board_config.h#L115 -->


## 解锁和加锁

载具可能有可动部件的，其中一些在通电后会有一定的危险性（特别是电机和螺旋桨）！

为了减少事故，PX4定义了三种供电状态：
- **Disarmed:** All motors and actuators are unpowered.
- **Prearmed:** Motors are unpowered, but actuators are not (allowing non-dangerous actuators to be bench-tested).
- **Armed:** Motors and other actuators are powered, and propellers may be spinning.

Vehicles are _armed_ only when necessary. 部分载具可能还有一个[安全开关](#safety-switch)，必须解除安全开关才能成功解锁(通常这个开关是GPS的一部分)。

默认情况下：
- Vehicles are *disarmed* (unpowered) when not in use, and must be explicitly *armed* before taking off.
- 如果飞手没有迅速起飞，飞行器会自动上锁（上锁的时间是可调的）。
- 飞行器将在降落后自动锁定（上锁时间是可调的）。
- 载具如果不是在“健康”状态，则会解锁不通过。
- 如果VTOL飞行器处于固定翼飞机模式，则阻止解锁([默认情况下](../advanced_config/parameter_reference.md#CBRK_VTOLARMING))。
- 预解锁可在电机保持未供电的状态下安全地测试执行器。

Arming is triggered by default (Mode 2 transmitters) by holding the RC throttle/yaw stick on the *bottom right* for one second (to disarm, hold stick on bottom left). 还可以使用遥控上的按钮来配置 PX4 解锁（也可以从地面站发送MAVLink解锁命令）。

更详细的解锁和加锁的配置的解读可以在这里找到：[预解锁，解锁，加锁配置](../advanced_config/prearm_arm_disarm.md)。


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
