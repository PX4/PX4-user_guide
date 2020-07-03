# Position Mode (Multicopter)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Position* is an easy-to-fly RC mode in which roll and pitch sticks control speed over ground in the left-right and forward-back directions (relative to the "front" of the vehicle), and throttle controls speed of ascent-descent. 
When the sticks are released/centered the vehicle will actively brake, level, and be locked to a position in 3D space — compensating for wind and other forces.

> **Tip** Position mode is the safest manual mode for new fliers. 
  Unlike [Altitude](../flight_modes/altitude_mc.md) and [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) modes the vehicle will stop when the sticks are centered rather than continuing until slowed by wind resistance. 

The diagram below shows the mode behaviour visually (for a mode 2 transmitter).

![MC Position Mode](../../images/flight_modes/position_MC.png)


> **Warning** Care must be taken when landing in this mode. When first landing in this mode, be ready to switch 
> to [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) in order to be able to disarm. If landing is correctly 
> detected, motors will spin down after touch down and then disarm shortly after. 
> If the motors keep spinning at higher RPM or start spinning up, first switch to [Manual/Stabilized (MC)](../flight_modes/manual_stabilized_mc.md), and then disarm. 
> Be aware that the vehicle may tip over on the ground due to GPS drift. 


## Technical Summary

RC/manual mode where RPT sticks control *speed* in corresponding directions. Centered sticks level vehicle and hold it to fixed position and altitude against wind.

* Centered RPT sticks (in RC deadzone) hold x, y, z position steady against any wind and levels attitude.
* Outside center:
  * Roll/Pitch sticks control speed over ground in left-right and forward-back directions (respectively) relative to the "front" of the vehicle.
  * Throttle stick controls speed of ascent-descent.
  * Yaw stick controls rate of angular rotation above the horizontal plane.
* Takeoff:
  * When landed, the vehicle will take off if the throttle stick is raised above 62.5% percent (of the full range from bottom).
* Landing:
  * When close to the ground ([MPC_LAND_ALT2](#MPC_LAND_ALT2)), horizontal velocity is limited ([MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY)).

> **Note**
>  * Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
>  * This mode requires GPS.


### Parameters

All the parameters in the [Multicopter Position Control](../advanced_config/parameter_reference.md#multicopter-position-control) group are relevant. A few parameters of particular note are listed below.

Parameter | Description
--- | ---
<span id="MPC_HOLD_DZ"></span>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ) | Deadzone of sticks where position hold is enabled. Default: 0.1 (10% of full stick range).
<span id="MPC_Z_VEL_MAX_UP"></span>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | Maximum vertical ascent velocity. Default: 3 m/s.
<span id="MPC_Z_VEL_MAX_DN"></span>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | Maximum vertical descent velocity. Default: 1 m/s.
<span id="MPC_LAND_VEL_XY"></span>[MPC_LAND_VEL_XY](../advanced_config/parameter_reference.md#MPC_LAND_VEL_XY) | Horizontal velocity limit when close to ground ([MPC_LAND_ALT2](#MPC_LAND_ALT2) meters above ground, or above home if distance-to-ground is unknown). Default: 2 m/s.
<span id="MPC_LAND_ALT1"></span>[MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1) | Altitude for triggering first phase of slow landing. Affects maximum allowed horizontal velocity setpoint. Default 5m.
<span id="MPC_LAND_ALT2"></span>[MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2) | Altitude for second phase of slow landing. In this phase maximum horizontal velocity is limited to [MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY). Default 2m.
<span id="RCX_DZ"></span>`RCX_DZ` | RC dead zone for channel X. The value of X for throttle will depend on the value of [RC_MAP_THROTTLE](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE). For example, if the throttle is channel 4 then  [RC4_DZ](../advanced_config/parameter_reference.md#RC4_DZ) specifies the deadzone.
<span id="MPC_xxx"></span>`MPC_XXXX` | Most of the MPC_xxx parameters affect flight behaviour in this mode (at least to some extent). For example, [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) defines the thrust at which a vehicle will hover.
