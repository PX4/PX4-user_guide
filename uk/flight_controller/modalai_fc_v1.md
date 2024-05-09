# ModalAI Flight Core v1

<Badge type="tip" text="PX4 v1.11" />

:::warning PX4 не виробляє цей (чи будь-який інший) автопілот. Звертайтесь до [виробника](https://forum.modalai.com/) щодо питань апаратного забезпечення або питань відповідності.
:::

ModalAI [Flight Core v1](https://modalai.com/flight-core) ([Datasheet](https://docs.modalai.com/flight-core-datasheet)) є контролером польоту для PX4, виготовленим в США. Flight Core може бути поєднане з ModalAI [VOXL](https://modalai.com/voxl) ([Datasheet](https://docs.modalai.com/voxl-datasheet/)) для уникнення перешкод та навігації в умовах відсутності сигналу GPS, або використовуватися незалежно як автономний політ контролер.

![FlightCoreV1](../../assets/flight_controller/modalai/fc_v1/main.jpg)

Flight Core ідентичний з частиною контролера польоту PX4 [VOXL Flight](https://www.modalai.com/voxl-flight) ([Datasheet](https://docs.modalai.com/voxl-flight-datasheet/)), яке інтегрує компаньйонний комп'ютер VOXL та Flight Core в одну плату.

::: info Цей контролер польоту [підтримується виробником](../flight_controller/autopilot_manufacturer_supported.md).
:::

## Специфікація

| Характеристика       | Подробиці                                                            |
|:-------------------- |:-------------------------------------------------------------------- |
| Вага                 | 6 г                                                                  |
| MCU                  | 216MHz, 32-bit ARM M7 [STM32F765II][stm32f765ii]                     |
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
| Вхідні дані          | GPS/Mag                                                              |
|                      | Spektrum                                                             |
|                      | Телеметрія                                                           |
|                      | CAN шина                                                             |
|                      | PPM                                                                  |
| Виводи               | 6 світлодіодів (2xRGB)                                               |
|                      | 8 каналів PWM                                                        |
| Додаткові Інтерфейси | 3 послідовні порти                                                   |
|                      | I2C                                                                  |
|                      | GPIO                                                                 |

::: інформація Докладнішу документацію щодо апаратного забезпечення можна знайти [тут](https://docs.modalai.com/flight-core-datasheet/).
:::

<!-- reference links for table above (improve layout) -->
## Розміри

![FlightCoreV1Dimensions](../../assets/flight_controller/modalai/fc_v1/dimensions.png)

## Сумісність прошивки PX4

_Flight Core v1_ повністю сумісний з офіційною прошивкою PX4 від PX4 v1.11.

ModalAI підтримує [гілку версії PX4](https://github.com/modalai/px4-firmware/tree/modalai-1.11) для PX4 v1.11. Це включає підтримку UART ESC та поліпшення в VIO та VOA, які планується включити в основний код.

Додаткову інформацію про прошивку можна знайти [тут](https://docs.modalai.com/flight-core-firmware/).

## QGroundControl Підтримка

Ця плата підтримується QGroundControl 4.0 та пізнішими версіями.

## Доступність

- [Повний комплект Flight Core](https://modalai.com/flight-core)
- [Flight Core інтегрований з супутнім комп'ютером VOXL на одній платі](https://modalai.com/flight-core)
- [Flight Core, інтегроване з комп'ютером-компаньйоном VOXL та камерами уникання перешкод (VOXL Flight Deck)](https://modalai.com/flight-deck) ([Datasheet](https://docs.modalai.com/voxl-flight-deck-platform-datasheet/))
- [Flight Core, складений з VOXL та камерами](https://shop.modalai.com/products/voxl-flight-deck-r1)

## Швидкий Старт

### Орієнтація

Діаграма нижче показує рекомендовану орієнтацію, яка відповідає `ROTATION_NONE` починаючи з PX4 v1.11.

![FlightCoreV1Orientation](../../assets/flight_controller/modalai/fc_v1/orientation.png)

### З’єднання

Детальну інформацію про роз'єми можна знайти [тут](https://docs.modalai.com/flight-core-datasheet-connectors).

![FlightCoreV1Top](../../assets/flight_controller/modalai/fc_v1/top.png)

| З’єднання | Опис                                                         |
| --------- | ------------------------------------------------------------ |
| J1        | Роз'єм інтерфейсу зв'язку VOXL (TELEM2)                      |
| J2        | Програмний та відлагоджувальний роз'єм                       |
| J3        | USB конектор                                                 |
| J4        | UART2, UART ESC (TELEM3)                                     |
| J5        | Конектор телеметрії (TELEM1)                                 |
| J6        | Введенням VOXL-Power Management / розширення                 |
| J7        | Роз'єм виводу з 8 каналами PWM                               |
| J8        | Конектор шини CAN                                            |
| J9        | PPM RC In                                                    |
| J10       | Зовнішній коннектор GPS & магнітометра                       |
| J12       | Вхід RC, Spektrum/SBus/UART конектор                         |
| J13       | I2C Дисплей (роз'єм запасного датчика) / Вхід кнопки безпеки |

![FlightCoreV1Bottom](../../assets/flight_controller/modalai/fc_v1/bottom.png)

### Посібник користувача

Повний посібник користувача доступний [тут](https://docs.modalai.com/flight-core-manual/).

### Як зібрати

Щоб [зібрати PX4](../dev_setup/building_px4.md) для цього контролера:

```
make modalai_fc-v1
```

## Зіставлення послідовних портів

| UART   | Пристрій   | Порт                              |
| ------ | ---------- | --------------------------------- |
| USART1 | /dev/ttyS0 | GPS1 (J10)                        |
| USART2 | /dev/ttyS1 | TELEM3 (J4)                       |
| USART3 | /dev/ttyS2 | Консоль відлагодження (J2)        |
| UART4  | /dev/ttyS3 | Розширення UART (J6)              |
| UART5  | /dev/ttyS4 | TELEM2, Основні зв'язки VOXL (J1) |
| USART6 | /dev/ttyS5 | RC (J12)                          |
| UART7  | /dev/ttyS6 | TELEM1 (J5)                       |
| UART8  | /dev/ttyS7 | N/A                               |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

## Підтримка

Будь ласка, відвідайте [ModalAI Forum](https://forum.modalai.com/category/10/flight-core) для отримання додаткової інформації.

[stm32f765ii]: https://www.st.com/en/microcontrollers-microprocessors/stm32f765ii.html
[bmp388]: https://www.bosch-sensortec.com/products/environmental-sensors/pressure-sensors/bmp388/
[icm-20602]: https://www.invensense.com/products/motion-tracking/6-axis/icm-20602/
[bmi088]: https://www.bosch-sensortec.com/bst/products/all_products/bmi088_1
[px4]: https://github.com/PX4/PX4-Autopilot/tree/main/boards/modalai/fc-v1
[a71ch]: https://www.nxp.com/products/security-and-authentication/authentication/plug-and-trust-the-fast-easy-way-to-deploy-secure-iot-connections:A71CH
