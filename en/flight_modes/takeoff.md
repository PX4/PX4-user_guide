# TAKEOFF Flight Mode

The TAKEOFF flight mode causes the vehicle to take off to a specified height and wait for further input.

> **Note** 
>  * This mode requires GPS.
>  * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes).
>  * The vehicle must be armed before this mode can be engaged.

The specific behaviour for each vehicle type is described below.

## Multi-copter (MC)

A multi rotor ascends to the altitude defined in `MIS_TAKEOFF_ALT` and holds position.

Takeoff is affected by the following parameters:

Parameter | Description
--- | ---
[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | Target altitude during takeoff (default: 2.5m)
[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED) | Speed of ascent (default: 1.5m/s)

## Fixed Wing (FW)

The aircraft takes off with maximum climb power into the current direction.

<!-- What about MT_TKF_THR_MIN and friends? Also RWTO_TKOFF and friends? https://docs.px4.io/en/advanced_config/parameter_reference.html#runway-takeoff 

Takeoff is affected by the following parameters:

Parameter | Description
--- | ---
[RWTO_TKOFF](../advanced_config/parameter_reference.md#RWTO_TKOFF) | Runway takeoff with landing gear.
-->

> **Warning** FW takeoff is still being clarified. The available information is listed below.
>
>  FW takeoff splits into two types
>
>  1. Runway takeoff has the following phases
>      - "throttle ramp"
>      - "clamped to runway" until min airspeed ([FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN) * [RWTO_AIRSPD_SCL](../advanced_config/parameter_reference.md#RWTO_AIRSPD_SCL))
>      - "takeoff" until alt > navigation altitude ([RWTO_NAV_ALT](../advanced_config/parameter_reference.md#RWTO_NAV_ALT)) 
>      - "climbout" until alt agl > [FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF)
>    There's a bit more detail for roll limitation until climbout, and some heading specifics. 
>
>  1. Normal/non runway takeoff
>     - full throttle climbout until altitude error < [FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF) then regular navigation
>      - optionally blocked by the launch detector (FW Launch detection)


## VTOL

A VTOL follows the TAKEOFF behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_TAKEOFF in dev -->