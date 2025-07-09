---
canonicalUrl: https://docs.px4.io/main/zh/ros/ros2
---

# ROS 2

[ROS 2](https://index.ros.org/doc/ros2/) 是[ROS](http://www.ros.org/) (机器人操作系统)最新版本 ， 一个通用的机器人库，可以与 PX4 自驾仪一起创建强大的无人机应用。 它继承了 [ROS 1](../ros/ros1.md)的大部分经验和特征，改进了早期版本的一些缺陷。

:::warning
提示
PX4开发团队强烈建议您使用/迁移到这个版本的ROS！
:::

ROS 2 和 PX4 之间的通信使用中间件实现 [XRCE-DDS 协议](../middleware/uxrce_dds.md)。 这个中间件将PX4的 [uORB 消息](../msg_docs/README.md) 作为ROS 2 消息和类型直接使用，非常高效地实现 ROS 2 工作空间和节点直接访问 PX4。 中间件使用 uORB 消息定义生成代码来序列化和反序列化来处理PX4 的收发消息。 These same message definitions are used in ROS 2 applications to allow the messages to be interpreted.

为了在 XRCE-DDS 上高效使用 [ROS 2](../ros/ros2_comm.md) ， (撰写本文时)你必须对PX4内部结构和约定有一定的理解，以明确与使用 ROS 有哪些不同。 我们计划近期提供ROS 2 API 以对 PX4 的特性进行封装，并举例说明它们的用途。

本节的主要主题是：
- [ROS 2 用户指南](../ros/ros2_comm.md): PX4 视角下的 ROS 2，包括安装、设置和如何构建与 PX4 通信的 ROS 2 应用。
- [ROS 2 Offboard 控制示例](../ros/ros2_offboard_control.md)

:::note
ROS 2 仅在 Linux 平台上提供官方支持。
Ubuntu 20.04 LTS 是官方支持的版本。
:::


:::note ROS2 也可以使用 [MAVROS](https://github.com/mavlink/mavros/tree/ros2/mavros) 连接到 PX4 (而不是 XRCE-DDS)。 MAVROS项目支持此选项。
:::


## 更多信息

- [ROS 2 用户指南](../ros/ros2_comm.md)
- [XRCE-DDS(PX4-ROS 2/DDS桥)](../middleware/uxrce_dds.md): PX4 中间件用于连接到ROS2

