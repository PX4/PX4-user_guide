# 飞行终止配置

*飞行终止*[故障保护动作](../config/safety.md#failsafe_actions)可由[安全检查](../config/safety.md)（例如任何载具类型或任何飞行模式下的 RC 丢失、违反地理围栏等）或者故障检测器触发。 

当*飞行终止*激活时，PX4 同时关闭所有控制器，并将所有 PWM 输出设置为其故障保护值。

根据所连接的设备，PWM 故障保护输出可以用来完成以下动作：

- 展开[降落伞](../peripherals/parachute.md)。
- 伸展可伸缩起落架。
- 将连接了 PWM 的云台移动到安全的方向（或将它回收）以保护摄像机。
- 触发一个重启装置，比如安全气囊。
- 触发警报。

飞行终止是无法取消的。 在飞行终止触发后，您应尽快拔下电池。 您需要在重启载具或重新上电后才能再次使用。

:::tip PX4 does not know what safety devices are attached - it just applies a predefined set of PWM values to its outputs.
:::

:::tip
Failsafe values are applied to all outputs on termination. There is no way to configure independent time-based (or other) triggering of the motors or specific safety devices.
:::

:::note
This is *not* an independent *Flight Termination System*. If power is lost or if the autopilot crashes completely, the failsafe devices will not be triggered.
:::

## 硬件配置

[安全](../config/safety.md)话题解释了如何将*飞行终止*设置为针对特定故障安全检查而执行的[故障保护动作](../config/safety.md#failsafe_actions)。

:::note
If you're using Pixhawk-series board you will have to separately power the servo rail (i.e. from a 5V BEC, which is often also available from your ESC).
:::

## 软件配置

对于每个与安全装置相连的 MAIN 输出，其中“n”指 PWM 端口号：

对于每个与安全装置相连的 AUX 输出，其中“n”指 PWM 端口号：

- 设置 [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) 启用故障检测器（默认情况下禁用）。
- 通过[安全 > 故障检测器 > 姿态触发器](../config/safety.md#attitude_trigger)可以配置触发*飞行终止*的姿态极限值。 > **Note** 在*起飞期间*，超过限制值的姿态将触发*上锁*（制动电机但不启动降落伞），而不是飞行终止。 无论 `CBRK_FLIGHTTERM` 为何值，此选项始终启用。
:::
- [通过安全 > 外部自动触发系统（ATS）](../config/safety.md#external_ats)可以配置外部触发系统。

最后，设置任意电机的 `PWM_AUX_FAILn` and `PWM_MAIN_FAILn` PWM值。

- 将 [PWM_MAIN_DISn](../advanced_config/parameter_reference.md#PWM_MAIN_DIS1) 设置为设备的“OFF”PWM值。
- 将 [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1) 设置为设备的“ON”PWM值。

下图显示了飞行终止的逻辑流程。

- 将 [PWM_AUX_DISn](../advanced_config/parameter_reference.md#PWM_AUX_DIS1) 设置为设备的“OFF”PWM值。
- 将 [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1) 设置为设备的“ON”PWM值。

最后，设置任意电机的 `PWM_AUX_FAILn` 和 `PWM_MAIN_FAILn` PWM 值。

## 逻辑图解

下图显示了飞行终止的逻辑流程。

![Logic diagram](../../assets/config/flight_termination_logic_diagram.png)