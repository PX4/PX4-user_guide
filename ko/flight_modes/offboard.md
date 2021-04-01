# 오프보드(Offboard) 모드

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

기체는 MAVLink를 태워 전달한 위치, 속도, 고도 지점 설정을 따릅니다. 셋포인트 명령은 보조 컴퓨터에서 MAVLink API (예, [MAVSDK](https://mavsdk.mavlink.io/) 또는 [MAVROS](https://github.com/mavlink/mavros))를 통해 전달할 수 있습니다. 일반적으로 시리얼 케이블 또는 와이파이를 사용하여 보조 컴퓨터를 연결합니다.

:::tip MAVLink에서 허용하는 모든 좌표 프레임과 필드 값이 모든 설정 점 메시지와 기체에 지원되는 것은 아닙니다. 지원되는 값을 확인하시려면, 아래 섹션을 *주의 하여* 읽으십시오. 모드에 작동 전과 모드가 작동하는 동안 설정 값은 2Hz이상에서 스트리밍되어야합니다.
:::

:::note

* 이 모드에는 위치 또는 자세/태도 정보(GPS, 광학 흐름, 시각-관성 주행 거리 측정, 모캡 등)가 필요합니다. 
* RC 제어는 모드 변경을 제외하고 비활성화되어 있습니다.
* 이 모드를 사용하려면 기체의 시동을 걸어야합니다.
* 이 모드를 사용하려면 차량이 이미 **목표 설정 값 (> 2Hz) 스트림**을 수신하고 있어야합니다.
* 목표 설정 값이 2Hz 이상의 속도로 수신되지 않으면 기체의 모드를 종료합니다.
* MAVLink에서 허용하는 모든 좌표 프레임 및 필드 값이 지원되는 것은 아닙니다.
:::

## 설명

오프보드 모드는 주로 기체의 움직임과 자세를 제어하는 데 사용되며, 매우 제한된 MAVLink 메시지 세트만 지원합니다 (향후 더 많은 기능이 지원될 수 있음).

이륙, 착륙, 발사 귀환과 같은 다른 작업은 적절한 모드를 사용하여 잘 처리됩니다. 업로드, 다운로드 임무와 같은 작업은 모든 모드에서 수행 가능합니다.

모드를 시작하기 전에 기체는 설정 값 명령 스트림을 수신하여야 모드가 유지됩니다. 메시지 주파수가 2Hz 미만으로 떨어지면 기체는 정지합니다. 이 모드에서 위치를 유지하려면 기체는 현재 위치에 대한 일련의 설정 값을 수신하여야 합니다.

오프 보드 모드에는 원격 MAVLink 시스템 (예 : 컴패니언 컴퓨터 또는 GCS)에 대한 연결하여야 합니다. If the connection is lost, after a timeout ([COM_OF_LOSS_T](#COM_OF_LOSS_T)) the vehicle will attempt to land or perform some other failsafe action. The action is defined in the parameters [COM_OBL_ACT](#COM_OBL_ACT) and [COM_OBL_RC_ACT](#COM_OBL_RC_ACT).

## Supported Messages

### Copter/VTOL

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * The following input combinations are supported: <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `x`, `y`, `z`)
    * Velocity setpoint (only `vx`, `yy`, `vz`)
    * Acceleration setpoint (only `afx`, `afy`, `afz`)
    * Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
    * Position setpoint **and** velocity setpoint **and** acceleration (the acceleration setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
  * * PX4 supports the following `coordinate_frame` values (only): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * The following input combinations are supported: <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `lat_int`, `lon_int`, `alt`)
    * Velocity setpoint (only `vx`, `yy`, `vz`)
    * *Thrust* setpoint (only `afx`, `afy`, `afz`)
    
:::note
Acceleration setpoint values are mapped to create a normalized thrust setpoint (i.e. acceleration setpoints are not "properly" supported).
:::
    
    * Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
  * PX4 supports the following `coordinate_frame` values (only): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * The following input combinations are supported: 
    * Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).
    * Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).

* [MAV_CMD_DO_CHANGE_SPEED](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CHANGE_SPEED)
  
  * Allows to change the cruise speed when navigating with [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED) or [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

### Fixed Wing

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
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * The following input combinations are supported (via `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `lat_int`, `lon_int`, `alt`)
      
      * Specify the *type* of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern):
        
:::note
The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field.
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

* [MAV_CMD_DO_CHANGE_SPEED](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CHANGE_SPEED)
  
  * Allows to change the cruise speed when navigating with [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED) or [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

<!-- Limited for offboard mode in Fixed Wing was added to master after PX4 v1.9.0.
See https://github.com/PX4/PX4-Autopilot/pull/12149 and https://github.com/PX4/PX4-Autopilot/pull/12311 -->

### Rover

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * The following input combinations are supported (in `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `x`, `y`, `z`)
      
      * Specify the *type* of the setpoint in `type_mask`:
      
:::note
The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field. ::
      
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

## Offboard Parameters

*Offboard mode* is affected by the following parameters:

| Parameter                                                                                               | Description                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_OF_LOSS_T"></span>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | Time-out (in seconds) to wait when offboard connection is lost before triggering offboard lost failsafe (`COM_OBL_ACT` and `COM_OBL_RC_ACT`)                                                                                                             |
| <span id="COM_OBL_ACT"></span>[COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)         | Mode to switch to if offboard control is lost when *not* connected to RC (Values are - 0: [Land](../flight_modes/land.md), 1: [Hold](../flight_modes/hold.md), 2: [Return ](../flight_modes/return.md)).                                                 |
| <span id="COM_OBL_RC_ACT"></span>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | Mode to switch to if offboard control is lost while still connected to RC control (Values are - 0: *Position*, 1: [Altitude](../flight_modes/altitude_mc.md), 2: *Manual*, 3: [Return ](../flight_modes/return.md), 4: [Land](../flight_modes/land.md)). |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes/position_mc.md). This is not enabled for offboard mode by default.                                                         |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes/position_mc.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).                                                                                          |

## Developer Resources

Typically developers do not directly work at the MAVLink layer, but instead use a robotics API like [MAVSDK](https://mavsdk.mavlink.io/) or [ROS](http://www.ros.org/) (these provide a developer friendly API, and take care of managing and maintaining connections, sending messages and monitoring responses - the minutiae of working with *Offboard mode* and MAVLink).

The following resources may be useful for a developer audience:

* [Offboard Control from Linux](../ros/offboard_control.md) (PX4 Devguide)
* [MAVROS Offboard control example](../ros/mavros_offboard.md) (PX4 Devguide)