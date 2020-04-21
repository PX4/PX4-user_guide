# 비행 중단 설정

*비행 중단* [failsafe](../config/safety.md#failsafe_actions)는 안전 점검</1>(예. 기체 유형과 비행 모드가 무엇이든 RC 연결 끊김, geofence를 벗어남 등이 발생할 때)또는 [Failure Detector](../config/safety.md#failure_detector)에 의해 작동합니다. </p> 

*비행 중단*이 활성화되면, PX4는 동시에 모든 컨트롤러를 중단하고 모든 PWM출력값을 failsafe 값으로 변경합니다.

연결된 장치에 따라 PWM failsafe 출력은 다음과 같이 활용 될 수 있습니다.

- [낙하산](../peripherals/parachute.md) 펼치기.
- 랜딩기어 펼치기.
- 카메라를 보호하기 위해 PWM방식으로 연결된 짐벌을 안전 각도(또는 수납 위치) 로 움직이기.
- 에어백 같은 팽창 장비 가동하기.
- 알람 울리기.

비행 중단을 취소하고 되돌리는 방법은 없습니다. 비행 중단이 시행되면 가능한 빨리 배터리를 분리하십시오. You will need to reboot/power cycle the vehicle before it can be used again.

> **Tip** PX4 does not know what safety devices are attached - it just applies a predefined set of PWM values to its outputs.

<span></span>

> **Tip** Failsafe values are applied to all outputs on termination. There is no way to configure independent time-based (or other) triggering of the motors or specific safety devices.

<span></span>

> **Note** This is *not* an independent *Flight Termination System*. If power is lost or if the autopilot crashes completely, the failsafe devices will not be triggered.

## 하드웨어 설정

Any *safety device(s)* (e.g. a [parachute](../peripherals/parachute.md)) that can be triggered by changing a PWM value can be used, and may be connected to any free PWM port (both MAIN and AUX).

> **Note** If you're using Pixhawk-series board you will have to separately power the servo rail (i.e. from a 5V BEC, which is often also available from your ESC).

## 소프트웨어 설정

The [Safety](../config/safety.md) topic explains how to set the *flight termination* as the [failsafe action](../config/safety.md#failsafe_actions) to be performed for particular failsafe check.

The [Failure Detector](../config/safety.md#failure_detector) can also (optionally) be configured to trigger flight termination if the vehicle flips (exceeds a certain attitude) or if failure is detected by an external automatic trigger system (ATS):

- Enable the failure detector during flight by setting [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM).
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