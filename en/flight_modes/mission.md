# Mission Flight Mode

![GPS](../../images/flight_modes/GPS_s.png)

*Mission mode* causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application like [QGroundControl](https://docs.qgroundcontrol.com/en/)(QGC).

<span></span>
> **Note** 
>  * This mode requires 3d position information (e.g. GPS).
>  * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes).
>  * The vehicle must be armed before this mode can be engaged.


## Description

Missions are usually created in a ground control station (e.g. [QGroundControl](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html)) and uploaded prior to launch. They may also be created by a developer API, and/or uploaded in flight. Individual mission commands are handled in a way that is appropriate for each vehicle's flight characteristics (for example loiter is implemented as *hover* for copter and *circle* for fixed-wing). VTOL vehicles follow the behavior and parameters of fixed-wing when in FW mode, and of copter when in MC mode.

> **Note** Missions are uploaded on SD card which needs to be mounted/inserted **before** booting up the autopilot. 

At high level all vehicle types behave in the same way when MISSION mode is engaged:

1. If a mission is stored and PX4 is flying it will execute the [mission/flight plan](../flying/missions.md) from the current step. 
1. If a mission is stored and PX4 is landed:
   * On copters PX4 will execute the [mission/flight plan](../flying/missions.md). If the mission does not have a `TAKEOFF` command then PX4 will fly the vehicle to the minimum altitude before executing the remainder of the flight plan from the current step.
   * On fixed-wing vehicles PX4 will not automatically take off (the autopilot will detect the lack of movement and set the throttle to zero). The vehicle may start executing the mission if hand- or catapult- launched while in mission mode.  
1. If no mission is stored, or if PX4 has finished executing all mission commands:
   * If flying the vehicle will loiter.
   * If landed the vehicle will "wait".
1. You can manually change the current mission command by selecting it in *QGroundControl*. 
   > **Note** If you have a *Jump to item* command in the mission, moving to another item will **not** reset the loop counter. One implication is that if you change the current mission command to 1 this will not "fully restart" the mission.
1. The mission will only reset when the vehicle is disarmed or when a new mission is uploaded.

> **Tip** To automatically disarm the vehicle after it lands in mission mode, in QGroundControl go to [**Vehicle Setup > Safety**](https://docs.qgroundcontrol.com/en/SetupView/Safety.html), navigate to "Land Mode Settings" and check the box labelled "Disarm after". Enter your desired wait time before you want to disarm.

Missions can be paused by activating [HOLD mode](../flight_modes/hold.md). The mission will then continue from the current mission command when you reactivate the MISSION flight mode. While flying in mission mode, if you decide to discontinue the mission and switch to any other mode e.g. position mode, fly the vehicle elsewhere with RC, and then switch back to mission mode, the vehicle will continue the mission from its current position and will fly to the next mission waypoint not visited yet.

   > **Warning** While flying in mission mode, if you switch to any other mode that requires RC control, make sure your throttle RC stick is not zero, otherwise the vehicle will crash down. It is always recommended to center the throttle stick (preferably roll and pitch sticks as well) before switching to any other mode that requires RC (e.g. position or altitude mode). 
 
For more information about mission planning, see:
* [Mission Planning](../flying/missions.md)
* [Plan View](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html) (*QGroundControl* User Guide)


## QGroundControl Support

*QGroundControl* provides additional GCS-level mission handling support (in addition to that provided by the flight controller). For more information see:
* [Remove mission after vehicle lands](https://docs.qgroundcontrol.com/en/releases/stable_v3.2_long.html#remove-mission-after-vehicle-lands) 
* [Resume mission after RTL](https://docs.qgroundcontrol.com/en/releases/stable_v3.2_long.html#resume-mission)


## Mission Parameters

Mission behaviour is affected by a number of parameters. These cover, for example, how the vehicle will behave if it looses connection to its remote control during a mission ([NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)), how the vehicle will be the fixed-wing loiter radius ([NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD)), acceptance radius for reaching a waypoint etc.

These are documented here: [Parameter Reference > Mission](../advanced_config/parameter_reference.md#mission)

> **Tip** You can also directly configure the most common failsafe actions e.g. what to do in case of low battery, RC loss, Data link loss (between vehicle and QGC) and geofence breach in the QGC's [**Vehicle Setup > Safety**](https://docs.qgroundcontrol.com/en/SetupView/Safety.html). Additionally, the **Safety** tab provides the commonly used Return to Home and Land Mode Settings which are also important for mission mode. Configuring these settings is an easier alternative to changing the corresponding parameters in the **Parameters** tab.
