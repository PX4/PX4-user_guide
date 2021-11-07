# offboard_control_mode (UORB message)

Off-board control mode

[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/offboard_control_mode.msg)

```c
# Off-board control mode

uint64 timestamp        # time since system start (microseconds)

bool position
bool velocity
bool acceleration
bool attitude
bool body_rate
bool actuator

```
