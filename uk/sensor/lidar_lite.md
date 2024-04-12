# Lidar-Lite

LIDAR-Lite це компактний, високопродуктивний оптичний сенсор віддаленого вимірювання для застосувань дронів, роботів або безпілотних транспортних засобів. Можна підключити до I2C або PWM.

![LidarLite v3](../../assets/hardware/sensors/lidar_lite/lidar_lite_v3.jpg)

## Де купити

- [LIDAR-Lite v3](https://buy.garmin.com/en-AU/AU/p/557294) (5cm - 40m)

## Схема розташування виводів

Схема підключення Lidar-Lite (v2, v3) показана нижче.

| Pin | Назва               | Опис                                                                                                                                  |
| --- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | POWER_IN            | Power supply. 4.75-5.5V DC Nominal, Maximum 6V DC.                                                                                    |
| 2   | POWER_EN            | Active high, enables operation of the 3.3V micro-controller regulator. Low puts board to sleep, draws <40 μA. (Internal 100K pull-up) |
| 3   | Mode Select Control | Provides trigger (high-low edge) PWM out (high)                                                                                       |
| 4   | SCL                 | I2C Clock                                                                                                                             |
| 5   | SDA                 | I2C Data                                                                                                                              |
| 6   | GND                 | Signal/power ground.                                                                                                                  |

## Wiring

_Lidar-Lite v3_ можна використовувати або з PWM або I2C. PWM рекомендується при використанні застарілої моделі. Дальномер повинен бути окремо живлений через деякий ESC/BEC (чи підключений через PWM або I2C).

::: info
Інтерфейс I2C пристроїв не синьої мітки Lidar-Lite (v1) має обмеження стабільності, тому всі покоління сенсорів Lidar-Lite сріблястої мітки виключені з інтерфейсу I2C.
Використання інтерфейсу ШІМ (як детально описано нижче) рекомендується для цих сенсорів.
Пристрої з синім маркуванням (v2) можуть мати постійне зміщення, якщо їх увімкнути з напругою менше 5 В за певних умов.
Це наразі (Q4/2015) перебуває на розгляді виробником і, можливо, може бути вирішено дотриманням конкретних робочих умов.
Рекомендоване міцне налаштування - це пристрій v1, який взаємодіє через PWM.
:::

Стандартні інструкції з підключення для Lidar-Lite 3 (з [Оперативного посібника](http://static.garmin.com/pumac/LIDAR_Lite_v3_Operation_Manual_and_Technical_Specifications.pdf)) показані нижче. Lidar-Lite v2 та v3 є однаковими, за винятком того, що порядок контактів у роз'ємі обернений (тобто це, ніби роз'єм був перевернутий).

![LidarLite v3 - Standard Wiring from Garmin Specification](../../assets/hardware/sensors/lidar_lite/lidar_lite2_standard_wiring_spec.jpg)

### Проводка інтерфейсу ШІМ

З'єднання контактів для підключення LidarLite до AUX-портів (інтерфейс PWM) _Pixhawk 1_ показані нижче.

| Pin | Lidar-Lite (v2, v3) | Pixhawk AUX Servo | Коментар                                                                                            |
| --- | ------------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| 1   | VCC                 | AUX 6 (center)    | Power supply. 4.75-5.5V DC Nominal, Maximum 6V DC.                                                  |
| 2   | RESET               | AUX 6 (bottom)    | Reset line of the sensor                                                                            |
| 3   | PWM                 | AUX 5 (bottom)    | PWM output of the Lidar Lite. **Needs a 470 Ohm pull-down (to GND), Do not use a 1 K0hm resistor.** |
| 4   | SCL                 | -                 | Not connected                                                                                       |
| 5   | SDA                 | -                 | Not connected                                                                                       |
| 6   | GND                 | AUX 6 (top)       | Ground                                                                                              |

:::info
На контролері польоту, у якого немає додаткового порту AUX, використовуються еквівалентні головні контакти (наприклад, вихід PWM на лідарі замість цього відображається на ГОЛОВНИЙ 5).
Номери пінів зафіксовані жорстко.
:::

Проводка для LidarLite v2 показана нижче. Lidar-Lite v3 підключений аналогічно, за винятком того, що нумерація контактів на роз'ємі є зворотною.

![Lidar Lite 2 Interface wiring](../../assets/hardware/sensors/lidar_lite/lidar_lite_2_interface_wiring.jpg)

![Lidar Lite 2 Interface wiring](../../assets/hardware/sensors/lidar_lite/lidarlite_wiring_scheme_pixhawk.jpg)

![Lidar Lite 2 pins/cabling](../../assets/hardware/sensors/lidar_lite/lidarlite_wiring_pins_cables.jpg)

### Проводка інтерфейсу I2C

Проводка I2C однакова для будь-якого іншого датчика відстані. Просто підключіть SLA, SLC, GND та VCC до відповідних (таких же) контактів на контролері польоту та сенсорі.

## Конфігурація програмного забезпечення

Дальномер/порт увімкнено за допомогою [SENS_EN_LL40LS](../advanced_config/parameter_reference.md#SENS_EN_LL40LS) - встановлено на `1` для PWM або на `2` для I2C.

:::info Драйвер для цього дальномера зазвичай присутній у вбудованому програмному забезпеченні. Якщо відсутній, вам також потрібно додати драйвер (`drivers/ll40ls`) до конфігурації плати.
:::

## Додаткова інформація

- [Посібник з експлуатації та технічні характеристики LIDAR_Lite_v3.pdf](http://static.garmin.com/pumac/LIDAR_Lite_v3_Operation_Manual_and_Technical_Specifications.pdf) (Garmin)
