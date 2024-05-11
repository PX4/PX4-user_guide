# Pixhack V3

:::warning PX4 не виробляє цей (чи будь-який інший) автопілот. Звертайтесь до [виробника](https://store.cuav.net/) щодо питань апаратного забезпечення або питань відповідності.
:::

Контролер польоту CUAV _Pixhack V3_ є гнучким автопілотом, призначеним в основному для виробників комерційних систем.

Плата є варіантом контролера польоту SOLO Pixhawk<sup>&reg;</sup> 2 (PH2), який, в свою чергу, базується на [Pixhawk-project](https://pixhawk.org/) відкритому апаратному дизайні **FMUv3**. Він працює з PX4 на ОС [NuttX](https://nuttx.apache.org/), і повністю сумісний з прошивкою PX4 або ArduPilot<sup>&reg;</sup> (APM).

_Pixhack V3_ має значні поліпшення щодо оригінального дизайну, включаючи краще розташування інтерфейсу та додавання системи поглинання вібрації та термостата.

![Pixhack v3](../../assets/flight_controller/pixhack_v3/pixhack_v3_157_large_default.jpg)

::: info Цей контролер польоту [підтримується виробником](../flight_controller/autopilot_manufacturer_supported.md).
:::

## Короткий опис

- Мікропроцесор:
  - STM32F427
  - STM32F100 (відмовостійкий співпроцесор)
- Датчики:
  - Акселерометри (3): LS303D, MPU6000, MPU9250/hmc5983
  - Гіроскопи (3): L3GD20, MPU6000, MPU9250
  - Компаси (2): LS303D, MPU9250
  - Барометри (2): MS5611 X2
- Інтерфейси:
  - MAVLink UART (2)
  - GPS UART (2)
  - DEBUG UART (1)
  - RC IN (для PPM, SBUS, DSM/DSM2)
  - RSSI IN: PWM OR 3.3ADC
  - I2C (2)
  - CAN BUS (1)
  - ADC IN: 3.3В X1 , 6.6В X1
  - PWM OUT: 8 PWM IO + 4 IO
- Система живлення:
  - PM POWER IN: 4.5 ~ 5.5 В
  - USB POWER IN: 5.0 В +- 0.25В
- Вага та розміри:
  - Вага: 63г
  - Ширина: 68мм
  - Товщина: 17мм
  - Довжина: 44мм
- Інші характеристики:
  - Температура роботи: -20 ~ 60°C

## Доступність

Плату можна придбати з:

- [store.cuav.net](http://store.cuav.net/index.php?id_product=8&id_product_attribute=0&rewrite=pixhack-v3-autopilot&controller=product&id_lang=3)
- [leixun.aliexpress.com/store](https://leixun.aliexpress.com/store)

## Створення прошивки

:::tip
Більшості користувачів не потрібно створювати цю прошивку! Вона попередньо зібрана і автоматично встановлюється за допомогою _QGroundControl_ при підключенні відповідного обладнання.
:::

Щоб [зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make px4_fmu-v3_default
```

## Розпіновки та схеми

- [Документація/посібники з написання](http://doc.cuav.net/flight-controller/pixhack/en/pixhack-v3.html)

## Зіставлення послідовних портів

| UART   | Device     | Port                  |
| ------ | ---------- | --------------------- |
| UART1  | /dev/ttyS0 | IO debug              |
| USART2 | /dev/ttyS1 | TELEM1 (flow control) |
| USART3 | /dev/ttyS2 | TELEM2 (flow control) |
| UART4  |            |                       |
| UART7  | CONSOLE    |                       |
| UART8  | SERIAL4    |                       |
