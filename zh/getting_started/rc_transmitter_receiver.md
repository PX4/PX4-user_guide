---
canonicalUrl: https://docs.px4.io/main/zh/getting_started/rc_transmitter_receiver
---

# 遥控系统

A Radio Control (RC) system can be used to *manually* control your vehicle from a handheld RC controller. This topic provides an overview of how RC works, how to choose an appropriate radio system for your vehicle, and how to connect it to your flight controller.

:::tip PX4 can also be manually controlled using a [Joystick](../config/joystick.md) or gamepad-like controller:  this is different to an RC system! The [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) parameter [can be set](../advanced_config/parameters.md) to choose whether RC (default), Joystick, both, or neither, are enabled. :::

:::note
PX4 does not require a remote control system for autonomous flight modes.
:::

## 遥控系统是如何工作的？

An *RC system* has a ground-based *remote control unit* that is used by the operator to command the vehicle. 远程控制单元有物理结构来控制无人机的运动（例如，速度、方向、油门、偏航、俯仰和横滚等）和 [飞行模式 ](../flight_modes/README.md)（例如，起飞、着陆、返航、任务等）。 On *telemetry-enabled* RC systems, the remote control unit can also receive and display information from the vehicle, such as battery level, flight mode, and warnings.

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

The ground based RC controller contains a radio module that is bound to, and communicates with, a (compatible) radio module on the vehicle. 飞机上的单元连接到飞控上。 自驾仪根据当前飞机的飞行模式和飞机状态来发送命令，正确驱动电机和伺服器。

<!-- image showing the different parts here would be nice -->

:::note
The ground- and vehicle- based radio modules are referred to as the transmitter and receiver respectively (even if they support bidirectional communication) and are collectively referred to as a *transmitter/receiver pair*. The RC controller and it's included radio module are commonly referred to as a "transmitter". :::

遥控系统的一个重要质量指标是它支持多少个通道。 通道的数量决定了远程控制单元上多少个物理控制器可以用来发送命令来控制无人机（比如多少开关、转盘、控制摇杆可以用）。

一个飞行器最少支持4个通道（横滚、俯仰、偏航、油门）。 地面车辆最少需要两个通道（转向和油门）。 8或16通道的遥控器可以提供额外的通道，用来控制其他机械结构或激活自驾仪上不同的[飞行模式](../flight_modes/README.md)。

## Types of Remote Controllers

<a id="transmitter_modes"></a>

### 飞机的远程控制单元

The most popular *form* of remote control unit for UAVs is shown below. 横滚/俯仰和油门/偏航的控制分别布置在摇杆上（飞行器最少需要4个通道）。

![RC Basic Commands](../../assets/flying/rc_basic_commands.png)

摇杆、开关等有许多可能的布局。 最常用的布局被给予了特定的“模式”号。 *Mode 1* and *Mode 2* (shown below) differ only in the placement of the throttle.

![Mode1-Mode2](../../assets/concepts/mode1_mode2.png)

:::note
The choice of mode is largely one of taste (*Mode 2* is more popular). :::

## 地面设备的远程控制单元

一个 UGV/车辆最少需要两个发射机通道来发送转向和速度指令。 常见的发射机使用一个滚轮和扳机、两个单自由度的摇杆、或一个双自由度的摇杆来发射这些指令。

当然你也可以使用更多的通道/控制机构，其他有趣的激励器和飞行模式也非常有用。


## 选择 RC 系统组件

