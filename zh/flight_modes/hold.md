# 保持模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*保持*飞行模式（也就是“留待”模式）使飞机停止运动并保持其当前的GPS位置和高度（多旋翼将悬停在GPS位置，而固定翼飞机将围绕它旋转）。

> **注***保持模式*可用于暂停任务或帮助您在紧急情况下重新获得对飞机的控制权。 它通常通过预编程开关激活。

<span></span>

> **注** 该模式需要GPS。 *此模式为自动模式（默认情况下，RC控制被禁用，除了用于更改模式外）。

下面描述每种类型飞机的具体行为。

## 多旋翼（MC）

多旋翼飞行器在当前位置和高度盘旋。

可以使用以下参数配置此行为。

| 参数                                                                                                    | 描述                                   |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------ |
| <span id="MIS_LTRMIN_ALT"></span>[MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | 留待模式的最小高度（如果模式在较低的高度进行，则飞行器将上升到此高度）。 |

<!-- Code for this here: https://github.com/PX4/Firmware/blob/master/src/modules/navigator/loiter.cpp#L61 -->

## 固定翼飞行器（FW）

飞机在当前高度的GPS保持位置周围旋转。 如果模式低于该高度，则飞机将首先上升到`MIS_LTRMIN_ALT`。

可以使用以下参数配置此行为。

| 参数                                                                           | 描述                                  |
| ---------------------------------------------------------------------------- | ----------------------------------- |
| [NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | 留待圈的半径。                             |
| [MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | 留待模式的最小高度（如果模式在较低的高度进行，则飞机将上升到此高度）。 |

## 垂直起降（VTOL）

当处于FW模式时，VTOL遵循HOLD行为和固定翼</ 0>的参数，而当处于MC模式时，VTOL遵循多旋翼</ 1>的参数。</p> <!-- this maps to AUTO_LOITER in flight mode state machine -->