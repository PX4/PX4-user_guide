# Offboard模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

飞机按照远端控制器通过MAVLink给出的位置，速度或姿态设定值来运行。 设定值可以由运行在配套计算机 (一般通过串口线或wifi与飞孔连接) 上的MAVLink API (如[Dronecode SDK](https://sdk.dronecode.org/en/) 或者 [MAVROS](https://github.com/mavlink/mavros)) 提供。

> **Note**固定翼飞机不支持Offboard模式。 仅支持多旋翼和VTOL机型。

<span></span>

> **Note** * 此模式需要位置或位/姿信息-例如 GPS、光流、视觉惯性里程计、mocap 等。 * 此模式是自动的 (遥控器 [默认](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) 被禁用，仅能用于切换模式)。 * 使用此模式前飞机必须先被激活。 * 在能够使用此模式之前飞机必须已经能够接收到目标设定点的消息流。 * 如果没能以 > 2Hz 的速率接收目标设定值飞机将退出该模式。

## 描述

Offboard模式主要用于控制飞机运动和姿态，目前仅支持MAVLink命令的一个有限子集 (未来将支持更多)。 此模式可用于：

* 控制飞机位置、速度或油门 ([SET_POSITION_TARGET_LOCAL_NED](http://mavlink.org/messages/common#SET_POSITION_TARGET_LOCAL_NED))。 
  * 加速度设定值将被综合计算出一个“油门”设定值。
  * PX4 支持坐标系指定 (`coordinate_frame` 字段): [MAV_FRAME_LOCAL_NED](http://mavlink.org/messages/common#MAV_FRAME_LOCAL_NED) 和 [MAV_FRAME_BODY_NED](http://mavlink.org/messages/common#MAV_FRAME_BODY_NED)。
* 控制飞机姿态/方位 ([SET_ATTITUDE_TARGET](http://mavlink.org/messages/common#SET_ATTITUDE_TARGET))。

Other operations, like taking off, landing, return to launch, are best handled using the appropriate modes. Operations like uploading, downloading missions can be performed in any mode.

A stream of setpoint commands must be received by the vehicle prior to engaging the mode, and in order to remain in the mode (if the message rate falls below 2Hz the vehicle will stop). In order to hold position while in this mode, the vehicle must receive a stream of setpoints for the current position.

Offboard mode requires an active connection to a remote MAVLink system (e.g. companion computer or GCS). If the connection is lost, after a timeout ([COM_OF_LOSS_T](#COM_OF_LOSS_T)) the vehicle will attempt to land or perform some other failsafe action. The action is defined in the parameters [COM_OBL_ACT](#COM_OBL_ACT) and [COM_OBL_RC_ACT](#COM_OBL_RC_ACT).

## Offboard Parameters

*Offboard mode* is affected by the following parameters:

| 参数                                                                                                    | 描述                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_OF_LOSS_T"></span>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | Time-out (in seconds) to wait when offboard connection is lost before triggering offboard lost failsafe (`COM_OBL_ACT` and `COM_OBL_RC_ACT`)                                                                                                             |
| <span id="COM_OBL_ACT"></span>[COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)       | Mode to switch to if offboard control is lost when *not* connected to RC (Values are - 0: [Land](../flight_modes/land.md), 1: [Hold](../flight_modes/hold.md), 2: [Return ](../flight_modes/return.md)).                                                 |
| <span id="COM_OBL_RC_ACT"></span>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | Mode to switch to if offboard control is lost while still connected to RC control (Values are - 0: *Position*, 1: [Altitude](../flight_modes/altitude_mc.md), 2: *Manual*, 3: [Return ](../flight_modes/return.md), 4: [Land](../flight_modes/land.md)). |

## 开发者资源

Typically developers do not directly work at the MAVLink layer, but instead use a robotics API like [Dronecode SDK](https://sdk.dronecode.org/en/) or [ROS](http://www.ros.org/) (these provide a developer friendly API, and take care of managing and maintaining connections, sending messages and monitoring responses - the minutiae of working with *Offboard mode* and MAVLink).

The following resources may be useful for a developer audience:

* [Offboard Control from Linux](https://dev.px4.io/en/ros/offboard_control.html) (PX4 Devguide)
* [MAVROS Offboard control example](https://dev.px4.io/en/ros/mavros_offboard.html) (PX4 Devguide)