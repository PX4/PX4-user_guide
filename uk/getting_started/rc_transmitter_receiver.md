# Системи радіо керування

Системи радіо керування (РК) використовуються для *ручного* керування рухомим засобом з переносного контролера РК. У цьому розділі наведено огляд того, як працює система РК, як вибрати відповідну радіосистему для вашого засобу, і як під'єднати її до польотного контролера.

:::tip PX4 також може керуватися вручну за допомогою [Джойстика](../config/joystick.md) або подібного до геймпаду контролера, це відрізняється від керування за допомогою системи РК! Для вибору режиму керування за допомогою системи РК, джойстика, обома або жодним з них, потрібно [встановити](../advanced_config/parameters.md) параметр [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE). :::

:::note
PX4 не потребує систему ручного керування для автономних режимів польоту.
:::

## Як працюють системи радіо керування?

*Система РК* має наземний *пристрій дистанційного керування* що використовується оператором для керування засобом. Пульт має органи управління, які використовуються для задання параметрів руху засобу (наприклад швидкість, напрямок, прискорення, рискання, тангаж, крен тощо), а також для увімкнення  [режимів польоту](../flight_modes/README.md) автопілота (наприклад зліт, приземлення, повернення на землю після втрати керування, польотне завдання тощо). На РК системах де *присутня телеметрія*, пристрій дистанційного керування також може отримувати та показувати інформацію про рухомий засіб, таку як рівень заряду батареї, режим польоту та попередження.

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

Наземний контролер РК містить радіомодуль, який пов'язаний із (сумісним) радіомодулем у рухомому засобі та спілкується з ним. Пристрій радіомодуля на засобі під'єднано до польотного контролера. Контролер польоту визначає як інтерпретувати команди в залежності від поточного режиму польоту автопілота і відповідно керує двигунами  та актуаторами транспортного засобу.

<!-- image showing the different parts here would be nice -->

:::note
Наземний та розташований на засобі радіомодулі називаються передавачем та приймачем відповідно (навіть якщо вони підтримують двосторонню передачу) та загалом називаються *пара передавач/приймач*. Контролер РК та включений в нього радіомодуль часто називають просто "передавачем". :::

Важлива якість системи РК це кількість "каналів", яку вона підтримує. Кількість каналів визначає скільки різних фізичних елементів керування на пульті можна використовувати для відправлення команд рухомому засобу (наприклад скільки перемикачів, стіків керування можна використовувати).

Літальний апарат повинен використовувати систему, яка підтримує щонайменше 4 канали (для крену, тангажу, рискання, тяги). Наземні транспортні засоби потребують не менше двох каналів (кермо + газ). Передавач на 8 або 16 каналів забезпечує додаткові канали, які використовуються для керування іншими механізмами або активації інших [режимів польоту](../flight_modes/README.md) які надає автопілот.

## Типи пристроїв дистанційного керування

<a id="transmitter_modes"></a>

### Пристрої керування для літальних апаратів

Найпопулярніша *форма* пристрою керування для БПЛА показана нижче. Як можна бачити, він має окремі органи керування для крену/тангажу та для тяги/рискання (тобто літальний апарат потребує принаймні 4 канали).

![RC Basic Commands](../../assets/flying/rc_basic_commands.png)

Існує багато можливих розташувань для стіків керування, перемикачів і т. ін. Найпоширеніші  розташування мають власний номер "режиму". *Режим 1* та *Режим 2* (показано нижче) відрізняються тільки розташуванням газу.

![Mode1-Mode2](../../assets/concepts/mode1_mode2.png)

:::note
Вибір режиму значною мірою обумовлений смаком (*Режим 2* найбільш популярний). :::

## Пристрої керування для наземних засобів

Безпілотний транспортний засіб (UGV)/автомобіль мінімально потребує передавача з 2 каналами для того, щоб передавати дані для керування та швидкості. Часто передавачі змінюють ці дані за допомогою колеса (керма) та тригера, двома одновісними стіками керування або одним двовісним стіком.

Вам ніщо не заважає користуватися додатковими каналами або механізмами керування і це може бути дуже корисно для залучення додаткових актуаторів та режимів автопілота.


## Вибір компонентів системи РК

