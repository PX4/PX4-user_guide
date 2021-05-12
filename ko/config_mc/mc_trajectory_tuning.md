# 멀티콥터 설정점 튜닝(궤적 생성기)

*사용자 경험*(스틱 움직임이나 임무의 방향 변화에 기체의 반응 속도, 최대 허용 속도 등)을 변경하는 멀티콥터 튜닝 매개변수에 대한 개요를 제공합니다. 

기체의 설정 값을 *추적*하는 데 영향을 끼치는 매개변수가 아닌 *원하는 설정값*의 값에 영향을 끼치는 매개변수를 튜닝 방법을 설명합니다.

이러한 설정값을 생성하는 알고리즘을 "궤적 생성기"라고 합니다.

:::warning
이 가이드는 고급 사용자와 전문가를 위한 것입니다.
:::

:::tip
여기에 설명된 튜닝을 수행하기 *전에* [멀티콥터 PID 튜닝 가이드](../config_mc/pid_tuning_guide_multicopter.md) 지침을 따르십시오. 이러한 튜닝 매개변수를 사용하여 잘못된 추적이나 진동을 수정하지 마십시오!
:::

## 개요

The input to the P/PID controller is a *desired setpoint* that the vehicle should attempt to track. [PID Tuning](../config_mc/pid_tuning_guide_multicopter.md) ("Lower level tuning") aims to reduce the error between the desired setpoint and the estimate of the vehicle state.

The *desired setpoint* passed to the P/PID controller is itself calculated from a *demanded setpoint* based on a stick position (in RC modes) or from a mission command. The demanded setpoint can change very quickly (e.g. if a user moves stick from zero to maximum value as a "step"). Vehicle flight characteristics are better if the corresponding desired setpoint changes as a "ramp".

*Setpoint value tuning* ("higher level tuning") is used to specify the mapping between the *demanded* and the *desired* setpoints - i.e. defining the "ramp" at which the desired setpoint follows the demanded setpoint.

:::tip
Poorly tuned [P/PID Gains](../config_mc/pid_tuning_guide_multicopter.md) can lead to instability. Poorly tuned *setpoint values* cannot result in instability, but may result in either very jerky or very unresponsive reactions to setpoint changes.
:::

<span id="modes"></span>

## Flight Modes Trajectory Support

[Mission mode](../flight_modes/mission.md) used the [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) trajectory all the time.

[Position mode](../flight_modes/position_mc.md) supports all the [trajectory types](#trajectory_implementation) listed below. It uses the [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) trajectory by default; the other types can be set using [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE).

[Altitude mode](../flight_modes/altitude_mc.md) similarly uses the [trajectory types](#trajectory_implementation) selected by [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE), but *only* for smoothing the vertical component (i.e. when controlling the altitude).

No other modes support trajectory tuning.

<span id="trajectory_implementation"></span>

## Trajectory Implementations

The following list provides an *overview* of the different trajectory implementations:

- [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) (Default) 
  - Used when smooth motion is required (e.g.: filming, mapping, cargo).
  - Generates symmetric smooth S-curves where the jerk and acceleration limits are always guaranteed.
  - May not be suitable for vehicles/use-cases that require a faster response - e.g. racer quads.
  - Set in position mode using `MPC_POS_MODE=3`.
- [Slew-rate](../config_mc/mc_slew_rate_type_trajectory.md) 
  - Used when quick response is more important than smooth motion (e.g.: aggressive flight with position hold).
  - This is a simple implementation where the jerk and acceleration is limited using slew-rates.
  - It allows asymmetric profiles based on user intention (smooth acceleration and quick stop). 
  - The jerk and acceleration limits are not hard constraints.
  - Set in position mode using `MPC_POS_MODE=1`.
- **Simple position control** 
  - Sticks map directly to velocity setpoints without smoothing.
  - Useful for velocity control tuning.
  - Set in position mode using `MPC_POS_MODE=0`.