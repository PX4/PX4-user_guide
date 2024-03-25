# ROS (Robot Operating System)

ROS是一个通用的机器人库，可以与PX4一起用于无人机应用程序开发。

ROS得益于一个活跃的生态系统，在这个生态系统里，开发者会解决常见的机器人问题，他们也有权使用为Linux编写的其他软件库。 例如，它已被用作PX4[计算机视觉](../computer_vision/README.md)解决方案的一部分，包括[自主避障](../computer_vision/obstacle_avoidance.md)和[防撞](../computer_vision/collision_prevention.md)。

:::注意：[ROS 2](../ros/ros2.md) 是ROS的“最新和最好的”版本。PX4开发团队建议所有用户升级到ROS 2! PX4开发团队建议所有用户[升级到ROS 2](../ros/ros2.md)!
:::


## ROS Setups

PX4 supports both ROS 2 and ROS 1, with the following configurations:

- **[ROS 2](../ros/ros2.md): (Recommended)** PX4 and ROS 2 communicate over the [PX4-ROS 2 bridge](../ros/ros2_comm.md), an interface that provides a direct bridge between PX4 uORB messages and ROS 2 DDS messages/types. This effectively allows direct access to PX4 internals from ROS 2 workflows and nodes in realtime.
- **[ROS 1 via MAVROS](../ros/ros1.md):** PX4 and ROS 1 communicate over [MAVLink](../middleware/mavlink.md), using the [MAVROS](../ros/mavros_installation.md) package to bridge ROS topics to MAVLink.

:::note ROS
2 can also connect with PX4 using [MAVROS](https://github.com/mavlink/mavros/tree/ros2/mavros) (instead of XRCE-DDS). This option is supported by the MAVROS project.
:::

Note that ROS 2 can be installed on Ubuntu Linux, macOS, Windows, while ROS 1 is only available on Linux. Although it might work on the other platforms, PX4 primarily tests and documents ROS on _Linux_.


## ROS Support Roadmap

Unveiled at the [PX4 Developer Summit 2020](https://www.youtube.com/watch?v=lZ8crGI16qA) (and [ROS World 2020](https://www.youtube.com/watch?v=8XRkzHqQSf0)), the PX4 Development team, announced the plans to support microROS.

* microRTPS: microRTPS bridge with Fast DDS (The ROS 2 interface in PX4 v1.13 and earlier)
* micro XRCE-DDS: DDS on PX4 (The ROS 2 interface for PX4 v1.14 and later)
* micro ROS: ROS 2 running in PX4 - "microROS" (Our Target!)
