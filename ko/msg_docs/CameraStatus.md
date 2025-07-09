---
canonicalUrl: https://docs.px4.io/main/ko/msg_docs/CameraStatus
---

# CameraStatus (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/CameraStatus.msg)

```c
uint64 timestamp        # time since system start (microseconds)

uint8 active_sys_id     # mavlink system id of the currently active camera
uint8 active_comp_id    # mavlink component id of currently active camera

```
