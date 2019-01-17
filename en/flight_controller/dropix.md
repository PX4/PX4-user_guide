# DroPix Flight Controller

The Drotek<sup>&reg;</sup> *DroPix autopilot* is based on the [Pixhawk<sup>&reg;</sup>-project](https://pixhawk.org/) **FMUv2** open hardware design. It runs the PX4 Flight Stack on the [NuttX](http://nuttx.org) OS.

The DroPix system includes integrated multithreading, a Unix/Linux-like programming environment, completely new autopilot functions such as Lua scripting of missions and flight behavior, and a custom PX4 driver layer ensuring tight timing across all processes.

![Dropix](../../assets/flight_controller/dropix/dropix_flight_controller_hero.jpg)


## Key Features

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
  * Invensense<sup>&reg;</sup> MPU 6000 3-axis accelerometer/gyroscope
  * MEAS MS5611 barometer
* Standard MK style mounting holes 45 mm x 45 mm (M3 holes)
* Dimensions
  * Size: 67*50*6 mm
  * Weight: 15g (without connectors)
  
## Where to buy

[DroPix Autopilot OEM Pack](https://store.drotek.com/autopilots/889-dropix-flight-controller.html)

[DroPix Autopilot Only (No connectors / No case)](https://store.drotek.com/autopilots/888-706-dropix-flight-controller.html#/148-dropix_option-without_connectors_without_case)

[DroPix Autopilot spare case](https://store.drotek.com/accessories/672-dropix-case-8944595425041.html)

## Documentation

[DroPix User's Guide](https://drotek.gitbooks.io/dropix-user-guide/content/)

## Wiring Guides

The following diagrams show the Dropix connector information (for more information see the [drotek documentation](https://drotek.gitbooks.io/dropix-user-guide/content/)).

<img src="../../assets/flight_controller/dropix/dropix_connectors_front.jpg" width="500px" />

<img src="../../assets/flight_controller/dropix/dropix_connectors_side_and_back.jpg" width="500px" />


## Building Firmware

> **Tip** Most users will not need to build this firmware!
  It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/en/setup/building_px4.html) for this target:
```
make px4_fmu-v2_default
```
