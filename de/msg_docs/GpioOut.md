---
canonicalUrl: https://docs.px4.io/main/de/msg_docs/GpioOut
---

# GpioOut (UORB message)

GPIO mask and state

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/GpioOut.msg)

```c
# GPIO mask and state

uint64 timestamp            # time since system start (microseconds)
uint32 device_id            # Device id

uint32 mask             # pin mask
uint32 state                # pin state mask

```
