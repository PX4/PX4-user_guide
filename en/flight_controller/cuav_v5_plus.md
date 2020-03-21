# CUAV V5+ Autopilot

*V5+*<sup>&reg;</sup> is an advanced autopilot manufactured by CUAV<sup>&reg;</sup>.
It was designed by CUAV<sup>&reg;</sup> in collaboration with the PX4 team.

The autopilot is recommended for commercial systems integration, but is also suitable for academic research and any other use.

![V5+ AutoPilot - hero image](../../assets/flight_controller/cuav_v5_plus/v5+_01.png)

Some of its main features include:
- Full compatibility with the [Pixhawk project](https://pixhawk.org/) **FMUv5** design standard and uses the [Pixhawk Connector Standard](https://pixhawk.org/pixhawk-connector-standard/) for all external interfaces.
- More advanced processor, RAM and flash memory than FMU v3, along with more stable and reliable sensors.
- Firmware-compatible with PX4.
- Modular design allows users to customize their own carrier board.
- Built-in vibration dampening system with high performance shock absorption system.
- Multiple-redundant sensor and power systems for improved flight safety and stability.


## Quick Summary

* Main FMU Processor: STM32F765
  * 32 Bit Arm® Cortex®-M7, 216MHz, 2MB memory, 512KB RAM
* IO Processor: STM32F100
  * 32 Bit Arm® Cortex®-M3, 24MHz, 8KB SRAM
* On-board sensors:
  * Accelerometer/Gyroscope: ICM-20689
  * Accelerometer/Gyroscope: BMI055
  * Magnetometer: IST8310
  * Barometer: MS5611

* Interfaces:
  * 8-14 PWM outputs (6 from IO, 8 from FMU)
  * 3 dedicated PWM/Capture inputs on FMU
  * Dedicated R/C input for CPPM
  * Dedicated R/C input for Spektrum / DSM and S.Bus with analog / PWM RSSI input
  * analog / PWM RSSI input
  * S.Bus servo output
  * 5 general purpose serial ports
  * 4 I2C ports
  * 4 SPI buses
  * 2 CANBuses  with serial ESC
  * Analog inputs for voltage / current of 2 batteries
* Power System:
  * Power: 4.3~5.4V
  * USB Input: 4.75~5.25V
* Weight and Dimensions:
  * Weight: 90g
  * Dimensions: 85.5\*42\*33mm 
* Other Characteristics:
  * Operating temperature: -20 ~ 80°c（Measured value）
  
## Purchase

<!-- [CUAV Store](https://store.cuav.net/index.php?id_product=95&id_product_attribute=0&rewrite=cuav-new-pixhack-v5-autopilot-m8n-gps-for-fpv-rc-drone-quadcopter-helicopter-flight-simulator-free-shipping-whole-sale&controller=product&id_lang=1) -->

[CUAV Aliexpress](https://www.aliexpress.com/item/32890380056.html?spm=a2g0o.detail.1000060.1.7a7233e7mLTlVl&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.90158.0&scm_id=1007.13339.90158.0&scm-url=1007.13339.90158.0&pvid=d899bfab-a7ca-46e1-adf2-72ad1d649822) (International users)

[CUAV Taobao](https://item.taobao.com/item.htm?spm=a1z10.5-c.w4002-21303114052.37.a28f697aeYzQx9&id=594262853015) (China Mainland users)

> **Note** Autopilot may be purchased with included Neo GPS module

## Connections (Wiring) {#connection}

[CUAV V5+ Wiring Quickstart](../assembly/quick_start_cuav_v5_plus.md)

## Pinouts {#pinouts}

Download **V5+** pinouts from [here](http://manual.cuav.net/V5-Plus.pdf).

## Voltage Ratings

*V5+ AutoPilot* supports redundant power supplies - up to three sources may be used: `Power1`, `Power2` and `USB`.
You must supply power to at least one of these sources, or the flight controller will be unpowered.

> **Note** On FMUv5 based FMUs with PX4IO module (as is the case for the *V5+*), the Servo Power Rail is only monitored by the FMU.
  It is neither powered by, nor provides power to the FMU.
  However, the pins marked **+** are all common, and a BEC may be connected to any of the servo pin sets to power the servo power rail.


**Normal Operation Maximum Ratings**

Under these conditions all power sources will be used in this order to power the system:
1. `Power1` and `Power2` inputs (4.3V to 5.4V)
1. `USB` input (4.75V to 5.25V)


## Over Current Protection

The *V5+* has over current protection on the 5 Volt Peripheral and 5 Volt high power, which limits the current to 2.5A.
The *V5+* has short circuit protection.

> **Warning** Up to 2.5 A can be delivered to the connectors listed as pin 1 (although these are only rated at 1 A).


## Building Firmware

> **Tip** Most users will not need to build this firmware!
  It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/master/en/setup/building_px4.html) for this target:
```
make px4_fmu-v5_default
```

## Debug Port

The [PX4 System Console](https://dev.px4.io/master/en/debug/system_console.html) and SWD interface operate on the **FMU Debug** port (`DSU7`).
The board does not have an I/O debug interface.

![Debug port (DSU7)](../../assets/flight_controller/cuav_v5_plus/debug_port_dsu7.jpg)

The debug port (`DSU7`) uses a [JST BM06B](https://www.digikey.com.au/product-detail/en/jst-sales-america-inc/BM06B-GHS-TBT-LF-SN-N/455-1582-1-ND/807850) connector and has the following pinout:

Pin | Signal | Volt
--- | --- | ---
1 (red) | 5V+ | +5V
2 (blk) | DEBUG TX (OUT) | +3.3V
3 (blk) | DEBUG RX (IN) | +3.3V
4 (blk) | FMU_SWDIO | +3.3V
5 (blk) | FMU_SWCLK | +3.3V
6 (blk) | GND | GND

The product package includes a convenient debug cable that can be connected to the `DSU7` port.
This splits out an FTDI cable for connecting the [PX4 System Console](https://dev.px4.io/master/en/debug/system_console.html) to a computer USB port, and SWD pins used for SWD/JTAG debugging. 
The provided debug cable does not connect to the SWD port `Vref` pin (1).

![CUAV Debug cable](../../assets/flight_controller/cuav_v5_plus/cuav_v5_debug_cable.jpg)

> **Warning** The SWD Vref pin (1) uses 5V as Vref but the CPU is run at 3.3V!
>
> Some JTAG adapters (SEGGER J-Link) will use the Vref voltage to set the voltage on the SWD lines.
> For direct connection to *Segger Jlink* we recommended you use the 3.3 Volts from pin 4 of the connector marked `DSM`/`SBUS`/`RSSI` to provide `Vtref` to the JTAG (i.e. providing 3.3V and *NOT* 5V).
>
>For more information see [Using JTAG for hardware debugging](#issue_jtag).


## Peripherals {#optional-hardware}

* [Digital Airspeed Sensor](https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-16371268452.37.6d9f48afsFgGZI&id=9512463037)
* [Telemetry Radio Modules](https://cuav.taobao.com/category-158480951.htm?spm=2013.1.w5002-16371268426.4.410b7a821qYbBq&search=y&catName=%CA%FD%B4%AB%B5%E7%CC%A8)
* [Rangefinders/Distance sensors](../sensor/rangefinders.md)

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos.
The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## NOTE

CUAV has added some modifications based on its many years of flight controller design experience; the differences between V5 + and other boards will be described below.

#### Production lot number label

The batch number is the last two digits of the *serial number* that appears on a sticker on the side of the flight controller. 
For example, the serial number V011907XXXX**01** indicates the flight controller was in batch 01.
CUAV can quickly locate your hardware production batch number according to this number; and track faults and differences more quickly.

#### GPS not compatible with other devices 

The *Neo v2.0 GPS* recommended for use with *CUAV V5+* and *CUAV V5 nano* is not fully compatible with other Pixhawk flight controllers (specifically, the buzzer part is not compatible and there may be issues with the safety switch).Don't try to use NEO v2.0 GPS with other Pixhawk flight controllers, or connect other GPS to V5+; it doesn't seem very friendly; UAVCAN GPS seems to be a great choice.

#### HV_PM output voltage of 5.3V

CUAV v5+ supports 2.5A  output; in order to compensate for the voltage drop caused by high current, they modified the output voltage of the PM module to 5.3v. CUAV V5+ has built-in high-brightness RGB, and some PCs with low power output USB may not provide enough power.

We recommend that when using USB with the *V5+* you *also connect the power module* (to avoid under-powering any connected peripherals).

> **Warning** Remove propellers *before* connecting the power module (this is important whenever bench testing with powered motors).

#### Power2 is the I2C battery interface. Do not connect it to the Analog PM.

CUAV V5 + has an analog PM interface and an I2C battery interface. If you use analog PM, please connect to Power1; do not connect analog PM to Power.
If you plug an Analog PM into a digital PM connector it will stop all the I2C devices on that bus.
Specifically this will stop the GPS's compass due to contention, and may also damage the FMU (longer term).

Similarly, a digital PM plugged into a analog connector will not work, and may also damage/destroy the power module (longer term).

#### Using JTAG for hardware debugging 

CUAV V5+ is more inclined to apply; so the designer hopes that DSU7 can be set to MAVLINK or Debug (not supported by PX4); so `DSU7` FMU Debug Pin 1 is 5 volts-not the 3.3 volts of the CPU.
`DSU7` FMU Debug Pin 1 is 5 volts-not the 3.3 volts of the CPU.

Some JTAG use this voltage to set the IO levels when communicating to the target.

For direct connection to * Segger Jlink * we recommended you use the 3.3 Volts of DSM / SBUS / RSSI pin 4 as Pin 1 on the debug connector (`Vtref`).

#### HV-PM protection current is greater

HV_PM is defined by the designer as a PM module with higher performance. The output current is large, and it supports the connection of 3 ~ 14s batteries. The cut-off current is 6A, which is higher than that of ordinary PM modules. It is more suitable for high power equipment.

## Further Information

- [CUAV V5+ Manual](http://manual.cuav.net/V5-Plus.pdf)
- [CUAV V5+ docs](http://doc.cuav.net/flight-controller/v5-autopilot/en/v5+.html)
- [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165)
- [CUAV Github](https://github.com/cuav)
- [Base board design reference](https://github.com/cuav/hardware/tree/master/V5_Autopilot/V5%2B/V5%2B_BASE)
- [CUAV V5+ Wiring Quickstart](../assembly/quick_start_cuav_v5_plus.md)
- [Airframe build-log using CUAV v5+ on a DJI FlameWheel450](../frames_multicopter/dji_f450_cuav_5plus.md)
