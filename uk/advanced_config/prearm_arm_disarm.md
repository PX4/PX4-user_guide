# Arm, Disarm, Prearm Конфігурація

Транспортні засоби можуть мати рухомі частини, деякі з яких можуть бути потенційно небезпечними під час роботи (особливо мотори та пропелери)!

Для зменшення ймовірності аварій, PX4 має явні стани для включення компонентів транспортного засобу:

- **Disarmed:** There is no power to motors or actuators.
- **Pre-armed:** Motors/propellers are locked but actuators for non-dangerous electronics are powered (e.g. ailerons, flaps etc.).
- **Armed:** Vehicle is fully powered. Двигуни/пропелери можуть обертатися (небезпечно!)

:::info
Ground stations may display _disarmed_ for pre-armed vehicles.
Хоча це не є технічно правильним для транспортних засобів у режимі передпуску, це "безпечно".
:::

Users can control progression though these states using a [safety switch](../getting_started/px4_basic_concepts.md#safety-switch) on the vehicle (optional) _and_ an [arming switch/button](#arm_disarm_switch), [arming gesture](#arm_disarm_gestures), or _MAVLink command_ on the ground controller:

- A _safety switch_ is a control _on the vehicle_ that must be engaged before the vehicle can be armed, and which may also prevent prearming (depending on the configuration).
  Зазвичай захисний перемикач інтегровано у блок GPS, але він також може бути окремим фізичним компонентом.

  :::warning
  A vehicle that is armed is potentially dangerous.
  Захисний перемикач - це додатковий механізм, який запобігає випадковому озброєнню.

:::

- An _arming switch_ is a switch or button _on an RC controller_ that can be used to arm the vehicle and start motors (provided arming is not prevented by a safety switch).

- An _arming gesture_ is a stick movement _on an RC controller_ that can be used as an alternative to an arming switch.

- Команди MAVLink також можуть бути відправлені наземною станцією управління для озброєння/вимкнення транспортного засобу.

PX4 також автоматично вимикає транспортний засіб, якщо він не злітає протягом певного часу після озброєння, і якщо він не вимикається вручну після посадки.
Це зменшує час, коли на землі знаходиться озброєний (і, отже, небезпечний) транспортний засіб.

PX4 allows you to configure how pre-arming, arming and disarming work using parameters (which can be edited in _QGroundControl_ via the [parameter editor](../advanced_config/parameters.md)), as described in the following sections.

:::tip
Arming/disarming parameters can be found in [Parameter Reference > Commander](../advanced_config/parameter_reference.md#commander) (search for `COM_ARM_*` and `COM_DISARM_*`).
:::

## Arming/Disarming Gestures {#arm_disarm_gestures}

За замовчуванням, транспортний засіб озброюється та вимикається шляхом виконання певних рухів педалями газу/рулем в маневрів та утримання їх протягом 1 секунди.

- **Arming:** Throttle minimum, yaw maximum
- **Disarming:** Throttle minimum, yaw minimum

RC controllers will use different sticks for throttle and yaw [based on their mode](../getting_started/rc_transmitter_receiver.md#types-of-remote-controllers), and hence different gestures:

- **Mode 2**:
  - _Arm:_ Left stick to bottom right.
  - _Disarm:_ Left stick to the bottom left.
- **Mode 1**:
  - _Arm:_ Left-stick to right, right-stick to bottom.
  - _Disarm:_ Left-stick to left, right-stick to the bottom.

The required hold time can be configured using [COM_RC_ARM_HYST](#COM_RC_ARM_HYST).
Note that by default ([COM_DISARM_MAN](#COM_DISARM_MAN)) you can also disarm in flight using gestures/buttons: you may choose to disable this to avoid accidental disarming.

| Параметр                                                                                                                                                                | Опис                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="MAN_ARM_GESTURE"></a>[MAN_ARM_GESTURE](../advanced_config/parameter_reference.md#MAN_ARM_GESTURE)                      | Enable arm/disarm stick guesture. `0`: Disabled, `1`: Enabled (default).                                             |
| <a id="COM_DISARM_MAN"></a>[COM_DISARM_MAN](../advanced_config/parameter_reference.md#COM_DISARM_MAN)                         | Enable disarming in flight via switch/stick/button in MC manual thrust modes. `0`: Disabled, `1`: Enabled (default). |
| <a id="COM_RC_ARM_HYST"></a>[COM_RC_ARM_HYST](../advanced_config/parameter_reference.md#COM_RC_ARM_HYST) | Time that RC stick must be held in arm/disarm position before arming/disarming occurs (default: `1` second).                                         |

## Arming Button/Switch {#arm_disarm_switch}

An _arming button_ or "momentary switch" can be configured to trigger arm/disarm _instead_ of [gesture-based arming](#arm_disarm_gestures) (setting an arming switch disables arming gestures).
The button should be held down for ([nominally](#COM_RC_ARM_HYST)) one second to arm (when disarmed) or disarm (when armed).

A two-position switch can also be used for arming/disarming, where the respective arm/disarm commands are sent on switch _transitions_.

:::tip
Two-position arming switches are primarily used in/recommended for racing drones.
:::

The switch or button is assigned (and enabled) using [RC_MAP_ARM_SW](#RC_MAP_ARM_SW), and the switch "type" is configured using [COM_ARM_SWISBTN](#COM_ARM_SWISBTN).

| Параметр                                                                                                                                                          | Опис                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="RC_MAP_ARM_SW"></a>[RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) | Канал перемикача озброєння радіокерування (типове значення: 0 - не призначено). Якщо визначено, вказаний канал радіокерування (кнопка/перемикач) використовується для озброєння замість жесту палиці. <br>**Note:**<br>- This setting _disables the stick gesture_!<br>- This setting applies to RC controllers. It does not apply to Joystick controllers that are connected via _QGroundControl_. |
| <a id="COM_ARM_SWISBTN"></a>[COM_ARM_SWISBTN](../advanced_config/parameter_reference.md#COM_ARM_SWISBTN)                | Перемикач озброєння є моментальною кнопкою. <br>- `0`: Arm switch is a 2-position switch where arm/disarm commands are sent on switch transitions.<br>-`1`: Arm switch is a button or momentary button where the arm/disarm command ae sent after holding down button for set time ([COM_RC_ARM_HYST](#COM_RC_ARM_HYST)).                                               |

:::info
The switch can also be set as part of _QGroundControl_ [Flight Mode](../config/flight_mode.md) configuration.
:::

## Автоматичне вимкнення

За замовчуванням транспортні засоби автоматично вимикаються при посадці або якщо ви заберете занадто багато часу, щоб злітати після озброєння.
Ця функція налаштовується за допомогою наступних таймаутів.

| Параметр                                                                                                                                              | Опис                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)    | Час очікування для автоматичного відбрасування після приземлення. За замовчуванням: 2с (значення -1, щоб вимкнути).                   |
| <a id="COM_DISARM_PRFLT"></a>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | Час очікування для автоматичного відбрасування, якщо занадто повільно підйом. Default: 10s (<=0 to disable). |

## Pre-Arm Checks

To reduce accidents, vehicles are only allowed to arm certain conditions are met (some of which are configurable).
Армування заборонено у таких випадках:

- Повітряне судно не перебуває у "здоровому" стані.
  Наприклад, воно не калібрується або має помилки датчиків.
- The vehicle has a [safety switch](../getting_started/px4_basic_concepts.md#safety-switch) that has not been engaged.
- The vehicle has a [remote ID](../peripherals/remote_id.md) that is unhealthy or otherwise not ready
- A VTOL vehicle is in fixed-wing mode ([by default](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).
- Поточний режим потребує належної глобальної позиційної оцінки, але повітряне судно не має блокування GPS.
- Many more (see [arming/disarming safety settings](../config/safety.md#arming-disarming-settings) for more information).

The current failed checks can be viewed in QGroundControl (v4.2.0 and later) [Arming Check Report](../flying/pre_flight_checks.md#qgc-arming-check-report) (see also [Fly View > Arming and Preflight Checks](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/fly_view/fly_view.md#arm)).

Зауважте, що внутрішньо PX4 перевіряє активацію на 10 Гц.
A list of the failed checks is kept, and if the list changes PX4 emits the current list using the [Events interface](../concept/events_interface.md).
Список також надсилається, коли GCS підключається.
Пристрій керування (GCS) негайно знає статус передпускових перевірок як при вимкненні, так і при озброєнні.

:::details
Implementation notes for developers
The client implementation is in [libevents](https://github.com/mavlink/libevents):

- [libevents > Event groups](https://github.com/mavlink/libevents#event-groups)
- [health_and_arming_checks.h](https://github.com/mavlink/libevents/blob/main/libs/cpp/parse/health_and_arming_checks.h)

QGC implementation: [HealthAndArmingCheckReport.cc](https://github.com/mavlink/qgroundcontrol/blob/master/src/MAVLink/LibEvents/HealthAndArmingCheckReport.cc).
:::

PX4 also emits a subset of the arming check information in the [SYS_STATUS](https://mavlink.io/en/messages/common.html#SYS_STATUS) message (see [MAV_SYS_STATUS_SENSOR](https://mavlink.io/en/messages/common.html#MAV_SYS_STATUS_SENSOR)).

## Arming Sequence: Pre Arm Mode & Safety Button

The arming sequence depends on whether or not there is a _safety switch_, and is controlled by the parameters [COM_PREARM_MODE](#COM_PREARM_MODE) (Prearm mode) and [CBRK_IO_SAFETY](#CBRK_IO_SAFETY) (I/O safety circuit breaker).

The [COM_PREARM_MODE](#COM_PREARM_MODE) parameter defines when/if pre-arm mode is enabled ("safe"/non-throttling actuators are able to move):

- _Disabled_: Pre-arm mode disabled (there is no stage where only "safe"/non-throttling actuators are enabled).
- _Safety Switch_ (Default): The pre-arm mode is enabled by the safety switch.
  Якщо немає захисного перемикача, то режим передпуску не буде увімкнено.
- _Always_: Prearm mode is enabled from power up.

Якщо є засувка безпеки, то це буде передумовою для армування.
If there is no safety switch the I/O safety circuit breaker must be engaged ([CBRK_IO_SAFETY](#CBRK_IO_SAFETY)), and arming will depend only on the arm command.

Нижче наведено деталі початкових послідовностей для різних конфігурацій.

### Default: COM_PREARM_MODE=Safety та Safety Switch

За замовчуванням використовується захисний перемикач для передпуску.
З режиму передпуску ви можете перейти до режиму озброєння, щоб активувати всі мотори/приводи.
It corresponds to: [COM_PREARM_MODE=1](#COM_PREARM_MODE) (safety switch) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

Типова послідовність запуску:

1. Увімкнення живлення.
   - Усі приводи заблоковано у беззбройному(вимкненому) положенні
   - Неможливо озброїти(збурити).
2. Перемикання безпеки натиснуто.
   - Система зараз перевіряється перед збурюванням: актуатори без збурювання можуть рухатися (наприклад, елерони).
   - Безпека системи відключена: можливість озброєння(збурення).
3. Видається команда на озброєння(збурення).

   - Система озброєна(збурена).
   - Усі мотори та приводи можуть рухатися.

### COM_PREARM_MODE=Disabled та Safety Switch

When prearm mode is _Disabled_, engaging the safety switch does not unlock the "safe" actuators, though it does allow you to then arm the vehicle.
This corresponds to [COM_PREARM_MODE=0](#COM_PREARM_MODE) (Disabled) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

Послідовність запуску така:

1. Увімкнення живлення.
   - Усі приводи заблоковано у беззбройному(вимкненому) положенні
   - Неможливо озброїти(збурити).
2. Перемикання безпеки натиснуто.
   - _All actuators stay locked into disarmed position (same as disarmed)._
   - Безпека системи відключена: можливість озброєння(збурення).
3. Видається команда на озброєння(збурення).

   - Система озброєна(збурена).
   - Усі мотори та приводи можуть рухатися.

### COM_PREARM_MODE=Always and Safety Switch

When prearm mode is _Always_, prearm mode is enabled from power up.
Для озброєння все ще потрібний захисний перемикач.
This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

Послідовність запуску така:

1. Увімкнення живлення.
   - Система зараз перевіряється перед збурюванням: актуатори без збурювання можуть рухатися (наприклад, елерони).
   - Неможливо озброїти(збурити).
2. Перемикання безпеки натиснуто.
   - Безпека системи відключена: можливість озброєння(збурення).
3. Видається команда на озброєння(збурення).
   - Система озброєна(збурена).
   - Усі мотори та приводи можуть рухатися.

### COM_PREARM_MODE=Safety(Безпека) або вимкнено(Disabled) та без перемикача безпеки(No Safety Switch)

With no safety switch, when `COM_PREARM_MODE` is set to _Safety_ or _Disabled_ prearm mode cannot be enabled (same as disarmed).
This corresponds to [COM_PREARM_MODE=0 or 1](#COM_PREARM_MODE) (Disabled/Safety Switch) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

Послідовність запуску така:

1. Увімкнення живлення.
   - Усі приводи заблоковано у беззбройному(вимкненому) положенні
   - Безпека системи відключена: можливість озброєння(збурення).
2. Видається команда на озброєння(збурення).
   - Система озброєна(збурена).
   - Усі мотори та приводи можуть рухатися.

### COM_PREARM_MODE=Завжди і без зміни безпеки

When prearm mode is _Always_, prearm mode is enabled from power up.
This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

Послідовність запуску така:

1. Увімкнення живлення.
   - Система зараз перевіряється перед збурюванням: актуатори без збурювання можуть рухатися (наприклад, елерони).
   - Безпека системи відключена: можливість озброєння(збурення).
2. Видається команда на озброєння(збурення).
   - Система озброєна(збурена).
   - Усі мотори та приводи можуть рухатися.

### Параметри

| Параметр                                                                                                                                           | Опис                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_PREARM_MODE"></a>[COM_PREARM_MODE](../advanced_config/parameter_reference.md#COM_PREARM_MODE) | Умова для входу в режим передпуску. `0`: Disabled, `1`: Safety switch (prearm mode enabled by safety switch; if no switch present cannot be enabled), `2`: Always (prearm mode enabled from power up). Default: `1` (safety button). |
| <a id="CBRK_IO_SAFETY"></a>[CBRK_IO_SAFETY](../advanced_config/parameter_reference.md#CBRK_IO_SAFETY)    | Вимикач безпеки для введення/виведення (I/O).                                                                                                                                                                                                                                                                                                                              |

<!-- Discussion:
https://github.com/PX4/PX4-Autopilot/pull/12806#discussion_r318337567
https://github.com/PX4/PX4-user_guide/issues/567#issue-486653048
-->
