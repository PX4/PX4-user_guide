---
canonicalUrl: https://docs.px4.io/main/ko/flying/terrain_following_holding
---

# 지형 추적, 유지 및 범위 보조

PX4는 *멀티 콥터*에서 [위치](../flight_modes/position_mc.md) 및 [고도 모드](../flight_modes/altitude_mc.md)에서 [지형 추적](#terrain_following) 및 [지형 유지](#terrain_hold), 및 [거리 센서](../sensor/rangefinders.md)가 있는 *MC 모드의 VTOL 차량*를 지원합니다. 

PX4는 모든 모드에서 저속 저고도([범위 보조](#range_aid))에서 비행시 [고도 데이터의 기본 소스](#distance_sensor_primary_altitude_source)로 *거리 센서*를사용합니다. 

:::note PX4는 임무 모드에서는 지형 추적을 "기본적으로" 지원하지 않습니다. *QGroundControl*을 사용하여 지형을 *대략* 따르는 임무를 정의 할 수 있습니다 (이는 지형 위의 높이를 기준으로 웨이포인트 고도를 설정하며, 웨이포인트의 지형 높이는 지도 데이터베이스에서 가져옴).
:::

<span id="terrain_following"></span>

## 지형 추적

*지형 추적*을 사용하면 기체가 저고도 비행시 지면에서 비교적 일정한 고도를 자동으로 유지할 수 있습니다. 이것은 장애물을 피하고 다양한 지형을 비행시 일정 고도 유지에 유용합니다 (예 : 항공 사진).

이 기능은 [위치 모드](../flight_modes/position_mc.md)와 [고도 모드](../flight_modes/altitude_mc.md), *멀티콥터* 및 [거리 센서](../sensor/rangefinders.md)를 장착한 *MC 모드의 VTOL 기체*에서 사용할 수 있습니다.
:::

*지형 추적*이 활성화되면 PX4는 EKF 추정기의 출력을 사용하여 고도 추정치를 제공하고 추정 지형 고도 (다른 추정기를 사용하여 거리 센서 측정에서 계산)를 제공하여 고도 설정치를 제공합니다. 지면까지의 거리가 변하면, 고도 설정 값이 조정되어지면 위의 높이를 일정하게 유지합니다.

더 높은 고도에서 (추정기가 거리 센서 데이터가 유효하지 않다고보고하는 경우) 기체는 *다음 고도*로 전환되며, 일반적으로 기압계를 사용하여 고도 데이터를 측정하여 평균 해발(AMSL) 위의 거의 일정한 고도로 비행합니다.

:::note
보다 정확하게는 기체는 [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)에 정의한 *고도 데이터의 기본 소스*를 사용합니다. 이것은 기본적으로 기압계입니다.
:::

지형 추적은 [MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE)를 `1`로 설정하면 활성화됩니다.

<span id="terrain_hold"></span>

## 지형 유지

*지형 유지*는 거리 센서를 사용하여 고도 제어 모드에서 기체가 낮은 고도에서 수평으로 고정되어 있을 때 지면에서 일정한 높이를 유지하도록 도와줍니다. 이를 통해 기체는 기압계 드리프트 또는 로터 세척으로 인한 과도한 기압계 간섭으로 인한 고도 변화를 피할 수 있습니다.

:::note
이 기능은 [위치 모드](../flight_modes/position_mc.md)와 [고도 모드](../flight_modes/altitude_mc.md), *멀티콥터* 및 [거리 센서](../sensor/rangefinders.md)를 장착한 *MC 모드의 VTOL 기체*에서 사용할 수 있습니다.
:::

수평으로 (`속도 >` [MPC_HOLD_MAX_XY](../advanced_config/parameter_reference.md#MPC_HOLD_MAX_XY)) 이동하거나 거리 센서가 유효한 데이터를 제공하는 고도 이상으로 이동할 때 기체는 *추종 고도*로 전환됩니다.

지형 유지는[MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE)를 `2`로 설정하면 활성화됩니다.

:::note
*지형 유지*는 [지형 추적](#terrain_following)과 유사하게 구현됩니다. EKF 추정기의 출력을 사용하여 고도 추정치를 제공하고 추정 지형 고도 (별도의 단일 상태 지형 추정기를 사용하여 거리 센서 측정에서 계산 됨)를 사용하여 고도 설정치를 제공합니다. 외부 힘으로 인해 지면까지의 거리가 변경되면, 지면 위의 높이를 일정하게 유지하기 위해 고도 설정 값이 조정됩니다.
:::

<span id="distance_sensor_primary_altitude_source"></span>

## 높이의 주요 소스인 거리 센서

PX4를 사용하면 거리 센서를 *고도 데이터의 기본 소스* (모든 비행 모드/기체 유형에서)로 만들 수 있습니다. 이는 기압계를 사용할 수 없거나 기체가 거의 평평한 표면 (예 : 실내) 위로만 비행을 *보장*하는 애플리케이션에 유용할 수 있습니다.

:::tip
대부분의 사용 사례에서 기본 및 선호되는 고도 센서는 기압계입니다 (사용 가능한 경우).
:::

거리 센서를 주요 높이 소스로 사용할 때 플라이어는 다음 사항에 유의하여야 합니다.

- 장애물 위로 비행하면 추정기가 거리계 데이터를 거부할 수 있으며 (내부 데이터 일관성 검사로 인해), 추정기가 낮은 고도 유지를 초래할 수 있습니다. 가속도계 추정치에만 의존하고 있습니다.
    
:::note
이 시나리오는 기체가 지상에서 거의 일정한 높이에서 경사를 상승하는 경우에 발생할 수 있습니다. 왜냐하면, 거리계의 고도는 가속도계에서 추정한 고도는 변하지 않기 때문입니다.   
    ECL은 측정과 현재 상태 사이의 오류는 물론 상태의 추정 된 분산과 측정 자체의 분산을 고려하는 혁신 일관성 검사를 수행합니다. 검사에 실패하면 거리계 데이터가 거부되고 고도는 가속도계에서 추정됩니다. 일관되지 않은 데이터 5 초 후 추정기는 현재 거리 센서 데이터와 일치하도록 상태 (이 경우 높이)를 재설정합니다. 예를 들어, 기체가 하강하거나 예상 높이가 측정된 거리계 높이와 일치하도록 드리프트하는 경우에도 측정 값이 다시 일관될 수 있습니다. <!-- see discussion https://github.com/PX4/px4_user_guide/pull/457#pullrequestreview-221010392 -->
:::

- 로컬 NED 원점은 지면과 함께 위아래로 이동합니다.

- 고르지 않은 표면(예 : 나무)에서 거리 측정기 성능이 매우 나빠서 노이즈가 많고 데이터가 일관되지 않을 수 있습니다. 이것은 다시 낮은 고도 유지로 이어집니다.

이 기능은 [EKF2_HGT_MODE = 2](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) 설정으로 활성화됩니다.

<span id="range_aid"></span>

## 범위 보조 장치

*범위 보조 장치*은 저속 저고도 비행 중 높이 추정의 기본 소스로 거리 센서를 사용하지만, 그렇지 않으면 [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)에 정의된 고도 데이터의 기본 소스를 사용합니다 (일반적으로 기압계). 기압계 설정이 로터 세척의 간섭이 과도하고, EKF 상태 추정치를 손상시킬 수있는 경우에 주로 *이착륙*을 위한 것입니다.

기체가 정지시 고도 유지를 개선하기 위해 범위 보조 장치를 사용할 수도 있습니다.

:::tip
[지형 유지](#terrain_hold)는 지형 유지를 위해 *거리 보조 장치*보다 권장됩니다. 이는 지형 유지가 높이를 결정하는 데 일반 ECL/EKF 추정기를 사용하기 때문이며 일반적으로 대부분의 조건에서 거리 센서보다 더 안정적입니다.
:::

*범위 보조 장치*은 [EKF2_RNG_AID = 1](../advanced_config/parameter_reference.md#EKF2_RNG_AID) (고도 데이터의 기본 소스 ([EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)))가 거리계가 *아닌* 경우 설정하여 활성화됩니다.).

범위 보조 장치는 `EKF2_RNG_A_` 매개 변수를 사용하여 추가로 설정합니다.

- [EKF2_RNG_A_VMAX](../advanced_config/parameter_reference.md#EKF2_RNG_A_VMAX) : 범위 보조 기능이 비활성화 된 최대 수평 속도.
- [EKF2_RNG_A_HMAX](../advanced_config/parameter_reference.md#EKF2_RNG_A_HMAX) : 범위 보조 기능이 비활성화 된 최대 높이.
- [EKF2_RNG_A_IGATE](../advanced_config/parameter_reference.md#EKF2_RNG_A_IGATE) : 범위 지원 일관성이 "게이트"(범위 지원이 비활성화되기 전의 오류 측정)를 확인합니다.