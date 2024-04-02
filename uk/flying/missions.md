# Місії

Місія — це попередньо визначений план польоту, який може бути спланований в QGroundControl, завантажений на політний контролер і потім виконаний автономно в [режимі місії](../flight_modes_mc/mission.md).

Місії, як правило, включають елементи для контролю зльоту, польоту в послідовності маршрутних точок, знімання зображень та/або відео, розміщення вантажу та посадки. QGroundControl дозволяє планувати місії, використовуючи повністю ручний підхід, або ви можете використовувати його більш розширені функції для планування обстежень місцевості, коридорів або оглядів структур.

Цей розділ надає огляд того, як планувати та виконувати місії.



## Планування місій

Планування місій вручну є простим процесом:

- Перейдіть до екрана місії
- Виберіть іконку **Add Waypoint** ("плюс") у верхньому лівому куті.
- Натисніть на карту, щоб додати точки маршруту.
- Використовуйте список точок маршруту справа для зміни параметрів/типу точки маршруту. Індикатор висоти внизу дає уявлення про відносну висоту кожної точки маршруту.
- Після завершення натисніть кнопку **Upload** (у верхньому правому куті), щоб відправити місію до апарату.

Ви також можете використовувати інструмент _Pattern_ для автоматизації створення сіток обстеження.

:::tip
Для отримання додаткової інформації дивіться [Керівництво користувача QGroundControl](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/plan_view/plan_view.html). :::

![planning-mission](../../assets/flying/planning_mission.jpg)

### Перевірка можливості виконання місії

PX4 виконує деякі базові перевірки, щоб визначити, чи місія є виконуваною. Наприклад, чи достатньо близько місія до апарату, чи буде місія конфліктувати з геозоною, або чи потрібен патерн посадки для місії, але він відсутній.

Перевірки виконуються під час завантаження місії та безпосередньо перед її запуском. Якщо будь-яка з перевірок не пройде успішно, користувач отримує повідомлення, і почати місію неможливо.

Для отримання детальнішої інформації про перевірки та можливі дії дивіться: [Режим місії (FW) > Перевірка можливості виконання місії](../flight_modes_fw/mission.md#mission-feasibility-checks) та [Режим місії (MC) > Перевірка можливості виконання місії](../flight_modes_mc/mission.md#mission-feasibility-checks).

### Налаштування кута повороту апарату

If set, a multi-rotor vehicle will yaw to face the **Heading** value specified in the target waypoint (corresponding to [MAV_CMD_NAV_WAYPOINT.param4](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT)).

If **Heading** has not been explicitly set for the target waypoint (`param4=NaN`) then the vehicle will yaw towards a location specified in the parameter [MPC_YAW_MODE](../advanced_config/parameter_reference.md#MPC_YAW_MODE). By default this is the next waypoint.

Vehicle types that cannot independently control yaw and direction of travel will ignore yaw settings (e.g. Fixed-wing).

### Setting Acceptance/Turning Radius

The _acceptance radius_ defines the circle around a waypoint within which a vehicle considers it has reached the waypoint, and will immediately switch to (and start turning towards) the next waypoint.

For a multi-rotor drones, the acceptance radius is tuned using the parameter [NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD). By default, the radius is small to ensure that multirotors pass above the waypoints, but it can be increased to create a smoother path such that the drone starts to turn before reaching the waypoint.

The image below shows the same mission flown with different acceptance radius parameters:

![acceptance radius comparison](../../assets/flying/acceptance_radius_comparison.jpg)

The speed in the turn is automatically computed based on the acceptance radius (= turning radius) and the maximum allowed acceleration and jerk (see [Jerk-limited Type Trajectory for Multicopters](../config_mc/mc_jerk_limited_type_trajectory.md#auto-mode)).

:::tip
For more information about the impact of the acceptance radius around the waypoint see: [Mission Mode > Inter-waypoint Trajectory](../flight_modes_fw/mission.md#rounded-turns-inter-waypoint-trajectory). :::

### Package Delivery (Cargo) Missions

PX4 supports cargo delivery in missions using a gripper.

This kind of mission is planned in much the same as any other [waypoint mission](../flying/missions.md), with mission start, takeoff waypoint, various path waypoints, and possibly a return waypoint. The only difference is that a package delivery mission must include a mission items to indicate how the package is released and the deployment mechanism. For more information see: [Package Delivery Mission](../flying/package_delivery_mission.md).

## Літаючі місії

Після того, як місію буде завантажено, перейдіть до перегляду польоту. Місія відображається в певному сенсі, що дозволяє легко відстежувати прогрес (його не можна змінити на цьому перегляді).

![flying-mission](../../assets/flying/flying_mission.jpg)
