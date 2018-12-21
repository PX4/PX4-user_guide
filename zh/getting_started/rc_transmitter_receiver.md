# 无线控制系统

如果你使用一个手持发射机手动控制你的飞机（车辆），那么你需要一个远程控制系统（简称RC）。 这个章节解释了一些关于 RC 如何工作，如何为你的飞行器（车辆）悬着一个合适的无线电系统和怎么让它和你的飞控控制。

> **提示** PX4 在自动飞行模式可以不需要遥控器。 你可以在[参数设置](../advanced_config/parameters.md)里禁用 RC 检查：[COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE)设为1。

## 遥控系统是如何工作的？

RC 系统有一个地基远程控制单元，需要操作员来命令飞行器。 遥控器通过物理控制来指定飞机的运动（例如，速度、方向、油门、偏航、俯仰和横滚等），也可以切换自驾仪的飞行模式（例如，起飞、着陆、返航、任务等）。 带有*遥测功能*的 RC系统，远程控制单元也可以接收并显示飞机的信息（例如，电池电量、飞行模式）。

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

远程控制单元有一个可以和飞机上的无线电模块相互绑定、通信的无线电模块。 飞机上的单元连接到自驾仪上。 自驾仪根据当前飞机的飞行模式和飞机状态来发送命令，正确驱动电机和伺服器。

<!-- image showing the different parts here would be nice -->

> **Note** The ground- and vehicle- based radio modules are referred to as the transmitter and receiver respectively (even if they support bidirectional communication) and are collectively referred to as a *transmitter/receiver pair*. The remote control unit and it's included radio module are also referred to as a "transmitter".

An important quality of an RC system is how many "channels" it supports. The number of channels defines how many different physical controls on the remote control can be used to send commands to the vehicle (e.g. how many switches, dials, control sticks can actually be used).

An aircraft must use a system that supports at least 4 channels (for roll, pitch, yaw, thrust). Ground vehicles need at least two channels (steering + throttle). An 8 or 16 channel transmitter provides additional channels that can be used to control other mechanisms or activate different [flight modes](../flight_modes/README.md) provided by the autopilot.

## 远程控制的类型

### 飞机的远程控制单元 {#transmitter_modes}

The most popular *form* of remote control unit for UAVs is shown below. It has separate control sticks for controlling roll/pitch and for throttle/yaw as shown (i.e. aircraft need at least 4 channels).

![RC Basic Commands](../../images/rc_basic_commands.png)

There are numerous possible layouts for the control sticks, switches, etc. The more common layouts have been given specific "Mode" numbers. *Mode 1* and *Mode 2* (shown below) differ only in the placement of the throttle.

![模式1-模式2](../../images/mode1_mode2.png)

> **Note** The choice of mode is largely one of taste (*Mode 2* is more popular).

## 地面设备的远程控制单元

An Unmanned Ground Vehicle (UGV)/car minimally requires a 2 channel transmitter in order to send the values for steering and speed. Commonly transmitters set these values using a wheel and trigger, two single-axis control sticks, or a single dual-axis control stick.

There is nothing to stop you using more channels/control mechanisms, and these can be very useful for engaging additional actuators and autopilot modes.

## 选择 RC 系统组件

You will need to select a transmitter/receiver pair that are compatible with each other. In addition, receivers have to be be [compatible with PX4](#compatible_receivers) and the flight controller hardware.

Compatible radio systems are often sold together. For example, [FrSky Taranis X9D and FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us) are a popular combination.

### 成对的发射机/接收机

One of the most popular RC units is the *FrSky Taranis X9D*. It has an internal transmitter module can be used with the recommended *FrSky X4R-SB* (S-BUS, low delay) or *X4R* (PPM-Sum, legacy) receivers out of the box. It also has a custom radio transmitter module slot and customizable open source OpenTX Firmware.

> **Note** This remote control unit can display vehicle telemetry when used with [FrSky](../peripherals/frsky_telemetry.md) radio modules.

Other popular transmitter/receiver pairs

* Turnigy remote using, for example, the FrSky transmitter/receiver modules.
* Futaba Transmitters and compatible Futaba S-Bus receivers.
* Long range ~900MHz, low latency: "Team Black Sheep Crossfire" or "Crossfire Micro" set with a compatible remote (e.g. Taranis)
* Long Range ~433MHz: ImmersionRC EzUHF set with a compatible remote (e.g. Taranis)

### PX4兼容的接收机 {#compatible_receivers}

另外接收机和发射机需要兼容，接收机也必须和 PX4 和其他控制硬件兼容。

PX4 和 Pixhawk兼容的接收机如下所示：

* 所有的 Spektrum 和 DSM 无线接收机。
* 所有的 Futaba S.BUS 和 S.BUS2 接收机。
* 所有的 FrSky PPM 和 S.Bus 模块。
* Graupner HoTT。
* 所有其他制造商的 PPM 模块。

## 连接接收机

另外，接收机连接到飞控还需要合适的波特率。

* Spektrum 和 DSM 接收机使用** SPKT/DSM ** 接口连接。
* PPM 和 S.Bus接收机可以直接连接在** RC **的地、正、信号引脚（通常标记为 RC 或 RCIN）。
* PPM 接收机通过一个 PPM 编码器将每一个通道通过一根线连接到 RCIN 通道上[如这个所示](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)（PPM-Sum 接收机所有通道可以只需要一根信号线）。

特定遥控器的连接可以查阅下面提供的快速指南。

* [Pixhawk 1](../assembly/quick_start_pixhawk.md#radio-control)
* [Pixracer](../assembly/quick_start_pixracer.md)
* [Pixhawk 4](../assembly/quick_start_pixhawk4.md)

> **提示**相关信息可以查阅遥控器制造商提供的说明书。

## 发射机/接收机对频 {#binding}

在你校准和/使用无线系统之前，你需要先将接收机和发射机*对频*，好让他们之间进行通信。 各种遥控器的对频方法各不相同（参照遥控器说明书）。

如果你使用* Spektrum *的接收机，你可以使用 *QGroundControl* 的[遥控器设置 > 对频 ](../config/radio.md#spektrum_bind)进行对频.

## 相关章节

* [RC 系统选择](../getting_started/rc_transmitter_receiver.md)-选择一个兼容的 RC 系统
* [遥控器设置](../config/radio.md)-使用 PX4设置你的遥控器
* [Flying 101](../flying/basic_flying.md) - Learn how to fly with a remote control.