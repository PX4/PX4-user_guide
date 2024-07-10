# GpioIn (повідомлення UORB)

Маска та стан GPIO

[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/msg/GpioIn.msg)

```c
# GPIO mask and state

uint64 timestamp            # time since system start (microseconds)
uint32 device_id            # Device id

uint32 state                # pin state mask

```
