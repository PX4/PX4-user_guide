# Fixed-Wing Trimming Guide

Trims are used to calibrate the control surfaces at trim conditions (relative airspeed, air density, angle of attack, aircraft configuration, etc.).
A properly trimmed aircraft flying at trim conditions will keep its attitude without requiring any control inputs from the pilot or the stabilizing computer.

General aviation, commercial and large unmanned planes trim their control surfaces using [trim tabs](https://en.wikipedia.org/wiki/Trim_tab) while small UAVs simply add an offset to the actuator of the control surface.

The [Basic trimming](#basic-trimming) section explains the purpose of each trim parameter and how to find the correct value.
The [Advanced Trimming](#advanced-trimming) section introduces parameters that can be set to automatically adjust the trims based on the measured airspeed and flap position.

## Basic Trimming

There are several parameters an operator might want to use in order to properly trim a fixed-wing aircraft.
An overview of those parameters and their use case is shown below:

- [RCx_TRIM](../advanced_config/parameter_reference.md#RC1_TRIM) applies trim to the signal received from the RC transmitter.
  These parameters are set automatically during [RC calibration](../config/radio.md).
- [CA_SV_CSx_TRIM](../advanced_config/parameter_reference.md#CA_SV_CS0_TRIM) applies trim to a control surfaces channel.
  These are used to finely align the control surfaces to default angles before flying.
- [FW_PSP_OFF](../advanced_config/parameter_reference.md#FW_PSP_OFF) applies an offset to the pitch setpoint.
  This is used to set the angle of attack at which your aircraft needs to fly at cruise speed.
- [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) is used by the rate controllers to scale their output depending on the measured airspeed.
  See [Airspeed Scaling](../flight_stack/controller_diagrams.md#airspeed-scaling) for more details.
- [TRIM_ROLL](../advanced_config/parameter_reference.md#TRIM_ROLL), [TRIM_PITCH](../advanced_config/parameter_reference.md#TRIM_PITCH) and [TRIM_YAW](../advanced_config/parameter_reference.md#TRIM_YAW) apply trim to the control signals _before_ mixing.
  For example, if you have two servos for the elevator, `TRIM_PITCH` applies trim to both of them.
  These are used when your control surfaces are aligned but the aircraft pitches/rolls/yaws up/down/left/right during manual (not stabilized) flight or if the control signal has a constant offset during stabilized flight.

The correct order to set the above parameters is:

1. Trim the servos by physically adjusting the linkages lengths if possible and fine tune by trimming the PWM channels (use `PWM_MAIN/AUX_TRIMx`) on the bench to properly set the control surfaces to their theoretical position.
1. Fly in stabilized mode at cruise speed and set the pitch setpoint offset (`FW_PSP_OFF`) to desired angle of attack.
   The required angle of attack at cruise speed corresponds to the pitch angle that the airplane needs to fly at in order to keep constant altitude during wing-leveled flight.
   If you are using an airspeed sensor, also set the correct cruise airspeed (`FW_AIRSPD_TRIM`).
1. Run [auto-trimming](#auto-trimming) during a flight to set `TRIM_ROLL`, `TRIM_PITCH` and `TRIM_YAW`.

   Alternatively, if you feel comfortable flying in [Manual mode](../flight_modes_fw/manual.md), you can also set the trim values manually:
   1. Disable auto-trimming by setting [FW_ATRIM_MODE=0](../advanced_config/parameter_reference.md#FW_ATRIM_MODE).
   1. Fly in manual mode and trim your remote (with the trim switches).
   1. Report the values to `TRIM_ROLL/PITCH/YAW` (and remove the trims from your transmitter), or update `TRIM_ROLL/PITCH/YAW` directly during flight via telemetry and QGC.

### Auto-trimming

<Badge type="warning" text="main (PX4 v1.15)" />

Auto-trimming estimates the "center trim" at cruise speed (usually), and is enabled by default.
On first flight (in "Calibration" mode), auto-trimming estimates the current trim of the aircraft, and then updates the general trim parameters (`TRIM_ROLL`, `TRIM_PITCH` and `TRIM_YAW`) with calibrated values after landing.
The trim estimate is only updated when the aircraft flies with a bank angle of less than 10 degrees for more than 7 seconds.
So for the first calibration flight you should fly large circles or several phases of straight and level flight.

On subsequent flights (in "Continuous" mode), auto-trimming continuously estimates the trim, reducing the constant load on the integrator of the angular rate control loop if the trim calibration was imperfect or if the trim has changed.
In this mode the stored trim parameters are updated gradually — the maximum change to the trim parameters following each flight is 0.05.

Auto-trimming is enabled using [FW_ATRIM_MODE](../advanced_config/parameter_reference.md#FW_ATRIM_MODE).
This parameter is set to `(1) Calibration` (trim parameters are replaced by the trim estimate on landing) for the first flight and is then automatically changed to `(2) Continuous` mode (trim estimate is used to slowly update the existing trim parameters).

The trims can be reset by setting the `TRIM_ROLL`, `TRIM_PITCH` and `TRIM_YAW` back to `0` and `FW_ATRIM_MODE` to `1`.
This should not normally be necessary as the trims are continuously corrected. 

## Advanced Trimming

Given that the downward pitch moment induced by an asymmetric airfoil increases with airspeed and when the flaps are deployed, the aircraft needs to be re-trimmed according to the current measured airspeed and flaps position.
For this purpose, a bilinear curve function of airspeed and a pitch trim increment function of the flaps state (see figure below) can be defined using the following parameters:

- [FW_DTRIM\_\[R/P/Y\]\_\[VMIN/VMAX\]](../advanced_config/parameter_reference.md#FW_DTRIM_R_VMIN) are the roll/pitch/yaw trim value added to `TRIM_ROLL/PITCH/YAW` at min/max airspeed (defined by [FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN) and [FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX)).
- [CA_SV_CSx_FLAP](../advanced_config/parameter_reference.md#CA_SV_CS0_FLAP) and [CA_SV_CSx_SPOIL](../advanced_config/parameter_reference.md#CA_SV_CS0_SPOIL) are the trimming values that are applied to these control surfaces if the flaps or the spoilers are fully deployed, respectively.

![Dtrim Curve](../../assets/config/fw/fixedwing_dtrim.png)

<!-- The drawing is on draw.io: https://drive.google.com/file/d/15AbscUF1kRdWMh8ONcCRu6QBwGbqVGfl/view?usp=sharing
Request access from dev team.  -->

A perfectly symmetrical airframe would only require pitch trim increments, but since a real airframe is never perfectly symmetrical, roll and yaw trims increments are also sometimes required.
