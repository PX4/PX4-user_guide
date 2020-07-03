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

> **팁** PX4는 어떤 안전 장비가 기체에 장착되어있는지 알지 못합니다. PX4는 단순히 사전 정의된 PWM값을 출력으로 적용하게 됩니다.

<span></span>

> **팁** Failsafe 값은 종료시 모든 출력에 적용됩니다. 모터 또는 특정 안전 장비의 시작을 시간 순으로(또는 어떤 방법으로든) 독립적으로 구성하는 방법은 없습니다. (PX4는 비행 중단이 시작되면 모든 포트의 PWM 값을 failsafe모드의 값으로 즉시 바꾸게 됩니다.)

<span></span>

> **Note** 이것은 기체에 독립적인 *비행 중단 시스템*이 *아닙니다*. 전력이 손실되거나 Autopilot이 완전히 부서지면 failsafe 장치는 작동하지 않습니다. 

## 하드웨어 설정

PWM 값을 변경하여 작동하는 모든 *안전 장치* (예 : [낙하산](../peripherals/parachute.md))를 사용할 수 있으며, 비어있는 아무 PWM 포트(MAIN과 AUX 모두를 포함)에 안전 장치를 연결할 수 있습니다

> **참고** Pixhawk 시리즈 보드를 사용하는 경우 서보 레일에 별도로 전원을 공급해야합니다. (예 : ESC에 많이 사용하는 5V BEC)

## 소프트웨어 설정

[안전](../config/safety.md) 주제는 *비행 중단*을 특정 failsafe 점검을 위해 수행되는 failsafe 작동</ 2>로 설정하는 방법을 설명합니다.</p> 

[Failure Detector](../config/safety.md#failure_detector)는 차량이 뒤집히거나(특정 자세를 초과한 경우) 외부 자동 트리거 시스템(ATS)에 의해 고장이 감지되는 경우 비행 종료를 시작하도록 선택적으로 구성 할 수 있습니다.

- [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM)을 설정하여 failure detector를 활성화하십시오.
- [Safety > Failure Detector > Attitude Trigger](../config/safety.md#attitude_trigger)는 *비행 중단*을 시작하는 한계 attitude를 구성하는 방법을 설명합니다. **참고** *이륙*중의 과한 attitude는 비행 중단 대신 *lockdown*(모터를 정지시키지만 낙하산을 발사하지 않음)을 시작합니다. lockdown은 `CBRK_FLIGHTTERM`의 값에 관계없이 항상 활성화됩니다.
- [Safety > External Automatic Trigger System (ATS)](../config/safety.md#external_ats)은 외부 트리거 시스템을 설정하는 방법에 대해 설명합니다.

안전 장치에 연결된 각각의 MAIN포트 출력에 대해 다음을 설정하십시오. "n"은 PWM 포트 번호입니다:

- [PWM_MAIN_DISn](../advanced_config/parameter_reference.md#PWM_MAIN_DIS1)을 장치의 "OFF" PWM값으로 설정
- [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1)을 장치의 "ON" PWM값으로 설정

안전 장치에 연결된 각각의 AUX포트 출력에 대해 다음을 설정하십시오. "n"은 PWM 포트 번호입니다:

- [PWM_AUX_DISn](../advanced_config/parameter_reference.md#PWM_AUX_DIS1)을 장치의 "OFF" PWM값으로 설정
- [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1)을 장치의 "ON" PWM값으로 설정

마지막으로, 다른 모터에 대해 `PWM_AUX_FAILn`과 `PWM_MAIN_FAILn`의 PWM 값을 설정하십시오.

## 로직 다이어그램

아래의 다이어그램은 비행 중단과 관련된 논리적 흐름을 보여 줍니다.

![Logic diagram](../../assets/config/flight_termination_logic_diagram.png)