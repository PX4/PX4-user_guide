# Offboard Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The vehicle obeys a position, velocity or attitude setpoint provided over MAVLink. The setpoint may be provided by a MAVLink API (e.g. [Dronecode SDK](https://sdk.dronecode.org/en/) or [MAVROS](https://github.com/mavlink/mavros)) running on a companion computer (and usually connected via serial cable or wifi).

> **Note** Offboard mode is not supported by Fixed Wing vehicles. It is supported for Copter and VTOL vehicles.

<span></span>

> **Note** * This mode requires position or pose/attitude information - e.g. GPS, optical flow, visual-inertial odometry, mocap, etc. * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes). * The vehicle must be armed before this mode can be engaged. * The vehicle must be already be receiving a stream of target setpoints before this mode can be engaged. * The vehicle will exit the mode if target setpoints are not received at a rate of > 2Hz.

## Description

Offboard mode is primarily used for controlling vehicle movement and attitude, and supports only a very limited set of MAVLink commands (more may be supported in future). It can be used to:

* Control vehicle position, velocity, or thrust ([SET_POSITION_TARGET_LOCAL_NED](http://mavlink.org/messages/common#SET_POSITION_TARGET_LOCAL_NED)). 
  * Acceleration setpoints are combined to create a 'thrust' setpoint.
  * PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](http://mavlink.org/messages/common#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](http://mavlink.org/messages/common#MAV_FRAME_BODY_NED).
* Control vehicle attitude/orientation ([SET_ATTITUDE_TARGET](http://mavlink.org/messages/common#SET_ATTITUDE_TARGET)).

Other operations, like taking off, landing, return to launch, are best handled using the appropriate modes. Operations like uploading, downloading missions can be performed in any mode.

A stream of setpoint commands must be received by the vehicle prior to engaging the mode, and in order to remain in the mode (if the message rate falls below 2Hz the vehicle will stop). In order to hold position while in this mode, the vehicle must receive a stream of setpoints for the current position.

Offboard mode requires an active connection to a remote MAVLink system (e.g. companion computer or GCS). If the connection is lost, after a timeout ([COM_OF_LOSS_T](#COM_OF_LOSS_T)) the vehicle will attempt to land or perform some other failsafe action. The action is defined in the parameters [COM_OBL_ACT](#COM_OBL_ACT) and [COM_OBL_RC_ACT](#COM_OBL_RC_ACT).

## Offboard Parameters

*Offboard mode* is affected by the following parameters:

| Parameter                                                                                             | Description                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_OF_LOSS_T"></span>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | Time-out (in seconds) to wait when offboard connection is lost before triggering offboard lost failsafe (`COM_OBL_ACT` and `COM_OBL_RC_ACT`)                                                                                                             |
| <span id="COM_OBL_ACT"></span>[COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)       | Mode to switch to if offboard control is lost when *not* connected to RC (Values are - 0: [Land](../flight_modes/land.md), 1: [Hold](../flight_modes/hold.md), 2: [Return ](../flight_modes/return.md)).                                                 |
| <span id="COM_OBL_RC_ACT"></span>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | Mode to switch to if offboard control is lost while still connected to RC control (Values are - 0: *Position*, 1: [Altitude](../flight_modes/altitude_mc.md), 2: *Manual*, 3: [Return ](../flight_modes/return.md), 4: [Land](../flight_modes/land.md)). |

## Developer Resources

Typically developers do not directly work at the MAVLink layer, but instead use a robotics API like [Dronecode SDK](https://sdk.dronecode.org/en/) or [ROS](http://www.ros.org/) (these provide a developer friendly API, and take care of managing and maintaining connections, sending messages and monitoring responses - the minutiae of working with *Offboard mode* and MAVLink).

The following resources may be useful for a developer audience:

* [Offboard Control from Linux](https://dev.px4.io/en/ros/offboard_control.html) (PX4 Devguide)
* [MAVROS Offboard control example](https://dev.px4.io/en/ros/mavros_offboard.html) (PX4 Devguide)