# 多旋翼设定值调整（轨迹生成器）

本文概述了改变*用户体验*的多旋翼可调整参数：机体对摇杆运动或任务方向变化的反应速度、最大允许速度等。

换言之，本话题解释了如何调整那些影响*期望设定点*的参数，而不是那些影响机体*轨迹跟踪*性能的参数。

生成这些设定点的算法称为“轨迹生成器”。

:::warning
This guide is for advanced users/experts.
:::

:::tip
Follow the instructions in the [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) *before* doing any of the tuning described here. Do not use these tuning parameters to fix bad tracking or vibration!
:::

## 综述

The input to the P/PID controller is a *desired setpoint* that the vehicle should attempt to track. [PID Tuning](../config_mc/pid_tuning_guide_multicopter.md) ("Lower level tuning") aims to reduce the error between the desired setpoint and the estimate of the vehicle state.

The *desired setpoint* passed to the P/PID controller is itself calculated from a *demanded setpoint* based on a stick position (in RC modes) or from a mission command. The demanded setpoint can change very quickly (e.g. if a user moves stick from zero to maximum value as a "step"). Vehicle flight characteristics are better if the corresponding desired setpoint changes as a "ramp".

*Setpoint value tuning* ("higher level tuning") is used to specify the mapping between the *demanded* and the *desired* setpoints - i.e. defining the "ramp" at which the desired setpoint follows the demanded setpoint.

:::tip
Poorly tuned [P/PID Gains](../config_mc/pid_tuning_guide_multicopter.md) can lead to instability. Poorly tuned *setpoint values* cannot result in instability, but may result in either very jerky or very unresponsive reactions to setpoint changes.
:::

<span id="modes"></span>

## 飞行模式轨迹支持

[Mission mode](../flight_modes/mission.md) used the [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) trajectory all the time.

[Position mode](../flight_modes/position_mc.md) supports all the [trajectory types](#trajectory_implementation) listed below. It uses the [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) trajectory by default; the other types can be set using [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE).

[Altitude mode](../flight_modes/altitude_mc.md) similarly uses the [trajectory types](#trajectory_implementation) selected by [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE), but *only* for smoothing the vertical component (i.e. when controlling the altitude).

No other modes support trajectory tuning.

<span id="trajectory_implementation"></span>

## 轨迹实现

The following list provides an *overview* of the different trajectory implementations:

- [加加速度限制型](../config_mc/mc_jerk_limited_type_trajectory.md) （默认） 
  - 当需要平滑运动时使用（例如：航拍、测绘、货运）。
  - 生成对称平滑 S-曲线，使加加速度和加速度的极限始终得到保证。
  - 可能不适合于那些需要较快响应的机体/使用案例——例如穿越机。
  - 通过设置 `MPC_POS_MODE=3` 在位置模式中启用。
- [旋转速率型](../config_mc/mc_slew_rate_type_trajectory.md) 
  - 当快速响应比平滑运动更重要时使用（例如：位置保持状态下的激烈飞行)。
  - 这是一个简单的实现方法，在这种情况下，加加速度和加速度通过旋转速率进行限制。
  - 它允许基于用户意图的不对称配置（平稳加速和快速停止）。 
  - 加加速度和加速度限制不是硬性约束。
  - 通过设置 `MPC_POS_MODE=1` 在位置模式中启用。
- **简单位置控制** 
  - 将摇杆直接映射为速度设置值而不进行平滑处理。
  - 对速度控制调整非常有用。
  - 通过设置 `MPC_POS_MODE=0` 在位置模式中启用。