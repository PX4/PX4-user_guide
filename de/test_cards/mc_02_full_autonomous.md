---
canonicalUrl: https://docs.px4.io/main/de/test_cards/mc_02_full_autonomous
---

# Test MC_02 - Full Autonomous

## Create and upload mission

❏ Mission Criteria

&nbsp;&nbsp;&nbsp;&nbsp;❏ Auto take-off

&nbsp;&nbsp;&nbsp;&nbsp;❏ Changes in Altitude throughout the mission

&nbsp;&nbsp;&nbsp;&nbsp;❏ First waypoint set to Takeoff

&nbsp;&nbsp;&nbsp;&nbsp;❏ Enable Mission End RTL

&nbsp;&nbsp;&nbsp;&nbsp;❏ Duration of 5 to 6 minutes

❏ Upload mission to vehicle using *QGroundControl*


## Arm and Take-off

❏ Arm in any manual mode

❏ Engage Auto to trigger take-off

❏ Observe tracking, cornering and proper RTL performance

❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))



## Expected Results

* Take-off should be smooth as throttle is raised
* Mission should upload on first attempt
* Vehicle should automatically take-off upon engaging Auto
* Upon landing, copter should not bounce on the ground




<!-- 
MC_002 - Full autonomous

-   Make sure the auto-disarm is enabled
-   QGC open test1_mission.plan and sync to the vehicle
-   Takeoff from QGC start mission slider
-   Check the vehicle completes the mission
-   Let the vehicle to auto land, take manual control if needed and explain the reason in log description.
-   Check the vehicle disarms by itself.
-->
