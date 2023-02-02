# Takeoff Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Takeoff* flight mode causes the vehicle to take off to a specified height and wait for further input.

:::note
* This mode requires a good position estimate (e.g. from GPS).
* The vehicle must be armed before this mode can be engaged.
* This mode is automatic - no user intervention is *required* to control the vehicle.
* RC control switches can be used to change flight modes on any vehicle.
* RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.
* The [Failure Detector](../config/safety.md#failure-detector) will automatically stop the engines if there is a problem on takeoff.
:::

The specific behaviour for each vehicle type is described below.

## Multi-copter (MC)

A multi rotor ascends to the altitude defined in [MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) and holds position.

RC stick movement will change the vehicle to [Position mode](../flight_modes/position_mc.md) (by [default](#COM_RC_OVERRIDE)).

Takeoff is affected by the following parameters:

Parameter | Description
--- | ---
<span id="MIS_TAKEOFF_ALT"></span>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | Target altitude during takeoff (default: 2.5m)
<span id="MPC_TKO_SPEED"></span>[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED) | Speed of ascent (default: 1.5m/s)
<span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes/position_mc.md). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default.
<span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes/position_mc.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled)

<a id="fixed_wing"></a>
## Fixed-wing (FW)

Automatic takeoff has two modalities: *catapult/hand-launch* or *runway takeoff*.
The mode defaults to catapult/hand launch, but can be set to runway takeoff by setting [RWTO_TKOFF](#RWTO_TKOFF) to 1.

There are two ways to start an automatic takeoff on fixed-wing vehicles: either by [planning a mission takeoff](../flight_modes/mission.md#fw-mission-takeoff) and starting the mission, or by switching to the _Takeoff mode_ and arming the vehicle.

In both cases, a flight path (starting point and takeoff course) and clearance altitude are defined.
The flight path takes the vehicle's current position as starting point when the takeoff mode is first entered, and a straight line from this starting point continues in the direction of the defined course indefinitely.
On takeoff, the aircraft will follow this line, climbing at the maximum climb rate ([FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX)) until reaching the clearance altitude.

In _Takeoff mode_ (non-mission takeoffs), the course is set to the vehicle heading on arming, and the clearance altitude is set to [MIS_TAKEOFF_ALT](#MIS_TAKEOFF_ALT).
Reaching the clearance altitude causes the vehicle to enter _Hold mode_.

In [Mission mode](../flight_modes/mission.md) the operator defines the takeoff course and clearance altitude in the Takeoff mission item.
The course is defined by the line between the vehicle starting point and the mission item horizontal position, and the clearance altitude is the mission item altitude.
Reaching the mission item altitude triggers the next mission item.


Parameters that apply to both catapult/hand-launch as well as runway takeoffs:

Parameter | Description
--- | ---
<span id="MIS_TAKEOFF_ALT"></span>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | Minimum altitude setpoint above Home that the vehicle will climb to during takeoff.
<span id="FW_TKO_AIRSPD"></span>[FW_TKO_AIRSPD](../advanced_config/parameter_reference.md#FW_TKO_AIRSPD) | Takeoff airspeed (is set to [FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN) if not defined by operator)
<span id="FW_TKO_PITCH_MIN"></span>[FW_TKO_PITCH_MIN](../advanced_config/parameter_reference.md#FW_TKO_PITCH_MIN) | This is the minimum pitch angle setpoint during the climbout phase


<span id="hand_launch"></span>
### Catapult/Hand Launch

In *catapult/hand-launch mode* the vehicle waits to detect launch (based on acceleration trigger).
On launch it enables the motor and climbs with the maximum climb rate [FW_T_CLMB_MAX](#FW_T_CLMB_MAX) while keeping the pitch setpoint above [FW_TKO_PITCH_MIN](#FW_TKO_PITCH_MIN).
Once it reaches [MIS_TAKEOFF_ALT](#MIS_TAKEOFF_ALT) it will automatically switch to [Hold mode](../flight_modes/hold.md) and loiter.

All RC stick movement is ignored during the full takeoff sequence.

To launch in this mode:

- Arm the vehicle
- Put the vehicle into *Takeoff mode*
- Launch/throw the vehicle (firmly) directly into the wind.
  You can also shake the vehicle first, wait till the motor spins up and throw only then

The _launch detector_ is affected by the following parameters:

Parameter | Description
--- | ---
<span id="LAUN_ALL_ON"></span>[LAUN_ALL_ON](../advanced_config/parameter_reference.md#LAUN_ALL_ON) | Enable automatic launch detection. If disabled motors spin up on arming already
<span id="FW_LAUN_AC_THLD"></span>[FW_LAUN_AC_THLD](../advanced_config/parameter_reference.md#FW_LAUN_AC_THLD) | Acceleration threshold (acceleration in body-forward direction must be above this value)
<span id="FW_LAUN_AC_T"></span>[FW_LAUN_AC_T](../advanced_config/parameter_reference.md#FW_LAUN_AC_T) | Trigger time (acceleration must be above threshold for this amount of seconds)
<span id="FW_LAUN_MOT_DEL"></span>[FW_LAUN_MOT_DEL](../advanced_config/parameter_reference.md#FW_LAUN_MOT_DEL) | Delay from launch detection to motor spin up


<span id="runway_launch"></span>
### Runway Takeoff

Runway takeoffs can be used by vehicles with landing gear and and steerable wheel (only).
You will first need to enable the wheel controller using the parameter [FW_W_EN](#FW_W_EN).


Vehicle should be centered and aligned with runway when takeoff is initiated.
The operator can "nudge" the vehicle while on the runway to help keeping it centered and aligned (see [RWTO_NUDGE](../advanced_config/parameter_reference.md#RWTO_NUDGE)).


The *runway takeoff mode* has the following phases:
1. **Throttle ramp**: Throttle is ramped up within [RWTO_RAMP_TIME](../advanced_config/parameter_reference.md#RWTO_RAMP_TIME) to [RWTO_MAX_THR](../advanced_config/parameter_reference.md#RWTO_MAX_THR).
2. **Clamped to runway**: Pitch fixed, no roll and takeoff path controlled until the rotation airspeed ([RWTO_ROT_AIRSPD](../advanced_config/parameter_reference.md#RWTO_ROT_AIRSPD)) is reached. The operator is able to nudge the vehicle left/right via yaw stick.
3. **Climbout**: Increase pitch setpoint and climb to takeoff altitude. To prevent wingstrikes, the controller will keep the roll setpoint locked to 0 when close to the ground, and then gradually allow more roll while climbing. It is based on the vehicle geometry as configured in [FW_WING_SPAN](#FW_WING_SPAN) and [FW_WING_HEIGHT](#FW_WING_HEIGHT).

:::note
For a smooth takeoff, the runway wheel controller possibly needs to be tuned.
It consists of a rate controller (P-I-FF-controller with the parameters [FW_WR_P](../advanced_config/parameter_reference.md#FW_WR_P), [FW_WR_I](../advanced_config/parameter_reference.md#FW_WR_I), [FW_WR_FF](../advanced_config/parameter_reference.md#FW_WR_FF)) and an outer loop that calculates heading setpoints from course errors and can be tuned via [RWTO_L1_PERIOD](#RWTO_L1_PERIOD).
:::

Runway takeoff important parameters:

Parameter | Description
--- | ---
<span id="RWTO_TKOFF"></span>[RWTO_TKOFF](../advanced_config/parameter_reference.md#RWTO_TKOFF) | Enable runway takeoff
<span id="FW_W_EN"></span>[FW_W_EN](../advanced_config/parameter_reference.md#FW_W_EN) | Enable wheel controller
<span id="RWTO_MAX_THR"></span>[RWTO_MAX_THR](../advanced_config/parameter_reference.md#RWTO_MAX_THR) | Max throttle during runway takeoff
<span id="RWTO_RAMP_TIME"></span>[RWTO_RAMP_TIME](../advanced_config/parameter_reference.md#RWTO_RAMP_TIME) | Throttle ramp up time
<span id="RWTO_ROT_AIRSPD"></span>[RWTO_ROT_AIRSPD](../advanced_config/parameter_reference.md#RWTO_ROT_AIRSPD) | Airspeed threshold to start rotation (pitching up). If not configured by operator is set to 0.9*FW_TKO_AIRSPD.
<span id="FW_TKO_AIRSPD"></span>[FW_TKO_AIRSPD](../advanced_config/parameter_reference.md#FW_TKO_AIRSPD) | Airspeed setpoint during the takeoff climbout phase (after rotation). If not configured by operator is set to FW_AIRSPD_MIN.
<span id="RWTO_NUDGE"></span>[RWTO_NUDGE](../advanced_config/parameter_reference.md#RWTO_NUDGE) | Enable wheel controller nudging while on the runway
<span id="FW_WING_SPAN"></span>[FW_WING_SPAN](../advanced_config/parameter_reference.md#FW_WING_SPAN) | The wingspan of the vehicle. Used to prevent wingstrikes.
<span id="FW_WING_HEIGHT"></span>[FW_WING_HEIGHT](../advanced_config/parameter_reference.md#FW_WING_HEIGHT) | The height of the wings above ground (ground clearance). Used to prevent wingstrikes.
<span id="RWTO_L1_PERIOD"></span>[RWTO_L1_PERIOD](../advanced_config/parameter_reference.md#RWTO_L1_PERIOD) | L1 period while steering on runway. Increase for less aggressive response to course errors.
<span id="FW_FLAPS_TO_SCL"></span>[FW_FLAPS_TO_SCL](../advanced_config/parameter_reference.md#FW_FLAPS_TO_SCL) | Flaps setpoint during takeoff


:::note
The vehicle always respects normal FW max/min throttle settings during takeoff ([FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN), [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX)).
:::

## VTOL

VTOLs default to MC mode on boot, and it is generally expected that they will take off in [multicopter mode](#multi-copter-mc) (and also safer).

That said, if transitioned to fixed-wing before takeoff, they will takeoff in [Fixed-wing](#fixed_wing) mode.

<!-- this maps to AUTO_TAKEOFF in dev -->
