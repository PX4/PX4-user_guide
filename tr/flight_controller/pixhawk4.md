# Pixhawk 4

*Pixhawk 4*<sup>&reg;</sup> is an advanced autopilot designed and made in collaboration with Holybro<sup>&reg;</sup> and the PX4 team. It is optimized to run PX4 version 1.7, suitable for academic and commercial developers.

It is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv5** open hardware design and runs PX4 on the [NuttX](http://nuttx.org) OS.

<img src="../../assets/flight_controller/pixhawk4/pixhawk4_hero_upright.jpg" width="200px" title="Pixhawk4 Upright Image" /> <img src="../../assets/flight_controller/pixhawk4/pixhawk4_logo_view.jpg" width="420px" title="Pixhawk4 Image" />

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
* GPS: ublox Neo-M8N GPS/GLONASS receiver; integrated magnetometer IST8310
* Interfaces: 
  * 8-16 PWM outputs (8 from IO, 8 from FMU)
  * 3 dedicated PWM/Capture inputs on FMU
  * Dedicated R/C input for CPPM
  * Dedicated R/C input for Spektrum / DSM and S.Bus with analog / PWM RSSI input
  * Dedicated S.Bus servo output
  * 5 general purpose serial ports
  * 3 I2C ports
  * 4 SPI buses
  * Up to 2 CANBuses for dual CAN with serial ESC
  * Analog inputs for voltage / current of 2 batteries
* Power System: 
  * Power module output: 4.9~5.5V
  * USB Power Input: 4.75~5.25V
  * Servo Rail Input: 0~36V
* Weight and Dimensions: 
  * Weight: 15.8g
  * Dimensions: 44x84x12mm
* Other Characteristics: 
  * Operating temperature: -40 ~ 85°c

Additional information can be found in the [Pixhawk 4 Technical Data Sheet](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf).

## Purchase

Order from [Holybro](https://shop.holybro.com/pixhawk-4beta-launch_p1089.html).

## Connectors

![Pixhawk 4 connectors](../../assets/flight_controller/pixhawk4/pixhawk4-connectors.jpg)

> **Warning** The **DSM/SBUS RC** and **PPM RC** ports are for RC receivers only. These are powered! NEVER connect any servos, power supplies or batteries (or to any connected receiver).

## Pinouts

Download *Pixhawk 4* pinouts from [here](http://www.holybro.com/manual/Pixhawk4-Pinouts.pdf).

## Dimensions

![Pixhawk 4 Dimensions](../../assets/flight_controller/pixhawk4/pixhawk4_dimensions.jpg)

## Voltage Ratings

*Pixhawk 4* can be triple-redundant on the power supply if three power sources are supplied. The three power rails are: **POWER1**, **POWER2** and **USB**.

> **Note** The output power rails **FMU PWM OUT** and **I/O PWM OUT** (0V to 36V) do not power the flight controller board (and are not powered by it). You must supply power to one of **POWER1**, **POWER2** or **USB** or the board will be unpowered.

**Normal Operation Maximum Ratings**

Under these conditions all power sources will be used in this order to power the system:

1. **POWER1** and **POWER2** inputs (4.9V to 5.5V)
2. **USB** input (4.75V to 5.25V)

**Absolute Maximum Ratings**

Under these conditions the system will not draw any power (will not be operational), but will remain intact.

1. **POWER1** and **POWER2** inputs (operational range 4.1V to 5.7V, 0V to 10V undamaged)
2. **USB** input (operational range 4.1V to 5.7V, 0V to 6V undamaged)
3. Servo input: VDD_SERVO pin of **FMU PWM OUT** and **I/O PWM OUT** (0V to 42V undamaged)

## Assembly/Setup

The [Pixhawk 4 Wiring Quick Start](../assembly/quick_start_pixhawk4.md) provides instructions on how to assemble required/important peripherals including GPS, Power Management Board etc.

## Building Firmware

> **Tip** Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/en/setup/building_px4.html) for this target:

    make px4_fmu-v5_default
    

## Debug Port

The system's serial console and SWD interface runs on the **FMU Debug** port, while the I/O console and SWD interface can be accessed via **I/O Debug** port. In order to access these ports, the user must remove the *Pixhawk 4* casing.

Both ports have standard serial pinout and can be connected to a standard FTDI cable (3.3V, but it's 5V tolerant) or a [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation). The pinout uses the standard Dronecode debug connector pinout. Please refer to the [wiring](https://dev.px4.io/en/debug/system_console.html) page for details of how to wire up this port.

## Peripherals

* [Digital Airspeed Sensor](https://drotek.com/shop/en/home/848-sdp3x-airspeed-sensor-kit-sdp33.html)
* [Telemetry Radio Modules](../telemetry/README.md)
* [Rangefinders/Distance sensors](../sensor/rangefinders.md)

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## Further info

* [Pixhawk 4 Technical Data Sheet](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf)
* [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).