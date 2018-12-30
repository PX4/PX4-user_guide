# 保持模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*保持*飞行模式（也就是“留待”模式）使飞机停止运动并保持其当前的GPS位置和高度（多旋翼将悬停在GPS位置，而固定翼飞机将围绕它旋转）。

> **注***保持模式*可用于暂停任务或帮助您在紧急情况下重新获得对飞机的控制权。 它通常通过预编程开关激活。

<span></span>

> **注** 该模式需要GPS。 *此模式为自动模式（默认情况下，RC控制被禁用，除了用于更改模式外）。

下面描述每种类型飞机的具体行为。

## 多旋翼飞机（MC）

A multicopter hovers at the current position and altitude.

The behaviour can be configured using the parameters below.

| 参数                                                                                                    | 描述                                                                                                            |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_LTRMIN_ALT"></span>[MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | Minimum height for loiter mode (vehicle will ascend to this altitude if mode is engaged at a lower altitude). |

<!-- Code for this here: https://github.com/PX4/Firmware/blob/master/src/modules/navigator/loiter.cpp#L61 -->

## Fixed Wing (FW)

The aircraft circles around the GPS hold position at the current altitude. The vehicle will first ascend to `MIS_LTRMIN_ALT` if the mode is engaged below this altitude.

The behaviour can be configured using the parameters below.

| 参数                                                                           | 参数描述                                                                                                          |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | The radius of the loiter circle.                                                                              |
| [MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | Minimum height for loiter mode (vehicle will ascend to this altitude if mode is engaged at a lower altitude). |

## 垂直起降（VTOL）

A VTOL follows the HOLD behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_LOITER in flight mode state machine -->