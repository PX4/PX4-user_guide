# gripper (UORB message)

# Used to command an actuation in the gripper, which is mapped to a specific output in the mixer module

[source file](https://github.com/PX4/PX4-Autopilot/blob/main/msg/gripper.msg)

```c
## Used to command an actuation in the gripper, which is mapped to a specific output in the mixer module

uint64 timestamp

int8 command        # Commanded state for the gripper
int8 COMMAND_GRAB = 0
int8 COMMAND_RELEASE = 1

```
