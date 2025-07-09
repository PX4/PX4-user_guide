---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/offboard
---

# 오프보드(Offboard) 모드

[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The vehicle obeys position, velocity, acceleration, attitude, attitude rates or thrust/torque setpoints provided by some source that is external to the flight stack, such as a companion computer. The setpoints may be provided using MAVLink (or a MAVLink API such as [MAVSDK](https://mavsdk.mavlink.io/)) or by [ROS 2](../ros/ros2.md).

PX4 requires that the external controller provides a continuous 2Hz "proof of life" signal, by streaming any of the supported MAVLink setpoint messages or the ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) message. PX4 enables offboard control only after receiving the signal for more than a second, and will regain control if the signal stops.

:::note
- 이 모드에는 위치 또는 자세/태도 정보(GPS, 광학 흐름, 시각-관성 주행 거리 측정, 모캡 등)가 필요합니다.
- RC control is disabled except to change modes (you can also fly without any manual controller at all by setting the parameter [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) to 4: Stick input disabled).
- The vehicle must be already be receiving a stream of MAVLink setpoint messages or ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) messages before arming in offboard mode or switching to offboard mode when flying.
- The vehicle will exit offboard mode if MAVLink setpoint messages or `OffboardControlMode` are not received at a rate of > 2Hz.
- Not all coordinate frames and field values allowed by MAVLink are supported for all setpoint messages and vehicles. 지원되는 값을 확인하시려면, 아래 섹션을 *주의 하여* 읽으십시오. :::

## 설명

Offboard mode is used for controlling vehicle movement and attitude, by setting position, velocity, acceleration, attitude, attitude rates or thrust/torque setpoints.

PX4 must receive a stream of MAVLink setpoint messages or the ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) at 2 Hz as proof that the external controller is healthy. The stream must be sent for at least a second before PX4 will arm in offboard mode, or switch to offboard mode when flying. If the rate falls below 2Hz while under external control PX4 will switch out of offboard mode after a timeout ([COM_OF_LOSS_T](#COM_OF_LOSS_T)), and attempt to land or perform some other failsafe action. The action depends on whether or not RC control is available, and is defined in the parameter [COM_OBL_RC_ACT](#COM_OBL_RC_ACT).

When using MAVLink the setpoint messages convey both the signal to indicate that the external source is "alive", and the setpoint value itself. In order to hold position in this case the vehicle must receive a stream of setpoints for the current position.

When using ROS 2 the proof that the external source is alive is provided by a stream of [OffboardControlMode](../msg_docs/OffboardControlMode.md) messages, while the actual setpoint is provided by publishing to one of the setpoint uORB topics, such as [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md). In order to hold position in this case the vehicle must receive a stream of `OffboardControlMode` but would only need the `TrajectorySetpoint` once.

Note that offboard mode only supports a very limited set of MAVLink commands and messages. Operations, like taking off, landing, return to launch, may be best handled using the appropriate modes. 업로드, 다운로드 임무와 같은 작업은 모든 모드에서 수행 가능합니다.

## ROS 2 Messages

The following ROS 2 messages and their particular fields and field values are allowed for the specified frames. In addition to providing heartbeat functionality, `OffboardControlMode` has two other main purposes:

1. Controls the level of the [PX4 control architecture](../flight_stack/controller_diagrams.md) at which offboard setpoints must be injected, and disables the bypassed controllers.
1. Determines which valid estimates (position or velocity) are required, and also which setpoint messages should be used.


The `OffboardControlMode` message is defined as shown.

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

The fields are ordered in terms of priority such that `position` takes precedence over `velocity` and later fields, `velocity` takes precedence over `acceleration`, and so on. The first field that has a non-zero value (from top to bottom) defines what valid estimate is required in order to use offboard mode, and the setpoint message(s) that can be used. For example, if the `acceleration` field is the first non-zero value, then PX4 requires a valid `velocity estimate`, and the setpoint must be specified using the `TrajectorySetpoint` message.


| desired control quantity | position field | velocity field | acceleration field | attitude field | body_rate field | actuator field | required estimate | required message                                                                                                                |
| ------------------------ |:--------------:|:--------------:|:------------------:|:--------------:|:---------------:|:--------------:|:-----------------:| ------------------------------------------------------------------------------------------------------------------------------- |
| position (NED)           |    &check;     |       -        |         -          |       -        |        -        |       -        |     position      | `TrajectorySetpoint`                                                                                                            |
| velocity (NED)           |    &cross;     |    &check;     |         -          |       -        |        -        |       -        |     velocity      | `TrajectorySetpoint`                                                                                                            |
| acceleration (NED)       |    &cross;     |    &cross;     |      &check;       |       -        |        -        |       -        |     velocity      | `TrajectorySetpoint`                                                                                                            |
| attitude (FRD)           |    &cross;     |    &cross;     |      &cross;       |    &check;     |        -        |       -        |       none        | [VehicleAttitudeSetpoint](../msg_docs/VehicleAttitudeSetpoint.md)                                                               |
| body_rate (FRD)          |    &cross;     |    &cross;     |      &cross;       |    &cross;     |     &check;     |       -        |       none        | [VehicleRatesSetpoint](../msg_docs/VehicleRatesSetpoint.md)                                                                     |
| thrust and torque (FRD)  |    &cross;     |    &cross;     |      &cross;       |    &cross;     |     &cross;     |    &check;     |       none        | [VehicleThrustSetpoint](../msg_docs/VehicleThrustSetpoint.md) and [VehicleTorqueSetpoint](../msg_docs/VehicleTorqueSetpoint.md) |

where &check; means that the bit is set, &cross; means that the bit is not set and `-` means that the bit is value is irrelevant.

:::note
Before using offboard mode with ROS 2, please spend a few minutes understanding the different [frame conventions](../ros/ros2_comm.md#ros-2-px4-frame-conventions) that PX4 and ROS 2 use. :::

### Copter

* [px4_msgs::msg::TrajectorySetpoint](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/TrajectorySetpoint.msg)
  * 다음 입력 조합이 지원됩니다.
    * Position setpoint (`position` different from `NaN`). Non-`NaN` values of velocity and acceleration are used as feedforward terms for the inner loop controllers.
    * Velocity setpoint (`velocity` different from `NaN` and `position` set to `NaN`). Non-`NaN` values acceleration are used as feedforward terms for the inner loop controllers.
    * Acceleration setpoint (`acceleration` different from `NaN` and `position` and `velocity` set to `NaN`)

  - All values are interpreted in NED (Nord, East, Down) coordinate system and the units are \[m\], \[m/s\] and \[m/s^2\] for position, velocity and acceleration, respectively.

* [px4_msgs::msg::VehicleAttitudeSetpoint](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/VehicleAttitudeSetpoint.msg)
  * The following input combination is supported:
    * quaterion `q_d` + thrust setpoint `thrust_body`. Non-`NaN` values of `yaw_sp_move_rate` are used as feedforward terms expressed in Earth frame and in \[rad/s\].
  - The quaterion represents the rotation between the drone body FRD (front, right, down) frame and the NED frame. The trust is in the drone body FRD frame and expressed in normalized \[-1, 1\] values.

* [px4_msgs::msg::VehicleRatesSetpoint](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/VehicleRatesSetpoint.msg)
  * The following input combination is supported:
    * `roll`, `pitch`, `yaw` and `thrust_body`.
  - All the value are in the drone body FRD frame. The rates are in \[rad/s\] while thrust_body is normalized in \[-1, 1\].

* [px4_msgs::msg::VehicleThrustSetpoint](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/VehicleThrustSetpoint.msg) + [px4_msgs::msg::VehicleTorqueSetpoint](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/VehicleTorqueSetpoint.msg)
  * The following input combination is supported:
    * `xyz` for thrust and `xyz` for torque.
  - All the value are in the drone body FRD frame and normalized in \[-1, 1\].
  - In order to save resources, this mode is disabled by default. If you want to use it you need to manually add  `vehicle_thrust_setpoint` and `vehicle_torque_setpoint` to the list of [subscribed topics](../middleware/uxrce_dds.md#dds-topics-yaml), and manually recompile the firmware.



## MAVLink Messages

The following MAVLink messages and their particular fields and field values are allowed for the specified frames.

### 멀티콥터/VTOL

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  * 다음 입력 조합이 지원됩니다. <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 위치 설정점(`x`, `y`, `z` 만 해당.)
    * Velocity setpoint (only `vx`, `vy`, `vz`)
    * 가속도 설정점 (`afx`, `afy`, `afz` 만 해당)
    * 위치 설정점 및 속도 설정점 (속도 설정점은 피드 포워드로 사용되며 위치 컨트롤러의 출력에 추가되고 결과는 속도 컨트롤러의 입력으로 사용됨).
    * Position setpoint **and** velocity setpoint **and** acceleration (the velocity and the acceleration setpoints are used as feedforwards; the velocity setpoint is added to the output of the position controller and the result is used as the input to the velocity controller; the acceleration setpoint is added to the output of the velocity controller and the result used to compute the thrust vector).
  - * PX4는 `coordinate_frame` 값 (전용)을 지원합니다 : [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 및 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * 다음 입력 조합이 지원됩니다. <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 위치 설정점(`lat_int`, `lon_int`, `alt` 만 해당.)
    * Velocity setpoint (only `vx`, `vy`, `vz`)
    * *추진력* 설정점 (`afx`, `afy`, `afz` 만 해당)

      :::note
가속 설정점은 정규화된 추력 설정 값을 만들기 위하여 매핑됩니다 (즉, 가속 설정값은 "올바르게"지원되지 않음).
:::
    * 위치 설정 값 **및** 속도 설정 값 (속도 설정 값은 피드 포워드로 사용되며 위치 컨트롤러의 출력에 추가되고 결과는 속도 컨트롤러의 입력으로 사용됨).
  - PX4는 다음 `coordinate_frame` 값 (전용)을 지원합니다 : [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  * 다음 입력 조합이 지원됩니다.
    * 추력 설정점 (`SET_ATTITUDE_TARGET.thrust`)이 있는 자세/방향 (`SET_ATTITUDE_TARGET.q`).
    * 추력 설정점 (`SET_ATTITUDE_TARGET.thrust`)이 없는 Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) .

### Fixed-wing

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  * 다음 입력 조합이 지원됩니다 (`type_mask`를 통해). <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 위치 설정점 (`x`, `y`, `z` 만 해당, 속도 및 가속도 설정 값은 무시됨).
      * :::note 아래의 *setpoint type* 값은 `type_mask` 필드에 대한 MAVLink 표준의 일부가 아닙니다. :::

        값들은 다음과 같습니다:
        - 292 : 글라이딩 설정점. 이는 추력이 없을 때 기체가 미끄러지도록하기 위해 고도보다 대기 속도를 우선하도록 TECS를 구성합니다 (즉, 속도를 조절하기 위해 피치가 제어 됨). `type_mask`를 다음과 같이 설정하는 것과 같습니다.`POSITION_TARGET_TYPEMASK_Z_IGNORE`, `POSITION_TARGET_TYPEMASK_VZ_IGNORE`, `POSITION_TARGET_TYPEMASK_AZ_IGNORE`.
        - 4096 : 이륙 설정점.
        - 8192: 착륙 설정점.
        - 12288 : Loiter 설정점 (설정점을 중심으로 선회 비행합니다).
        - 16384 : 유휴 설정점 (제로 스로틀, 제로 롤/피치).
  * PX4는 좌표 프레임 (`coordinate_frame` 필드)을 지원합니다 : [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 및 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * 다음 입력 조합이 지원됩니다 (`type_mask`를 통해). <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 위치 설정점(`lat_int`, `lon_int`, `alt` 만 해당.)
      * `type_mask`에서 설정점의 *유형*을 지정합니다 (이 비트가 설정되지 않은 경우 차량은 꽃과 같은 패턴으로 비행합니다).

:::note
아래의 *setpoint type* 값은 `type_mask` 필드에 대한 MAVLink 표준의 일부가 아닙니다. :::

        값들은 다음과 같습니다:
        - 4096 : 이륙 설정점.
        - 8192: 착륙 설정점.
        - 12288 : Loiter 설정점 (설정점을 중심으로 선회 비행합니다).
        - 16384 : 유휴 설정점 (제로 스로틀, 제로 롤/피치).
  * PX4는 다음 `coordinate_frame` 값 (전용)을 지원합니다 : [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  * 다음 입력 조합이 지원됩니다.
    * 추력 설정점 (`SET_ATTITUDE_TARGET.thrust`)이 있는 자세/방향 (`SET_ATTITUDE_TARGET.q`).
    * 추력 설정점 (`SET_ATTITUDE_TARGET.thrust`)이 없는 Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) .

### 탐사선

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  * 다음 입력 조합이 지원됩니다 (`type_mask`를 통해). <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 위치 설정점(`x`, `y`, `z` 만 해당.)
      * `type_mask`에서 설정점의 *유형*을 지정합니다.

        MAVLink에서 허용하는 모든 좌표 프레임 및 필드 값이 지원되는 것은 아닙니다. ::

        값들은 다음과 같습니다:

        - -12288 : Loiter 설정점 (설정점에 매우 가까워지면 기체는 멈춤).
    * Velocity setpoint (only `vx`, `vy`, `vz`)
  - PX4는 좌표 프레임 (`coordinate_frame` 필드)을 지원합니다 : [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 및 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * 다음 입력 조합이 지원됩니다 (`type_mask`를 통해). <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * 위치 설정점(`lat_int`, `lon_int`, `alt` 만 해당.)
  * `type_mask`에서 설정점의 *유형*을 지정합니다 (MAVLink 표준의 일부가 아님). 값들은 다음과 같습니다:
    - 다음 비트가 설정되지 않으면 정상적인 동작입니다.
    - -12288 : Loiter 설정점 (설정점에 매우 가까워지면 기체는 멈춤).
  - PX4는 좌표 프레임 (`coordinate_frame` 필드)을 지원합니다 : [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  * 다음 입력 조합이 지원됩니다.
    * 추력 설정점 (`SET_ATTITUDE_TARGET.thrust`)이 있는 자세/방향 (`SET_ATTITUDE_TARGET.q`). :::note
yaw 설정만 실제로 사용/추출됩니다.
:::

## 오프보드 매개변수

*오프보드 모드*는 아래의 매개 변수의 영향을받습니다.

| 매개변수                                                                                                    | 설명                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_OF_LOSS_T"></a>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | Time-out (in seconds) to wait when offboard connection is lost before triggering offboard lost failsafe (`COM_OBL_RC_ACT`)                                                  |
| <a id="COM_OBL_RC_ACT"></a>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | Flight mode to switch to if offboard control is lost (Values are - `0`: *Position*, `1`: *Altitude*, `2`: *Manual*, `3`: *Return, `4`: *Land*).                             |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes_mc/position.md). 기본적으로 오프보드 모드에서는 활성화되지 않습니다. |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes_mc/position.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).             |
| <a id="COM_RCL_EXCEPT"></a>[COM_RCL_EXCEPT](../advanced_config/parameter_reference.md#COM_RCL_EXCEPT)   | Specify modes in which RC loss is ignored and the failsafe action not triggered. Set bit `2` to ignore RC loss in Offboard mode.                                            |


## 개발자 리소스

일반적으로 개발자는 MAVLink 계층에서 직접 작업하지 않지만 대신 [MAVSDK](https://mavsdk.mavlink.io/) 또는 [ROS](http://www.ros.org/)와 같은 로봇 API를 사용합니다 (이는 개발자 친화적인 API를 제공하고 관리 및 유지 관리를 처리합니다. 연결, 메시지 전송 및 응답 모니터링-*오프보드 모드* 및 MAVLink 작업의 세부 사항).

다음의 리소스는 개발자에게 유용합니다.

* [Offboard Control from Linux](../ros/offboard_control.md)
* [ROS/MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md)
* [ROS/MAVROS Offboard Example (Python)](../ros/mavros_offboard_python.md)
