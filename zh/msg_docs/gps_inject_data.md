---
canonicalUrl: https://docs.px4.io/main/zh/msg_docs/gps_inject_data
---

# gps_inject_data (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/gps_inject_data.msg)

```c
uint64 timestamp        # time since system start (microseconds)

uint32 device_id                # unique device ID for the sensor that does not change between power cycles

uint8 len                       # length of data
uint8 flags                     # LSB: 1=fragmented
uint8[300] data                 # data to write to GPS device (RTCM message)

uint8 ORB_QUEUE_LENGTH = 8

```
