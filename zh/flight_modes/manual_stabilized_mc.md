# 手动/稳定模式（多旋翼）

[<img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*手动/稳定*模式在当遥控杆居中时可稳定多旋翼飞行器。 要手动移动/飞行飞机，您可以移动杆使其偏离居中位置。

> 如果设置*手动*或*稳定*模式，则启用此多旋翼模式。

在手动控制下，滚转和俯仰杆控制绕各个轴的飞机的*角度*（姿态），偏航杆控制水平面上方的旋转速度，油门控制高度/速度。

一旦释放操纵杆，它们就会返回中心死区。 一旦滚转和俯仰杆居中，多旋翼飞行器将平稳并停止运动。 然后飞机将悬停在适当的位置/保持高度——前提是它正确地配平，油门处于适当位置（参见[下面](#params)），并且不施加外力（例如风）。 飞行器将朝着任何风的方向漂移，你必须控制油门以保持高度。

![MC Manual Flight](../../images/flight_modes/manual_stabilized_MC.png)

## 技术描述

飞行员的输入将作为滚转、俯仰角度指令和一个偏航角速度指令传递给自动驾驶仪， 油门被重新调节（参见[下面的](#params)）并直接传递到输出混频器。 自动驾驶仪控制着飞机的姿态角，这意味着当 RC 摇杆居中时自驾仪调整飞机的滚转和俯仰角为零（从而实现飞机姿态的改平）。 自动驾驶仪不能补偿由于风（或其他来源）引起的漂移。

> **注** *可能需要手动输入（遥控器，或通过MAVLink连接的游戏手柄/拇指杆）。

## 参数 {#params}

| 参数                                                                                                  | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_THR_HOVER"></span>[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) | Hover throttle that is output when the throttle stick is centered and `MPC_THR_CURVE` is set to default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <span id="MPC_THR_CURVE"></span>[MPC_THR_CURVE](../advanced_config/parameter_reference.md#MPC_THR_CURVE) | Defines the throttle scaling. By default this is set to **Rescale to hover thrust**, which means that when the throttle stick is centered the configured hover throttle is output (`MPC_THR_HOVER`) and the stick input is linearly rescaled below and above that (allowing for a smooth transition between Stabilized and Altitude/Position control).   
On powerful vehicles the hover throttle might be very low (e.g. below 20%) so that rescaling distorts the throttle input - i.e. here 80% of the thrust would be controlled by just the top half of the stick input and 20% by the bottom. If needed `MPC_THR_CURVE` can be set to **No Rescale** so that there is no rescaling (stick input to throttle mapping is independent of `MPC_THR_HOVER`). |