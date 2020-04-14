# 미션 모드

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Mission mode* causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application like [QGroundControl](https://docs.qgroundcontrol.com/en/) (QGC).

<span></span>

> **Note** * This mode requires 3d position information (e.g. GPS). * The vehicle must be armed before this mode can be engaged. * This mode is automatic - no user intervention is *required* to control the vehicle. * RC control switches can be used to change flight modes on any vehicle. RC stick movement will [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) when flying as a multicopter unless handling a critical battery failsafe (stick movement is ignored for fixed-wing flight).

## Description

Missions are usually created in a ground control station (e.g. [QGroundControl](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html)) and uploaded prior to launch. They may also be created by a developer API, and/or uploaded in flight.

Individual [mission commands](#mission_commands) are handled in a way that is appropriate for each vehicle's flight characteristics (for example loiter is implemented as *hover* for copter and *circle* for fixed-wing). VTOL vehicles follow the behavior and parameters of fixed-wing when in FW mode, and of copter when in MC mode.

> **Note** Missions are uploaded onto a SD card that needs to be inserted **before** booting up the autopilot.

At high level all vehicle types behave in the same way when MISSION mode is engaged:

1. If a mission is stored and PX4 is flying it will execute the [mission/flight plan](../flying/missions.md) from the current step. 
2. If a mission is stored and PX4 is landed: 
  * On copters PX4 will execute the [mission/flight plan](../flying/missions.md). If the mission does not have a `TAKEOFF` command then PX4 will fly the vehicle to the minimum altitude before executing the remainder of the flight plan from the current step.
  * On fixed-wing vehicles PX4 will not automatically take off (the autopilot will detect the lack of movement and set the throttle to zero). The vehicle may start executing the mission if hand- or catapult- launched while in mission mode. 
3. If no mission is stored, or if PX4 has finished executing all mission commands: 
  * If flying the vehicle will loiter.
  * If landed the vehicle will "wait".
4. You can manually change the current mission command by selecting it in *QGroundControl*. > **Note** If you have a *Jump to item* command in the mission, moving to another item will **not** reset the loop counter. One implication is that if you change the current mission command to 1 this will not "fully restart" the mission.
5. The mission will only reset when the vehicle is disarmed or when a new mission is uploaded. > **Tip** To automatically disarm the vehicle after it lands, in *QGroundControl* go to [Vehicle Setup > Safety](https://docs.qgroundcontrol.com/en/SetupView/Safety.html), navigate to *Land Mode Settings* and check the box labeled *Disarm after*. Enter the time to wait after landing before disarming the vehicle.

Missions can be paused by activating [HOLD mode](../flight_modes/hold.md). The mission will then continue from the current mission command when you reactivate the MISSION flight mode. While flying in mission mode, if you decide to discontinue the mission and switch to any other mode e.g. position mode, fly the vehicle elsewhere with RC, and then switch back to mission mode, the vehicle will continue the mission from its current position and will fly to the next mission waypoint not visited yet.

> **Warning** Ensure that the throttle stick is non-zero before switching to any RC mode (otherwise the vehicle will crash).We recommend you centre the control sticks before switching to any other mode.

For more information about mission planning, see:

* [Mission Planning](../flying/missions.md)
* [Plan View](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html) (*QGroundControl* User Guide)

## QGroundControl Support

*QGroundControl* provides additional GCS-level mission handling support (in addition to that provided by the flight controller). For more information see:

* [Remove mission after vehicle lands](https://docs.qgroundcontrol.com/en/releases/stable_v3.2_long.html#remove-mission-after-vehicle-lands) 
* [Resume mission after Return mode](https://docs.qgroundcontrol.com/en/releases/stable_v3.2_long.html#resume-mission)

## Mission Parameters

Mission behaviour is affected by a number of parameters, most of which are documented in [Parameter Reference > Mission](../advanced_config/parameter_reference.md#mission). A very small subset are listed below.

| Parameter                                                                                               | Description                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="NAV_RCL_ACT"></span>[NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)         | RC loss failsafe mode (what the vehicle will do if it looses RC connection) - e.g. enter hold mode, return mode, terminate etc.                                                                                            |
| <span id="NAV_LOITER_RAD"></span>[NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_RCL_ACT)      | Fixed-wing loiter radius.                                                                                                                                                                                                  |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled for auto modes, stick movement gives control back to the pilot (switches to [Position mode](../flight_modes/position_mc.md) - except when vehicle is handling a critical battery failsafe). Enabled by default. |

## Supported Mission Commands {#mission_commands}

PX4 "accepts" the following MAVLink mission commands in Mission mode (note: caveats below list). Unless otherwise noted, the implementation is as defined in the MAVLink specification.

* [MAV_CMD_NAV_WAYPOINT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT) 
  * *Param3* (flythrough) is ignored. Flythrough is always enabled if *param 1* (time_inside) > 0.
* [MAV_CMD_NAV_LOITER_UNLIM](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LOITER_UNLIM)
* [MAV_CMD_NAV_LOITER_TIME](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LOITER_TIME)
* [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) 
* [MAV_CMD_NAV_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_TAKEOFF)
* [MAV_CMD_NAV_LOITER_TO_ALT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LOITER_TO_ALT)
* [MAV_CMD_NAV_ROI](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_ROI)
* [MAV_CMD_DO_SET_ROI](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI)
* [MAV_CMD_DO_SET_ROI_LOCATION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI_LOCATION)
* [MAV_CMD_NAV_VTOL_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_TAKEOFF)
* [MAV_CMD_NAV_VTOL_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_LAND)
* [MAV_CMD_NAV_FENCE_RETURN_POINT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_RETURN_POINT)
* [MAV_CMD_NAV_FENCE_POLYGON_VERTEX_INCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_POLYGON_VERTEX_INCLUSION)
* [MAV_CMD_NAV_FENCE_POLYGON_VERTEX_EXCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_POLYGON_VERTEX_EXCLUSION)
* [MAV_CMD_NAV_FENCE_CIRCLE_INCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_CIRCLE_INCLUSION)
* [MAV_CMD_NAV_FENCE_CIRCLE_EXCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_CIRCLE_EXCLUSION)
* [MAV_CMD_NAV_RALLY_POINT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_RALLY_POINT)
* [MAV_CMD_DO_JUMP](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_JUMP)
* [MAV_CMD_NAV_ROI](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_ROI)
* [MAV_CMD_DO_SET_ROI](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI)
* [MAV_CMD_DO_CHANGE_SPEED](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CHANGE_SPEED)
* [MAV_CMD_DO_SET_HOME](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_HOME)
* [MAV_CMD_DO_SET_SERVO](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_SERVO)
* [MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START)
* [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL)
* [MAV_CMD_DO_DIGICAM_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_DIGICAM_CONTROL)
* [MAV_CMD_DO_MOUNT_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONFIGURE)
* [MAV_CMD_DO_MOUNT_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONTROL)
* [MAV_CMD_IMAGE_START_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_START_CAPTURE)
* [MAV_CMD_IMAGE_STOP_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_STOP_CAPTURE)
* [MAV_CMD_VIDEO_START_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_VIDEO_START_CAPTURE)
* [MAV_CMD_VIDEO_STOP_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_VIDEO_STOP_CAPTURE)
* [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST)
* [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL)
* [MAV_CMD_SET_CAMERA_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_CAMERA_MODE)
* [MAV_CMD_DO_VTOL_TRANSITION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_VTOL_TRANSITION)
* [MAV_CMD_NAV_DELAY](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_DELAY)
* [MAV_CMD_NAV_RETURN_TO_LAUNCH](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_RETURN_TO_LAUNCH)
* [MAV_CMD_DO_SET_ROI_WPNEXT_OFFSET](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI_WPNEXT_OFFSET)
* [MAV_CMD_DO_SET_ROI_NONE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI_NONE)

Note:

* PX4 parses the above messages, but they are not necessary *acted* on. For example, some messages are vehicle-type specific.
* PX4 generally does not support local frames for mission commands (e.g. [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED)).
* Not all messages/commands are exposed via *QGroundControl*.
* The list may become out of date as messages are added. You can check the current set by inspecting the code. Support is `MavlinkMissionManager::parse_mavlink_mission_item` in [/src/modules/mavlink/mavlink_mission.cpp](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_mission.cpp) (list generated in [this git changelist](https://github.com/PX4/Firmware/commit/ca1f7a4a194c23303c23ca79b5905ff8bfb94c22)).
  
  > **Note** Please add an bug fix or PR if you find a missing/incorrect message.

## Inter-Waypoint Trajectory

PX4 expects to follow a straight line from the previous waypoint to the current target (it does not plan any other kind of path between waypoints - if you need one you can simulate this by adding additional waypoints).

MC vehicles will change the *speed* when approach/leaving a waypoint based on whether it uses [slew-rate](../config_mc/mc_slew_rate_type_trajectory.md#mission-mode) or [jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md#auto-mode) tuning.

Vehicles switch to the next waypoint as soon as they enter the acceptance radius.

* For MC this radius is defined by [NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD)
* For FW the radius is defined by the "L1 distance". 
  * The L1 distance is computed from two parameters: [FW_L1_DAMPING](../advanced_config/parameter_reference.md#FW_L1_DAMPING) and [FW_L1_PERIOD](../advanced_config/parameter_reference.md#FW_L1_PERIOD), and the current ground speed.
  * By default, it's about 70 meters.
  * The equation is: $$L_{1_{distance}}=\frac{1}{\pi}L_{1_{damping}}L_{1_{period}}\left \| \vec{v}*{ {xy}*{ground} } \right \|$$