# Arm, Disarm, Prearm Configuration

Транспортні засоби можуть мати рухомі частини, деякі з яких можуть бути потенційно небезпечними під час роботи (особливо мотори та пропелери)!

Для зменшення ймовірності аварій, PX4 має явні стани для включення компонентів транспортного засобу:

- **Вимкнено:** Немає живлення для моторів або приводів.
- **Передпускний стан:** Мотори/пропелери заблоковані, але приводи для не небезпечної електроніки живлені (наприклад, елерони, закрилки і т. д.).
- **Озброєно:** Транспортний засіб повністю увімкнено. Motors/propellers may be turning (dangerous!)

:::note
Наземні станції можуть відображати _вимкнено_ для транспортних засобів у режимі передпуску. Хоча це не є технічно правильним для транспортних засобів у режимі передпуску, це "безпечно".
:::

Користувачі можуть керувати переходом між цими станами, використовуючи [захисний перемикач](../getting_started/px4_basic_concepts.md#safety-switch) на транспортному засобі (за бажанням) _та_ перемикач/кнопку [озброєння](#arm_disarm_switch), [жест озброєння](#arm_disarm_gestures) або _команду MAVLink_ на наземному контролері.

- _Захисний перемикач_ - це керування _на транспортному засобі_, яке повинно бути увімкнене перед озброєнням транспортного засобу, і яке може також запобігати передпуску (в залежності від конфігурації). Зазвичай захисний перемикач інтегровано у блок GPS, але він також може бути окремим фізичним компонентом.

  :::warning
Транспортний засіб, який озброєний, потенційно небезпечний.
Захисний перемикач - це додатковий механізм, який запобігає випадковому озброєнню.
:::

- Перемикач _озброєння_ - це перемикач або кнопка _на пульті керування RC_, який може бути використаний для озброєння транспортного засобу та запуску моторів (якщо озброєння не заборонене захисним перемикачем).
- Жест озброєння - це рух педалей _на пульті керування RC_, який може бути використаний як альтернатива перемикачу озброєння.
- Команди MAVLink також можуть бути відправлені наземною станцією управління для озброєння/вимкнення транспортного засобу.

PX4 також автоматично вимикає транспортний засіб, якщо він не злітає протягом певного часу після озброєння, і якщо він не вимикається вручну після посадки. Це зменшує час, коли на землі знаходиться озброєний (і, отже, небезпечний) транспортний засіб.

PX4 дозволяє налаштовувати роботу передпуску, озброєння та вимикання за допомогою параметрів (які можна редагувати в _QGroundControl_ за допомогою [редактора параметрів](../advanced_config/parameters.md)), як описано у наступних розділах.

:::tip
Параметри озброєння/вимикання можна знайти у [Посилання на параметри > Командир](../advanced_config/parameter_reference.md#commander) (шукайте `COM_ARM_*` та `COM_DISARM_*`).
:::

<a id="arm_disarm_gestures"></a>

## Жест для озброєння

За замовчуванням, транспортний засіб озброюється та вимикається шляхом виконання певних рухів педалями газу/рулем в маневрів та утримання їх протягом 1 секунди.

- **Озброєння:** Мінімальна педаль газу, максимальний рульовий вектор.
- **Вимикання:** Мінімальна педаль газу, мінімальний рульовий вектор.

Пульт керування (RC) матиме різні жести в залежності від їх режиму (адже режим контролера впливає на педалі, які використовуються для руляжу та газу):

- **Mode 2**:
  - _Озброєння:_ Ліва педаль вниз і вправо.
  - _Вимкнення:_ Ліва педаль вниз і вліво.
- **Mode 1**:
  - _Озброєння:_ Ліва педаль вправо, права педаль вниз.
  - _Вимкнення:_ Ліва педаль вліво, права педаль вниз.

Час утримання може бути налаштований за допомогою параметра [COM_RC_ARM_HYST](#COM_RC_ARM_HYST).

| Параметр                                                                                                | Опис                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_RC_ARM_HYST"></a>[COM_RC_ARM_HYST](../advanced_config/parameter_reference.md#COM_RC_ARM_HYST) | Час, протягом якого педаль RC повинна бути утримана в позиції озброєння/вимкнення перед озброєнням/вимкненням (за замовчуванням: 1 секунда). |

<a id="arm_disarm_switch"></a>

## Arming Button/Switch

Кнопку _озброєння_ або "моментальний перемикач" можна налаштувати для спрацьовування озброєння/вимикання _замість_ [озброєння за допомогою жестів](#arm_disarm_gestures) (встановлення перемикача озброєння вимикає озброєння за допомогою жестів). Кнопку слід утримувати натиснутою протягом ([зазвичай](#COM_RC_ARM_HYST)) однієї секунди, щоб озброїти (якщо вимкнено) або вимкнути (якщо озброєно).

Двопозиційний перемикач також може використовуватися для озброєння/вимикання, при цьому відповідні команди на озброєння/вимкнення надсилаються при _перемиканні_ перемикача.

:::tip
Двопозиційні перемикачі для озброєння переважно використовуються в/рекомендовані для гоночних дронів.
:::

Перемикач або кнопка призначається (та активується) за допомогою [RC_MAP_ARM_SW](#RC_MAP_ARM_SW), а тип перемикача налаштовується за допомогою [COM_ARM_SWISBTN](#COM_ARM_SWISBTN).

| Параметр                                                                                                | Опис                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="RC_MAP_ARM_SW"></a>[RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW)     | RC arm switch channel (default: 0 - unassigned). If defined, the specified RC channel (button/switch) is used for arming instead of a stick gesture. <br>**Note:**<br>- This setting _disables the stick gesture_!<br>- This setting applies to RC controllers. It does not apply to Joystick controllers that are connected via _QGroundControl_. |
| <a id="COM_ARM_SWISBTN"></a>[COM_ARM_SWISBTN](../advanced_config/parameter_reference.md#COM_ARM_SWISBTN) | Arm switch is a momentary button. <br>- `0`: Arm switch is a 2-position switch where arm/disarm commands are sent on switch transitions.<br>-`1`: Arm switch is a button or momentary button where the arm/disarm command ae sent after holding down button for set time ([COM_RC_ARM_HYST](#COM_RC_ARM_HYST)).                                        |

:::note
Перемикач також можна налаштувати як частину конфігурації _QGroundControl_ для [Режиму польоту](../config/flight_mode.md).
:::

## Auto-Disarming

За замовчуванням транспортні засоби автоматично вимикаються при посадці або якщо ви заберете занадто багато часу, щоб злітати після озброєння. Ця функція налаштовується за допомогою наступних таймаутів.

| Параметр                                                                                                  | Опис                                                                            |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | Time-out for auto disarm after landing. Default: 2s (-1 to disable).            |
| <a id="COM_DISARM_PRFLT"></a>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | Time-out for auto disarm if too slow to takeoff. Default: 10s (<=0 to disable). |

## Pre-Arm Checks

Для запобігання нещасним випадкам, транспортні засоби можуть озброюватися лише за умови виконання певних умов. Arming is prevented if:

- The vehicle is not in a "healthy" state. For example it is not calibrated, or is reporting sensor errors.
- Транспортний засіб має [захисний перемикач](../getting_started/px4_basic_concepts.md#safety-switch), який не був увімкнений.
- Транспортний засіб має [віддалений ідентифікатор](../peripherals/remote_id.md), який є нездоровим або не готовим до роботи.
- A VTOL vehicle is in fixed-wing mode ([by default](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).
- The current mode requires an adequate global position estimate but the vehicle does not have GPS lock.
- Many more ...

Поточні невдалі перевірки можна переглянути у QGroundControl (версія 4.2.0 та пізніша): [Вид "Польот" > Озброювання та Попередні перевірки](https://docs.qgroundcontrol.com/master/en/FlyView/FlyView.html#arm).

Note that internally PX4 runs arming checks at 10Hz. Список невдалих перевірок зберігається, і якщо цей список змінюється, PX4 видає поточний список за допомогою [інтерфейсу подій](../concept/events_interface.md). The list is also sent out when the GCS connects. Пристрій керування (GCS) негайно знає статус передпускових перевірок як при вимкненні, так і при озброєнні.

:::details
Примітки для розробників Реалізація клієнта знаходиться у [libevents](https://github.com/mavlink/libevents):

- [libevents > Event groups](https://github.com/mavlink/libevents#event-groups)
- [health_and_arming_checks.h](https://github.com/mavlink/libevents/blob/main/libs/cpp/parse/health_and_arming_checks.h)

QGC реалізації: [HealthAndArmingCheckReport.cc](https://github.com/mavlink/qgroundcontrol/blob/master/src/Vehicle/HealthAndArmingCheckReport.cc).
:::

PX4 also emits a subset of the arming check information in the [SYS_STATUS](https://mavlink.io/en/messages/common.html#SYS_STATUS) message (see [MAV_SYS_STATUS_SENSOR](https://mavlink.io/en/messages/common.html#MAV_SYS_STATUS_SENSOR)).

## Arming Sequence: Pre Arm Mode & Safety Button

Послідовність озброєння залежить від наявності _захисного перемикача_ і контролюється параметрами [COM_PREARM_MODE](#COM_PREARM_MODE) (Режим передпуску) та [CBRK_IO_SAFETY](#CBRK_IO_SAFETY) (Вимикач безпеки введення/виведення).

Параметр [COM_PREARM_MODE](#COM_PREARM_MODE) визначає, коли/якщо передпусковий режим увімкнено ("безпечні"/приводи без збільшення газу можуть рухатися):

- _Вимкнено_: Режим передпуску відключено (немає етапу, коли тільки "безпечні"/приводи без збільшення газу увімкнені).
- _Захисний перемикач_ (За замовчуванням): Режим передпуску увімкнено за допомогою захисного перемикача. Якщо немає захисного перемикача, то режим передпуску не буде увімкнено.
- _Always_: Prearm mode is enabled from power up.

If there is a safety switch then this will be a precondition for arming. Якщо немає захисного перемикача, то вимикач безпеки введення/виведення ([CBRK_IO_SAFETY](#CBRK_IO_SAFETY)) повинен бути активований, і озброєння буде залежати лише від команди озброєння.

Нижче наведено деталі початкових послідовностей для різних конфігурацій.

### Default: COM_PREARM_MODE=Safety and Safety Switch

За замовчуванням використовується захисний перемикач для передпуску. З режиму передпуску ви можете перейти до режиму озброєння, щоб активувати всі мотори/приводи. Це відповідає: [COM_PREARM_MODE=1](#COM_PREARM_MODE) (захисний перемикач) та [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (вимикач безпеки введення/виведення вимкнено).

Типова послідовність запуску:

1. Power-up.
   - All actuators locked into disarmed position
   - Not possible to arm.
1. Safety switch is pressed.
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - System safety is off: Arming possible.
1. Arm command is issued.

   - The system is armed.
   - Усі мотори та приводи можуть рухатися.

### COM_PREARM_MODE=Disabled and Safety Switch

Коли режим передпуску встановлено на _Вимкнено_, увімкнення захисного перемикача не розблоковує "безпечні" приводи, але дозволяє озброїти транспортний засіб. Це відповідає [COM_PREARM_MODE=0](#COM_PREARM_MODE) (Вимкнено) та [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (Вимикач безпеки введення/виведення вимкнений).

Послідовність запуску така:

1. Power-up.
   - All actuators locked into disarmed position
   - Not possible to arm.
1. Safety switch is pressed.
   - _All actuators stay locked into disarmed position (same as disarmed)._
   - System safety is off: Arming possible.
1. Arm command is issued.

   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Always and Safety Switch

When prearm mode is _Always_, prearm mode is enabled from power up. Для озброєння все ще потрібний захисний перемикач. This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

The startup sequence is:

1. Power-up.
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - Not possible to arm.
1. Safety switch is pressed.
   - System safety is off: Arming possible.
1. Arm command is issued.
   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Safety or Disabled and No Safety Switch

Без захисного перемикача, коли `COM_PREARM_MODE` встановлено на _Захист_ або _Вимкнено_, режим передпуску не може бути увімкнений (так само, як і вимкнено). This corresponds to [COM_PREARM_MODE=0 or 1](#COM_PREARM_MODE) (Disabled/Safety Switch) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

Послідовність запуску така:

1. Power-up.
   - All actuators locked into disarmed position
   - System safety is off: Arming possible.
1. Arm command is issued.
   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Always and No Safety Switch

Коли режим передпуску встановлено на _Завжди_, він увімкнений з моменту включення живлення. Це відповідає [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Завжди) та [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (ввімкнено вимикач безпеки введення/виведення).

Послідовність запуску така:

1. Power-up.
   - Система зараз у режимі передпуску: неактивні приводи можуть рухатися (наприклад, елерони).
   - System safety is off: Arming possible.
1. Arm command is issued.
   - The system is armed.
   - Усі мотори та приводи можуть рухатися.

### Параметри

| Параметр                                                                                                | Опис                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_PREARM_MODE"></a>[COM_PREARM_MODE](../advanced_config/parameter_reference.md#COM_PREARM_MODE) | Умова для входу в режим передпуску. `0`: Вимкнено, `1`: Захисний перемикач (режим передпуску увімкнено за допомогою захисного перемикача; якщо перемикач відсутній, не може бути увімкнено), `2`: Завжди (режим передпуску увімкнено від моменту включення живлення). За замовчуванням: `1` (кнопка безпеки). |
| <a id="CBRK_IO_SAFETY"></a>[CBRK_IO_SAFETY](../advanced_config/parameter_reference.md#CBRK_IO_SAFETY)   | Вимикач безпеки для введення/виведення (I/O).                                                                                                                                                                                                                                                                 |


<!-- Discussion:
https://github.com/PX4/PX4-Autopilot/pull/12806#discussion_r318337567
https://github.com/PX4/PX4-user_guide/issues/567#issue-486653048
-->
