---
canonicalUrl: https://docs.px4.io/main/ru/ros/ros1
---

# ROS (1) with MAVROS

:::tip
The PX4 development team recommend that users migrate to [ROS 2](../ros/ros2.md) (i.e. skip this section)!
:::

[ROS](../ros/README.md) (Robot Operating System) is a general-purpose robotics library that can be used to create powerful drone applications for the PX4 Autopilot.

This section contains topics related to using the "original version of ROS" and the [MAVROS](../ros/mavros_installation.md) package to communicate with PX4 over [MAVLink](../middleware/mavlink.md) (MAVROS bridges ROS topics to MAVLink and PX4 conventions).

The main topics covered are:
- [ROS/MAVROS Installation Guide](../ros/mavros_installation.md): Setup a PX4 development environment with ROS (1) and MAVROS.
- [Offboard control with MAVROS](../ros/mavros_offboard.md): Tutorial showing the main concepts related to writing a C++ MAVROS/ROS node.
- [ROS MAVROS Sending Custom Messages](../ros/mavros_custom_messages.md)
- [ROS with Gazebo Simulation](../simulation/ros_interface.md)
- [Gazebo OctoMap Models with ROS](../simulation/gazebo_octomap.md)
- [ROS Installation on RPi](../ros/raspberrypi_installation.md)
- [External Position Estimation (Vision/Motion based)](../ros/external_position_estimation.md)


## Other Resources

- [PX4 ROS Setups](../ros/README.md#ros-setups).
- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 simulation environment for computer vision. The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
- [Prometheus Autonomous Drone Project](https://github.com/amov-lab/Prometheus/blob/master/README_EN.md) - Prometheus is a ROS 1 based, BSD-3 licensed collection of autonomous drone software packages from [AMOVLab](https://github.com/amov-lab), which provides a full set of solutions for the intelligent and autonomous flight of drones, such as mapping, localization, planning, control, and target detection, fully integrated with the Gazebo Simulator.
