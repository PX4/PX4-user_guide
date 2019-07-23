# 着陆模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位估计（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Land* flight mode causes the vehicle to land at the position where the mode was engaged. After landing, vehicles will disarm after a short timeout (by default).

> **注** 该模式需要有效的位置估计，除非由于故障保护而进入该模式，在这种情况下仅需要高度（通常在飞行控制器中内置气压计）。 *此模式为自动模式（[默认](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE)情况下，RC控制被禁用，除了用于更改模式外）。

下面描述每种类型飞机的具体行为。

## 多旋翼（MC）

飞机将降落在模式所指定的位置。 The vehicle descends at the rate specified in `MPC_LAND_SPEED` and will disarm after landing (by default).

着陆受以下参数影响：

| 参数                                                                             | 描述                                                                                                       |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 着陆过程中的下降速率。 鉴于地面情况未知，这个值应该设得相当小。                                                                         |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing, in seconds. If set to -1 the vehicle will not disarm on landing. |

## 固定翼（FW）

The vehicle will turn and land at the location at which the mode was engaged. 固定机翼着陆逻辑和参数在主题：[着陆（固定翼）](../flying/fixed_wing_landing.md)中解释。

> **注**通常，固定翼飞机将遵循固定的着陆轨迹到地面（它不会尝试拉平着陆）。 这是因为在着陆模式下，飞机可能不知道地面高度并且将假设它处于海平面。 由于地面高度可能会高得多，因此飞机通常会在高于拉平辑逻辑的高度处到达地面。

着陆受以下参数影响（另见[着陆（固定翼）](../flying/fixed_wing_landing.md)）：

| 参数                                                                             | 描述                                                                                                       |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing, in seconds. If set to -1 the vehicle will not disarm on landing. |

## 垂直起降（VTOL）

当处于FW模式时，VTOL遵循LAND行为和固定翼</ 0>的参数，而当处于MC模式时，VTOL遵循多旋翼</ 1>的参数。 当设置[NAV_FORCE_VT ](../advanced_config/parameter_reference.md#NAV_FORCE_VT)（默认值为开）时，FW模式下的VTOL将在着陆前转换回MC模式。</p>