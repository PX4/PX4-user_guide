# 计算机视觉 (光流，MoCap， VIO，避障)

[计算机视觉](https://en.wikipedia.org/wiki/Computer_vision) 技术使计算机能够使用视觉数据来理解他们的环境。

PX4使用计算机视觉系统(主要在[机载计算机](../companion_computer/README.md)上运行)以支持下列功能：

- Pose/Velocity Estimation:
  - [光流](../sensor/optical_flow.md)提供2D速度估计（使用向下的相机和向下的距离传感器）。
  - [Motion Capture](../computer_vision/motion_capture.md) provides 3D pose estimation using a vision system that is _external_ to the vehicle. It is primarily used for indoor navigation.
  - [Visual Inertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md) provides 3D pose and velocity estimation using an onboard vision system and IMU. It is used for navigation when global position information is absent or unreliable.
- Avoidance/Path Planning:
  - [自主避障](../computer_vision/obstacle_avoidance.md) 在飞行规划好的路径时提供完全的避障导航（支持当前任务）。 这依赖机载电脑上运行的 [PX4/avoidance](https://github.com/PX4/PX4-Avoidance)。
  - [碰撞预防](../computer_vision/collision_prevention.md)使载具在撞到障碍物之前停止（主要是在手动模式下飞行时）。
  - [安全着陆](../computer_vision/safe_landing.md) 引导无人机找到（并着陆）没有固定障碍物的平坦地形。

:::tip
[PX4 视觉开发套件](../complete_vehicles/px4_vision_kit.md) （Holybro）是一款功能强大且价格便宜的套件，适用于在 PX4 上使用计算机视觉的开发人员。 It comes with no pre-installed software, but does include an example implementation of obstacle avoidance to demonstrate the capabilities of the platform.
:::

## 外部资源

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 v1.9 计算机视觉模拟仿真环境。 [XTDrone 手册](https://www.yuque.com/xtdrone/manual_en) 有你需要开始的一切！
