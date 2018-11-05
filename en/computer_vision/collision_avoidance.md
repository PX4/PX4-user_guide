# Collision Avoidance

<!-- Initial PR: https://github.com/PX4/Firmware/pull/10785 -->

*Collision Avoidance* may be used to automatically slow and stop a vehicle before it can crash into an obstacle.

This feature is intended for manual modes, where the endpoint destination is not known. 
It is currently only enabled for multicopter vehicles in [Position mode](../flight_modes/position_mc.md).

> **Tip** Automatic modes instead use *Obstacle Avoidance*, which navigates around obstacles in order to follow a planned path.


## How it Works

Collision is enabled by setting [MPC_COL_AVOID](../advanced_config/parameter_reference.md#MPC_COL_AVOID) to 1 (and disabled by setting it to zero).

The system uses information from the MAVLink [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message for obstacle detection.
This message is typically sent from a companion computer, and may be generated from a laser scanner/rangefinder or from an obstacle avoidance/navigation system.


> **Note** At time of writing this does not support collision avoidance from a rangefinder connected directly to the flight controller.

The vehicle starts braking as soon as it detects an obstacle.
The velocity setpoint towards the obstacle is reduced linearly such that it is set to zero at the point when the vehicle reaches the minimum allowed distance ([MPC_COL_AVOID_D](../advanced_config/parameter_reference.md#MPC_COL_AVOID_D)).
If the vehicle approaches any closer (i.e. it overshoots or is pushed) negative thrust is applied to repel it from the obstacle.

Only the velocity components *towards* the obstacle are affected.
RC inputs that cause the vehicle to move tangentially to the obstacle are still obeyed. 
So if a vehicle approaches an obstacle from an angle the vehicle will slow until it reaches the minimum distance and then drift along the surface until the forward component can be executed again.

While the collision detection engaged, the user is notified through *QGroundControl*.


## PX4 (Software) Setup

Use *QGroundControl* to [set the following parameters](../advanced_config/parameters.md):

* [MPC_COL_AVOID](../advanced_config/parameter_reference.md#MPC_COL_AVOID) - set to 1 to enable collision avoidance.
* [MPC_COL_AVOID_D](../advanced_config/parameter_reference.md#MPC_COL_AVOID_D) - The minimum distance to allow the vehicle to approach.
  This should be tuned based on available space and likely speed on the vehicle. 


### Companion Setup

The companion computer needs to supply [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages from a distance sensor or from obstacle map software. 

<!-- state rate of message? How about 10Hz? 
No minimum rate - but will depend on maximum velocity that needs to be shed. 
Rate must be > 2Hz - QGC will automatically warn on stale data once collison avoidance is enabled.
-->

<!-- what hardware - links
- what software? 
-->