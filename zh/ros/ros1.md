# ROS 1 和 MAVROS

:::tip
The PX4 development team recommend that users migrate to [ROS 2](../ros2/index.md) (i.e. skip this section)! 它使用 [MAVROS](../ros/mavros_installation.md) 节点与在硬件上运行或使用 [Gazebo 模拟器 ](../simulation/ros_interface.md) 的 PX4 进行通信。

[ROS](../ros/README.md) (机器人操作系统) 是一个通用的机器人库，可以用于为 PX4 自动驾驶仪创建强大的无人机应用程序。

本节包含使用“原始版本的ROS”和[MAVROS](../ros/mavros_installation.md)包通过[MAVLink](../middleware/mavlink.md)与PX4通信相关的主题(MAVROS将ROS主题与MAVLink和PX4协议连接起来)

主要的话题包括：
- [ROS/MAVROS安装指南](../ros/mavros_installation.md): 用ROS1和MAVROS设置一个 PX4 开发环境。
- [ROS/MAVROS Offboard 示例 (C++)](../ros/mavros_offboard_cpp.md): 编写++ MAVROS/ROS节点相关的主要概念。
- [ROS/MAVROS 发送自定义消息](../ros/mavros_custom_messages.md)
- [ROS 与 Gazebo 仿真。](../simulation/ros_interface.md)
- [ROS和Gazabo的Octomap（八叉树地图）模型](../sim_gazebo_classic/octomap.md)
- [在 RPi 上安装 ROS](../ros/raspberrypi_installation.md)
- [外部位置估计(基于视觉/动捕)](../ros/external_position_estimation.md)


## 其他资源

- [PX4 中 ROS 设置](../ros/README.md#ros-setups).
- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - 用于计算机视觉的 ROS + PX4 仿真环境。 [XTDrone 手册](https://www.yuque.com/xtdrone/manual_en) 有你需要的入门资料！
- [Prometheus自主无人机项目](https://github.com/amov-lab/Prometheus/blob/master/README_EN.md) - Prometheus是基于 ROS 1 的自主无人机软件包，来自[阿木实验室](https://github.com/amov-lab)（符合BSD-3许可），为无人机的智能化和自主飞行提供一整套解决办法，如建图、定位和目标检测， [Gazebo classic](../sim_gazebo_classic/README.md) 仿真器集成了以上功能。
