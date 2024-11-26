# Точна посадка

PX4 supports precision landing for _multicopters_ on either stationary or moving targets.
Ціль може бути надана вбудованим ІЧ-датчиком та приземленням, або зовнішньою системою позиціонування.

Precision landing can be [started/initiated](#initiating-a-precision-landing) as part of a [mission](#mission), in a [Return mode](#return-mode-precision-landing) landing, or by entering the [_Precision Land_ flight mode](#precision-landing-flight-mode).

:::info
Precision landing is only possible with a valid global position (due to a limitation in the current implementation of the position controller).
:::

## Загальний огляд

### Режими посадки

Точну посадку можна налаштувати як "обов'язкову" або "вигідну".
Вибір режиму впливає на те, як виконується точна посадка.

#### Необхідний режим

In _Required Mode_ the vehicle will search for a target if none is visible when landing is initiated.
Транспортний засіб виконає точну посадку, якщо ціль буде знайдена.

The search procedure consists of climbing to the search altitude ([PLD_SRCH_ALT](../advanced_config/parameter_reference.md#PLD_SRCH_ALT)).
If the target is still not visible at the search altitude and after a search timeout ([PLD_SRCH_TOUT](../advanced_config/parameter_reference.md#PLD_SRCH_TOUT)), a normal landing is initiated at the current position.

:::info
If using an offboard positioning system PX4 assumes that the target is visible when it is receiving MAVLink [LANDING_TARGET](https://mavlink.io/en/messages/common.html#LANDING_TARGET) messages.
:::

#### Опортуністичний режим

In _Opportunistic Mode_ the vehicle will use precision landing _if_ (and only if) the target is visible when landing is initiated.
If it is not visible the vehicle immediately performs a _normal_ landing at the current position.

### Фази посадки

Режим Точної посадки має три етапи:

1. **Horizontal approach:** The vehicle approaches the target horizontally while keeping its current altitude.
   Once the position of the target relative to the vehicle is below a threshold ([PLD_HACC_RAD](../advanced_config/parameter_reference.md#PLD_HACC_RAD)), the next phase is entered.
   If the target is lost during this phase (not visible for longer than [PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT)), a search procedure is initiated (during a required precision landing) or the vehicle does a normal landing (during an opportunistic precision landing).

2. **Descent over target:** The vehicle descends, while remaining centered over the target.
   If the target is lost during this phase (not visible for longer than `PLD_BTOUT`), a search procedure is initiated (during a required precision landing) or the vehicle does a normal landing (during an opportunistic precision landing).

3. **Final approach:** When the vehicle is close to the ground (closer than [PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)), it descends while remaining centered over the target.
   Якщо ціль втрачається під час цієї фази, спуск продовжується незалежно від виду точної посадки.

Search procedures are initiated in the first and second steps, and will run at most [PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH) times.
Діаграма потоку фаз посадки

A flow diagram showing the phases can be found in [landing phases flow Diagram](#landing-phases-flow-diagram) below.

## Початок точної посадки

Precision landing can be used in missions, during the landing phase in _Return mode_, or by entering the _Precision Land_ mode.

<a id="mission"></a>

### Місія Точна посадка

Precision landing can be initiated as part of a [mission](../flying/missions.md) using [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) with `param2` set appropriately:

- `0`: Normal landing without using the target.
- `1`: [Opportunistic](#opportunistic-mode) precision landing.
- `2`: [Required](#required-mode) precision landing.

### Режим повернення з точною посадкою

Precision landing can be used in the [Return mode](../flight_modes_mc/return.md) landing phase.

This is enabled using the parameter [RTL_PLD_MD](../advanced_config/parameter_reference.md#RTL_PLD_MD), which takes the following values:

- `0`: Precision landing disabled (land as normal).
- `1`: [Opportunistic](#opportunistic-mode) precision landing.
- `2`: [Required](#required-mode) precision landing.

### Режим польоту з точною посадкою

Precision landing can be enabled by switching to the _Precision Landing_ flight mode.

You can verify this using the [_QGroundControl_ MAVLink Console](../debug/mavlink_shell.md#qgroundcontrol-mavlink-console) to enter the following command:

```sh
commander mode auto:precland
```

:::info
When switching to the mode in this way, the precision landing is always "required"; there is no way to specify the type of landing.
:::

:::info
At time of writing is no _convenient_ way to directly invoke precision landing (other than commanding return mode):

- _QGroundControl_ does not provide it as a UI option.
- [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) only works in missions.
- [MAV_CMD_DO_SET_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_MODE) should work, but you will need to determine the appropriate base and custom modes used by PX4 to represent the precision landing mode.

:::

## Налаштування програмного забезпечення

### Налаштування IR Сенсора/Бікона

The IR sensor/landing beacon solution requires an [IR-LOCK Sensor](https://irlock.com/products/ir-lock-sensor-precision-landing-kit) and downward facing [distance sensor](../sensor/rangefinders.md) connected to the flight controller, and an IR beacon as a target (e.g. [IR-LOCK MarkOne](https://irlock.com/collections/markone)).
Це дозволяє приземлитися з точністю приблизно 10 см (в той час як точність GPS може бути в декілька метрів).

Install the IR-LOCK sensor by following the [official guide](https://irlock.readme.io/v2.0/docs).
Переконайтеся, що ось x сенсора вирівняна з осью y транспортного засобу, а ось y сенсора вирівняна з напрямком -x транспортного засобу (це відбувається, якщо камера нахилена вниз на 90 градусів від напрямку вперед).

Install a [range/distance sensor](../sensor/rangefinders.md) (the _LidarLite v3_ has been found to work well).

:::info
Many infrared based range sensors do not perform well in the presence of the IR-LOCK beacon.
Зверніться до посібника з IR-LOCK для інших сумісних датчиків.
:::

## Позабортне позиціонування

The offboard solution requires a positioning system that implements the MAVLink [Landing Target Protocol](https://mavlink.io/en/services/landing_target.html).
Це може використовувати будь-який механізм позиціонування для визначення місця посадки, наприклад комп'ютерного зору та візуального маркера.

The system must publish the coordinates of the target in the [LANDING_TARGET](https://mavlink.io/en/messages/common.html#LANDING_TARGET) message.
Note that PX4 _requires_ `LANDING_TARGET.frame` to be [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and only populates the fields `x`, `y`, and `z`.
The origin of the local NED frame [0,0] is the home position (you can map this home position to global coordinates using [GPS_GLOBAL_ORIGIN](https://mavlink.io/en/messages/common.html#GPS_GLOBAL_ORIGIN)).

PX4 does not explicitly require a [distance sensor](../sensor/rangefinders.md) or other sensors, but will perform better if it can more precisely determine its own position.

## Конфігурація прошивки

Precision landing requires the modules `irlock` and `landing_target_estimator`.
Ці модулі включені до прошивки PX4 за замовчуванням для більшості польотних контролерів.

Вони не включені за замовчуванням на контролерах, що базуються на FMUv2.
On these, and other boards where they are not included, you can add them by setting the following keys to 'y' in the relevant configuration file for your flight controller (e.g. as done here for FMUv5: [PX4-Autopilot/boards/px4/fmu-v5/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/fmu-v5/default.px4board)):

```
CONFIG_DRIVERS_IRLOCK=y
CONFIG_MODULES_LANDING_TARGET_ESTIMATOR=y
```

## Конфігурація PX4 (параметри)

Датчик IR-Lock вимкнено за замовчуванням.
Enable it by setting [SENS_EN_IRLOCK](../advanced_config/parameter_reference.md#SENS_EN_IRLOCK) to `1` (true).

[LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE) determines if the target is assumed to be stationary or moving.
If `LTEST_MODE` is set to moving (e.g. it is installed on a vehicle on which the multicopter is to land), target measurements are only used to generate position setpoints in the precision landing controller.
If `LTEST_MODE` is set to stationary, the target measurements are also used by the vehicle position estimator (EKF2 or LPE).

Other relevant parameters are listed in the parameter reference under [Landing_target estimator](../advanced_config/parameter_reference.md#landing-target-estimator) and [Precision land](../advanced_config/parameter_reference.md#precision-land) parameters.
Деякі з найбільш корисних перераховані нижче.

| Параметр                                                                                                                                        | Опис                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="SENS_EN_IRLOCK"></a>[SENS_EN_IRLOCK](../advanced_config/parameter_reference.md#SENS_EN_IRLOCK) | IR-LOCK Sensor (зовнішній I2C). Disable: `0` (default): Enable: `1`).          |
| <a id="LTEST_MODE"></a>[LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE)                                  | Landing target is moving (`0`) or stationary (`1`). За замовчуванням - рухома.                                                 |
| <a id="PLD_HACC_RAD"></a>[PLD_HACC_RAD](../advanced_config/parameter_reference.md#PLD_HACC_RAD)       | Горизонтальний радіус прийняття, всередині якого транспортний засіб почне спускатися. За замовчуванням - 0,2 м.                                                      |
| <a id="PLD_BTOUT"></a>[PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT)                                     | Таймаут цілі посадки, після якого припускається, що ціль втрачена. За замовчуванням - 5 секунд.                                                                      |
| <a id="PLD_FAPPR_ALT"></a>[PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)    | Висота останнього підходу. Висота останнього підходу. За замовчуванням - 0,1 метра.                                                                  |
| <a id="PLD_MAX_SRCH"></a>[PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH)       | Максимальна кількість спроб пошуку у вимаганій посадці.                                                                                                                              |
| <a id="RTL_PLD_MD"></a>[RTL_PLD_MD](../advanced_config/parameter_reference.md#RTL_PLD_MD)             | Режим точної посадки RTL. `0`: disabled, `1`: [Opportunistic](#opportunistic-mode), `2`: [Required](#required-mode). |

### Масштабування ІЧ-маяка

Масштабування вимірювань може бути необхідним через спотворення об'єктива датчика IR-LOCK.

[LTEST_SCALE_X](../advanced_config/parameter_reference.md#LTEST_SCALE_X) and [LTEST_SCALE_Y](../advanced_config/parameter_reference.md#LTEST_SCALE_Y) can be used to scale beacon measurements before they are used to estimate the beacon's position and velocity relative to the vehicle.
Note that `LTEST_SCALE_X` and `LTEST_SCALE_Y` are considered in the sensor frame, not the vehicle frame.

To calibrate these scale parameters, set `LTEST_MODE` to moving, fly your multicopter above the beacon and perform forward-backward and left-right motions with the vehicle, while [logging](../dev_log/logging.md#configuration) `landing_target_pose` and `vehicle_local_position`.
Then, compare `landing_target_pose.vx_rel` and `landing_target_pose.vy_rel` to `vehicle_local_position.vx` and `vehicle_local_position.vy`, respectively (both measurements are in NED frame).
Якщо оцінювані швидкості маяка завжди менші або більші за швидкості транспортного засобу, налаштуйте параметри масштабування для компенсації.

If you observe slow sideways oscillations of the vehicle while doing a precision landing with `LTEST_MODE` set to stationary, the beacon measurements are likely scaled too high and you should reduce the scale parameter in the relevant direction.

## Симуляція

Precision landing with the IR-LOCK sensor and beacon can be simulated in [Gazebo Classic](../sim_gazebo_classic/index.md).

Щоб запустити симуляцію зі світом, що містить маяк IR-LOCK та транспортний засіб із датчиком дальності та камерою IR-LOCK, виконайте наступну команду:

```sh
make px4_sitl gazebo-classic_iris_irlock
```

You can change the location of the beacon either by moving it in the Gazebo Classic GUI or by changing its location in the [Gazebo world](https://github.com/PX4/PX4-SITL_gazebo-classic/blob/main/worlds/iris_irlock.world#L42).

## Принцип дії

### Оцінювач цілей посадки

The `landing_target_estimator` takes measurements from the `irlock` driver as well as the estimated terrain height to estimate the beacon's position relative to the vehicle.

The measurements in `irlock_report` contain the tangent of the angles from the image center to the beacon.
Іншими словами, вимірювання - це компоненти x та y вектора, що вказує на маяк, де компонент z має довжину "1".
Це означає, що масштабування вимірювання за відстанню від камери до маяка призводить до вектора від камери до маяка.
Ця відносна позиція потім повертається у зіставлений з півночі, рівномірний корпусний каркас за допомогою оцінки польоту засобами повітряного судна.
Обидва компоненти x та y відносного вимірювання позиції фільтруються в окремих фільтрах Калмана, які діють як прості фільтри згладжування з низькою пропускною спроможністю, що також генерують оцінку швидкості та дозволяють відкидати викиди.

The `landing_target_estimator` publishes the estimated relative position and velocity whenever a new `irlock_report` is fused into the estimate.
Нічого не публікується, якщо маяк не бачиться або вимірювання маяка відхиляються.
The landing target estimate is published in the `landing_target_pose` uORB message.

### Покращена оцінка положення транспортного засобу

If the target is specified to be stationary using the parameter `LTEST_MODE`, the vehicle's position/velocity estimate can be improved with the help of the target measurements.
Це виконується шляхом злиття швидкості цілі як вимірювання від'ємної швидкості транспортного засобу.

### Діаграма потоку фаз посадки

This image shows the [landing phases](#landing-phases) as a flow diagram.

![Precision Landing Flow Diagram](../../assets/precision_land/precland-flow-diagram.png)
