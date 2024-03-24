# Offboard Mode (Generic/All Frames)

<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />

Апарат зберігає данні про положення, швидкість, прискорення, орієнтацію, значення сили тяги, відповідно заданим значенням, наданим деяким джерелом, зовнішнім по відношенню до польотного контролера, наприклад комп’ютером. Задані значення можна ввести за допомогою MAVLink (або MAVLink API таких як [MAVSDK](https://mavsdk.mavlink.io/)) або за допомогою [ROS 2](../ros/ros2.md).

PX4 вимагає, щоб зовнішній контролер забезпечив постійний 2Hz "доказ життя" сигналу, через потокове передавання будь-яких підтримуваних повідомлень для передання значень MAVLink або повідомлення з ROS 2 [ OffboardControl](../msg_docs/OffboardControlMode.md). PX4 вмикає функції в оф-борді лише після отримання сигналу протягом більш ніж секунди, і відновлює керування якщо зупиняється сигнал.

Примітка

- Для цього режиму потрібна інформація про позицію або орієнтацію за допомогою вказівника, наприклад, від GPS, оптичного потоку, візуально-інерційної одометрії, MoCap та ін.
- Радіоуправління вимкнено, окрім ситуації, коли треба змінити режими (ви також можете літати без ручного контролера взагалі, встановивши параметр [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) до 4: введення з джойстиків вимкнено).
- Літальний апарат має вже отримувати потік повідомлень MAVLink або ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) повідомлення перед тим, як увімкнути  офборд режим або переключитися в офборд режим під час польоту.
- Літальний апарат буде виходити з офборд режиму, якщо MAVLink повідомлення або `OffboardControlMode` не будуть отримані зі швидкістю > 2Hz.
- Не всі значення координат та параметрів, дозволені MAVLink підтримуються для усіх повідомлень та транспортних засобів. _Уважно_ прочитайте розділ нижче, щоб переконатися, що використовуються тільки підтримувані значення.

:::

## Опис

Режим офборду використовується для керування транспортним засобом, встановленням положення, швидкості, прискорення, відносним положенням або індексом тяги/заданими значеннями крутного моменту.

PX4 повинен отримати потік встановлюваних повідомлень MAVLink або ROS 2 [OffboardControlMode](../msg_docs/OffboardControlMode.md) на 2 Гц як доказ того, що зовнішній контролер у порядку. Потік повинен бути відправлений як мінімум за секунду, перш ніж PX4 буде задіяно в режимі офборду, або переключено на режим офборду при польоті. Якщо частота впаде нижче 2Hz під зовнішнім контролем PX4 буде перемикатися з офборд режиму після тайм-ауту ([COM_OF_LOSS_T](#COM_OF_LOSS_T)) і спробує приземлитися або виконати інші безвідмовні дії. Дія залежить від того, чи доступне радіоуправління, і визначається в параметрі [COM_OBL_RC_ACT](#COM_OBL_RC_ACT).

При використанні MAVLink повідомлення передають обидва сигнали, щоб вказати, що зовнішнє джерело є "живим" і значення має цінність. Для того, щоб утримувати позицію в даному випадку, апарат повинен отримати потік заданих точок для поточного положення.

При використанні ROS 2 докази того, що зовнішнє джерело "живе" надає потік [OffboardControlMode](../msg_docs/OffboardControlMode.md) повідомлень, поки надається фактична точка публікації в одну з тем uORB, наприклад [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md). Для того, щоб утримувати позицію в цьому випадку, апарат повинен отримати потік `OffboardControlMode`, але потребуватиме тільки `TrajectorySetpoint`.

Зверніть увагу, що офборд режим підтримує дуже обмежений набір команд MAVLink і повідомлень. Операції, як-от зліт, посадка, повернення на місце запуску, можуть найкраще бути виконаними з використанням відповідних режимів. Операції такі як завантаження, місії можуть бути виконані в будь-якому режимі.

## Повідомлення ROS 2

Наступні повідомлення ROS 2 та їх конкретні поля та значення полів допускаються для вказаних кадрів. Крім надання функціональності «heartbeat», `OffboardControlMode` має ще дві основні цілі:

1. Контролює рівень [архітектури керування PX4](../flight_stack/controller_diagrams.md), на якому необхідно впроваджувати відповідні величини керування з віддаленої системи та вимикає обхідні контролери.
1. Визначає, які допустимі оцінки (положення або швидкості) необхідні, а також які повідомлення відповідно до заданих значень мають бути використані.

`OffboardControlMode` визначається як показане.

```sh
# Off-board контрольний режим

uint64 мітка часу # час, скільки система запущена (мікросекунди)

bool положення
bool швидкість
bool прискорення
bool орієнтація
bool кутова швидкість тіла
bool тяга та крутний момент
bool прямий привід
```

Поля впорядковані за пріоритетом так, що `положення` має перевагу над `швидкістю` і іншими полями, `швидкість` має перевагу над `прискоренням`, і так далі. Перше поле, яке має ненульове значення (зверху вниз), визначає, яка допустима оцінка необхідна для використання режиму безпілотного керування, а також повідомлення заданих значень, які можуть бути використані. Наприклад, якщо поле `прискорення` є першим полем з ненульовим значенням, то PX4 вимагає наявності `дійсної оцінки швидкості`, а задане значення повинно бути вказане за допомогою повідомлення `TrajectorySetpoint`.

| бажана кількість контролю | поле положення | поле швидкості | поле прискорення | attitude field | поле кутової швидкості тіла | поле тяги та крутного момент | поле прямого приводу | необхідна оцінка | необхідне повідомлення                                                                                                          |
| ------------------------- | -------------- | -------------- | ---------------- | -------------- | --------------------------- | ---------------------------- | -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| положення (NED)           | ✓              | -              | -                | -              | -                           | -                            | -                    | положення        | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                         |
| швидкість (NED)           | ✗              | ✓              | -                | -              | -                           | -                            | -                    | velocity         | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                         |
| acceleration (NED)        | ✗              | ✗              | ✓                | -              | -                           | -                            | -                    | velocity         | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                         |
| attitude (FRD)            | ✗              | ✗              | ✗                | ✓              | -                           | -                            | -                    | none             | [VehicleAttitudeSetpoint](../msg_docs/VehicleAttitudeSetpoint.md)                                                               |
| body_rate (FRD)           | ✗              | ✗              | ✗                | ✗              | ✓                           | -                            | -                    | none             | [VehicleRatesSetpoint](../msg_docs/VehicleRatesSetpoint.md)                                                                     |
| thrust and torque (FRD)   | ✗              | ✗              | ✗                | ✗              | ✗                           | ✓                            | -                    | none             | [VehicleThrustSetpoint](../msg_docs/VehicleThrustSetpoint.md) and [VehicleTorqueSetpoint](../msg_docs/VehicleTorqueSetpoint.md) |
| direct motors and servos  | ✗              | ✗              | ✗                | ✗              | ✗                           | ✗                            | ✓                    | none             | [ActuatorMotors](../msg_docs/ActuatorMotors.md) and [ActuatorServos](../msg_docs/ActuatorServos.md)                             |

where &check; means that the bit is set, &cross; means that the bit is not set and `-` means that the bit is value is irrelevant.

:::note
Before using offboard mode with ROS 2, please spend a few minutes understanding the different [frame conventions](../ros/ros2_comm.md#ros-2-px4-frame-conventions) that PX4 and ROS 2 use.
:::

### Copter

- [px4_msgs::msg::TrajectorySetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/TrajectorySetpoint.msg)

  - The following input combinations are supported:
    - Position setpoint (`position` different from `NaN`). Non-`NaN` values of velocity and acceleration are used as feedforward terms for the inner loop controllers.
    - Velocity setpoint (`velocity` different from `NaN` and `position` set to `NaN`). Non-`NaN` values acceleration are used as feedforward terms for the inner loop controllers.
    - Acceleration setpoint (`acceleration` different from `NaN` and `position` and `velocity` set to `NaN`)

  - All values are interpreted in NED (Nord, East, Down) coordinate system and the units are \[m\], \[m/s\] and \[m/s^2\] for position, velocity and acceleration, respectively.

- [px4_msgs::msg::VehicleAttitudeSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleAttitudeSetpoint.msg)

  - The following input combination is supported:

    - quaternion `q_d` + thrust setpoint `thrust_body`. Non-`NaN` values of `yaw_sp_move_rate` are used as feedforward terms expressed in Earth frame and in \[rad/s\].

  - The quaternion represents the rotation between the drone body FRD (front, right, down) frame and the NED frame. The thrust is in the drone body FRD frame and expressed in normalized \[-1, 1\] values.

- [px4_msgs::msg::VehicleRatesSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleRatesSetpoint.msg)

  - The following input combination is supported:

    - `roll`, `pitch`, `yaw` and `thrust_body`.

  - All the values are in the drone body FRD frame. The rates are in \[rad/s\] while thrust_body is normalized in \[-1, 1\].

### Generic Vehicle

The following offboard control modes bypass all internal PX4 control loops and should be used with great care.

- [px4_msgs::msg::VehicleThrustSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleThrustSetpoint.msg) + [px4_msgs::msg::VehicleTorqueSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleTorqueSetpoint.msg)

  - The following input combination is supported:
    - `xyz` for thrust and `xyz` for torque.
  - All the values are in the drone body FRD frame and normalized in \[-1, 1\].

- [px4_msgs::msg::ActuatorMotors](https://github.com/PX4/PX4-Autopilot/blob/main/msg/ActuatorMotors.msg) + [px4_msgs::msg::ActuatorServos](https://github.com/PX4/PX4-Autopilot/blob/main/msg/ActuatorServos.msg)
  - You directly control the motor outputs and/or servo outputs.
  - All the values normalized in \[-1, 1\]. For outputs that do not support negative values, negative entries map to `NaN`.
  - `NaN` maps to disarmed.

## MAVLink Messages

The following MAVLink messages and their particular fields and field values are allowed for the specified vehicle frames.

### Copter/VTOL

- [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)

  - The following input combinations are supported: <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - Position setpoint (only `x`, `y`, `z`)
    - Velocity setpoint (only `vx`, `vy`, `vz`)
    - Acceleration setpoint (only `afx`, `afy`, `afz`)
    - Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).
    - Position setpoint **and** velocity setpoint **and** acceleration (the velocity and the acceleration setpoints are used as feedforwards; the velocity setpoint is added to the output of the position controller and the result is used as the input to the velocity controller; the acceleration setpoint is added to the output of the velocity controller and the result used to compute the thrust vector).

  - PX4 supports the following `coordinate_frame` values (only): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

- [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

  - The following input combinations are supported: <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - Position setpoint (only `lat_int`, `lon_int`, `alt`)
    - Velocity setpoint (only `vx`, `vy`, `vz`)
    - _Thrust_ setpoint (only `afx`, `afy`, `afz`)

      :::note
Acceleration setpoint values are mapped to create a normalized thrust setpoint (i.e. acceleration setpoints are not "properly" supported).
:::

    - Position setpoint **and** velocity setpoint (the velocity setpoint is used as feedforward; it is added to the output of the position controller and the result is used as the input to the velocity controller).

  - PX4 supports the following `coordinate_frame` values (only): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

- [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  - The following input combinations are supported:
    - Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).
    - Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).

### Fixed-wing

- [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)

  - The following input combinations are supported (via `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - Position setpoint (`x`, `y`, `z` only; velocity and acceleration setpoints are ignored).

      - Specify the _type_ of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern): :::note Some of the _setpoint type_ values below are not part of the MAVLink standard for the `type_mask` field.
:::

        The values are:

        - 292: Gliding setpoint. This configures TECS to prioritize airspeed over altitude in order to make the vehicle glide when there is no thrust (i.e. pitch is controlled to regulate airspeed). It is equivalent to setting `type_mask` as `POSITION_TARGET_TYPEMASK_Z_IGNORE`, `POSITION_TARGET_TYPEMASK_VZ_IGNORE`, `POSITION_TARGET_TYPEMASK_AZ_IGNORE`.
        - 4096: Takeoff setpoint.
        - 8192: Land setpoint.
        - 12288: Loiter setpoint (fly a circle centred on setpoint).
        - 16384: Idle setpoint (zero throttle, zero roll / pitch).

  - PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

- [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

  - The following input combinations are supported (via `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - Position setpoint (only `lat_int`, `lon_int`, `alt`)

      - Specify the _type_ of the setpoint in `type_mask` (if these bits are not set the vehicle will fly in a flower-like pattern):

:::note
The _setpoint type_ values below are not part of the MAVLink standard for the `type_mask` field.
:::

        The values are:

        - 4096: Takeoff setpoint.
        - 8192: Land setpoint.
        - 12288: Loiter setpoint (fly a circle centred on setpoint).
        - 16384: Idle setpoint (zero throttle, zero roll / pitch).

  - PX4 supports the following `coordinate_frame` values (only): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

- [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  - The following input combinations are supported:
    - Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).
    - Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`).

### Rover

- [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)

  - The following input combinations are supported (in `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - Position setpoint (only `x`, `y`, `z`)

      - Specify the _type_ of the setpoint in `type_mask`:

:::note
The _setpoint type_ values below are not part of the MAVLink standard for the `type_mask` field. ::

        The values are:

        - 12288: Loiter setpoint (vehicle stops when close enough to setpoint).

    - Velocity setpoint (only `vx`, `vy`, `vz`)

  - PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

- [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

  - The following input combinations are supported (in `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    - Position setpoint (only `lat_int`, `lon_int`, `alt`)
  - Specify the _type_ of the setpoint in `type_mask` (not part of the MAVLink standard). The values are:

    - Following bits not set then normal behaviour.
    - 12288: Loiter setpoint (vehicle stops when close enough to setpoint).

  - PX4 supports the coordinate frames (`coordinate_frame` field): [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

- [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  - The following input combinations are supported:
    - Attitude/orientation (`SET_ATTITUDE_TARGET.q`) with thrust setpoint (`SET_ATTITUDE_TARGET.thrust`). :::note
Only the yaw setting is actually used/extracted.
:::

## Offboard Parameters

_Offboard mode_ is affected by the following parameters:

| Parameter                                                                                               | Description                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="COM_OF_LOSS_T"></a>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | Time-out (in seconds) to wait when offboard connection is lost before triggering offboard lost failsafe (`COM_OBL_RC_ACT`)                                                                       |
| <a id="COM_OBL_RC_ACT"></a>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | Flight mode to switch to if offboard control is lost (Values are - `0`: _Position_, `1`: _Altitude_, `2`: _Manual_, `3`: *Return, `4`: *Land\*).                                             |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes_mc/position.md). This is not enabled for offboard mode by default. |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes_mc/position.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).                                  |
| <a id="COM_RCL_EXCEPT"></a>[COM_RCL_EXCEPT](../advanced_config/parameter_reference.md#COM_RCL_EXCEPT)   | Specify modes in which RC loss is ignored and the failsafe action not triggered. Set bit `2` to ignore RC loss in Offboard mode.                                                                 |

## Developer Resources

Typically developers do not directly work at the MAVLink layer, but instead use a robotics API like [MAVSDK](https://mavsdk.mavlink.io/) or [ROS](http://www.ros.org/) (these provide a developer friendly API, and take care of managing and maintaining connections, sending messages and monitoring responses - the minutiae of working with _Offboard mode_ and MAVLink).

The following resources may be useful for a developer audience:

- [Offboard Control from Linux](../ros/offboard_control.md)
- [ROS/MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md)
- [ROS/MAVROS Offboard Example (Python)](../ros/mavros_offboard_python.md)
