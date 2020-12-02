# 착륙 감지기 설정

착륙 감지기는 지면과의 접촉 및 착륙을 포함하는 기체의 핵심 상태를 포함하는 역학모델입니다. 이 문서는 기체의 착륙을 개선하기 위해 조정할 수 있는 파라미터들에 대해 설명합니다.

## 자동으로 시동 끄기

착륙 감지기가 착륙시 자동으로 기체의 시동을 끕니다. 

 COM_DISARM_LAND </ 0>를 설정하여 착륙 후 시스템이 꺼지는 시간(초)을 지정할 수 있습니다.(파라미터를 -1로 설정하여 자동으로 시동을 끄지 않을 수 있습니다.) </p> 

## 멀티콥터 설정

착륙 감지기와 연관된 파라미터의 전체 리스트는 파라미터 레퍼런스에 접두사 [LNDMC](../advanced_config/parameter_reference.md#land-detector)으로 나열되어 있습니다. (QGroundControl의 파라미터 편집기를 통해 수정할 수 있습니다.)

:::tip
Information about how the parameters affect landing can be found below in [Land Detector States](#states).
:::

Other key parameters that you may need to tune in order to improve landing behaviour on particular airframes are:

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)-시스템의 호버 스로틀(기본값 50%) 고도를 보다 정확하게 제어하고 정확한 착륙 감지 보장하기 때문에 이 파라미터를 올바르게 설정하는 것이 중요합니다. 페이로드가 장착되지 않은 레이서 또는 대형 촬영용 드론은 훨씬 낮은 값의 세팅이 필요할 수 있습니다. (예. 35%)
    
    :::note Incorrectly setting `MPC_THR_HOVER` may result in ground-contact or maybe-landed detection while still in air (in particular, while descending in [Position mode](../flight_modes/position_mc.md) or [Altitude mode](../flight_modes/altitude_mc.md)). This causes the vehicle to "twitch" (turn down the motors, and then immediately turn them back up).
:::

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) - 시스템의 전체 최소 스로틀 이 설정은 제어된 강하가 가능하게 합니다.

## 고정익 설정

The complete set of relevant parameters is available under the [LNDFW](../advanced_config/parameter_reference.md#land-detector) prefix. These two parameters are sometimes worth tuning:

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX) -시스템이 착륙한 것으로 간주되는 최대 대기속도. 기본값 8m/s는 대기속도 센서의 정확도와 착륙 감지기의 시작을 안정적으로 절충합니다. 좋은 대기속도 센서는 이 파라미터 값을 낮출 수 있게 합니다.
- [LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - 시스템이 착륙하는 것으로 간주되는 최대 수평 속도 
- [LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX)-시스템이 착륙한 것으로 간주되는 최대 수직 속도. 이 파라미터는 착륙 감지 시작을 조금 더 빠르거나 느리도록 조절하거나, 기체를 손으로 던져서 날릴 때 사용할 수 있습니다.

<span id="states"></span>

## Land Detector States

### 멀티콥터 착륙 감지

In order to detect landing, the multicopter first has to go through three different states, where each state contains the conditions from the previous states plus tighter constraints. If a condition cannot be reached because of missing sensors, then the condition is true by default. For instance, in [Acro mode](../flight_modes/acro_mc.md) and no sensor is active except for the gyro sensor, then the detection solely relies on thrust output and time.

In order to proceed to the next state, each condition has to be true for some predefined time. If one condition fails, the land detector drops out of the current state immediately.

#### 지면 접촉

This state is reached if following conditions are true for 0.35 seconds:

- 수직 방향으로 움직임이 없음 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- 수평 방향으로 움직임이 없음 ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- 추력 값이 [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + ([MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) * [LNDMC_LOW_T_THR](../advanced_config/parameter_reference.md#LNDMC_LOW_T_THR)보다 낮거나, 속도 설정값이 지면 속도의 0.9배이고 기체가 수직으로 움직임이 없을 때

If the vehicle is in position- or velocity-control and ground contact was detected, the position controller will set the thrust vector along the body x-y-axis to zero.

#### Maybe Landed

This state is reached if following conditions are true for 0.25 seconds:

- 지면 접촉 조건이 모두 참일 경우
- 기체 회전이 없을 경우 ([LNDMC_ROT_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- 추력이 `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`보다 낮을 경우

If the vehicle only has knowledge of thrust and angular rate, in order to proceed to the next state the vehicle has to have low thrust and no rotation for 8.0 seconds.

If the vehicle is in position or velocity control and maybe landed was detected, the position controller will set the thrust vector to zero.

#### 착륙함

This state is reached if following conditions are true for 0.3 seconds:

- maybe landed 조건이 모두 참일 경우