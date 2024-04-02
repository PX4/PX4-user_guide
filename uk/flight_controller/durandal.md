# Holybro Durandal

:::warning PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://holybro.com/) щодо підтримки обладнання або питань сумісності.
:::

_Durandal_<sup>&reg;</sup> є останньою оновленою версією успішної родини контролерів польоту від Holybro. Він був розроблений і розроблений Holybro.

![Durandal](../../assets/flight_controller/durandal/durandal_hero.jpg)

На високому рівні, основними функціями є:

- Інтегроване керування температурою для датчиків.
- Потужний мікроконтролер STM32H7 працює на 480МГц. 2 МБ відеопам'яті і 1 МБ ОЗП.
- Нові датчики з підвищеною стабільністю температури.
- Внутрішня система ізоляції вібрації.
- На платі є два високопродуктивних, малошумних ІМП (інерціальних вимірювачів кутової швидкості), призначених для вимогливих застосувань стабілізації.

Підсумок ключових функцій, [збірка](../assembly/quick_start_durandal.md)та [покупка](#purchase) можна знайти нижче.

:::note
Цей контролер польоту [підтримується виробником](../flight_controller/autopilot_manufacturer_supported.md).
:::

## Короткий опис

#### Технічні характеристики

- Головний FMU процесор: STM32H743
  - 32 Bit Arm ®️ Cortex®️ -M7, 480 MHz, 2MB пам'яті, 1 МБ ОЗУ
- IO Processor: STM32F100
  - 32 Bit Arm ®️ Cortex®️ -M3, 24MHz, 8KB SRAM
- Сенсори на платі
  - Accel/Gyro: ICM-20689
  - Accel/Gyro: BMI088 or ICM20602
  - Mag: IST8310
  - Барометр МS5611
- GPS: u-blox Neo-M8N GPS/ГЛОНАСС приймач; інтегрований магнетометр IST8310

#### Інтерфейси

- 8-13 PWM виходи сервоприводів (8 з IO, 5 з FMU)
- 6 спеціалізованих PWM/Capture входів на FMU
- Спеціалізований R/C вхід для Spektrum / DSM
- Спеціалізований R/C вхід для CPPM і S.Bus
- Спеціалізований S.Bus вихід і аналоговий / PWM RSSI
- 5 основних послідовних портів
  - 3 з повним контролем потоку
  - 1 з відокремленням 1.5A поточної межі
- 3 I2C порти
- 4 SPI buses
  - 1 внутрішній bus датчика високої швидкості SPI з 4 обраними чіпами і 6 DRDY
  - 1 внутрішній низько шумовий bus SPI виділений для XXX
  - Барометр з 2-ма чіпами, не DRDY
  - 1 внутрішній SPI bus, виділений для FRAM
  - Підтримує контроль температури, розташований на модулі сенсорів
  - 1 зовнішній bus SPI
- До 2 CANBuses для подвійного CAN
  - Кожен CANBus має окреме керування тихим контролером або ESC RX-MUX
- Аналогові входи для напруги / струму з 2 акумуляторів
- 2 додаткових аналогових входи

#### Електричні дані

- Вивід енергомодуля 4.9~5.5 В
- Максимальна вхідна напруга: 6 В
- Максимальний струм у значенні: 120 A
- Живлення USB: 4.75~5.25 В
- Вхід сервоприводу: 0~36 В

#### Механічні дані

- Розміри: 80x45x20.5мм
- Вага: 68.8g

#### Інші Характеристики

- Температура роботи: ~40~85C
- Температура зберігання: -40~85C
- CE
- FCC
- Сумісний із RoHS (без свинцю)

Більше інформації читайте в: [Durandal Technical Data Sheet](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Durandal_technical_data_sheet_90f8875d-8035-4632-a936-a0d178062077.pdf).

<a id="purchase"></a>

## Де купити

Замовляйте з [Holybro](https://holybro.com/collections/autopilot-flight-controllers/products/durandal).

<a id="connections"></a>

## З'єднання

Місця розташування портів/з'єднань показані тут (і нижче у розділі [виводів](#pinouts)).

### Верх

![Durandal - Top Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_top.jpg)

### Перед

![Durandal - Front Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_front.jpg)

### Тил

![Durandal - Back Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

### Праворуч

![Durandal - Right-side Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_right.jpg)

### Ліворуч

![Durandal - Left-side Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_left.jpg)

## Розміри

Усі розміри в міліметрах.

![Durandal Dimensions](../../assets/flight_controller/durandal/durandal_dimensions.jpg)

<!--
## Voltage Ratings

*Pixhawk 4* can be triple-redundant on the power supply if three power sources are supplied. The three power rails are: **POWER1**, **POWER2** and **USB**.

:::note
The output power rails **FMU PWM OUT** and **I/O PWM OUT** (0V to 36V) do not power the flight controller board (and are not powered by it).
You must supply power to one of **POWER1**, **POWER2** or **USB** or the board will be unpowered.
:::

**Normal Operation Maximum Ratings**

Under these conditions all power sources will be used in this order to power the system:
1. **POWER1** and **POWER2** inputs (4.9V to 5.5V)
1. **USB** input (4.75V to 5.25V)
-->

<!--
**Absolute Maximum Ratings**

Under these conditions the system will not draw any power (will not be operational), but will remain intact.
1. **POWER1** and **POWER2** inputs (operational range 4.1V to 5.7V, 0V to 10V undamaged)
1. **USB** input (operational range 4.1V to 5.7V, 0V to 6V undamaged)
1. Servo input: VDD_SERVO pin of **FMU PWM OUT** and **I/O PWM OUT** (0V to 42V undamaged)

-->

## Зборка/інсталяція

[Durandal Wiring Quick Start](../assembly/quick_start_durandal.md) надає інструкції щодо збирання необхідних/важливих периферійних пристроїв, таких як GPS, плата управління живленням тощо.

## Створення прошивки

:::tip
Більшості користувачів не потрібно свторювати цю прошивку! Вона запрограмована та автоматично встановлюється програмою _QGroundControl_, коли підключено відповідне обладнання.
:::

Щоб [зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make holybro_durandal-v1_default
```

## Зіставлення послідовних портів

| UART   | Пристрій   | Порт          |
| ------ | ---------- | ------------- |
| USART1 | /dev/ttyS0 | GPS1          |
| USART2 | /dev/ttyS1 | TELEM1        |
| USART3 | /dev/ttyS2 | TELEM2        |
| UART4  | /dev/ttyS3 | TELEM4/GPS2   |
| USART6 | /dev/ttyS4 | TELEM3        |
| UART7  | /dev/ttyS5 | Debug Console |
| UART8  | /dev/ttyS6 | PX4IO         |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

<a id="debug_port"></a>

## Дебаг Порт

The [PX4 System Console](../debug/system_console.md) and [SWD interface](../debug/swd_debug.md) run on the _Debug Port_.

The pinouts and connector comply with the [Pixhawk Debug Mini](../debug/swd_debug.md#pixhawk-debug-mini) interface defined in the [Pixhawk Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf).

For wiring and debugging information see the above links.

:::note
No Debug port is exposed for the I/O board.
:::

## Peripherals

- [Digital Airspeed Sensor](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html)
- [Telemetry Radio Modules](../telemetry/README.md)
- [Rangefinders/Distance sensors](../sensor/rangefinders.md)

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos.

The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## Pinouts

_Durandal_ pinouts are listed below. These can also be downloaded from [here](https://holybro.com/collections/autopilot-flight-controllers/products/Durandal-Pinouts).

### Top Pinouts

![Durandal - Top Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_top.jpg)

### Front Pinouts

![Durandal - Front Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_front.jpg)

#### SUBS Out port

| Pin        | Signal             | Volt  |
| ---------- | ------------------ | ----- |
| 1 (red)    | -                  | -     |
| 2 (yellow) | SBUS_OUT/RSSI_IN | +3.3V |
| 3 (black)  | GND                | GND   |

#### DSM RC port

| Pin        | Signal  | Volt  |
| ---------- | ------- | ----- |
| 1 (red)    | VDD_3V3 | +3.3V |
| 2 (yellow) | DSM_IN  | +3.3V |
| 3 (black)  | GND     | GND   |

#### I2C A port

| Pin       | Signal | Volt  |
| --------- | ------ | ----- |
| 1 (red)   | VCC    | +5V   |
| 2 (black) | SCL4   | +3.3V |
| 3 (black) | SDA4   | +3.3V |
| 4 (black) | GND    | GND   |

#### CAN1 port

| Pin       | Signal | Volt  |
| --------- | ------ | ----- |
| 1 (red)   | VCC    | +5V   |
| 2 (black) | CAN H  | +3.3V |
| 3 (black) | CAN L  | +3.3V |
| 4 (black) | GND    | GND   |

<a id="gps"></a>

#### GPS port

| Pin        | Signal              | Volt  |
| ---------- | ------------------- | ----- |
| 1 (red)    | VCC                 | +5V   |
| 2 (black)  | TX (out)            | +3.3V |
| 3 (black)  | RX (in)             | +3.3V |
| 4 (black)  | SCL1                | +3.3V |
| 5 (black)  | SDA1                | +3.3V |
| 6 (black)  | SAFETY_SWITCH       | +3.3V |
| 7 (black)  | SAFETY_SWITCH_LED | +3.3V |
| 8 (black)  | VDD_3V3             | +3.3V |
| 9 (black)  | BUZZER              | +5V   |
| 10 (black) | GND                 | GND   |

<a id="telem4_i2cb"></a>

#### TELEM4 I2CB ports

| Pin       | Signal   | Volt  |
| --------- | -------- | ----- |
| 1 (red)   | VCC      | +5V   |
| 2 (black) | TX (out) | +3.3V |
| 3 (black) | RX (in)  | -     |
| 4 (black) | SCL2     | -     |
| 5 (black) | SDA2     | +3.3V |
| 6 (black) | GND      | GND   |

<a id="telem1_2_3"></a>

#### TELEM3, TELEM2, TELEM1 port

| Pin       | Signal    | Volt  |
| --------- | --------- | ----- |
| 1 (red)   | VCC       | +5V   |
| 2 (black) | TX (out)  | +3.3V |
| 3 (black) | RX (in)   | +3.3V |
| 4 (black) | CTS (in)  | +3.3V |
| 5 (black) | RTS (out) | +3.3V |
| 6 (black) | GND       | GND   |

<a id="power"></a>

#### POWER port

| Pin       | Signal  | Volt  |
| --------- | ------- | ----- |
| 1 (red)   | VCC     | +5V   |
| 2 (black) | VCC     | +5V   |
| 3 (black) | CURRENT | +3.3V |
| 4 (black) | VOLTAGE | +3.3V |
| 5 (black) | GND     | GND   |
| 6 (black) | GND     | GND   |

### Back Pinouts

![Durandal - Back Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

#### MAIN Out

| Pin | Signal | Volt  | +         | -   |
| --- | ------ | ----- | --------- | --- |
| 1   | IO_CH1 | +3.3V | VDD_SERVO | GND |
| 2   | IO_CH2 | +3.3V | VDD_SERVO | GND |
| 3   | IO_CH3 | +3.3V | VDD_SERVO | GND |
| 4   | IO_CH4 | +3.3V | VDD_SERVO | GND |
| 5   | IO_CH5 | +3.3V | VDD_SERVO | GND |
| 6   | IO_CH6 | +3.3V | VDD_SERVO | GND |
| 7   | IO_CH7 | +3.3V | VDD_SERVO | GND |
| 8   | IO_CH8 | +3.3V | VDD_SERVO | GND |

#### AUX Out

| Pin | Signal  | Volt  | +         | -   |
| --- | ------- | ----- | --------- | --- |
| 1   | FMU_CH1 | +3.3V | VDD_SERVO | GND |
| 2   | FMU_CH2 | +3.3V | VDD_SERVO | GND |
| 3   | FMU_CH3 | +3.3V | VDD_SERVO | GND |
| 4   | FMU_CH4 | +3.3V | VDD_SERVO | GND |
| 5   | FMU_CH5 | +3.3V | VDD_SERVO | GND |

#### RC IN

| Pin | Signal           | Volt  |
| --- | ---------------- | ----- |
| S   | SBUS_IN/PPM_IN | +3.3V |
| +   | VCC              | +5V   |
| -   | GND              | GND   |

### Right-side Pinouts

![Durandal - Right-side Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_right.jpg)

#### CAN2 port

| Pin       | Signal | Volt  |
| --------- | ------ | ----- |
| 1 (red)   | VCC    | +5V   |
| 2 (black) | CAN H  | +3.3V |
| 3 (black) | CAN L  | +3.3V |
| 4 (black) | GND    | GND   |

#### CAP & ADC IN port

| Pin        | Signal         | Volt                     |
| ---------- | -------------- | ------------------------ |
| 1 (red)    | VCC            | +5V                      |
| 2 (black)  | FMU_CAP6       | +3.3V                    |
| 3 (black)  | FMU_CAP5       | +3.3V                    |
| 4 (black)  | FMU_CAP4       | +3.3V                    |
| 5 (black)  | FMU_CAP3       | +3.3V                    |
| 6 (black)  | FMU_CAP2       | +3.3V                    |
| 7 (black)  | FMU_CAP1       | +3.3V                    |
| 8 (black)  | ADC1_SPARE_1 | +3.3V [++](#warn_sensor) |
| 9 (black)  | ADC1_SPARE_2 | +6.6V [++](#warn_sensor) |
| 10 (black) | GND            | GND                      |

<a id="warn_sensor"></a>

:::warning
\++ Sensors connected to pins 8, 9 must not send a signal exceeding the indicated voltage.
:::

### Left-side Pinouts

![Durandal - Left-side Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_left.jpg)

<a id="debug_port"></a>

#### DEBUG port

| Pin       | Signal | Volt  |
| --------- | ------ | ----- |
| 1 (red)   | VT     | +3.3V |
| 2 (black) | TX     | +3.3V |
| 3 (black) | RX     | +3.3V |
| 4 (black) | SWDIO  | +3.3V |
| 5 (black) | SWCLK  | +3.3V |
| 6 (black) | GND    | GND   |

#### SPI port

| Pin       | Signal | Volt  |
| --------- | ------ | ----- |
| 1 (red)   | VCC    | +5V   |
| 2 (black) | SCK    | +3.3V |
| 3 (black) | MISO   | +3.3V |
| 4 (black) | MOSI   | +3.3V |
| 5 (black) | CS1    | +3.3V |
| 6 (black) | CS2    | +3.3V |
| 7 (black) | GND    | GND   |

#### USB port

| Pin       | Signal | Volt  |
| --------- | ------ | ----- |
| 1 (red)   | VBUS   | +5V   |
| 2 (black) | DM     | +3.3V |
| 3 (black) | DP     | +3.3V |
| 4 (black) | GND    | GND   |

## Further info

- [Durandal Wiring QuickStart](../assembly/quick_start_durandal.md)
- [Durandal Technical Data Sheet](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Durandal_technical_data_sheet_90f8875d-8035-4632-a936-a0d178062077.pdf)
- [Durandal Pinouts](https://holybro.com/collections/autopilot-flight-controllers/products/Durandal-Pinouts) (Holybro)