Вам потрібно буде обрати пару передача/приймача сумісних між собою. На додаток приймачі мають бути [сумісні з PX4](#compatible_receivers) та апаратним забезпеченням польотного контролера.

Сумісні радіосистеми часто продаються разом. Наприклад популярна комбінація [FrSky Taranis X9D та FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us).


### Пари передавач/приймач

Один з найбільш популярних пристроїв РК - це *Fry Taranis X9D*. Він має внутрішній передавач, який може бути використано одразу з рекомендованим приймачами *FrSky X4R-SB* (S-BUS, низька затримка) або *X4R* (PPM-Sum, застарілий). Він також має спеціальний роз'єм для радіо передавача та прошивку з відкритим кодом OpenTX яку можна налаштувати.

:::note
Пристрій дистанційного керування може показувати телеметрію із рухомого засобу, коли використовується з радіомодулями [FrSky](../peripherals/frsky_telemetry.md) або [TBS Crossfire](../telemetry/crsf_telemetry.md). :::

Інші популярні пари передавач/приймач

* Пульт Turnigy із, наприклад, парою модулів FrSky.
* Передавачі Futaba та сумісні S-Bus приймачі Futaba.
* Передавачі на далеку відстань у діапазоні ~900 МГц з низькою затримкою: набори "Team Black Sheep Crossfire" або "Crossfire Micro" із сумісним пультом (наприклад Taranis).
* Передавач на далеку відстань у діапазоні ~433 МГц: набір ImmersionRC EzUHF із сумісним пультом (наприклад Taranis).


<a id="compatible_receivers"></a>

### PX4-сумісні приймачі

На додачу до пари передавач/приймач, приймач також повинен бути сумісним з PX4 та пристроєм польотного контролера.

*PX4* та *Pixhawk* були перевірені з:

- Всіма приймачами Spektrum DSM RC
- Всіма приймачами Futaba S.BUS та S.BUS2
- Всіма моделями FrSky PPM та S.Bus
- Graupner HoTT
- Усіма PPM моделями від інших виробників
- Приймачами TBS Crossfire/Express LRS за допомогою [CRSF телеметрії](../telemetry/crsf_telemetry.md) (UART з'єднання).


## Підключення приймачів

В якості загальної настанови: приймачі з'єднуються з контролером польоту використовуючи порт відповідного протоколу що ним підтримується.

- Приймачі Spektrum і DSM повинні підключатися до входу **SPKT/DSM**.
- Graupner HoTT приймач: SUMD вихід повинен під'єднуватися до **SPKT/DSM** входу.
- PPM-Sum та S.BUS приймачі повинні під'єднуватися напряму до **RC** штирків заземлення, живлення та сигналу (типово позначені як RC або RCIN).
- PPM приймачі, які мають окремі дроти для кожного каналу повинні підключатися до каналу RCIN *через*  PPM перетворювач [на зразок цього](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum приймачі використовують єдиний сигнальний дріт для всіх каналів).

Instructions for connecting to specific flight controllers are given in their [quick-start](../assembly/README.md) guides (such as [CUAV Pixhawk V6X Wiring Quick Start: Radio Control](../assembly/quick_start_cuav_pixhawk_v6x.md#radio-control) or [Holybro Pixhawk 6X Wiring Quick Start: Radio Control](../assembly/quick_start_pixhawk6x.md#radio-control)).

:::tip
See the manufacturer's flight controller setup guide for additional information.
:::

<a id="binding"></a>

## Binding Transmitter/Receiver

Before you can calibrate/use a radio system you must *bind* the receiver and transmitter so that they communicate only with each other. The process for binding a transmitter and receiver pair is hardware specific (see your manual for instructions).

If you are using a *Spektrum* receiver, you can put it into bind mode using *QGroundControl*: [Radio Setup > Spectrum Bind](../config/radio.md#spectrum-bind).

## Set Signal-Loss Behaviour

RC receivers have different ways of indicating signal loss:
- Output nothing (automatically detected by PX4)
- Output a low throttle value (you can [configure PX4 to detect this](../config/radio.md#rc-loss-detection)).
- Output the last received signal (PX4 cannot handle this case!)

Choose a receiver that can emit nothing (preferred) when RC is lost, or a low throttle value. This behaviour may require hardware configuration of the receiver (check the manual).

For more information see [Radio Control Setup > RC Loss Detection](../config/radio.md#rc-loss-detection).


## Related Topics

* [Radio Control Setup](../config/radio.md) - Configuring your radio with PX4.
* [Manual Flying](../flying/basic_flying.md) - Learn how to fly with a remote control.
* [TBS Crossfire (CRSF) Telemetry](../telemetry/crsf_telemetry.md)
* [FrSky Telemetry](../peripherals/frsky_telemetry.md)