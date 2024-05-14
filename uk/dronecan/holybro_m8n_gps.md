# Holybro DroneCAN M8N GPS

Holybro DroneCAN GPS має модуль UBLOX M8N, компас BMM150, триколірний індикатор світлодіодів.

Модуль GPS використовує протокол [DroneCAN](index.md) для зв'язку. З'єднання DroneCAN менше чутливі до електромагнітних перешкод порівняно з послідовним з'єднанням, що робить його більш надійним. Крім того, використання DroneCAN означає, що GPS та компас не займають жодних портів послідовного керування польотом (різні/додаткові пристрої CAN можна підключити до того ж шини CAN за допомогою плати розгалужувача CAN).

<img src="../../assets/hardware/gps/hb_dronecan_m8n/hb_dronecan_m8n_gps.jpg" width="400px" title="Hero diagram for the GPS module" />

## Де купити

Замовте цей модуль з:

- [Holybro](https://holybro.com/products/dronecan-m8n-gps)

## Характеристики обладнання

|                                                      | DroneCAN M8N                         |
| ---------------------------------------------------- | ------------------------------------ |
| Приймач GNSS                                         | Ublox NEO M8N                        |
| Кількість одночасних GNSS                            | 2 (Стандартний GPS + GLONASS)        |
| Процесор                                             | STM32G4 (170MHz, 512K FLASH)         |
| Компас                                               | BMM150                               |
| Смуга частот                                         | <p>GPS: L1C/A<br>GLONASS: L10F<br>Beidou: B1I<br>Galileo: E1B/C</p>            |
| Система розширення GNSS                              | SBAS: WAAS, EGNOS, MSAS, QZSS        |
| Оновлення навігації                                  | 5Гц За замовчуванням (10Гц МАКС)     |
| Чутливість навігації                                 | –167 dBm                             |
| Холодний запуск                                      | \~ 26s                              |
| Точність                                             | 2.5m                                 |
| Точність швидкості                                   | 0.05 m/s                             |
| Макс. # супутників                                   | 22+                                  |
| Швидкість передачі даних по CAN BUS за замовчуванням | 1MHz                                 |
| Протокол зв'язку                                     | DroneCAN @ 1 Mbit/s                  |
| Підтримує автопілот FW                               | PX4, Ardupilot                       |
| Тип порту                                            | GHR-04V-S                            |
| Антена                                               | 25 x 25 x 4 мм керамічна патч-антена |
| Напруга                                              | 4.7-5.2V                             |
| Споживання електроенергії                            | Менше ніж 200мА @ 5В                 |
| Температура                                          | -40\~80C                            |
| Розмір                                               | <p>Діаметр: 54мм<br>Товщина: 14.5мм</p>            |
| Вага                                                 | 36g                                  |
| Довжина кабелю                                       | 26cm                                 |
| Інше                                                 | <ul><li>LNA MAX2659ELT+ RF підсилювач</li><li>Конденсатор Фараха, що перезаряджається</li><li>Малошумний стабілізатор 3,3 В</li><li>У комплект включено кабель завдовжки 26 см</li></ul>            |

## Налаштування обладнання

### Встановлення

Рекомендоване положення монтажу полягає в тому, щоб стрілка на GPS вказувала у напрямку **передньої частини дрону**.

Датчик може бути встановлений де завгодно на рамці, але ви повинні вказати його позицію відносно центру мас транспортного засобу під час [налаштування PX4](#px4-configuration).

### Підключення

The Holybro DroneCAN GPS підключений до шини CAN за допомогою стандартного кабелю Pixhawk 4 pin JST GH. Для отримання додаткової інформації, зверніться до інструкцій з [проводки CAN](../can/index.md#wiring).

### Розпіновка

![Diagram showing GPS pinouts](../../assets/hardware/gps/hb_dronecan_m8n/hb_dronecan_m8n_gps_pinout.jpg)

### Розміри

![Diagram showing GPS dimensions](../../assets/hardware/gps/hb_dronecan_m8n/hb_dronecan_m8n_gps_dimension.jpg)

## Налаштування PX4

Вам потрібно встановити необхідні [параметри DroneCAN](index.md) та визначити зсуви, якщо датчик не знаходиться у центрі транспортного засобу. Необхідні налаштування наведено нижче.

:::info
GPS не завантажиться, якщо SD-карти немає у контролері польоту під час ввімкнення.
:::

### Увімкнення DroneCAN

Для використання плати ARK GPS підключіть її до шини CAN Pixhawk та увімкніть драйвер DroneCAN, встановивши параметр [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) на `2` для динамічного призначення вузла (або `3`, якщо використовуєте [DroneCAN ESCs](../dronecan/escs.md)).

Кроки наступні:

- У _QGroundControl_ встановіть параметр [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) на `2` або `3` та перезавантажте (див. [Finding/Updating Parameters](../advanced_config/parameters.md)).
- Підключіть GPS CAN до шини CAN Pixhawk.

Після активації модуль буде виявлено при завантаженні. Дані GPS повинні надходити з частотою 5 Гц.

Конфігурацію DroneCAN в PX4 пояснено більш детально в [DroneCAN >Enabling DroneCAN](../dronecan/index.md#enabling-dronecan).

### Конфігурація позиції датчика

Якщо датчик не знаходиться у центрі пристрою, вам також потрібно буде визначити зміщення датчика:

- Увімкніть GPS синхронізацію по напрямку, встановивши біт 3 [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL) на true.
- Увімкніть [UAVCAN_SUB_GPS](../advanced_config/parameter_reference.md#UAVCAN_SUB_GPS), [UAVCAN_SUB_MAG](../advanced_config/parameter_reference.md#UAVCAN_SUB_MAG) та [UAVCAN_SUB_BARO](../advanced_config/parameter_reference.md#UAVCAN_SUB_BARO).
- Встановіть [CANNODE_TERM](../advanced_config/parameter_reference.md#CANNODE_TERM) на `1` якщо це останній вузол на шині CAN.
- Параметри [EKF2_GPS_POS_X](../advanced_config/parameter_reference.md#EKF2_GPS_POS_X), [EKF2_GPS_POS_Y](../advanced_config/parameter_reference.md#EKF2_GPS_POS_Y) та [EKF2_GPS_POS_Z](../advanced_config/parameter_reference.md#EKF2_GPS_POS_Z) можуть бути встановлені для врахування зміщення ARK GPS від центру мас транспортного засобу.
