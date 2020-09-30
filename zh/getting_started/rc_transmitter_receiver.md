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

### 飞机的远程控制单元 {#transmitter_modes}

无人机最受欢迎的远程控制单元*形式*如下所示。 横滚/俯仰和油门/偏航的控制分别布置在摇杆上（飞行器最少需要4个通道）。

![遥控基本命令](../../assets/flying/rc_basic_commands.png)

摇杆、开关等有许多可能的布局。 最常用的布局被给予了特定的“模式”号。 *日本手*和*美国手*只在油门的位置有差别。

![日本手-美国手](../../assets/concepts/mode1_mode2.png)

> **Note** 选择什么模式看你的喜好（ 美国手更受欢迎点）。

## 地面设备的远程控制单元

一个 UGV/车辆最少需要两个发射机通道来发送转向和速度指令。 常见的发射机使用一个滚轮和扳机、两个单自由度的摇杆、或一个双自由度的摇杆来发射这些指令。

当然你也可以使用更多的通道/控制机构，其他有趣的激励器和飞行模式也非常有用。

## 选择 RC 系统组件

你需要选择互相兼容的成对发射机/接收机。 另外，接收机必须兼容 [PX4](#compatible_receivers)和飞行控制器硬件。

兼容的无线系统通常一起销售。 例如，[FrSky Taranis X9D 和 FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us)是一个受欢迎的选择。

### 成对的发射机/接收机

*FrSky Taranis X9D*是最受欢迎的 RC 单元之一。 它拥有内置的发射机模块和可以配对的*FrSky X4R-SB*（(S-BUS，低延迟）或*X4R*（PPM-Sum，老式）外置接收机。 它还有一个可以自定义的无线发射机模块接口和自定义的 OpenTX 开源固件。

> **Note** 使用[ FrSky ](../peripherals/frsky_telemetry.md)的无线模块可以开启遥测功能。

其他受欢迎的成对发射机/接收机。

* Turnigy，例如，FrSky的发射机/接收机模块。
* Futaba 发射机和兼容 Futaba S-Bus 接收机。
* 远距离~900MHz，低延迟：“黑羊的Crossfire”或“Crossfire Micro”。（例如，Taranis）。
* 长距离 ~433MHz：ImmersionRC EzUHF(例如，Taranis)。

### PX4 兼容的接收机 {#compatible_receivers}

另外接收机和发射机需要兼容，接收机也必须和 PX4 和其他控制硬件兼容。

PX4 和 *Pixhawk*兼容的接收机如下所示：

* 所有的 Spektrum 和 DSM 无线接收机。
* 所有的 Futaba S.BUS 和 S.BUS2 接收机。
* 所有的 FrSky PPM 和 S.Bus 模块。
* Graupner HoTT。（一种新的2.4 g 无线通信技术，可以语音遥测和搭配大量传感器，可以进行4 km或100 mW 范围内的控制 ）
* 所有其他制造商的 PPM 模块。

## 连接接收机

另外，接收机连接到飞控还需要合适的波特率。

* Spektrum 和 DSM 接收机使用** SPKT/DSM ** 接口连接。
* Graupner HoTT receivers: SUMD output must connect to a **SPKT/DSM** input.
* PPM-Sum and S.BUS receivers must connect directly to the **RC** ground, power and signal pins (typically labeled RC or RCIN)
* PPM receivers that have an individual wire for each channel must connect to the RCIN channel *via* a PPM encoder [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

特定遥控器的连接可以查阅下面提供的快速指南。

* [Pixhawk 1](../assembly/quick_start_pixhawk.md#radio-control)
* [Pixracer](../assembly/quick_start_pixracer.md)
* [Pixhawk 4](../assembly/quick_start_pixhawk4.md)

> **提示**相关信息可以查阅遥控器制造商提供的说明书。

## 发射机/接收机对频 {#binding}

在你校准和/使用无线系统之前，你需要先将接收机和发射机*对频*，好让他们之间进行通信。 各种遥控器的对频方法各不相同（参照遥控器说明书）。

如果你使用* Spektrum *的接收机，你可以使用 *QGroundControl* 的[遥控器设置 > 对频 ](../config/radio.md#spektrum_bind)进行对频.

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