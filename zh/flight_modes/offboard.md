# Offboard 模式

<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />

飞行器根据飞行控制栈外部（如机载计算机）提供的设定值控制位置、速度、加速度、姿态以及推力/力矩。 设置值可以经由 MAVLink 提供(也可以是一个类似 [MAVSDK](https://mavsdk.mavlink.io/)的MAVLink API)或者经由 [ROS 2](../ros/ros2.md) 提供。

PX4要求外部控制器提供2Hz连续的“有效存在”信号，该信号可由任意支持的 MAVLink 设置点消息或ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 消息提供。 PX4只有在收到该种信号超过1秒后才有效，如果该种信号停止飞行控制栈将重新获得控制权（脱离Offboard模式）。

:::note

- 此模式需要位置或位/姿信息 - 例如 GPS、光流、视觉惯性里程计、mocap 等。
- RC control is disabled except to change modes (you can also fly without any manual controller at all by setting the parameter [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) to 4: Stick input disabled).
- 飞行器必须已经收到一条 MAVLink 设置点消息或 ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 消息，才允许在Offboard模式下解锁或者在飞行中切换至Offboard模式。
- 如果没有以 > 2Hz 的速度收到MAVLink 设置点消息或 `OffboardControlMode` ，飞行器将退出Offboard模式。
- 并非所有 MAVLink 支持的坐标系和字段值都被设定值消息和飞行器支持。 Read the sections below _carefully_ to ensure only supported values are used.

:::

## 描述

Offboard mode is used for controlling vehicle movement and attitude, by setting position, velocity, acceleration, attitude, attitude rates or thrust/torque setpoints.

PX4 must receive a stream of MAVLink setpoint messages or the ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) at 2 Hz as proof that the external controller is healthy. The stream must be sent for at least a second before PX4 will arm in offboard mode, or switch to offboard mode when flying. If the rate falls below 2Hz while under external control PX4 will switch out of offboard mode after a timeout ([COM_OF_LOSS_T](#COM_OF_LOSS_T)), and attempt to land or perform some other failsafe action. The action depends on whether or not RC control is available, and is defined in the parameter [COM_OBL_RC_ACT](#COM_OBL_RC_ACT).

When using MAVLink the setpoint messages convey both the signal to indicate that the external source is "alive", and the setpoint value itself. In order to hold position in this case the vehicle must receive a stream of setpoints for the current position.

When using ROS 2 the proof that the external source is alive is provided by a stream of [OffboardControlMode](../msg_docs/OffboardControlMode.md) messages, while the actual setpoint is provided by publishing to one of the setpoint uORB topics, such as [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md). In order to hold position in this case the vehicle must receive a stream of `OffboardControlMode` but would only need the `TrajectorySetpoint` once.

Note that offboard mode only supports a very limited set of MAVLink commands and messages. Operations, like taking off, landing, return to launch, may be best handled using the appropriate modes. Operations like uploading, downloading missions can be performed in any mode.

## ROS 2 消息

The following ROS 2 messages and their particular fields and field values are allowed for the specified frames. In addition to providing heartbeat functionality, `OffboardControlMode` has two other main purposes:

1. 控制Offboard设定值在 [PX4 控制架构](../flight_stack/controller_diagrams.md) 中的哪个等级上被注入执行，并禁止绕过控制器。
1. 确定需要哪种有效地估计(位置或速度)，以及应该使用哪种设定值消息。

The `OffboardControlMode` message is defined as shown.

```sh
# Off-board control mode

uint64 timestamp        # time since system start (microseconds)

bool position
bool velocity
bool acceleration
bool attitude
bool body_rate
bool actuator
```

The fields are ordered in terms of priority such that `position` takes precedence over `velocity` and later fields, `velocity` takes precedence over `acceleration`, and so on. The first field that has a non-zero value (from top to bottom) defines what valid estimate is required in order to use offboard mode, and the setpoint message(s) that can be used. For example, if the `acceleration` field is the first non-zero value, then PX4 requires a valid `velocity estimate`, and the setpoint must be specified using the `TrajectorySetpoint` message.

| 期望控制对象                   | 位置      | 速度      | 加速度     | 姿态      | 体轴角速率   | 执行器字段   | direct_actuator field | 所需状态估计 | 所需消息                                                                                                                          |
| ------------------------ | ------- | ------- | ------- | ------- | ------- | ------- | --------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 位置 (NED)                 | &check; | -       | -       | -       | -       | -       | -                     | 位置     | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                       |
| 速度 (NED)                 | &cross; | &check; | -       | -       | -       | -       | -                     | 速度     | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                       |
| 加速度（NED）                 | &cross; | ✗       | &check; | -       | -       | -       | -                     | 速度     | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                       |
| 姿态(FRD)                  | &cross; | &cross; | ✗       | &check; | -       | -       | -                     | 无      | [VehicleAttitudeSetpoint](../msg_docs/VehicleAttitudeSetpoint.md)                                                             |
| 体轴角速率 (FRD)              | &cross; | &cross; | &cross; | ✗       | &check; | -       | -                     | 无      | [VehicleRatesSetpoint](../msg_docs/VehicleRatesSetpoint.md)                                                                   |
| 推力和力矩(FRD)               | &cross; | &cross; | &cross; | &cross; | ✗       | &check; | -                     | 无      | [VehicleThrustSetpoint](../msg_docs/VehicleThrustSetpoint.md) 和 [VehicleTorqueSetpoint](../msg_docs/VehicleTorqueSetpoint.md) |
| direct motors and servos | ✗       | ✗       | ✗       | ✗       | ✗       | ✗       | ✓                     | none   | [ActuatorMotors](../msg_docs/ActuatorMotors.md) and [ActuatorServos](../msg_docs/ActuatorServos.md)                           |

where &check; means that the bit is set, &cross; means that the bit is not set and `-` means that the bit is value is irrelevant.

:::note
Before using offboard mode with ROS 2, please spend a few minutes understanding the different [frame conventions](../ros/ros2_comm.md#ros-2-px4-frame-conventions) that PX4 and ROS 2 use.
:::

### 旋翼机

- [px4_msgs::msg::TrajectorySetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/TrajectorySetpoint.msg)

  - 支持以下输入组合：
    - 位置设定值(`position` 不为 `NaN`)。 非-`NaN` 速度和加速度被用作内环控制律的前馈项。
    - 速度设定值(`velocity` 不为 `NaN` 同时 `position` 为 `NaN`). 非-`NaN` 加速度被用作内环控制律的前馈项。
    - 加速度设定值(`acceleration` 不为 `NaN` 同时 `position` 和  `velocity` 为 `NaN`)。

  - 所有值都是基于NED(北, 东, 地)坐标系，位置、速度和加速的单位分别为\[m\], \[m/s\] 和\[m/s^2\] 。

- [px4_msgs::msg::VehicleAttitudeSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleAttitudeSetpoint.msg)

  - The following input combination is supported:

    - 姿态四元数 `q_d` + 推力设定值 `thrust_body`。 非-`NaN` 值的 `yaw_sp_move_rate` 被用作大地坐标系下的偏航角前馈使用，单位为\[rad/s\]。

  - The quaternion represents the rotation between the drone body FRD (front, right, down) frame and the NED frame. The thrust is in the drone body FRD frame and expressed in normalized \[-1, 1\] values.

- [px4_msgs::msg::VehicleRatesSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleRatesSetpoint.msg)

  - The following input combination is supported:

    - `roll`, `pitch`, `yaw` and `thrust_body`.

  - All the values are in the drone body FRD frame. The rates are in \[rad/s\] while thrust_body is normalized in \[-1, 1\].

### Generic Vehicle

The following offboard control modes bypass all internal PX4 control loops and should be used with great care.

- [px4_msgs::msg::VehicleThrustSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleThrustSetpoint.msg) + [px4_msgs::msg::VehicleTorqueSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleTorqueSetpoint.msg)

  - 支持以下输入组合：
    - `xyz` 用于推力和 `xyz` 用于力矩。
  - All the values are in the drone body FRD frame and normalized in \[-1, 1\].

- [px4_msgs::msg::ActuatorMotors](https://github.com/PX4/PX4-Autopilot/blob/main/msg/ActuatorMotors.msg) + [px4_msgs::msg::ActuatorServos](https://github.com/PX4/PX4-Autopilot/blob/main/msg/ActuatorServos.msg)
  - You directly control the motor outputs and/or servo outputs.
  - All the values normalized in \[-1, 1\]. For outputs that do not support negative values, negative entries map to `NaN`.
  - `NaN` maps to disarmed.

## MAVLink 消息

The following MAVLink messages and their particular fields and field values are allowed for the specified vehicle frames.

### 直升机/垂直起降

- [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)

  - The following input combinations are supported: <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - 位置设置值 （仅 `x`，`y`，`z`）
    - 速度设定值（仅`vx`，`yy`，`vz`）
    - Acceleration setpoint (only `afx`, `afy`, `afz`)
    - 位置设定值**和**速度设定值（速度设定值和加速度设定值被作为前馈使用；被叠加到位置控制器的输出上，结果作为速度控制器的输入使用）。
    - 位置设定值**和**速度设定值**以及**加速度（速度和加速度设定值用作前馈；速度设定值叠加至位置控制器输出，并将结果作为速度控制器的输入；加速度设定值被叠加至速度控制器的输出中，输出结果用于计算推力矢量）。

  - PX4 supports the following `coordinate_frame` values (only): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

- [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

  - 支持以下输入组合： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - 位置设定值（仅`lat_int`，`lon_int`，`alt`）
    - 速度设定值（仅`vx`，`vy`，`vz`）
    - _Thrust_ setpoint (only `afx`, `afy`, `afz`)

      :::note
   加速度设定值被用来生成归一化的推力设定值（即不支持加速度设定值）。
:::

    - 位置设定值**和**速度设定值（速度设定值被作为前馈使用；被叠加到位置控制器的输出上，结果作为速度控制器的输入使用）。

  - PX4 supports the following `coordinate_frame` values (only): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

- [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  - 支持以下输入组合：
    - 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的姿态和方向（`SET_ATTITUDE_TARGET.q`）。
    - Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).

### Fixed-wing

- [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)

  - 支持以下输入组合（通过 `type_mask`）： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - 位置设定值（仅` x `，` y `，` z `；速度和加速度设定值被忽略）。

      - Specify the _type_ of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern): :::note Some of the _setpoint type_ values below are not part of the MAVLink standard for the `type_mask` field.
:::

        值为：

        - 292：滑动设定值。 这会将 TECS 配置为空速优先于高度，以便在没有推力时使无人机滑行（即控制俯仰以调节空速）。 这相当于设置 `type_mask` 为 `POSITION_TARGET_TYPEMASK_Z_IGNORE`，`POSITION_TARGET_TYPEMASK_VZ_IGNORE`，`POSITION_TARGET_TYPEMASK_AZ_IGNORE`。
        - 4096：起飞设定值。
        - 8192：降落设定值。
        - 12288：悬停设定值（以设定值为中心绕圈飞行）。
        - 16384：空闲设定值（油门为0， 横滚 / 俯仰为0）。

  - PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

- [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

  - 支持以下输入组合（通过 `type_mask`）： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - 位置设定值（仅`lat_int`，`lon_int`，`alt`）

      - Specify the _type_ of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern):

:::note
The _setpoint type_ values below are not part of the MAVLink standard for the `type_mask` field.
:::

        The values are:

        - 4096：起飞设定值。
        - 8192：降落设定值。
        - 12288：悬停设定值（以设定值为中心绕圈飞行）。
        - 16384：空闲设定值（油门为0， 横滚 / 俯仰为0）。

  - PX4 supports the following `coordinate_frame` values (only): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

- [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  - 支持以下输入组合：
    - 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的姿态和方向（`SET_ATTITUDE_TARGET.q`）。
    - Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).

### 无人车

- [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)

  - 支持以下输入组合(在 `type_mask` 中)： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - 位置设置值 （仅 `x`，`y`，`z`）

      - Specify the _type_ of the setpoint in `type_mask`:

:::note
The _setpoint type_ values below are not part of the MAVLink standard for the `type_mask` field. ::

        值为：

        - 12288：悬停设定值（无人机足够接近设定值时会停止）。

    - Velocity setpoint (only `vx`, `vy`, `vz`)

  - PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

- [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

  - 支持以下输入组合(在 `type_mask` 中)： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    - 位置设定值（仅`lat_int`，`lon_int`，`alt`）
  - Specify the _type_ of the setpoint in `type_mask` (not part of the MAVLink standard). The values are:

    - 下面的比特位没有置位，是正常表现。
    - 12288：悬停设定值（无人机足够接近设定值时会停止）。

  - PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

- [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  - 支持以下输入组合：
    - 带有推力设定值（`SET_ATTITUDE_TARGET.thrust`）的姿态和方向（`SET_ATTITUDE_TARGET.q`）。 :::note
实际仅使用/提取了偏航设置。
:::

## Offboard参数

_Offboard mode_ is affected by the following parameters:

| 参数                                                                                                      | 描述                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_OF_LOSS_T"></a>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | Offboard 连接超时时间（以秒为单位），超过该时间未检测到offboard连接后将触发 offboard 连接丢失的失效保护措施 ( `COM_OBL_RC_ACT`)                                                                         |
| <a id="COM_OBL_RC_ACT"></a>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | Flight mode to switch to if offboard control is lost (Values are - `0`: _Position_, `1`: _Altitude_, `2`: _Manual_, `3`: *Return, `4`: *Land\*).            |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes_mc/position.md). 默认情况下未启用此功能。     |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes_mc/position.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled). |
| <a id="COM_RCL_EXCEPT"></a>[COM_RCL_EXCEPT](../advanced_config/parameter_reference.md#COM_RCL_EXCEPT)   | 该参数指定一种模式，在该模式下将忽略RC丢失及不会触发RC丢失的失效保护动作。 将位 `2` 置1将在Offboard模式下忽略RC丢失。                                                                                           |

## 开发者资源

Typically developers do not directly work at the MAVLink layer, but instead use a robotics API like [MAVSDK](https://mavsdk.mavlink.io/) or [ROS](http://www.ros.org/) (these provide a developer friendly API, and take care of managing and maintaining connections, sending messages and monitoring responses - the minutiae of working with _Offboard mode_ and MAVLink).

The following resources may be useful for a developer audience:

- [Linux 的Offboard控制模式](../ros/offboard_control.md)
- [ROS/MAVROS Offboard例程(C++)](../ros/mavros_offboard_cpp.md)
- [ROS/MAVROS Offboard例程(Python)](../ros/mavros_offboard_python.md)
