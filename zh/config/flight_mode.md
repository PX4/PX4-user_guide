# 飞行模式有关配置

[飞行模式](../flight_modes/README.md) 提供了不同类型的 *辅助飞行* ，以及通过设定执行任务的或者通过相应计算机控制的 *全自主飞行* 。 不同的飞行模式使得新用户可以使用一个相对于单一的基础遥控器飞行而言更广泛的平台来学习飞行。 不同的飞行模式还提供了一些常见的自动化任务，比如起飞、降落和自动返航功能。

PX4 允许您从地面站（平板电脑或者桌面电脑）或者遥控器来切换飞行模式。 如果遥控器或者平板电脑都连接上 PX4 的话，两者都可以改变当前的飞行模式并且覆盖之前飞行模式的设置。

这个话题说明了如何在你的遥控器开关上映射飞行模式设置。

> **Note** 您必须已经配置好了您的 [遥控器](../config/radio.md) 以便设定飞行模式。

## 我应该设置什么飞行模式呢？

你可以设置任何（或者不设置） [这里](../flight_modes/README.md) 描述的飞行模式。

新手可以考虑设置一个或者多个下面的这些使得飞机更容易控制的飞行模式：

* **自稳模式** - 飞行器很难侧翻，并且如果遥控器摇杆释放的话飞行器会趋于水平（但无法保持位置定点）。
* **位置模式** - 如果遥控器摇杆释放的话飞行器会停下来保持位置定点（并且不会随风飘移）。
* **定高模式** - 飞行器的爬升和降落被限制了一个最大的速率。飞机会保持高度稳定（但仍无法保持位置定点）。

通常也在遥控器上映射这些开关：

