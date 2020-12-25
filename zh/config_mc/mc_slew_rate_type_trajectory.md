# 多旋翼的转换速率型轨迹

:::tip
该轨迹类型可以通过设置以下参数：[MPC_POS_MODE=1](../advanced_config/parameter_reference.md#MPC_POS_MODE) 在[定点模式](../flight_modes/position_mc.md)（仅限）下启用。

[多旋翼的加加速度限制型轨迹调整](../config_mc/mc_jerk_limited_type_trajectory.md)是另一种提供更平滑响应的轨迹。
:::

转换速率轨迹类型是一种简单的实现方式，在这种情况下，加加速度和加速度使用转换速率进行限制（加加速度和加速度限制不是硬约束）。

在[定点模式](../flight_modes/position_mc.md)中， 摇杆输入映射为**位置-控制**或**速度-控制**。

当摇杆输入在死区 [MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)内时，位置控制被启用，否则启用速度控制。

## 定点模式

以下所有参数都是可调节参数，不能被直接映射为物理量。

该参数用于水平方向的位置控制，即机体理应停留在当前位置。 速度设定值变化率的极限由 [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX) 定义。

For the remainder of this topic the term **position-control** represents the case where both loops are active while **velocity-control** refers to the case when only the velocity control loop is in use.
:::

Position-control is active when the stick inputs are within the deadzone [MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ), and velocity-control otherwise.

All the parameters below are tuning parameters and cannot be mapped directly to the physical quantity.

#### MPC_ACC_HOR_MAX

This parameter is used for position-control in the horizontal direction, where the vehicle is supposed to stay at the current location. The limit for the rate of change of the velocity setpoint is defined by [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX). This parameter should be set larger than any of the other acceleration related parameters in the horizontal direction.

<span id="mpc_acc_hor-and-mpc_dec_hor_slow"></span>

#### MPC_ACC_HOR 和 MPC_DEC_HOR_SLOW

摇杆满输入时，速度设定值不会直接从`0 m/s`变到`4 m/s`(即阶跃输入)，而是根据参数`MPC_ACC_HOR`的斜率渐变。 然而，飞行器的实际速度不会完美地跟上设定值，而是会稍微滞后。 `MPC_ACC_HOR`的值越大，这个滞后就会越明显。 In addition, `MPC_DEC_HOR_SLOW` also limits the change in velocity setpoint when the user demands a deceleration in the current flight direction. For instance, if the stick input changes from maximum (=`1`) to `0.5`, the velocity setpoint change will be limited by `MPC_DEC_HOR_SLOW`.

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