---
canonicalUrl: https://docs.px4.io/main/ja/flight_modes/takeoff
---

# Takeoff Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Takeoff* flight mode causes the vehicle to take off to a specified height and wait for further input.

:::note

* This mode requires a good position estimate (e.g. from GPS).
* The vehicle must be armed before this mode can be engaged.
* This mode is automatic - no user intervention is *required* to control the vehicle.
* RC control switches can be used to change flight modes on any vehicle.
* RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.
* The [Failure Detector](../config/safety.md#failure_detector) will automatically stop the engines if there is a problem on takeoff.
:::

The specific behaviour for each vehicle type is described below.

## Multi-copter (MC)

A multi rotor ascends to the altitude defined in `MIS_TAKEOFF_ALT` and holds position.

RC stick movement will change the vehicle to [Position mode](../flight_modes/position_mc.md) (by [default](#COM_RC_OVERRIDE)).

Takeoff is affected by the following parameters:

| Parameter                                                                                               | Description                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span id="MIS_TAKEOFF_ALT"></span>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | Target altitude during takeoff (default: 2.5m)                                                                                                                                                                                                               |
| <span id="MPC_TKO_SPEED"></span>[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)     | Speed of ascent (default: 1.5m/s)                                                                                                                                                                                                                            |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes/position_mc.md). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes/position_mc.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).                                                                                              |

<span id="fixed_wing"></span>

## Fixed Wing (FW)

The aircraft takes off in the current direction using either *catapult/hand-launch mode* or *runway takeoff mode*. The mode defaults to catapult/hand launch, but can be set to runway takeoff using [RWTO_TKOFF](#RWTO_TKOFF). RC stick movement is ignored in both cases.

<span id="hand_launch"></span>

### Catapult/Hand Launch

In *catapult/hand launch mode* the vehicle waits to detect launch (based on acceleration trigger). On launch it ramps up to full throttle ([RWTO_MAX_THR](#RWTO_MAX_THR)) in about 2 seconds and then performs a full throttle climbout, with *minimum* 10 degree takeoff pitch. Once it reaches [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF) it will transition to [Hold mode](../flight_modes/hold.md) and loiter.

:::note
In addition to the behaviour discussed above there is also a launch detector that may block the launch sequence from starting until some condition is met. For catapult launch this is some acceleration threshold.
:::

<span id="runway_launch"></span>

### Runway Takeoff

The *runway takeoff mode* has the following phases:

1. **Throttle ramp**: Clamped to the runway (pitch fixed, no roll, and heading hold) until reach the minimum airspeed for takeoff ([FW_AIRSPD_MIN](#FW_AIRSPD_MIN) x [RWTO_AIRSPD_SCL](#RWTO_AIRSPD_SCL)).
2. **Takeoff**: Increase pitch and continue until vehicle altitude > navigation altitude ([RWTO_NAV_ALT](#RWTO_NAV_ALT)).
3. **Climbout**: Climb until altitude above ground level > [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF). In this phase roll and heading restrictions are removed.

### Fixed Wing Takeoff Parameters

Takeoff is affected by the following parameters:

| Parameter                                                                                                | Description                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="RWTO_TKOFF"></span>[RWTO_TKOFF](../advanced_config/parameter_reference.md#RWTO_TKOFF)              | Runway takeoff with landing gear. Default: disabled.                                                                                                                                                                                                                                                                                                                 |
| <span id="RWTO_MAX_THR"></span>[RWTO_MAX_THR](../advanced_config/parameter_reference.md#RWTO_MAX_THR)        | Max throttle during runway takeoff.                                                                                                                                                                                                                                                                                                                                  |
| <span id="FW_CLMBOUT_DIFF"></span>[FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF)  | Climbout Altitude difference. This is used as the target altitude if taking off without a takeoff altitude setpoint (there is no setpoint in takeoff mode, but there is in missions).                                                                                                                                                                                |
| <span id="FW_AIRSPD_MIN"></span>[FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)     | Minimum Airspeed, below which the TECS controller will try to increase airspeed more aggressively.                                                                                                                                                                                                                                                                   |
| <span id="RWTO_AIRSPD_SCL"></span>[RWTO_AIRSPD_SCL](../advanced_config/parameter_reference.md#RWTO_AIRSPD_SCL) | Min. airspeed scaling factor for takeoff. Pitch is increased when the airspeed reaches: `FW_AIRSPD_MIN` * `RWTO_AIRSPD_SCL`                                                                                                                                                                                                                                          |
| <span id="RWTO_NAV_ALT"></span>[RWTO_NAV_ALT](../advanced_config/parameter_reference.md#RWTO_NAV_ALT)       | Altitude above ground level (AGL) at which we have enough ground clearance to allow some roll. Until `RWTO_NAV_ALT` is reached the plane is held level and only rudder is used to keep the heading (see <span id="RWTO_HDG"></span>[RWTO_HDG](../advanced_config/parameter_reference.md#RWTO_HDG)). This should be below `FW_CLMBOUT_DIFF` if `FW_CLMBOUT_DIFF` > 0. |

:::note
The vehicle always respects normal FW max/min throttle settings during takeoff ([FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN), [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX)).
:::

## VTOL

VTOLs default to MC mode on boot, and it is generally expected that they will take off in [multicopter mode](#multi-copter-mc) (and also safer).

That said, if transitioned to Fixed wing before takeoff, they will takeoff in [Fixed Wing](#fixed_wing) mode.

<!-- this maps to AUTO_TAKEOFF in dev -->