---
canonicalUrl: https://docs.px4.io/main/en/test_cards/mc_01_manual_modes
---

# Test MC_01 - Manual Modes

## Arm and Take-off

❏ Set flight mode to stabilize and Arm

❏ Take-off by raising the throttle


## Flight

❏ Stabilized

&nbsp;&nbsp;&nbsp;&nbsp;❏ Pitch/Roll/Yaw response 1:1

&nbsp;&nbsp;&nbsp;&nbsp;❏ Throttle response 1:1

❏ Altitude

&nbsp;&nbsp;&nbsp;&nbsp;❏ Vertical position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Pitch/Roll/Yaw response 1:1

&nbsp;&nbsp;&nbsp;&nbsp;❏ Throttle response set to Climbs/Descend rate

❏ Position

&nbsp;&nbsp;&nbsp;&nbsp;❏ Horizontal position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Vertical position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Throttle response set to Climbs/Descend rate

&nbsp;&nbsp;&nbsp;&nbsp;❏ Pitch/Roll/Yaw response set to Pitch/Roll/Yaw rates


## Landing

❏ Land in Position mode with the throttle below 40%
  
❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))


## Expected Results

* Take-off should be smooth as throttle is raised
* No oscillations should present in any of the above flight modes
* Upon landing, copter should not bounce on the ground
