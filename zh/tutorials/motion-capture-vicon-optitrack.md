# 使用 Motion Capture 飞行（VICON，Optitrack）

> **Warning** **WORK IN PROGRESS**. This topic shares significant overlap with [External Position Estimation (ROS)](../ros/external_position_estimation.md). 该主题与 [External Position Estimation (ROS)](../ros/external_position_estimation.md) 是重叠的。

Indoor motion capture systems like VICON and Optitrack can be used to provide position and attitude data for vehicle state estimation, orto serve as ground-truth for analysis. The motion capture data can be used to update PX4's local position estimate relative to the local origin. Heading (yaw) from the motion capture system can also be optionally integrated by the attitude estimator. 动作捕捉数据可用于更新 PX4 相对于本地原点的本地位置估计。 来自运动捕捉系统的航向（偏航）也可以由姿态估计器可选地集成。

Pose (position and orientation) data from the motion capture system is sent to the autopilot over MAVLink, using the [ATT_POS_MOCAP](https://mavlink.io/en/messages/common.html#ATT_POS_MOCAP) message. See the section below on coordinate frames for data representation conventions. The [mavros](../ros/mavros_installation.md) ROS-Mavlink interface has a default plugin to send this message. 这些消息也可以直接使用MAVLINK库并编写C/C++代码来发送和接收。 请参阅下面有关数据表示约定的坐标框架的部分。 [mavros](../ros/mavros_installation.md) ROS-Mavlink 接口有一个默认插件来发送此消息。 这些消息也可以直接使用MAVLINK库并编写C/C++代码来发送和接收。

## 计算架构

It is **highly recommended** that you send motion capture data via an **onboard** computer (e.g Raspberry Pi, ODroid, etc.) for reliable communications. The onboard computer can be connected to the motion capture computer through WiFi, which offers reliable, high-bandwidth connection. 机载计算机可以通过WiFi连接到动作捕捉计算机，提供可靠的高带宽连接。

大多数标准遥测链路（如 3DR/SiK 无线电）**不** 适合高带宽运动捕捉应用。

## 坐标系

本节演示如何使用适当的参考坐标系。 关于坐标系有各种各样的表示, 但我们将使用其中两个: ENU 和 NED。

* ENU is a ground-fixed frame where **X** axis points East, **Y** points North and **Z** up. The robot/vehicle body frame is **X** towards the front, **Z** up and **Y** towards the left. 机器人/车身框架朝向前方 **X**，向左朝向 **Z** 和 **Y**。
* NED has **X** towards North, **Y** East and **Z** down. The robot/vehicle body frame has **X** towards the front, **Z** down and **Y** accordingly. 机器人/车身框架具有朝向前方的 **X**，相应地具有 **Z** 和 **Y**。

框架如下所示。 Frames are shown in the image below. NED on the left, ENU on the right: ![参考机架](../../assets/lpe/ref_frames.png)

然而，利用外部航向估计，磁北被忽略并且用对应于世界 *x* 轴的矢量（其可以在 mocap 校准处自由放置）伪造; 偏航角将给予局部 *x*。

> **Warning** 在动作捕捉软件中创建刚体时，请记住首先将机器人与世界 **X** 轴对齐，否则偏航估计将具有初始偏移。


## Estimator 选择

### LPE 和态度估计 Q

### EKF2


The ROS topic for motion cap `mocap_pose_estimate` for mocap systems and `vision_pose_estimate` for vision. 有关详细信息, 请检查 [ mavros_extras ](http://wiki.ros.org/mavros_extras)。 有关详细信息, 请检查 [ mavros_extras ](http://wiki.ros.org/mavros_extras)。


## 测试

## 故障处理
