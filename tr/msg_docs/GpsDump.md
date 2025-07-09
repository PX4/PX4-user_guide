---
canonicalUrl: https://docs.px4.io/main/tr/msg_docs/GpsDump
---

# GpsDump (UORB message)

This message is used to dump the raw gps communication to the log. Set the parameter GPS_DUMP_COMM to 1 to use this.

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/GpsDump.msg)

```c
# This message is used to dump the raw gps communication to the log.
# Set the parameter GPS_DUMP_COMM to 1 to use this.

uint64 timestamp        # time since system start (microseconds)

uint8 instance      # Instance of GNSS receiver

uint8 len           # length of data, MSB bit set = message to the gps device,
                # clear = message from the device
uint8[79] data      # data to write to the log

uint8 ORB_QUEUE_LENGTH = 8

```
