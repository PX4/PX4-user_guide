---
canonicalUrl: https://docs.px4.io/main/en/ros/README
---

# ROS (Robot Operating System)

[ROS](http://www.ros.org/) is a general purpose robotics library that can be used with PX4 for drone application development.
It is only officially supported on Linux platforms.

ROS benefits from an active ecosystem of developers solving common robotics problems, and access to other software libraries written for Linux.
It has been used, for example, as part of the PX4 [computer vision](../computer_vision/README.md) solutions, including [obstacle avoidance](../computer_vision/obstacle_avoidance.md) and [collision prevention](../computer_vision/collision_prevention.md).

:::warning tip
[ROS 2](../ros/ros2.md) is the "latest and greatest" version of ROS.
The PX4 development team recommend that all users [upgrade to ROS 2](../ros/ros2.md)!
:::


## ROS Setups

PX4 supports both the "original" ROS and ROS 2, with the following configurations:

- **[ROS 2](../ros/ros2.md): (Recommended)** PX4 and ROS 2 communicate over the [PX4-ROS 2 bridge](../ros/ros2_comm.md), an interface that provides a direct bridge between PX4 uORB messages and ROS 2 DDS messages/types.
  This effectively allows direct access to PX4 internals from ROS 2 workflows and nodes in realtime.
- **[ROS (1) via ROS 2 Bridge](../ros/ros1_via_ros2.md):** PX4 connects first via the [PX4-ROS 2 bridge](../ros/ros2_comm.md) and then via a second bridge ([ros1_bridge](https://github.com/ros2/ros1_bridge)) between ROS 2 and ROS 1.
- **[ROS (1) via MAVROS](../ros/ros1.md):** PX4 and ROS (1) communicate over [MAVLink](../middleware/mavlink.md), using the [MAVROS](../ros/mavros_installation.md) package to bridge ROS topics to MAVLink.


## ROS Support Roadmap

Unveiled at the [PX4 Developer Summit 2020](https://www.youtube.com/watch?v=lZ8crGI16qA) (and [ROS World 2020](https://www.youtube.com/watch?v=8XRkzHqQSf0)), the PX4 Development team, announced the plans to support microROS.

* microRTPS:  microRTPS bridge with Fast DDS (The current stable ROS 2 interface)
* micro XRCE-DDS: DDS on PX4 (Next step!)
* micro ROS: ROS 2 on the PX4 (Our Target!)

