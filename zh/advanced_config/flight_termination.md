---
canonicalUrl: https://docs.px4.io/main/zh/advanced_config/flight_termination
---

# 飞行终止配置

The _Flight termination_ [failsafe action](../config/safety.md#failsafe-actions) may be triggered by a [safety check](../config/safety.md) (e.g. RC Loss, geofence violation, etc. on any vehicle type or in any flight mode), or by the [Failure Detector](../config/safety.md#failure-detector).

:::note
Flight termination may also be triggered from a ground station or companion computer using the MAVLink [MAV_CMD_DO_FLIGHTTERMINATION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_FLIGHTTERMINATION) command. This is sent, for example, when you call the [MAVSDK Action plugin](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html#classmavsdk_1_1_action_1a47536c4a4bc8367ccd30a92eb09781c5) `terminate()` or `terminate_async()` methods.
:::

When _Flight termination_ is activated, PX4 simultaneously turns off all controllers and sets all PWM outputs to their failsafe values.

Depending on what devices are connected, the PWM failsafe outputs can be used to:

- 展开[降落伞](../peripherals/parachute.md)。
- 伸展可伸缩起落架。
- 将连接了 PWM 的云台移动到安全的方向（或将它回收）以保护摄像机。
- 触发一个重启装置，比如安全气囊。
- 触发警报。

:::tip PX4 不能感知接了那些安全设备 - 它只是将一组预先定义的 PWM 值用于其输出。 After triggering you should unplug the battery as soon as possible. You will need to reboot/power cycle the vehicle before it can be used again.

:::tip
失效保护值被应用到终止时的所有输出。 无法配置时基触发的电机或者特定的安全设备。

:::note
这*不是*一个独立的 *飞行终止系统*。 如果断电或者自驾仪完全失控，则不会出发失效保护设备。
:::

:::note
This is _not_ an independent _Flight Termination System_. If power is lost or if the autopilot crashes completely, the failsafe devices will not be triggered.
:::

## 硬件配置

Any _safety device(s)_ (e.g. a [parachute](../peripherals/parachute.md)) that can be triggered by changing a PWM value can be used, and may be connected to any free PWM port (both MAIN and AUX).

:::note
If you're using Pixhawk-series board you will have to separately power the servo rail (i.e. from a 5V BEC, which is often also available from your ESC).
:::

## 软件配置

The [Safety](../config/safety.md) topic explains how to set the _flight termination_ as the [failsafe action](../config/safety.md#failsafe-actions) to be performed for particular failsafe check.

最后，设置任意电机的 `PWM_AUX_FAILn` and `PWM_MAIN_FAILn` PWM值。

- 通过设置 [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) 来启用故障检测器。
- [Safety > Failure Detector > Attitude Trigger](../config/safety.md#attitude-trigger) explains how to configure the attitude limits that trigger _Flight termination_. :::note During _takeoff_ excessive attitutes will trigger _lockdown_ (kill motors, but not launch parachute) rather than flight termination. 无论 `CBRK_FLIGHTTERM` 为何值，此选项始终启用。 无法配置时基触发的电机或者特定的安全设备。
- [Safety > External Automatic Trigger System (ATS)](../config/safety.md#external-automatic-trigger-system-ats) explains how to configure an external trigger system.

下图显示了飞行终止的逻辑流程。

- 将 [PWM_MAIN_DISn](../advanced_config/parameter_reference.md#PWM_MAIN_DIS1) 设置为设备的“OFF”PWM值。
- 将 [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1) 设置为设备的“ON”PWM值。

最后，设置任意电机的 `PWM_AUX_FAILn` 和 `PWM_MAIN_FAILn` PWM 值。

- 将 [PWM_AUX_DISn](../advanced_config/parameter_reference.md#PWM_AUX_DIS1) 设置为设备的“OFF”PWM值。
- 将 [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1) 设置为设备的“ON”PWM值。

下图显示了飞行终止的逻辑流程。

## 逻辑图解

The diagram below shows the logical flow around flight termination.

![Logic diagram](../../assets/config/flight_termination_logic_diagram.png)
