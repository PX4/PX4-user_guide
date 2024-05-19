# VehicleAirData (повідомлення UORB)



[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleAirData.msg)

```c

uint64 timestamp            # time since system start (microseconds)

uint64 timestamp_sample     # the timestamp of the raw data (microseconds)

uint32 baro_device_id       # unique device ID for the selected barometer

float32 baro_alt_meter          # Altitude above MSL calculated from temperature compensated baro sensor data using an ISA corrected for sea level pressure SENS_BARO_QNH.
float32 baro_temp_celcius       # Temperature in degrees Celsius
float32 baro_pressure_pa        # Absolute pressure in Pascals

float32 rho             # air density
float32 eas2tas         # equivalent airspeed to true airspeed conversion factor

uint8 calibration_count     # Calibration changed counter. Монотонічно збільшується, коли змінюється калібрування.

```