你需要选择互相兼容的成对发射机/接收机。 另外，接收机必须兼容 [PX4](#compatible_receivers)和飞行控制器硬件。

兼容的无线系统通常一起销售。 例如，[FrSky Taranis X9D 和 FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us)是一个受欢迎的选择。


### 成对的发射机/接收机

One of the most popular RC units is the *FrSky Taranis X9D*. It has an internal transmitter module can be used with the recommended *FrSky X4R-SB* (S-BUS, low delay) or *X4R* (PPM-Sum, legacy) receivers out of the box. 它还有一个可以自定义的无线发射机模块接口和自定义的 OpenTX 开源固件。

:::note
This remote control unit can display vehicle telemetry when used with [FrSky](../peripherals/frsky_telemetry.md) or [TBS Crossfire](../telemetry/crsf_telemetry.md) radio modules. :::

其他常用的成对发射机/接收机。

* Turnigy，例如，FrSky的发射机/接收机模块。
* Futaba 发射机和兼容 Futaba S-Bus 接收机。
* 远距离~900MHz，低延迟：“黑羊的Crossfire”或“Crossfire Micro”。（例如，Taranis）。
* 长距离 ~433MHz：ImmersionRC EzUHF(例如，Taranis)。


<a id="compatible_receivers"></a>

### PX4 兼容的接收机

另外接收机和发射机需要兼容，接收机也必须和 PX4 和其他控制硬件兼容。

*PX4* and *Pixhawk* have been validated with:

- 所有的 Spektrum 和 DSM 无线接收机。
- 所有的 Futaba S.BUS 和 S.BUS2 接收机。
- 所有的 FrSky PPM 和 S.Bus 模块。
- Graupner HoTT。（一种新的2.4 g 无线通信技术，可以语音遥测和搭配大量传感器，可以进行4 km或100 mW 范围内的控制 ）
- 所有其他制造商的 PPM 模块。
- TBS Crossfire/Express LRS Receivers using [CRSF Telemetry](../telemetry/crsf_telemetry.md) (UART connection).


## 连接接收机

作为一般指导，接收器连接到飞行控制器使用支持其协议的端口:

- Spektrum and DSM receivers must connect to a **SPKT/DSM** input.
- Graupner HoTT receivers: SUMD output must connect to a **SPKT/DSM** input.
- PPM-Sum and S.BUS receivers must connect directly to the **RC** ground, power and signal pins (typically labeled RC or RCIN)
- PPM receivers that have an individual wire for each channel must connect to the RCIN channel *via* a PPM encoder [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

Instructions for connecting to specific flight controllers are given in their [quick-start](../assembly/README.md) guides (such as [CUAV Pixhawk V6X Wiring Quick Start: Radio Control](../assembly/quick_start_cuav_pixhawk_v6x.md#radio-control) or [Holybro Pixhawk 6X Wiring Quick Start: Radio Control](../assembly/quick_start_pixhawk6x.md#radio-control)).

:::tip
相关信息可以查阅遥控器制造商提供的说明书。
:::

<a id="binding"></a>

## 发射机/接收机对频

Before you can calibrate/use a radio system you must *bind* the receiver and transmitter so that they communicate only with each other. 各种遥控器的对频方法各不相同（参照遥控器说明书）。

If you are using a *Spektrum* receiver, you can put it into bind mode using *QGroundControl*: [Radio Setup > Spectrum Bind](../config/radio.md#spectrum-bind).

## 设置信号丢失动作

遥控器接收器有不同方式指示信号损失：
- 无输出(由PX4自动检测)
- Output a low throttle value (you can [configure PX4 to detect this](../config/radio.md#rc-loss-detection)).
- 输出最后收到的信号 (PX4 无法处理此情况!)

首选一个当RC断开时无输出的接收机，然后才是低油门的接收机。 可能需要配置接收器(请参阅手册)。

For more information see [Radio Control Setup > RC Loss Detection](../config/radio.md#rc-loss-detection).


## 相关章节

* [遥控器设置](../config/radio.md) - 使用 PX4设置你的遥控器。
* [Manual Flying](../flying/basic_flying.md) - Learn how to fly with a remote control.
* [TBS Crossfire (CRSF) Telemetry](../telemetry/crsf_telemetry.md)
* [FrSky Telemetry](../peripherals/frsky_telemetry.md)