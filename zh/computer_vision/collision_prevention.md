# 防撞功能

*防撞*功能用于自动减速或停车，以免飞机撞上障碍物。

该功能可在多旋翼飞行器的[定点模式（Position mode）](../flight_modes/position_mc.md)中启用，在写入指令时，还需要一台机载计算机。

> **Warning**如果您的飞机速度太快，防撞功能可能无法达到预期效果。 (在编写本文档的阶段) 此功能仅在速度不超过4m/s的飞机上测试过。

## 概述

*Collision Prevention* is enabled/configured on PX4 by setting the parameter for minimum allowed distance ([MPC_COL_PREV_D](../advanced_config/parameter_reference.md#MPC_COL_PREV_D)).

The feature requires obstacle information from either an external system (sent using the [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message) or a [distance sensor](../sensor/rangefinders.md) connected to the flight controller.

> **Note** *Collision Prevention* currently only works with a companion computer! Very soon, we hope to also enable it for distance sensors attached to the flight controller.

The vehicle starts braking as soon as it detects an obstacle. The velocity setpoint towards the obstacle is reduced linearly such that it is set to zero at the point when the vehicle reaches the minimum allowed distance. If the vehicle approaches any closer (i.e. it overshoots or is pushed) negative thrust is applied to repel it from the obstacle.

Only the velocity components *towards* the obstacle are affected. RC inputs that cause the vehicle to move tangentially to the obstacle are still obeyed. So if a vehicle approaches an obstacle from an angle, the vehicle will slow until it reaches the minimum distance and then "slide" along the surface until it is no longer blocked.

当 *防撞*功能主动调整速率设定值时，通过 *QGroundControl* 用户会收到通知。

## PX4 (软件) 设置

在 *QGroundControl* 中设置以下 [参数](../advanced_config/parameters.md)：

* [MPC_COL_PREV_D](../advanced_config/parameter_reference.md#MPC_COL_PREV_D) - 设置最小安全距离（飞机靠近障碍物的最小距离）。 设置为负值将禁用 *防撞* 功能。
    
    This should be tuned for both the *desired* minimal distance and likely speed of the vehicle.

## Companion Setup

The companion computer needs to supply a stream of [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages when an obstacle is detected.

The minimum rate at which messages *must* be sent depends on vehicle speed - at higher rates the vehicle will have a longer time to respond to detected obstacles.

> **Info**对该系统的初步测试使用的载具移动速度为4m/s，`OBSTACLE_DISTANCE` 消息以 30Hz (视觉系统支持的最大频率) 发出。 在更高的速度或更低的距离信息更新频率下，该系统应该也能达到不错的效果。

测试样机使用的软硬件平台分别是：[Auterion IF750A](https://auterion.com/if750a/)多旋翼平台，来自[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)代码仓库的 *local_planner*避障软件。

软硬件的配置应遵照 [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 代码仓库的说明。 要发出 `OBSTACLE_DISTANCE`消息，必须使用*rqt_reconfigure*工具，并将参数`send_obstacles_fcu`设置为true。

## PX4距离传感器

PX4目前**尚不支持**基于直接连接到飞控的测距仪的防撞功能。 我们将尽快上线该功能。

## Gazebo设置

*防撞*功能支持Gazebo仿真测试。 设置方法请遵照[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)的说明。

<!-- Initial PR: https://github.com/PX4/Firmware/pull/10785 -->