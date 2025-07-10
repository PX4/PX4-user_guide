---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/offboard
---

# Offboard 模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

飞机遵守 MAVLink 提供的位置，速度或姿态设定值。 设定值可以由机载计算机上运行的 MAVLink API（例如 [MAVSDK](https://mavsdk.mavlink.io/) 或 [MAVROS](https://github.com/mavlink/mavros)）提供（通常通过串口或 wifi 连接）。

:::tip
Not all coordinate frames and field values allowed by MAVLink are supported for all setpoint messages and vehicles. Read the sections below *carefully* to ensure only supported values are used. Note also that setpoints must be streamed at > 2Hz before entering the mode and while the mode is operational. :::

:::note
* 此模式需要位置或位/姿信息 - 例如 GPS、光流、视觉惯性里程计、mocap 等。
* 除了更改模式外， 禁止遥控器控制。
* 使用此模式前必须先解锁。
* The vehicle must be already be receiving a **stream of target setpoints (>2Hz)** before this mode can be engaged.
* The vehicle will exit the mode if target setpoints are not received at a rate of > 2Hz.
* Not all coordinate frames and field values allowed by MAVLink are supported. :::

## 描述

Offboard 模式主要用于控制飞机运动和姿态，目前仅支持 MAVLink 消息的一个有限子集（未来将支持更多）。

其他操作, 如起飞、降落、返航，最好使用适当的模式来处理。 像上传、下载任务这样的操作可以在任何模式下执行。

在进入该模式之前，无人机必须收到设定值数据流，并且保持在该模式下（如果消息速率降至 2Hz 以下，无人机将停止）。 为了在此模式下保持位置，必须向无人机提供一个包含当前位置设定值的数据流。

Offboard 模式需要主动连接到远程 MAVLink 系统 （例如机载计算机或 GCS）。 如果连接丢失，在超时 ([COM_OF_LOSS_T](#COM_OF_LOSS_T)) 后，无人机将尝试降落或执行其他故障失效保护操作。 该动作定义在参数 [COM_OBL_ACT](#COM_OBL_ACT) 和 [COM_OBL_RC_ACT](#COM_OBL_RC_ACT) 中。

## 支持的消息

### 直升机/垂直起降

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  * 支持以下输入组合： <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 位置设置值 （仅 `x`，`y`，`z`）
    * 速度设定值（仅 `vx`，`yy`，`vz`）
    * 加速度设定值（仅 `afx`，`afy`，`afz`）
    * Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
    * Position setpoint **and** velocity setpoint **and** acceleration (the velocity and the acceleration setpoints are used as feedforwards; the velocity setpoint is added to the output of the position controller and the result is used as the input to the velocity controller; the acceleration setpoint is added to the output of the velocity controller and the result used to compute the thrust vector).
  - - PX4 supports the following  `coordinate_frame` values (only): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * 支持以下输入组合： <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 位置设定值（仅`lat_int`，`lon_int`，`alt`）
    * 速度设定值（仅 `vx`，`yy`，`vz`）
    * *Thrust* setpoint  (only `afx`, `afy`, `afz`)

      :::note
Acceleration setpoint values are mapped to create a normalized thrust setpoint (i.e. acceleration setpoints are not "properly" supported).
:::
    * Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
  - PX4 支持以下  `coordinate_frame` 值(仅限)： [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL)。

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  * 支持以下输入组合：
    * 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的姿态和方向（`SET_ATTITUDE_TARGET.q`）。
    * 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的机身速率（`SET_ATTITUDE_TARGET` `.body_roll_rate` ，`.body_pitch_rate`，`.body_yaw_rate`）。

### 固定翼

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  * 支持以下输入组合（通过 `type_mask`）： <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 位置设定值（仅` x `，` y `，` z `；速度和加速度设定值被忽略）。
      * Specify the *type* of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern): :::note Some of the *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field. :::

        值为：
        - 292：滑动设定值。 这会将 TECS 配置为空速优先于高度，以便在没有推力时使无人机滑行（即控制俯仰以调节空速）。 这相当于设置 `type_mask` 为 `POSITION_TARGET_TYPEMASK_Z_IGNORE`，`POSITION_TARGET_TYPEMASK_VZ_IGNORE`，`POSITION_TARGET_TYPEMASK_AZ_IGNORE`。
        - 4096：起飞设定值。
        - 8192：降落设定值。
        - 12288：悬停设定值（以设定值为中心绕圈飞行）。
        - 16384：空闲设定值（油门为0， 横滚 / 俯仰为0）。
  * PX4 支持坐标系指定 (`coordinate_frame` 字段): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 和 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED)。

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * 支持以下输入组合（通过 `type_mask`）： <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 位置设定值（仅`lat_int`，`lon_int`，`alt`）
      * Specify the *type* of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern):

