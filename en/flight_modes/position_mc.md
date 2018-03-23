# Position Flight Mode (Multicopter)

![GPS](../../images/flight_modes/GPS_s.png)

*Position* mode is an assisted RC mode, in which the vehicle can easily be brought to a stop with a level attitude (irrespective of wind and other forces), and in which the flight controls are intuitive and straightforward. 

> **Tip** Position mode is the safest manual mode for new fliers.

<span></span>
> **Tip** Position mode is much like [Altitude](../flight_modes/altitude.md) mode, but additionally stabilizes horizontal position.

When the control sticks are centred the multicopter will level out and hover at the current altitude and GPS position (holding position against wind or other forces). <!-- does it maintain course? -->

Outsize of the stick deadzone roll controls left-right speed over ground, pitch controls front-back speed over ground, and throttle controls climb/descent speed (in all cases the speed increases proportionally with distance from the centre). The yaw input controls angular rate of rotation over the horizontal plane (as in [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) mode).

The diagram below shows the mode behaviour visually (for a mode 2 transmitter).

![MC Position Mode](../../images/flight_modes/position_MC.png)


> **Warning** Care must be taken when landing in this mode. When first landing in this mode, be ready to switch 
> to [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) in order to be able to disarm. If landing is correctly 
> detected, motors will spin down after touch down and then disarm shortly after. 
> If the motors keep spinning at higher RPM or start spinning up, first switch to [Manual/Stabilized (MC)](../flight_modes/manual_stabilized_mc.md), and then disarm. 
> Be aware that the vehicle may tip over on the ground due to GPS drift. 


## Technical Summary

Roll controls left-right speed over ground, pitch controls front-back speed over ground, and throttle controls climb/descent speed (as in [Altitude](../flight_modes/altitude.md) mode). Yaw controls yaw *rate* over horizontal plane (as in [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) mode).  When roll, pitch and throttle inputs are all centered (inside deadzone) the multirotor will hold position (in x, y, z frame), compensating for drift due to wind (or other sources).

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
