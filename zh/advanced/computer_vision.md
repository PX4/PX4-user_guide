# Computer Vision (VIO, Avoidance)

[计算机视觉](https://en.wikipedia.org/wiki/Computer_vision) 技术使计算机能够使用视觉数据来理解他们的环境。

PX4 使用计算机视觉系统（主要在机载计算机上运行）以支持以下功能：
- [光流](#optical_flow)提供 2D 速度估计（使用向下的相机和向下的距离传感器）。
- [Motion Capture](#mocap) provides 3D pose estimation using a vision system that is *external* to the vehicle. It is primarily used for indoor navigation. 它主要用于室内导航。
- [Visual Inertial Odometry](#vio) provides 3D pose and velocity estimation using an onboard vision system and IMU. It is used for navigation when global position information is absent or unreliable. 当 GPS 不存在或不可靠时，它用于导航。
- [Obstacle Avoidance](https://docs.px4.io/en/computer_vision/obstacle_avoidance.html) provides navigation around obstacles when flying a planned path (currently missions are supported). This uses [PX4/avoidance](https://github.com/PX4/avoidance) running on a companion computer. 这依赖机载电脑上运行的 [PX4/avoidance](https://github.com/PX4/avoidance)
- [Collision Prevention](https://docs.px4.io/en/computer_vision/collision_prevention.html) is used to stop vehicles before they can crash into an obstacle (primarily when flying in manual modes).

Motion Capture (MoCap) is a technique for estimating the 3D *pose* (position and orientation) of a vehicle using a positioning mechanism that is *external* to the vehicle. MoCap systems most commonly detect motion using infrared cameras, but other types of cameras, Lidar, or Ultra Wideband (UWB) may also be used. MoCap系统最常使用红外摄像机检测运动，但也可以使用其他类型的摄像机，激光雷达或Ultra Wideband (UWB)。
:::

## 运动捕捉 {#mocap}

Motion Capture (MoCap) is a technique for estimating the 3D *pose* (position and orientation) of a vehicle using a positioning mechanism that is *external* to the vehicle. MoCap systems most commonly detect motion using infrared cameras, but other types of cameras, Lidar, or Ultra Wideband (UWB)  may also be used.

Visual Inertial Odometry (VIO) is used for estimating the 3D *pose* (position and orientation) of a moving vehicle relative to a *local* starting position. It is commonly used to navigate a vehicle in situations where GPS is absent (e.g. indoors) or unreliable (e.g. when flying under a bridge). 它通常用于在GPS不存在（例如室内）或不可靠的情况下（例如在桥下飞行时）导航载具。

VIO使用[视觉测距](https://en.wikipedia.org/wiki/Visual_odometry)来从视觉信息估计车辆*姿势*，结合来自IMU的惯性测量（以校正与载具快速移动导致不良的图像捕获）。
- [外部位置的估计](../ros/external_position_estimation.md)
- [使用 Motion Capture 飞行（VICON，Optitrack）](../tutorials/motion-capture-vicon-optitrack.md)
- [EKF > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)


## 视觉惯性测距法 {#vio}

Visual Inertial Odometry (VIO) is used for estimating the 3D *pose* (position and orientation) and *velocity* of a moving vehicle relative to a *local* starting position. It is commonly used to navigate a vehicle in situations where GPS is absent (e.g. indoors) or unreliable (e.g. when flying under a bridge).

[Optical Flow](https://docs.px4.io/en/sensor/optical_flow.html) provides 2D velocity estimation (using a downward facing camera and a downward facing distance sensor).

:::note
On difference between VIO and [MoCap](#mocap) is that VIO cameras/IMU are vehicle-based, and additionally provide velocity information.
:::

For information about configuring VIO on PX4 see:
- [EKF > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
- [T265 Setup guide](../peripherals/camera_t265_vio.md)
- [Snapdragon > Installation > Install Snap VIO](../flight_controller/snapdragon_flight_software_installation.md#install-snap-vio)


## 光流 {#optical_flow}

[Optical Flow](../sensor/optical_flow.md) provides 2D velocity estimation (using a downward facing camera and a downward facing distance sensor).

For information about optical flow see:
- [光流](../sensor/optical_flow.md)
  - [PX4Flow 智能摄像机](../sensor/px4flow.md)
- [EKF > Optical Flow](../advanced_config/tuning_the_ecl_ekf.md#optical-flow)

## External Resources

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 simulation environment for computer vision. The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
