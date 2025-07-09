---
canonicalUrl: https://docs.px4.io/main/ko/msg_docs/ActuatorServosTrim
---

# ActuatorServosTrim (UORB message)

Servo trims, added as offset to servo outputs

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/ActuatorServosTrim.msg)

```c
# Servo trims, added as offset to servo outputs
uint64 timestamp            # time since system start (microseconds)

uint8 NUM_CONTROLS = 8
float32[8] trim    # range: [-1, 1]

```
