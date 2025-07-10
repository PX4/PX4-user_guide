---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/rattitude_mc
---

# 角速度模式（多旋翼）

[<img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*角速度模式*允许飞行员在大多数时间使用[手动/自稳](../flight_modes/manual_stabilized_mc.md)飞行，但在需要时仍然执行[ 特技模式](../flight_modes/acro_mc.md)风格的翻转和技巧。

当滚转/俯仰操纵杆在中心区域内移动时，飞机表现为*手动/自稳模式*，当杆在外圆周移动时，车辆表现为* 特技模式* （默认情况下，手动/自稳模式占据杆行程的约80％）。 当操纵杆回中时，多旋翼飞行器将会改平（但仍然会在任何风的方向上漂移并且具有任何预先存在的动量）。

<!-- Image missing: https://github.com/PX4/px4_user_guide/issues/189 -->

## 技术描述

遥控模式，允许飞手在大多数情况下使用 [手动/自稳](../flight_modes/manual_stabilized_mc.md) 飞行，但仍在执行 [特技模式](../flight_modes/acro_mc.md) - 风格的翻转和技巧。 回正摇杆使飞机水平。

* 摇杆在模式阈值（比如 *手动/自稳模式*）之内。 
  * 回正横滚、俯仰摇杆使飞机水平。 滚转/俯仰摇杆控制各自方向的倾斜角，导致左右和前后的移动。
* 摇杆位于阈值之外（比如*特技模式*）： 
  * 横滚、俯仰、偏航摇杆输入控制围绕各自轴的角度旋转速率。

## 参数

| 参数                                                                                            | 描述                                               |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| <span id="MC_RATT_TH"></span>[MC_RATT_TH](../advanced_config/parameter_reference.md#MC_RATT_TH) | 半自稳模式的阈值（模式在手动/稳定模式和类似acro模式之间切换的杆半径百分比）。 默认：0.8 |

[手动/自稳模式](../flight_modes/manual_stabilized_mc.md)和[ 特技模式](../flight_modes/acro_mc.md)的参数也是相关的。