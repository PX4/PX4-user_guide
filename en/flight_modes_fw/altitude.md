# Altitude Mode (Fixed-wing)

<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />&nbsp;<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />&nbsp;<img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="30px" />

The _Altitude_ flight mode is the safest and easiest non-GPS manual mode.
It makes it easier for pilots to control vehicle altitude, and in particular to reach and maintain a fixed altitude.
The mode will not attempt to hold the vehicle course against wind.

:::tip
_Altitude mode_ is similar to [Position mode](../flight_modes_fw/position.md) in that both modes level the vehicle and maintain altitude and course when sticks are released.
The difference is that position mode holds the actual flight path steady against wind, while altitude just holds the heading.
:::

The roll stick controls left/right horizontal movement.
The pitch stick controls the rate of ascent/descent; once the pitch stick is centered the autopilot latches onto the current altitude and will maintain it during yaw/roll, and at any airspeed.
The throttle determines airspeed — at 50% throttle the aircraft will hold its current altitude with a preset cruise speed.
Roll, pitch and yaw are all angle-controlled (so it is impossible to roll over or loop the vehicle).

When all sticks are released/centered (no roll, pitch, yaw, and ~50% throttle) the aircraft will return to straight, level flight (subject to wind) and keep its current altitude.

The diagram below shows the mode behaviour visually (for a [mode 2 transmitter](../getting_started/rc_transmitter_receiver.md#transmitter_modes)).

![Altitude Control FW](../../assets/flight_modes/altitude_fw.png)

## Technical Summary

Manual mode like [Stabilized mode](../flight_modes_fw/stabilized.md) but with altitude stabilization (centered sticks put vehicle into straight and level flight and maintain current altitude).
The vehicle course is not maintained, and can drift due to wind.

- Centered Roll/Pitch/Yaw inputs (inside deadband):
  - Autopilot levels vehicle/wings and maintains altitude.
  - Throttle stick controls the airspeed of the aircraft if an airspeed sensor is connected. Without an airspeed sensor the user cannot control throttle (in which case the vehicle will fly level at trim throttle ([FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM)), increasing or decreasing throttle as needed to climb or descend).
- Outside center:
  - Pitch stick controls altitude.
  - Throttle stick controls the airspeed of the aircraft (as for centered Roll/Pitch/Yaw inputs).
  - Roll stick controls roll angle. Autopilot will maintain [coordinated flight](https://en.wikipedia.org/wiki/Coordinated_flight).
    This is same as in [Stabilized mode](../flight_modes_fw/stabilized.md).
  - Yaw stick actuates the rudder (signal will be added to the one calculated by the autopilot to maintain [coordinated flight](https://en.wikipedia.org/wiki/Coordinated_flight)).
    This is same as in [Stabilized mode](../flight_modes_fw/stabilized.md).
- Manual control input is required (such as RC control, joystick).
  - Roll: Assistance from autopilot to hold altitude against wind.
  - Pitch: Assistance from autopilot to stabilize the attitude.
    Position of RC stick maps to the orientation of vehicle.
  - Yaw: Input is sent directly to control allocation.
  - Throttle: Assistance from autopilot to hold altitude against wind.
- An altitude source is required.
  :::note
  The altitude is normally measured using a barometer, which may become inaccurate in extreme weather conditions.
  Vehicles that include a LIDAR/range sensor will be able to control altitude with greater reliability and accuracy.
  :::

## Parameters

The mode is affected by the following parameters:

| Parameter                                                                                                | Description                                                                                                              |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| <a id="FW_AIRSPD_MIN"></a>[FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)       | Min airspeed/throttle. Default: 10 m/s.                                                                                  |
| <a id="FW_AIRSPD_MAX"></a>[FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX)       | Max airspeed/throttle. Default: 20 m/s.                                                                                  |
| <a id="FW_AIRSPD_TRIM"></a>[FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM)    | Cruise speed. Default: 15 m/s.                                                                                           |
| <a id="FW_MAN_P_MAX"></a>[FW_MAN_P_MAX](../advanced_config/parameter_reference.md#FW_MAN_P_MAX)          | Max pitch for manual control in attitude stabilized mode. Default: 45 degrees.                                           |
| <a id="FW_MAN_R_MAX"></a>[FW_MAN_R_MAX](../advanced_config/parameter_reference.md#FW_MAN_R_MAX)          | Max roll for manual control in attitude stabilized mode. Default: 45 degrees.                                            |
| <a id="FW_NPFG_CONTROL"></a>[FW NPFG Control](../advanced_config/parameter_reference.md#fw-npfg-control) | The roll/yaw needed to maintain the commanded altitude and airspeed are also affected by the FW NPFG Control parameters. |

<!--
FW notes:
FW position controller is basically 2 independent pieces
* L1 is for navigation - determines the roll and yaw needed to achieve the desired waypoint (or loiter)
* TECS is for speed and height control - determines throttle and elevator position needed to achieve the commanded altitude and airspeed
Overall that gives you an attitude setpoint (roll, pitch, yaw) and throttle which is sent off to the attitude controller
-->
