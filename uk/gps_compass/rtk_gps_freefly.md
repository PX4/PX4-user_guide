# Freefly Системи RTK GPS

[Модуль RTK GPS від Freefly Systems](https://store.freeflysystems.com/products/rtk-gps-ground-station) - це багатосмуговий [модуль RTK GPS](../gps_compass/rtk_gps.md) від Freefly Systems, який забезпечує дуже надійну навігацію. Модулі можуть діяти як роувери (коли встановлені на повітряну судну), так і базові станції (коли підключені до комп'ютера).

Основні функції включають:
- Отримувач з багаторозрядним (L1/L2) (u-blox ZED-F9P)
- Одночасний прийом всіх 4 GNSS (GPS, Galileo, GLONASS, BeiDou)
- Вбудований магнітометр (IST8310), баро (BMP388), RGB LED, безпечний вимикач та світлодіод безпеки

:::info
Цей модуль можна використовувати з PX4 v1.9 або вище (підтримка для u-blox ZED-F9P була додана в PX4 v1.9).
:::

![FreeFly GPS Module](../../assets/hardware/gps/freefly_gps_module.jpg)


## Де купити

* [Магазин Freefly](https://store.freeflysystems.com/products/rtk-gps-ground-station)

## Вміст набору

Набір RTK GPS включає в себе:
- 2x GPS модулі з антенами
- Кабель USB C на USB A довжиною 3 метри
- Магнітний швидкозамок для базової станції модуля (1/4-20 різьблення для монтажу на штатив)
- Гвинти для кріплення на Freefly AltaX


## Налаштування

Налаштування та використання RTK на PX4 за допомогою *QGroundControl* відбувається за принципом "підключи і працюй" (див. [RTK GPS](../gps_compass/rtk_gps.md) для отримання додаткової інформації).

Для літака вам слід встановити параметр [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD) на 115200 8N1, щоб забезпечити, що PX4 налаштує правильну швидкість передачі.

## Підключення та з'єднання

RTK GPS Freefly поставляється з роз'ємом JST-GH на 8 контактів, який можна підключити до автопілота PixHawk. Для використання як базова станція, модуль має роз'єм USB-C

### Розпіновка

Схема виводів Freefly GPS наведена нижче. Для деяких автопілотів, таких як [Hex Cube](../flight_controller/pixhawk-2.md) та [PixRacer](../flight_controller/pixracer.md), все, що потрібно, це кабель JST-GH 1-1 8-контактний.

| Pin | Freefly GPS |
| --- | ----------- |
| 1   | VCC_5V      |
| 2   | GPS_RX      |
| 3   | GPS_TX      |
| 4   | I2C_SCL     |
| 5   | I2C_SDA     |
| 6   | BUTTON      |
| 7   | BUTTON_LED  |
| 8   | GND         |

## Специфікація

- Приймач GPS u-blox ZED-F9P
  - Ultracap backup power for fast (hot-start) restarts
  - EMI shield over receiver for improved EMI immunity
- Магнітометр IST8310
- Блок безпеки та безпечний світлодіод LED
- RGB LEDs for status indication
  - NCP5623CMUTBG I2C Driver
- BMP388 Baro on I2C bus
- External, active antenna (Maxtena M7HCT)
  - SMA connector
- STM32 MCU for future CAN-based communication
  - FW updates through USB connector
- Підключення:
  - USB-C
  - 2-way USB Switch to MCU and F9P
  - SMA for active antenna (20mA max)
  - 4-pin JST-GH CAN Bus (dronecode compliant)
  - 8-pin JST-GH UART/I2C -** Power:
  - Input from either (diode OR'd):
  - USB (5V)
  - CAN (4.7 до 25.2В)
  - (4.7 до 25.2V)
  - Power consumption <1W

## Докладніше

Більше інформації можна знайти на [Вікі Freefly](https://freefly.gitbook.io/freefly-public/products/rtk-gps)
  