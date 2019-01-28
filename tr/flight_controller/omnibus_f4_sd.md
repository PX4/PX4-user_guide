# Omnibus F4 SD

The *Omnibus F4 SD* is a controller board designed for racers. In contrast to a typical racer board it has some additional features, such as an SD card and a faster CPU.

These are the main differences compared to a [Pixracer](../flight_controller/pixracer.md):

* Lower price
* Fewer IO ports (though it's still possible to attach a GPS or a Flow sensor for example)
* Requires external pull up resistor on the I2C bus for external GPS, see [I2C](#i2c) below.
* Less RAM (192 KB vs. 256 KB) and FLASH (1 MB vs. 2 MB)
* Same board dimensions as a *Pixracer*, but slightly smaller form factor (because it has less connectors)
* Integrated OSD (not yet implemented in software)

> **Tip** All the usual PX4 features can still be used for your racer!

<img src="../../assets/flight_controller/omnibus_f4_sd/board.jpg" width="400px" title="Omnibus F4 SD" />

## Key Features

* Main System-on-Chip: [STM32F405RGT6](https://www.st.com/en/microcontrollers/stm32f405rg.html) 
  * CPU: 168 MHz ARM Cortex M4 with single-precision FPU
  * RAM: 192 KB SRAM
  * FLASH: 1 MB
* Standard racer form factor: 36x36 mm with standard 30.5 mm hole pattern
* MPU6000 Accel / Gyro
* BMP280 Baro (not all boards have it mounted)
* microSD (logging and parameters)
* Futaba S.BUS and S.BUS2 / Spektrum DSM2 and DSMX / Graupner SUMD / PPM input / Yuneec ST24
* OneShot PWM out (configurable)
* built-in current sensor
* built-in OSD chip (AB7456 via SPI, not supported yet)

## Where to Buy

The board is produced by different vendors, with some variations (e.g. with or without a barometer).

> **Tip** PX4 is compatible with boards that support the Betaflight OMNIBUSF4SD target (if *OMNIBUSF4SD* is present on the product page the board should work with PX4).

<span></span>

> **Tip** Any Omnibus F4 labeled derivative (e.g. clone) should work as well. However, power distribution on these boards is of varying quality.

These are the boards tested and known to work:

* [Hobbywing XRotor Flight Controller F4](http://www.hobbywing.com/goods.php?id=590)
  
  > **Note** This board fits on top of the [Hobbywing XRotor Micro 40A 4in1 ESC](http://www.hobbywing.com/goods.php?id=588) without soldering. This ESC board also provides power for the Omnibus board.
  
  Purchase from:
  
  * [Hobbywing XRotor F4 Flight Controller w/OSD](https://www.getfpv.com/hobbywing-xrotor-f4-flight-controller-w-osd.html) (getfpv)

* Original Airbot Omnibus F4 SD
  
  Purchase from:
  
  * [Airbot (CN manufacturer)](https://store.myairbot.com/omnibusf4prov3.html)
  * [Ready To Fly Quads (US reseller)](http://www.readytoflyquads.com/flip-32-f4-omnibus-v2-pro)

Accessories include:

* [ESP8266 WiFi Module](../telemetry/esp8266_wifi_module.md) for MAVLink telemetry. You need to connect these pins: GND, RX, TX, VCC and CH-PD (CH-PD to 3.3V). The baud rate is 921600.

## Connectors

Boards from different vendors (based on this design) can have significantly different layout. Layouts/Silkscreens for various versions are shown below.

### Airbot Omnibus F4 SD

Below are silkscreens for the Airbot Omnibus F4 SD (V1), showing both top and bottom.

![Omnibus F4 SD v1 Silkscreen Top](../../assets/flight_controller/omnibus_f4_sd/silk-top.jpg) ![Omnibus F4 SD v1 Silkscreen Bottom](../../assets/flight_controller/omnibus_f4_sd/silk-bottom.jpg)

### Hobbywing XRotor Flight Controller F4

Below are silkscreens for the Hobbywing XRotor Flight Controller F4.

![Hobbywing XRotor Flight Controller F4 Silkscreen](../../assets/flight_controller/omnibus_f4_sd/hobbywing_xrotor_silk.png)

## Pinouts

### Radio Control

RC is connected to one of the following ports:

* UART1
* SBUS/PPM port (via inverter, internally goes to UART1)

> **Note** Some Omnibus F4 boards have a jumper connecting either or both the MCU SBUS and PPM to a single pin header. Set your jumper or solder bridge to the appropriate MCU pin before use.

### UARTs

* UART6: GPS port
  
  * TX: MCU pin PC6
  * RX: MCU pin PC7
  
  * Airbot Omnibus F4 SD Pinout is on Port J10 (TX6/RX6):
  
  ![Omnibus F4 SD UART6](../../assets/flight_controller/omnibus_f4_sd/uart6.jpg)

* UART4
  
  * TX: MCU pin PA0
  * RX: MCU pin PA1
  * 57600 baud
  * This can be configured as the `TELEM 2` port.
  * Airbot Omnibus F4 SD Pinout: 
    * TX: RSSI pin
    * RX: PWM out 5
  
  ![Omnibus F4 SD UART4](../../assets/flight_controller/omnibus_f4_sd/uart4.jpg)
  
  ![Omnibus F4 SD UART4 Top](../../assets/flight_controller/omnibus_f4_sd/uart4-top.jpg)

### I2C

There is one I2C port available via:

* SCL: MCU pin PB10 (might be labeled as TX3)
* SDA: MCU pin PB11 (might be labeled as RX3)

> **Note** You will need external pullups on both signals (clock and data). You can use 2.2k pullups for example to attach an external mag.

    - Airbot Omnibus F4 SD Pinout is on Port J10 (SCL [clock] / SCA [data]):
    

![](../../assets/flight_controller/omnibus_f4_sd/uart6.jpg "Omnibus F4 SD UART6")

Here is an example implementation. I used a Spektrum plug to get 3.3v from the DSM port, connecting only 3.3v + to each line via 2.2k resistor.

![Omnibus F4 SD Pullup](../../assets/flight_controller/omnibus_f4_sd/pullup-schematic.jpg)

![Omnibus F4 SD Pullup Implementation](../../assets/flight_controller/omnibus_f4_sd/pullup.jpg)

## RC Telemetry

The Omnibus supports telemetry to the RC Transmitter using [FrSky Telemetry](../peripherals/frsky_telemetry.md) or [CRSF Crossfire Telemetry](#crsf_telemetry).

### CRSF Crossfire Telemetry {#crsf_telemetry}

TBS CRSF Crossfire telemetry is used to send telemetry data from the flight controller (the vehicle's attitude, battery, flight mode and GPS data) to the RC transmitter (Taranis).

Benefits over FrSky telemetry include:

* Only a single UART is needed for RC and telemetry.
* The CRSF protocol is optimized for low latency.
* 150 Hz RC update rate.
* The signals are uninverted and thus no (external) inverter logic is required.

For Omnibus we recommend the [TBS Crossfire Nano RX](http://team-blacksheep.com/products/prod:crossfire_nano_rx), since it is specifically designed for small Quads.

On the handheld controller (e.g. Taranis) you will also need a [Transmitter Module](http://team-blacksheep.com/shop/cat:rc_transmitters#product_listing). This can be plugged into the back of the RC controller.

> **Note** The referenced links above contains the documentation for the TX/RX modules.

#### Setup

Connect the Nano RX and Omnibus pins as shown:

| Omnibus UART1 | Nano RX |
| ------------- | ------- |
| TX            | Ch2     |
| RX            | Ch1     |

Nothing else needs to be configured on PX4 flight controller side - the RC protocol is auto-detected.

Next update the TX/RX modules to use the CRSF protocol and set up telemetry. Instructions for this are provided in the [TBS Crossfire Manual](https://www.team-blacksheep.com/tbs-crossfire-manual.pdf) (search for 'Setting up radio for CRSF').

## Schematics

The schematics are provided by [Airbot](https://myairbot.com/): [OmnibusF4-Pro-Sch.pdf](http://bit.ly/obf4pro).

## PX4 Bootloader Update {#upload}

The board comes pre-installed with [Betaflight](https://github.com/betaflight/betaflight/wiki). Before PX4 firmware can be installed, the *PX4 bootloader* must be flashed.

There are two options for flashing the bootloader: via *Betaflight Configurator* (easier), or building from source (guaranteed to work).

### Bootloader Update using Betaflight Configurator {#betaflight_configurator}

To install the PX4 bootloader using the *Betaflight Configurator*:

1. Download the pre-built bootloader binary: [omnibusf4sd_bl.hex](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/omnibus_f4_sd/omnibusf4sd_bl_d52b70cb39.hex).
2. Download the [Betaflight Configurator](https://github.com/betaflight/betaflight-configurator/releases) for your platform. > **Tip** If using the *Chrome* web browser, a simple cross-platform alternative is to install the configurator as an [extension from here](https://chrome.google.com/webstore/detail/betaflight-configurator/kdaghagfopacdngbohiknlhcocjccjao). 
3. Connect the board to your PC and start the Configurator.
4. Press the **Load Firmware [Local]** button ![Betaflight Configurator - Local Firmware](../../assets/flight_controller/omnibus_f4_sd/betaflight_configurator.jpg)
5. Select the bootloader binary from the file system and then flash the board.

You should now be able to install PX4 firmware on the board.

### Bootloader Update using Source

#### Download Bootloader Source

Download and build the [Bootloader](https://github.com/PX4/Bootloader) via:

    git clone --recursive  https://github.com/PX4/Bootloader.git
    cd Bootloader
    make omnibusf4sd_bl
    

#### Flash Bootloader

You can flash the PX4 bootloader using the [dfu-util](http://dfu-util.sourceforge.net/) or the graphical [dfuse](https://www.st.com/en/development-tools/stsw-stm32080.html) tool on windows.

Don't be afraid to try flashing using any of the below methods. The STM32 MCU cannot be bricked. DFU cannot be overwritten by flashing and will always allow you to install a new firmware, even if flashing fails.

##### Enter DFU mode

Both methods require the board to be in DFU mode. To enter DFU mode, hold the boot button down while connecting the USB cable to your computer. The button can be released after the board is powered up.

##### dfu-util

    dfu-util -a 0 --dfuse-address 0x08000000 -D  build/omnibusf4sd_bl/omnibusf4sd_bl.bin
    

Reboot the flight controller and it let it boot without holding the boot button.

##### dfuse

See the dfuse manual is here: https://www.st.com/resource/en/user_manual/cd00155676.pdf

Flash the `omnibusf4sd_bl.bin` file.

## Building Firmware

To [build PX4](https://dev.px4.io/en/setup/building_px4.html) for this target:

    make omnibus_f4sd_default
    

## Installing PX4 Firmware

The firmware can be installed in any of the normal ways:

* Build and upload the source ```make omnibus_f4sd_default upload```
* [Load the firmware](../config/firmware.md) using *QGroundControl*. You can use either pre-built firmware or your own custom firmware.

## Configuration

In addition to the [basic configuration](../config/README.md), the following parameters are important:

| Parameter                                                                | Setting                                                                                                                 |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [SYS_HAS_MAG](../advanced_config/parameter_reference.md#SYS_HAS_MAG)   | This should be disabled since the board does not have an internal mag. You can enable it if you attach an external mag. |
| [SYS_HAS_BARO](../advanced_config/parameter_reference.md#SYS_HAS_BARO) | Disable this if your board does not have a barometer.                                                                   |
| [MOT_ORDERING](../advanced_config/parameter_reference.md#MOT_ORDERING)   | If you use a 4-in-1 ESC with Betaflight/Cleanflight motor assignment, this parameter can be set accordingly.            |

## Reinstall Betaflight {#reinstall_betaflight}

In order to switch back to *Betaflight*:

* Backup the PX4 parameters, e.g. by [exporting](https://dev.px4.io/master/en/advanced/parameters_and_configurations.html#exporting-and-loading-parameters) them to an SD card
* Keep the **bootloader** button pressed while attaching the USB cable
* Then flash *Betaflight* as usual with the *Betaflight-configurator*

## Further Info

A review with further information of the board can be found [here](https://nathan.vertile.com/blog/2016/10/12/omnibusf4/).

[This page](https://blog.dronetrest.com/omnibus-f4-flight-controller-guide/) also provides a nice overview with pinouts and setup instructions.