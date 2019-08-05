# Return Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Return* flight mode causes the vehicle to ascend to a safe height, then return to its home position where it may then either wait (hover or circle) or land.

> **Note** This mode is also known as *Return to Launch* (RTL) and *Return to Home* (RTH) 

<span></span>
> **Note** 
>  * This mode requires GPS.
> * This mode is automatic - no user intervention is *required* to control the vehicle.
> * RC control switches can be used to change flight modes on any vehicle.
    The effect of RC stick movement depends on the vehicle type.

The specific behaviour for each vehicle type is described below.

## Multi-Copter (MC)

A copter/multi-rotor will first ascend to the return altitude (*by default*, [RTL_RETURN_ALT](#RTL_RETURN_ALT)) and then fly to the home position in a straight line and constant altitude (if already above the return altitude it will return at its current altitude).

When it arrives at the home/launch position it will rapidly descend to the [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) altitude.
It will then hover for the period defined in [RTL_LAND_DELAY](#RTL_LAND_DELAY) before landing.

The required return altitude can be configured using using the parameters [RTL_RETURN_ALT](#RTL_RETURN_ALT) and [RTL_CONE_ANG](#RTL_CONE_ANG) (which define a half cone centered around the home position).

![Return mode cone](../../assets/flying/rtl_cone.jpg)

<!-- Original draw.io diagram can be found here: https://drive.google.com/file/d/1W72XeZYSOkRlBSbPXCCiam9NMAyAWSg-/view?usp=sharing -->

If the vehicles is:
- Above [RTL_RETURN_ALT](#RTL_RETURN_ALT) (1) it will return at its current altitude.
- Below the cone it will return where it intersects the cone (2) or [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (whichever is higher).
- Outside the cone (3) it will first climb until it reaches [RTL_RETURN_ALT](#RTL_RETURN_ALT).
- Inside the cone:
  - Above [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (4) it will return at its current altitude.
  - Below [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (5) it will first ascend to `RTL_DESCEND_ALT`.

Note:
- If [RTL_CONE_ANG](#RTL_CONE_ANG) is 0 degrees there is no "cone":
  - the vehicle returns at `RTL_RETURN_ALT` (or above).
  - This is the default behaviour.
- If [RTL_CONE_ANG](#RTL_CONE_ANG) is 90 degrees the vehicle will return at the greater of `RTL_DESCEND_ALT` and the current altitude.
- The vehicle will always ascend at least [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) for the return.


RC stick movement will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.

The RTL behaviour can be configured using the parameters below.


Parameter | Description
--- | ---
<span id="RTL_RETURN_ALT"></span>[RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) | Return altitude in meters (default: 60m) when [RTL_CONE_ANG](../advanced_config/parameter_reference.md#RTL_CONE_ANG) is 0. If already above this value the vehicle will return at its current altitude.
<span id="RTL_DESCEND_ALT"></span>[RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | Minimum return altitude and altitude at which the vehicle will slow or stop its initial descent from a higher return altitude (default: 30m)
<span id="RTL_LAND_DELAY"></span>[RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY) | Time to hover at `RTL_DESCEND_ALT` before landing (default: 0.5s) -by default this period is short so that the vehicle will simply slow and then land immediately. If set to -1 the system will loiter at `RTL_DESCEND_ALT` rather than landing. The delay is provided to allow you to configure time for landing gear to be deployed (triggered automatically). 
<span id="RTL_MIN_DIST"></span>[RTL_MIN_DIST](../advanced_config/parameter_reference.md#RTL_MIN_DIST) | Minimum horizontal distance from home position to trigger ascent to the return altitude specified by the "cone". If the vehicle is horizontally closer than this distance to home, it will return at its current altitude or `RTL_DESCEND_ALT` (whichever is higher) instead of first ascending to RTL_RETURN_ALT).
<span id="RTL_CONE_ANG"></span>[RTL_CONE_ANG](../advanced_config/parameter_reference.md#RTL_CONE_ANG) | Half-angle of the cone that defines the vehicle RTL return altitude. Values (in degrees): 0, 25, 45, 65, 80, 90. Note that 0 is "no cone" (always return at `RTL_RETURN_ALT` or higher), while 90 indicates that the vehicle must return at the current altitude or `RTL_DESCEND_ALT` (whichever is higher).
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

A VTOL follows the return behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.
A VTOL in FW mode will *always* transition back to MC just before landing (ignoring [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)).
