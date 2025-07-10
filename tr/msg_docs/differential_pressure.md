---
canonicalUrl: https://docs.px4.io/main/tr/msg_docs/differential_pressure
---

# differential_pressure (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/differential_pressure.msg)

```c
uint64 timestamp                     # time since system start (microseconds)
uint64 timestamp_sample

uint32 device_id                     # unique device ID for the sensor that does not change between power cycles

float32 differential_pressure_pa     # differential pressure reading in Pascals (may be negative)

float32 temperature                  # Temperature provided by sensor in celcius, NAN if unknown

uint32 error_count                   # Number of errors detected by driver

```
