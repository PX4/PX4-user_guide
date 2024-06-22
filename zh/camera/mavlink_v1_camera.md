# 简单的 MAVLink 摄像头(Camera Protcol v1)

本节说明了如何使用 PX4 的 MAVLink [相机](../camera/index.md), 实现了 [Camera Protocol v1 (简单触发协议)](https://mavlink.io/en/services/camera_v1.html) 的 PX4 和地面站。

:::warning
[MAVLink 相机](../camera/mavlink_v2_camera.md) 在可能的情况下应该使用 [MAVLink Camera Protocol v2](https://mavlink.io/en/services/camera.html) 代替！
此方法保留用于旧的 MAVLink 相机。
:::

## 概述

[相机协议v1](https://mavlink.io/zh/services/camera_v1.html) 定义了一小组命令，允许用于触发相机进行拍摄：

- 仍然根据时间或距离以频率捕获图像
- 视频捕获
- 有限的相机配置

PX4 支持此命令集以触发通过原生支持协议的相机（如本节所述），以及连接到飞控输出的相机。

地面站和 MAVLink SDK 通常将相机命令发送给自动驾驶仪，然后转发给连接的类型为 '板载' 的 MAVLink 通道。
PX4 还会将其在任务中遇到的任何相机任务项重新发出为相机命令：未被接受的命令将被记录。
在所有情况下，命令都是使用自动驾驶仪的系统 ID 和组件 ID 为0（即发送给所有组件，包括摄像头）。

每次触发图像捕获时 PX4 也会发出一个 [CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER) (相机本身也可能在触发时发出此消息)。

## 控制相机

### MAVLink 命令和消息

[相机协议v1（简单触发协议）](https://mavlink.io/en/services/camera_v1.html)定义了以下命令：

- [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL)
- [MAV_CMD_NAV_CMD_DO_DIGICAM_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_CMD_DO_DIGICAM_CONTROL)
- [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST)
- [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL)
- [MAV_CMD_OBLIQUE_SURVEY](https://mavlink.io/en/messages/common.html#MAV_CMD_OBLIQUE_SURVEY)
- [MAV_CMD_DO_CONTROL_VIDEO](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CONTROL_VIDEO)

MAVLink 摄像头将支持这些命令的一些子集。
由于协议没有发现过程的功能，唯一的方法是检查响应中返回的[COMMAND_ACK](https://mavlink.io/en/messages/common.html#COMMAND_ACK)。

相机在每次拍摄图像时也应发出[CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER)。

[Camera Protocol v1](https://mavlink.io/zh/services/camera_v1.html) 更详细地描述了协议。

### 地面站

Ground stations can use any commands in the [Camera Protocol v1 (Simple Trigger Protocol)](https://mavlink.io/en/services/camera_v1.html) and should address them to the autopilot component id.
If the commands are not supported by the camera, it will return a [COMMAND_ACK](https://mavlink.io/en/messages/common.html#COMMAND_ACK) with an error result.

Generally the commands are addressed to the autopilot, because this works whether the camera is connected via MAVLink or directly to the flight controller.
If addressed to the autopilot PX4 will emit [CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER) each time an image is captured, and may log the camera capture event.

<!-- "May" because the camera feedback module is "supposed"  to log just camera capture from a capture pin connected to camera hotshoe, but currently logs all camera trigger events from the camera trigger driver https://github.com/PX4/PX4-Autopilot/pull/23103 -->

In theory you might also address commands to the camera directly.

### 任务中的相机命令

The following [Camera Protocol v1 (Simple Trigger Protocol)](https://mavlink.io/en/services/camera_v1.html) commands can be used in missions (this is the same list as above).

- [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL)
- [MAV_CMD_NAV_CMD_DO_DIGICAM_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_CMD_DO_DIGICAM_CONTROL)
- [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST)
- [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL)
- [MAV_CMD_OBLIQUE_SURVEY](https://mavlink.io/en/messages/common.html#MAV_CMD_OBLIQUE_SURVEY)
- [MAV_CMD_DO_CONTROL_VIDEO](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CONTROL_VIDEO)

PX4 re-emits them with the same system ID as the autopilot and component ID of [MAV_COMP_ID_ALL](https://mavlink.io/en/messages/common.html#MAV_COMP_ID_ALL):

<!-- See camera_architecture.md topic for detail on how this is implemented -->

### 手动控制

Manual triggering using these cameras is not supported (for either Joystick or RC Controllers).

## PX4 配置

<!-- set up the mode and triggering -->

### MAVLink 端口和转发配置

Connect PX4 to your MAVLink camera by attaching it to an unused serial port on your flight controller, such as `TELEM2`.
You can then configure the port as a [MAVLink Peripheral](../peripherals/mavlink_peripherals.md).
The document explains how, but in summary:

1. Modify an unused `MAV_n_CONFIG` parameter, such as [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG), so that it is assigned to port to which your camera is connected.
2. Set the corresponding [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) to `2` (Onboard).
   This ensures that the right set of MAVLink messages are emitted and forwarded.
3. You may need to set some of the other parameters, depending on your connection - such as the baud rate.

Then connect and configure the camera as recommended in its user guide.

<!-- Removed this because I am pretty sure forwarding happens automatically for this set. Keeping it simple.
1. Set [MAV_2_FORWARD](../advanced_config/parameter_reference.md#MAV_2_FORWARD) if you want to enable forwarding of MAVLink messages to other ports, such as the one that is connected to the ground station.
-->

### 相机模式和触发

Configure the PX4 camera driver to enable the MAVLink camera backend, and set the triggering mode to capture on command in survey missions.

Using _QGroundControl_:

- Open [Vehicle Setup > Camera](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/camera.html#px4-camera-setup).
- Set the values as shown:

  ![Camera Setup Screen - Trigger mode and interface for MAVLink](../../assets/camera/mavlink_camera_settings.png)

::: info
You can also [set the parameters directly](../advanced_config/parameters.md):

- [TRIG_MODE](../advanced_config/parameter_reference.md#TRIG_MODE) — `4`: 基于距离，按命令触发 (勘测模式)
- [TRIG_INTERFACE](../advanced_config/parameter_reference.md#TRIG_INTERFACE) — `3`: MAVLink

:::
