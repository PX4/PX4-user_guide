---
canonicalUrl: https://docs.px4.io/main/de/msg_docs/FollowTarget
---

# FollowTarget (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/FollowTarget.msg)

```c
uint64 timestamp  # time since system start (microseconds)

float64 lat       # target position (deg * 1e7)
float64 lon       # target position (deg * 1e7)
float32 alt       # target position

float32 vy        # target vel in y
float32 vx        # target vel in x
float32 vz        # target vel in z

uint8 est_cap     # target reporting capabilities

```
