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

<span id="autopilot"></span>

## PX4 自动驾驶仪

[PX4](http://px4.io/) 是强大的开源自动驾驶仪 *飞行栈*。

PX4 的一些主要功能包括：

- 可控制[许多不同的设备机架/类型](../airframes/airframe_reference.md)，包括：飞机（多旋翼，固定翼和垂直起降），地面车辆和水下潜航器。 
- 适用于[设备控制器](#vehicle_controller)，传感器和其他外围设备的硬件选择。
- 灵活而强大的[飞行模式](#flight_modes)和[安全功能](#safety)。

PX4 是一个大型无人机平台的核心部分，它们都包括 [QGC 地面站](#qgc)，[Pixhawk 硬件](https://pixhawk.org/)，还有[MAVSDK](http://mavsdk.mavlink.io) 用于与机载计算机集成，相机还有其他使用 MAVLink 协议的硬件。 PX4 由 [Dronecode 项目](https://www.dronecode.org/) 支持。

<span id="qgc"></span>

## QGroundControl

Dronecode 地面控制站称为 [QGC 地面站](http://qgroundcontrol.com/)。 您可以使用* QGroundControl *将PX4 加载（烧写）到[飞行器控制硬件上](flight_controller_selection.md)，您可以设置飞行器，更改不同参数，获取实时飞行信息以及创建和执行完全自主的任务。

*QGroundControl* 可以在 Windows，Android，MacOS 或 Linux 上运行。 从 [这里](http://qgroundcontrol.com/downloads/) 下载并安装。

![QGC Main Screen](../../assets/concepts/qgc_main_screen.jpg)

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

## 输出:电机，舵机，执行器

PX4使用*输出*来控制:电机速度(例如通过[ESC](#esc_and_motors))，飞行平面如副翼和襟翼，相机触发器，降落伞，抓手，和许多其他类型的有效载荷。

例如，下面的图像显示 [Pixhawk 4](../flight_controller/pixhawk4.md) 和 [Pixhawk 4 mini](../flight_controller/pixhawk4_mini.md) 的 PWM 输出端口。

![Pixhawk 4 output ports](../../assets/flight_controller/pixhawk4/pixhawk4_main_aux_ports.jpg) ![Pixhawk4 mini MAIN ports](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_pwm.png)

输出分为 `MAIN` 和 `AUX`，并单独编号(`MAINn` 和 `AUXn`, `n` 通常是从1到6或8)。

:::tip
每个输出的特定目的是在每个机身的基础上硬编码的。 所有机架的输出映射都在 [机架参考](../airframes/airframe_reference.md) 中。
:::

:::warning
飞行控制器可能只有`MAIN` 输出， (比如 *Pixhawk 4 Mini*)，也可能只有6个`MAIN` 或 `AUX`输出。 确保您选择的控制器有足够的端口/输出接口适应您的[机身](../airframes/airframe_reference.md)。
:::

通常情况下， `MAIN` 端口用于核心飞行控制。 `AUX` 用于非关键执行器/载荷（但是，比如VTOL机型，如果 `MAIN`没有足够的接口， `AUX`也可能用来做飞行控制）。 例如, [通用四旋翼](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter) 用 `MAIN` 输出的 1-4 来控制电机，其余的 `MAIN` 和`AUX` 输出可以用来做 RC 透传。

[飞行控制器](#vehicle_controller) 上的实际输出端口/总线取决于硬件和 PX4 配置。 *Usually* the ports are mapped to PWM outputs as shown above, which are commonly screen printed `MAIN OUT` and `AUX OUT`.

They might also be marked as `FMU PWM OUT` or `IO PWM Out` (or similar). Pixhawk controllers have a "main" FMU board and *may* have a separate IO board. If there is an IO board, the `AUX` ports are connected directly to the FMU and the `MAIN` ports are connected to the IO board. Otherwise the `MAIN` ports are connected to the FMU, and there are no `AUX` ports. The FMU output ports can use [D-shot](../peripherals/dshot.md) or *One-shot* protocols (as well as PWM), which provide much lower-latency behaviour. This can be useful for racers and other airframes that require better performance.

The output ports may also be mapped to UAVCAN nodes (e.g. UAVCAN [motor controllers](../peripherals/uavcan_escs.md)). The (same) airframe mapping of outputs to nodes is used in this case.

**Notes:**

- There are only 6-8 outputs in `MAIN` and `AUX` because most flight controllers only have this many PWM/Dshot/Oneshot outputs. In theory there can be many more outputs if the bus supports it (i.e. a UAVCAN bus is not limited to this few nodes).

<span id="esc_and_motors"></span>

## 电调 & 电机

Many PX4 drones use brushless motors that are driven by the flight controller via an Electronic Speed Controller (ESC) (the ESC converts a signal from the flight controller to an appropriate level of power delivered to the motor).

For information about what ESC/Motors are supported by PX4 see:

- [电调 & 电机](../peripherals/esc_motors.md)
- [电调（ESC）校准](../advanced_config/esc_calibration.md)
- [电调固件和协议概述](https://oscarliang.com/esc-firmware-protocols/)（oscarliang.com）

## 电池/电源

PX4 drones are mostly commonly powered from Lithium-Polymer (LiPo) batteries. The battery is typically connected to the system using a *Power Module* or *Power Management Board*, which provide separate power for the flight controller and to the ESCs (for the motors).

Information about batteries and battery configuration can be found in [Battery Configuration](../config/battery.md) and the guides in [Basic Assembly](../assembly/README.md) (e.g. [Pixhawk 4 Wiring Quick Start > Power](../assembly/quick_start_pixhawk4.md#power)).

<span id="rc_systems"></span>

## 无线电控制（遥控）

A [Radio Control \(RC\)](../getting_started/rc_transmitter_receiver.md) system is used to *manually* control the vehicle. It consists of a remote control unit that uses a transmitter to communicate stick/control positions with a receiver based on the vehicle. Some RC systems can additionally receive telemetry information back from the autopilot.

:::note PX4 does not require a remote control system for autonomous flight modes.
:::

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[RC System Selection](../getting_started/rc_transmitter_receiver.md) explains how to choose an RC system. Other related topics include:

- [遥控设置](../config/radio.md) - *QGC 地面站* 中的遥控配置。
- [飞行 101](../flying/basic_flying.md) - 学习如何使用遥控器飞行。
- [FrSky 数传](../peripherals/frsky_telemetry.md) - 设置遥控发射机以从 PX4 接收数传/状态更新。

<span id="joystick"></span>

## 地面站游戏手柄控制器

A [computer joystick](../config/joystick.md) connected through *QGroundControl* can also be used to manually control PX4 (QGC converts joystick movements into MAVLink messages that are sent over the telemetry link). This approach is used by ground control units that have an integrated ground control station, like the *Auterion* [Skynav](https://auterion-gs.com/skynav/) or *UAVComponents* [MicroNav](https://www.uavcomp.com/command-control/micronav/). Joysticks are also commonly used to fly the vehicle in simulation.

![Photo of MicroNav, a ground controller with integrated joysticks](../../assets/peripherals/joystick/micronav.jpg)

<span id="safety_switch"></span>

## 安全开关

It is common for vehicles to have a *safety switch* that must be engaged before the vehicle can be [armed](#arming) (when armed, motors are powered and propellers can turn). Commonly the safety switch is integrated into a GPS unit, but it may also be a separate physical component.

:::warning
A vehicle that is armed is potentially dangerous. The safety switch is an additional mechanism that prevents arming from happening by accident.
:::

## 数传电台

[Data/Telemetry Radios](../telemetry/README.md) can provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. This makes it possible to tune parameters while a vehicle is in flight, inspect telemetry in real-time, change a mission on the fly, etc.

## 机载计算机

PX4 can be controlled from a separate on-vehicle companion computer via a serial cable or wifi. The companion computer will usually communicate using a MAVLink API like the MAVSDK or MAVROS.

Relevent topics include:

- [Offboard 模式](../flight_modes/offboard.md) - 用于从地面站或机载计算机对 PX4 进行 Offboard 控制的飞行模式。 
- [Robotics APIs](../robotics/README.md)

<span id="sd_cards"></span>

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

<span id="arming"></span>

## 解锁和加锁

Vehicles may have moving parts, some of which are potentially dangerous when powered (in particular motors and propellers)!

To reduce the chance of accidents:

- 当不在使用时， PX4 机体是 *加锁状态的*（未供电的），必须在起飞前进行 *解锁*。
- Some vehicles also have a [safety switch](#safety_switch) that must be disengaged before arming can succeed (often this switch is part of the GPS).
- 机体如果不是在“健康”状态，则会解锁不通过。
- Arming is prevented if a VTOL vehicle is in fixed-wing mode ([by default](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).
- 机体也会在着陆后或者飞手长时间未执行起飞时，自动切回到加锁状态。

Arming is triggered by default (Mode 2 transmitters) by holding the RC throttle/yaw stick on the *bottom right* for one second (to disarm, hold stick on bottom left). It is alternatively possible to configure PX4 to arm using an RC switch or button (and arming MAVLink commands can also be sent from a ground station).

A detailed overview of arming and disarming configuration can be found here: [Prearm, Arm, Disarm Configuration](../advanced_config/prearm_arm_disarm.md).

<span id="flight_modes"></span>

## 飞行模式

Flight modes provide different types/levels of vehicle automation and autopilot assistance to the user (pilot). *Autonomous modes* are fully controlled by the autopilot, and require no pilot/remote control input. These are used, for example, to automate common tasks like takeoff, returning to the home position, and landing. Other autonomous modes execute pre-programmed missions, follow a GPS beacon, or accept commands from an offboard computer or ground station.

*Manual modes* are controlled by the user (via the RC control sticks/joystick) with assistance from the autopilot. Different manual modes enable different flight characteristics - for example, some modes enable acrobatic tricks, while others are impossible to flip and will hold position/course against wind.

:::tip
Not all flight modes are available on all vehicle types, and some modes can only be used when specific conditions have been met (e.g. many modes require a global position estimate).
:::

An overview of the available flight modes [can be found here](../getting_started/flight_modes.md). Instructions for how to set up your remote control switches to turn on different flight modes is provided in [Flight Mode Configuration](../config/flight_mode.md).

<span id="safety"></span>

## 安全设置（故障保护）

PX4 has configurable failsafe systems to protect and recover your vehicle if something goes wrong! These allow you to specify areas and conditions under which you can safely fly, and the action that will be performed if a failsafe is triggered (for example, landing, holding position, or returning to a specified point).

:::note
You can only specify the action for the *first* failsafe event. Once a failsafe occurs the system will enter special handling code, such that subsequent failsafe triggers are managed by separate system level and vehicle specific code.
:::

The main failsafe areas are listed below:

- 低电量
- 遥控(RC) 信号丢失
- 位置信息丢失（全局位置估计质量太低）
- 机载计算机控制指令丢失（如与机载计算机失去连接）
- 数传信号丢失（如失去与 GCS 的遥测连接）
- 超出地理围栏 (限制飞行器在虚拟圆柱体内飞行)。
- 任务故障保护（防止先前的任务在新的起飞地点运行）。
- 交通避障（由来自如 ADS-B 转发器的数据触发）。

For more information see: [Safety](../config/safety.md) (Basic Configuration).

## 航向和运动方向

All the vehicles, boats and aircraft have a heading direction or an orientation based on their forward motion.

![Frame Heading](../../assets/concepts/frame_heading.png)

:::note
For a VTOL Tailsitter the heading is relative to the multirotor configuration (i.e. vehicle pose during, takeoff, hovering, landing).
:::

It is important to know the vehicle heading direction in order to align the autopilot with the vehicle vector of movement. Multicopters have a heading even when they are symmetrical from all sides! Usually manufacturers use a colored props or colored arms to indicate the heading.

![Frame Heading TOP](../../assets/concepts/frame_heading_top.png)

In our illustrations we will use red coloring for the front propellers of multicopter to show heading.

You can read in depth about heading in [Flight Controller Orientation](../config/flight_controller_orientation.md)