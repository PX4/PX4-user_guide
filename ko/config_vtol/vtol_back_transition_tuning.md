---
canonicalUrl: https://docs.px4.io/main/ko/config_vtol/vtol_back_transition_tuning
---

# VTL 역전환 튜닝

:::note
다음 기능 중 일부는 PX4 버전 1.7에서 사용할 수 있으며, 현재 실험 개발 브랜치에서만 사용할 수 있습니다.
:::

VTOL이 역전환 (고정익 모드에서 멀티콥터 모드로 전환)을 수행시 멀티콥터가 적절한 제어를 할 수 있으려면 속도를 낮추어야 합니다. PX4 버전 1.7부터 현재 개발자 브랜치에서 기체는 수평 속도가 멀티 콥터 순항 속도 ([MPC_XY_CRUISE](../advanced_config/parameter_reference.md#MPC_XY_CRUISE))에 도달하거나 역전환 시간([VT_B_TRANS_DUR](../advanced_config/parameter_reference.md#VT_B_TRANS_DUR))이 초과 되면 (둘 중 먼저 오는 쪽) 역전환이 완료된 것으로 간주합니다.

## 역전환 시간

역전환 시간([VT_B_TRANS_DUR](../advanced_config/parameter_reference.md#VT_B_TRANS_DUR))을 길게 설정하면 기체가 감속할 시간이 더 늘어납니다. 이 기간 동안 VTOL은 고정익 모터를 차단하고 활공하는 동안 멀티콥터모터를 천천히 올립니다. 이 시간이 길 수록 기체는 감속하는 동안 더 오래 미끄러집니다. 이 동작의 주의 사항은 기체가 이 시간 동안 위치가 아닌 고도만 제어하므로 일부 드리프트가 발생할 수 있는 것입니다.

## 예상 감속 설정

[VTOL_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_LAND) 웨이포인트를 사용하는 비행 임무를 수행시 자동조종장치는 역 전환을 시작할 적절한 거리를 계산을 시도합니다. 이는 현재 속도(지상 속도와 비교)와 예상 감속을 확인하여 수행합니다. 차량이 착지 지점에 매우 가까운 역 전환이 일어나도록 예상 감속 ([VT_B_DEC_MSS](../advanced_config/parameter_reference.md#VT_B_DEC_MSS)) 매개변수를 조정할 수 있습니다. 이 타임 아웃이 시작되기 전에 기체가 의도한 위치에 도달할 수 있도록 충분한 역전환 시간이 있는지 확인하십시오.

## 에어브레이크 적용

기체에 에어브레이크가 장착되어 있고 선택한 기체가 이를 지원하는 경우 (코드에서) [VT_B_REV_OUT](../advanced_config/parameter_reference.md#VT_B_REV_OUT)에서 역 전환 중 에어브레이크 위치를 설정할 수 있습니다. 값은 0에서 1까지 확장되므로, 0.7 값은 70% 출력과 같습니다.

## 고정익 모터에 역 추력 적용 

가능한 단시간의 역 전환을 위해 PX4는 고정익 모터 방향을 반대로 하여 능동적인 차단을 지원합니다. 이 기능을 사용하려면 모터 회전 반전을 지원하는 ESC가 필요합니다.

:::note
일반적인 고정익 프로펠러는 역 회전에 최적화되어 있지 않습니다. 역 추력중 스로틀이 너무 높게 설정되면 프로펠러가 정지할 수 있습니다.
:::

일반적으로 역방향 가능 ESC가 역 추력을 구현할 수 있는 방법은 두 가지가 있습니다.

### 스로틀 스케일링 (3D) 사용

일반적으로 스로틀 스틱은 전진 추력에만 사용됩니다.

3D ESC는 50% 스로틀에서 0 추력, 50% 이상의 포지티브 (전진) 추력과 50% 미만의 음의 추력(역방향)을 가정합니다. 기체는 역전환중에*만* 이 동작을 구현하도록 수정할 수 있으며, 전환중 역 추력을 적용할 수 있습니다.

:::warning
역전환 중 3D 스로틀 스케일링을 지원하려면 기체에서 *코드 지원*이 필요합니다.
:::

역전환중 음의 추력 양은 [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR) 매개 변수를 사용하여 구성할 수 있습니다 (0과 -1 사이의 음수 값으로 설정).

### 제어 채널

ESCs that use a separate control channel to control the motor direction (e.g. [Hobbywing Platinum series](https://www.hobbywing.com/category.php?id=76&filter_attr=.0)) can use the airbrakes channel to apply reverse thrust during back-transition.

이 동작을 지원하도록 구성된 기체(예 : DeltaQuad 기체)는 [VT_B_REV_OUT](../advanced_config/parameter_reference.md#VT_B_REV_OUT)을 1로 설정하고 [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR)을 적용할 원하는 스로틀 수준으로 설정하여 이를 수행하도록 설정할 수 있습니다. 값은 0에서 1까지 확장되므로 0.7 값은 70% 스로틀과 같습니다.

## 일반적인 설정

위에 나열된 대부분의 기능을 사용하는 설정 예는 다음과 같습니다.

- 기체 : 역 추력을 지원하는 모든 VTOL (예 : DeltaQuad)
- ESC : 모터 반전을 지원하는 고정익 ESC (예 : Hobbywing Platinum Pro 60A)
- 예상 감속 값 (m/s/s) `VT_B_DEC_MSS` : 2.5
- 역전환 기간 제한 시간 (초) `VT_B_TRANS_DUR` : 10
- 역전환중 역방향 채널을 높게 설정 `VT_B_REV_OUT` : 1.0
- 역 전환 중 70% 추력 적용 `VT_B_TRANS_THR` : 0.7