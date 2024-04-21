# Диспетчер польотів CUAV Nora

:::warning PX4 не виробляє цей (або будь-який) автопілот. Звертайтесь до [виробника](https://www.cuav.net) щодо питань апаратного забезпечення або питань відповідності.
:::

Контролер польоту [Nora](https://doc.cuav.net/flight-controller/x7/en/nora.html)<sup>&reg;</sup> - це високопродуктивний автопілот. Це ідеальний вибір для промислових дронів і великомасштабних важких дронів. В основному постачається комерційним виробникам.

![CUAV x7](../../assets/flight_controller/cuav_nora/nora.png)

Нора - це варіант CUAV X7. Він використовує інтегровану материнську плату (м'яку і тверду), що зменшує кількість внутрішніх роз'ємів польотного контролера, підвищує надійність і розміщує всі інтерфейси збоку (роблячи проводку більш лаконічною).

:::info Цей польотний контролер [підтримується виробником](../flight_controller/autopilot_manufacturer_supported.md).
:::

## Особливості

- Внутрішнє поглинання ударів
- Інтегрований процес зменшує відмову, спричинену пошкодженням інтерфейсу.
- Підтримка USB_HS, швидше завантаження журналів (PX4 ще не підтримується)
- Підтримка більшої кількості виходів dshot
- Підтримка нагріву IMU, покращення роботи датчика
- Виділений порт для акумулятора CAN
- 3 комплекти датчиків IMU
- Автомобільний компас RM3100
- Високопродуктивний процесор

:::tip
Виробник [CUAV Docs](https://doc.cuav.net/flight-controller/x7/en/nora.html) є канонічним посиланням для Nora. Вони повинні використовуватися за перевагою, оскільки вони містять найбільш повну та актуальну інформацію.
:::

## Короткий опис

- Головний FMU процесор: STM32H743
- Бортові сенсори:

  - Акселерометр/Гіроскоп: ICM-20689
  - Прискорювач/гіроскоп: ICM-20649
  - Акселерометр/Гіроскоп: BMI088
  - Магнітометр: RM3100
  - Барометр: MS5611\*2

- Інтерфейси:
  - 14 ШІМ-виходів （12 підтримує Dshot）
  - Підтримка декількох входів RC (SBU / CPPM / DSM)
  - Аналоговий / PWM вхід RSSI
  - 2 GPS порти (GPS і UART4 порти)
  - 4 шини i2c (два виділені порти i2c)
  - 2 порти CAN шини
  - 2 порти живлення (Power A - загальний інтерфейс адаптера, Power C - інтерфейс акумулятора DroneCAN)
  - 2 входи АЦП
  - 1 USB порт
- Система живлення:
  - Живлення: 4.3~5.4В
  - Вхід USB: 4.75~5.25В
  - Вхід сервоприводу: 0~36V
- Вага та розміри:
  - Вага: 101 g
- Інші характеристики:
  - Робоча температура: -20 ~ 80°c (виміряне значення)
  - Три імуси
  - Підтримка компенсації температури
  - Внутрішнє поглинання ударів

::: info
Коли він працює під управлінням прошивки PX4, працюють лише 8 ШІМ-виходів.
Решта 6 ШІМ-портів все ще адаптуються (тому на момент написання статті вони не сумісні з VOLT).
:::

## Де придбати

- [Магазин CUAV](https://store.cuav.net)<\br>
- [CUAV Aliexpress](https://www.aliexpress.com/item/4001042501927.html?gps-id=8041884&scm=1007.14677.110221.0&scm_id=1007.14677.110221.0&scm-url=1007.14677.110221.0&pvid=3dc0a3ba-fa82-43d2-b0b3-6280e4329cef&spm=a2g0o.store_home.promoteRecommendProducts_7913969.58)

## З'єднання (Проводка)

[Короткий посібник з підключення CUAV nora](https://doc.cuav.net/flight-controller/x7/en/quick-start/quick-start-nora.html)

## Розмір та роз'єми

![CUAV x7](../../assets/flight_controller/cuav_nora/nora-size.jpg)

![X7 pinouts](../../assets/flight_controller/cuav_nora/nora-pinouts.jpg)

:::warning
Порт `RCIN` призначено лише для живлення rc-приймача і його не можна підключати до жодного джерела живлення/навантаження.
:::

## Номінальна напруга

Nora AutoPilot\* може мати потрійне резервування джерела живлення, якщо до нього підключено три джерела живлення. Дві шини живлення: **POWERA**, **POWERC** і **USB**.

::: info The output power rails **PWM OUT** (0V to 36V) do not power the flight controller board (and are not powered by it). You must supply power to one of **POWERA**, **POWERC** or **USB** or the board will be unpowered.
:::

**Normal Operation Maximum Ratings**

Under these conditions all power sources will be used in this order to power the system:

1. **POWERA** and **POWERC** inputs (4.3V to 5.4V)
2. **USB** input (4.75V to 5.25V)

## Збірка прошивки

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by _QGroundControl_ when appropriate hardware is connected.
:::

Щоб [зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make cuav_nora_default
```

## Over Current Protection

The _Nora_ has over-current protection on the 5 Volt Peripheral and 5 Volt high power, which limits the current to 2.5A. The _Nora_ has short circuit protection.

:::warning
Up to 2.5 A can be delivered to the connectors listed as pin 1 (although these are only rated at 1 A).
:::

## Відладочний порт

The system's serial console and SWD interface operate on the **DSU7** port. Simply connect the FTDI cable to the DSU7 connector (the product list contains the CUAV FTDI cable).

The [PX4 System Console](../debug/system_console.md) and [SWD interface](../debug/swd_debug.md) operate on the **FMU Debug** port (`DSU7`).

The debug port (`DSU7`) uses a [JST BM06B](https://www.digikey.com.au/product-detail/en/jst-sales-america-inc/BM06B-GHS-TBT-LF-SN-N/455-1582-1-ND/807850) connector and has the following pinout:

| Pin     | Сигнал         | Вольтаж |
| ------- | -------------- | ------- |
| 1 (red) | 5V+            | +5V     |
| 2 (blk) | DEBUG TX (OUT) | +3.3V   |
| 3 (blk) | DEBUG RX (IN)  | +3.3V   |
| 4 (blk) | FMU_SWDIO      | +3.3V   |
| 5 (blk) | FMU_SWCLK      | +3.3V   |
| 6 (blk) | GND            | GND     |

CUAV provides a dedicated debugging cable, which can be connected to the `DSU7` port. This splits out an FTDI cable for connecting the [PX4 System Console](../debug/system_console.md) to a computer USB port, and SWD pins used for SWD/JTAG debugging. The provided debug cable does not connect to the SWD port `Vref` pin (1).

![CUAV Debug cable](../../assets/flight_controller/cuav_v5_plus/cuav_v5_debug_cable.jpg)

:::warning
The SWD Vref pin (1) uses 5V as Vref but the CPU is run at 3.3V!

Some JTAG adapters (SEGGER J-Link) will use the Vref voltage to set the voltage on the SWD lines. For direct connection to _Segger Jlink_ we recommended you use the 3.3 Volts from pin 4 of the connector marked `DSM`/`SBUS`/`RSSI` to provide `Vtref` to the JTAG (i.e. providing 3.3V and _NOT_ 5V).
:::

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## Подальша інформація

- [Quick start](https://doc.cuav.net/flight-controller/x7/en/quick-start/quick-start-nora.html)
- [CUAV docs](http://doc.cuav.net)
- [nora schematic](https://github.com/cuav/hardware/tree/master/X7_Autopilot)
