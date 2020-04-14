# Offboard 模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

飞机按照远端控制器通过MAVLink给出的位置，速度或姿态设定值来运行。 The setpoint may be provided by a MAVLink API (e.g. [MAVSDK](https://mavsdk.mavlink.io/) or [MAVROS](https://github.com/mavlink/mavros)) running on a companion computer (and usually connected via serial cable or wifi).

> **Note** * This mode requires position or pose/attitude information - e.g. GPS, optical flow, visual-inertial odometry, mocap, etc. * RC control is disabled except to change modes. * The vehicle must be armed before this mode can be engaged. * The vehicle must be already be receiving a stream of target setpoints before this mode can be engaged. * The vehicle will exit the mode if target setpoints are not received at a rate of > 2Hz.

## 描述

Offboard mode is primarily used for controlling vehicle movement and attitude, and supports only a very limited set of MAVLink messages (more may be supported in future).

Other operations, like taking off, landing, return to launch, are best handled using the appropriate modes. Operations like uploading, downloading missions can be performed in any mode.

A stream of setpoint commands must be received by the vehicle prior to engaging the mode, and in order to remain in the mode (if the message rate falls below 2Hz the vehicle will stop). In order to hold position while in this mode, the vehicle must receive a stream of setpoints for the current position.

Offboard mode requires an active connection to a remote MAVLink system (e.g. companion computer or GCS). If the connection is lost, after a timeout ([COM_OF_LOSS_T](#COM_OF_LOSS_T)) the vehicle will attempt to land or perform some other failsafe action. The action is defined in the parameters [COM_OBL_ACT](#COM_OBL_ACT) and [COM_OBL_RC_ACT](#COM_OBL_RC_ACT).

## Supported Messages

### Copter/VTOL

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * The following input combinations are supported: <!-- https://github.com/PX4/Firmware/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `x`, `y`, `z`)
    * Velocity setpoint (only `vx`, `yy`, `vz`)
    * *Thrust* setpoint (only `afx`, `afy`, `afz`) > **Note** Acceleration setpoint values are mapped to create a normalized thrust setpoint (i.e. acceleration setpoints are not "properly" supported).
    * Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * The following input combinations are supported: <!-- https://github.com/PX4/Firmware/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `lat_int`, `lon_int`, `alt`)
    * Velocity setpoint (only `vx`, `yy`, `vz`)
    * *Thrust* setpoint (only `afx`, `afy`, `afz`) > **Note** Acceleration setpoint values are mapped to create a normalized thrust setpoint (i.e. acceleration setpoints are not "properly" supported).
    * Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * The following input combinations are supported: 
    * Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).
    * Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).

### Fixed Wing

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * The following input combinations are supported (via `type_mask`): <!-- https://github.com/PX4/Firmware/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `x`, `y`, `z`)
      
      * Specify the *type* of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern):
        
        > **Note** The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field.
        
        The values are:
        
        * 4096: Takeoff setpoint.
        * 8192: Land setpoint.
        * 12288: Loiter setpoint (fly a circle centred on setpoint).
        * 16384: Idle setpoint (zero throttle, zero roll / pitch).
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * The following input combinations are supported (via `type_mask`): <!-- https://github.com/PX4/Firmware/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `lat_int`, `lon_int`, `alt`)
      
      * Specify the *type* of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern):
        
        > **Note** The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field.
        
        The values are:
        
        * 4096: Takeoff setpoint.
        * 8192: Land setpoint.
        * 12288: Loiter setpoint (fly a circle centred on setpoint).
        * 16384: Idle setpoint (zero throttle, zero roll / pitch).
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * The following input combinations are supported: 
    * Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).
    * Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).

<!-- Limited for offboard mode in Fixed Wing was added to master after PX4 v1.9.0.
See https://github.com/PX4/Firmware/pull/12149 and https://github.com/PX4/Firmware/pull/12311 -->

### Rover

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * The following input combinations are supported (in `type_mask`): <!-- https://github.com/PX4/Firmware/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `x`, `y`, `z`)
      
      * Specify the *type* of the setpoint in `type_mask`:
        
        > **Note** The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field.
        
        The values are:
        
        * 12288: Loiter setpoint (vehicle stops when close enough to setpoint).
    * Velocity setpoint (only `vx`, `yy`, `vz`)
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * The following input combinations are supported (in `type_mask`): <!-- https://github.com/PX4/Firmware/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * Position setpoint (only `lat_int`, `lon_int`, `alt`)
  * Specify the *type* of the setpoint in `type_mask` (not part of the MAVLink standard). The values are: 
    * Following bits not set then normal behaviour.
    * 12288: Loiter setpoint (vehicle stops when close enough to setpoint).
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * The following input combinations are supported: 
    * Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`). > **Note** Only the yaw setting is actually used/extracted.

## Offboard Parameters

*Offboard mode* is affected by the following parameters:

| 参数                                                                                                      | 描述                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_OF_LOSS_T"></span>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | 在丢失Offboard连接时的等待超时 (以秒为单位), 然后将触发offboard丢失的故障保护措施 (`COM_OBL_ACT` 和 `COM_OBL_RC_ACT`)                                                                                                         |
| <span id="COM_OBL_ACT"></span>[COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)         | *没有* 连接到遥控器的情况下, 丢失offboard连接后切换到的模式 (取值为- 0: [Land](../flight_modes/land.md), 1: [Hold](../flight_modes/hold.md), 2: [Return ](../flight_modes/return.md))。                                   |
| <span id="COM_OBL_RC_ACT"></span>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | 连接到遥控器的情况下，丢失offboard连接后切换到的模式 (取值为 - 0: *Position*, 1: [Altitude](../flight_modes/altitude_mc.md), 2: *Manual*, 3: [Return ](../flight_modes/return.md), 4: [Land](../flight_modes/land.md))。 |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled for offboard mode, stick movement immediately gives control back to the pilot (switches to [Position mode](../flight_modes/position_mc.md)).                                        |

## Developer Resources

Typically developers do not directly work at the MAVLink layer, but instead use a robotics API like [MAVSDK](https://mavsdk.mavlink.io/) or [ROS](http://www.ros.org/) (these provide a developer friendly API, and take care of managing and maintaining connections, sending messages and monitoring responses - the minutiae of working with *Offboard mode* and MAVLink).

The following resources may be useful for a developer audience:

* [Offboard Control from Linux](https://dev.px4.io/master/en/ros/offboard_control.html) (PX4 Devguide)
* [MAVROS Offboard control example](https://dev.px4.io/master/en/ros/mavros_offboard.html) (PX4 Devguide)