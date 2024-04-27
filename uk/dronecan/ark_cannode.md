# ARK CANnode

[ARK CANnode](https://arkelectron.com/product/ark-cannode/) - це опенсорсний [DroneCAN](../dronecan/index.md) вузол, який включає 6 ступенів свободи IMU. Його основна мета - дозволити використання датчиків, що не є CAN (I2C, SPI, UART) на шині CAN. Також він має виходи PWM для розширення вихідних сигналів транспортного засобу за кількістю та фізичною відстанню.

![ARK CANnode](../../assets/hardware/can_nodes/ark_cannode.jpg)

## Де купити

Замовте цей модуль з:

- [Ark Electronics](https://arkelectron.com/product/ark-cannode/) (США)

## Характеристики обладнання

- [Open Source Schematic and BOM](https://github.com/ARK-Electronics/ARK_CANNODE)
- Датчики
  - Bosch BMI088 6-Axis IMU або Invensense ICM-42688-P 6-Axis IMU
- STM32F412CGU6 MCU
  - 1MB Flash
- Два роз'єми стандарту CAN для Pixhawk
  - 4-контактний JST-GH
- Роз'єм для налагодження стандарту Pixhawk I2C
  - 4-контактний JST-GH
- Стандартний коннектор UART/I2C для Pixhawk (Основний порт GPS)
  - 6-контактний JST-GH
- Роз'єм стандарту SPI для Pixhawk
  - 7-контактний JST-GH
- Коннектор PWM
  - 10-контактний JST-SH
  - 8 PWM виводів
  - Відповідно до схеми підключення штирьових роз'ємів Pixhawk 4 PWM
- Роз'єм для налагодження стандарту Pixhawk
  - 6-контактний JST-GH
- Малий форм-фактор
  - 3см x 3см x 1.3см
- LED індикатори
- USA Built
- Вимоги до живлення
  - 5В
  - Сила струму залежить від підключених пристроїв

## Налаштування обладнання

### Підключення

ARK CANnode підключений до шини CAN за допомогою стандартного кабелю JST GH з чотирма контактами Pixhawk. Для отримання додаткової інформації, зверніться до інструкцій з [проводки CAN](../can/index.md#wiring).

## Налаштування прошивки

ARK CANnode працює з [Прошивкою PX4 DroneCAN](px4_cannode_fw.md). Таким чином, він підтримує оновлення прошивки через шину CAN та [dynamic node allocation](index.md#node-id-allocation).

Плати ARK CANnode поставляються з останнім вбудованим програмним забезпеченням, але якщо ви хочете побудувати й прошити останнє програмне забезпечення самостійно, див. [PX4 DroneCAN Firmware > Building the Firmware](px4_cannode_fw.md#building-the-firmware).

- Ціль прошивки: `ark_cannode_default`
- Ціль завантажувача: `ark_cannode_canbootloader`

## Налаштування режиму польоту

### Увімкнення DroneCAN

Для використання плати ARK CANnode підключіть її до шини CAN Pixhawk та увімкніть драйвер DroneCAN, встановивши параметр [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) на `2` для динамічного призначення вузла (або `3`, якщо використовуєте [DroneCAN ESCs](../dronecan/escs.md)).

Кроки наступні:

- У _QGroundControl_ встановіть параметр [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) на `2` або `3` та перезавантажте (див. [Finding/Updating Parameters](../advanced_config/parameters.md)).
- Підключіть ARK CANnode CAN до Pixhawk CAN.

Після активації модуль буде виявлено при завантаженні.

Конфігурацію DroneCAN в PX4 пояснено більш детально в [DroneCAN > Enabling DroneCAN](../dronecan/index.md#enabling-dronecan).

### Увімкнення датчику

Вам потрібно буде увімкнути підписника, відповідного для кожного з сенсорів, які підключені до ARK CANnode.

Це робиться за допомогою параметрів, названих, наприклад, `UAVCAN_SUB_*` у посиланні на параметри (таких як [UAVCAN_SUB_ASPD](../advanced_config/parameter_reference.md#UAVCAN_SUB_ASPD), [UAVCAN_SUB_BARO](../advanced_config/parameter_reference.md#UAVCAN_SUB_BARO) тощо).

## Конфігурування CANNode Ark

На ARK CANnode вам може знадобитися налаштувати наступні параметри:

| Параметр                                                                                        | Опис                           |
| ----------------------------------------------------------------------------------------------- | ------------------------------ |
| <a id="CANNODE_TERM"></a>[CANNODE_TERM](../advanced_config/parameter_reference.md#CANNODE_TERM) | Вбудована завершення шини CAN. |

## Значення LED індикаторів

Ви побачите як червоні, так і сині світлодіоди на ARK CANnode, коли він прошивається, і сталий синій світлодіод, якщо він працює належним чином.

Якщо ви бачите червоний світлодіод, це означає, що виникла помилка, і вам слід перевірити наступне:

- Переконайтеся, що у польотному контролері встановлено SD-картку.
- Переконайтеся, що ARK CANnode має встановлене `ark_cannode_canbootloader` перед тим, як прошивати `ark_cannode_default`.
- Видаліть бінарні файли з кореневих та каталогів ufw SD-карти та спробуйте зібрати та знову прошити.
