# ESP8266 WiFi Module

The ESP8266 is a low-cost and readily available Wi-Fi module with full TCP/IP stack and microcontroller capability. It can be used with any Pixhawk series controller

> **Tip** ESP8266 is the *defacto* default WiFi module for use with [Pixracer](../flight_controller/pixracer.md) (and is usually bundled with it).

## Where to Buy

The module is readily available. A few vendors are listed below.

* [Sparkfun](https://www.sparkfun.com/products/13678)
* [GearBeast](https://us.gearbest.com/esp8266-wifi-module-_gear/)

## Module Setup

The ESP8266 firmware has these *factory* settings:

* SSID: PixRacer
* Password: pixracer
* WiFi Channel: 11
* UART speed 921600

### Build From Sources

The [firmware repository](https://github.com/dogmaphobic/mavesp8266) contains instructions and all the tools needed for building and flashing the firmware.

### Pre Built Binaries

[MavLink ESP8266 Firmware V 1.1.1](http://www.grubba.com/mavesp8266/firmware-1.1.1.bin)

### Updating the Firmware

If you have firmware 1.0.4 or greater installed, you can do the update using the ESP's *Over The Air Update* feature. Just connect to its AP WiFi link and browse to: http://192.168.4.1/update. You can then select the firmware file you downloaded above and upload it to the WiFi Module.

### Flashing the Firmware

Before flashing, make sure you boot the ESP8266 in *Flash Mode* as described below. If you cloned the [MavESP8266](https://github.com/dogmaphobic/mavesp8266) repository, you can build and flash the firmware using the provided [PlatformIO](http://platformio.org) tools and environment. If you downloaded the pre-built firmware above, download the [esptool](https://github.com/espressif/esptool) utility and use the command line below:

    esptool.py --baud 921600 --port /dev/your_serial_port write_flash 0x00000 firmware_xxxxx.bin
    

Where:

* **firmware_xxxxx.bin** is the firmware you downloaded above
* **your_serial_port** is the name of the serial port where the ESP8266 is connected to (`/dev/cu.usbmodem` for example)

### Wiring for Flashing the Firmware

> **Warning** ESP8266 must be powered with 3.3 volts only.

There are various methods for setting the ESP8266 into *Flash Mode* but not all USB/UART adapters provide all the necessary pins for automatic mode switching. In order to boot the ESP8266 in *Flash Mode*, the GPIO-0 pin must be set low (GND) and the CH_PD pin must be set high (VCC). This is what my own setup looks like:

![esp8266 flashing rig](../../assets/hardware/telemetry/esp8266_flashing_rig.jpg)

I built a cable where RX, TX, VCC, and GND are properly wired directly from the FTDI adapter to the ESP8266. From the ESP8266, I left two wires connected to GPIO-0 and CH_PD free so I can boot it either normally or in flash mode by connecting them to GND and VCC respectively.

### ESP8266 (ESP-01) Pinout

![esp8266 wifi module pinout](../../assets/hardware/telemetry/esp8266_pinout.jpg)

### Flashing diagram using a FTDI USB/UART adapter

![esp8266 flashing](../../assets/hardware/telemetry/esp8266_flashing_ftdi.jpg)

## Configuration

Install your ESP8266 to your PixRacer.

Flash PX4 master (a current copy or via QGroundControl) to your Pixracer.

Using a computer or tablet with WiFi, find the open wireless network for your ESP8266. By default, it will be named **PixRacer**. Connect to this network. The default password is **pixracer**.

## Using QGC

QGC automatically starts its UDP link on boot. Once your computer/tablet is connected to the **PixRacer** WiFi Access Point, it will automatically make the connection.

You should now see HUD movement on your QGC computer via wireless link and if using the latest QGC, you will be able to access the setup panel for the ESP8266 WiFi Bridge.