# Offboard 模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

飞行器根据飞行控制栈外部（如机载计算机）提供的设定值控制位置、速度、加速度、姿态以及推力/力矩。 设置值可以经由 MAVLink 提供(也可以是一个类似 [MAVSDK](https://mavsdk.mavlink.io/)的MAVLink API)或者经由 [ROS 2](../ros/ros2.md) 提供。

PX4要求外部控制器提供2Hz连续的“有效存在”信号，该信号可由任意支持的 MAVLink 设置点消息或ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 消息提供。 PX4只有在收到该种信号超过1秒后才有效，如果该种信号停止飞行控制栈将重新获得控制权（脱离Offboard模式）。

:::note
- 此模式需要位置或位/姿信息 - 例如 GPS、光流、视觉惯性里程计、mocap 等。
- 除了更改模式外， 禁止遥控器控制。
- 飞行器必须已经收到一条 MAVLink 设置点消息或 ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 消息，才允许在Offboard模式下解锁或者在飞行中切换至Offboard模式。
- 如果没有以 > 2Hz 的速度收到MAVLink 设置点消息或 `OffboardControlMode` ，飞行器将退出Offboard模式。
- 并非所有 MAVLink 支持的坐标系和字段值都被设定值消息和飞行器支持。 请*仔细*阅读以下章节，确保仅使用支持的值。 :::

## 描述

Offboard模式通过设置位置、速度、加速、姿态、姿态角速率或力/扭矩设置点来控制飞行器的移动和姿态。

PX4 必须能够以2Hz的速率连续收到 MAVLink 设置点消息或 ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 消息以确保外部控制器是正常运行的。 该消息必须已经持续发送1秒钟以上PX4才能在Offboard模式下解锁或在飞行中切换至Offboard模式。 如果在外部控制器给出的指令速率低于2Hz，PX4将在超时([COM_OF_LOSS_T](#COM_OF_LOSS_T))后退出Offboard模式，并尝试降落或执行其他一些失败保护行为。 失效保护行为取决于RC遥控器是否可用，依据参数 [COM_OBL_RC_ACT](#COM_OBL_RC_ACT) 的设定。

当使用 MAVLink 时，设定值消息既传达了指示外部控制器"正常运行"的信号也传达了设定值本身。 Offboard模式下要保持位置，飞行器必须接收到一个包含当前位置设定值的消息指令。

当使用 ROS 2 时，外部控制器运行正常通过监测 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 消息流确保，真实设定点由发布任一包含设定值的uORB消息提供，例如 [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)。 在这种情况下保持当前位置，飞行器必须收到连续的 `OffboardControlMode` 消息，但只需要收到 `TrajectorySetpoint` 消息一次。

请注意，Offboard模式只支持非常有限的 MAVLink 命令和消息。 其他操作如起飞、降落、返航，最好使用适当的模式来处理。 像上传、下载任务这样的操作可以在任何模式下执行。

## ROS 2 消息

下面的 ROS 2 消息及其特定字段和字段值在特定的帧下是允许的。 除了提供心跳功能外， `OffboardControlMode` 还有另外两个主要目的：

1. 控制Offboard设定值在 [PX4 控制架构](../flight_stack/controller_diagrams.md) 中的哪个等级上被注入执行，并禁止绕过控制器。
1. 确定需要哪种有效地估计(位置或速度)，以及应该使用哪种设定值消息。


`OffboardControlmode` 消息定义如下所示。

```
# Off-board control mode

uint64 timestamp        # time since system start (microseconds)

bool position
bool velocity
bool acceleration
bool attitude
bool body_rate
bool actuator
```

消息中的字段按优先级排序， `位置` 优于 `速度` 及以后的字段。 `速度` 优于 `加速度`，等等。 第一个非零字段(从上到下)定义了Offboard模式所需的有效估计以及可以使用的 设定值消息。 例如，如果 `加速` 字段是第一个非零字段，PX4 就需要一个有效的 `速度估计`, 并且设定值必须使用 `TrajectorySetpoint` 消息指定。


| 期望控制对象      |   位置    |   速度    |   加速度   |   姿态    |  体轴角速率  |  执行器字段  | 所需状态估计 | 所需消息                                                                                                                          |
| ----------- |:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:------:| ----------------------------------------------------------------------------------------------------------------------------- |
| 位置 (NED)    | &check; |    -    |    -    |    -    |    -    |    -    |   位置   | `TrajectorySetpoint`                                                                                                          |
| 速度 (NED)    | &cross; | &check; |    -    |    -    |    -    |    -    |   速度   | `TrajectorySetpoint`                                                                                                          |
| 加速度（NED）    | &cross; | &cross; | &check; |    -    |    -    |    -    |   速度   | `TrajectorySetpoint`                                                                                                          |
| 姿态(FRD)     | &cross; | &cross; | &cross; | &check; |    -    |    -    |   无    | [VehicleAttitudeSetpoint](../msg_docs/VehicleAttitudeSetpoint.md)                                                             |
| 体轴角速率 (FRD) | &cross; | &cross; | &cross; | &cross; | &check; |    -    |   无    | [VehicleRatesSetpoint](../msg_docs/VehicleRatesSetpoint.md)                                                                   |
| 推力和力矩(FRD)  | &cross; | &cross; | &cross; | &cross; | &cross; | &check; |   无    | [VehicleThrustSetpoint](../msg_docs/VehicleThrustSetpoint.md) 和 [VehicleTorqueSetpoint](../msg_docs/VehicleTorqueSetpoint.md) |

&check; 代表该位设置为有效， &cross; 代表该位未设置， `-` 表示该位状态无关紧要。

:::note
在使用 ROS 2 的Offboard模式之前, 请花几分钟时间了解PX4和ROS2使用的不同 [坐标系](../ros/ros2_comm.md#ros-2-px4-frame-conventions)。 :::

### 旋翼机

* [px4_msgs::msg::TrajectorySetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/TrajectorySetpoint.msg)
  * 支持以下输入组合：
    * 位置设定值(`position` 不为 `NaN`)。 非-`NaN` 速度和加速度被用作内环控制律的前馈项。
    * 速度设定值(`velocity` 不为 `NaN` 同时 `position` 为 `NaN`). 非-`NaN` 加速度被用作内环控制律的前馈项。
    * 加速度设定值(`acceleration` 不为 `NaN` 同时 `position` 和  `velocity` 为 `NaN`)。

  - 所有值都是基于NED(北, 东, 地)坐标系，位置、速度和加速的单位分别为\[m\], \[m/s\] 和\[m/s^2\] 。

* [px4_msgs::msg::VehicleAttitudeSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleAttitudeSetpoint.msg)
  * 支持以下输入组合：
    * 姿态四元数 `q_d` + 推力设定值 `thrust_body`。 非-`NaN` 值的 `yaw_sp_move_rate` 被用作大地坐标系下的偏航角前馈使用，单位为\[rad/s\]。
  - 姿态四元数表示无人机体轴FRD(前、右、下)坐标系与NED坐标系之间的旋转。 推力表示在无人机体轴FRD坐标系下的推力，并归一化为 \[-1, 1\] 。

* [px4_msgs::msg::VehicleRatesSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleRatesSetpoint.msg)
  * 支持以下输入组合：
    * `roll`, `pitch`, `yaw` and `thrust_body`.
  - 所有值都在无人机体轴FRD坐标系下表示。 角速率(roll, pitch, yaw)单位为\[rad/s\] ，thrust_body归一化为 \[-1, 1\]。

* [px4_msgs::msg::VehicleThrustSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleThrustSetpoint.msg) + [px4_msgs::msg::VehicleTorqueSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleTorqueSetpoint.msg)
  * 支持以下输入组合：
    * `xyz` 用于推力和 `xyz` 用于力矩。
  - 所有值都在无人机体轴 FRD 坐标系中表示，并且归一化为\[-1, 1\]。
  - 为了节省资源，此模式默认被禁用。 如果你想使用它，需要手动添加  `vehicle_thrust_setpoint` and `vicle_torque_setpoint` 到 [订阅主题](../middleware/xrce_dds.md#dds-topics-yaml)中并手动重新编译固件。



## MAVLink 消息

下面的 MAVLink 消息及其特定字段和字段值在特定的帧下是允许的。

### 直升机/垂直起降

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  * 支持以下输入组合： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 位置设置值 （仅 `x`，`y`，`z`）
    * 速度设定值（仅`vx`，`yy`，`vz`）
    * 加速度设定值（仅 `afx`，`afy`，`afz`）
    * 位置设定值**和**速度设定值（速度设定值和加速度设定值被作为前馈使用；被叠加到位置控制器的输出上，结果作为速度控制器的输入使用）。
    * Position setpoint **and** velocity setpoint **and** acceleration (the velocity and the acceleration setpoints are used as feedforwards; the velocity setpoint is added to the output of the position controller and the result is used as the input to the velocity controller; the acceleration setpoint is added to the output of the velocity controller and the result used to compute the thrust vector).
  - - PX4 supports the following  `coordinate_frame` values (only): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * 支持以下输入组合： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 位置设定值（仅`lat_int`，`lon_int`，`alt`）
    * Velocity setpoint (only `vx`, `vy`, `vz`)
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
  * 支持以下输入组合（通过 `type_mask`）： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
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
  * 支持以下输入组合（通过 `type_mask`）： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
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
  * 支持以下输入组合(在 `type_mask` 中)： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 位置设置值 （仅 `x`，`y`，`z`）
      * Specify the *type* of the setpoint in `type_mask`:

:::note
The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field. ::

        值为：

        - 12288：悬停设定值（无人机足够接近设定值时会停止）。
    * Velocity setpoint (only `vx`, `vy`, `vz`)
  - PX4 支持坐标系指定 (`coordinate_frame` 字段): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 和 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED)。

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * 支持以下输入组合(在 `type_mask` 中)： <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
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

| 参数                                                                                                      | 描述                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_OF_LOSS_T"></a>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | Time-out (in seconds) to wait when offboard connection is lost before triggering offboard lost failsafe (`COM_OBL_RC_ACT`)                                                                                           |
| <a id="COM_OBL_RC_ACT"></a>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | Mode to switch to if offboard control is lost (Values are - 0: *Position*, 1: [Altitude](../flight_modes/altitude_mc.md), 2: *Manual*, 3: [Return ](../flight_modes/return.md), 4: [Land](../flight_modes/land.md)). |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 控制多旋翼（或者多旋翼模式下的 VOTL）的摇杆移动量来切换到 [位置模式](../flight_modes/position_mc.md)。 默认情况下未启用此功能。                                                                                                                                 |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | 导致发射机切换到 [位置模式](../flight_modes/position_mc.md) 的摇杆移动量（如果 [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) 已启用）。                                                                                                                |
| <a id="COM_RCL_EXCEPT"></a>[COM_RCL_EXCEPT](../advanced_config/parameter_reference.md#COM_RCL_EXCEPT)   | Specify modes in which RC loss is ignored and the failsafe action not triggered. Set bit `2` to ignore RC loss in Offboard mode.                                                                                     |


## 开发者资源

Typically developers do not directly work at the MAVLink layer, but instead use a robotics API like [MAVSDK](https://mavsdk.mavlink.io/) or [ROS](http://www.ros.org/) (these provide a developer friendly API, and take care of managing and maintaining connections, sending messages and monitoring responses - the minutiae of working with *Offboard mode* and MAVLink).

以下资源可能对开发者有用：

* [Offboard Control from Linux](../ros/offboard_control.md)
* [ROS/MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md)
* [ROS/MAVROS Offboard Example (Python)](../ros/mavros_offboard_python.md)
