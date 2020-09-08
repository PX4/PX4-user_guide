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

## 多通道飞行模式选择 vs 单通道飞行模式选择

*PX4* (*QGroundControl*) 支持两种方式来映射飞行模式到遥控器开关/表盘：

* **单通道模式选择：** 单通道编码模式下最多分配 6 个飞行模式到遥控器的不同开关位置上。
* **多通道模式选择：** 把不同飞行模式分配到不同的遥控器开关位置，来使用一个或者多个通道的编码。 一些模式被硬编码以共享通道，或者是根据其他选择的模式被自动指定（多通道模式选择的方式很多时候会导致困惑）。 

> **Tip** 推荐使用 *单通道模式选择* 的方式，因为它更容易被理解和配置。

## 单通道飞行模式选择 {#single_channel}

单通道选择模式允许您指定一个 "飞行模式" 通道，最多选择 6 种飞行模式，依赖于该通道的 PWM 值来被激活。 您也可以单独的指定特定的通道来映射 Kill Switch，自动返航和机外控制（offboard）模式。

> **Note** 为了使用单通道飞行模式选择的方式，你首先需要配置你的 *遥控器* 来映射遥控器上开关的物理位置到一个单个通道中去。 [这里](#taranis_setup) 我们提供了一个视频演示 *Taranis* 遥控器通常是如何进行该操作的（如果您使用的是不同品牌的遥控器的话请查阅相应文档）。

配置单通道飞行模式选择：

1. 打开 *QGroundControl* 并连接上飞机。
2. 打开您的 RC 遥控器发射机。
3. 点击上方工具栏的 **Gear** 图标（飞行器设置），然后在左侧边栏选择 **Flight Modes** 。
    
    ![Flight modes single-channel](../../assets/qgc/setup/flight_modes/flight_modes_single_channel.jpg)
    
    > **Tip** 如果界面中显示的是 *Multi Channel Mode*，点击 **Use Single Channel Mode Selection** 按钮来切换成单通道模式。

4. 进行 *飞行模式设置* :
    
    * 选择 **Mode channel** （上面显示的是 Channel 5 ，但是这是取决于你遥控器的设置的）。 
    * 最多可以选择 6 个 **飞行模式** 。
5. 进行 *遥控器开关设置* ： 
    * 选择你想要映射的特点飞行模式的通道 - 例如：*自动返航*，*Kill switch*，*机外控制（offboard）* 等模式。 （如果你的遥控器发射机上有空闲的开关或者通道的话）。
6. 测试模式是否映射到正确的发射器开关： 
    * 检查 *Channel Monitor* 以确认改变每个开关可以改变预期的通道。
    * 拨动你遥控器上刚刚映射的飞行模式有关的开关，并检查对应的飞行模式已被激活（ *QGroundeControl* 上对应的通道的字体在被激活的情况下变为黄色 ）

所有被更改的值都会自动保存。

### 单通道模式配置的视频演示（包括遥控器相关设置） {#taranis_setup}

通常使用遥控器上的 2 级和 3 位开关的位置来表示 6 个飞行模式，并将每一个开关组合作为一个特定的 PWM 值，使用单一通道发送。

下面视频演示了如何使用 *FrSky Tarais* 遥控器（一款非常受欢迎、高推荐度的 RC 发射器）。 这个过程涉及到为两个真正的开关的每个位置组合分配一个 "逻辑开关"。 然后，每个逻辑开关都被分配给同一频道的不同 PWM 值。

然后视频显示如何使用 *QGrounderControl* 指定模式通道并且映射到 6 个 “信号槽” 中的每一个。 {% youtube %} http://www.youtube.com/watch?v=scqO7vbH2jo {% endyoutube %}

### 单通道模式设置示例

此示例显示您将如何配置发射器和 PX4 ：

* A 3-way switch to choose between flight modes using the single-channel mode setting approach (Manual, Altitude, Acro).
* A 2-way switch that invokes some function (arm/disarm) (via a [Radio switch](../advanced_config/parameter_reference.md#radio-switches) parameter).

> **Note** 本示例演示如何设置常用的 *FrSky taranis* 遥控器。 对于其他遥控器，配置可能会稍有不同。

首先设置您的遥控器发射机。 下面我们将演示如何将 Taranis 的 "SD" 开关映射到通道 5 。 这是在 Taranis 的 'mixer' 的界面中，如下所示：

![Taranis - Map channel to switch](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_1.png)

![Taranis - Configure channel](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_2.png)

然后, 您可以在 *QGroundControl* 选择单通道模式选项中选择通道和飞行模式：

![QGC - Set mode channel](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_3.png)

[Radio switch](../advanced_config/parameter_reference.md#radio-switches) 参数将特定功能映射到该通道。 假设你已经在您的发射器中映射了一个通道，您可以通过 [setting the parameter](../advanced_config/parameters.md) 来分配通道。

For example, below we map channel 6 to the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter in *QGroundControl*.

![QGC - Map ARM switch to channel](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_4.png)

## 多通道飞行模式选择 {#multi_channel}

> **Tip** 我们建议您使用 [单通道飞行模式](#single_channel) 选择，因为多通道飞行模式选择下很可能会造成用户您比较混乱和疑惑。 如果您选择使用此方法，那么最好的办法是开始分配频道时注意到您选择后显示的 *QGroundeControl* 报出的信息。

多通道飞行模式选择下，允许用户您将一个或多个飞行模式映射到一个或多个通道。 有一些飞行模式（同对应开关）必须被定义，对应的通道也同样被分配。

使用多通道分配飞行模式界面来配置飞行模式：

1. 打开您的 RC 遥控器发射机。
2. 打开 *QGroundControl* 并连接上飞机。
3. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Flight Modes** in the sidebar.
    
    ![Flight modes multi-channel](../../assets/qgc/setup/flight_modes/flight_modes_multi_channel.jpg)
    
    > **Tip** If the screen opens in *Single Channel Mode* click the **Use Multi Channel Mode Selection** button to change screen.

4. Select the modes you want to assign to your switches and select the associated channel (selected modes will *move* in the user interface to be grouped by channel). There are a number of complications on the mode to channel assignments:
    
    * Some modes cannot be manually edited (are grayed out) because their channel and threshold level are automatically defined based on the values of other mode settings. 例如： 
        * *Mission* mode - is automatically assigned the same channel number as *Hold* (if the channel for *Hold* is defined by the user). If the channel for *Hold* is not defined, *Mission* mode is automatically assigned the same channel as *Stabilized/Main* mode. This, for example, prevents the user from defining *Stabilized/Main* and *Mission* mode on different channels, to ensure that the user cannot switch both modes ON at the same time. 
        * *Altitude* mode - is automatically assigned the same channel number as *Position Control* (if it is defined), or otherwise the same channel as *Stabilized/Main* mode.
    * *Assist* mode - This mode is added to the same channel as *Stabilized/Main* mode if (and only if) *Position Control* is enabled and defined on a different channel than *Stabilized/Main*.
5. Click the **Generate Thresholds** button. 
    * This will automatically create threshold values for all modes, spread evenly across each channel for its assigned modes. For example, in the mode assignment shown above, most modes are assigned to mode 5, and you can see that the channel thresholds for each mode are spread evenly across the channel. 

This mode is demonstrated in the [autopilot setup video here](https://youtu.be/91VGmdSlbo4?t=6m53s) (youtube).

> **Note** This flight mode selection mechanism is relatively complicated due to the way that PX4 works out which mode should be selected. You may be able to gain some insight from this [flow chart](https://dev.px4.io/master/en/concept/flight_modes.html#flight-mode-evaluation-diagram) (PX4 Developer Guide).

## 更多信息

* [Flight Modes Overview](../flight_modes/README.md)
* [QGroundControl > Flight Modes](https://docs.qgroundcontrol.com/en/SetupView/FlightModes.html#px4-pro-flight-mode-setup)
* [PX4 Setup Video - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (Youtube)