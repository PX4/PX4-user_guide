---
canonicalUrl: https://docs.px4.io/main/tr/msg_docs/sensor_hygrometer
---

# sensor_hygrometer (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/sensor_hygrometer.msg)

```c
uint64 timestamp          # time since system start (microseconds)
uint64 timestamp_sample

uint32 device_id          # unique device ID for the sensor that does not change between power cycles

float32  temperature      # Temperature provided by sensor (Celcius)

float32 humidity          # Humidity provided by sensor

```
