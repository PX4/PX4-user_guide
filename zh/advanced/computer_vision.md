# 计算机视觉 (光流，MoCap， VIO，避障)

[计算机视觉](https://en.wikipedia.org/wiki/Computer_vision) 技术使计算机能够使用视觉数据来理解他们的环境。

PX4使用计算机视觉系统(主要在[机载计算机](../companion_computer/README.md)上运行)以支持下列功能：

- [光流](#optical_flow)提供 2D 速度估计（使用向下的相机和向下的距离传感器）。
- [Motion Capture](#motion-capture) provides 3D pose estimation using a vision system that is _external_ to the vehicle. 它主要用于室内导航。
- [Visual Inertial Odometry](#vio) provides 3D pose and velocity estimation using an onboard vision system and IMU. It is used for navigation when global position information is absent or unreliable. It is used for navigation when GNSS position information is absent or unreliable.
- [Obstacle Avoidance](https://docs.px4.io/en/computer_vision/obstacle_avoidance.html) provides navigation around obstacles when flying a planned path (currently missions are supported). This uses [PX4/avoidance](https://github.com/PX4/avoidance) running on a companion computer. 利用机载计算机上运行的[PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance)
- [Collision Prevention](https://docs.px4.io/en/computer_vision/collision_prevention.html) is used to stop vehicles before they can crash into an obstacle (primarily when flying in manual modes).

Motion Capture (MoCap) is a technique for estimating the 3D *pose* (position and orientation) of a vehicle using a positioning mechanism that is *external* to the vehicle. MoCap systems most commonly detect motion using infrared cameras, but other types of cameras, Lidar, or Ultra Wideband (UWB) may also be used. It comes with no pre-installed software, but does include an example implementation of obstacle avoidance to demonstrate the capabilities of the platform.
:::

## 运动捕捉

Motion Capture (MoCap) is a technique for estimating the 3D _pose_ (position and orientation) of a vehicle using a positioning mechanism that is _external_ to the vehicle. MoCap systems most commonly detect motion using infrared cameras, but other types of cameras, Lidar, or Ultra Wideband (UWB) may also be used.

:::note
MoCap is commonly used to navigate a vehicle in situations where GPS is absent (e.g. indoors), and provides position relative to a _local_ coordinate system. 它通常用于在GPS不存在（例如室内）或不可靠的情况下（例如在桥下飞行时）导航载具。

有关 MoCap 的信息，请参阅：

- [外部位置的估计](../ros/external_position_estimation.md)
- [使用 Motion Capture 飞行（VICON，Optitrack）](../tutorials/motion-capture.md)
- [EKF > 外部视觉系统](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)

## 视觉惯性里程计（VIO）

Visual Inertial Odometry (VIO) is used for estimating the 3D _pose_ (position and orientation) and _velocity_ of a moving vehicle relative to a _local_ starting position. 它通常用于在 GPS 不存在（例如室内）或不可靠的情况下（例如在桥下飞行时）给无人机导航。

VIO uses [Visual Odometry](https://en.wikipedia.org/wiki/Visual_odometry) to estimate vehicle _pose_ from visual information, combined with inertial measurements from an IMU (to correct for errors associated with rapid vehicle movement resulting in poor image capture).

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
- [EKF > 光流](../advanced_config/tuning_the_ecl_ekf.md#optical-flow)

## Comparisons

### Optical Flow vs VIO for Local Position Estimation

Both these techniques use cameras and measure differences between frames. Optical flow uses a downward facing camera, while VIO uses a stereo camera or a 45 degree tracking camera. Assuming both are well calibrated, which is better for local position estimation?

The consensus [appears to be](https://discuss.px4.io/t/vio-vs-optical-flow/34680):

Optical flow:

- Downward facing optical flow gives you a planar velocity thats corrected for angular velocity with the gyro.
- Requires an accurate distance to the ground and assumes a planar surface. Given those conditions it can be just as accurate/reliable as VIO (such as indoor flight)
- Is more robust than VIO as it has fewer states.
- Is significantly cheaper and easier to set up as it only requires a flow sensor, a rangefinder, and setting up a few parameters (which can be connected to the flight controller).

VIO:

- Is more expensive to purchase and harder to set up. It requires a separate companion computer, calibration, software, configuration and so on.
- Will be less effective if there are no point features to track (in practice the real world generally has point features).
- Is more flexible, allowing additional features such as obstacle avoidance and mapping.

A combination (fusing both) is probably the most reliable, though not necessary in most real-world scenarios. Normally you will select the system that suits your operating environment, required features, and cost constraints:

- Use VIO if you plan on flying outdoors without GPS (or outdoors and indoors), or if you need to support obstacle avoidance and other computer vision features.
- Use Optical Flow if you plan on only flying indoors (without GPS) and cost is an important consideration.

## 外部资源

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 计算机视觉模拟仿真环境。 [XTDrone 手册](https://www.yuque.com/xtdrone/manual_en) 有你需要开始的一切！
