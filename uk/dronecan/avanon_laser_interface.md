# Інтерфейс лазерного альтиметра Avionics Anonymous DroneCan

::: info У 2022 році UAVCAN (v0) був форкнутий і підтримується як `DroneCAN`. Хоча цей продукт все ще згадує "UAVCAN", він повністю сумісний з підтримкою DroneCAN в PX4.
:::

Інтерфейс лазерного альтиметра Avionics Anonymous дозволяє підключати [ряд звичайних далекомірів](#supported_rangefinders) за допомогою шини CAN (це надійніший інтерфейс, ніж I2C).

![Avionics Anonymous Laser Altimeter DroneCAN Interface](../../assets/hardware/sensors/avionics_anon_uavcan_alt_interface/avionics_anon_altimeter_uavcan_interface.jpg)

## Де придбати

- [AvAnon Laser Interface](https://www.tindie.com/products/avionicsanonymous/uavcan-laser-altimeter-interface/)

<a id="supported_rangefinders"></a>

## Підтримувані далекоміри

Повний список підтримуваних далекомірів можна знайти за посиланням вище.

Наступні далекоміри підтримуються на момент написання:

- Lightware SF30/D
- Lightware SF10/a
- Lightware SF10/b
- Lightware SF10/c
- Lightware SF11/c
- Lightware SF/LW20/b
- Lightware SF/LW20/c

## Встановлення обладнання

### Підключення

Далекомір (лазер) підключений до плати інтерфейсу AvAnon, яка підключена до одного з CAN-портів вашого автопілота. Проводка відбувається згідно з виведенням контактів вище, або необхідні кабелі можна придбати, щоб підключити їх безпосередньо до вашої системи. Ці продукти доступні за посиланнями [тут](https://www.tindie.com/products/avionicsanonymous/uavcan-laser-altimeter-interface/).

Інтерфейсна плата забезпечує фільтрований вихід живлення для лазера, але не забезпечує власного регулювання. Отже, лазер повинен бути сумісним з напругою, яка подається на плату.

### Розпіновка

### Конектор шини CAN

| Pin | Назва    | Опис                                                                                             |
| --- | -------- | ------------------------------------------------------------------------------------------------ |
| 1   | POWER_IN | Джерело живлення. Підтримується 4.0-5.5В, але також повинно бути сумісним з підключеним лазером. |
| 2   | TX/SCL   | TX для послідовного режиму, Clock для режиму I2C.                                                |
| 3   | RX/SDA   | RX для послідовного режиму, Data для режиму I2C.                                                 |
| 4   | GND      | Заземлення сигналу/напруги.                                                                      |

### З'єднувач лазеру

| Pin | Назва     | Опис                                              |
| --- | --------- | ------------------------------------------------- |
| 1   | POWER_OUT | Фільтрована потужність при напрузі живлення.      |
| 2   | CAN+      | TX для послідовного режиму, Clock для режиму I2C. |
| 3   | RX/SDA    | RX для послідовного режиму, Data для режиму I2C.  |
| 4   | GND       | Заземлення сигналу/напруги.                       |

## Налаштування PX4

Для увімкнення лазерного альтиметра вам необхідно [встановити наступні параметри](../advanced_config/parameters.md) (у QGroundControl):

- Увімкніть DroneCAN, встановивши [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) не нульовим.
- Увімкніть підписку на лазерний далекомір DroneCAN, встановивши [UAVCAN_SUB_RNG](../advanced_config/parameter_reference.md#UAVCAN_SUB_RNG)
- Встановіть мінімальний та максимальний діапазон далекоміра, використовуючи [UAVCAN_RNG_MIN](../advanced_config/parameter_reference.md#UAVCAN_RNG_MIN) та [UAVCAN_RNG_MAX](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX).
