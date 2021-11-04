# 飞行终止配置

*飞行终止*[故障保护动作](../config/safety.md#failsafe_actions)可由[安全检查](../config/safety.md)（例如任何载具类型或任何飞行模式下的 RC 丢失、违反地理围栏等）或者故障检测器触发。 

:::note
Flight termination may also be triggered from a ground station or companion computer using the MAVLink [MAV_CMD_DO_FLIGHTTERMINATION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_FLIGHTTERMINATION) command. This is sent, for example, when you call the [MAVSDK Action plugin](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html#classmavsdk_1_1_action_1a47536c4a4bc8367ccd30a92eb09781c5) `terminate()` or `terminate_async()` methods.
:::

根据所连接的设备，PWM 故障保护输出可以用来完成以下动作：

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
This is *not* an independent *Flight Termination System*. If power is lost or if the autopilot crashes completely, the failsafe devices will not be triggered.
:::

## 硬件配置

Any *safety device(s)* (e.g. a [parachute](../peripherals/parachute.md)) that can be triggered by changing a PWM value can be used, and may be connected to any free PWM port (both MAIN and AUX).

:::note
If you're using Pixhawk-series board you will have to separately power the servo rail (i.e. from a 5V BEC, which is often also available from your ESC).
:::

## 软件配置

如果载具翻转（超过一定姿态）或外部自动触发系统（ATS）检测到故障，则[故障检测器](../config/safety.md#failure_detector)也可以（可选）通过配置来触发飞行终止，如下所示：

最后，设置任意电机的 `PWM_AUX_FAILn` and `PWM_MAIN_FAILn` PWM值。

- 通过设置 [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) 来启用故障检测器。
- [安全> 故障检测 > 姿态触发](../config/safety.md#attitude_trigger) 解释了如何通过配置姿态限制触发 *飞行终止*。 :::note 在 *起飞期间* 过分的状态将会触发 *锁定* (制动电机，但不会启动降落伞) 而不是飞行终止。 无论 `CBRK_FLIGHTTERM` 为何值，此选项始终启用。
:::
- [通过安全 > 外部自动触发系统（ATS）](../config/safety.md#external_ats)可以配置外部触发系统。

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