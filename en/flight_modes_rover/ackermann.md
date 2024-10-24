# Drive Modes (Ackermann Rover)

Flight modes (or more accurately "Drive modes" for ground vehicles) provide autopilot support to make it easier to manually drive the vehicle or to execute autonomous missions.

This section outlines all supported drive modes for Ackermann rovers.

For information on mapping RC control switches to specific modes see: [Basic Configuration > Flight Modes](../config/flight_mode.md).

::: warning
Selecting any other mode than those listed below will either stop the rover or can lead to undefined behaviour.
:::

## Manual Modes

Manual modes require stick inputs from the user to drive the vehicle.

![Manual Controls](../../assets/airframes/rover/flight_modes/manual_controls_ackermann_rover.png)

The manual modes listed below provide increasing levels of autopilot support:

| Mode                       | Forward speed                                                            | Steering angle/lateral acceleration                                                                                                                                                                     | Required measurements                                       |
| -------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Manual](#manual-mode)     | Directly map stick input to motor command.                               | Directly map stick input to steering angle.                                                                                                                                                             | None.                                                       |
| [Acro](#acro-mode)         | Directly map stick input to motor command.                               | Stick input creates a lateral acceleration setpoint for the control system to regulate.                                                                                                                 | Lateral acceleration.                                       |
| [Position](#position-mode) | Stick input creates a speed setpoint for the control system to regulate. | Stick input creates a lateral acceleration setpoint for the control system to regulate. If this setpoint is zero (stick is centered) the control system will keep the rover driving in a straight line. | Lateral acceleration, yaw, speed and global position (GPS). |

### Manual Mode

In this mode the stick inputs are directly mapped to motor commands. The rover does not attempt to maintain a specific orientation or compensate for external factors like slopes or uneven terrain!  
The user is responsible for making the necessary adjustments to the stick inputs to keep the rover on the desired course.

| Stick                  | Effect                                     |
| ---------------------- | ------------------------------------------ |
| Left stick up/down     | Drive the rover forwards/backwards.        |
| Left stick centered    | Zero forward speed input.                  |
| Right stick left/right | Move the steering angle to the left/right. |
| Right stick centered   | Set the steering angle to zero.            |

For the configuration/tuning of this mode see [Manual mode](../config_rover/ackermann.md#manual-mode).

### Acro Mode

::: info
This mode requires a lateral acceleration measurement.
:::

In this mode the vehicle regulates its lateral acceleration to a setpoint (but does not stabilize heading or regulate speed).

| Stick                  | Effect                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| Left stick up/down     | Drive the rover forwards/backwards.                                                                     |
| Left stick centered    | Zero forward speed input.                                                                               |
| Right stick left/right | Create a lateral acceleration setpoint for the control system to regulate.                              |
| Right stick centered   | The control system will attempt to maintain a zero lateral acceleration (minimal disturbance rejection) |

Lateral acceleration can be directly mapped to a steering input based on the forward speed of the rover:

<!-- prettier-ignore -->
$$ \theta = \arctan(\frac{w_b \cdot a_{lat}}{ v^2}) $$

with $w_b:$ Wheel base, $\theta:$ Steering angle and $v:$ Forward speed.  
For driving this means that the same right hand stick input will cause a different steering angle based on how fast you are driving. By limiting the maximum lateral acceleration, we can restrict the steering angle based on the speed which can prevent the rover from rolling over.  
This mode will feel more like "driving a car" than [Manual](#manual-mode).

For the configuration/tuning of this mode see [Acro mode](../config_rover/ackermann.md#acro-mode).

### Position Mode

::: info
This mode requires a lateral acceleration, yaw, speed and global position estimate.
:::

This is the manual mode with the most autopilot support. The vehicle regulates its lateral acceleration and speed to a setpoint. If the lateral acceleration setpoint is zero, the controller will remember the gps coordinates and yaw (heading) of the vehicle and use those to construct a line that the rover will then follow (course control).
This offers the highest amount of disturbance rejection, which leads to the best straight line driving behavior.

| Stick                  | Effect                                                                     |
| ---------------------- | -------------------------------------------------------------------------- |
| Left stick up/down     | Create a speed setpoint for the control system to regulate.                |
| Left stick centered    | Zero forward speed input.                                                  |
| Right stick left/right | Create a lateral acceleration setpoint for the control system to regulate. |
| Right stick centered   | The control system will maintain the course of the rover.                  |

For the configuration/tuning of this mode see [Position mode](../config_rover/differential.md#position-mode).

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
