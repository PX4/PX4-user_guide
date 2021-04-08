# 비행 중단 설정

*비행 중단* [failsafe](../config/safety.md#failsafe_actions)는 안전 점검</1>(예. 기체 유형과 비행 모드가 무엇이든 RC 연결 끊김, geofence를 벗어남 등이 발생할 때)또는 [Failure Detector](../config/safety.md#failure_detector)에 의해 작동합니다. </p> 

*비행 중단*이 활성화되면, PX4는 동시에 모든 컨트롤러를 중단하고 모든 PWM출력값을 failsafe 값으로 변경합니다.

연결된 장치에 따라 PWM failsafe 출력은 다음과 같이 활용 될 수 있습니다.

- [낙하산](../peripherals/parachute.md) 펼치기.
- 랜딩기어 펼치기.
- 카메라를 보호하기 위해 PWM방식으로 연결된 짐벌을 안전 각도(또는 수납 위치) 로 움직이기.
- 에어백 같은 팽창 장비 가동하기.
- 알람 울리기.

비행 중단을 취소하고 되돌리는 방법은 없습니다. 비행 중단이 시행되면 가능한 빨리 배터리를 분리하십시오. 기체를 다시 사용하기 전에 재부팅하거나 전원을 껐다 켜야 합니다.

:::tip PX4 does not know what safety devices are attached - it just applies a predefined set of PWM values to its outputs.
:::

:::tip
Failsafe values are applied to all outputs on termination. There is no way to configure independent time-based (or other) triggering of the motors or specific safety devices.
:::

:::note
This is *not* an independent *Flight Termination System*. If power is lost or if the autopilot crashes completely, the failsafe devices will not be triggered.
:::

## 하드웨어 설정

[안전](../config/safety.md) 주제는 *비행 중단*을 특정 failsafe 점검을 위해 수행되는 failsafe 작동</ 2>로 설정하는 방법을 설명합니다.</p> 

:::note
If you're using Pixhawk-series board you will have to separately power the servo rail (i.e. from a 5V BEC, which is often also available from your ESC).
:::

## 소프트웨어 설정

안전 장치에 연결된 각각의 MAIN포트 출력에 대해 다음을 설정하십시오. "n"은 PWM 포트 번호입니다:

안전 장치에 연결된 각각의 AUX포트 출력에 대해 다음을 설정하십시오. "n"은 PWM 포트 번호입니다:

- [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM)을 설정하여 failure detector를 활성화하십시오.
- [Safety > Failure Detector > Attitude Trigger](../config/safety.md#attitude_trigger)는 *비행 중단*을 시작하는 한계 attitude를 구성하는 방법을 설명합니다. **참고** *이륙*중의 과한 attitude는 비행 중단 대신 *lockdown*(모터를 정지시키지만 낙하산을 발사하지 않음)을 시작합니다. lockdown은 `CBRK_FLIGHTTERM`의 값에 관계없이 항상 활성화됩니다.
:::
- [Safety > External Automatic Trigger System (ATS)](../config/safety.md#external_ats)은 외부 트리거 시스템을 설정하는 방법에 대해 설명합니다.

마지막으로, 다른 모터에 대해 `PWM_AUX_FAILn`과 `PWM_MAIN_FAILn`의 PWM 값을 설정하십시오.

- [PWM_MAIN_DISn](../advanced_config/parameter_reference.md#PWM_MAIN_DIS1)을 장치의 "OFF" PWM값으로 설정
- [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1)을 장치의 "ON" PWM값으로 설정

아래의 다이어그램은 비행 중단과 관련된 논리적 흐름을 보여 줍니다.

- [PWM_AUX_DISn](../advanced_config/parameter_reference.md#PWM_AUX_DIS1)을 장치의 "OFF" PWM값으로 설정
- [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1)을 장치의 "ON" PWM값으로 설정

Finally, set the `PWM_AUX_FAILn` and `PWM_MAIN_FAILn` PWM values for any motors.

## 로직 다이어그램

The diagram below shows the logical flow around flight termination.

![Logic diagram](../../assets/config/flight_termination_logic_diagram.png)