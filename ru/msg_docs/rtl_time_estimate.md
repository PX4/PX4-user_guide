---
canonicalUrl: https://docs.px4.io/main/ru/msg_docs/rtl_time_estimate
---

# rtl_time_estimate (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/rtl_time_estimate.msg)

```c
uint64 timestamp # time since system start (microseconds)

bool valid          # Flag indicating whether the time estiamtes are valid
float32 time_estimate       # [s] Estimated time for RTL
float32 safe_time_estimate  # [s] Same as time_estimate, but with safety factor and safety margin included (factor*t + margin)

```
