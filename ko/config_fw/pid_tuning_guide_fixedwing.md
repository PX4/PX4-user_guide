# 고정익 튜닝 가이드

이 가이드는 고정익 PID 계수를 튜닝 방법을 설명합니다.

:::warning
이 가이드는 고급 사용자와 전문가를 위한 것입니다. PID 튜닝이 잘못되면 기체가 충돌할 수 있습니다.
:::

:::note

- 튜닝 게인을 잘못 설정하면 자세 제어가 불안정해질 수 있습니다. 조종사 튜닝 게인은 [수동](../flight_modes/manual_fw.md) 제어로 비행기를 비행하고 착륙할 수 있어야합니다.
- 과도한 게인 (및 빠른 서보 모션)은 기체의 최대 힘을 위반할 수 있습니다. 게인을 신중하게 시켜야합니다.
- 롤과 피치 튜닝의 순서는 같습니다. 차이점은 피치가 트림 오프셋에 더 민감하므로 [트리밍](../config_fw/trimming_guide_fixedwing.md)을 신중하게 수행해야하며, 적분 게인은 이를 보상하기 위하여 더 많은 주의가 필요합니다.
:::

:::tip
모든 매개변수는 [매개변수 정의](../advanced_config/parameter_reference.md)편에 기술되어 있습니다. 이 가이드에서는 중요한 매개변수들을 설명합니다.
:::

## 기체 기준선 설정

수동 비행이 가능하면, 수동 비행 시험에서 몇 가지 중요 시스템 속성을 설정하는 것이 가장 좋은 방법입니다. 이렇게 하려면, 충분한 비행 연습이 필요합니다. 모든 데이터를 종이에 즉시 기록할 수 없더라도, 로그 파일은 차후 튜닝시에 매우 유용합니다.

:::note
아래의 모든 데이터는 자동으로 기록됩니다. 로그 파일을 보지 않고 직접 튜닝할 경우에만 데이터를 메모합니다.

- 편리한 속도로 수평 비행하십시오. 스로틀 스틱 위치와 대기 속도를 기록하십시오 (예 : 70 % → 0.7 스로틀, 15m/s 대기 속도).
- 최대 스로틀과 10-30 초 동안 충분한 대기 속도로 상승하십시오 (예 : 12m/s 대기 속도, 30초에 100m 상승).
- 스로틀이 0이고 적절한 대기 속도로 10-30초 동안 하강합니다 (예 : 18m/s 대기 속도, 30초에 80m 하강).
- 60도 롤이 될 때까지 전체 롤 스틱을 사용하여 오른쪽으로 강하게 쌓은 다음 반대쪽에서 60도까지 전체 롤 스틱으로 왼쪽으로 강하게 저장합니다.
- 45도를 높이고 45도를 낮춥니다.
:::

이 가이드에서는 이러한 데이터를 사용하여 나중에 컨트롤러 게인중 일부를 설정합니다.

## 롤 튜닝

먼저 롤 축을 튜닝후에 피치를 튜닝합니다. 롤 축 튜닝이 잘 못 되어도, 고도 손실은 발생하지 않으므로 롤 축 튜닝이 더 안전합니다.

### 피드포워드 게인 조정

To tune this gain, set the other gains to zero.

#### Gains to set to zero

- FW_RR_I = 0
- FW_RR_P = 0
- FW_RSP_OFF = 0

#### Gains to tune

- [FW_RR_FF](../advanced_config/parameter_reference.md#FW_RR_FF) - start with a value of 0.4. Increase this value (doubling each time) until the plane rolls satisfactorily and reaches the setpoint. Back down the gain 20% at the end of the process.

### Tuning the Rate Gain

- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P) - start with a value of 0.06. Increase this value (doubling each time) until the system starts to wobble / twitch. Then reduce gain by 50%.

### Tuning the Trim Offsets with the Integrator Gain

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I) - start with a value of 0.01. Increase this value (doubling each time) until there is no offset between commanded and actual roll value (this will most likely require looking at a log file).

## Tune Pitch

The pitch axis might need more integrator gain and a correctly set pitch offset.

### Tuning the Feedforward Gain

To tune this gain, set the other gains to zero.

#### Gains to set to zero

- FW_PR_I = 0
- FW_PR_P = 0
- FW_PSP_OFF = 0

#### Gains to tune

- [FW_PR_FF](../advanced_config/parameter_reference.md#FW_PR_FF) - start with a value of 0.4. Increase this value (doubling each time) until the plane pitches satisfactory and reaches the setpoint. Back down the gain 20% at the end of the process.

### Tuning the Rate Gain

- [FW_PR_P](../advanced_config/parameter_reference.md#FW_PR_P) - start with a value of 0.04. Increase this value (doubling each time) until the system starts to wobble / twitch. Then reduce value by 50%.

### Tuning the Trim Offsets with the Integrator Gain

- [FW_PR_I](../advanced_config/parameter_reference.md#FW_PR_I) - start with a value of 0.01. Increase this value (doubling each time) until there is no offset between commanded and actual pitch value (this will most likely require looking at a log file).

## Adjusting the Time Constant of the Outer Loop

The overall softness / hardness of the control loop can be adjusted by the time constant. The default of 0.5 seconds should be fine for normal fixed-wing setups and usually does not require adjustment.

- [FW_P_TC](../advanced_config/parameter_reference.md#FW_P_TC) - set to a default of 0.5 seconds, increase to make the Pitch response softer, decrease to make the response harder.
- [FW_R_TC](../advanced_config/parameter_reference.md#FW_R_TC) - set to a default of 0.5 seconds, increase to make the Roll response softer, decrease to make the response harder.