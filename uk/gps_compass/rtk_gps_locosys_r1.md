# LOCOSYS Hawk R1 RTK GPS

<Badge type="tip" text="PX4 v1.13" />

[LOCOSYS Hawk R1](https://www.locosystech.com/en/product/hawk-r1.html) - це двочастотний [RTK GPS модуль](../gps_compass/rtk_gps.md) приймач, розроблений для сумісності з Pixhawk.

Модуль може діяти як RTK GPS ровер при встановленні на літак.

Приймач здатний одночасно відстежувати всі глобальні цивільні навігаційні системи, включаючи GPS, ГЛОНАСС, GALILEO, BEIDOU і QZSS. Він приймає сигнали L1 і L5 одночасно, забезпечуючи сантиметрову точність позиціонування RTK.

Вбудована легка спіральна антена підвищує стабільність позиціонування RTK. Швидкий час до першої перевірки, сумісність з RTK, чудова чутливість, низьке енергоспоживання роблять його кращим вибором для платформних БПЛА на базі Pixhawk.

:::info

Цей модуль не має компасу. Спробуйте еквівалентний модуль GPS з компасом: [LOCOSYS Hawk R2](../gps_compass/rtk_gps_locosys_r2.md).
:::


## Основні характеристики

- Одночасний прийом сигналів діапазонів L1 і L5
- Підтримка GPS, ГЛОНАСС, BEIDOU, GALILEO, QZSS
- Підтримка SBAS (WAAS, EGNOS, MSAS, GAGAN)
- Підтримка GNSS з 135 каналами
- Швидкий TTFF на низькому рівні сигналу
- Free hybrid ephemeris prediction to achieve faster cold start
- За замовчуванням 5 Гц, частота оновлення до 10 Гц (SBAS підтримує тільки 5 Гц).
- Build-in super capacitor to reserve system data for rapid satellite acquisition

![LOCOSYS Hawk R1](../../assets/hardware/gps/locosys_hawk_a1/locosys_hawk_a1_gps.png)


## Де купити

* [LOCOSYS Hawk R1](https://www.locosystech.com/en/product/hawk-r1.html)

## Вміст набору

Набір RTK GPS включає в себе:
- 1x Модуль GPS
- 1x Спіральна антена
- 1x 6-контактний JST-GH


## Налаштування

Налаштування та використання RTK на PX4 за допомогою *QGroundControl* відбувається за принципом «підключи і працюй» (див. [RTK GPS](../gps_compass/rtk_gps.md) для отримання додаткової інформації). Підключіть Hawk R1 до порту `GPS2` на сумісних платах Pixhawk (бажано, але ви можете використовувати будь-який інший невикористаний порт UART).

Для літака слід встановити параметр [SER_GPS2_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD) на 230400 8N1, щоб переконатися, що PX4 налаштував правильну швидкість передачі даних.

## Підключення та з'єднання

Hawk R1 RTK GPS поставляється з 6-контактним роз'ємом JST-GH, який можна підключити до автопілота Pixhawk.

### Pinout

Нижче наведена розводка LOCOSYS GPS.

| Pin | Hawk R1 GPS |
| --- | ----------- |
| 1   | VCC_5V      |
| 2   | GPS_RX      |
| 3   | GPS_TX      |
| 4   | Null        |
| 5   | Null        |
| 6   | Null        |
| 7   | Null        |
| 8   | Null        |
| 9   | GND         |

## LEDs статуси

| Колір | Назва           | Опис                                |
| ----- | --------------- | ----------------------------------- |
| Green | TX Indicator    | Передача даних GNSS                 |
| Red   | Power Indicator | Живлення                            |
| Blue  | PPS             | Precise Positioning Service активна |

![Hawk A1 LEDs](../../assets/hardware/gps/locosys_hawk_a1/locosys_hawk_a1_leds.png)

## Характеристики

- Частоти
  - GPS/QZSS: L1 C/A, L5C
  - GLONASS: L1OF
  - BEIDOU: B1I, B2a
  - GALILEO: E1, E5a
- Підтримка 135 каналів
- Частота оновлення до 10 Гц (за замовчуванням 5 Гц)
- Час отримання
  - Гарячий старт (Open Sky) за 2 секунди
  - Холодний старт (Open Sky) за 28 секунд без AGPS
- PPS з тривалістю імпульсу 100 мс, 1,8 В постійного струму
- Зовнішня, активна антена Helix
  - SMA конектор
- Підтримка протоколу UBlox
  - U5Hz:UBX-NAV-PVT,UBX-NAV-DOP
  - 1Hz: UBX-NAV-TIMEGPS
- Підключення:
  - 6-контактний JST-GH UART/I2C (сумісний з Pixhawk)
- Живлення:
  - Напруга живлення постійного струму 3,3 В ~ 5,0 В на вході
  - Енергоспоживання <1 Вт

## Більше інформації

Більше інформації можна знайти на [LOCOSYS Hawk R1](https://www.locosystech.com/en/product/hawk-r1.html)
