---
canonicalUrl: https://docs.px4.io/main/ko/advanced/switching_state_estimators
---

# 상태 추정기 전환

어떤 상태 추정기를 사용할 수 있고 어떻게 전환할 수 있는 지를 설명합니다.

:::tip
다용도 EKF2를 추천합니다 (LPE는 더이상 관리하거나 지원해주지 않음).
:::

## 가용 추정기

사용 가능한 추정기는 다음과 같습니다.
- **EKF2 고도 위치 풍향/풍속 상태 추정기** - EKF2는 고도, 3차원 위치 / 속도, 풍향/풍속 상태를 추정하는 확장 칼만 필터입니다.
- **LPE 위치 추정기** - LPE 위치 추정기는 3차원 위치, 속도 상태를 추정하는 확장 칼만 필터입니다.
- **Q 고도 추정기**  - Q 고도 추정기는 매우 간단한 쿼터니언 기반 고도 보완 필터입니다.


## 다양한 추정기 활성화 방법

멀티콥터와 VTOL은 [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) 매개변수를 사용하여 설정합니다(고정 익에는 LPE가 지원되지 않음).

| SYS_MC_EST_GROUP | Q 추정기 | LPE | EKF2 |
| ------------------ | ----- | --- | ---- |
| 1                  | 활성    | 활성  |      |
| 2                  |       |     | 활성   |
| 3                  | 활성    |     |      |

:::note FMU-v2(전용)의 경우에는 필요한 추정기를 포함하도록 PX4를 빌드하여야 합니다(예: EKF2: `make px4_fmu-v2`, LPE: `make px4_fmu-v2_lpe`). 이는 FMU-v2가 두 추정기를 모두 포함하기에는 리소스가 너무 제한되어 있기 때문입니다. 다른 Pixhawk FMU 버전에는 둘 다 포함되어 있습니다.
:::
