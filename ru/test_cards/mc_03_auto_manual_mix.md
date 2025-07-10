---
canonicalUrl: https://docs.px4.io/main/ru/test_cards/mc_03_auto_manual_mix
---

# Test MC_03 - Auto Manual Mix

## Create and Upload Mission

❏ Mission Criteria

&nbsp;&nbsp;&nbsp;&nbsp;❏ Changes in Altitude throughout the mission

&nbsp;&nbsp;&nbsp;&nbsp;❏ Mission should end in the air and NOT Land/RTL

&nbsp;&nbsp;&nbsp;&nbsp;❏ Duration of 3 to 4 minutes

❏ Upload mission to vehicle using *QGroundControl*

## Flight

❏ Arm and take-off in Position mode

❏ Engage Auto

❏ Observe tracking and cornering

❏ Once mission has completed, switch back to Position mode

&nbsp;&nbsp;&nbsp;&nbsp;❏ Horizontal position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Vertical position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Throttle response set to Climbs/Descend rate

&nbsp;&nbsp;&nbsp;&nbsp;❏ Pitch/Roll/Yaw response set to Pitch/Roll/Yaw rates

❏ Engage RTL

❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))


## Expected Results

* Take-off should be smooth as throttle is raised
* No oscillations should present in any of the above flight modes
* Upon landing, copter should not bounce on the ground

