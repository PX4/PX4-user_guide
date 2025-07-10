---
canonicalUrl: https://docs.px4.io/main/tr/flight_controller/holybro_pix32_v5
---

# Holybro Pix32 v5

:::warning PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://shop.holybro.com/) for hardware support or compliance issues.
:::

[Pix32 v5](https://shop.holybro.com/pix32-v5_p1218.html)<sup>&reg;</sup> is an advanced autopilot flight controller designed and made by Holybro<sup>&reg;</sup>. It is optimized to run on PX4 firmware, which is intended for both academic and commercial developers. It is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv5** open hardware design and runs PX4 on the [NuttX](https://nuttx.apache.org/) OS. It can be regarded as a variant version of Pixhawk4.

The Pix32 v5 is designed for pilots who need a high power, flexible and customisable flight control system. It is comprised of a separate flight controller and carrier (base) board, which are connected by a 100pin connector. This design allows users to either select a base board made by Holybro, or customize their own.

![Pix32 v5 Family](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_family.jpg)

:::note
This flight controller is [manufacturer supported](../flight_controller/autopilot_manufacturer_supported.md).
:::

## Quick Summary

* Main FMU Processor: STM32F765
  * 32 Bit Arm® Cortex®-M7, 216MHz, 2MB memory, 512KB RAM
* IO Processor: STM32F100
  * 32 Bit Arm® Cortex®-M3, 24MHz, 8KB SRAM
* On-board sensors:
  * Accel/Gyro: ICM-20689
  * Accel/Gyro: BMI055
  * Magnetometer: IST8310
  * Barometer: MS5611
* GPS: u-blox Neo-M8N GPS/GLONASS receiver; integrated magnetometer IST8310
* Interfaces:
  * 8-16 PWM outputs (8 from IO, 8 from FMU)
  * 3 dedicated PWM/Capture inputs on FMU
  * Dedicated R/C input for CPPM
  * Dedicated R/C input for Spektrum / DSM and S.Bus with analog / PWM RSSI input
  * Dedicated S.Bus servo output
  * 5 general purpose serial ports
    * 2 with full flow control
    * 1 with separate 1.5A current limit
  * 3 I2C ports
  * 4 SPI buses
    * 1 internal high speed SPI sensor bus with 4 chip selects and 6 DRDYs
    * 1 internal low noise SPI bus dedicated for
    * Barometer with 2 chip selects, no DRDYs
    * 1 internal SPI bus dedicated for FRAM
    * Supports dedicated SPI calibration EEPROM located on sensor module
    * 1 external SPI buses
  * Up to 2 CANBuses for dual CAN with serial ESC
    * Each CANBus has individual silent controls or ESC RX-MUX control
    * Analog inputs for voltage / current of 2 batteries
    * 2 additional analog inputs
* Electrical System:
  * Power module output: 4.9~5.5V
  * Max input voltage: 6V
  * Max current sensing: 120A
  * USB Power Input: 4.75~5.25V
  * Servo Rail Input: 0~36V
* Weight and Dimensions:
  * Dimensions: 45x45x13.5mm
  * Weight: 33.0g
* Environmental Data, Quality & Reliability:
  * Operating temperature: -40 ~ 85°c
  * Storage temp. -40~85℃
  * CE
  * FCC
  * RoHS compliant (lead-free)

Additional information can be found in the [Pix32 V5 Technical Data Sheet](http://www.holybro.com/manual/Holybro_PIX32-V5_technical_data_sheet_v1.1.pdf).

## Purchase

Order from [Holybro website](https://shop.holybro.com/pix32-v5_p1218.html).

## Assembly/Setup

The [Pix32 v5 Wiring Quick Start](../assembly/quick_start_holybro_pix32_v5.md) provides instructions on how to assemble required/important peripherals including GPS, Power Management Board etc.

## Base Board Layouts
![Pix32 v5 Image](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_base_boards_layout.jpg)

## Pinouts

Download pinouts here:
- [*pix32 v5* baseboard](http://www.holybro.com/manual/Holybro_PIX32-V5_PINOUTS_V1.1.pdf)
- [*pix32 v5* mini baseboard](http://www.holybro.com/manual/Holybro_Pix32-V5-Base-Mini-Pinouts.pdf)

## Dimensions

![Pix32 v5 Image](../../assets/flight_controller/holybro_pix32_v5/Dimensions_no_border.jpg)

## Voltage Ratings

*Pix32 v5* can be triple-redundant on the power supply if three power sources are supplied. The three power rails are: **POWER1**, **POWER2** and **USB**.

:::note
The output power rails **FMU PWM OUT** and **I/O PWM OUT** (0V to 36V) do not power the flight controller board (and are not powered by it). You must supply power to one of **POWER1**, **POWER2** or **USB** or the board will be unpowered.
:::

**Normal Operation Maximum Ratings**

Under these conditions all power sources will be used in this order to power the system:
1. **POWER1** and **POWER2** inputs (4.9V to 5.5V)
1. **USB** input (4.75V to 5.25V)

**Absolute Maximum Ratings**

Under these conditions the system will not draw any power (will not be operational), but will remain intact.
1. **POWER1** and **POWER2** inputs (operational range 4.1V to 5.7V, 0V to 10V undamaged)
1. **USB** input (operational range 4.1V to 5.7V, 0V to 6V undamaged)
1. Servo input: VDD_SERVO pin of **FMU PWM OUT** and **I/O PWM OUT** (0V to 42V undamaged)

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:
```
make holybro_pix32v5_default
```

## Debug Port

The system's [serial console](../debug/system_console.md) and SWD interface runs on the **FMU Debug** port

<!--while the I/O console and SWD interface can be accessed via **I/O Debug** port.-->

![FMU debug port diagram](../../assets/flight_controller/holybro_pix32_v5/FMU_Debug_Port_Horizontal.jpg)

The pinout uses the standard [Pixhawk debug connector pinout](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug). For wiring information see:
- [System Console > Pixhawk Debug Port](../debug/system_console.md#pixhawk_debug_port).


## Peripherals

* [Digital Airspeed Sensor](../sensor/airspeed.md)
* [Telemetry Radio Modules](../telemetry/README.md)
* [Rangefinders/Distance sensors](../sensor/rangefinders.md)


## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).


## Additional Information

- [Pix32 v5 Technical Data Sheet](http://www.holybro.com/manual/Holybro_PIX32-V5_technical_data_sheet_v1.1.pdf)
- [Pix32 v5 Pinouts](http://www.holybro.com/manual/Holybro_PIX32-V5_PINOUTS_V1.1.pdf)
- [Pix32 v5 Base Board Schematic Diagram](http://www.holybro.com/manual/Holybro_PIX32-V5-BASE-Schematic_diagram.pdf)
- [Pix32 v5 Mini Base Board Schematic Diagram](http://www.holybro.com/manual/Holybro_PIX32-V5-Base-Mini-Board_Schematic_diagram.pdf)
- [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).
