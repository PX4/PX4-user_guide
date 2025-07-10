---
canonicalUrl: https://docs.px4.io/main/tr/ros/ros2
---

# ROS 2

[ROS 2](https://index.ros.org/doc/ros2/) is the newest version of [ROS](http://www.ros.org/) (Robot Operating System), a general purpose robotics library that can be used with the PX4 Autopilot to create powerful drone applications. It captures most of the learnings and recently added features of [ROS (1)](../ros/ros1.md), improving a number of flaws of the earlier version.

:::warning
Tip
The PX4 development team highly recommend that you use/migrate to this version of ROS!
:::

The translation layer between ROS 2 and PX4 is software known as the [PX4-ROS 2 bridge](../ros/ros2_comm.md). This provides a bridge between PX4 UORB messages and ROS 2 messages and types, effectively allowing direct access to PX4 from ROS 2 workflows and nodes. The bridge uses UORB message definitions and correspondent IDL types to generate code to serialise and deserialise the messages heading in and out of PX4.

The main topics in this section are:
- [ROS 2 User Guide](../ros/ros2_comm.md): an overview how to use ROS 2 with PX4 (covering the PX4-ROS2 bridge, installation/setup, and how to build ROS 2 applications for PX4).
- [ROS 2 microRTPS Offboard Control Example](../ros/ros2_offboard_control.md)

:::note
ROS 2 is officially supported only on Linux platforms.
Ubuntu 20.04 LTS is the official supported distribution.
:::

:::note
To use the [PX4-ROS 2 bridge](../ros/ros2_comm.md) effectively you must (at time of writing) have a reasonable understanding of the PX4 internal architecture and conventions.

This contrasts with ROS (1), which communicates with PX4 via MAVROS/MAVLink, hiding PX4's internal architecture and many of its conventions (e.g. frame and unit conversions).

ROS 2 (and the bridge) will become easier to use as the development team provide ROS 2 APIs to abstract PX4 conventions, along with examples demonstrating their use. These are planned in the near-term PX4 roadmap.
:::


## Further Reading/Information

- [microRTPS bridge](../middleware/micrortps.md): PX4 middleware that underlies the [PX4-ROS 2 bridge](../ros/ros2_comm.md).
- **ROS 1 using ROS 2 as a bridge:** The official ROS 1 Bridge package ([ros1_bridge](https://github.com/ros2/ros1_bridge)) allows ROS 1 and ROS 2 applications to be used in a single setup.

