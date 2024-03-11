# GPS та компас

PX4 підтримує глобальні навігаційні супутникові системи (GNSS) (включаючи GPS, ГЛОНАСС, Galileo, BeiDou, QZSS і SBAS) за допомогою приймачів, які підтримують зв'язок через протоколи u-blox, MTK Ashtech або Emlid, або через UAVCAN. Він також підтримує [Real Time Kinematic (RTK)](../gps_compass/rtk_gps.md) і **Post-Processing Kinematic (PPK)** GPS-приймачі, які розширюють можливості GPS-систем до сантиметрової точності.

PX4 можна використовувати з наступними частинами компаса (магнітометрами): Bosch BMM 150 MEMS (через шину I2C), HMC5883 / HMC5983 (I2C або SPI), IST8310 (I2C) і LIS3MDL (I2C або SPI). Можна підключити до 4 внутрішніх або зовнішніх магнітометрів, хоча тільки один з них буде використовуватися як джерело курсу.

Система автоматично вибирає найкращий з доступних компасів на основі їхнього _пріоритету_ (зовнішні магнітометри мають вищий пріоритет, ніж внутрішні магнітометри). Якщо основний компас виходить з ладу в польоті, він перемикається на наступний. Якщо він вийде з ладу до вильоту, в приведенні в стан готовності буде відмовлено.

![GPS + Compass](../../assets/hardware/gps/gps_compass.jpg)

:::tip
При використанні [контролерів польоту серії Pixhawk](../flight_controller/pixhawk_series.md) ми рекомендуємо використовувати *комбінований GPS + компас*, встановлений якомога далі від ліній живлення двигуна/ESC - зазвичай на підставці або крилі (для фіксованого крила). Внутрішній компас *може* бути корисним на великих апаратах (наприклад, VTOL), де можна зменшити електромагнітні перешкоди, встановивши Pixhawk на великій відстані від джерел живлення. На невеликих апаратах майже завжди потрібен зовнішній компас.
:::

## Підтримка GNSS та/або компаса

PX4 повинен працювати з будь-яким пристроєм, що підтримує зв'язок через протоколи u-blox, MTK Ashtech або Emlid, або через UAVCAN.

### GNSS та компас

Цей список містить GNSS-пристрої (більшість з яких також мають компас). Вони були протестовані командою розробників PX4 або користуються популярністю у спільноті PX4.

