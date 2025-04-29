# DifferentialVelocitySetpoint (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/main/msg/DifferentialVelocitySetpoint.msg)

```c
uint64 timestamp # time since system start (microseconds)

float32 speed   # [m/s] [-inf, inf] Speed setpoint (Backwards driving if negative)
float32 bearing # [rad] [-pi,pi] from North.

```
