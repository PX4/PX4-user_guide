# 멀티콥터의 슬루율 유형 궤적

:::tip
궤적 유형은 [MPC_POS_MODE = 1](../advanced_config/parameter_reference.md#MPC_POS_MODE) 매개변수로 [위치 모드](../flight_modes/position_mc.md) (전용)에서 활성화됩니다.

[멀티콥터 저크 제한 궤적 조정](../config_mc/mc_jerk_limited_type_trajectory.md)은 더 부드러운 응답을 제공하는 대체 궤적입니다.
:::

슬루율 궤적 유형은 슬루율을 사용하여 저크와 가속이 제한되는 간단한 궤적생성기입니다 (저크와 가속 제한은 엄격한 제약이 아님).

사용자의 의도 (부드러운 가속 및 빠른 정지)에 따라 비대칭 프로파일을 허용하며, 스틱 입력에 대한 빠른 (그리고 잠재적으로 "부끄러운") 반응이 부드러운 가속 및 감속을 보장하는 것보다 더 중요한 경우에 사용하여야 합니다 (예 : 위치 유지).

궤적 유형을 조정 방법을 설명합니다.

## 위치 모드

[Position](../flight_modes/position_mc.md) 모드에서는 스틱 입력이 **위치 제어** 또는 **속도 제어**에 매핑됩니다.

:::note
위치 제어기 [다이어그램](../flight_stack/controller_diagrams.md#multicopter-position-controller)은 외부 **P** 위치 제어 루프와 내부 **PID** 속도 제어 루프로 구성됩니다. 모드와 상황에 따라 두 루프가 모두 활성화되거나 속도 제어 루프만 활성화됩니다.

이 항목의 나머지 부분에 대해 **위치 제어** 용어는 두 루프가 모두 활성 상태이고 **속도 제어 장치**는 속도 제어 루프만 사용하는 경우를 의미합니다.
:::

위치 제어는 스틱 입력이 데드존 [MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ) 내에 있을 때, 속도 제어는 그렇지 않은 경우 활성화됩니다.

아래의 모든 매개변수는 튜닝 매개변수이므로 물리적 값에 직접 매핑할 수 없습니다.

#### MPC_ACC_HOR_MAX

이 매개변수는 기체의 현재 위치에 머무르는 곳에서 수평 위치 제어에 사용됩니다. 속도 설정점의 변화율에 대한 한계는 [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)로 정의합니다. 이 매개변수는 수평 방향의 다른 가속 관련 매개변수보다 크게 설정해야 합니다.

<span id="mpc_acc_hor-and-mpc_dec_hor_slow"></span>

#### MPC_ACC_HOR와 MPC_DEC_HOR_SLOW

속도 제어에서 속도 설정점에 대한 속도 제한은 스틱 입력에서 가속 한계까지 최대값은 [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR) 이상 그리고 최소값은 [MPC_DEC_HOR_SLOW](../advanced_config/parameter_reference.md#MPC_DEC_HOR_SLOW)로 선형 정보에서 추출됩니다. 예를 들어, 스틱 입력이 `MPC_HOLD_DZ`에 있는 경우, 제한 가속도는 `MPC_DEC_HOR_SLOW`입니다. 스틱 입력이 최대(=`1`) 인 경우 제한 가속도는 `MPC_ACC_HOR`이며 이 사이의 스틱 입력은 두 파라미터 간에 선형적으로 매핑됩니다. 또한, 사용자가 현재 비행 방향에서 감속을 요구할 때 `MPC_DEC_HOR_SLOW`은 속도 설정점의 변화를 제한합니다. 예를 들어, 스틱 입력이 최대(=`1`)에서 `0.5`로 변경되면, 속도 설정점 변경은 `MPC_DEC_HOR_SLOW`로 제한됩니다.

**속도 제어**에서 **위치 제어**로 전환하는 동안, `MPC_ACC_HOR`에서 `MPC_ACC_HOR_MAX`로 변환하는 스위치, 그리고 속도 설정점에서 기체의 현재 속도로 전환하는 하드 스위치가 있습니다. The reset and the hard switch can both introduce a jerky flight performance during stopping. Nonetheless, the reset is required because the smoothing parameters introduce a delay to the setpoint, which can lead to unexpected flight maneuvers.

A simple example explaining why the reset is needed is given below.

Consider the case where a user demands full speed from hover followed by a stop request. This is equivalent to full stick input with maximum value of `1` followed by zero stick input. To simplify the example, assume that `MPC_ACC_HOR_MAX` is equal to `MPC_ACC_HOR` and therefore there is no hard switch in acceleration limit when switching from **velocity-control** to **position-control**. In addition, let's assume the maximum speed that can be demanded is `4 m/s`.

During full stick input, the velocity setpoint will not change directly from `0 m/s` to `4 m/s` (aka step input) - instead the velocity setpoint follows a ramp with slope `MPC_ACC_HOR`. The actual velocity of the vehicle, however, will not track the setpoint perfectly, but rather will lag behind. The lag will be more significant the larger the value of `MPC_ACC_HOR`.

![Slewrate Reset](../../assets/config/mc/slewrate_reset.svg)

Without the reset (the top graph), at the moment of the stop demand (stick equal 0) the velocity setpoint will ramp down with the maximum rate given by `MPC_ACC_HOR_MAX`. Due to the lag the vehicle will first continue to accelerate in the direction previous to the stop demand followed by slowly decelerating towards zero. With the reset of the velocity setpoint to the current velocity, the delay due to the lag during stop demand can be overcome.

#### MPC_ACC_UP_MAX and MPC_ACC_DOWN_MAX

`MPC_ACC_UP_MAX` >= `MPC_ACC_DOWN_MAX`, otherwise the firmware will overwrite the given values.

- **position-control:** the limit in velocity setpoint change in z-direction is given by [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX).
- **velocity-control:** the limit in velocity setpoint change for stick input is `MPC_ACC_UP_MAX` for upward and [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX) for downward direction.

#### MPC_JERK_MAX and MPC_JERK_MIN

These two parameters only have effect during the transition from **velocity-control** to **position-control**. The purpose of these two parameters are to minimize the jerk introduced from forward flight to hover (please see [MPC_ACC_HOR and MPC_DEC_HOR_SLOW](#mpc_acc_hor-and-mpc_dec_hor_slow)).

The jerk-parameter controls the rate limit with which the acceleration limit can change to `MPC_ACC_HOR_MAX`. The actual jerk-value is a linear map from velocity speed to jerk where full speed maps to [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) and zero speed to [MPC_JERK_MIN](../advanced_config/parameter_reference.md#MPC_JERK_MIN). The smoothing can be turned off by setting `MPC_JERK_MAX` to a value smaller than `MPC_JERK_MIN`.