# Collision Avoidance

*Collision Avoidance* may be used to automatically slow and stop a vehicle before it can crash into an obstacle.

It can be enabled for multicopter vehicles in [Position mode](../flight_modes/position_mc.md), and at time of writing requires a companion computer.

> **Tip** This feature is intended for manual modes. 
  Automatic modes instead use *Obstacle Avoidance*, which navigates around obstacles in order to follow a planned path.


## Overview

*Collision Avoidance* is enabled on PX4 using the parameter [MPC_COL_AVOID](../advanced_config/parameter_reference.md#MPC_COL_AVOID).
The closest allowed distance to an obstacle is set using [MPC_COL_AVOID_D](../advanced_config/parameter_reference.md#MPC_COL_AVOID_D).

The feature requires obstacle information from either an external system (sent using the [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message) or a [distance sensor](../sensor/rangefinders.md) connected to the flight controller.

> **Warning** *Collision Avoidance* currently only works with a companion computer! 
  Support for distance sensors on the flight controller is coming soon.

The vehicle starts braking as soon as it detects an obstacle.
The velocity setpoint towards the obstacle is reduced linearly such that it is set to zero at the point when the vehicle reaches the minimum allowed distance.
If the vehicle approaches any closer (i.e. it overshoots or is pushed) negative thrust is applied to repel it from the obstacle.

Only the velocity components *towards* the obstacle are affected.
RC inputs that cause the vehicle to move tangentially to the obstacle are still obeyed. 
So if a vehicle approaches an obstacle from an angle, the vehicle will slow until it reaches the minimum distance and then "slide" along the surface until it is no longer blocked.

The user is notified through *QGroundControl* while *collision avoidance* is actively controlling velocity setpoints.


## PX4 (Software) Setup

Set the following [parameters](../advanced_config/parameters.md) in *QGroundControl*:

* [MPC_COL_AVOID](../advanced_config/parameter_reference.md#MPC_COL_AVOID) - Set to 1 in order to enable collision avoidance.
* [MPC_COL_AVOID_D](../advanced_config/parameter_reference.md#MPC_COL_AVOID_D) - Set the minimum allowed distance (the closest distance that the vehicle can approach the obstacle).
  This should be tuned for both the *desired* minimal distance and likely speed of the vehicle.


## Companion Setup

The companion computer needs to supply [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages when an obstacle is detected.
The messages must be sent at a rate of TBD Hz.

The tested hardware/software platform is [Intel Aero](../flight_controller/intel_aero.md) running the *local_planner* avoidance software (setup as per [Intel Aero > Obstacle Avoidance](../flight_controller/intel_aero.md#obstacle-avoidance) and in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo).


## PX4 Distance Sensor

> **Note** At time of writing this does not support collision avoidance from a rangefinder connected directly to the flight controller.

<!-- state rate of message? How about 10Hz? 
No minimum rate - but will depend on maximum velocity that needs to be shed. 
Rate must be > 2Hz - QGC will automatically warn on stale data once collison avoidance is enabled.
-->

<!-- what hardware - links
- what software? 
-->

<!-- Initial PR: https://github.com/PX4/Firmware/pull/10785 -->