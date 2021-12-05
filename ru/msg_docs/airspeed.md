# airspeed (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/airspeed.msg)

```c
uint64 timestamp            # time since system start (microseconds)

float32 indicated_airspeed_m_s      # indicated airspeed in m/s

float32 true_airspeed_m_s       # true filtered airspeed in m/s

float32 air_temperature_celsius     # air temperature in degrees celsius, -1000 if unknown

float32 confidence          # confidence value from 0 to 1 for this sensor

```
