# 手动/自稳模式（多旋翼）

[<img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*手动/稳定*模式在当遥控杆居中时可稳定多旋翼飞行器。 要手动移动/飞行飞机，您可以移动杆使其偏离居中位置。

:::note
This multicopter mode is enabled if you set either *Manual* or *Stabilized* modes.
:::

When under manual control the roll and pitch sticks control the *angle* of the vehicle (attitude) around the respective axes, the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.

As soon as you release the control sticks they will return to the center deadzone. The multicopter will level out and stop once the roll and pitch sticks are centered. The vehicle will then hover in place/maintain altitude - provided it is properly balanced, throttle is set appropriately (see [below](#params)), and no external forces are applied (e.g. wind). The craft will drift in the direction of any wind and you have to control the throttle to hold altitude.

![MC Manual Flight](../../assets/flight_modes/manual_stabilized_MC.png)

## 技术描述

The pilot's inputs are passed as roll and pitch angle commands and a yaw rate command. Throttle is rescaled (see [below](#params)) and passed directly to the output mixer. The autopilot controls the attitude, meaning it regulates the roll and pitch angles to zero when the RC sticks are centered inside the controller deadzone (consequently leveling-out the attitude). The autopilot does not compensate for drift due to wind (or other sources).

:::note

* Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
:::

<span id="params"></span>

## 参数

| 参数                                                                                                  | 描述                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span id="MPC_THR_HOVER"></span>[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) | 当油门杆居中并且` MPC_THR_CURVE `设置为默认值时输出的悬停油门。                                                                                                                                                                                                                                       |
| <span id="MPC_THR_CURVE"></span>[MPC_THR_CURVE](../advanced_config/parameter_reference.md#MPC_THR_CURVE) | 定义油门比例。 默认设置为**重新调节至悬停推力**这意味着当油门杆居中时，输出配置的悬停油门（` MPC_THR_HOVER`）并且杆输入在其下方和上方线性重新调整（允许在稳定模式和高度/位置控制模式之间平滑过渡）。   
在功率大的飞机上，悬停油门可能非常低（例如低于20％），因此重新调整会使油门输入变形—— 即这里80％的推力将仅由杆输入的上半部分控制，20％由底部的来控制。 如果需要，可以将` MPC_THR_CURVE `设置为**无重新调整**，不进行重新调整（干输入对油门的映射的棒独立于`MPC_THR_HOVER`）。 |