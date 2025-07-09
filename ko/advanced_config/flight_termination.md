---
canonicalUrl: https://docs.px4.io/main/ko/advanced_config/flight_termination
---

# 비행 중단 설정

The _Flight termination_ [failsafe action](../config/safety.md#failsafe-actions) may be triggered by a [safety check](../config/safety.md) (e.g. RC Loss, geofence violation, etc. on any vehicle type or in any flight mode), or by the [Failure Detector](../config/safety.md#failure-detector).

:::note
Flight termination may also be triggered from a ground station or companion computer using the MAVLink [MAV_CMD_DO_FLIGHTTERMINATION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_FLIGHTTERMINATION) command. This is sent, for example, when you call the [MAVSDK Action plugin](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html#classmavsdk_1_1_action_1a47536c4a4bc8367ccd30a92eb09781c5) `terminate()` or `terminate_async()` methods.
:::

When _Flight termination_ is activated, PX4 simultaneously turns off all controllers and sets all PWM outputs to their failsafe values.

Depending on what devices are connected, the PWM failsafe outputs can be used to:

- [낙하산](../peripherals/parachute.md) 펼치기.
- 랜딩기어 펼치기.
- 카메라를 보호하기 위해 PWM방식으로 연결된 짐벌을 안전 각도(또는 수납 위치) 로 움직이기.
- 에어백 같은 팽창 장비 가동하기.
- 알람 울리기.

:::tip PX4는 어떤 안전 장치가 장착되어 있는지 알지 못합니다. 미리 정의된 PWM 값 세트를 출력에 적용하기만 하면 됩니다. After triggering you should unplug the battery as soon as possible. You will need to reboot/power cycle the vehicle before it can be used again.

:::tip
Failsafe 값은 종료시 모든 출력에 적용됩니다. 모터 또는 특정 안전 장치의 독립적인 시간 기반 (또는 기타) 트리거링을 구성하는 방법은 없습니다.

:::note
이것은 독립적인 *항공 종료 시스템*이 *아닙니다*. 전원이 끊기거나 자동조종장치가 완전히 충돌하면 안전 장치가 작동하지 않습니다.
:::

:::note
This is _not_ an independent _Flight Termination System_. If power is lost or if the autopilot crashes completely, the failsafe devices will not be triggered.
:::

## 하드웨어 설정

Any _safety device(s)_ (e.g. a [parachute](../peripherals/parachute.md)) that can be triggered by changing a PWM value can be used, and may be connected to any free PWM port (both MAIN and AUX).

:::note
If you're using Pixhawk-series board you will have to separately power the servo rail (i.e. from a 5V BEC, which is often also available from your ESC).
:::

## 소프트웨어 설정

The [Safety](../config/safety.md) topic explains how to set the _flight termination_ as the [failsafe action](../config/safety.md#failsafe-actions) to be performed for particular failsafe check.

마지막으로, 다른 모터에 대해 `PWM_AUX_FAILn`과 `PWM_MAIN_FAILn`의 PWM 값을 설정하십시오.

- [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM)을 설정하여 고장 감지기를 활성화하십시오.
- [Safety > Failure Detector > Attitude Trigger](../config/safety.md#attitude-trigger) explains how to configure the attitude limits that trigger _Flight termination_. :::note During _takeoff_ excessive attitutes will trigger _lockdown_ (kill motors, but not launch parachute) rather than flight termination. lockdown은 `CBRK_FLIGHTTERM`의 값에 관계없이 항상 활성화됩니다. 모터 또는 특정 안전 장치의 독립적인 시간 기반 (또는 기타) 트리거링을 구성하는 방법은 없습니다.
- [Safety > External Automatic Trigger System (ATS)](../config/safety.md#external_ats)은 외부 트리거 시스템을 설정하는 방법에 대해 설명합니다.

아래의 다이어그램은 비행 중단과 관련된 논리적 흐름을 보여 줍니다.

- [PWM_MAIN_DISn](../advanced_config/parameter_reference.md#PWM_MAIN_DIS1)을 장치의 "OFF" PWM값으로 설정
- [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1)을 장치의 "ON" PWM값으로 설정

마지막으로, 모든 모터에 대해 `PWM_AUX_FAILn` 및 `PWM_MAIN_FAILn` PWM 값을 설정합니다.

- [PWM_AUX_DISn](../advanced_config/parameter_reference.md#PWM_AUX_DIS1)을 장치의 "OFF" PWM값으로 설정
- [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1)을 장치의 "ON" PWM값으로 설정

아래의 다이어그램은 비행 중단과 관련된 논리적 흐름을 나타냅니다.

## 로직 다이어그램

The diagram below shows the logical flow around flight termination.

![Logic diagram](../../assets/config/flight_termination_logic_diagram.png)
