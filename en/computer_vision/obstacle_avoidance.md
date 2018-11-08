# Obstacle Avoidance

*Obstacle Avoidance* enables a vehicle to navigate around obstacles when following a preplanned path.

The feature requires a companion computer that is running computer vision software. 
This software provides a route for a given desired trajectory, mapping and navigating around obstacles to achieve the best path.

Obstacle avoidance is intended for automatic modes, and is currently supported for multicopter vehicles in [Missions](#mission_mode) and [Offboard mode](#offboard_mode).

This topic explains how the feature is set up and enabled in both modes.


## Offboard Mode Avoidance {#offboard_mode}

PX4 supports collision avoidance in [Offboard mode](flight_modes/offboard.md).

The desired route comes from a [ROS](http://dev.px4.io/en/ros/) node running on a companion computer.
This is passed into an obstacle avoidance module (another ROS node).
The avoidance software sends the planned path to the flight stack as a stream of `SET_POSITION_TARGET_LOCAL_NED` messages.

> **Note** The only required PX4-side setup is to put PX4 into *Offboard mode*.
  While the `SET_POSITION_TARGET_LOCAL_NED` setpoints come from a ROS collision avoidance node, to PX4 could be from any MAVLink system.

The tested hardware/software platform is [Intel Aero](../flight_controller/intel_aero.md) running either the *local_planner* or *global_planner*. 
The setup is as described in the [Intel Aero > Obstacle Avoidance](../flight_controller/intel_aero.md#obstacle-avoidance) and in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.


## Mission Mode Avoidance {#mission_mode}

PX4 supports obstacle avoidance in [Missions](../flight_modes/mission.md), using avoidance software running on a separate companion computer. 

Obstacle avoidance is enabled within PX4 by [setting](../advanced_config/parameters.md) the [MPC_OBS_AVOID](../advanced_config/parameter_reference.md#MPC_OBS_AVOID) to 1.
PX4 communicates with the obstacle avoidance software using an implementation of the MAVLink [Path Planning Protocol](TBD) (Trajectory Interface) which is [#described below](mission_avoidance_interface).
Provided an avoidance system complies with this interface it can be used with PX4.

The tested companion computer platform is [Intel Aero](../flight_controller/intel_aero.md) running either the *local_planner* or *global_planner* avoidance software.
This is set up as described in the [Intel Aero > Obstacle Avoidance](../flight_controller/intel_aero.md#obstacle-avoidance) and in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.


### Mission Progression

The companion computer provides setpoint navigation for the *entire route* (not just when there are obstacles) based on current position, current waypoint and next waypoint information from PX4.

The resulting mission behaviour is very similar to missions without obstacle avoidance, and mainly affects the criteria used to determine that a waypoint has been reached.

The difference when avoidance is active are:
- A waypoint is "reached" when the vehicle is within the acceptance radius, regardless of its heading.
  - In normal missions the vehicle must reach a waypoint with a certain heading (i.e. in a "close to" straight line from the previous waypoint). 
  - When obstacle avoidance is active, this constraint cannot be fulfilled because the obstacle avoidance algorithm has full control of the vehicle heading, and the vehicle always moves in the current field of view. 
- navigator updates the triplets when the vehicle has reached the acceptance radius of each waypoint. 
  If a waypoint is inside an obstacle it can happen that it’s never reach and the mission will be stuck. 
  If the vehicle projection on the line previous-current waypoint has passed the current waypoint, the acceptance radius is enlarged such that the current waypoint is set as reached
- If the vehicle within the x-y acceptance radius, the altitude acceptance is modified such that the mission progresses (even if it is not in the altitude acceptance radius).
  

###  Mission Mode Avoidance Interface {#mission_avoidance_interface}

Mission mode is enabled on PX4 by setting `MPC_OBS_AVOID` to `1`.

PX4 sends the desired trajectory to the companion computer in [TRAJECTORY_REPRESENTATION_WAYPOINTS](http://localhost:4000/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages at 5Hz.
The "waypoint" array fields are set as shown:
- _index 0 :_
  - position: x-y-z NED vehicle local position
  - velocity: x-y-z NED velocity setpoint
  - acceleration: vehicle acceleration
  - yaw: vehicle yaw
  - yaw_speed: NaN
- _index 1:_
  - position: x-y-z NED local coordinates of the current mission waypoint
  - velocity: NaN
  - Acceleration: NaN
  - yaw: yaw setpoint
  - yaw_speed: yaw speed setpoint
- _Index2:_
  - position: x-y-z NED local coordinates of the next mission waypoint
  - velocity: NaN
  - acceleration: NaN
  - yaw: yaw setpoint
  - yaw_speed: yaw speed setpoint
- The remaining indices/fields are filled with NaN. 

PX4 expects to receive target setpoints in a stream of `TRAJECTORY_REPRESENTATION_WAYPOINTS` messages.
The array waypoints should contains all `NaN` except for index 0:
- _index 0 :_
  - Position: position setpoint
  - Velocity: velocity setpoint
  - acceleration: `NaN` (acceleration setpoints are not supported by PX4)
  - Yaw: yaw setpoint
  - Yaw_speed: yaw speed setpoint

The messages should be sent over the whole mission (not just when navigating around an obstacle).
The rate at which target setpoints are sent depends on the capabilities of the planning software. 
Nominally this should exceed [TBD].

> **Note** The protocol above describes an implementation of the [Path Planning Protocol](https://mavlink.io/en/services/trajectory.html) (Trajectory Interface).

The paragraphs below describe the behaviour in greater detail, covering the internal PX4 behaviour and message flow through ROS.

#### Mission Mode Detailed Behaviour

When a mission is uploaded from QGC and the parameter `MPC_OBS_AVOID` is set to `1`, PX4 fills the uORB message `vehicle_trajectory_waypoint_desired` as described below: 

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

The message `vehicle_trajectory_waypoint_desired` is mapped into the MAVLink message `TRAJECTORY_REPRESENTATION_WAYPOINTS`. 
The messages are sent at 5Hz.

MAVROS translates the MAVLink message into a ROS message called `mavros_msgs::trajectory` and does the conversion from NED to ENU frames. 
Messages are published on the ROS topic `/mavros/trajectory/desired`

On the avoidance side, the algorithm plans a path to the waypoint.

The position or velocity setpoints generated by the obstacle avoidance to get collision free to the waypoint can be sent to the Firmware with two ROS messages:
`mavros_msgs::trajectory` (both velocity and position set points) on ROS topic `/mavros/trajectory/generated`
`nav_msgs::Path` (only position setpoints) on ROS topic `/mavros/trajectory/path`

MAVROS converts the set points from ENU to NED frame and translates the ROS messages into a MAVLink message `TRAJECTORY_REPRESENTATION_WAYPOINTS`.

On the PX4 side, incoming `TRAJECTORY_REPRESENTATION_WAYPOINTS` are translated into uORB `vehicle_trajectory_waypoint` messages. 
The array waypoints contains all NAN expect for index 0:
- Position: position setpoint
- Velocity: velocity setpoint
- acceleration: NaN (acceleration setpoints are not supported by the Firmware)
- Yaw: yaw setpoint
- Yaw_speed: yaw speed setpoint

The setpoints are tracked by the multicopter position controller.


<!-- ## Further Information -->
<!-- @mrivi is expert! -->
<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->
<!-- PR for mavlink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->
