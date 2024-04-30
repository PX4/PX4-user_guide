# ThePeach FCC-R1

:::warning
PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://thepeach.kr/) щодо підтримки апаратного забезпечення чи питань відповідності вимогам.
:::

**ThePeach FCC-R1** - це сучасний автопілот, розроблений і виготовлений в **ThePeach**.

Вона базується на **Pixhawk-проекті FMUv3** з відкритим апаратним забезпеченням і працює під управлінням **PX4** на **Nuttx OS**.

![ThePeach_R1](../../assets/flight_controller/thepeach_r1/main.png)

## Характеристики

- Основний процесор: STM32F427VIT6

  - 32-бітний ARM Cortex-M4, 168 МГц 256 КБ ОЗП 2 МБ флеш-пам'яті

- IO процесор: STM32F100C8T6

  - ARM Cortex-M3, 32 бітний ARM Cortex-M3, 24 МГц, 8КБ SRAM

- Бортові сенсори

  - Акселератор/гіроскоп: ICM-20602
  - Акселератор/гіроскоп/магнітометр: MPU-9250
  - Барометр: MS5611

- Інтерфейси

  - 8+6 PWM виходів (8 з IO, 6 з FMU)
  - Spektrum DSM / DSM2 / DSM-X Satellite сумісний вхід
  - Futaba S.BUS сумісний вхід та вихід
  - Вхід сигналу PPM sum
  - Аналоговий / PWM вхід RSSI
  - Вихід сервоприводу S.Bus
  - Запобіжний вимикач / LED
  - 4x UART: TELEM1, TELEM2(Raspberry Pi CM3+), GPS, SERIAL4
  - 1x I2C порт
  - 1x CAN шина
  - Аналогові входи для напруги / струму з 1 батареї

- Інтерфейси для Raspberry Pi CM3+

  - VBUS
  - DDR2 Connector: Raspberry Pi CM3+
  - 1x UART
  - 2x USB
  - 1x Raspberry Pi камера

- Деталі механічної частини
  - Розміри: 49.2 x 101 x 18.2мм
  - Вага: 100g

## З’єднання

![pinmap_top](../../assets/flight_controller/thepeach_r1/pinmap.png)

## Зіставлення послідовних портів

| UART   | Девайс     | Port                            |
| ------ | ---------- | ------------------------------- |
| USART1 | /dev/ttyS0 | Відладка процесора вводу-виводу |
| USART2 | /dev/ttyS1 | TELEM1 (керування потоком)      |
| USART3 | /dev/ttyS2 | TELEM2 (Raspberry pi cm3+)      |
| UART4  | /dev/ttyS3 | GPS1                            |
| USART6 | /dev/ttyS4 | PX4IO                           |
| UART7  | /dev/ttys5 | Debug console                   |
| UART8  | /dev/ttyS6 | TELEM4                          |

## Номінальна напруга

**Peach FCC-R1** може мати подвійне резервування живлення, якщо до нього під'єднано два джерела живлення. Шини живлення: **POWER** та **USB**.

Примітка:

1. The output power rails **FMU PWM OUT** and **I/O PWM OUT** do not power the flight controller board (and are not powered by it). You must supply power to one of **POWER** or **USB** or the board will be unpowered.
2. The USB do not power the **Raspberry Pi CM3+**. You must supply power to **POWER** or the Raspberry Pi CM3+ will be unpowered.

**Normal Operation Maximum Ratings**

Under these conditions, all power sources will be used in this order to power the system:

1. POWER input (5V to 5.5V)
2. USB input (4.75V to 5.25V)

**Absolute Maximum Ratings**

Under these conditions, all power sources cause permanent damage to the flight controller.

1. POWER input (5.5V Over)

2. USB input (5.5V Over)

## Building Firmware

To build PX4 for this target:

```jsx
make thepeach_r1_default
```

## Where to buy

Order from [ThePeach](http://thepeach.shop/)
