---
canonicalUrl: https://docs.px4.io/main/ja/msg_docs/GpioIn
---

# GpioIn (UORB message)

GPIO mask and state

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/GpioIn.msg)

```c
# GPIO mask and state

uint64 timestamp            # time since system start (microseconds)
uint32 device_id            # Device id

uint32 state                # pin state mask

```
