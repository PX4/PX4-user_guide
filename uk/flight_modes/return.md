# Режим повернення (типовий транспорт)

<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />

Режим польоту _Return_ використовується для _повернення транспортного засобу до безпеки_ по вільному шляху до безпечного пункту призначення, де він повинен приземлитися.

Наступні теми слід прочитати першими, якщо ви використовуєте ці типи транспортних засобів:

- [Мультикоптери](../flight_modes_mc/return.md)
- [Фікосовані крила (літаки)](../flight_modes_fw/return.md)
- [VTOL](../flight_modes_vtol/return.md)

:::note

- Mode is automatic - no user intervention is _required_ to control the vehicle.
- Mode requires a global 3d position estimate (from GPS or inferred from a [local position](../ros/external_position_estimation.md#enabling-auto-modes-with-a-local-position)).
  - Flying vehicles can't switch to this mode without global position.
  - Flying vehicles will failsafe if they lose the position estimate.
- Mode requires home position is set.
- Mode prevents arming (vehicle must be armed when switching to this mode).
- RC control switches can be used to change flight modes on any vehicle.
- RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes_mc/position.md) unless handling a critical battery failsafe.
- A VTOL will return as MC or FW based on its mode at the point the return mode was triggered. In MC mode it will respect multicopter parameters, such as the landing "cone". In FW mode it will respect fixed-wing parameters (ignore the cone), but unless using a mission landing, will transition to MC mode and land at the destination after loitering at the descent altitude.

<!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/commander/ModeUtil/mode_requirements.cpp -->

:::

## Загальний огляд

PX4 надає кілька механізмів для вибору безпечного шляху повернення, пункту призначення та посадки, включаючи використання домашнього місця, точок ралі ("безпечні"), шляхів місії та послідовностей посадки, визначених у місії.

Усі транспортні засоби _нормально_ підтримують всі ці механізми, проте не всі з них мають такий же сенс для певних транспортних засобів. Наприклад, багатокоптер може приземлитися практично будь-де, тому використання послідовності посадки для нього не має сенсу, крім випадків, які трапляються рідко. Так само, фіксований крилообразний транспортний засіб повинен пролетіти безпечний шлях до посадки: він може використовувати домашнє місце як точку повернення, але за замовчуванням не буде намагатися приземлитися на ньому.

Ця тема охоплює всі можливі типи повернення, які будь-який транспортний засіб _може_ бути налаштований використовувати — теми про режими повернення для кожного конкретного транспортного засобу включають тип та конфігурацію повернення за замовчуванням/рекомендовану для кожного транспортного засобу.

Наступні розділи пояснюють, як налаштувати [тип повернення](#return_types), [мінімальну висоту повернення](#minimum-return-altitude) та [поведінку під час посадки/прибуття](#loiter-landing-at-destination).

<a id="return_types"></a>

## Return Types (RTL_TYPE)

PX4 provides four alternative approaches for finding an unobstructed path to a safe destination and/or landing, which are set using the [RTL_TYPE](#RTL_TYPE) parameter.

На високому рівні є:

- [Повернення до дому/точки ралі](#home_return) (`RTL_TYPE=0`): Підняття на безпечну висоту та повернення за прямим шляхом до найближчої точки ралі або дому.
- [Повернення за місією до точки посадки/точки ралі](#mission-landing-rally-point-return-type-rtl-type-1) (`RTL_TYPE=1`): Підняття на безпечну висоту, прямий політ до найближчої точки призначення _окрім дому_: точки ралі або початку посадки за місією. Якщо не визначено пунктів посадки або збору місії, поверніться додому прямим шляхом.
- [Повернення за маршрутом місії](#mission-path-return-type-rtl-type-2) (`RTL_TYPE=2`): Використання маршруту місії та швидке продовження до посадки за місією (якщо визначено). If no mission _landing_ defined, fast-reverse mission to home. Якщо не визначено _місію_, повернення відбувається безпосередньо до дому (точки ралі ігноруються).
- [Повернення до найближчого безпечного місця призначення](#closest-safe-destination-return-type-rtl-type-3) (`RTL_TYPE=3`): Підняття на безпечну висоту та повернення за прямим шляхом до найближчого місця призначення: дому, початку маршруту посадки за місією або точки ралі. Якщо пунктом призначення є схема приземлення, дотримуйтеся цієї схеми, щоб приземлитися.

Більш детальні пояснення щодо кожного з типів наведено в наступних розділах.

<a id="home_return"></a>

### Тип повернення додому/точка збору (RTL_TYPE=0)

Це типовий тип повернення для [мультикоптера](../flight_modes_mc/return.md) (див. тему для отримання більш детальної інформації).

У цьому типі повернення транспортний засіб:

- Піднімається на безпечну [мінімальну висоту повернення](#minimum-return-altitude) (над будь-якими очікуваними перешкодами).
- Летить прямою траєкторією до вихідної позиції або точки збору (залежно від того, що ближче)
- Після [прибуття](#loiter-landing-at-destination) опускається до «висоти спуску» та чекає встановленого часу. Цей час можна використати для розгортання шасі для посадки.
- Сідає або чекає (це залежить від параметрів посадки), За замовчуванням БПЛА або ВТОЛ у режимі БПЛА приземлятиметься, а повітряне судно з фіксованим крилом обертатиметься на висоті спуску. ВТОЛ у режимі FW вирівнює свою орієнтацію на точку призначення, переходить у режим МБ і потім приземлюється.

:::note
Якщо не визначено точки ралі, це те ж саме, що і _Повернення до старту_ (RTL)/_Повернення додому_ (RTH).
:::

### Mission Landing/Rally Point Return Type (RTL_TYPE=1)

This is the default return type for a [fixed-wing](../flight_modes_fw/return.md) or [VTOL](../flight_modes_vtol/return.md) vehicle (see topics for more information).

In this return type the vehicle:

- Ascends to a safe [minimum return altitude](#minimum-return-altitude) (above any expected obstacles) if needed. The vehicle maintains its initial altitude if that is higher than the minimum return altitude.
- Flies via direct constant-altitude path to a rally point or the start of a [mission landing pattern](#mission-landing-pattern) (whichever is closest). If no mission landing or rally points are defined the vehicle instead returns home via a direct path.
- If the destination is a mission landing pattern it will follow the pattern to land.
- If the destination is a rally point or home it will [land or wait](#loiter-landing-at-destination) at descent altitude (depending on landing parameters). By default an MC or VTOL in MC mode will land, and a fixed-wing vehicle circles at the descent altitude. A VTOL in FW mode aligns its heading to the destination point, transitions to MC mode, and then lands.

:::note
Для фіксованих крил зазвичай також встановлюється параметр [MIS_TKO_LAND_REQ](#MIS_TKO_LAND_REQ) який _вимагає_ патерн посадки за місією.
:::

### Тип повернення маршруту завдання (RTL_TYPE=2)

This return type uses the mission (if defined) to provide a safe return _path_, and the [mission landing pattern](#mission-landing-pattern) (if defined) to provide landing behaviour. If there is a mission but no mission landing pattern, the mission is flown _in reverse_. Rally points, if any, are ignored.

:::note
The behaviour is fairly complex because it depends on the flight mode, and whether a mission and mission landing are defined.
:::

Mission _with_ landing pattern:

- **Mission mode:** Mission is continued in "fast-forward mode" (jumps, delay and any other non-position commands ignored, loiter and other position waypoints converted to simple waypoints) and then lands.
- **Auto mode other than mission mode:**
  - Ascend to a safe [minimum return altitude](#minimum-return-altitude) above any expected obstacles.
  - Fly directly to closest waypoint (for FW not a landing WP) and descend to waypoint altitude.
  - Continue mission in fast forward mode from that waypoint.
- **Manual modes:**
  - Ascend to a safe [minimum return altitude](#minimum-return-altitude) above any expected obstacles.
  - Fly directly to landing sequence position and descend to waypoint altitude
  - Land using mission landing pattern

Mission _without_ landing pattern defined:

- **Mission mode:**
  - Mission flown "fast-backward" (in reverse) starting from the previous waypoint
    - Jumps, delay and any other non-position commands ignored, loiter and other position waypoints converted to simple waypoints.
    - VTOL vehicles transition to FW mode (if needed) before flying the mission in reverse.
  - On reaching waypoint 1, the vehicle ascends to the [minimum return altitude](#minimum-return-altitude) and flies to the home position (where it [lands or waits](#loiter-landing-at-destination)).
- **Auto mode other than mission mode:**
  - Fly directly to closest waypoint (for FW not a landing WP) and descend to waypoint altitude.
  - Continue the mission in reverse, exactly as though Return mode was triggered in mission mode (above)
- **Manual modes:** Fly directly to home location and land.

If no mission is defined PX4 will fly directly to home location and land (rally points are ignored).

If the mission changes during return mode, then the behaviour is re-evaluated based on the new mission following the same rules as above (e.g. if the new mission has no landing sequence and you're in a mission, the mission is reversed).

### Closest Safe Destination Return Type (RTL_TYPE=3)

In this return type the vehicle:

- Ascends to a safe [minimum return altitude](#minimum-return-altitude) (above any expected obstacles).
- Flies a direct path to the closest destination of: home location, mission landing pattern or rally point.
- If the destination is a [mission landing pattern](#mission-landing-pattern) the vehicle will follow the pattern to land.
- If the destination is a home location or rally point, the vehicle will descend to the descent altitude ([RTL_DESCEND_ALT](#RTL_DESCEND_ALT)) and then [lands or waits](#loiter-landing-at-destination). By default an MC or VTOL in MC mode will land, and a fixed-wing vehicle circles at the descent altitude. A VTOL in FW mode aligns its heading to the destination point, transitions to MC mode, and then lands.

## Мінімальна висота повернення

For most [return types](#return_types) a vehicle will ascend to a _minimum safe altitude_ before returning (unless already above that altitude), in order to avoid any obstacles between it and the destination.

:::note
The exception is when executing a [mission path return](#mission-path-return-type-rtl-type-2) from _within a mission_. In this case the vehicle follows mission waypoints, which we assume are planned to avoid any obstacles.
:::

The return altitude for a fixed-wing vehicle or a VTOL in fixed-wing mode is configured using the parameter [RTL_RETURN_ALT](#RTL_RETURN_ALT) (does not use the code described in the next paragraph).

The return altitude for a multicopter or a VTOL vehicles in MC mode is configured using the parameters [RTL_RETURN_ALT](#RTL_RETURN_ALT) and [RTL_CONE_ANG](#RTL_CONE_ANG), which define a half cone centered around the destination (home location or safety point).

![Return mode cone](../../assets/flying/rtl_cone.jpg)

<!-- Original draw.io diagram can be found here: https://drive.google.com/file/d/1W72XeZYSOkRlBSbPXCCiam9NMAyAWSg-/view?usp=sharing -->

Якщо транспорт є:

- Above [RTL_RETURN_ALT](#RTL_RETURN_ALT) (1) it will return at its current altitude.
- Below the cone it will return where it intersects the cone (2) or [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (whichever is higher).
- Outside the cone (3) it will first climb until it reaches [RTL_RETURN_ALT](#RTL_RETURN_ALT).
- Inside the cone:
  - Above [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (4) it will return at its current altitude.
  - Below [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (5) it will first ascend to `RTL_DESCEND_ALT`.

Примітка:

- If [RTL_CONE_ANG](#RTL_CONE_ANG) is 0 degrees there is no "cone":
  - the vehicle returns at `RTL_RETURN_ALT` (or above).
- If [RTL_CONE_ANG](#RTL_CONE_ANG) is 90 degrees the vehicle will return at the greater of `RTL_DESCEND_ALT` and the current altitude.
- The vehicle will always ascend at least [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) for the return.

## Посадка в пункті призначення

Unless executing a [mission landing pattern](#mission-landing-pattern) as part of the return mode, the vehicle will arrive at its destination, and rapidly descend to the [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) altitude, where it will loiter for [RTL_LAND_DELAY](#RTL_LAND_DELAY) before landing. If `RTL_LAND_DELAY=-1` it will loiter indefinitely.

The default landing configuration is vehicle dependent:

- Multicopters are configured to hover for a short while, deploying landing gear if needed, and then land.
- Fixed-wing vehicles use a return mode with a [mission landing pattern](#mission-landing-pattern), as this enables automated landing. If not using a mission landing, the default configuration is to loiter indefinitely, so the user can take over and manually land.
- VTOLs in MC mode fly and land exactly as a multicopter.
- VTOLS in FW mode head towards the landing point, transition to MC mode, and then land on the destination.

## Схема посадки місії

A mission landing pattern is a landing pattern defined as part of a mission plan. This consists of a [MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START), one or more position waypoints, and a [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) (or [MAV_CMD_NAV_VTOL_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_LAND) for a VTOL Vehicle).

Landing patterns defined in missions are the safest way to automatically land a _fixed-wing_ vehicle on PX4. For this reason fixed-wing vehicles are configured to use [Mission landing/really point return](#mission-landing-rally-point-return-type-rtl-type-1) by default.

## Параметри

Параметри RTL наведено в [Довідці параметрів > Режим повернення](../advanced_config/parameter_reference.md#return-mode) (і підсумовано нижче).

| Параметр                                                                                                   | Опис                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="RTL_TYPE"></a>[RTL_TYPE](../advanced_config/parameter_reference.md#RTL_TYPE)                    | Механізм повернення (шлях і місце призначення). <br>`0`: Повернення до точки ралі або додому (яка ближче) за прямим маршрутом. <br>`1`: Повернення до точки ралі або початкової точки місії посадки (яка ближче) за прямим маршрутом. If neither mission landing or rally points are defined return home via a direct path. If the destination is a mission landing pattern, follow the pattern to land.<br>`2`: Use mission path fast-forward to landing if a landing pattern is defined, otherwise fast-reverse to home. Ignore rally points. Fly direct to home if no mission plan is defined.<br>`3`: Return via direct path to closest destination: home, start of mission landing pattern or safe point. If the destination is a mission landing pattern, follow the pattern to land. |
| <a id="RTL_RETURN_ALT"></a>[RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)      | Return altitude in meters (default: 60m) when [RTL_CONE_ANG](../advanced_config/parameter_reference.md#RTL_CONE_ANG) is 0. If already above this value the vehicle will return at its current altitude.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| <a id="RTL_DESCEND_ALT"></a>[RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT)    | Minimum return altitude and altitude at which the vehicle will slow or stop its initial descent from a higher return altitude (default: 30m)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <a id="RTL_LAND_DELAY"></a>[RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)      | Time to wait at `RTL_DESCEND_ALT` before landing (default: 0.5s) -by default this period is short so that the vehicle will simply slow and then land immediately. If set to -1 the system will loiter at `RTL_DESCEND_ALT` rather than landing. The delay is provided to allow you to configure time for landing gear to be deployed (triggered automatically).                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| <a id="RTL_MIN_DIST"></a>[RTL_MIN_DIST](../advanced_config/parameter_reference.md#RTL_MIN_DIST)          | Minimum horizontal distance from home position to trigger ascent to the return altitude specified by the "cone". If the vehicle is horizontally closer than this distance to home, it will return at its current altitude or `RTL_DESCEND_ALT` (whichever is higher) instead of first ascending to RTL_RETURN_ALT.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| <a id="RTL_CONE_ANG"></a>[RTL_CONE_ANG](../advanced_config/parameter_reference.md#RTL_CONE_ANG)          | Half-angle of the cone that defines the vehicle RTL return altitude. Values (in degrees): 0, 25, 45, 65, 80, 90. Note that 0 is "no cone" (always return at `RTL_RETURN_ALT` or higher), while 90 indicates that the vehicle must return at the current altitude or `RTL_DESCEND_ALT` (whichever is higher).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE)    | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes_mc/position.md) (except when vehicle is handling a critical battery failsafe). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV)    | Кількість рухів стиків, яка викликає перехід у режим [Положення](../flight_modes_mc/position.md) (якщо [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) увімкнено).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <a id="RTL_LOITER_RAD"></a>[RTL_LOITER_RAD](../advanced_config/parameter_reference.md#RTL_LOITER_RAD)     | [Тільки фіксований крило] Радіус круга обертання (у значенні [RTL_LAND_DELAY](#RTL_LAND_DELAY)).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <a id="MIS_TKO_LAND_REQ"></a>[MIS_TKO_LAND_REQ](../advanced_config/parameter_reference.md#MIS_TKO_LAND_REQ) | Вкажіть, чи потрібна місія для посадки або злітної _траєкторії_. Generally fixed-wing vehicles set this to require a landing pattern but VTOL do not.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
