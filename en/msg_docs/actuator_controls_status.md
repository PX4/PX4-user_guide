---
canonicalUrl: https://docs.px4.io/main/en/msg_docs/actuator_controls_status
---

# actuator_controls_status (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/actuator_controls_status.msg)

```c
uint64 timestamp			# time since system start (microseconds)

uint8 INDEX_ROLL = 0
uint8 INDEX_PITCH = 1
uint8 INDEX_YAW = 2
uint8 INDEX_THROTTLE = 3

float32[4] control_power

# TOPICS actuator_controls_status actuator_controls_status_0 actuator_controls_status_1

```
