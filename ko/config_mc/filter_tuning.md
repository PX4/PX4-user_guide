# MC 필터 튜닝과 제어 지연

필터를 사용하여 비행 성능에 영향을 미치는 [제어 지연](#control-latency)과 비행 성능과 모터 상태에 영향을 미치는 소음 필터링을 절충할 수 있습니다.

제어 지연과 PX4 필터 튜닝에 관한 개요를 제공합니다.

:::note
필터 튜닝전에 [기본 MC PID 튜닝](../config_mc/pid_tuning_guide_multicopter_basic.md)에서 첫 번째 패스를 수행하여야 합니다. 차량은 저 조율 (**P** 및 **D** 게인을 너무 낮게 설정해야 함)하여 컨트롤러에서 소음으로 해석될 수있는 진동을 제거하여야 합니다 (기본 이득이 충분할 수 있습니다).
:::

## 제어 지연

*제어 지연*은 모터가 변화에 반응할 때까지 기체의 물리적 장애로 인한 지연을 의미합니다.

:::tip
지연 시간을 줄이면 **P** 증가율을 높일 수 있으므로 비행 성능이 향상됩니다. 1/1000초의 지연 시간도 큰 영향을 미칠 수 있습니다.
:::

다음의 요소들은 제어 지연에 영향을 끼칩니다.
- 부드러운 기체 또는 부드러운 진동 장착은 대기 시간을 증가시킵니다 (필터 역할을 함).
- 소프트웨어 및 센서 칩의 저주파 필터는 대기 시간 증가분을 상쇄하여 노이즈 필터링을 원활하게합니다.
- PX4 소프트웨어 내부 : 센서 신호를 드라이버에서 읽은 다음 컨트롤러를 통해 출력 드라이버로 전달하여야 합니다.
- 최대 자이로 게시 속도 ([IMU_GYRO_RATEMAX](../advanced_config/parameter_reference.md#IMU_GYRO_RATEMAX)로 설정됨). 속도가 높을수록 지연 시간이 줄어들지만 증간된 연산량으로 인하여 다른 프로세스를 방해할 수 있습니다. 4kHz 이상은 STM32H7 프로세서 이상의 컨트롤러에서만 권장됩니다 (2kHz 값은 성능이 낮은 프로세서의 최대치입니다).
- IO 칩 (MAIN 핀)은 AUX 핀 사용에 비해 약 5.4ms의 지연 시간을 추가합니다 (*Pixracer* 또는 *Omnibus F4*에는 적용되지 않지만 Pixhawk에는 적용됨) IO 지연을 방지하려면 [SYS_USE_IO](../advanced_config/parameter_reference.md#SYS_USE_IO)를 비활성화하고 모터를 AUX 핀에 대신 연결하십시오.
- PWM 출력 신호 : 대기 시간을 줄이기 위하여 [Dshot](.../en/peripherals/dshot.md) 또는 One-Shot ([PWM_AUX_RATE = 0](../advanced_config/parameter_reference.md#PWM_AUX_RATE) 또는 [PWM_MAIN_RATE = 0](../advanced_config/parameter_reference.md#PWM_MAIN_RATE))을 활성화합니다.

아래에서는 저주파 필터의 효과에 대하여 설명합니다.

## 필터

다음은 PX4 컨트롤러의 필터링 파이프 라인입니다.
- 자이로 센서용 온칩 DLPF. 비활성화가 가능한 모든 칩에서 비활성화됩니다 (그렇지 않은 경우, 차단 주파수가 칩의 최고 수준으로 설정됨).
- 로터 블레이드 통과 주파수의 고조파와 같은 협대역 노이즈를 필터링을 위한 자이로 센서 데이터의 노치 필터입니다. 이 필터는 [IMU_GYRO_NF_BW](../advanced_config/parameter_reference.md#IMU_GYRO_NF_BW) 및 [IMU_GYRO_NF_FREQ](../advanced_config/parameter_reference.md#IMU_GYRO_NF_FREQ)를 사용하여 설정할 수 있습니다.
- 자이로 센서 데이터에 대한 저주파 통과 필터. [IMU_GYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_GYRO_CUTOFF) 매개변수로 설정할 수 있습니다. :::note 샘플링과 필터링은 항상 전체 원시 센서 속도(일반적으로 IMU에 따라 8kHz)에서 수행됩니다.
:::
- D-term에 대한 별도의 저역 통과 필터. D-term은 노이즈에 가장 취약하지만 대기 시간이 약간 증가해도 성능에 나쁜 영향을 주지 않습니다. 이러한 이유로 D-term에는 별도로 구성 가능한 저역 통과 필터 [IMU_DGYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_DGYRO_CUTOFF)가 있습니다.
- 모터 출력의 슬루 레이트 필터 ([MOT_SLEW_MAX](../advanced_config/parameter_reference.md#MOT_SLEW_MAX)). 일반적으로 사용되지 않습니다.

제어 지연을 줄이기 위해 저역 통과 필터의 차단 주파수를 높이려고 합니다. `IMU_GYRO_CUTOFF` 증가로 인한 지연 시간에 미치는 영향은 대략 다음과 같습니다.

| 컷오프 (Hz) | 지연(대략). (ms) |
| -------- | ------------ |
| 30       | 8            |
| 60       | 3.8          |
| 120      | 1.9          |

However this is a trade-off as increasing `IMU_GYRO_CUTOFF` will also increase the noise of the signal that is fed to the motors. Noise on the motors has the following consequences:
- Motors and ESCs can get hot, to the point where they get damaged.
- Reduced flight time because the motors continuously change their speed.
- Visible random small twitches.

Setups that have a significant lower-frequency noise spike (e.g. due to harmonics at the rotor blade pass frequency) can benefit from using the notch filter to clean the signal before it is passed to the low pass filter (these harmonics have a similar detrimental impact on motors as other sources of noise). Without the notch filter you'd have to set the low pass filter cuttoff much lower (increasing the latency) in order to avoid passing this noise to the motors.

:::note
Only one notch filter is provided. Airframes with more than one low frequency noise spike typically clean the first spike with the notch filter, and subsequent spikes using the low pass filter.
:::

The best filter settings depend on the vehicle. The defaults are set conservatively — such that they work on lower-quality setups as well.

## Filter Tuning

First make sure to have the high-rate logging profile activated ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) parameter). [Flight Review](../getting_started/flight_reporting.md) will then show an FFT plot for the roll, pitch and yaw controls.

:::warning
- Do not try to fix a vehicle that suffers from high vibrations with filter tuning! Instead fix the vehicle hardware setup.
- Confirm that PID gains, in particular D, are not set too high as this can show up as vibrations.
:::

Filter tuning is best done by reviewing flight logs. You can do multiple flights right after each other with different parameters and then inspect all logs, but make sure to disarm in between so that separate log files are created.

The performed flight maneuver can simply be hovering in [Manual/Stabilized mode](../flight_modes/manual_stabilized_mc.md) with some rolling and pitching to all directions and some increased throttle periods. The total duration does not need to be more than 30 seconds. In order to better compare, the maneuver should be similar in all tests.

First tune the gyro filter [IMU_GYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_GYRO_CUTOFF) by increasing it in steps of 10 Hz while using a low D-term filter value ([IMU_DGYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_DGYRO_CUTOFF) = 30). Upload the logs to [Flight Review](https://logs.px4.io) and compare the *Actuator Controls FFT* plot. Set the cutoff frequency to a value before the noise starts to increase noticeably (for frequencies around and above 60 Hz).

Then tune the D-term filter (`IMU_DGYRO_CUTOFF`) in the same way. Note that there can be negative impacts on preformance if `IMU_GYRO_CUTOFF` and `IMU_DGYRO_CUTOFF` are set too far apart (the differences have to be significant though - e.g. D=15, gyro=80).

Below is an example for three different `IMU_DGYRO_CUTOFF` filter values (40Hz, 70Hz, 90Hz). At 90 Hz the general noise level starts to increase (especially for roll), and thus a cutoff frequency of 70 Hz is a safe setting. ![IMU_DGYRO_CUTOFF=40](../../assets/config/mc/filter_tuning/actuator_controls_fft_dgyrocutoff_40.png) ![IMU_DGYRO_CUTOFF=70](../../assets/config/mc/filter_tuning/actuator_controls_fft_dgyrocutoff_70.png) ![IMU_DGYRO_CUTOFF=90](../../assets/config/mc/filter_tuning/actuator_controls_fft_dgyrocutoff_90.png)

:::note
The plot cannot be compared between different vehicles, as the y axis scale can be different. On the same vehicle it is consistent and independent of the flight duration.
:::

If the flight plots shows significant low frequency spikes, like the one shown in the diagram below, you can remove it using a notch filter. In this case you might use the settings: [IMU_GYRO_NF_FREQ=32](../advanced_config/parameter_reference.md#IMU_GYRO_NF_FREQ) and [IMU_GYRO_NF_BW=5](../advanced_config/parameter_reference.md#IMU_GYRO_NF_BW) (note, this spike is narrower than usual). The low pass filters and the notch filter can be tuned independently (i.e. you don't need to set the notch filter before collecting the data for tuning the low pass filter).

![IMU_GYRO_NF_FREQ=32 IMU_GYRO_NF_BW=5](../../assets/config/mc/filter_tuning/actuator_controls_fft_gyro_notch_32.png)

## Additional Tips

1. Acceptable latency depends on vehicle size and expectations. FPV racers typically tune for the absolute minimal latency (as a ballpark `IMU_GYRO_CUTOFF` around 120, `IMU_DGYRO_CUTOFF` of 50 to 80). For bigger vehicles latency is less critical and `IMU_GYRO_CUTOFF` of around 80 might be acceptable.

1. You can start tuning at higher `IMU_GYRO_CUTOFF` values (e.g. 100Hz), which might be desirable because the default tuning of `IMU_GYRO_CUTOFF` is set very low (30Hz). The only caveat is that you must be aware of the risks:
   - Don't fly for more than 20-30 seconds
   - Check that the motors are not getting to hot
   - Listen for odd sounds and symptoms of excessive noise, as discussed above.
