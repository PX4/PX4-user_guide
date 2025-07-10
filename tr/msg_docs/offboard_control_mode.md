---
canonicalUrl: https://docs.px4.io/main/tr/msg_docs/offboard_control_mode
---

# offboard_control_mode (UORB message)

Off-board control mode

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/offboard_control_mode.msg)

```c
# Off-board control mode

uint64 timestamp        # time since system start (microseconds)

bool position
bool velocity
bool acceleration
bool attitude
bool body_rate
bool actuator

```
