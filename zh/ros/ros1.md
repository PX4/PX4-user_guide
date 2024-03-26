# ROS 1 和 MAVROS

:::tip PX4开发团队建议用户迁移到 [ROS 2](../ros/ros2.md) (即跳过此章节)! 它使用 [MAVROS](../ros/mavros_installation.md) 节点与在硬件上运行或使用 [Gazebo 模拟器 ](../simulation/ros_interface.md) 的 PX4 进行通信。

[ROS](../ros/README.md) (机器人操作系统) 是一个通用的机器人库，可以用于为 PX4 自动驾驶仪创建强大的无人机应用程序。

本节包含使用“原始版本的ROS”和[MAVROS](../ros/mavros_installation.md)包通过[MAVLink](../middleware/mavlink.md)与PX4通信相关的主题(MAVROS将ROS主题与MAVLink和PX4协议连接起来)

主要的话题包括：
- [ROS/MAVROS Installation Guide](../ros/mavros_installation.md): Setup a PX4 development environment with ROS 1 and MAVROS.
- [ROS/MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md): Tutorial showing the main concepts related to writing a C++ MAVROS/ROS node.
- [ROS MAVROS Sending Custom Messages](../ros/mavros_custom_messages.md)
- [ROS with Gazebo Classic Simulation](../simulation/ros_interface.md)
- [Gazebo Classic OctoMap Models with ROS](../sim_gazebo_classic/octomap.md)
- [ROS Installation on RPi](../ros/raspberrypi_installation.md)
- [External Position Estimation (Vision/Motion based)](../ros/external_position_estimation.md)


## 安装

- [PX4 ROS Setups](../ros/README.md#ros-setups).
- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 simulation environment for computer vision. The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
- [Prometheus Autonomous Drone Project](https://github.com/amov-lab/Prometheus/blob/master/README_EN.md) - Prometheus is a ROS 1 based, BSD-3 licensed collection of autonomous drone software packages from [AMOVLab](https://github.com/amov-lab), which provides a full set of solutions for the intelligent and autonomous flight of drones, such as mapping, localization, planning, control, and target detection, fully integrated with the [Gazebo Classic](../sim_gazebo_classic/README.md) Simulator.
