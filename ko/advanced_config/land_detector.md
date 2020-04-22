# 착륙 감지기 설정

착륙 감지기는 지면과의 접촉 및 착륙을 포함하는 기체의 핵심 상태를 포함하는 역학모델입니다. 이 문서는 기체의 착륙을 개선하기 위해 조정할 수 있는 파라미터들에 대해 설명합니다.

## 자동으로 시동 끄기

착륙 감지기가 착륙시 자동으로 기체의 시동을 끕니다. 

 COM_DISARM_LAND </ 0>를 설정하여 착륙 후 시스템이 꺼지는 시간(초)을 지정할 수 있습니다.(파라미터를 -1로 설정하여 자동으로 시동을 끄지 않을 수 있습니다.) </p> 

## 멀티콥터 설정

착륙 감지기와 연관된 파라미터의 전체 리스트는 파라미터 레퍼런스에 접두사 [LNDMC](../advanced_config/parameter_reference.md#land-detector)으로 나열되어 있습니다. (QGroundControl의 파라미터 편집기를 통해 수정할 수 있습니다.)

> **팁** 파라미터가 착륙에 미치는 영향은 아래 [시동 감지기 상태](#states)에서 확인할 수 있습니다.

특정 기체에서 착륙 동작을 개선하기 위해 조정해야 할 다른 주요 파라미터는 다음과 같습니다.

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)-시스템의 호버 스로틀(기본값 50%) 고도를 보다 정확하게 제어하고 정확한 착륙 감지 보장하기 때문에 이 파라미터를 올바르게 설정하는 것이 중요합니다. 페이로드가 장착되지 않은 레이서 또는 대형 촬영용 드론은 훨씬 낮은 값의 세팅이 필요할 수 있습니다. (예. 35%)
    
    > **참고** 부정확한 `MPC_THR_HOVER`설정은 지면과의 접촉이나 공중에 있을 때에 maybe-landed detection을 유발할 수 있습니다.(특히 [Position mode](../flight_modes/position_mc.md)나 [Altitude mode](../flight_modes/altitude_mc.md)일 때 그렇습니다.) 이 현상은 기체의 요동(모터를 껐다가 즉시 모터가 켜지는 현상)을 유발합니다.

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) - 시스템의 전체 최소 스로틀 이 설정은 제어된 강하가 가능하게 합니다.

## 고정익 설정

관련 파라미터는 [LNDFW](../advanced_config/parameter_reference.md#land-detector) 접두사로 나열되어 있습니다. 이 두 파라미터는 때때로 조정할 가치가 있습니다:

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX) -시스템이 착륙한 것으로 간주되는 최대 대기속도. 기본값 8m/s는 대기속도 센서의 정확도와 착륙 감지기의 시작을 안정적으로 절충합니다. 좋은 대기속도 센서는 이 파라미터 값을 낮출 수 있게 합니다.
- [LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - 시스템이 착륙하는 것으로 간주되는 최대 수평 속도 
- [LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX)-시스템이 착륙한 것으로 간주되는 최대 수직 속도. 이 파라미터는 착륙 감지 시작을 조금 더 빠르거나 느리도록 조절하거나, 기체를 손으로 던져서 날릴 때 사용할 수 있습니다.

## 착륙 감지기 상태 {#states}

### 멀티콥터 착륙 감지

멀티콥터는 착륙 감지에 3개의 서로 다른 상태를 거치게 됩니다. 각각의 상태는 이전 상태의 조건에 더해 엄격한 제약조건을 가지게 됩니다. 센서 손실로 인해 조건이 만족되지 않는다면, 기본값으로 그 조건은 참이 됩니다. 예를 들어, [Acro mode](../flight_modes/acro_mc.md)에서 자이로스코프 센서를 제외한 다른 센서가 활성화되지 않았다면, 착륙 감지는 추력 출력값과 시간에 의존하게 됩니다.

다음 상태로 넘어가려면 미리 정해진 시간동안 각 조건들이 참인 상태로 유지되어야 합니다. 만약에 조건 하나를 달성하지 못한다면, 착륙 감지기는 현재 상태에서 벗어나게 됩니다.

#### 지면 접촉

다음 조건이 0.35초 동안 참일 경우 이 상태에 도달합니다:

- 수직 방향으로 움직임이 없음 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- 수평 방향으로 움직임이 없음 ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- 추력 값이 [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + ([MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) * [LNDMC_LOW_T_THR](../advanced_config/parameter_reference.md#LNDMC_LOW_T_THR)보다 낮거나, 속도 설정값이 지면 속도의 0.9배이고 기체가 수직으로 움직임이 없을 때

만약 기체가 위치나 속도 제어중에 지면 접촉을 감지했다면, 위치 제어기는 기체의 x-y 축을 따르는 추력 벡터를 0으로 설정합니다.

#### Maybe Landed

다음 조건이 0.25초 동안 참일 경우 이 상태에 도달합니다:

- 지면 접촉 조건이 모두 참일 경우
- 기체 회전이 없을 경우 ([LNDMC_ROT_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- 추력이 `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`보다 낮을 경우

만약 기체가 추력과 각가속도만을 알고 있다면, 다음 상태로 진입하기 위해서는 기체의 추력이 낮아야 하고, 8초동안 회전하지 않아야 합니다.

만약 기체가 위치나 속도 제어중에 maybe landed 상태를 감지했다면, 위치 제어기는 기체의 추력 벡터를 0으로 설정합니다.

#### 착륙함

다음 조건이 0.3초 동안 참일 경우 이 상태에 도달합니다:

- maybe landed 조건이 모두 참일 경우