---
canonicalUrl: https://docs.px4.io/main/ko/msg_docs/vehicle_actuator_setpoint
---

# vehicle_actuator_setpoint (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/vehicle_actuator_setpoint.msg)

```c
uint64 timestamp                   # time since system start (microseconds)
uint64 timestamp_sample            # the timestamp the data this control response is based on was sampled

uint8 NUM_ACTUATOR_SETPOINT = 16

float32[16] actuator

```
