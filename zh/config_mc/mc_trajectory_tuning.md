# Multicopter Setpoint Tuning (Trajectory Generator)

This document provides an overview of the multicopter tuning parameters that change the *user experience*: how fast the vehicle reacts to stick movements or direction changes in missions, the maximum allowed velocity, etc. (i.e. the parameters that affect the value of a desired setpoint rather than those that affect how well the vehicle *tracks* the setpoint). The algorithm that generates those setpoints is called a "trajectory generator".

> **Warning** 本指南适用于高级用户/专家。

<span></span>

> **Tip** Follow the instructions in the [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) *before* doing any of the tuning described here. Do not use these tuning parameters to fix bad tracking or vibration!

## 综述

P/PID控制器的输入是飞行器尝试跟踪的*期望设定值*。 [PID调参](../config_mc/pid_tuning_guide_multicopter.md) ("低级"调参) 的目标是减小设定值和估计值之间的误差。 较小的PID增益将导致飞行器的不稳定

传递给 P/PID 控制器的所需设定值本身是根据摇杆位置（在遥控模式下）或从任务指令的要求设定值计算的。 设定值（“更高级别”）调整用于指定所需设定值和所需设定值之间的映射。 较差的的设定值不会导致不稳定，但可能导致对设定值变化的响应速度变慢。

> **Tip** 所要求的设定值可能会很快改变（例如, 如果用户一下子从零设置为到最大价值）。 如果缓慢调整相应的目标设定值, 飞行器的特性就会更好。

The setpoint-value tuning parameters can be split into two groups: tuning parameters for position mode and tuning parameters for mission mode. 某些参数将同时对两种模式产生影响。

## Definitions

The position controller ([diagram here](https://dev.px4.io/master/en/flight_stack/controller_diagrams.html#multicopter-position-controller)) consists of an outer **P** position-control loop and an inner **PID** velocity-control loop. 根据 飞行模式, 两个回路都是活动的, 或者只有速度控制回路是活动的。

对于本文档的其余部分，** 位置控制 ** 代表两个控制回路都有效的情况，而 ** 速度控制 ** 指的是仅使用速度控制回路的情况。

## Implementations

Two different implementations are available for each mode and can be selected using the parameters [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE) and [MPC_AUTO_MODE](../advanced_config/parameter_reference.md#MPC_AUTO_MODE).

Click on the links below to learn more about those implementations and how to configure them:

- [Slew-rate](../config_mc/mc_slew_rate_type_trajectory.md) (`MPC_POS_MODE=1`, `MPC_POS_MODE=2`, `MPC_AUTO_MODE=0`) - Used when quick response is more important than smooth motion (e.g.: inspection, aggressive flight with position hold, fast missions).
  
  - This is a simple implementation where the jerk and acceleration is limited using slew-rates.
  - In manual mode, it allows asymmetric profiles based on user intention (smooth acceleration and quick stop).
  - The jerk and acceleration limits are not hard constraints.

- [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) (`MPC_POS_MODE=3`, `MPC_AUTO_MODE=1`) - Used when smooth motion is required (e.g.: filming, mapping, cargo).
  
  - Generates symmetric smooth S-curves where the jerk and acceleration limits are always guaranteed.

> **Tip** The jerk-limited (smooth) type is used by default for all frames in both manual and auto modes; this may not be suitable for vehicles/use-cases that require a faster response - e.g. racer quads.