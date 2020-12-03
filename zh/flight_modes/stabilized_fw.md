# 稳定模式（固定翼）

[<img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*稳定模式*在摇杆回中时使车辆进入定直平飞，保持姿态水平并抵抗风（但不包括飞机航向和高度）。

飞机基于俯仰输入爬升/下降，如果滚转/俯仰杆输入非零，则执行协调转弯。 滚转和俯仰是角度控制的（您不能倒滚或循环）。

:::tip
*Stabilized mode* is much easier to fly than [Manual mode](../flight_modes/manual_fw.md) because you can't roll or flip it, and it is easy to level the vehicle by centering the control sticks.
:::

The vehicle will glide if the throttle is lowered to 0% (motor stops). In order to perform a turn the command must beheld throughout the maneuver because if the roll is released the plane will stop turning and level itself (the same is true for pitch and yaw commands).

The diagram below shows the mode behaviour visually (for a [mode 2 transmitter](../getting_started/rc_transmitter_receiver.md#transmitter_modes)).

![FW Manual Flight](../../assets/flight_modes/manual_stabilized_FW.png)

## 技术描述

RC/manual mode where centered RP sticks level vehicle.

* 杆回中会使飞机进入定直平飞。 但是飞行航向和高度并不稳定，可能被风吹飘离。
* 如果滚转/俯仰杆输入非零，则飞机进行协调转弯（手动偏航输入被添加到方向舵控制输入以控制侧滑）。

## 参数

| 参数     | 描述 |
| ------ | -- |
| &nbsp; |    |

<!-- this document needs to be extended -->