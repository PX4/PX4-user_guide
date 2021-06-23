# Holybro pix32 비행 컨트롤러

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://shop.holybro.com/)에 문의하십시오.
:::

Holybro<sup>&reg;</sup> [pix32 자동조종장치](https://shop.holybro.com/c/pixhawk-2_0460)("Pixhawk 2"라고도하며 이전에 HKPilot32라고도 함)는 [Pixhawk<sup>&reg;</sup>-프로젝트](https://pixhawk.org/) **FMUv2** 개방형 하드웨어 디자인을 기반으로합니다. 이 보드는 하드웨어 버전 Pixhawk 2.4.6을 기반으로합니다. [NuttX](https://nuttx.apache.org/) OS에서 PX4를 실행합니다.

![pix32](../../assets/flight_controller/holybro_pix32/pix32_hero.jpg)

CC-BY-SA 3.0 라이센스 오픈 하드웨어 설계로 모든 회로도와 설계 파일을 [사용할 수 있습니다](https://github.com/PX4/Hardware).

:::tip
Holybro pix32는 [3DR Pixhawk 1](../flight_controller/pixhawk.md)와 호환되는 소프트웨어입니다. 커넥터와 호환되지는 않지만, 3DR Pixhawk 또는 mRo Pixhawk와 물리적으로 매우 유사합니다.
:::

:::note
이 비행 컨트롤러는 [제조업체의 지원](../flight_controller/autopilot_manufacturer_supported.md)을 받을 수 있습니다.
:::

## 주요 특징

* Main System-on-Chip: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789) 
  * CPU: 32-bit STM32F427 Cortex<sup>&reg;</sup> M4 core with FPU
  * RAM: 168 MHz/256 KB
  * Flash: 2 MB
* Failsafe System-on-Chip: STM32F103
* Sensors: 
  * ST Micro L3GD20 3-axis 16-bit gyroscope
  * ST Micro LSM303D 3-axis 14-bit accelerometer / magnetometer
  * Invensense<sup>&reg;</sup> MPU 6000 3-axis accelerometer/gyroscope
  * MEAS MS5611 barometer
* Dimensions/Weight 
  * Size: 81x44x15mm
  * Weight: 33.1g
* GPS: u-blox<sup>&reg;</sup> super precision Neo-7M with compass
* Input Voltage: 2~10s (7.4~37V)

### Connectivity

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

## Purchase

[shop.holybro.com](https://shop.holybro.com/c/pixhawk-2_0460)

### Accessories

* [Digital airspeed sensor](https://shop.holybro.com/c/digital-air-speed-sensor_0508)
* [Hobbyking<sup>&reg;</sup> Wifi Telemetry](https://hobbyking.com/en_us/apm-pixhawk-wireless-wifi-radio-module.html)
* [Telemetry Radio EU (433 MHz)](https://shop.holybro.com/c/433mhz_0470)
* [Telemetry Radio USA (915 MHz)](https://shop.holybro.com/c/915mhz_0471)

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:

    make px4_fmu-v2_default
    

## Debug Port

See [3DR Pixhawk 1 > Debug Ports](../flight_controller/pixhawk.md#debug-ports).

## Pinouts and Schematics

The board is based on the [Pixhawk project](https://pixhawk.org/) **FMUv2** open hardware design.

* [FMUv2 + IOv2 schematic](https://raw.githubusercontent.com/PX4/Hardware/master/FMUv2/PX4FMUv2.4.5.pdf) -- Schematic and layout

:::note
As a CC-BY-SA 3.0 licensed Open Hardware design, all schematics and design files are [available](https://github.com/PX4/Hardware).
:::

## Serial Port Mapping

| UART   | Device     | Port                  |
| ------ | ---------- | --------------------- |
| UART1  | /dev/ttyS0 | IO debug              |
| USART2 | /dev/ttyS1 | TELEM1 (flow control) |
| USART3 | /dev/ttyS2 | TELEM2 (flow control) |
| UART4  |            |                       |
| UART7  | CONSOLE    |                       |
| UART8  | SERIAL4    |                       |

<!-- Note: Got ports using https://github.com/PX4/px4_user_guide/pull/672#issuecomment-598198434 -->