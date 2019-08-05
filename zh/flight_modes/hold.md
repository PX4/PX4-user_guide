# 保持模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*保持*飞行模式（也就是“留待”模式）使飞机停止运动并保持其当前的GPS位置和高度（多旋翼将悬停在GPS位置，而固定翼飞机将围绕它旋转）。

> **注***保持模式*可用于暂停任务或帮助您在紧急情况下重新获得对飞机的控制权。 它通常通过预编程开关激活。

<span></span>

> **注** 该模式需要GPS。 * This mode is automatic - no user intervention is *required* to control the vehicle. * RC control switches can be used to change flight modes on any vehicle. The effect of RC stick movement depends on the vehicle type.

下面描述每种类型飞机的具体行为。

## 多旋翼（MC）

多旋翼飞行器在当前位置和高度盘旋。

RC stick movement will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.

The behaviour can be configured using the parameters below.

| 参数                                                                                                      | 描述                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_LTRMIN_ALT"></span>[MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT)   | 留待模式的最小高度（如果模式在较低的高度进行，则飞行器将上升到此高度）。                                                                                                                                                            |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled stick movement gives control back to the pilot in [Position mode](../flight_modes/position_mc.md) (except when vehicle is handling a critical battery failsafe). Enabled by default. |

<!-- Code for this here: https://github.com/PX4/Firmware/blob/master/src/modules/navigator/loiter.cpp#L61 -->

## 固定翼飞行器（FW）

The aircraft circles around the GPS hold position at the current altitude. The vehicle will first ascend to `MIS_LTRMIN_ALT` if the mode is engaged below this altitude.

RC stick movement is ignored.

The behaviour can be configured using the parameters below.

| 参数                                                                           | 描述                                  |
| ---------------------------------------------------------------------------- | ----------------------------------- |
| [NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | 留待圈的半径。                             |
| [MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | 留待模式的最小高度（如果模式在较低的高度进行，则飞机将上升到此高度）。 |

## 垂直起降（VTOL）

A VTOL follows the HOLD behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_LOITER in flight mode state machine -->