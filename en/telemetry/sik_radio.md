# SiK Radio

[SiK radio](https://github.com/LorenzMeier/SiK) is a collection of firmware and tools for telemetry radios.

Hardware for the SiK radio can be obtained from various manufacturers/stores in variants that support different range and form factors. Typically you will need a pair of devices - one for the vehicle and one for the ground station. The ground station-based radio is connected via USB (essentially plug-n-play). The vehicle is connected to the flight-controller's `TELEM` port, and typically requires no further configuration.

### Vendors

* 3DR Radio \(small\) - [US (915MHz)](https://store.3dr.com/products/915-mhz-telemetry-radio) / [European (433MHz)](https://store.3dr.com/products/433-mhz-telemetry-radio)
* [HK Radio](http://www.hobbyking.com/hobbyking/store/uh_viewitem.asp?idproduct=55559) \(small\)
* [RFD900u](http://rfdesign.com.au/products/rfd900u-modem/) \(small\)
* [RFD900](http://rfdesign.com.au/products/rfd900-modem/) \(long range\)

![SiK Radio](../../assets/hardware/telemetry/sik_radio.jpg)

## Build Instructions

The PX4 toolchain does not install the required 8051 compiler by default.

### Mac OS

Install the toolchain:

```sh
brew install sdcc
```

build the image for the standard SiK Radio / 3DR Radio:

```sh
git clone https://github.com/LorenzMeier/SiK.git
cd SiK/Firmware
make install
```

Upload it to the radio \(**change the serial port name**\):

```
tools/uploader.py --port /dev/tty.usbserial-CHANGETHIS dst/radio~hm_trp.ihx
```

## Configuration Instructions

The radio supports AT commands for configuration. On a Linux system do:

```sh
screen /dev/tty.usbserial-CHANGETHIS 57600 8N1
```

Then start command mode:

> **Note** DO NOT TYPE ANYTHING ONE SECOND BEFORE AND AFTER

```
+++
```

List the current settings:

```
ATI5
```

Then set the net ID, write settings and reboot radio:
```
ATS3=55
AT&W
ATZ
```

> **Note** You might have to power-cycle the radio to connect it to the 2nd radio
