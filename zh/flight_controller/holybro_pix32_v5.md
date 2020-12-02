# Holybro Pix32 v5

:::warning
PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://shop.holybro.com/) for hardware support or compliance issues. 它基于 [Pixhawk 项目](https://pixhawk.org/) 的 **FMUv5** 开放硬件设计，在 [NuttX](http://nuttx.org) 操作系统上运行 PX4。

[Pix32 v5](https://shop.holybro.com/pix32-v5_p1218.html)<sup>&reg;</sup> is an advanced autopilot flight controller designed and made by Holybro<sup>&reg;</sup>. It is optimized to run on PX4 firmware, which is intended for both academic and commercial developers. It is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv5** open hardware design and runs PX4 on the [NuttX](http://nuttx.org) OS. It can be regarded as a variant version of Pixhawk4.

The Pix32 v5 is designed for pilots who need a high power, flexible and customisable flight control system. It is comprised of a separate flight controller and carrier (base) board, which are connected by a 100pin connector. This design allows users to either select a base board made by Holybro, or customize their own.

![Pix32 v5 Family](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_family.jpg)

:::note
This flight controller is [manufacturer supported](../flight_controller/autopilot_manufacturer_supported.md).
:::

## 概览

* 主 FMU 处理器：STM32F765
  * 32 位 Arm® Cortex®-M7，216MHz，2MB 储存，512KB RAM
* IO 处理器：STM32F100
  * 32 位 Arm® Cortex®-M3，24MHz，8KB SRAM
* 板载传感器：
  * 加速度计 / 陀螺仪：ICM-20689
  * 加速度计 / 陀螺仪：BMI055
  * 磁力计：IST8310
  * 气压计：MS5611
* GPS：ublox Neo-M8N GPS/GLONASS 接收器；集成磁力计 IST8310
* 接口：
  * 8-16 路PWM输出（8路来自 IO，8路来自 FMU）
  * FMU 上有 3 路专用 PWM/Capture 输入
  * 用于 CPPM 的专用遥控输入
  * Dedicated R/C input for Spektrum / DSM and S.Bus with analog / PWM RSSI input
  * Dedicated S.Bus servo output
  * 5个通用串行口
    * 2 with full flow control
    * 1 with separate 1.5A current limit
  * 3 个 I2C 接口
  * 4路SPI总线
    * 1 internal high speed SPI sensor bus with 4 chip selects and 6 DRDYs
    * 1 internal low noise SPI bus dedicated for
    * Barometer with 2 chip selects, no DRDYs
    * 1 internal SPI bus dedicated for FRAM
    * Supports dedicated SPI calibration EEPROM located on sensor module
    * 1 external SPI buses
  * 多达 2 路 CAN 总线用于带串口的电调
    * Each CANBus has individual silent controls or ESC RX-MUX control
    * 2个电池电流/电压模拟输入口
    * 2 additional analog inputs
* Electrical System:
  * 电源模块输出：4.9~5.5V
  * Max input voltage: 6V
  * 最大电流感应：120A
  * USB 电源输入：4.75~5.25V
  * 伺服导轨输入电压：0~36V
* 重量和尺寸：
  * Dimensions: 45x45x13.5mm
  * Weight: 33.0g
* Environmental Data, Quality & Reliability:
  * 工作温度：-40 ~ 85°C
  * Storage temp. -40~85℃
  * CE
  * FCC
  * RoHS compliant (lead-free)

Additional information can be found in the [Pix32 V5 Technical Data Sheet](http://www.holybro.com/manual/Holybro_PIX32-V5_technical_data_sheet_v1.1.pdf).

## 采购

Order from [Holybro website](https://shop.holybro.com/pix32-v5_p1218.html).

## 组装 / 设置

The [Pix32 v5 Wiring Quick Start](../assembly/quick_start_holybro_pix32_v5.md) provides instructions on how to assemble required/important peripherals including GPS, Power Management Board etc.

## Base Board Layouts
![Pix32 v5 Image](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_base_boards_layout.jpg)

## 针脚定义

Download pinouts here:
- [*pix32 v5* baseboard](http://www.holybro.com/manual/Holybro_PIX32-V5_PINOUTS_V1.1.pdf)
- [*pix32 v5* mini baseboard](http://www.holybro.com/manual/Holybro_Pix32-V5-Base-Mini-Pinouts.pdf)

## 尺寸

![Pix32 v5 Image](../../assets/flight_controller/holybro_pix32_v5/Dimensions_no_border.jpg)

## 额定电压

*Pix32 v5* can be triple-redundant on the power supply if three power sources are supplied. The three power rails are: **POWER1**, **POWER2** and **USB**.

> **Warning** PX4 不生产这款且也不生产任何自动驾驶仪。 若需要硬件支持或咨询合规问题，请联系 [制造商](https://shop.holybro.com/)。

**绝对最大额定值**

在以下条件下，系统不会获得任何供电（不可运行），但不会损坏。
1. **POWER1** 和 **POWER2** 输入电压（4.9 v 至 5.5 v）
1. **USB** 输入电压（4.75 v 至 5.25 v）

**Absolute Maximum Ratings**

Under these conditions the system will not draw any power (will not be operational), but will remain intact.
1. **POWER1** 与 **POWER2** 输入（可运行范围 4.1V 至 5.7V，0V 至 10V 不会损坏）
1. **USB** 输入（可运行范围 4.1V 至 5.7V，0V 至 6V 不会损坏）
1. 舵机输入：**FMU PWM OUT** 和 **I/O PWM OUT** 的 VDD_SERVO 针脚 （0V 至 42V 不会损坏）

## 编译固件

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:
```
make holybro_pix32v5_default
```

## 调试接口

The system's [serial console](../debug/system_console.md) and SWD interface runs on the **FMU Debug** port

<!--while the I/O console and SWD interface can be accessed via **I/O Debug** port.-->

![FMU debug port diagram](../../assets/flight_controller/holybro_pix32_v5/FMU_Debug_Port_Horizontal.jpg)

The pinout uses the standard [Pixhawk debug connector pinout](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug). For wiring information see:
- [System Console > Pixhawk Debug Port](../debug/system_console.md#pixhawk_debug_port).


## 外部设备

* [数字空速传感器](../sensor/airspeed.md)
* [数传电台模块](../telemetry/README.md)
* [测距仪/距离传感器](../sensor/rangefinders.md)


## 支持的平台 / 机身

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).


## 附加信息

- [Pix32 v5 Technical Data Sheet](http://www.holybro.com/manual/Holybro_PIX32-V5_technical_data_sheet_v1.1.pdf)
- [Pix32 v5 Pinouts](http://www.holybro.com/manual/Holybro_PIX32-V5_PINOUTS_V1.1.pdf)
- [Pix32 v5 Base Board Schematic Diagram](http://www.holybro.com/manual/Holybro_PIX32-V5-BASE-Schematic_diagram.pdf)
- [Pix32 v5 Mini Base Board Schematic Diagram](http://www.holybro.com/manual/Holybro_PIX32-V5-Base-Mini-Board_Schematic_diagram.pdf)
- FMUv5参考设计</0 >。</li> </ul>
