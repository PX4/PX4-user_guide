# Pixhawk 1 Flight Controller

The *Pixhawk<sup>&reg;</sup> 1* autopilot is a popular general purpose flight controller based on the [Pixhawk-project](https://pixhawk.org/) **FMUv2** open hardware design (it combines the functionality of the PX4FMU + PX4IO). It runs PX4 on the [NuttX](http://nuttx.org) OS.

> **Tip** Originally manufactured by 3DR<sup>&reg;</sup> this board was the original standard microcontroller platform for PX4. While the board is no longer manufactured by 3DR, you can use the [mRo Pixhawk](../flight_controller/mro_pixhawk.md) as a drop-in replacement.

![Pixhawk Image](../../assets/hardware/hardware-pixhawk.png)

Assembly/setup instructions for use with PX4 are provided here: [Pixhawk Wiring Quickstart](../assembly/quick_start_pixhawk.md)

## Key Features

* Main System-on-Chip: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789) 
  * CPU: 180 MHz ARM<sup>&reg;</sup> Cortex<sup>&reg;</sup> M4 with single-precision FPU
  * RAM: 256 KB SRAM (L1)
* Failsafe System-on-Chip: STM32F100 
  * CPU: 24 MHz ARM Cortex M3
  * RAM: 8 KB SRAM
