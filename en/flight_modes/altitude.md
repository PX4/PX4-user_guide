# ALTITUDE CONTROL Flight Mode

The ALTITUDE CONTROL flight mode maintains constant altitude when all remote control inputs are centered (i.e. no roll, pitch, yaw and at 50% throttle). The mode does not use GPS, and hence will not attempt to hold position against wind.

> **Tip** This mode is recommended for beginners because it is easy to return the vehicle to predictable flight.

<span></span>
> **Note**
>  * This mode is *assisted*. The autopilot makes it easier for users to control the vehicle. 
>  * This mode requires that a radio control is connected.
>  * The altitude is normally measured using an altitude barometer, which may become inaccurate in extreme weather conditions. Vehicles that include a LIDAR/range sensor will be able to control altitude with greater reliability and accuracy. 
<!-- ? * The vehicle must be armed before this mode can be engaged. -->

The flight mode has additional characteristics based on the type of vehicle. These are discussed in the sections below. 


## Multi-copter (MC)

When all remote control inputs are centered (no roll, pitch, yaw, and ~50% throttle) the aircraft will *hover* at its current altitude (subject to wind).

Throttle inputs control the *rate* of ascent/descent (i.e. the rate increases with distance from the stick centre), and there is a large deadzone at the centre. Roll, pitch and yaw inputs are fully controlled by the user (as in MANUAL mode).

![Altitude Control MC](../../images/flight_modes/altitude_control_mode_copter.png)

<!-- 
what parameters affect MC behaviour - e.g. 
- size of deadzone. 
- maximum rate of ascend/descend 
- how tuned?
- Description of throttle behaviour from another user. Original sounds more like large deadzone in the centre. Once outside deadzone the rate of descent or ascent is a constant predetermined maximum. Which is it?
-->


## Fixed Wing (FW)

When all remote control inputs are centered (no roll, pitch, yaw, and ~50% throttle) the aircraft will return to straight, level flight and keep its current altitude (subject to wind). 

The user has full angle control over pitch, roll and yaw. The throttle controls airspeed. Altitude is changed by varying the pitch. 

![Altitude Control FW](../../images/flight_modes/altitude_control_mode_fw.png)


<!-- 
what parameters affect FW behaviour - e.g. size of deadzone "50%". 
How is this tuned - ie is there a preset cruise speed at 50% throttle?
MC the throttle is "rate controlled". Is throttle "rate" controlled on FW?
Any more?
-->


## VTOL

A VTOL follows the behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this mode maps to ALTCTL in dev -->
