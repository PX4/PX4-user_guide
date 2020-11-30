# Computer Vision (VIO, Avoidance)

[计算机视觉](https://en.wikipedia.org/wiki/Computer_vision) 技术使计算机能够使用视觉数据来理解他们的环境。

PX4 使用计算机视觉系统（主要在机载计算机上运行）以支持以下功能：
- Pose/Velocity Estimation:
  - [光流](../sensor/optical_flow.md)提供2D速度估计（使用向下的相机和向下的距离传感器）。
  - [运动捕捉](../computer_vision/motion_capture.md)使用载具*外部*的视觉系统进行3D姿态估计。 它主要用于室内导航。
  - [Visual Inertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md) provides 3D pose and velocity estimation using an onboard vision system and IMU. 当 GPS 不存在或不可靠时，它用于导航。
- Avoidance/Path Planning:
  - [Obstacle Avoidance](../computer_vision/obstacle_avoidance.md) provides full navigation around obstacles when flying a planned path (currently missions are supported). 这依赖机载电脑上运行的 [PX4/avoidance](https://github.com/PX4/avoidance)
  - [碰撞预防](../computer_vision/collision_prevention.md)使载具在撞到障碍物之前停止（主要是在手动模式下飞行时）。
  - [Safe Landing](../computer_vision/safe_landing.md) guides vehicles to find (and land on) flat terrain that is free of stationary obstacles.


> **Tip** The [PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md) (Holybro) is a robust and inexpensive kit for developers working with computer vision on PX4. 它预安装了 [ PX4 避障](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 软件，可以用作您自己算法的基础。


## External Resources

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 v1.9 simulation environment for computer vision. The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
