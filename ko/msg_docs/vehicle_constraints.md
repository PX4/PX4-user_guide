---
canonicalUrl: https://docs.px4.io/main/ko/msg_docs/vehicle_constraints
---

# vehicle_constraints (UORB message)

Local setpoint constraints in NED frame setting something to NaN means that no limit is provided

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/vehicle_constraints.msg)

```c
# Local setpoint constraints in NED frame
# setting something to NaN means that no limit is provided

uint64 timestamp # time since system start (microseconds)

float32 speed_up # in meters/sec
float32 speed_down # in meters/sec

bool want_takeoff # tell the controller to initiate takeoff when idling (ignored during flight)

```
