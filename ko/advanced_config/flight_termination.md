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

> **팁** Failsafe 값은 종료시 모든 출력에 적용됩니다. There is no way to configure independent time-based (or other) triggering of the motors or specific safety devices.

<span></span>

> **Note** 이것은 독립적인 *비행 중단 시스템*이 *아닙니다*. 전력이 손실되거나 Autopilot이 완전히 부서지면 failsafe 장치는 작동하지 않습니다. 

## 하드웨어 설정

PWM 값을 변경하여 작동하는 모든 *안전 장치* (예 : [낙하산](../peripherals/parachute.md))를 사용할 수 있으며, 비어있는 아무 PWM 포트(MAIN과 AUX 모두를 포함)에 안전 장치를 연결할 수 있습니다

> **참고** Pixhawk 시리즈 보드를 사용하는 경우 서보 레일에 별도로 전원을 공급해야합니다. (예 : ESC에 많이 사용하는 5V BEC)

## 소프트웨어 설정

[안전](../config/safety.md) 주제는 *비행 중단*을 특정 failsafe 점검을 위해 수행되는 failsafe 작동</ 2>로 설정하는 방법을 설명합니다.</p> 

[Failure Detector](../config/safety.md#failure_detector)는 차량이 뒤집히거나(특정 자세를 초과한 경우) 외부 자동 트리거 시스템(ATS)에 의해 고장이 감지되는 경우 비행 종료를 시작하도록 선택적으로 구성 할 수 있습니다.

- [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM)을 설정하여 failure detector를 활성화하십시오.
- [Safety > Failure Detector > Attitude Trigger](../config/safety.md#attitude_trigger) explains how to configure the attitude limits that trigger *Flight termination*. > **Note** During *takeoff* excessive attitutes will trigger *lockdown* (kill motors, but not launch parachute) rather than flight termination. This is always enabled, irrespective of the value of `CBRK_FLIGHTTERM`.
- [Safety > External Automatic Trigger System (ATS)](../config/safety.md#external_ats) explains how to configure an external trigger system.

For each MAIN output to which a safety device is attached, where "n" is the PWM port number, set:

- [PWM_MAIN_DISn](../advanced_config/parameter_reference.md#PWM_MAIN_DIS1) to the device's "OFF" PWM value.
- [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1) to the device's "ON" PWM value.

For each AUX output to which a safety device is attached, where "n" is the PWM port number, set:

- [PWM_AUX_DIS1](../advanced_config/parameter_reference.md#PWM_AUX_DIS1) to the device's "OFF" PWM value.
- [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1) to the device's "ON" PWM value.

Finally, set the `PWM_AUX_FAILn` and `PWM_MAIN_FAILn` PWM values for any motors.

## 로직 다이어그램

아래의 다이어그램은 비행 중단과 관련된 논리적 흐름을 보여 줍니다.

![Logic diagram](../../assets/config/flight_termination_logic_diagram.png)