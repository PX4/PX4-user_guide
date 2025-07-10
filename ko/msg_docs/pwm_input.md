---
canonicalUrl: https://docs.px4.io/main/ko/msg_docs/pwm_input
---

# pwm_input (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/pwm_input.msg)

```c
uint64 timestamp    # Time since system start (microseconds)
uint64 error_count  # Timer overcapture error flag (AUX5 or MAIN5)
uint32 pulse_width  # Pulse width, timer counts
uint32 period       # Period, timer counts

```
