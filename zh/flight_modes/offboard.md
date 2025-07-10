---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/offboard
---

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
    
:::note
映射加速度设定值以创建正常的推力设定值（即不支持加速度设定值）。
:::
    
    * 位置设定值**和**速度设定值（速度设定值作为前置反馈；它被加到位置控制器的输出中，并且结果被用作速度控制器的输入）。
  * PX4 支持以下 `coordinate_frame` 值(仅限)： [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL)。

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * 支持以下输入组合： 
    * 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的姿态和方向（`SET_ATTITUDE_TARGET.q`）。
    * 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的机身速率（`SET_ATTITUDE_TARGET` `.body_roll_rate` ，`.body_pitch_rate`，`.body_yaw_rate`）。

* [MAV_CMD_DO_CHANGE_SPEED](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CHANGE_SPEED)
  
  * 当使用 [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED) 或 [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT) 导航时，允许更改巡航速度。

### 固定翼

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * 支持以下输入组合（通过 `type_mask`）： <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 位置设定值（仅` x `，` y `，` z `；速度和加速度设定值被忽略）。
      
      * 在`type_mask`中指定设定值的*type*（如果未设置这些位，无人机将以花朵状飞行）： :::note 下面的某些*设置点类型*值不是 MAVLink ` type_mask `字段标准的部分。
:::
        
        值为：
        
        * 292：滑动设定值。 这会将 TECS 配置为空速优先于高度，以便在没有推力时使无人机滑行（即控制俯仰以调节空速）。 这相当于设置 `type_mask` 为 `POSITION_TARGET_TYPEMASK_Z_IGNORE`，`POSITION_TARGET_TYPEMASK_VZ_IGNORE`，`POSITION_TARGET_TYPEMASK_AZ_IGNORE`。 
        * 4096：起飞设定值。
        * 8192：降落设定值。
        * 12288：悬停设定值（以设定值为中心绕圈飞行）。
        * 16384：空闲设定值（油门为0， 横滚 / 俯仰为0）。
  * PX4 支持坐标系指定 (`coordinate_frame` 字段): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 和 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED)。

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * 支持以下输入组合（通过 `type_mask`）： <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 位置设定值（仅`lat_int`，`lon_int`，`alt`）
      
      * 在`type_mask`中指定设定值的*type*（如果未设置这些位，无人机将以花朵状飞行）：
        
:::note
下面的某些*设置点类型*值不是 MAVLink ` type_mask `字段标准的部分。
:::
        
        值为：
        
        * 4096：起飞设定值。
        * 8192：降落设定值。
        * 12288：悬停设定值（以设定值为中心绕圈飞行）。
        * 16384：空闲设定值（油门为0， 横滚 / 俯仰为0）。
  * PX4 支持以下 `coordinate_frame` 值(仅限)： [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL)。

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * 支持以下输入组合： 
    * 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的姿态和方向（`SET_ATTITUDE_TARGET.q`）。
    * 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的机身速率（`SET_ATTITUDE_TARGET` `.body_roll_rate` ，`.body_pitch_rate`，`.body_yaw_rate`）。

* [MAV_CMD_DO_CHANGE_SPEED](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CHANGE_SPEED)
  
  * 当导航使用 [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED) 或者 [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT) 时，允许更改巡航速度。

<!-- Limited for offboard mode in Fixed Wing was added to master after PX4 v1.9.0.
See https://github.com/PX4/PX4-Autopilot/pull/12149 and https://github.com/PX4/PX4-Autopilot/pull/12311 -->

### 无人车

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * 支持以下输入组合(在 `type_mask` 中)： <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 位置设置值 （仅 `x`，`y`，`z`）
      
      * 在 `type_mask` 中指定 *类型* 的设置点类型：
      
:::note
下面的 *设置点类型* 值不是 `type_mask` 字段的 MAVLink 标准的一部分。 ::
      
          值为：
          
          - 12288：悬停设定值(无人机停在足够接近设置点)。
          
    
    * 速度设定值（仅 `vx`，`yy`，`vz`）
  * PX4 支持坐标系（`coordinate_frame` 字段）： [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 和 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED)。

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * 支持以下输入组合（在 `type_mask` 中）： <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 位置设定值（仅`lat_int`，`lon_int`，`alt`）
  * 在 `type_mask` 中指定设定值的 *type* （不是 MAVLink 标准的一部分）。 值为： 
    * 下面的比特位没有置位，是正常表现。
    * 12288：悬停设定值（无人机足够接近设定值时会停止）。
  * PX4 支持坐标系（`corrdinate_frame`字段）：[MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL)。

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * 支持以下输入组合： 
    * 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的姿态和方向（`SET_ATTITUDE_TARGET.q`）。 :::note 实际仅使用/提取了偏航设置。
:::

## Offboard参数

*Offboard 模式* 受以下参数影响：

| 参数                                                                                                      | 描述                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_OF_LOSS_T"></span>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | 丢失 Offboard 连接时的等待超时时间（以秒为单位），然后将触发 offboard 丢失的失效保护措施 (`COM_OBL_ACT` 和 `COM_OBL_RC_ACT`)                                                                            |
| <span id="COM_OBL_ACT"></span>[COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)         | 在*没有* 连接到遥控器的情况下，如果丢失 offboard 控制，则切换换到该模式（值为 - 0：[降落](../flight_modes/land.md)，1：[保持](../flight_modes/hold.md)，2：[返航](../flight_modes/return.md)）。                  |
| <span id="COM_OBL_RC_ACT"></span>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | 连接到遥控器的情况下，如果丢失 offboard 控制， 则切换到该模式 （取值为 - 0：*位置*，1：[高度](../flight_modes/altitude_mc.md)，2：*手动*，3：[返航](../flight_modes/return.md)，4：[降落](../flight_modes/land.md)）。 |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 控制多旋翼（或者多旋翼模式下的 VOTL）的摇杆移动量来切换到 [位置模式](../flight_modes/position_mc.md)。 默认情况下未启用此功能。                                                                                 |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | 导致发射机切换到 [位置模式](../flight_modes/position_mc.md) 的摇杆移动量（如果 [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) 已启用）。                                                                |

## 开发者资源

通常，开发人员不直接在 MAVLink 层工作，而是使用机器人 API，例如 [ MAVSDK ](https://mavsdk.mavlink.io/) 或 [ ROS ](http://www.ros.org/)（它们提供了开发人员友好的 API，并负责管理和维护） 连接，发送消息和监视响应 - 使用 *Offboard 模式* 和 MAVLink 的细节。

以下资源可能对开发者有用：

* [基于 Linux 的 Offboard 控制](../ros/offboard_control.md) （PX4 开发指南）
* [MAVROS Offboard 控制示例](../ros/mavros_offboard.md) （PX4 开发指南）