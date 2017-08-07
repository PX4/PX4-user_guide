# MISSION Flight Mode

The MISSION flight mode executes a [predefined mission/flight plan](../flying/missions.md) that has been uploaded to the flight controller. 

> **Note** 
>  * This mode requires GPS.
>  * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes).
>  * The vehicle must be armed before this mode can be engaged.

## Description

Missions are usually created in a ground control station (e.g. [QGroundControl](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html)) and uploaded prior to launch. They may also be created by a developer API, and/or uploaded in flight. Individual mission commands are handled in a way that is appropriate for each vehicle's flight characteristics (for example loiter is implemented as *hover* for copter and *circle* for fixed-wing). VTOL vehicles follow the behavior and parameters of fixed-wing when in FW mode, and of copter when in MC mode.

At high level all vehicle types behave in the same way when MISSION mode is engaged:

1. If a mission is stored and PX4 is flying it will execute the [mission/flight plan](../flying/missions.md) from the current step.
1. If a mission is stored and PX4 is landed:
   * On copters PX4 will execute the [mission/flight plan](../flying/missions.md). If the mission does not have a `TAKEOFF` command then PX4 will add one, flying the vehicle to the minimum altitude before executing the rest of the flight plan.
   * On fixed-wing vehicles PX4 will not automatically take off (the autopilot will detect the lack of movement and set the throttle to zero). The vehicle may start executing the mission if hand- or catapult- launched while in mission mode.  
1. If no mission is stored, or if PX4 has finished executing all mission commands:
   * If flying the vehicle will loiter.
   * If landed the vehicle will "wait".
1. You can manually change the current mission command by selecting it in *QGroundControl*. 
   > **Note** If you have a *Jump to item* command in the mission, moving to another item will **not** reset the loop counter and "fully restart" the mission.
1. The mission will only reset when the vehicle is disarmed or when a new mission is uploaded.

Missions can be paused by activating [HOLD mode](../flight_modes/hold.md). The mission will then continue from the current mission command when you reactivate the MISSION flight mode.
 
For more information about mission planning, see:
* [Mission Planning](../flying/missions.md)
* [Plan View](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html) (*QGroundControl* User Guide)


## QGroundControl Support

*QGroundControl* provides additional GCS-level mission handling support (in addition to that provided by the flight controller). For more information see:
* [Remove mission after vehicle lands](https://docs.qgroundcontrol.com/en/releases/stable_v3.2_long.html#remove-mission-after-vehicle-lands) 
* [Resume mission after RTL](https://docs.qgroundcontrol.com/en/releases/stable_v3.2_long.html#resume-mission)


## Mission Parameters

Mission behaviour is affected by a number of parameters. These cover, for example, how the vehicle will behave if it looses connection to its remote control during a mission ([NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)), the fixed-wing loiter radius ([NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD)), acceptance radius for reaching a waypoint etc.

These are documented here: [Parameter Reference > Mission](../advanced_config/parameter_reference.md#mission)


