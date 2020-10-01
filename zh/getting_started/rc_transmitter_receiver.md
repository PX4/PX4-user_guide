# 遥控系统

如果你使用一个手持发射机 *手动* 控制你的飞机，那么你需要一个遥控系统（简称RC）。 这个章节解释了一些关于 RC 如何工作，如何为你的飞行器（车辆）悬着一个合适的无线电系统和怎么让它和你的飞控控制。

> **Tip** PX4 在自动飞行模式可以不需要遥控器。 你可以在 [参数设置](../advanced_config/parameters.md) 里禁用遥控检查：[COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) 设为 1。

## 遥控系统是如何工作的？

*遥控系统*有一个地基*远程控制单元*，需要操作员来命令飞行器。 遥控器通过物理控制来指定飞机的运动（例如，速度、方向、油门、偏航、俯仰和横滚等），也可以切换自驾仪的[飞行模式](../flight_modes/README.md)（例如，起飞、着陆、返航、任务等）。 带有*遥测功能*的 遥控系统，远程控制单元也可以接收并显示飞机的信息（例如，电池电量、飞行模式）。

![Taranis X9D遥控器。](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

远程控制单元有一个可以和飞机上的无线电模块相互绑定、通信的无线电模块。 飞机上的单元连接到自驾仪上。 自驾仪根据当前飞机的飞行模式和飞机状态来发送命令，正确驱动电机和伺服器。

<!-- image showing the different parts here would be nice -->

> **Note** 地面和空中的无线模块也被称作“发射机”和“接收机”（即使它们支持双向通信），也被称作*成对的发射机/接收机*。 远程控制单元和它包含的无线模块也被称作“发射机”。

遥控系统的一个重要质量指标是它支持多少个通道。 通道的数量是由它可以发送指令到飞机的物理控制的数量决定。

一个飞行器最少支持4个通道（横滚、俯仰、偏航、油门）。 地面设备最少需要两个通道（转向和油门）。 8或16通道的遥控器可以提供额外的通道，用来控制其他机械结构或激活自驾仪上不同的[飞行模式](../flight_modes/README.md)。

## 远程控制的类型

<span id="transmitter_modes"></span>

### Remote Control Units for Aircraft

The most popular *form* of remote control unit for UAVs is shown below. It has separate control sticks for controlling roll/pitch and for throttle/yaw as shown (i.e. aircraft need at least 4 channels).

![RC Basic Commands](../../assets/flying/rc_basic_commands.png)

There are numerous possible layouts for the control sticks, switches, etc. The more common layouts have been given specific "Mode" numbers. *Mode 1* and *Mode 2* (shown below) differ only in the placement of the throttle.

![Mode1-Mode2](../../assets/concepts/mode1_mode2.png)

> **Note** 选择什么模式看你的喜好（ 美国手更受欢迎点）。

## 地面设备的远程控制单元

An Unmanned Ground Vehicle (UGV)/car minimally requires a 2 channel transmitter in order to send the values for steering and speed. Commonly transmitters set these values using a wheel and trigger, two single-axis control sticks, or a single dual-axis control stick.

There is nothing to stop you using more channels/control mechanisms, and these can be very useful for engaging additional actuators and autopilot modes.

## 选择 RC 系统组件

You will need to select a transmitter/receiver pair that are compatible with each other. In addition, receivers have to be be [compatible with PX4](#compatible_receivers) and the flight controller hardware.

Compatible radio systems are often sold together. For example, [FrSky Taranis X9D and FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us) are a popular combination.

### 成对的发射机/接收机

One of the most popular RC units is the *FrSky Taranis X9D*. It has an internal transmitter module can be used with the recommended *FrSky X4R-SB* (S-BUS, low delay) or *X4R* (PPM-Sum, legacy) receivers out of the box. It also has a custom radio transmitter module slot and customizable open source OpenTX Firmware.

> **Note** 使用[ FrSky ](../peripherals/frsky_telemetry.md)的无线模块可以开启遥测功能。

Other popular transmitter/receiver pairs

* Turnigy，例如，FrSky的发射机/接收机模块。
* Futaba 发射机和兼容 Futaba S-Bus 接收机。
* 远距离~900MHz，低延迟：“黑羊的Crossfire”或“Crossfire Micro”。（例如，Taranis）。
* 长距离 ~433MHz：ImmersionRC EzUHF(例如，Taranis)。

<span id="compatible_receivers"></span>

### PX4-Compatible Receivers

In addition to the transmitter/receiver pairs being compatible, the receiver must also be compatible with PX4 and the flight controller hardware.

*PX4* and *Pixhawk* have been validated with:

* 所有的 Spektrum 和 DSM 无线接收机。
* 所有的 Futaba S.BUS 和 S.BUS2 接收机。
* 所有的 FrSky PPM 和 S.Bus 模块。
* Graupner HoTT。（一种新的2.4 g 无线通信技术，可以语音遥测和搭配大量传感器，可以进行4 km或100 mW 范围内的控制 ）
* 所有其他制造商的 PPM 模块。

## 连接接收机

As general guidance, receivers connect to the flight controller using the port appropriate to their supported protocol:

* Spektrum 和 DSM 接收机使用** SPKT/DSM ** 接口连接。
* Graupner HoTT receivers: SUMD output must connect to a **SPKT/DSM** input.
* PPM-Sum and S.BUS receivers must connect directly to the **RC** ground, power and signal pins (typically labeled RC or RCIN)
* PPM receivers that have an individual wire for each channel must connect to the RCIN channel *via* a PPM encoder [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

Instructions for connecting to specific flight controllers are given in the following quick-start guides:

* [Pixhawk 1](../assembly/quick_start_pixhawk.md#radio-control)
* [Pixracer](../assembly/quick_start_pixracer.md)
* [Pixhawk 4](../assembly/quick_start_pixhawk4.md)

> **提示**相关信息可以查阅遥控器制造商提供的说明书。

<span id="binding"></span>

## Binding Transmitter/Receiver

Before you can calibrate/use a radio system you must *bind* the receiver and transmitter so that they communicate only with each other. The process for binding a transmitter and receiver pair is hardware specific (see your manual for instructions).

If you are using a *Spektrum* receiver, you can put it into bind mode using *QGroundControl*: [Radio Setup > Spectrum Bind](../config/radio.md#spektrum_bind).

## Set Signal-Loss Behaviour

RC receivers have different ways of indicating signal loss:

* Output nothing (automatically detected by PX4)
* Output a low throttle value value (you can [configure PX4 to detect this](../config/radio.md#rc_loss_detection)).
* Output the last received signal (PX4 cannot handle this case!)

Choose a receiver that can emit nothing (preferred) when RC is lost, or a low throttle value. This behaviour may require hardware configuration of the receiver (check the manual).

For more information see [Radio Control Setup > RC Loss Detection](../config/radio.md#rc_loss_detection).

## Related Topics

* [Radio Control Setup](../config/radio.md) - Configuring your radio with PX4.
* [Flying 101](../flying/basic_flying.md) - Learn how to fly with a remote control.