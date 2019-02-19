# Collision Prevention

*Collision Prevention* may be used to automatically slow and stop a vehicle before it can crash into an obstacle.

It can be enabled for multicopter vehicles in [Position mode](../flight_modes/position_mc.md), and at time of writing requires a companion computer.

> **Warning** Collision prevention may not prevent a crash if your vehicle is moving too fast! This feature has only been tested (at time of writing) for a vehicle moving at 4 m/s.

## Overview

*Collision Prevention* is enabled/configured on PX4 by setting the parameter for minimum allowed distance ([MPC_COL_PREV_D](../advanced_config/parameter_reference.md#MPC_COL_PREV_D)).

The feature requires obstacle information from either an external system (sent using the [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message) or a [distance sensor](../sensor/rangefinders.md) connected to the flight controller.

> **Note** *Collision Prevention* currently only works with a companion computer! Very soon, we hope to also enable it for distance sensors attached to the flight controller.

The vehicle starts braking as soon as it detects an obstacle. The velocity setpoint towards the obstacle is reduced linearly such that it is set to zero at the point when the vehicle reaches the minimum allowed distance. If the vehicle approaches any closer (i.e. it overshoots or is pushed) negative thrust is applied to repel it from the obstacle.

Only the velocity components *towards* the obstacle are affected. RC inputs that cause the vehicle to move tangentially to the obstacle are still obeyed. So if a vehicle approaches an obstacle from an angle, the vehicle will slow until it reaches the minimum distance and then "slide" along the surface until it is no longer blocked.

The user is notified through *QGroundControl* while *Collision Prevention* is actively controlling velocity setpoints.

## PX4 (Software) Setup

Set the following [parameter](../advanced_config/parameters.md) in *QGroundControl*:

* [MPC_COL_PREV_D](../advanced_config/parameter_reference.md#MPC_COL_PREV_D) - Set the minimum allowed distance (the closest distance that the vehicle can approach the obstacle). Set negative to disable *collision prevention*.
    
    This should be tuned for both the *desired* minimal distance and likely speed of the vehicle.

## Companion Setup

The companion computer needs to supply a stream of [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages when an obstacle is detected.

The minimum rate at which messages *must* be sent depends on vehicle speed - at higher rates the vehicle will have a longer time to respond to detected obstacles.

> **Info** Initial testing of the system used a vehicle moving at 4 m/s with `OBSTACLE_DISTANCE` messages being emitted at 30Hz (the maximum rate supported by the vision system). The system may work well at significantly higher speeds and lower frequency distance updates.

The tested hardware/software platform is [Auterion IF750A](https://auterion.com/if750a/) reference multicopter running the *local_planner* avoidance software from the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) repo.

The hardware and software should be set up as described in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) repo. In order to emit `OBSTACLE_DISTANCE` messages you must use the *rqt_reconfigure* tool and set the parameter `send_obstacles_fcu` to true.

## PX4 Distance Sensor

PX4 does **not yet support** collision prevention using a rangefinder connected directly to the flight controller). We plan to add support very soon.

## Gazebo Setup

*Collision Prevention* can also be tested using Gazebo. See [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) for setup instructions.

<!-- Initial PR: https://github.com/PX4/Firmware/pull/10785 -->