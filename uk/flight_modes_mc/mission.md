# Mission Mode (Multicopter)

<img src="../../assets/site/position_fixed.svg" title="Global position fix required (e.g. GPS)" width="30px" />

_Режим місії_ змушує транспортний засіб виконувати передбачений автономний [план місії](../flying/missions.md) (план польоту), який був завантажений до керуючого пристрою польоту.
Зазвичай місія створюється та завантажується за допомогою програми для керування наземною станцією (GCS), такої як [QGroundControl](https://docs.qgroundcontrol.com/master/en/) (QGC).

::: info

- Для цього режиму потрібна глобальна оцінка 3D-позиції (за допомогою GPS або виведеної з [локальної позиції](../ros/external_position_estimation.md#enabling-auto-modes-with-a-local-position)).
- Транспортний засіб повинен бути озброєний перед тим, як цей режим може бути активований.
- Цей режим є автоматичним - для керування транспортним засобом не потрібне _втручання_ користувача.
- Перемикачі керування RC можуть бути використані для зміни режимів польоту на будь-якому транспортному засобі.
- Рух палиць дистанційного керування буде [за замовчуванням](#COM_RC_OVERRIDE) змінювати транспортний засіб на [режим позиції](../flight_modes_mc/position.md), якщо не виникне критична аварія батареї.
  Це справжнє для багтороторів і ВПС у режимі КУ.

:::

## Опис

Місії зазвичай створюються в земній контрольній станції (наприклад, [QGroundControl](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/plan_view/plan_view.html)) та завантажуються перед запуском.
Вони також можуть бути створені за допомогою розробника API або завантажені під час польоту.

Індивідуальні [команди місії](#mission-commands) обробляються таким чином, який є відповідним для характеристик багтороторного польоту (наприклад, обертання виконується у вигляді _залишання на місці_).

:::info
Missions are uploaded onto a SD card that needs to be inserted **before** booting up the autopilot.
:::

На високому рівні всі типи транспортних засобів ведуть себе однаково, коли ввімкнено режим МІСІЯ:

1. Якщо місія не збережена, або якщо PX4 завершив виконання всіх команд місії, або якщо [місія не є можливою](#mission-feasibility-checks):

   - Якщо літає транспортний засіб, він буде утримувати.
   - Якщо посадять транспортний засіб, він буде "чекати".

2. Якщо місія збережена, а PX4 летить, вона виконає [місію / план польоту](../flying/missions.md) з поточного кроку.
   - Пункт `TAKEOFF` трактується як звичайна точка місії.

3. Якщо місія збережена і PX4 приземлився:
   - PX4 виконає [місію/план польоту](../flying/missions.md).
   - Якщо місія не має пункту `TAKEOFF`, то PX4 підніме транспортний засіб на мінімальну висоту перед виконанням решти польотного плану з поточного кроку.

4. Якщо жодне завдання не збережено, або якщо PX4 завершив виконання всіх команд місії:
   - Якщо літає транспортний засіб, він буде утримувати.
   - Якщо посадять транспортний засіб, він буде "чекати".

5. Ви можете вручну змінити поточну команду місії, вибравши її в _QGroundControl_.

   ::: info
   If you have a _Jump to item_ command in the mission, moving to another item will **not** reset the loop counter.
   Однією з наслідків є те, що якщо ви зміните поточну команду місії на 1, це не призведе до "повного перезапуску" місії.

:::

6. Місія скине тільки тоді, коли транспортний засіб буде роззброєний або коли буде завантажена нова місія.

   :::tip
   Щоб автоматично роззброїти транспортний засіб після посадки, у _QGroundControl_ перейдіть до [Налаштування Транспортного Засобу > Безпека](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/safety.html), перейдіть до _Налаштувань Режиму Посадки_ та позначте прапорець _Роззброювати після_.
   Введіть час очікування після посадки перед відброюванням транспортного засобу.

:::

Місії можна призупинити, переключившись з режиму місії на будь-який інший режим (наприклад, [режим утримання](../flight_modes_mc/hold.md) або [режим позиціонування](../flight_modes_mc/position.md)), і продовжити, переключившись назад в режим місії.
Якщо транспортний засіб не захоплював зображення, коли він був призупинений, під час відновлення він рухатиметься зі своєї _поточної позиції_ до тієї ж точки шляху, до якої він спочатку рухався.
Якщо транспортний засіб захоплював зображення (має елементи спуску камери), він замість цього рухатиметься зі своєї поточної позиції до останньої точки шляху, якою він проїхав (перед зупинкою), а потім пройде свій шлях з тією самою швидкістю та з такою самою поведінкою спуску камери.
Це забезпечує, що планований шлях зафіксований під час місій з опитування/камери.
Місію можна завантажити, коли транспортний засіб зупинений, у такому випадку поточний активний елемент місії встановлюється на 1.

:::info
Коли місію призупинено під час спрацювання камери на транспортному засобі, PX4 встановлює поточний активний пункт місії на попередню точку маршруту, так що при відновленні місії транспортний засіб буде повторювати свій останній етап місії.
Крім того, PX4 зберігає останні застосовані пункти місії для налаштування швидкості та спуску камери (з вже покритого плану місії) та знову застосовує ці налаштування при відновленні місії.
:::

:::warning
Переконайтеся, що палиця регулювання газу не дорівнює нулю перед переключенням в будь-який режим RC (інакше транспортний засіб розбився).
Ми рекомендуємо вам вирівнювати ручки керування перед переходом до будь-якого іншого режиму.
:::

Для отримання додаткової інформації про планування місії дивіться:

- [Планування місії](../flying/missions.md)
- [Plan View](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/plan_view/plan_view.html) (_QGroundControl_ User Guide)

## Mission Feasibility Checks

PX4 виконує деякі базові перевірки на розумність, щоб визначити, чи є місія можливою під час завантаження, і коли транспортний засіб вперше зброєний.
Якщо будь-яка з перевірок не пройде успішно, користувач отримує повідомлення, і почати місію неможливо.

Підмножина найважливіших перевірок перерахована нижче:

- Перший пункт місії занадто далеко від транспортного засобу ([MIS_DIST_1WP](#MIS_DIST_1WP))
- Будь-який елемент місії конфліктує з планом або безпечним геозахистом

## Налаштування підтримки QGroundControl

_QGroundControl_ надає додаткову підтримку обробки місій на рівні GCS (на додачу до того, що надає контролер польоту).

Для отримання додаткової інформації дивіться:

- [Видалити місію після приземлення транспортного засобу](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/releases/stable_v3.2_long.html#remove-mission-after-vehicle-lands)
- [Відновити місію після режиму Повернутися](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/releases/stable_v3.2_long.html#resume-mission)

## Параметри місії

Поведінка місій залежить від ряду параметрів, більшість з яких задокументовані в [Довідник параметрів > Місія](../advanced_config/parameter_reference.md#mission).
Дуже маленька підмножина наведені нижче.

Загальні параметри:

| Параметр                                                                                                                                                                | Опис                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="NAV_RCL_ACT"></a>[NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)                                  | Режим аварійного відновлення зв'язку RC (що робить транспортний засіб, якщо втрачає зв'язок RC) - наприклад, увійти в режим утримання, режим повернення, завершити тощо.                                                                                                                                               |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE)                      | Контролює переміщення джойстика на мультикоптері (або конвертоплані у режимі MC) повертає керування пілоту в [Режим положення](../flight_modes_mc/position.md). Це можна окремо увімкнути для автоматичних режимів та для режиму поза бортом, і в автоматичних режимах воно включено за замовчуванням. |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | Кількість рухів стиків, яка викликає перехід у [режим Положення](../flight_modes_mc/position.md) (якщо [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) увімкнено).                                                                                                                       |

Параметри, пов'язані з [перевірками можливостей місії](#mission-feasibility-checks):

| Параметр                                                                                                                                                                   | Опис                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="MIS_DIST_1WP"></a>[MIS_DIST_1WP](../advanced_config/parameter_reference.md#MIS_DIST_1WP)                                  | Місія не буде розпочата, якщо поточна точка шляху віддаленіша від домашньої позиції, ніж це значення. Вимкнено, якщо значення дорівнює 0 або менше.         |
| <a id="FW_LND_ANG"></a>[FW_LND_ANG](../advanced_config/parameter_reference.md#FW_LND_ANG)                                        | Maximum landing slope angle.                                                                                                                                                |
| <a id="MIS_TKO_LAND_REQ"></a>[MIS_TKO_LAND_REQ](../advanced_config/parameter_reference.md#MIS_TKO_LAND_REQ) | Mission takeoff/landing requirement configuration. FW та VTOL обидва мають його задано на 2 за замовчуванням, що означає, що місія повинна містити посадку. |

<a id="mission_commands"></a>

## Mission Commands

PX4 "приймає" наступні команди місії MAVLink у режимі Місії (з деякими _попередженнями_, які наведені після списку).
Якщо не вказано інше, реалізація відповідає визначенню у специфікації MAVLink.

Предмети місії:

- [MAV_CMD_NAV_WAYPOINT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT)
  - _Param3_ (flythrough) is ignored. Flythrough is always enabled if _param 1_ (time_inside) > 0.
- [MAV_CMD_NAV_LOITER_UNLIM](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LOITER_UNLIM)
- [MAV_CMD_NAV_LOITER_TIME](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LOITER_TIME)
- [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND)
- [MAV_CMD_NAV_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_TAKEOFF)
- [MAV_CMD_NAV_LOITER_TO_ALT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LOITER_TO_ALT)
- [MAV_CMD_DO_JUMP](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_JUMP)
- [MAV_CMD_NAV_ROI](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_ROI)
- [MAV_CMD_DO_SET_ROI](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI)
- [MAV_CMD_DO_SET_ROI_LOCATION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI_LOCATION)
- [MAV_CMD_DO_SET_ROI_WPNEXT_OFFSET](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI_WPNEXT_OFFSET)
- [MAV_CMD_DO_SET_ROI_NONE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI_NONE)
- [MAV_CMD_DO_CHANGE_SPEED](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CHANGE_SPEED)
- [MAV_CMD_DO_SET_HOME](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_HOME)
- [MAV_CMD_DO_SET_SERVO](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_SERVO)
- [MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START)
- [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL)
- [MAV_CMD_DO_DIGICAM_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_DIGICAM_CONTROL)
- [MAV_CMD_DO_MOUNT_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONFIGURE)
- [MAV_CMD_DO_MOUNT_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONTROL)
- [MAV_CMD_IMAGE_START_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_START_CAPTURE)
- [MAV_CMD_IMAGE_STOP_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_STOP_CAPTURE)
- [MAV_CMD_VIDEO_START_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_VIDEO_START_CAPTURE)
- [MAV_CMD_VIDEO_STOP_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_VIDEO_STOP_CAPTURE)
- [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST)
- [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL)
- [MAV_CMD_SET_CAMERA_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_CAMERA_MODE)
- [MAV_CMD_NAV_DELAY](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_DELAY)
- [MAV_CMD_NAV_RETURN_TO_LAUNCH](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_RETURN_TO_LAUNCH)
- [MAV_CMD_DO_CONTROL_VIDEO](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CONTROL_VIDEO)
- [MAV_CMD_DO_GIMBAL_MANAGER_PITCHYAW](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GIMBAL_MANAGER_PITCHYAW)
- [MAV_CMD_DO_GIMBAL_MANAGER_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GIMBAL_MANAGER_CONFIGURE)
- [MAV_CMD_OBLIQUE_SURVEY](https://mavlink.io/en/messages/common.html#MAV_CMD_OBLIQUE_SURVEY)
- [MAV_CMD_DO_SET_CAMERA_ZOOM](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAMERA_ZOOM)
- [MAV_CMD_DO_SET_CAMERA_FOCUS](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAMERA_FOCUS)
- [MAV_CMD_NAV_VTOL_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_TAKEOFF)
  - `MAV_CMD_NAV_VTOL_TAKEOFF.param2` (transition heading) is ignored.
    Instead the heading to the next waypoint is used for the transition heading. <!-- at LEAST until PX4 v1.13: https://github.com/PX4/PX4-Autopilot/issues/12660 -->

GeoFence Definitions

- [MAV_CMD_NAV_FENCE_RETURN_POINT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_RETURN_POINT)
- [MAV_CMD_NAV_FENCE_POLYGON_VERTEX_INCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_POLYGON_VERTEX_INCLUSION)
- [MAV_CMD_NAV_FENCE_POLYGON_VERTEX_EXCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_POLYGON_VERTEX_EXCLUSION)
- [MAV_CMD_NAV_FENCE_CIRCLE_INCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_CIRCLE_INCLUSION)
- [MAV_CMD_NAV_FENCE_CIRCLE_EXCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_CIRCLE_EXCLUSION)

Rally Points

- [MAV_CMD_NAV_RALLY_POINT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_RALLY_POINT)

::: info
Please add an issue report or PR if you find a missing/incorrect message.
::: info:

- PX4 parses the above messages, but they are not necessary _acted_ on. For example, some messages are vehicle-type specific.
- PX4 does not support local frames for mission commands (e.g. [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED)).
- Not all messages/commands are exposed via _QGroundControl_.
- The list may become out of date as messages are added.
  You can check the current set by inspecting the code.
  Support is `MavlinkMissionManager::parse_mavlink_mission_item` in [/src/modules/mavlink/mavlink_mission.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_mission.cpp).

## Rounded turns: Inter-Waypoint Trajectory

PX4 expects to follow a straight line from the previous waypoint to the current target (it does not plan any other kind of path between waypoints - if you need one you can simulate this by adding additional waypoints).

MC vehicles will change the _speed_ when approaching or leaving a waypoint based on the [jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md#auto-mode) tuning.
The vehicle will follow a smooth rounded curve towards the next waypoint (if one is defined) defined by the acceptance radius ([NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD)).
The diagram below shows the sorts of paths that you might expect.

![acc-rad](../../assets/flying/acceptance_radius_mission.png)

Vehicles switch to the next waypoint as soon as they enter the acceptance radius ([NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD)).

## Mission Takeoff

Plan a multicopter mission takeoff by adding a `TAKEOFF` mission item to the map (this corresponds to the [MAV_CMD_NAV_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_TAKEOFF) MAVLink command).

During mission execution this will cause the vehicle to ascend vertically to the minimum takeoff altitude defined in the [MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) parameter, then head towards the 3D position defined in the mission item.

If a mission with no takeoff mission item is started, the vehicle will ascend to the minimum takeoff altitude and then proceed to the first `Waypoint` mission item.

If the vehicle is already flying when the mission is started, a takeoff mission item is treated as a normal waypoint.

## Дивіться також

- [Missions](../flying/missions.md)
  - [Package Delivery Mission](../flying/package_delivery_mission.md)
- [Mission Mode (FW)](../flight_modes_fw/mission.md)
