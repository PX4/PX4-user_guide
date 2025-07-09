---
canonicalUrl: https://docs.px4.io/main/zh/config_mc/mc_trajectory_tuning
---

# 多旋翼设定值调整（轨迹生成器）

This document provides an overview of the multicopter tuning parameters that change the *user experience*: how fast the vehicle reacts to stick movements or direction changes in missions, the maximum allowed velocity, etc.

In other words, this topic explains how to tune the parameters that affect the value of a *desired setpoint* rather than those that affect how well the vehicle *tracks* the setpoint).

生成这些设定点的算法称为“轨迹生成器”。

:::warning

本指南适用于高级用户/专家。
:::

:::tip
Follow the instructions in the [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) *before* doing any of the tuning described here. 请不要试图通过调整这些参数来修复错误的轨迹或抖动。
:::

## 综述

The input to the P/PID controller is a *desired setpoint* that the vehicle should attempt to track. [PID 调参](../config_mc/pid_tuning_guide_multicopter.md)（“底层调参”）旨在减少期望设定值和机体状态估计值之间的误差。

The *desired setpoint* passed to the P/PID controller is itself calculated from a *demanded setpoint* based on a stick position (in RC modes) or from a mission command. 要求设定值可能会改变得很快（例如，如果用户“一下子”将摇杆从零移动到最大值）。 如果缓慢调整相应的目标设定值, 飞行器的特性就会更好。

*Setpoint value tuning* ("higher level tuning") is used to specify the mapping between the *demanded* and the *desired* setpoints - i.e. defining the "ramp" at which the desired setpoint follows the demanded setpoint.

:::tip
P/PID 增益<0>整定不当会导致机体不稳定。 Poorly tuned *setpoint values* cannot result in instability, but may result in either very jerky or very unresponsive reactions to setpoint changes. :::</p>

<a id="modes"></a>

## 飞行模式轨迹支持

[任务模式](../flight_modes/mission.md)始终使用[加加速度限制型](../config_mc/mc_jerk_limited_type_trajectory.md)轨迹。

[Position mode](../flight_modes_mc/position.md) supports the [implementations](#position-mode-implementations) listed below. It uses the acceleration based mapping by default; other types can be set using [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE).

[Altitude mode](../flight_modes_mc/altitude.md) similarly supports the [implementations](#altitude-mode-implementations) selected by [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE), but *only* for smoothing the vertical component (i.e. when controlling the altitude).

其他模式不支持轨迹调整。



## Position Mode Implementations

The following list provides an *overview* of the different implementations of how the stick input is interpreted and turned into trajectory setpoints:

- Acceleration based (Default) 
    - Horizontal stick input mapped to acceleration setpoints.
  - Intuitive stick feel because it's like pushing the vehicle around.
  - No unexpected tilt changes upon reaching travel speed velocity.
  - Vertical stick input mapped with jerk-limited trajectory.
  - Set in position mode using `MPC_POS_MODE=4`.
- [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) 
    - Used when smooth motion is required (e.g.: filming, mapping, cargo).
  - Generates symmetric smooth S-curves where the jerk and acceleration limits are always guaranteed.
  - May not be suitable for vehicles/use-cases that require a faster response - e.g. race quads.
  - Set in position mode using `MPC_POS_MODE=3`.
- **Simple position control** 
    - Sticks map directly to velocity setpoints without smoothing.
  - Useful for velocity control tuning.
  - Set in position mode using `MPC_POS_MODE=0`.



## Altitude Mode Implementations

Analogously to [position mode implementations](#position-mode-implementations) these are the implementations for interpreting vertical stick input:

- [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) 
    - Smoothed vertical input.
  - Set in altitude mode with `MPC_POS_MODE` 3 or 4.
- **Simple altitude control** 
    - Unsmoothed vertical input.
  - Set in altitude mode only when using `MPC_POS_MODE=0`.
