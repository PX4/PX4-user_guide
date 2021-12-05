# 고정익 튜닝 가이드

This guide explains how to manually tune the fixed wing PID loop. It is intended for advanced users / experts, as incorrect PID tuning may crash your aircraft.

:::note
[Autotune](../config/autotune.md) is recommended for most users, as it is far faster, easier and provides good tuning for most frames. Manual tuning is recommended for frames where autotuning does not work, or where fine-tuning is essential.
:::

:::tip
Tuning parameters are documented in the [Parameter Reference](../advanced_config/parameter_reference.md). The most important parameters are covered in this guide.
:::

## Preconditions

- 튜닝 게인을 잘못 설정하면 자세 제어가 불안정해질 수 있습니다. 조종사 튜닝 게인은 [수동](../flight_modes/manual_fw.md) 제어로 비행기를 비행하고 착륙할 수 있어야합니다.
- 과도한 게인 (및 빠른 서보 모션)은 기체의 최대 힘을 위반할 수 있습니다. 게인을 신중하게 시켜야합니다.
- 롤과 피치 튜닝의 순서는 같습니다. 차이점은 피치가 트림 오프셋에 더 민감하므로 [트리밍](../config_fw/trimming_guide_fixedwing.md)을 신중하게 수행해야하며, 적분 게인은 이를 보상하기 위하여 더 많은 주의가 필요합니다.

## Establishing the Airframe Baseline

If a pilot capable of manual flight is available, its best to establish a few core system properties on a manual trial. To do this, fly these maneuvers. Even if you can't note all the quantities immediately on paper, the log file will be very useful for later tuning.

:::note
All these quantities will be automatically logged. You only need to take notes if you want to directly move on to tuning without looking at the log files.

- 편리한 속도로 수평 비행하십시오. 스로틀 스틱 위치와 대기 속도를 기록하십시오 (예 : 70 % → 0.7 스로틀, 15m/s 대기 속도).
- 최대 스로틀과 10-30 초 동안 충분한 대기 속도로 상승하십시오 (예 : 12m/s 대기 속도, 30초에 100m 상승).
- 스로틀이 0이고 적절한 대기 속도로 10-30초 동안 하강합니다 (예 : 18m/s 대기 속도, 30초에 80m 하강).
- 60도 롤이 될 때까지 전체 롤 스틱을 사용하여 오른쪽으로 강하게 쌓은 다음 반대쪽에서 60도까지 전체 롤 스틱으로 왼쪽으로 강하게 저장합니다.
- 45도를 높이고 45도를 낮춥니다.
:::

This guide will use these quantities to set some of the controller gains later on.

## Tune Roll

Tune first the roll axis, then pitch. The roll axis is safer as an incorrect tuning leads only to motion, but not a loss of altitude.

### 피드포워드 게인 조정

To tune this gain, set the other gains to zero.

#### 0으로 설정하는 게인

- FW_RR_I = 0
- FW_RR_P = 0
- FW_RSP_OFF = 0

#### 튜닝 대상 게인

- [FW_RR_FF](../advanced_config/parameter_reference.md#FW_RR_FF) - 0.4에서 시작합니다. 비행기가 만족스럽게 구르고 설정 값에 도달시까지 이 값을 늘립니다 (매번 두 배로 증가). 프로세스가 끝나면 게인을 20% 낮춥니 다.

### 속도 게인 조정

- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P) - 0.06 값에서 시작합니다. 시스템이 흔들리거나 트위치를 시작할 때까지 이 값을 늘립니다 (매번 두 배로 증가). 그런 다음 게인을 50% 줄입니다.

### 적분기 게인으로 트림 오프셋 조정

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I) - 0.01의 값에서 시작합니다. 명령된 롤 값과 실제 롤 값 사이에 오프셋이 없을 때까지이 값을 늘립니다 (매번 두 배로 증가) (로그 파일을 확인해야 할 가능성이 높음).

## Tune Pitch

The pitch axis might need more integrator gain and a correctly set pitch offset.

### 피드포워드 게인 조정

To tune this gain, set the other gains to zero.

#### 0으로 설정하는 게인

- FW_PR_I = 0 
- FW_PR_P = 0 
- FW_PSP_OFF = 0 

#### 튜닝 대상 게인

- [FW_PR_FF](../advanced_config/parameter_reference.md#FW_PR_FF) - 0.4 값에서 시작합니다. 평면 피치가 만족스럽고 설정 값에 도달시 까지이 값을 늘립니다 (매번 두 배로 증가). 프로세스가 끝나면 게인을 20% 낮춥니 다.

### 속도 게인 조정

- [FW_PR_P](../advanced_config/parameter_reference.md#FW_PR_P) - 0.04의 값에서 시작합니다. 시스템이 흔들리거나 트위치를 시작할 때까지 이 값을 늘립니다 (매번 두 배로 증가). 그런 다음 게인을 50% 줄입니다.

### 적분기 게인으로 트림 오프셋 조정

- [FW_PR_I](../advanced_config/parameter_reference.md#FW_PR_I) - 0.01의 값에서 시작합니다. 명령된 피치 값과 실제 피치 값 사이에 오프셋이 없을 때까지이 값을 늘립니다 (매번 두 배로 증가) (로그 파일을 확인해야 할 가능성이 높음).

## Adjusting the Time Constant of the Outer Loop

The overall softness / hardness of the control loop can be adjusted by the time constant. The default of 0.5 seconds should be fine for normal fixed-wing setups and usually does not require adjustment.

- [FW_P_TC](../advanced_config/parameter_reference.md#FW_P_TC)-기본값 0.5 초로 설정하고, 피치 응답을 부드럽게하려면 증가시키고, 응답을 둔화하려면 감소시킵니다.
- [FW_R_TC](../advanced_config/parameter_reference.md#FW_R_TC) -기본값 0.5 초로 설정하고, 롤 응답을 부드럽게하려면 증가시키고, 응답을 둔화하려면 감소시킵니다.