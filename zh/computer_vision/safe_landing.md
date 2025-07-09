---
canonicalUrl: https://docs.px4.io/main/zh/computer_vision/safe_landing
---

# Safe Landing (Multicopter + Companion Computer)

The *Safe Landing* computer-vision feature ensures that multicopter vehicles only land on flat terrain.

The feature can be enabled in both [Land mode](../flight_modes_mc/land.md) and [Mission mode](../flight_modes/mission.md) on multicopter vehicles that have a companion computer running the appropriate vision software. 也可以在VTOL(垂起无人机)的MC模式下使用。

如果降落，无人机首先降落到距离表面可以测量的高度（机载计算机`loiter_height`参数）。 如果降落的区域不够平坦，无人机会以正方形螺旋状向外移动，并定期检查地形，以寻找相对平坦的降落点。


## 局限/能力

安全着陆是为了在崎岖的地势中找到平坦区域。

- 允许在公路上降落；如果检测到汽车，它将在驶过是被"遗忘"。
- 如果使用雷达或超声波传感器，就可以降落在水上，但是使用立体相机或LIDAR则不可以。
  - 系统只有在能够探测到地面的情况下才会降落。 对于立体相机，不能对水进行足够的特征分析，导致找不到平坦的区域进行降落。


## PX4配置

PX4通过 [设置](../advanced_config/parameters.md) 参数 [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) 为1来启动安全着陆功能。

:::note
`COM_OBS_AVOID` 还使能了 [安全着陆](../computer_vision/obstacle_avoidance.md#mission_mode)，以及使用了 PX4 [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) （轨迹接口）将外部路径规划服务与 PX4 集成的其他功能。
:::

## 机载计算机设置

Companion-side setup and configuration is provided in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) Github repo.

This covers the common setup for obstacle avoidance and collision prevention, and includes specific sections for using the *safe landing planner* (which provides companion-side support for this feature):
* [仿真模拟安装配置](https://github.com/PX4/PX4-Avoidance#safe-landing-planner)
* [Hardware setup](https://github.com/PX4/PX4-Avoidance#safe-landing-planner-1)

配置信息除了其他外，还包括使用不同的相机怎样设置安全着陆，无人机大小和决定是否降落的高度。


<a id="interface"></a>

## 安全着陆接口

PX4 使用 [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) 集成机载计算机中的路径规划服务（包括 [任务中自主避障](../computer_vision/obstacle_avoidance.md#mission_mode)，[安全着陆](../computer_vision/safe_landing.md)以及更多的服务）。

PX4 和机载设备之间的（消息发送）接口与任何其他路径规划服务完全一样。 但是请注意，安全着陆规划仅将` TRAJECTORY_REPRESENTATION_WAYPOINTS `消息的第0点中的信息用于所需路径。


## 支持的硬件

Tested companion computers and cameras are listed in [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

## 更多信息

* [视觉和外部控制接口](https://youtu.be/CxIsJWtVaTA?t=963) (PX4 开发者峰会2019: Martina Rivizzigno, Auterion Computer Vision Engineerer)
* [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance)
  * [Simulation setup > Safe Landing Planner](https://github.com/PX4/PX4-Avoidance#safe-landing-planner)
  * [Hardware setup > Safe Landing Planner](https://github.com/PX4/PX4-Avoidance#safe-landing-planner-1)
