# Контролер польоту Holybro pix32 (знято з виробництва)

:::warning PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://holybro.com/) щодо підтримки апаратного забезпечення чи проблем сумісності.
:::

Автопілот Holybro<sup>&reg;</sup> [pix32](https://holybro.com/collections/autopilot-flight-controllers/products/pix32pixhawk-flight-controller) (також відомий як "Pixhawk 2", і раніше як HKPilot32) базується на відкритому апаратному дизайні [Pixhawk<sup>&reg;</sup>-project](https://pixhawk.org/) модуль **FMUv2**. Ця плата базується на апаратній версії Pixhawk 2.4.6. Він запускає стек польоту PX4 на ОС [NuttX](https://nuttx.apache.org/).

![pix32](../../assets/flight_controller/holybro_pix32/pix32_hero.jpg)

Як ліцензований Open Hardware дизайн CC-BY-SA 3.0, схеми та файли дизайну повинні бути [доступні тут](https://github.com/PX4/Hardware).

:::tip
Holybro pix32 сумісний з програмним забезпеченням [3DR Pixhawk 1](../flight_controller/pixhawk.md). Це несумісний з'єднувач, але фізично дуже схожий на 3DR Pixhawk або mRo Pixhawk.
:::

::: info Цей контролер польоту [підтримується виробником](../flight_controller/autopilot_manufacturer_supported.md).
:::

## Основні характеристики

- Основна System-on-Chip: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
  - Процесор: 32-розрядний ядро STM32F427 Cortex<sup>&reg;</sup> M4 з FPU
  - ОЗП: 168 МГц/256 КБ
  - Flash: 2 МБ
- Failsafe System-on-Chip: STM32F103
- Сенсори:
  - ST Micro L3GD20 3-axis 16-бітний гіроскоп
  - ST Micro LSM303D 3-вісний 14-бітний акселерометр / магнітометр
  - Invensense<sup>&reg;</sup> MPU 6000 3-вісний акселерометр/гіроскоп
  - MEAS MS5611 барометр
- Розміри/Вага
  - Розмір: 81x44x15 мм
  - Вага: 33.1гр
- GPS: u-blox<sup>&reg;</sup> супер точний Neo-7M з компасом
- Вхідна напруга: 2~10s (7.4~37V)

### Підключення

- 1x I2C
- 2x CAN
- 3.3 та 6.6V ADC входи
- 5x UART (послідовні порти), один високої потужності, 2x з контролем потоку HW
- Вхід, сумісний з приймачами Spektrum DSM / DSM2 / DSM-X® Satellite до DX8 (DX9 та вище не підтримуються)
- Futaba<sup>&reg;</sup> S.BUS сумісний вхід та вихід
- Сигнал суми PPM
- Вхід RSSI (PWM або напруга)
- SPI
- Зовнішній порт microUSB
- Раз'єми Molex PicoBlade

## Де придбати

[shop.holybro.com](https://holybro.com/collections/autopilot-flight-controllers/products/pix32pixhawk-flight-controller)

### Аксесуари

- [Цифровий датчик швидкості польоту](https://holybro.com/products/digital-air-speed-sensor)
- [Hobbyking<sup>&reg;</sup> Wifi телеметрія](https://hobbyking.com/en_us/apm-pixhawk-wireless-wifi-radio-module.html)
- [HolyBro SiK Telemetry Radio (EU 433 MHz, US 915 MHz)](../telemetry/holybro_sik_radio.md)

## Створення прошивки

:::tip
Більшості користувачів не потрібно створювати цю прошивку! Вона попередньо зібрана і автоматично встановлюється за допомогою _QGroundControl_ при підключенні відповідного обладнання.
:::

Щоб [ зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make px4_fmu-v3_default
```

## Дебаг Порт

Дивіться [3DR Pixhawk 1 > Налагодження портів](../flight_controller/pixhawk.md#debug-ports).

## Розпіновки та схеми

Плата базується на [Pixhawk проекті](https://pixhawk.org/) відкритого апаратного забезпечення **FMUv2**.

- [FMUv2 + IOv2 схема](https://raw.githubusercontent.com/PX4/Hardware/master/FMUv2/PX4FMUv2.4.5.pdf) -- Схема та макет

::: info Як дизайн Open Hardware з ліцензією CC-BY-SA 3.0, всі схеми та файли дизайну доступні [тут](https://github.com/PX4/Hardware).
:::

## Налаштування послідовного порту

| UART   | Пристрій   | Порт                       |
| ------ | ---------- | -------------------------- |
| UART1  | /dev/ttyS0 | IO debug                   |
| USART2 | /dev/ttyS1 | TELEM1 (керування потоком) |
| USART3 | /dev/ttyS2 | TELEM2 (керування потоком) |
| UART4  |            |                            |
| UART7  | КОНСОЛЬ    |                            |
| UART8  | SERIAL4    |                            |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->
