---
canonicalUrl: https://docs.px4.io/main/ru/msg_docs/PwmInput
---

# PwmInput (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/PwmInput.msg)

```c
uint64 timestamp    # Time since system start (microseconds)
uint64 error_count  # Timer overcapture error flag (AUX5 or MAIN5)
uint32 pulse_width  # Pulse width, timer counts
uint32 period       # Period, timer counts

```
