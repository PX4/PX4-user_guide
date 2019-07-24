# Return Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Return* flight mode causes the vehicle to return to its home position where it may then either wait (hover or circle) or land.

> **Note** This mode is also known as *Return to Launch* (RTL) and *Return to Home* (RTH) 

<span></span>
> **Note** 
>  * This mode requires GPS.
> * This mode is automatic - no user intervention is *required* to control the vehicle.
> * RC control switches can be used to change flight modes on any vehicle.
    The effect of RC stick movement depends on the vehicle type.

The specific behaviour for each vehicle type is described below.

## Multi-Copter (MC)

A copter/multi-rotor will first ascend to the `RTL_RETURN_ALT` altitude and then fly to the home position in a straight line (if already above `RTL_RETURN_ALT` it will return at its current altitude).

When it arrives at the home/launch position it will rapidly descend to the [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) altitude. It will then hover for the period defined in [RTL_LAND_DELAY](#RTL_LAND_DELAY) before landing.

> **Note** The `RTL_LAND_DELAY` is provided to allow time for landing gear to be deployed (this is triggered automatically). By default this period is short so that the vehicle will simply slow and then land immediately. The parameter can also be set so that the vehicle will hover indefinitely.

RC stick movement will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.

The RTL behaviour can be configured using the parameters below.


Parameter | Description
--- | ---
<span id="RTL_RETURN_ALT"></span>[RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) | Minimum RTL return altitude in meters (default: 60m). The vehicle will ascend to this altitude before returning. If already above this value the vehicle will return at its current altitude.
<span id="RTL_DESCEND_ALT"></span>[RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | Altitude at which the vehicle will slow or stop its initial descent (default: 30m)
<span id="RTL_LAND_DELAY"></span>[RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY) | Time to hover at `RTL_DESCEND_ALT` before landing (default: 0.5s). If set to -1 the system will loiter at `RTL_DESCEND_ALT` rather than landing.
<span id="RTL_MIN_DIST"></span>[RTL_MIN_DIST](../advanced_config/parameter_reference.md#RTL_MIN_DIST) | Minimum horizontal distance from home position to trigger ascent to a safe altitude (RTL_RETURN_ALT). If the vehicle is horizontally closer than this distance to home, it will return at its current altitude (instead of first ascending to RTL_RETURN_ALT). 
<span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled stick movement gives control back to the pilot in [Position mode](../flight_modes/position_mc.md) (except when vehicle is handling a critical battery failsafe). Enabled by default.


## Fixed Wing (FW)

A fixed-wing aircraft behaves the same as a multicopter on the return trip (respecting the same parameters).
The only difference is that on arrival the vehicle will, by default, circle above the home position rather than hover/land.
If [RTL_LAND_DELAY](#RTL_LAND_DELAY) is set to -1 the vehicle will land as described in the topic: [Landing (Fixed Wing)](../flying/fixed_wing_landing.md).

RC stick movement is ignored.

The following additional parameters affect return mode on fixed wing:

Parameter | Description
--- | ---
<span id="NAV_LOITER_RAD"></span>[NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | The radius of the loiter circle.


## VTOL

A VTOL follows the return behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode. A VTOL in FW mode will *always* transition back to MC just before landing (ignoring [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)).
