---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/land
---

# 着陆模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位估计（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Land* flight mode causes the vehicle to land at the position where the mode was engaged. 降落后，无人机将会在一小段时间后上锁（默认情况下）。

:::note
* 该模式需要有效的位置估计，除非由于失效保护进入该模式，这种情况下仅需要高度估计（通常飞控内置一个气压计）。
* This mode is automatic - no user intervention is *required* to control the vehicle.
* 遥控器开关可以用于更改任何无人机的飞行模式。
* 在多旋翼中移动遥控器摇杆（或 VTOL 在多旋翼模式下）[默认情况下](#COM_RC_OVERRIDE)会将无人机切换到[位置模式](../flight_modes/position_mc.md)，除非是处理电池失效保护。 :::

下面描述每种类型飞机的具体行为。


## 多旋翼（MC）

无人机将降落在模式所指定的位置。 无人机以 [MPC_LAND_SPEED](#MPC_LAND_SPEED) 指定的速度下降，降落后会上锁（[默认](#COM_DISARM_LAND)）。

遥控器摇杆移动会把无人机切换到 [位置模式](../flight_modes/position_mc.md) （[默认](#COM_RC_OVERRIDE)）。

着陆受以下参数影响：

| 参数                                                                                                               | 描述                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| <span id="MPC_LAND_SPEED"></span>[MPC LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)      | 着陆过程中的下降速率。 鉴于地面情况未知，这个值应该设得相当小。                                                                      |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 降落后自动上锁的超时时间，以秒为单位。 如果设定为 -1，无人机将不会在着陆时上锁。                                                            |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 控制多旋翼（或者多旋翼模式下的 VOTL）的摇杆移动是否将控制权交给位置模式下的飞手。 可以分别为自动模式和 offboard 模式启用此功能，默认情况下在自动模式下启用此功能。             |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | 导致发射机切换到 [位置模式](../flight_modes/position_mc.md) 的摇杆移动量（如果 [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) 已启用）。 |


## 固定翼（FW）

无人机将转弯并降落在该模式指定的位置。 遥控器摇杆操作被忽略。

固定机翼着陆逻辑和参数在主题：[着陆（固定翼）](../flying/fixed_wing_landing.md)中说明。

:::note
通常固定翼无人机会遵循固定的着陆轨迹到地面（它不会尝试拉平着陆）。
这是因为在着陆模式下，飞机可能不知道地面高度并且将假设它处于海平面。
由于地面高度可能会高得多，因此飞机通常会在高于拉平辑逻辑的高度处到达地面。
:::

着陆受以下参数影响（也见[着陆（固定翼）](../flying/fixed_wing_landing.md)）：

| 参数                                                                             | 描述                                         |
| ------------------------------------------------------------------------------ | ------------------------------------------ |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 降落后自动上锁的超时时间，以秒为单位。 如果设定为 -1，无人机将不会在着陆时上锁。 |

## 垂直起降（VTOL）

当处于固定翼模式时，VTOL 遵循 LAND 行为和[固定翼](#fixed-wing-fw)的参数，而当处于多旋翼模式时，VTOL 遵循[多旋翼](#multi-copter-mc)的参数。 当设置 [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)（默认：开）时，固定翼模式下的 VTOL 将在着陆前切换回多旋翼模式。
