---
canonicalUrl: https://docs.px4.io/main/ru/msg_docs/sensor_preflight_mag
---

# sensor_preflight_mag (UORB message)

Pre-flight sensor check metrics. The topic will not be updated when the vehicle is armed

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/sensor_preflight_mag.msg)

```c
#
# Pre-flight sensor check metrics.
# The topic will not be updated when the vehicle is armed
#
uint64 timestamp # time since system start (microseconds)

float32 mag_inconsistency_angle # maximum angle between magnetometer instance field vectors in radians.

```
