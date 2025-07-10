---
canonicalUrl: https://docs.px4.io/main/zh/advanced/computer_vision
---

# 计算机视觉 (光流，MoCap， VIO，避障)

[计算机视觉](https://en.wikipedia.org/wiki/Computer_vision) 技术使计算机能够使用视觉数据来理解他们的环境。

PX4 使用计算机视觉系统（主要在机载计算机上运行）以支持以下功能：
- [光流](#optical_flow)提供 2D 速度估计（使用向下的相机和向下的距离传感器）。
- [Motion Capture](#mocap) provides 3D pose estimation using a vision system that is *external* to the vehicle. It is primarily used for indoor navigation. 它主要用于室内导航。
- [Visual Inertial Odometry](#vio) provides 3D pose and velocity estimation using an onboard vision system and IMU. It is used for navigation when global position information is absent or unreliable. 当 GPS 不存在或不可靠时，它用于导航。
- [Obstacle Avoidance](https://docs.px4.io/en/computer_vision/obstacle_avoidance.html) provides navigation around obstacles when flying a planned path (currently missions are supported). This uses [PX4/avoidance](https://github.com/PX4/avoidance) running on a companion computer. This uses [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) running on a companion computer.
- [Collision Prevention](https://docs.px4.io/en/computer_vision/collision_prevention.html) is used to stop vehicles before they can crash into an obstacle (primarily when flying in manual modes).

Motion Capture (MoCap) is a technique for estimating the 3D *pose* (position and orientation) of a vehicle using a positioning mechanism that is *external* to the vehicle. MoCap systems most commonly detect motion using infrared cameras, but other types of cameras, Lidar, or Ultra Wideband (UWB) may also be used. It comes with [PX4 avoidance](https://github.com/PX4/PX4-Avoidance) software pre-installed, and can be used as the base for your own algorithms.
:::

## 运动捕捉

运动捕捉（MoCap）是一种使用无人机*外部的*定位机制来估算 3D <0>姿态* （位置和方向）的技术。 MoCap 系统最常使用红外摄像机检测运动，但也可以使用其他类型的摄像机，激光雷达或超宽带（UWB）。</p>

:::note
MoCap is commonly used to navigate a vehicle in situations where GPS is absent (e.g. indoors), and provides position relative to a *local* coordinate system. 它通常用于在GPS不存在（例如室内）或不可靠的情况下（例如在桥下飞行时）导航载具。

有关 MoCap 的信息，请参阅：
- [外部位置的估计](../ros/external_position_estimation.md)
- [使用 Motion Capture 飞行（VICON，Optitrack）](../tutorials/motion-capture.md)
- [EKF > 外部视觉系统](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)


## 视觉惯性里程计（VIO）

视觉惯性测距（VIO）用于估算 3D *姿态* （位置和方向）和相对于*本地*起始位置的无人机运动*速度*。 它通常用于在 GPS 不存在（例如室内）或不可靠的情况下（例如在桥下飞行时）给无人机导航。

VIO 使用[视觉测距](https://en.wikipedia.org/wiki/Visual_odometry)中的视觉信息来估算无人机*姿态*，融合 IMU 的惯性测量信息（为了矫正因不良的图像捕获导致的机身快速移动错误）。

:::note VIO
和 [MoCap](#mocap) 之间的区别在于 VIO 相机或者 IMU 是基于无人机的，并且额外提供速度信息。
:::

关于在 PX4 上配置 VIO 的信息，请参阅：
- [EKF > 外部视觉系统](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
- [T265 安装指南](../peripherals/camera_t265_vio.md)


## 光流

[光流](../sensor/optical_flow.md)提供 2D 速度估计（使用向下的相机和向下的距离传感器）。

有关光流的信息，请参阅：
- [光流](../sensor/optical_flow.md)
  - [PX4Flow 智能摄像机](../sensor/px4flow.md)
- [EKF > 光流](../advanced_config/tuning_the_ecl_ekf.md#optical-flow)

## 外部资源

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 计算机视觉模拟仿真环境。 [XTDrone 手册](https://www.yuque.com/xtdrone/manual_en) 有你需要开始的一切！