* Wifi: ESP8266 external
* GPS: U-Blox<sup>&reg;</sup> 7/8 (Hobbyking<sup>&reg;</sup>) / U-Blox 6 (3D Robotics)
* Optical flow: [PX4 Flow unit](http://www.hobbyking.com/hobbyking/store/__66308__HK_Pilot32_Optical_Flow_Kit_With_Sonar.html)
* Redundant power supply inputs and automatic failover
* External safety switch
* Multicolor LED main visual indicator
* High-power, multi-tone piezo audio indicator
* microSD card for high-rate logging over extended periods of time

Connectivity

* 1x I2C
* 1x CAN (2x optional)
* 1x ADC
* 4x UART (2x with flow control)
* 1x Console
* 8x PWM with manual override
* 6x PWM / GPIO / PWM input
* S.BUS / PPM / Spektrum input
* S.BUS output

# Where to Buy

Originally manufactured by 3DR&reg; this board was the original standard microcontroller platform for PX4&reg;. While the board is no longer manufactured by 3DR, you can use the [mRo Pixhawk](../flight_controller/mro_pixhawk.md) as a drop-in replacement.

Order mRo Pixhawk from:

* [Bare Bones](https://store.mrobotics.io/Genuine-PixHawk-1-Barebones-p/mro-pixhawk1-bb-mr.htm) - Just the board (useful as a 3DR Pixhawk replacement)
* [mRo Pixhawk 2.4.6 Essential Kit](https://store.mrobotics.io/Genuine-PixHawk-Flight-Controller-p/mro-pixhawk1-minkit-mr.htm) - includes everything except for telemetry radios
* [mRo Pixhawk 2.4.6 Cool Kit! (Limited edition)](https://store.mrobotics.io/product-p/mro-pixhawk1-fullkit-mr.htm) - includes everything you need including telemetry radios

If out of stock the software-compatible but not connector-compatible versions can be used:

* [HKPilot32](http://www.hobbyking.com/hobbyking/store/__55561__HKPilot32_Autonomous_Vehicle_32Bit_Control_Set_w_Power_Module.html)

## Specifications

### Processor

* 32bit STM32F427 [Cortex-M4F](http://en.wikipedia.org/wiki/ARM_Cortex-M#Cortex-M4) core with FPU
* 168 MHz
* 256 KB RAM
* 2 MB Flash
* 32 bit STM32F103 failsafe co-processor

### Sensors

* ST Micro L3GD20H 16 bit gyroscope
* ST Micro LSM303D 14 bit accelerometer / magnetometer
* Invensense MPU 6000 3-axis accelerometer/gyroscope
* MEAS MS5611 barometer

### Interfaces

* 5x UART (serial ports), one high-power capable, 2x with HW flow control
* 2x CAN (one with internal 3.3V transceiver, one on expansion connector)
* Spektrum DSM / DSM2 / DSM-X® Satellite compatible input
* Futaba S.BUS® compatible input and output
* PPM sum signal input
* RSSI (PWM or voltage) input
* I2C
* SPI
* 3.3 and 6.6V ADC inputs
* Internal microUSB port and external microUSB port extension

{% youtube %} https://youtu.be/gCCC5A-Bvv4 {% endyoutube %}

### Power System and Protection

* Ideal diode controller with automatic failover
* Servo rail high-power (max. 10V) and high-current (10A+) ready
* All peripheral outputs over-current protected, all inputs ESD protected

## Voltage Ratings

Pixhawk can be triple-redundant on the power supply if three power sources are supplied. The three rails are: Power module input, servo rail input, USB input.

### Normal Operation Maximum Ratings

Under these conditions all power sources will be used in this order to power the system

* Power module input (4.8V to 5.4V)
* Servo rail input (4.8V to 5.4V) **UP TO 10V FOR MANUAL OVERRIDE, BUT AUTOPILOT PART WILL BE UNPOWERED ABOVE 5.7V IF POWER MODULE INPUT IS NOT PRESENT**
* USB power input (4.8V to 5.4V)

### Absolute Maximum Ratings

Under these conditions the system will not draw any power (will not be operational), but will remain intact.

* Power module input (4.1V to 5.7V, 0V to 20V undamaged)
* Servo rail input (4.1V to 5.7V, 0V to 20V)
* USB power input (4.1V to 5.7V, 0V to 6V) 

## Schematics

[FMUv2 + IOv2 schematic](https://raw.githubusercontent.com/PX4/Hardware/master/FMUv2/PX4FMUv2.4.5.pdf) -- Schematic and layout

> **Note** As a CC-BY-SA 3.0 licensed Open Hardware design, all schematics and design files are [available](https://github.com/PX4/Hardware).

## Connectors

> **Tip** The RC IN port is for RC receivers only and provides power. **NEVER** connect any servos, power supplies or batteries to it or to the receiver connected to it.

![Pixhawk Connectors](../../assets/flight_controller/pixhawk1/pixhawk_connectors.png)

## Pinouts

TELEM1, TELEM2 ports

| Pin     | Signal    | Volt  |
| ------- | --------- | ----- |
| 1 (red) | VCC       | +5V   |
| 2 (blk) | TX (OUT)  | +3.3V |
| 3 (blk) | RX (IN)   | +3.3V |
| 4 (blk) | CTS (IN)  | +3.3V |
| 5 (blk) | RTS (OUT) | +3.3V |
| 6 (blk) | GND       | GND   |

GPS port

| Pin     | Signal   | Volt  |
| ------- | -------- | ----- |
| 1 (red) | VCC      | +5V   |
| 2 (blk) | TX (OUT) | +3.3V |
| 3 (blk) | RX (IN)  | +3.3V |
| 4 (blk) | CAN2 TX  | +3.3V |
| 5 (blk) | CAN2 RX  | +3.3V |
| 6 (blk) | GND      | GND   |

SERIAL 4/5 port - due to space constraints two ports are on one connector.

| Pin     | Signal  | Volt  |
| ------- | ------- | ----- |
| 1 (red) | VCC     | +5V   |
| 2 (blk) | TX (#4) | +3.3V |
| 3 (blk) | RX (#4) | +3.3V |
| 4 (blk) | TX (#5) | +3.3V |
| 5 (blk) | RX (#5) | +3.3V |
| 6 (blk) | GND     | GND   |

ADC 6.6V

| Pin     | Signal | Volt        |
| ------- | ------ | ----------- |
| 1 (red) | VCC    | +5V         |
| 2 (blk) | ADC IN | up to +6.6V |
| 3 (blk) | GND    | GND         |

ADC 3.3V

| Pin     | Signal | Volt        |
| ------- | ------ | ----------- |
| 1 (red) | VCC    | +5V         |
| 2 (blk) | ADC IN | up to +3.3V |
| 3 (blk) | GND    | GND         |
| 4 (blk) | ADC IN | up to +3.3V |
| 5 (blk) | GND    | GND         |

I2C

| Pin     | Signal | Volt           |
| ------- | ------ | -------------- |
| 1 (red) | VCC    | +5V            |
| 2 (blk) | SCL    | +3.3 (pullups) |
| 3 (blk) | SDA    | +3.3 (pullups) |
| 4 (blk) | GND    | GND            |

CAN

| Pin     | Signal | Volt |
| ------- | ------ | ---- |
| 1 (red) | VCC    | +5V  |
| 2 (blk) | CAN_H  | +12V |
| 3 (blk) | CAN_L  | +12V |
| 4 (blk) | GND    | GND  |

SPI

| Pin     | Signal         | Volt |
| ------- | -------------- | ---- |
| 1 (red) | VCC            | +5V  |
| 2 (blk) | SPI_EXT_SCK  | +3.3 |
| 3 (blk) | SPI_EXT_MISO | +3.3 |
| 4 (blk) | SPI_EXT_MOSI | +3.3 |
| 5 (blk) | !SPI_EXT_NSS | +3.3 |
| 6 (blk) | !GPIO_EXT      | +3.3 |
| 7 (blk) | GND            | GND  |

POWER

| Pin     | Signal  | Volt  |
| ------- | ------- | ----- |
| 1 (red) | VCC     | +5V   |
| 2 (blk) | VCC     | +5V   |
| 3 (blk) | CURRENT | +3.3V |
| 4 (blk) | VOLTAGE | +3.3V |
| 5 (blk) | GND     | GND   |
| 6 (blk) | GND     | GND   |

SWITCH

| Pin     | Signal           | Volt  |
| ------- | ---------------- | ----- |
| 1 (red) | VCC              | +3.3V |
| 2 (blk) | !IO_LED_SAFETY | GND   |
| 3 (blk) | SAFETY           | GND   |

## Console Port

The system's serial console runs on the port labeled SERIAL4/5. The pinout is standard serial pinout, to connect to a standard FTDI cable (3.3V, but its 5V tolerant).

Please refer to the Devguide [wiring](https://dev.px4.io/en/debug/system_console.html) page for details of how to wire up this port.

## Building Firmware

> **Tip** Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/en/setup/building_px4.html) for this target:

    make px4_fmu-v2_default
    

## Parts / Housings

* **ARM MINI JTAG (J6**, //not populated per default//**)**: 1.27 mm 10pos header (SHROUDED, for Black Magic Probe: FCI 20021521-00010D4LF ([Distrelec](http://www.distrelec.ch/en/Pin-header-SMT-straight-for-IDC-1-27-mm-10-Minitek-127-Pin-header-for-IDC%2C-shrouded%2C-straight%2C-SMT-FCI-20021521-00010D4LF/p/14352308?q=20021521-00010D4LF&page=1&origPos=1&origPageSize=10&simi=99.4), [Digi-Key](http://www.digikey.com/product-detail/en/20021521-00010T1LF/609-4054-ND/2414951),) or Samtec FTSH-105-01-F-DV-K (untested) or Harwin M50-3600542 ([Digikey](http://www.digikey.com/product-detail/en/M50-3600542/952-1389-ND/2264370) or [Mouser](http://ch.mouser.com/ProductDetail/Harwin/M50-3600542/?qs=%2fha2pyFadujTt%2fIEz8xdzrYzHAVUnbxh8Ki%252bwWYPNeEa09PYvTkIOQ%3d%3d)) 
  * JTAG Adapter Option #1: [BlackMagic Probe](http://www.blacksphere.co.nz/main/blackmagic), comes without cables, needs the **Samtec FFSD-05-D-06.00-01-N** cable ([Samtec sample service](http://www.samtec.com/suddenservice/samples/samples.aspx) or [Digi-Key Link: SAM8218-ND](http://www.digikey.com/product-search/en?x=0&y=0&lang=en&site=us&KeyWords=FFSD-05-D-06.00-01-N)) or [Tag Connect Ribbon](http://www.tag-connect.com/CORTEXRIBBON10) and a Mini-USB cable
  * JTAG Adapter Option #2: [Digi-Key Link: ST-LINK/V2](http://search.digikey.com/us/en/cat/programmers-development-systems/in-circuit-programmers-emulators-and-debuggers/2621880?k=st%20link%20v2) / [ST USER MANUAL](http://www.st.com/internet/com/TECHNICAL_RESOURCES/TECHNICAL_LITERATURE/USER_MANUAL/DM00026748.pdf), needs an ARM Mini JTAG to 20pos adapter: [Digi-Key Link: 726-1193-ND](http://search.digikey.com/us/en/products/MDL-ADA2/726-1193-ND/1986451)
  * JTAG Adapter Option #3: [SparkFun Link: Olimex ARM-TINY](http://www.sparkfun.com/products/8278) or any other OpenOCD-compatible ARM Cortex JTAG adapter, needs an ARM Mini JTAG to 20pos adapter: [Digi-Key Link: 726-1193-ND](http://search.digikey.com/us/en/products/MDL-ADA2/726-1193-ND/1986451)
* **USARTs**: Hirose DF13 6 pos ([Digi-Key Link: DF13A-6P-1.25H(20)](http://search.digikey.com/scripts/DkSearch/dksus.dll?WT.z_header=search_go&lang=en&site=us&keywords=DF13A-6P-1.25H%2820%29&x=0&y=0)) 
  * Mates: Hirose DF13 6 pos housing ([Digi-Key Link: Hirose DF13-6S-1.25C](http://search.digikey.com/us/en/products/DF13-6S-1.25C/H2182-ND/241752))
* **I2C and CAN**: Hirose DF13 4 pos ([Digi-Key Link: DF13A-4P-1.25H(20)](http://search.digikey.com/scripts/DkSearch/dksus.dll?WT.z_header=search_go&lang=en&site=us&keywords=DF13A-4P-1.25H%2820%29&x=0&y=0)) 
  * Mates: Hirose DF13 4 pos housing ([Digi-Key Link: Hirose DF13-4S-1.25C](http://www.digikey.com/product-search/en?KeyWords=DF13-4S-1.25C))
* **USB (J5)**: Micro USB-B 
  * Mates: Cell phone data / charger cables, e.g. [Digi-Key Link: ASSMANN AK67421-0.5-R](http://search.digikey.com/us/en/products/AK67421-0.5-R/AE10418-ND/2263977)

<!--
## Peripherals


* [[:peripherals:sensors:px4airspeed|Digital airspeed sensor PX4AIRSPEED]]
* [[https://store.3drobotics.com/products/3dr-gps-ublox-with-compass?taxon_id=34|u-Blox GPS Module]]
* [[:peripherals:external_led|External multicolor LED]]
* [[:peripherals:i2c_splitter|I2C splitter]]
-->

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos.