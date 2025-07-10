---
canonicalUrl: https://docs.px4.io/main/zh/computer_vision/motion_capture
---

# 运动捕捉（MoCap）

运动捕捉（MoCap）是一种 [计算机视觉](https://en.wikipedia.org/wiki/Computer_vision) 技术， 用于使用 *外部*定位机制估算无人机 3D *姿态* （位置和方向）。 运动捕捉通常用于在没有 GPS 的情况下（例如室内）导航无人机，并提供相对于 *本地*坐标系的位置。

*MoCap* 系统最常使用红外相机检测运动，但也可以使用其他类型的相机，激光雷达或者超宽带 （UWB）。

:::tip
Note *MoCap* 在概念上类似于  [视觉惯性测距 （VIO）](../computer_vision/visual_inertial_odometry.md). 主要区别在于，在 VIO 中，视觉系统运行在无人机上。 额外还需要利用无人机上 IMU 提供速度信息。
:::

## MoCap 资源

有关 MoCap 的信息，请参阅：
- [使用视觉或运动捕捉系统进行位置估计](../ros/external_position_estimation.md)。 <!-- bring across info into user guide? -->
- [使用运动捕捉飞行 （VICON，Optitrack）](../tutorials/motion-capture-vicon-optitrack.md)。  <!-- bring across info into user guide? -->
- [EKF > 外部视觉系统](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
