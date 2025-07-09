---
canonicalUrl: https://docs.px4.io/main/zh/msg_docs/Gripper
---

# Gripper (UORB message)

# Used to command an actuation in the gripper, which is mapped to a specific output in the control allocation module

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/Gripper.msg)

```c
## Used to command an actuation in the gripper, which is mapped to a specific output in the control allocation module

uint64 timestamp

int8 command        # Commanded state for the gripper
int8 COMMAND_GRAB = 0
int8 COMMAND_RELEASE = 1

```
