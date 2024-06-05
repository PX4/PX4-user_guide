# GPS та компас

Він також підтримує [Real Time Kinematic (RTK)](../gps_compass/rtk_gps.md) і **Post-Processing Kinematic (PPK)** GPS-приймачі, які розширюють можливості GPS-систем до сантиметрової точності. PX4 підтримує глобальні навігаційні супутникові системи (GNSS) (включаючи GPS, ГЛОНАСС, Galileo, BeiDou, QZSS і SBAS) за допомогою приймачів, які підтримують зв'язок через протоколи u-blox, MTK Ashtech або Emlid, або через UAVCAN.

Up to two GPS modules can be connected using either a UART or the CAN bus:

- A primary [GNSS module](../gps_compass/#supported-gnss) that usually also includes a [compass/magnetometer](../gps_compass/magnetometer.md), [buzzer](../getting_started/px4_basic_concepts.md#buzzer), [safety switch](../getting_started/px4_basic_concepts.md#safety-switch), and [UI LED](../getting_started/led_meanings.md#ui-led).
- An optional secondary GNSS/compass module that is used as a fallback. This may include a buzzer, safety switch, LEDs, but these are not used by PX4.

![GPS + Компас](../../assets/hardware/gps/gps_compass.jpg)

:::info PX4 також підтримує [GPS приймачі реального часу (RTK)](../gps_compass/rtk_gps.md) і **Пост-обробку кінематичну (PPK)** GNSS, які розширюють GNSS системи до точності сантиметрового рівня.
:::


## Підтримка GNSS та/або компаса

PX4 повинен працювати з будь-яким пристроєм, що підтримує зв'язок через протоколи u-blox, MTK Ashtech або Emlid, або через UAVCAN.

Ця таблиця містить не-RTK GNSS-пристрої (більшість з яких також мають компас). Вони були протестовані командою розробників PX4 або користуються популярністю у спільноті PX4.

| Пристрій                                                                  |     GPS     |          Компас           | [CAN](../dronecan/index.md) | Buzzer / SafeSw / LED | Примітки                       |
|:------------------------------------------------------------------------- |:-----------:|:-------------------------:|:---------------------------:|:---------------------:|:------------------------------ |
| [ARK GPS](https://arkelectron.com/product/ark-gps/)                       |     M9N     |         ICM42688p         |           &check;           |        &check;        | + Baro, IMU                    |
| [Avionics Anonymous UAVCAN GNSS/Mag][avionics_anon_can_gnss]              |   SAM-M8Q   |         MMC5983MA         |           &check;           |        &cross;        |                                |
| [CUAV NEO 3 GPS](../gps_compass/gps_cuav_neo_3.md)                        |     M9N     |          IST8310          |                             |        &check;        |                                |
| [CUAV NEO 3 Pro GPS](../gps_compass/gps_cuav_neo_3pro.md)                 |     M9N     |          RM3100           |           &check;           |        &check;        | + Baro                         |
| [CUAV NEO 3X GPS](../gps_compass/gps_cuav_neo_3x.md)                      |     M9N     |          RM3100           |           &check;           | &cross;&check;&check; | + Baro.                        |
| [CubePilot Here2 GNSS GPS (M8N)](../gps_compass/gps_hex_here2.md)         |     M8N     |         ICM20948          |                             |        &check;        | Superseded by HERE3            |
| [Emlid Reach M+](https://emlid.com/reach/)                                |   &check;   |          &cross;          |                             |        &cross;        | Підтримує PPK. Очікується RTK. |
| [Holybro DroneCAN M8N GPS](../dronecan/holybro_m8n_gps.md)                |     M8N     |          BMM150           |           &check;           |        &cross;        | + Baro                         |
| [Holybro Micro M8N GPS](https://holybro.com/products/micro-m8n-gps)       |     M8N     |          IST8310          |                             |        &cross;        |                                |
| [Holybro Nano Ublox M8 5883 GPS][hb_nano_m8_5883]                         |  UBX-M8030  |          QMC5883          |                             |        &cross;        |                                |
| [Holybro M8N GPS](../gps_compass/gps_holybro_m8n_m9n.md)                  |     M8N     |          IST8310          |                             |        &check;        |                                |
| [Holybro M9N GPS](../gps_compass/gps_holybro_m8n_m9n.md)                  |     M9N     |          IST8310          |                             |        &check;        |                                |
| [Holybro DroneCAN M9N GPS](https://holybro.com/products/dronecan-m9n-gps) |     M9N     |          BMM150           |           &check;           |        &check;        |                                |
| [Hobbyking u-blox Neo-M8N GPS with Compass][hk_ublox_neo_8mn]             |     M8N     |          &check;          |                             |        &cross;        |                                |
| [LOCOSYS Hawk A1 GNSS receiver](../gps_compass/gps_locosys_hawk_a1.md)    | MC-1612-V2b |       опціональний        |                             | &cross;&cross;&check; |                                |
| [LOCOSYS Hawk R1](../gps_compass/rtk_gps_locosys_r1.md)                   | MC-1612-V2b |                           |                             | &cross;&cross;&check; |                                |
| [LOCOSYS Hawk R2](../gps_compass/rtk_gps_locosys_r2.md)                   | MC-1612-V2b |          IST8310          |                             | &cross;&cross;&check; |                                |
| [mRo GPS u-blox Neo-M8N Dual Compass][mro_neo8mn_dual_mag]                |     M8N     |     LIS3MDL, IST8308      |                             |        &cross;        |                                |
| [Sky-Drones SmartAP GPS](../gps_compass/gps_smartap.md)                   |     M8N     | HMC5983, IST8310, LIS3MDL |                             |        &check;        | + Baro                         |
| [Zubax GNSS 2](https://zubax.com/products/gnss_2)                         |   MAX-M8Q   |          LIS3MDL          |                             |        &cross;        | + Baro                         |

<!-- links to improve layout of table for editing -->

Примітки:

- &check; або конкретний номер артикулу вказує на те, що функція підтримується, тоді як &cross; або пусте поле вказує на те, що функція не підтримується. "?" означає "невідомо".
- Там, де це можливо і доречно, використовується назва деталі (наприклад, &check; у колонці GPS вказує на наявність GPS-модуля, але деталь невідома).
- The list may omit some discontinued hardware that is still supported (check earlier versions for info about discontinued modules). Removed items include:
  - _Here_ GPS
  - Drotek DP0804

## Кріплення GPS/компасу

PX4 можна використовувати з наступними частинами компаса (магнітометрами): Bosch BMM 150 MEMS (через шину I2C), HMC5883 / HMC5983 (I2C або SPI), IST8310 (I2C) і LIS3MDL (I2C або SPI). Можна підключити до 4 внутрішніх або зовнішніх магнітометрів, хоча тільки один з них буде використовуватися як джерело курсу.

[Mounting the Compass](../assembly/mount_gps_compass.md) explains how to mount a GNSS module that has a compass.

## Налаштування обладнання

The hardware setup depends on the flight controller, the GNSS module, and the connection bus it supports - UART/I2C or CAN.

### Pixhawk Standard Connectors

Connecting GNSS/Compass modules is easiest when using a flight controller that supports the [Pixhawk connector standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf). All flight controllers that follow this standard, including most [Pixhawk Standard](../flight_controller/autopilot_pixhawk_standard.md) controllers (and many others) use the same port connectors and wiring for connecting GNSS modules. Because of this standardization, many popular GNSS/Compass modules plug directly into the flight controller "out of the box".

If you're using GNSS/Compass modules that connect via generic UARTs and serial protocols like I2C:

- The primary GNSS/Compass module should be connected to the 10-pin port labelled `GPS1`, `GPS&SAFETY`, or `GPS` (this is port described as "Full GPS + Safety Switch Port" in the connector standard). The GPS should incorporate a [buzzer](../getting_started/px4_basic_concepts.md#buzzer), [safety switch](../getting_started/px4_basic_concepts.md#safety-switch), and [UI LED](../getting_started/led_meanings.md#ui-led).
- An (optional) secondary module can be connected to the 6-pin `GPS2` port, if present (this is "Basic GPS Port" in the standard).
- The ports are generally plug-n-play for u-blox modules (only).

::: info The ports include a UART for the GNSS and an I2C port for connecting the Compass. The "Full GPS + Safety Switch Port" includes additional I2C connectors for LEDs, buzzer and safety switch. There is nothing to stop you from connecting the GPS pins to any other free UART as a GNSS port, and the compass or buzzer to an I2C port. However if you do this then you will need to [configure the ports](../peripherals/serial_configuration.md).
:::

For [DroneCAN](../dronecan/index.md#supported-hardware) GNSS/compass modules:

- DroneCan GPS modules are connected to CAN-bus ports, which are 4-pin ports labeled `CAN1` or `CAN2`.

### Other Flight Controllers/GNSS Modules

If you're working with a flight controller and GNSS module combination that does not comply with the Pixhawk connector standard then you will need to pay particular attention to the connector pinouts on the flight controller and the module. You may need to rewire/solder the connectors.

:::warning
Some flight controllers use ports that are software-compatible but not connector compatible (even if they use the same connector!) because they use different pin orderings.
:::

The pinouts for the connector standard are documented in the standard. Pinouts for other controllers and the GNSS modules should be included in their manufacturer documentation.

## GNSS конфігурація

The default configuration for GPS module connected via the GPS serial port is provided below. Додаткова конфігурація для конкретного пристрою може бути надана в PX4 або в документації виробника пристрою (наприклад, [Trimble MB-Two > Конфігурація](../gps_compass/rtk_gps_trimble_mb_two.md#configuration)).

### Primary GPS Configuration (UART)

Primary GPS configuration on Pixhawk is handled transparently for U-Blox GPS modules — simply connect the GPS module to the port labeled `GPS1`, `GPS&SAFETY`, or `GPS` (if there is only one GPS port), and everything should work.

The default [Serial Port Configuration](../peripherals/serial_configuration.md#default_port_mapping) configures `GPS1` as a GPS port using [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), sets the protocol to `u-blox` with [GPS_1_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL), and a baud rate of `0: Auto` with [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD).

For GPS types like Trimble, Emlid, MTK, you will need to change the `GPS_1_PROTOCOL` appropriately. For _Trimble MB-Two_ you will also need to modify `SER_GPS1_BAUD` to set the rate to 115200 baud.

<a id="dual_gps"></a>

### Secondary GPS Configuration (UART)

To use a secondary GPS, you will generally attach it to the port named `GPS2`, if present, and otherwise attach it to any free UART port. The port may be pre-configured, but unlike the primary port, this is not guaranteed.

To ensure the port is set up correctly perform a [Serial Port Configuration](../peripherals/serial_configuration.md) to assign [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to the selected port.

The following steps show how to configure a secondary GPS on the `GPS 2` port in _QGroundControl_:

1. [Find and set](../advanced_config/parameters.md) the parameter [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to **GPS 2**.

   - Відкрийте *QGroundControl* і перейдіть до розділу **Vehicle Setup > Parameters**.
   - Select the **GPS** tab, then open the [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) parameter and select `GPS 2` from the dropdown list.

     ![Приклад серії QGC](../../assets/peripherals/qgc_serial_config_example.png)

1. Перезавантажте апарат, щоб побачити інші параметри.
1. Select the **Serial** tab, and open the [SER_GPS2_BAUD](../advanced_config/parameter_reference.md#SER_GPS2_BAUD) parameter (`GPS 2` port baud rate): set it to _Auto_ (or 115200 for the Trimble).

   ![Приклад послідовної швидкості передачі QGC](../../assets/peripherals/qgc_serial_baudrate_example.png)

Після налаштування другого GPS-порту:

1. Налаштуйте обчислювач ECL/EKF2, щоб об'єднати дані з обох GPS-систем. Докладні інструкції див. тут:[Using the ECL EKF > Dual Receivers](../advanced_config/tuning_the_ecl_ekf.md#dual-receivers).

### DroneCAN GNSS Configuration

[DroneCAN](../dronecan/index.md#supported-hardware) GNSS configuration is covered in the linked document (and in the documentation for specific modules).

### Налаштування GPS як Джерело розділення/Курсування

GPS може бути використано як джерело для об'єднання крену при використанні модулів, де вихід крену підтримується пристроєм. Це задокументовано в [RTK GPS > Налаштування GPS як джерела курсу / напрямку](../gps_compass/rtk_gps.md#configuring-gps-as-yaw-heading-source).

## Конфігурація компасу

Калібрування компаса для включеної частини компасу описано: [Конфігурація компаса](../config/compass.md).

## Інформація про розробника

- GPS/RTK-GPS
  - [RTK-GPS](../advanced/rtk_gps.md)
  - [GPS driver](../modules/modules_driver.md#gps)
  - [Приклад DroneCAN](../dronecan/index.md)
- Компас
  - [Вихідний код драйверів](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/magnetometer) (Компаси)

[avionics_anon_can_gnss]: https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/
[hk_ublox_neo_8mn]: https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html
[mro_neo8mn_dual_mag]: https://store.mrobotics.io/product-p/m10034-8308.htm
[hb_nano_m8_5883]: https://holybro.com/products/nano-m8-5883-gps-module
