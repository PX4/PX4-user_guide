# Конфігурація безпеки (аварійні режими)

PX4 має кілька функцій безпеки для захисту та відновлення вашого транспортного засобу в разі виникнення проблем:

- _Аварійні режими_ дозволяють вам визначати зони та умови, за яких ви можете безпечно літати, і [дію](#failsafe-actions), яка буде виконана, якщо спрацює аварійний режим (наприклад, посадка, утримання позиції або повернення до вказаної точки). Найважливіші налаштування аварійних режимів конфігуруються на сторінці [Налаштування безпеки](#qgroundcontrol-safety-setup) в _QGroundControl_. Інші потрібно налаштовувати через [параметри](#other-safety-settings).
- [Перемикачі безпеки](#emergency-switches) на пульті дистанційного керування можуть використовуватися для негайного зупинення двигунів або повернення транспортного засобу у випадку проблеми.

## Дії аварійного режиму

Коли спрацьовує аварійний режим, типова поведінка (для більшості аварійних режимів) полягає в тому, що він входить у режим утримання протягом [COM_FAIL_ACT_T](../advanced_config/parameter_reference.md#COM_FAIL_ACT_T) секунд перед виконанням відповідної дії аварійного режиму. Це дає користувачу час помітити, що відбувається, і перевизначити аварійний режим, якщо це необхідно. У більшості випадків це можна зробити, використовуючи RC або GCS для перемикання режимів (зверніть увагу, що під час утримання аварійного режиму переміщення пультів RC не спричиняє перезапуску).

Нижче наведений список всіх дій аварійного режиму, впорядкованих за зростанням серйозності. Зверніть увагу, що різні типи аварійного режиму можуть не підтримувати всі ці дії.

| Дія                                                        | Опис                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="act_none"></a>None/Disabled                     | No action. The failsafe will be ignored.                                                                                                                                                                                                                                                                                                   |
| <a id="act_warn"></a>Warning                           | A warning message will be sent (i.e. to _QGroundControl_).                                                                                                                                                                                                                                                                                 |
| <a id="act_hold"></a>Hold mode                         | The vehicle will enter [Hold mode (MC)](../flight_modes_mc/hold.md) or [Hold mode (FW)](../flight_modes_fw/hold.md) and hover or circle, respectively. VTOL vehicles will hold according to their current mode (MC/FW).                                                                                                                    |
| <a id="act_return"></a>[Return mode][return]             | The vehicle will enter _Return mode_. Return behaviour can be set in the [Return Home Settings](#return-mode-settings) (below).                                                                                                                                                                                                            |
| <a id="act_land"></a>Land mode                         | The vehicle will enter [Land mode (MC)](../flight_modes_mc/land.md) or [Land mode (FW)](../flight_modes_fw/land.md), and land. A VTOL will first transition to MC mode.                                                                                                                                                                    |
| <a id="act_disarm"></a>Disarm                            | Stops the motors immediately.                                                                                                                                                                                                                                                                                                              |
| <a id="act_term"></a>[Flight termination][flight_term] | Turns off all controllers and sets all PWM outputs to their failsafe values (e.g. [PWM_MAIN_FAILn][pwm_main_failn], [PWM_AUX_FAILn][pwm_main_failn]). The failsafe outputs can be used to deploy a parachute, landing gear or perform another operation. For a fixed-wing vehicle this might allow you to glide the vehicle to safety. |

If multiple failsafes are triggered, the more severe action is taken. For example if both RC and GPS are lost, and manual control loss is set to [Return mode](#act_return) and GCS link loss to [Land](#act_land), Land is executed.

:::tip
The exact behavior when different failsafes are triggered can be tested with the [Failsafe State Machine Simulation](safety_simulation.md).
:::

## Налаштування безпеки QGroundControl

Сторінка налаштувань безпеки в _QGroundControl_ доступна за допомогою кліку на значок _QGroundControl_, вибору **Налаштування транспортного засобу**, а потім **Безпека** у бічній панелі. Це включає найважливіші налаштування аварійного режиму (батарея, втрата RC тощо) та налаштування спрацьованих дій _Повернення_ та _Посадка_.

![Safety Setup(QGC)](../../assets/qgc/setup/safety/safety_setup.png)

### Аварійний режим в разі низького рівня заряду батареї

Аварійний режим при низькому заряді батареї спрацьовує, коли ємність батареї падає нижче одного (або кількох) значень рівня попередження.

![Safety - Battery (QGC)](../../assets/qgc/setup/safety/safety_battery.png)

Найпоширеніша конфігурація полягає в встановленні значень та дій, як описано вище (з `Попередження > Аварійний режим > Екстрена ситуація`). З такою конфігурацією аварійний режим спочатку викличе попередження, потім повернення, і, нарешті, посадку, якщо ємність впаде нижче відповідних рівнів.

Також можливо встановити _Дію аварійного режиму_ на попередження, повернення або посадку, коли досягнуто [Рівень аварійного режиму батареї](#BAT_CRIT_THR).

Налаштування та вибрані параметри показані нижче.

| Налаштування                                                          | Параметр                                                                       | Опис                                                                                                                                                                                                                         |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Failsafe Action                                                       | [COM_LOW_BAT_ACT](../advanced_config/parameter_reference.md#COM_LOW_BAT_ACT) | Попередження, Повернення або Посадка, коли ємність падає нижче [рівня аварійного рівня акумулятора](#BAT_CRIT_THR), АБО Попередження, потім повернення, потім посадка на основі кожного з нижченаведених рівнів налаштувань. |
| Рівень попередження про низький заряд акумулятора                     | [BAT_LOW_THR](../advanced_config/parameter_reference.md#BAT_LOW_THR)         | Відсоткова ємність для попереджень (або інших дій).                                                                                                                                                                          |
| <a id="BAT_CRIT_THR"></a>Надійний рівень заряду акумулятора становить | [BAT_CRIT_THR](../advanced_config/parameter_reference.md#BAT_CRIT_THR)       | Відсоткова ємність для дії Повернення (або інших дій, якщо вибрано одну дію).                                                                                                                                                |
| Критичний рівень батареї                                              | [BAT_EMERGEN_THR](../advanced_config/parameter_reference.md#BAT_EMERGEN_THR) | Percentage capacity for triggering Land (immediately) action.                                                                                                                                                                |

### Аварійний режим втрати ручного керування

The manual control loss failsafe may be triggered if the connection to the [RC transmitter](../getting_started/rc_transmitter_receiver.md) or [joystick](../config/joystick.md) is lost, and there is no fallback. If using an [RC transmitter](../getting_started/rc_transmitter_receiver.md) this is triggered if the RC [transmitter link is lost](../getting_started/rc_transmitter_receiver.md#set-signal-loss-behaviour). If using [joysticks](../config/joystick.md) connected over a MAVLink data link, this is triggered if the joysticks are disconnected or the data link is lost.

::: info PX4 and the receiver may also need to be configured in order to _detect RC loss_: [Radio Setup > RC Loss Detection](../config/radio.md#rc-loss-detection).
:::

![Safety - RC Loss (QGC)](../../assets/qgc/setup/safety/safety_rc_loss.png)

The QGCroundControl Safety UI allows you to set the [failsafe action](#failsafe-actions) and [RC Loss timeout](#COM_RC_LOSS_T). Users that want to disable the RC loss failsafe in specific automatic modes (mission, hold, offboard) can do so using the parameter [COM_RCL_EXCEPT](#COM_RCL_EXCEPT).

Нижче наведено додаткові (і базові) налаштування параметрів.

| Параметр                                                                                               | Налаштування                | Опис                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="COM_RC_LOSS_T"></a>[COM_RC_LOSS_T](../advanced_config/parameter_reference.md#COM_RC_LOSS_T)    | Manual Control Loss Timeout | Час після отримання останньої встановленої точки від вибраного джерела керування вручну, після якого керування вважається втраченим. Це повинно бути коротким, оскільки транспортний засіб продовжуватиме літати за старими налаштуваннями керування вручну, поки не спрацює таймаут.                                                                                                                                                            |
| <a id="COM_FAIL_ACT_T"></a>[COM_FAIL_ACT_T](../advanced_config/parameter_reference.md#COM_FAIL_ACT_T)  | Failsafe Reaction Delay     | Затримка в секундах між виникненням умови аварійного режиму (`COM_RC_LOSS_T`) та аварійною дією (RTL, Land, Hold). У цьому стані транспортний засіб очікує в режимі утримання на повторне підключення джерела керування вручну. Це може бути встановлено довше для довгих польотів, щоб втрата інтермітентного з'єднання не викликала негайного виклику аварійного режиму. Це може бути рівним нулю, щоб аварійний запобіжник спрацював негайно. |
| <a id="NAV_RCL_ACT"></a>[NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)       | Failsafe Action             | Вимкнути, Блукати, Повернутися, Приземлитися, Роззброїти, Завершити.                                                                                                                                                                                                                                                                                                                                                                             |
| <a id="COM_RCL_EXCEPT"></a>[COM_RCL_EXCEPT](../advanced_config/parameter_reference.md#COM_RCL_EXCEPT) | Виключення втрат RC         | Встановіть режими, в яких втрата керування вручну ігнорується: Місія, Утримання, Offboard.                                                                                                                                                                                                                                                                                                                                                       |

### Data Link Loss Failsafe

The Data Link Loss failsafe is triggered if a telemetry link (connection to ground station) is lost.

![Safety - Data Link Loss (QGC)](../../assets/qgc/setup/safety/safety_data_link_loss.png)

Налаштування та вибрані параметри показані нижче.

| Налаштування           | Параметр                                                                   | Опис                                                                  |
| ---------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Data Link Loss Timeout | [COM_DL_LOSS_T](../advanced_config/parameter_reference.md#COM_DL_LOSS_T) | Час після втрати з'єднання з даними перед тим, як спрацює запобіжник. |
| Failsafe Action        | [NAV_DLL_ACT](../advanced_config/parameter_reference.md#NAV_DLL_ACT)     | Вимкнути, Hold mode, Return mode, Land mode, Роззброїти, Завершити.   |

### Аварійний режим "обмеження зони політів"

Аварійний режим "обмеження зони політів" спрацьовує, коли дрон перетинає "віртуальний" периметр. У найпростішій формі периметр налаштовується як циліндр, центрований навколо домашньої позиції. Якщо транспортний засіб виходить за межі радіуса або вище вказаної висоти, спрацьовує вказана _Дія аварійного режиму_.

![Safety - Geofence (QGC)](../../assets/qgc/setup/safety/safety_geofence.png)

:::tip PX4 окремо підтримує більш складні геофенси з багатьма довільними полігональними та круговими областями включення та виключення: [Політ > Геофенс](../flying/geofence.md).
:::

The settings and underlying [geofence parameters](../advanced_config/parameter_reference.md#geofence) are shown below.

| Налаштування     | Параметр                                                                       | Опис                                                            |
| ---------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Action on breach | [GF_ACTION](../advanced_config/parameter_reference.md#GF_ACTION)               | None, Warning, Hold mode, Return mode, Terminate, Land.         |
| Max Radius       | [GF_MAX_HOR_DIST](../advanced_config/parameter_reference.md#GF_MAX_HOR_DIST) | Horizontal radius of geofence cylinder. Geofence disabled if 0. |
| Max Altitude     | [GF_MAX_VER_DIST](../advanced_config/parameter_reference.md#GF_MAX_VER_DIST) | Height of geofence cylinder. Geofence disabled if 0.            |

::: info Setting `GF_ACTION` to terminate will kill the vehicle on violation of the fence. Через вбудовану небезпеку ця функція вимкнена за допомогою [CBRK_FLIGHTTERM](#CBRK_FLIGHTTERM), яку потрібно скинути на 0, щоб дійсно вимкнути систему.
:::

The following settings also apply, but are not displayed in the QGC UI.

| Налаштування                                                     | Параметр                                                                     | Опис                                                                                                                                                                     |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="GF_SOURCE"></a>Geofence source                        | [GF_SOURCE](../advanced_config/parameter_reference.md#GF_SOURCE)             | Встановіть, чи джерело позиції є оціненою глобальною позицією або прямо з пристрою GPS.                                                                                  |
| <a id="GF_PREDICT"></a>Preemptive geofence triggering         | [GF_PREDICT](../advanced_config/parameter_reference.md#GF_PREDICT)           | (Експериментальний) Спрацьовувати геозону, якщо поточний рух транспортного засобу передбачає спрацьовування порушення (замість пізнього спрацьовування після порушення). |
| <a id="CBRK_FLIGHTTERM"></a>Circuit breaker for flight termination | [CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | Увімкнення/вимкнення дії припинення польоту (за замовчуванням вимкнено).                                                                                                 |

### Return Mode Settings

<!-- Propose replace section by a summary and links - return mode is complicated -->

_Return_ is a common [failsafe action](#failsafe-actions) that engages [Return mode](../flight_modes/return.md) to return the vehicle to the home position. This section shows how to set the land/loiter behaviour after returning.

![Safety - Return Home Settings (QGC)](../../assets/qgc/setup/safety/safety_return_home.png)

The settings and underlying parameters are shown below:

| Налаштування                                | Параметр                                                                       | Опис                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| <a id="RTL_RETURN_ALT"></a>Climb to altitude | [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)   | Транспортний засіб піднімається до цієї мінімальної висоти (якщо вона нижче) для повернення польоту.   |
| Return behaviour                            |                                                                                | Choice list of _Return then_: Land, Loiter and do not land, or Loiter and land after a specified time. |
| <a id="RTL_DESCEND_ALT"></a>Loiter Altitude   | [RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | If return with loiter is selected you can also specify the altitude at which the vehicle hold.         |
| <a id="RTL_LAND_DELAY"></a>Loiter Time       | [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)   | If return with loiter then land is selected you can also specify how long the vehicle will hold.       |

::: info The return behaviour is defined by [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY). If negative the vehicle will land immediately. Additional information can be found in [Return mode](../flight_modes/return.md).
:::

### Land Mode Settings

_Land at the current position_ is a common [failsafe action](#failsafe-actions) (in particular for multicopters), that engages [Land Mode](../flight_modes_mc/land.md). This section shows how to control when and if the vehicle automatically disarms after landing. For Multicopters (only) you can additionally set the descent rate.

![Safety - Land Mode Settings (QGC)](../../assets/qgc/setup/safety/safety_land_mode.png)

The settings and underlying parameters are shown below:

| Налаштування                   | Параметр                                                                       | Опис                                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Disarm After                   | [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Select checkbox to specify that the vehicle will disarm after landing. The value must be non-zero but can be a fraction of a second. |
| Landing Descent Rate (MC only) | [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | Rate of descent.                                                                                                                     |

## Інші налаштування аварійного режиму

This section contains information about failsafe settings that cannot be configured through the _QGroundControl_ [Safety Setup](#qgroundcontrol-safety-setup) page.

### Аварійний режим втрати позиції (GPS)

Відключення позиції _втрати безпеки_ спрацьовує, якщо якість оцінки позиції PX4 падає нижче прийнятних рівнів (це може бути спричинено втратою GPS) під час режиму, який вимагає прийнятної оцінки позиції.

Дія невдачі контролюється за допомогою [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL), залежно від того, чи припускається наявність керування RC (та інформації про висоту):

- `0`: Remote control available. Switch to _Altitude mode_ if a height estimate is available, otherwise _Stabilized mode_.
- `1`: Remote control _not_ available. Switch to _Descend mode_ if a height estimate is available, otherwise enter flight termination. _Descend mode_ is a landing mode that does not require a position estimate.

Літаки з фіксованими крилами та ВПП у фіксованому польоті додатково мають параметр ([FW_GPSF_LT](../advanced_config/parameter_reference.md#FW_GPSF_LT)), що визначає, як довго вони будуть чекати (обертаючись з постійним кутом крену ([FW_GPSF_R](../advanced_config/parameter_reference.md#FW_GPSF_R)) на поточній висоті), якщо втратили позицію, перед спробою посадки. Якщо VTOLs налаштовані на перехід у режим утримання для посадки ([NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)), то вони спочатку перейдуть у цей режим, а потім опустяться.

Відповідні параметри для всіх транспортних засобів наведено нижче.

| Параметр                                                                                                   | Опис                                                                                                      |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <a id="COM_POS_FS_DELAY"></a>[COM_POS_FS_DELAY](../advanced_config/parameter_reference.md#COM_POS_FS_DELAY) | Затримка після втрати позиції перед спрацюванням аварійного режиму.                                       |
| <a id="COM_POSCTL_NAVL"></a>[COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)   | Position control navigation loss response during mission. Values: 0 - assume use of RC, 1 - Assume no RC. |

Parameters that only affect Fixed-wing vehicles:

| Параметр                                                                                       | Опис                                                                                                        |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <a id="FW_GPSF_LT"></a>[FW_GPSF_LT](../advanced_config/parameter_reference.md#FW_GPSF_LT) | Loiter time (waiting for GPS recovery before it goes into land or flight termination). Set to 0 to disable. |
| <a id="FW_GPSF_R"></a>[FW_GPSF_R](../advanced_config/parameter_reference.md#FW_GPSF_R)   | Fixed roll/bank angle while circling.                                                                       |

### Аварійний режим втрати управління з пульта

_Offboard Loss Failsafe_ спрацьовує, якщо втрачено зв'язок з платформою під час управління Offboard. Можна вказати різні дії аварійного режиму в залежності від наявності зв'язку з RC.

Відповідні параметри наведено нижче:

| Параметр                                                                     | Опис                                                                                                              |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | Delay after loss of offboard connection before the failsafe is triggered.                                         |
| [COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | Failsafe action if RC is available: Position mode, Altitude mode, Manual mode, Return mode, Land mode, Hold mode. |

### Перевірки можливості місії

A number of checks are run to ensure that a mission can only be started if it is _feasible_. For example, the checks ensures that the first waypoint isn't too far away, and that the mission flight path doesn't conflict with any geofences.

As these are not strictly speaking "failsafes" they are documented in [Mission Mode (FW) > Mission Feasibility Checks](../flight_modes_fw/mission.md#mission-feasibility-checks) and [Mission Mode (MC) > Mission Feasibility Checks](../flight_modes_mc/mission.md#mission-feasibility-checks).

### Аварійний режим уникнення трафіку

Аварійний режим уникнення трафіку дозволяє PX4 реагувати на дані від транспондерів (наприклад, від [ADS-B транспондерів](../advanced_features/traffic_avoidance_adsb.md)) під час місій.

Відповідні параметри наведено нижче:

| Параметр                                                                       | Опис                                                                                       |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| [NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | Встановіть дію аварійного режиму: Вимкнено, Попередження, Режим повернення, Режим посадки. |

### Quad-chute Failsafe

Аварійний режим для випадку, коли БЛА типу VTOL більше не може летіти у режимі фіксованого крила, наприклад, через відмову тягового мотора, датчика швидкості повітря або керованої поверхні. Якщо спрацьовує аварійний режим, транспортний засіб негайно перейде у режим багтороторного літання і виконає дію, визначену у параметрі [COM_QC_ACT](#COM_QC_ACT).

:::info Quad-chute також може бути спрацьована відправленням повідомлення MAVLINK [MAV_CMD_DO_VTOL_TRANSITION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_VTOL_TRANSITION) з параметром `param2`, встановленим на `1`.
:::

Параметри, які контролюють те, коли спрацює квадро-шнур, перераховані в таблиці нижче.

| Параметр                                                                                                     | Опис                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_QC_ACT"></a>[COM_QC_ACT](../advanced_config/parameter_reference.md#COM_QC_ACT)               | Дія чотирьох канатів після переходу на польот на багатокоптер. Може бути встановлено на: [Попередження](#act_warn), [Повернення](#act_return), [Посадка](#act_land), [Утримання](#act_hold).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <a id="VT_FW_QC_HMAX"></a>[VT_FW_QC_HMAX](../advanced_config/parameter_reference.md#VT_FW_QC_HMAX)         | Максимальна висота квадрокута, нижче якої не спрацьовує аварійний відпуск квадрокута. Це запобігає швидкому спуску квадрокутника на велику висоту, що може розрядити батарею (і саме це може спричинити крах). Висота є відносною до землі, дому або місцевого походження (за вподобанням, в залежності від доступності).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <a id="VT_QC_ALT_LOSS"></a>[VT_QC_ALT_LOSS](../advanced_config/parameter_reference.md#VT_QC_ALT_LOSS)       | Поріг висоти аварійного спуску з чотирма парашутами.<br><br>У режимах керування висотою, таких як [Режим утримання](../flight_modes_fw/hold.md), [Режим позиції](../flight_modes_fw/position.md), [Режим висоти](../flight_modes_fw/altitude.md), або [Режим місії](../flight_modes_fw/mission.md), транспортний засіб повинен відстежувати свою поточну "командовану" висотну точку встановлення. Запускається аварійний парашут у випадку, якщо транспортний засіб падає надто далеко нижче заданої точки (на величину, визначену в цьому параметрі).<br><br>Зверніть увагу, що аварійний парашут запускається лише у випадку, якщо транспортний засіб постійно втрачає висоту нижче заданої точки; він не запускається, якщо задана точка висоти зростає швидше, ніж може рухатися транспортний засіб. |
| <a id="VT_QC_T_ALT_LOSS"></a>[VT_QC_T_ALT_LOSS](../advanced_config/parameter_reference.md#VT_QC_T_ALT_LOSS) | Поріг втрати висоти для спрацьовування квадропарашута під час переходу VTOL до польоту на фіксованому крилі. Quad-chute спрацьовує, якщо транспортний засіб падає на таку висоту нижче своєї початкової висоти перед завершенням переходу.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <a id="VT_FW_MIN_ALT"></a>[VT_FW_MIN_ALT](../advanced_config/parameter_reference.md#VT_FW_MIN_ALT)         | Мінімальна висота над домашнім місцем для польотів на фіксованих крилах. Коли висота падає нижче цієї величини під час польоту на фіксованому крилі, тригерується квадрокупол.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| <a id="VT_FW_QC_R"></a>[VT_FW_QC_R](../advanced_config/parameter_reference.md#VT_FW_QC_R)               | Абсолютний поріг обертання для спрацьовування квадро-шнура в режимі FW.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| <a id="VT_FW_QC_P"></a>[VT_FW_QC_P](../advanced_config/parameter_reference.md#VT_FW_QC_P)               | Абсолютний поріг чутливості для виклику квадро-шлюзу у режимі FW.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## Виявлення відмов

Детектор відмов дозволяє автомобілю вжити захисних заходів, якщо він несподівано перевертається, або якщо йому повідомлено зовнішньою системою виявлення відмов.

Під час **польоту**, детектор відмов може бути використаний для спрацювання [припинення польоту](../advanced_config/flight_termination.md), якщо відбулися умови відмови, що може запустити [парашут](../peripherals/parachute.md) або виконати іншу дію.

:::info Виявлення відмови під час польоту за замовчуванням вимкнено (увімкніть, встановивши параметр: [CBRK_FLIGHTTERM=0](#CBRK_FLIGHTTERM)).
:::

Під час **зльоту** детектор відмов [тригер атитюди](#attitude-trigger) викликає дію [вимкнення](#act_disarm), якщо транспортний засіб перекочується (вимкнення вимикає двигуни, але, на відміну від припинення польоту, не запускає парашут або виконує інші дії при відмові). Зверніть увагу, що ця перевірка _завжди увімкнена при зльоті_, незалежно від параметра `CBRK_FLIGHTTERM`.

Детектор відмов активний для всіх типів транспортних засобів і режимів, за винятком тих, де передбачається, що транспортний засіб _очікується_ робити оберти (тобто [Режим Acro (MC)](../flight_modes_mc/altitude.md), [Режим Acro (FW)](../flight_modes_fw/altitude.md) та [Ручний (FW)](../flight_modes_fw/manual.md)).

### Attitude Trigger

Детектор відмов може бути налаштований на спрацьовування, якщо стан автомобіля перевищує попередньо визначені значення крена та кочення протягом певного часу.

The relevant parameters are shown below:

| Параметр                                                                                               | Опис                                                                                                                             |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| <a id="CBRK_FLIGHTTERM"></a>[CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | Flight termination circuit breaker. Unset from 121212 (default) to enable flight termination due to FailureDetector or FMU loss. |
| <a id="FD_FAIL_P"></a>[FD_FAIL_P](../advanced_config/parameter_reference.md#FD_FAIL_P)           | Maximum allowed pitch (in degrees).                                                                                              |
| <a id="FD_FAIL_R"></a>[FD_FAIL_R](../advanced_config/parameter_reference.md#FD_FAIL_R)           | Maximum allowed roll (in degrees).                                                                                               |
| <a id="FD_FAIL_P_TTRI"></a>[FD_FAIL_P_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_P_TTRI) | Time to exceed [FD_FAIL_P](#FD_FAIL_P) for failure detection (default 0.3s).                                                   |
| <a id="FD_FAIL_R_TTRI"></a>[FD_FAIL_R_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_R_TTRI) | Time to exceed [FD_FAIL_R](#FD_FAIL_R) for failure detection (default 0.3s).                                                   |

### External Automatic Trigger System (ATS)

The [failure detector](#failure-detector), if [enabled](#CBRK_FLIGHTTERM), can also be triggered by an external ATS system. Зовнішня система тригера повинна бути підключена до порту керування польотом AUX5 (або MAIN5 на платах, які не мають додаткових портів), і налаштовується за допомогою наведених нижче параметрів.

:::info Зовнішній ATS потрібен згідно з [ASTM F3322-18](https://webstore.ansi.org/Standards/ASTM/ASTMF332218). One example of an ATS device is the [FruityChutes Sentinel Automatic Trigger System](https://fruitychutes.com/uav_rpv_drone_recovery_parachutes/sentinel-automatic-trigger-system.htm).
:::

| Параметр                                                                                                 | Опис                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="FD_EXT_ATS_EN"></a>[FD_EXT_ATS_EN](../advanced_config/parameter_reference.md#FD_EXT_ATS_EN)     | Enable PWM input on AUX5 or MAIN5 (depending on board) for engaging failsafe from an external automatic trigger system (ATS). Default: Disabled. |
| <a id="FD_EXT_ATS_TRIG"></a>[FD_EXT_ATS_TRIG](../advanced_config/parameter_reference.md#FD_EXT_ATS_TRIG) | The PWM threshold from external automatic trigger system for engaging failsafe. Default: 1900 ms.                                                |

## Перемикачі екстренного виклику

Пультові перемикачі можуть бути налаштовані (як частина налаштувань _QGroundControl_ [Режиму польоту](../config/flight_mode.md)) для того, щоб ви могли швидко вжити корекційних дій у разі проблеми або екстренної ситуації; наприклад, для зупинки всіх моторів або активації режиму [Повернення](#return-switch).

Цей розділ перелічує доступні аварійні вимикачі.

### Перемикач вимкнення

Кнопка "вимкнення" негайно припиняє всі виходи мотора (і, якщо транспортний засіб у повітрі, він почне падати)! Мотори будуть перезапускатися, якщо перемикач буде повернуто назад протягом 5 секунд. Після 5 секунд транспортний засіб автоматично вимкнеться; вам потрібно буде знову ввімкнути його для запуску моторів.

### Перемикач увімкнення/вимкнення

Перемикач увімкнення / вимкнення є _прямим замінником_ для типового механізму увімкнення / вимкнення на палиці (та виконує ту ж функцію: переконується, що перед запуском / зупинкою двигунів є умисний крок). Це може бути використано замість механізму за замовчуванням через те, що:

- Of a preference of a switch over a stick motion.
- It avoids accidentally triggering arming/disarming in-air with a certain stick motion.
- There is no delay (it reacts immediately).

Перемикач увімкнення/вимкнення негайно вимикає (зупиняє) мотори для тих [режимів польоту](../flight_modes/README.md#flight-modes), які _підтримують вимикання в повітрі_. Це включає:

- _Manual mode_
- _Acro mode_
- _Stabilized_

Для режимів, які не підтримують вимикання в повітрі, перемикач ігнорується під час польоту, але може бути використаний після виявлення посадки. Це включає режим позиціонування та автономні режими (наприклад, місію, посадку і т. д.).

:::note
Часові обмеження автоматичного вимкнення (наприклад, через параметр [COM_DISARM_LAND](#COM_DISARM_LAND)) незалежні від перемикача увімкнення/вимкнення - іншими словами, навіть якщо перемикач увімкнений, часові обмеження все одно працюватимуть.
:::

<!--
**Note** This can also be done by [manually setting](../advanced_config/parameters.md) the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter to the corresponding switch RC channel.
  If the switch positions are reversed, change the sign of the parameter [RC_ARMSWITCH_TH](../advanced_config/parameter_reference.md#RC_ARMSWITCH_TH) (or also change its value to alter the threshold value).
-->

### Перемикач повернення

Повернення перемикач може бути використаний для негайного ввімкнення режиму [Повернення](../flight_modes/return.md).

## Інші налаштування безпеки

### Таймаути автоматичного вимкнення

Ви можете встановити таймаути для автоматичного вимкнення транспортного засобу, якщо він занадто повільно збирається на зліт і/або після посадки (вимкнення транспортного засобу вимикає живлення моторів, тому пропелери не будуть обертатися).

Відповідні параметри наведено нижче:

| Параметр                                                                                                   | Опис                                                       |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| <a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | Timeout for auto-disarm after landing.                     |
| <a id="COM_DISARM_PRFLT"></a>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | Timeout for auto disarm if vehicle is too slow to takeoff. |

## Додаткова інформація

- [QGroundControl User Guide > Safety Setup](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/safety.html)

[flight_term]: ../advanced_config/flight_termination.md
[return]: ../flight_modes/return.md
[pwm_main_failn]: ../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1
[pwm_main_failn]: ../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1
