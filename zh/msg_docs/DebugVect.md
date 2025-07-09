---
canonicalUrl: https://docs.px4.io/main/zh/msg_docs/DebugVect
---

# DebugVect (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/DebugVect.msg)

```c
uint64 timestamp    # time since system start (microseconds)
char[10] name           # max. 10 characters as key / name
float32 x               # x value
float32 y               # y value
float32 z               # z value

```
