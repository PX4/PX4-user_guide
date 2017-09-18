# Pixhawk 3 Pro

The Pixhawk 3 Pro is based on the FMUv4 hardware design (Pixracer) with some upgrades
and additional features. The board was designed by [Drotek](https://drotek.com) and PX4.

![](../../assets/hardware/hardware-pixhawk3_pro.jpg)

> **Note** The main hardware documentation is here: https://pixhawk.drotek.com/en/


## Quick Summary

  * Microcontroller: **STM32F469**; Flash size is **2MiB**, RAM size is **384KiB**
  * **ICM-20608-G** gyro / accelerometer
  * **MPU-9250** gyro / accelerometer / magnetometer
  * **LIS3MDL** compass
  * Sensors connected via two SPI buses (one high rate and one low-noise bus)
  * Two I2C buses
  * Two CAN buses
  * Voltage / battery readings from two power modules
  * FrSky Inverter
  * 8 Main + 6 AUX PWM outputs (Separate IO chip, PX4IO)
  * microSD (logging)
  * S.BUS / Spektrum / SUMD / PPM input
  * JST GH user-friendly connectors: same connectors and pinouts as Pixracer

## Build Instructions

`make px4fmu-v4pro_default upload`
