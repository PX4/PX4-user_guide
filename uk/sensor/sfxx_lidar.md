# LightWare SF1X/SF02/LW20 Lidar

LightWare develops a range of light-weight, general purpose, laser altimeters ("Lidar") suitable for mounting on UAVs. Ці інструменти корисні для застосувань, включаючи слідування за рельєфом, точне зависання у повітрі (наприклад, для фотографії), попередження про регуляторні висотні обмеження, антиколізійний датчик тощо.

![LightWare SF11/C Lidar](../../assets/hardware/sensors/lidar_lightware/sf11c_120_m.jpg)

## Підтримувані плати

Наступні моделі підтримуються PX4 та можуть бути підключені до шини I2C або Serial (таблиці нижче показують, яку шину можна використовувати для кожної моделі).

### Доступні

| Model                                                      | Range (m) | Шина                 | Опис                                                                                   |
| ---------------------------------------------------------- | --------- | -------------------- | -------------------------------------------------------------------------------------- |
| [SF11/C](https://lightwarelidar.com/products/sf11-c-100-m) | 100       | Серійна або I2C шина |                                                                                        |
| [LW20/C](https://lightware.co.za/products/lw20-c-100-m)    | 100       | Шина I2C             | Водонепроникний (IP67) з сервоприводом для додатків з детекцією та уникненням перешкод |

### Знято з виробництва

Наступні моделі більше не доступні від виробника.

| Model                                                                                              | Range | Bus                                                                                                     |
| -------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------- |
| [SF02](http://documents.lightware.co.za/SF02%20-%20Laser%20Rangefinder%20Manual%20-%20Rev%208.pdf) | 50    | Serial                                                                                                  |
| [SF10/A](http://documents.lightware.co.za/SF10%20-%20Laser%20Altimeter%20Manual%20-%20Rev%206.pdf) | 25    | Serial or I2C                                                                                           |
| [SF10/B](http://documents.lightware.co.za/SF10%20-%20Laser%20Altimeter%20Manual%20-%20Rev%206.pdf) | 50    | Serial or I2C                                                                                           |
| SF10/C                                                                                             | 100m  | Serial or I2C                                                                                           |
| LW20/B                                                                                             | 50    | I2C шина       | Водонепроникний (IP67) з сервоприводом для додатків з детекцією та уникненням перешкод |

## Налаштування I2C

Перевірте таблиці вище, щоб підтвердити, які моделі можна підключити до порту I2C.

### Конфігурація Lidar

Цей апаратне забезпечення не поставляється з підтримкою сумісності з Pixhawk I2C за замовчуванням. Щоб увімкнути підтримку, вам потрібно завантажити [LightWare Studio](https://lightwarelidar.com/pages/lightware-studio) та перейти до **Параметри > Зв'язок** та встановити позначку **Режим сумісності I2C (Pixhawk)**

![LightWare SF11/C Lidar-I2C Config](../../assets/hardware/sensors/lidar_lightware/lightware_studio_i2c_config.jpg)

<a id="i2c_hardware_setup"></a>

### Апаратне забезпечення

Підключіть Лідар до порту автопілота I2C, як показано нижче (у цьому випадку для [Pixhawk 1](../flight_controller/mro_pixhawk.md)).

![SF1XX LIDAR to I2C connection](../../assets/hardware/sensors/lidar_lightware/sf1xx_i2c.jpg)

:::note
Деякі старі версії не можуть бути використані з PX4. Specifically they may be miss-configured to have an I2C address equal to `0x55`, which conflicts with `rgbled` module. On Linux systems you may be able to determine the address using [i2cdetect](https://linux.die.net/man/8/i2cdetect). If the I2C address is equal to `0x66` the sensor can be used with PX4.
:::

<a id="i2c_parameter_setup"></a>

### Parameter Setup

Set the [SENS_EN_SF1XX](../advanced_config/parameter_reference.md#SENS_EN_SF1XX) parameter to match the rangefinder model and then reboot.

## Serial Setup

<a id="serial_hardware_setup"></a>

### Hardware

The lidar can be connected to any unused _serial port_ (UART), e.g.: TELEM2, TELEM3, GPS2 etc.

<!-- Would be good to show serial setup! -->

<a id="serial_parameter_setup"></a>

### Parameter Setup

[Configure the serial port](../peripherals/serial_configuration.md) on which the lidar will run using [SENS_SF0X_CFG](../advanced_config/parameter_reference.md#SENS_SF0X_CFG). There is no need to set the baud rate for the port, as this is configured by the driver.

::: info If the configuration parameter is not available in _QGroundControl_ then you may need to [add the driver to the firmware](../peripherals/serial_configuration.md#parameter_not_in_firmware).
:::

Then set the [SENS_EN_SF0X](../advanced_config/parameter_reference.md#SENS_EN_SF0X) parameter to match the rangefinder model and reboot.

## Further Information

- [Modules Reference: Distance Sensor (Driver) : lightware_laser_i2c](../modules/modules_driver_distance_sensor.md#lightware-laser-i2c)
- [Modules Reference: Distance Sensor (Driver) : lightware_laser_serial](../modules/modules_driver_distance_sensor.md#lightware-laser-serial)
