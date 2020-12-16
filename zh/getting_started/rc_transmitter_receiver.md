# 遥控系统

如果你使用一个手持发射机 *手动* 控制你的飞机，那么你需要一个遥控系统（简称RC）。 这个章节解释了一些关于 RC 如何工作，如何为你的飞行器（车辆）悬着一个合适的无线电系统和怎么让它和你的飞控控制。

:::tip
PX4 does not require a remote control system for autonomous flight modes. You can disable RC checks by [setting parameter](../advanced_config/parameters.md): [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) to 1.
:::

## 遥控系统是如何工作的？

An *RC system* has a ground-based *remote control unit* that is used by the operator to command the vehicle. The remote has physical controls that can be used to specify vehicle movement (e.g. speed, direction, throttle, yaw, pitch, roll, etc.) and to enable autopilot [flight modes](../flight_modes/README.md) (e.g. takeoff, land, return to land, mission etc.). On *telemetry-enabled* RC systems, the remote control unit can also receive and display information from the vehicle (e.g. battery level, flight mode).

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

The remote control unit contains a radio module that is bound to, and communicates with, a (compatible) radio module on the vehicle. The vehicle-based unit is connected to the flight controller. The flight controller determines how to interpret the commands based on the current autopilot flight mode and vehicle state, and drives the vehicle motors and actuators appropriately.

<!-- image showing the different parts here would be nice -->

:::note
The ground- and vehicle- based radio modules are referred to as the transmitter and receiver respectively (even if they support bidirectional communication) and are collectively referred to as a *transmitter/receiver pair*. The remote control unit and it's included radio module are also referred to as a "transmitter".
:::

An important quality of an RC system is how many "channels" it supports. The number of channels defines how many different physical controls on the remote control can be used to send commands to the vehicle (e.g. how many switches, dials, control sticks can actually be used).

An aircraft must use a system that supports at least 4 channels (for roll, pitch, yaw, thrust). Ground vehicles need at least two channels (steering + throttle). An 8 or 16 channel transmitter provides additional channels that can be used to control other mechanisms or activate different [flight modes](../flight_modes/README.md) provided by the autopilot.

## 远程控制的类型

<span id="transmitter_modes"></span>

### 飞机的远程控制单元

The most popular *form* of remote control unit for UAVs is shown below. It has separate control sticks for controlling roll/pitch and for throttle/yaw as shown (i.e. aircraft need at least 4 channels).

![RC Basic Commands](../../assets/flying/rc_basic_commands.png)

There are numerous possible layouts for the control sticks, switches, etc. The more common layouts have been given specific "Mode" numbers. *Mode 1* and *Mode 2* (shown below) differ only in the placement of the throttle.

![Mode1-Mode2](../../assets/concepts/mode1_mode2.png)

:::note
The choice of mode is largely one of taste (*Mode 2* is more popular).
:::

## 地面设备的远程控制单元

An Unmanned Ground Vehicle (UGV)/car minimally requires a 2 channel transmitter in order to send the values for steering and speed. Commonly transmitters set these values using a wheel and trigger, two single-axis control sticks, or a single dual-axis control stick.

There is nothing to stop you using more channels/control mechanisms, and these can be very useful for engaging additional actuators and autopilot modes.

## 选择 RC 系统组件

You will need to select a transmitter/receiver pair that are compatible with each other. In addition, receivers have to be [compatible with PX4](#compatible_receivers) and the flight controller hardware.

Compatible radio systems are often sold together. For example, [FrSky Taranis X9D and FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us) are a popular combination.

### 成对的发射机/接收机

One of the most popular RC units is the *FrSky Taranis X9D*. It has an internal transmitter module can be used with the recommended *FrSky X4R-SB* (S-BUS, low delay) or *X4R* (PPM-Sum, legacy) receivers out of the box. It also has a custom radio transmitter module slot and customizable open source OpenTX Firmware.

:::note
This remote control unit can display vehicle telemetry when used with [FrSky](../peripherals/frsky_telemetry.md) radio modules.
:::

Other popular transmitter/receiver pairs

* Turnigy，例如，FrSky的发射机/接收机模块。
* Futaba 发射机和兼容 Futaba S-Bus 接收机。
* 远距离~900MHz，低延迟：“黑羊的Crossfire”或“Crossfire Micro”。（例如，Taranis）。
* 长距离 ~433MHz：ImmersionRC EzUHF(例如，Taranis)。

<span id="compatible_receivers"></span>

### PX4 兼容的接收机

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
* PPM 和 S.Bus接收机可以直接连接在** RC **的地、正、信号引脚（通常标记为 RC 或 RCIN）。
* PPM 接收机通过一个 PPM 编码器将每一个通道通过一根线连接到 RCIN 通道上[如这个所示](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)（PPM-Sum 接收机所有通道可以只需要一根信号线）。

Instructions for connecting to specific flight controllers are given in the following quick-start guides:

* [Pixhawk 1](../assembly/quick_start_pixhawk.md#radio-control)
* [Pixracer](../assembly/quick_start_pixracer.md)
* [Pixhawk 4](../assembly/quick_start_pixhawk4.md)

:::tip
See the manufacturer's flight controller setup guide for additional information.
:::

<span id="binding"></span>

## 发射机/接收机对频

Before you can calibrate/use a radio system you must *bind* the receiver and transmitter so that they communicate only with each other. The process for binding a transmitter and receiver pair is hardware specific (see your manual for instructions).

If you are using a *Spektrum* receiver, you can put it into bind mode using *QGroundControl*: [Radio Setup > Spectrum Bind](../config/radio.md#spektrum_bind).

## Set Signal-Loss Behaviour

RC receivers have different ways of indicating signal loss:

* Output nothing (automatically detected by PX4)
* Output a low throttle value (you can [configure PX4 to detect this](../config/radio.md#rc_loss_detection)).
* Output the last received signal (PX4 cannot handle this case!)

Choose a receiver that can emit nothing (preferred) when RC is lost, or a low throttle value. This behaviour may require hardware configuration of the receiver (check the manual).

For more information see [Radio Control Setup > RC Loss Detection](../config/radio.md#rc_loss_detection).

## 相关章节

* [遥控器设置](../config/radio.md) - 使用 PX4设置你的遥控器。
* [飞行 101](../flying/basic_flying.md) - 学习如何使用遥控器飞行。