# 飞行终止配置

_飞行终止_[故障保护动作](../config/safety.md#failsafe-actions)可由[安全检查](../config/safety.md)（例如任何载具类型或任何飞行模式下的遥控丢失、违反地理围栏等）或者故障检测器触发。

::: info 飞行终止也可能会被地面站或机载计算机使用MAVLink的 [MAV_CMD_DO_FLIGHTTERMINATION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_FLIGHTTERMINATION) 命令触发。 例如，当您调用[MAVSDK动作插件](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html#classmavsdk_1_1_action_1a47536c4a4bc8367ccd30a92eb09781c5)的`terminate()`或`terminate_async()`方法时，将发送此消息。
:::

当_飞行终止_激活时，PX4 同时关闭所有控制器，并将所有 PWM 输出设置为其故障保护值。

根据所连接的设备，PWM 故障保护输出可以用来完成以下动作：

- 展开[降落伞](../peripherals/parachute.md)。
- 伸展可伸缩起落架。
- 将连接了 PWM 的云台移动到安全的方向（或将它回收）以保护摄像机。
- 触发一个可充气的装置，如安全气囊。
- 触发警报。

飞行终止是无法取消的。 在飞行终止触发后，您应尽快拔下电池。 您需要在重启载具或重新上电后才能再次使用。

:::tip PX4 不能感知接了那些安全设备 - 它只是将一组预先定义的 PWM 值用于其输出。 无法配置时基触发的电机或者特定的安全设备。

:::tip
故障保护值被应用于终止时的所有输出。
无法配置电机或特定安全装置为独立的特定时间（或其他方式）触发。
:::

::: info 这_不是_一个独立的 *飞行终止系统*。 如果断电或者自驾仪完全失控，失效保护设备则不会触发。
:::

## 硬件配置

任何可以因更改 PWM 值而触发的 _安全设备_ (例如一个 [降落伞](../peripherals/parachute.md)）都可以使用，并且可以连接到任意空闲的 PWM 端口（MAIN和 AUX）。

::: info
如果您使用的是 Pixhawk 系列板子，则必须单独为舵机供电（通常可利用您的电调上的 5V BEC 供电）。
:::

## 软件配置

[安全](../config/safety.md) 主题解释了如何将 _飞行终止_ 设置为 [失效保护动作](../config/safety.md#failsafe-actions) 作为特定故障安全检查。

如果载具翻转（超过一定姿态）或外部自动触发系统（ATS）检测到故障，则[故障检测器](../config/safety.md#failure-detector)也可以（可选）通过配置来触发飞行终止，如下所示：

- 通过设置 [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) 来启用故障检测器。
- [安全 > 故障检测 > 姿态触发](../config/safety.md#attitude-trigger) 解释了如何配置触发 _飞行终止_ 的姿态限制。 ::: info 在_起飞期间_，超过限制值的姿态将触发_上锁_（制动电机</0>但不启动降落伞），而不是飞行终止。 无论 `CBRK_FLIGHTTERM` 为何值，此选项始终启用。 无法配置时基触发的电机或者特定的安全设备。
- [安全 > 外部自动触发系统（ATS）](../config/safety.md#external-automatic-trigger-system-ats)说明了怎么配置外部触发系统。

对于每个与安全装置相连的 MAIN 输出，其中“n”指 PWM 端口号，设置：

- 将 [PWM_MAIN_DISn](../advanced_config/parameter_reference.md#PWM_MAIN_DIS1) 设置为设备的“OFF”PWM值。
- 将 [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1) 设置为设备的“ON”PWM值。

对于每个与安全装置相连的 AUX 输出，其中“n”指 PWM 端口号，设置：

- 将 [PWM_AUX_DISn](../advanced_config/parameter_reference.md#PWM_AUX_DIS1) 设置为设备的“OFF”PWM值。
- 将 [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1) 设置为设备的“ON”PWM值。

最后，设置任意电机的 `PWM_AUX_FAILn` 和 `PWM_MAIN_FAILn` PWM 值。

## 逻辑图解

下图显示了飞行终止的逻辑流程。

![逻辑图解](../../assets/config/flight_termination_logic_diagram.png)
