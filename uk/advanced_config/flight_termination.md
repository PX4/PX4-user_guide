# Flight Termination Configuration

The _Flight termination_ [failsafe action](../config/safety.md#failsafe-actions) may be triggered by a [safety check](../config/safety.md) (e.g. RC Loss, geofence violation, etc. on any vehicle type or in any flight mode), or by the [Failure Detector](../config/safety.md#failure-detector).

:::info
Flight termination may also be triggered from a ground station or companion computer using the MAVLink [MAV_CMD_DO_FLIGHTTERMINATION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_FLIGHTTERMINATION) command.
This is sent, for example, when you call the [MAVSDK Action plugin](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html#classmavsdk_1_1_action_1a47536c4a4bc8367ccd30a92eb09781c5) `terminate()` or `terminate_async()` methods.
:::

When _Flight termination_ is activated, PX4 simultaneously turns off all controllers and sets all PWM outputs to their failsafe values.

Залежно від підключених пристроїв, вихідні значення аварійного режиму PWM можуть бути використані для:

- Deploy a [parachute](../peripherals/parachute.md).
- Витягнути втягуючі стійки шасі.
- Перемістіть гімбал, підключений до PWM, в безпечне положення (або втягніть його), щоб захистити камеру.
- Запустіть надувний пристрій, наприклад подушку безпеки.
- Запустити тривогу.

Немає можливості відновлення після аварійного припинення польоту.
Після виклику аварійного припинення польоту вам слід якнайшвидше відключити батарею.
Перед тим, як знову використовувати транспортний засіб, вам доведеться перезавантажити/вимкнути живлення.

:::tip
PX4 does not know what safety devices are attached - it just applies a predefined set of PWM values to its outputs.
:::

:::tip
Failsafe values are applied to all outputs on termination.
Немає способу налаштувати незалежне тригерування моторів або конкретних пристроїв безпеки на основі часу (або іншого критерію).
:::

:::info
This is _not_ an independent _Flight Termination System_.
Якщо втрачається живлення або автопілот повністю відмовляє, аварійні пристрої не будуть активовані.
:::

## Конфігурація апаратного забезпечення

Any _safety device(s)_ (e.g. a [parachute](../peripherals/parachute.md)) that can be triggered by changing a PWM value can be used, and may be connected to any free PWM port (both MAIN and AUX).

:::info
If you're using Pixhawk-series board you will have to separately power the servo rail (i.e. from a 5V BEC, which is often also available from your ESC).
:::

## Конфігурація програмного забезпечення

The [Safety](../config/safety.md) topic explains how to set the _flight termination_ as the [failsafe action](../config/safety.md#failsafe-actions) to be performed for particular failsafe check.

The [Failure Detector](../config/safety.md#failure-detector) can also (optionally) be configured to trigger flight termination if the vehicle flips (exceeds a certain attitude) or if failure is detected by an external automatic trigger system (ATS):

- Enable the failure detector during flight by setting [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM).
- [Safety > Failure Detector > Attitude Trigger](../config/safety.md#attitude-trigger) explains how to configure the attitude limits that trigger _Flight termination_.
  ::: info
  During _takeoff_ excessive attitutes will trigger _lockdown_ (kill motors, but not launch parachute) rather than flight termination.
  This is always enabled, irrespective of the value of `CBRK_FLIGHTTERM`.

:::
- [Safety > External Automatic Trigger System (ATS)](../config/safety.md#external-automatic-trigger-system-ats) explains how to configure an external trigger system.

Для кожного основного виходу, до якого підключений пристрій безпеки, де "n" - номер порту PWM, встановіть:

- [PWM_MAIN_DISn](../advanced_config/parameter_reference.md#PWM_MAIN_DIS1) to the device's "OFF" PWM value.
- [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1) to the device's "ON" PWM value.

Для кожного AUX виходу, до якого підключений пристрій безпеки, де "n" - номер порту PWM, встановіть:

- [PWM_AUX_DIS1](../advanced_config/parameter_reference.md#PWM_AUX_DIS1) to the device's "OFF" PWM value.
- [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1) to the device's "ON" PWM value.

Finally, set the `PWM_AUX_FAILn` and `PWM_MAIN_FAILn` PWM values for any motors.

## Схема логіки

Діаграма нижче показує логічний порядок дій щодо припинення польоту.

![Logic diagram](../../assets/config/flight_termination_logic_diagram.png)
