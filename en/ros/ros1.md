# ROS (1) with MAVROS

:::tip
The PX4 development team recommend that users migrate to [ROS 2](../ros/ros2.md) (i.e. skip this section)!
:::

[ROS](http://www.ros.org/) (Robot Operating System) is a general-purpose robotics library that can be used to create powerful drone applications for the PX4 Autopilot.

PX4 supports a [number of ROS setups](#other-ros-setups).
This section contains topics related to using the original version of ROS and the [MAVROS](../ros/mavros_installation.md) package to communicate with PX4 over [MAVLink](../middleware/mavlink.md) (MAVROS bridges ROS topics to MAVLink and PX4 conventions).

The main topics covered are:
- [ROS/MAVROS Installation Guide](../ros/mavros_installation.md): Setup a PX4 development environment with ROS (1) and MAVROS.
- [Offboard control with MAVROS](../ros/mavros_offboard.md): Tutorial showing the main concepts related to writing a C++ MAVROS/ROS node.
- [ROS MAVROS Sending Custom Messages](../ros/mavros_custom_messages.md)
- [ROS with Gazebo Simulation](../simulation/ros_interface.md)
- [Gazebo OctoMap Models with ROS](../simulation/gazebo_octomap.md)
- [ROS Installation on RPi](../ros/raspberrypi_installation.md)
- [External Position Estimation (Vision/Motion based)](../ros/external_position_estimation.md)

## Other ROS Setups

PX4 supports three ROS setups:
- **[ROS 2](ros/ros2.md) via PX4-ROS 2 Bridge:** PX4 and ROS 2 communicate over the [PX4-ROS 2 bridge](../ros/ros2_comm.md), an interface that provides a direct bridge between PX4 uORB messages and ROS 2 DDS messages/types.
  This effectively allows direct access to PX4 internals from ROS 2 workflows and nodes in realtime.
- **ROS (1) via ROS2/ROS1 bridge:** PX4 connect first via the ROS 2 bridge and then via a second bridge between ROS 2 and ROS 1 (the [ros1_bridge](https://github.com/ros2/ros1_bridge)).
- **ROS (1) via MAVROS:** PX4 and ROS (1) communicate over [MAVLink](../middleware/mavlink.md), using the [MAVROS](../ros/mavros_installation.md) package to bridge ROS topics to MAVLink.
