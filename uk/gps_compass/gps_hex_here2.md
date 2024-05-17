# HEX/ProfiCNC Here2 GPS

The [Here2 GPS receiver](http://www.proficnc.com/all-products/152-gps-module.html) is an update to the Here GPS module from HEX.

Основні функції включають:
- Одночасний прийом до 3 GNSS (GPS, Galileo, GLONASS, BeiDou)
- Найкраща в галузі навігаційна чутливість -167 дБм
- Безпека та захист цілісності
- Підтримує всі системи супутникового доповнення
- Просунуте виявлення перешкод і спуфінгу


<img src="../../assets/hardware/gps/here2_gps_module.jpg" />


## Де придбати

* [ProfiCNC](http://www.proficnc.com/all-products/152-gps-module.html) (Австралія)
* [Інші реселлери](http://www.proficnc.com/stores)

## Налаштування

Налаштування та використання PX4 відбувається за принципом «підключи і працюй».

:::info
- Якщо GPS *не виявлено*, тоді [оновить прошивку Here2](https://docs.cubepilot.org/user-guides/here-2/updating-here-2-firmware).
- Якщо GPS виявлено, але він не працює, спробуйте виконати процес, описаний у пункті [визначення вузла uavcan ID](https://docs.cubepilot.org/user-guides/here-2/here-2-can-mode-instruction).
:::

## Підключення та з'єднання

The Here2 GPS comes with an 8 pin connector that can be inserted directly into the [Pixhawk 2](http://www.hex.aero/wp-content/uploads/2016/07/DRS_Pixhawk-2-17th-march-2016.pdf) GPS UART port.

The Pixhawk 3 Pro and Pixracer have a 6 pin GPS port connector. For these controllers you can modify the GPS cable (as shown below) to remove pin 6 and 7.

<img src="../../assets/hardware/gps/rtk_here_plug_gps_to_6pin_connector.jpg" width="500px" />

Pin 6 and 7 are for the safety button - these can be attached as well if needed.

### Pinout

The Here2 GPS pinout is provided below. This can be used to help modify the connector for other autopilot boards.

| pin | Here2 GPS  | pin | Pixhawk 3 Pro GPS |
| --- | ---------- | --- | ----------------- |
| 1   | VCC_5V     | 1   | VCC               |
| 2   | GPS_RX     | 2   | GPS_TX            |
| 3   | GPS_TX     | 3   | GPS_RX            |
| 4   | SCL        | 4   | SCL               |
| 5   | SDA        | 5   | SDA               |
| 6   | BUTTON     | -   | -                 |
| 7   | BUTTON_LED | -   | -                 |
| 8   | GND        | 6   | GND               |

## Характеристики

- **Процесор:** STM32F302
- **Сенсор**
  - **Компас, Гіроскоп, Акселерометр:** ICM20948
  - **Барометр:** MS5611
- **Receiver Type:** 72-channel u-blox M8N engine, GPS/QZSS L2 C/A, GLONASS L10F, BeiDou B11, Galileo E1B/C, SBAS L1 C/A: WAAS, EGNOS, MSAS, GAGAN
- **Navigation Update Rate:** Max: 10 Hz
- **Positionaing Accuracy:** 3D Fix
- **Time to first fix:**
  - **Cold start:** 26s
  - **Aided start:** 2s
  - **Reacquisition:** 1s
- **Чутливість:**
  - **Tracking & Navigation:** -167 dBm
  - **Hot start:** -148 dBm
  - **Cold start:** -157 dBm
- **Допоміжний GNSS**
  - AssistNow GNSS Online
  - AssistNow GNSS Offline (up to 35 days)
  - AssistNow Autonomous (up to 6 days)
  - OMA SUPL& 3GPP compliant
- **Oscillator:** TCXO (NEO-8MN/Q)
- **RTC crystal:** Build in
- **ROM:** Flash (NEO-8MN)
- **Available Antennas:** Active Antenna & Passive Antenna
- **Signal Integrity:** Signature feature with SHA 256
- **Protocols & Interfaces:**
  - **UART/I2C/CAN:** JST_GH Main interface, Switch internally.
  - **STM32 Main Programming Interface:** JST_SUR
