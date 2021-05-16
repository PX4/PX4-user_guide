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

**속도 제어**에서 **위치 제어**로 전환하는 동안, `MPC_ACC_HOR`에서 `MPC_ACC_HOR_MAX`로 변환하는 스위치, 그리고 속도 설정점에서 기체의 현재 속도로 전환하는 하드 스위치가 있습니다. 리셋과 하드 스위치는 모두 정지 중에 비행 성능을 저하시킬 수 있습니다. 그럼에도 불구하고 평활화 매개변수로 인하여 설정 값이 지연되어 예기치 않은 비행 기동이 발생할 수 있으므로 재설정이 필요합니다.

재설정이 필요한 이유를 설명하는 간단한 예제는 아래와 같습니다.

사용자가 호버링에서 최고 속도를 요구한 후 중지 요청을하는 경우를 고려하여야 합니다. 이는 최대값이 `1` 인 풀 스틱 입력에 이어 제로 스틱 입력과 동일합니다. 이 예를 단순화하기 위해 `MPC_ACC_HOR_MAX`가 `MPC_ACC_HOR`과 같다고 가정하면, **속도 제어**에서 **위치 제어**로 전환할 때 가속 한도에 하드 스위치가 없습니다. 또한 요구 최대 속도를 `4m/s`라고 가정합니다.

최대 스틱 입력 중에 속도 설정점은 속도 설정점 대신 `0 m/s `에서 `4 m/s` 바로 변경되지 않고 (일명 스텝 입력), 대신 속도 설정점이 경사 `MPC_ACC_HOR`을 갖는 경사값를 따라가게 됩니다. 그러나 기체의 실제 속도는 설정값을 완벽하게 추적하지 않고 뒤처질 것입니다. 지연은 `MPC_ACC_HOR`의 값이 클수록 더 중가합니다.

![Slewrate Reset](../../assets/config/mc/slewrate_reset.svg)

재설정하지 않으면 (상단 그래프) 정지 요구 (스틱 0과 같음) 순간에 속도 설정 값이 `MPC_ACC_HOR_MAX`에 지정된 최대 속도로 감소합니다. 지연으로 인해 기체는 먼저 정지 요구 이전 방향으로 가속후 0을 향해 천천히 감속합니다. 속도 설정 값을 현재 속도로 재설정하면 정지 요구 중 지연으로 인한 지연을 극복할 수 있습니다.

#### MPC_ACC_UP_MAX 및 MPC_ACC_DOWN_MAX

`MPC_ACC_UP_MAX`> = `MPC_ACC_DOWN_MAX`, 그렇지 않으면 펌웨어가 주어진 값을 덮어 씁니다.

- **위치 제어 :** z 방향의 속도 설정 값 변경 한계는 [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)에 의해 제공됩니다.
- **속도 제어 :** 스틱 입력에 대한 속도 설정 값 변경 한계는 상향의 경우 `MPC_ACC_UP_MAX`이고 하향의 경우 [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)입니다.

#### MPC_JERK_MAX와 MPC_JERK_MIN

이 두 매개변수는 **속도 제어**에서 **위치 제어**로 전환중에만 효과가 있습니다. 이 두 매개변수의 목적은 전진 비행에서 호버링시 발생하는 저크를 최소화하는 것입니다 ([MPC_ACC_HOR와 MPC_DEC_HOR_SLOW](#mpc_acc_hor-and-mpc_dec_hor_slow) 참조).

저크 매개변수는 가속 제한이 `MPC_ACC_HOR_MAX`로 변경될 수있는 속도 제한을 제어합니다. The actual jerk-value is a linear map from velocity speed to jerk where full speed maps to [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) and zero speed to [MPC_JERK_MIN](../advanced_config/parameter_reference.md#MPC_JERK_MIN). The smoothing can be turned off by setting `MPC_JERK_MAX` to a value smaller than `MPC_JERK_MIN`.