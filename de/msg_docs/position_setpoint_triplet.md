# position_setpoint_triplet (UORB message)

Global position setpoint triplet in WGS84 coordinates. This are the three next waypoints (or just the next two or one).

[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/position_setpoint_triplet.msg)

```c
# Global position setpoint triplet in WGS84 coordinates.
# This are the three next waypoints (or just the next two or one).

uint64 timestamp        # time since system start (microseconds)

px4/position_setpoint previous
px4/position_setpoint current
px4/position_setpoint next

```