* [返航模式](../flight_modes/return.md) - 这个模式会把飞行器升高到安全的高度并且返回起飞点。
* [任务模式](../flight_modes/mission.md) - 这个模式将会运行地面站发送的预先编写好的任务。
* <span id="kill_switch"></span> [Kill Switch](../config/safety.md#kill_switch) - 立即停止所有电机的输出（飞行器可能会摔坏，这在某些紧急情况下比允许其继续飞行更为可取）。

## 多通道模式选择 vs 单通道模式选择

*PX4* (*QGroundControl*) supports two modes for mapping flight modes to transmitter switches/dials:

* **Single Channel Mode Selection:** Assign up to 6 flight modes to switch positions encoded in a single channel.
* **Multi Channel Mode Selection:** Assign modes to switch positions encoded in one or more channels. Some modes are hard coded to share channels, or are defined/set automatically based on other mode selections (the behaviour of multi-channel mode selection can sometimes be confusing). 

> **Tip** The recommended approach is use *Single Channel Mode Selection* because it easy to understand and configure.

## Single-Channel Flight Mode Selection {#single_channel}

The single-channel selection mode allows you to specify a "mode" channel and select up to 6 flight modes that will be activated based on the PWM value of the channel. You can also separately specify channels for mapping a kill switch, return to launch mode, and offboard mode.

> **Note** In order to use this approach you will first need to configure your *transmitter* to encode the physical positions of your mode switch(es) into a single channel. We provide a video guide of how this is done for the popular *Taranis* transmitter [below](#taranis_setup) (check your documentation if you use a different transmitter).

To configure single-channel flight mode selection:

1. 打开 *QGroundControl* 并连接上飞机。
2. Turn on your RC transmitter.
3. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Flight Modes** in the sidebar.
    
    ![Flight modes single-channel](../../images/qgc/setup/flight_modes_single_channel.jpg)
    
    > **Tip** If the screen opens in *Multi Channel Mode* click the **Use Single Channel Mode Selection** button to change screen.

4. Specify *Flight Mode Settings*:
    
    * Select the **Mode channel** (above this shown as Channel 5, but this will depend on your transmitter configuration). 
    * Select up to six **Flight Modes**.
5. Specify *Switch Settings*: 
    * Select the channels that you want to map to specific actions - e.g.: *Return* mode, *Kill switch*, *offboard* mode, etc. (if you have spare switches and channels on your transmitter).
6. Test that the modes are mapped to the right transmitter switches: 
    * Check the *Channel Monitor* to confirm that the expected channel is changed by each switch.
    * Select each mode switch on your transmitter in turn, and check that the desired flight mode is activated (the text turns yellow on *QGroundControl* for the active mode).

All values are automatically saved as they are changed.

### Single-Channel Setup Video Example (including Transmitter Setup) {#taranis_setup}

It is common to use the positions of a 2- and a 3-position switch on the transmitter to represent the 6 flight modes, and encode each combination of switches as a particular PWM value for the mode that will be sent on a single channel.

The video below shows how this is done with the *FrSky Taranis* transmitter (a very popular and highly recommended RC transmitter). The process involves assigning a "logical switch" to each combination of positions of the two real switches. Each logical switch is then assigned to a different PWM value on the same channel.

The video then shows how to use *QGroundControl* to specify the mode channel and map modes to each of the 6 "slots". {% youtube %} http://www.youtube.com/watch?v=scqO7vbH2jo {% endyoutube %}

### Single-Channel Setup Instructional Example

This example shows how you can configure a transmitter and PX4 with:

* A 3-way switch to choose between flight modes using the single-channel mode setting approach (Manual, Altitude, Acro).
* A 2-way switch that invokes some function (arm/disarm) (via a [Radio switch](../advanced_config/parameter_reference.md#radio-switches) parameter).

> **Note** This example shows how to set up the popular *FrSky Taranis* transmitter. Configuration will be slightly different for other transmitters.

First set up your transmitter. Below we show how to map the Taranis "SD" switch to channel 5. This is done in the Taranis UI 'mixer' page, as shown below:

![Taranis - Map channel to switch](../../images/qgc/setup/single_channel_mode_selection_1.png)

![Taranis - Configure channel](../../images/qgc/setup/single_channel_mode_selection_2.png)

You can then select the channel and the flight modes in single channel mode selection option in *QGroundControl*:

![QGC - Set mode channel](../../images/qgc/setup/single_channel_mode_selection_3.png)

The [Radio switch](../advanced_config/parameter_reference.md#radio-switches) parameters map a particular function to a channel. Assuming you have already mapped a channel in your transmitter you can assign the channel by [setting the parameter](../advanced_config/parameters.md).

For example, below we map channel 6 to the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter in *QGroundControl*

![QGC - Map ARM switch to channel](../../images/qgc/setup/single_channel_mode_selection_4.png)

## Multi-Channel Flight Mode Selection {#multi_channel}

> **Tip** We recommend you use [Single Channel Flight Mode](#single_channel) selection because the Multi Channel selection user interface can be confusing. If you do choose to use this method, then the best approach is to start assigning channels and take note of information displayed by *QGroundControl* following your selection.

The multi-channel selection user interface allows you to map one or more modes to one or more channels. There are some modes (and hence switches) that must always be defined, and the channel to which they must be allocated.

To configure flight modes using the multi-channel UI:

1. Turn on your RC transmitter.
2. 打开 *QGroundControl* 并连接上飞机。
3. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Flight Modes** in the sidebar.
    
    ![Flight modes multi-channel](../../images/qgc/setup/flight_modes_multi_channel.jpg)
    
    > **Tip** If the screen opens in *Single Channel Mode* click the **Use Multi Channel Mode Selection** button to change screen.

4. Select the modes you want to assign to your switches and select the associated channel (selected modes will *move* in the user interface to be grouped by channel). There are a number of complications on the mode to channel assignments:
    
    * Some modes cannot be manually edited (are grayed out) because their channel and threshold level are automatically defined based on the values of other mode settings. 例如： 
        * *Mission* mode - is automatically assigned the same channel number as *Hold* (if the channel for *Hold* is defined by the user). If the channel for *Hold* is not defined, *Mission* mode is automatically assigned the same channel as *Stabilized/Main* mode. This, for example, prevents the user from defining *Stabilized/Main* and *Mission* mode on different channels, to ensure that the user cannot switch both modes ON at the same time. 
        * *Altitude* mode - is automatically assigned the same channel number as *Position Control* (if it is defined), or otherwise the same channel as *Stabilized/Main* mode.
    * *Assist* mode - This mode is added to the same channel as *Stabilized/Main* mode if (and only if) *Position Control* is enabled and defined on a different channel than *Stabilized/Main*.
5. Click the **Generate Thresholds** button. 
    * This will automatically create threshold values for all modes, spread evenly across each channel for its assigned modes. For example, in the mode assignment shown above, most modes are assigned to mode 5, and you can see that the channel thresholds for each mode are spread evenly across the channel. 

This mode is demonstrated in the [autopilot setup video here](https://youtu.be/91VGmdSlbo4?t=6m53s) (youtube).

> **Note** This flight mode selection mechanism is relatively complicated due to the way that PX4 works out which mode should be selected. You may be able to gain some insight from this [flow chart](https://dev.px4.io/en/concept/flight_modes.html#flight-mode-evaluation-diagram) (PX4 Developer Guide).

## 更多信息

* [Flight Modes Overview](../flight_modes/README.md)
* [QGroundControl > Flight Modes](https://docs.qgroundcontrol.com/en/SetupView/FlightModes.html#px4-pro-flight-mode-setup)
* [PX4 Setup Video - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (Youtube)