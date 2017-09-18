# Pixhawk 2

The [Pixhawk 2](https://pixhawk.org/modules/pixhawk2) autopilot is a flexible autopilot intended primarily for manufacturers of commercial systems.  It is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv3** open hardware design and runs PX4 on the [NuttX](http://nuttx.org) OS.

<img src="../../images/pixhawk2_cube_hero.jpg" width="400px" />

The controller is designed to be used with a domain-specific carrier board in order to reduce the wiring, improve reliability, and ease of assembly. For example, a carrier board for a commercial inspection vehicle might include connections for a companion computer, while a carrier board for a racer could includes ESCs form the frame of the vehicle.

## Quick Summary

* 32bit STM32F427 Cortex M4 core with FPU
* 168 MHz
* 256 KB RAM
* 2 MB Flash \(fully accessible\)
* 32 bit STM32F103 failsafe co-processor

![](../../assets/pixhawk2.jpg)

* [Pixhawk 2.1 "The Cube"](http://www.proficnc.com/61-system-kits) (ProfiCNC)


## Build instructions

`make px4fmu-v3_default upload`


## Pinouts and Schematics

The board is documented in detailed on the [Pixhawk project](https://pixhawk.org/modules/pixhawk2) website.



