# vehicle_angular_acceleration (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/vehicle_angular_acceleration.msg)

```c

uint64 timestamp        # time since system start (microseconds)
uint64 timestamp_sample # timestamp of the data sample on which this message is based (microseconds)

float32[3] xyz          # angular acceleration about the FRD body frame XYZ-axis in rad/s^2

```
