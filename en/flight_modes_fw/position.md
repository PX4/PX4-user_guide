# Position Mode (Fixed-wing)

<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />&nbsp;<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />&nbsp;<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />

_Position mode_ is the easiest and safest manual mode.
It is supported on vehicles that have a position estimate (e.g. GPS).

The roll stick controls left/right horizontal movement.
The pitch stick is used to ascend/descend.
The throttle determines airspeed — at 50% throttle the aircraft will hold its current altitude with a preset cruise speed.
Roll, pitch and yaw are all angle-controlled (so it is impossible to roll over or loop the vehicle).

When all sticks are released/centered (no roll, pitch, yaw, and ~50% throttle) the aircraft will return to straight, level flight, and keep its current altitude and flight path irrespective of wind.
This makes it easy to recover from any problems when flying.

The diagram below shows the mode behaviour visually (for a [mode 2 transmitter](../getting_started/rc_transmitter_receiver.md#transmitter_modes)).

![FW Position Mode](../../assets/flight_modes/position_fw.png)

## Technical Description

Manual mode where centered sticks put vehicle into straight and level flight where vehicle posture/attitude, altitude, and the straight line vehicle path are maintained against wind (and other forces).

- Centered Roll/Pitch/Yaw sticks
  - Level flight that follows a straight line ground track in the current direction against any wind.
- Outside center:
  - Pitch stick controls altitude (same as <a href="#altitude_fw">Altitude</a>).
  - Roll stick controls roll angle. Autopilot will maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a> (same as <a href="#stabilized_fw">Stabilized</a>).
  - Throttle sets airspeed (same as <a href="#altitude_fw">Altitude</a>).
  - Roll and pitch are angle-controlled (so it is impossible to roll over or loop the vehicle).
  - Yaw stick adds an additional yaw rate setpoint (signal will be added to the one calculated by the autopilot to maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>). This is the same as <a href="#stabilized_fw">Stabilized</a>.
- Global position estimate is required.
- Manual control input is required.
- Roll, Pitch, Yaw, Throttle: Assistance from autopilot to hold position or altitude against wind.

## Parameters

| Parameter | Description |
| --------- | ----------- |
| &nbsp;    | &nbsp;      |
