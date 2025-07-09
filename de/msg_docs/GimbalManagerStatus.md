---
canonicalUrl: https://docs.px4.io/main/de/msg_docs/GimbalManagerStatus
---

# GimbalManagerStatus (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/GimbalManagerStatus.msg)

```c
uint64 timestamp        # time since system start (microseconds)

uint32 flags
uint8 gimbal_device_id
uint8 primary_control_sysid
uint8 primary_control_compid
uint8 secondary_control_sysid
uint8 secondary_control_compid

```
