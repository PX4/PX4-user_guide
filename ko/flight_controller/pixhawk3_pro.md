# Pixhawk 3 Pro

The Pixhawk<sup>&reg;</sup> 3 Pro is based on the FMUv4 hardware design (Pixracer) with some upgrades and additional features. The board was designed by [Drotek<sup>&reg;</sup>](https://drotek.com) and PX4.

![](../../assets/hardware/hardware-pixhawk3_pro.jpg)

> **Note** The main hardware documentation is here: https://pixhawk.drotek.com/en/

## Quick Summary

- Microcontroller: **STM32F469**; Flash size is **2MiB**, RAM size is **384KiB**
- **ICM-20608-G** gyro / accelerometer
- **MPU-9250** gyro / accelerometer / magnetometer
- **LIS3MDL** compass
- Sensors connected via two SPI buses (one high rate and one low-noise bus)
- Two I2C buses
- Two CAN buses
- Voltage / battery readings from two power modules
- FrSky<sup>&reg;</sup> Inverter
- 8 Main + 6 AUX PWM outputs (Separate IO chip, PX4IO)
- microSD (logging)
- S.BUS / Spektrum / SUMD / PPM input
- JST GH user-friendly connectors: same connectors and pinouts as Pixracer

## Where to buy

From [Drotek store](https://store.drotek.com/) (EU) :

- [Pixhawk 3 Pro (Pack)](https://store.drotek.com/autopilots/844-pixhawk-3-pro-pack.html)
- [Pixhawk 3 Pro](https://store.drotek.com/autopilots/821-pixhawk-pro-autopilot-8944595120557.html)

From [readymaderc](https://www.readymaderc.com) (USA) :

- [Pixhawk 3 Pro](https://www.readymaderc.com/products/details/pixhawk-3-pro-flight-controller)

## Building Firmware

> **Tip** Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/en/setup/building_px4.html) for this target:

    make px4_fmu-v4pro_default