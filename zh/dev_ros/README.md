# Robotics using ROS

[ROS](http://www.ros.org/) (Robot Operating System) is a general purpose robotics library that can be used with PX4 for [offboard control](../ros/mavros_offboard.md). It uses the [MAVROS](../ros/mavros_installation.md) node to communicate with PX4 running on hardware or using the [Gazebo Simulator](../simulation/ros_interface.md).

This section contains topics about using ROS for offboard control with PX4.

> **Tip** ROS is only officially supported on Linux platforms.

## Installation

The easiest way to setup PX4 simulation with ROS (on Ubuntu Linux) is to use the standard installation script that can be found at [Development Environment on Linux > Gazebo with ROS](../setup/dev_env_linux_ubuntu.md#rosgazebo). The script installs everything you need: PX4, ROS, the Gazebo simulator, and [MAVROS](../ros/mavros_installation.md).

> **Note** If you just need to install ROS then follow the [ROS Melodic installation instructions](http://wiki.ros.org/melodic/Installation) for your platform.


## External Resources

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 simulation environment for computer vision. The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