:::note
The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field. :::

        值为：
        - 4096：起飞设定值。
        - 8192：降落设定值。
        - 12288：悬停设定值（以设定值为中心绕圈飞行）。
        - 16384：空闲设定值（油门为0， 横滚 / 俯仰为0）。
  * PX4 支持以下  `coordinate_frame` 值(仅限)： [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL)。

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  * 支持以下输入组合：
    * 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的姿态和方向（`SET_ATTITUDE_TARGET.q`）。
    * 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的机身速率（`SET_ATTITUDE_TARGET` `.body_roll_rate` ，`.body_pitch_rate`，`.body_yaw_rate`）。

### 无人车
* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  * 支持以下输入组合(在 `type_mask` 中)： <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 位置设置值 （仅 `x`，`y`，`z`）
      * Specify the *type* of the setpoint in `type_mask`:

:::note
The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field. ::

        值为：
        - 12288：悬停设定值（无人机足够接近设定值时会停止）。
    * Velocity setpoint (only `vx`, `vy`, `vz`)
  - PX4 支持坐标系指定 (`coordinate_frame` 字段): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 和 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED)。

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * 支持以下输入组合(在 `type_mask` 中)： <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 位置设定值（仅`lat_int`，`lon_int`，`alt`）
  * Specify the *type* of the setpoint in `type_mask` (not part of the MAVLink standard). 值为：
    - 下面的比特位没有置位，是正常表现。
    - 12288：悬停设定值（无人机足够接近设定值时会停止）。
  - PX4 支持坐标系（`corrdinate_frame`字段）：[MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL)。

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  * 支持以下输入组合：
    * 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的姿态和方向（`SET_ATTITUDE_TARGET.q`）。 :::note
实际仅使用/提取了偏航设置。
:::

## Offboard参数

*Offboard mode* is affected by the following parameters:

| 参数                                                                                                      | 描述                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_OF_LOSS_T"></a>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | 丢失 Offboard 连接时的等待超时时间（以秒为单位），然后将触发 offboard 丢失的失效保护措施 (`COM_OBL_ACT` 和 `COM_OBL_RC_ACT`)                                                                                                                                                                |
| <a id="COM_OBL_ACT"></a>[COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)         | Mode to switch to if offboard control is lost when *not* connected to RC (Values are - 0: [Land](../flight_modes/land.md), 1: [Hold](../flight_modes/hold.md), 2: [Return ](../flight_modes/return.md)).                                                 |
| <a id="COM_OBL_RC_ACT"></a>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | Mode to switch to if offboard control is lost while still connected to RC control (Values are - 0: *Position*, 1: [Altitude](../flight_modes/altitude_mc.md), 2: *Manual*, 3: [Return ](../flight_modes/return.md), 4: [Land](../flight_modes/land.md)). |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 控制多旋翼（或者多旋翼模式下的 VOTL）的摇杆移动量来切换到 [位置模式](../flight_modes/position_mc.md)。 默认情况下未启用此功能。                                                                                                                                                                     |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | 导致发射机切换到 [位置模式](../flight_modes/position_mc.md) 的摇杆移动量（如果 [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) 已启用）。                                                                                                                                                    |

## 开发者资源

Typically developers do not directly work at the MAVLink layer, but instead use a robotics API like [MAVSDK](https://mavsdk.mavlink.io/) or [ROS](http://www.ros.org/) (these provide a developer friendly API, and take care of managing and maintaining connections, sending messages and monitoring responses - the minutiae of working with *Offboard mode* and MAVLink).

以下资源可能对开发者有用：

* [Offboard Control from Linux](../ros/offboard_control.md)
* [ROS/MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md)
* [ROS/MAVROS Offboard Example (Python)](../ros/mavros_offboard_python.md)

