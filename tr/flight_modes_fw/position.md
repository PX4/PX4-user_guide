# Position Mode (Fixed-wing)

<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />&nbsp;<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />&nbsp;<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />

_Position mode_ is the easiest and safest manual mode. It is supported on vehicles that have a position estimate (e.g. GPS).

The roll stick controls left/right horizontal movement. The pitch stick is used to ascend/descend. The throttle determines airspeed — at 50% throttle the aircraft will hold its current altitude with a preset cruise speed. Roll, pitch and yaw are all angle-controlled (so it is impossible to roll over or loop the vehicle).

When all sticks are released/centered (no roll, pitch, yaw, and ~50% throttle) the aircraft will return to straight, level flight, and keep its current altitude and flight path irrespective of wind. This makes it easy to recover from any problems when flying.

The diagram below shows the mode behaviour visually (for a [mode 2 transmitter](../getting_started/rc_transmitter_receiver.md#transmitter_modes)).

![FW Position Mode](../../assets/flight_modes/position_fw.png)

## Technical Description

Manual mode where centered sticks put vehicle into straight and level flight where vehicle posture/attitude, altitude, and the straight line vehicle path are maintained against wind (and other forces).

- Centered Roll/Pitch/Yaw sticks
  - Level flight that follows a straight line ground track in the current direction against any wind.
- Outside center:
  - Pitch stick controls altitude (same as [Altitude mode](../flight_modes_fw/altitude.md)).
  - Roll stick controls roll angle. Autopilot will maintain [coordinated flight](https://en.wikipedia.org/wiki/Coordinated_flight) (same as [Stabilized mode](../flight_modes_fw/stabilized.md)).
  - Throttle sets airspeed (same as [Altitude mode](../flight_modes_fw/altitude.md)).
  - Roll and pitch are angle-controlled (so it is impossible to roll over or loop the vehicle).
  - Yaw stick adds an additional yaw rate setpoint (signal will be added to the one calculated by the autopilot to maintain [coordinated flight](https://en.wikipedia.org/wiki/Coordinated_flight)). This is the same as [Stabilized mode](../flight_modes_fw/stabilized.md).
- Global position estimate is required.
- Manual control input is required (such as RC control, joystick).
- Roll, Pitch, Yaw, Throttle: Assistance from autopilot to hold position against wind.

## Parameters

The mode is affected by the following parameters:

| Parameter                                                                                             | Description                                                                                                              |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| <a id="FW_AIRSPD_MIN"></a>[FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)   | Min airspeed/throttle. Default: 10 m/s.                                                                                  |
| <a id="FW_AIRSPD_MAX"></a>[FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX)   | Max airspeed/throttle. Default: 20 m/s.                                                                                  |
| <a id="FW_AIRSPD_TRIM"></a>[FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) | Cruise speed. Default: 15 m/s.                                                                                           |
| <a id="FW_MAN_P_MAX"></a>[FW_MAN_P_MAX](../advanced_config/parameter_reference.md#FW_MAN_P_MAX)     | Max pitch for manual control in attitude stabilized mode. Default: 45 degrees.                                           |
| <a id="FW_MAN_R_MAX"></a>[FW_MAN_R_MAX](../advanced_config/parameter_reference.md#FW_MAN_R_MAX)     | Max roll for manual control in attitude stabilized mode. Default: 45 degrees.                                            |
| <a id="FW_NPFG_CONTROL"></a>[FW NPFG Control](../advanced_config/parameter_reference.md#fw-npfg-control) | The roll/yaw needed to maintain the commanded altitude and airspeed are also affected by the FW NPFG Control parameters. |