---
canonicalUrl: https://docs.px4.io/main/zh/sensor_bus/i2c
---

# I2C 总线概述

I2C 是一种分组交换串行通信协议，允许多个主设备连接到多个从属设备，每个连接只需使用2根电线。 它用于在短距离、板内通信中将低速外设 IC 连接到处理器和微控制器。

Pixhawk/PX4 支持：
* 连接需要比严格的串行 UART 更高数据速率的板载组件：例如测距仪。
* 与仅支持 I2C 的外围设备兼容。
* 允许多个设备连接到单个总线（有效保护端口）。 例如，LED、指南针、测距仪等。

:::tip IMUs (accelerometers/gyroscopes) should not be attached via I2C (typically the [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus) bus is used). The bus is not fast enough even with a single device attached to allow vibration filtering (for instance), and the performance degrades further with every additional device on the bus.
:::

## 集成 I2C 设备

驱动程序还需要在 [/src/drivers/](https://github.com/PX4/Firmware/tree/master/src/drivers) 中包括其设备类型（**drv_*.h**）的标头--例如 [drv_baro.h](https://github.com/PX4/Firmware/blob/master/src/drivers/drv_baro.h)。

若要在固件中包含驱动程序，必须将驱动程序添加到与要为其生成的目标相对应的 [cmake 配置文件](https://github.com/PX4/Firmware/tree/master/cmake/configs)：

To include a driver in firmware you must add the driver to the board-specific cmake file that corresponds to the target you want to build for. You can do this for a single driver:
```
drivers/sf1xx
```

You can also include all drivers of a particular type.
```
distance_sensor # all available distance sensor drivers
```


:::tip
For example, you can see/search for `distance_sensor` in the [px4_fmu-v4_default](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v4/default.cmake) configuration.
:::

## I2C 驱动程序示例

To find I2C driver examples, search for **i2c.h** in [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers).

Just a few examples are:
* [drivers/sf1xx](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/sf1xx)-i2c 驱动程序，用于 [Lightware sf1xx lidar](https://docs.px4.io/en/sensor/sfxx_lidar.html)。
* [drivers/ms5611](https://github.com/PX4/Firmware/tree/master/src/drivers/barometer/ms5611)-通过 I2C（或 SPI）连接的 MS5611 和 MS6507 气压传感器的 I2C 驱动程序。
* [drivers/ms5611](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/ms5611) - I2C Driver for the MS5611 and MS6507 barometric pressure sensor connected via I2C (or SPI).

## 更多信息

* [I2C](https://en.wikipedia.org/wiki/I%C2%B2C)（维基百科）
* [I2C 比较审查 ](https://learn.sparkfun.com/tutorials/i2c)（learn.sparkfun.com）
* [驱动程序框架](../middleware/drivers.md)
