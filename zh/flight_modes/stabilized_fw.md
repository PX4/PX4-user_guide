# 稳定模式（固定翼）

[<img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*稳定模式*在摇杆回中时使车辆进入定直平飞，保持姿态水平并抵抗风（但不包括飞机航向和高度）。

飞机基于俯仰输入爬升/下降，如果滚转/俯仰杆输入非零，则执行协调转弯。 滚转和俯仰是角度控制的（您不能倒滚或循环）。

> **Tip** *Stabilized mode* is much easier to fly than [Manual mode](../flight_modes/manual_fw.md) because you can't roll or flip it, and it is easy to level the vehicle by centering the control sticks.

如果油门降至0％（电机停止），飞机将滑行。 为了执行转弯，必须在整个操纵过程中保持命令，因为如果滚动杆被释放，则飞机将停止转动并自行改平（对于俯仰和偏航命令也是如此）。

The diagram below shows the mode behaviour visually (for a [mode 2 transmitter](../getting_started/rc_transmitter_receiver.md#transmitter_modes)).

![固定翼手动飞行](../../assets/flight_modes/manual_stabilized_FW.png)

## 技术描述

遥控/手动模式，杆回中使飞机改平。

* 杆回中会使飞机进入定直平飞。 但是飞行航向和高度并不稳定，可能被风吹飘离。
* 如果滚转/俯仰杆输入非零，则飞机进行协调转弯（手动偏航输入被添加到方向舵控制输入以控制侧滑）。

## 参数

| 参数     | 描述 |
| ------ | -- |
| &nbsp; |    |

<!-- this document needs to be extended -->