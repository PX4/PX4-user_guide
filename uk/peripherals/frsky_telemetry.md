# Телеметрія FrSky

Телеметрія FrSky дозволяє отримувати доступ до інформації про телеметрію/статус транспортного засобу на сумісному радіокерувальнику RC через [телеметрія/статус](#messages).

Доступна [телеметрія перерахована тут](#messages), і включає: режим польоту, рівень заряду батареї, сила сигналу RC, швидкість, висота тощо. Деякі передавачі можуть додатково надавати аудіо- та вібраційний зворотний зв'язок, що особливо корисно для попереджень про низький рівень заряду акумулятора та інших аварійних сигналів.

PX4 підтримує як [S.Port](#s_port) (новий), так і D (старий) порти телеметрії FrSky.

## Налаштування програмного забезпечення

FrSky телеметрія вимагає:

- [FrSky-сумісний з RC трансмітером](#transmitters) , подібний до FrSky Taranis X9D Plus.
- Приймач, сумісний з телеметрією FrSky, такий як XSR та X8R.
- Кабель для підключення приймача FrSky Smart Port (SPort) до UART контролера польоту.

Спочатку [підключіть отримувач для RC каналів](../getting_started/rc_transmitter_receiver.md#connecting-receivers), наприклад, підключити порти S.Bus при ресивері і контролері польоту.

Потім налаштуйте телеметрію FrSky, підключивши SPort на приймач до будь-якого вільного UART на контролері польоту, а потім [налаштуйте PX4 для роботи з телеметрією FrSky на цьому UART](#configure).

Це робиться трохи по-іншому, залежно від того, чи є у приймача SPort контакт для невертованого виходу, і/або версія Pixhawk.

### Pixhawk FMUv4 (і попередні)

Для Pixhawk FMUv4 та раніше, порти UART та порти телеметрії приймача зазвичай несумісні (з винятком [Pixracer](../flight_controller/pixracer.md)).

Зазвичай приймачі SPort мають _інвертований_ сигнал S.Port, і вам потрібно використовувати кабель-конвертер, щоб розділити S.Port на невинвертовані TX і RX для підключення до UART Pixhawk. Приклад показано нижче.

![FrSky-Taranis-Telemetry](../../assets/hardware/telemetry/frsky_telemetry_overview.jpg)

:::tip
При підключенні до оберненого порту S зазвичай дешевше і простіше купити [готовий кабель](#ready_made_cable), який містить цей адаптер і має відповідні роз'єми для автопілота та приймача. Створення [DIY кабелю](#diy_cables) вимагає експертизи в зборці електроніки.
:::

Якщо використовується приймач S.Port з контактом для _невертикального виводу_, ви можете просто підключити один з TX-контактів UART.

<!-- FYI only: The uninverted output can be used in single-wire mode so you don't need both RX and TX wires.
Discussion of that here: https://github.com/PX4/PX4-user_guide/pull/755#pullrequestreview-464046128 -->

Потім [налаштуйте PX4](#configure).

### Pixhawk FMUv5/STM32F7 та пізніше

Для Pixhawk FMUv5 та пізніших версій PX4 може читати сигнали S.Port безпосередньо у зворотньому (або незворотньому) вигляді - не потрібен жоден спеціальний кабель.

:::info Загалом це вірно для автопілотів з STM32F7 або пізніше (наприклад, [Durandal](../flight_controller/durandal.md) має STM32H7 і може читати інвертовані або неінвертовані сигнали S.Port безпосередньо).
:::

Просто підключіть один з TX-пінів UART до інвертованого або неінвертованого піна SPort (PX4 автоматично виявить і обробить будь-який тип). Потім [налаштуйте PX4](#configure).

<a id="configure"></a>

## Налаштування PX4

[Налаштуйте послідовний порт](../peripherals/serial_configuration.md) на якому буде працювати FrSky, використовуючи [TEL_FRSKY_CONFIG](../advanced_config/parameter_reference.md#TEL_FRSKY_CONFIG). Немає потреби встановлювати швидкість передачі для порту, оскільки це налаштовано драйвером.

:::info Можна використовувати будь-який вільний UART, але зазвичай `TELEM 2` використовується для телеметрії FrSky (крім [Pixracer](../flight_controller/pixracer.md), який попередньо налаштований на використання порту _FrSky_ за замовчуванням).
:::

:::tip
Якщо параметр конфігурації недоступний у _QGroundControl_, можливо, вам доведеться [додати драйвер до мікропрограми](../peripherals/serial_configuration.md#parameter_not_in_firmware):

```
drivers/telemetry/frsky_telemetry
```

:::

Додаткова конфігурація не потрібна; телеметрія FrSky автоматично запускається при підключенні та виявляє режим D або S.

<a id="transmitters"></a>

## Сумісні RC передавачі

Вам знадобиться передавач RC, який може отримувати поток телеметрії (і який зв'язаний з приймачем FrSky).

Серед популярних альтернатив:

- FrSky Taranis X9D Plus (рекомендовано)
- FrSky Taranis X9D
- FrSky Taranis X9D
- FrSky Taranis Q X7
- Turnigy 9XR Pro

Вищезазначені передавачі можуть відображати телеметричні дані без будь-якої додаткової конфігурації. Наступний розділ(и) пояснюють, як ви можете налаштувати відображення телеметрії (наприклад, для створення кращого інтерфейсу користувача).

### Taranis - Налаштування LuaPilot

Сумісні приймачі Taranis (наприклад, X9D Plus), які працюють на OpenTX 2.1.6 або новіше, можуть використовувати сценарій LuaPilot для зміни відображеної телеметрії (як показано на знімку екрану нижче).

![Telemetry Screen on the Taranis](../../assets/hardware/telemetry/taranis_telemetry.jpg)

Інструкції з встановлення скрипту можна знайти тут: [LuaPilot Taranis Telemetry script > Taranis Setup OpenTX 2.1.6 або новіше](http://ilihack.github.io/LuaPilot_Taranis_Telemetry/)

Якщо ви відкриєте скрипт `LuaPil.lua` за допомогою текстового редактора, ви можете редагувати конфігурацію. Запропоновані модифікації включають:

- `local BattLevelmAh = -1` - Використовуйте обчислення рівня заряду батареї з транспортного засобу
- `local SayFlightMode = 0` - Немає WAV-файлів для режимів польоту PX4

<a id="messages"></a>

## Телеметричні повідомлення

Телеметрія FrySky може передавати більшість корисної інформації про стан з PX4. Отримувачі S-Port та D-Port передають різні набори повідомлень, як перелічено в наступних розділах.

<a id="s_port"></a>

### S-Port

Приймачі S-Port передають наступні повідомлення від PX4 (з [тут](https://github.com/iNavFlight/inav/blob/master/docs/Telemetry.md#available-smartport-sport-sensors)):

- **AccX, AccY, AccZ:** Значення акселерометра.
- **Альт:** Барометр на основі висоти, відносно місця розташування дому.
- **Поточний:** Фактичне поточне споживання (ампери).
- **Паливо:** Залишилася відсоткова частка батареї, якщо встановлено змінну `battery_capacity` та змінну `smartport_fuel_percent = ON`, в іншому випадку мАг витрачено.
- **GAlt:** Висота GPS, рівень моря дорівнює нулю.
- **GPS:** GPS координати.
- **GSpd:** Поточна горизонтальна швидкість руху, розрахована за допомогою GPS.
- **Заголовок:** Напрямок (градуси - Північ - 0°).
- **VFAS:** Фактичне значення напруги акумулятора (Voltage FrSky Ampere Sensor).
- **VSpd:** Швидкість по вертикалі (см/с).
- **Tmp1:** [Режим польоту](../flight_modes/index.md#flight-modes), відправлений у вигляді цілого числа: 18 - Ручний, 23 - Висота, 22 - Позиція, 27 - Місія, 26 - Утримувати, 28 - Повернення, 19 - Акро, 24 0 Offboard, 20 - Стабілізований, 25 - Взліт, 29 - Посадка, 30 - Підслідувати мене.
- **Tmp2:** Інформація GPS. Найправіший розрядок - це тип виправлення GPS (0 = жоден, 2 = 2D, 3 = 3D). Інші цифри - це кількість супутників.

:::info Наступні "стандартні" повідомлення S-Port не підтримуються PX4: **ASpd**, **A4**.
:::

<!-- FYI:
Values of FRSKY_ID_TEMP1 and FRSKY_ID_TEMP1 set:
- https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/drivers/telemetry/frsky_telemetry/frsky_telemetry.cpp#L85  (get_telemetry_flight_mode)
- https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/drivers/telemetry/frsky_telemetry/frsky_data.cpp#L234-L237
Lua map of flight modes:
- https://github.com/ilihack/LuaPilot_Taranis_Telemetry/blob/master/SCRIPTS/TELEMETRY/LuaPil.lua#L790
-->

### D-порт

Приймачі D-Port передають наступні повідомлення (з [тут](https://github.com/cleanflight/cleanflight/blob/master/docs/Telemetry.md)):

- **AccX, AccY, AccZ:** Значення акселерометра.
- **Alt:** Висота на основі барометра, початковий рівень - нуль.
- **Cels:** Середнє значення напруги акумулятора (напруга батареї, поділена на кількість елементів).
- **Поточний:** Фактичне поточне споживання (ампери).
- **Паливо:** Нагадує відсоток батареї, якщо потужність встановлена, помилка в іншому.
- **Дата:** Час з моменту увімкнення.
- **GAlt:** Висота GPS, рівень моря - нуль.
- **GPS:** GPS координати.
- **GSpd:** Поточна швидкість, розрахована за допомогою GPS.
- **Заголовок:** Напрямок (градуси - Північ - 0°).
- **RPM:** Значення дросельної заслонки у разі озброєння, інакше ємність батареї. Зверніть увагу, що номер леза повинен бути встановлений на 12 в Тараніс.
- **Тимчасово 1:** Режим польоту (щодо S-Port).
- **Tmp2:** Інформація GPS (щодо S-Port).
- **VFAS:** Фактичне значення напруги акумулятора (Voltage FrSky Ampere Sensor).
- **Vspd:** Швидкість по вертикалі (см/с).

<a id="receivers"></a>

## FrSky телеметрія Receivers

Pixhawk/PX4 підтримує D (старий) та S (новий) телеметрію FrSky. Таблиця нижче всі FrSky приймачі, які підтримують телеметрію через D/S.PORT (теоретично всі вони повинні працювати).

:::tip
Зверніть увагу, що перераховані нижче приймачі серії X рекомендовані (наприклад, XSR, X8R). Серії R та G не були протестовані / перевірені тестовою командою, але повинні працювати.
:::

| Приймач     | Діапазон | Комбінований вихід    | Цифровий вхід телеметрії      | Розміри               | Вага  |
| ----------- | -------- | --------------------- | ----------------------------- | --------------------- | ----- |
| D4R-II      | 1.5km    | CPPM (8)              | D.Port                        | 40х22.5х6мм           | 5.8г  |
| D8R-XP      | 1.5km    | CPPM (8)              | D.Port                        | 55х25х14мм            | 12,4г |
| D8R-II Plus | 1.5km    | no                    | D.Port                        | 55х25х14мм            | 12,4г |
| X4R         | 1.5км    | CPPM (8)              | Smart Port                    | 40х22.5х6мм           | 5.8г  |
| X4R-SB      | 1.5км    | S.Bus (16)            | Smart Port                    | 40х22.5х6мм           | 5.8г  |
| X6R / S6R   | 1.5км    | S.Bus (16)            | Smart Port                    | 47.42×23.84×14.7мм    | 15.4г |
| X8R / S8R   | 1.5км    | S.Bus (16)            | Smart Port                    | 46.25 x 26.6 x 14.2мм | 16,6г |
| XSR / XSR-M | 1.5км    | S.Bus (16) / CPPM (8) | Smart Port                    | 26x19.2x5мм           | 3,8 г |
| RX8R        | 1.5км    | S.Bus (16)            | Smart Port                    | 46.25x26.6x14.2мм     | 12.1г |
| RX8R PRO    | 1.5км    | S.Bus (16)            | Smart Port                    | 46.25x26.6x14.2мм     | 12.1г |
| R-XSR       | 1.5км    | S.Bus (16) / CPPM (8) | Smart Port                    | 16x11x5.4мм           | 1.5г  |
| G-RX8       | 1.5км    | S.Bus (16)            | Smart Port + integrated vario | 55.26*17*8мм          | 5.8г  |
| R9          | 10км     | S.Bus (16)            | Smart Port                    | 43.3x26.8x13.9мм      | 15,8г |
| R9 slim     | 10км     | S.Bus (16)            | Smart Port                    | 43.3x26.8x13.9мм      | 15,8г |

:::info Вищезазначена таблиця походить з http://www.redsilico.com/frsky-receiver-chart та [документації продукту FrSky](https://www.frsky-rc.com/product-category/receivers/).
:::

<a id="ready_made_cable"></a>

## Готові кабелі

Готові кабелі для використання з Pixhawk FMUv4 та раніше (крім Pixracer) доступні за адресою:

- [Craft та Theory](http://www.craftandtheoryllc.com/telemetry-cable). Існують версії з сумісними роз'ємами _PicoBlade_ (для FMUv2/3DR Pixhawk, FMUv2/HKPilot32) та _JST-GH_ (для FMUv3/Pixhawk 2 "The Cube" та FMUv4/PixRacer v1).

  <a href="http://www.craftandtheoryllc.com/telemetry-cable"><img src="../../assets/hardware/telemetry/craft_and_theory_frsky_telemetry_cables.jpg" alt="Purchase cable here from Craft and Theory"></a>

<a id="diy_cables"></a>

## DIY Кабелі

Можливо створити власні адаптерні кабелі. Вам знадобляться роз'єми, які підходять для вашого автопілота (наприклад, роз'єми _JST-GH_ для FMUv3/Pixhawk 2 "The Cube" та FMUv4/PixRacer v1, та сумісні з DF-13 роз'єми _PicoBlade_ для старіших автопілотів).

Pixracer включає електроніку для перетворення сигналів S.PORT і UART, але для інших плат вам знадобиться адаптер UART на S.PORT. Ці можна отримати з:

- [FrSky FUL-1](https://www.frsky-rc.com/product/ful-1/): [unmannedtech.co.uk](https://www.unmannedtechshop.co.uk/frsky-transmitter-receiver-upgrade-adapter-ful-1/)
- SPC: [getfpv.com](http://www.getfpv.com/frsky-smart-port-converter-cable.html), [unmannedtechshop.co.uk](https://www.unmannedtechshop.co.uk/frsky-smart-port-converter-spc/)

Додаткова інформація про з'єднання для різних плат подається нижче.

### Pixracer до приймачів S-порту

Підключіть лінії TX та RX Pixracer FrSky разом (припаяйте проводи разом) до контакту S.port приймача серії X. GND не потрібно прикріплювати, оскільки це буде зроблено під час прикріплення до S.Bus (звичайне з'єднання RC).

З'єднання S-порту показано нижче (використовуючи наданий роз'єм введення/виведення).

![Grau b Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)

![Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/pixracer_FrSkyTelemetry.jpg)

### Pixracer до приймачів D-порту

:::tip
Більшість користувачів зараз віддають перевагу використанню S.PORT.
:::

Підключіть лінію Pixracer FrSky TX (FS out) до лінії RX приймача. Підключіть лінію Pixracer FrSky RX (FS in) до лінії TX приймача. GND не потрібно підключати, оскільки це буде зроблено під час приєднання до RC/SBus (для звичайного RC).

<!-- Image would be nice -->

### Pixhawk 4

[Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md) може бути підключений до TELEM4 (додаткова конфігурація програмного забезпечення не потрібна). Вам потрібно буде підключитися через UART до плати адаптера S.PORT або [готового кабелю](#ready_made_cable).

### Pixhawk FMUv5 та попередній

Просто підключіть один з TX-пінів UART до інвертованого або неінвертованого піна SPort (PX4 автоматично виявить і обробить будь-який тип).

### Інші плати

Більшість інших плат з'єднуються з приймачем для телеметрії FrSky через UART TELEM2. Це включає, наприклад: [Pixhawk 1](../flight_controller/pixhawk.md), [mRo Pixhawk](../flight_controller/mro_pixhawk.md), Pixhawk2.

Вам потрібно буде підключитися через UART до плати адаптера S.PORT або [готового кабелю](#ready_made_cable).

<!-- ideally add diagram here -->

## Додаткова інформація

Для отримання додаткової інформації дивіться наступні посилання:

- [FrSky телеметрія Taranis](https://github.com/Clooney82/MavLink_FrSkySPort/wiki/1.2.-FrSky-Taranis-Telemetry)
- [Taranis X9D: Налаштування телеметрії](https://www.youtube.com/watch?v=x14DyvOU0Vc) (Відео-інструкція)
- [Налаштування телеметрії Px4 FrSky з Pixhawk2 та приймачем X8R](https://discuss.px4.io//t/px4-frsky-telemetry-setup-with-pixhawk2-and-x8r-receiver/6362) (Кабелі DIY)
