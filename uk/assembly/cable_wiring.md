# Основи підключення дротів

Кабелі - це поширений джерело [електромагнітних перешкод (EMI)](https://en.wikipedia.org/wiki/Electromagnetic_interference), які можуть викликати проблеми, включаючи відхилення, "туалетне ковзання" та загалом погане керування. Цих проблем можна уникнути, використовуючи відповідне кабелювання в БПЛА.

Слід пам'ятати наступні базові концепції при проектуванні кабелювання дрона:

- Кабелі високої потужності та сигнальні кабелі повинні бути розділені настільки, наскільки це практично.
- Довжина кабелів повинна бути мінімальною, достатньою для зручного оброблення провідних компонентів. Натяг дроту повинен бути достатнім, щоб витримати можливі деформації фюзеляжу навіть при аварійній посадці (дроти не повинні бути першим, що ламається).
- Петлі кабелів для зменшення зайвої довжини слід уникати - використовуйте коротші довжини!
- Для цифрових сигналів ви можете зменшити швидкість передачі даних, щоб зменшити випромінювану енергію та збільшити надійність передачі даних. Це означає, що ви можете використовувати більш довгі кабелі, коли високі швидкості передачі даних не потрібні.

## Проводка сигналу

Сигнальні протоколи мають різні характеристики, тому кабелі, що використовуються у кожному випадку, потребують трохи різних технічних характеристик.

Ця тема надає конкретні вказівки щодо кабелювання для різних сигнальних протоколів, разом з [колірною кодуванням](#cable-colour-coding), яке використовується кількома різними виробниками апаратного забезпечення дронів.

### Кабель I2C

The [I2C bus](https://en.wikipedia.org/wiki/I%C2%B2C) is widely used for connecting sensors. Cable colors from several vendors are specified in following table.

| Сигнал | Колір Pixhawk     | ThunderFly colors   | CUAV colors (I2C/CAN) |
| ------ | ----------------- | ------------------- | --------------------- |
| +5V    | ![red][1] Red     | ![red][1] Red       | ![red][1] Red         |
| SCL    | ![black][2] Black | ![yellow][3] Yellow | ![white][4] White     |
| SDA    | ![black][2] Black | ![green][5] Green   | ![yellow][3] Yellow   |
| GND    | ![black][2] Black | ![black][2] Black   | ![black][2] Black     |

The [Dronecode standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) assumes a 1.5k ohm pull-up resistor on SDA and SCL signals in autopilot.

#### Cable twisting

I2C bus signal cross-talk and electromagnetic compatibility can be greatly improved by proper twisting of the cable wires. [Twisted pairs](https://en.wikipedia.org/wiki/Twisted_pair) is especially important for sensor wiring.

- 10 turns for each pair SCL/+5V and SDA/GND per 30cm cable length. ![I²C JST-GH cable](../../assets/hardware/cables/i2c_jst-gh_cable.jpg)
- 4 turns of both pairs together per 30cm cable length. ![I²C JST-GH connector detail](../../assets/hardware/cables/i2c_jst-gh_connector.jpg)

When using appropriate twisted pair cables, the I²C bus is generally suitable for submeter-scale airframes. For larger aircraft the use of CAN or other differential signaling based interface is generally more reliable.

::: info This turns/cable-length recommendation has been successfully used with I2C sensors including the [ThunderFly TFSLOT airspeed sensor](../sensor/airspeed_tfslot.md) and [TFRPM01 Revolution Counter](../sensor/thunderfly_tachometer.md).
:::

#### Pull-up resistors

Pull-up resistors are required for all ends of an I2C bus. This acts both as [signal termination](https://en.wikipedia.org/wiki/Electrical_termination) and as bus idle signal generator.

An oscilloscope measurement is sometimes required to check correct value of pull-up resistors. The signals on the I2C bus should have clear sharp rectangle-like edges and amplitude of few volts. In case the signal has a low amplitude, the value of pull-up resistors is too low and should be decreased. In the case of rounded signals, the value of pull-up resistors is too high.

### UAVCAN cables

| Сигнал | Pixhawk           | ThunderFly          | Zubax               | CUAV (I2C/CAN)      |
| ------ | ----------------- | ------------------- | ------------------- | ------------------- |
| +5V    | ![red][1] Red     | ![red][1] Red       | ![red][1] Red       | ![red][1] Red       |
| CAN_H  | ![black][2] Black | ![white][4] White   | ![white][4] White   | ![white][4] White   |
| CAN_L  | ![black][2] Black | ![yellow][3] Yellow | ![yellow][3] Yellow | ![yellow][3] Yellow |
| GND    | ![black][2] Black | ![black][2] Black   | ![black][2] Black   | ![black][2] Black   |

#### Cable Twisting

CAN cables should also be twisted, for exactly the same reason as I2C cables. For CAN the recommended twisting is:

- 10 turns for each pair GND/+5V and CAN_L/CAN_H per 30cm cable length. ![CAN JST-GH cable](../../assets/hardware/cables/can_jst-gh_cable.jpg)
- 4 turns of both pairs together per 30cm cable length.

### SPI

[SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface) is synchronous serial communication interface used for connecting faster sensors and devices. This protocol is commonly use is for connecting [optical flow](../sensor/optical_flow.md) sensors or special telemetry modems.

| Сигнал | Pixhawk Color     | ThunderFly color    |
| ------ | ----------------- | ------------------- |
| +5V    | ![red][1] Red     | ![red][1] Red       |
| SCK    | ![black][2] Black | ![yellow][3] Yellow |
| MISO   | ![black][2] Black | ![blue][6] Blue     |
| MOSI   | ![black][2] Black | ![green][5] Green   |
| CS!    | ![black][2] Black | ![white][4] White   |
| CS2    | ![black][2] Black | ![blue][6] Blue     |
| GND    | ![black][2] Black | ![black][2] Black   |

### UART

UART is used to connect peripherals to the autopilot. By default, UART does not support networking and therefore it directly connects two devices together. It is often used to connect an autopilot and a [radio modem](../telemetry/index.md).

CTS and RTS are signals that are used to indicate that data is being transmitted on TX/RX pins. This hand-shake mechanism increases reliability of data transfer. CTS and RTS may remain loose when it is not used by the device.

The connecting cable is not crossed. Therefore, it is necessary to connect only the autopilot and peripherals with this straight cable. The device must cross the wiring internally by swapping RX/TX and RTS/CTS pins.

| Сигнал | Колір Pixhawk     | ThunderFly color    |
| ------ | ----------------- | ------------------- |
| +5V    | ![red][1] Red     | ![red][1] Red       |
| TX     | ![black][2] Black | ![white][4] White   |
| RX     | ![black][2] Black | ![green][5] Green   |
| CTS    | ![black][2] Black | ![blue][6] Blue     |
| RTS    | ![black][2] Black | ![yellow][3] Yellow |
| GND    | ![black][2] Black | ![black][2] Black   |

UART signals are common sources of low frequency EMI, therefore the length of the cable should be minimized as much as possible. Cable twisting is not needed for UART cables.

### GPS(UART) & SAFETY

[GPS receivers and magnetometers](../gps_compass/index.md) are generally very sensitive to EMI. Therefore these should be mounted far away from RF sources (high-power cabling, ESCs, radio modems and its antenna). This may be insufficient if the cabling is badly designed.

| Сигнал          | Pixhawk Color     | ThunderFly color    |
| --------------- | ----------------- | ------------------- |
| +5V             | ![red][1] Red     | ![red][1] Red       |
| TX              | ![black][2] Black | ![white][4] White   |
| RX              | ![black][2] Black | ![green][5] Green   |
| SCL             | ![black][2] Black | ![yellow][3] Yellow |
| SDA             | ![black][2] Black | ![green][5] Green   |
| SAFETY_SW       | ![black][2] Black | ![white][4] White   |
| SAFETY_SW_LED | ![black][2] Black | ![blue][6] Blue     |
| +3v3            | ![black][2] Black | ![red][1] Red       |
| BUZZER          | ![black][2] Black | ![blue][6] Blue     |
| GND             | ![black][2] Black | ![black][2] Black   |

### GPS

| Сигнал | Колір Pixhawk     | ThunderFly колір    |
| ------ | ----------------- | ------------------- |
| +5V    | ![red][1] Red     | ![red][1] Red       |
| TX     | ![black][2] Black | ![white][4] White   |
| RX     | ![black][2] Black | ![green][5] Green   |
| SCL    | ![black][2] Black | ![yellow][3] Yellow |
| SDA    | ![black][2] Black | ![green][5] Green   |
| GND    | ![black][2] Black | ![black][2] Black   |

The GPS cable connects to both the UART and I2C bus. As twisting of UART is not applicable the length of the cable should be minimized as much as possible.

### Analog signal (power module)

| Сигнал  | Колір Pixhawk     | ThunderFly колір    | Колір CUAV          |
| ------- | ----------------- | ------------------- | ------------------- |
| VCC     | ![red][1] Red     | ![red][1] Red       | ![red][1] Red       |
| VCC     | ![black][2] Black | ![red][1] Red       | ![red][1] Red       |
| CURRENT | ![black][2] Black | ![white][4] White   | ![white][4] White   |
| VOLTAGE | ![black][2] Black | ![yellow][3] Yellow | ![yellow][3] Yellow |
| GND     | ![black][2] Black | ![black][2] Black   | ![black][2] Black   |
| GND     | ![black][2] Black | ![black][2] Black   | ![black][2] Black   |

This connector is example of mix of relatively high-power and low voltage signaling. Unfortunately, twisting is applicable for high-power GND and VCC wires only. That does not help much for noisy reading of analog signals by autopilot.

### SAFETY

| Сигнал          | Pixhawk Color     | ThunderFly color  |
| --------------- | ----------------- | ----------------- |
| SAFE_VCC        | ![red][1] Red     | ![red][1] Red     |
| SAFETY_SW_LED | ![black][2] Black | ![blue][6] Blue   |
| SAFETY_SW       | ![black][2] Black | ![white][4] White |
| BUZZER          | ![black][2] Black | ![blue][6] Blue   |
| +5V             | ![black][2] Black | ![red][1] Red     |
| GND             | ![black][2] Black | ![black][2] Black |

## High-power wiring

For high power wiring the most important design criteria is having an appropriate wire thickness, in order to allow sufficient current to flow. The general cross section requirement is area of 1 mm² per 8A of wire current.

While rarely practical, it is beneficial to have positive and negative wires twisted together.

EMI from high power cabling has a significant effect on magnetometers. For this reason a large seapration between high-power cables and navigation magnetometers is always required.

### Cable colour coding

Most manufacturers use red for the high voltage line and black for ground. Other colouring is at the manufacturer discretion. The [Pixhawk connector standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) requires only that the Voltage Common Collector (VCC) pin/cable be red.

Color coding signal wires can help identify particular cables, making it easier to assemble your drone.

A colour coding scheme designed for easy cable identification might follow the following rules:

- The red and black colors are reserved for power.
- The same signal type should have the same colour.
- Color of the signal does not repeat in the connector for wires adjacent to each other.
- Wiring harnesses of the same pin count have to have a unique color sequence. This determines the cable type. (This is especially useful on photographs used in a manual).

An example of a cable colouring designed to these rules is:

| Колір        | Назва    | Бажане використання                         |
| ------------ | -------- | ------------------------------------------- |
| ![red][1]    | Червоний | Power voltage                               |
| ![green][5]  | Зелений  | General purpose signal                      |
| ![white][4]  | Білий    | General purpose signal                      |
| ![yellow][3] | Жовтий   | General purpose signal                      |
| ![blue][6]   | Синій    | Power return, Open-collector control signal |
| ![black][2]  | Чорний   | GND, Power return ground                    |


<!-- references for the image source.
This approach just allows more compact markdown -->

::: info The above rules were provided by Thunderfly and are used in their cable design.

The cable colour-coding for Thunderfly and some other vendors are given in the sections below. The pin labels correspond to the pinout on the autopilot side. All cables are straight (1:1). If they require crossover (e.g. UART), this should be solved by internal connection of the devices.
:::

[1]: ../../assets/hardware/cables/red.png
[2]: ../../assets/hardware/cables/black.png
[3]: ../../assets/hardware/cables/yellow.png
[4]: ../../assets/hardware/cables/white.png
[5]: ../../assets/hardware/cables/green.png
[6]: ../../assets/hardware/cables/blue.png