| Пристрій                                                                                                                                                                                                                                    |         GPS          |          Компас           | [RTK](../gps_compass/rtk_gps.md) | [GPS Yaw Output](#configuring-gps-as-yaw-heading-source) | [Dual F9P GPS Heading](../gps_compass/u-blox_f9p_heading.md) |   PPK   |
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------------:|:-------------------------:|:--------------------------------:|:--------------------------------------------------------:|:------------------------------------------------------------:|:-------:|
| [ARK GPS](https://arkelectron.com/product/ark-gps/)                                                                                                                                                                                         |         M9N          |         ICM42688p         |                                  |                                                          |                                                              |         |
| [ARK RTK GPS](https://arkelectron.com/product/ark-rtk-gps/)                                                                                                                                                                                 |         F9P          |         ICM42688p         |             &check;              |                                                          |                           &check;                            |         |
| [Avionics Anonymous UAVCAN GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/)                                                                                                                            |       SAM-M8Q        |         MMC5983MA         |                                  |                                                          |                                                              |         |
| [CUAV NEO 3 GPS](../gps_compass/gps_cuav_neo_3.md)                                                                                                                                                                                          |         M9N          |          IST8310          |                                  |                                                          |                                                              |         |
| [CUAV NEO 3 Pro GPS](../gps_compass/gps_cuav_neo_3pro.md)                                                                                                                                                                                   |         M9N          |          RM3100           |                                  |                                                          |                                                              |         |
| [CUAV NEO 3X GPS](../gps_compass/gps_cuav_neo_3x.md)                                                                                                                                                                                        |         M9N          |          RM3100           |                                  |                                                          |                                                              |         |
| [CUAV C-RTK GPS](../gps_compass/rtk_gps_cuav_c-rtk.md)                                                                                                                                                                                      |       M8P/M8N        |          &check;          |             &check;              |                                                          |                                                              |         |
| [CUAV C-RTK 9Ps GPS](../gps_compass/rtk_gps_cuav_c-rtk-9ps.md)                                                                                                                                                                              |         F9P          |          RM3100           |             &check;              |                                                          |                           &check;                            |         |
| [CUAV C-RTK2 PPK/RTK GNSS](../gps_compass/rtk_gps_cuav_c-rtk.md)                                                                                                                                                                            |         F9P          |          RM3100           |             &check;              |                                                          |                                                              | &check; |
| [CubePilot Here2 GNSS GPS (M8N)](../gps_compass/gps_hex_here2.md)                                                                                                                                                                           |         M8N          |         ICM20948          |                                  |                                                          |                                                              |         |
| [CubePilot Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md)                                                                                                                                                                           |         M8P          |          HMC5983          |             &check;              |                                                          |                                                              |         |
| [CubePilot Here3 CAN GNSS GPS (M8N)](https://www.cubepilot.org/#/here/here3)                                                                                                                                                                |         M8P          |         ICM20948          |             &check;              |                                                          |                                                              |         |
| [Drotek DP0804](https://store-drotek.com/920-DP0804.html) (і інші [Drotek u-blox GPS/Compasses](https://store-drotek.com/index.php?controller=search&s=ublox+compass))                                                                      |         M9N          |          LIS3MDL          |                                  |                                                          |                                                              |         |
| [Drotek SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-sirius-rtk-gnss-rover-f9p.html)                                                                                                                                           |         F9P          |          RM3100           |             &check;              |                                                          |                           &check;                            |         |
| [Emlid Reach M+](https://emlid.com/reach/) - PX4 підтримує лише "звичайний" GPS з цим модулем. Підтримка RTK очікується найближчим часом.                                                                                                   |       &check;        |          &cross;          |                                  |                                                          |                                                              | &check; |
| [Femtones MINI2 Receiver](../gps_compass/rtk_gps_fem_mini2.md)                                                                                                                                                                              |     FB672, FB6A0     |          &check;          |             &check;              |                                                          |                                                              |         |
| [Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md)                                                                                                                                                                                        |         F9P          |          IST8310          |             &check;              |                                                          |                                                              |         |
| [Holybro DroneCAN M8N GPS](../dronecan/holybro_m8n_gps.md)                                                                                                                                                                                  |         M8N          |          BMM150           |                                  |                                                          |                                                              |         |
| [Holybro Micro M8N GPS](https://holybro.com/products/micro-m8n-gps)                                                                                                                                                                         |         M8N          |          IST8310          |                                  |                                                          |                                                              |         |
| [Holybro Nano Ublox M8 5883 GPS](https://holybro.com/products/nano-m8-5883-gps-module)                                                                                                                                                      |      UBX-M8030       |          QMC5883          |                                  |                                                          |                                                              |         |
| [Holybro M8N GPS](../gps_compass/gps_holybro_m8n_m9n.md)                                                                                                                                                                                    |         M8N          |          IST8310          |                                  |                                                          |                                                              |         |
| [Holybro M9N GPS](../gps_compass/gps_holybro_m8n_m9n.md)                                                                                                                                                                                    |         M9N          |          IST8310          |                                  |                                                          |                                                              |         |
| [Holybro DroneCAN M9N GPS](https://holybro.com/products/dronecan-m9n-gps)                                                                                                                                                                   |         M9N          |          BMM150           |                                  |                                                          |                                                              |         |
| [Holybro H-RTK F9P Ultralight](https://holybro.com/products/h-rtk-f9p-ultralight)                                                                                                                                                           |         F9P          |          IST8310          |             &check;              |                                                          |                           &check;                            |         |
| [Holybro H-RTK F9P Helical or Base](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)                                                                                                                                                            |         F9P          |          IST8310          |             &check;              |                                                          |                           &check;                            |         |
| [Holybro DroneCAN H-RTK F9P Helical](https://holybro.com/products/dronecan-h-rtk-f9p-helical)                                                                                                                                               |         F9P          |          BMM150           |             &check;              |                                                          |                           &check;                            |         |
| [Holybro H-RTK F9P Rover Lite](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)                                                                                                                                                                 |         F9P          |          IST8310          |             &check;              |                                                          |                                                              |         |
| [Holybro DroneCAN H-RTK F9P Rover](https://holybro.com/products/dronecan-h-rtk-f9p-rover)                                                                                                                                                   |         F9P          |          BMM150           |             &check;              |                                                          |                           &check;                            |         |
| [Holybro H-RTK M8P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md)                                                                                                                                                                       |         M8P          |          IST8310          |             &check;              |                                                          |                                                              |         |
| [Holybro H-RTK Unicore UM982 GPS](../gps_compass/rtk_gps_holybro_unicore_um982.md)                                                                                                                                                          |        UM982         |          IST8310          |             &check;              |                         &check;                          |                                                              |         |
| [Hobbyking u-blox Neo-M8N GPS with Compass](https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html?gclid=Cj0KCQjwqM3VBRCwARIsAKcekb3ojv1ZhLz1-GuvCsUuGT8ZZuw8meMIV_I6pgUCj6DJRzHBY9OApekaAgI5EALw_wcB&gclsrc=aw.ds&___store=en_us) |         M8N          |          &check;          |                                  |                                                          |                                                              |         |
| [LOCOSYS Hawk A1 GNSS receiver](../gps_compass/gps_locosys_hawk_a1.md)                                                                                                                                                                      |     MC-1612-V2b      |       опціональний        |             &cross;              |                                                          |                                                              |         |
| [LOCOSYS Hawk R1](../gps_compass/rtk_gps_locosys_r1.md)                                                                                                                                                                                     |     MC-1612-V2b      |                           |             &cross;              |                                                          |                                                              |         |
| [LOCOSYS Hawk R2](../gps_compass/rtk_gps_locosys_r2.md)                                                                                                                                                                                     |     MC-1612-V2b      |          IST8310          |             &cross;              |                                                          |                                                              |         |
| [mRo GPS u-blox Neo-M8N Dual Compass](https://store.mrobotics.io/product-p/m10034-8308.htm)                                                                                                                                                 |         M8N          |     LIS3MDL, IST8308      |                                  |                                                          |                                                              |         |
| [mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/m10020d.htm)                                                                                                                                                         |         F9P          |          &cross;          |             &check;              |                                                          |                           &check;                            |         |
| [Septentrio AsteRx-RIB](../gps_compass/septentrio_asterx-rib.md)                                                                                                                                                                            |        AsteRx        |          &check;          |             &check;              |                         &check;                          |               Septentrio dual antenna heading                | &check; |
| [Septentrio mosaic-go](../gps_compass/septentrio_mosaic-go.md)                                                                                                                                                                              | mosaic X5 / mosaic H |          &check;          |             &check;              |                         &check;                          |               Septentrio dual antenna heading                | &check; |
| [Sky-Drones SmartAP GPS](../gps_compass/gps_smartap.md)                                                                                                                                                                                     |         M8N          | HMC5983, IST8310, LIS3MDL |                                  |                                                          |                                                              |         |
| [SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136)                                                                                                                                                                |         F9P          |          &cross;          |             &check;              |                                                          |                           &check;                            |         |
| [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)                                                                                                                                                                                  |         F9P          |          &cross;          |             &check;              |                         &check;                          |                                                              |         |
| [Zubax GNSS 2](https://zubax.com/products/gnss_2)                                                                                                                                                                                           |       MAX-M8Q        |          LIS3MDL          |                                  |                                                          |                                                              |         |

Примітки:

- &check; або конкретний номер артикулу вказує на те, що функція підтримується, тоді як &cross; або пусте поле вказує на те, що функція не підтримується. "?" означає "невідомо".
- Там, де це можливо і доречно, використовується назва деталі (наприклад, &check; у колонці GPS вказує на наявність GPS-модуля, але деталь невідома).
- [Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/) and [Holybro DroneCAN RM3100 Compass/Magnetometer](https://holybro.com/collections/gps-rtk-systems/products/dronecan-rm3100-compass) - компас (не GPS).
- Деякі RTK-модулі можна використовувати лише в певній ролі (база або ровер), тоді як інші можна використовувати як взаємозамінні.
- У списку може бути відсутнє деяке зняте з виробництва обладнання, яке все ще підтримується. Наприклад, [CubePilot Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md) більше не випускається і може бути вилучений зі списку у наступному релізі. Оригінальне *Тут* вже видалено. Перевірте попередні версії, якщо тут не згадано модуль, який перестали випускати.

### Компас/Магнітометр (тільки)

Цей список містить компаси (магнітометри) без GNSS.

| Пристрій                                                                                                         | Компас | DroneCan |
|:---------------------------------------------------------------------------------------------------------------- |:------:|:--------:|
| [Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/) |   ?    |          |
| [Holybro DroneCAN RM3100 Compass/Magnetometer](https://holybro.com/products/dronecan-rm3100-compass)             | RM3100 | &check;  |

Примітка:

- &check; або конкретний номер артикулу вказує на те, що функція підтримується, тоді як &cross; або пусте поле вказує на те, що функція не підтримується. "?" означає "невідомо".

## Налаштування обладнання

Інструкції з підключення GPS (і компаса, якщо він є) зазвичай надаються виробником (принаймні для більш поширеного [Автопілотного обладнання](../flight_controller/README.md)).

[Контролери серії Pixhawk](../flight_controller/pixhawk_series.md) зазвичай мають чітко позначений порт для підключення GPS, а компас підключається до порту/шини I2C або SPI (залежно від пристрою).

[ARK GPS](../dronecan/ark_gps.md), [ARK RTK GPS](../dronecan/ark_rtk_gps.md), [Zubax GNSS 2](https://zubax.com/products/gnss_2), [CUAV C-RTK2](../gps_compass/rtk_gps_cuav_c-rtk.md), [CubePilot Here3 CAN GNSS GPS (M8N)](https://www.cubepilot.org/#/here/here3) та [Avionics Anonymous GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/) також можна під'єднати через [DroneCAN](../dronecan/README.md).


:::warning
Зверніть увагу на розкладку контактів при підключенні GPS-модуля.
Хоча всі вони сумісні з програмним забезпеченням, існує кілька варіантів розташування пінів.
:::


## GNSS конфігурація

Нижче наведено "стандартну" конфігурацію GPS. Додаткова конфігурація для конкретного пристрою може бути надана в PX4 або в документації виробника пристрою (наприклад, [Trimble MB-Two > Конфігурація](../gps_compass/rtk_gps_trimble_mb_two.md#configuration)).

:::warning
Протокол GPS, який очікує PX4, за замовчуванням є u-blox (за замовчуванням інші типи GPS, такі як Trimble, Emlid, MTK, не будуть виявлені) Протокол можна налаштувати за допомогою [GPS_x_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL).
:::

### Налаштування основного GPS

Налаштування GPS на Pixhawk відбувається досить легко для користувача - просто підключіть GPS-модуль до порту з міткою **GPS** і все повинно запрацювати.

:::note
Стандартна [Конфігурація послідовного порту](../peripherals/serial_configuration.md#default_port_mapping) працює для більшості пристроїв. Якщо ви використовуєте *Trimble MB-Two*, вам потрібно змінити конфігурацію, щоб явно встановити швидкість 115200 бод.
:::

<a id="dual_gps"></a>

### Налаштування додаткового GPS (подвійна система GPS)

Щоб використовувати додатковий GPS, підключіть його до будь-якого вільного порту, а потім виконайте [Конфігурацію послідовного порту](../peripherals/serial_configuration.md), щоб призначити [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) вибраному порту.

Наступні кроки демонструють, як налаштувати вторинний GPS на порту `TELEM 2` у *QGroundControl*:

1. [Знайдіть та встановіть](../advanced_config/parameters.md) параметр [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) у значення **TELEM 2**.
   - Відкрийте *QGroundControl* і перейдіть до розділу **Vehicle Setup > Parameters**.
   - Виберіть вкладку **GPS** (1), потім відкрийте параметр [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) (2) і виберіть *TELEM 2* з випадаючого списку (3). ![QGC Serial Example](../../assets/peripherals/qgc_serial_config_example.png)
1. Перезавантажте апарат, щоб побачити інші параметри.
1. Select the **Serial** tab, and open the [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) parameter (`TELEM 2` port baud rate): set it to *Auto*. ![QGC Serial Baudrate Example](../../assets/peripherals/qgc_serial_baudrate_example.png)

After setting up the second GPS port:
1. Configure the ECL/EKF2 estimator to blend data from both GPS systems. For detailed instructions see: [Using the ECL EKF > Dual Receivers](../advanced_config/tuning_the_ecl_ekf.md#dual-receivers).

### Configuring GPS as Yaw/Heading Source

GPS can be used as a source for yaw fusion when using modules where *yaw output is supported by the device* (e.g. [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)) or when using some [RTK GPS Setups with Dual u-blox F9P](../gps_compass/u-blox_f9p_heading.md).

When using GPS for yaw fusion you will need to configure the following parameters:

| Parameter                                                                    | Setting                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) | The angle made by the *baseline* (the line between the two GPS antennas) relative to the vehicle x-axis (front/back axis, as shown [here](../config/flight_controller_orientation.md#calculating-orientation)). |
| [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL)   | Set bit position 3 "Dual antenna heading" to `1` (i.e. add 8 to the parameter value).                                                                                                                           |

:::tip
If using this feature, all other configuration should be setup up as normal (e.g. [RTK Positioning](../gps_compass/rtk_gps.md#positioning-setup-configuration)).
:::

## Compass Configuration

Compass calibration is covered in: [Compass Configuration](../config/compass.md). The process is straightforward and will autodetect, [set default rotations](../advanced_config/parameter_reference.md#SENS_MAG_AUTOROT), calibrate, and prioritise, all connected magnetometers.


## Developer Information

- GPS/RTK-GPS
  - [RTK-GPS](../advanced/rtk_gps.md)
  - [GPS driver](../modules/modules_driver.md#gps)
  - [DroneCAN Example](../dronecan/README.md)
- Compass
  - [Driver source code](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/magnetometer) (Compasses)
