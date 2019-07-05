# Safe Landing

The *Safe Landing* feature ensures that vehicles only land on flat terrain.

The feature can be enabled in both [Land mode](../flight_modes/land.md) and [Mission mode](../flight_modes/mission.md) on multicopter vehicles (and VTOL vehicles in MC mode) that have a companion computer running the appropriate vision software.

If commanded to land, the vehicle first descends to a height where it can measure the surface (companion computer `loiter_height` parameter).
If the landing area is not sufficiently flat, the vehicle moves outwards in a square-spiral pattern, periodically stopping to re-check the terrain for a landing spot that isn't too rough.

> **Warning** The feature will not prevent a vehicle from landing on a road (even if a car is detected it will be "forgotten" once it moves past).
  It will prevent landing on water, as the cameras used do not "see" the water surface at all.

{% youtube %}https://youtu.be/9SuJYcT0Mgc{% endyoutube %}


## PX4 Configuration

Safe landing is enabled within PX4 by [setting](../advanced_config/parameters.md) the [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) to 1.

> **Note** `COM_OBS_AVOID` also enables [Obstacle Avoidance in Missions](../computer_vision/obstacle_avoidance.md#mission_mode) and any other features that use the MAVLink [Path Planning Protocol](https://mavlink.io/en/services/trajectory.html) (Trajectory Interface) to integrate external path planning services with PX4.


## Companion Computer Setup

Companion-side setup and configuration is provided in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.

This covers the common setup for obstacle avoidance and collision prevention, and includes specific sections for using the safe landing planner:
* [Simulation setup](https://github.com/PX4/avoidance#safe-landing-planner)
* [Harware setup](https://github.com/PX4/avoidance#ssafe-landing-planner-1)

The configuration information includes, among other things, how to set up safe landing for different cameras, sizes of vehicles, and the height at which the decision to land or not is taken.


## Safe Landing Interface

PX4 uses the [MAVLink Trajectory Interface/Path Planning Protocol](https://mavlink.io/en/services/trajectory.html) for integrating path planning services from a companion computer (including obstacle avoidance in missions, safe landing, collision prevention, and future services). 

<!-- 
[Obstacle Avoidance > Mission Avoidance Interface](../computer_vision/obstacle_avoidance.md#mission_avoidance_interface)

-->


## Further Information

* [Vision and offboard control interfaces](https://youtu.be/CxIsJWtVaTA?t=963) (PX4 Developer Summit 2019: Martina Rivizzigno, Auterion Computer Vision Engineer)
* [PX4/avoidance](https://github.com/PX4/avoidance)
  * [Simulation setup > Safe Landing Planner](https://github.com/PX4/avoidance#safe-landing-planner)
  * [Hardware setup > Safe Landing Planner](https://github.com/PX4/avoidance#ssafe-landing-planner-1)
