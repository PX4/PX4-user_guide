# 착륙 감지기 설정

착륙 감지기는 지면과의 접촉 및 착륙을 포함하는 기체의 핵심 상태를 포함하는 역학모델입니다. 이 문서는 기체의 착륙을 개선하기 위해 조정할 수 있는 파라미터들에 대해 설명합니다.

## 자동으로 시동 끄기

착륙 감지기가 착륙시 자동으로 기체의 시동을 끕니다. 

 COM_DISARM_LAND </ 0>를 설정하여 착륙 후 시스템이 꺼지는 시간(초)을 지정할 수 있습니다.(파라미터를 -1로 설정하여 자동으로 시동을 끄지 않을 수 있습니다.) </p> 

## 멀티콥터 설정

착륙 감지기와 연관된 파라미터의 전체 리스트는 파라미터 레퍼런스에 접두사 [LNDMC](../advanced_config/parameter_reference.md#land-detector)으로 나열되어 있습니다(QGroundControl의 파라미터 편집기를 통해 수정할 수 있습니다.)

> **팁** 파라미터가 착륙에 미치는 영향은 아래 [시동 감지기 상태](#states)에서 확인할 수 있습니다.

특정 기체에서 착륙 동작을 개선하기 위해 조정해야 할 다른 주요 파라미터는 다음과 같습니다.

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)-시스템의 호버 스로틀(기본값 50%) 고도를 보다 정확하게 제어하고 정확한 착륙 감지 보장하기 때문에 이 파라미터를 올바르게 설정하는 것이 중요합니다. 페이로드가 장착되지 않은 레이서 또는 대형 촬영용 드론은 훨씬 낮은 값의 세팅이 필요할 수 있습니다. (예. 35%)
    
    > **참고** 부정확한 `MPC_THR_HOVER`설정은 지면과의 접촉이나 공중에 있을 때에 maybe-landed detection을 유발할 수 있습니다.(특히 [Position mode](../flight_modes/position_mc.md)나 [Altitude mode](../flight_modes/altitude_mc.md)일 때 그렇습니다.) This causes the vehicle to "twitch" (turn down the motors, and then immediately turn them back up).

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) - the overall minimum throttle of the system. This should be set to enable a controlled descent.

## Fixed Wing Configuration

The complete set of relevant parameters is available under the [LNDFW](../advanced_config/parameter_reference.md#land-detector) prefix. These two parameters are sometimes worth tuning:

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX) - the maximum airspeed allowed for the system still to be considered landed. The default of 8 m/s is a reliable tradeoff between airspeed sensing accuracy and triggering fast enough. Better airspeed sensors should allow lower values of this parameter.
- [LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - the maximum horizontal velocity for the system to be still be considered landed. 
- [LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - the maximum vertical velocity for the system to be still be considered landed. This parameter can be adjusted to ensure land detection triggers earlier or later on throwing the airframe for hand-launches.

## Land Detector States {#states}

### Multicopter Land Detection

In order to detect landing, the multicopter first has to go through three different states, where each state contains the conditions from the previous states plus tighter constraints. If a condition cannot be reached because of missing sensors, then the condition is true by default. For instance, in [Acro mode](../flight_modes/acro_mc.md) and no sensor is active except for the gyro sensor, then the detection solely relies on thrust output and time.

In order to proceed to the next state, each condition has to be true for some predefined time. If one condition fails, the land detector drops out of the current state immediately.

#### Ground Contact

This state is reached if following conditions are true for 0.35 seconds:

- no vertical movement ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- no horizontal movement ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- lower thrust than [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + ([MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) * [LNDMC_LOW_T_THR](../advanced_config/parameter_reference.md#LNDMC_LOW_T_THR), or velocity setpoint is 0.9 of land speed but vehicle has no vertical movement.

If the vehicle is in position- or velocity-control and ground contact was detected, the position controller will set the thrust vector along the body x-y-axis to zero.

#### Maybe Landed

This state is reached if following conditions are true for 0.25 seconds:

- all conditions of ground contact are true
- is not rotating ([LNDMC_ROT_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- has low thrust `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`

If the vehicle only has knowledge of thrust and angular rate, in order to proceed to the next state the vehicle has to have low thrust and no rotation for 8.0 seconds.

If the vehicle is in position or velocity control and maybe landed was detected, the position controller will set the thrust vector to zero.

#### Landed

This state is reached if following conditions are true for 0.3 seconds:

- all conditions of maybe landed are true