---
canonicalUrl: https://docs.px4.io/main/ko/advanced_config/flight_termination
---

# 비행 중단 설정

*비행 중단* [failsafe](../config/safety.md#failsafe_actions)는 안전 점검</1>(예. 기체 유형과 비행 모드가 무엇이든 RC 연결 끊김, geofence를 벗어남 등이 발생할 때)또는 [Failure Detector](../config/safety.md#failure_detector)에 의해 작동합니다. </p> 

*비행 중단*이 활성화되면, PX4는 동시에 모든 컨트롤러를 중단하고 모든 PWM출력값을 failsafe 값으로 변경합니다.

연결된 장치에 따라 PWM 안전장치 출력은 아래와 같이 활용할 수 있습니다.

- [낙하산](../peripherals/parachute.md) 펼치기.
- 랜딩기어 펼치기.
- 카메라를 보호하기 위해 PWM방식으로 연결된 짐벌을 안전 각도(또는 수납 위치) 로 움직이기.
- 에어백 같은 팽창 장비 가동하기.
- 알람 울리기.

비행 중단을 취소하고 되돌리는 방법은 없습니다. 비행 중단이 시행되면 가능한 빨리 배터리를 분리하십시오. 기체를 다시 사용하기 전에 재부팅하거나 전원을 껐다 켜야 합니다.

:::tip PX4는 어떤 안전 장치가 장착되어 있는지 알지 못합니다. 미리 정의된 PWM 값 세트를 출력에 적용하기만 하면 됩니다.
:::

:::tip
Failsafe 값은 종료시 모든 출력에 적용됩니다. 모터 또는 특정 안전 장치의 독립적인 시간 기반 (또는 기타) 트리거링을 구성하는 방법은 없습니다.
:::

:::note
이것은 독립적인 *항공 종료 시스템*이 *아닙니다*. 전원이 끊기거나 자동조종장치가 완전히 충돌하면 안전 장치가 작동하지 않습니다.
:::

## 하드웨어 설정

PWM 값을 변경하여 트리거 기능한 모든 *안전 장치*(예 : [낙하산](../peripherals/parachute.md))를 사용할 수 있으며, 모든 빈 PWM 포트(MAIN과 AUX)에 연결할 수 있습니다.

:::note
Pixhawk 시리즈 보드를 사용하는 경우 서보 레일에 별도로 전원을 공급하여야 합니다 (예 : ESC에서도 제공되는 5V BEC).
:::

## 소프트웨어 설정

안전 장치에 연결된 각각의 MAIN포트 출력에 대해 다음을 설정하십시오. "n"은 PWM 포트 번호입니다:

안전 장치에 연결된 각각의 AUX포트 출력에 대해 다음을 설정하십시오. "n"은 PWM 포트 번호입니다:

- [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM)을 설정하여 고장 감지기를 활성화하십시오.
- [Safety > Failure Detector > Attitude Trigger](../config/safety.md#attitude_trigger)는 *비행 중단*을 시작하는 한계 attitude를 구성하는 방법을 설명합니다. **참고** *이륙*중의 과한 attitude는 비행 중단 대신 *lockdown*(모터를 정지시키지만 낙하산을 발사하지 않음)을 시작합니다. lockdown은 `CBRK_FLIGHTTERM`의 값에 관계없이 항상 활성화됩니다.
:::
- [Safety > External Automatic Trigger System (ATS)](../config/safety.md#external_ats)은 외부 트리거 시스템을 설정하는 방법에 대해 설명합니다.

마지막으로, 다른 모터에 대해 `PWM_AUX_FAILn`과 `PWM_MAIN_FAILn`의 PWM 값을 설정하십시오.

- [PWM_MAIN_DISn](../advanced_config/parameter_reference.md#PWM_MAIN_DIS1)을 장치의 "OFF" PWM값으로 설정
- [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1)을 장치의 "ON" PWM값으로 설정

아래의 다이어그램은 비행 중단과 관련된 논리적 흐름을 보여 줍니다.

- [PWM_AUX_DISn](../advanced_config/parameter_reference.md#PWM_AUX_DIS1)을 장치의 "OFF" PWM값으로 설정
- [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1)을 장치의 "ON" PWM값으로 설정

마지막으로, 모든 모터에 대해 `PWM_AUX_FAILn` 및 `PWM_MAIN_FAILn` PWM 값을 설정합니다.

## 로직 다이어그램

아래의 다이어그램은 비행 중단과 관련된 논리적 흐름을 나타냅니다.

![로직 다이어그램](../../assets/config/flight_termination_logic_diagram.png)