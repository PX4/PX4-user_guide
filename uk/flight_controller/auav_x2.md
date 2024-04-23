# Автопілот AUAV-X2 (припинено)

<Badge type="error" text="Discontinued" />

:::warning
Цей політний контролер був [знятий з виробництва](../flight_controller/autopilot_experimental.md) і більше не продається комерційно.
:::

:::warning PX4 не виробляє цей (або будь-який) автопілот. Зверніться до [виробника](https://store.mrobotics.io/) щодо питань технічної підтримки або відповідності вимогам.
:::

Автопілот [AUAV<sup>®</sup>](http://www.auav.com/) _AUAV-X2_ базується на відкритому апаратному дизайні [Pixhawk<sup>&reg;</sup>-project](https://pixhawk.org/) **FMUv2**. Він виконує PX4 на ОС [NuttX](https://nuttx.apache.org/).

![AUAVX2_case2](../../assets/flight_controller/auav_x2/auavx2_case2.jpg)

## Короткий опис

- Основна System-on-Chip: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
  - Процесор: мікроконтролер ARM STM32F427VIT6 - Ревізія 3
  - ІО: мікроконтролер ARM STM32F100C8T6
- Датчики:
  - Invensense MPU9250 9DOF
  - Invensense ICM-20608 6DOF
  - MEAS MS5611 барометр
- Розміри/Вага
  - Розмір: 36мм х 50мм
  - Точки кріплення: 30,5 мм х 30,5 мм діаметр 3,2 мм
  - Вага: 10.9g
- Схема Power OR-ing з оберненою захистом від зворотної напруги. Необхідний модуль живлення 5V!

## Підключення

- 2.54 мм заголовки:
- GPS (USART4)
- i2c
- Вхід RC
- PPM вхід
- Вхідний спектр
- RSSI вхід
- вхід SBUS
- sBus вихід
- Вхід живлення
- Вихід зумера
- Вихід світлодіода
- 8 x Виводи сервоприводів
- 6 x Aux outputs
- USART7 (Консоль)
- USART8 (OSD)

## Доступність

Більше не у виробництві. Це було замінено [mRo X2.1](mro_x2.1.md). mRobotics є дистриб'ютором продукції AUAV з серпня 2017 року.

## Ключові посилання

- [Посібник користувача](http://arsovtech.com/wp-content/uploads/2015/08/AUAV-X2-user-manual-EN.pdf)
- [Пост про DIY дрони](http://diydrones.com/profiles/blogs/introducing-the-auav-x2-1-flight-controller)

## Посібник з підключення

![AUAV-X2-basic-setup 3](../../assets/flight_controller/auav_x2/auav_x2_basic_setup_3.png)

![AUAV-X2-basic-setup 2](../../assets/flight_controller/auav_x2/auav_x2_basic_setup_2.jpg)

![AUAV-X2-basic-setup 1](../../assets/flight_controller/auav_x2/auav_x2_basic_setup_1.png)

![AUAV-X2-airspeed-setup 3](../../assets/flight_controller/auav_x2/auav_x2_airspeed_setup_3.png)

## Креслення

Плата базується на проекті [Pixhawk](https://pixhawk.org/) відкритого апаратного забезпечення **FMUv2**.

- [Схема FMUv2 + IOv2](https://raw.githubusercontent.com/PX4/Hardware/master/FMUv2/PX4FMUv2.4.5.pdf) -- Схема та макет

:::info Як дизайн Open Hardware з ліцензією CC-BY-SA 3.0, всі схеми та файли дизайну доступні [тут](https://github.com/PX4/Hardware).
:::

## Зіставлення послідовних портів

| UART   | Пристрій   | Порт                       |
| ------ | ---------- | -------------------------- |
| UART1  | /dev/ttyS0 | IO debug                   |
| USART2 | /dev/ttyS1 | TELEM1 (керування потоком) |
| USART3 | /dev/ttyS2 | TELEM2 (керування потоком) |
| UART4  |            |                            |
| UART7  | CONSOLE    |                            |
| UART8  | SERIAL4    |                            |
