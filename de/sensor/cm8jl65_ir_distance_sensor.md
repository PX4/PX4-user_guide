---
canonicalUrl: https://docs.px4.io/main/de/sensor/cm8jl65_ir_distance_sensor
---

# Lanbao PSK-CM8JL65-CC5 ToF Infrared Distance Measuring Sensor

The [Lanbao PSK-CM8JL65-CC5](https://www.seeedstudio.com/PSK-CM8JL65-CC5-Infrared-Distance-Measuring-Sensor-p-4028.html) is a very small IR distance sensor with a 0.17m-8m range and millimeter resolution. It must be connected to a UART/serial bus.

- Dimensions: 38 mm x 18mm x 7mm
- Weight: ≤10g

![PSK-CM8JL65-CC5 ToF IR Distance Sensor - Hero image](../../assets/hardware/sensors/cm8jl65/psk_cm8jl65_hero.jpg)


## Hardware Setup

PSK-CM8JL65-CC5 can be connected to any unused *serial port*, e.g.: TELEM2, TELEM3, GPS2 etc.

The pinouts are labeled on the bottom of the sensor:

![PSK-CM8JL65-CC5 ToF IR Distance Sensor - Pinout connections](../../assets/hardware/sensors/cm8jl65/psk-cm8jl65-cc5-02.jpg)


## Parameter Setup

[Configure the serial port](../peripherals/serial_configuration.md) on which the lidar will run using [SENS_CM8JL65_CFG](../advanced_config/parameter_reference.md#SENS_CM8JL65_CFG).

:::note
If the configuration parameter is not available in *QGroundControl* then you may need to [add the driver to the firmware](../peripherals/serial_configuration.md#parameter_not_in_firmware):
```
distance_sensor/cm8jl65
```
:::

In order to use the sensor for *collision prevention* you will further need to set the parameters [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0) and [CP_DIST](../advanced_config/parameter_reference.md#CP_DIST). For more information see: [Collision Prevention](../computer_vision/collision_prevention.md#rangefinder).
