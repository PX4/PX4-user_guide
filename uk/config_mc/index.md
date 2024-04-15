# Конфігурація мультикоптера

Конфігурація та калібрування багтороторного вертольота виконується за тими ж високорівневими кроками, що і інші рами: вибір прошивки, конфігурація рами, включаючи геометрію приводника/двигуна та відображення виводів, конфігурація та калібрування сенсорів, налаштування безпеки та інших функцій, а також налаштування.

Ця тема пояснює, як налаштувати багатокоптер, використовуючи вибрані теми з [Стандартна конфігурація](../config/index.md), [Розширена конфігурація](../advanced_config/index.md) та [Периферійні пристрої контролера польоту](../peripherals/index.md), разом з темами настройки, специфічними для багатокоптерів.

::: info
Ця тема є рекомендованою точкою запису при першому виконанні конфігурації і калібрування нового кадру мультиоптика.
:::

## Завантаження прошивки

Перший крок - [завантажити прошивку PX4](../config/firmware.md) на ваш [контролер польоту](../flight_controller/index.md). Це найлегше зробити за допомогою QGroundControl, який автоматично вибере відповідне прошивку для вашого конкретного обладнання контролера. За замовчуванням QGC встановить останню стабільну версію PX4, але ви можете вибрати бета-версію або власні версії, якщо потрібно.

Відповідні теми:

- [Завантаження прошивки](../config/firmware.md)

## Frame Selection and Configuration

Цей розділ пояснює, як налаштувати тип транспортного засобу (багатокоптер), конкретну геометрію двигуна/керування польотом та виходи двигуна.

