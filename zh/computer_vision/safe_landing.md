# 安全着陆

*安全着陆* 功能确保车辆只能降落在平坦的地形上。

这个功能可以在多旋翼的[降落模式](../flight_modes/land.md)和[任务模式](../flight_modes/mission.md)中使能，多旋翼可以连接运行计算机视觉软件的机载计算机。 也可以在VTOL(垂起无人机)的MC模式下使用。

如果降落，无人机首先降落到距离表面可以测量的高度（机载计算机`loiter_height`参数）。 如果降落的区域不够平坦，无人机会以正方形螺旋状向外移动，并定期检查地形，以寻找相对平坦的降落点。

{% youtube %}https://youtu.be/9SuJYcT0Mgc{% endyoutube %}

## 局限/能力

安全着陆是为了在崎岖的地势中找到平坦区域。

- 允许在公路上降落；如果检测到汽车，它将在驶过是被"遗忘"。
- 如果使用雷达或超声波传感器，就可以降落在水上，但是使用立体相机或LIDAR则不可以。 
  - 系统只有在能够探测到地面的情况下才会降落。 对于立体相机，不能对水进行足够的特征分析，导致找不到平坦的区域进行降落。

## PX4配置

PX4通过[设置](../advanced_config/parameter_reference.md#COM_OBS_AVOID)参数<1>COM_OBS_AVOID</1> 为1来启动安全着陆功能。

> **Note** `COM_OBS_AVOID` also enables [Obstacle Avoidance in Missions](../computer_vision/obstacle_avoidance.md#mission_mode) and any other features that use the [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) (Trajectory Interface) to integrate external path planning services with PX4.

## 机载计算机设置

Companion-side setup and configuration is provided in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.

This covers the common setup for obstacle avoidance and collision prevention, and includes specific sections for using the *safe landing planner* (which provides companion-side support for this feature):

* [Simulation setup](https://github.com/PX4/avoidance#safe-landing-planner)
* [Harware setup](https://github.com/PX4/avoidance#safe-landing-planner-1)

The configuration information includes, among other things, how to set up safe landing for different cameras, sizes of vehicles, and the height at which the decision to land or not is taken.

<span id="interface"></span>

## Safe Landing Interface

PX4 uses the [Path Planning Interface](../computer_vision/path_planning_interface.md) for integrating path planning services from a companion computer (including [Obstacle Avoidance in missions](../computer_vision/obstacle_avoidance.md#mission_mode), [Safe Landing](../computer_vision/safe_landing.md), and future services).

The interface (messages sent) between PX4 and the companion are exactly the same as for any other path planning services. Note however that the safe landing planner only uses information in Point 0 of the `TRAJECTORY_REPRESENTATION_WAYPOINTS` message for the desired path.

## Supported Hardware

Tested companion computers and cameras are listed in [PX4/avoidance](https://github.com/PX4/avoidance#run-on-hardware).

## 更多信息

* [Vision and offboard control interfaces](https://youtu.be/CxIsJWtVaTA?t=963) (PX4 Developer Summit 2019: Martina Rivizzigno, Auterion Computer Vision Engineer)
* [PX4/avoidance](https://github.com/PX4/avoidance) 
  * [Simulation setup > Safe Landing Planner](https://github.com/PX4/avoidance#safe-landing-planner)
  * [Hardware setup > Safe Landing Planner](https://github.com/PX4/avoidance#ssafe-landing-planner-1)