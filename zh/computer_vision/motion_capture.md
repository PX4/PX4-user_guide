# 运动捕捉（MoCap）

运动捕捉（MoCap）是一种使用 *外部* 定位设备，用于估计载具三维*姿态*（位置与方向）的 [计算机视觉](https://en.wikipedia.org/wiki/Computer_vision)技术。 It is commonly used to navigate a vehicle in situations where GPS is absent (e.g. indoors), and provides position relative to a *local* co-ordinate system.

*MoCap* systems most commonly detect motion using infrared cameras, but other types of cameras, Lidar, or Ultra Wideband (UWB) may also be used.


> **Note** *MoCap* is conceptually similar to [Visual Intertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md). The main difference is that in VIO the vision system runs on the vehicle, and additionally makes use of the vehicle IMU to provide velocity information.


## MoCap Resources

For information about MoCap see:
- [Using Vision or Motion Capture Systems for Position Estimation](https://dev.px4.io/master/en/ros/external_position_estimation.html) (PX4 Developer Guide) <!-- bring across info into user guide? -->
- [Flying with Motion Capture (VICON, Optitrack)](https://dev.px4.io/master/en/tutorials/motion-capture-vicon-optitrack.html) (PX4 Developer Guide)  <!-- bring across info into user guide? -->
- [EKF > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)



