# 多旋翼的转换速率型轨迹

:::tip
该轨迹类型可以通过设置以下参数：[MPC_POS_MODE=1](../advanced_config/parameter_reference.md#MPC_POS_MODE) 在[定点模式](../flight_modes/position_mc.md)（仅限）下启用。

[多旋翼的加加速度限制型轨迹调整](../config_mc/mc_jerk_limited_type_trajectory.md)是另一种提供更平滑响应的轨迹。
:::

转换速率轨迹类型是一种简单的实现方式，在这种情况下，加加速度和加速度使用转换速率进行限制（加加速度和加速度限制不是硬约束）。

它允许非对称配置的用户意图（平滑加速及快速停止），并且应该在响应快速摇杆输入（可能是“抖动”）优先于保证平滑加减速时使用（例如，对于位置保持状态下的激烈飞行）。

本话题解释了如何调整轨迹类型。

## 定点模式

在[定点模式](../flight_modes/position_mc.md)中， 摇杆输入映射为**位置-控制**或**速度-控制**。

:::note
位置控制器 ([ diagram here ](../flight_stack/controller_diagrams.md#multicopter-position-controller)) 由外环的** P ** 位置控制回路和内环的 ** PID ** 速度控制回路组成。 根据模式和情况启用两个回路或仅启用速度控制回路。

对于本文档的其余部分，** 位置控制 ** 代表两个控制回路都有效的情况，而 ** 速度控制 ** 指的是仅使用速度控制回路的情况。
:::

当摇杆输入在死区 [MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)内时，位置控制被激活，否则是速度控制。

以下所有参数都是可调节参数，不能被直接映射为物理量。

#### MPC_ACC_HOR_MAX

该参数用于水平方向的位置控制，即飞机理应停留的当前位置。 设定速度的变化速率由[MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)来限定。 此参数应设置为大于水平方向上任何其他加速度相关参数。

<span id="mpc_acc_hor-and-mpc_dec_hor_slow"></span>

#### MPC_ACC_HOR 和 MPC_DEC_HOR_SLOW

在速度控制中，速度设定值的速率限制是由摇杆输入到加速度限制值线性映射得到的，摇杆最大值对应[MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR), 最小值对应[MPC_DEC_HOR_SLOW](../advanced_config/parameter_reference.md#MPC_DEC_HOR_SLOW). 然而，飞行器的实际速度不会完美地跟上设定值，而是会稍微滞后。 `MPC_ACC_HOR`的值越大，这个滞后就会越明显。 In addition, `MPC_DEC_HOR_SLOW` also limits the change in velocity setpoint when the user demands a deceleration in the current flight direction. For instance, if the stick input changes from maximum (=`1`) to `0.5`, the velocity setpoint change will be limited by `MPC_DEC_HOR_SLOW`.

During transition from **velocity-control** to **position-control**, there is a hard switch from `MPC_ACC_HOR` to `MPC_ACC_HOR_MAX` and a reset of the velocity setpoint to the current vehicle velocity. The reset and the hard switch can both introduce a jerky flight performance during stopping. Nonetheless, the reset is required because the smoothing parameters introduce a delay to the setpoint, which can lead to unexpected flight maneuvers.

A simple example explaining why the reset is needed is given below.

Consider the case where a user demands full speed from hover followed by a stop request. This is equivalent to full stick input with maximum value of `1` followed by zero stick input. To simplify the example, assume that `MPC_ACC_HOR_MAX` is equal to `MPC_ACC_HOR` and therefore there is no hard switch in acceleration limit when switching from **velocity-control** to **position-control**. In addition, let's assume the maximum speed that can be demanded is `4 m/s`.

加加速度参数通过设置最大加速度 `MPC_ACC_HOR_MAX` 来控制速度上限。 实际的加加速度值和飞行器制动前的速度值呈线性关系， 全速映射到[MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) 而零速映射到 [MPC_JERK_MIN](../advanced_config/parameter_reference.md#MPC_JERK_MIN)。 The lag will be more significant the larger the value of `MPC_ACC_HOR`.

![Slewrate Reset](../../assets/config/mc/slewrate_reset.svg)

Without the reset (the top graph), at the moment of the stop demand (stick equal 0) the velocity setpoint will ramp down with the maximum rate given by `MPC_ACC_HOR_MAX`. Due to the lag the vehicle will first continue to accelerate in the direction previous to the stop demand followed by slowly decelerating towards zero. With the reset of the velocity setpoint to the current velocity, the delay due to the lag during stop demand can be overcome.

#### MPC_ACC_UP_MAX 和 MPC_ACC_DOWN_MAX

`MPC_ACC_UP_MAX` >= `MPC_ACC_DOWN_MAX`, otherwise the firmware will overwrite the given values.

- **位置-控制：**速度设定值在 z 方向的变化上限由参数 [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX) 给出。
- **速度-控制：**摇杆输入导致的速度设定值的变化极限由两个参数给出， `MPC_ACC_UP_MAX` 为上限， [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX) 为下限。

#### MPC_JERK_MAX 和 MPC_JERK_MIN

These two parameters only have effect during the transition from **velocity-control** to **position-control**. The purpose of these two parameters are to minimize the jerk introduced from forward flight to hover (please see [MPC_ACC_HOR and MPC_DEC_HOR_SLOW](#mpc_acc_hor-and-mpc_dec_hor_slow)).

The jerk-parameter controls the rate limit with which the acceleration limit can change to `MPC_ACC_HOR_MAX`. The actual jerk-value is a linear map from velocity speed to jerk where full speed maps to [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) and zero speed to [MPC_JERK_MIN](../advanced_config/parameter_reference.md#MPC_JERK_MIN). The smoothing can be turned off by setting `MPC_JERK_MAX` to a value smaller than `MPC_JERK_MIN`.