# RETURN TO LAUNCH (RTL) Flight Mode

The RTL flight mode causes the vehicle to return to its home position where it may then either wait (hover or circle) or land.

> **Note** 
>  * This mode requires GPS.
>  * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes).

The specific behaviour for each vehicle type is described below.

## Multi-Copter (MC)

A copter/multi-rotor will first ascend to the `RTL_RETURN_ALT` altitude and then fly to the home position in a straight line (if already above `RTL_RETURN_ALT` it will return at its current altitude).

When it arrives at the home/launch position it will rapidly descend to the `RTL_DESCEND_ALT` altitude. It will then hover for the period defined in `RTL_LAND_DELAY` before landing.

> **Note** The `RTL_LAND_DELAY` is provided to allow time for landing gear to be deployed (this is triggered automatically). By default this period is short so that the vehicle will simply slow and then land immediately. The parameter can also be set so that the vehicle will hover indefinitely.

The RTL behaviour can be configured using the parameters below.


Parameter | Description
--- | ---
[RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) | Minimum RTL return altitude in meters (default: 60m). The vehicle will ascend to this altitude before returning. If already above this value the vehicle will return at its current altitude.
[RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | Altitude at which the vehicle will slow or stop its initial descent (default: 30m)
[RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY) | Time to hover at `RTL_DESCEND_ALT` before landing (default: 0.5s). If set to -1 the system will loiter at `RTL_DESCEND_ALT` rather than landing.
[RTL_MIN_DIST](../advanced_config/parameter_reference.md#RTL_MIN_DIST) | Minimum distance to trigger rising to a safe altitude. If the system is horizontally closer than this distance to home it will land straight on home instead of raising to the return altitude first.


## Fixed Wing (FW)

A fixed-wing aircraft will first ascend to the `RTL_RETURN_ALT` altitude and fly to the home position in a straight line. When it arrives it will rapidly descend to the `RTL_DESCEND_ALT` altitude. It will then circle above the home position.

The RTL behaviour can be configured using the parameters below.

Parameter | Description
--- | ---
[RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) | RTL return altitude in meters (default: 60m).
[RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | Altitude at which the vehicle will stop its initial descent and circle (default: 30m).
[NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | The radius of the loiter circle.


## VTOL

A VTOL follows the RTL behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode. A VTOL in FW mode will transition back to MC just before landing (ignoring [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)).
