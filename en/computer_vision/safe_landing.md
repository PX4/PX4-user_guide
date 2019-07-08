# Safe Landing

The *Safe Landing* feature ensures that vehicles only land on flat terrain.

The feature can be enabled in both [Land mode](../flight_modes/land.md) and [Mission mode](../flight_modes/mission.md) on multicopter vehicles (and VTOL vehicles in MC mode) that have a companion computer running the appropriate vision software.

If commanded to land, the vehicle first descends to a height where it can measure the surface (companion computer `loiter_height` parameter).
If the landing area is not sufficiently flat, the vehicle moves outwards in a square-spiral pattern, periodically stopping to re-check the terrain for a landing spot that isn't too rough.

{% youtube %}https://youtu.be/9SuJYcT0Mgc{% endyoutube %}

## Limitations/Capabilities

Safe landing is designed for finding flat areas in rough terrain.

- Landing on a road is not prevented; if a car is detected it will be "forgotten" once it moves past.
- Landing on water may occur if using radar or ultrasound sensors, but should not occur if using stereo cameras or LIDAR.
  - The system will only land if it is able to detect ground. 
    For stereo cameras, water that is rough enough to have sufficient distinguishing features for analysis will not be flat enough to land on.


## PX4 Configuration

Safe landing is enabled within PX4 by [setting](../advanced_config/parameters.md) the [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) to 1.

> **Note** `COM_OBS_AVOID` also enables [Obstacle Avoidance in Missions](../computer_vision/obstacle_avoidance.md#mission_mode) and any other features that use the MAVLink [Path Planning Protocol](https://mavlink.io/en/services/trajectory.html) (Trajectory Interface) to integrate external path planning services with PX4.


## Companion Computer Setup

Companion-side setup and configuration is provided in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.

This covers the common setup for obstacle avoidance and collision prevention, and includes specific sections for using the safe landing planner:
* [Simulation setup](https://github.com/PX4/avoidance#safe-landing-planner)
* [Harware setup](https://github.com/PX4/avoidance#ssafe-landing-planner-1)

The configuration information includes, among other things, how to set up safe landing for different cameras, sizes of vehicles, and the height at which the decision to land or not is taken.


## Safe Landing Interface {#interface}

PX4 uses the [MAVLink Path Planning Protocol (Trajectory Interface)](https://mavlink.io/en/services/trajectory.html) for integrating path planning services from a companion computer (including obstacle avoidance in missions, safe landing, and future services).

When landing in missions the MAVLink interface/implementation is exactly the same as documented in [Obstacle Avoidance > Path Planning Interface](../computer_vision/obstacle_avoidance.md#path_planning_interface).

The companion subscribes to the vehicle state and stops sending setpoints when PX4 has disarmed.

<!--
multiple planners?
interface in land mode?
-->


## Further Information

* [Vision and offboard control interfaces](https://youtu.be/CxIsJWtVaTA?t=963) (PX4 Developer Summit 2019: Martina Rivizzigno, Auterion Computer Vision Engineer)
* [PX4/avoidance](https://github.com/PX4/avoidance)
  * [Simulation setup > Safe Landing Planner](https://github.com/PX4/avoidance#safe-landing-planner)
  * [Hardware setup > Safe Landing Planner](https://github.com/PX4/avoidance#ssafe-landing-planner-1)
