# Safe Landing (Мультикоптер + комп'ютер-компаньйон)

_Safe Landing_ - функція комп'ютерного зору що забезпечує посадку мультикоптера тільки на рівній місцевості.

Ця функція може бути увімкнута в [Land mode](../flight_modes_mc/land.md) та [Mission mode](../flight_modes_mc/mission.md) на мультикоптері з комп'ютером-компаньйоном, який виконує відповідне програмне забезпечення комп'ютерного зору. Також він може бути використаний для VTOL засобів у MC режимі.

У разі відданої команди на посадку, транспортний засіб спочатку знижується до висоти на якій він може виміряти поверхню (параметр `loiter_height` комп'ютера-компаньйона). Якщо місце посадки недостатньо рівне, транспортний засіб рухається назовні у квадратно-спіральному патерні, періодично зупиняючись для перевірки місцевості на наявність місця для посадки, яке не є занадто нерівним.

## Обмеження/Можливості

Безпечна посадка призначена для пошуку плоских ділянок на пересіченій місцевості.

- Посадка на дорогу не блокується; якщо виявлено автомобіль, він буде "забутий", якщо він рухатиметься далі.
- Посадка на воду можлива, якщо використовуються радари або ультразвукові сенсори, але не повинна відбуватися, якщо використовуються стереокамери або LIDAR.
  - Система буде здійснювати посадку лише в тому випадку, якщо вона зможе виявити наявність землі. У випадку стереокамер вода, яка має достатньо виразні риси для аналізу, не буде достатньо рівною для посадки.

## Конфігурація PX4

Безпечна посадка увімкнена в PX4 шляхом встановлення [параметра](../advanced_config/parameters.md) [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) на значення 1.

:::note
`COM_OBS_AVOID` також активує [Obstacle Avoidance у місіях](../computer_vision/obstacle_avoidance.md#mission_mode) та всі інші функції які використовують [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) (Trajectory Interface) щоб інтегрувати зовнішні служби планування маршруту з PX4.
:::

## Налаштування комп'ютера компаньйона

Companion-side setup and configuration is provided in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) Github repo.

This covers the common setup for obstacle avoidance and collision prevention, and includes specific sections for using the _safe landing planner_ (which provides companion-side support for this feature):

- [Simulation setup](https://github.com/PX4/PX4-Avoidance#safe-landing-planner)
- [Hardware setup](https://github.com/PX4/PX4-Avoidance#safe-landing-planner-1)

The configuration information includes, among other things, how to set up safe landing for different cameras, sizes of vehicles, and the height at which the decision to land or not is taken.

<a id="interface"></a>

## Інтерфейс Safe Landing

PX4 використовує [Path Planning Interface](../computer_vision/path_planning_interface.md) для інтеграції сервісів планування шляху з комп'ютера-компаньйона(включаючи [Obstacle Avoidance у місіях](../computer_vision/obstacle_avoidance.md#mission_mode), [Safe Landing](../computer_vision/safe_landing.md), та майбутні сервіси).

Інтерфейс (відправлення повідомлення) між PX4 і супутником точно такий же, як і для інших сервісів планування шляху. Note however that the safe landing planner only uses information in Point 0 of the `TRAJECTORY_REPRESENTATION_WAYPOINTS` message for the desired path.

## Підтримуване обладнання

Протестовані комп’ютери-компаньйони та камери перераховані в [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

## Додаткова інформація

- [Vision and offboard control interfaces](https://youtu.be/CxIsJWtVaTA?t=963) (PX4 Developer Summit 2019: Martina Rivizzigno, Auterion Computer Vision Engineer)
- [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance)
  - [Simulation setup > Safe Landing Planner](https://github.com/PX4/PX4-Avoidance#safe-landing-planner)
  - [Hardware setup > Safe Landing Planner](https://github.com/PX4/PX4-Avoidance#safe-landing-planner-1)
