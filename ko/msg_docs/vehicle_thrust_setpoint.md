# vehicle_thrust_setpoint (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/vehicle_thrust_setpoint.msg)

```c

uint64 timestamp        # time since system start (microseconds)
uint64 timestamp_sample # timestamp of the data sample on which this message is based (microseconds)

float32[3] xyz          # thrust setpoint along X, Y, Z body axis [-1, 1]

```
