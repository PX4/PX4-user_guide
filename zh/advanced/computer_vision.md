# 计算机视觉 (光流，MoCap， VIO，避障)

[计算机视觉](https://en.wikipedia.org/wiki/Computer_vision) 技术使计算机能够使用视觉数据来理解他们的环境。

PX4使用计算机视觉系统(主要在[机载计算机](../companion_computer/README.md)上运行)以支持下列功能：

- [光流](#optical_flow)提供 2D 速度估计（使用向下的相机和向下的距离传感器）。
- [运动捕捉](#motion-capture)使用载具_外部_的视觉系统进行3D姿态估计。 它主要用于室内导航。
- [视觉惯性测距 （VIO）](#visual-inertial-odometry-vio) 使用机载视觉系统和 IMU 来提供 3D 姿态和速度估计。 用于在GNSS位置信息不存在或不可靠时的导航。
- [避障](../computer_vision/obstacle_avoidance.md) 为飞行计划路径时，提供完整的障碍绕行导航（支持当前任务）。 这将使用运行在同伴计算机上的[PX4/PX4-avoidance](https://github.com/PX4/PX4-Avoidance) 。
- [防碰](../computer_vision/collision_prevention.md)用于载具在撞到障碍物之前刹车（主要是在手动模式下飞行时）。

:::tip
[PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md) (Holybro) 是一个健壮且不贵的工具包，供开发者在 PX4 上使用计算机视觉技术。 它提供了无需预先安装的软件，且包含一个为展示平台能力而实现的避障实例。
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
