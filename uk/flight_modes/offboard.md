# Offboard Mode (Generic/All Frames)

<img src="../../assets/site/position_fixed.svg" title="Фіксування положення є необхідним (e.g. GPS)" width="30px" />

Апарат зберігає данні про положення, швидкість, прискорення, орієнтацію, значення сили тяги, відповідно заданим значенням, наданим деяким джерелом, зовнішнім по відношенню до польотного контролера, наприклад комп’ютером. The setpoints may be provided using MAVLink (or a MAVLink API such as [MAVSDK](https://mavsdk.mavlink.io/)) or by [ROS 2](../ros2/index.md).

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

| бажана кількість контролю    | поле положення | поле швидкості | поле прискорення | поле орієнтації | поле кутової швидкості тіла | поле тяги та крутного момент | поле прямого приводу | необхідна оцінка | необхідне повідомлення                                                                                                          |
| ---------------------------- | -------------- | -------------- | ---------------- | --------------- | --------------------------- | ---------------------------- | -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| положення (NED)              | ✓              | -              | -                | -               | -                           | -                            | -                    | положення        | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                         |
| швидкість (NED)              | ✗              | ✓              | -                | -               | -                           | -                            | -                    | швидкість        | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                         |
| прискорення (NED)            | ✗              | ✗              | ✓                | -               | -                           | -                            | -                    | швидкість        | [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md)                                                                         |
| орієнтація (FRD)             | ✗              | ✗              | ✗                | ✓               | -                           | -                            | -                    | нічого           | [VehicleAttitudeSetpoint](../msg_docs/VehicleAttitudeSetpoint.md)                                                               |
| кутова швидкість (FRD)       | ✗              | ✗              | ✗                | ✗               | ✓                           | -                            | -                    | нічого           | [VehicleRatesSetpoint](../msg_docs/VehicleRatesSetpoint.md)                                                                     |
| тяга та крутний момент (FRD) | ✗              | ✗              | ✗                | ✗               | ✗                           | ✓                            | -                    | нічого           | [VehicleThrustSetpoint](../msg_docs/VehicleThrustSetpoint.md) and [VehicleTorqueSetpoint](../msg_docs/VehicleTorqueSetpoint.md) |
| двигуни та серво             | ✗              | ✗              | ✗                | ✗               | ✗                           | ✗                            | ✓                    | нічого           | [ActuatorMotors](../msg_docs/ActuatorMotors.md) and [ActuatorServos](../msg_docs/ActuatorServos.md)                             |

де &check; означає, що біт встановлено, &cross; означає, що біт не встановлено, а `-` означає, що значення біта неважливе.

::: info Before using offboard mode with ROS 2, please spend a few minutes understanding the different [frame conventions](../ros2/user_guide.md#ros-2-px4-frame-conventions) that PX4 and ROS 2 use.
:::

### Коптер

- [px4_msgs::msg::TrajectorySetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/TrajectorySetpoint.msg)

  - Підтримуються наступні вхідні комбінації:
    - Задання точки положення (`положення` відмінне від `NaN`). Не - `NaN` значення швидкості та прискорення використовуються як вхідні дані для керування зворотним зв'язком внутрішнього контуру.
    - Задання точки швидкості (`швидкість` відмінна від `NaN`, а `положення` встановлено на `NaN`). Не - `NaN` значення швидкості та прискорення використовуються як вхідні дані для керування зворотним зв'язком внутрішнього циклу.
    - Задання точки прискорення (`прискорення` відмінне від `NaN`, а `положення` та `швидкість` встановлені на `NaN`)

  - Всі значення інтерпретуються в NED (Nord, East, Down) координатну систему і одиниці вимірювання, є \[m/s\] і \[m/s^2\] для позиції, швидкості і прискорення, відповідно.

- [px4_msgs::msg::VehicleAttitudeSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleAttitudeSetpoint.msg)

  - Підтримується наступна комбінація введення:

    - комбінація введення підтримується: кватерніон `q_d` + задання тяги `thrust_body`. Не-`NaN` значення `yaw_sp_move_rate` використовуються як терміни прямого зв’язку, виражені в координатах Землі та в \[рад/с\].

  - Кватерніон представляє обертання між корпусом дрона у системі координат FRD (перед, праворуч, вниз) та системою координат NED. Тяга у корпусі дрона виражена у системі координат FRD та у нормалізованих значеннях.

- [px4_msgs::msg::VehicleRatesSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleRatesSetpoint.msg)

  - Підтримується наступна комбінація введення:

    - `крен`, `тангаж`, `крен` та `тяга`.

  - Всі значення подані в для дрона в системі FRD. Значення в \[rad/s\] і thrust_body нормалізовано в \[-1, 1\].

### Універсальний апарат

Наступні режими керування з відбором оминуть всі внутрішні контрольні системи PX4 і повинні використовуватися з великою обережністю.

- [px4_msgs::msg::VehicleThrustSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleThrustSetpoint.msg) + [px4_msgs::msg::VehicleTorqueSetpoint](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleTorqueSetpoint.msg)

  - Підтримується наступна комбінація введення:
    - `xyz` для тяги та `xyz` для оберту.
  - Усі значення виражені у системі координат тіла дрона FRD та нормалізовані у діапазоні \[-1, 1\].

- [px4_msgs::msg::ActuatorMotors](https://github.com/PX4/PX4-Autopilot/blob/main/msg/ActuatorMotors.msg) + [px4_msgs::msg::ActuatorServos](https://github.com/PX4/PX4-Autopilot/blob/main/msg/ActuatorServos.msg)
  - Ви безпосередньо керуєте вихідними сигналами моторів та/або сервоприводів.
  - Усі значення нормалізовані у діапазоні \[-1, 1\]. Для вихідних сигналів, які не підтримують від'ємні значення, від'ємні значення відображаються як `NaN`.
  - `NaN` карти для роззброєння.

## Повідомлення MAVLink

Наступні повідомлення MAVLink та їх конкретні поля та значення полів дозволені для вказаних кадрів літального апарату.

### Коптер/ВТОЛ

- [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)

  - Підтримуються наступні вхідні комбінації: <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - Данні про положення (тільки `x`, `y`, `z`)
    - Швидкість (лише `vx`, `vy`, `vz`)
    - Прискорення (тільки `afx`, `afy`, `afz`)
    - Задання точки положення **та** задання швидкості (задання швидкості використовується як вхідна величина; вона додається до вихідної величини контролера положення, і результат використовується як вхідні дані для контролера швидкості).
    - Задання точки положення **та** задання швидкості **та** задання прискорення (задання швидкості та прискорення використовуються як вхідні величини; задання швидкості додається до вихідної величини контролера положення, і результат використовується як вхідні дані для контролера швидкості; задання прискорення додається до вихідної величини контролера швидкості, і результат використовується для обчислення вектора тяги).

  - PX4 підтримує такі значення `coordinate_frame` (тільки): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) і [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

- [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

  - Підтримуються наступні вхідні комбінації: <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - Данні про положення (тільки `x`, `y`, `z`)
    - Швидкість (only `vx`, `vy`, `vz`)
    - _Тяга_ (only `afx`, `afy`, `afz`)

      Задані значення прискорення відображаються таким чином, щоб створити нормалізоване задання тяги (тобто задання прискорення "неправильно" підтримується).
:::

    - Задання точки положення **та** задання швидкості (задання швидкості використовується як зворотній зв'язок; воно додається до вихідної величини контролера положення, і результат використовується як вхідні дані для контролера швидкості).

  - PX4 підтримує такі значення `coordinate_frame` (тільки): [MAV_FRAME_LOCAL_NED і MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

- [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  - Підтримуються наступні вхідні комбінації:
    - Орієнтація/положення (`SET_ATTITUDE_TARGET.q`) разом зі значенням тяги (`SET_ATTITUDE_TARGET.thrust`).
    - Частота обертання тіла (`SET_ATTITUDE_TARGET` `.body_roll_rate`, `.body_pitch_rate`, `.body_yaw_rate`) зі значенням тяги (`SET_ATTITUDE_TARGET.thrust`).

### Безпілотник-крило

- [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)

  - Підтримуються такі комбінації вводу (через `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - Задання положення (`x`, `y`, `z` тільки; показники швидкості і прискорення проігноровані).

      - Вкажіть _тип_ задання в `type_mask` (якщо ці біти не встановлені, апарат буде літати патерном квітки): :::note Деякі зі значень _типу задання_, наведених нижче, не є частиною стандарту MAVLink для поля `type_mask`.
:::

        Значення:

        - 292: планування. Це налаштовує TECS на пріорітезацію швидкості над висотою, щоб змусити безпілотник планувати, коли немає тяги (тобто кут крену контролюється для регулювання швидкості). Це еквівалентно налаштуванням `type_mask` таким як `POSITION_TARGET_TYPEMASK_Z_IGNORE`, `POSITION_TARGET_TYPEMASK_VZ_IGNORE`, `POSITION_TARGET_TYPEMASK_AZ_IGNORE`.
        - 4096: Точка взльоту.
        - 8192: Точка посадки.
        - 12288: Задання Loiter (політ по колу, центрованому на заданій точці).
        - 16384: Задання бездіяльності (нульовий газ, нульовий крен/тангаж).

  - PX4 підтримує такі значення поля `coordinate_frame` (тільки): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) і [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

- [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

  - Підтримуються такі комбінації вводу (через `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - Данні про положення (тільки `x`, `y`, `z`)

      - Вкажіть _тип_ задання точки в `type_mask` (якщо ці біти не встановлені, транспортний засіб буде літати квіткоподібною траєкторією):

:::note
Наведені нижче значення _типу задання_ не є частиною стандарту MAVLink для поля `type_mask`.
:::

        Значення:

        - 4096: Точка взльоту.
        - 8192: Точка посадки.
        - 12288: Задання Loiter (політ по колу, центрованому на заданій точці).
        - 16384: Задання бездіяльності (нульовий газ, нульовий крен/тангаж).

  - PX4 підтримує такі значення `coordinate_frame` (тільки): [MAV_FRAME_LOCAL_NED і MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

- [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  - Підтримуються наступні вхідні комбінації:
    - Орієнтація/положення (`SET_ATTITUDE_TARGET.q`) разом зі значенням тяги (`SET_ATTITUDE_TARGET.thrust`).
    - Кутова швидкість (`SET_ATTITUDE_TARGET` `.body_roll_rate`, `.body_pitch_rate`, `.body_yaw_rate`) зі значенням тяги (`SET_ATTITUDE_TARGET.thrust`).

### Землехід

- [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)

  - Підтримуються такі комбінації вводу (через `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->

    - Данні про положення (тільки `x`, `y`, `z`)

      - Вкажіть _тип_ точки в `type_mask`:

:::note
Наведені нижче значення _типу задання_ не є частиною стандарту MAVLink для поля `type_mask`. ::

        Значення:

        - 12288: задане значення Loiter (пристрій зупиняється, коли вже достатньо близько, щоб встановити точку).

    - Швидкість (лише `vx`, `vy`, `vz`)

  - PX4 підтримує такі значення поля `coordinate_frame` (тільки): [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) і [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

- [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)

  - Підтримуються такі комбінації вводу (учерез `type_mask`): <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    - Данні про положення (тільки `x`, `y`, `z`)
  - Вкажіть _тип_ вказаної точки в `type_mask` (не частина стандарту MAVlink). Значення:

    - Якщо наступні біти не встановлені, то виконується звичайна поведінка.
    - 12288: задане значення Loiter (пристрій зупиняється, коли вже достатньо близько до заданої точки).

  - PX4 підтримує такі значення поля `coordinate_frame` (тільки): [MAV_FRAME_LOCAL_NED і MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

- [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  - Підтримуються наступні вхідні комбінації:
    - Орієнтація/положення (`SET_ATTITUDE_TARGET.q`) разом зі значенням тяги (`SET_ATTITUDE_TARGET.thrust`). :::note
Фактично використовується/виділяється тільки параметр рискання.
:::

## Параметри для відключення

На _Режим автопілота_ впливають наступні параметри:

| Параметр                                                                                                | Опис                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_OF_LOSS_T"></a>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | Час очікування (у секундах) при втраті з'єднання безпілотного керування, перш ніж спрацює аварійний захист в разі втрати безпілотного керування (`COM_OBL_RC_ACT`)                                               |
| <a id="COM_OBL_RC_ACT"></a>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | Режим польоту, на який перейти у випадку втрати керування безпілотним пунктом (Значення - `0`: _Положення_, `1`: _Орієнтація_, `2`: _Ручне_, `3`: *Повернення, `4`: *Посадка*).                                |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Контролює переміщення джойстика на мультикоптері (або конвертоплані у режимі MC) зміну режиму на [Режим положення](../flight_modes_mc/position.md). За замовчуванням це неможливо ввімкнути в режимі автопілоту. |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | Кількість рухів джойстика, яка викликає перехід у режим [Положення](../flight_modes_mc/position.md) (якщо [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) увімкнено).                                                      |
| <a id="COM_RCL_EXCEPT"></a>[COM_RCL_EXCEPT](../advanced_config/parameter_reference.md#COM_RCL_EXCEPT)   | Вкажіть режими, в яких втрата радіокерування ігнорується, а запобіжний алгоритм не виконуватиметься. Встановіть біт `2`, щоб ігнорувати втрати радіоконтролю в режимі автопілоту.                                |

## Ресурси Розробника

Зазвичай розробники не працюють безпосередньо на рівні MAVLink, а використовують API робототехніку, таку як [MAVSDK](https://mavsdk.mavlink.io/) або [ROS](http://www.ros.org/) (вони забезпечують зручний розробницький API і відповідають за управління та підтримку з'єднань, відправлення повідомлень і контроль відповідей - всі дрібниці роботи з _режимом автопілоту_ та MAVLink).

Наступні ресурси можуть бути корисними для аудиторії розробників:

- [Offboard Control from Linux](../ros/offboard_control.md)
- [ROS/MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md)
- [ROS/MAVROS Offboard Example (Python)](../ros/mavros_offboard_python.md)
