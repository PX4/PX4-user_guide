# Holybro Pixhawk 4

:::warning PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://holybro.com/) щодо підтримки апаратного забезпечення або відповідності вимогам.
:::

_Pixhawk 4_<sup>&reg;</sup> це просунутий автопілот, розроблений та виготовлений у співпраці між Holybro<sup>&reg;</sup> та командою PX4. Він оптимізований для роботи з PX4 v1.7 та пізніших версій, і підходить для академічних та комерційних розробників.

Він базується на відкритому апаратному дизайні [Pixhawk-project](https://pixhawk.org/) **FMUv5** та виконує PX4 на операційній системі [NuttX](https://nuttx.apache.org/).

<img src="../../assets/flight_controller/pixhawk4/pixhawk4_hero_upright.jpg" width="200px" title="Pixhawk4 Upright Image" /> <img src="../../assets/flight_controller/pixhawk4/pixhawk4_logo_view.jpg" width="420px" title="Pixhawk4 Image" />

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

Додаткову інформацію можна знайти в [Технічному довіднику Pixhawk 4](https://github.com/PX4/PX4-user_guide/raw/main/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf).

## Де купити

Замовляйте на [Holybro](https://holybro.com/products/pixhawk-4).

## З’єднання

![Pixhawk 4 connectors](../../assets/flight_controller/pixhawk4/pixhawk4-connectors.jpg)

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

![Pixhawk 4 Dimensions](../../assets/flight_controller/pixhawk4/pixhawk4_dimensions.jpg)

## Voltage Ratings

_Pixhawk 4_ can be triple-redundant on the power supply if three power sources are supplied. The three power rails are: **POWER1**, **POWER2** and **USB**.

::: info The output power rails **FMU PWM OUT** and **I/O PWM OUT** (0V to 36V) do not power the flight controller board (and are not powered by it). You must supply power to one of **POWER1**, **POWER2** or **USB** or the board will be unpowered.
:::

**Normal Operation Maximum Ratings**

Under these conditions all power sources will be used in this order to power the system:

1. **POWER1** and **POWER2** inputs (4.9V to 5.5V)
1. **USB** input (4.75V to 5.25V)

**Absolute Maximum Ratings**

Under these conditions the system will not draw any power (will not be operational), but will remain intact.

1. **POWER1** and **POWER2** inputs (operational range 4.1V to 5.7V, 0V to 10V undamaged)
1. **USB** input (operational range 4.1V to 5.7V, 0V to 6V undamaged)
1. Servo input: VDD_SERVO pin of **FMU PWM OUT** and **I/O PWM OUT** (0V to 42V undamaged)

## Assembly/Setup

The [Pixhawk 4 Wiring Quick Start](../assembly/quick_start_pixhawk4.md) provides instructions on how to assemble required/important peripherals including GPS, Power Management Board etc.

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by _QGroundControl_ when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:

```
make px4_fmu-v5_default
```

<a id="debug_port"></a>

## Debug Port

The [PX4 System Console](../debug/system_console.md) and [SWD interface](../debug/swd_debug.md) run on the **FMU Debug** port, while the I/O console and SWD interface can be accessed via **I/O Debug** port. In order to access these ports, the user must remove the _Pixhawk 4_ casing.

![Pixhawk 4 Debug Ports](../../assets/flight_controller/pixhawk4/pixhawk4_debug_port.jpg)

The pinout uses the standard [Pixhawk debug connector pinout](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf). For wiring information see:

- [System Console > Pixhawk Debug Port](../debug/system_console.md#pixhawk_debug_port)

## Peripherals

- [Digital Airspeed Sensor](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html)
- [Telemetry Radio Modules](../telemetry/index.md)
- [Rangefinders/Distance sensors](../sensor/rangefinders.md)

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## Further info

- [Pixhawk 4 Technical Data Sheet](https://github.com/PX4/PX4-user_guide/raw/main/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf)
- [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).
- [Pixhawk 4 Wiring QuickStart](../assembly/quick_start_pixhawk4.md)
- [Pixhawk 4 Pinouts](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Pixhawk4-Pinouts.pdf) (Holybro)
- [Pixhawk 4 Quick Start Guide](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Pixhawk4-quickstartguide.pdf) (Holybro)
