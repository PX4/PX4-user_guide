# AUAV-X2 Autopilot (Discontinued)

> **Warning** This board has been discontinued and is no longer commercially available.

The [AUAV](http://www.auav.com/) *AUAV-X2 autopilot* is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv2** open hardware design. It runs PX4 on the [NuttX](http://nuttx.org) OS.

![AUAVX2_case2](../../images/auavx2_case2.jpg)


## Quick Summary

* Main System-on-Chip: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
  * CPU: STM32F427VIT6 ARM microcontroller - Revision 3
  * IO: STM32F100C8T6 ARM microcontroller
* Sensors:
  * Invensense MPU9250 9DOF
  * Invensense ICM-20608 6DOF
  * MEAS MS5611 barometer
* Dimensions/Weight
  * Size: 36mm x 50mm
  * Mounting Points: 30.5mm x 30.5mm 3.2mm diameter
  * Weight: 10.9g
* Power OR-ing schematic with reverse voltage protection. 5V power module is required!

## Connectivity

* 2.54mm headers:
* GPS (USART4)
* i2c
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
* USART7 (Console)
* USART8 (OSD)

## Availability

No longer in production. Successor is the [mRo X2.1](mRo-X2.1.md), mRobotics is the new 
Distributor for the AUAV Products since August 2017.

## Key Links

* [User Manual](http://arsovtech.com/wp-content/uploads/2015/08/AUAV-X2-user-manual-EN.pdf)
* [DIY Drones Post](http://diydrones.com/profiles/blogs/introducing-the-auav-x2-1-flight-controller)


## Wiring Guide

![AUAV-X2-basic-setup 3](../../images/auav_x2_basic_setup_3.png)

![AUAV-X2-basic-setup 2](../../images/auav_x2_basic_setup_2.jpg)

![AUAV-X2-basic-setup 1](../../images/auav_x2_basic_setup_1.png)

![AUAV-X2-airspeed-setup 3](../../images/auav_x2_airspeed_setup_3.png)



## Schematics

The board is documented on the [Pixhawk project](https://pixhawk.org/modules/pixhawk) website.
