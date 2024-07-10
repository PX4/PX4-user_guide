# Holybro Pixhawk 4

:::warning PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://holybro.com/) щодо підтримки апаратного забезпечення або відповідності вимогам.
:::

_Pixhawk 4_<sup>&reg;</sup> це просунутий автопілот, розроблений та виготовлений у співпраці між Holybro<sup>&reg;</sup> та командою PX4. Він оптимізований для роботи з PX4 v1.7 та пізніших версій, і підходить для академічних та комерційних розробників.

Він базується на відкритому апаратному дизайні [Pixhawk-project](https://pixhawk.org/) **FMUv5** та виконує PX4 на операційній системі [NuttX](https://nuttx.apache.org/).

<img src="../../assets/flight_controller/pixhawk4/pixhawk4_hero_upright.jpg" width="200px" title="Pixhawk4 Upright Image" /> <img src="../../assets/flight_controller/pixhawk4/pixhawk4_logo_view.jpg" width="420px" title="Зображення Pixhawk4" />

:::tip
Цей автопілот [підтримується](../flight_controller/autopilot_pixhawk_standard.md) командами підтримки та тестування PX4.
:::

## Короткий опис

- Основний FMU Processor: STM32F765
  - 32 Bit Arm® Cortex®-M7, 216MHz, 2MB memory, 512KB RAM
- IO процесор: STM32F100
  - 32 Bit Arm® Cortex®-M3, 24MHz, 8KB SRAM
- Бортові сенсори:
  - Accel/Gyro: ICM-20689
  - Accel/Gyro: BMI055 або ICM20602
  - Magnetometer: IST8310
  - Barometer: MS5611
- GPS: u-blox Neo-M8N GPS/GLONASS приймач; інтегрований магнетометр IST8310
- Інтерфейси:
  - 8-16 PWM виводів (8 з IO, 8 з FMU)
  - 3 виділених PWM/Capture входи на FMU
  - Виділений R/C вхід для CPPM
  - Виділений R/C вхід для Spektrum / DSM та S.Bus з аналоговим / PWM RSSI входом
  - Виділений S.Bus серво вивід
  - 5 загальних послідовних портів
  - 3 I2C порти
  - 4 SPI шини
  - До 2 CAN шин для подвійного CAN з послідовним ESC
  - Аналогові входи для напруги / струму з 2 акумуляторів
- Система живлення:
  - Вивід модуля живлення: 4.9~5.5V
  - Живлення USB входу: 4.75~5.25V
  - Вхід сервоприводу: 0~36V
- Вага та розміри:
  - Вага: 15.8g
  - Розміри: 44x84x12мм
- Інші Характеристики:
  - Температура роботи: -40 ~ 85°c

Додаткову інформацію можна знайти в [Технічному довіднику Pixhawk 4](https://github.com/PX4/PX4-user_guide/raw/v1.15/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf).

## Де купити

Замовляйте на [Holybro](https://holybro.com/products/pixhawk-4).

## З’єднання

![Конектори Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4-connectors.jpg)

:::warning
Порти **DSM/SBUS RC** та **PPM RC** призначені лише для RC приймачів. Вони працюють на електроживленні! НІКОЛИ не підключайте до нього жодних сервоприводів, джерел живлення або батарей (або до будь-якого підключеного приймача).
:::

## Схема розташування виводів

Завантажте схему розташування виводів _Pixhawk 4_ [звідси](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Pixhawk4-Pinouts.pdf).

::: info Призначення контактів роз'ємів відбувається зліва направо (тобто Pin 1 - це найлівіший контакт). Виняток становить [порт(и) відладки](#debug_port) (pin 1 є найправішим, як показано нижче).
:::

## Налаштування послідовного порту

| UART   | Device     | Port                       |
| ------ | ---------- | -------------------------- |
| UART1  | /dev/ttyS0 | GPS                        |
| USART2 | /dev/ttyS1 | TELEM1 (керування потоком) |
| USART3 | /dev/ttyS2 | TELEM2 (керування потоком) |
| UART4  | /dev/ttyS3 | TELEM4                     |
| USART6 | /dev/ttyS4 | RC SBUS                    |
| UART7  | /dev/ttyS5 | Debug Console              |
| UART8  | /dev/ttyS6 | PX4IO                      |

## Розміри

![Розміри Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_dimensions.jpg)

## Номінальна напруга

_Pixhawk 4_ може мати потрійну резервність у джерелі живлення, якщо подаються три джерела живлення. Три шини живлення: **POWER1**, **POWER2** та **USB**.

::: info Вихідні потужності **FMU PWM OUT** та **I/O PWM OUT** (0V до 36V) не живлять плату політного контролера (і не живляться ним). Ви повинні подавати живлення на один з **POWER1**, **POWER2** або **USB**, інакше плата буде знеживлена.
:::

**Максимальна напруга нормальної роботи**

За таких умов всі джерела живлення будуть використовуватися в цьому порядку для живлення системи:

1. **POWER1** та **POWER2** входи (4.9V до 5.5V)
1. Вхід **USB** (4.75V до 5.25V)

**Абсолютна максимальна напруга**

За таких умов система не буде витрачати жодної потужності (не буде працювати), але залишиться неушкодженою.

1. **POWER1** та **POWER2** входи (робочий діапазон 4.1V до 5.7V, 0V до 10V без пошкоджень)
1. **USB** вхід (операційний діапазон 4.1V до 5.7V, 0V до 6V без пошкоджень)
1. Вхід серводвигуна: контакт VDD_SERVO **FMU PWM OUT** та **I/O PWM OUT** (0V до 42V без пошкоджень)

## Збірка / налаштування

[Швидкий старт з підключення Pixhawk 4](../assembly/quick_start_pixhawk4.md) надає інструкції щодо збірки необхідних/важливих периферійних пристроїв, включаючи GPS, плату управління живленням тощо.

## Збірка прошивки

:::tip
Більшості користувачів не потрібно збирати цю прошивку! Вона попередньо зібрана й автоматично встановлюється _QGroundControl_ при підключенні відповідного апаратного забезпечення.
:::

Щоб [ зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make px4_fmu-v5_default
```

<a id="debug_port"></a>

## Відладочний порт

[Системна консоль PX4](../debug/system_console.md) та [SWD interface](../debug/swd_debug.md) працюють на порту **FMU Debug**, тоді як отримати доступ до I/O console та SWD interface можна через порт **I/O Debug**. Для доступу до цих портів користувач має зняти корпус _Pixhawk 4_.

![Порти відладки Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_debug_port.jpg)

Розводка використовує стандартний [Pixhawk debug connector pinout](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf). Для отримання інформації про з'єднання дивіться:

- [Системна консоль > Порт відладки Pixhawk](../debug/system_console.md#pixhawk_debug_port)

## Периферія

- [Цифровий датчик швидкості польоту](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html)
- [Радіо модулі телеметрії](../telemetry/index.md)
- [Далекоміри / Датчики відстані](../sensor/rangefinders.md)

## Підтримувані платформи / шасі

Будь-який мультикоптер / літак / наземна платформа чи човен, який може керуватися звичайними RC сервоприводами або сервоприводами Futaba S-Bus. Повний перелік підтримуваних конфігурацій можна переглянути в розділі [Довідник планерів](../airframes/airframe_reference.md).

## Подальша інформація

- [Технічна інформація по Pixhawk 4](https://github.com/PX4/PX4-user_guide/raw/v1.15/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf)
- [Довідник по дизайну розводки FMUv5](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).
- [Швидке підключення Pixhawk 4](../assembly/quick_start_pixhawk4.md)
- [Розводка Pixhawk 4](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Pixhawk4-Pinouts.pdf) (Holybro)
- [Посібник по швидкому старту з Pixhawk 4](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Pixhawk4-quickstartguide.pdf) (Holybro)
