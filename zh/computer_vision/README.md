---
canonicalUrl: https://docs.px4.io/main/zh/computer_vision/README
---

# 计算机视觉 (光流，MoCap， VIO，避障)

[计算机视觉](https://en.wikipedia.org/wiki/Computer_vision) 技术使计算机能够使用视觉数据来理解他们的环境。

PX4 使用计算机视觉系统（主要在机载计算机上运行）以支持以下功能：
- 姿态 / 速度估计：
  - [光流](../sensor/optical_flow.md)提供2D速度估计（使用向下的相机和向下的距离传感器）。
  - [运动捕捉](../computer_vision/motion_capture.md)使用载具*外部*的视觉系统进行3D姿态估计。 它主要用于室内导航。
  - [视觉惯性测距 （VIO）](../computer_vision/visual_inertial_odometry.md) 使用机载视觉系统和 IMU 来提供 3D 姿态和速度估计。 当 GPS 不存在或不可靠时，它用于导航。
- 避障 / 路径规划：
  - [自主避障](../computer_vision/obstacle_avoidance.md) 在飞行规划好的路径时提供完全的避障导航（支持当前任务）。 This uses [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) running on a companion computer.
  - [碰撞预防](../computer_vision/collision_prevention.md)使载具在撞到障碍物之前停止（主要是在手动模式下飞行时）。
  - [安全着陆](../computer_vision/safe_landing.md) 引导无人机找到（并着陆）没有固定障碍物的平坦地形。

:::tip
[PX4 视觉开发套件](../complete_vehicles/px4_vision_kit.md) （Holybro）是一款功能强大且价格便宜的套件，适用于在 PX4 上使用计算机视觉的开发人员。 It comes with [PX4 avoidance](https://github.com/PX4/PX4-Avoidance) software pre-installed, and can be used as the base for your own algorithms.
:::

## 外部资源

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 v1.9 计算机视觉模拟仿真环境。 [XTDrone 手册](https://www.yuque.com/xtdrone/manual_en) 有你需要开始的一切！
