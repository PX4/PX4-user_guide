---
canonicalUrl: https://docs.px4.io/main/ko/flying/fixed_wing_takeoff
---

# 고정익 이륙

PX4는 [임무](#mission-takeoff)와 [이륙](#takeoff-flight-mode) 비행 모드에서 고정익 이륙을 지원합니다. 기체는 *투석기/수동 발사*를 사용하거나 활주로 이륙 모드를 사용할 수 있습니다. <!-- runway support in missions? -->
In all cases the vehicle takes off at a predefined pitch in its current direction (RC stick input is ignored).

아래 섹션에서는 주요 방법을 설명합니다.

## 위치 비행 모드

기체를 [FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF) 이하의 고도에서 발사했을 때, 충분한 발사 가속을 감지하면 [위치 모드](../flight_modes/position_fw.md)에서 이륙합니다.

이 모드에서 시작하려면 :
- 기체의 시동을 겁니다.
- 기체를 *위치 모드*로 설정합니다.
- 기체를 공중에 던져서 발사합니다.

기체는 [이륙 모드](#takeoff-flight-mode)와 동일한 상승 동작을 사용하여 `FW_CLMBOUT_DIFF`로 상승합니다. It will then continue in *Position mode*.

## 비행 모드에서 이륙

[이륙 모드](../flight_modes/takeoff.md#fixed_wing)는 *투석기/수동 발사* (기본값) 또는 *활주로 이륙*을 사용하여 이륙 할 수 있습니다.

### 투석기/수공 발사 모드

시동후에 이륙 모드이면 기체는 발사를 감지하기 위해 대기합니다 (예 : 투석기 또는 손 발사로 인한 가속). 발사 감지시 기체는 약 2 초 만에 최대 스로틀([RWTO_MAX_THR](../advanced_config/parameter_reference.md#RWTO_MAX_THR))까지 상승한 다음 10도 피치에서 최대 스로틀 상승을 수행합니다. 기체 상승 단계는 차량이 올바른 고도([FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF)로 정의 됨)에 도달하면 종료되며, 그 후에는 일반 내비게이션이 진행됩니다. 모든 RC 스틱의 조작은 상승이 끝날 때까지 무시됩니다.

:::warning
기본 상승 피치는 일부 기체에 적합하지 않을 수 있습니다. <!-- see https://github.com/PX4/PX4-Autopilot/pull/9243 -->
:::

이 모드에서 발사하려면:
- 기체의 시동을 겁니다.
- 기체를 *위치 모드*로 설정합니다.
- 기체를 공중에 던져서 발사합니다.

:::note
대부분의 기존 고정익 차량은 놓을 때 평평하고 수평을 유지해야합니다 (기수가 위 또는 아래로 있지 않고 차량이 구르거나 요잉하지 않는 것이 중요합니다).
:::

:::tip
일부 사용자는 발사 감지를 사전 트리거하고 발사 전에 최대 스로틀을 램핑하여 이륙 성능을 개선했다고보고합니다 (발사 감지 펌프를 트리거하거나 기체를 앞으로 흔들기 위해).
:::

### 활주로 이륙

활주로 이륙 모드는 [RWTO_TKOFF](../advanced_config/parameter_reference.md#RWTO_TKOFF)를 사용합니다.

모드는 [이륙 모드 > 고정익 > 활주로 이륙](../flight_modes/takeoff.md#runway_launch) 입니다.

## 임무 이륙

미션 모드에서 고정익 차량을 손/투석기로 발사할 수도 있습니다.

미션 모드에서 발사하려면:
1. 임무 **시작**에 고정 날개 이륙 항목을 추가합니다.

   :::tip
이륙 항목 최소 피치 매개 변수를 기체에 적합한 값으로 설정하십시오!
:::
1. 임무 모드로 전환합니다.
1. 기체의 시동을 겁니다.
1. 기체를 공중에 던져서 발사합니다.

:::note
대부분의 기존 고정익 차량은 놓을 때 평평하고 수평을 유지해야합니다 (기수가 위 또는 아래로 있지 않고 차량이 구르거나 요잉하지 않는 것이 중요합니다).
:::

:::tip
일부 사용자는 발사 감지를 사전 트리거하고 발사 전에 최대 스로틀을 램핑하여 이륙 성능을 개선했다고보고합니다 (발사 감지 펌프를 트리거하거나 기체를 앞으로 흔들기 위해).
:::

이륙/비행이 감지되면 기체가 상승한 다음에(이륙 웨이 포인트의 최소 피치 매개 변수 사용) 이륙 웨이포인트 위치로 이동합니다. 이륙 웨이포인트 고도 아래 `FW_CLMBOUT_DIFF`에 도달할 때까지 계속 상승합니다 (이 고도에 도달하기 전에 목표 웨이 포인트에 도달하면이 수준까지 올라갑니다).

:::note
롤 각도는 상승하는 동안 최대 15도로 제한됩니다 (`FW_CLMBOUT_DIFF  > 0`이고, 이륙 고도까지의 거리는 `FW_CLMBOUT_DIFF` 이상입니다).
:::

임무는 고도(`FW_CLMBOUT_DIFF` 이내) 및 위치에 도달하면 다음 웨이포인트로 전환됩니다.
