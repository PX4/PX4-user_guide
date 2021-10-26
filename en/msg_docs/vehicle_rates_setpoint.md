# vehicle_rates_setpoint (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/vehicle_rates_setpoint.msg)

```c
uint64 timestamp	# time since system start (microseconds)

float32 roll		# body angular rates in NED frame
float32 pitch		# body angular rates in NED frame
float32 yaw		# body angular rates in NED frame

# For clarification: For multicopters thrust_body[0] and thrust[1] are usually 0 and thrust[2] is the negative throttle demand.
# For fixed wings thrust_x is the throttle demand and thrust_y, thrust_z will usually be zero.
float32[3] thrust_body	# Normalized thrust command in body NED frame [-1,1]

```
