# ModalAI VOXL Flight

<Badge type="tip" text="PX4 v1.11" />

:::warning PX4 не виробляє цей (чи будь-який інший) автопілот. Звертайтесь до [виробника](https://forum.modalai.com/) щодо питань апаратного забезпечення або питань відповідності.
:::

Voxl Flight від ModalAI [VOXL Flight](https://modalai.com/voxl-flight) ([Технічні характеристики](https://docs.modalai.com/voxl-flight-datasheet)) є однією з перших обчислювальних платформ, яка поєднує потужність та вишуканість Snapdragon з гнучкістю та зручністю використання PX4 на STM32F7. Виготовлений у США, VOXL Flight підтримує уникнення перешкод та навігацію без сигналу GPS (в приміщенні), поєднуючи це з контролером польоту PX4 на одній платі.

![VOXL-Flight](../../assets/flight_controller/modalai/voxl_flight/voxl-flight-dk.jpg)

::: info Цей контролер польоту [підтримується виробником](../flight_controller/autopilot_manufacturer_supported.md).
:::

## Характеристики

### Система

| Характеристика | Подробиці |
|:-------------- |:--------- |
| Вага           | 26 г      |

### Супутні комп'ютери

| Характеристика            | Подробиці                                                                                                                                                                                                                                                                |
|:------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Базова операційна система | Linux Yocto Jethro з ядром 3.18. Додаткові операційні системи Linux можна використовувати, запускаючи Docker на VOXL, деталі [тут](https://docs.modalai.com/docker-on-voxl/)                                                                                             |
| Обчислення                | Qualcomm Snapdragon 821 з 4 ГБ LPDDR4 1866 МГц, Snapdragon 821 [Datasheet](https://developer.qualcomm.com/download/sd820e/qualcomm-snapdragon-820e-processor-apq8096sge-device-specification.pdf), [Документи](https://developer.qualcomm.com/hardware/apq-8096sg/tools) |
| CPU                       | Чотирьохядерний процесор до 2,15 ГГц                                                                                                                                                                                                                                     |
| GPU                       | Графічний процесор Adreno 530 на частоті 624МГц                                                                                                                                                                                                                          |
| Обчислення DSP            | Шестизначний цифровий сигнальний процесор (cDSP) 825МГц                                                                                                                                                                                                                  |
| Сенсор DSP                | Шестизначний сенсор DSP (sDSP) 700МГц                                                                                                                                                                                                                                    |
| Відео                     | Захоплення відео 4k30 h.264/5 w/ 720p FPV                                                                                                                                                                                                                                |
| Інтерфейси камери         | Підтримка MIPI-CSI2, USB UVC, HDMI                                                                                                                                                                                                                                       |
| Wi-Fi                     | Ппопередньо сертифікований модуль Wi-Fi, [QCNFA324 FCC ID:PPD-QCNFA324](https://fccid.io/PPD-QCNFA324), модем QCA6174A, 802.11ac 2x2 Dual-band, Bluetooth 4.2 (двохрежимний)                                                                                             |
| 4G LTE                    | [Додатковий модуль, що доступний за вибором](https://www.modalai.com/collections/voxl-add-ons/products/voxl-lte)                                                                                                                                                         |
| Microhard pDDL            | [Додатковий модуль, що доступний за вибором](https://www.modalai.com/collections/voxl-add-ons/products/voxl-microhard-modem-usb-hub)                                                                                                                                     |
| GNSS                      | WGR7640 10Гц                                                                                                                                                                                                                                                             |
| I/O                       | 1x USB3.0 OTG (порт ADB), 1x USB2.0 (порт розширення), 2x UART, 3x I2C, додаткові GPIO та SPI можуть бути налаштовані                                                                                                                                                    |
| Сховище                   | 32ГБ (UFS 2.0), картка Micro SD                                                                                                                                                                                                                                          |
| Програмне забезпечення    | Docker, OpenCV 2.4.11, 3.4.6, 4.2, ROS Indigo, SDK Qualcomm Machine Vision SDK, подивіться на [GitLab](https://gitlab.com/voxl-public) безліч прикладів з відкритим кодом!                                                                                               |
| IMUs                      | ICM-42688 (SPI10), ICM-20948 (SPI1)                                                                                                                                                                                                                                      |
| Барометр                  | BMP280                                                                                                                                                                                                                                                                   |

### Політний контролер

| Характеристика       | Подробиці                                                            |
|:-------------------- |:-------------------------------------------------------------------- |
| MCU                  | 216МГц, 32-бітний ARM М7 [STM32F765II][stm32f765ii]                  |
| Пам'ять              | 256Kb FRAM                                                           |
|                      | 2Mbit Flash                                                          |
|                      | 512Kbit SRAM                                                         |
| Прошивка             | [PX4][px4]                                                           |
| IMUs                 | [ICM-20602][icm-20602] (SPI1)                                        |
|                      | ICM-42688 (SPI2)                                                     |
|                      | [BMI088][bmi088] (SPI6)                                              |
| Барометр             | [BMP388][bmp388] (I2C4)                                              |
| Елемент захисту      | [A71CH][a71ch] (I2C4)                                                |
| Карта microSD        | [Інформація про підтримувані картки](../dev_log/logging.md#sd-cards) |
| Входи                | GPS/Mag                                                              |
|                      | Spektrum                                                             |
|                      | Телеметрія                                                           |
|                      | CAN шина                                                             |
|                      | PPM                                                                  |
| Виходи               | 6 LEDs (2xRGB)                                                       |
|                      | 8 PWM каналів                                                        |
| Додаткові інтерфейси | 3 послідовні порти                                                   |
|                      | I2C                                                                  |
|                      | GPIO                                                                 |

<!-- reference links for above table (improve layout) -->

:::info Докладнішу документацію щодо апаратного забезпечення можна знайти [тут](https://docs.modalai.com/voxl-flight-datasheet/).
:::

## Розміри

![FlightCoreV1Dimensions](../../assets/flight_controller/modalai/voxl_flight/voxl-flight-dimensions.jpg)

[Файл 3D STEP](https://storage.googleapis.com/modalai_public/modal_drawings/M0019_VOXL-Flight.zip)

## Сумісність прошивки PX4

_Політ VOXL_ повністю сумісний з офіційною прошивкою PX4 від PX4 v1.11.

ModalAI підтримує [гілка версії PX4](https://github.com/modalai/px4-firmware/tree/modalai-1.11) для PX4 v1.11. Це включає підтримку UART ESC та поліпшення в VIO та VOA, які планується включити в основний код.

Додаткову інформацію про прошивку можна знайти [тут](https://docs.modalai.com/flight-core-firmware/).

## Підтримка QGroundControl

Ця плата підтримується в QGroundControl 4.0 та пізніше.

## Доступність

- [Комплект VOXL Flight Complete](https://modalai.com/voxl-flight)
- [Плата керування VOXL Flight](https://www.modalai.com/products/voxl-flight?variant=31707275362355) (тільки)
- [VOXL Flight, інтегрований з камерами уникання перешкод (VOXL Flight Deck)](https://modalai.com/flight-deck) ([Datasheet](https://docs.modalai.com/voxl-flight-deck-platform-datasheet/))
- [VOXL Flight в готовому до польоту Development Drone VOXL m500](https://www.modalai.com/collections/development-drones/products/voxl-m500) ([Datasheet](https://docs.modalai.com/voxl-m500-reference-drone-datasheet/))

## Швидкий старт

Quickstarts від постачальника розташовані [тут](https://docs.modalai.com/voxl-flight-quickstart/).

### voxl-vision-px4

VOXL Flight виконує [voxl-vision-px4](https://gitlab.com/voxl-public/modal-pipe-architecture/voxl-vision-px4) на обчислювальній частині апаратного забезпечення, що служить в якості виду посередника MAVLink. Для отримання детальної інформації вихідний код доступний [тут](https://gitlab.com/voxl-public/modal-pipe-architecture/voxl-vision-px4)

### Конектори

Докладну інформацію про розпіновку можна знайти [тут](https://docs.modalai.com/voxl-flight-datasheet-connectors/).

#### Top

![VOXLFlightTop](../../assets/flight_controller/modalai/voxl_flight/voxl-flight-top.jpg)

_Примітка: Роз'єми серії 1000 доступні з STM32/PX4_

| З’єднання | Опис                                       | Використовується                  |
| --------- | ------------------------------------------ | --------------------------------- |
| J2        | Датчик зображення 4k (CSI0) високої якості | Snapdragon - Linux                |
| J3        | Стерео Датчик Зображення (CSI1)            | Snapdragon - Linux                |
| J6        | Конектор вентилятора охолодження           | Snapdragon - Linux                |
| J7        | BLSP6 (GPIO) та BLSP9 (UART)               | Snapdragon - Linux                |
| J13       | Expansion B2B                              | Snapdragon - Linux                |
| J14       | Підключення вбудованої антени GNSS         | Snapdragon - Linux                |
| J1001     | Програмний та відлагоджувальний/UART3      | STM32 - PX4                       |
| J1002     | UART ESC, UART2/TELEM3                     | STM32 - PX4                       |
| J1003     | PPM RC In                                  | STM32 - PX4                       |
| J1004     | Вхід RC, Spektrum/SBus/UART6               | STM32 - PX4                       |
| J1006     | Роз'єм USB 2.0 (PX4/QGroundControl)        | STM32 - PX4                       |
| J1007     | 8-Канальний вихід PWM/DShot                | STM32 - PX4                       |
| J1008     | CAN шина                                   | STM32 - PX4                       |
| J1009     | I2C3, UART4                                | STM32 - PX4                       |
| J1010     | Телеметрія (TELEM1)                        | STM32 - PX4                       |
| J1011     | I2C2, кнопка безпеки                       | STM32 - PX4                       |
| J1012     | Зовнішній GPS & Mag, UART1, I2C1           | STM32 - PX4                       |
| J1013     | Вхід живлення, I2C3                        | STM32 - PX4 (живить весь систему) |

#### Низ

![VOXLFlightBottom](../../assets/flight_controller/modalai/voxl_flight/voxl-flight-bottom.jpg)

_Примітка: Роз'єми серії 1000 доступні з STM32/PX4_

| З’єднання      | Опис                                                    | Використовується            |
| -------------- | ------------------------------------------------------- | --------------------------- |
| J4             | Датчик відстеження / оптичного потоку зображення (CSI2) | Snapdragon - Linux          |
| J8             | USB 3.0 OTG                                             | Snapdragon - Linux, **adb** |
| J10            | BLSP7 UART та I2C off-board                             | Snapdragon - Linux          |
| J11            | BLSP12 UART та I2C off-board                            | Snapdragon - Linux          |
| VOXL microSD   |                                                         | Snapdragon - Linux          |
| PX4 microSD    | 32Gb Max                                                | STM32 - PX4                 |
| Wi-Fi Antennas | У комплекті                                             | Snapdragon - Linux          |

### Посібник користувача

Повний посібник користувача доступний [тут](https://docs.modalai.com/voxl-flight-quickstart).

### Як зібрати

Щоб [зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make modalai_fc-v1
```

## Зіставлення послідовних портів

_Примітка: відображені відображення стосуються лише керованих інтерфейсів PX4_

| UART   | Пристрій   | Порт                                     |
| ------ | ---------- | ---------------------------------------- |
| USART1 | /dev/ttyS0 | GPS1 (J1012)                             |
| USART2 | /dev/ttyS1 | TELEM3 (J1002)                           |
| USART3 | /dev/ttyS2 | Консоль відладки (J1001)                 |
| UART4  | /dev/ttyS3 | Розширення UART (J6)                     |
| UART5  | /dev/ttyS4 | UART між PX4 та Комп'ютером-компаньйоном |
| USART6 | /dev/ttyS5 | RC (J1004)                               |
| UART7  | /dev/ttyS6 | TELEM1 (J1010)                           |
| UART8  | /dev/ttyS7 | N/A                                      |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

## Підтримка

Будь ласка, відвідайте [Форум ModalAI](https://forum.modalai.com/category/8/voxl-flight) для отримання додаткової інформації.

[stm32f765ii]: https://www.st.com/en/microcontrollers-microprocessors/stm32f765ii.html
[px4]: https://github.com/PX4/PX4-Autopilot/tree/release/1.15/boards/modalai/fc-v1
[icm-20602]: https://www.invensense.com/products/motion-tracking/6-axis/icm-20602/
[bmi088]: https://www.bosch-sensortec.com/bst/products/all_products/bmi088_1
[bmp388]: https://www.bosch-sensortec.com/products/environmental-sensors/pressure-sensors/bmp388/
[a71ch]: https://www.nxp.com/products/security-and-authentication/authentication/plug-and-trust-the-fast-easy-way-to-deploy-secure-iot-connections:A71CH
