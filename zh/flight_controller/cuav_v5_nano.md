# CUAV V5 nano Autopilot

:::warning
PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://store.cuav.net/) for hardware support or compliance issues.
:::

**V5 nano**<sup>&reg;</sup> is an autopilot for space-constrained applications, designed by CUAV<sup>&reg;</sup> in collaboration with the PX4 team.

The autopilot is small enough to use in 220mm racing drones, but remains powerful enough for most drone use.

![V5 nano - Hero image](../../assets/flight_controller/cuav_v5_nano/v5_nano_01.png)

> **Note** The V5 nano is similar to the [CUAV V5+](../flight_controller/cuav_v5_plus.md), but has an all-in-one form factor, fewer PWM ports (can't be used for [airframes](../airframes/airframe_reference.md) that use AUX ports), and does not have internal damping.

Some of its main features include:

- Full compatibility with the [Pixhawk project](https://pixhawk.org/) **FMUv5** design standard and uses the [Pixhawk Connector Standard](https://pixhawk.org/pixhawk-connector-standard/) for all external interfaces.
- More advanced processor, RAM and flash memory than FMU v3, along with more stable and reliable sensors.
- Firmware-compatible with PX4.
- Generous 2.6mm spacing for for I/O pins, making it easier to use all the interfaces.

:::note
This flight controller is [manufacturer supported](../flight_controller/autopilot_manufacturer_supported.md).
:::

### 概览

Main FMU Processor: STM32F765◦32 Bit Arm® Cortex®-M7, 216MHz, 2MB memory, 512KB RAM

* 内置传感器：
  
  * 加速度计 / 陀螺仪：ICM-20689
  * 加速度计 / 陀螺仪：ICM-20602
  * 加速度计 / 陀螺仪：BMI055
  * 磁力计：IST8310
  * 气压计：MS5611
* Interfaces: 8 PWM outputs
  
  * FMU上有3个专用PWM/Capture输入
  * 用于 CPPM 的专用遥控输入
  * Dedicated R/C input for Spektrum / DSM and S.Bus
  * 电平/PWM RSSI输入
  * 4个通用串行口
  * 3 个 I2C 接口
  * 4路SPI总线
  * 2 CAN Buses 
  * 电池电压 / 电流模拟输入口
  * 2 additional analog inputs
  * Supports nARMED
* Power System: Power Brick Input: 4.75~5.5V

* USB 电源输入：4.75~5.25V

* 重量和尺寸:
  
  * Dimensions: 60*40*14mm
* 其它特性: 
  * 工作温度：-20 ~ 85°C （实测值）

## 购买

<!-- [CUAV Store](https://store.cuav.net/index.php?id_product=95&id_product_attribute=0&rewrite=cuav-new-pixhack-v5-autopilot-m8n-gps-for-fpv-rc-drone-quadcopter-helicopter-flight-simulator-free-shipping-whole-sale&controller=product&id_lang=1) -->

[CUAV Aliexpress](https://www.aliexpress.com/item/33050770314.html?storeId=3257035&spm=2114.12010612.8148356.9.dbe6790bjW2hpH) (international users)

[CUAV Taobao](https://item.taobao.com/item.htm?spm=a230r.1.14.8.26ab5258veQJRu&id=569404317857&ns=1&abbucket=13#detail) (China Mainland users)

> **Note** Autopilot may be purchased with included Neo GPS module

<span id="connection"></span>

## Connections (Wiring)

[V5 nano Wiring Quickstart](../assembly/quick_start_cuav_v5_nano.md)

## 针脚定义

Download **V5 nano** pinouts from [here](http://manual.cuav.net/V5-Plus.pdf).

## 编译固件

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:

    make px4_fmu-v5_default
    

<span id="debug_port"></span>

## Debug调试端口

The [PX4 System Console](../debug/system_console.md) and [SWD interface](../debug/swd_debug.md) operate on the **FMU Debug** port (`DSU7`). The board does not have an I/O debug interface.

![Debug port (DSU7)](../../assets/flight_controller/cuav_v5_nano/debug_port_dsu7.jpg)

The debug port (`DSU7`) uses a [JST BM06B](https://www.digikey.com.au/product-detail/en/jst-sales-america-inc/BM06B-GHS-TBT-LF-SN-N/455-1582-1-ND/807850) connector and has the following pinout:

| 针脚   | 信号             | 电压    |
| ---- | -------------- | ----- |
| 2    | 5V+            | +5V   |
| 2    | DEBUG TX (OUT) | +3.3V |
| 3    | DEBUG RX (IN)  | +3.3V |
| 4（黑） | FMU_SWDIO      | +3.3V |
| 6    | FMU_SWCLK      | +3.3V |
| 6    | GND            | GND   |


The product package includes a convenient debug cable that can be connected to the `DSU7` port. This splits out an FTDI cable for connecting the [PX4 System Console](../debug/system_console.md) to a computer USB port, and SWD pins used for SWD/JTAG debugging. The provided debug cable does not connect to the SWD port `Vref` pin (1).

![CUAV Debug cable](../../assets/flight_controller/cuav_v5_nano/cuav_nano_debug_cable.jpg)

> **Warning** The SWD Vref pin (1) uses 5V as Vref but the CPU is run at 3.3V!
> 
> Some JTAG adapters (SEGGER J-Link) will use the Vref voltage to set the voltage on the SWD lines. For direct connection to *Segger Jlink* we recommended you use the 3.3 Volts from pin 4 of the connector marked `DSM`/`SBUS`/`RSSI` to provide `Vtref` to the JTAG (i.e. providing 3.3V and *NOT* 5V).
> 
> For more information see [Using JTAG for hardware debugging](#compatibility_jtag).

## Serial Port Mapping

| UART   | 设备         | Port                                  |
| ------ | ---------- | ------------------------------------- |
| UART1  | /dev/ttyS0 | GPS                                   |
| USART2 | /dev/ttyS1 | TELEM1 (flow control)                 |
| USART3 | /dev/ttyS2 | TELEM2 (flow control)                 |
| UART4  | /dev/ttyS3 | TELEM4                                |
| USART6 | /dev/ttyS4 | TX is RC input from SBUS_RC connector |
| UART7  | /dev/ttyS5 | Debug Console                         |
| UART8  | /dev/ttyS6 | Not connected (no PX4IO)              |


## 额定电压

*V5 nano* must be powered from the `Power` connector during flight, and may also/alternatively be powered from `USB` for bench testing.

> **Note** The `PM2` connector cannot not be used for powering the *V5 nano* (see [this issue](#compatibility_pm2)).

<span></span>

> **Tip** 大多数用户不需要构建此固件！ 它是预构建的，并在连接适当的硬件时由 *QGroundControl* 自动安装。

## Over Current Protection

The *V5 nano* has no over current protection.

<span id="Optional-hardware"></span>

## 外部设备

* [数字空速传感器](https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-16371268452.37.6d9f48afsFgGZI&id=9512463037)
* [数传电台模块](https://cuav.taobao.com/category-158480951.htm?spm=2013.1.w5002-16371268426.4.410b7a821qYbBq&search=y&catName=%CA%FD%B4%AB%B5%E7%CC%A8)
* [测距仪/距离传感器](../sensor/rangefinders.md)

## 支持的平台/机身

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## Compatibility

CUAV adopts some differentiated designs and is incompatible with some hardware, which will be described below.

<span id="compatibility_gps"></span>

#### Neo v2.0 GPS not compatible with other devices

The *Neo v2.0 GPS* that is recommended for use with *CUAV V5+* and *CUAV V5 nano* is not fully compatible with other Pixhawk flight controllers (specifically, the buzzer part is not compatible and there may be issues with the safety switch).

The UAVCAN [NEO V2 PRO GNSS receiver](http://doc.cuav.net/gps/neo-v2-pro/en/#enable) can also be used, and is compatible with other flight controllers.

<span id="compatibility_jtag"></span>

#### Using JTAG for hardware debugging

`DSU7` FMU Debug Pin 1 is 5 volts - not the 3.3 volts of the CPU.

Some JTAG probes use this voltage to set the IO levels when communicating to the target.

For direct connection to *Segger Jlink* we recommended you use the 3.3 Volts of DSM/SBUS/RSSI pin 4 as Pin 1 on the debug connector (`Vtref`).

<span id="compatibility_pm2"></span>

#### PM2 cannot power the flight controller

`PM2` can only measure battery voltage and current, but **not** power the flight controller.

> **Warning** PX4 does not support this interface.

## 已知的问题

The issues below refer to the *batch number* in which they first appear. The batch number is the four-digit production date behind V01 and is displayed on a sticker on the side of the flight controller. For example, the serial number Batch V011904((V01 is the number of V5, 1904 is the production date, that is, the batch number).

<span id="pin1_unfused"></span>

#### SBUS / DSM / RSSI interface Pin1 unfused

> **Warning** This is a safety issue.

Please do not connect other equipment (except RC receiver) on SBUS / DSM / RSSI interface - this can lead to equipment damage!

- *Found:* Batches V01190904xxxx
- *Fixed:* Batches later than V01190904xxxx

## 更多信息

* [V5 nano manual](http://manual.cuav.net/V5-nano.pdf) (CUAV)
* [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165) (CUAV)
* [CUAV Github](https://github.com/cuav) (CUAV)
* [Airframe build-log using CUAV v5 nano on a DJI FlameWheel450](../frames_multicopter/dji_f450_cuav_5nano.md)