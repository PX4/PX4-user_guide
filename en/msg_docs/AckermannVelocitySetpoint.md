# AckermannVelocitySetpoint (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/main/msg/AckermannVelocitySetpoint.msg)

```c
uint64 timestamp # time since system start (microseconds)

float32[2] velocity_ned # 2-dimensional velocity setpoint in NED frame [m/s]
bool backwards	        # Flag for backwards driving

```
