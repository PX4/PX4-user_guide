# Автопілот CUAV V5 nano

:::warning PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://store.cuav.net/) щодо питань технічної підтримки або відповідності вимогам.
:::

**V5 nano**<sup>&reg;</sup> є автопілотом для просторово обмежених застосувань, розробленим CUAV<sup>&reg;</sup>у співпраці з командою PX4.

Автопілот досить малий, щоб використовувати в гоночних дронах розміром 220 мм, але залишається достатньо потужним для більшості використань дрона.

![V5 nano - Hero image](../../assets/flight_controller/cuav_v5_nano/v5_nano_01.png)

:::info V5 nano подібний до [CUAV V5+](../flight_controller/cuav_v5_plus.md), але має форм-фактор все в одному, менше PWM-портів (не може бути використаний для [корпусів](../airframes/airframe_reference.md), які використовують AUX-порти), і не має внутрішнього демпфування.
:::

Деякі з його основних функцій включають:

- Повна сумісність зі стандартом проєкту [Pixhawk](https://pixhawk.org/) **FMUv5** і використовує [Pixhawk Connector Standard](https://pixhawk.org/pixhawk-connector-standard/) для всіх зовнішніх інтерфейсів.
- Більш продуктивний процесор, оперативна пам'ять та флеш-пам'ять, ніж у FMU v3, разом із більш стабільними та надійними датчиками.
- Прошивка сумісна з PX4.
- Велика відстань між контактами вводу/виводу 2,6 мм, що полегшує використання всіх інтерфейсів.

:::info Цей польотний контролер [підтримується виробником](../flight_controller/autopilot_manufacturer_supported.md).
:::

### Короткий опис

Основний процесор FMU: STM32F765◦32 Bit Arm® Cortex®-M7, 216MHz, 2MB пам'яті, 512KB RAM

- Сенсори на платі:

  - Акселератор/гіроскоп: ICM-20689
  - Акселератор/гіроскоп: ICM-20602
  - Акселератор/гіроскоп: BMI055
  - Магнітометр: IST8310
  - Барометр: MS5611

- Інтерфейси: 8 виходів PWM

  - 3 виділених PWM/Capture входи на FMU
  - Виділений R/C вхід для CPPM
  - Виділений вхід R/C для Spektrum / DSM і S.Bus
  - Аналоговий / PWM вхід RSSI
  - 4 загальних послідовних порти
  - 3 I2C порти
  - 4 SPI шини
  - 2 CAN шини
  - Аналогові входи для напруги / струму з батареї
  - 2 додаткових аналогових входи
  - Підтримка nARMED

- Система енергопостачання: вхід Power Brick: 4,75~5,5В
- Вхід USB Power: 4.75~5.25V

- Вага та розміри:
  - Розміри: 60\*40\*14mm
- Інші характеристики:
  - Робоча температура: -20 ~ 85°С (виміряне значення)

## Де купити

[Магазин CUAV](https://store.cuav.net/shop/v5-nano/)

[CUAV Aliexpress](https://www.aliexpress.com/item/33050770314.html?storeId=3257035&spm=2114.12010612.8148356.9.dbe6790bjW2hpH) (міжнародні користувачі)

[CUAV Taobao](https://item.taobao.com/item.htm?spm=a230r.1.14.8.26ab5258veQJRu&id=569404317857&ns=1&abbucket=13#detail) (користувачі з материкового Китаю)

::: info
Автопілот можна придбати з модулем Neo GPS в комплекті
:::

<a id="connection"></a>

## З'єднання (Проводка)

[V5 nano Wiring Quickstart](../assembly/quick_start_cuav_v5_nano.md)

## Схема розташування виводів

Завантажте схему розводки **V5 nano** [звідси](http://manual.cuav.net/V5-Plus.pdf).

## Збірка прошивки

:::tip
Більшості користувачів не потрібно збирати цю прошивку! Вона попередньо зібрана й автоматично встановлюється _QGroundControl_ при підключенні відповідного апаратного забезпечення.
:::

Щоб [зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make px4_fmu-v5_default
```

<a id="debug_port"></a>

## Відладочний порт

Системна консоль [PX4](../debug/system_console.md) та інтерфейс [SWD](../debug/swd_debug.md) працюють через порт **FMU Debug** (`DSU7`). Плата не має інтерфейсу відладки вводу/виводу.

![Debug port (DSU7)](../../assets/flight_controller/cuav_v5_nano/debug_port_dsu7.jpg)

Відладочний порт (`DSU7`) використовує роз'єм [JST BM06B](https://www.digikey.com.au/product-detail/en/jst-sales-america-inc/BM06B-GHS-TBT-LF-SN-N/455-1582-1-ND/807850) і має наступну розводку:

| Pin     | Сигнал         | Вольт |
| ------- | -------------- | ----- |
| 1 (red) | 5V+            | +5V   |
| 2 (blk) | DEBUG TX (OUT) | +3.3V |
| 3 (blk) | DEBUG RX (IN)  | +3.3V |
| 4 (blk) | FMU_SWDIO      | +3.3V |
| 5 (blk) | FMU_SWCLK      | +3.3V |
| 6 (blk) | GND            | GND   |

До комплекту поставки входить зручний відладочний кабель, який можна під'єднати до порту `DSU7`. Він розділяє кабель FTDI для підключення [PX4 System Console](../debug/system_console.md) до USB-порту комп'ютера і виводи SWD, які використовуються для налагодження SWD/JTAG. Відладочний кабель, що входить до комплекту, не підключається до контакту (1) порту SWD `Vref`.

![CUAV Debug cable](../../assets/flight_controller/cuav_v5_nano/cuav_nano_debug_cable.jpg)

:::warning
Вивід Vref SWD (1) використовує 5В як Vref, але процесор працює при напрузі 3,3В!

Деякі JTAG-адаптери (SEGGER J-Link) використовують напругу Vref для встановлення напруги на лініях SWD. Для прямого підключення до _Segger Jlink_ ми рекомендуємо використовувати 3,3 вольта з контакту 4 роз'єму з позначкою `DSM`/`SBUS`/`RSSI` для забезпечення `Vtref` на JTAG (тобто для забезпечення 3,3 В і _NOT_ 5 В).

За додатковою інформацією звертайтесь до розділу [Використання JTAG для апаратної налагодження](#using-jtag-for-hardware-debugging).
:::

## Зіставлення послідовних портів

| UART   | Пристрій   | Порт                           |
| ------ | ---------- | ------------------------------ |
| UART1  | /dev/ttyS0 | GPS                            |
| USART2 | /dev/ttyS1 | TELEM1 (керування потоком)     |
| USART3 | /dev/ttyS2 | TELEM2 (керування потоком)     |
| UART4  | /dev/ttyS3 | TELEM4                         |
| USART6 | /dev/ttyS4 | TX - RC-вхід з роз'єму SBUS_RC |
| UART7  | /dev/ttyS5 | Debug Console                  |
| UART8  | /dev/ttyS6 | Не підключено (без PX4IO)      |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

## Номінальна напруга

_V5 nano_ повинен живитися від роз'єму `Power` під час польоту, а також може живитися від `USB` для стендового тестування.

::: info Роз'єм `PM2` не може не використовуватися для живлення _V5 nano_ (див. [цей матеріал](#compatibility_pm2)).
:::

::: info Серворейка не живиться від FMU і не забезпечує його живленням. However, the pins marked **+** are all common, and a BEC may be connected to any of the servo pin sets to power the servo power rail.
:::

## Over Current Protection

The _V5 nano_ has no over current protection.

<a id="Optional-hardware"></a>

## Периферійні пристрої

- [Digital Airspeed Sensor](https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-16371268452.37.6d9f48afsFgGZI&id=9512463037)
- [Telemetry Radio Modules](https://cuav.taobao.com/category-158480951.htm?spm=2013.1.w5002-16371268426.4.410b7a821qYbBq&search=y&catName=%CA%FD%B4%AB%B5%E7%CC%A8)
- [Rangefinders/Distance sensors](../sensor/rangefinders.md)

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## Compatibility

CUAV adopts some differentiated designs and is incompatible with some hardware, which will be described below.

<a id="compatibility_gps"></a>

#### Neo v2.0 GPS not compatible with other devices

The _Neo v2.0 GPS_ that is recommended for use with _CUAV V5+_ and _CUAV V5 nano_ is not fully compatible with other Pixhawk flight controllers (specifically, the buzzer part is not compatible and there may be issues with the safety switch).

The UAVCAN [NEO V2 PRO GNSS receiver](http://doc.cuav.net/gps/neo-series-gnss/en/neo-v2-pro.html) can also be used, and is compatible with other flight controllers.

<a id="compatibility_jtag"></a>

#### Using JTAG for hardware debugging

`DSU7` FMU Debug Pin 1 is 5 volts - not the 3.3 volts of the CPU.

Some JTAG probes use this voltage to set the IO levels when communicating to the target.

For direct connection to _Segger Jlink_ we recommended you use the 3.3 Volts of DSM/SBUS/RSSI pin 4 as Pin 1 on the debug connector (`Vtref`).

<a id="compatibility_pm2"></a>

#### PM2 cannot power the flight controller

`PM2` can only measure battery voltage and current, but **not** power the flight controller.

:::warning
PX4 не підтримує цей інтерфейс.
:::

## Відомі проблеми

The issues below refer to the _batch number_ in which they first appear. The batch number is the four-digit production date behind V01 and is displayed on a sticker on the side of the flight controller. For example, the serial number Batch V011904((V01 is the number of V5, 1904 is the production date, that is, the batch number).

<a id="pin1_unfused"></a>

#### Інтерфейс SBUS / DSM / RSSI Pin1 не захищений від перевантаження

:::warning
Це питання безпеки.
:::

Please do not connect other equipment (except RC receiver) on SBUS / DSM / RSSI interface - this can lead to equipment damage!

- _Found:_ Batches V01190904xxxx
- _Fixed:_ Batches later than V01190904xxxx

## Додаткова інформація

- [V5 nano manual](http://manual.cuav.net/V5-nano.pdf) (CUAV)
- [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165) (CUAV)
- [CUAV Github](https://github.com/cuav) (CUAV)
- [Airframe build-log using CUAV v5 nano on a DJI FlameWheel450](../frames_multicopter/dji_f450_cuav_5nano.md)
