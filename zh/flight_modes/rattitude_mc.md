# RAttitude Mode (Multicopter)

[<img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Rattitude mode* allows pilots to fly using [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) flight most of the time, but still perform [Acro mode](../flight_modes/acro_mc.md)-style flips and tricks when desired.

The vehicle behaves as in *Manual/Stabilized mode* when the Roll/Pitch stick is moved within the central area and like *Acro mode* when the stick is moved in the outer circumference (by default Manual/Stabilized mode occupies about 80% of the range). When the sticks are centered the multicopter will level out (but will still drift in the direction of any wind and with any pre-existing momentum).

<!-- Image missing: https://github.com/PX4/px4_user_guide/issues/189 -->

## 技术描述

RC mode that allows pilots to fly using [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) flight most of the time, but still perform [Acro mode](../flight_modes/acro_mc.md)-style flips and tricks when desired. 回正摇杆使飞机水平。

* Sticks within mode's threshold (like *Manual/Stabilized mode*): 
  * 回正RP摇杆使飞机水平。 翻滚/俯仰摇杆控制各自方向的倾斜角，导致左右和前后的移动。
* 阈值之外的摇杆（比如*特技模式*）： 
  * RPY摇杆输入控制围绕各自轴的角度旋转速率。

## 参数

| 参数                                                                                            | 描述                                                                                                                                                  |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MC_RATT_TH"></span>[MC_RATT_TH](../advanced_config/parameter_reference.md#MC_RATT_TH) | Threshold for Rattitude mode (the percentage of the stick radius at which mode switches between manual/stabilised and acro-like modes. Default 0.8. |

The parameters for [Manual/Stabilized mode](../flight_modes/manual_stabilized_mc.md) and [Acro mode](../flight_modes/acro_mc.md) are also relevant.