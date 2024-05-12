# ARK Flow

ARK Flow - це відкритий код [DroneCAN](index.md) [optical flow](../sensor/optical_flow.md), [сенсор відстані](../sensor/rangefinders.md) та IMU модуль.

![ARK Flow](../../assets/hardware/sensors/optical_flow/ark_flow.jpg)

## Де купити

Замовте цей модуль з:

- [ARK Electronics](https://arkelectron.com/product/ark-flow/) (US)

## Характеристики обладнання

- [Схема з відкритим кодом та BOM](https://github.com/ARK-Electronics/ARK_Flow)
- Сенсори
  - PixArt PAW3902 датчик оптичного потоку
    - Відстеження в умовах надзвичайно слабкого світла > 9 лк
    - Широкий робочий діапазон від 80 мм до 30 м
    - До 7.4 рад/с
  - 40mW ІЧ-світлодіод, вбудований на плату для покращення роботи в умовах слабкого освітлення
  - Broadcom AFBR-S50LV85D Time-of-Flight Distance Sensor
    - Інтегроване джерело світла лазера 850 нм
    - Поле зору (FoV) 12,4° x 6,2° з 32 пікселями
    - Типовий діапазон відстані до 30м
    - Робота в умовах 200 тис. люксів світла навколишнього середовища
    - Добре працює на всіх поверхнях
    - Трансмітер пучка 2° x 2° для підсвічування між 1 та 3 пікселями
  - Bosch BMI088 6-Axis IMU або Invensense ICM-42688-P 6-Axis IMU
- STM32F412CEU6 MCU
- Два роз'єми стандарту CAN для Pixhawk (4 Pin JST GH)
- Роз'єм для відлагодження стандарту Pixhawk (6 контактів JST SH)
- Вбудований резистор CAN з можливістю програмованого переключання
- Малий форм-фактор
  - 3см x 3см x 1.4см
- LED індикатори
- USA Built

## Налаштування обладнання

### Підключення

ARK Flow підключений до шини CAN за допомогою стандартного кабелю JST GH з чотирма контактами Pixhawk. Для отримання додаткової інформації, зверніться до інструкцій з [проводки CAN](../can/index.md#wiring).

### Встановлення

Рекомендоване положення монтажу полягає в тому, щоб роз'єми на платі вказували у напрямку **задньої частини дрону**, як показано на наступній картинці.

![ARK Flow align with Pixhawk](../../assets/hardware/sensors/optical_flow/ark_flow_orientation.png)

Це відповідає значенню за замовчуванням (`0`) параметра [SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT). Змініть параметр належним чином, якщо використовується інша орієнтація.

Датчик може бути встановлений де завгодно на рамці, але ви повинні вказати позицію фокусної точки відносно центру мас транспортного засобу під час [налаштування PX4](#px4-configuration).

## Налаштування прошивки

ARK Flow працює з [PX4 DroneCAN Firmware](px4_cannode_fw.md). Таким чином, він підтримує оновлення прошивки через шину CAN та [dynamic node allocation](index.md#node-id-allocation).

Плати ARK Flow поставляються з останнім вбудованим програмним забезпеченням, але якщо ви хочете побудувати й прошити останнє програмне забезпечення самостійно, див. [PX4 DroneCAN Firmware > Building the Firmware](px4_cannode_fw.md#building-the-firmware).

- Ціль прошивки: `ark_can-flow_default`
- Ціль завантажувача: `ark_can-flow_canbootloader`

## Налаштування польотного контролера

::: інформація
Ark Flow не завантажиться, якщо SD-карти немає у контролері польоту під час ввімкнення.
:::

### Увімкнення DroneCAN

Для використання плати ARK Flow підключіть її до шини CAN Pixhawk та увімкніть драйвер UAVCAN, встановивши параметр [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) на `2` для динамічного призначення вузла (або `3`, якщо використовуєте [DroneCAN ESCs](../dronecan/escs.md)).

Кроки наступні:

- У _QGroundControl_ встановіть параметр [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) на `2` або `3` та перезавантажте (див. [Finding/Updating Parameters](../advanced_config/parameters.md)).
- Підключіть ARK Flow CAN до шини CAN Pixhawk.

Після активації модуль буде виявлено при завантаженні. Дані потоку повинні надходити з частотою 10 Гц.

Конфігурацію DroneCAN в PX4 пояснено більш детально в [DroneCAN > Enabling DroneCAN](../dronecan/index.md#enabling-dronecan).

### Конфігурація PX4

Потрібно встановити параметри оптичного потоку EKF для активації вимірювань оптичного потоку для розрахунку швидкості, встановити необхідні параметри [DroneCAN](index.md) та визначити зміщення, якщо датчик не знаходиться в центрі літального апарата.

Встановіть наступні параметри в _QGroundControl_:

- Увімкніть синтез оптичного потоку, встановивши [EKF2_OF_CTRL](../advanced_config/parameter_reference.md#EKF2_OF_CTRL).
- Щоб опціонально вимкнути підтримку GPS, встановіть [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL) на `0`.
- Увімкніть [UAVCAN_SUB_FLOW](../advanced_config/parameter_reference.md#UAVCAN_SUB_FLOW).
- Увімкніть [UAVCAN_SUB_RNG](../advanced_config/parameter_reference.md#UAVCAN_SUB_RNG).
- Встановіть [EKF2_RNG_A_HMAX](../advanced_config/parameter_reference.md#EKF2_RNG_A_HMAX) на `10`.
- Встановіть [EKF2_RNG_QLTY_T](../advanced_config/parameter_reference.md#EKF2_RNG_QLTY_T) на `0.2`.
- Встановіть [UAVCAN_RNG_MIN](../advanced_config/parameter_reference.md#UAVCAN_RNG_MIN) на `0.08`.
- Встановіть [UAVCAN_RNG_MAX](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX) на `30`.
- Встановіть [SENS_FLOW_MINHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MINHGT) на `0.08`.
- Встановіть [SENS_FLOW_MAXHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MAXHGT) на `25`.
- Встановіть [SENS_FLOW_MAXR](../advanced_config/parameter_reference.md#SENS_FLOW_MAXR) на `7.4`, щоб відповідав максимальній кутовій швидкості потоку PAW3902.
- Параметри [EKF2_OF_POS_X](../advanced_config/parameter_reference.md#EKF2_OF_POS_X), [EKF2_OF_POS_Y](../advanced_config/parameter_reference.md#EKF2_OF_POS_Y) та [EKF2_OF_POS_Z](../advanced_config/parameter_reference.md#EKF2_OF_POS_Z) можуть бути встановлені для врахування зміщення Ark Flow від центру мас транспортного засобу.

## Конфігурування потоку Ark

На ARK Flow можливо вам доведеться налаштувати наступні параметри:

| Параметр                                                                                        | Опис                           |
| ----------------------------------------------------------------------------------------------- | ------------------------------ |
| <a id="CANNODE_TERM"></a>[CANNODE_TERM](../advanced_config/parameter_reference.md#CANNODE_TERM) | Вбудована завершення шини CAN. |

## Значення LED індикаторів

Ви побачите як червоні, так і сині світлодіоди на ARK Flow коли він прошивається, і постійний синій світлодіод, якщо він працює належним чином.

Якщо ви бачите червоний світлодіод, це означає, що виникла помилка, і вам слід перевірити наступне:

- Переконайтеся, що у польотному контролері встановлено SD-картку.
- Переконайтеся, що Ark Flow має встановлене `ark_can-flow_canbootloader` перед тим, як прошивати `ark_can-flow_default`.
- Видаліть бінарні файли з кореневих та ufw директорій SD-карти та спробуйте зібрати та знову прошити.

## Відео

@[youtube](https://www.youtube.com/watch?v=SAbRe1fi7bU&list=PLUepQApgwSozmwhOo-dXnN33i2nBEl1c0)

<!-- ARK Flow with PX4 Optical Flow Position Hold: 20210605 -->

_PX4 утримує позицію за допомогою датчика потоку ARK для оцінки швидкості (у [Режим позиції](../flight_modes_mc/position.md))._
