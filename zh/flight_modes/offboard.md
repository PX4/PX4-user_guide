# Offboard 模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

飞机按照远端控制器通过MAVLink给出的位置，速度或姿态设定值来运行。 设定值可以由运行在配套计算机 (一般通过串口线或wifi与飞孔连接) 上的MAVLink API (如[Dronecode SDK](https://sdk.dronecode.org/en/) 或者 [MAVROS](https://github.com/mavlink/mavros)) 提供。

> **Note** 固定翼飞机不支持 Offboard 模式。 仅支持多旋翼和 VTOL 机型。

<span></span>

> **Note** * 此模式需要位置或位/姿信息-例如 GPS、光流、视觉惯性里程计、mocap 等。 * 此模式是自动的 (遥控器 [默认](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) 被禁用，仅能用于切换模式)。 * 使用此模式前飞机必须先被激活。 * 在能够使用此模式之前飞机必须已经能够接收到目标设定点的消息流。 * 如果没能以 > 2Hz 的速率接收目标设定值飞机将退出该模式。

## 描述

Offboard 模式主要用于控制飞机运动和姿态，目前仅支持 MAVLink 命令的一个有限子集（未来将支持更多）。 此模式可用于：

* Control vehicle position, velocity, or thrust ([SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)). 
  * 加速度设定值将被综合计算出一个“油门”设定值。
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).
* Control vehicle attitude/orientation ([SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)).

其他操作, 如起飞、降落、返回起飞点，最好使用其它适当的模式来处理。 上传、下载任务等操作可以在任何模式下执行。

要启用或保持该模式, 飞机必须先接收到一个提供设定值的消息流 (如果消息速率低于 2Hz 飞机将退出该模式)。 如果要在此模式下做位置保持，必须向飞机提供一个包含当前位置设定值的消息流。

Offboard模式需要主动连接到远程 MAVLink 系统 (例如配套计算机或GCS)。 如果连接丢失, 在超时 ([COM_OF_LOSS_T](#COM_OF_LOSS_T)) 后, 飞机将尝试降落或执行其他故障保护操作。 故障保护操作在参数 [COM_OBL_ACT](#COM_OBL_ACT) 和 [COM_OBL_RC_ACT](#COM_OBL_RC_ACT) 中定义。

## Offboard参数

*Offboard模式*受以下参数影响：

| 参数                                                                                                    | 描述                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_OF_LOSS_T"></span>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | 在丢失Offboard连接时的等待超时 (以秒为单位), 然后将触发offboard丢失的故障保护措施 (`COM_OBL_ACT` 和 `COM_OBL_RC_ACT`)                                                                                                         |
| <span id="COM_OBL_ACT"></span>[COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)       | *没有* 连接到遥控器的情况下, 丢失offboard连接后切换到的模式 (取值为- 0: [Land](../flight_modes/land.md), 1: [Hold](../flight_modes/hold.md), 2: [Return ](../flight_modes/return.md))。                                   |
| <span id="COM_OBL_RC_ACT"></span>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | 连接到遥控器的情况下，丢失offboard连接后切换到的模式 (取值为 - 0: *Position*, 1: [Altitude](../flight_modes/altitude_mc.md), 2: *Manual*, 3: [Return ](../flight_modes/return.md), 4: [Land](../flight_modes/land.md))。 |

## 开发者资源

通常, 开发人员不会直接在 MAVLink 层工作, 而是使用像 [Dronecode SDK](https://sdk.dronecode.org/en/) 或 [ROS](http://www.ros.org/) (这些技术提供了对开发人员友好的 API, 并负责管理和维护连接、发送消息和监视响应——类似这样的使用 *Offboard模式</2 > 和MAVLink的细节问题)。</p> 

以下资源可能对开发者有用:

* [基于Linux的Offboard控制](https://dev.px4.io/en/ros/offboard_control.html) (PX4 Devguide)
* [MAVROS Offboard控制示例](https://dev.px4.io/en/ros/mavros_offboard.html) (PX4 Devguide)