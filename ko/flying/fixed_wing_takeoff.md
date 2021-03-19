# 고정익 이륙

PX4는 [임무](#mission-takeoff)와 [이륙](#takeoff-flight-mode) 비행 모드에서 고정익 이륙을 지원합니다. 기체는 *투석기/수동 발사*를 사용하거나 활주로 이륙 모드를 사용할 수 있습니다. <!-- runway support in missions? -->
In all cases the vehicle takes off at a predefined pitch in its current direction (RC stick input is ignored).

아래 섹션에서는 주요 방법을 설명합니다.

## 위치 비행 모드

기체를 [FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF) 이하의 고도에서 발사했을 때, 충분한 발사 가속을 감지하면 [위치 모드](../flight_modes/position_fw.md)에서 이륙합니다.

이 모드에서 시작하려면 :
- 기체의 시동을 겁니다.
- 기체를 *위치 모드*로 설정합니다.
- 기체를 강한 바람에 직접 던져서 발사합니다.

기체는 [이륙 모드](#takeoff-flight-mode)와 동일한 상승 동작을 사용하여 `FW_CLMBOUT_DIFF`로 상승합니다. 그런 다음 *포지션 모드*에서 계속 동작합니다.

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
- 기체를 강한 바람에 직접 던져서 발사합니다.

:::note
대부분의 기존 고정익 차량은 놓을 때 평평하고 수평을 유지해야합니다 (기수가 위 또는 아래로 있지 않고 차량이 구르거나 요잉하지 않는 것이 중요합니다).
:::

:::tip
일부 사용자는 발사 감지를 사전 트리거하고 발사 전에 최대 스로틀을 램핑하여 이륙 성능을 개선했다고보고합니다 (발사 감지 펌프를 트리거하거나 기체를 앞으로 흔들기 위해).
:::

### 활주로 이륙

활주로 이륙 모드는 [RWTO_TKOFF](../advanced_config/parameter_reference.md#RWTO_TKOFF)를 사용합니다.

모드는 [이륙 모드 > 고정익 > 활주로 이륙](../flight_modes/takeoff.md#runway_launch) 입니다.

## Mission Takeoff

You can also hand/catapult launch a fixed wing vehicle in a mission.

To launch in a mission:
1. Add a fixed wing takeoff item to the **start** of the mission.

:::tip
Set the takeoff item minimum pitch parameter to an appropriate value for your airframe!
:::
1. Switch to mission mode.
1. Arm the vehicle.
1. Launch/throw the vehicle (firmly) directly into the wind.

:::note
Most traditional fixed-wing vehicles must be flat and level on release (it is important the nose is neither up or down, and that the vehicle is not rolling/yawing).
:::

:::tip
Some users report improved takeoff performance by pre-triggering launch detection and ramping up to full throttle before release (to trigger launch detection pump/shake the aircraft forward).
:::

Once launch/flight is detected the vehicle climbs out (using the minimum pitch parameter in the Takeoff waypoint) and navigates  towards the location of the Takeoff waypoint. It continues climbing until it reaches < `FW_CLMBOUT_DIFF` below the takeoff waypoint altitude (if it reaches the target waypoint before achieving this altitude it spirals up to this level).

:::note
The roll angle is limited to a maximum of 15 degrees during climbout (`FW_CLMBOUT_DIFF is > 0` and distance to takeoff altitude is > `FW_CLMBOUT_DIFF`).
:::

The mission transitions to the next waypoint when it has reached the altitude (within `FW_CLMBOUT_DIFF`) and location.
