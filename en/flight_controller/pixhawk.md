# Pixhawk 1 Flight Controller

The [Pixhawk 1](https://pixhawk.org/modules/pixhawk) autopilot is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv2** open hardware design. It runs PX4 on the [NuttX](http://nuttx.org) OS (it was also the original standard microcontroller platform for PX4).  

> **Tip** Originally manufactured by 3DR this board is the most successful design so far (in terms of sales). While the board is no longer manufactured by 3DR, you can use the [mRo Pixhawk](../flight_controller/mro_pixhawk.md) as a drop-in replacement.

![Pixhawk Image](../../assets/hardware/hardware-pixhawk.png)

As a CC-BY-SA 3.0 licensed Open Hardware design, all schematics and design files are [available](https://github.com/PX4/Hardware). 


## Quick Summary

* Main System-on-Chip: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
  * CPU: 180 MHz ARM Cortex M4 with single-precision FPU
  * RAM: 256 KB SRAM (L1)
* Failsafe System-on-Chip: STM32F100
  * CPU: 24 MHz ARM Cortex M3
  * RAM: 8 KB SRAM
* Wifi: ESP8266 external
* GPS: U-Blox 7/8 (Hobbyking) / U-Blox 6 (3D Robotics)
* Optical flow: [PX4 Flow unit](http://www.hobbyking.com/hobbyking/store/__66308__HK_Pilot32_Optical_Flow_Kit_With_Sonar.html)


### Connectivity

* 1x I2C
* 1x CAN (2x optional)
* 1x ADC
* 4x UART (2x with flow control)
* 1x Console
* 8x PWM with manual override
* 6x PWM / GPIO / PWM input
* S.BUS / PPM / Spektrum input
* S.BUS output

## Pinouts and Schematics

The board is documented in detailed on the [Pixhawk project](https://pixhawk.org/modules/pixhawk) website.


## Availability

This is no longer available. The [mRo Pixhawk](../flight_controller/mro_pixhawk.md) may be used as a direct replacement. 
