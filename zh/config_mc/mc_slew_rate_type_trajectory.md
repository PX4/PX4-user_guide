# 多旋翼的转换速率型轨迹

> **Tip** 该轨迹类型可以通过设置以下参数：[MPC_POS_MODE=1](../advanced_config/parameter_reference.md#MPC_POS_MODE) 在[定点模式](../flight_modes/position_mc.md)（仅限）下启用。
> 
> [多旋翼的冲击有限型轨迹调整](../config_mc/mc_jerk_limited_type_trajectory.md)是另一种提供更平滑响应的轨迹。

转换速率轨迹类型是一种简单的实现方式，在这种情况下，冲击和加速度使用转换速率进行限制（冲击和加速度限制不是硬约束）。

它允许非对称配置的用户意图（平滑加速及快速停止），并且应该在响应快速摇杆输入（可能是“冲击”）优先于保证平滑加减速时使用（例如，对于具有位置保持的攻击性飞行）。

本话题解释了如何调整轨迹类型。

## 定点模式

在[定点模式](../flight_modes/position_mc.md)中， 摇杆输入映射为**位置-控制**或**速度-控制**。

> **Note** 位置控制器（[此图](https://dev.px4.io/master/en/flight_stack/controller_diagrams.html#multicopter-position-controller)）由一个外环 **P** 位置控制回路和一个内环 **PID** 速度控制回路组成。 根据模式和情况启用两个回路或仅启用速度控制回路。
> 
> 对于本话题的其余部分，术语“**位置控制**”代表两个回路均被启用，而“**速度控制**”指的是仅启用速度控制回路的情况。

当摇杆输入在死区 [MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)内时，位置控制被启用，否则启用速度控制。

以下所有参数都是可调节参数，不能被直接映射为物理量。

#### MPC_ACC_HOR_MAX

该参数用于水平方向的位置控制，即机体理应停留在当前位置。 速度设定点变化率的极限由 [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX) 定义。 此参数应设置为大于水平方向上任何其他加速度相关参数。

#### MPC_ACC_HOR 和 MPC_HOR_SLOW {#mpc_acc_hor-and-mpc_dec_hor_slow}

在速度控制中，速度设定点的速率极限是从摇杆输入到加速度极限的线性映射中提取的，最大值为 [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR)，最小值为 [MPC_DEC_HOR_SLOW](../advanced_config/parameter_reference.md#MPC_DEC_HOR_SLOW)。 例如，若摇杆输入为 `MPC_HOLD_DZ`，则极限加速度为 `MPC_DEC_HOR_SLOW`。 If the stick input is at maximum (=`1`), the limiting acceleration is `MPC_ACC_HOR` and any stick input in between is mapped linearly between the two parameters. In addition, `MPC_DEC_HOR_SLOW` also limits the change in velocity setpoint when the user demands a deceleration in the current flight direction. For instance, if the stick input changes from maximum (=`1`) to `0.5`, the velocity setpoint change will be limited by `MPC_DEC_HOR_SLOW`.

During transition from **velocity-control** to **position-control**, there is a hard switch from from `MPC_ACC_HOR` to `MPC_ACC_HOR_MAX` and a reset of the velocity setpoint to the current vehicle velocity. The reset and the hard switch can both introduce a jerky flight performance during stopping. Nonetheless, the reset is required because the smoothing parameters introduce a delay to the setpoint, which can lead to unexpected flight maneuvers.

A simple example explaining why the reset is needed is given below.

Consider the case where a user demands full speed from hover followed by a stop request. This is equivalent to full stick input with maximum value of `1` followed by zero stick input. To simplify the example, assume that `MPC_ACC_HOR_MAX` is equal to `MPC_ACC_HOR` and therefore there is no hard switch in acceleration limit when switching from **velocity-control** to **position-control**. In addition, let's assume the maximum speed that can be demanded is `4 m/s`.

During full stick input, the velocity setpoint will not change directly from `0 m/s` to `4 m/s` (aka step input) - instead the velocity setpoint follows a ramp with slope `MPC_ACC_HOR`. The actual velocity of the vehicle, however, will not track the setpoint perfectly, but rather will lag behind. The lag will be more significant the larger the value of `MPC_ACC_HOR`.

![Slewrate Reset](../../images/slewrate_reset.svg)

Without the reset (the top graph), at the moment of the stop demand (stick equal 0) the velocity setpoint will ramp down with the maximum rate given by `MPC_ACC_HOR_MAX`. Due to the lag the vehicle will first continue to accelerate in the direction previous to the stop demand followed by slowly decelerating towards zero. With the reset of the velocity setpoint to the current velocity, the delay due to the lag during stop demand can be overcome.

#### MPC_ACC_UP_MAX and MPC_ACC_DOWN_MAX

`MPC_ACC_UP_MAX` >= `MPC_ACC_DOWN_MAX`, otherwise the firmware will overwrite the given values.

- **position-control:** the limit in velocity setpoint change in z-direction is given by [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX).
- **velocity-control:** the limit in velocity setpoint change for stick input is `MPC_ACC_UP_MAX` for upward and [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX) for downward direction.

#### MPC_JERK_MAX and MPC_JERK_MIN

These two parameters only have effect during the transition from **velocity-control** to **position-control**. The purpose of these two parameters are to minimize the jerk introduced from forward flight to hover (please see [MPC_ACC_HOR and MPC_DEC_HOR_SLOW](#mpc_acc_hor-and-mpc_dec_hor_slow)).

The jerk-parameter controls the rate limit with which the acceleration limit can change to `MPC_ACC_HOR_MAX`. The actual jerk-value is a linear map from velocity speed to jerk where full speed maps to [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) and zero speed to [MPC_JERK_MIN](../advanced_config/parameter_reference.md#MPC_JERK_MIN). The smoothing can be turned off by setting `MPC_JERK_MAX` to a value smaller than `MPC_JERK_MIN`.