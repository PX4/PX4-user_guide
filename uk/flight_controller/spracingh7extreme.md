# SPRacingH7EXTREME (Версія PX4)

:::warning PX4 не виробляє цей (або будь-який) автопілот. Зверніться до [виробника](https://shop.seriouslypro.com) щодо підтримки апаратного забезпечення чи відповідності вимогам. :::

[SPRacingH7EXTREME](https://shop.seriouslypro.com/sp-racing-h7-extreme) - це функціонально навантажене FC/PDB з подвійними гіроскопами ICM20602, процесором H7 400/480МГц(+), високоточним барометром BMP388, роз'ємом для SD-карти, датчиком струму, 8 легко доступними виходами для двигунів, OSD, мікрофоном, аудіовиходом та багато іншого.

Це може бути легко використовувати для невеликих і великих квадрокоптерів, літаків, восьмикоптерів та більш розвинених конструкцій. Найкраще використовувати з окремими ESC, оскільки він має вбудовану плату розподілу живлення (PDB). Підключення 4in1 ESC також легко.

Також є 12-контактний стековий роз’єм, який забезпечує ще 4 виходи двигуна, підключення SPI та UART.

![SPRacingH7EXTREME PCB Top](../../assets/flight_controller/spracingh7extreme/spracingh7extreme-top.jpg)

![SPRacingH7EXTREME PCB Bottom](../../assets/flight_controller/spracingh7extreme/spracingh7extreme-bottom.jpg)

:::info Цей польотний контролер [підтримується виробником](../flight_controller/autopilot_manufacturer_supported.md). :::

## Основні характеристики

- Основна System-on-Chip: [STM32H750VBT6 rev.y/v](https://www.st.com/en/microcontrollers-microprocessors/stm32h750vb.html)
  - CPU: 400/480Mhz(+) ARM Cortex M7 з одинарною точністю FPU. (+ 480МГц з процесорами Rev V)
  - RAM: 1MB
  - 16MB External Flash 4-bit QuadSPI в режимі Memory Mapped для коду _та_ конфігурації.
- Бортові сенсори:
  - Dual Gyros (1xSPI кожен, з окремими сигналами переривань, 32khz capable, fsync capable)
  - Високоточний барометр BMP388 (I2C + переривання)
  - Датчик струму 110A
- GPS через зовнішній 8-контактний IO порт.
- Audio/Visual
  - On-screen display OSD (dedicated SPI, character based, MAX7456)
  - Датчик мікрофона
  - Аудіо вивід з CPU DAC.
  - Аудіо мікшер для виводів мікрофона/DAC.
- Інтерфейси
  - SD Card (4-bit SDIO not 1-bit SPI)
  - Інфрачервоний транспондер (сумісний з iLAP)
  - Buzzer circuitry
  - RSSI (Analog/PWM)
  - 12 motor outputs (4 by motor pads, 4 in the middle, and 4 on stacking connector).
  - 1x SPI breakout onto stacking connector
  - 6 послідовних портів (5x TX та RX, 1x TX-only двосторонній для телеметрії)
  - Кнопка запуску (Натиск з боку)
  - Bind/User кнопка (Бічний натиск)
  - Порти ресивера (усі звичайні протоколи, без потреби в інверторі)
  - CAM OSD control and Video IN on CAM socket.
  - SWD debugging port.
- Video OUT + Audio OUT on VTX socket.
- USB з можливістю OTG (ID та VBUS з'єднані з CPU)
- Power System
  - Integrated PDB.
  - 2-6S BEC
  - TVS Protection Diode
  - Dedicated 500ma VREG for Gyros, with gyro noise filter capacitors.
  - Second 500ma VREG for CPU, Baro, Microphone, etc.
- Other features
  - Status Led
  - LED strip support (with well-placed connection pads).
  - Bootable from SD Card or External flash.
  - Flashable from SD Card.
  - Solder-from-top design.
  - PCB Cutouts for battery wires.
  - No Compass, use an external GPS with a magnometer/compass sensor connected to the GPS IO port.
  - Also runs Betaflight 4.x+, Cleanflight 4.x+.
  - Designed by Dominic Clifton, the guy that created Cleanflight
- Розміри
  - 36x36mm with 30.5\*30.5 mouting pattern, M4 holes.
  - Втулки з м’яким кріпленням від M4 до M3 постачаються.

## Де придбати

SPRacingH7EXTREME доступний у магазині [Seriously Pro shop](https://shop.seriouslypro.com/sp-racing-h7-extreme).

:::info
Виберіть видання PX4 при покупці!
:::

## Керівництво, Pinouts та Схеми підключення

Інструкцію з розпиновками можна завантажити [тут](http://seriouslypro.com/files/SPRacingH7EXTREME-Manual-latest.pdf). Дивіться веб-сайт [SPRacingH7EXTREME](http://seriouslypro.com/spracingh7extreme) для інших діаграм.

## Автори

Цей дизайн був створений [Домініком Кліфтоном](https://github.com/hydra) Початкова підтримка PX4 від [Ігоря Місіча](https://github.com/Igor-Misic)
