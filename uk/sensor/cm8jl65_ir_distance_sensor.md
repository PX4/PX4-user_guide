# Lanbao PSK-CM8JL65-CC5 ІЧ-датчик вимірювання відстані ToF

Датчик відстані ІЧ [Lanbao PSK-CM8JL65-CC5](https://www.seeedstudio.com/PSK-CM8JL65-CC5-Infrared-Distance-Measuring-Sensor-p-4028.html) є дуже малий з діапазоном від 0,17 м до 8 м і роздільною здатністю у міліметрах. Це повинно бути підключено до шини UART/серійного порту.

- Розміри: 38 мм х 18 мм х 7 мм
- Вага: ≤10g

![PSK-CM8JL65-CC5 ToF IR Distance Sensor - Hero image](../../assets/hardware/sensors/cm8jl65/psk_cm8jl65_hero.jpg)

## Налаштування обладнання

PSK-CM8JL65-CC5 може бути підключений до будь-якого не використаного _серійного порту_, наприклад: TELEM2, TELEM3, GPS2 тощо.

Виводи позначені знизу сенсора:

![PSK-CM8JL65-CC5 ToF IR Distance Sensor - Pinout connections](../../assets/hardware/sensors/cm8jl65/psk-cm8jl65-cc5-02.jpg)

## Parameter Setup

[Configure the serial port](../peripherals/serial_configuration.md) on which the lidar will run using [SENS_CM8JL65_CFG](../advanced_config/parameter_reference.md#SENS_CM8JL65_CFG).

::: info

If the configuration parameter is not available in _QGroundControl_ then you may need to [add the driver to the firmware](../peripherals/serial_configuration.md#parameter_not_in_firmware):

```plain
distance_sensor/cm8jl65
```

:::

In order to use the sensor for _collision prevention_ you will further need to set the parameters [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0) and [CP_DIST](../advanced_config/parameter_reference.md#CP_DIST). For more information see: [Collision Prevention](../computer_vision/collision_prevention.md#rangefinder).
