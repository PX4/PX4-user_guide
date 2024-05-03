# Durandal Wiring Quick Start

<Badge type="tip" text="PX4 v1.11" />

:::warning PX4 не виробляє цей (чи будь-який інший) автопілот. Зверніться до [виробника](https://holybro.com/) щодо підтримки апаратного забезпечення чи відповідності вимогам.
:::

У цьому короткому посібнику показано, як увімкнути живлення польотного контролера Holybro [Durandal](../flight_controller/durandal.md)<sup>&reg;</sup> та підʼєднати до нього найважливіші периферійні пристрої.

![Durandal](../../assets/flight_controller/durandal/durandal_hero.jpg)

## Розпаковка

Durandal продається в комплекті з різноманітними комбінаціями аксесуарів, включаючи модулі живлення: _PM02 V3_ та _PM07_, та _GPS/Компас Pixhawk 4_ (u-blox NEO-M8N).

Вміст коробки з модулем живлення _PM02 V3_ показано нижче (у коробці також є посібник з роз'ємами та інструкція з модулю живлення).

![Durandal Box](../../assets/flight_controller/durandal/durandal_unboxing_schematics.jpg)

## Огляд схеми підключення

На зображенні нижче показано, як під'єднати найважливіші датчики та периферійні пристрої (за винятком виходів мотора та сервоприводів). Ми розглянемо кожен з них детально в наступних розділах.

![Durandal Wiring Overview](../../assets/flight_controller/durandal/durandal_wiring_overview.jpg)

:::tip
Додаткову інформацію про доступні порти можна знайти тут: [Durandal >  Pinouts](../flight_controller/durandal.md#pinouts).
:::

## Монтаж та орієнтація контролера

_Дюрандал_ повинен бути встановлений на раму, розташований якомога ближче до центру ваги вашого апарату, орієнтований верхньою стороною вгору зі стрілкою, що вказує вперед апарату.

![Mounting/Orientation](../../assets/flight_controller/durandal/orientation.jpg)

Якщо контролер не може бути змонтований у рекомендованому/стандартному положенні (наприклад, через обмеження місця), вам потрібно буде налаштувати програмне забезпечення автопілота з орієнтацією, яку ви фактично використовували: [Орієнтація контролера польоту](../config/flight_controller_orientation.md).

:::tip
Плата має внутрішню вібраційну ізоляцію.
Не використовуйте віброізоляційну пінку для монтажу контролера (подвійна стрічка на клейовій основі зазвичай достатня).
:::

## GPS + Compass + Buzzer + Safety Switch + LED

Durandal розроблений для успішної роботи з _модулем GPS Pixhawk 4_, який має вбудований компас, безпечний вимикач, сигналізацію, світлодіоди. Він підключається безпосередньо до [порту GPS](../flight_controller/durandal.md#gps) за допомогою 10-жильного кабелю.

GPS/компас слід монтувати на раму якомога подалі від інших електронних пристроїв, з напрямком вперед транспортного засобу (відокремлення компаса від інших електронних пристроїв зменшить втручання).

![Connect compass/GPS to Durandal](../../assets/flight_controller/durandal/connection_gps_compass.jpg)

:::info Вбудований безпечний вимикач в GPS-модулі увімкнений _за замовчуванням_ (коли включений, PX4 не дозволить вам готувати до польоту). Щоб вимкнути безпеку, натисніть і утримуйте безпечний вимикач протягом 1 секунди. Ви можете натиснути безпечний вимикач знову, щоб увімкнути безпеку та відключити транспортний засіб (це може бути корисно, якщо, з якихось причин, ви не можете вимкнути транспортний засіб за допомогою вашого пульта дистанційного керування або наземної станції).
:::

## Потужність

Ви можете використовувати модуль живлення або розподільник живлення для живлення двигунів/сервоприводів та виміру споживаної потужності. Рекомендовані модулі живлення показані нижче.

<a id="pm02_v3"></a>

### PM02D Power Module

[Модуль живлення (PM02 v3)](../power_module/holybro_pm02.md) може бути поставлений разом з _Durandal_. Він надає регульоване живлення контролеру польоту та надсилає напругу/силу струму акумулятора контролеру польоту.

Підключіть вихід _Модуля живлення_, як показано.

![Durandal PM02v3 Power connections](../../assets/flight_controller/durandal/connection_power.jpg)

- Порт напруги/струму PM: підключіться до [POWER1](../flight_controller/durandal.md#power) порту (або `POWER2`) за допомогою 6-жильного кабелю GH, що входить у комплект.
- Вхід PM (роз'єм XT60): підключіть до ліпо-акумулятора (2~12S).
- Вихід живлення PM (роз'єм XT60): підведіть до будь-якого контролера регулятора обертів мотора.

:::tip
Оскільки цей модуль живлення не містить проводки розподілу живлення, ви зазвичай просто підключаєте всі контролери регуляторів обертів мотора паралельно до виходу модуля живлення (контролер регулятора обертів мотора повинен бути відповідним для постачаного рівня напруги).
:::

:::tip
Контактна шина живлення (+) 8-контактного рейлу **MAIN/AUX** не живиться блоком живлення модуля живлення контролера польоту. Якщо вона повинна бути окремо живленою для керування сервоприводами для рульових поверхонь, елеронами тощо, лінію живлення потрібно підключити до ESC зі вбудованим BEC або окремого BEC напругою 5V або акумулятора LiPo 2S. Переконайтеся, що напруга сервопривода, який ви збираєтеся використовувати, є відповідною.
:::

Модуль живлення має наступні характеристики/обмеження:

- Максимальна вхідна напруга: 60V
- Максимальне вимірювання струму: 120A Voltage
- Вимірювання струму, налаштоване для SV АЦП Перемикання виходів регулятора 5,2 В і 3А макс
- Вага: 20г
- Пакет включає:
  - Плата PM02
  - 6pin MLX cable (1)
  - 6pin GH cable (1)

<a id="pm07"></a>

### Pixhawk 4 Power Module (PM07)

The [Pixhawk 4 Power Module (PM07)](https://holybro.com/collections/power-modules-pdbs/products/pixhawk-4-power-module-pm07) can be bundled/used with _Durandal_. It acts as both a power module and power distribution board, providing regulated power to flight controller and the ESCs, and sending battery voltage/current to the flight controller.

This is wired up in the same way as described in the [Pixhawk 4 Quick Start > Power](../assembly/quick_start_pixhawk4.md#power) documentation.

It has the following characteristics/limits:

- PCB Current: total 120A outputs (MAX)
- UBEC 5V output current: 3A
- UBEC input voltage : 7~51v (2~12s LiPo)
- Dimensions: 68*50*8 mm
- Mounting Holes: 45\*45mm
- Weight: 36g
- Package includes:
  - PM07 board (1)
  - 80mm XT60 connector wire (1)

:::info Див. також [Керівництво зі швидкого запуску PM07](https://docs.holybro.com/power-module-and-pdb/power-module/pm07-quick-start-guide) (Holybro).
:::

### Battery Configuration

The battery/power setup must be configured in [Battery Estimation Tuning](../config/battery.md). For either Power Module you will need to configure the _Number of Cells_.

You will not need to update the _voltage divider_ unless you are using some other power module (e.g. the one from the Pixracer).

## Radio Control

A remote control (RC) radio system is required if you want to _manually_ control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then _bind_ them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers to _Durandal_:

- Spektrum/DSM receivers connect to the [DSM RC](../flight_controller/durandal.md#dsm-rc-port) input.

  ![Durandal - DSM](../../assets/flight_controller/durandal/dsm.jpg)

- PPM and S.Bus receivers connect to the [SBUS_IN/PPM_IN](../flight_controller/durandal.md#rc-in) input port (marked as RC IN, next to the MAIN/AUX inputs).

  ![Durandal - Back Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

- PPM and PWM receivers that have an _individual wire for each channel_ must connect to the **PPM RC** port _via a PPM encoder_ [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

For more information about selecting a radio system, receiver compatibility, and binding your transmitter/receiver pair, see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).

## Telemetry Radios (Optional)

Telemetry radios may be used to communicate and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The vehicle-based radio should be connected to the [TELEM1](../flight_controller/durandal.md#telem1_2_3) port as shown below using one of the 6-pos connectors (if connected to this port, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually by USB).

![Durandal/Telemetry Radio](../../assets/flight_controller/durandal/holybro_telemetry_radio.jpg)

## SD Card (Optional)

SD cards are highly recommended as they are needed to [log and analyse flight details](../getting_started/flight_reporting.md), to run missions, and to use UAVCAN-bus hardware. Insert an SD card into the _Durandal_ where indicated below.

![Durandal SD Card](../../assets/flight_controller/durandal/durandal_sd_slot.jpg)

:::tip
Для додаткової інформації дивіться [Основні поради > SD-карти (можливістю Видалення пам'яті)](../getting_started/px4_basic_concepts.md#sd-cards-removable-memory).
:::

## Motors

Motors/servos control signals are connected to the **I/O PWM OUT** (**MAIN OUT**) and **FMU PWM OUT** (**AUX**) ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md).

![Durandal - Back Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

The motors must be separately [powered](#power).

:::info
Якщо ваша конструкція не зазначена у довіднику конструкцій, скористайтеся "загальною" конструкцією потрібного типу.
:::

:::tip
_Durandal_ має 5 допоміжних портів, тому не може бути використаний з повітряними рамами, які відображають AUX6, AUX7, AUX8 на двигуни або інші критичні керування польотом.
:::

## Other Peripherals

The wiring and configuration of optional/less common components is covered within the topics for individual [peripherals](../peripherals/index.md).

## Pinouts

[Durandal > Pinouts](../flight_controller/durandal.md#pinouts)

<a id="configuration"></a>

## PX4 Configuration

First you will need to install [PX4 "Master" Firmware](../config/firmware.md#custom) onto the controller using _QGroundControl_.

:::info Підтримка Durandal буде в релізі PX4, який слідує за PX4 v1.10, який є _стабільним_.
:::

Further general configuration information is covered in: [Autopilot Configuration](../config/index.md).

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)

## Further information

- [Durandal Overview](../flight_controller/durandal.md)
- [Durandal Technical Data Sheet](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Durandal_technical_data_sheet_90f8875d-8035-4632-a936-a0d178062077.pdf) (Holybro)
- [Durandal Pinouts](https://holybro.com/collections/autopilot-flight-controllers/products/Durandal-Pinouts) (Holybro)
- [Durandal_MB_H743sch.pdf](https://github.com/PX4/PX4-user_guide/raw/main/assets/flight_controller/durandal/Durandal_MB_H743sch.pdf) (Durandal Schematics)
- [STM32H743IIK_pinout.pdf](https://github.com/PX4/PX4-user_guide/raw/main/assets/flight_controller/durandal/STM32H743IIK_pinout.pdf) (Durandal Pinmap)
