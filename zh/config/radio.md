---
canonicalUrl: https://docs.px4.io/main/zh/config/radio
---

# 遥控设置

*遥控器设置 *界面是用来映射遥控器的摇杆（如横滚、俯仰、偏航以及油门）通道，校准最小值和最大值和遥控器的正反向设置。

## 绑定接收机

在你校准遥控器之前，遥控器的发射机和接收机需要绑定（对频）。 发射机和接收机对频的方法各有不同（请参照您使用的遥控器的说明书） 提醒：如果您使用的是 Spektrum 的接收机， 提醒：如果您使用的是 FrSky 的接收机，您可以在发射机上进行绑定（对频），下面是介绍。

:::note
If you are using a *Spektrum* receiver, you can put it into bind mode using *QGroundControl*, as [shown below](#spektrum_bind).
:::

:::note
If you are using a *FrSky* receiver, you can bind it with its transmitter, by following instructions [here](https://www.youtube.com/watch?v=1IYg5mQdLVI).
:::

<span id="rc_loss_detection"></span>

## RC Loss Detection

PX4 needs to be able to detect when the signal from the RC controller has been lost in order to be able to take [appropriate safety measures](../config/safety.md#rc_loss_failsafe).

RC receivers have different ways of indicating signal loss:

* Output nothing (automatically detected by PX4)
* Output a low throttle value (you can configure PX4 to detect this).
* Output the last received signal (*cannot be detected by PX4* as it looks like valid input).

If your RC receiver does not support outputting no signal on RC loss, you must configure it to set throttle low instead, and set the corresponding value in [RC_FAILS_THR](../advanced_config/parameter_reference.md#RC_FAILS_THR).

The way to do this is to set the RC controller trim and throttle stick as low as possible, and use the resulting output PWM value in both PX4 and the receiver (read your receiver manual to determine how to set the RC loss value). Then reset the throttle stick trim back to its normal position. This process ensures that the RC loss value is below the minimum value output by the receiver in normal operation.

:::note
Do not use a receiver that cannot support one of the two supported RC loss detection methods!
:::

## 执行校准

The calibration process is straightforward - you will be asked to move the sticks in a specific pattern that is shown on the transmitter diagram on the top right of the screen.

To calibrate the radio:

1. 打开您的 RC 发射机。
2. 打开 *QGroundControl* 并连接上飞机。
3. 在上面的工具条中选择 **齿轮** 按钮，然后在左面的工具条中选择 **遥控器** 按钮。
4. 点击 **OK** 开始。
    
    ![遥控器设置-开始之前](../../assets/qgc/setup/radio/radio_start_setup.jpg)

5. 设置和你遥控相匹配的 [发射机模式](../getting_started/rc_transmitter_receiver.md#transmitter_modes)（即左右手）（这个确保在下面的校准中 *QGroundControl* 准确显示摇杆的位置）
    
    ![遥控器设置-移动摇杆](../../assets/qgc/setup/radio/radio_sticks_throttle.jpg)

6. 按照文字（在遥控器的图上）提示移动摇杆的位置。 当摇杆到达位置，点击 **下一步** 。 重复上述步骤。

7. 当出现提示，移动所有开关和旋钮到最大行程（你可以在 *通道监视器* 上看到他们指示条的移动）。

8. 点击 **下一步** 保存设置。

Radio calibration is demonstrated in the [autopilot setup video here](https://youtu.be/91VGmdSlbo4?t=4m30s) (youtube).

## 其他的遥控器设置

As well as calibrating your control sticks and other transmitter controls, there are a number of additional radio setup options that you may find useful on this screen.

<img src="../../assets/qgc/setup/radio/radio_additional_radio_setup.jpg" title="Radio setup - additional settings" width="300px" />

<span id="spektrum_bind"></span>

### Spectrum 对频

Before you can calibrate the radio system the receiver and transmitter must be connected/bound. If you have a *Spektrum* receiver you can put it in *bind mode* using *QGroundControl* as shown below (this can be particularly useful if you don't have easy physical access to the receiver on your vehicle).

To bind a Spektrum transmitter/receiver:

1. 选择 **Spektrum 对频** 的按钮。
2. 选择接收机上的 “radio” 按钮。
3. 点击 **OK**。
    
    ![Spektrum对频](../../assets/qgc/setup/radio/radio_additional_setup_spectrum_bind_select_channels.jpg)

4. 按着对频按钮，打开你的 Spektrum 遥控器。

### 复制微调

This setting is used to copy the manual trim settings from your radio transmitter so that they can be applied automatically within the autopilot. After this is done you will need to remove the manually set trims.

:::note
Trim settings are used to adjust the roll, pitch, yaw such that when you center the sticks on your remote control, you get stable or level flight (in Stabilized flight mode). Some RC controllers provide trim knobs that allow you to provide an offset to the value sent by the RC controller for each stick position. The **Copy Trims** setting here moves the offsets into the autopilot.
:::

To copy the trims:

1. 选择 **微调**。
2. 摇杆居中，油门杆最低。 
3. 点击 **Ok** 。
    
    ![复制微调](../../assets/qgc/setup/radio/radio_additional_radio_setup_copy_trims.jpg)

4. 设置遥控器器微调为0。

### 辅助通道

AUX passthrough channels allow you to control arbitrary optional hardware from your transmitter (for example, a gripper).

To use the AUX passthrough channels:

1. 映射2个遥控器控制来隔离通道。 
2. 如下所示，依次映射这些通道到端口 AUX1 和 AUX2。 设置后，保存到自驾仪。
    
    ![遥控器的AUX1和AUX2通道](../../assets/qgc/setup/radio/radio_additional_setup_aux_passthrough_channels.jpg)

The flight controller will pass through the unmodified values from the specified channels out of AUX1/AUX2 to the connected servos/relays that drive your hardware.

### 参数调试通道

Tuning channels allow you to map a transmitter tuning knob to a parameter (so that you can dynamically modify a parameter from your transmitter).

:::tip
This feature is provided to enable manual in-flight tuning: [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md), [Fixedwing PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md).
:::

The channels used for parameter tuning are assigned in the *Radio* setup (here!), while the mapping from each tuning channel to its associated parameter is defined in the *Parameter editor*.

To set up tuning channels:

1. 映射3个遥控器通道（旋钮或滑块开关）来分离通道。
2. 使用选择列表，选择*参数调试*映射到遥控器通道。 设置后，保存到自驾仪。
    
    ![映射遥控器通道到调试通道](../../assets/qgc/setup/radio/radio_additional_radio_setup_param_tuning.jpg)

To map a PARAM tuning channel to a parameter:

1. 打开侧栏的**参数**。 
2. 选择参数映射到你的遥控器（这个会打开*参数编辑器*）。
3. 选中**高级设置**复选框。
4. Click the **Set RC to Param...** button (this will pop-up the foreground dialog displayed below)
    
    ![映射调试通道到参数](../../assets/qgc/setup/radio/parameters_radio_channel_mapping.jpg)

5. 从 *参数调整 id*选择列表中选择要映射的调整通道 (1、2或 3)。

6. 点击 **OK** 定关闭对话框。
7. 点击 **保存** 保存修改，关闭*参数编辑器*。

:::tip
You can clear all parameter/tuning channel mappings by selecting menu **Tools > Clear RC to Param** at the top right of the *Parameters* screen.
:::

## 更多信息

* [QGroundControl > 远程控制](https://docs.qgroundcontrol.com/en/SetupView/Radio.html)
* [PX4 设置视频 - @4m30s](https://youtu.be/91VGmdSlbo4?t=4m30s) (Youtube)
* [遥控系统选择](../getting_started/rc_transmitter_receiver.md) - 选择一个兼容的遥控系统。