---
canonicalUrl: https://docs.px4.io/main/ko/msg_docs/vehicle_air_data
---

# vehicle_air_data (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/vehicle_air_data.msg)

```c

uint64 timestamp            # time since system start (microseconds)

uint64 timestamp_sample     # the timestamp of the raw data (microseconds)

uint32 baro_device_id       # unique device ID for the selected barometer

float32 baro_alt_meter          # Altitude above MSL calculated from temperature compensated baro sensor data using an ISA corrected for sea level pressure SENS_BARO_QNH.
float32 baro_temp_celcius       # Temperature in degrees Celsius
float32 baro_pressure_pa        # Absolute pressure in Pascals

float32 rho             # air density

uint8 calibration_count     # Calibration changed counter. Monotonically increases whenever calibration changes.

```
