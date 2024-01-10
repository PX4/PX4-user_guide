# Return Mode (VTOL)

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The _Return_ flight mode is used to _fly a vehicle to safety_ on an unobstructed path to a safe destination, where it may either wait (hover or circle) or land.

VTOL vehicles use the [Mission Landing/Rally Point](../flight_modes/return.md#mission-landing-rally-point-return-type-rtl-type-1) return type by default.
In this return type a vehicle ascends to a safe altitude above obstructions (if needed), and then flies directly to a rally point or the start of a mission landing point (whichever is nearest), or the home position if neither rally points or mission landing pattern is defined.
If the destination is a mission landing pattern, the vehicle will then follow the pattern to land.
If the destination is a rally point or the home location, the vehicle will fly back to the home position and land as a multicopter.

VTOL supports the [other PX4 return types](../flight_modes/return.md#return-types-rtl-type), including home/rally point return, mission path and closest safe destination.
The default type is recommended.

:::note

- Mode is automatic - no user intervention is _required_ to control the vehicle.
- Mode requires a global 3d position estimate (from GPS or inferred from a [local position](../ros/external_position_estimation.md#enabling-auto-modes-with-a-local-position)).
  - Flying vehicles can't switch to this mode without global position.
  - Flying vehicles will failsafe if they lose the position estimate.
- Mode requires home position is set.
- Mode prevents arming (vehicle must be armed when switching to this mode).
- RC control switches can be used to change flight modes on any vehicle.
- RC stick movement is ignored.

<!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/commander/ModeUtil/mode_requirements.cpp -->

:::

## Technical Summary

VTOL vehicles use the [Mission Landing/Rally Point](../flight_modes/return.md#mission-landing-rally-point-return-type-rtl-type-1) return type by default.
In this return type the vehicle:

- Ascends to a safe minimum return altitude defined by [RTL_RETURN_ALT](#RTL_RETURN_ALT) (safely above any expected obstacles).
  The vehicle maintains its initial altitude if that is higher than the minimum return altitude.
  <!-- Note that return altitude cannot be configured using the "cone" parameter in fixed-wing vehicles. -->
- Flies via direct constant-altitude path to the destination, which will be the closest of the start of a _mission landing pattern_ and any rally point, or the home location if no mission landing pattern or rally points are defined.
- If the destination is a mission landing pattern it will follow the pattern to land.
- If the destination is a rally point or home it will transition to a multicopter at the descent altitude and then land.
  Note that [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) is igored: the vehicle will always land as a multicopter for these destinations.

A mission landing pattern consists of a [MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START), one or more position waypoints, and a [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND).

## Parameters

The RTL parameters are listed in [Parameter Reference > Return Mode](../advanced_config/parameter_reference.md#return-mode).
If using a mission landing, only the [RTL_RETURN_ALT](#RTL_RETURN_ALT) and [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) are relevant.
The others are relevant if the destination is a rally point or the home location.

| Parameter                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="RTL_TYPE"></a>[RTL_TYPE](../advanced_config/parameter_reference.md#RTL_TYPE)                         | Return type.                                                                                                                                                                                                                                                                                                                                                     |
| <a id="RTL_RETURN_ALT"></a>[RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)       | Return altitude in meters (default: 60m)If already above this value the vehicle will return at its current altitude.                                                                                                                                                                                                                                             |
| <a id="RTL_DESCEND_ALT"></a>[RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT)    | Minimum return altitude and altitude at which the vehicle will slow or stop its initial descent from a higher return altitude (default: 30m)                                                                                                                                                                                                                     |
| <a id="RTL_LAND_DELAY"></a>[RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)       | Time to hover at `RTL_DESCEND_ALT` before landing (default: 0.5s) -by default this period is short so that the vehicle will simply slow and then land immediately. If set to -1 the system will loiter at `RTL_DESCEND_ALT` rather than landing. The delay is provided to allow you to configure time for landing gear to be deployed (triggered automatically). |
| <a id="RTL_LOITER_RAD"></a>[RTL_LOITER_RAD](../advanced_config/parameter_reference.md#RTL_LOITER_RAD)       | [Fixed-wing Only] The radius of the loiter circle (at [RTL_LAND_DELAY](#RTL_LAND_DELAY).                                                                                                                                                                                                                                                                         |
| <a id="MIS_TKO_LAND_REQ"></a>[MIS_TKO_LAND_REQ](../advanced_config/parameter_reference.md#MIS_TKO_LAND_REQ) | Specify whether a mission landing or takeoff pattern is _required_. Generally fixed-wing vehicles set this to require a landing pattern but VTOL do not.                                                                                                                                                                                                         |

## See Also

- [Return Mode (Generic)](../flight_modes/return.md)
- [Return Mode (Multicopter)](../flight_modes_mc/return.md)
- [Return Mode (Fixed-wing)](../flight_modes_fw/return.md)
