# Offboard 模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

飞机遵守 MAVLink 提供的位置，速度或姿态设定值。 设定值可以由机载计算机上运行的 MAVLink API（例如 [MAVSDK](https://mavsdk.mavlink.io/) 或 [MAVROS](https://github.com/mavlink/mavros)）提供（通常通过串口或 wifi 连接）。

:::tip
并非所有设定值消息和无人机都支持 MAVLink 允许的所有坐标系和字段值。 请*仔细*阅读以下章节，确保仅使用支持的值。 还请注意，在进入模式之前和模式可操作时，设定点必须以 > 2Hz 的速率进行传输。
:::

:::note

* 此模式需要位置或位/姿信息 - 例如 GPS、光流、视觉惯性里程计、mocap 等。
* 除了更改模式外， 禁止遥控器控制。
* 使用此模式前必须先解锁。
* 在启用此模式前，无人机必须已经收到**目标设定值数据流（> 2Hz）**。
* 如果未以 > 2Hz的速率接收到目标设定值，则无人机将退出该模式。
* 并非所有坐标帧和字段值 MAVLink都支持。
:::

## 描述

Offboard 模式主要用于控制飞机运动和姿态，目前仅支持 MAVLink 消息的一个有限子集（未来将支持更多）。

其他操作, 如起飞、降落、返航，最好使用适当的模式来处理。 像上传、下载任务这样的操作可以在任何模式下执行。

在进入该模式之前，无人机必须收到设定值数据流，并且保持在该模式下（如果消息速率降至 2Hz 以下，无人机将停止）。 为了在此模式下保持位置，必须向无人机提供一个包含当前位置设定值的数据流。

Offboard 模式需要主动连接到远程 MAVLink 系统 （例如机载计算机或 GCS）。 如果连接丢失，在超时 ([COM_OF_LOSS_T](#COM_OF_LOSS_T)) 后，无人机将尝试降落或执行其他故障失效保护操作。 该动作定义在参数 [COM_OBL_ACT](#COM_OBL_ACT) 和 [COM_OBL_RC_ACT](#COM_OBL_RC_ACT) 中。

## 支持的消息

### 直升机/垂直起降

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * 支持以下输入组合： <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 位置设置值 （仅 `x`，`y`，`z`）
    * 速度设定值（仅 `vx`，`yy`，`vz`）
    * 加速度设定值（仅 `afx`，`afy`，`afz`）
    * 位置设定值**和**速度设定值（速度设定值作为前置反馈；它被加到位置控制器的输出中，并且结果被用作速度控制器的输入）。
    * 位置设定值**和**速度设定值**和**加速度（加速度设定值作为前置反馈；它被加到位置控制器的输出中，并且结果被用作速度控制器的输入）。
  * * PX4 支持以下 `坐标系` 值（仅限）： [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 和 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED)。

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * 支持以下输入组合： <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 位置设定值（仅`lat_int`，`lon_int`，`alt`）
    * 速度设定值（仅`vx`，`yy`，`vz`）
    * *推力*设定值（仅`afx`，`afy`，`afz`）
    
    :::note 映射加速度设定值以创建正常的推力设定值（即不支持加速度设定值）。
:::
    
    * Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
  * PX4 supports the following `coordinate_frame` values (only): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * The following input combinations are supported: 
    * Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).
    * Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).

### 固定翼

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * The following input combinations are supported (via `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (`x`, `y`, `z` only; velocity and acceleration setpoints are ignored).
      
      * Specify the *type* of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern): :::note Some of the *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field.
:::
        
        The values are:
        
        * 292: Gliding setpoint. This configures TECS to prioritize airspeed over altitude in order to make the vehicle glide when there is no thrust (i.e. pitch is controlled to regulate airspeed). It is equivalent to setting `type_mask` as `POSITION_TARGET_TYPEMASK_Z_IGNORE`, `POSITION_TARGET_TYPEMASK_VZ_IGNORE`, `POSITION_TARGET_TYPEMASK_AZ_IGNORE`. 
        * 4096: Takeoff setpoint.
        * 8192: Land setpoint.
        * 12288: Loiter setpoint (fly a circle centred on setpoint).
        * 16384: Idle setpoint (zero throttle, zero roll / pitch).
  * PX4 支持坐标系指定 (`coordinate_frame` 字段): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 和 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED)。

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * The following input combinations are supported (via `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `lat_int`, `lon_int`, `alt`)
      
      * Specify the *type* of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern):
        
        :::note The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field.
