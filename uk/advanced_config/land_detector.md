# Land Detector Configuration

Детектор посадки - динамічна модель транспортного засобу, що представляє ключові стани транспортного засобу від контакту з землею до посадки.
Ця тема пояснює основні параметри, які ви, можливо, захочете налаштувати для покращення поведінки при посадці.

## Автоматичне вимкнення

Детектор посадки автоматично вимикає управління дроном при посадці.

You can set [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) to specify the number of seconds after landing that the system should disarm (or turn off auto-disarming by setting the parameter to -1).

## Конфігурація мультикоптера

The complete set of relevant landing detector parameters are listed in the parameter reference with the prefix [LNDMC](../advanced_config/parameter_reference.md#land-detector) (these can be edited in QGroundControl via the [parameter editor](../advanced_config/parameters.md)).

:::tip
Information about how the parameters affect landing can be found below in [Land Detector States](#mc-land-detector-states).
:::

Інші ключові параметри, які вам може знадобитися налаштувати для покращення поведінки приземлення на конкретних повітряних суднах:

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - the hover throttle of the system (default is 50%).
  Важливо правильно встановити це значення, оскільки це робить управління висотою більш точним та гарантує правильне виявлення посадки.
  Гоночний або великий квадрокоптер для зйомки без встановленого вантажу може потребувати набагато нижчого налаштування (наприклад, 35%).

  ::: info
  Incorrectly setting `MPC_THR_HOVER` may result in ground-contact or maybe-landed detection while still in air (in particular, while descending in [Position mode](../flight_modes_mc/position.md) or [Altitude mode](../flight_modes_mc/altitude.md)).
  Це призводить до "тремтіння" транспортного засобу (зниження обертів двигуна, а потім негайне збільшення їх).

:::

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) - the overall minimum throttle of the system.
  Це повинно бути встановлено для забезпечення контрольного спуску.

- [MPC_LAND_CRWL](../advanced_config/parameter_reference.md#MPC_LAND_CRWL) - the vertical speed applied in the last stage of autonomous landing if the system has a distance sensor and it is present and working. Повинен бути встановлений більшим, ніж LNDMC_Z_VEL_MAX.

### MC Мультикоптер детектор землі

Для виявлення посадки багтороте повітряне судно спочатку повинно пройти три різні стани, кожен з яких містить умови попередніх станів плюс більш жорсткі обмеження.
Якщо умова не може бути досягнута через відсутність сенсорів, то умова, за замовчуванням, є істинною.
For instance, in [Acro mode](../flight_modes_mc/acro.md) and no sensor is active except for the gyro sensor, then the detection solely relies on thrust output and time.

In order to proceed to the next state, each condition has to be true for a third of the configured total land detector trigger time [LNDMC_TRIG_TIME](../advanced_config/parameter_reference.md#LNDMC_TRIG_TIME).
Якщо транспортний засіб обладнаний датчиком відстані, але відстань до землі в даний момент не вимірюється (зазвичай через те, що вона занадто велика), час спрацювання збільшується втричі.

Якщо одна умова не виконується, виявник посадки негайно виходить з поточного стану.

#### Контакт із землею

Умови для цього стану:

- no vertical movement ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- no horizontal movement ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- lower thrust than [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + (hover throttle - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) \* (0.3, unless a hover thrust estimate is available, then 0.6),
- додаткова перевірка, чи зараз транспортний засіб перебуває в режимі польоту з контрольованою висотою: транспортний засіб має мати намір знизитися (задане значення вертикальної швидкості вище LNDMC_Z_VEL_MAX).
- додаткова перевірка для автомобілів з датчиком відстані: поточна відстань до землі менше 1 м.

Якщо повітряне судно знаходиться у режимі керування позицією або швидкістю, і виявлено контакт з землею, контролер позиції встановить вектор тяги вздовж осі х-у тіла рівним нулю.

#### Може бути приземлена

Умови для цього стану:

- all conditions of the [ground contact](#ground-contact) state are true
- is not rotating ([LNDMC_ROT_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- has low thrust `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`
- вільного падіння не виявлено

Якщо транспортний засіб знає лише про тягу та кутову швидкість,
щоб перейти до наступного стану, транспортний засіб повинен мати низьку тягу та відсутність обертання протягом 8,0 секунд.

Якщо транспортний засіб перебуває у керуванні положенням або швидкістю, і, можливо, виявлено приземлення,
контролер положення встановить вектор тяги на нуль.

#### Посадка

Умови для цього стану:

- all conditions of the [maybe landed](#maybe-landed) state are true

## Конфігурація фіксованого крила

Параметри налаштування для визначення посадки фіксованим крилом:

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX) - the maximum airspeed allowed for the system still to be considered landed.
  Це повинен бути компроміс між точністю вимірювання швидкості повітря та швидкістю спрацювання.
  Кращі датчики швидкості повітря дозволяють встановлювати менші значення цього параметра.
- [LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - the maximum horizontal velocity for the system to be still be considered landed.
- [LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - the maximum vertical velocity for the system to be still be considered landed.
- [LNDFW_XYACC_MAX](../advanced_config/parameter_reference.md#LNDFW_XYACC_MAX) - the maximal horizontal acceleration for the system to still be considered landed.
- [LNDFW_TRIG_TIME](../advanced_config/parameter_reference.md#LNDFW_TRIG_TIME) - Trigger time during which the conditions above have to be fulfilled to declare a landing.

:::info
When FW launch detection is enabled ([FW_LAUN_DETCN_ON](../advanced_config/parameter_reference.md#FW_LAUN_DETCN_ON)), the vehicle will stay in "landed" state until takeoff is detected (which is purely based on acceleration and not velocity).
:::

## VTOL детектор землі

Детектор землі VTOL 1:1 такий самий, як детектор землі MC, якщо система знаходиться в режимі висіння. У режимі FW виявлення землі вимкнено.
