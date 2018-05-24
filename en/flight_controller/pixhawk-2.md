# Cube Flight Controller

The [Cube](https://pixhawk.org/modules/pixhawk2) flight controller (previously known as Pixhawk 2.1) is a flexible autopilot intended primarily for manufacturers of commercial systems. 
It is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv3** open hardware design and runs PX4 on the [NuttX](http://nuttx.org) OS.

<img src="../../assets/flight_controller/cube/pixhawk2_cube_hero.png" width="400px" />

The controller is designed to be used with a domain-specific carrier board in order to reduce the wiring, improve reliability, and ease of assembly. 
For example, a carrier board for a commercial inspection vehicle might include connections for a companion computer, 
while a carrier board for a racer could includes ESCs form the frame of the vehicle.

Cube includes vibration isolation on two of the IMU's, with a third fixed IMU as a reference / Backup.

## Quick Summary

* 32bit STM32F427 Cortex<sup>&reg;</sup> M4 core with FPU
* 168 MHz
* 256 KB RAM
* 2 MB Flash \(fully accessible\)
* 32 bit STM32F103 failsafe co-processor


## Purchase {#stores}

* [The Cube](http://www.proficnc.com/61-system-kits) (ProfiCNC)

## Assembly

* [Cube Wiring Quickstart](../assembly/quick_start_cube.md)


## Build Firmware

`make px4fmu-v3_default upload`

## Pinouts and Schematics

The board is documented in detailed on the [The Cube Project](https://github.com/proficnc/The-Cube) website.

The datasheet from Hex manufacturing can be found [here](http://www.hex.aero/wp-content/uploads/2016/07/DRS_Pixhawk-2-17th-march-2016.pdf).


## Ports

### Top-Side (GPS, TELEM etc)

![Cube Ports - Top (GPS, TELEM etc) and Main/AUX](../../assets/flight_controller/cube/cube_ports_top_main.jpg)

### Debug Ports

![Cube Debug Ports](../../assets/flight_controller/cube/cube_ports_debug.jpg)

### USB/SDCard Ports

![Cube USB/SDCard Ports](../../assets/flight_controller/cube/cube_ports_usb_sdcard.jpg)

## Issues
CAN1 and CAN2 silk screen on the Pixhawk 2.1 are flipped (CAN1 is CAN2 and vice versa). 
