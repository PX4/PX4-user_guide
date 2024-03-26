# Flight Modes (Rover)

Flight modes (or more accurately "Drive modes" for ground vehicles) provide autopilot support to make it easier to manually drive the vehicle, to execute autonomous missions, or to defer control to an external system.

PX4 ground vehicles only support [manual mode](#manual-mode), [mission mode](#mission-mode) and [offboard mode](#offboard-mode) (other modes may be offered in a ground station, but these all behave just like manual mode).

### Manual Mode

_Manual mode_ is the only manual mode for ground vehicles on PX4, and requires a manual controller (RC controller, gamepad, joystick etc.).

In this mode, motors are stopped when RC control sticks are centered.
To move the vehicle you move the sticks outside of the center.

As soon as you release the control sticks they will return to the center deadzone.
This will turn off the motors and center the wheels.
There is no active braking, so the vehicle may continue to move until its momentum dissipates.

### Mission Mode

[Mission mode](../flight_modes/mission.md) is an automatic mode that causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) plan that has been uploaded to the flight controller.
The mission is typically created and uploaded with a Ground Control Station (GCS) application, such as [QGroundControl](https://docs.qgroundcontrol.com/master/en/).

### Offboard Mode

[Offboard mode](../flight_modes/offboard.md) causes the vehicle to obey position, velocity, or attitude, setpoints provided over MAVLink.
Not all setpoint types make sense for a ground vehicle, or are supported.

:::note
This mode is intended for vehicle control from companion computers and ground stations!
:::

## Подальша інформація

- [Basic Configuration > Flight Modes](../config/flight_mode.md) - How to map RC control switches to specific flight modes
- [Flight Modes (Multicopter)](../flight_modes_mc/README.md)
- [Flight Modes (Fixed-wing)](../flight_modes_fw/README.md)
- [Flight Modes (VTOL)](../flight_modes_vtol/README.md)
