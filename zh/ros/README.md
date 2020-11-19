# 使用 ROS

[ROS](http://www.ros.org/) （机器人操作系统）是一种通用的机器人库，可与 PX4 一起用于 [离板控制 ](../ros/mavros_offboard.md)。 它使用 [MAVROS](../ros/mavros_installation.md) 节点与在硬件上运行或使用 [Gazebo 模拟器 ](../simulation/ros_interface.md) 的 PX4 进行通信。

本节包含有关使用 ROS 在 PX4 的离板控制的主题。

> **Tip** ROS 仅在 Linux 平台上得到官方支持。

## 安装

The easiest way to setup PX4 simulation with ROS (on Ubuntu Linux) is to use the standard installation script that can be found at [Development Environment on Linux > Gazebo with ROS](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo). The script installs everything you need: PX4, ROS, the Gazebo simulator, and [MAVROS](../ros/mavros_installation.md).

> **Note** If you just need to install ROS then follow the [ROS Melodic installation instructions](http://wiki.ros.org/melodic/Installation) for your platform.


## External Resources

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 simulation environment for computer vision. The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
