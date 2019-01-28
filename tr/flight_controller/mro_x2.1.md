# mRo-X2.1 Autopilot

The [mRo-X2.1 autopilot](http://www.mRobotics.io/) is based on the [Pixhawk<sup>&reg;</sup>-project](https://pixhawk.org/) **FMUv2** open hardware design. It runs PX4 on the [NuttX](http://nuttx.org) OS.

![mRo X2.1](../../assets/flight_controller/mro/mro_x2.1.jpg)

## Quick Summary

* Main System-on-Chip: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789) 
  * CPU: STM32F427VIT6 ARM<sup>&reg;</sup> microcontroller - Revision 3
  * IO: STM32F100C8T6 ARM<sup>&reg;</sup> microcontroller
* Sensors: 
  * Invensense<sup>&reg;</sup> MPU9250 9DOF
  * Invensense ICM-20602 6DOF
  * MEAS MS5611 barometer
* Dimensions/Weight 
  * Size: 36mm x 50mm (Can be ordered with vertical, horizontal or no headers installed)
  * Mounting Points: 30.5mm x 30.5mm 3.2mm diameter
  * Weight: 10.9g

The diagram below provides a side-by-side comparison with a Pixhawk 1. The mRo features almost identical hardware and connectivity but has a much smaller footprint. Major differences are updated sensors and Rev 3 FMU.

![Mro Pixhawk 1 vs X2.1 comparison](../../assets/flight_controller/mro/px1_x21.jpg)

## Connectivity

* 2.54mm headers:
* GPS (USART4) with I2C
* CAN Bus
* RC input
* PPM input
* Spektrum input
* RSSI input
* sBus input
* sBus output
* Power input
* Buzzer output
* LED output
* 8 x Servo outputs
* 6 x Aux outputs
* Offboard microUSB connector
* Kill Pin output *(Currently not supported by firmware)*
* AirSpeed Sensor
* USART2 (Telem 1)
* USART3 (Telem 2)
* USART7 (Console)
* USART8 (OSD)

## PX4 BootLoader Issue

By default a mRo X2.1 might come preconfigured for ArduPilot<sup>&reg;</sup> rather than PX4. This can be seen during firmware update when the board is recognized as FMUv2 instead of X2.1.

In this case you must update the BootLoader using [BL_Update_X21.zip](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/BL_Update_X21.zip). If this correction is not carried out your compass direction will be wrong and the secondary IMU will not be detected.

The update steps are:

1. Download and extract [BL_Update_X21.zip](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/BL_Update_X21.zip).
2. Find the folder *BL_Update_X21*. This contains a **bin** file and a subfolder named **/etc** containing an **rc.txt** file
3. Copy these files to your micro SD card's root directory and insert it into the mRO x2.1
4. Power on the mRO x2.1 Wait for it to boot and then reboot 1 time.

## Availability

This product can be ordered at the [mRobotics<sup>&reg;</sup> Store](https://store.mrobotics.io/mRo-X2-1-Rev-2-p/mro-x2.1rv2-mr.htm).

## Wiring Guide

![mRo_X2.1_Wiring](../../assets/flight_controller/mro/mro_x21_wiring.png)

## Building Firmware

> **Tip** Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/en/setup/building_px4.html) for this target:

    make auav_x21_default
    

## Schematics

The board is documented on the mRo hardware repo: [x21_V2_schematic.pdf](https://github.com/mRoboticsIO/Hardware/blob/master/X2.1/Docs/x21_V2_schematic.pdf).