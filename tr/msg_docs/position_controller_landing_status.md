---
canonicalUrl: https://docs.px4.io/main/tr/msg_docs/position_controller_landing_status
---

# position_controller_landing_status (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/position_controller_landing_status.msg)

```c
uint64 timestamp        # time since system start (microseconds)

float32 horizontal_slope_displacement

float32 slope_angle_rad

float32 flare_length

bool abort_landing              # true if landing should be aborted

```
