# TecsStatus (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/main/msg/TecsStatus.msg)

```c
uint64 timestamp        # time since system start (microseconds)

float32 altitude_sp         # Altitude setpoint AMSL [m]
float32 altitude_sp_filtered        # Altitude setpoint filtered AMSL [m]
float32 height_rate_setpoint        # Height rate setpoint [m/s]
float32 height_rate         # Height rate [m/s]
float32 equivalent_airspeed_sp      # Equivalent airspeed setpoint [m/s]
float32 true_airspeed_sp        # True airspeed setpoint [m/s]
float32 true_airspeed_filtered      # True airspeed filtered [m/s]
float32 true_airspeed_derivative_sp # True airspeed derivative setpoint [m/s^2]
float32 true_airspeed_derivative    # True airspeed derivative [m/s^2]
float32 true_airspeed_derivative_raw    # True airspeed derivative raw [m/s^2]

float32 total_energy_rate_sp        # Total energy rate setpoint [m^2/s^3]
float32 total_energy_rate       # Total energy rate estimate [m^2/s^3]

float32 total_energy_balance_rate_sp    # Energy balance rate setpoint [m^2/s^3]
float32 total_energy_balance_rate   # Energy balance rate estimate [m^2/s^3]

float32 throttle_integ          # Throttle integrator value [-]
float32 pitch_integ         # Pitch integrator value [rad]

float32 throttle_sp         # Current throttle setpoint [-]
float32 pitch_sp_rad            # Current pitch setpoint [rad]
float32 throttle_trim           # estimated throttle value [0,1] required to fly level at equivalent_airspeed_sp in the current atmospheric conditions

# TECS mode
uint8 mode
uint8 TECS_MODE_NORMAL = 0
uint8 TECS_MODE_UNDERSPEED = 1
uint8 TECS_MODE_TAKEOFF = 2
uint8 TECS_MODE_LAND = 3
uint8 TECS_MODE_LAND_THROTTLELIM = 4
uint8 TECS_MODE_BAD_DESCENT = 5
uint8 TECS_MODE_CLIMBOUT = 6

```
