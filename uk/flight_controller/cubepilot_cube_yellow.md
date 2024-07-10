# Контролер польоту CubePilot Cube Yellow

:::warning PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://cubepilot.org/#/home) щодо підтримки обладнання або питань сумісності.
:::

Контролер польоту Cube Yellow - це гнучкий автопілот, призначений в першу чергу для виробників комерційних систем.

![Cube Yellow](../../assets/flight_controller/cube/yellow/cube_yellow_hero.jpg)

Контролер призначений для використання зі специфічною для домену несучою платою, щоб зменшити кількість дротів, підвищити надійність і спростити збірку. Наприклад, несуча плата для комерційного інспекційного автомобіля може містити з'єднання для комп'ютера-компаньйона, тоді як несуча плата для гонщика може містити ESC для рами апарату.

Cube має віброізоляцію на двох IMU, з третім фіксованим IMU в якості еталонного/резервного.

:::tip
Документація виробника [Cube Docs](https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview) містить детальну інформацію, включаючи огляд [Різниця між Cube Colours](https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview#differences-between-cube-colours).
:::

## Основні характеристики

- 32bit STM32F777VI (32-бітний [ARM Cortex M7](https://en.wikipedia.org/wiki/ARM_Cortex-M#Cortex-M7), 400 MHz, Flash 2МБ, RAM 512 КБ).
- 32-бітний відмовостійкий співпроцесор STM32F103 <!-- check -->
- 14 ШІМ / серво виходів (8 з відмовостійкими і ручним керуванням, 6 допоміжних, сумісних з великими потужностями)
- Широкі можливості підключення додаткових периферійних пристроїв (UART, I2C, CAN)
- Інтегрована система резервного копіювання для відновлення в польоті та ручного керування з виділеним процесором та автономним джерелом живлення (для літаків з фіксованим крилом)
- Резервна система інтегрує систему мікшування, забезпечуючи узгоджені режими автопілота та ручного заміщення ( для літаків з фіксованим крилом)
- Резервні входи живлення та автоматичне перемикання на резервне джерело
- Зовнішній запобіжний вимикач
- Головний візуальний індикатор - багатоколірний світлодіод
- Потужний багатотональний п'єзозвуковий індикатор
- карта microSD для високошвидкісної фіксації даних протягом тривалого періоду часу

<a id="stores"></a>

## Де купити

- [Список реселерів](https://www.cubepilot.com/#/reseller/list)

## Монтаж

[Cube Wiring Quickstart](../assembly/quick_start_cube.md)

## Специфікації

- **Процесор:**
  - STM32F777VI (32-бітний [ARM Cortex M7](https://en.wikipedia.org/wiki/ARM_Cortex-M#Cortex-M7))
  - 400 МГц
  - 512 KB MB RAM
  - 2 MB Flash
- **Відмовостійкий співпроцесор:** <!-- inconsistent info on failsafe processor: 32 bit STM32F103 failsafe co-processor http://www.proficnc.com/all-products/191-pixhawk2-suite.html -->
  - STM32F100 (32біт _ARM Cortex-M3_)
  - 24 МГц
  - 8 KB SRAM
- **Датчики:** (всі підключені через SPI)
  - **Акселерометр:** (3) ICM20948, ICM20649, ICM20602
  - **Гіроскоп:** (3) ICM20948, ICM20649, ICM20602
  - **Компас:** (1) ICM20948
  - **Барометричний датчик тиску:** (2) MS5611
- **Умови експлуатації:**
  - **Робоча температура:** від -10C до 55C
  - **Степень захисту IP/Водонепроникність:** Не водонепроникний
  - **Вхідна напруга серворейки:** 3,3В / 5В
  - **Вхід USB-порту:**
    - Напруга: 4В - 5.7В
    - Номінальний струм: 250 мА
  - **POWER:**
    - Вхідна напруга: 4.1В - 5.7В
    - Номінальний вхідний струм: 2,5 А
    - Номінальна вхідна/вихідна потужність: 14 Вт
- **Розміри:**
  - **Cube:** 38.25 мм x 38.25 мм x 22.3 мм
  - **Carrier:** 94,5 мм x 44,3 мм x 17,3 мм
- **Інтерфейси**
  - Порти вводу-виводу: 14 ШІМ-виходів сервоприводів (8 від IO, 6 від FMU)
  - 5x UART (послідовні порти), один високої потужності, 2x з контролем потоку ГВП
  - 2x CAN (один з внутрішнім 3.3V трансивером, один на конекторі розширювача)
  - **Входи ПДУ (пульт дистанційного управління):**
    - Spektrum DSM / DSM2 / DSM-X® Satellite compatible вхід
    - Futaba S.BUS® вхід і вихід
    - Вхід сигналу PPM-SUM
  - Вхід RSSI (ШІМ або напруга)
  - I2C
  - SPI
  - 3.3В АЦП вхід
  - Внутрішній порт microUSB і розширення зовнішнього порту microUSB

## Розпіновки та схеми

Схеми плат та іншу документацію можна знайти тут: [Проект Cube](https://github.com/proficnc/The-Cube).

## Порти

### Верхня частина (GPS, TELEM тощо)

![Cube Ports - Top (GPS, TELEM etc) і Main/AUX](../../assets/flight_controller/cube/cube_ports_top_main.jpg)

## Зіставлення послідовних портів

| UART   | Пристрій   | Порт                     |
| ------ | ---------- | ------------------------ |
| USART2 | /dev/ttyS0 | TELEM1 (контроль потоку) |
| USART3 | /dev/ttyS1 | TELEM2 (контроль потоку) |
| UART4  | /dev/ttyS2 | GPS1                     |
| USART6 | /dev/ttyS3 | PX4IO                    |
| UART7  | /dev/ttyS4 | CONSOLE/ADSB-IN          |
| UART8  | /dev/ttyS5 | GPS2                     |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->
<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.15/boards/hex/cube-orange/default.px4board -->
<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.15/boards/hex/cube-orange/nuttx-config/nsh/defconfig#L194-L200 -->

### Відладочні порти

![Порти відладки Cube](../../assets/flight_controller/cube/cube_ports_debug.jpg)

### Порти USB/SDCard

![Cube USB/SDCard порти](../../assets/flight_controller/cube/cube_ports_usb_sdcard.jpg)

## Збірка прошивки

:::tip
Більшості користувачів не потрібно збирати цю прошивку! Вона попередньо зібрана і автоматично встановлюється за допомогою _QGroundControl_ при підключенні відповідного обладнання.
:::

Щоб [ зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make cubepilot_cubeyellow
```

## Проблеми

Розташування символів CAN1 і CAN2 на кубі перевернуте (CAN1 - це CAN2 і навпаки).

## Додаткова інформація/документація

- [Cube Wiring Quickstart](../assembly/quick_start_cube.md)
- Cube Docs (виробник):
  - [Огляд модуля Cube](https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview)
  - [Посібник користувача Cube](https://docs.cubepilot.org/user-guides/autopilot/the-cube-user-manual)
  - [Mini Carrier Board](https://docs.cubepilot.org/user-guides/carrier-boards/mini-carrier-board)
