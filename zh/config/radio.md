# 遥控设置

*遥控器设置 *界面是用来映射遥控器的摇杆（如横滚、俯仰、偏航以及油门）通道，校准最小值和最大值和遥控器的正反向设置。

## 绑定接收机

在你校准遥控器之前，遥控器的发射机和接收机需要绑定（对频）。 发射机和接收机对频的方法各有不同（请参照您使用的遥控器的说明书） 提醒：如果您使用的是 Spektrum 的接收机， 提醒：如果您使用的是 FrSky 的接收机，您可以在发射机上进行绑定（对频），下面是介绍。

> **提醒** 如果您使用的是 *Spektrum* 接收机,，你可以使用 * QGroundControl * 将它设置在绑定（对频）模式,，如[下面所示](#spektrum_bind)。
> 
> **提醒**：如果您使用的是 *FrSky * 的接收机，您可以在发射机上进行绑定（对频），下面是[介绍](https://www.youtube.com/watch?v=1IYg5mQdLVI)。

## 执行校准

校准方法很简单，你只需要按照屏幕右上角的示意图移动遥控器的摇杆即可。

遥控器校准

1. 打开您的 RC 发射机。
2. 打开 *QGroundControl* 并连接上飞机。
3. 在上面的工具条中选择 **齿轮** 按钮，然后在左面的工具条中选择 **遥控器** 按钮。
4. 点击 **OK** 开始。
    
    ![遥控器设置-开始之前](../../images/qgc/setup/radio_start_setup.jpg)

5. 设置和你遥控相匹配的 [发射机模式](../getting_started/rc_transmitter_receiver.md#transmitter_modes)（即左右手）（这个确保在下面的校准中 *QGroundControl* 准确显示摇杆的位置）
    
    ![遥控器设置-移动摇杆](../../images/qgc/setup/radio_sticks_throttle.jpg)

6. 按照文字（在遥控器的图上）提示移动摇杆的位置。 当摇杆到达位置，点击 **下一步** 。 重复上述步骤。

7. 当出现提示，移动所有开关和旋钮到最大行程（你可以在 *通道监视器* 上看到他们指示条的移动）。

8. 点击 **下一步** 保存设置。

在 [autopilot setup video here](https://youtu.be/91VGmdSlbo4?t=4m30s) (youtube) 中有遥控器校准的视频演示。

## 其他的遥控器设置

除了校准你的控制杆和其他遥控，在这个界面还有一些其他游泳的遥控器设置选项。

<img src="../../images/qgc/setup/radio_additional_radio_setup.jpg" title="遥控器设置-其他设置" width="300px" />

<span id="spektrum_bind"></span>

### Spectrum 对频

在你校准遥控器之前，遥控器的发射机和接收机需要绑定（对频）。 如果你使用的是 *Spektrum* 的接收机，你可以按照下面的提示，使用 *QGroundControl* 将它设置到 *绑定（对频）模式* （如果你没有简便的物理方式用接收机连接飞控，这个会挺好用）。

Spektrum遥控器和接收机的对频

1. 选择 **Spektrum 对频** 的按钮。
2. 选择接收机上的 “radio” 按钮。
3. 点击 **OK**。
    
    ![Spektrum对频](../../images/qgc/setup/radio_additional_setup_spectrum_bind_select_channels.jpg)

4. 按着对频按钮，打开你的 Spektrum 遥控器。

### 复制微调

这个设置是从你的遥控器复制手动微调设置，然后自动应用到自驾仪。 这个做完后，你需要手动移除微调设置。

> **提醒**微调设置是当你进行远程遥控，回中遥感时，适应横滚、俯仰、偏航，是你进行平稳或水平飞行（在自稳模式下）。 一些遥控器有微调旋钮，可以允许你对遥控器发送的每一个摇杆位置的值设置一个偏移量。 这里的**微调设置**将偏移量转移到了自驾仪中。

复制微调

1. 选择 **微调**。
2. 摇杆居中，油门杆最低。 
3. 点击 **Ok** 。
    
    ![复制微调](../../images/qgc/setup/radio_additional_radio_setup_copy_trims.jpg)

4. 设置遥控器器微调为0。

### 辅助通道

辅助通道可以让你使用遥控器控制任意可选的硬件（例如，一个抓手或收放装置）。

使用辅助通道

1. 映射2个遥控器控制来隔离通道。 
2. 如下所示，依次映射这些通道到端口 AUX1 和 AUX2。 设置后，保存到自驾仪。
    
    ![遥控器的AUX1和AUX2通道](../../images/qgc/setup/radio_additional_setup_aux_passthrough_channels.jpg)

飞控将这些为指定的值通过指定的通道输出到 AUX1 / AUX2，来驱动连接的舵机/继电器。

### 参数调试通道

调试通道是映射一个遥控器调试旋钮到参数（你可以在你的遥控器上动态调整一个参数）。

> **提示**这个功能是启动手动飞行调试：[多旋翼 PID 调试指南](../config_mc/pid_tuning_guide_multicopter.md)，[固定翼 PID 调试指南](../config_fw/pid_tuning_guide_fixedwing.md)。

用来进行参数调试的通道被放置在了*遥控器*设置中，可以在参数编辑器里设置每一个映射的调试通道对应的参数。

设置调试通道

1. 映射3个遥控器通道（旋钮或滑块开关）来分离通道。
2. 使用选择列表，选择*参数调试*映射到遥控器通道。 设置后，保存到自驾仪。
    
    ![映射遥控器通道到调试通道](../../images/qgc/setup/radio_additional_radio_setup_param_tuning.jpg)

把一个参数调试通道到一个参数。

1. 打开侧栏的**参数**。 
2. 选择参数映射到你的遥控器（这个会打开*参数编辑器*）。
3. 选中**高级设置**复选框。
4. 单击 **将 rc 设置为 param...** 按钮 (这将弹出下面显示的背景对话框)。
    
    ![映射调试通道到参数](../../images/qgc/setup/parameters_radio_channel_mapping.jpg)

5. 从 *参数调整 id*选择列表中选择要映射的调整通道 (1、2或 3)。

6. 点击 **OK** 定关闭对话框。
7. 点击 **保存** 保存修改，关闭*参数编辑器*。

> **提示**你可以在右上角的*参数*的在右上角中选择菜单**工具>清除遥控器参数**，清楚所有的参数/调试通道。

## 更多信息

* [QGroundControl > 远程控制](https://docs.qgroundcontrol.com/en/SetupView/Radio.html)
* [PX4 设置视频 - @4m30s](https://youtu.be/91VGmdSlbo4?t=4m30s) (Youtube)