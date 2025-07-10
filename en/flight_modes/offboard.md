---
canonicalUrl: https://docs.px4.io/main/en/flight_modes/offboard
---

# Offboard Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The vehicle obeys a position, velocity or attitude setpoint provided over MAVLink.
The setpoint may be provided by a MAVLink API (e.g. [MAVSDK](https://mavsdk.mavlink.io/) or [MAVROS](https://github.com/mavlink/mavros)) running on a companion computer (and usually connected via serial cable or wifi).

:::tip
Not all coordinate frames and field values allowed by MAVLink are supported for all setpoint messages and vehicles. 
Read the sections below *carefully* to ensure only supported values are used.
Note also that setpoints must be streamed at > 2Hz before entering the mode and while the mode is operational.
:::

:::note
* This mode requires position or pose/attitude information - e.g. GPS, optical flow, visual-inertial odometry, mocap, etc.
* RC control is disabled except to change modes.
* The vehicle must be armed before this mode can be engaged.
* The vehicle must be already be receiving a **stream of target setpoints (>2Hz)** before this mode can be engaged.
* The vehicle will exit the mode if target setpoints are not received at a rate of > 2Hz.
* Not all coordinate frames and field values allowed by MAVLink are supported.
:::

## Description

Offboard mode is primarily used for controlling vehicle movement and attitude, and supports only a very limited set of MAVLink messages (more may be supported in future).

Other operations, like taking off, landing, return to launch, are best handled using the appropriate modes. 
Operations like uploading, downloading missions can be performed in any mode.

A stream of setpoint commands must be received by the vehicle prior to engaging the mode, and in order to remain in the mode (if the message rate falls below 2Hz the vehicle will stop). 
In order to hold position while in this mode, the vehicle must receive a stream of setpoints for the current position.

Offboard mode requires an active connection to a remote MAVLink system (e.g. companion computer or GCS). 
If the connection is lost, after a timeout ([COM_OF_LOSS_T](#COM_OF_LOSS_T)) the vehicle will attempt to land or perform some other failsafe action. 
The action is defined in the parameters [COM_OBL_ACT](#COM_OBL_ACT) and [COM_OBL_RC_ACT](#COM_OBL_RC_ACT).

## Supported Messages

### Copter/VTOL

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  * The following input combinations are supported: <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * Position setpoint (only `x`, `y`, `z`)
    * Velocity setpoint (only `vx`, `yy`, `vz`)
    * Acceleration setpoint  (only `afx`, `afy`, `afz`)
    * Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
    * Position setpoint **and** velocity setpoint **and** acceleration (the velocity and the acceleration setpoints are used as feedforwards; the velocity setpoint is added to the output of the position controller and the result is used as the input to the velocity controller; the acceleration setpoint is added to the output of the velocity controller and the result used to compute the thrust vector).
  - - PX4 supports the following  `coordinate_frame` values (only): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * The following input combinations are supported: <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * Position setpoint (only `lat_int`, `lon_int`, `alt`)
    * Velocity setpoint (only `vx`, `yy`, `vz`)
    * *Thrust* setpoint  (only `afx`, `afy`, `afz`)
	
	  :::note
      Acceleration setpoint values are mapped to create a normalized thrust setpoint (i.e. acceleration setpoints are not "properly" supported).
	  :::
    * Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
  - PX4 supports the following  `coordinate_frame` values (only): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  * The following input combinations are supported:
    * Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).
    * Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint  (`SET_ATTITUDE_TARGET.thrust`).

### Fixed Wing

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  * The following input combinations are supported (via `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * Position setpoint (`x`, `y`, `z` only; velocity and acceleration setpoints are ignored).
      * Specify the *type* of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern):
        :::note
		Some of the *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field.
		:::

        The values are:
        - 292: Gliding setpoint.
          This configures TECS to prioritize airspeed over altitude in order to make the vehicle glide when there is no thrust (i.e. pitch is controlled to regulate airspeed).
          It is equivalent to setting `type_mask` as `POSITION_TARGET_TYPEMASK_Z_IGNORE`, `POSITION_TARGET_TYPEMASK_VZ_IGNORE`, `POSITION_TARGET_TYPEMASK_AZ_IGNORE`. 
        - 4096: Takeoff setpoint.
        - 8192: Land setpoint.
        - 12288: Loiter setpoint (fly a circle centred on setpoint).
        - 16384: Idle setpoint (zero throttle, zero roll / pitch).
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).
  
* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * The following input combinations are supported (via `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * Position setpoint (only `lat_int`, `lon_int`, `alt`)
      * Specify the *type* of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern):
	  
        :::note
		The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field.
		:::

        The values are:
        - 4096: Takeoff setpoint.
        - 8192: Land setpoint.
        - 12288: Loiter setpoint (fly a circle centred on setpoint).
        - 16384: Idle setpoint (zero throttle, zero roll / pitch).
  * PX4 supports the following  `coordinate_frame` values (only): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  * The following input combinations are supported:
    * Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).
    * Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint  (`SET_ATTITUDE_TARGET.thrust`).

### Rover
* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  * The following input combinations are supported (in `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * Position setpoint (only `x`, `y`, `z`)
      * Specify the *type* of the setpoint in `type_mask`:
	  
	    :::note
        The *setpoint type* values below are not part of the MAVLink standard for the `type_mask` field.
		::

        The values are:
        - 12288: Loiter setpoint (vehicle stops when close enough to setpoint).
    * Velocity setpoint (only `vx`, `vy`, `vz`)
  - PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  * The following input combinations are supported (in `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    * Position setpoint (only `lat_int`, `lon_int`, `alt`)
  * Specify the *type* of the setpoint in `type_mask` (not part of the MAVLink standard).
    The values are:
    - Following bits not set then normal behaviour.
    - 12288: Loiter setpoint (vehicle stops when close enough to setpoint).
  - PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  * The following input combinations are supported:
    * Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).
	  :::note
      Only the yaw setting is actually used/extracted.
	  :::

## Offboard Parameters

*Offboard mode* is affected by the following parameters:

Parameter | Description
--- | ---
<a id="COM_OF_LOSS_T"></a>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T) | Time-out (in seconds) to wait when offboard connection is lost before triggering offboard lost failsafe (`COM_OBL_ACT` and `COM_OBL_RC_ACT`)
<a id="COM_OBL_ACT"></a>[COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT) | Mode to switch to if offboard control is lost when *not* connected to RC (Values are - 0: [Land](../flight_modes/land.md), 1: [Hold](../flight_modes/hold.md), 2: [Return ](../flight_modes/return.md)).
<a id="COM_OBL_RC_ACT"></a>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | Mode to switch to if offboard control is lost while still connected to RC control (Values are - 0: *Position*, 1: [Altitude](../flight_modes/altitude_mc.md), 2: *Manual*, 3: [Return ](../flight_modes/return.md), 4: [Land](../flight_modes/land.md)).
<a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes/position_mc.md). This is not enabled for offboard mode by default.
<a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes/position_mc.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).

## Developer Resources

Typically developers do not directly work at the MAVLink layer, but instead use a robotics API like [MAVSDK](https://mavsdk.mavlink.io/) or [ROS](http://www.ros.org/) (these provide a developer friendly API, and take care of managing and maintaining connections, sending messages and monitoring responses - the minutiae of working with *Offboard mode* and MAVLink). 

The following resources may be useful for a developer audience:

* [Offboard Control from Linux](../ros/offboard_control.md)
* [ROS/MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md)
* [ROS/MAVROS Offboard Example (Python)](../ros/mavros_offboard_python.md)

