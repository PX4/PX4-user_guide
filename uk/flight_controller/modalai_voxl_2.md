# ModalAI VOXL 2

:::warning
PX4 не виробляє цей (або будь-який інший) автопілот. Звертайтесь до [виробника](https://forum.modalai.com/) щодо питань апаратного забезпечення або питань відповідності.
:::

ModalAI [VOXL 2](https://modalai.com/voxl-2) ([Datasheet](https://docs.modalai.com/voxl2-datasheets/)) - це наступне покоління автономної обчислювальної платформи ModalAI, побудованої навколо процесора Qualcomm QRB5165. VOXL 2 має 8 ядер, вбудований PX4, сім одночасних камер, бортовий ШІ до 15+ TOPS та підтримку 5G зв'язку. З вагою 16 грамів, VOXL 2 - це майбутнє повністю автономних та підключених дронів!

![VOXL-2](../../assets/flight_controller/modalai/voxl_2/voxl-2-hero.jpg)

:::info
Цей польотний контролер [підтримується виробником](../flight_controller/autopilot_manufacturer_supported.md).
:::

## Характеристики

### Система

| Характеристика                                                               | VOXL 2                                                                         |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| CPU                                                                          | QRB5165 <br>8 ядер до 3.091ГГц <br>8ГБ LPDDR5<br>128ГБ Flash |
| OS                                                                           | Ubuntu 18.04 - Linux Kernel v4.19                                              |
| GPU                                                                          | Графічний процесор Adreno 650 - 1024 ALU                                       |
| NPU                                                                          | 15 TOPS                                                                        |
| Налаштування контролера польоту                                              | Так (датчики DSP, PX4)                                                         |
| Вбудований WiFi                                                              | Ні                                                                             |
| Додаткове підключення                                                        | WiFi, 5G, 4G/LTE, Microhard                                                    |
| Кодування відео                                                              | 8K30 h.264/h.265 108MP still images                                            |
| Датчики комп'ютерного зору                                                   | QTY 6 4-lane CSI, QTY4 CCI (e.g. 2 stereo pair, hires, трекінг)                |
| Датчик трекінгу                                                              | Так                                                                            |
| Розміри                                                                      | 70мм х 36мм                                                                    |
| Вага                                                                         | 16г                                                                            |
| VOXL SDK: навігація без GPS, SLAM, уникання перешкод, розпізнавання об'єктів | Так                                                                            |
| ROS                                                                          | ROS 1 & 2                                                                      |
| QGroundControl                                                               | Так                                                                            |
| ATAK                                                                         | Так                                                                            |
| Сумісний з NDAA ’20 Section 848                                              | Так, зібрано в США                                                             |
| PMD TOF                                                                      | Так (SDK 1.0 та новіше)                                                        |
| FLIR Boson                                                                   | USB                                                                            |
| FLIR Lepton                                                                  | USB, SPI                                                                       |

::: info
Докладнішу документацію щодо апаратного забезпечення можна знайти [тут](https://docs.modalai.com/voxl-flight-datasheet/).
:::

## Розміри

### 2D розмір

![VOXL2Dimensions](../../assets/flight_controller/modalai/voxl_2/voxl-2-dimensions.jpg)

### 3D розміри

[Файл 3D STEP](https://storage.googleapis.com/modalai_public/modal_drawings/M0054_VOXL2_PVT_SIP_REVA.step)

## Сумісність прошивки PX4

### гілка voxl-dev

ModalAI активно підтримує [гілку версії PX4](https://github.com/modalai/px4-firmware/tree/voxl-dev), яку можна використовувати.

Оскільки VOXL 2 працює під управлінням Ubuntu, виробничі версії PX4 для VOXL 2 розповсюджуються через [apt пакетний менеджер](https://docs.modalai.com/configure-pkg-manager/) та [VOXL SDK](https://docs.modalai.com/voxl-sdk/).

Додаткову інформацію про прошивку можна знайти [тут](https://docs.modalai.com/voxl2-px4-developer-guide/).

### основна гілка

Підтримка основної лінії PX4 для VOXL 2 (документація плати [тут](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/boards/modalai/voxl2)).

## Підтримка QGroundControl

Ця плата підтримується QGroundControl 4.0 та пізнішими версіями.

## Доступність

- [Автономний набір розробника PX4](https://www.modalai.com/products/px4-autonomy-developer-kit)
- [Starling 2](https://www.modalai.com/products/starling-2)
- [Starling 2 MAX](https://www.modalai.com/products/starling-2-max)
- [Sentinel Development Drone, працює на VOXL 2](https://www.modalai.com/pages/sentinel)
  - [Демо відео](https://www.youtube.com/watch?v=hMhQgWPLGXo)
- [VOXL 2 Flight Deck, готовий до встановлення, налаштування і польоту](https://www.modalai.com/collections/ready-to-mount/products/voxl-2-flight-deck)
- [VOXL 2 Набори розробки](https://www.modalai.com/products/voxl-2)
  - [Відео-демонстрація](https://www.youtube.com/watch?v=aVHBWbwp488)

## Швидкий старт

Quickstarts від постачальника розташовані [тут](https://docs.modalai.com/voxl2-quickstarts/).

### VOXL SDK

VOXL SDK (Набір розробки програмного забезпечення) складається з відкритих [voxl-px4](https://docs.modalai.com/voxl-px4/), [core бібліотек](https://docs.modalai.com/core-libs/), [сервісу](https://docs.modalai.com/mpa-services/), [інструментів](https://docs.modalai.com/inspect-tools/), [утиліт](https://docs.modalai.com/sdk-utilities/) та [середовищ розробки](https://docs.modalai.com/build-environments/), які ModalAI надає для прискорення використання та розвитку обчислювальних плат і аксесуарів VOXL.

VOXL SDK працює на VOXL, VOXL 2 та RB5 Flight!

Вихідний код для проєктів у межах VOXL SDK можна знайти на https://gitlab.com/voxl-public, поруч з інструкціями зі збірки.

### З’єднання

Детальну інформацію про роз'єми можна знайти [тут](https://docs.modalai.com/voxl2-connectors/) разом з [відеооглядом тут](https://www.youtube.com/watch?v=xmqI3msjqdo)

![VOXLConnectors](../../assets/flight_controller/modalai/voxl_2/voxl-2-connectors.jpg)

Усі односторонні сигнали на роз'ємах B2B J3, J5, J6, J7 та J8 є 1,8В CMOS, якщо явно не вказано інше. Усі односторонні сигнали на кабель-плата роз'ємах J10, J18, & J19 є 3,3В CMOS, якщо явно не вказано інше.

| З’єднання | Опис                                          | MPN (Сторона плати)     | З'єднання MPN (сторона плати/кабелю) | Тип                          | Загальний опис функцій сигналізації                                                                                                                                                                                        |
| --------- | --------------------------------------------- | ----------------------- | ------------------------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| J2        | Охолодження                                   | SM02B-SRSS-TB(LF)(SN)   | SHR-02V-S                            | Cable Header, 2-pin R/A      | 5V DC для вентилятора + регулювання FAN-повернення (GND)                                                                                                                                                                   |
| J3        | Legacy B2B                                    | QSH-030-01-L-D-K-TR     | QTH-030-01-L-D-A-K-TR                | B2B накопичувач, 60-pin      | 5V/3.8V/3.3V/1.8V живлення для плати, JTAG і Debug Signals QUP expansion, GPIOs, USB3.1 Gen 2 (USB1)                                                                                                                       |
| J4        | Максимальна потужність                        | 22057045                | 0050375043                           | Конектор, 4-pin R/A          | +5В основний постійний струм + GND, I2C@5V для живлення моніторів                                                                                                                                                          |
| J5        | Високошвидкісне підключення плата-плата (B2B) | ADF6-30-03.5-L-4-2-A-TR | ADM6-30-01.5-L-4-2-A-TR              | B2B Роз'єм, 120-pin          | Більше потужності 3.8V/3.3V/1.8V для встановлюваних плат, потужність 5V для режиму «SOM», розширення QUP, GPIO (включно з I2S), SDCC (SD Card V3.0), UFS1 (другорядна UFS Flash), 2L PCIe Gen 3, AMUX та сигнали SPMI PMIC |
| J6        | Група камери 0                                | DF40C-60DP-0.4V(51)     | DF40C-60DS-0.4V                      | B2B плагін, 60-пін           | Qty-2 4L MIPI порти CSI, сигнали управління CCI і камери, 8 рейок живлення (від 1.05-V до 5V) для камер і інших сенсорів, виділених порту SPI (QUP)                                                                        |
| J7        | Група камери 1                                | DF40C-60DP-0.4V(51)     | DF40C-60DS-0.4V                      | B2B плагін, 60-пін           | Qty-2 4L MIPI CSI порти, сигнали управління CCI і камери, 8 рейок живлення (від 1.05-V до 5V) для камер і інших сенсорів, виділений порт SPI (QUP)                                                                         |
| J8        | Група камери 2                                | DF40C-60DP-0.4V(51)     | DF40C-60DS-0.4V                      | B2B плагін, 60-пін           | Qty-2 4L MIPI порти CSI, сигнали управління CCI і камери, 8 рейок живлення (від 1.05-V до 5V) для камер і інших сенсорів, виділений порт SPI (QUP)                                                                         |
| J9        | USB-C (ADB)                                   | UJ31-CH-3-SMT-TR        | USB Type-C                           | Кабель-з'єднувач, 24-pin R/A | ADB USB-C з перезапуском та альтернативним режимом відображення порту (USB0)                                                                                                                                               |
| J10       | Розширення SPI                                | SM08B-GHS-TB(LF)(SN)    | GHR-08V-S                            | Конектор, 8-pin R/A          | SPI@3.3V з 2 CS_N пінами, 32kHz CLK_OUT@3.3V                                                                                                                                                                             |
| J18       | ESC (Доступ SLPI)                             | SM04B-GHS-TB(LF)(SN)    | GHR-04V-S                            | Конектор, 4-pin R/A          | ESC UART@3.3V, опорна напруга 3.3V                                                                                                                                                                                         |
| J19       | GNSS/MAG/RC/I2C (доступ SLPI)                 | SM12B-GHS-TB(LF)(SN)    | GHR-12V-S                            | Конектор, 6-pin R/A          | GNSS UART@3.3V, Магнетометр I2C@3.3V, 5V, RC UART, Запасна I2C                                                                                                                                                             |

### Посібник користувача

Посібник користувача PX4 для VOXL 2 доступний [тут](https://docs.modalai.com/voxl-px4/).

### Інструкція розробника

The Посібник розробника PX4 для VOXL 2 доступний [тут](https://docs.modalai.com/voxl-px4-developer-guide/).

### Як зібрати

Дивіться [VOXL PX4 Посібник зі збірки](https://docs.modalai.com/voxl2-px4-build-guide/) щодо збірки.

## Підтримка

Будь ласка, відвідайте [Форум ModalAI](https://forum.modalai.com/category/26/voxl-2) для отримання додаткової інформації.
