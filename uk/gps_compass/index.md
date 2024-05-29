# GPS та компас

PX4 підтримує глобальні навігаційні супутникові системи (GNSS) (включаючи GPS, ГЛОНАСС, Galileo, BeiDou, QZSS і SBAS) за допомогою приймачів, які підтримують зв'язок через протоколи u-blox, MTK Ashtech або Emlid, або через UAVCAN. Він також підтримує [Real Time Kinematic (RTK)](../gps_compass/rtk_gps.md) і **Post-Processing Kinematic (PPK)** GPS-приймачі, які розширюють можливості GPS-систем до сантиметрової точності.

PX4 можна використовувати з наступними частинами компаса (магнітометрами): Bosch BMM 150 MEMS (через шину I2C), HMC5883 / HMC5983 (I2C або SPI), IST8310 (I2C) і LIS3MDL (I2C або SPI). Можна підключити до 4 внутрішніх або зовнішніх магнітометрів, хоча тільки один з них буде використовуватися як джерело курсу. Many also include a [safety switch](../getting_started/px4_basic_concepts.md#safety-switch), [buzzer](../getting_started/px4_basic_concepts.md#buzzer) and [UI LED](../getting_started/led_meanings.html#ui-led).

![GPS + Компас](../../assets/hardware/gps/gps_compass.jpg)

:::info PX4 також підтримує [GPS приймачі реального часу (RTK)](../gps_compass/rtk_gps.md) і **Пост-обробку кінематичну (PPK)** GNSS, які розширюють GNSS системи до точності сантиметрового рівня.
:::

## Підтримка GNSS та/або компаса

PX4 повинен працювати з будь-яким пристроєм, що підтримує зв'язок через протоколи u-blox, MTK Ashtech або Emlid, або через UAVCAN.

Ця таблиця містить не-RTK GNSS-пристрої (більшість з яких також мають компас). Вони були протестовані командою розробників PX4 або користуються популярністю у спільноті PX4.

| Пристрій                                                                  |     GPS     |          Компас           | Примітки                                                                                                            |
|:------------------------------------------------------------------------- |:-----------:|:-------------------------:|:------------------------------------------------------------------------------------------------------------------- |
| [ARK GPS](https://arkelectron.com/product/ark-gps/)                       |     M9N     |         ICM42688p         |                                                                                                                     |
| [Avionics Anonymous UAVCAN GNSS/Mag][avionics_anon_can_gnss]              |   SAM-M8Q   |         MMC5983MA         |                                                                                                                     |
| [CUAV NEO 3 GPS](../gps_compass/gps_cuav_neo_3.md)                        |     M9N     |          IST8310          |                                                                                                                     |
| [CUAV NEO 3 Pro GPS](../gps_compass/gps_cuav_neo_3pro.md)                 |     M9N     |          RM3100           |                                                                                                                     |
| [CUAV NEO 3X GPS](../gps_compass/gps_cuav_neo_3x.md)                      |     M9N     |          RM3100           |                                                                                                                     |
| [CubePilot Here2 GNSS GPS (M8N)](../gps_compass/gps_hex_here2.md)         |     M8N     |         ICM20948          |                                                                                                                     |
| [Drotek DP0804](https://store-drotek.com/920-DP0804.html)                 |     M9N     |          LIS3MDL          | Також див. інші [Drotek u-blox GPS/Compasses](https://store-drotek.com/index.php?controller=search&s=ublox+compass) |
| [Emlid Reach M+](https://emlid.com/reach/)                                |   &check;   |          &cross;          | Підтримує PPK. Очікується RTK.                                                                                      |
| [Holybro DroneCAN M8N GPS](../dronecan/holybro_m8n_gps.md)                |     M8N     |          BMM150           |                                                                                                                     |
| [Holybro Micro M8N GPS](https://holybro.com/products/micro-m8n-gps)       |     M8N     |          IST8310          |                                                                                                                     |
| [Holybro Nano Ublox M8 5883 GPS][hb_nano_m8_5883]                         |  UBX-M8030  |          QMC5883          |                                                                                                                     |
| [Holybro M8N GPS](../gps_compass/gps_holybro_m8n_m9n.md)                  |     M8N     |          IST8310          |                                                                                                                     |
| [Holybro M9N GPS](../gps_compass/gps_holybro_m8n_m9n.md)                  |     M9N     |          IST8310          |                                                                                                                     |
| [Holybro DroneCAN M9N GPS](https://holybro.com/products/dronecan-m9n-gps) |     M9N     |          BMM150           |                                                                                                                     |
| [Hobbyking u-blox Neo-M8N GPS with Compass][hk_ublox_neo_8mn]             |     M8N     |          &check;          |                                                                                                                     |
| [LOCOSYS Hawk A1 GNSS receiver](../gps_compass/gps_locosys_hawk_a1.md)    | MC-1612-V2b |       опціональний        |                                                                                                                     |
| [LOCOSYS Hawk R1](../gps_compass/rtk_gps_locosys_r1.md)                   | MC-1612-V2b |                           |                                                                                                                     |
| [LOCOSYS Hawk R2](../gps_compass/rtk_gps_locosys_r2.md)                   | MC-1612-V2b |          IST8310          |                                                                                                                     |
| [mRo GPS u-blox Neo-M8N Dual Compass][mro_neo8mn_dual_mag]                |     M8N     |     LIS3MDL, IST8308      |                                                                                                                     |
| [Sky-Drones SmartAP GPS](../gps_compass/gps_smartap.md)                   |     M8N     | HMC5983, IST8310, LIS3MDL |                                                                                                                     |
| [Zubax GNSS 2](https://zubax.com/products/gnss_2)                         |   MAX-M8Q   |          LIS3MDL          |                                                                                                                     | 

<!-- links to improve layout of table for editing -->
Примітки:

- &check; або конкретний номер артикулу вказує на те, що функція підтримується, тоді як &cross; або пусте поле вказує на те, що функція не підтримується. "?" означає "невідомо".
- Там, де це можливо і доречно, використовується назва деталі (наприклад, &check; у колонці GPS вказує на наявність GPS-модуля, але деталь невідома).
- У списку може бути відсутнє деяке зняте з виробництва обладнання, яке все ще підтримується. Оригінальне _Тут_ вже видалено. Перевірте попередні версії, якщо тут не згадано модуль, який перестали випускати.

## Кріплення GPS/компасу

[Монтаж магнітного компасу](../assembly/mount_gps_compass.md) пояснює, як встановити GNSS модуль, що має компас (це саме компасна частина є піддана електромагнітному випромінюванню).

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

:::info Стандартна [Конфігурація послідовного порту](../peripherals/serial_configuration.md#default_port_mapping) працює для більшості пристроїв. Якщо ви використовуєте _Trimble MB-Two_, вам потрібно змінити конфігурацію, щоб явно встановити швидкість 115200 бод.
:::

<a id="dual_gps"></a>

### Налаштування додаткового GPS (подвійна система GPS)

Щоб використовувати додатковий GPS, підключіть його до будь-якого вільного порту, а потім виконайте [Конфігурацію послідовного порту](../peripherals/serial_configuration.md), щоб призначити [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) вибраному порту.

Наступні кроки демонструють, як налаштувати вторинний GPS на порту `TELEM 2` у _QGroundControl_:

1. [Знайдіть та встановіть](../advanced_config/parameters.md) параметр [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) у значення **TELEM 2**.
   - Відкрийте *QGroundControl* і перейдіть до розділу **Vehicle Setup > Parameters**.
   - Виберіть вкладку **GPS** (1), потім відкрийте параметр [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) (2) і виберіть *TELEM 2* з випадаючого списку (3). ![Приклад серії QGC](../../assets/peripherals/qgc_serial_config_example.png)
1. Перезавантажте апарат, щоб побачити інші параметри.
1. Перейдіть на вкладку **Serial** і відкрийте параметр [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) (швидкість передачі даних у порту `TELEM 2`): встановіть для нього значення *Auto*. ![Приклад послідовної швидкості передачі QGC](../../assets/peripherals/qgc_serial_baudrate_example.png)

Після налаштування другого GPS-порту:

1. Налаштуйте обчислювач ECL/EKF2, щоб об'єднати дані з обох GPS-систем. Докладні інструкції див. тут:[Using the ECL EKF > Dual Receivers](../advanced_config/tuning_the_ecl_ekf.md#dual-receivers).

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
