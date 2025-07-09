---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes_fw/stabilized
---

# Stabilized Mode (Fixed-wing)

[<img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Stabilized mode*  puts the vehicle into straight and level flight when the RC sticks are centered, maintaining the horizontal posture against wind (but not vehicle heading and altitude).

如果横滚/俯仰摇杆杆不为零，则无人机根据俯仰输入进行爬升/下降并执行协调的转弯。 横滚和俯仰是角度控制的（不能上下滚动或循环）。

:::tip

:::tip
*Stabilized mode* is much easier to fly than [Manual mode](../flight_modes/manual_fw.md) because you can't roll or flip it, and it is easy to level the vehicle by centering the control sticks. :::
:::


如果油门降至 0％（电机停止），飞机将滑行。 为了执行转弯，必须在整个操纵过程中保持命令，因为如果释放横滚摇杆，则飞机将停止转动并自行调平（对于俯仰和偏航命令也是如此）。

下图直观的显示了该模式（对于一个[美国手发射机](../getting_started/rc_transmitter_receiver.md#transmitter_modes)）。

![FW Manual Flight](../../assets/flight_modes/manual_stabilized_FW.png)


## 技术描述

RC/manual mode where centered RP sticks level vehicle.
* 摇杆回中会使飞机进入定直平飞。 但是飞行航向和高度并不稳定，可能被风吹飘离。
* 如果滚转/俯仰杆输入非零，则飞机进行协调转弯（手动偏航输入被添加到方向舵控制输入以控制侧滑）。

## 参数

| 参数     | 描述 |
| ------ | -- |
| &nbsp; |    | 

<!-- this document needs to be extended -->
