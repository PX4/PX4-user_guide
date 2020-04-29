# HKPilot32 Flight Controller (Discontinued)

> **Warning** This flight controller has been [discontinued](../flight_controller/autopilot_experimental.md) and is no longer commercially available.

The Hobbyking<sup>&reg;</sup> *HKPilot32 autopilot* is based on the [Pixhawk<sup>&reg;</sup>-project](https://pixhawk.org/) **FMUv2** open hardware design. It runs the PX4 Flight Stack on the [NuttX](http://nuttx.org) OS.

> **Tip** The HKPilot32 is software compatible with the 3DR<sup>&reg;</sup> [Pixhawk 1](../flight_controller/pixhawk.md). It is not connector compatible, but is otherwise physically very similar to the 3DR Pixhawk or mRo Pixhawk.

![HKPilot32](../../images/hkpilot32_flight_controller.jpg)

As a CC-BY-SA 3.0 licensed Open Hardware design, schematics and design files should be [available here](https://github.com/PX4/Hardware). 


## Key Features

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
* GPS: U-blox<sup>&reg;</sup> super precision Neo-7M with compass
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

### Accessories

* [Digital airspeed sensor](https://hobbyking.com/en_us/hkpilot-32-digital-air-speed-sensor-and-pitot-tube-set.html)
* [Hobbyking<sup>&reg;</sup> Wifi Telemetry](https://hobbyking.com/en_us/apm-pixhawk-wireless-wifi-radio-module.html)
* [Hobbyking OSD + EU Telemetry (433 MHz)](https://hobbyking.com/en_us/micro-hkpilot-telemetry-radio-module-with-on-screen-display-osd-unit-433mhz.html)

## Availability

* [Hobbyking EU version (433 MHz)](https://hobbyking.com/en_us/hkpilot32-autonomous-vehicle-32bit-control-set-with-telemetry-and-gps-433mhz.html)
* [Hobbyking US version (915 MHz)](https://hobbyking.com/en_us/hkpilot32-autonomous-vehicle-32bit-control-set-with-telemetry-and-gps-915mhz.html)


## Building Firmware

> **Tip** Most users will not need to build this firmware!
  It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/master/en/setup/building_px4.html) for this target:
```
make px4_fmu-v2_default
```

## Debug Port

See [3DR Pixhawk 1 > Debug Ports](../flight_controller/pixhawk.md#debug-ports).


## Pinouts and Schematics

The board is based on the [Pixhawk project](https://pixhawk.org/) **FMUv2** open hardware design.

* [FMUv2 + IOv2 schematic](https://raw.githubusercontent.com/PX4/Hardware/master/FMUv2/PX4FMUv2.4.5.pdf) -- Schematic and layout

> **Note** As a CC-BY-SA 3.0 licensed Open Hardware design, all schematics and design files are [available](https://github.com/PX4/Hardware). 


## Serial Port Mapping

UART | Device | Port
--- | --- | ---
UART1 | /dev/ttyS0 | IO debug
USART2 | /dev/ttyS1 | TELEM1 (flow control)
USART3 | /dev/ttyS2 | TELEM2 (flow control)
UART4 | | 
UART7 | CONSOLE
UART8 | SERIAL4