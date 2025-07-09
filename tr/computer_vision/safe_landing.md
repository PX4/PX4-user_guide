---
canonicalUrl: https://docs.px4.io/main/tr/computer_vision/safe_landing
---

# Safe Landing (Multicopter + Companion Computer)

The *Safe Landing* computer-vision feature ensures that multicopter vehicles only land on flat terrain.

The feature can be enabled in both [Land mode](../flight_modes_mc/land.md) and [Mission mode](../flight_modes/mission.md) on multicopter vehicles that have a companion computer running the appropriate vision software. It can also be used for VTOL vehicles in MC mode.

If commanded to land, the vehicle first descends to a height where it can measure the surface (companion computer `loiter_height` parameter). If the landing area is not sufficiently flat, the vehicle moves outwards in a square-spiral pattern, periodically stopping to re-check the terrain for a landing spot that isn't too rough.


## Limitations/Capabilities

Safe landing is designed for finding flat areas in rough terrain.

- Landing on a road is not prevented; if a car is detected it will be "forgotten" once it moves past.
- Landing on water may occur if using radar or ultrasound sensors, but should not occur if using stereo cameras or LIDAR.
  - The system will only land if it is able to detect ground. For stereo cameras, water that is rough enough to have sufficient distinguishing features for analysis will not be flat enough to land on.


## PX4 Configuration

Safe landing is enabled within PX4 by [setting](../advanced_config/parameters.md) the [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) to 1.

:::note
`COM_OBS_AVOID` also enables [Obstacle Avoidance in Missions](../computer_vision/obstacle_avoidance.md#mission_mode) and any other features that use the [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) (Trajectory Interface) to integrate external path planning services with PX4.
:::

## Companion Computer Setup

Companion-side setup and configuration is provided in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) Github repo.

This covers the common setup for obstacle avoidance and collision prevention, and includes specific sections for using the *safe landing planner* (which provides companion-side support for this feature):
* [Simulation setup](https://github.com/PX4/PX4-Avoidance#safe-landing-planner)
* [Hardware setup](https://github.com/PX4/PX4-Avoidance#safe-landing-planner-1)

The configuration information includes, among other things, how to set up safe landing for different cameras, sizes of vehicles, and the height at which the decision to land or not is taken.


<a id="interface"></a>

## Safe Landing Interface

PX4 uses the [Path Planning Interface](../computer_vision/path_planning_interface.md) for integrating path planning services from a companion computer (including [Obstacle Avoidance in missions](../computer_vision/obstacle_avoidance.md#mission_mode), [Safe Landing](../computer_vision/safe_landing.md), and future services).

The interface (messages sent) between PX4 and the companion are exactly the same as for any other path planning services. Note however that the safe landing planner only uses information in Point 0 of the `TRAJECTORY_REPRESENTATION_WAYPOINTS` message for the desired path.


## Supported Hardware

Tested companion computers and cameras are listed in [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

## Further Information

* [Vision and offboard control interfaces](https://youtu.be/CxIsJWtVaTA?t=963) (PX4 Developer Summit 2019: Martina Rivizzigno, Auterion Computer Vision Engineer)
* [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance)
  * [Simulation setup > Safe Landing Planner](https://github.com/PX4/PX4-Avoidance#safe-landing-planner)
  * [Hardware setup > Safe Landing Planner](https://github.com/PX4/PX4-Avoidance#safe-landing-planner-1)
