# Path Planning Offboard Interface

PX4 uses a number of MAVLink interfaces for integrating path planning services from a companion computer (including obstacle avoidance in missions, [safe landing](../computer_vision/safe_landing.md), and future services):
- The [MAVLink Path Planning Protocol](https://mavlink.io/en/services/trajectory.html) message [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) is used to sent the current and next waypoint, and receive a stream of setpoints for the new path.
- The [HEARTBEAT/Connection Protool](https://mavlink.io/en/services/heartbeat.html) is used for "proof of life" detection.
- [LOCAL_POSITION_NED](https://mavlink.io/en/messages/common.html#LOCAL_POSITION_NED) and [ALTITUDE](https://mavlink.io/en/messages/common.html#ALTITUDE) send the vehicle local position and altitude, respectively.

> **Tip** The message flows from PX4 UORB topics, through MAVLink, to ROS and back again are all documented in: [PX4/avoidance > Message Flows](https://github.com/PX4/avoidance#message-flows).


All services that use this interface send and receive messages of the same type/format.
Developers can therefore use this interface to create their own new companion-side path planning services, or tweak the existing planner software.


## Limitations

Only one planner can run on the companion computer at a time (at time of writing).
This means that only one feature that uses this interface can be enabled for the running vehicle (e.g. obstacle avoidance OR safe landing, but not both).

### PX4 Configuration

Path planning is activated in PX4 by [setting](../advanced_config/parameters.md) the [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) to 1.


### Trajectory Interface

PX4 sends information about the desired path to the companion computer in modes for which the path planning interface has been integrated (e.g. missions, auto-land).
The information is sent in [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages at 5Hz.

The fields are set as shown:
- `time_usec`: UNIX Epoch time.
- `valid_points`: 3
- Point 0 - Current waypoint *type adapted* by FlightTaskAutoMapper (see [notes below](#type_adapted)):
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: Type adapted x-y-z NED local position of *current* mission waypoint.
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: Type adapted x-y-z NED local velocity of *current* mission waypoint.
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: Current yaw angle
  - `vel_yaw[0]`: NaN
  - `command[0]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mavlink-commands-mavcmd) for the current waypoint. 
- Point 1 - Current waypoint (Unmodified/not type adapted)):
  - `pos_x[1]`, `pos_y[1]`, `pos_z[1]`: x-y-z NED local position of *current* mission waypoint
  - `vel_x[1]`, `vel_y[1]`, `vel_z[1]`: NaN
  - `acc_x[1]`, `acc_y[1]`, `acc_z[1]`: NaN
  - `pos_yaw[1]`: Yaw setpoint
  - `vel_yaw[1]`: Yaw speed setpoint
  - `command[1]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mavlink-commands-mavcmd) for the current waypoint.
- Point 2 - Next waypoint in local coordinates (unmodified/not type adapted):
  - `pos_x[2]`, `pos_y[2]`, `pos_z[2]`: x-y-z NED local position of *next* mission waypoint
  - `vel_x[2]`, `vel_y[2]`, `vel_z[2]`: NaN
  - `acc_x[2]`, `acc_y[2]`, `acc_z[2]`: NaN
  - `pos_yaw[2]`: Yaw setpoint
  - `vel_yaw[2]`: Yaw speed setpoint
  - `command[2]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mavlink-commands-mavcmd) for the next waypoint.
- All other indices/fields are set as NaN.

<span id="type_adapted"></span>
Notes:
- Point 0 is the current waypoint/target modified based on the type of target.
  For example, it makes sense when landing to specify the target x, y coordinates and a descent velocity.
  To achieve this `FlightTaskAutoMapper` modifies land waypoints in Point 0 to set the z component of position to NAN and the z-velocity to a desired value.
- Point 1 and 2 are not used by the safe landing planner.
- Point 1 is used by local and global planner.

On the companion side, MAVROS translates the MAVLink message into ROS messages, which are eventually handled by the appropriate planner.
The planner plans a path to the waypoint/target, and sends it to the vehicle as a stream of `TRAJECTORY_REPRESENTATION_WAYPOINTS` messages that have the setpoint in Point 0.

The fields for the `TRAJECTORY_REPRESENTATION_WAYPOINTS` message from the companion computer are set as shown:
- `time_usec`: UNIX Epoch time.
- `valid_points`: 1
- Current vehicle information:
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED vehicle local position setpoint
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED velocity setpoint
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: Yaw angle setpoint
  - `vel_yaw[0]`: Yaw speed setpoint
  - `command[0]`: NaN.
- All other indices/fields are set as NaN.

PX4 will stream trajectory messages ... TBD.


## Supported Hardware

Tested companion computers and cameras are listed in [PX4/avoidance](https://github.com/PX4/avoidance#run-on-hardware).


<!-- ## Further Information -->
<!-- @mrivi is expert! -->
<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->
<!-- PR for mavlink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->
