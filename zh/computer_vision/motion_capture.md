# 运动捕捉（MoCap）

运动捕捉（MoCap）是一种 [计算机视觉](https://en.wikipedia.org/wiki/Computer_vision) 技术， 用于使用 *外部*定位机制估算无人机 3D *姿态* （位置和方向）。 它通常用于无GPS的情况下进行无人机的导航(例如室内)，并提供在*本地坐标系*下的位置信息。

*MoCap* 系统最常使用红外相机检测运动，但也可以使用其他类型的相机，激光雷达或者超宽带 （UWB）。

:::note
*MoCap* 在概念上类似于 [视觉惯性里程计 (VIO)](../computer_vision/visual_inertial_odometry.md)。 主要区别在于，在 VIO 中，视觉系统运行在无人机上。 额外还需要利用无人机上 IMU 提供速度信息。
:::

## MoCap 资源

有关 MoCap 的信息，请参阅：
- [使用视觉或运动捕捉系统进行位置估计](../ros/external_position_estimation.md)。 <!-- bring across info into user guide? -->
- [利用动作捕捉系统进行飞行 （VICON，Optitrack）](../tutorials/motion-capture.md)。  <!-- bring across info into user guide? -->
- [EKF > 外部视觉系统](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
