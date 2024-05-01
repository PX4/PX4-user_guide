# VehicleRatesSetpoint (повідомлення UORB)



[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleRatesSetpoint.msg)

```c
uint64 timestamp    # time since system start (microseconds)

# body angular rates in NED frame
float32 roll        # [rad/s] roll rate setpoint
float32 pitch       # [rad/s] pitch rate setpoint
float32 yaw     # [rad/s] yaw rate setpoint

# For clarification: For multicopters thrust_body[0] and thrust[1] are usually 0 and thrust[2] is the negative throttle demand.
# Для фіксованих крил thrust_x - це запит ручки газу, а thrust_y, thrust_z зазвичай буде нульовими.
float32[3] thrust_body  # Normalized thrust command in body NED frame [-1,1]

bool reset_integral # Reset roll/pitch/yaw integrals (navigation logic change)

```
