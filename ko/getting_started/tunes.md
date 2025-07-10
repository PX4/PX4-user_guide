---
canonicalUrl: https://docs.px4.io/main/ko/getting_started/tunes
---

# 소리 설명 (Pixhawk 시리즈)

[ Pixhawk 비행 콘트롤러 시리즈](../flight_controller/pixhawk_series.md)는 가청 음향과 [LED](../getting_started/led_meanings.md)를 사용하여 기체 상태와 이벤트(예 : 시동 성공 및 실패, 배터리 부족 등)들을 표시합니다.

표준 사운드 세트는 다음과 같습니다.

:::note
**개발자:** 음향은 [/lib/tunes/tune_definition.desc ](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/tunes/tune_definition.desc)에 정의되어 있으며 [tune_control](../modules/modules_system.md#tune-control) 모듈을 사용하여 테스트 할 수 있습니다. You can search for tune use using the string `TUNE_ID_name`(e.g. `TUNE_ID_PARACHUTE_RELEASE)
:::


## 부팅 / 시작

부팅중에 재생되는 톤들입니다.
<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/ROMFS/px4fmu_common/init.d/rcS --> 


#### 시작 톤

<audio controls>
  <source src="../../assets/tunes/1_startup_tone.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- tune: 1, STARTUP -->

- MicroSD 카드가 마운트 되었습니다.

#### 에러 톤

<audio controls>
  <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- tune 2, ERROR_TUNE -->

- 중대 결함으로 인하여 시스템이 재부팅되었습니다.
- PX4IO를 사용하도록 시스템이 설정되었지만 IO가 없습니다.
- UAVCAN이 활성화되었지만 드라이버를 시작할 수 없습니다.
- SITL/HITL이 활성화되었지만 *pwm_out_sim* 드라이버를 시작할 수 없습니다.
- FMU 시작에 실패했습니다.


#### 파일 시스템 만들기

<audio controls>
  <source src="../../assets/tunes/16_make_fs.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 14, SD_INIT (previously tune 16) -->

- SD 카드 포맷하기
- 마운트 실패 (포맷이 성공하면 부팅 시퀀스가 다시 마운트를 시도합니다).
- MicroSD 카드가 없습니다.


#### 포맷 실패

<audio controls>
  <source src="../../assets/tunes/17_format_failed.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 15, SD_ERROR (previously 17) -->

- MicroSD 카드 포맷에 실패했습니다(이전 카드 마운트 시도 후).


#### 프로그램 PX4IO

<audio controls>
  <source src="../../assets/tunes/18_program_px4io.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 16, PROG_PX4IO (previously id 18) -->

- PX4IO 프로그래밍을 시작합니다.

#### 프로그램 PX4IO 성공

<audio controls>
  <source src="../../assets/tunes/19_program_px4io_success.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 17, PROG_PX4IO_OK (previously tune 19) -->

- PX4IO 프로그래밍이 성공했습니다.

#### 프로그램 PX4IO 실패

<audio controls>
  <source src="../../assets/tunes/20_program_px4io_fail.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 18, PROG_PX4IO_ERR (previously tune 20) -->

- PX4IO 프로그래밍에 실패했습니다.
- PX4IO를 시작할 수 없습니다.
- AUX 믹서를 찾을 수 없습니다.


## 운영

정상 작동시에 발생하는 톤들입니다.

<a id="error_tune_operational"></a>

#### 에러 톤

<audio controls>
  <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 2, ERROR_TUNE -->

- 원격 조종기 연결 유실

#### 긍정 음향 알림

<audio controls>
  <source src="../../assets/tunes/3_notify_positive_tone.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 3, NOTIFY_POSITIVE -->

- 보정 성공
- 모드 변경 성공
- 명령이 접수되었습니다 (예 : MAVLink 명령 프로토콜에서).
- 안전 스위치를 끕니다 (차량 시동 가능).

#### 중립 톤 알림

<audio controls>
  <source src="../../assets/tunes/4_notify_neutral_tone.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 4, NOTIFY_NEUTRAL -->

- 임무가 유효하며 경고는 없습니다.
- 대기 속도 보정: 더 많은 공기 압력을 공급하거나 보정이 완료되었습니다.
- 안전 스위치 켜짐 / 꺼짐 (안전하게 차량 접근 가능).

#### 부정 톤 알림

<audio controls>
  <source src="../../assets/tunes/5_notify_negative_tone.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 5, NOTIFY_NEGATIVE -->

- 보정 실패
- 보정 이미 완료
- 임무가 완전하지 않음.
- 명령이 거부, 실패, 일시적으로 거부되었습니다 (예 : MAVLink 명령 프로토콜에서).
- 시동/시동 해제가 거부되었습니다 (예 : 비행 전 점검 실패, 안전이 비활성화되지 않음, 시스템이 수동 모드가 아님).
- 모드 전환 거부

#### 시동 경고

<audio controls>
  <source src="../../assets/tunes/6_arming_warning.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 6, ARMING_WARNING -->

- 기체의 시동이 완료되었습니다.

#### 시동 실패음

<audio controls>
  <source src="../../assets/tunes/10_arming_failure_tune.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 10, ARMING_FAILURE -->

- 시동 실패

#### 배터리 경고음

<audio controls>
  <source src="../../assets/tunes/7_battery_warning_slow.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 7,  BATTERY_WARNING_SLOW -->

- 배터리 부족 경고 ([사고 방지](../config/safety.md#low-battery-failsafe)).

#### 배터리 심각 경고음

<audio controls>
  <source src="../../assets/tunes/8_battery_warning_fast.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 8, BATTERY_WARNING_FAST -->

- 배터리가 매우 부족([사고 방지](../config/safety.md#low-battery-failsafe)).


#### 느린 GPS 경고

<audio controls>
  <source src="../../assets/tunes/9_gps_warning_slow.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 9,  GPS_WARNING -->

#### 낙하산 방출

<audio controls>
  <source src="../../assets/tunes/11_parachute_release.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 11, PARACHUTE_RELEASE -->

- 낙하산이 펼쳤졌음.


#### 단일 경고음

<audio controls>
  <source src="../../assets/tunes/14_single_beep.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 12, SINGLE_BEEP (previously was id 14 -->

- 자력계/나침반 보정 : 차량 회전을 시작하도록 사용자에게 알립니다.

#### 홈 지정 음

<audio controls>
  <source src="../../assets/tunes/15_home_set_tune.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>
<!-- 13, HOME_SET (previously id 15) -->

- 홈 위치가 초기화되었습니다 (처음에만).

#### 전원 꺼짐 음

<audio controls>
  <source src="../../assets/tunes/power_off_tune.mp3" type="audio/mpeg">
브라우저가 오디오 기능을 지원하지 않습니다. 
</audio>

- 차량 전원 꺼짐.

<!--19, POWER_OFF -->
