# Holybro Pixhawk 4 Mini (Знято з виробництва)

:::warning PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://holybro.com/) щодо підтримки апаратного забезпечення або відповідності вимогам.
:::

Автопілот _Pixhawk<sup>&reg;</sup> 4 Mini_ розроблений для інженерів та любителів, які прагнуть використовувати потужність _Pixhawk 4_, але працюють з меншими дронами. _Pixhawk 4 Mini_ використовує FMU процесор та ресурси пам'яті _Pixhawk 4_, але виключає інтерфейси, які зазвичай не використовуються. Це дозволяє _Pixhawk 4 Mini_ бути достатньо малим, щоб поміститися у 250mm гоночний дрон.

_Pixhawk 4 Mini_ був спроєктований та розроблений у співпраці між Holybro<sup>&reg;</sup> та Auterion<sup>&reg;</sup>. Він заснований на стандарті дизайну [Pixhawk](https://pixhawk.org/) **FMUv5** та оптимізований для роботи на програмному забезпеченні управління польотом PX4.

![Pixhawk4 mini](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_iso_1.png)

:::tip
Цей автопілот [підтримується](../flight_controller/autopilot_pixhawk_standard.md) командами підтримки та тестування PX4.
:::

## Короткий опис

- Основний FMU Processor: STM32F765
  - 32 Bit Arm® Cortex®-M7, 216MHz, 2MB memory, 512KB RAM
- Бортові сенсори:
  - Accel/Gyro: ICM-20689
  - Accel/Gyro: BMI055 або ICM20602
  - Magnetometer: IST8310
  - Barometer: MS5611
- GPS: u-blox Neo-M8N GPS/GLONASS приймач; інтегрований магнетометр IST8310
- Інтерфейси:
  - 8 PWM виводів
  - 4 виділених PWM/Capture входи на FMU
  - Виділений R/C вхід для CPPM
  - Виділений R/C вхід для Spektrum / DSM та S.Bus з аналоговим / PWM RSSI входом
  - 3 загальних послідовних портів
  - 2 I2C порти
  - 3 SPI шини
  - 1 CAN шина для CAN ESC
  - Аналогові входи для напруги / струму з батареї
  - 2 додаткових аналогових входи
- Система живлення:
  - Вхід Power Brick: 4.75~5.5V
  - Вхід USB Power: 4.75~5.25V
  - Вхід Servo Rail: 0~24V
  - Максимальне вимірювання струму: 120A
- Вага та розміри:
  - Вага: 37.2g
  - Розміри: 38x55x15.5mm
- Інші характеристики:
  - Робоча температура: -40 ~ 85°c

Додаткову інформацію можна знайти у [_Технічному описі_ Pixhawk 4 Mini](https://github.com/PX4/PX4-user_guide/raw/v1.15/assets/flight_controller/pixhawk4mini/pixhawk4mini_technical_data_sheet.pdf).

## Де придбати

Замовляйте на [Holybro](https://holybro.com/collections/autopilot-flight-controllers/products/pixhawk4-mini).

## Інтерфейси

![Інтерфейси Pixhawk 4 Mini](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_interfaces.png)

:::warning
Порти **RC IN** та **PPM** призначені лише для RC приймачів. Вони працюють на електроживленні! НІКОЛИ не підключайте до них жодних сервоприводів, джерел живлення або батарей (або до будь-якого підключеного приймача).
:::

## Розводка

Завантажте схему розводки _Pixhawk 4 Mini_ [звідси](https://github.com/PX4/PX4-user_guide/raw/v1.15/assets/flight_controller/pixhawk4mini/pixhawk4mini_pinouts.pdf).

## Розміри

![Розміри Pixhawk 4 Mini](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_dimensions.png)

## Номінальна напруга

_Pixhawk 4 Mini_ може мати резервне живлення — якщо надаються два джерела живлення. Шини живлення: **POWER** та **USB**.

::: info Вихідна потужність **MAIN OUT** не живить плату політного контролера (і не живиться нею). Ви повинні [подати живлення](../assembly/quick_start_pixhawk4_mini.md#power) або на **POWER** або на **USB**, інакше плата буде знеживлена.
:::

**Максимальна напруга нормальної роботи**

За таких умов всі джерела живлення будуть використовуватися в цьому порядку для живлення системи:

1. **POWER** (4.75V до 5.5V)
1. **USB** вхід (4.75V до 5.25V)

**Абсолютна максимальна напруга**

За таких умов система залишиться неушкодженою.

1. **POWER** вхід (0V до 6V без пошкоджень)
1. **USB** вхід (0V до 6V без пошкоджень)
1. Вхід серводвигуна: контакт VDD_SERVO **MAIN OUT** (0V до 24V без пошкоджень)

## Збірка / налаштування

[_Pixhawk 4 Mini_ Швидкий старт з підключення](../assembly/quick_start_pixhawk4_mini.md) надає інструкції щодо збирання необхідних/важливих периферійних пристроїв, таких як GPS, плата управління живленням тощо.

## Збірка прошивки

:::tip
Більшості користувачів не потрібно збирати цю прошивку! Вона попередньо зібрана й автоматично встановлюється _QGroundControl_ при підключенні відповідного апаратного забезпечення.
:::

Щоб [зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make px4_fmu-v5_default
```

## Відладочний порт

[Системна консоль PX4](../debug/system_console.md) та [SWD interface](../debug/swd_debug.md) працюють на порту **FMU Debug**. Для доступу до цих портів користувач має зняти корпус _Pixhawk 4 Mini_.

![Pixhawk 4 Mini FMU Debug](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_fmu_debug.png)

Порт має стандартну послідовну схему розводки й може бути підключений до стандартного кабелю FTDI (3.3V, до 5V) або до [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation). Розводка використовує стандартну розводку [Pixhawk debug connector](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf). Будь ласка, зверніться до сторінки [підключення](../debug/system_console.md) щодо деталей того, як під'єднатися до цього порту.

## Зіставлення послідовних портів

|  UART  |   Device   | Опис параметра QGC |    Мітка порту на FC     |
|:------:|:----------:|:------------------:|:------------------------:|
| UART1  | /dev/ttyS0 |        GPS1        |        GPS Module        |
| USART2 | /dev/ttyS1 |       TELEM1       |          TELEM1          |
| USART3 | /dev/ttyS2 |       TELEM2       |           N/A            |
| UART4  | /dev/ttyS3 |   TELEM/SERIAL4    |        UART/l2C B        |
| USART6 | /dev/ttyS4 |        N/A         |          RC IN           |
| UART7  | /dev/ttyS5 |        N/A         |          Debug           |
| UART8  | /dev/ttyS6 |        N/A         | Not connected (no PX4IO) |

## Периферія

- [Цифровий датчик швидкості польоту](https://holybro.com/products/digital-air-speed-sensor)
- [Радіо модулі телеметрії](../telemetry/index.md)
- [Далекоміри / Датчики відстані](../sensor/rangefinders.md)

## Підтримувані платформи

Мотори та сервоприводи підключені до портів **MAIN OUT** в порядку, вказаному для вашого апарату в [Довіднику планерів](../airframes/airframe_reference.md). Цей довідник містить зіставлення портів виводу до моторів/сервоприводів для всіх підтримуваних повітряних та наземних шасі (якщо ваше шасі не вказане в довіднику, то використовуйте "загальний" планер відповідного типу).

:::warning
_Pixhawk 4 Mini_ не має AUX портів. Плата не може використовуватися з шасі, яким необхідно більше ніж 8 портів або які використовують AUX порти для моторів або керування. Вона може бути використана для планерів, які використовують AUX для другорядних периферійних пристроїв (наприклад, "feed-through of RC AUX1 channel").
:::

## Подальша інформація

- [Технічна інформація по _Pixhawk 4 Mini_](https://github.com/PX4/PX4-user_guide/raw/v1.15/assets/flight_controller/pixhawk4mini/pixhawk4mini_technical_data_sheet.pdf)
- [Довідник з дизайну розводки FMUv5](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).
