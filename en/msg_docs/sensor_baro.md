# sensor_baro (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/sensor_baro.msg)

```c
uint64 timestamp          # time since system start (microseconds)
uint64 timestamp_sample

uint32 device_id          # unique device ID for the sensor that does not change between power cycles

uint32 error_count

float32 pressure	# static pressure measurement in millibar

float32 temperature	# static temperature measurement in deg Celsius

```
