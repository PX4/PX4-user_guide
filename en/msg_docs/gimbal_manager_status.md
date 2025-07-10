---
canonicalUrl: https://docs.px4.io/main/en/msg_docs/gimbal_manager_status
---

# gimbal_manager_status (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/gimbal_manager_status.msg)

```c
uint64 timestamp		# time since system start (microseconds)

uint32 flags
uint8 gimbal_device_id
uint8 primary_control_sysid
uint8 primary_control_compid
uint8 secondary_control_sysid
uint8 secondary_control_compid

```
