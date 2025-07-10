---
canonicalUrl: https://docs.px4.io/main/de/msg_docs/actuator_servos_trim
---

# actuator_servos_trim (UORB message)

Servo trims, added as offset to servo outputs

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/actuator_servos_trim.msg)

```c
# Servo trims, added as offset to servo outputs
uint64 timestamp            # time since system start (microseconds)

uint8 NUM_CONTROLS = 8
float32[8] trim    # range: [-1, 1]

```