Спочатку [виберіть каркас багтроторного вертольота](../config/airframe.md) (варіанти перераховані в [Довідник з каркасів >  Вертольот](../airframes/airframe_reference.md#copter)). Ви повинні вибрати рамку, яка відповідає марці та моделі вашого транспортного засобу, якщо така існує, а в іншому випадку виберіть тип рамки "Загальний", який найбільш точно відповідає вашій геометрії за кількістю двигунів та їх відносними положеннями. Наприклад, для рами [Quadrotor X](../airframes/airframe_reference.md#quadrotor-x) ви шукаєте назву вашої рами у списку, і якщо вона відсутня, виберіть раму [Загальний Quadrotor X](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter).

:::info Будь-яка обрана рама багтороторного коптера може бути змінена на наступному кроці (конфігурація приводу), щоб додати / видалити двигуни та змінити геометрію, і вказати, які виходи польотного контролера підключені до певних двигунів та властивості виходу. Вибір рамки, яка відповідає вашому транспортному засобу, зменшує роботу з налаштуванням, необхідну для виконання.

:::details
Як це працює (деталі) Вибір підфрейму застосовує [файл конфігурації фрейму](../dev_airframes/adding_a_new_frame.md#adding-a-frame-configuration), який містить попередньо визначений набір [параметрів](../advanced_config/parameters.md), таких як [CA_AIRFRAME=0](../advanced_config/parameter_reference.md#CA_AIRFRAME) для типу транспортного засобу та [CA_ROTOR_COUNT](../advanced_config/parameter_reference.md#CA_ROTOR_COUNT) для кількості роторів.

Конфігурація рами може визначити все про транспортний засіб, від його геометрії та відображень виходу до налаштувань та калібрування значень. Коли ви виводите новий транспортний засіб, рама зазвичай містить досить мінімальну конфігурацію:

- Кадри з назвою "Загальний" визначають тип транспортного засобу, кількість роторів та позиції роторів-заповнювачі. Після вибору конструкції фюзеляжу ви визначаєте фактичну геометрію, а потім налаштовуєте виходи.
- Кадри з назвою моделі/бренду визначать тип транспортного засобу, кількість роторів, фактичні позиції роторів та напрямки руху двигуна. Після вибору конструкції фюзеляжу вам зазвичай все ще потрібно налаштувати виводи.
:::

Наступним кроком є визначення геометрії вашого транспортного засобу [(кількість двигунів та їх відносні позиції)](../config/actuators.md#motor-geometry-multicopter) та [призначення цих двигунів](../config/actuators.md#actuator-outputs) фізичним виходам, до яких вони підключені на вашому польотному контролері (обидва ці аспекти розглянуті в [Конфігурації та Тестуванні Актуаторів](../config/actuators.md)).

Якщо використовуєте PWM ESC та OneShot ESC (але не DShot та DroneCAN/Cyphal ESC), то потім слід виконати [Калібрування ESC](../advanced_config/esc_calibration.md) перед переходом до [Конфігурації двигуна](../config/actuators.md#motor-configuration). Це забезпечує, що всі ESC надають точно такий самий вихід для заданого входу (ідеально, ми спочатку калібруємо ESC, але ви не можете калібрувати свої ESC, поки ви не відобразите виходи).

Останнім кроком є [Конфігурація двигуна](../config/actuators.md#motor-configuration):

- [Реверс будь-яких моторів](../config/actuators.md#reversing-motors), які не відповідають напрямку обертання, налаштованому в геометрії. Для DShot ESC ви можете це зробити через інтерфейс тестування приводу.
- PWM, OneShot, and CAN ESC, set the motor input limits for disarmed, low and high speed (not needed for DShot ESC)

Relevant topics:

- [Vehicle (Frame) Selection](../config/airframe.md) — Select vehicle type to match your frame.
- [Actuator Configuration and Testing](../config/actuators.md) — Vehicle geometry, output mapping, motor configuration, testing.
- [ESC Calibration](../advanced_config/esc_calibration.md) — Do between output mapping and motor configuration (topic above) for PWM and OneShot ESC.

## Sensor Setup and Calibration

PX4 most commonly relies on a magnetometer (compass) for direction information, a barometer for altitude, a gyroscope for body rates, an accelerometer for attitude and a GPS/GNSS for global position. Pixhawk flight controllers (and many others) have inbuilt magnetometer, accelerometer, gyroscope, and barometer. The inbuilt compass usually isn't particularly reliable, and it is common to also add an external compass (usually combined with a GNSS receiver in the same device).

We first need to set the [Sensor Orientation](../config/flight_controller_orientation.md), informing PX4 how the autopilot (and its inbuilt sensors) and external compasses are oriented relative to the vehicle. Generally you'll orient towards the front of the vehicle and not have to set anything. Once that is done we need to calibrate the compass(es), gyroscope, and accelerometer.

The core sensor setup is covered in these topics:

- [Sensor Orientation](../config/flight_controller_orientation.md)
- [Compass](../config/compass.md)
- [Gyroscope](../config/gyroscope.md)
- [Accelerometer](../config/accelerometer.md)

PX4 can use other peripherals, such as distance sensors, optical flow sensors, traffic avoidance alarms, cameras, and so on:

- [Flight Controller Peripherals](../peripherals/index.md) - Setup specific sensors, optional sensors, actuators, and so on.

::: info Sensors that you don't need to calibrate/configure include:

- [Level Horizon](../config/level_horizon_calibration.md) calibration isn't usually needed if you have mounted the flight controller level.
- Sensors that are not present, or that are not used by PX4 multicopter for flight control, such as [Airspeed sensors](../config/airspeed.md).
- Sensors that don't need calibration, including: Barometers and GNSS.

:::

## Manual Control Setup

Pilots can control a vehicle manually using either a Radio Control (RC) System or a Joystick/Gamepad controller connected via QGroundControl.

::: info
A manual control is essential in order to bring up a new vehicle safely!
:::

Radio Control:

- [Radio Controller (RC) Setup](../config/radio.md)
- [Flight Mode Configuration](../config/flight_mode.md)

Joystick/GamePad:

- [Joystick Setup](../config/joystick.md) (includes button/flight mode mapping)

## Safety Configuration

PX4 can be configured to automatically handle conditions such as low battery, losing radio or data links, flying too far from the home location, and so on:

- [Battery Estimation Tuning](../config/battery.md) — estimate remaining power (needed for low power failsafe).
- [Safety Configuration (Failsafes)](../config/safety.md)

## Вдосконалення

Tuning is the final step, carried out only after most other setup and configuration is complete.

- Rate and attitude controllers:
- [Autotune](../config/autotune.md) — Automates tuning PX4 rate and attitude controllers (recommended).

  ::: info
Automatic tuning works on frames that have reasonable authority and dynamics around all the body axes.
It has primarily been tested on racing quads and X500, and is expected to be less effective on tricopters with a tiltable rotor.
The other two guides are only needed if there is a problem with autotune.
:::

- [MC PID Tuning (Manual/Basic)](../config_mc/pid_tuning_guide_multicopter_basic.md) — Manual tuning basic how to.
- [MC PID Tuning Guide (Manual/Detailed)](../config_mc/pid_tuning_guide_multicopter.md) — Manual tuning with detailed explanation.
- [MC Filter/Control Latency Tuning](../config_mc/filter_tuning.md) — Trade off control latency and noise filtering.
- [MC Setpoint Tuning (Trajectory Generator)](../config_mc/mc_trajectory_tuning.md)
  - [MC Jerk-limited Type Trajectory](../config_mc/mc_jerk_limited_type_trajectory.md)
- [Multicopter Racer Setup](../config_mc/racer_setup.md)


<!--
- Explain what you have to tune on PX4, what you can tune, and what each topic covers
- I expect we should start with an exhaustive list of the tuning you could want to do - such as position tuning, etc. Do we have one?
 -->

<!-- TBD this is just text for me to mine

AFAIK autotune was tested on various not so custom platforms e.g. X500, racer quad, Loong standard VTOL. I honestly used it only once on a tricopter and it worked for roll and pitch but the resulting yaw tuning was not stable. Since then it was improved but that's not merged yet :eyes: https://github.com/PX4/PX4-Autopilot/pull/21857
Autotune was never tested on a Helicopter.
can you in theory autotune frame with any number of motors?
In theory yes but it needs to be able to have reasonable authority around all axes so I'd expect autotune to not work well for a monocopter without swashplate and so on. Probably also the controllers wouldn't work out of the box. I saw issues before with designs that tilt the rotor e.g. tricopter, bicopter, ... again


will PX4 still understand how to autotune?
Autotune should work for any vehicle that has reasonable authority and dynamics around all the body axes. A tiltable motor e.g. tricopter has at the least dynamics which are less tested with autotune.
My assumption is that the mixing system can cope with whatever geometry you throw at it.
Yes but it must be physically feasible. E.g. if you make a quadrotor where all motors turn the same way it will "deal" with it but that cannot work without very specific controllers. Same for a monocopter or a tricopter without swiveling one motor.
-->

## Дивіться також

- [QGroundControl > Налаштування](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/setup_view.html)
- [Периферія контролера польоту](../peripherals/index.md) - налаштування конкретних датчиків, опціональних датчиків, приводів тощо.
- [Розширена конфігурація](../advanced_config/index.md) - заводське калібрування/OEM, налаштування додаткових функцій, менш поширені конфігурації.
- Vehicle-Centric Config/Tuning:
  - **Конфігурація/налаштування мультикоптера**
  - [Конфігурація/налаштування гелікоптера](../config_heli/index.md)
  - [Конфігурація/налаштування літака (з нерухомим крилом)](../config_fw/index.md)
  - [Конфігурація/налаштування VTOL](../config_vtol/index.md)
