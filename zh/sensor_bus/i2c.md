# I2C 总线概述

I2C 是一种分组交换串行通信协议，允许多个主设备连接到多个从属设备，每个连接只需使用2根电线。 它用于在短距离、板内通信中将低速外设 IC 连接到处理器和微控制器。

Pixhawk/PX4 支持：
* 连接需要比严格的串行 UART 更高数据速率的板载组件：例如测距仪。
* 与仅支持 I2C 的外围设备兼容。
* 允许多个设备连接到单个总线（有效保护端口）。 例如，LED、指南针、测距仪等。

> **Tip** IMU（加速度计/陀螺仪）不应通过 I2C 连接（通常使用 [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus) 总线）。 即使连一个设备可以进行振动过滤（实例），总线的速度也不够快，并且总线上的每一个额外设备都会进一步降低性能。


## 集成 I2C 设备

驱动程序应 `#include<drivers/device/i2c.h>`，然后提供在目标硬件（即 Nuttx 的[这里](https://github.com/PX4/Firmware/blob/master/src/drivers/device/nuttx/I2C.hpp)）的 **I2C.hpp** 中定义的抽象基类 `I2C` 的实现。

驱动程序还需要在 [/src/drivers/](https://github.com/PX4/Firmware/tree/master/src/drivers) 中包括其设备类型（**drv_*.h**）的标头--例如 [drv_baro.h](https://github.com/PX4/Firmware/blob/master/src/drivers/drv_baro.h)。

若要在固件中包含驱动程序，必须将驱动程序添加到与要为其生成的目标相对应的 [cmake 配置文件](https://github.com/PX4/Firmware/tree/master/cmake/configs)：
```
drivers/sf1xx
```

> **Tip** 例如，您可以在 [px4_fmu-v4_default](https://github.com/PX4/Firmware/blob/master/boards/px4/fmu-v4/default.cmake) 配置中搜索此驱动程序。


## I2C 驱动程序示例

若要查找 I2C 驱动程序示例，请在 [/src/drivers/](https://github.com/PX4/Firmware/tree/master/src/drivers) 中搜索 **i2c.h**。

仅举几个例子：
* [drivers/sf1xx](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/sf1xx)-i2c 驱动程序，用于 [Lightware sf1xx lidar](https://docs.px4.io/en/sensor/sfxx_lidar.html)。
* [drivers/ms5611](https://github.com/PX4/Firmware/tree/master/src/drivers/barometer/ms5611)-通过 I2C（或 SPI）连接的 MS5611 和 MS6507 气压传感器的 I2C 驱动程序。

## 更多信息

* [I2C](https://en.wikipedia.org/wiki/I%C2%B2C)（维基百科）
* [I2C 比较审查 ](https://learn.sparkfun.com/tutorials/i2c)（learn.sparkfun.com）
* [驱动程序框架](../middleware/drivers.md)
