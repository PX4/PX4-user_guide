# Benewake TFmini LiDAR

The [Benewake TFmini LiDAR](http://en.benewake.com/product/detail/5c345e26e5b3a844c472329c.html) is a tiny, low cost, and low power LIDAR with 12m range. It must be connected to a UART/serial bus.

![TFmini LiDAR](../../assets/hardware/sensors/tfmini/tfmini_hero.jpg)

## 硬件安装

TFmini can be connected to any unused *serial port* (UART), e.g.: TELEM2, TELEM3, GPS2 etc.

## Parameter Setup

[Configure the serial port](../peripherals/serial_configuration.md) on which the lidar will run using [SENS_TFMINI_CFG](../advanced_config/parameter_reference.md#SENS_TFMINI_CFG). There is no need to set the baud rate (this is hard coded in the sensor driver as only one rate is supported).

> **Note** 如果配置参数在 *QGroundControl* 中不可用, 则可能需要 添加驱动程序到固件 </1 >: ```drivers/distance_sensor/tfmini```</p> </blockquote>