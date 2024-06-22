# 相机

相机对许多[有效载荷使用](../payloads/use_cases.md)很重要，包括绘图和勘测、监视、搜索和救援、作物健康和虫害检测等等。
它们通常安装在一个 [云台](../advanced/gimbal_control.md)上，它能够提供相机稳定性、点跟踪和独立运动。

## 相机类型

PX4 集成了三种类型的相机：

- [MAVLink 相机](../camera/mavlink_v2_camera.md) 支持[Camera Protocol v2](https://mavlink.io/en/services/camera.html) (**推荐**)。
- [简单的 MAVLink 摄像头](../camera/mavlink_v1_camera.md) 支持旧的 [Camera Protocol v1](https://mavlink.io/en/services/camera.html)。
- [飞控输出所附相机](../camera/fc_connected_camera.md)，这些数据使用[Camera Protocol v1](https://mavlink.io/en/services/camera.html)控制。

推荐[MAVLink 摄像头](../camera/mavlink_v2_camera.md)，因为它们使用简单一致的命令/消息集提供了最广泛的相机功能访问。
如果相机不支持该协议，则可以在一台机载计算机上运行[摄像机管理器](../camera/mavlink_v2_camera.md#camera-managers)以在 MAVLink 和相机的本机协议之间进行接口交互。

## 另见

- [云台(相机支架)](../advanced/gimbal_control.md)
- [相机集成/架构](../camera/camera_architecture.md) ( PX4 开发者)
