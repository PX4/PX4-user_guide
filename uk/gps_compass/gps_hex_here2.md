# HEX/ProfiCNC Here2 GPS (Discontinued)

::: warning
This has been superseded by the [Cube Here 3](https://www.cubepilot.com/#/here/here3)
:::

GPS-приймач [Here2](http://www.proficnc.com/all-products/152-gps-module.html) є оновленням GPS-модуля Here від компанії HEX.

Основні функції включають:

- Одночасний прийом до 3 GNSS (GPS, Galileo, GLONASS, BeiDou)
- Найкраща в галузі навігаційна чутливість -167 дБм
- Безпека та захист цілісності
- Підтримує всі системи супутникового доповнення
- Просунуте виявлення перешкод і спуфінгу

<img src="../../assets/hardware/gps/here2_gps_module.jpg" />

## Де придбати

- [ProfiCNC](http://www.proficnc.com/all-products/152-gps-module.html) (Австралія)
- [Інші реселлери](http://www.proficnc.com/stores)

## Налаштування

Налаштування та використання PX4 відбувається за принципом «підключи і працюй».

:::info

- If the GPS is _not detected_ then [update the Here2 firmware](https://docs.cubepilot.org/user-guides/here-2/updating-here-2-firmware).
- Якщо GPS виявлено, але він не працює, спробуйте виконати процес, описаний у пункті [визначення вузла uavcan ID](https://docs.cubepilot.org/user-guides/here-2/here-2-can-mode-instruction).
:::

## Підключення та з'єднання

Here2 GPS постачається з 8-контактним роз'ємом, який можна вставити безпосередньо в [Pixhawk 2](http://www.hex.aero/wp-content/uploads/2016/07/DRS_Pixhawk-2-17th-march-2016.pdf) GPS UART порт.

У Pixhawk 3 Pro та Pixracer є роз'єм для GPS з 6 контактами. Для цих контролерів ви можете модифікувати GPS-кабель (як показано нижче), видаливши контакти 6 і 7.

<img src="../../assets/hardware/gps/rtk_here_plug_gps_to_6pin_connector.jpg" width="500px" />

Виводи 6 і 7 призначені для кнопки безпеки - їх також можна прикріпити за потреби.

### Розпіновка

Схема виводів Here2 GPS наведена нижче. Це може бути використано для модифікації роз'єму для інших плат автопілота.

| пін | Here2 GPS  | пін | Pixhawk 3 Pro GPS |
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
- **Тип приймача:** 72-канальний модуль u-blox M8N, GPS/QZSS L2 C/A, GLONASS L10F, BeiDou B11, Galileo E1B/C, SBAS L1 C/A: WAAS, EGNOS, MSAS, GAGAN
- **Частота оновлення навігації:** Max: 10 Гц
- **Точність позиціювання:** 3D Fix
- **Час до першого виправлення:**
  - **Холодний запуск:** 26с
  - **Допоміжний запуск:** 2с
  - ** Повторне отримання:** 1с
- **Чутливість:**
  - **Відстеження & навігація:** -167 дБм
  - **Гарячий старт:** -148 dBm
  - **Холодний старт:** -157 dBm
- **Допоміжний GNSS**
  - AssistNow GNSS Online
  - AssistNow GNSS Offline (до 35 днів)
  - AssistNow Autonomous (до 6 днів)
  - OMA SUPL& сумісність з 3GPP
- **Осцилятор:** TCXO (NEO-8MN/Q)
- **RTC кристал:** Вбудований
- **ROM:** Flash (NEO-8MN)
- **Доступні антени:** Активна антена & Пасивна антена
- **Цілісність сигналу:** Функція підпису з SHA 256
- **Протоколи & Інтерфейси:**
  - **UART/I2C/CAN:** JST_GH Головний інтерфейс, внутрішній перемикач.
  - **Основний інтерфейс програмування STM32:** JST_SUR
