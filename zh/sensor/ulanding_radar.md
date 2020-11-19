# Ainstein US-D1 Standard Radar Altimeter

> **Tip** This supersedes the *Aerotenna uLanding Radar* (discontinued) but uses the same driver/setup.

The *Ainstein* [US-D1 Standard Radar Altimeter](https://ainstein.ai/drone-makers-drone-service-providers/us-d1/) is a compact microwave rangefinder that has been optimised for use on UAVs. With a sensing range of about 40 metres, it is useful for applications including terrain following, precision hovering (e.g. for photography), anti-collision sensing etc. Particular advantages of this product are that it can operate effectively in all weather conditions and over all terrain types (including water).

![Ainstein US-DA](../../assets/hardware/sensors/ainstein/us_d1_hero.jpg)

The rangefinder is not automatically included in most firmware, and hence cannot be used just by setting a parameter through *QGroundControl* (as is possible with some other rangefinders). To use it you will need to add the driver to firmware and update a configuration file to start the driver on boot. The sections below explain how.

## 硬件安装

The rangefinder is supported by any hardware which runs a NuttX or Posix OS and which can offer a serial port for the interface. Minimally this will include most, if not all, [Pixhawk Series](../flight_controller/pixhawk_series.md) controllers.

US-D1 can be connected to any unused *serial port* (UART), e.g.: TELEM2, TELEM3, GPS2 etc.

## Parameter Setup

[Configure the serial port](../peripherals/serial_configuration.md) on which the lidar will run using [SENS_ULAND_CFG](../advanced_config/parameter_reference.md#SENS_ULAND_CFG). 无需设置端口的波特率, 因为这是由驱动程序配置的。

> **或者** 如果配置参数在 *QGroundControl* 中不可用, 则可能需要 添加驱动程序到固件 </1 >: ```drivers/distance_sensor/ulanding```</p> </blockquote>