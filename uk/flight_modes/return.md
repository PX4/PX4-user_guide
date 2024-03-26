# Режим повернення (типовий транспорт)

<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />

Режим польоту _Return_ використовується для _повернення транспортного засобу до безпеки_ по вільному шляху до безпечного пункту призначення, де він повинен приземлитися.

Наступні теми слід прочитати першими, якщо ви використовуєте ці типи транспортних засобів:

- [Мультикоптери](../flight_modes_mc/return.md)
- [Фікосовані крила (літаки)](../flight_modes_fw/return.md)
- [VTOL](../flight_modes_vtol/return.md)

:::note

- Режим автоматичний - для керування автомобілем _не потрібно_ втручання користувача.
- Режим вимагає глобальної тривимірної оцінки позиції (з GPS або виведеної з [локальної позиції](../ros/external_position_estimation.md#enabling-auto-modes-with-a-local-position)).
  - Літаючі апарати не можуть перемикатися в цей режим без глобальної позиції.
  - Літаючі транспортні засоби будуть аварійно переходити в безпечний режим, якщо втрачають оцінку позиції.
- Режим вимагає встановленої домашньої позиції.
- Режим перешкоджає взброєнню (транспортний засіб повинен бути включеним при переході в цей режим).
- Перемикачі керування RC можна використовувати для зміни режимів польоту на будь-якому автомобілі.
- Рух палиць дистанційного керування в багатороторному літальному апараті (або ВТОЛ у режимі багатороторного літання) [за замовчуванням](#COM_RC_OVERRIDE) змінить режим транспортного засобу на [режим позиції](../flight_modes_mc/position.md), якщо не виникне критична аварія батареї.
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

У цьому типі повернення транспортний засіб:

- Піднімається на безпечну [мінімальну висоту повернення](#minimum-return-altitude) (вище будь-яких очікуваних перешкод).
- Летить прямо до найближчої точки призначення: домашньої локації, шаблону посадки місії або точки ралі.
- Якщо місце призначення - це [шаблон посадки місії](#mission-landing-pattern), транспортний засіб буде дотримуватися шаблону для посадки.
- Якщо місце призначення - це домашнє місце або точка ралі, транспортний засіб спускається на висоту спуску ([RTL_DESCEND_ALT](#RTL_DESCEND_ALT)) і потім [посаджується або чекає](#loiter-landing-at-destination). By default an MC or VTOL in MC mode will land, and a fixed-wing vehicle circles at the descent altitude. A VTOL in FW mode aligns its heading to the destination point, transitions to MC mode, and then lands.

## Мінімальна висота повернення

Для більшості [типів повернення](#return_types) транспортний засіб підніматиметься до _мінімальної безпечної висоти_ перед поверненням (якщо вже не перебуває вище цієї висоти), щоб уникнути перешкод між ним і місцем призначення.

:::note
Виняток становить виконання [повернення за маршрутом місії](#mission-path-return-type-rtl-type-2) з _меж місії_. У цьому випадку транспортний засіб слідує точкам маршруту місії, які ми припускаємо, що сплановані таким чином, щоб уникнути будь-яких перешкод.
:::

Повернення на висоту для літака або ВТОЛ-транспортного засобу в режимі фіксованого крила налаштовується за допомогою параметра [RTL_RETURN_ALT](#RTL_RETURN_ALT) (не використовує код, описаний у наступному пункті).

Повернення на висоту для багатокоптерів або ВТОЛ-транспортних засобів у режимі MC налаштовується за допомогою параметрів [RTL_RETURN_ALT](#RTL_RETURN_ALT) та [RTL_CONE_ANG](#RTL_CONE_ANG), які визначають пів-конус, центрований навколо пункту призначення (домашнього місця або безпечної точки).

![Return mode cone](../../assets/flying/rtl_cone.jpg)

<!-- Original draw.io diagram can be found here: https://drive.google.com/file/d/1W72XeZYSOkRlBSbPXCCiam9NMAyAWSg-/view?usp=sharing -->

Якщо транспорт є:

- Вище [RTL_RETURN_ALT](#RTL_RETURN_ALT) (1) він повернеться на своїй поточній висоті.
- Нижче конуса він повернеться туди, де він перетинається з конусом (2) або [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (яка б вища).
- Поза конусом (3) спочатку підніметься до досягнення [RTL_RETURN_ALT](#RTL_RETURN_ALT).
- У межах конуса:
  - Вище [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (4) він повернеться на свою поточну висоту.
  - Нижче [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (5) спочатку він підніметься до `RTL_DESCEND_ALT`.

Примітка:

- Якщо кут [RTL_CONE_ANG](#RTL_CONE_ANG) дорівнює 0 градусам, то "конуса" немає:
  - the vehicle returns at `RTL_RETURN_ALT` (or above).
- Якщо [RTL_CONE_ANG](#RTL_CONE_ANG) дорівнює 90 градусам, транспортний засіб повертатиметься на велику висоту, ніж `RTL_DESCEND_ALT`, та на поточну висоту.
- Транспортний засіб завжди підніметься принаймні на висоту [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) для повернення.

## Посадка в пункті призначення

Крім випадків, коли виконується [шаблон посадки місії](#mission-landing-pattern) як частина режиму повернення, транспортний засіб прибуде до пункту призначення і швидко опуститься до висоти [RTL_DESCEND_ALT](#RTL_DESCEND_ALT), де він буде кружляти протягом [RTL_LAND_DELAY](#RTL_LAND_DELAY), перед посадкою. Якщо `RTL_LAND_DELAY=-1`, він буде багато часу кружляти.

Конфігурація за замовчуванням для посадки залежить від типу транспортного засобу:

- Багтороторні літальні апарати налаштовані на коротку паузу в горизонтальному положенні, розкладаючи стійки посадкової шасі за потреби, а потім сідають.
- Літальні апарати з фіксованим крилом використовують режим повернення з [шаблоном посадки місії](#mission-landing-pattern), оскільки це дозволяє автоматизовану посадку. Якщо не використовується посадка за допомогою місії, конфігурація за замовчуванням полягає в нескінченному обертанні, щоб користувач міг взяти керування власноруч і виконати посадку.
- VTOLи в режимі MC літають і сідають точно так само, як багтороторний вертоліт.
- VTOLи в режимі FW рухаються до точки посадки, переходять у режим MC, а потім сідають на місце призначення.

## Схема посадки місії

Шаблон посадки місії - це шаблон посадки, визначений як частина плану місії. Це включає в себе [MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START), одне або кілька позиційних точок маршруту та [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) (або [MAV_CMD_NAV_VTOL_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_LAND) для VTOL-транспортного засобу).

Landing patterns defined in missions are the safest way to automatically land a _fixed-wing_ vehicle on PX4. For this reason fixed-wing vehicles are configured to use [Mission landing/really point return](#mission-landing-rally-point-return-type-rtl-type-1) by default.

## Параметри

Параметри RTL наведено в [Довідці параметрів > Режим повернення](../advanced_config/parameter_reference.md#return-mode) (і підсумовано нижче).

| Параметр                                                                                                   | Опис                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="RTL_TYPE"></a>[RTL_TYPE](../advanced_config/parameter_reference.md#RTL_TYPE)                    | Механізм повернення (шлях і місце призначення). <br>`0`: Повернення до точки ралі або додому (яка ближче) за прямим маршрутом. <br>`1`: Повернення до точки ралі або початкової точки місії посадки (яка ближче) за прямим маршрутом. If neither mission landing or rally points are defined return home via a direct path. Якщо місія включає посадковий маршрут, слідуємо маршруту для посадки. <br>`2`: Використовуйте шлях місії, щоб швидко перейти до посадки, якщо визначений посадковий маршрут, в іншому випадку швидко повертайтеся додому. Ігноруємо точки ралі. Летіти прямо додому, якщо не визначено жодного плану місії. <br>`3`: Повертатися прямим шляхом до найближчої точки призначення: дому, початку шаблону посадки місії або безпечної точки. Якщо місце призначення - це шаблон посадки місії, дотримуйтеся шаблону для посадки. |
| <a id="RTL_RETURN_ALT"></a>[RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)      | Return altitude в метрах (за замовчуванням: 60 м), коли [RTL_CONE_ANG](../advanced_config/parameter_reference.md#RTL_CONE_ANG) дорівнює 0. Якщо вже вище цієї величини, транспортний засіб повернеться на поточну висоту.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <a id="RTL_DESCEND_ALT"></a>[RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT)    | Minimum return altitude and altitude at which the vehicle will slow or stop its initial descent from a higher return altitude (default: 30m)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| <a id="RTL_LAND_DELAY"></a>[RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)      | Час очікування на висоті `RTL_DESCEND_ALT` перед посадкою (за замовчуванням: 0.5 с) - за замовчуванням цей період короткий, щоб транспортний засіб просто сповільнився, а потім враз відразу приземлився. Якщо встановлено значення -1, система буде кружляти на висоті `RTL_DESCEND_ALT` замість посадки. Затримка надається для того, щоб ви могли налаштувати час для розгортання шасі для посадки (автоматично спрацьовує).                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <a id="RTL_MIN_DIST"></a>[RTL_MIN_DIST](../advanced_config/parameter_reference.md#RTL_MIN_DIST)          | Мінімальна горизонтальна відстань від домашньої позиції, щоб викликати підйом на висоту повернення, вказану "конусом". Якщо транспортний засіб горизонтально ближче, ніж ця відстань до дому, він повернеться на свою поточну висоту або `RTL_DESCEND_ALT` (вище з двох) замість того, щоб спочатку підніматися на RTL_RETURN_ALT.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| <a id="RTL_CONE_ANG"></a>[RTL_CONE_ANG](../advanced_config/parameter_reference.md#RTL_CONE_ANG)          | Half-angle of the cone that defines the vehicle RTL return altitude. Values (in degrees): 0, 25, 45, 65, 80, 90. Зауважте, що 0 означає "без конуса" (завжди повертатися на `RTL_RETURN_ALT` або вище), тоді як 90 вказує на те, що транспортний засіб повинен повертатися на поточну висоту або `RTL_DESCEND_ALT` (яка вища).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE)    | Контролює, чи рух палиць на багтрековому літальному апараті (або VTOL у режимі MC) викликає зміну режиму на [Режим позиціонування](../flight_modes_mc/position.md) (крім випадку, коли транспортний засіб вирішує критичне аварійне вимкнення батареї). Це можна окремо увімкнути для автоматичних режимів та для режиму поза бортом, і в автоматичних режимах воно включено за замовчуванням.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV)    | Кількість рухів стиків, яка викликає перехід у режим [Положення](../flight_modes_mc/position.md) (якщо [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) увімкнено).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <a id="RTL_LOITER_RAD"></a>[RTL_LOITER_RAD](../advanced_config/parameter_reference.md#RTL_LOITER_RAD)     | [Тільки фіксований крило] Радіус круга обертання (у значенні [RTL_LAND_DELAY](#RTL_LAND_DELAY)).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| <a id="MIS_TKO_LAND_REQ"></a>[MIS_TKO_LAND_REQ](../advanced_config/parameter_reference.md#MIS_TKO_LAND_REQ) | Вкажіть, чи потрібна місія для посадки або злітної траєкторії _необхідна_. Загалом, фіксованокрилі транспортні засоби встановлюють це для вимагання патерну посадки, але ВТОЛ цього не роблять.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
