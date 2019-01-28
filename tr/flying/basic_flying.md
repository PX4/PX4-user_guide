# Flying 101

This topic explains the basics of flying a vehicle using an [RC Transmitter](../getting_started/rc_transmitter_receiver.md) in a manual or autopilot-assisted flight mode (for autonomous flight see: [Missions](../flying/missions.md)).

> **Note** Before you fly for the first time you should read our [First Flight Guidelines](../flying/first_flight_guidelines.md).

## Flight Controls/Commands

All flying, including takeoff and landing, is controlled using the 4 basic commands: roll, yaw, pitch and throttle.

![RC Basic Commands](../../images/rc_basic_commands.png)

In order to control your aircraft you need to understand how the basic Roll, Pitch, Yaw and Throttle commands affect movement in 3D space. This differs depending on whether you're controlling a forward-flying aircraft like a plane, or a "hover aircraft" like a multicopter.

### Hover Aircraft

Hover aircraft (Copter, VTOL in hover mode) respond to the movement commands as shown below:

![Basic Movements Multicopter](../../images/basic_movements_multicopter.png)

* Pitch => Forward/Back.
* Roll => Left/right.
* Yaw => Left/right rotation around the centre of the frame.
* Throttle => Changed altitude/speed.

### Forward-flying Aircraft

Forward-flying aircraft (planes, VTOL in forward flight) respond to the movement commands as shown below:

![Basic Movements Forward](../../images/basic_movements_forward.png)

* Pitch => Up/down.
* Roll => Left/right and a turn.
* Yaw => Left/right tail rotation and turn.
* Throttle => Changed forward speed.

> **Note** The best turn for airplanes is called a coordinated turn, and is performed using roll and little yaw at the same time. This maneuver requires experience!

## Assisted Flight

Even with an understanding of how the vehicle is controlled, flight in fully manual mode can be quite unforgiving. New users should [configure their transmitter](../config/flight_mode.md) to use flight modes where the autopilot automatically compensates for erratic user input or environmental factors.

The following three modes are highly recommended for new users:

* Stabilized - Vehicle hard to flip, and will level-out if the sticks are released (but not hold position)
* Altitude - Climb and drop are controlled to have a maximum rate.
* Position - When sticks are released the vehicle will stop (and hold position against wind drift)

> **Tip** You can also access automatic modes through the buttons on the bottom of the *QGroundControl* main flight screen.

## Takeoff and Landing

The easiest way to takeoff is to use the automatic [Takeoff mode](../flight_modes/takeoff.md) (remembering that you need to arm the vehicle before you can engage the vehicle motors). To land again automatically you can use [Land](../flight_modes/land.md) or [Return](../flight_modes/return.md) modes.

> **Tip** The automatic takeoff/landing modes are highly recommended, in particular for Fixed Wing vehicles.

For multicopter (and VTOL in multicopter mode) pilots can:

* Take off manually by enabling [position mode](../flight_modes/README.md#assisted-modes), arming the vehicle, and then raising the throttle stick above 62.5%. Above this value all controllers are enabled and the vehicle goes to the throttle level required for hovering ([MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)).
* Land manually by pressing the throttle stick down until the vehicle lands and disarms (or set [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) > 0 to disarm automatically on landing).

> **Note** If you see the vehicle "twitch" during landing (turn down the motors, and then immediately turn them back up) this is probably caused by a poor [Land Detector Configuration](../advanced_config/land_detector.md) (specifically, a poorly set [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)).