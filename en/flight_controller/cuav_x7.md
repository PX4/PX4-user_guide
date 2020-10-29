# CUAV  Flight Controller

> **Warning** PX4 does not manufacture this (or any) autopilot.
  Contact the [manufacturer](https://www.cuav.net) for hardware support or compliance issues.

The [X7](http://doc.cuav.net/flight-controller/x7/en/x7.html)<sup>&reg;</sup>  flight controller is a high-performance autopilot. It is an ideal choice for industrial drones and large-scale heavy-duty drones. It is mainly supplied to commercial manufacturers.

![CUAV x7](../../assets/flight_controller/cuav/x7.jpg)

The flight controller adopts a modular design and can be matched with different base plates. You can design a dedicated carrier board for your UAV to improve the integration of commercial systems, reduce wiring, improve system reliability, and enhance your UAV competitiveness, such as integrating airspeed sensors and telemetry in the carrier board , Even companion computers; and CUAV has provided a variety of carrier board for you to choose from.

## Features

* Internal shock absorption
* Modular design, can be DIY carrier board
* Support USB_HS, download logs faster (PX4 not yet supported)
* Support more dshot output
* Support IMU heating, make the sensor work better
* Dedicated uavcan battery port
* 3 sets of IMU sensors
* Car-grade RM3100 compass
* High performance processor

> **Tip** The manufacturer [CUAV Docs](https://doc.cuav.net/x7/en/x7.html) contain detailed information,If this document conflicts with the [CUAV Docs](https://doc.cuav.net/x7/en/x7.html), please follow the description in the [CUAV Docs](https://doc.cuav.net/x7/en/x7.html).

<span></span>
> **Note** This flight controller is [manufacturer supported](../flight_controller/autopilot_manufacturer_supported.md).

## Quick Summary{#quick-Summary}

* Main FMU Processor: STM32H743
* On-board sensors:
  * Accelerometer/Gyroscope: ICM-20689
  * Accelerometer/Gyroscope: ICM-20649
  * Accelerometer/Gyroscope: BMI088
  * Magnetometer: RM3100
  * Barometer: MS5611*2
  
* Interfaces:
   * 14 PWM outputs （12 supports Dshot）
   * Support multiple RC inputs (SBUs / CPPM / DSM)
   * Analogue / PWM RSSI input
   * 2 GPS ports(GPS and UART4 ports)
   * 4 i2c buses(Two i2c dedicated ports)
   * 2 CAN bus ports
   * 2 Power ports(Power A is common adc interface, Power C is uavcan battery interface)
   * 2  ADC intput
   * 1 USB ports 
* Power System:
  * Power: 4.3~5.4V
  * USB Input: 4.75~5.25V
  * Servo Rail Input: 0~36V
* Weight and Dimensions:
  * Weight: 101 g
* Other Characteristics:
  * Operating temperature: -20 ~ 80°c（Measured value）
  * Three imus
  * Supports temperature compensation
  * Internal shock absorption
  
> ** NOTE** When it runs PX4 firmware, only 8 pwm works, the remaining 6 pwm are still being adapted, so it is not compatible with VOLT now.
