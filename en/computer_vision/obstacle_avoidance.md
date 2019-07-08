# Obstacle Avoidance

*Obstacle Avoidance* enables a vehicle to navigate around obstacles when following a preplanned path.

The feature requires a companion computer that is running computer vision software. 
This software provides a route for a given desired trajectory, mapping and navigating around obstacles to achieve the best path.

Obstacle avoidance is intended for automatic modes, and is currently supported for multicopter vehicles in [Missions](#mission_mode) and [Offboard mode](#offboard_mode).

This topic explains how the feature is set up and enabled in both modes.


## Offboard Mode Avoidance {#offboard_mode}

PX4 supports collision avoidance in [Offboard mode](../flight_modes/offboard.md).

The desired route comes from a [ROS](http://dev.px4.io/en/ros/) node running on a companion computer.
This is passed into an obstacle avoidance module (another ROS node).
The avoidance software sends the planned path to the flight stack as a stream of `SET_POSITION_TARGET_LOCAL_NED` messages.

> **Note** The only required PX4-side setup is to put PX4 into *Offboard mode*.
  While the `SET_POSITION_TARGET_LOCAL_NED` setpoints come from a ROS collision avoidance node, to PX4 could be from any MAVLink system.

The tested hardware/software platform is [Intel Aero](../complete_vehicles/intel_aero.md) running either the *local_planner* or *global_planner*. Object avoidance can also be tested using Gazebo.
The set up for both is as described in the [Intel Aero > Obstacle Avoidance](../complete_vehicles/intel_aero.md#obstacle-avoidance) and in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.


## Mission Mode Avoidance {#mission_mode}

PX4 supports obstacle avoidance in [Mission mode](../flight_modes/mission.md), using avoidance software running on a separate companion computer.

Obstacle avoidance is enabled within PX4 by [setting](../advanced_config/parameters.md) the [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) to 1.

> **Note** PX4 communicates with the obstacle avoidance software using an implementation of the MAVLink [Path Planning Protocol](https://mavlink.io/en/services/trajectory.html) (Trajectory Interface) which is [described below](#path_planning_interface).
Provided an avoidance system complies with this interface it can be used with PX4.


### Mission Progression

Mission behaviour with obstacle avoidance enabled is *slightly different* to the original plan.

The difference when avoidance is active are:
- A waypoint is "reached" when the vehicle is within the acceptance radius, regardless of its heading.
  - This differs from normal missions, in which the vehicle must reach a waypoint with a certain heading (i.e. in a "close to" straight line from the previous waypoint). This constraint cannot be fulfilled when bstacle avoidance is active because the obstacle avoidance algorithm has full control of the vehicle heading, and the vehicle always moves in the current field of view. 
- PX4 starts emitting a new current/next waypoint once the previous waypoint is reached (i.e. as soon as vehicle enters its acceptance radius).
- If a waypoint is *inside* an obstacle it may unreachable (and the mission will be stuck). 
  - If the vehicle projection on the line previous-current waypoint passes the current waypoint, the acceptance radius is enlarged such that the current waypoint is set as reached
  - If the vehicle within the x-y acceptance radius, the altitude acceptance is modified such that the mission progresses (even if it is not in the altitude acceptance radius).
- The original mission speed (as set in *QGroundControl*/PX4) is ignored.
  The speed will be determined by the avoidance software:
  - *local planner* mission speed is around 3 m/s.
  - *global planner* mission speed is around 1-1.5 m/s.

If PX4 stops receiving setpoint updates then obstacle avoidance will be disabled, and the mission continues under normal PX4 [Mission mode](../flight_modes/mission.md) control. 


### Path Planning Interface {#path_planning_interface}

PX4 uses the [MAVLink Path Planning Protocol (Trajectory Interface)](https://mavlink.io/en/services/trajectory.html) for integrating path planning services from a companion computer (including obstacle avoidance in missions, [safe landing](../computer_vision/safe_landing.md), and future services).

Path planning is enabled on PX4 by setting `COM_OBS_AVOID` to `1`.
When this is enabled PX4 will:
- Check for the [HEARTBEAT](https://mavlink.io/en/services/heartbeat.html) from a companion computer, and enter a failsafe after a short time if the companion is not alive.
- Accept a path as a stream of `TRAJECTORY_REPRESENTATION_WAYPOINTS` messages - when in a mode that can accept external path planning commands (e.g. Mission or Land mode).

The fields for the `TRAJECTORY_REPRESENTATION_WAYPOINTS` message from the companion computer are set as shown:
- `time_usec`: UNIX Epoch time.
- `valid_points`: 1
- Current vehicle information:
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED vehicle local position setpoint
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED velocity setpoint
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: Yaw angle setpoint
  - `vel_yaw[0]`: Yaw speed setpoint
- All other indices/fields are set as NaN.

These are then translated into uORB `vehicle_trajectory_waypoint` messages/setpoints on PX4, which are tracked by the multicopter position controller.

The array waypoints contains all NAN except for index 0:
- Position: position setpoint
- Velocity: velocity setpoint
- acceleration: NaN (acceleration setpoints are not supported by the Firmware)
- Yaw: yaw setpoint
- Yaw_speed: yaw speed setpoint

The rate at which target setpoints are sent depends on the capabilities of the planning software and the desired speed.

> **Note** Currently the *local planner* emits messages at ~30Hz and can move at around 3 m/s. 
  The *global planner* emits messages at ~10Hz and mission speed with obstacle avoidance is around 1-1.5 m/s.

PX4 sends the *desired* trajectory to the companion computer in [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages at 5Hz.

The fields are set as shown:
- `time_usec`: UNIX Epoch time.
- `valid_points`: 3
- Current vehicle information:
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED vehicle local position
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED velocity setpoint
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: x-y-z NED acceleration setpoint
  - `pos_yaw[0]`: Current yaw angle
  - `vel_yaw[0]`: NaN
  - `command[0]`: NaN
- Current waypoint:
  - `pos_x[1]`, `pos_y[1]`, `pos_z[1]`: x-y-z NED local position of *current* mission waypoint
  - `vel_x[1]`, `vel_y[1]`, `vel_z[1]`: NaN
  - `acc_x[1]`, `acc_y[1]`, `acc_z[1]`: NaN
  - `pos_yaw[1]`: Yaw setpoint
  - `vel_yaw[1]`: Yaw speed setpoint
  - `command[1]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mavlink-commands-mavcmd) for the current waypoint.
- Next waypoint:
  - `pos_x[2]`, `pos_y[2]`, `pos_z[2]`: x-y-z NED local position of *next* mission waypoint
  - `vel_x[2]`, `vel_y[2]`, `vel_z[2]`: NaN
  - `acc_x[2]`, `acc_y[2]`, `acc_z[2]`: NaN
  - `pos_yaw[2]`: Yaw setpoint
  - `vel_yaw[2]`: Yaw speed setpoint
  - `command[2]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mavlink-commands-mavcmd) for the next waypoint.
- All other indices/fields are set as NaN.

The paragraphs below describe the behaviour in greater detail, covering the internal PX4 behaviour and message flow through ROS.

### Mission Mode Detailed Behaviour

When a mission is uploaded from QGC and the parameter `COM_OBS_AVOID` is set to `1`, PX4 fills the uORB message `vehicle_trajectory_waypoint_desired` as described below: 

Array `waypoints`:
- _index 0 :_
  - position: x-y-z NED vehicle local position
  - velocity: x-y-z NED velocity setpoint generated by the active FlightTask
  - Acceleration: vehicle acceleration
  - Yaw: vehicle yaw
  - Yaw_speed: NaN

- _index 1:_
  - position: x-y-z NED local coordinates of the current mission waypoint
  - Velocity: NaN
  - Acceleration: NaN
  - Yaw: yaw setpoint
  - Yaw_speed: yaw speed setpoint

- _Index2:_
  - position: x-y-z NED local coordinates of the next mission waypoint
  - Velocity: NaN
  - Acceleration: NaN
  - Yaw: yaw setpoint
  - Yaw_speed: yaw speed setpoint

The remaining indices are filled with NaN. 

The message `vehicle_trajectory_waypoint_desired` is mapped into the MAVLink message `TRAJECTORY_REPRESENTATION_WAYPOINTS` (see [avoidance interface](#path_planning_interface) above).
The messages are sent at 5Hz.

MAVROS translates the MAVLink message into a ROS message called `mavros_msgs::trajectory` and does the conversion from NED to ENU frames.
Messages are published on the ROS topic `/mavros/trajectory/desired`

On the avoidance side, the algorithm plans a path to the waypoint.

The position or velocity setpoints generated by the obstacle avoidance to get collision free to the waypoint can be sent to the Firmware with two ROS messages:
`mavros_msgs::trajectory` (both velocity and position set points) on ROS topic `/mavros/trajectory/generated`
`nav_msgs::Path` (only position setpoints) on ROS topic `/mavros/trajectory/path`

MAVROS converts the set points from ENU to NED frame and translates the ROS messages into a MAVLink message `TRAJECTORY_REPRESENTATION_WAYPOINTS`.

On the PX4 side, incoming `TRAJECTORY_REPRESENTATION_WAYPOINTS` are translated into uORB `vehicle_trajectory_waypoint` messages.
The array waypoints contains all NAN except for index 0:
- Position: position setpoint
- Velocity: velocity setpoint
- acceleration: NaN (acceleration setpoints are not supported by the Firmware)
- Yaw: yaw setpoint
- Yaw_speed: yaw speed setpoint

The setpoints are tracked by the multicopter position controller.


## Testing

The tested companion computer platform is [Intel Aero](../complete_vehicles/intel_aero.md) running either the *local_planner* or *global_planner* avoidance software. Object avoidance can also be tested using Gazebo.
The set up for both is as described in the [Intel Aero > Obstacle Avoidance](../complete_vehicles/intel_aero.md#obstacle-avoidance) and in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.


<!-- ## Further Information -->
<!-- @mrivi is expert! -->
<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->
<!-- PR for mavlink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->
