# 착륙 감지기 설정

착륙 감지기는 접지와 착륙 상태에서 기체의 핵심 상태를 나타내는 동적 기체 모델입니다. 이 섹션에서는 기체의 착륙 활동을 개선하는 용도로 미세 조정 가능한 주요 매개변수를 설명합니다.

## 자동 시동 끄기

기체가 착륙하면 착륙 감지기에서 자동으로 시동을 끕니다.

[ COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)를 설정하여 착륙 후 시스템의 시동이 꺼지는 시간(초)을 지정할 수 있습니다.(파라미터를 -1로 설정하여 자동으로 시동을 끄지 않을 수 있음). 

## 멀티콥터 설정 

착륙 감지기 관련 매개변수는 접두사 [LNDMC](../advanced_config/parameter_reference.md#land-detector)가 붙어 있습니다(QGroundControl의 [매개변수 편집기](../advanced_config/parameters.md)에서 수정 가능합니다).

:::tip
착륙 관련 매개변수들은 [착륙 감지 상태](#states)편을 참고하십시오.
:::

각 기체에서 착륙 동작 개선용 미세 조정 핵심 매개변수는 다음과 같습니다:

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - 시스템의 공중부양 추진력(기본값 50%). 고도를 정확하게 제어하고 올바른 착륙 감지를 보장하도록 이 매개변수를 정확하게 설정하여야 합니다. 적재 장치가 없는 레이서 또는 대형 카메라 드론은 좀 더 낮은 값을 설정하여야 합니다(예: 35%).
    
:::note
부정확한 `MPC_THR_HOVER`설정은 지면과의 접촉이나 공중에 있을 때에 maybe-landed detection을 유발할 수 있습니다.(특히 [위치 모드](../flight_modes/position_mc.md)나 [고도 모드](../flight_modes/altitude_mc.md)에서 그렇습니다.) 이 현상은 기체의 "요동"(모터를 껐다가 즉시 모터가 켜지는) 현상을 유발합니다.
:::

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) - 시스템의 전체 최소 추진력. 제어 하강을 가능하게하기 위하여 설정되어야 합니다.

## 고정익 설정 

관련 매개변수는 [LNDFW](../advanced_config/parameter_reference.md#land-detector) 접두어가 붙어있습니다. 아래의 두 개의 매개변수는 수시로 약간씩 튜닝하는 것이 좋습니다.

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX) -시스템이 여전히 착륙했다고 간주할 수 있는 최대 항속. 기본값 8m/s는 대기속도 센서의 정확도와 착륙 감지기의 시작을 안정적으로 절충합니다. 좋은 대기속도 센서는 이 파라미터 값을 낮출 수 있게 합니다.
- [LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - 시스템이 착륙하는 것으로 간주되는 최대 수평 속도 
- [LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX)-시스템이 착륙한 것으로 간주되는 최대 수직 속도. 이 파라미터는 착륙 감지 시작을 조금 더 빠르거나 느리도록 조절하거나, 기체를 손으로 던져서 날릴 때 사용할 수 있습니다.

<span id="states"></span>

## 착륙 감지기 상태

### 멀티콥터 착륙 감지

In order to detect landing, the multicopter first has to go through three different states, where each state contains the conditions from the previous states plus tighter constraints. If a condition cannot be reached because of missing sensors, then the condition is true by default. For instance, in [Acro mode](../flight_modes/acro_mc.md) and no sensor is active except for the gyro sensor, then the detection solely relies on thrust output and time.

In order to proceed to the next state, each condition has to be true for some predefined time. If one condition fails, the land detector drops out of the current state immediately.

#### 접지

다음 조건이 0.35초 동안 참이면 이 상태에 도달합니다:

- 수직 방향으로 움직임이 없음 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- 수평 방향으로 움직임이 없음 ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- lower thrust than [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + ([MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) * (0.3, unless a hover thrust estimate is available, then 0.6), or velocity setpoint is 0.9 of land speed but vehicle has no vertical movement.

If the vehicle is in position- or velocity-control and ground contact was detected, the position controller will set the thrust vector along the body x-y-axis to zero.

#### 착륙 예측

다음 조건이 0.25초 동안 참이면 이 상태에 도달합니다:

- 접지 조건이 모두 참일 경우
- 기체 회전이 없을 경우 ([LNDMC_ROT_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- 추력이 `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`보다 낮을 경우

If the vehicle only has knowledge of thrust and angular rate, in order to proceed to the next state the vehicle has to have low thrust and no rotation for 8.0 seconds.

If the vehicle is in position or velocity control and maybe landed was detected, the position controller will set the thrust vector to zero.

#### 착륙

다음 조건이 0.3초 동안 참이면 이 상태에 도달합니다:

- maybe landed 조건이 모두 참일 경우