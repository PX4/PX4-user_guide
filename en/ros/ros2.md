# ROS 2

[ROS 2](https://index.ros.org/doc/ros2/) is the newest version of [ROS](http://www.ros.org/) (Robot Operating System), a general purpose robotics library that can be used with the PX4 Autopilot to create powerful drone applications.
It captures most of the learnings and features of [ROS 1](../ros/ros1.md), improving a number of flaws of the earlier version.

:::warning Tip
The PX4 development team highly recommend that you use/migrate to this version of ROS!
:::

Communication between ROS 2 and PX4 uses middleware that implements the [XRCE-DDS protocol](../middleware/xrce_dds.md).
This middleware exposes PX4 [uORB messages](../msg_docs/README.md) as ROS 2 messages and types, effectively allowing direct access to PX4 from ROS 2 workflows and nodes.
The middleware uses UORB message definitions to generate code to serialise and deserialise the messages heading in and out of PX4.
These same message definitions are used in ROS 2 applications to allow the messages to be interpretted.

The main topics in this section are:
- [ROS 2 User Guide](../ros/ros2_comm.md): A PX4-centric overview of ROS 2, covering installation, setup, and how to build ROS 2 applications that communicate with PX4.
- [ROS 2 Offboard Control Example](../ros/ros2_offboard_control.md)

:::note
ROS 2 is officially supported only on Linux platforms.
Ubuntu 20.04 LTS is the official supported distribution.
:::

:::note
To use the [ROS 2](../ros/ros2_comm.md) effectively you must (at time of writing) have a reasonable understanding of the PX4 internal architecture and conventions.

This contrasts with ROS 1, which communicates with PX4 via MAVROS/MAVLink, hiding PX4's internal architecture and many of its conventions (e.g. frame and unit conversions).

ROS 2 (and the bridge) will become easier to use as the development team provide ROS 2 APIs to abstract PX4 conventions, along with examples demonstrating their use.
These are planned in the near-term PX4 roadmap.
:::


## Further Reading/Information

- [ROS 2 User Guide](../ros/ros2_comm.md)
- [XRCE-DDS (PX4-ROS 2/DDS Bridge)](../middleware/xrce_dds.md): PX4 middleware for connecting to ROS 2.
- **ROS 1 using ROS 2 as a bridge:** The official ROS 1 Bridge package ([ros1_bridge](https://github.com/ros2/ros1_bridge)) allows ROS 1 and ROS 2 applications to be used in a single setup.

