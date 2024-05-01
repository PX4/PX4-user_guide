# Holybro M8N & M9N GPS

GPS включає в себе модуль M8N або M9N UBLOX, компас IST8310, триколірний світлодіодний індикатор і запобіжний вимикач.

Існує 3 різних варіанти роз'ємів, що дозволяють легко під'єднуватися до польотних контролерів, сумісних зі стандартом роз'єму Pixhawk, як до основного або додаткового GPS-приймача. Цей модуль поставляється зі швидкістю передачі даних 38400 Гц.

Основна відмінність між модулями полягає в тому, що M8N дозволяє одночасний прийом до 3 систем GNSS, тоді як M9N може одночасно підключатися до 4.

<img src="../../assets/hardware/gps/holybro_m8n_gps.jpg" width="200px" title="holybro_gps" /> <img src="../../assets/hardware/gps/holybro_m9n_gps.jpg" width="215px" title="holybro_gps" />

### Функції та специфікації

- Модуль Ublox Neo-M8N або M9N
- Найкраща в галузі навігаційна чутливість -167 дБм
- Холодний запуск: 26 с
- LNA MAX2659ELT+
- 25 x 25 x 4 мм керамічна патч-антена
- Конденсатор Фараха, що перезаряджається
- Малошумний стабілізатор 3,3 В
- Струм споживання: менше 150 мА при 5 В
- Фіксація індикаторних світлодіодів
- Захисний чохол
- У комплекті є кабель завдовжки 26 см
- Діаметр: 50 мм загальний розмір, 32 грами з кейсом.
- **M8N:** Одночасний прийом до 3 GNSS (GPS, Galileo, GLONASS, BeiDou)
- **M9N:** Одночасний прийом до 4-х GNSS (GPS, Galileo, GLONASS, BeiDou)

## Де придбати

* [Holybro](https://holybro.com/collections/gps)

Зверніть увагу, що існують варіанти як для M8N, так і для M9N, а також три різні роз'єми.

## Проводка та з'єднання

GPS-модулі M8N і M9N випускаються в трьох варіантах. Вони дозволяють підключатись до польотних контролерів, які відповідають стандарту роз'єму Pixhawk, як основний або додатковий GPS.

- **SKU12012 Holybro M8N GPS (JST GHR1.25mm 10 pin кабель)**.

  Цей 10-контактний роз'єм JST GH можна використовувати з 10-контактним `GPS-модулем серії Pixhawk` або `GPS1` вхідним портом.

  ![Holybro M8N with Pixhawk GPS1 connector](../../assets/hardware/gps/holybro_gps_pinout.jpg)
- **SKU12014 Holybro M8N 2nd GPS (JST GHR1.25m m 6pin кабель)**

  Цей 6-контактний роз'єм JST GH 6Pin можна використовувати на 6-контактних вхідних портах `UART`, `I2C` або `GPS2` серії Pixhawk в якості додаткового GPS.

  ![Holybro M8N with Pixhawk 2nd GPS connector](../../assets/hardware/gps/holybro_gps_pinout3.jpg)
- **SKU12013 Holybro M8N GPS for Pix32 (Molex 1.25mm 6pin & 4pin & 3pin кабель)**

  Ці роз'єми Molex 1,25 мм 6pin & 4pin & 3pin призначені для вхідних портів [Holybro pix32 Flight Controller](../flight_controller/holybro_pix32.md) `Switch`, `GPS` і `I2C` (не для Pix32 v5 або v6).

  ![Holybro M8N with Pix32 connector](../../assets/hardware/gps/holybro_gps_pinout2.jpg)


## Розміри

![Image showing dimensions of both modules](../../assets/hardware/gps/holybro_gps_dimensions.jpg)
