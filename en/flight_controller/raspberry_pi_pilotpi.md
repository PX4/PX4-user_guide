# RPi PilotPi Shield

> **Warning** PX4 support for this flight controller is [experimental](../flight_controller/autopilot_experimental.md).

The *PilotPi* shield is a fully functional solution to run PX4 autopilot directly on Raspberry Pi.
It is 

![PilotPi over RPi 4B](../../assets/hardware/hardware-pilotpi4b.jpg)

## Quick Summary

* Supported RPi boards:
  * Raspberry Pi 2B/3B/3B+/4B
* Accelerometer / Gyro:
  * ICM42688P
* Magnetometer:
  * IST8310
* Barometer:
  * MS5611
* PWM:
  * PCA9685
* ADC:
  * ADS1115
* Power:
  * 3~6S battery with built-in voltage sensing.
  * Power the Pi through USB cable
* Availability: *prepare for shipping*


## Connectivity

Shield itself provides:
* 16x PWM outputing channels
* GPS connector
* Telemetry connector
* External I2C bus connector (Note: conflicts with CSI camera)
* RC input port (SBUS)
* 2\*7 2.54mm unused GPIO connector

Direct access to RPi:
* 4x USB connector
* CSI connector(Note: conflicts with external I2C bus)

## Recommended Wiring

![PilotPi wiring](../../assets/hardware/snapdragon/pilotpi_wiring.jpg)

## Pinouts

> **Warning** It still uses old XH1.25MM connector

### Connectors

## Dimensions

![Snapdragon Dimensions](../../assets/hardware/hardware-snapdragon-dimensions.png)
