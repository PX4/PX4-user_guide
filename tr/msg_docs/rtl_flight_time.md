---
canonicalUrl: https://docs.px4.io/main/tr/msg_docs/rtl_flight_time
---

# rtl_flight_time (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/rtl_flight_time.msg)

```c
uint64 timestamp                # time since system start (microseconds)

float32 rtl_time_s              # how long in seconds will the RTL take
float32 rtl_limit_fraction          # what fraction of the allowable RTL time would be taken

```
