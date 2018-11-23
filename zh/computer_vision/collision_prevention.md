# 防撞功能

*防撞*功能用于自动减速或制动，以免飞机撞上障碍物。

该功能可在多旋翼飞行器的[定点模式（Position mode）](../flight_modes/position_mc.md)中启用，在写入指令时，还需要一台机载计算机。

> **Warning**如果您的飞机速度太快，防撞功能可能无法达到预期效果。 (在编写本文档的阶段) 此功能仅在速度不超过4m/s的飞机上测试过。

## 概述

要在PX4上开启/配置*防撞*功能，请设置参数：最小安全间距（[MPC_COL_PREV_D](../advanced_config/parameter_reference.md#MPC_COL_PREV_D)）。

该功能需要来自外部系统（发送自 [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) 消息） 或连接到飞行控制器的 [距离传感器 ](../sensor/rangefinders.md) 提供的障碍物信息。

> **Note***防撞*功能目前必须与机载计算机配合使用！ 基于直连到飞控的距离传感器的防撞功能也将很快上线。

飞机一旦检测到障碍物就开始制动。 朝向障碍物的速度设定值将线性降低，在达到最小安全距离时将降低为零。 如果 (由于过冲或者外力) 飞机越过最小安全距离，动力系统将启动反向推力使飞机远离障碍物。

但只有 *朝向* 障碍物的速度分量才会受到影响。 如果遥控器发出沿障碍物切线方向移动的指令，将正常执行。 因此，如果载具以一定角度接近障碍物，载具会逐渐减速，直到最小安全距离，然后沿着平行于表面的方向“滑行”，直到原运动方向恢复畅通。

当 *防撞*功能主动调整速率设定值时，通过 *QGroundControl* 用户会收到通知。

## PX4 (软件) 设置

在 *QGroundControl* 中设置以下 [参数](../advanced_config/parameters.md)：

* [MPC_COL_PREV_D](../advanced_config/parameter_reference.md#MPC_COL_PREV_D) - 设置最小安全距离（飞机靠近障碍物的最小距离）。 设置为负值将禁用 *防撞* 功能。
    
    调参应根据*期望* 的最小距离与飞机大致的速度。

## 机载计算机设置

机载计算机应在检测到障碍物时上传[OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE)的消息流。

消息发送的最低频率*必须*由飞机速度决定 - 频率越高留给载具识别障碍物的反应时间越长。

> **Info**对该系统的初步测试使用的载具移动速度为4m/s，`OBSTACLE_DISTANCE` 消息以 30Hz (视觉系统支持的最大频率) 发出。 在更高的速度或更低的距离信息更新频率下，该系统应该也能达到不错的效果。

测试样机使用的软硬件平台分别是：[Auterion IF750A](https://auterion.com/if750a/)多旋翼平台，来自[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)代码仓库的 *local_planner*避障软件。

软硬件的配置应遵照 [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 代码仓库的说明。 要发出 `OBSTACLE_DISTANCE`消息，必须使用*rqt_reconfigure*工具，并将参数`send_obstacles_fcu`设置为true。

## PX4距离传感器

PX4目前**尚不支持**基于直接连接到飞控的测距仪的防撞功能。 我们将尽快上线该功能。

## Gazebo设置

*防撞*功能支持Gazebo仿真测试。 设置方法请遵照[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)的说明。

<!-- Initial PR: https://github.com/PX4/Firmware/pull/10785 -->