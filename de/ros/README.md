# Robotics using ROS

[ROS](http://www.ros.org/) (Robot Operating System) is a general purpose robotics library that can be used with PX4 for [offboard control](../ros/mavros_offboard.md). It uses the [MAVROS](../ros/mavros_installation.md) node to communicate with PX4 running on hardware or using the [Gazebo Simulator](../simulation/ros_interface.md).

This section contains topics about using ROS for offboard control with PX4.

:::tip ROS
is only officially supported on Linux platforms.
:::

# Robotics using ROS 2

[ROS 2](https://index.ros.org/doc/ros2/) is the newest version of ROS. It captures most of the learnings and recently added features of ROS (1), improving a number of flaws of the earlier version.

The translation layer between ROS 2 and PX4 is software known as the [PX4-Fast RTPS(DDS) Bridge](../middleware/micrortps.md). This provides a bridge between PX4 UORB messages and ROS 2 messages and types, effectively allowing direct access to PX4 from ROS 2 workflows and nodes. The bridge uses UORB message definitions and correspondent IDL types to generate code to serialise and deserialise the messages heading in and out of PX4.

For an explanation on how the bridge works, and for some examples, see: [PX4-ROS 2 bridge](../ros/ros2_comm.md).

:::tip
To use the *PX4-Fast RTPS(DDS) Bridge* bridge effectively you must (at time of writing) have a reasonable understanding of the PX4 internal architecture and conventions.

This contrasts with ROS (1), which communicates with PX4 via MAVROS/MAVLink, hiding PX4's internal architecture and many of its conventions (e.g. frame and unit conversions).

ROS 2 (and the bridge) will become easier to use as the development team provide ROS 2 APIs to abstract PX4 conventions, along with examples demonstrating their use. These are planned in the near-term PX4 roadmap.
:::

## Installation

The easiest way to setup PX4 simulation with ROS (on Ubuntu Linux) is to use the standard installation script that can be found at [Development Environment on Linux > Gazebo with ROS](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo). The script installs everything you need: PX4, ROS, the Gazebo simulator, and [MAVROS](../ros/mavros_installation.md).

:::note
If you just need to install ROS then follow the [ROS Melodic installation instructions](http://wiki.ros.org/melodic/Installation) for your platform.
:::


## External Resources

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 simulation environment for computer vision. The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
