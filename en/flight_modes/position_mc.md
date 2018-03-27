# Position Flight Mode (Multicopter)

[<img src="../../assets/site/difficulty_1.svg" title="Difficulty (Easiest)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Position* mode is an easy-to-fly RC mode in which the vehicle can be "locked" to a position in 3D space (irrespective of wind and other forces) by releasing (centering) the RC sticks.

> **Tip** Position mode is the safest manual mode for new fliers. It is much like [Altitude](../flight_modes/altitude.md) mode, but additionally stabilizes horizontal position.

Vehicle movement is intuitive. The roll and pitch sticks move the vehicle left-right and front-back over ground, with speed increasing proportionally with distance from the center (the sticks actually control the tilt angle, which in turn alters the speed in each direction). The throttle controls climb/descent speed. The yaw input controls angular rate of rotation over the horizontal plane.

When the control sticks are released (centred) the multicopter will level out and hover at the current altitude and GPS position (holding position against wind or other forces).

The diagram below shows the mode behaviour visually (for a mode 2 transmitter).

![MC Position Mode](../../images/flight_modes/position_MC.png)


> **Warning** Care must be taken when landing in this mode. When first landing in this mode, be ready to switch 
> to [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) in order to be able to disarm. If landing is correctly 
> detected, motors will spin down after touch down and then disarm shortly after. 
> If the motors keep spinning at higher RPM or start spinning up, first switch to [Manual/Stabilized (MC)](../flight_modes/manual_stabilized_mc.md), and then disarm. 
> Be aware that the vehicle may tip over on the ground due to GPS drift. 


## Technical Summary

Manual/Stabilized mode with <em>3D position stabilization</em> (centered sticks level vehicle and hold it to fixed position and altitude against wind).

* Centered RPT sticks (in RC deadzone) hold x, y, z position steady against any wind and levels attitude.
* Outside center:
  * Roll/Pitch sticks control tilt angle in those orientations, resulting in corresponding left-right and forward-back movement.
  * Throttle stick controls up/down speed (and movement speed in other axes).
  * Yaw stick controls rate of angular rotation above the horizontal plane.

> **Note**
>  * Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
>  * This mode requires GPS.


### Parameters

Parameter | Description
--- | ---
<span id="MPC_HOLD_DZ"></span>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ) | Deadzone of sticks where position hold is enabled. Default: 0.1 (10% of full stick range).
<span id="MPC_Z_VEL_MAX_UP"></span>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | Maximum vertical ascent velocity. Default: 3 m/s.
<span id="MPC_Z_VEL_MAX_DN"></span>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | Maximum vertical descent velocity. Default: 1 m/s.
<span id="RCX_DZ"></span>`RCX_DZ` | RC dead zone for channel X. The value of X for throttle will depend on the value of [RC_MAP_THROTTLE](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE). For example, if the throttle is channel 4 then  [RC4_DZ](../advanced_config/parameter_reference.md#RC4_DZ) specifies the deadzone.
<span id="MPC_xxx"></span>`MPC_XXXX` | Most of the MPC_xxx parameters affect flight behaviour in this mode (at least to some extent). For example, [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) defines the thrust at which a vehicle will hover.
