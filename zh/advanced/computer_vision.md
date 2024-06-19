# 计算机视觉 (光流，MoCap， VIO，避障)

[计算机视觉](https://en.wikipedia.org/wiki/Computer_vision) 技术使计算机能够使用视觉数据来理解他们的环境。

PX4 使用计算机视觉系统（主要在[机载计算机](../companion_computer/index.md)上运行）以支持以下功能：

- [光流](#optical_flow)提供 2D 速度估计（使用向下的相机和向下的距离传感器）。
- [运动捕捉](#motion-capture)使用_外部_的视觉系统进行 3D 姿态估计。 它主要用于室内导航。
- [视觉惯性测距 （VIO）](#visual-inertial-odometry-vio) 使用机载视觉系统和 IMU 来提供 3D 姿态和速度估计。 用于在 GNSS 位置信息不存在或不可靠时的导航。
- [避障](../computer_vision/obstacle_avoidance.md) 为飞行计划路径时，提供完整的障碍绕行导航（支持当前任务）。 这使用机载计算机上运行的[PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance)。
- [防碰](../computer_vision/collision_prevention.md)用于载具在撞到障碍物之前刹车（主要是在手动模式下飞行时）。

:::tip
[PX4 Vision Autonomy Development Kit](../complete_vehicles_mc/px4_vision_kit.md) (Holybro) 是一个强大和便宜的套件，供开发者在 PX4 上使用计算视觉。 它无需预先安装的软件，但是包含一个为展示平台能力而实现的避障实例。
:::

## 运动捕捉

运动捕捉（MoCap）是一种利用载具_外部_定位设备估计载具3D _姿态_（位置和方向）的技术。 MoCap 系统最常使用红外相机检测运动，但也可以使用其他类型的相机，激光雷达或者超宽带 （UWB）。

:::note
MoCap 通常用于无GPS的情况下进行载具的导航(例如室内)，并提供在本地坐标系下的相对位置。 它通常用于在GPS不存在（例如室内）或不可靠的情况下（例如在桥下飞行时）导航载具。

有关 MoCap 的信息，请参阅：

- [外部位置的估计](../ros/external_position_estimation.md)
- [使用 Motion Capture 飞行（VICON，Optitrack）](../tutorials/motion-capture.md)
- [EKF > 外部视觉系统](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)

## 视觉惯性里程计（VIO）

视觉惯性里程计（VIO）被用于估计运动载具相对于本地起始位置的3D_姿态_（位置和方向）和_速度_。 它通常用于在 GPS 不存在（例如室内）或不可靠的情况下（例如在桥下飞行时）给载具导航。

VIO使用[视觉里程计](https://en.wikipedia.org/wiki/Visual_odometry)从视觉信息估计载具的_姿态_，融合来自IMU的惯性测量（以校正载具快速移动导致不良图像捕获）。

:::note VIO
和 [MoCap](#motion-capture) 之间的一个区别是，VIO 照相机/IMU 是基于载具的，并且还提供了速度信息。
:::

关于在 PX4 上配置 VIO 的信息，请参阅：

- [EKF > 外部视觉系统](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
- [T265 安装指南](../peripherals/camera_t265_vio.md)

## 光流

[光流](../sensor/optical_flow.md)提供 2D 速度估计（使用向下的相机和向下的距离传感器）。

有关光流的信息，请参阅：

- [光流](../sensor/optical_flow.md)
- [EKF > 光流](../advanced_config/tuning_the_ecl_ekf.md#optical-flow)

## 比较

### 本地位置估计 光学流 对 VIO

这两种技术都使用照相机并测量帧之间的差异。 光学流使用向下照相机，而VIO则使用立体照相机或45度跟踪照相机。 假定两者的校准都很好，哪个对本地地位置估计更好？

[的共识似乎是](https://discuss.px4.io/t/vio-vs-optical-flow/34680)

Optical flow:

- 向下光学流使得你能够通过陀螺仪的角速度来校正角平面速度。
- 需要准确的地面距离并假定地面为平面。 在这种情况下，它可能与VIO一样准确可靠(例如室内飞行)
- 它比VIO更健壮，因为它的状态较少。
- 更便宜和更容易设置，因为它只需要一个流传感器，一个范围探测器。 并设置几个参数（可以连接到飞行控制器）。

VIO

- 购买更加昂贵，设置更加困难。 它需要一台单独的配套计算机、校准、软件、配置等等。
- 如果没有可跟踪的点特征（实际上现实世界一般有点特征），效果将会减弱。
- 较为灵活，可以增加诸如避免障碍和制图等其他功能。

组合(两者兼用)可能是最可靠的，但在大多数现实世界的情景中并不必要。 通常您将选择适合您的运行环境、所需功能和成本限制的系统：

- 如果您打算在没有GPS的情况下在室外飞行（或室外和室内飞行），请使用 VIO 或者如果您需要支持避障碍和其他计算机视觉特性。
- 如果您只计划在室内飞行（不使用 GPS），且成本是一个重要的考虑因素，使用Optical Flow。

## 外部资源

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 计算机视觉模拟仿真环境。 [XTDrone 手册](https://www.yuque.com/xtdrone/manual_en) 有你需要开始的一切！
