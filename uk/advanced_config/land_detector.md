# Конфігурація детектора посадки

Детектор посадки - динамічна модель транспортного засобу, що представляє ключові стани транспортного засобу від контакту з землею до посадки. Ця тема пояснює основні параметри, які ви, можливо, захочете налаштувати для покращення поведінки при посадці.

## Автоматичне вимкнення

Детектор посадки автоматично вимикає управління дроном при посадці.

Ви можете встановити [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) , щоб вказати кількість секунд після посадки, протягом яких система повинна вимкнутися (або вимкнути автоматичне вимикання, встановивши параметр на -1).

## Multicopter Configuration

Повний набір відповідних параметрів детектора приземлення перераховано в посиланні на параметри з префіксом [LNDMC](../advanced_config/parameter_reference.md#land-detector) (їх можна редагувати в QGroundControl через [редактор параметрів](../advanced_config/parameters.md)).

:::tip
Information about how the parameters affect landing can be found below in [Land Detector States](#mc-land-detector-states).
:::

Other key parameters that you may need to tune in order to improve landing behaviour on particular airframes are:

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - the hover throttle of the system (default is 50%). It is important to set this correctly as it makes altitude control more accurate and ensures correct land detection. Гоночний або великий квадрокоптер для зйомки без встановленого вантажу може потребувати набагато нижчого налаштування (наприклад, 35%).

:::note
Неправильне встановлення параметра `MPC_THR_HOVER` може призвести до виявлення контакту з землею або, можливо, приземлення, коли транспортний засіб все ще знаходиться в повітрі (зокрема, під час спуску в режимі [Позиції](../flight_modes_mc/position.md) або [Висоти](../flight_modes_mc/altitude.md)). Це призводить до "тремтіння" транспортного засобу (зниження обертів двигуна, а потім негайне збільшення їх).
:::

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) - загальний мінімум газу системи. This should be set to enable a controlled descent.
- [MPC_LAND_CRWL](../advanced_config/parameter_reference.md#MPC_LAND_CRWL) - вертикальна швидкість, яка застосовується в останній стадії автономного приземлення, якщо система має датчик відстані, і він присутній і працює. Повинен бути встановлений більшим, ніж LNDMC_Z_VEL_MAX.

### MC Land Detector States

Для виявлення посадки багтороте повітряне судно спочатку повинно пройти три різні стани, кожен з яких містить умови попередніх станів плюс більш жорсткі обмеження. Якщо умова не може бути досягнута через відсутність сенсорів, то умова, за замовчуванням, є істинною. Наприклад, у режимі [Acro](../flight_modes_mc/acro.md), коли жоден сенсор, крім гіроскопа, не активний, виявлення базується лише на виводі потужності і часі.

Для переходу до наступного стану кожна умова повинна бути виконана протягом однієї третини загального налаштованого часу спрацювання детектора посадки [LNDMC_TRIG_TIME](../advanced_config/parameter_reference.md#LNDMC_TRIG_TIME). Якщо транспортний засіб обладнаний датчиком відстані, але відстань до землі в даний момент не вимірюється (зазвичай через те, що вона занадто велика), час спрацювання збільшується втричі.

Якщо одна умова не виконується, виявник посадки негайно виходить з поточного стану.

#### Ground Contact

Умови для цього стану:

- no vertical movement ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- no horizontal movement ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- lower thrust than [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + (hover throttle - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) \* (0.3, unless a hover thrust estimate is available, then 0.6),
- additional check if vehicle is currently in a height-rate controlled flight mode: the vehicle has to have the intent to descend (vertical velocity setpoint above LNDMC_Z_VEL_MAX).
- additional check for vehicles with a distance sensor: current distance to ground is below 1m.

Якщо повітряне судно знаходиться у режимі керування позицією або швидкістю, і виявлено контакт з землею, контролер позиції встановить вектор тяги вздовж осі х-у тіла рівним нулю.

#### Maybe Landed

Conditions for this state:

- all conditions of the [ground contact](#ground-contact) state are true
- is not rotating ([LNDMC_ROT_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- has low thrust `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`
- no freefall detected

Якщо транспортний засіб знає лише про тягу та кутову швидкість, щоб перейти до наступного стану, транспортний засіб повинен мати низьку тягу та відсутність обертання протягом 8,0 секунд.

Якщо транспортний засіб перебуває у керуванні положенням або швидкістю, і, можливо, виявлено приземлення, контролер положення встановить вектор тяги на нуль.

#### Landed

Умови для цього стану:

- усі умови стану [maybe landed](#maybe-landed) вірні

## Fixed-wing Configuration

Tuning parameters for fixed-wing land detection:

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX) - the maximum airspeed allowed for the system still to be considered landed. Has to be a tradeoff between airspeed sensing accuracy and triggering fast enough. Better airspeed sensors should allow lower values of this parameter.
- [LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - the maximum horizontal velocity for the system to be still be considered landed.
- [LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - the maximum vertical velocity for the system to be still be considered landed.
- [LNDFW_XYACC_MAX](../advanced_config/parameter_reference.md#LNDFW_XYACC_MAX) - the maximal horizontal acceleration for the system to still be considered landed.
- [LNDFW_TRIG_TIME](../advanced_config/parameter_reference.md#LNDFW_TRIG_TIME) - Trigger time during which the conditions above have to be fulfilled to declare a landing.

:::note
When FW launch detection is enabled ([FW_LAUN_DETCN_ON](../advanced_config/parameter_reference.md#FW_LAUN_DETCN_ON)), the vehicle will stay in "landed" state until takeoff is detected (which is purely based on acceleration and not velocity).
:::

## VTOL Land Detector

The VTOL land detector is 1:1 the same as the MC land detector if the system is in hover mode. In FW mode, land detection is disabled.
