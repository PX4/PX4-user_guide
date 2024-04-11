# ROS(机器人操作系统)

ROS是一个通用的机器人库，可以与PX4一起用于无人机应用程序开发。

ROS得益于一个活跃的生态系统，在这个生态系统里，开发者会解决常见的机器人问题，他们也有权使用为Linux编写的其他软件库。 例如，它已被用作PX4[计算机视觉](../computer_vision/README.md)解决方案的一部分，包括[自主避障](../computer_vision/obstacle_avoidance.md)和[防撞](../computer_vision/collision_prevention.md)。

:::warning
tip [ROS 2](../ros/ros2.md) 是ROS的 "最新和最好的" 的版本 PX4开发团队建议所有用户[升级到ROS 2](../ros/ros2.md)!
:::


## ROS设置

PX4同时支持ROS2和ROS1，配置如下：

- **[ROS 2](../ros/ros2.md)：(推荐)**PX4和ROS 2通过[PX4-ROS 2桥接](../ros/ros2_comm.md)通信，PX4-ROS 2桥接是在PX4 uORB消息和ROS 2 DDS消息/类型之间提供直接桥接的接口 这允许实时地从ROS2工作流和节点直接访问PX4内部
- **[ROS1通过MAVROS](../ros/ros1.md)：**PX4和ROS1通过[MAVLink](../middleware/mavlink.md)通信，使用[MAVROS](../ros/mavros_installation.md)包将ROS主题连接到MAVLink

::: info ROS 2 can also connect with PX4 using [MAVROS](https://github.com/mavlink/mavros/tree/ros2/mavros) (instead of XRCE-DDS). MAVROS项目支持此选项。 ::: info that ROS 2 can be installed on Ubuntu Linux, macOS, Windows, while ROS 1 is only available on Linux. 虽然它可以在其他平台上工作，但PX4主要在_Linux_上测试和记录ROS


## ROS技术支持计划

在[2020年PX4开发者峰会](https://www.youtube.com/watch?v=lZ8crGI16qA)(以及[ROS World 2020](https://www.youtube.com/watch?v=8XRkzHqQSf0)) 上，PX4宣布了支持microROS的计划。

* microRTPS: 具有快速DDS的microRTPS桥接 (PX4 v1.13 及更早版本的ROS 2 接口)
* micro XRCE-DDS: PX4上的DDS(PX4 v1.14及更高版本的ROS 2 接口)
* micro ROS: 在PX4上运行的ROS 2 - "microROS" (我们的目标!)
