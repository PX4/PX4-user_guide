# Omnibus F4 SD
The Omnibus F4 SD is a board designed for racers. In contrast to a typical racer
board it has some additional features, such as an SD card or a faster CPU.

These are the main differences compared to a Pixracer:
- Lower price
- Less IO ports (though it's still possible to attach a GPS or a Flow sensor for example)
- Requires external pull up resistor on the I2C bus for external GPS, see [I2C](#i2c) below.
- Less RAM (192 KB vs. 256 KB) and FLASH (1 MB vs. 2 MB)
- Same board dimensions as a Pixracer, but slightly smaller form factor because it has less connectors
- Integrated OSD (not yet implemented in software)

> **Note** Note that an SD card is required for parameter storage.

Apart from that all the usual PX4 features can be used.

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

The board is produced by different vendors, with some variations (e.g. with or without baro).
Make sure that the Betaflight OMNIBUSF4SD target can be used, then it should work with PX4 as well.

These are the boards tested and known to work:
- [Hobbywing XRotor Flight Controller F4](http://www.hobbywing.com/goods.php?id=590).
  For example from [getfpv.com](https://www.getfpv.com/hobbywing-xrotor-f4-flight-controller-w-osd.html).
> **Tip** This board fits on top of the [Hobbywing XRotor Micro 40A 4in1 ESC](http://www.hobbywing.com/goods.php?id=588) without soldering. It also provides power for the Omnibus board.

- Original Airbot OmnibusF4 SD
  - Available from:
    - [Airbot (CN manufacturer)](https://store.myairbot.com/omnibusf4prov3.html)
    - [Ready To Fly Quads (US reseller)](http://www.readytoflyquads.com/flip-32-f4-omnibus-v2-pro)
> **Tip** Any OmnibusF4 labeled derivative (e.g. clone) should work as well. However, power distribution on these boards is of varying quality.
  - Silkscreens (V1)
<img src="../../assets/flight_controller/omnibus_f4_sd/silk-top.jpg" title="Omnibus F4 SD v1 Silkscreen Top" />
<img src="../../assets/flight_controller/omnibus_f4_sd/silk-bottom.jpg" title="Omnibus F4 SD v1 Silkscreen Bottom" />

Accessories include:
* [ESP8266 WiFi Module](../telemetry/esp8266_wifi_module.md) for MAVLink telemetry.
  You need to connect these pins: GND, RX, TX, VCC and CH-PD (CH-PD to 3.3V). The baudrate is 921600.


## Pinouts

RC is connected to one of the following ports:
- UART1
- SBUS/PPM port (via inverter, internally goes to UART1)
> **Note** Some OmnibusF4 boards have a jumper connecting either or both the MCU SBUS and PPM to a single pin header. Set your jumper or solder bridge to the appropriate MCU pin before use.


### UARTs

- UART6: gps port
  - TX: MCU pin PC6
  - RX: MCU pin PC7

  - Airbot Omnibus F4 SD Pinout is on Port J10 (TX6/RX6):
<img src="../../assets/flight_controller/omnibus_f4_sd/uart6.jpg" title="Omnibus F4 SD UART6" />

- UART4
  - TX: MCU pin PA0
  - RX: MCU pin PA1
  - 57600 baud
  - It can be configured via [SYS_COMPANION](../advanced_config/parameter_reference.md#SYS_COMPANION) parameter.

  - Airbot Omnibus F4 SD Pinout:
    - TX: RSSI pin
    - RX: PWM out 5
<img src="../../assets/flight_controller/omnibus_f4_sd/uart4.jpg" title="Omnibus F4 SD UART4" />

<img src="../../assets/flight_controller/omnibus_f4_sd/uart4-top.jpg" title="Omnibus F4 SD UART4 Top" />

### I2C

There is one I2C port available via:
  - TX: MCU pin PB10
  - RX: MCU pin PB11

> **Note** You will need external pullups on both signals (clock and data).
> You can use 2.2k pullups for example to attach an external mag.

  - Airbot Omnibus F4 SD Pinout is on Port J10 (SCL [clock] / SCA [data]):
<img src="../../assets/flight_controller/omnibus_f4_sd/uart6.jpg" title="Omnibus F4 SD UART6" />

Here is an example implementation. I used a spektrum plug to get 3.3v from the DSM port, connecting only 3.3v + to each line via 2.2k resistor.

<img src="../../assets/flight_controller/omnibus_f4_sd/pullup-schematic.jpg" title="Omnibus F4 SD Pullup" />

<img src="../../assets/flight_controller/omnibus_f4_sd/pullup.jpg" title="Omnibus F4 SD Pullup Implementation" />


## Schematics

The schematics are provided by [Airbot](https://myairbot.com/): [OmnibusF4-Pro-Sch.pdf](http://bit.ly/obf4pro).

## Build & Upload Instructions

Before the firmware can be flashed, the PX4 bootloader needs to be built and uploaded.

### Download

Download and build the [Bootloader](https://github.com/PX4/Bootloader) via:
```
git clone --recursive  https://github.com/PX4/Bootloader.git
cd Bootloader
make omnibusf4sd_bl
```

### Flash

You can flash the Px4 bootloader via the [dfu-util](http://dfu-util.sourceforge.net/) or the graphical [dfuse](https://www.st.com/en/development-tools/stsw-stm32080.html) tool on windows.

Don't be afraid to try flashing using any of the below methods. The STM32 MCU cannot be bricked. DFU cannot be overwritten by flashing and will always allow you to install a new firmware, even if flashing fails.

#### Enter DFU mode

Both methods require the board to be in DFU mode. To enter DFU mode, hold the boot button down while connecting the USB cable to your computer. The button can be released after the board is powered up.

#### dfu-util

```
dfu-util -a 0 --dfuse-address 0x08000000 -D  build/omnibusf4sd_bl/omnibusf4sd_bl.bin
```

Reboot the flight controller and it let it boot without holding the boot button.

Build and flash the PX4 Firmware with the following build target:

```
make omnibus-f4sd_default upload
```

#### dfuse

See the dfuse manual is here: https://www.st.com/resource/en/user_manual/cd00155676.pdf

Flash the `omnibusf4sd_bl.bin` file

### Installing other firmwares

If you later on want to switch back to Betaflight:

- backup the parameters by copying the `params` file on the SD card (or use another SD card)
- keep the bootloader button pressed while attaching the USB cable
- flash Betaflight as usual with the Betaflight-configurator

## Configuration
> **Note** Make sure to insert an SD card as the parameters are stored there.

In addition to the [basic configuration](../config/README.md), the following parameters are important:
- [SYS_HAS_MAG](../advanced_config/parameter_reference.md#SYS_HAS_MAG): this
  should be disabled since the board does not have an internal mag. You can
  enable it if you attach an external mag.
- [SYS_HAS_BARO](../advanced_config/parameter_reference.md#SYS_HAS_BARO):
  disable this if your board does not have a baro.
- [MOT_ORDERING](../advanced_config/parameter_reference.md#MOT_ORDERING): if you
  use a 4-in-1 ESC with Betaflight/Cleanflight motor assignment, this parameter
  can be set accordingly.

## Further Info
A review with further information of the board can be found [here](https://nathan.vertile.com/blog/2016/10/12/omnibusf4/).

[This page](https://blog.dronetrest.com/omnibus-f4-flight-controller-guide/) also provides a nice overview with pinouts and setup instructions.

