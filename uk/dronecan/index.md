# DroneCAN

[DroneCAN](https://dronecan.github.io/) це відкритий програмний протокол зв'язку для контролерів польоту та інших пристроїв [CAN](../can/index.md) на транспортному засобі для взаємодії між собою.

:::warning

- DroneCAN не активовано за замовчуванням, так само як і конкретні сенсори та функції, які його використовують. Для отримання інформації щодо налаштування дивіться [Конфігурація PX4](#px4-configuration).
- PX4 вимагає SD-карту для активації динамічного виділення вузлів та оновлення прошивки. Карта SD не використовується під час польоту.

:::

:::info
DroneCAN раніше відомий як UAVCAN v0 (або просто UAVCAN).
Ім'я було змінено в 2022 році.
:::

## Переваги DroneCAN

Підключення периферійних пристроїв через DroneCAN має багато переваг:

- Багато різних сенсорів та приводів вже підтримуються.
- CAN був спеціально розроблений для забезпечення надійного та надійного підключення на відносно великі відстані. Це дозволяє безпечне використання ESC на більших транспортних засобах та забезпечує резервне забезпечення зв'язку.
- Автобус є бідирекціональним, що дозволяє виконувати моніторинг стану здоров'я, діагностику та телеметрію обертів на хвилину (RPM).
- Проводка менше складна, оскільки ви можете мати один шину для підключення всіх ваших ESC і інших периферійних пристроїв DroneCAN.
- Налаштування стає простіше, оскільки ви налаштовуєте нумерацію ESC, обертаючи кожен двигун вручну.
- Це дозволяє користувачам налаштовувати та оновлювати прошивку всіх пристроїв, підключених через CAN, централізовано через PX4.

## Підтримуване обладнання

Підтримуються найпоширеніші типи периферійних пристроїв (датчики, ESCs та сервоприводи), які відповідають стандартам DroneCAN/UAVCAN v0.

Підтримувана апаратура включає (це не є вичерпним списком):

- [Контролери ESC/двигуна](../dronecan/escs.md)
- Датчики швидкості повітря
  - [Датчик швидкості Thiemar](https://github.com/thiemar/airspeed)
- Приймачі ГНСС для ГНСС (GPS, GLONASS, BeiDou та інше)
  - [ARK GPS](../dronecan/ark_gps.md)
  - [ARK RTK GPS](../dronecan/ark_rtk_gps.md)
  - [CubePilot Here3](https://www.cubepilot.org/#/here/here3)
  - [CUAV NEO v2 Pro GNSS](https://doc.cuav.net/gps/neo-series-gnss/en/neo-v2-pro.html)
  - [CUAV NEO 3 Pro GPS](../gps_compass/gps_cuav_neo_3pro.md)
  - [CUAV NEO 3X GPS](../gps_compass/gps_cuav_neo_3x.md)
  - [CUAV C-RTK2 PPK/RTK GNSS](../gps_compass/rtk_gps_cuav_c-rtk2.md)
  - [Holybro DroneCAN M8N GPS](../dronecan/holybro_m8n_gps.md)
  - [Holybro DroneCAN M9N GPS](https://holybro.com/products/dronecan-m9n-gps)
  - [Holybro DroneCAN H-RTK F9P Rover](https://holybro.com/products/dronecan-h-rtk-f9p-rover)
  - [Holybro DroneCAN H-RTK F9P Helical](https://holybro.com/products/dronecan-h-rtk-f9p-helical)
  - [Zubax GNSS](https://zubax.com/products/gnss_2)
- Монітори живлення
  - [Силовий модуль Pomegranate Systems](../dronecan/pomegranate_systems_pm.md)
  - [Модуль живлення CUAV CAN PMU](../dronecan/cuav_can_pmu.md)
- Компас
  - [Професійний компас Holybro RM3100](https://holybro.com/products/dronecan-rm3100-compass)
- Датчики відстані
  - [ARK Flow](ark_flow.md)
  - [Авіоніка Анонімний Лазерний Альтиметр UAVCAN Інтерфейс](../dronecan/avanon_laser_interface.md)
- Оптичний потік
  - [Ark Flow](ark_flow.md)
- Загальний вузол CAN (дозволяє використання датчиків I2C, SPI, UART на шині CAN).
  - [ARK CANnode](../dronecan/ark_cannode.md)

## Налаштування обладнання

DroneCAN працює через мережу CAN. Апаратне забезпечення DroneCAN повинно бути підключене, як описано в [CAN > Проводка](../can/index.md#wiring).

## Виділення ідентифікатора вузла

Кожен пристрій DroneCAN повинен бути налаштований з унікальним ідентифікатором вузла _node id_, який є унікальним на транспортному засобі.

Більшість пристроїв підтримують _Динамічне призначення вузла (DNA)_, що дозволяє PX4 автоматично налаштовувати ідентифікатор вузла кожного виявленого периферійного пристрою при запуску системи. Консультуйте документацію виробника, щоб дізнатися, чи підтримує ваш пристрій ДНК та як її увімкнути. Багато пристроїв автоматично перейдуть на ДНК, якщо ідентифікатор вузла встановлено на 0. PX4 увімкне вбудований сервер виділення, якщо параметр [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) встановлений на значення > 1 (встановлено на 2 або 3).

Деякі пристрої не підтримують ДНК. Додатково, в певних критичних сценаріях ви можливо віддасте перевагу ручній налаштування ідентифікаторів вузлів заздалегідь замість покладанняся на сервер динамічного виділення. Якщо ви бажаєте повністю вимкнути ДНК, встановіть `UAVCAN_ENABLE` на `1` і вручну встановіть кожен ідентифікатор вузла на унікальне значення. Якщо ДНК все ще працює і певні пристрої потребують ручної конфігурації, присвойте цим пристроям значення, більше, ніж загальна кількість пристроїв DroneCAN, щоб уникнути конфліктів.

:::info Ідентифікатор вузла PX4 можна налаштувати, використовуючи параметр [UAVCAN_NODE_ID](../advanced_config/parameter_reference.md#UAVCAN_NODE_ID). Параметр за замовчуванням встановлено на 1.
:::

:::warning
На момент написання PX4 не запускає сервер розподілу вузлів на порту CAN2. Це означає, що якщо у вас є пристрій, який підключений _тільки_ до CAN2 (не резервно до CAN1 і CAN2), вам потрібно буде вручну налаштувати його ідентифікатор вузла.
:::

## Конфігурація PX4

DroneCAN налаштовується на PX4 шляхом [встановлення конкретних параметрів PX4](../advanced_config/parameters.md) в QGroundControl. Вам потрібно буде увімкнути сам DroneCAN, разом із підписками та публікаціями для будь-яких функцій, які ви використовуєте.

:::info У деяких випадках можливо знадобиться налаштувати параметри на підключених пристроях CAN (їх також можна [встановити за допомогою QGC](#qgc-cannode-parameter-configuration)).
:::

### Увімкнення DroneCAN

Щоб увімкнути драйвер PX4 DroneCAN, встановіть параметр [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE):

- `0`: Вимкнено драйвер DroneCAN
- `1`: Драйвер DroneCAN увімкнено для сенсорів, [сервер DNA](#node-id-allocation) вимкнено
- `2`: Драйвер DroneCAN увімкнено для сенсорів, сервер DNA увімкнено
- `3`: Драйвер DroneCAN увімкнено для сенсорів та ESC, сервер DNA увімкнено

`2` або `3` рекомендовані, якщо підтримується ДНК.

### Підписки &  Публікації DroneCan

PX4 не публікує або підписується на повідомлення DroneCAN, які _можуть_ бути потрібні за замовчуванням, щоб уникнути спаму на шині CAN. Замість цього вам потрібно увімкнути публікацію або підписку на повідомлення, пов'язані з певною функцією, встановивши відповідний параметр [UAVCAN](../advanced_config/parameter_reference.md#uavcan).

:::info Параметри датчика можуть не існувати (бути видимими в QGC), поки ви не увімкнете пов'язану підписку на датчик DroneCAN [сенсор](#sensors)!

Наприклад, [SENS_FLOW_MINHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MINHGT) не існує до тих пір, поки не буде увімкнено [UAVCAN_SUB_FLOW](../advanced_config/parameter_reference.md#UAVCAN_SUB_FLOW).
:::

Наприклад, для використання підключеної розумної батареї DroneCAN ви активуєте параметр [UAVCAN_SUB_BAT](../advanced_config/parameter_reference.md#UAVCAN_SUB_BAT), який підписує PX4 на отримання повідомлень DroneCAN [BatteryInfo](https://dronecan.github.io/Specification/7._List_of_standard_data_types/#batteryinfo). Якщо використовується периферійний пристрій, який повинен знати, чи ввімкнено PX4, вам потрібно встановити параметр [UAVCAN_PUB_ARM](../advanced_config/parameter_reference.md#UAVCAN_PUB_ARM), щоб PX4 почав публікувати повідомлення [ArmingStatus](https://dronecan.github.io/Specification/7._List_of_standard_data_types/#armingstatus).

Назви параметрів передують префікси `UAVCAN_SUB_` та `UAVCAN_PUB_`, щоб позначити, чи вони дозволяють PX4 підписку або публікацію. Решта назви вказує на конкретне повідомлення/функцію, яка встановлюється.

Периферійні пристрої DroneCAN, підключені до PX4, також можуть бути [налаштовані за допомогою параметрів через QGC](#qgc-cannode-parameter-configuration). За установою, параметри, які називаються префіксом [CANNODE\_](../advanced_config/parameter_reference.md#CANNODE_BITRATE), мають попередньо визначене значення і можуть бути задокументовані в посиланні на параметри. Параметри `CANNODE_`, які починаються з префіксів `CANNODE_PUB_` та `CANNODE_SUB_`, дозволяють периферійному пристрою публікувати або підписуватися на пов'язане повідомлення DroneCAN. Ці дозволяють пристроям DroneCAN налаштовуватися для підписки та публікації тільки тих повідомлень, які їм дійсно потрібні (так само, як PX4 використовує відповідні параметри `UAVCAN_PUB_`/`UAVCAN_SUB_`). Зверніть увагу, що периферійний пристрій може не використовувати параметри `CANNODE_`, у такому випадку він може публікувати / підписуватися на певні повідомлення, незалежно від того, чи вони потрібні.

Наступні розділи надають додаткові відомості про параметри периферійних пристроїв PX4 та DroneCAN, які використовуються для увімкнення певних функцій.

#### Датчики

Параметри/підписки сенсора DroneCAN, які можна активувати (у PX4 v1.14):

- [UAVCAN_SUB_ASPD](../advanced_config/parameter_reference.md#UAVCAN_SUB_ASPD): Швидкість повітря
- [UAVCAN_SUB_BARO](../advanced_config/parameter_reference.md#UAVCAN_SUB_BARO): Барометр
- [UAVCAN_SUB_BAT](../advanced_config/parameter_reference.md#UAVCAN_SUB_BAT): Монітор акумулятора/Модуль живлення
- [UAVCAN_SUB_BTN](../advanced_config/parameter_reference.md#UAVCAN_SUB_BTN): Кнопка
- [UAVCAN_SUB_DPRES](../advanced_config/parameter_reference.md#UAVCAN_SUB_DPRES): диференційний тиск
- [UAVCAN_SUB_FLOW](../advanced_config/parameter_reference.md#UAVCAN_SUB_FLOW): Оптичний потік
- [UAVCAN_SUB_GPS](../advanced_config/parameter_reference.md#UAVCAN_SUB_GPS): GPS
- [UAVCAN_SUB_HYGRO](../advanced_config/parameter_reference.md#UAVCAN_SUB_HYGRO): Гігрометр
- [UAVCAN_SUB_ICE](../advanced_config/parameter_reference.md#UAVCAN_SUB_ICE): Внутрішньосгорювальний двигун (ICE).
- [UAVCAN_SUB_IMU](../advanced_config/parameter_reference.md#UAVCAN_SUB_IMU): ІМУ
- [UAVCAN_SUB_MAG](../advanced_config/parameter_reference.md#UAVCAN_SUB_MAG): Магнітометр (компас)
- [UAVCAN_SUB_RNG](../advanced_config/parameter_reference.md#UAVCAN_SUB_RNG): Дальномер (датчик відстані).

#### GPS

Параметри PX4 DroneCAN:

- Увімкніть [UAVCAN_SUB_GPS](../advanced_config/parameter_reference.md#UAVCAN_SUB_GPS).
- Увімкніть [UAVCAN_SUB_MAG](../advanced_config/parameter_reference.md#UAVCAN_SUB_MAG), якщо модуль GPS має вбудований компас.

Параметр GPS CANNODE ([встановлені за допомогою QGC](#qgc-cannode-parameter-configuration)):

- Встановіть [CANNODE_TERM](../advanced_config/parameter_reference.md#CANNODE_TERM) на `1` для останнього вузла на шині CAN.

Інші параметри PX4:

- Якщо GPS не розташований в центрі ваги транспортного засобу, ви можете врахувати зміщення, використовуючи [EKF2_GPS_POS_X](../advanced_config/parameter_reference.md#EKF2_GPS_POS_X), [EKF2_GPS_POS_Y](../advanced_config/parameter_reference.md#EKF2_GPS_POS_Y) та [EKF2_GPS_POS_Z](../advanced_config/parameter_reference.md#EKF2_GPS_POS_Z).
- Якщо модуль GPS надає інформацію про курс, ви можете увімкнути об'єднання курсу GPS, встановивши біт 3 [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL) на true.

#### RTK-GPS

Встановіть ті ж параметри, що й для [GPS](#gps) вище. Крім того, вам може знадобитися встановити наступні параметри в залежності від того, чи є ваша налаштування RTK Ровером і Фіксованою Базою, або Ровером і Рухомою Базою, або обома.

##### Ровер та фіксована база

Позиція ровера встановлюється за допомогою RTCM-повідомлень від базового модуля RTK (базовий модуль підключений до QGC, який надсилає інформацію RTCM до PX4 через MAVLink).

Параметри PX4 DroneCAN:

- [UAVCAN_PUB_RTCM](../advanced_config/parameter_reference.md#UAVCAN_PUB_RTCM):
  - Робить PX4 публікує повідомлення RTCM ([RTCMStream](https://dronecan.github.io/Specification/7._List_of_standard_data_types/#rtcmstream)) на шину (яку він отримує від базового модуля RTK через QGC).

Параметри модуля Rover (також [встановлені за допомогою QGC](#qgc-cannode-parameter-configuration)):

- [CANNODE_SUB_RTCM](../advanced_config/parameter_reference.md#CANNODE_SUB_RTCM) повідомляє приймачу, що він повинен підписатися на повідомлення [RTCMStream](https://dronecan.github.io/Specification/7._List_of_standard_data_types/#rtcmstream) RTCM на шині (від рухомої бази).

:::info Ви можете замість цього використовувати [UAVCAN_PUB_MBD](../advanced_config/parameter_reference.md#UAVCAN_PUB_MBD) та [CANNODE_SUB_MBD](../advanced_config/parameter_reference.md#CANNODE_SUB_MBD), які також публікують повідомлення RTCM (це новіше). Використання повідомлення [RTCMStream](https://dronecan.github.io/Specification/7._List_of_standard_data_types/#rtcmstream) означає, що ви можете реалізувати рухому базу (див. нижче) одночасно.
:::

##### Ровер та Рухома База

Як обговорювалося в [RTK GPS Heading with Dual u-blox F9P](../gps_compass/u-blox_f9p_heading.md), у транспортному засобі можуть бути два модулі RTK для обчислення кута повороту за допомогою GPS. У цьому налаштуванні транспортний засіб має _рухому базу_ RTK GPS та _роувер_ RTK GPS.

Ці параметри можуть бути [встановлені на рухомій базі та приймачі RTK CAN-вузлах](#qgc-cannode-parameter-configuration) відповідно:

- [CANNODE_PUB_MBD](../advanced_config/parameter_reference.md#CANNODE_PUB_MBD) спричинює те, що рухома базова одиниця GPS публікує повідомлення RTCM [MovingBaselineData](https://dronecan.github.io/Specification/7._List_of_standard_data_types/#movingbaselinedata) на шину (для ровера)
- [CANNODE_SUB_MBD](../advanced_config/parameter_reference.md#CANNODE_SUB_MBD) повідомляє роверу, що він повинен підписатися на повідомлення RTCM [MovingBaselineData](https://dronecan.github.io/Specification/7._List_of_standard_data_types/#movingbaselinedata) на шині (від рухомої бази).

Для PX4 вам також знадобиться встановити [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET), щоб вказати відносне положення рухомої бази та ровера: 0, якщо ваш Rover знаходиться перед вашою Рухомою Базою, 90, якщо Rover зправа від Рухомої Бази, 180, якщо Rover ззаду Рухомої Бази, або 270, якщо Rover зліва від Рухомої Бази.

#### Барометр

Параметри PX4 DroneCAN:

- Увімкніть [UAVCAN_SUB_BARO](../advanced_config/parameter_reference.md#UAVCAN_SUB_BARO).

#### Компас

Параметри PX4 DroneCAN:

- Увімкніть [UAVCAN_SUB_MAG](../advanced_config/parameter_reference.md#UAVCAN_SUB_MAG).

#### Датчик відстані/Дальніметр

Параметри PX4 DroneCAN:

- Увімкніть [UAVCAN_SUB_RNG](../advanced_config/parameter_reference.md#UAVCAN_SUB_RNG).
- Встановіть [UAVCAN_RNG_MIN](../advanced_config/parameter_reference.md#UAVCAN_RNG_MIN) та [UAVCAN_RNG_MAX](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX), мінімальну та максимальну дистанцію сенсора відстані.

Інші параметри PX4:

- Якщо дальномер не розташований в центрі ваги транспортного засобу, ви можете врахувати зміщення, використовуючи [EKF2_RNG_POS_X](../advanced_config/parameter_reference.md#EKF2_RNG_POS_X), [EKF2_RNG_POS_Y](../advanced_config/parameter_reference.md#EKF2_RNG_POS_Y) та [EKF2_RNG_POS_Z](../advanced_config/parameter_reference.md#EKF2_RNG_POS_Z).
- Інші параметри `EKF2_RNG_*` можуть бути важливими, у такому випадку вони повинні бути задокументовані з конкретним дальномером.

#### Оптичний потік Sensor

Параметри PX4 DroneCAN:

- Увімкніть [UAVCAN_SUB_FLOW](../advanced_config/parameter_reference.md#UAVCAN_SUB_FLOW).

Інші параметри PX4:

- Встановіть [SENS_FLOW_MINHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MINHGT) та [SENS_FLOW_MAXHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MAXHGT), мінімальну та максимальну висоту датчика потоку.
- Встановіть [SENS_FLOW_MAXR](../advanced_config/parameter_reference.md#SENS_FLOW_MAXR) максимальну кутову швидкість потоку датчика.
- Увімкніть об'єднання оптичного потоку, встановивши [EKF2_OF_CTRL](../advanced_config/parameter_reference.md#EKF2_OF_CTRL).
- Щоб вимкнути підтримку GPS (необов'язково), встановіть [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL) на `0`.
- Якщо оптичний потік не розташований в центрі ваги транспортного засобу, ви можете врахувати зміщення, використовуючи [EKF2_OF_POS_X](../advanced_config/parameter_reference.md#EKF2_OF_POS_X), [EKF2_OF_POS_Y](../advanced_config/parameter_reference.md#EKF2_OF_POS_Y) та [EKF2_OF_POS_Z](../advanced_config/parameter_reference.md#EKF2_OF_POS_Z).

Оптичні датчики потоку потребують даних дальномера. Однак дальномер не обов'язково повинен бути частиною того ж модуля, і якщо він не є, то може бути не підключений через DroneCAN. Якщо дальномір підключений через DroneCAN (чи це вбудовано або окремо), вам також потрібно буде активувати його, як описано в розділі [дальномір](#distance-sensor-range-finder) (вище).

#### Периферійне озброєння

Параметри PX4 DroneCAN:

- [UAVCAN_PUB_ARM](../advanced_config/parameter_reference.md#UAVCAN_PUB_ARM) ([Статус зброї](https://dronecan.github.io/Specification/7._List_of_standard_data_types/#armingstatus)): Опублікуйте, коли використовуєте компоненти DroneCAN, які вимагають статусу зброї PX4 як умову для використання.

### ESC & сервоприводи

[Двигуни DroneCAN та сервоприводи](../dronecan/escs.md) потребують налаштування [порядку двигунів та виходів сервоприводів](../config/actuators.md).

## Налаштування параметрів CANNODE QGC

QGroundControl може переглядати та змінювати параметри, що належать до пристроїв CAN, підключених до автопілота, за умови, що пристрої підключені до автопілота до запуску QGC.

Контролери CAN відображаються в окремих розділах у [Параметри транспортного засобу > Параметри](../advanced_config/parameters.md) під назвою _Компонент X_, де X - ідентифікатор вузла. Наприклад, на знімку екрану нижче показані параметри для CAN GPS з ідентифікатором вузла 125 (після групування параметрів _Стандарт_, _Система_ та _Розробник_).

![QGC Parameter showing selected DroneCAN node](../../assets/can/dronecan/qgc_can_parameters.png)

## Налаштування пристрою

Більшість вузлів DroneCAN не потребують додаткової настройки, якщо це не вказано у їх документації, специфічній для пристрою.

## Оновлення прошивки

PX4 може оновлювати прошивку пристрою через DroneCAN. Щоб оновити пристрій, все, що потрібно зробити, це скопіювати бінарний файл прошивки в кореневий каталог SD-карти контролера польоту та перезавантажити його.

Під час завантаження контролер польоту автоматично передасть прошивку на пристрій та оновить його. Якщо операція вдалася, бінарний файл прошивки буде видалено з кореневого каталогу, і на SD-картці буде файл з назвою **XX.bin** у каталозі **/ufw**.

## Відстеження проблем

**Q**:  Мої пристрої DroneCAN не працюють.

**A**: Перевірте, що параметр `UAVCAN_ENABLE` встановлено правильно. Щоб побачити список пристроїв/вузлів, які PX4 виявив на шині CAN, відкрийте NSH (тобто перейдіть до консолі MAVLink QGroundControl) та введіть `uavcan status`.

---

**Q**: Сервер DNA не видає ідентифікатори вузлів.

**A**: PX4 вимагає SD-карту для виконання динамічного виділення вузлів. Переконайтеся, що у вас (працюючий) вставлений і перезавантажтеся.

---

**Q**: Двигуни не крутяться під час увімкнення.

**A**: Переконайтеся, що `UAVCAN_ENABLE` встановлено ​​на `3`, щоб увімкнути вивід ESC DroneCAN.

---

**Q**: Двигуни не крутяться, поки не збільшиться оберти.

**А**: Використовуйте [Acutator > Тестування приводу](../config/actuators.md#actuator-testing), щоб підтвердити, що вихідні дані двигуна встановлені на правильні мінімальні значення.

## Корисні посилання

- [Головна сторінка](https://dronecan.github.io) (dronecan.github.io)
- [Специфікація протоколу](https://dronecan.github.io/Specification) (dronecan.github.io)
- [Реалізації](https://dronecan.github.io/Implementations/) (dronecan.github.io)
- [пристрій Cyphal/CAN interconnection](https://kb.zubax.com/pages/viewpage.action?pageId=2195476) (kb.zubax.com)
