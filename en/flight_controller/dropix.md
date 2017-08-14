# DroPix Flight Controller

The Drotek *DroPix autopilot* is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv2** open hardware design. It runs the PX4 Flight Stack on the [NuttX](http://nuttx.org) OS.

The DroPix system includes integrated multithreading, a Unix/Linux-like programming environment, completely new autopilot functions such as Lua scripting of missions and flight behavior, and a custom PX4 driver layer ensuring tight timing across all processes.

![Dropix](../../images/flight_controller/dropix/dropix_flight_controller_hero.jpg)


## Quick Summary

* Advanced 32 bit ARM Cortex® M4 Processor running NuttX RTOS
* 14 PWM/servo outputs (8 with failsafe and manual override, 5 auxiliary, high-power compatible)
* Abundant connectivity options for additional peripherals (UART, I2C, CAN)
* Integrated backup system for in-flight recovery and manual override with dedicated processor and stand-alone power supply
* Backup system integrates mixing, providing consistent autopilot and manual override mixing modes
* Redundant power supply inputs and automatic failover
* External safety button for easy motor activation
* Multicolor LED indicator
* High-power, multi-tone piezo audio indicator
* microSD card for long-time high-rate logging
* Sensors
  * ST Micro L3GD20 3-axis 16-bit gyroscope
  * ST Micro LSM303D 3-axis 14-bit accelerometer / magnetometer
  * Invensense MPU 6000 3-axis accelerometer/gyroscope
  * MEAS MS5611 barometer
* Standard MK style mounting holes 45 mm x 45 mm (M3 holes)
* Dimensions
  * Size: 67*50*6 mm
  * Weight: 15g (without connectors)
  
## Availability

[Dropix Pack](https://drotek.com/shop/en/flight-controllers/494-dropix-flight-controller.html) (drotek.com)


## Key Links

* [DroPix Setup](https://drotek.com/en/documentation/docs-dropix/)

## Wiring Guides

The following diagrams show the Dropix connector information (for more information see the [drotek documentation](https://drotek.com/en/documentation/docs-dropix/)).

<img src="../../images/flight_controller/dropix/dropix_connectors_front.jpg" width="500px" />

<img src="../../images/flight_controller/dropix/dropix_connectors_side_and_back.jpg" width="500px" />



