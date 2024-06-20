# Моделювання в апаратному забезпеченні (SIH)

<Badge type="tip" text="PX4 v1.9 (MC)" /><Badge type="tip" text="PX4 v1.13 (MC, VTOL, FW)" />

:::warning
This simulator is [community supported and maintained](../simulation/community_supported_simulators.md). It may or may not work with current versions of PX4 (known to work in PX4 v1.14).

See [Toolchain Installation](../dev_setup/dev_env.md) for information about the environments and tools supported by the core development team.
:::

Simulation-In-Hardware (SIH) is an alternative to [Hardware In The Loop simulation (HITL)](../simulation/hitl.md) for quadrotors, fixed-wing vehicles (airplane), and VTOL tailsitters.

SIH can be used by new PX4 users to get familiar with PX4 and the different modes and features, and of course to learn to fly a vehicle using an RC controller in simulation, which is not possible using SITL.

## Загальний огляд

With SIH the whole simulation is running on embedded hardware: the controller, the state estimator, and the simulator. The Desktop computer is only used to display the virtual vehicle.

![Simulator MAVLink API](../../assets/diagrams/SIH_diagram.png)

### Сумісність

- SIH is compatible with all PX4 supported boards except those based on FMUv2.
- SIH для квадрокоптера підтримується з версії PX4 v1.9.
- SIH для фіксованих крил (літака) та VTOL-конвертоплана підтримується з версії PX4 v1.13.
- SIH як SITL (без апаратного забезпечення) з версії PX4 v1.14.

### Переваги

SIH provides several benefits over HITL:

