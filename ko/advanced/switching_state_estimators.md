# 상태 추정자(State Estimator) 전환

이 페이지에서는 상태 추정자의 존재 여부를 확인하고 전환하는 방법을 보여줍니다.

:::tip
EKF2 is highly recommended for all purposes (LPE is no longer supported/maintained).
:::

## 가용 추정자

멀티로터 수직 이착륙기에서는 다음 설정 중 하나를 선택하도록 [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) 매개변수를 활용합니다(LPE는 고정익에서 지원하지 않음).
- **EKF2 고도 위치 풍향/풍속 상태 추정자** - EKF2는 고도, 3차원 위치 / 속도, 풍향/풍속 상태를 추정하는 확장 칼만 필터입니다.
- **LPE 위치 추정자** - LPE 위치 추정자는 3차원 위치, 속도 상태를 추정하는 확장 칼만 필터입니다.
- **Q 고도 추정자**  - Q 고도 추정자는 매우 간단한 쿼터니언 기반 고도 보완 필터입니다.


## 각 추정자 활성 방법

For multirotors and VTOL use the parameter [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) to choose between the following configurations (LPE is not supported for Fixed Wing).

| SYS_MC_EST_GROUP | Q 추정자 | LPE | EKF2 |
| ------------------ | ----- | --- | ---- |
| 1                  | 활성    | 활성  |      |
| 2                  |       |     | 활성   |
| 0                  | 활성    |     |      |

:::note
For FMU-v2 (only) you will also need to build PX4 to specifically include required estimator (e.g. EKF2: `make px4_fmu-v2`, LPE: `make px4_fmu-v2_lpe`). This is required because FMU-v2 is too resource constrained to include both estimators. Other Pixhawk FMU versions include both.
:::
