---
canonicalUrl: https://docs.px4.io/main/ko/config_mc/racer_setup
---

# 레이서 설정

레이서의 최적의 성능 (특히 [곡예 모드](../flight_modes/acro_mc.md))을 위한 설정법을 설명합니다.

레이서들은 빠른 기동을 위해 설계된 기체입니다. 가능하면, 유경험자에게 도움을 받는 것이 좋습니다.

:::tip
여기에 설명된 사항은 다른 유형의 멀티콥터의 성능을 개선할 수도 있습니다.
:::

:::note
일반적으로 레이서는 일부 센서(예 : GPS)들을 사용하지 않을 수도 있습니다.
결과적으로 사용 가능한 안전 장치 옵션은 적어지는 것입니다.
:::

## 빌드 옵션

일반적으로 레이서는 일부 센서들을 사용하지 않습니다.

자이로와 가속도계만을 사용하는 최소 구성을 할 수 있습니다.

:::note
보드에 내부 자력계가 있는 경우 사용해서는 안됩니다 (작은 레이서가 특히 강한 전자기 간섭을 받기 쉽습니다).
:::

레이서에는 일반적으로 중량 중가 문제와 충돌시 파손 문제로 인하여 GPS가 없습니다 (GPS + 외부 자력계는 자기 간섭을 피하기 위해 고전류에서 멀리 떨어진 GPS 마스트에 배치해야합니다. 이는 쉽게 파손될 수 있음을 의미합니다.)

그러나 GPS를 추가시에는 초보자들에게 이로운 점이 몇 가지 있습니다.
- 위치 유지모드에서 기체가 한 곳에 머물 수 있습니다. 방향을 잃거나 브레이크가 필요한 경우에 매우 편리합니다. 또한 안전하게 착륙할 수 있습니다.
- [귀환 모드](../flight_modes/return.md) 스위치 또는 RC 손실 또는 배터리 부족시의 안전 장치로 사용할 수 있습니다.
- 충돌시의 마지막 위치를 파악할 수 있습니다.
- 로그에는 비행 트랙이 포함되어 있으므로 비행을 검토할 수 있습니다 (3D). 이것은 곡예 비행 기술을 향상에 많은 도움이 됩니다.

:::note
공격적인 곡예 기동 중에는 GPS가 잠시 동안 위치를 파악하지 못할 수도 있습니다. 이 시간 동안 [위치 모드](../flight_modes/position_mc.md)로 전환하면 위치 값이 유효해질 때 까지 [고도모드](../flight_modes/altitude_mc.md)가 대신 작용합니다.
:::

## 하드웨어 설정

