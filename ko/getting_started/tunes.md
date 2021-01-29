# 소리 설명 (Pixhawk 시리즈)

 Pixhawk 비행 컨트롤러 시리즈</ 0>는 가청 톤 / 튜닝 및 [ LED ](../getting_started/led_meanings.md)를 사용하여 차량 상태 및 이벤트 (예 : 무장 성공 및 실패, 배터리 부족 경고)를 나타냅니다.</p> 

표준 사운드 세트는 다음과 같습니다.

:::note
** 개발자 : ** 곡은 [ /lib/tunes/tune_definition.desc ](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/tunes/tune_definition.desc)에 정의되어 있으며 [ tune_control ](../modules/modules_system.md#tunecontrol) 모듈을 사용하여 테스트 할 수 있습니다.
:::

## 부팅 / 시작

이러한 곡은 부팅 과정에에 재생됩니다.<!-- https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/rcS -->

#### 시작 톤<audio controls> <source src="../../assets/tunes/1_startup_tone.mp3" type="audio/mpeg"> 브라우저가 오디오 기능을 지원하지 않습니다. </audio> 

- MicroSD 카드가 마운트되었습니다 (부팅 중).

#### 에러 톤<audio controls> <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg"> 브라우저가 오디오 기능을 지원하지 않습니다. </audio> 

- 중대 결함으로 인하여 시스템이 재부팅되었습니다.
- PX4IO를 사용하도록 시스템이 설정되었지만 IO가 없습니다.
- UAVCAN이 활성화되었지만 드라이버를 시작할 수 없습니다.
- SITL / HITL이 활성화되었지만 * pwm_out_sim * 드라이버를 시작할 수 없습니다.
- FMU 시작에 실패했습니다.

#### 파일 시스템 만들기<audio controls> <source src="../../assets/tunes/16_make_fs.mp3" type="audio/mpeg"> 브라우저가 오디오 기능을 지원하지 않습니다. </audio> 

- SD 카드 포맷하기 
- Mounting failed (if formatting succeeds boot sequence will try to mount again).
- No microSD card.

#### Format Failed<audio controls> <source src="../../assets/tunes/17_format_failed.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Formatting microSD card failed (following previous attempt to mount card).

#### Program PX4IO<audio controls> <source src="../../assets/tunes/18_program_px4io.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Starting to program PX4IO.

#### Program PX4IO Success<audio controls> <source src="../../assets/tunes/19_program_px4io_success.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- PX4IO programming succeeded.

#### Program PX4IO Fail<audio controls> <source src="../../assets/tunes/20_program_px4io_fail.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- PX4IO programming failed.
- PX4IO couldn't start.
- AUX Mixer not found.

## Operational

These tones/tunes are emitted during normal operation.

<span id="error_tune_operational"></span>

#### Error Tune<audio controls> <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- RC Loss

#### Notify Positive Tone<audio controls> <source src="../../assets/tunes/3_notify_positive_tone.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Calibration succeeded.
- Successful mode change.
- Command accepted (e.g. from MAVLink command protocol).
- Safety switch off (vehicle can be armed).

#### Notify Neutral Tone<audio controls> <source src="../../assets/tunes/4_notify_neutral_tone.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Mission is valid and has no warnings.
- Airspeed calibration: supply more air pressure, or calibration complete.
- Safety switch turned on/disarmed (safe to approach vehicle).

#### Notify Negative Tone<audio controls> <source src="../../assets/tunes/5_notify_negative_tone.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Calibration failed.
- Calibration already completed.
- Mission is invalid.
- Command denied, failed, temporarily rejected (e.g. from MAVLink command protocol).
- Arming/disarming transition denied (e.g. pre-flight checks failed, safety not disabled, system not in manual mode).
- Reject mode transition.

#### Arming Warning<audio controls> <source src="../../assets/tunes/6_arming_warning.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Vehicle is now armed.

#### Arming Failure Tune<audio controls> <source src="../../assets/tunes/10_arming_failure_tune.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

#### Battery Warning Slow<audio controls> <source src="../../assets/tunes/7_battery_warning_slow.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Low battery warning ([failsafe](../config/safety.md#low-battery-failsafe)).

#### Battery Warning Fast<audio controls> <source src="../../assets/tunes/8_battery_warning_fast.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Critical low battery warning ([failsafe](../config/safety.md#low-battery-failsafe)).

#### GPS Warning Slow<audio controls> <source src="../../assets/tunes/9_gps_warning_slow.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

#### Parachute Release<audio controls> <source src="../../assets/tunes/11_parachute_release.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

<!-- Does not appear to be used: TONE_PARACHUTE_RELEASE_TUNE -->

#### EKF Warning<audio controls> <source src="../../assets/tunes/12_ekf_warning.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

<!-- Does not appear to be used: TONE_EKF_WARNING_TUNE -->

#### Baro Warning<audio controls> <source src="../../assets/tunes/13_baro_warning.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

<!-- Does not appear to be used: TONE_BARO_WARNING_TUNE -->

#### Single Beep<audio controls> <source src="../../assets/tunes/14_single_beep.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Magnetometer/Compass calibration: Notify user to start rotating vehicle.

#### Home Set Tune<audio controls> <source src="../../assets/tunes/15_home_set_tune.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Home position initialised (first time only).