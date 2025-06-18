# RoverSteeringSetpoint (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/main/msg/RoverSteeringSetpoint.msg)

```c
uint64 timestamp # time since system start (microseconds)

float32 normalized_steering_setpoint # [-1, 1] Positiv = Turn right, Negativ: Turn left (Ackermann: Steering angle, Differential/Mecanum: Speed difference between the left and right wheels)

```
