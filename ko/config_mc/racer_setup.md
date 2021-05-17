# 레이서 설정

최적의 성능 (특히 [곡예 모드](../flight_modes/acro_mc.md))을 위해 레이서를 설정법을 설명합니다.

레이서들은 빠른 기동을 위해 설계된 기체임을 명심하십시오! 유경험자에게 도움을 받는 것이 좋습니다.

:::tip
여기에 설명된 많은 사항을 적용하여 다른 유형의 멀티콥터의 비행 성능을 개선 할 수도 있습니다.
:::

:::note
레이서는 일반적으로 일부 센서(예 : GPS)를 사용하지 않을 수도 있습니다. 결과적으로 사용 가능한 안전 장치 옵션은 적어집니다.
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
적분항는 불균형 설정을 나타내는 것이며, 용자 정의 믹서는 더 정확하게 나타낼 수 있습니다. 그러나 기체 설정으로 불균형을 수정하는 방법이 제일 좋습니다.
:::

### 모터 순서

[Hobbywing XRotor Micro 40A 4in1](http://www.hobbywing.com/goods.php?id=588)과 같은 4-in-1 ESC의 모터 순서는 PX4의 모터 순서와 다릅니다. PX4에서는 [MOT_ORDERING](../advanced_config/parameter_reference.md#MOT_ORDERING) 매개변수로 모터 순서를 변경할 수 있습니다. 4-in-1 ESC에서 일반적으로 사용되는 Betaflight/Cleanflight 모터 순서을 선택할 수 있습니다.

## 소프트웨어 설정

레이서를 조립 후에는 소프트웨어를 설정하여야 합니다.

[기본 설정 가이드](../config/README.md)를 참조하십시오. 특히, 자신의 프레임과 가장 일치하는 [Airframe](../config/airframe.md)을 설정합니다 (일반적으로 레이서 별 매개변수를 기본적으로 설정하는 [Generic 250 Racer](../airframes/airframe_reference.md#copter_quadrotor_x_generic_250_racer) 기체를 선택합니다).

중요한 매개 변수는 다음과 같습니다.

- One-Shot ([PWM_RATE](../advanced_config/parameter_reference.md#PWM_RATE)을 0으로 설정) 또는 DShot ([DSHOT_CONFIG](../advanced_config/parameter_reference.md#DSHOT_CONFIG))을 활성화합니다.
- 수동/안정화 모드의 최대 롤, 피치 및 요 속도를 설정합니다 : [MC_ROLLRATE_MAX](../advanced_config/parameter_reference.md#MC_ROLLRATE_MAX), [MC_PITCHRATE_MAX](../advanced_config/parameter_reference.md#MC_PITCHRATE_MAX) 및 [MC_YAWRATE_MAX](../advanced_config/parameter_reference.md#MC_YAWRATE_MAX). 최대 기울기 각도는 [MPC_MAN_TILT_MAX](../advanced_config/parameter_reference.md#MPC_MAN_TILT_MAX)로 설정합니다.
- 최소 추력 [MPC_MANTHR_MIN](../advanced_config/parameter_reference.md#MPC_MANTHR_MIN)은 0으로 설정합니다.

### 추정기

GPS를 사용하는 경우에는 이 섹션을 건너 뛰고 기본 추정기를 사용할 수 있습니다. 그렇지 않으면 자력계나 기압계를 사용하지 않는 Q 자세 추정기로 전환하여야 합니다.

이를 선택하려면 [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP)을 1로 설정하고 다음의 매개변수를 변경하십시오.

- 시스템에 자력계가없는 경우 [SYS_HAS_MAG](../advanced_config/parameter_reference.md#SYS_HAS_MAG)를 0으로 설정하십시오.
- Set [SYS_HAS_BARO](../advanced_config/parameter_reference.md#SYS_HAS_BARO) to 0 if the system does not have a barometer.
- Configure the Q estimator: set [ATT_ACC_COMP](../advanced_config/parameter_reference.md#ATT_ACC_COMP) to 0, [ATT_W_ACC](../advanced_config/parameter_reference.md#ATT_W_ACC) to 0.4 and [ATT_W_GYRO_BIAS](../advanced_config/parameter_reference.md#ATT_W_GYRO_BIAS) to 0. You can tune these later if you wish.

### Failsafe

Configure [RC loss and low battery failsafe](../config/safety.md). If you do not use a GPS, set the failsafe to **Lockdown**, which turns off the motors. Test RC loss on the bench without props attached by turning off the remote when the vehicle is armed.

Make sure to assign a [kill switch](../config/safety.md#kill_switch) or an [arming switch](../config/safety.md#arming_switch). Test it and train to use it!

### PID Tuning

:::note
Make sure to calibrate the ESCs before doing any tuning.
:::

At this point you should be ready for a first test flight.

Assuming the vehicle is able to fly using the default settings, we then do a first pass of [Basic MC PID tuning](../config_mc/pid_tuning_guide_multicopter_basic.md). The vehicle needs to be **undertuned** (the **P** and **D** gains should be set too low), such that there are no oscillations from the controller that could be interpreted as noise (the default gains might be good enough). This is important for the [filter](#filters) tuning (there will be a second PID tuning round later).

### Control Latency

The *control latency* is the delay from a physical disturbance of the vehicle until the motors react to the change.

:::tip
It is *crucial* to reduce the control latency as much as possible! A lower latency allows you to increase the rate **P** gains, which means better flight performance. Even one millisecond added to the latency makes a difference.
:::

These are the factors that affect the latency:

- A soft airframe or soft vibration mounting increases latency (they act as a filter).
- [Low-pass filters](../config_mc/filter_tuning.md) in software and on the sensor chip trade off increased latency for improved noise filtering.
- PX4 software internals: the sensor signals need to be read in the driver and then pass through the controller to the output driver.
- The IO chip (MAIN pins) adds about 5.4 ms latency compared to using the AUX pins (this does not apply to a *Pixracer* or *Omnibus F4*, but does apply to a Pixhawk). To avoid the IO delay, disable [SYS_USE_IO](../advanced_config/parameter_reference.md#SYS_USE_IO) and attach the motors to the AUX pins instead.
- PWM output signal: enable One-Shot to reduce latency ([PWM_RATE](../advanced_config/parameter_reference.md#PWM_RATE)=0).

### Filter Tuning

Filters trade off control latency and noise filtering, both of which impact performance. For information see: [Filter/Control Latency Tuning](../config_mc/filter_tuning.md)

### PID Tuning (Second Round)

Now do a second round of PID tuning, this time as tight as possible, and also tuning the thrust curve.

:::tip
You can use the approach described in [Basic MC PID tuning](../config_mc/pid_tuning_guide_multicopter_basic.md) to tune the frame, but you will need to use the [Advanced Multicopter PID Tuning Guide (Advanced/Detailed)](../config_mc/pid_tuning_guide_multicopter.md#thrust-curve) to understand how to tune the thrust curve.

### Airmode

After you have verified that the vehicle flies well at low and high throttle, you can enable [airmode](../config_mc/pid_tuning_guide_multicopter.md#airmode) with the [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) parameter. This feature makes sure that the vehicle is still controllable and tracks the rate at low throttle.

Happy flipping :)