# 着陆模式

[<img src="../../assets/site/position_fixed.svg" title="Position estimate required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*着陆*飞行模式使飞机降落在指定点。

> **注** 该模式需要有效的位置估计，除非由于故障保护而进入该模式，在这种情况下仅需要高度（通常在飞行控制器中内置气压计）。 *此模式为自动模式（[默认](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE)情况下，RC控制被禁用，除了用于更改模式外）。

下面描述每种类型飞机的具体行为。

## 多旋翼（MC）

飞机将降落在模式所指定的位置。 车辆以`MPC_LAND_SPEED`中指定的速率下降，直至到达地面。

着陆受以下参数影响：

| 参数                                                                             | 描述                                       |
| ------------------------------------------------------------------------------ | ---------------------------------------- |
| [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 着陆过程中的下降速率。 鉴于地面情况未知，这个值应该设得相当小。         |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 降落后自动锁定超时时间. 默认情况下, 这是 0 (飞机在着陆后不会自动锁定)。 |

## 固定翼（FW）

飞机将转弯并降落在模式所指定的位置。 固定机翼着陆逻辑和参数在主题：[着陆（固定翼）](../flying/fixed_wing_landing.md)中解释。

> **注**通常，固定翼飞机将遵循固定的着陆轨迹到地面（它不会尝试拉平着陆）。 This is because in LAND mode the vehicle may not know ground altitude and will assume it is at sea level. As ground level may be much higher, a vehicle will often reach the ground at an altitude above where flare logic would be engaged.

Landing is affected by the following parameters (also see [Landing (Fixed Wing)](../flying/fixed_wing_landing.md)):

| 参数                                                                             | 参数描述                                                                            |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 降落后自动锁定超时时间. By default this is 0 (vehicle will not auto-disarm after landing). |

## 垂直起降（VTOL）

A VTOL follows the LAND behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode. When [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) is set (default: on) a VTOL in FW mode will transition back to MC just before landing.