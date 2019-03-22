# 接线指南

本快速入门指南演示如何为 [Cube](../flight_controller/pixhawk-2.md)<sup>&reg;</sup> 飞行控制器供电以及如何连接中央的外部设备。

<img src="../../assets/flight_controller/cube/pixhawk2_cube_hero.png" width="400px" />

## 配件

Cube在[购买时](../flight_controller/pixhawk-2.md#stores)提供大多数(所有) 您需要的配件。

![Cube Accessories](../../assets/flight_controller/cube/cube_accessories.jpg)

一些套件不包括GPS，需要您单独购买 ([如下所示](#gps))。

## 接线图概览

下图显示如何连接重要的传感器和外设。 我们将在下面各节中介绍它们的细节。

![Cube - Wiring Overview](../../assets/flight_controller/cube/cube_wiring_overview.jpg)

1. [数传系统](#telemetry) — 允许您计划/运行任务，实时控制和监控飞行器状态。 典型的包括数传、平板电脑/PC、地面站软件。
2. [蜂鸣器](#buzzer) — 提供声音信号显示UAV目前的状态。
3. [远程控制接收系统](#rc_control) — 连接手持发射器能够手动操控飞行 (如图所述是一个PWM 接收器能包括 PWM->PPM 转换器)。
4. (专用) [安全开关](#safety_switch) — 按下以解锁和锁定电机。 如果您没有使用推荐的内置安全开关的 [GPS](#gps) 时，安全开关是必须的。
5. [GPS、罗盘、LED、安全开关](#gps) — 推荐的GPS模块包括GPS、罗盘、LED 和安全开关。 
6. [电源系统](#power) — 电源线和电机ESC。 包括锂电池、电源模块和可选的电源报警系统(如果电池电量低于预定时发出警报)。 

<span></span>

> **建议** 有关更多可用端口的详细信息，请参阅 [Cube > Ports](../flight_controller/pixhawk-2.md#ports)。

## 飞控的安装和方向

安装电路时尽可能靠近飞行器的重心， 理想情况是安装方向向上箭头指向飞行器前方 (注意电路上的 *微小的*箭头)。

![Cube Mount - Direction of Front](../../assets/flight_controller/cube/cube_mount_front.jpg)

> **注意** 如飞行控制器不能被安装在推荐/默认的方向 (例如，由于空间限制) 你需要更改自动驾驶仪软件来配置实际的安装方向： [飞行控制器方向](../config/flight_controller_orientation.md)。

Cube可以使用减振泡沫板安装(包括在套件中) 或者用螺钉安装。 在Cube的附件中有安装螺钉，是为1.8mm厚的框架板设计的。 用户定制螺钉应该是M2.5，长度6mm~7.55mm。

![Cube Mount - Mounting Plate](../../assets/flight_controller/cube/cube_mount_plate_screws.jpg)

## GPS + 罗盘 + 安全开关 + LED {#gps}

推荐的 GPS 在 *Here* and [Here+](../gps_compass/rtk_gps_hex_hereplus.md)，其中都包含一个GPS模块、罗盘、安全开关和 [LEDs](../getting_started/led_meanings.md)。

> **注意** 模块之间的差别是 *Here+* 支持通过 [RTK](../advanced_features/rtk-gps.md) 实现厘米级定位。 除此以外在使用/安装是相同的。

模块在安装时应尽可能远离其他电子元器件，方向标记朝向飞行器前方(将罗盘和其他电子元器件分开可以减少干扰)。 它必须使用8-针电缆连接到 `GPS1` 端口。

下图显示了模块及其连接方式。

![Here+ Connector Diagram](../../assets/flight_controller/cube/here_plus_connector.png)

> **注意** GPS模块内集成的安全开关 *默认是启用的* (当启用时，PX4将不会让您解锁飞行器)。 如需关闭安全开关，请按住安全开关1秒钟。 您可以在完成任务后再次按下安全开关以启用并锁定飞行器 (因为这是出于安全考虑的机制，无论出于何种原因，您将无法通过遥控器或地面站来远程解锁您的载具)。

<span></span>

> **建议** 如果您想要使用旧的6-线GPS模块，套件将使用电缆来连接GPS和 [安全开关](#safety_switch)。

## 安全开关 {#safety_switch}

The *dedicated* safety switch that comes with the Cube is only required if you are not using the recommended [GPS](#gps) (which has an inbuilt safety switch).

If you are flying without the GPS you must attach the switch directly to the `GPS1` port in order to be able to arm the vehicle and fly (or via a supplied cable if using an old-style 6-pin GPS).

## Buzzer

The buzzer provides audio signals to that indicate UAV status. This should be connected to the USB port as shown (no further configuration is required).

![Cube Buzzer](../../assets/flight_controller/cube/cube_buzzer.jpg)

## 无线电遥控 {#rc_control}

A [remote control (RC) radio system](../getting_started/rc_transmitter_receiver.md) is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers.

### PPM-SUM / Futaba S.Bus receivers

Connect the ground(-),power(+),and signal(S) wires to the RC pins using the provided 3-wire servo cable.

![Cube - RCIN](../../assets/flight_controller/cube/cube_rc_in.jpg)

### Spektrum Satellite Receivers

Spektrum DSM, DSM2, and DSM-X Satellite RC receivers connect to the **SPKT/DSM** port.

![Cube - Spektrum](../../assets/flight_controller/cube/cube_rc_spektrum.jpg)

### PWM Receivers

The Cube cannot directly connect to PPM or PWM receivers that have an *individual wire for each channel*. PWM receivers must therefore connect to the **RCIN** port *via* a PPM encoder module, which may be purchased from hex.aero or proficnc.com.

## 电源 {#power}

Cube is typically powered from a Lithium Ion Polymer (LiPo) Battery via a Power Module (supplied with the kit) that is connected to the **POWER1** port. The power module provides reliable supply and voltage/current indication to the board and may separately supply power to ESCs that are used to drive motors on a multicopter vehicle.

A typical power setup for a Multicopter vehicle is shown below.

![Power Setup - MC](../../assets/flight_controller/cube/cube_wiring_power_mc.jpg)

<!-- HOw is the power rail powered for servos - power rail? Plane/Vtol would be cool to show here too -->

## Telemetry System (Optional) {#telemetry}

A telemetry system allows you to communicate with, monitor, and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The communication channel is via [Telemetry Radios](../telemetry/README.md). The vehicle-based radio should be connected to the **TELEM1** port (if connected to this port, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually via USB).

![Telemetry Radio](../../assets/flight_controller/cube/cube_schematic_telemetry.jpg)

## SD 卡（可选）

SD cards are most commonly used to [log and analyse flight details](../getting_started/flight_reporting.md). Insert the Micro-SD card into Cube as shown (if not already present).

![Cube - Mount SDCard](../../assets/flight_controller/cube/cube_sdcard.jpg)

> **Tip** The SanDisk Extreme U3 32GB is [highly recommended](https://dev.px4.io/en/log/logging.html#sd-cards) (Developer Guide).

## 电机

Motors/servos are connected to the **MAIN** and **AUX** ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md).

![Cube - Motor Connections](../../assets/flight_controller/cube/cube_main_aux_outputs.jpg)

> **Note** This reference lists the output port to motor/servo mapping for all supported air and ground frames (if your frame is not listed in the reference then use a "generic" airframe of the correct type).

<span></span>

> **Caution** The mapping is not consistent across frames (e.g. you can't rely on the throttle being on the same output for all plane frames). Make sure to use the correct mapping for your vehicle.

## 其它外设

The wiring and configuration of optional/less common components is covered within the topics for individual [peripherals](../peripherals/README.md).

## 配置

Configuration is performed using [QGroundContro](http://qgroundcontrol.com/).

After downloading, installing and running *QGroundControl*, connect the board to your computer as shown.

![Cube - USB Connection to Computer](../../assets/flight_controller/cube/cube_usb_connection.jpg)

Basic/common configuration information is covered in: [Autopilot Configuration](../config/README.md).

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)

<!-- what about config of other vtol types and plane. Do the instructions in these ones above apply for tailsitters etc? -->

## 更多信息

- [Cube](../flight_controller/pixhawk-2.md) <!-- - [pixhawk2 user manual copy]()  // fold out insert shipped with doc /assets/flight_controller/cube/cube_mount_front/pixhawk2 user manual copy.pdf -->
    
    <!-- - [Cube Quickstart]() (HEX) -->