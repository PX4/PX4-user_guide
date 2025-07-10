---
canonicalUrl: https://docs.px4.io/main/zh/advanced_config/flight_termination
---

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

:::tip PX4 不能感知接了那些安全设备 - 它只是将一组预先定义的 PWM 值用于其输出。
:::

:::tip
失效保护值被应用到终止时的所有输出。 无法配置时基触发的电机或者特定的安全设备。
:::

:::note
这*不是*一个独立的 *飞行终止系统*。 如果断电或者自驾仪完全失控，则不会出发失效保护设备。
:::

## 硬件配置

任何 *安全设备* (例如一个 [降落伞](../peripherals/parachute.md)）可以使用因更改 PWM 值而触发的降落伞， 并且可以连接到任意空闲的 PWM 端口（MAIN和 AUX）。

:::note
如果您使用 Pixhawk 系列飞控板， 您必须单独为舵机单独供电（通常供电来自 5V BEC, 通常来自电调 BEC）。
:::

## 软件配置

[安全](../config/safety.md) 主题解释了如何将 *飞行终止* 设置为 [失效保护动作](../config/safety.md#failsafe_actions) 作为特定故障安全检查。

如果载具翻转（超过一定姿态）或外部自动触发系统（ATS）检测到故障，则[故障检测器](../config/safety.md#failure_detector)也可以（可选）通过配置来触发飞行终止，如下所示：

- 通过设置 [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) 来启用故障检测器。
- [安全> 故障检测 > 姿态触发](../config/safety.md#attitude_trigger) 解释了如何通过配置姿态限制触发 *飞行终止*。 :::note 在 *起飞期间* 过分的状态将会触发 *锁定* (制动电机，但不会启动降落伞) 而不是飞行终止。 无论 `CBRK_FLIGHTTERM` 为何值，此选项始终启用。
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

![逻辑图解](../../assets/config/flight_termination_logic_diagram.png)