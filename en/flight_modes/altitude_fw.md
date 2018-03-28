# Altitude Flight Mode (Fixed Wing)

[<img src="../../assets/site/difficulty_2.svg" title="Difficulty (Easy)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

The *Altitude* flight mode makes it easier for users to control vehicle altitude, and in particular to reach and maintain a fixed altitude. The mode does not use GPS, and hence will not attempt to hold the vehicle course against wind.

The climb/descent rate is controlled via the pitch/elevator stick. Once centered the autopilot latches onto the current altitude and will maintain it during yaw/roll, and at any airspeed. The throttle input controls airspeed. 

When all remote control inputs are centered (no roll, pitch, yaw, and ~50% throttle) the aircraft will return to straight, level flight (subject to wind) and keep its current altitude.

The diagram below shows the mode behaviour visually (for a [mode 2 transmitter](../getting_started/rc_transmitter_receiver.md#transmitters-for-aircraft)).

![Altitude Control FW](../../images/flight_modes/altitude_control_mode_fw.png)

## Technical Summary


> **Note**
>  * This mode is *assisted*. The autopilot makes it easier for users to control the vehicle. 
>  * Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
>  * The altitude is normally measured using a barometer, which may become inaccurate in extreme weather conditions. Vehicles that include a LIDAR/range sensor will be able to control altitude with greater reliability and accuracy. 


## Parameters

The mode is affected by the following parameters:

Parameter | Description
--- | ---
<span id="FW_AIRSPD_MIN"></span>[FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN) | Min airspeed/throttle. Default: 10 m/s.
<span id="FW_AIRSPD_MAX"></span>[FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX) | Max airspeed/throttle. Default: 20 m/s.
<span id="FW_AIRSPD_TRIM"></span>[FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) | Cruise speed. Default: 15 m/s.
<span id="FW_L1_CONTROL">[FW L1 Control](../advanced_config/parameter_reference.md#fw-l1-control) | The roll/yaw needed to maintain the commanded altitude and airspeed are also affected by the FW L1 Control parameters. 

<!-- 
FW notes: 
FW position controller is basically 2 independent pieces
* L1 is for navigation - determines the roll and yaw needed to achieve the desired waypoint (or loiter)
* TECS is for speed and height control - determines throttle and elevator position needed to achieve the commanded altitude and airspeed
Overall that gives you an attitude setpoint (roll, pitch, yaw) and throttle which is sent off to the attitude controller
-->

