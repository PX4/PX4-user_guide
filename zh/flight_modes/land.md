# 着陆模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位估计（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*着陆*飞行模式使飞机降落在指定点。 After landing, vehicles will disarm after a short timeout (by default).

> **注** 该模式需要有效的位置估计，除非由于故障保护而进入该模式，在这种情况下仅需要高度（通常在飞行控制器中内置气压计）。 * This mode is automatic - no user intervention is *required* to control the vehicle. * RC control switches can be used to change flight modes on any vehicle. * RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.

下面描述每种类型飞机的具体行为。

## 多旋翼（MC）

飞机将降落在模式所指定的位置。 The vehicle descends at the rate specified in [MPC_LAND_SPEED](#MPC_LAND_SPEED) and will disarm after landing (by [default](#COM_DISARM_LAND)).

RC stick movement will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.

着陆受以下参数影响：

| 参数                                                                                                      | 描述                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_LAND_SPEED"></span>[MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 着陆过程中的下降速率。 鉴于地面情况未知，这个值应该设得相当小。                                                                                                                                                                                                                                                                                                          |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing, in seconds. If set to -1 the vehicle will not disarm on landing.                                                                                                                                                                                                                                  |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled, stick movement on a multicopter (or VTOL in multicopter mode) gives control back to the pilot in [Position mode](../flight_modes/position_mc.md) (except when vehicle is handling a critical battery failsafe). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |

## 固定翼（FW）

The vehicle will turn and land at the location at which the mode was engaged. RC stick movement is ignored.

固定机翼着陆逻辑和参数在主题：[着陆（固定翼）](../flying/fixed_wing_landing.md)中解释。

> **注**通常，固定翼飞机将遵循固定的着陆轨迹到地面（它不会尝试拉平着陆）。 这是因为在着陆模式下，飞机可能不知道地面高度并且将假设它处于海平面。 由于地面高度可能会高得多，因此飞机通常会在高于拉平辑逻辑的高度处到达地面。

着陆受以下参数影响（另见[着陆（固定翼）](../flying/fixed_wing_landing.md)）：

| 参数                                                                             | 描述                                                                                                       |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing, in seconds. If set to -1 the vehicle will not disarm on landing. |

## 垂直起降（VTOL）

当处于FW模式时，VTOL遵循LAND行为和固定翼</ 0>的参数，而当处于MC模式时，VTOL遵循多旋翼</ 1>的参数。 When [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) is set (default: on) a VTOL in FW mode will transition back to MC just before landing.</p>