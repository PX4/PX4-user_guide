---
canonicalUrl: https://docs.px4.io/main/de/test_cards/mc_04_failsafe_testing
---

# Test MC_04 - Failsafe Testing

❏ Verify RC Loss action is Return to Land

❏ Verify Data Link Loss action is Return to Land and the timeout is 10 seconds

❏ Verify Battery failsafe

&nbsp;&nbsp;&nbsp;&nbsp;❏ Action is Return to Land

&nbsp;&nbsp;&nbsp;&nbsp;❏ Battery Warn Level is 25%

&nbsp;&nbsp;&nbsp;&nbsp;❏ Battery Failsafe Level is 20%

&nbsp;&nbsp;&nbsp;&nbsp;❏ Battery Emergency Level is 15%

❏ Take off in Altitude mode

❏ Move at least 20 meters away home position

❏ RC loss

&nbsp;&nbsp;&nbsp;&nbsp;❏Turn off RC and check the vehicle returns to home position, wait for the descent and turn on the RC and take over.

## Datalink Loss

❏ Disconnect telemetry, vehicle should return to home position after 10 seconds, wait for the descent and reconnect the telemetry radio

## Switch to Altitude Mode

❏ Make sure roll, pitch and yaw sticks respond like in Stabilize mode

❏ Throttle should control altitude, and when the stick is centered it must maintain altitude

## Switch to Position Mode

❏ When the sticks are centered, it must maintain position

❏ Move roll, pitch and yaw and check the vehicle is moving according to the inputs

❏ Center the sticks again and check the vehicle maintains position

## Wait for Battery Failsafe to Trigger

❏ Confirm the warning message is received in QGC

❏ Confirm the vehicle returns to land

❏ Confirm the vehicle lands.
