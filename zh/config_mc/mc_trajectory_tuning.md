# 多旋翼设定值调整（轨迹生成器）

本文概述了改变*用户体验*的多旋翼可调整参数：机体对摇杆运动或任务方向变化的反应速度、最大允许速度等。

换言之，本话题解释了如何调整那些影响*期望设定点*的参数，而不是那些影响机体*轨迹跟踪*性能的参数。

生成这些设定点的算法称为“轨迹生成器”。

> **Warning** 本指南适用于高级用户/专家。

<span></span>

> **Tip** 在做任何本文所述的调校*之前*，请先按照[多旋翼 PID 调整指南](../config_mc/pid_tuning_guide_multicopter.md)中的说明进行操作。 请不要试图通过调整这些参数来修复错误的轨迹或抖动。

## 综述

P/PID 控制器的输入是机体尝试跟踪的*期望设定值*。 [PID 调参](../config_mc/pid_tuning_guide_multicopter.md)（“低级调参”）旨在减少期望设定值和机体状态估计值之间的误差。

发送给 P/PID 控制器的*期望设定值*本身是根据摇杆位置（在遥控模式下）或任务指令的*要求设定值*计算的。 要求设定值可能会改变得很快（例如，如果用户“一下子”将摇杆从零移动到最大值）。 如果像“斜坡”信号一样缓慢地调整相应期望设定值，则机体的飞行特性会更好。

*设定值整定*（“较高级整定”）用于指定*要求设定值*和*期望设定值*之间的映射，即用来定义期望设定点到期望设定点间的“斜坡”映射。

> **Tip** P/PID 增益<1>整定不当会导致机体不稳定。 Poorly tuned *setpoint values* cannot result in instability, but may result in either very jerky or very unresponsive reactions to setpoint changes.</p> </blockquote> 
> 
> ## Flight Modes Trajectory Support {#modes}
> 
> [Mission mode](../flight_modes/mission.md) used the [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) trajectory all the time.
> 
> [Position mode](../flight_modes/position_mc.md) supports all the [trajectory types](#trajectory_implementation) listed below. It uses the [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) trajectory by default; the other types can be set using [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE).
> 
> [Altitude mode](../flight_modes/altitude_mc.md) similarly uses the [trajectory types](#trajectory_implementation) selected by [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE), but *only* for smoothing the vertical component (i.e. when controlling the altitude).
> 
> No other modes support trajectory tuning.
> 
> ## Trajectory Implementations {#trajectory_implementation}
> 
> The following list provides an *overview* of the different trajectory implementations:
> 
> - [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) (Default) 
>   - Used when smooth motion is required (e.g.: filming, mapping, cargo).
>   - Generates symmetric smooth S-curves where the jerk and acceleration limits are always guaranteed.
>   - May not be suitable for vehicles/use-cases that require a faster response - e.g. racer quads.
>   - Set in position mode using `MPC_POS_MODE=3`.
> - [Slew-rate](../config_mc/mc_slew_rate_type_trajectory.md) 
>   - Used when quick response is more important than smooth motion (e.g.: aggressive flight with position hold).
>   - This is a simple implementation where the jerk and acceleration is limited using slew-rates.
>   - It allows asymmetric profiles based on user intention (smooth acceleration and quick stop). 
>   - The jerk and acceleration limits are not hard constraints.
>   - Set in position mode using `MPC_POS_MODE=1`.
> - **Simple position control** 
>   - Sticks map directly to velocity setpoints without smoothing.
>   - Useful for velocity control tuning.
>   - Set in position mode using `MPC_POS_MODE=0`.