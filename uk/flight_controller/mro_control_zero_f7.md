# Контролер польоту mRo Control Zero F7

:::warning PX4 не виробляє цей (чи будь-який інший) автопілот. Зверніться до [виробника](https://store.mrobotics.io/) щодо підтримки обладнання або питань сумісності.
:::

_mRo Control Zero F7<sup>&reg;</sup>_ - це новий контролер польоту від mRo.

![mRo Control Zero F7](../../assets/flight_controller/mro_control_zero_f7/mro_control_zero_f7.jpg)

Це безкомпромісний трикомпонентний комерційний контролер польоту з трьома IMU. Це включає 8 виходів PWM (здатні до DShot), 3x IMU, 1x Магнітомер, 1x Датчик атмосферного тиску (Висотомір), 6x UART та SD-карту, все це зберігається на PCB розміром 32 мм x 20 мм. PWM-сигнали здійснюють двосторонню комунікацію, захищені від EMI і переносяться до рівнів логіки 5В. Усі елементи доступні за допомогою передніх та задніх роз'ємів Molex PicoClasp з 30 контактами. Міцний пластиковий корпус, конформне покриття плати та опціональне калібрування температури включені.

::: info Цей контролер польоту [підтримується виробником](../flight_controller/autopilot_manufacturer_supported.md).
:::

## Ключові особливості

- Мікропроцесор:

  - 32-bit STM32F777 Cortex<sup>&reg;</sup> M4 core with FPU rev. 3
  - 216 MHz/512 KB RAM/2 MB Flash
  - F-RAM Cypress MF25V02-G 256-Кбіт неволатильна пам'ять (Flash-пам'ять, яка працює так же швидко, як RAM)
- Датчики:

  - [Bosch BMI088](https://www.bosch-sensortec.com/bst/products/all_products/bmi088_1) 3 осевий прискорювач/гіроскоп (внутрішньо відновлено вібрацію)
  - [Invensense ICM-20602](https://www.invensense.com/products/motion-tracking/6-axis/icm-20602/) 3 осевий прискорювач/гіроскоп
  - [Invensense ICM-20948](https://www.invensense.com/products/motion-tracking/9-axis/icm-20948/) 3 осевий прискорювач/гіроскоп/магнітометр
  - [Барометр Infineon DPS310](https://www.infineon.com/cms/en/product/sensor/pressure-sensors/pressure-sensors-for-iot/dps310/) (Такий плавний і НЕ чутливий до світла)

- Інтерфейси:

  - 6x UART (загальна кількість послідовних портів), 3x з HW керуванням потоком, 1x FRSky Telemetry (типи D або Х), 1x Консоль та 1x GPS+I2C
  - 8x Виходи PWM (всі здатні до DShot)
  - 1x CAN
  - 1x I2C
  - 1x SPI
  - Spektrum DSM / DSM2 / DSM-X® Satellite compatible вхід та біндинг
  - Вхід сумісний із Futaba S.BUS® & S.BUS2®
  - Вивід телеметрії порту FRSky
  - Graupner SUMD
  - Yuneec ST24
  - PPM сигнал входу суми
  - 1x JTAG (Роз'єм TC2030)
  - 1x RSSI (PWM чи вольтаж) вхід
  - LED триколор

- Вага та розміри (без кейса):

  - Вага: 5.3г (0.19oz)
  - Ширина: 20 мм (0.79")
  - Довжина: 32 мм (1,26")

- Система живлення:
  - 3x Низькозатратний лінійний регулятор напруги Ultra Low Noise LDO

## Де купити

- [mRo Control Zero](https://store.mrobotics.io/mRo-Control-Zero-F7-p/mro-ctrl-zero-f7.htm)

## Створення прошивки

:::tip
Більшості користувачів не потрібно створювати цю прошивку! Вона попередньо зібрана й автоматично встановлюється _QGroundControl_ при підключенні відповідного апаратного забезпечення.
:::

Щоб [зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make mro_ctrl-zero-f7
```

## Відладочні порти

### Порт Консолі

[Консоль системи PX4](../debug/system_console.md) працює на `USART7`, використовуючи перераховані нижче контакти. Це стандартна послідовна розпіновка, призначена для підключення до кабелю [3,3 В FTDI](https://www.digikey.com/en/products/detail/TTL-232R-3V3/768-1015-ND/1836393) (толерантного на 5 В).

| mRo control zero f7 |             | FTDI                    |
| ------------------- | ----------- | ----------------------- |
| 17                  | USART7 Tx   | 5    | FTDI RX (yellow) |
| 19                  | USART7 Rx   | 4    | FTDI TX (orange) |
| 6                   | USART21 GND | 1    | FTDI GND (black) |

### SWD Port

Порт [SWD](../debug/swd_debug.md) (JTAG) для відлагодження FMU є роз'ємом відлагодження TC2030, як показано нижче.

![mro swd port](../../assets/flight_controller/mro_control_zero_f7/mro_control_zero_f7_swd.jpg)

Ви можете використовувати кабель [Tag Connect](https://www.tag-connect.com/) кабель [TC2030 IDC NL](https://www.tag-connect.com/product/tc2030-idc-nl) нижче (зі відповідним [кліпом утримування](https://www.tag-connect.com/product/tc2030-clip-retaining-clip-board-for-tc2030-nl-cables)) для підключення до зонда BlackMagic, або до відлагоджувача ST-LINK V2.

![tc2030 idc nl cable](../../assets/flight_controller/mro_control_zero_f7/tc2030_idc_nl.jpg)

Також існує [адаптер ARM20-CTX 20-Pin до TC2030-IDC](https://www.tag-connect.com/product/arm20-ctx-20-pin-to-tc2030-idc-adapter-for-cortex), який може бути використаний з іншими відлагоджувальними зондами.

## Розпіновка

![mRo Control Zero F7](../../assets/flight_controller/mro_control_zero_f7/mro_control_pinouts.jpg)

## Зіставлення послідовних портів

| UART   | Пристрій   | Порт                                                           |
| ------ | ---------- | -------------------------------------------------------------- |
| USART2 | /dev/ttyS0 | TELEM1 (контроль потоку)                                       |
| USART3 | /dev/ttyS1 | TELEM2 (контроль потоку)                                       |
| UART4  | /dev/ttyS2 | GPS1                                                           |
| USART6 | /dev/ttyS3 | Flex порт (можна налаштувати як SPI або UART із Flow Control). |
| UART7  | /dev/ttyS4 | CONSOLE                                                        |
| UART8  | /dev/ttyS5 | Вільний послідовний порт (зазвичай для телеметрії FrSky)       |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->
<!-- https://github.com/PX4/PX4-Autopilot/blob/main/boards/mro/ctrl-zero-f7/nuttx-config/nsh/defconfig#L202-L207 -->

## Додаткова інформація

- [Представлення нового mRo Control Zero Autopilot](https://mrobotics.io/introducing-the-new-mro-control-zero-autopilot/) (блог)
- [Короткий посібник для початку роботи](https://mrobotics.io/mrocontrolzero/)