다음 단락에서는 기체 제작시 몇 가지 중요한 사항에 대하여 설명합니다. 자세한 조립 방법은 다음을 참고하십시오. [QAV-R 5 "KISS ESC Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) 조립 방법

### 진동 설정

진동을 줄이기 위한 여러가지 조립 방법이 있습니다. 예를 들어, 비행 컨트롤러는 진동 완화 폼이나 [O-링](../frames_multicopter/qav_r_5_kiss_esc_racer.md#mounting)을 사용하여 조립할 수 있습니다.

최고의 방법은 없지만, [QAV-R 5 "KISS ESC Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md)에서 사용하는 고품질 부품(프레임, 모터, 소품)들을 사용하면 진동 문제가 일반적으로 적어집니다.

**균형 프로펠러**을 사용하십시오.

### 무게 중심

무게 중심이 추력 중심에서 최대한 가까워야 합니다. 좌우 균형은 일반적으로 문제가 되지 않지만, 전후 균형은 문제가 될 수 있습니다. 배터리의 적당한 위치를 표시하여 항상 같은 위치에 장착하는 것이 좋습니다.

:::note
적분항는 불균형 설정을 나타내는 것이며, 용자 정의 믹서는 더 정확하게 나타낼 수 있습니다.
그러나 기체 설정으로 불균형을 수정하는 방법이 제일 좋습니다.
:::

### 모터 순서
[Hobbywing XRotor Micro 40A 4in1](http://www.hobbywing.com/goods.php?id=588)과 같은 4-in-1 ESC의 모터 순서는 PX4의 모터 순서와 다릅니다. PX4에서는 [MOT_ORDERING](../advanced_config/parameter_reference.md#MOT_ORDERING) 매개변수로 모터 순서를 변경할 수 있습니다. 4-in-1 ESC에서 일반적으로 사용되는 Betaflight/Cleanflight 모터 순서을 선택할 수 있습니다.

## 소프트웨어 설정

레이서를 조립 후에는 소프트웨어를 설정하여야 합니다.

[기본 설정 가이드](../config/README.md)를 참조하십시오. 특히, 자신의 프레임과 가장 일치하는 [Airframe](../config/airframe.md)을 설정합니다 (일반적으로 레이서 별 매개변수를 기본적으로 설정하는 [Generic 250 Racer](../airframes/airframe_reference.md#copter_quadrotor_x_generic_250_racer) 기체를 선택합니다).

중요한 매개 변수는 다음과 같습니다.
- Enable One-Shot (set [PWM_MAIN_RATE](../advanced_config/parameter_reference.md#PWM_MAIN_RATE) to 0) or DShot ([DSHOT_CONFIG](../advanced_config/parameter_reference.md#DSHOT_CONFIG)).
- 수동/안정화 모드의 최대 롤, 피치 및 요 속도를 설정합니다 : [MC_ROLLRATE_MAX](../advanced_config/parameter_reference.md#MC_ROLLRATE_MAX), [MC_PITCHRATE_MAX](../advanced_config/parameter_reference.md#MC_PITCHRATE_MAX) 및 [MC_YAWRATE_MAX](../advanced_config/parameter_reference.md#MC_YAWRATE_MAX). 최대 기울기 각도는 [MPC_MAN_TILT_MAX](../advanced_config/parameter_reference.md#MPC_MAN_TILT_MAX)로 설정합니다.
- 최소 추력 [MPC_MANTHR_MIN](../advanced_config/parameter_reference.md#MPC_MANTHR_MIN)은 0으로 설정합니다.

### 추정기

GPS를 사용하는 경우에는 이 섹션을 건너 뛰고 기본 추정기를 사용할 수 있습니다. 그렇지 않으면 자력계나 기압계를 사용하지 않는 Q 자세 추정기로 전환하여야 합니다.

이를 선택하려면 [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP)을 1로 설정하고 다음의 매개변수를 변경하십시오.
- 시스템에 자력계가 없는 경우 [SYS_HAS_MAG](../advanced_config/parameter_reference.md#SYS_HAS_MAG)를 0으로 설정하십시오.
- 시스템에 기압계가 없는 경우 [SYS_HAS_BARO](../advanced_config/parameter_reference.md#SYS_HAS_BARO)를 0으로 설정하십시오.
- Q 추정기를 설정합니다. [ATT_ACC_COMP](../advanced_config/parameter_reference.md#ATT_ACC_COMP)를 0으로, [ATT_W_ACC](../advanced_config/parameter_reference.md#ATT_W_ACC)를 0.4로, [ATT_W_GYRO_BIAS](../advanced_config/parameter_reference.md#ATT_W_GYRO_BIAS)를 0으로 설정합니다. 필요한 경우에 차후에 튜닝할 수 있습니다.

### 안전장치

[RC 손실 및 배터리 안전 장치](../config/safety.md)를 설정합니다. GPS를 사용하지 않는 경우 안전 장치를 **잠금**으로 설정하면 모터가 꺼집니다. 차량이 시동이 켜지면 리모컨을 꺼서 프로펠러를 제거한 다음에, 벤치에서 RC 손실을 테스트합니다.

Make sure to assign a [kill switch](../config/safety.md#kill-switch) or an [arming switch](../config/safety.md#arm-disarm-switch). 테스트하고 연습을 충분히 하여야 합니다.


### PID 튜닝

:::note
PID 튜닝을 전에 ESC를 먼저 튜닝하십시오.
:::

이 시점에서 첫 번째 테스트 비행을 준비하여야 합니다.

기체의 기본 설정으로 비행이 가능하면, [기본 MC PID 튜닝](../config_mc/pid_tuning_guide_multicopter_basic.md)의 첫 번째 과정을 수행합니다. 기체는 **저 조율**하여야 합니다 (**P** 및 **D** 게인은 낮게 설정함). 컨트롤러에서 발생하는 진동이 없어야합니다. 잡음으로 해석되어 질 수 있습니다 (기본 이득이 충분할 수 있음). 이것은 [필터 튜닝](#filter-tuning)에 중요합니다 (나중에 두 번째 PID 튜닝이 있습니다).


### 제어 지연

*제어 지연*은 모터가 변화에 반응할 때까지 기체의 물리적 장애로 인한 지연을 의미합니다.

:::tip
제어 지연시간을 최대한 줄이는 것이 *중요*합니다! 지연 시간이 짧을수록 **P** 이득을 높일 수 있으며, 비행 성능 향상을 의미하는 것입니다. 지연 시간은 1/1000 초가 추가 되어도 현격한 차이를 나타냅니다.
:::

지연 시간에 영향을 미치는 요인은 다음과 같습니다.
- 부드러운 기체 또는 부드러운 진동 장착은 지연 시간을 증가시킵니다 (필터 역할을 함).
- 소프트웨어 및 센서 칩의 [저역 통과 필터](../config_mc/filter_tuning.md)는 지연시간 증가분을 상쇄하여 노이즈 필터링을 원활하게 합니다.
- PX4 소프트웨어 내부 : 센서 신호를 드라이버에서 읽은 다음 컨트롤러를 통해 출력 드라이버로 전달하여야 합니다.
- IO 칩 (MAIN 핀)은 AUX 핀 사용에 비해 약 5.4ms의 지연 시간을 추가합니다 (*Pixracer* 또는 *Omnibus F4*에는 적용되지 않지만 Pixhawk에는 적용됨) IO 지연을 방지하려면 [SYS_USE_IO](../advanced_config/parameter_reference.md#SYS_USE_IO)를 비활성화하고 모터를 AUX 핀에 대신 연결하십시오. IO 지연을 방지하려면 [SYS_USE_IO](../advanced_config/parameter_reference.md#SYS_USE_IO)를 비활성화하고 모터를 AUX 핀에 대신 연결하십시오.
- PWM 출력 신호 : One-Shot을 활성화하여 지연 시간을 줄입니다 ([PWM_MAIN_RATE](../advanced_config/parameter_reference.md#PWM_MAIN_RATE) = 0).

### 필터 튜닝

필터는 성능에 영향을 미치는 제어 대기 시간과 노이즈 필터링을 절충합니다. 자세한 내용은 [필터/제어 지연 시간 튜닝 ](../config_mc/filter_tuning.md)편을 참고하십시오.

### PID 튜닝 (두 번째 단계)

이제 두 번째 PID 튜닝을 수행합니다. 이번에는 가능한 한 빡빡하게하고 추력 곡선도 튜닝합니다.

:::tip
[기본 MC PID 튜닝](../config_mc/pid_tuning_guide_multicopter_basic.md)의 접근 방식으로 프레임을 튜닝할 수 있으며, 자세한 방법은 [고급 멀티 콥터 PID 튜닝 가이드 (고급/상세) ](../config_mc/pid_tuning_guide_multicopter.md#thrust-curve)를 사용하여야 합니다. 추력 곡선을 조정합니다.

### 에어모드

기체가 낮은 스로틀과 높은 스로틀에서 잘 비행하는지 확인한 후 [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) 매개변수로 [에어 모드](../config_mc/pid_tuning_guide_multicopter.md#airmode)를 활성화할 수 있습니다. 이 기능은 기체가 제어 가능하고 낮은 스로틀에서 속도를 추적하도록 합니다.

행복한 뒤집기 :)