:::
        
        The values are:
        
        * 4096: Takeoff setpoint.
        * 8192: Land setpoint.
        * 12288: Loiter setpoint (fly a circle centred on setpoint).
        * 16384: Idle setpoint (zero throttle, zero roll / pitch).
  * PX4 supports the following `coordinate_frame` values (only): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * The following input combinations are supported: 
    * Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).
    * Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).

<!-- Limited for offboard mode in Fixed Wing was added to master after PX4 v1.9.0.
See https://github.com/PX4/PX4-Autopilot/pull/12149 and https://github.com/PX4/PX4-Autopilot/pull/12311 -->

### Rover

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * The following input combinations are supported (in `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `x`, `y`, `z`)
      
      * Specify the *type* of the setpoint in `type_mask`:
      
      :::note The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field. ::
      
          The values are:
          
          - 12288: Loiter setpoint (vehicle stops when close enough to setpoint).
          
    
    * Velocity setpoint (only `vx`, `yy`, `vz`)
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * The following input combinations are supported (in `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `lat_int`, `lon_int`, `alt`)
  * Specify the *type* of the setpoint in `type_mask` (not part of the MAVLink standard). The values are: 
    * Following bits not set then normal behaviour.
    * 12288: Loiter setpoint (vehicle stops when close enough to setpoint).
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * The following input combinations are supported: 
    * Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`). :::note Only the yaw setting is actually used/extracted.
:::

## Offboard参数

*Offboard mode* is affected by the following parameters:

| 参数                                                                                                      | 描述                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_OF_LOSS_T"></span>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | 在丢失Offboard连接时的等待超时 (以秒为单位), 然后将触发offboard丢失的故障保护措施 (`COM_OBL_ACT` 和 `COM_OBL_RC_ACT`)                                                                                                                                                                                                                                                    |
| <span id="COM_OBL_ACT"></span>[COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)         | *没有* 连接到遥控器的情况下, 丢失offboard连接后切换到的模式 (取值为- 0: [Land](../flight_modes/land.md), 1: [Hold](../flight_modes/hold.md), 2: [Return ](../flight_modes/return.md))。                                                                                                                                                                              |
| <span id="COM_OBL_RC_ACT"></span>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | 连接到遥控器的情况下，丢失offboard连接后切换到的模式 (取值为 - 0: *Position*, 1: [Altitude](../flight_modes/altitude_mc.md), 2: *Manual*, 3: [Return ](../flight_modes/return.md), 4: [Land](../flight_modes/land.md))。                                                                                                                                            |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled, stick movement on a multicopter (or VTOL in multicopter mode) gives control back to the pilot in [Position mode](../flight_modes/position_mc.md) (except when vehicle is handling a critical battery failsafe). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |

## 开发者资源

Typically developers do not directly work at the MAVLink layer, but instead use a robotics API like [MAVSDK](https://mavsdk.mavlink.io/) or [ROS](http://www.ros.org/) (these provide a developer friendly API, and take care of managing and maintaining connections, sending messages and monitoring responses - the minutiae of working with *Offboard mode* and MAVLink).

The following resources may be useful for a developer audience:

* [Offboard Control from Linux](../ros/offboard_control.md) (PX4 Devguide)
* [MAVROS Offboard control example](../ros/mavros_offboard.md) (PX4 Devguide)