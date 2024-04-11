# Основні поняття

This topic provides a basic introduction to drones and using PX4 (it is meant mostly for novice users but is also a good introduction for more experienced users).

Якщо ви вже знайомі з основними поняттями, ви можете перейти до [Базової Збірки](../assembly/README.md) щоби вивчити як збирати певне обладнання для автопілота. Для завантаження прошивки й налаштування рухомого засобу за допомогою _QGroundControl_, див. [Основні налаштування](../config/README.md).

## Що таке безпілотник?

A drone, or Unmanned Vehicles (UV), is an unmanned "robotic" vehicle that can be manually or autonomously controlled. They can travel in air, on the ground, on/under the water, and are used for many [consumer, industrial, government and military applications](https://px4.io/ecosystem/commercial-systems/), including aerial photography/video, carrying cargo, racing, search and surveying, and so on.

Drones are more formally referred to as Unmanned Aerial Vehicles (UAV), Unmanned Ground Vehicles (UGV), Unmanned Surface Vehicles (USV), Unmanned Underwater Vehicles (UUV).

::: info
The term Unmanned Aerial System (UAS) typically refers to a UAV and all of the other components of a complete system, including a ground control station and/or radio controller, and any other systems used to control the drone, capture, and process data.
:::


## Drone Types

There are many different vehicle frames (types), and within the types there are many variations. Some of the types, along with the use cases for which they are most suited are listed below.

- [Multicopters](../frames_multicopter/index.md) — Multi-rotors offer precision hovering and vertical takeoff, at the cost of shorter and generally slower flight. They are the most popular type of flying vehicle, in part because they are easy to assemble, and PX4 has modes that make them easy to fly and very suitable as a camera platform.
- [Helicopters](../frames_helicopter/index.md) — Helicopters similar benefits to Multicopters but are mechanically more complex and more efficient. They are also much harder to fly.
- [Planes (Fixed-wing)](../frames_plane/index.md) — Fixed-wing vehicles offer longer and faster flight than multicopters, and hence better coverage for ground surveys etc. However they are harder to fly and land than multicopters, and aren't suitable if you need to hover or fly very slowly (e.g. when surveying vertical structures).
- [VTOL](../frames_vtol/index.md) (Vertical Takeoff and Landing) - Hybrid Fixed-wing/Multicopter vehicles offer the best of both worlds: take off in vertical mode and hover like a multicopter but transition to forward flight like an airplane to cover more ground. VTOL are often more expensive than either multicopters and fixed-wing aircraft, and harder to build and tune. They come in a number of types: tiltrotors, tailsitters, quadplanes etc.
- [Airships](../frames_airship/index.md)/[Balloons](../frames_balloon/index.md) — Lighter-than-air vehicles that typically offer high altitude long duration flight, often at the cost of having limited (or no) control over speed and direction of flight.
- [Rovers](../frames_rover/index.md) — Car-like ground vehicles. They are simple to control and often fun to use. They can't travel as fast as most aircraft, but can carry heavier payloads, and don't use much power when still.
- **Boats** — Water-surface vehicles.
- [Submersibles](../frames_sub/index.md) — Underwater vehicles.


Для отримання додаткової інформації:

- [Vehicle Types & Setup](../airframes/index.md)
- [Airframe setup](../config/airframe.md)
- [Airframe Reference](../airframes/airframe_reference.md).

## Autopilots

"Мізками" дрону є автопілот.

It minimally consists of _flight stack_ software running on a real time OS ("RTOS") on _flight controller_ (FC) hardware. Політний стек забезпечує основну стабілізацію та функції безпеки, а зазвичай також певний рівень допомоги пілоту для ручного польоту та автоматизації загальних завдань, таких як зліт, посадка та виконання попередньо визначених місій.

Деякі автопілоти також включають універсальну обчислювальну систему, яка може забезпечувати "вищий рівень" управління та контролю, а також підтримувати більш просунуті мережеві технології, машинний зір та інші можливості. Це може бути реалізовано у вигляді окремого [супутнього комп'ютера](#offboard-companion-computer), але в майбутньому все більш імовірно, що це буде повністю інтегрований компонент.


## Політний стек PX4

[PX4](https://px4.io/) is powerful open source autopilot _flight stack_ running on the NuttX RTOS.

Деякі ключові можливості PX4:

- Supports many different vehicle frames/types, including: [multicopters](../frames_multicopter/index.md), [fixed-wing aircraft](../frames_plane/index.md) (planes), [VTOLs](../frames_vtol/index.md) (hybrid multicopter/fixed-wing), [ground vehicles](../frames_rover/index.md), and [underwater vehicles](../frames_sub/index.md).
- Great choice of drone components for [flight controller](#flight-controller), [sensors](#sensors), [payloads](#payloads), and other peripherals.
- Гнучкі та потужні [режими польоту](#flight-modes) та [функції безпеки](#safety-settings-failsafe).
- Robust and deep integration with [companion computers](#offboard-companion-computer) and [robotics APIs](../robotics/index.md) such as [ROS 2](../ros/ros2_comm.md) and [MAVSDK](http://mavsdk.mavlink.io)).

PX4 is a core part of a broader drone platform that includes the [QGroundControl](#qgc) ground station, [Pixhawk hardware](https://pixhawk.org/), and [MAVSDK](http://mavsdk.mavlink.io) for integration with companion computers, cameras and other hardware using the MAVLink protocol. PX4 підтримується [Dronecode Project](https://www.dronecode.org/).

## Ground Control Stations

Ground Control Stations (GCS) are ground based systems that allow UV operators to monitor and control a drone and its payloads. A subset of the products that are known to work with PX4 are listed below.

### QGroundControl {#qgc}

The Dronecode GCS software is called [QGroundControl](http://qgroundcontrol.com/) ("QGC"). It runs on Windows, Android, MacOS or Linux hardware, and supports a wide range of screen form factors. You can download it (for free) from [here](http://qgroundcontrol.com/downloads/).

![Головний екран QGC](../../assets/concepts/qgc_fly_view.png)

QGroundControl communicates with the drone using a telmetry radio (a bidirectional data link), which allows you to get real-time flight and safety information, and to control the vehicle, camera, and other payloads using a point-and-click interface. On hardware that supports them, you can also manually fly the vehicle using joystick controllers. QGC can also be used to visually plan, execute, and monitor autonomous missions, set geofences, and much more.

QGroundControl desktop versions are also used to install (flash) PX4 firmware and configure PX4 on the drone's autopilot/flight controller hardware.

### Auterion Mission Control (AMC) {#amc}

[Auterion Mission Control](https://auterion.com/product/mission-control/) is a powerful and fully featured ground control station application that is optimized for _pilots_ rather than vehicle configuration. While designed to work with Auterion products, it can be used with "vanilla" PX4.

For more information see:

- [AMC docs](https://docs.auterion.com/vehicle-operation/auterion-mission-control)
- [AMC on Google Play](https://play.google.com/store/apps/details?id=com.auterion.auteriongs)

## Drone Components & Parts

### Flight Controller

Flight controllers (FC) are the hardware onto which the PX4 flight stack firmware is loaded and run. They are connected to sensors from which PX4 determines its state, and to the actuators/motors that it uses to stabilise and move the vehicle.

<img src="../../assets/flight_controller/cuav_pixhawk_v6x/pixhawk_v6x.jpg" width="230px" title="CUAV Pixhawk 6X"  />

PX4 can run on many different types of [Flight Controller Hardware](../flight_controller/index.md), ranging from [Pixhawk Series](../flight_controller/pixhawk_series.md) controllers to Linux computers. These include [Pixhawk Standard](../flight_controller/autopilot_pixhawk_standard.md) and [manufacturer-supported](../flight_controller/autopilot_manufacturer_supported.md) boards. You should select a board that suits the physical constraints of your vehicle, the activities you wish to perform, and cost.

For more information see: [Flight Controller Selection](flight_controller_selection.md)

### Датчики

PX4 uses sensors to determine vehicle state, which it needs in order to stablise the vehicle and enable autonomous control. The vehicle states include: position/altitude, heading, speed, airspeed, orientation (attitude), rates of rotation in different axes, battery level, and so on.

PX4 _minimally requires_ a [gyroscope](../sensor/gyroscope.md), [accelerometer](../sensor/accelerometer.md), [magnetometer](../gps_compass/magnetometer.md) (compass) and [barometer](../sensor/barometer.md). A [GNSS/GPS](../gps_compass/index.md) or other source of global position is needed to enable all automatic modes, and some manual/assisted modes. Fixed-wing and VTOL-vehicles should additionally include an [airspeed sensor](../sensor/airspeed.md) (highly recommended).

The minimal set of sensors is incorporated into [Pixhawk Series](../flight_controller/pixhawk_series.md) flight controllers (and may also be in other controller platforms). Additional/external sensors can be attached to the controller.

For more information see: [Sensor Hardware & Setup](../sensor/index.md)

### Виводи: Двигуни, Сервоприводи, Актуатори, або приводи

PX4 використовує _виводи_ для керування: швидкістю двигуна (наприклад через [ESC](#escs-motors)), аеродинамічними поверхнями, наприклад елеронами та закрилками, тригерами камер, парашутів, захватів, а також багатьма іншими типами корисного навантаження.

Такі виводи можуть бути PWM портами або вузлами DroneCAN (наприклад [контролери двигунів](../dronecan/escs.md) DroneCAN). Зображення нижче показують порти виводу PWM для [Pixhawk 4](../flight_controller/pixhawk4.md) і [Pixhawk 4 mini](../flight_controller/pixhawk4_mini.md).

![Порти виводу Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_main_aux_ports.jpg) ![Порти MAIN у Pixhawk4 mini](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_pwm.png)

Виводи розділені на `MAIN` і `AUX` та індивідуально пронумеровані (тобто `MAINn` та `AUXn`, де `n` змінюється від 1 до зазвичай 6 або 8). Також вони можуть бути позначені як `IO PWM Out` та `FMU PWM OUT` (або подібним чином).

:::warning
Політний контролер може мати тільки `MAIN` PWM виводи (як _Pixhawk 4 Mini_), або мати тільки 6 виводів `MAIN` чи `AUX`. Переконайтеся, що ви обрали контролер який має достатньо портів/виводів для вашого [планера](../airframes/airframe_reference.md).
:::

Ви можете під'єднати майже будь-який вивід до будь-якого мотора чи іншого привода, призначивши пов'язану функцію ("Motor 1") на бажаний вивід ("AUX1") в QGroundControl: [Налаштування і перевірка актуатора](../config/actuators.md). Зверніть увагу, що функції (позиції моторів та приводів) для кожного шасі наведено в [Довіднику планерів](../airframes/airframe_reference.md).

**Примітки:**

- Контролери Pixhawk мають плату FMU та _можуть_ мати окрему плату IO. Якщо плата IO наявна, `AUX` порти під'єднані напряму до FMU, а `MAIN` порти під'єднані до плати IO. В іншому випадку `MAIN` порти під'єднані до FMU, а порти `AUX` відсутні.
- Порти виводу FMU можуть використовувати протоколи [D-shot](../peripherals/dshot.md) або _One-shot_ (так само як PWM), які забезпечують набагато меншу затримку. Це може бути корисним для тих хто займається перегонами та інших планерів які потребують кращої ефективності.
- Існує лише 6-8 виводів в `MAIN` та `AUX` порти оскільки більшість політних контролерів має саме стільки PWM/D-shot/One-shot виводів. В теорії може бути більше виводів, якщо шина підтримує це (наприклад UAVCAN не обмежена такою малою кількістю вузлів).

### ESC & Мотори

Багато безпілотників на базі P4X використовують безколекторні електродвигуни, які керуються польотним контролером через електронний регулятор швидкості (ECS) (ECS перетворює сигнал з політного контролера у відповідний рівень потужності, що передається на мотор).

Для отримання інформації про те, які ESC/мотори підтримуються PX4 дивіться:

- [ESC & Мотори](../peripherals/esc_motors.md)
- [Калібрування ESC](../advanced_config/esc_calibration.md)
- [Прошивки ESC та огляд протоколів](https://oscarliang.com/esc-firmware-protocols/) (oscarliang.com)

### Батарея/Живлення

Безпілотники на базі PX4 найчастіше працюють від літій-полімерних акумуляторів (LiPo). Зазвичай батарея під'єднана до системи за допомогою [Модуля живлення](../power_module/README.md) або _Плати керування живленням_, які забезпечують окреме живлення для політного контролера та ESC (для моторів).

Інформацію про батареї та їх налаштування можна знайти у [Налаштування батарей](../config/battery.md) та в інструкції [Базова збірка](../assembly/README.md) (наприклад у параграфі [Швидкий початок з підключення Pixhawk 4 > Живлення](../assembly/quick_start_pixhawk4.md#power)).

### Ручне керування

Пілоти можуть керувати рухомим засобом вручну використовуючи або пульт [Системи радіокерування (RC)](#radio-control-rc) або [Джойстик/Геймпад](#gcs-joystick-controller) які підключені через QGroundControl.

![Передавач Taranis X9D](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg) <img src="../../assets/peripherals/joystick/micronav.jpg" alt="Фото MicroNav, наземного контролера з інтегрованими джойстиками" width="400px" />

Системи радіокерування використовують спеціалізований наземний радіопередавач та приймач на апараті для передачі сигналів керування. Вони завжди повинні використовуватися, коли ви вперше налаштовуєте/тестуєте нову конструкцію рами або під час польотів на перегонах / акробатичних польотах (та інших випадках коли важлива мала затримка).

Системи з джойстиком використовують QGroundControl для кодування інформації керування з "стандартного" ігрового джойстика комп'ютера у повідомлення MAVLink та надсилають її до апарату за допомогою (спільного) радіоканалу телеметрії. Вони можуть використовуватися для більшості випадків ручного польоту, таких як зліт, обстеження тощо, за умови, що ваш канал телеметрії має достатньо високу пропускну спроможність / низьку затримку.

Джойстики часто використовуються в інтегрованих GCS / системах ручного керування, тому що інтеграція джойстика дешевша та простіша, ніж окремої системи радіокерування, і для більшості випадків використання нижча затримка не має значення. Вони також ідеально підходять для польотів у симуляторі PX4, оскільки їх можна безпосередньо під'єднати до вашого комп'ютера наземної станції керування.

::: info PX4 does not _require_ a manual control system for autonomous flight modes.
:::

### Запобіжний перемикач

Деякі рухомі засоби мають _запобіжний перемикач_ який потрібно увімкнути перед тим як апарат може бути [увімкнено](#arming-and-disarming) (у такому стані, на мотори подається живлення та пропелери готові обертатись).

Зазвичай запобіжний перемикач інтегрується в пристрій GPS, але також може бути окремим фізичним компонентом.

### Радіопередавачі даних/телеметрії

[Радіопередавачі даних/телеметрії](../telemetry/README.md) можуть забезпечувати безпровідне з'єднання за протоколом MAVLink між наземною станцією керування такою як _QGroundControl_ та рухомим засобом на базі PX4. Це дозволяє налаштовувати параметри, коли транспортний засіб в польоті, перевіряти телеметрію в режимі реального часу, змінювати політне завдання на льоту тощо.

### Бортовий / Супутній комп'ютер

[Супутній комп'ютер](../companion_computer/README.md) (також відомий як "комп'ютер місії" або "бортовий комп'ютер"), окремий комп'ютер на рухомому засобі який комунікує з PX4 для забезпечення вищого рівня керування так контролю.

Супутній комп'ютер зазвичай працює на Linux, оскільки це краща платформа для розробки програмного забезпечення та дозволяє безпілотникам отримувати перевагу від наявності передвстановленого програмного забезпечення для машинного зору, мережевої взаємодії тощо.

Політний контролер та супутній комп'ютер можуть бути інтегровані на одній платі, полегшуючи розробку апаратного забезпечення, чи бути окремими пристроями, під'єднаними через serial кабель, Ethernet кабель чи WiFi. Найчастіше супутній комп'ютер спілкується з PX4 використовуючи високорівневе Robotics API, таке як [MAVSDK](https://mavsdk.mavlink.io/) або [ROS 2](../ros/ros2_comm.md).

Відповідні теми:

- [Супутні комп'ютери](../companion_computer/index.md)
- [Режим зовнішнього керування](../flight_modes/offboard.md) - режим польоту для зовнішнього управління PX4 з наземної станції керування або супутнього комп'ютера.
- [Robotics APIs](../robotics/index.md)

### SD-карти (знімна пам'ять)

PX4 використовує SD карти пам'яті для зберігання [журналів польоту](../getting_started/flight_reporting.md), а також вони необхідні для використання периферії UAVCAN та для польоту за [місіями](../flying/missions.md).

За замовчуванням, якщо SD карта не присутня, PX4 подає два рази звуковий сигнал [форматування не вдалося (подвійний писк)](../getting_started/tunes.md#format-failed) протягом запуску (й жодна зі згаданих вище функцій не буде доступна).

::: tip
Максимальний розмір SD-карти що підтримується на платах Pixhawk - 32GB. Карти _SanDisk Extreme U3 32GB_ та _Samsung EVO Plus 32_ [дуже рекомендується](../dev_log/logging.md#sd-cards).
:::

SD карти, однак, не обов'язкові. Політні контролери, які не містять слот для SD карти, можуть:

- Відключати сигнал сповіщення використовуючи параметр [CBRK_BUZZER](../advanced_config/parameter_reference.md#CBRK_BUZZER).
- [Передавати журнали](../dev_log/logging.md#log-streaming) до іншого компонента (супутнього пристрою).
- Зберігати місії в RAM/FLASH.
  <!-- Too low-level for this. But see FLASH_BASED_DATAMAN in  Intel Aero: https://github.com/PX4/PX4-Autopilot/blob/main/boards/intel/aerofc-v1/src/board_config.h#L115 -->

## Корисне навантаження

Корисне навантаження — це обладнання, яке переноситься апаратом для досягнення цілей користувача або місії, такі як камери в місіях з обстеження, інструменти, що використовуються для інспектування, наприклад, детектори радіації, та вантаж, який потрібно доставити. PX4 підтримує багато камер та широкий спектр корисних навантажень.

Корисні навантаження підключаються до [виводів політного контролера](#outputs-motors-servos-actuators) і можуть бути активовані автоматично в місіях, або вручну з радіоконтролера або джойстика, або з наземної станції (через команди MAVLink/MAVSDK).

For more information see: [Payloads & Cameras](../payloads/index.md)

## Увімкнення та вимкнення

Рухомий засіб є увімкненим, тобто у стані _armed_, коли на всі мотори та приводи подається живлення, та є вимкненим, тобто у стані _disarmed_, коли нічого не заживлено. Також є стан _prearmed_ коли живлення подається тільки на приводи.

:::warning
Рухомі засоби в стані armed можуть бути небезпечними оскільки пропелери вже обертаються.
:::

Увімкнення, тобто arming, за замочуванням виконується (на передавачах Mode 2) утримуючи throttle/yaw RC стік в _нижньому правому_ положенні одну секунду (для вимкнення, тобто disarming, утримуйте стік у нижньому лівому положенні). Також альтернативно є можливість налаштувати PX4 для увімкнення за допомогою RC перемикача або кнопки (й можна відправляти MAVLink команди увімкнення з наземної станції).

Для зменшення нещасних випадків, коли рухомі засоби на землі, вони повинні бути увімкненими якомога менше часу. За замовчуванням рухомі засоби:

- _Disarmed_ або _Prearmed_ (мотори не заживлені) коли не використовуються, і повинні бути увімкненими, тобто _armed_ перед злетом.
- Автоматично перемикаються у стан disarmed/prearmed якщо засіб не злетів достатньо швидко після увімкнення (час перемикання налаштовується).
- Автоматично перемикаються у стан disarmed/prearmed незабаром після посадки (час налаштовується).
- Увімкнення запобігається, якщо засіб не в "нормальному" стані.
- Увімкнення запобігається, якщо засіб має [запобіжний перемикач](#safety-switch) який не увімкнений.
- Увімкнення запобігається, якщо VTOL знаходиться в режимі літака ([за замовчуванням](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).

В стані prearmed можна користуватись приводами, тоді як disarmed вимикає усе живлення. Prearmed та disarmed стани є безпечними, а конкретний рухомий засіб може підтримувати один зі станів або обидва.

:::tip
Іноді рухомий засіб не вмикається з неочевидних причин. QGC v4.2.0 (денна збірка на час написання) та пізніших версій надає звіт про перевірку стану готовності у [Fly View > Arming and Preflight Checks](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/fly_view/fly_view.html#arm). Починаючи з PX4 v1.14 це забезпечує комплексну інформацію про проблеми увімкнення разом з можливими рішеннями.
:::

Огляд з подробицями щодо налаштування увімкнення та вимкнення може бути знайдений тут: [Налаштування Prearm, Arm, Disarm](../advanced_config/prearm_arm_disarm.md).

## Режими польоту

Режими польоту забезпечують різні типи/рівні автоматизації рухомого засобу та підтримки користувача (пілота) з боку автопілоту. _Автономні режими_ повністю керуються автопілотом та не потребують залучення пілота або віддаленого керування. Ці режими використовуються, наприклад, для автоматизації загальних задач на кшталт зльоту, повернення до початкової позиції, приземлення тощо. Інші автономні режими виконують запрограмовані місії, слідують за GPS маяком або приймають команди з бортового комп'ютера або наземної станції.

_Ручні режими_ контролюються користувачем (через RC стіки/джойстики) та з підтримкою автопілота. Різні ручні режими надають різні характеристики польоту, наприклад, в деяких режимах доступні акробатичні трюки, тоді як інші не можливо зрушити й вони будуть утримувати позицію/курс проти вітру.

:::tip
Не всі режими польоту доступні на всіх типах рухомих засобів, а деякі режими можуть використовуватись тільки при виконанні певних умов (наприклад багато режимів потребують оцінки глобальної позиції).
:::

Огляд доступних режимів польоту для кожного засобу можна знайти тут:

- [Режими польоту (Мультикоптер)](../flight_modes_mc/index.md)
- [Режими польоту (Фіксоване крило)](../flight_modes_fw/index.md)
- [Режими польоту (VTOL)](../flight_modes_vtol/index.md)
- [Режими польоту (Ровер)](../flight_modes_rover/index.md)

Інструкції як налаштувати перемикачі вашого засобу віддаленого керування для того, щоби включити різні режими польоту надано в [Налаштування режиму польоту](../config/flight_mode.md).

## Налаштування безпеки (Відмовостійкість)

PX4 має системи відмовостійкості, які можна налаштувати для захисту та повернення вашого засобу якщо щось піде не так! Вони дозволяють вам вказати території й умови, за яких можна безпечно літати, а також дію, що буде виконуватися, якщо відбудеться умова запобігання відмові (наприклад, посадка, утримання позиції або повернення до зазначеної точки).

::: info You can only specify the action for the _first_ failsafe event. Як тільки запобіжна подія станеться, система перейде в режим спеціального виконання таким чином, що наступні тригери запобігання відмові будуть управлятися окремим рівнем системи та кодом притаманним конкретному рухомому засобу.
:::

Основні запобіжні випадки перераховані нижче:

- Низький заряд батареї
- Втрата дистанційного керування (RC)
- Втрата позиції (якість глобальної оцінки позиції занадто низька).
- Втрата бортового комп'ютера (наприклад втрата зв'язку із супутнім комп'ютером)
- Втрата каналу даних (наприклад втрата з'єднання телеметрії з GCS).
- Порушення геозони (обмеження польоту апарату у віртуальному циліндрі).
- Запобігання відмові місії (запобігає запуску попередньої місії під час зльоту з нової локації).
- Уникнення трафіку (викликається даними з, наприклад ADSB транспондера).

Для додаткової інформації дивіться: [Безпека](../config/safety.md) (Базове налаштування).

## Курс та напрямок руху

Усі транспортні засоби, човни та літаки мають напрям курсу або орієнтацію, що базується на їхньому русі вперед.

![Направлення руху шасі](../../assets/concepts/frame_heading.png)

::: info
For a VTOL Tailsitter the heading is relative to the multirotor configuration (i.e. vehicle pose during takeoff, hovering, landing).
:::

Важливо знати напрямок курсу рухомого засобу з метою приведення автопілота у відповідність з вектором руху. Мультикоптери мають напрямок руху навіть якщо вони симетричні з усіх боків! Зазвичай виробники використовують кольорові позначки або кольорові руки для того, щоб вказати напрямок руху.

![Направлення руху шасі, вид згори](../../assets/concepts/frame_heading_top.png)

В наших ілюстраціях ми будемо використовувати червоне забарвлення для передніх пропелерів мультикоптера для того, щоб вказати напрямок руху.

Більш поглиблено про напрямок руху можна прочитати в [Орієнтація політного контролера](../config/flight_controller_orientation.md)
