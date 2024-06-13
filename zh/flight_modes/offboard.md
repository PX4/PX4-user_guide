# Offboard 模式

<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />

飞行器根据飞行控制栈外部（如机载计算机）提供的设定值控制位置、速度、加速度、姿态以及推力/力矩。 The setpoints may be provided using MAVLink (or a MAVLink API such as [MAVSDK](https://mavsdk.mavlink.io/)) or by [ROS 2](../ros2/index.md).

PX4要求外部控制器提供2Hz连续的“有效存在”信号，该信号可由任意支持的 MAVLink 设置点消息或ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 消息提供。 PX4只有在收到该种信号超过1秒后才有效，如果该种信号停止飞行控制栈将重新获得控制权（脱离Offboard模式）。

:::note

- 此模式需要位置或位/姿信息 - 例如 GPS、光流、视觉惯性里程计、mocap 等。
- RC control is disabled except to change modes (you can also fly without any manual controller at all by setting the parameter [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) to 4: Stick input disabled).
- 飞行器必须已经收到一条 MAVLink 设置点消息或 ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 消息，才允许在Offboard模式下解锁或者在飞行中切换至Offboard模式。
- 如果没有以 > 2Hz 的速度收到MAVLink 设置点消息或 `OffboardControlMode` ，飞行器将退出Offboard模式。
- 并非所有 MAVLink 支持的坐标系和字段值都被设定值消息和飞行器支持。 请_仔细_阅读以下章节，确保仅使用其支持的值。

:::

## 描述

Offboard模式通过设置位置、速度、加速、姿态、姿态角速率或力/扭矩设定值来控制飞行器的位置和姿态。

PX4 必须能够以2Hz的速率连续收到 MAVLink 设定值消息或 ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 消息以确保外部控制器正常运行。 该消息必须持续发送1秒以上PX4才能在Offboard模式下解锁或在飞行中切换至Offboard模式。 如果在外部控制器给出的指令速率低于2Hz，PX4将在超时([COM_OF_LOSS_T](#COM_OF_LOSS_T)) 后退出Offboard模式，并尝试降落或执行其他一些失效保护行为。 失效保护行为取决于遥控器是否可用，它根据参数 [COM_OBL_RC_ACT](#COM_OBL_RC_ACT) 设定。

当使用 MAVLink 时，设定值消息既传达了外部控制器"正常运行"的信号也传达了设定值本身。 Offboard模式下要保持位置，飞行器必须接收到一个包含当前位置设定值的消息指令。

当使用 ROS 2 时，通过监测 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 消息流来确保外部控制器运行正常，实际设定值由uORB消息发布的任一设定值提供，例如 [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md) 为了在这种情况下保持当前位置，飞行器必须收到连续的 `OffboardControlMode` 消息，但只需要收到 `TrajectorySetpoint` 消息一次。

请注意，Offboard模式只支持比较有限的 MAVLink 指令和消息。 其他操作如起飞、降落、返航，最好使用适当的模式来处理。 像上传、下载任务这样的操作可以在任何模式下执行。

## ROS 2 消息

以下 ROS 2 消息及其特定字段和字段值在特定的框架下是允许的。 除了提供心跳功能外， `OffboardControlMode` 还有另外两个主要目的：

1. 控制Offboard设定值在 [PX4 控制架构](../flight_stack/controller_diagrams.md) 中的哪个等级上被注入执行，并禁止绕过控制器。
1. 确定需要哪种有效估计(位置或速度)，以及应该使用哪种设定值消息。

`OffboardControlmode` 消息定义如下所示。

```sh
# Off-board control mode

uint64 timestamp        # 系统开始的时间 (微秒)

bool position
bool velocity
bool acceleration
bool attitude
bool body_rate
bool actuator
```

消息中的字段按优先级排序， `位置` 优于 `速度` 及以后的字段。 `速度` 优于 `加速度`，等等。 第一个非零字段(从上到下) 定义了Offboard模式所需的有效估计以及可用的设定值消息。 例如，如果 `加速度` 字段是第一个非零字段，PX4 就需要一个有效的 `速度估计`, 并且设定值必须使用 `TrajectorySetpoint` 消息指定。

| 期望控制对象      | 位置      | 速度      | 加速度     | 姿态      | 姿态角速率   | 执行器字段   | 直接给电机 | 所需状态估计 | 所需消息                                                                                                                          |
| ----------- | ------- | ------- | ------- | ------- | ------- | ------- | ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 位置 (NED)    | &check; | -       | -       | -       | -       | -       | -     | 位置     | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                       |
| 速度 (NED)    | &cross; | &check; | -       | -       | -       | -       | -     | 速度     | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                       |
| 加速度（NED）    | &cross; | ✗       | &check; | -       | -       | -       | -     | 速度     | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                       |
| 姿态(FRD)     | &cross; | &cross; | ✗       | &check; | -       | -       | -     | 无      | [VehicleAttitudeSetpoint](../msg_docs/VehicleAttitudeSetpoint.md)                                                             |
| 体轴角速率 (FRD) | &cross; | &cross; | &cross; | ✗       | &check; | -       | -     | 无      | [VehicleRatesSetpoint](../msg_docs/VehicleRatesSetpoint.md)                                                                   |
| 推力和力矩(FRD)  | &cross; | &cross; | &cross; | &cross; | ✗       | &check; | -     | 无      | [VehicleThrustSetpoint](../msg_docs/VehicleThrustSetpoint.md) 和 [VehicleTorqueSetpoint](../msg_docs/VehicleTorqueSetpoint.md) |
| 直接给电机和舵机    | ✗       | ✗       | ✗       | ✗       | ✗       | ✗       | ✓     | 无      | [ActuatorMotors](../msg_docs/ActuatorMotors.md) and [ActuatorServos](../msg_docs/ActuatorServos.md)                           |

&check; 代表该位设置为有效， &cross; 代表该值未设置， `-` 表示该值无关紧要。

::: info Before using offboard mode with ROS 2, please spend a few minutes understanding the different [frame conventions](../ros2/user_guide.md#ros-2-px4-frame-conventions) that PX4 and ROS 2 use.
:::

### 旋翼机

- [px4_msgs::msg::TrajectorySetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/TrajectorySetpoint.msg)

  - 支持以下输入组合：
    - 位置设定值(`position` 不为 `NaN`)。 非`NaN` 的速度和加速度值被用作内环控制器的前馈项。
    - 速度设定值(`velocity` 不为 `NaN` 同时 `position` 为 `NaN`). 非`NaN` 的加速度值被用于内环控制器的前馈项。
    - 加速度设定值(`acceleration` 不为 `NaN` 同时 `position` 和  `velocity` 为 `NaN`)。

  - 所有值都是基于NED(北, 东, 地)坐标系，位置、速度和加速的单位分别为\[m\], \[m/s\] 和\[m/s^2\] 。

- [px4_msgs::msg::VehicleAttitudeSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleAttitudeSetpoint.msg)

  - 支持以下输入组合：

    - 姿态四元数 `q_d` + 推力设定值 `thrust_body`。 非-`NaN` 值的 `yaw_sp_move_rate` 被用作大地坐标系下的偏航角前馈使用，单位为\[rad/s\]。

  - 姿态四元数表示无人机机体坐标系FRD(前、右、下) 与NED坐标系之间的旋转。 这个推力是在无人机体轴FRD坐标系下，并归一化为 \[-1, 1\] 。

- [px4_msgs::msg::VehicleRatesSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleRatesSetpoint.msg)

  - 支持以下输入组合：

    - `roll`, `pitch`, `yaw` and `thrust_body`.

  - 所有值都表示在无人机体轴FRD坐标系下。 角速率(roll, pitch, yaw) 单位为\[rad/s\] ，thrust_body归一化为 \[-1, 1\]。

### Generic Vehicle

下面的offboard控制模式会绕过所有PX4内部的控制环，应当非常谨慎地使用。

- [px4_msgs::msg::VehicleThrustSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleThrustSetpoint.msg) + [px4_msgs::msg::VehicleTorqueSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleTorqueSetpoint.msg)

  - 支持以下输入组合：
    - `xyz` 用于推力和 `xyz` 用于力矩。
  - 所有值都在无人机体轴 FRD 坐标系中表示，并且归一化为\[-1, 1\]。

- [px4_msgs::msg::ActuatorMotors](https://github.com/PX4/PX4-Autopilot/blob/main/msg/ActuatorMotors.msg) + [px4_msgs::msg::ActuatorServos](https://github.com/PX4/PX4-Autopilot/blob/main/msg/ActuatorServos.msg)
  - 直接控制电机输出和/或伺服系统（舵机）输出。
  - 所有值归一化为\[-1, 1\]。 对于不支持负数值的输出，负数项将映射到`NaN`。
  - `NaN`映射到上锁

## MAVLink 消息

下面的 MAVLink 消息及其特定字段和字段值在特定的帧下是允许的。

### 直升机/垂直起降

- [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)

  - 支持以下输入组合： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - 位置设置值 （仅 `x`，`y`，`z`）
    - 速度设定值（仅`vx`，`yy`，`vz`）
    - 加速度设定值（仅 `afx`，`afy`，`afz`）
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

      - Specify the _type_ of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern): ::: info Some of the _setpoint type_ values below are not part of the MAVLink standard for the `type_mask` field.
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

        ::: info The _setpoint type_ values below are not part of the MAVLink standard for the `type_mask` field.
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

        ::: info The _setpoint type_ values below are not part of the MAVLink standard for the `type_mask` field. ::

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

_Offboard模式_受以下参数影响：

| 参数                                                                                                      | 描述                                                                                                 |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| <a id="COM_OF_LOSS_T"></a>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | Offboard 连接超时时间（以秒为单位），超过该时间未检测到offboard连接后将触发 offboard 连接丢失的失效保护措施 ( `COM_OBL_RC_ACT`)            |
| <a id="COM_OBL_RC_ACT"></a>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | 当offboard模式控制丢失时切换到的飞行模式(值为 - `0`: _位置_, `1`: _高度_, `2`: _手动_, `3`: *返航, `4`: *降落\*).          |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 遥控器打杆时多旋翼（或者多旋翼模式下的 VOTL）会切换到 [位置模式](../flight_modes_mc/position.md)。 默认情况下未启用此功能。                 |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | 遥控器打杆多少会切换到 [位置模式](../flight_modes_mc/position.md) （如果 [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) 已启用）。 |
| <a id="COM_RCL_EXCEPT"></a>[COM_RCL_EXCEPT](../advanced_config/parameter_reference.md#COM_RCL_EXCEPT)   | 该参数指定一种模式，在该模式下将忽略RC丢失及不会触发RC丢失的失效保护动作。 将位 `2` 置1将在Offboard模式下忽略RC丢失。                              |

## 开发者资源

通常，开发人员不直接在 MAVLink 层开发，而是使用机器人的API接口，例如 [ MAVSDK ](https://mavsdk.mavlink.io/) 或 [ ROS ](http://www.ros.org/)（它们为开发人员提供了友好的 API，并负责管理和维护连接，发送消息和响应监视 - _Offboard 模式_ 和 MAVLink的细节）。

以下资源可能对开发者有用：

- [Linux 的Offboard控制模式](../ros/offboard_control.md)
- [ROS/MAVROS Offboard例程(C++)](../ros/mavros_offboard_cpp.md)
- [ROS/MAVROS Offboard例程(Python)](../ros/mavros_offboard_python.md)
