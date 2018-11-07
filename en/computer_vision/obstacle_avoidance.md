# Obstacle Avoidance

*Obstacle Avoidance* enables a vehicle to navigate around obstacles when following a preplanned path.

The feature requires a companion computer that is running computer vision software. 
This software maps obstacles and provide a route around obstacles for a given desired trajectory from PX4.

Obstacle avoidance is intended for automatic modes, and is currently supported for multicopter vehicles in [Missions](#mission_mode) and [Offboard mode](#offboard_mode).

This topic explains how the feature is set up and enabled in both modes.

> **Tip** Manual modes instead use the (much simpler) *Collision Avoidance* approach, which simply stops the vehicle from crashing into obstacles.


## Offboard Mode Avoidance {#offboard_mode}

PX4 supports collision avoidance in [Offboard mode](flight_modes/offboard.md), where the original planned route comes from a [ROS](http://dev.px4.io/en/ros/) node running on a companion computer, and then passed into an obstacle avoidance module (another ROS node).
The avoidance node sends the final computed path to the flight stack using the `SET_POSITION_TARGET_LOCAL_NED` message.

> **Note** PX4 does not do anything special for, or even know about, collision avoidance in offboard mode.
  To PX4 the whole avoidance system could be any other ROS application.
  
The route setpoints (`SET_POSITION_TARGET_LOCAL_NED`) can be supplied by any system.

The tested hardware/software platform is [Intel Aero](../flight_controller/intel_aero.md) running the *local_planner* avoidance software (which has been set up as described in the [Intel Aero > Obstacle Avoidance](../flight_controller/intel_aero.md#obstacle-avoidance) and in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo).


## Mission Mode Avoidance {#mission_mode}

PX4 supports object avoidance in [Missions](../flight_modes/mission.md).

### Overview

Object avoidance is enabled by [setting](../advanced_config/parameters.md) the `MPC_OBS_AVOID` to 1.

The planned route is sent to an obstacle avoidance system running on a companion computer.
When an obstacle is detected, the avoidance software returns a stream of setpoints that the vehicle can follow to navigate around the obstacle.
The MAVLink [Obstacle Avoidance Protocol](TBD) is used for communicating with the avoidance software.

PX4 itself puts no particular constraints on the companion hardware or software (at long as it sends setpoints to avoid obstacles!)

The tested hardware/software platform is [Intel Aero](../flight_controller/intel_aero.md) running the *local_planner* avoidance software (which has been set up as described in the [Intel Aero > Obstacle Avoidance](../flight_controller/intel_aero.md#obstacle-avoidance) and in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo).


### Mission Progression

Obstacle avoidance changes the mission behaviour only slightly:
- A waypoint is "reached" when the vehicle is within the acceptance radius, regardless of its heading.
  - In normal missions the vehicle must reach a waypoint with a certain heading (i.e. in a "close to" straight line from the previous waypoint). 
  - When obstacle avoidance is active, this constraint cannot be fulfilled because the obstacle avoidance algorithm has full control of the vehicle heading, and the vehicle always moves in the current field of view. 
- navigator updates the triplets when the vehicle has reached the acceptance radius of each waypoint. 
  If a waypoint is inside an obstacle it can happen that it’s never reach and the mission will be stuck. 
  If the vehicle projection on the line previous-current waypoint has passed the current waypoint, the acceptance radius is enlarged such that the current waypoint is set as reached
- If the vehicle within the x-y acceptance radius, the altitude acceptance is modified such that the mission progresses (even if it is not in the altitude acceptance radius).
  

###  Mission Mode Avoidance Interface

Mission mode is enabled on PX4 by setting `MPC_OBS_AVOID` to `True`.

PX4 communicates with the computer vision system on the companion computer using the Path Planning Protocol. <!-- check we call it this! -->
At very high level:
* PX4 sends `TRAJECTORY_REPRESENTATION_WAYPOINTS` messages to the companion at 5Hz.
  - The first point (array index 0) contains the vehicle current NED body position, NED body velocity, acceleration, and vehicle yaw. 
  - The index 1 and 2 points contain information about the current and next mission waypoints, respectively: position, yaw setpoint and yaw speed setpoint.
* When an obstacle is detected, the planning system returns a stream of the same `TRAJECTORY_REPRESENTATION_WAYPOINTS` message containing setpoints to navigate around the obstacle (only the first field is filled).

The paragraphs below describe the behaviour in greater detail, covering the internal PX4 behaviour and message flow through ROS.

#### Detailed Mission Mode Information

When a mission is uploaded from QGC and the parameter `MPC_OBS_AVOID` is set to `True`, PX4 fills the uORB message `vehicle_trajectory_waypoint_desired` in the following way.

Array `waypoints`:
_index 0 :_
- position: x-y-z NED vehicle local position
- velocity: x-y-z NED velocity setpoint generated by the active FlightTask
- Acceleration: vehicle acceleration
- Yaw: vehicle yaw
- Yaw_speed: NaN

_index 1:_
- position: x-y-z NED local coordinates of the current mission waypoint
- Velocity: NaN
- Acceleration: NaN
- Yaw: yaw setpoint
- Yaw_speed: yaw speed setpoint

_Index2:_
- position: x-y-z NED local coordinates of the next mission waypoint
- Velocity: NaN
- Acceleration: NaN
- Yaw: yaw setpoint
- Yaw_speed: yaw speed setpoint

The remaining indices are filled with NaN. 

The message vehicle_trajectory_waypoint_desired` is mapped into the MAVLink message `TRAJECTORY_REPRESENTATION_WAYPOINTS`. 
The messages are sent at 5Hz.

MAVROS translates the MAVLink message into a ROS message called mavros_msgs::trajectory and does the conversion from NED to ENU frames. 
Messages are published on the ROS topic `/mavros/trajectory/desired`

On the avoidance side, the algorithm plans a path to the waypoint.

The position or velocity setpoints generated by the obstacle avoidance to get collision free to the waypoint can be sent to the Firmware with two ROS messages:
mavros_msgs::trajectory (both velocity and position set points) on ROS topic /mavros/trajectory/generated
nav_msgs::Path (only position setpoints) on ROS topic /mavros/trajectory/path

MAVROS converts the set points from ENU to NED frame and translates the ROS messages into a MAVLink message `TRAJECTORY_REPRESENTATION_WAYPOINTS`.

On the Firmware side, incoming `TRAJECTORY_REPRESENTATION_WAYPOINTS` are translated into uORB `vehicle_trajectory_waypoint` messages. The array waypoints contains all NAN expect for index 0:
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

