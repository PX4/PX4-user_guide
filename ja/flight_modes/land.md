---
canonicalUrl: https://docs.px4.io/main/ja/flight_modes/land
---

# Land Mode

[<img src="../../assets/site/position_fixed.svg" title="Position estimate required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Land* flight mode causes the vehicle to land at the position where the mode was engaged. After landing, vehicles will disarm after a short timeout (by default).

:::note
* This mode requires a valid position estimate unless the mode is entered due to a failsafe, in which case only altitude is required (typically a barometer is built into the flight controller).
* This mode is automatic - no user intervention is *required* to control the vehicle.
* RC control switches can be used to change flight modes on any vehicle.
* RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe. :::

The specific behaviour for each vehicle type is described below.


## Multi-Copter (MC)

The vehicle will land at the location at which the mode was engaged. The vehicle descends at the rate specified in [MPC_LAND_SPEED](#MPC_LAND_SPEED) and will disarm after landing (by [default](#COM_DISARM_LAND)).

RC stick movement will change the vehicle to [Position mode](../flight_modes/position_mc.md) (by [default](#COM_RC_OVERRIDE)).

Landing is affected by the following parameters:

| Parameter                                                                                                        | Description                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span id="MPC_LAND_SPEED"></span>[MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)    | The rate of descent during landing. This should be kept fairly low as the ground conditions are not known.                                                                                                                                                   |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing, in seconds. If set to -1 the vehicle will not disarm on landing.                                                                                                                                                     |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes/position_mc.md). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes/position_mc.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).                                                                                              |


## Fixed Wing (FW)

The vehicle will turn and land at the location at which the mode was engaged. RC stick movement is ignored.

Fixed wing landing logic and parameters are explained in the topic: [Landing (Fixed Wing)](../flying/fixed_wing_landing.md).

:::note
Often a FW vehicle will follow a fixed landing trajectory to ground (it will not attempt a flared landing).
This is because in LAND mode the vehicle may not know ground altitude and will assume it is at sea level.
As ground level may be much higher, a vehicle will often reach the ground at an altitude above where flare logic would be engaged.
:::

Landing is affected by the following parameters (also see [Landing (Fixed Wing)](../flying/fixed_wing_landing.md)):

| Parameter                                                                      | Description                                                                                              |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing, in seconds. If set to -1 the vehicle will not disarm on landing. |

## VTOL

A VTOL follows the LAND behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode. When [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) is set (default: on) a VTOL in FW mode will transition back to MC just before landing.
