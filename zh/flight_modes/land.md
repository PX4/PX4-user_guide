# 着陆模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位估计（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Land* flight mode causes the vehicle to land at the position where the mode was engaged. 降落后，无人机将会在一小段时间后上锁（默认情况下）。

:::note
* This mode requires a valid global position estimate (from GPS or inferred from a [local position](../ros/external_position_estimation.md#enabling-auto-modes-with-a-local-position)).
* In a failsafe the mode only requires altitude (typically a barometer is built into the flight controller).
* This mode is automatic - no user intervention is *required* to control the vehicle.
* 遥控器开关可以用于更改任何无人机的飞行模式。
* RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes_mc/position.md) unless handling a critical battery failsafe.
* The mode can be triggered using the [MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START) MAVLink command, or by explicitly switching to Land mode. :::

下面描述每种类型飞机的具体行为。


## 多旋翼（MC）

The vehicle will land at the location at which the mode was engaged. 无人机以 [MPC_LAND_SPEED](#MPC_LAND_SPEED) 指定的速度下降，降落后会上锁（[默认](#COM_DISARM_LAND)）。

RC stick movement will change the vehicle to [Position mode](../flight_modes_mc/position.md) (by [default](#COM_RC_OVERRIDE)).

着陆受以下参数影响：

| 参数                                                                                                      | 描述                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="MPC_LAND_SPEED"></a>[MPC LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)     | 着陆过程中的下降速率。 鉴于地面情况未知，这个值应该设得相当小。                                                                                                                                                             |
| <a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 降落后自动上锁的超时时间，以秒为单位。 如果设定为 -1，无人机将不会在着陆时上锁。                                                                                                                                                   |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes_mc/position.md). 可以分别为自动模式和 offboard 模式启用此功能，默认情况下在自动模式下启用此功能。 |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes_mc/position.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).                              |


## Fixed-wing (FW)

:::warning
Fixed-wing _Land mode_ is currently broken: [PX4-Autopilot/pull/21036](https://github.com/PX4/PX4-Autopilot/pull/21036). (Specifically, switching to Land mode causes a fly-away.)

Automated landing in missions is supported: [Mission mode > Fixed-wing mission landing](../flight_modes/mission.md#fw-mission-landing). :::


## 垂直起降（VTOL）

A VTOL follows the LAND behavior and parameters of [Fixed-wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode. 当设置 [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)（默认：开）时，固定翼模式下的 VTOL 将在着陆前切换回多旋翼模式。