# Omnibus F4 SD

The *Omnibus F4 SD* is a controller board designed for racers. 
In contrast to a typical racer board it has some additional features, such as an SD card and a faster CPU.

These are the main differences compared to a [Pixracer](../flight_controller/pixracer.md):
- Lower price
- Fewer IO ports (though it's still possible to attach a GPS or a Flow sensor for example)
- Less RAM (192 KB vs. 256 KB) and FLASH (1 MB vs. 2 MB)
- Same board dimensions as a *Pixracer*, but slightly smaller form factor (because it has less connectors)

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
If the Betaflight OMNIBUSF4SD target can be used, then it should work with PX4 as well.

These are the boards tested and known to work:
- [Hobbywing XRotor Flight Controller F4](http://www.hobbywing.com/goods.php?id=590) 
   > **Tip** This board fits on top of the [Hobbywing XRotor Micro 40A 4in1 ESC](http://www.hobbywing.com/goods.php?id=588) without soldering. This ESC board also provides power for the Omnibus board.
   
   Purchase from:
  * [Hobbywing XRotor F4 Flight Controller w/OSD](https://www.getfpv.com/hobbywing-xrotor-f4-flight-controller-w-osd.html) (getfpv)

Accessories include:
* [ESP8266 WiFi Module](../telemetry/esp8266_wifi_module.md) for MAVLink telemetry.
  You need to connect these pins: GND, RX, TX, VCC and CH-PD (CH-PD to 3.3V). The baud rate is 921600.


## Pinouts

RC is connected to one of the following ports:
- UART1
- SBUS/PPM port (via inverter, internally goes to UART1)

### UARTs

- UART6: GPS port
- There is a second UART available on the RSSI pin (TX) and PWM out 5 (RX).
  It can be configured via [SYS_COMPANION](../advanced_config/parameter_reference.md#SYS_COMPANION) parameter.

### I2C

There is one I2C port available via:
- SCL = TX3
- SDA = RX3

> **Note** You probably need external pullups on both signals (clock and data).
> You can use 2.2k pullups to attach an external mag (for example).



## Schematics

The schematics are provided by [Airbot](https://myairbot.com/): [OmnibusF4-Pro-Sch.pdf](http://bit.ly/obf4pro).


## Build & Upload Instructions

The board comes pre-installed with [Betaflight](https://github.com/betaflight/betaflight/wiki). 
Before PX4 firmware can be installed, the PX4 bootloader needs to be built and uploaded.

Download and build the [Bootloader](https://github.com/PX4/Bootloader) via:
```
git clone --recursive  https://github.com/PX4/Bootloader.git
cd Bootloader
make omnibusf4sd_bl
```

To flash it, press and hold the board's bootloader button attach the USB cable (the button may be labeled *BOOT*). 
Then flash it with:
```
dfu-util -a 0 --dfuse-address 0x08000000 -D  build/omnibusf4sd_bl/omnibusf4sd_bl.bin
```

Now you can build and flash the PX4 Firmware with the following build target (without pressing the button):
```
make omnibus-f4sd_default upload
```

If you later on want to switch back to *Betaflight*, you can easily do that:
- Backup the parameters by copying the **params** file on the SD card (or use another SD card)
- Keep the **bootloader** button pressed while attaching the USB cable
- Then flash *Betaflight* as usual with the *Betaflight-configurator*

## Configuration

> **Note** Make sure to insert an SD card as the parameters are stored there.

In addition to the [basic configuration](../config/README.md), the following parameters are important:

Parameter | Setting
--- | ---
[SYS_HAS_MAG](../advanced_config/parameter_reference.md#SYS_HAS_MAG) | This should be disabled since the board does not have an internal mag. You can enable it if you attach an external mag.
[SYS_HAS_BARO](../advanced_config/parameter_reference.md#SYS_HAS_BARO) | Disable this if your board does not have a barometer.
[MOT_ORDERING](../advanced_config/parameter_reference.md#MOT_ORDERING) | If you use a 4-in-1 ESC with Betaflight/Cleanflight motor assignment, this parameter can be set accordingly.

## Further Info

A review with further information of the board can be found [here](https://nathan.vertile.com/blog/2016/10/12/omnibusf4/).

[This page](https://blog.dronetrest.com/omnibus-f4-flight-controller-guide/) also provides a nice overview with pinouts and setup instructions.

