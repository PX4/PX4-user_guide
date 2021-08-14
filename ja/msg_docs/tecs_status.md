# tecs_status (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/tecs_status.msg)

```c
uint64 timestamp        # time since system start (microseconds)
uint8 TECS_MODE_NORMAL = 0
uint8 TECS_MODE_UNDERSPEED = 1
uint8 TECS_MODE_TAKEOFF = 2
uint8 TECS_MODE_LAND = 3
uint8 TECS_MODE_LAND_THROTTLELIM = 4
uint8 TECS_MODE_BAD_DESCENT = 5
uint8 TECS_MODE_CLIMBOUT = 6


float32 altitude_sp
float32 altitude_filtered
float32 height_rate_setpoint
float32 height_rate
float32 equivalent_airspeed_sp
float32 true_airspeed_sp
float32 true_airspeed_filtered
float32 true_airspeed_derivative_sp
float32 true_airspeed_derivative
float32 true_airspeed_derivative_raw
float32 true_airspeed_innovation

float32 total_energy_error
float32 energy_distribution_error
float32 total_energy_rate_error
float32 energy_distribution_rate_error

float32 total_energy
float32 total_energy_rate
float32 total_energy_balance
float32 total_energy_balance_rate

float32 total_energy_sp
float32 total_energy_rate_sp
float32 total_energy_balance_sp
float32 total_energy_balance_rate_sp

float32 throttle_integ
float32 pitch_integ

float32 throttle_sp
float32 pitch_sp_rad

uint8 mode

```
