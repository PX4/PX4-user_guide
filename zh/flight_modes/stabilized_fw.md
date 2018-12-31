# 稳定模式（固定翼）

[<img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Stabilized mode* puts the vehicle into straight and level flight when the RC sticks are centered, maintaining the horizontal posture against wind (but not vehicle heading and altitude).

The vehicle climb/descends based on pitch input and performs a coordinated turn if the roll/pitch sticks are non-zero. Roll and pitch are angle controlled (you can't roll upside down or loop).

> **Tip** *Stabilized mode* is much easier to fly than [Manual mode](#manual_fw) because you can't roll or flip it, and it is easy to level the vehicle by centering the control sticks.

The vehicle will glide if the throttle is lowered to 0% (motor stops). In order to perform a turn the command must beheld throughout the maneuver because if the roll is released the plane will stop turning and level itself (the same is true for pitch and yaw commands).

下图以可视方式显示模式行为（对于[模式2发送器](../getting_started/rc_transmitter_receiver.md#transmitters-for-aircraft)）。

![FW Manual Flight](../../images/flight_modes/manual_stabilized_FW.png)

## 技术描述

RC/manual mode where centered RP sticks level vehicle.

* Centered sticks put vehicle into straight and level flight. 但是飞行过程和姿态并不稳定，可能被风吹飘离。
* If roll/pitch sticks are non-zero the vehicle does a coordinated turn (manual yaw input is added to rudder control input to control sideslip).

## 参数

| 参数     | 描述 |
| ------ | -- |
| &nbsp; |    |

<!-- this document needs to be extended -->