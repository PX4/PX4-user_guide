# Drive Modes (Ackermann Rover)

Flight modes (or more accurately "Drive modes" for ground vehicles) provide autopilot support to make it easier to manually drive the vehicle or to execute autonomous missions.

This section outlines all supported drive modes for Ackermann rovers.

For information on mapping RC control switches to specific modes see: [Basic Configuration > Flight Modes](../config/flight_mode.md).

::: warning
Selecting any other mode than those listed below will either stop the rover or can lead to undefined behaviour.
:::

## Manual Modes

Manual modes require stick inputs from the user to drive the vehicle.

![Manual Controls](../../assets/airframes/rover/flight_modes/rover_manual_controls.png)

The manual modes listed below provide increasing levels of autopilot support:

| Mode                   | Features                                                             |
| ---------------------- | -------------------------------------------------------------------- |
| [Manual](#manual-mode) | Directly map stick inputs to motor commands, no closed loop control. |

### Manual Mode

The _Manual_ mode stops the rover when the RC control sticks are centred.
To manually move/drive the vehicle you move the sticks outside of the centre.

Moving the left-stick up/down controls the _forward speed_ and moving the right-stick left/right controls the _steering angle_ of the vehicle.

::: info
The rover does not attempt to maintain a specific orientation or compensate for external factors like slopes or uneven terrain!
The user is responsible for making the necessary adjustments to the stick inputs to keep the rover on the desired course.
:::

## Auto Modes

In auto modes the autopilot takes over control of the vehicle to run missions, return to launch, or perform other autonomous navigation tasks.  
For the tuning process see the configuration for [Auto modes](../config_rover/ackermann.md#mission-parameters).

### Mission Mode

_Mission mode_ is an automatic mode that causes the vehicle to execute a predefined autonomous [mission plan](../flying/missions.md) that has been uploaded to the flight controller.
The mission is typically created and uploaded with a Ground Control Station (GCS) application, such as [QGroundControl](https://docs.qgroundcontrol.com/master/en/).

#### Mission commands

The following commands can be used in missions at time of writing (`main(PX4 v1.16+)`):

| QGC mission item    | Command                                                                        | Description                                                      |
| ------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Mission start       | [MAV_CMD_MISSION_START](MAV_CMD_MISSION_START)                                 | Starts the mission.                                              |
| Waypoint            | [MAV_CMD_NAV_WAYPOINT](MAV_CMD_NAV_WAYPOINT)                                   | Navigate to waypoint.                                            |
| Return to launch    | [MAV_CMD_NAV_RETURN_TO_LAUNCH][MAV_CMD_NAV_RETURN_TO_LAUNCH]                   | Return to the launch location.                                   |
| Delay until         | [MAV_CMD_NAV_DELAY](MAV_CMD_NAV_DELAY)                                         | The rover will stop for a specified amount of time.              |
| Change speed        | [MAV_CMD_DO_CHANGE_SPEED][MAV_CMD_DO_CHANGE_SPEED]                             | Change the speed setpoint                                        |
| Set launch location | [MAV_CMD_DO_SET_HOME](MAV_CMD_DO_SET_HOME)                                     | Changes launch location to specified coordinates.                |
| Jump to item (all)  | [MAV_CMD_DO_JUMP][MAV_CMD_DO_JUMP] (and other jump commands)                   | Jump to specified mission item.                                  |
| Loiter (all)        | [MAV_CMD_NAV_LOITER_TIME][MAV_CMD_NAV_LOITER_TIME] (and other loiter commands) | Stop the rover for given time. Other commands stop indefinitely. |

[MAV_CMD_MISSION_START]: https://mavlink.io/en/messages/common.html#MAV_CMD_MISSION_START
[MAV_CMD_NAV_WAYPOINT]: https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT
[MAV_CMD_NAV_RETURN_TO_LAUNCH]: https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_RETURN_TO_LAUNCH
[MAV_CMD_NAV_DELAY]: https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_DELAY
[MAV_CMD_DO_CHANGE_SPEED]: https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CHANGE_SPEED
[MAV_CMD_DO_SET_HOME]: https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_HOME
[MAV_CMD_NAV_LOITER_TIME]: https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LOITER_TIME
[MAV_CMD_DO_JUMP]: https://mavlink.io/en/messages/common.html#MAV_CMD_DO_JUMP

### Return Mode

This mode uses the [pure pursuit guidance logic](../config_rover/ackermann.md#pure-pursuit-guidance-logic) with the launch position as goal.
Return mode can be activated through the respective [mission command](#mission-commands) or through the ground station UI.
