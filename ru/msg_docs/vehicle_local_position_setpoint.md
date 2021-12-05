# vehicle_local_position_setpoint (UORB message)

Local position setpoint in NED frame setting something to NaN means the state should not be controlled

[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/vehicle_local_position_setpoint.msg)

```c
# Local position setpoint in NED frame
# setting something to NaN means the state should not be controlled

uint64 timestamp    # time since system start (microseconds)

float32 x       # in meters NED
float32 y       # in meters NED
float32 z       # in meters NED
float32 yaw     # in radians NED -PI..+PI
float32 yawspeed    # in radians/sec
float32 vx      # in meters/sec
float32 vy      # in meters/sec
float32 vz      # in meters/sec
float32[3] acceleration # in meters/sec^2
float32[3] jerk # in meters/sec^3
float32[3] thrust   # normalized thrust vector in NED

# TOPICS vehicle_local_position_setpoint trajectory_setpoint

```
