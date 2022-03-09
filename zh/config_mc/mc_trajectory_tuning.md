# 多旋翼设定值调整（轨迹生成器）

本文概述了改变*用户体验*的多旋翼参数如何调整：比如机体对摇杆的响应快慢，执行任务过程中的方向改变快慢，最大速度等。

换言之，本话题解释了如何调整那些影响生成*期望值*的参数，而不是那些影响机体*跟踪*期望值的参数。

生成这些设定点的算法称为“轨迹生成器”。

:::warning
本指南适用于高级用户/专家。
:::

:::tip
在做任何本文所述的调校*之前*，请先按照[多旋翼 PID 调整指南](../config_mc/pid_tuning_guide_multicopter.md)中的说明进行操作。 请不要试图通过调整这些参数来修复错误的轨迹或抖动。
:::

## 综述

P/PID控制器的输入是飞行器尝试跟踪的*期望设定值*。 [PID 调参](../config_mc/pid_tuning_guide_multicopter.md)（“底层调参”）旨在减少期望设定值和机体状态估计值之间的误差。

发送给 P/PID 控制器的*期望设定值*本身是根据摇杆位置（在遥控模式下）或任务指令的*要求设定值*计算的。 要求设定值可能会改变得很快（例如，如果用户“一下子”将摇杆从零移动到最大值）。 如果缓慢调整相应的目标设定值, 飞行器的特性就会更好。

*期望值调试* ("高层调试") 用来映射 *要求* 和 *目的* 期望值之间的关系- 比如在目的期望值和要求期望值之间加个“斜率”.

:::tip
P/PID 增益<0>整定不当会导致机体不稳定。 *设定值*整定不当不会导致机体不稳定，但可能会导致产生非常大的加加速度或对设定值变化地响应不灵敏。 :::</p> 

<a id="modes"></a>

## 飞行模式轨迹支持

[任务模式](../flight_modes/mission.md)始终使用[加加速度限制型](../config_mc/mc_jerk_limited_type_trajectory.md)轨迹。

[Position mode](../flight_modes/position_mc.md) supports the [implementations](#position-mode-implementations) listed below. It uses the acceleration based mapping by default; other types can be set using [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE).

[Altitude mode](../flight_modes/altitude_mc.md) similarly supports the [implementations](#altitude-mode-implementations) selected by [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE), but *only* for smoothing the vertical component (i.e. when controlling the altitude).

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