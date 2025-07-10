---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/manual_stabilized_mc
---

# 手动/自稳模式（多旋翼）

[<img src="../../assets/site/difficulty_medium.png" title="飞行难度：中等" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动/遥控器控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

The *Manual/Stabilized* mode stabilizes the multicopter when the RC control sticks are centred. 要手动使机体移动/飞，您可以移动摇杆使其偏离居中位置。

:::note
This multicopter mode is enabled if you set either *Manual* or *Stabilized* modes. :::

When under manual control the roll and pitch sticks control the *angle* of the vehicle (attitude) around the respective axes, the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.

一旦释放摇杆，它们将会返回中心死区。 一旦横滚和俯仰摇杆居中，多旋翼无人机将平稳并停止运动。 然后机体将悬停在适当的位置/保持高度 - 前提是平衡得当，油门设置适当（在[下方](#params)查看），并且没有施加任何外力（例如风）。 飞行器将朝着任何风的方向漂移，您必须控制油门以保持高度。

![多旋翼手动飞行](../../assets/flight_modes/manual_stabilized_MC.png)


## 技术描述

飞手的输入通过横滚和俯仰角度以及偏航角速率指令传递给自驾仪。 油门被重新调节（参见[下面的](#params)）并直接传递到输出混控器。 自动驾驶仪控制着姿态，这意味着当遥控器摇杆居中时，它调整飞机的横滚和俯仰角为零（因此使姿态变平）。 自动驾驶仪不能补偿由于风（或其他来源）引起的漂移。

:::note
* 需要手动输入（遥控器，或者通过 MAVLink 连接的游戏手柄/拇指摇杆）。 :::

<span id="params"></span>
## 参数

| 参数                                                                                                         | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_THR_HOVER"></span>[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) | 当油门杆居中输出的悬停油门，默认值为` MPC_THR_CURVE `。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <span id="MPC_THR_CURVE"></span>[MPC_THR_CURVE](../advanced_config/parameter_reference.md#MPC_THR_CURVE) | 定义油门缩放比例。 By default this is set to **Rescale to hover thrust**, which means that when the throttle stick is centered the configured hover throttle is output (`MPC_THR_HOVER`) and the stick input is linearly rescaled below and above that (allowing for a smooth transition between Stabilized and Altitude/Position control). <br>在动力很强的机体上，悬停油门可能非常低（例如低于 20％），因此重新调整会使油门输入变形 - 对应上面举例， 80％ 的推力将仅由摇杆输入的中位以上部分控制，20％ 的推力由中位以下的部分来控制。 If needed `MPC_THR_CURVE` can be set to **No Rescale** so that there is no rescaling (stick input to throttle mapping is independent of `MPC_THR_HOVER`). |
