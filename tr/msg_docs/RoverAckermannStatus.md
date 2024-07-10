# RoverAckermannStatus (UORB message)

[source file](https://github.com/PX4/PX4-Autopilot/blob/main/msg/RoverAckermannStatus.msg)

```c
uint64 timestamp # time since system start (microseconds)

float32 throttle_setpoint 	# [-1, 1] Normalized throttle setpoint
float32 steering_setpoint 	# [-1, 1] Normalized steering setpoint
float32 actual_speed       	# [m/s] Rover ground speed

# TOPICS rover_ackermann_status

```
