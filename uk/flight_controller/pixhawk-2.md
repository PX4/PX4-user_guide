# Польотний контролер Hex Cube Black

:::warning PX4 не виробляє цей (чи будь-який інший) автопілот. Звертайтесь до [виробника](https://cubepilot.org/#/home) щодо питань апаратного забезпечення або питань відповідності.
:::

:::tip
[Cube Orange](cubepilot_cube_orange.md) є наступником цього продукту. Ми проте рекомендуємо врахувати продукти, зроблені відповідно до стандартів галузі, таких як [Стандарти Pixhawk](autopilot_pixhawk_standard.md). Цей контролер польоту не дотримується стандарту і використовує патентований роз'єм.
:::

Контролер польоту [Hex Cube Black](http://www.proficnc.com/61-system-kits2) (раніше відомий як Pixhawk 2.1) - це гнучкий автопілот, призначений в першу чергу для виробників комерційних систем. Він базується на відкритому апаратному дизайні [Pixhawk-project](https://pixhawk.org/) **FMUv3** та запускає PX4 на операційній системі [NuttX](https://nuttx.apache.org/) OS.

![Cube Black](../../assets/flight_controller/cube/cube_black_hero.png)

Контролер призначений для використання зі специфічною для домену несучою платою, щоб зменшити кількість дротів, підвищити надійність і спростити збірку. Наприклад, несуча плата для комерційного інспекційного апарату може містити з'єднання для комп'ютера-компаньйона, в той час як несуча плата для гонщика може включати ESC з рами транспортного засобу.

Cube має віброізоляцію на двох ІВП, з третім фіксованим ІВП в якості еталонного/резервного.

::: info Документація ввід виробника [Cube Docs](https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview) містить детальну інформацію, включаючи огляд [Різниць між Cube Colours](https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview#differences-between-cube-colours).
:::

:::tip
Цей автопілот [підтримується](../flight_controller/autopilot_pixhawk_standard.md) командами підтримки та тестування PX4.
:::

## Ключові особливості

- 32bit STM32F427 [Cortex-M4F](http://en.wikipedia.org/wiki/ARM_Cortex-M#Cortex-M4)<sup>&reg;</sup> ядро з FPU
- 168 MHz / 252 MIPS
- 256 KB RAM
- 2 MB Flash \(повністю доступна\)
- 32 bit STM32F103 відмовостійкий співпроцесор
- 14 ШІМ / серво виходів (8 з відмовостійкими і ручним керуванням, 6 допоміжних, сумісних з великими потужностями)
- Широкі можливості підключення додаткових периферійних пристроїв (UART, I2C, CAN)
- Інтегрована система резервного копіювання для відновлення в польоті та ручного керування з виділеним процесором та автономним джерелом живлення (для літаків з фіксованим крилом)
- Резервна система інтегрує систему міксування, забезпечуючи узгоджені режими автопілота та ручного заміщення ( для літаків з фіксованим крилом)
- Резервні входи живлення та автоматичне перемикання на резервне джерело
- Зовнішній запобіжний вимикач
- Головний візуальний індикатор - мультиколірний світлодіод
- Потужний мультитональний п'єзозвуковий індикатор
- Карта microSD для високошвидкісної фіксації даних протягом тривалого періоду часу

<a id="stores"></a>

## Де придбати

[Cube Black](http://www.proficnc.com/61-system-kits) (ProfiCNC)

## Збірка

[Швидке підключення Cube](../assembly/quick_start_cube.md)

## Характеристики

### Процесор

- 32bit STM32F427 [Cortex M4](http://en.wikipedia.org/wiki/ARM_Cortex-M#Cortex-M4) ядро з FPU
- 168 MHz / 252 MIPS
- 256 KB RAM
- 2 MB Flash (повністю доступна)
- 32 bit STM32F103 відмовостійкий співпроцесор

### Сенсори

- TBA

### Інтерфейси

- 5x UART (послідовні порти), один високої потужності, 2x з контролем потоку HW
- 2x CAN (один з внутрішнім 3.3В трансивером, один на конекторі розширювача)
- Spektrum DSM / DSM2 / DSM-X® Satellite сумісний вхід
- Futaba S.BUS® сумісний вхід і вивід
- Вхід сигналу PPM sum
- Вхід RSSI (PWM або напруга)
- I2C
- SPI
- 3.3В АЦП вхід
- Внутрішній порт microUSB і розширення зовнішнього порту microUSB

### Система живлення та захист

- Ідеальний діодний контролер з автоматичним перемиканням на резервне живлення
- Сервопривід високої потужності (max. 10В) і сильного струму (10A+)
- Усі периферійні виводи захищені від перевантаження по струму, усі входи захищені від електростатичного розряду

### Номінальна напруга

Pixhawk може мати потрійну резервність у джерелі живлення, якщо подаються три джерела живлення. Три шини: вхід модуля живлення, вхід сервоприводу, вхід USB.

#### Максимальна напруга нормальної роботи

За таких умов всі джерела живлення будуть використовуватися в цьому порядку для живлення системи

- Вхід модуля живлення (4.8В до 5.4В)
- Вхід сервоприводу (4.8V to 5.4V) **ДО 10В ДЛЯ РУЧНОГО ПЕРЕКЛЮЧЕННЯ, АЛЕ АВТОПІЛОТ БУДЕ ЗНЕЖИВЛЕНИЙ ВИЩЕ 5.7В, ЯКЩО ВХІД МОДУЛЯ ЖИВЛЕННЯ ВІДСУТНІЙ**
- Вхід живлення USB (4.8В до 5.4В)

#### Абсолютна максимальна напруга

За таких умов система не буде витрачати жодної енергії (не буде працювати), але залишиться неушкодженою.

- Вхід модуля живлення (4.1В до 5.7В, 0В до 20В неушкоджений)
- Вхід сервоприводу (4.1В до 5.7В, 0В до 20В)
- Вхід живлення USB (4.1В до 5.7В, 0В до 6В)

## Pinouts and Schematics

Board schematics and other documentation can be found here: [The Cube Project](https://github.com/proficnc/The-Cube).

## Порти

### Top-Side (GPS, TELEM etc)

![Cube Ports - Top (GPS, TELEM etc) and Main/AUX](../../assets/flight_controller/cube/cube_ports_top_main.jpg)

<a id="serial_ports"></a>

### Serial Port Mapping

| UART   | Device     | Port                         |
| ------ | ---------- | ---------------------------- |
| USART1 | /dev/ttyS0 | <!-- IO debug? -->    |
| USART2 | /dev/ttyS1 | TELEM1 (flow control)        |
| USART3 | /dev/ttyS2 | TELEM2 (flow control)        |
| UART4  | /dev/ttyS3 | GPS1                         |
| USART6 | /dev/ttyS4 | PX4IO                        |
| UART7  | /dev/ttyS5 | CONSOLE                      |
| UART8  | /dev/ttyS6 | <!-- unknown -->      |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->
<!-- This originally said " **TEL4:** /dev/ttyS6 (ttyS4 UART):  **Note** `TEL4` is labeled as `GPS2` on Cube." -->

### Debug Ports

![Cube Debug Ports](../../assets/flight_controller/cube/cube_ports_debug.jpg)

### USB/SDCard Ports

![Cube USB/SDCard Ports](../../assets/flight_controller/cube/cube_ports_usb_sdcard.jpg)

## Збірка прошивки

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by _QGroundControl_ when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:

```
make px4_fmu-v3_default
```

## Проблеми

CAN1 and CAN2 silk screen on the Cube Black are flipped (CAN1 is CAN2 and vice versa).

## Додаткова інформація/документація

- [Cube Wiring Quickstart](../assembly/quick_start_cube.md)
- Cube Docs (Manufacturer):
  - [Cube Module Overview](https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview)
  - [Cube User Manual](https://docs.cubepilot.org/user-guides/autopilot/the-cube-user-manual)
  - [Mini Carrier Board](https://docs.cubepilot.org/user-guides/carrier-boards/mini-carrier-board)
