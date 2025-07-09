---
canonicalUrl: https://docs.px4.io/main/en/msg_docs/SensorPreflightMag
---

# SensorPreflightMag (UORB message)

Pre-flight sensor check metrics.
The topic will not be updated when the vehicle is armed

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/SensorPreflightMag.msg)

```c
#
# Pre-flight sensor check metrics.
# The topic will not be updated when the vehicle is armed
#
uint64 timestamp # time since system start (microseconds)

float32 mag_inconsistency_angle # maximum angle between magnetometer instance field vectors in radians.

```
