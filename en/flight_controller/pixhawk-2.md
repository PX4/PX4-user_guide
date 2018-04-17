# Pixhawk 2 "The Cube"

The [Pixhawk 2](https://pixhawk.org/modules/pixhawk2) autopilot is a flexible autopilot intended for manufacturers of commercial systems and hobbyists alike. It is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv3** open hardware design and runs PX4 on the [NuttX](http://nuttx.org) OS.

<img src="../../assets/flight_controller/pixhawk2_cube_hero.jpg" width="400px" />

The controller is designed to be used with a domain-specific carrier board in order to reduce the wiring, improve reliability, and ease of assembly. For example, a carrier board for a commercial inspection vehicle might include connections for a companion computer, while a carrier board for a racer could includes ESCs form the frame of the vehicle.

The Cube includes vibration isolation on two of the IMU's, with a third fixed IMU as a reference / Backup.

## Quick Summary

* 32bit STM32F427 Cortex M4 core with FPU
* 168 MHz
* 256 KB RAM
* 2 MB Flash \(fully accessible\)
* 32 bit STM32F103 failsafe co-processor


## Purchase

* [Pixhawk 2.1 "The Cube"](http://www.proficnc.com/61-system-kits) (ProfiCNC)

## Build Instructions

`make px4fmu-v3_default upload`

## Pinouts and Schematics

The board is documented in detailed on the [Pixhawk project](https://pixhawk.org/modules/pixhawk2) website.

The datasheet from Hex manufacturing can be found [here](http://www.hex.aero/wp-content/uploads/2016/07/DRS_Pixhawk-2-17th-march-2016.pdf).

## Issues
At time of writing (October 2017) the CAN1 and CAN2 silk screen on the Pixhawk 2.1 is flipped (CAN1 is CAN2 and vice versa). 
