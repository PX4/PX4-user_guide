---
canonicalUrl: https://docs.px4.io/main/ko/advanced_config/land_detector
---

# 착륙 감지기 설정

착륙 감지기는 접지와 착륙 상태에서 기체의 핵심 상태를 나타내는 동적 기체 모델입니다. 이 섹션에서는 기체의 착륙 활동을 개선하는 용도로 미세 조정 가능한 주요 매개변수를 설명합니다.

## 자동 시동 끄기

기체가 착륙하면 착륙 감지기에서 자동으로 시동을 끕니다.

[ COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)를 설정하여 착륙 후 시스템의 시동이 꺼지는 시간(초)을 지정할 수 있습니다.(파라미터를 -1로 설정하여 자동으로 시동을 끄지 않을 수 있음).

## 멀티콥터 설정

착륙 감지기 관련 매개변수는 접두사 [LNDMC](../advanced_config/parameter_reference.md#land-detector)가 붙어 있습니다(QGroundControl의 [매개변수 편집기](../advanced_config/parameters.md)에서 수정 가능합니다).

:::tip
Information about how the parameters affect landing can be found below in [Land Detector States](#mc-land-detector-states).
:::

각 기체에서 착륙 동작 개선용 미세 조정 핵심 매개변수는 다음과 같습니다:

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - 시스템의 공중부양 추진력(기본값 50%). 고도를 정확하게 제어하고 올바른 착륙 감지를 보장하도록 이 매개변수를 정확하게 설정하여야 합니다. 적재 장치가 없는 레이서 또는 대형 카메라 드론은 좀 더 낮은 값을 설정하여야 합니다(예: 35%).

:::note
Incorrectly setting `MPC_THR_HOVER` may result in ground-contact or maybe-landed detection while still in air (in particular, while descending in [Position mode](../flight_modes_mc/position.md) or [Altitude mode](../flight_modes_mc/altitude.md)). 이 현상은 기체의 "요동"(모터를 껐다가 즉시 모터가 켜지는) 현상을 유발합니다.
:::

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) - 시스템의 전체 최소 추진력. 제어 하강을 가능하게하기 위하여 설정되어야 합니다.
- [MPC_LAND_CRWL](../advanced_config/parameter_reference.md#MPC_LAND_CRWL) - the vertical speed applied in the last stage of autonomous landing if the system has a distance sensor and it is present and working. Has to be set larger than LNDMC_Z_VEL_MAX.

### MC Land Detector States

멀티콥터는 착륙 감지에 3개의 서로 다른 상태를 거치게 됩니다. 각각의 상태는 이전 상태의 조건에 더해 엄격한 제약조건을 가지게 됩니다. 센서 손실로 인해 조건이 만족되지 않는다면, 기본값으로 그 조건은 참이 됩니다. For instance, in [Acro mode](../flight_modes_mc/acro.md) and no sensor is active except for the gyro sensor, then the detection solely relies on thrust output and time.

In order to proceed to the next state, each condition has to be true for a third of the configured total land detector trigger time [LNDMC_TRIG_TIME](../advanced_config/parameter_reference.md#LNDMC_TRIG_TIME). If the vehicle is equipped with a distance sensor, but the distance to ground is currently not measurable (usually because it is too large), the trigger time is increased by a factor of 3.

만약에 조건중 하나라도 만족하지 않으면, 착륙 감지기는 즉시 현재 상태를 벗어납니다.

#### 접지

Conditions for this state:

- 수직 방향으로 움직임이 없음 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- 수평 방향으로 움직임이 없음 ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- lower thrust than [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + (hover throttle - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) \* (0.3, unless a hover thrust estimate is available, then 0.6),
- additional check if vehicle is currently in a height-rate controlled flight mode: the vehicle has to have the intent to descend (vertical velocity setpoint above LNDMC_Z_VEL_MAX).
- additional check for vehicles with a distance sensor: current distance to ground is below 1m.

If the vehicle is in position- or velocity-control and ground contact was detected, the position controller will set the thrust vector along the body x-y-axis to zero.

#### 착륙 예측

Conditions for this state:

- all conditions of the [ground contact](#ground-contact) state are true
- 기체 회전이 없을 경우 ([LNDMC_ROT_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- 추력이 `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`보다 낮을 경우
- no freefall detected

If the vehicle only has knowledge of thrust and angular rate, in order to proceed to the next state the vehicle has to have low thrust and no rotation for 8.0 seconds.

If the vehicle is in position or velocity control and maybe landed was detected, the position controller will set the thrust vector to zero.

#### 착륙

Conditions for this state:

- all conditions of the [maybe landed](#maybe-landed) state are true

## Fixed-wing Configuration

Tuning parameters for fixed-wing land detection:

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX) -시스템이 여전히 착륙했다고 간주할 수 있는 최대 항속. Has to be a tradeoff between airspeed sensing accuracy and triggering fast enough. 좋은 대기속도 센서는 이 파라미터 값을 낮출 수 있게 합니다.
- [LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - 시스템이 착륙하는 것으로 간주되는 최대 수평 속도
- [LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX)-시스템이 착륙한 것으로 간주되는 최대 수직 속도.
- [LNDFW_XYACC_MAX](../advanced_config/parameter_reference.md#LNDFW_XYACC_MAX) - the maximal horizontal acceleration for the system to still be considered landed.
- [LNDFW_TRIG_TIME](../advanced_config/parameter_reference.md#LNDFW_TRIG_TIME) - Trigger time during which the conditions above have to be fulfilled to declare a landing.

:::note
When FW launch detection is enabled ([FW_LAUN_DETCN_ON](../advanced_config/parameter_reference.md#FW_LAUN_DETCN_ON)), the vehicle will stay in "landed" state until takeoff is detected (which is purely based on acceleration and not velocity).
:::

## VTOL Land Detector

The VTOL land detector is 1:1 the same as the MC land detector if the system is in hover mode. In FW mode, land detection is disabled.
