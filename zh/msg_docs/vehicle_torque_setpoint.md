---
canonicalUrl: https://docs.px4.io/main/zh/msg_docs/vehicle_torque_setpoint
---

# vehicle_torque_setpoint (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/vehicle_torque_setpoint.msg)

```c

uint64 timestamp        # time since system start (microseconds)
uint64 timestamp_sample # timestamp of the data sample on which this message is based (microseconds)

float32[3] xyz          # torque setpoint about X, Y, Z body axis (normalized)

```
