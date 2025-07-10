---
canonicalUrl: https://docs.px4.io/main/ko/config_mc/mc_trajectory_tuning
---

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

P/PID 컨트롤러에 대한 입력은 기체에서 추적하는 *목표 설정값*입니다. [PID 튜닝](../config_mc/pid_tuning_guide_multicopter.md) ( "낮은 레벨 튜닝")은 목표 설정 값과 기체 상태 추정값 사이의 오류를 줄이는 것을 목표로합니다.

P/PID 컨트롤러로 전달되는 *목표 설정 값*은 스틱 위치 (RC 모드에서) 또는 임무 명령에서 *요구된 설정 값*에서 자체적으로 계산됩니다. 요구되는 설정값은 빨리 변경 될 수 있습니다 (예 : 사용자가 스틱을 "단계" 0에서 최대값으로 이동하는 경우). 원하는 설정값이 "램프"로 변경되면 기체의 비행 특성이 더 좋아집니다.

*설정점 값 조정* ( "높은 수준 조정")은 *요구*와 *목표</ 0> 설정점 간의 매핑을 지정합니다. "원하는 설정값은 요구된 설정 값을 따릅니다.</p> 

:::tip
[P/PID 게인](../config_mc/pid_tuning_guide_multicopter.md)을 잘못 조정하면 불안정해 질 수 있습니다. 잘못 튜닝된 *설정값*은 불안정성을 초래하지는 않지만, 설정값 변경에 대한 반응은 매우 불안정하거나 응답하지 않을 수 있습니다.
:::

<a id="modes"></a>

## 비행 모드 궤적 지원

[미션 모드](../flight_modes/mission.md)는 항상 [저크 제한](../config_mc/mc_jerk_limited_type_trajectory.md) 궤적을 사용하였습니다.

[Position mode](../flight_modes/position_mc.md) supports all the [trajectory types](#trajectory-implementations) listed below. It uses the [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) trajectory by default; other types can be set using [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE).

[Altitude mode](../flight_modes/altitude_mc.md) similarly uses the [trajectory types](#trajectory-implementations) selected by [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE), but *only* for smoothing the vertical component (i.e. when controlling the altitude).

다른 모드는 궤도 튜닝을 지원하지 않습니다.

## 궤적 구현

The following list provides an *overview* of the different trajectory implementations:

- [Jerk-제한](../config_mc/mc_jerk_limited_type_trajectory.md) (기본) 
  - 부드러운 움직임이 필요할 때 사용합니다 (예 : 촬영, 매핑,화물).
  - 저크 및 가속 제한이 항상 보장되는 대칭형 부드러운 S- 커브를 생성합니다.
  - 더 빠른 응답이 필요한 기체(예 : 레이서 쿼드)에는 적합하지 않을 수 있습니다.
  - `MPC_POS_MODE = 3`을 사용하여 위치 모드로 설정합니다.
- **Simple position control** 
  - Sticks map directly to velocity setpoints without smoothing.
  - Useful for velocity control tuning.
  - Set in position mode using `MPC_POS_MODE=0`.