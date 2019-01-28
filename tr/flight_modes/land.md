# Land Mode

[<img src="../../assets/site/position_fixed.svg" title="Position estimate required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Land* flight mode causes the vehicle to land at the position where the mode was engaged.

> **Note** * This mode requires a valid position estimate unless the mode is entered due to a failsafe, in which case only altitude is required (typically a barometer is built into the flight controller). * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes).

The specific behaviour for each vehicle type is described below.

## Multi-Copter (MC)

The vehicle will land at the location at which the mode was engaged. The vehicle descends at the rate specified in `MPC_LAND_SPEED` until it hits the ground.

Landing is affected by the following parameters:

| Parameter                                                                      | Description                                                                                                |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | The rate of descent during landing. This should be kept fairly low as the ground conditions are not known. |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing. By default this is 0 (vehicle will not auto-disarm after landing). |

## Fixed Wing (FW)

The vehicle will turn and lands at the location at which the mode was engaged. Fixed wing landing logic and parameters are explained in the topic: [Landing (Fixed Wing)](../flying/fixed_wing_landing.md).

> **Note** Often a FW vehicle will follow a fixed landing trajectory to ground (it will not attempt a flared landing). This is because in LAND mode the vehicle may not know ground altitude and will assume it is at sea level. As ground level may be much higher, a vehicle will often reach the ground at an altitude above where flare logic would be engaged.

Landing is affected by the following parameters (also see [Landing (Fixed Wing)](../flying/fixed_wing_landing.md)):

| Parameter                                                                      | Description                                                                                                |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing. By default this is 0 (vehicle will not auto-disarm after landing). |

## VTOL

A VTOL follows the LAND behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode. When [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) is set (default: on) a VTOL in FW mode will transition back to MC just before landing.