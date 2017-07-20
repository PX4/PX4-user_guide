# MISSION Flight Mode

The MISSION flight mode executes a [predefined mission/flight plan](../flying/missions.md) that has been uploaded to the flight controller. 

> **Note** 
>  * This mode requires GPS.
>  * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes).
>  * The vehicle must be armed before this mode can be engaged.

## Additional Detail

Missions are usually created in [QGroundControl](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html) and uploaded prior to launch (they may also be created in another GCS or by a developer API, and/or uploaded in flight). 

If MISSION mode is activated when no mission is stored, the vehicle will enter [HOLD mode](../flight_modes/hold.md). 

Missions can be paused by activating [HOLD mode](../flight_modes/hold.md). The mission will then continue from the current mission command when you reactivate the MISSION flight mode.

Missions will complete and reset once the vehicle is disarmed. If the mission completes before disarming it will enter [HOLD mode](../flight_modes/hold.md) (in this case the mission is not reset).

For more information about mission planning, see:
* [Mission Planning](../flying/missions.md)
* [Plan View](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html) (*QGroundControl* User Guide)

## Mission Parameters

Mission behaviour is affected by a number of parameters. These cover, for example, how the vehicle will behave if it looses connection to its remote control during a mission ([NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)), the fixed-wing loiter radius for missions ([NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD)), acceptance radius for reaching a waypoint etc.

These are documented here: [Parameter Reference > Mission](../advanced_config/parameter_reference.md#mission)
