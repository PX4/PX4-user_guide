---
canonicalUrl: https://docs.px4.io/main/de/msg_docs/VehicleAcceleration
---

# VehicleAcceleration (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/VehicleAcceleration.msg)

```c

uint64 timestamp        # time since system start (microseconds)

uint64 timestamp_sample     # the timestamp of the raw data (microseconds)

float32[3] xyz          # Bias corrected acceleration (including gravity) in the FRD body frame XYZ-axis in m/s^2

```
