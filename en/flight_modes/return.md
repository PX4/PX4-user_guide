---
canonicalUrl: https://docs.px4.io/main/en/flight_modes/return
---

# Return Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Return* flight mode is used to *fly a vehicle to safety* on an unobstructed path to a safe destination, where it may either wait (hover or circle) or land.

PX4 provides several mechanisms for choosing a safe return path, destination and landing, including using home location, rally ("safe") points, mission paths, and mission landing sequences.

The following sections explain how to configure the [return type](#return_types), [return altitude](#return_altitude) and [landing/arrival behaviour](#arrival).
At the end there are sections explaining the *default* (preconfigured) behaviour for each [vehicle type](#default_configuration).

:::note
* This mode requires GPS.
* This mode is automatic - no user intervention is *required* to control the vehicle.
* RC control switches can be used to change flight modes on any vehicle.
* RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.
:::

<span id="return_types"></span>
## Return Types (RTL_TYPE)

PX4 provides four alternative approaches ([RTL_TYPE](#RTL_TYPE)) for finding an unobstructed path to a safe destination and/or landing:
- [Home/rally point return](#home_return) (`RTL_TYPE=0`): Ascend to safe altitude and return via a direct path to the closest rally point or home location.
- [Mission landing/rally point return](#mission_landing_return) (`RTL_TYPE=1`): Ascend to a safe altitude, fly direct to the closest destination *other than home*: rally point or start of mission landing.
  If no mission landing or rally points are defined, return home via direct path.
- [Mission path return](#mission_path_return) (`RTL_TYPE=2`): Use mission path and fast-continue to mission landing (if defined).
  If no mission landing defined, fast-reverse mission to home.
  If no mission defined, return direct to home (rally points are ignored).
- [Closest safe destination return](#safety_point_return) (`RTL_TYPE=3`): Ascend to a safe altitude and return via direct path to closest destination: home, start of mission landing pattern, or rally point.
  If the destination is a mission landing pattern, follow the pattern to land.

More detailed explanations for each of the types are provided in the following sections.

<span id="home_return"></span>
### Home/Rally Point Return Type (RTL_TYPE=0)

In this return type the vehicle:
- Ascends to a safe [return altitude](#return_altitude) (above any expected obstacles).
- Flies via direct path to the home position or a rally point (whichever is closest)
- [Land or waits](#arrival) at descent altitude (depending on landing parameters).

:::note
If no rally points are defined, this is the same as a *Return to Launch* (RTL)/*Return to Home* (RTH).
:::

<span id="mission_landing_return"></span>
### Mission Landing/Rally Point Return Type (RTL_TYPE=1)

In this return type the vehicle:
- Ascends to a safe [return altitude](#return_altitude) (above any expected obstacles).
- Flies via direct path to a rally point or the start of a [mission landing pattern](#mission_landing_pattern) (whichever is closest).
  If no mission landing or rally points are defined the vehicle instead returns home via a direct path.
- If the destination is a mission landing pattern it will follow the pattern to land.
- If the destination is a rally point or home it will [land or wait](#arrival) at descent altitude (depending on landing parameters).

<span id="mission_landing_pattern"></span>
:::note
A mission landing pattern consists of a [MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START), one or more position waypoints, and a [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND).
:::

:::warning
When this type is set PX4 will reject any mission without a valid landing pattern.
:::

<span id="mission_path_return"></span>
### Mission Path Return Type (RTL_TYPE=2)

This return type uses the mission (if defined) to provide a safe return *path*, and the mission landing pattern (if defined) to provide landing behaviour.
If there is a mission but no mission landing pattern, the mission is flown *in reverse*.
Rally points, if any, are ignored.

:::note
The behaviour is fairly complex because it depends on the flight mode, and whether a mission and mission landing are defined.
:::

Mission *with* landing pattern:
- **Mission mode:** Mission is continued in "fast-forward mode" (jumps, delay and any other non-position commands ignored, loiter and other position waypoints converted to simple waypoints) and then lands.
- **Auto mode other than mission mode:**
  - Ascend to a safe [return altitude](#return_altitude) above any expected obstacles.
  - Fly directly to closest waypoint (for FW not a landing WP) and descend to waypoint altitude.
  - Continue mission in fast forward mode from that waypoint.
- **Manual modes:**
  - Ascend to a safe [return altitude](#return_altitude) above any expected obstacles.
  - Fly directly to landing sequence position and descend to waypoint altitude
  - Land using mission landing pattern

Mission *without* landing pattern defined:
- **Mission mode:** 
  - Mission flown "fast-backward" (in reverse) starting from the previous waypoint 
    - Jumps, delay and any other non-position commands ignored, loiter and other position waypoints converted to simple waypoints.
    - VTOL vehicles transition to FW mode (if needed) before flying the mission in reverse.
  - On reaching waypoint 1, the vehicle ascends to the [return altitude](#return_altitude) and flies to the home position (where it [lands or waits](#arrival)).
- **Auto mode other than mission mode:**
  - Fly directly to closest waypoint (for FW not a landing WP) and descend to waypoint altitude.
  - Continue the mission in reverse, exactly as though Return mode was triggered in mission mode (above)
- **Manual modes:** Fly directly to home location and land.

If no mission is defined PX4 will fly directly to home location and land (rally points are ignored).

If the mission changes during return mode, then the behaviour is re-evaluated based on the new mission following the same rules as above (e.g. if the new mission has no landing sequence and you're in a mission, the mission is reversed). 


<span id="safety_point_return"></span>
### Closest Safe Destination Return Type (RTL_TYPE=3)

In this return type the vehicle:
- Ascends to a safe [return altitude](#return_altitude) (above any expected obstacles).
- Flies a direct path to the closest destination of: home location, mission landing pattern or rally point.
- If the destination is a mission landing pattern the vehicle will follow the pattern to land
- If the destination is a home location or rally point, the vehicle will descend to the descent altitude ([RTL_DESCEND_ALT](#RTL_DESCEND_ALT)) and then [Land or waits](#arrival).


<span id="return_altitude"></span>
## Return Altitude

A vehicle will usually first ascend to a safe altitude before returning, in order to avoid any obstacles between it and the destination.

:::note
This is true for most [return types](#return_types).
The exception is when executing a [mission path return](#mission_path_return) from within a mission, where the vehicle follows mission waypoints (we can assume these avoid any obstacles).
:::

The return altitude for a fixed-wing vehicle is configured using the parameter [RTL_RETURN_ALT](#RTL_RETURN_ALT).
The return altitude for multicopter and VTOL vehicles is configured using the parameters [RTL_RETURN_ALT](#RTL_RETURN_ALT) and [RTL_CONE_ANG](#RTL_CONE_ANG), which define a half cone centered around the destination (home location or safety point).

![Return mode cone](../../assets/flying/rtl_cone.jpg)

<!-- Original draw.io diagram can be found here: https://drive.google.com/file/d/1W72XeZYSOkRlBSbPXCCiam9NMAyAWSg-/view?usp=sharing -->

If the vehicle is:
- Above [RTL_RETURN_ALT](#RTL_RETURN_ALT) (1) it will return at its current altitude.
- Below the cone it will return where it intersects the cone (2) or [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (whichever is higher).
- Outside the cone (3) it will first climb until it reaches [RTL_RETURN_ALT](#RTL_RETURN_ALT).
- Inside the cone:
  - Above [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (4) it will return at its current altitude.
  - Below [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (5) it will first ascend to `RTL_DESCEND_ALT`.

Note:
- If [RTL_CONE_ANG](#RTL_CONE_ANG) is 0 degrees there is no "cone":
  - the vehicle returns at `RTL_RETURN_ALT` (or above).
- If [RTL_CONE_ANG](#RTL_CONE_ANG) is 90 degrees the vehicle will return at the greater of `RTL_DESCEND_ALT` and the current altitude.
- The vehicle will always ascend at least [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) for the return.


<span id="arrival"></span>
## Hover/Landing at Destination

Unless executing a mission landing (e.g. if executing a [home location return](#home_return) or [closest safe destination return](#safety_point_return)), the vehicle will arrive at its destination, and rapidly descend to the [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) altitude.

The vehicle will the loiter for a specified time ([RTL_LAND_DELAY](#RTL_LAND_DELAY)) and then land.
If [RTL_LAND_DELAY=-1](#RTL_LAND_DELAY) it will loiter indefinitely.


<span id="default_configuration"></span>
## Vehicle Default Behaviour

The mode is _implemented_ in almost exactly the same way in all vehicle types (the exception being that fixed wing vehicles will circle rather than hover when waiting), and are hence tuned using the same parameters.

However the *default configuration* is tailored to suit the vehicle type, as described below.

### Multi-Copter (MC)

Multicopters use a [home location return](#home_return) by default (and the following configuration):
- Ascend to [RTL_RETURN_ALT](#RTL_RETURN_ALT) ([RTL_CONE_ANG=0](#RTL_CONE_ANG) - cone not used).
- Fly to the home position in a straight line and constant altitude (if already above the return altitude it will return at its current altitude).
- Rapidly descend to the [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) altitude.
- Land more or less immediately (small [RTL_LAND_DELAY](#RTL_LAND_DELAY)).


### Fixed Wing (FW)

Fixed-wing aircraft use a [mission landing return type](#mission_landing_return) by default: 
- If a mission landing is defined, fly direct to the mission landing start point and then land.
- Otherwise fly directly to the home position and circle above it at radius [NAV_LOITER_RAD](#NAV_LOITER_RAD).

If not following a mission landing, and [RTL_LAND_DELAY](#RTL_LAND_DELAY) is set to -1, the vehicle will land as described in the topic: [Landing (Fixed Wing)](../flying/fixed_wing_landing.md).

The fixed wing [safe return altitude](#return_altitude) depends only on [RTL_RETURN_ALT](#RTL_RETURN_ALT) (the cone defined by [RTL_CONE_ANG](#RTL_CONE_ANG) is not used)

RC stick movement is ignored.


### VTOL

VTOL aircraft use a [mission landing return type](#mission_landing_return) by default: 
- If a mission landing is defined, fly direct to the mission landing start point and then land.
- Otherwise fly directly to the home position, transition to multicopter mode, and land as a multicopter.

  :::note
  If not in a mission landing, a VTOL in FW mode will *always* transition back to MC just before landing (ignoring [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)).
  :::

## Parameters

The RTL parameters are listed in [Parameter Reference > Return Mode](../advanced_config/parameter_reference.md#return-mode) (and summarised below).

Parameter | Description
--- | ---
<span id="RTL_TYPE"></span>[RTL_TYPE](../advanced_config/parameter_reference.md#RTL_TYPE) | Return mechanism (path and destination).<br>`0`: Return to a rally point or home (whichever is closest) via direct path.<br>`1`: Return to a rally point or the mission landing pattern start point (whichever is closest), via direct path. If neither mission landing or rally points are defined return home via a direct path. If the destination is a mission landing pattern, follow the pattern to land.<br>`2`: Use mission path fast-forward to landing if a landing pattern is defined, otherwise fast-reverse to home. Ignore rally points. Fly direct to home if no mission plan is defined.<br>`3`: Return via direct path to closest destination: home, start of mission landing pattern or safe point. If the destination is a mission landing pattern, follow the pattern to land.
<span id="RTL_RETURN_ALT"></span>[RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) | Return altitude in meters (default: 60m) when [RTL_CONE_ANG](../advanced_config/parameter_reference.md#RTL_CONE_ANG) is 0. If already above this value the vehicle will return at its current altitude.
<span id="RTL_DESCEND_ALT"></span>[RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | Minimum return altitude and altitude at which the vehicle will slow or stop its initial descent from a higher return altitude (default: 30m)
<span id="RTL_LAND_DELAY"></span>[RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY) | Time to hover at `RTL_DESCEND_ALT` before landing (default: 0.5s) -by default this period is short so that the vehicle will simply slow and then land immediately. If set to -1 the system will loiter at `RTL_DESCEND_ALT` rather than landing. The delay is provided to allow you to configure time for landing gear to be deployed (triggered automatically). 
<span id="RTL_MIN_DIST"></span>[RTL_MIN_DIST](../advanced_config/parameter_reference.md#RTL_MIN_DIST) | Minimum horizontal distance from home position to trigger ascent to the return altitude specified by the "cone". If the vehicle is horizontally closer than this distance to home, it will return at its current altitude or `RTL_DESCEND_ALT` (whichever is higher) instead of first ascending to RTL_RETURN_ALT).
<span id="RTL_CONE_ANG"></span>[RTL_CONE_ANG](../advanced_config/parameter_reference.md#RTL_CONE_ANG) | Half-angle of the cone that defines the vehicle RTL return altitude. Values (in degrees): 0, 25, 45, 65, 80, 90. Note that 0 is "no cone" (always return at `RTL_RETURN_ALT` or higher), while 90 indicates that the vehicle must return at the current altitude or `RTL_DESCEND_ALT` (whichever is higher).
<span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes/position_mc.md) (except when vehicle is handling a critical battery failsafe). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default.
<span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes/position_mc.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).
<span id="NAV_LOITER_RAD"></span>[NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | [Fixed Wing Only] The radius of the loiter circle (at [RTL_LAND_DELAY](#RTL_LAND_DELAY). 
