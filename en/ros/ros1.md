# ROS (1) with MAVROS

:::tip
The PX4 development team recommend that users migrate to [ROS 2](../ros/ros2.md) (i.e. skip this section)!
:::

[ROS](http://www.ros.org/) (Robot Operating System) is a general-purpose robotics library that can be used to create powerful drone applications for the PX4 Autopilot.

PX4 supports three ROS setups:
- "ROS 2" communicating with PX4 over the [PX4-ROS 2 bridge](../ros/ros2_comm.md), an interface that provides a direct bridge between PX4 uORB messages and ROS 2 DDS messages/types (effectively allowing direct access to PX4 Autopilot internals from ROS 2 workflows and nodes in realtime).
- "ROS (1)" communicating with PX4 via the [ros1_bridge](https://github.com/ros2/ros1_bridge) and *then* the ROS 2 bridge (above).
- "ROS (1)" (the original version) communicating with PX4 over [MAVLink](../middleware/mavlink.md), using the [MAVROS](../ros/mavros_installation.md) package to bridge ROS topics to MAVLink.

This section contains topics related to using last setup - using ROS (1) with MAVROS.
The main topics covered are:
- [ROS/MAVROS Installation Guide](../ros/mavros_installation.md): Setup a PX4 development environment with ROS (1) and MAVROS.
- [Offboard control with MAVROS](../ros/mavros_offboard.md): Tutorial showing the main concepts related to writing a C++ MAVROS/ROS node.
- [ROS MAVROS Sending Custom Messages](../ros/mavros_custom_messages.md)
- [ROS with Gazebo Simulation](../simulation/ros_interface.md)
- [Gazebo OctoMap Models with ROS](../simulation/gazebo_octomap.md)
- [ROS Installation on RPi](../ros/raspberrypi_installation.md)
- [External Position Estimation (Vision/Motion based)](../ros/external_position_estimation.md)

:::note
ROS is used in several PX4 computer vision solutions, including [Obstacle Avoidance](../computer_vision/obstacle_avoidance.md) and [Collision Prevention](../computer_vision/collision_prevention.md).
:::
