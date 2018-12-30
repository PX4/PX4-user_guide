# 任务模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*任务模式*使飞机执行已上载到飞行控制器的预定义的自主[任务](../flying/missions.md)（飞行计划）。 通常使用地面控制站（GCS）应用程序（如[QGroundControl](https://docs.qgroundcontrol.com/en/)（QGC））创建和上载任务。

<span></span>

> * 此模式需要3维位置信息 (例如GPS)。 *此模式为自动模式（[默认](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE)情况下，RC控制被禁用，除了用于更改模式外）。 * 使用此模式前飞机必须先被激活。

## 参数描述

通常在地面控制站（例如，[QGroundControl](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html)）中创建任务并在发射之前上载。 它们也可以由开发者API创建，和/或在飞行中上传。

以适合于每个飞机飞行特性的方式处理单独的[任务命令](#mission_commands)（例如，留待指令对于旋翼机是*悬停*，对于固定翼是*转圈*）。 VTOL飞机在固定翼模式下遵循固定翼的行为和参数，在多旋翼模式下遵循旋翼机的行为和参数。

> 任务被上传到需要在启动自动驾驶仪**之前**插入的SD卡上。

在高级别，所有飞机类型在使用MISSION模式时表现相同：

1. 如果任务被存储并且PX4正在飞行，则它将从当前步骤执行任务/飞行计划</ 0>。 </li> 
  
  * 如果存储了任务, 并且PX4着陆: 
    * 在旋翼机上PX4 将执行[任务/飞行计划](../flying/missions.md). 如果任务没有`TAKEOFF`命令，则在从当前步骤执行飞行计划的剩余部分之前，PX4将使飞机飞行到最小高度。
    * 在固定翼飞行器上，PX4不会自动起飞（自动驾驶仪将检测运动并将油门设置为零）。 如果在任务模式下手动或弹射发射，飞机可以开始执行任务。 
  * 如果没有存储任务，或者PX4已完成所有任务命令： 
    * 如果正在飞行，飞机将会留待。
    * 如果已着陆，飞机将“等待”。
  * 您可以通过在*QGroundControl*中选择它来手动更改当前任务命令。 **注**如果在任务中有*跳转到项目*命令，则移动到另一个项目将**不**重置循环计数器。 也就意味着，如果将当前任务命令更改为1，则不会“完全重启”任务。
  * 该任务仅在飞机锁定或上传新任务时重置。 要在飞机着陆后自动锁定，请在*QGroundControl*中转到[飞机设置>安全](https://docs.qgroundcontrol.com/en/SetupView/Safety.html)，导航至*着陆模式设置*并选中标有*之后锁定*的框。 在锁定飞机之前输入着陆后等待的时间。</ol> 
  
  可以通过激活[HOLD模式](../flight_modes/hold.md)暂停任务。 当您重新激活MISSION飞行模式时，任务将从当前任务命令继续。 在任务模式下飞行时，如果您决定停止任务并切换到任何其他模式，例如位置模式，用遥控器将飞机转移到其他地方，然后切换回任务模式，飞机将从当前位置继续执行任务，并将飞往尚未访问的下一个任务点。
  
  > **Warning** Ensure that the throttle stick is non-zero before switching to any RC mode (otherwise the vehicle will crash).We recommend you centre the control sticks before switching to any other mode.
  
  For more information about mission planning, see:
  
  * [Mission Planning](../flying/missions.md)
  * [Plan View](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html) (*QGroundControl* User Guide)
  
  ## QGroundControl Support
  
  *QGroundControl* provides additional GCS-level mission handling support (in addition to that provided by the flight controller). 有关详细信息，请参阅︰
  
  * [Remove mission after vehicle lands](https://docs.qgroundcontrol.com/en/releases/stable_v3.2_long.html#remove-mission-after-vehicle-lands) 
  * [Resume mission after Return mode](https://docs.qgroundcontrol.com/en/releases/stable_v3.2_long.html#resume-mission)
  
  ## Mission Parameters
  
  Mission behaviour is affected by a number of parameters. These cover, for example, how the vehicle will behave if it looses connection to its remote control during a mission ([NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)), the fixed-wing loiter radius ([NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD)), acceptance radius for reaching a waypoint etc.
  
  These are documented here: [Parameter Reference > Mission](../advanced_config/parameter_reference.md#mission)
  
  ## Supported Mission Commands {#mission_commands}
  
  PX4 "accepts" the following MAVLink mission commands in Mission mode (note: caveats below list). Unless otherwise noted, the implementation is as defined in the MAVLink speification.
  
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
  * The list may be [out of date](#out_of_date) as messages are added. You can check the current set by inspecting the code. Support is `MavlinkMissionManager::parse_mavlink_mission_item` in [/src/modules/mavlink/mavlink_mission.cpp](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_mission.cpp) (list generated in [this git changelist](https://github.com/PX4/Firmware/commit/ca1f7a4a194c23303c23ca79b5905ff8bfb94c22)).
    
    > **Note** Please add an bug fix or PR if you find a missing/incorrect message.