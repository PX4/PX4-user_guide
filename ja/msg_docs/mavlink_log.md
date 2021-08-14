# mavlink_log (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/mavlink_log.msg)

```c
uint64 timestamp        # time since system start (microseconds)

char[127] text
uint8 severity # log level (same as in the linux kernel, starting with 0)

uint8 ORB_QUEUE_LENGTH = 8

```
