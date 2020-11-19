# Holybro pix32 Flight Controller

> **Warning** PX4 不生产这款且也不生产任何自动驾驶仪。 若需要硬件支持或咨询合规问题，请联系 [制造商](https://shop.holybro.com/)。

The Holybro<sup>&reg;</sup> [pix32 autopilot](https://shop.holybro.com/c/pixhawk-2_0460) (also known as "Pixhawk 2", and formerly as HKPilot32) is based on the [Pixhawk<sup>&reg;</sup>-project](https://pixhawk.org/) **FMUv2** open hardware design. This board is based on hardware version Pixhawk 2.4.6. It runs the PX4 flight stack on the [NuttX](http://nuttx.org) OS.

![pix32](../../assets/flight_controller/holybro_pix32/pix32_hero.jpg)

As a CC-BY-SA 3.0 licensed Open Hardware design, schematics and design files should be [available here](https://github.com/PX4/Hardware).

> **Tip** The Holybro pix32 is software compatible with the [3DR Pixhawk 1](../flight_controller/pixhawk.md). It is not connector compatible, but is otherwise physically very similar to the 3DR Pixhawk or mRo Pixhawk.

<span></span>

> **Note** This flight controller is [manufacturer supported](../flight_controller/autopilot_manufacturer_supported.md).

## 主要特性

* 主片上系统：[STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789) 
  * CPU: 32-bit STM32F427 Cortex<sup>&reg;</sup> M4 core with FPU
  * RAM: 168 MHz/256 KB
  * Flash: 2 MB
* Failsafe System-on-Chip: STM32F103
* 传感器： 
  * ST Micro L3GD20 3-axis 16-bit gyroscope
  * ST Micro LSM303D 3-axis 14-bit accelerometer / magnetometer
  * Invensense<sup>&reg;</sup> MPU 6000 3-axis accelerometer/gyroscope
  * MEAS MS5611 气压计
* 尺寸/重量 
  * Size: 81x44x15mm
  * Weight: 33.1g
* GPS: U-blox<sup>&reg;</sup> super precision Neo-7M with compass
* Input Voltage: 2~10s (7.4~37V)

### 连接性

* 1x I2C
* 2x CAN
* 3.3 and 6.6V ADC inputs
* 5x UART (serial ports), one high-power capable, 2x with HW flow control
* Spektrum DSM / DSM2 / DSM-X® Satellite compatible input up to DX8 (DX9 and above not supported)
* Futaba<sup>&reg;</sup> S.BUS compatible input and output
* PPM sum signal
* RSSI (PWM or voltage) input
* SPI
* External microUSB port
* Molex PicoBlade connectors

## 采购

[shop.holybro.com](https://shop.holybro.com/c/pixhawk-2_0460)

### 配件

* [数字空速传感器](https://shop.holybro.com/c/digital-air-speed-sensor_0508)
* [Hobbyking<sup>&reg;</sup> Wifi Telemetry](https://hobbyking.com/en_us/apm-pixhawk-wireless-wifi-radio-module.html)
* [Telemetry Radio EU (433 MHz)](https://shop.holybro.com/c/433mhz_0470)
* [Telemetry Radio USA (915 MHz)](https://shop.holybro.com/c/915mhz_0471)

## 编译固件

> **Tip** 多数用户不需要自己构建固件！ 它是预构建的，并在连接适当的硬件时由 *QGroundControl* 自动安装。

为此目标 [编译 PX4](../dev_setup/building_px4.md)：

    make px4_fmu-v2_default
    

## Debug调试端口

See [3DR Pixhawk 1 > Debug Ports](../flight_controller/pixhawk.md#debug-ports).

## 引脚和原理图

该板基于 [Pixhawk project](https://pixhawk.org/) **FMUv2** 开放式硬件设计。

* [FMUv2 + IOv2 schematic](https://raw.githubusercontent.com/PX4/Hardware/master/FMUv2/PX4FMUv2.4.5.pdf) - 原理图和布局

> **Note**作为 CC-BY-SA 3.0 许可的开放硬件设计，所有原理图和设计文件都是 [available](https://github.com/PX4/Hardware)。

## Serial Port Mapping

| UART   | 设备         | Port                  |
| ------ | ---------- | --------------------- |
| UART1  | /dev/ttyS0 | IO debug              |
| USART2 | /dev/ttyS1 | TELEM1 (flow control) |
| USART3 | /dev/ttyS2 | TELEM2 (flow control) |
| UART4  |            |                       |
| UART7  | CONSOLE    |                       |
| UART8  | SERIAL4    |                       |