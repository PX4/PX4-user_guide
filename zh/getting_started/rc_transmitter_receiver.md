# 遥控系统

A radio control (RC) system is required if you want to *manually* control your vehicle from a handheld transmitter. 这个章节解释了一些关于 RC 如何工作，如何为你的飞行器（车辆）选择一个合适的无线电系统和怎么连接到飞控。

:::tip PX4 在自动飞行模式可以不需要遥控器。 可以在[参数设置](../advanced_config/parameters.md)里禁用遥控器检查: [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) 设置为1. :::

## 遥控系统是如何工作的？

An *RC system* has a ground-based *remote control unit* that is used by the operator to command the vehicle. 远程控制单元有物理结构来控制无人机的运动（例如，速度、方向、油门、偏航、俯仰和横滚等）和 [飞行模式 ](../flight_modes/README.md)（例如，起飞、着陆、返航、任务等）。 On *telemetry-enabled* RC systems, the remote control unit can also receive and display information from the vehicle (e.g. battery level, flight mode).

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

远程控制单元有一个可以和飞机上的无线电模块相互绑定、通信的无线电模块。 飞机上的单元连接到飞控上。 自驾仪根据当前飞机的飞行模式和飞机状态来发送命令，正确驱动电机和伺服器。

<!-- image showing the different parts here would be nice -->

:::note
The ground- and vehicle- based radio modules are referred to as the transmitter and receiver respectively (even if they support bidirectional communication) and are collectively referred to as a *transmitter/receiver pair*. 远程控制单元和它包含的无线模块也被称作“发射机”。 :::

遥控系统的一个重要质量指标是它支持多少个通道。 通道的数量决定了远程控制单元上多少个物理控制器可以用来发送命令来控制无人机（比如多少开关、转盘、控制摇杆可以用）。

一个飞行器最少支持4个通道（横滚、俯仰、偏航、油门）。 地面车辆最少需要两个通道（转向和油门）。 8或16通道的遥控器可以提供额外的通道，用来控制其他机械结构或激活自驾仪上不同的[飞行模式](../flight_modes/README.md)。

## 远程控制的类型

<span id="transmitter_modes"></span>
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
使用[ FrSky ](../peripherals/frsky_telemetry.md)的无线模块可以开启遥测功能。 :::

其他常用的成对发射机/接收机。

* Turnigy，例如，FrSky的发射机/接收机模块。
* Futaba 发射机和兼容 Futaba S-Bus 接收机。
* 远距离~900MHz，低延迟：“黑羊的Crossfire”或“Crossfire Micro”。（例如，Taranis）。
* 长距离 ~433MHz：ImmersionRC EzUHF(例如，Taranis)。


<span id="compatible_receivers"></span>
### PX4 兼容的接收机

另外接收机和发射机需要兼容，接收机也必须和 PX4 和其他控制硬件兼容。

*PX4* and *Pixhawk* have been validated with:

- 所有的 Spektrum 和 DSM 无线接收机。
- 所有的 Futaba S.BUS 和 S.BUS2 接收机。
- 所有的 FrSky PPM 和 S.Bus 模块。
- Graupner HoTT。（一种新的2.4 g 无线通信技术，可以语音遥测和搭配大量传感器，可以进行4 km或100 mW 范围内的控制 ）
- 所有其他制造商的 PPM 模块。


## 连接接收机

作为一般指导，接收器连接到飞行控制器使用支持其协议的端口:

- Spektrum and DSM receivers must connect to a **SPKT/DSM** input.
- Graupner HoTT receivers: SUMD output must connect to a **SPKT/DSM** input.
- PPM-Sum and S.BUS receivers must connect directly to the **RC** ground, power and signal pins (typically labeled RC or RCIN)
- PPM receivers that have an individual wire for each channel must connect to the RCIN channel *via* a PPM encoder [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

特定遥控器的连接可以查阅下面提供的快速指南。

* [Pixhawk 1](../assembly/quick_start_pixhawk.md#radio-control)
* [Pixracer](../assembly/quick_start_pixracer.md)
* [Pixhawk 4](../assembly/quick_start_pixhawk4.md)

:::tip
相关信息可以查阅遥控器制造商提供的说明书。
:::

<span id="binding"></span>
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
* [飞行 101](../flying/basic_flying.md) - 学习如何使用遥控器飞行。 
