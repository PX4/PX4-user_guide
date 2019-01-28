# Takeoff Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Takeoff* flight mode causes the vehicle to take off to a specified height and wait for further input.

> **Note** * This mode requires GPS. * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes). * The vehicle must be armed before this mode can be engaged.

The specific behaviour for each vehicle type is described below.

## Multi-copter (MC)

A multi rotor ascends to the altitude defined in `MIS_TAKEOFF_ALT` and holds position.

Takeoff is affected by the following parameters:

| Parameter                                                                      | Description                                    |
| ------------------------------------------------------------------------------ | ---------------------------------------------- |
| [MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | Target altitude during takeoff (default: 2.5m) |
| [MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)     | Speed of ascent (default: 1.5m/s)              |

## Fixed Wing (FW) {#fixed_wing}

The aircraft takes off in the current direction using either *catapult/hand-launch mode* or *runway takeoff mode*. The mode defaults to catapult/hand launch, but can be set to runway takeoff using `RWTO_TKOFF`.

In *catapult/hand launch mode* the vehicle will perform a full throttle climbout (ramp up to `RWTO_MAX_THR` in about 2 seconds). Once the altitude error < [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF), regular navigation will proceed.

> **Note** In addition to the behaviour discussed above there is also a launch detector that may block the launch sequence from starting until some condition is met. For catapult launch this is some acceleration threshold.

The *runway takeoff mode* has the following phases:

1. **Throttle ramp**: Clamped to the runway (pitch fixed, no roll, and heading hold) until reach the minimum airspeed for takeoff ([FW_AIRSPD_MIN](#FW_AIRSPD_MIN) x [RWTO_AIRSPD_SCL](#RWTO_AIRSPD_SCL)) 
2. **Takeoff**: Increase pitch and continue until vehicle altitude > navigation altitude ([RWTO_NAV_ALT](#RWTO_NAV_ALT)).
3. **Climbout**: Climb until altitude above ground level > [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF). In this phase roll and heading restrictions are removed.

Takeoff is affected by the following parameters:

| Parameter                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="RWTO_TKOFF"></span>[RWTO_TKOFF](../advanced_config/parameter_reference.md#RWTO_TKOFF)             | Runway takeoff with landing gear. Default: disabled.                                                                                                                                                                                                                                                                                                                 |
| <span id="RWTO_MAX_THR"></span>[RWTO_MAX_THR](../advanced_config/parameter_reference.md#RWTO_MAX_THR)       | Max throttle during runway takeoff.                                                                                                                                                                                                                                                                                                                                  |
| <span id="FW_CLMBOUT_DIFF"></span>[FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF) | Climbout Altitude difference.                                                                                                                                                                                                                                                                                                                                        |
| <span id="FW_AIRSPD_MIN"></span>[FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)     | Minimum Airspeed, below which the TECS controller will try to increase airspeed more aggressively.                                                                                                                                                                                                                                                                   |
| <span id="RWTO_AIRSPD_SCL"></span>[RWTO_AIRSPD_SCL](../advanced_config/parameter_reference.md#RWTO_AIRSPD_SCL) | Min. airspeed scaling factor for takeoff. Pitch is increased when the airspeed reaches: `FW_AIRSPD_MIN` * `RWTO_AIRSPD_SCL`                                                                                                                                                                                                                                          |
| <span id="RWTO_NAV_ALT"></span>[RWTO_NAV_ALT](../advanced_config/parameter_reference.md#RWTO_NAV_ALT)       | Altitude above ground level (AGL) at which we have enough ground clearance to allow some roll. Until `RWTO_NAV_ALT` is reached the plane is held level and only rudder is used to keep the heading (see <span id="RWTO_HDG"></span>[RWTO_HDG](../advanced_config/parameter_reference.md#RWTO_HDG)). This should be below `FW_CLMBOUT_DIFF` if `FW_CLMBOUT_DIFF` > 0. |

> **Note** The vehicle always respects normal FW max/min throttle settings during takeoff ([FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN), [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX)).

## VTOL

A VTOL follows the TAKEOFF behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_TAKEOFF in dev -->