- Він забезпечує синхронізований час, уникаючи двостороннього з'єднання з комп'ютером. В результаті користувачеві не потрібен такий потужний настільний комп'ютер.
- Усе моделювання залишається в середовищі PX4. Розробники, які знайомі з PX4, можуть легше включити свою власну математичну модель в симулятор. Вони, наприклад, можуть змінити аеродинамічну модель або рівень шуму датчиків, або навіть додати датчик для симуляції.
- Фізичні параметри, які представляють транспортний засіб (такі як маса, інерція та максимальна сила тяги), можна легко змінити з параметрів [SIH](../advanced_config/parameter_reference.md#simulation-in-hardware).

## Вимоги

To run the SIH, you will need a:

- [Контролер польоту](../flight_controller/README.md), наприклад плата серії Pixhawk
- [Ручне управління](../getting_started/px4_basic_concepts.md#manual-control): або [радіосистема управління,](../getting_started/rc_transmitter_receiver.md) або [джойстик](../config/joystick.md).
- QGroundControl for flying the vehicle via GCS.
- Development computer for visualizing the virtual vehicle (optional).

Починаючи з PX4 v1.14, ви можете запускати SIH "як SITL", у цьому випадку контролер польоту не потрібен.

## Налаштування SIH

Щоб налаштувати SIH

1. Підключіть контролер польоту до настільного комп’ютера за допомогою кабелю USB
1. Відкрийте QGroundControl і зачекайте, поки контролер польоту також завантажиться та підключиться.
1. Відкрийте [Vehicle Setup > Airframe](../config/airframe.md), а потім виберіть потрібний каркас:
   - [Квадрокоптер SIH X](../airframes/airframe_reference.md#copter_simulation_sih_quadcopter_x)
   - [SIH літак AERT](../airframes/airframe_reference.md#plane_simulation_sih_plane_aert)
   - [SIH Tailsitter Duo](../airframes/airframe_reference.md#vtol_simulation_sih_tailsitter_duo)

Потім автопілот перезавантажиться. Після перезапуску модуль `sih` запускається, і транспортний засіб має відображатися на карті наземної станції керування.

:::warning
Літак повинен злітати в ручному режимі на повному газі.
Крім того, якщо літак розбився, оцінювач стану може втратити своє виправлення.
:::

## Setting up the Display (optional)

The SIH can be displayed using [jMAVSim](../sim_jmavsim/index.md) as a visualiser.

::: tip SIH
does not _need_ a visualiser — you can connect with QGroundControl and fly the vehicle without one.
:::

Для відображення симульованого транспортного засобу:

1. Закрийте _QGroundControl_ (якщо відкрито).
1. Відключіть і знову підключіть контролер польоту (дайте декілька секунд на його завантаження).
1. Запустіть jMAVSim, викликавши скрипт **jmavsim_run.sh** з терміналу:

   ```sh
   ./Tools/simulation/jmavsim/jmavsim_run.sh -q -d /dev/ttyACM0 -b 2000000 -o
   ```

   де прапорці такі:

   - `-q`, щоб дозволити зв'язок з _QGroundControl_ (необов'язково).
   - `-d`, щоб розпочати роботу з послідовним пристроєм `/dev/ttyACM0` на Linux. На macOS це буде `/dev/tty.usbmodem1`.
   - `-b`, щоб встановити швидкість передачі даних через послідовний порт на `2000000`.
   - `-o`, щоб запустити jMAVSim тільки у _режимі відображення_ (тобто фізичний двигун вимкнено, і jMAVSim лише відображає траєкторію, надану SIH в реальному часі).
   - додайте прапорець `-a`, щоб відобразити літак, або '-t', щоб відобразити вертикальнітник. Якщо цей прапорець не вказаний, за замовчуванням відображатиметься квадрокоптер.

1. Через кілька секунд можна знову відкрити _QGroundControl_.

На цьому етапі систему можна запустити та вивести в польот. Транспортний засіб можна спостерігати за рухом в jMAVSim та на екрані _польоту QGC_.

## Запуск SIH як SITL (без апаратних засобів)

SIH можна запустити як SITL (Software-In-The-Loop) з версії 1.14. Це означає, що код симуляції виконується на ноутбуці/комп'ютері, подібно до Gazebo або jMAVSim. У цьому випадку не потрібне апаратне забезпечення контролера польоту.

Для запуску SIH як SITL:

1. Встановіть [PX4 набір інструментів розробника](../dev_setup/dev_env.md).
1. Виконайте відповідну команду make для кожного типу транспортного засобу (в корені репозиторію PX4-Autopilot):

   - квадротор:

     ```sh
     make px4_sitl sihsim_quadx
     ```

   - Закріплені крила (літаки):

     ```sh
     make px4_sitl sihsim_airplane
     ```

   - XVert VTOL tailsitter:

     ```sh
     make px4_sitl sihsim_xvert
     ```

SITL дозволяє виконувати симуляцію швидше, ніж у реальному часі. To run the airplane simulation 10 times faster than real time, run the command:

```sh
PX4_SIM_SPEED_FACTOR=10 make px4_sitl sihsim_airplane
```

To display the vehicle in jMAVSim during SITL mode, enter the following command in another terminal:

```sh
./Tools/simulation/jmavsim/jmavsim_run.sh -p 19410 -u -q -o
```

- add a flag `-a` to display an aircraft or `-t` to display a tailsitter. If this flag is not present a quadrotor will be displayed by default.

## Динамічний режим

Динамічні моделі для різних транспортних засобів:

- Квадротор: [pdf звіт](https://github.com/PX4/PX4-user_guide/raw/main/assets/simulation/SIH_dynamic_model.pdf).
- З нерухомим крилом: на основі кандидатської дисертації: «Моделювання динаміки маневрених безпілотних літальних апаратів з нерухомим крилом» Khan, Waqas, під керівництвом Nahon, Meyer, Університет Макгілла, докторська дисертація, 2016.
- Tailsitter: Натхненний магістерською дисертацією: «Моделювання та керування безпілотним літальним апаратом з літаючим крилом» Chiappinelli, Romain, під керівництвом Nahon, Meyer, Університет Макгілла, магістерська робота, 2018.

## Відео

@[youtube](https://youtu.be/PzIpSCRD8Jo)

## Автори

SIH спочатку був розроблений компанією Coriolis g Corporation. Модель літака та моделі вертикальних засідателів були додані компанією Altitude R&D inc. Обидві ці компанії знаходяться в Канаді:

- Coriolis g developped a new type of Vertical Takeoff and Landing (VTOL) vehicles based on passive coupling systems;
- [Altitude R&D](https://www.altitude-rd.com/) is specialized in dynamics, control, and real-time simulation (today relocated in Zurich).

Симулятор випущений безкоштовно під ліцензією BSD.
