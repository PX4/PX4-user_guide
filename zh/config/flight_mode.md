---
canonicalUrl: https://docs.px4.io/main/zh/config/flight_mode
---

# 飞行模式有关配置

This topic explains how to map [flight modes](../getting_started/flight_modes.md) and other functions to the switches on your radio control transmitter.

:::tip
In order to set up flight modes you must already have:
- [Configured your radio](../config/radio.md)
- [Setup your transmitter](#rc-transmitter-setup) to encode the physical positions of your mode switch(es) into a single channel. 我们在[这里](#taranis-setup-3-way-switch-configuration-for-single-channel-mode)提供了流行的 *Taranis *遥控器的示例（如果您使用不同的遥控器，请查阅相关文档）。 :::


## What Flight Modes and Switches Should I Set?

*飞行模式* 提供了不同类型的 *自动驾驶辅助飞行*和 *完全自主飞行* You can set any (or none) of the flight modes [described here](../getting_started/flight_modes.md). Most users should set the following functions, as these make the vehicle easier and safer to fly:

- **位置模式** ([多旋翼飞行器](../getting_started/flight_modes.md#position-mode-mc), [固定翼飞行器](../getting_started/flight_modes.md#position-mode-fw)- 手动飞行最简单和最安全的模式。
- [Return mode](../flight_modes/return.md) - Return to launch position by safe path and land (by default).
- **垂直起降开关**-在 VTOL 飞行器上的固定翼和多旋翼飞行配置之间切换。

It is also common to map switches to:

- [Mission](../flight_modes/mission.md) - This mode runs a pre-programmed mission sent by the ground control station.
- <a id="kill_switch"></a> [Kill Switch](../config/safety.md#kill-switch) - Immediately stops all motor outputs (the vehicle will crash, which may in some circumstances be more desirable than allowing it to continue flying).


## Flight Mode Selection

PX4 allows you to specify a "mode" channel and select up to 6 flight modes that will be activated based on the PWM value of the channel. You can also separately specify channels for mapping a kill switch, return to launch mode, and offboard mode.

To configure single-channel flight mode selection:

1. 打开 *QGroundControl* 并连接上机体。
1. 打开您的 RC 遥控器发射机。
1. 选择 **QGroundControllation 图标 > 车辆设置**, 然后在侧边栏中选择 **飞行模式**

   ![飞行模式单通道控制](../../assets/qgc/setup/flight_modes/flight_modes_single_channel.jpg)

1. 指定*飞行模式设置* :
   * 选择 **Mode channel** （上面显示的是 Channel 5 ，但是这是取决于你遥控器的配置）。
   * Move the transmitter switch (or switches) that you have set up for mode selection through the available positions. 与您当前开关位置匹配的模式栏将高亮显示（高于此值为 *飞行模式1*）。 :::note
While you can set flight modes in any of the 6 slots, only the channels that are mapped to switch positions will be highlighted/used.
:::
   * Select the flight mode that you want triggered for each switch position.
1. 指定 *遥控器开关设置* ：
   * 选择你想要映射到的指定想要映射的动作-例如：*返回*模式，*终止开关*，*板外*模式等。（如果您的遥控器上有备用的开关和通道）

1. Test that the modes are mapped to the right transmitter switches:
   * 检查 *Channel Monitor* 以确认改变每个开关改变了预期的通道。
   * 拨动你遥控器上刚刚映射的飞行模式有关的开关，并检查对应的飞行模式已被激活（ *QGroundeControl* 上对应的通道的字体在被激活的情况下变为黄色 ）

All values are automatically saved as they are changed.

## RC Transmitter Setup

This section contains a small number of possible setup configurations for taranis. QGroundControl _可能_在[这里有其他遥控器的设置信息](https://docs.qgroundcontrol.com/master/en/SetupView/FlightModes.html#transmitter-setup)。


<a id="taranis_setup"></a>

### Taranis Setup: 3-way Switch Configuration for Single-Channel Mode

If you only need to support selecting between two or three modes then you can map the modes to the positions of a single 3-way switch. Below we show how to map the Taranis 3-way "SD" switch to channel 5.

**Note** 本示例演示如何设置常用的 *FrSky taranis* 遥控器。 Transmitter setup will be different on other transmitters. :::

打开Taranis UI**MIXER**页面，向下滚动道**CH5**，如下：

![Taranis - Map channel to switch](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_1.png)

按下**ENT(ER)**编辑**CH5**配置然后将**Source**改为*SD*按钮。

![Taranis - Configure channel](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_2.png)

That's it! 通道5现在将为三个不同的**SD**开关位置输出3个不同的PWM的值。

*QGroundControl* 配置当时正像前一节中描述的那样。


### Taranis Setup: Multi-Switch Configuration for Single-Channel Mode

Most transmitters do not have 6-way switches, so if you need to be able to support more modes than the number of switch positions available (up to 6) then you will have to represent them using multiple switches. Commonly this is done by encoding the positions of a 2- and a 3-position switch into a single channel, so that each switch position results in a different PWM value.

On the FrSky Taranis this process involves assigning a "logical switch" to each combination of positions of the two real switches. Each logical switch is then assigned to a different PWM value on the same channel.

下面的视频展示如何使用*FrSky Taranis*遥控器来完成此操作。<!-- \[youtube\](https://youtu.be/scqO7vbH2jo) Video has gone private and is no longer available --><!-- @\[youtube\](https://youtu.be/BNzeVGD8IZI?t=427) - video showing how to set the QGC side - at about 7mins and 3 secs -->@[youtube](https://youtu.be/TFEjEQZqdVA)

*QGroundControl*配置[如上所述](#flight-mode-selection)


## Further Information

* [Flight Modes Overview](../flight_modes/README.md)
* [QGroundControl > 飞行模式](https://docs.qgroundcontrol.com/master/en/SetupView/FlightModes.html#px4-pro-flight-mode-setup)
* [PX4 Setup Video - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (Youtube)
* [Radio switch parameters](../advanced_config/parameter_reference.md#radio-switches) - Can be used to set mappings via parameters



