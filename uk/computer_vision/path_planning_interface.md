# Path Planning Interface

PX4 uses a number of MAVLink interfaces for integrating path planning services from a companion computer (including obstacle avoidance in missions, [safe landing](../computer_vision/safe_landing.md), and future services):

- There are two [MAVLink Path Planning Protocol](https://mavlink.io/en/services/trajectory.html) interfaces:
  - [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS): Used by PX4 to send the _desired path_. May be used by path planning software to send PX4 a stream of setpoints for the _planned path_.
  - [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) may (alternatively) be used by path planning software to send PX4 the _planned path_ as a bezier curve. The curve indicates the (moving) position setpoint of the vehicle over a given time period.
- The [HEARTBEAT/Connection Protocol](https://mavlink.io/en/services/heartbeat.html) is used for "proof of life" detection.
- [LOCAL_POSITION_NED](https://mavlink.io/en/messages/common.html#LOCAL_POSITION_NED) and [ALTITUDE](https://mavlink.io/en/messages/common.html#ALTITUDE) send the vehicle local position and altitude, respectively.

Path planning is enabled on PX4 in automatic modes (landing, takeoff, hold, mission, return) if [COM_OBS_AVOID=1](../advanced_config/parameter_reference.md#COM_OBS_AVOID). In these modes planning software is expected to supply setpoints to PX4; if the software cannot support a particular flight mode it must mirror back setpoints from the vehicle.

:::tip
The message flows from PX4 UORB topics, through MAVLink, to ROS and back again are all documented in [PX4/PX4-Avoidance > Message Flows](https://github.com/PX4/PX4-Avoidance#message-flows).
:::

All services that use this interface send and receive messages of the same type/format. Developers can therefore use this interface to create their own new companion-side path planning services or tweak the existing planner software.

::: info The [PX4 Vision Autonomy Development Kit](../complete_vehicles_mc/px4_vision_kit.md) is recommended for developing path planning software. It comes with [PX4 avoidance](https://github.com/PX4/PX4-Avoidance) software pre-installed and can be used as the base for your own algorithms.
:::

## Налаштування PX4

Path planning is activated in PX4 by [setting](../advanced_config/parameters.md) the [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) to 1.

## Companion Computer Setup

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) Github repo.

The actual setup/configuration required depends on the planner being used.

:::warning
Only one planner can run on the companion computer at a time (at the time of writing).
This means that offboard features that use different planners cannot be enabled on the same vehicle at the same time (e.g., a vehicle can support obstacle avoidance and collision prevention, but not also safe landing - or vice versa).
:::

<a id="waypoint_interface"></a>

## Trajectory Interface

PX4 sends information about the _desired path_ to the companion computer (when `COM_OBS_AVOID=1`, in _auto_ modes), and receives back a stream of setpoints for the _planned path_ from the path planning software.

The desired path information is sent by PX4 using [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages, as described below in [PX4 Waypoint Interface](#px4_waypoint_interface).

Path planner software sends back setpoints for the _planned path_ using either `TRAJECTORY_REPRESENTATION_WAYPOINTS` (see [Companion Waypoint Interface](#companion_waypoint_interface)) or [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) (see [Companion Bezier Trajectory Interface](#bezier_interface)). The difference is that the waypoint just specifies the next setpoint destination, while the bezier trajectory describes the exact vehicle motion (i.e. a setpoint that moves in time).

:::warning
Route planning software should not mix these interfaces while executing a task (PX4 will use the last received message of either type).
:::

<a id="px4_waypoint_interface"></a>

### PX4 Waypoint Interface

PX4 надсилає бажаний шлях у повідомленнях [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) на частоті 5 Гц.

Поля, встановлені PX4, як показано:

- `time_usec`: UNIX Epoch time.
- `valid_points`: 3
- Point 0 - Current waypoint _type adapted_ by FlightTaskAutoMapper (see [notes below](#type_adapted)):
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: Type adapted x-y-z NED local position of _current_ mission waypoint.
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: Type adapted x-y-z NED local velocity of _current_ mission waypoint.
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: Current yaw angle
  - `vel_yaw[0]`: NaN
  - `command[0]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mav_commands) for the current waypoint.
- Point 1 - Current waypoint (Unmodified/not type adapted)):
  - `pos_x[1]`, `pos_y[1]`, `pos_z[1]`: x-y-z NED local position of _current_ mission waypoint
  - `vel_x[1]`, `vel_y[1]`, `vel_z[1]`: NaN
  - `acc_x[1]`, `acc_y[1]`, `acc_z[1]`: NaN
  - `pos_yaw[1]`: Yaw setpoint
  - `vel_yaw[1]`: Yaw speed setpoint
  - `command[1]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mav_commands) for the current waypoint.
- Point 2 - Next waypoint in local coordinates (unmodified/not type adapted):
  - `pos_x[2]`, `pos_y[2]`, `pos_z[2]`: x-y-z NED local position of _next_ mission waypoint
  - `vel_x[2]`, `vel_y[2]`, `vel_z[2]`: NaN
  - `acc_x[2]`, `acc_y[2]`, `acc_z[2]`: NaN
  - `pos_yaw[2]`: Yaw setpoint
  - `vel_yaw[2]`: Yaw speed setpoint
  - `command[2]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mav_commands) for the next waypoint.
- All other indices/fields are set as NaN.

<a id="type_adapted"></a>

Примітки:

- Point 0 is the current waypoint/target modified based on the type of target. For example, it makes sense when landing to specify the target x, y coordinates and a descent velocity. To achieve this `FlightTaskAutoMapper` modifies land waypoints in Point 0 to set the z component of position to NAN and the z-velocity to a desired value.
- Points 1 and 2 are not used by the safe landing planner.
- Point 1 is used by local and global planners.

<a id="companion-failure-handling"></a>

#### Handling of Companion Failure

PX4 safely handles the case where messages are not received from the offboard system:

- If no planner is running and `COM_OBS_AVOID` is enabled at/from boot:
  - preflight checks will fail (irrespective of vehicle mode) and it won't fly until `COM_OBS_AVOID` is set to 0.
- If no planner is running and `COM_OBS_AVOID` is enabled after boot:
  - the vehicle will run normally in manual modes.
  - if you switch to an autonomous mode (e.g. Land Mode) it will immediately fall back to [Hold mode](../flight_modes_mc/hold.md).
- When external path planning is enabled:
  - if the `HEARTBEAT` is lost PX4 will emit a status message (which is displayed in _QGroundControl_) stating either "Avoidance system lost" or "Avoidance system timeout" (depending on the vehicle state). This is irrespective of the current flight mode.
  - if a trajectory message is not received for more than 0.5 seconds and the vehicle is in an autonomous mode (Return, Mission, Takeoff, Land), the vehicle will switch into [Hold mode](../flight_modes_mc/hold.md). ::: info A planner must always provide points in this timeframe.
  - A planner will mirror back setpoints it receives when the vehicle is in a mode/state for which it doesn't provide path planning. (i.e. the vehicle will follow its desired path, delayed by a very small amount).
:::
  - If the execution time of the last-supplied Bezier trajectory expires during path planning (when using the [Bezier Trajectory Interface](#bezier_interface)), this is treated the same as not getting a new message within 0.5 seconds (i.e. vehicle switches to [Hold mode](../flight_modes_mc/hold.md)).

<a id="companion_waypoint_interface"></a>

## Companion Waypoint Interface

The path planning software (running on the companion computer) _may_ send the planned path to PX4 as a stream of [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages that have the setpoint in Point 0.

The fields for the messages from the companion computer are set as shown:

- `time_usec`: час UNIX Epoch.
- `valid_points`: 1
- Актуальна інформація про пристрій:
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: задане локальне положення автомобіля x-y-z NED
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: задане значення швидкості x-y-z NED
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: задане значення кута повороту
  - `vel_yaw[0]`: задане значення швидкості повороту
  - `command[0]`: NaN.
- Усі інші індекси/поля встановлені як NaN.

Interface для планувальника, який реалізує цей інтерфейс, повинна:

- Видавати цільові значення з частотою більше 2 Гц при отриманні повідомлень від PX4. PX4 увімкне режим [Hold mode](../flight_modes_mc/hold.md), якщо не отримує повідомлення протягом більше ніж 0,5 секунд.
- Дублювати отримані цільові значення, коли вона не підтримує планування для поточного стану транспортного засобу (наприклад, локальний планувальник буде дублювати повідомлення, відправлені під час безпечної посадки, оскільки він не підтримує режим посадки).

<a id="bezier_interface"></a>

## Супутній інтерфейс траєкторії Безьє

Програмне забезпечення для планування маршруту (що працює на комп'ютері-супутнику) _може_ надсилати запланований шлях до PX4 у вигляді потоку повідомлень [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER).

Повідомлення визначає шлях, який повинен пройти транспортний засіб у вигляді кривої (визначеної контрольними точками), починаючи з моменту часу повідомлення `timestamp` і досягаючи кінцевої точки після часового інтервалу `delta`. PX4 обчислює своє нове цільове значення (очікуване поточне положення/швидкість/прискорення вздовж кривої), використовуючи час надсилання повідомлення, поточний час та загальний час для кривої (delta).

::: info Наприклад, якщо повідомлення було надіслане 0,1 секунду тому, а `delta` (тривалість кривої) становить 0,3 секунди. PX4 може обчислити своє цільове значення на позиції 0,1 секунди на кривій.
:::

Детальніше, повідомлення `TRAJECTORY_REPRESENTATION_BEZIER` розбирається наступним чином:

- Кількість контрольних точок Bezier визначає ступінь кривої Bezier. Наприклад, 3 точки створюють квадратичну криву Bezier з постійним прискоренням.
- Крива Bezier повинна мати однаковий ступінь у напрямках x, y, z та yaw, з усіма контрольними точками Bezier обмеженими
- Масив `delta` повинен мати значення, що відповідає останній контрольній точці Bezier, щоб показати тривалість, яку займає виконання шляхової точки для виконання кривої до цієї точки, від початку до кінця. Інші значення у масиві `delta` ігноруються.
- Мітка часу MAVLink-повідомлення повинна відповідати часу початку кривої, а затримка та розбіжність годинника будуть компенсовані на літаковому контролері за допомогою механізму синхронізації часу.
- Всі контрольні точки повинні бути вказані в локальних координатах ([MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED)).
- Криві Bezier втрачають свою актуальність після досягнення часу виконання кривої Bezier. Переконайтеся, що нові повідомлення надсилаються з достатньою частотою та з довгою тривалістю виконання. Якщо цього не відбувається, транспортний засіб перейде в режим утримання.

## Підтримуване обладнання

Перевірені супутні комп’ютери та камери перераховані в [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

<!-- ## Further Information -->
<!-- @mrivi and @jkflying are the experts! -->
