# debug_key_value (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/debug_key_value.msg)

```c
uint64 timestamp        # time since system start (microseconds)
char[10] key            # max. 10 characters as key / name
float32 value           # the value to send as debug output

```
