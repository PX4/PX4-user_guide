---
canonicalUrl: https://docs.px4.io/main/ko/advanced_config/prearm_arm_disarm
---

# Arm, Disarm, Prearm Configuration

기체에는 움직이는 부품이 있으며, 그 중에는 특히 모터와 프로펠러는 전원 공급시 위험할 수 있습니다.

사고의 위험을 줄이기 위하여, PX4는 명확한 상태에서만 부품들의 전원을 공급합니다.

- **제동:** 모터와 액츄에이터에 전원을 인가하지 않음
- **시동 전:** 모터와 프로펠러를 잠궈두었으나 액츄에이터에는 위험하지 않은 수준의 전원을 인가함(예: 보조익, 플랩 등).
- **시동:** 기체 전체에 전원을 인가한 상태. 모터와 프로펠러가 동작할 수 있음(위험!)

:::note
Ground stations may display _disarmed_ for pre-armed vehicles. 시동전의 기체는 기술적으로 타당하지는 않지만, "안전"한 상태입니다.
:::

Users can control progression though these states using a [safety switch](../getting_started/px4_basic_concepts.md#safety-switch) on the vehicle (optional) _and_ an [arming switch/button](#arm_disarm_switch), [arming gesture](#arm_disarm_gestures), or _MAVLink command_ on the ground controller:

- A _safety switch_ is a control _on the vehicle_ that must be engaged before the vehicle can be armed, and which may also prevent prearming (depending on the configuration). 보통 안전 스위치는 GPS 장치에 붙어있으나, 별도의 부품으로 공급되기도 합니다.

  :::warning
일단 기체에 시동이 걸리면 위험합니다.
안전 스위치는 의도하지 않게 갑자기시동이 걸리는 것을 방지합니다.
:::

- An _arming switch_ is a switch or button _on an RC controller_ that can be used to arm the vehicle and start motors (provided arming is not prevented by a safety switch).
- An _arming gesture_ is a stick movement _on an RC controller_ that can be used as an alternative to an arming switch.
- MAVLink 명령은 지상국에서 기체의 시동을 걸거나 시동을 해제할 수 있습니다.

PX4는 시동 후 일정 시간 내에 이륙하지 않고, 착륙 후 수동으로 시동 해제하지 않으면, 기체의 시동은 자동으로 해제됩니다. 이것은 시동이 걸린 기체가 지상에서 안전사고를 유발할 수 있는 시간을 줄입니다.

PX4 allows you to configure how pre-arming, arming and disarming work using parameters (which can be edited in _QGroundControl_ via the [parameter editor](../advanced_config/parameters.md)), as described in the following sections.

:::tip
시동/제동 매개변수는 [매개변수 참고 > 명령](../advanced_config/parameter_reference.md#commander) 에서 찾을 수 있습니다(`COM_ARM_*` 과 `COM_DISARM_*`으로 검색).
:::

<a id="arm_disarm_gestures"></a>

## 시동 제스쳐

기본적으로, 기체는 무선조종장치의 추진 제어 스틱과 방위 제어 스틱을 움직인 후  잠깐 동안 또는 1초 동안 상태를 유지하면 시동을 걸거나 시동을 해제할 수 있습니다.

- **시동:** 스로틀 최소, 요 최대
- **시동 해제 :** 스로틀 최소, 요 최소

RC controllers will have different gestures [based on their mode](../getting_started/rc_transmitter_receiver.md#types-of-remote-controllers) (as controller mode affects the sticks used for throttle and yaw):

- **모드 2**:
  - _Arm:_ Left stick to bottom right.
  - _Disarm:_ Left stick to the bottom left.
- **모드 1**:
  - _Arm:_ Left-stick to right, right-stick to bottom.
  - _Disarm:_ Left-stick to left, right-stick to the bottom.

필요한 보류 시간은 [COM_RC_ARM_HYST](#COM_RC_ARM_HYST)에서 설정합니다.

| 매개변수                                                                                                    | 설명                                                           |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| <a id="COM_RC_ARM_HYST"></a>[COM_RC_ARM_HYST](../advanced_config/parameter_reference.md#COM_RC_ARM_HYST) | 시동과 시동 해제가 발생하기 전에 RC 스틱이 시동/시동 해제 위치에 있어야하는 시간 (기본값 : 1 초). |

<a id="arm_disarm_switch"></a>

## 시동 스위치

An _arming button_ or "momentary switch" can be configured to trigger arm/disarm _instead_ of [gesture-based arming](#arm_disarm_gestures) (setting an arming switch disables arming gestures). 시동 해제 (시동 해제시) 또는 시동 해제 (시동시)를 위하여([명목상](#COM_RC_ARM_HYST)) 1초 동안 버튼을 누르고 있어야 합니다.

A two-position switch can also be used for arming/disarming, where the respective arm/disarm commands are sent on switch _transitions_.

:::tip
이중 위치 시동 스위치는 주로 레이싱 드론에 사용되고 권장됩니다.
:::

스위치 또는 버튼은 [RC_MAP_ARM_SW](#RC_MAP_ARM_SW)를 사용하여 할당(및 활성화)되고 스위치 "유형"은 [COM_ARM_SWISBTN](#COM_ARM_SWISBTN)에서 설정합니다.

| 매개변수                                                                                                    | 설명                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="RC_MAP_ARM_SW"></a>[RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW)     | RC arm 스위치 채널 (기본값 : 0 - 할당되지 않음). 정의된 경우 지정된 RC 채널(버튼/스위치)이 스틱 제스처 대신 시동용으로 사용됩니다. <br>**Note:**<br>- This setting _disables the stick gesture_!<br>- This setting applies to RC controllers. It does not apply to Joystick controllers that are connected via _QGroundControl_. |
| <a id="COM_ARM_SWISBTN"></a>[COM_ARM_SWISBTN](../advanced_config/parameter_reference.md#COM_ARM_SWISBTN) | 시동 스위치는 순간적으로 동작하는 버튼입니다. <br> - `0`: 시동 스위치는 스위치 전환시 arm/disarm 명령이 전송되는 이중 위치 스위치입니다. <br> - `1` : 시동 스위치는 버튼입니다. 또는 설정된 시간 ([COM_RC_ARM_HYST](#COM_RC_ARM_HYST)) 동안 버튼을 누른 후 arm/disarm 명령 ae가 전송되는 순간 동작하는 버튼입니다.                                                                 |

:::note
The switch can also be set as part of _QGroundControl_ [Flight Mode](../config/flight_mode.md) configuration.
:::

## 자동 시동 해제

기본적으로, 기체는 착륙시 시동 해제 되며, 시동후 이륙 시간이 너무 오래 걸리면 자동으로 시동 해제됩니다. 이 기능은 다음 시간 제한을 사용하여 설정됩니다.

| 매개변수                                                                                                      | 설명                                                           |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| <a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | 착륙후 자동 시동 해제 대기 시간. 기본값: 2s (-1 비활성화).                       |
| <a id="COM_DISARM_PRFLT"></a>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | 이륙 속도가 너무 느리면 자동 시동 해제 시간이 초과됩니다. 기본값: 10s (<=0 to disable). |

## Pre-Arm Checks

To reduce accidents, vehicles are only allowed to arm certain conditions are met. Arming is prevented if:

- The vehicle is not in a "healthy" state. For example it is not calibrated, or is reporting sensor errors.
- The vehicle has a [safety switch](../getting_started/px4_basic_concepts.md#safety-switch) that has not been engaged.
- The vehicle has a [remote ID](../peripherals/remote_id.md) that is unhealthy or otherwise not ready
- A VTOL vehicle is in fixed-wing mode ([by default](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).
- The current mode requires an adequate global position estimate but the vehicle does not have GPS lock.
- Many more ...

The current failed checks can be viewed in QGroundControl (v4.2.0 and later): [Fly View > Arming and Preflight Checks](https://docs.qgroundcontrol.com/master/en/FlyView/FlyView.html#arm).

Note that internally PX4 runs arming checks at 10Hz. A list of the failed checks is kept, and if the list changes PX4 emits the current list using the [Events interface](../concept/events_interface.md). The list is also sent out when the GCS connects. Effectively the GCS knows the status of prearm checks immediately, both when disarmed and armed.

:::details
Implementation notes for developers The client implementation is in [libevents](https://github.com/mavlink/libevents):

- [libevents > Event groups](https://github.com/mavlink/libevents#event-groups)
- [health_and_arming_checks.h](https://github.com/mavlink/libevents/blob/main/libs/cpp/parse/health_and_arming_checks.h)

QGC implementation: [HealthAndArmingCheckReport.cc](https://github.com/mavlink/qgroundcontrol/blob/master/src/Vehicle/HealthAndArmingCheckReport.cc).
:::

PX4 also emits a subset of the arming check information in the [SYS_STATUS](https://mavlink.io/en/messages/common.html#SYS_STATUS) message (see [MAV_SYS_STATUS_SENSOR](https://mavlink.io/en/messages/common.html#MAV_SYS_STATUS_SENSOR)).

## 시동 절차: 시동전 상태와 안전 버튼

The arming sequence depends on whether or not there is a _safety switch_, and is controlled by the parameters [COM_PREARM_MODE](#COM_PREARM_MODE) (Prearm mode) and [CBRK_IO_SAFETY](#CBRK_IO_SAFETY) (I/O safety circuit breaker).

[COM_PREARM_MODE](#COM_PREARM_MODE) 매개변수는 사전 준비 모드가 활성화 여부와 시기를 정의합니다 (안전/비 추진 액추에이터가 움직일 수 있음) :

- _Disabled_: Pre-arm mode disabled (there is no stage where only "safe"/non-throttling actuators are enabled).
- _Safety Switch_ (Default): The pre-arm mode is enabled by the safety switch. 안전 스위치가 없으면 시동전 모드가 활성화되지 않습니다.
- _Always_: Prearm mode is enabled from power up.

기본 설정에서는 시동전에 안전 스위치를 사용하도록 설정합니다. 시동 전에 스위치를 켠후, 모든 모터와 액츄에이터를 가동하기 위하여 시동을 걸 수 있습니다.

아래 섹션에서는 여러가지 설정의 시작 순서를 자세히 설명합니다.

### 기본값: COM_PREARM_MODE = Safety and Safety Switch

기본 설정에서는 시동전에 안전 스위치를 사용하도록 설정합니다. 시동전에 이 스위치를 켜면 모든 모터와 액츄에이터를 가동하기 위하여 시동을 걸 수 있습니다. 이에 해당하는 설정은 [COM_PREARM_MODE=1](#COM_PREARM_MODE) (안전 스위치 사용)과 [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (입출력 안전 회로 차단기 비활성)이 있습니다.

시작 절차는 다음과 같습니다:

1. 전원 인가
   - 모든 액츄에이터를 시동 해제 상태로 잠금
   - 시동 걸기 불가능
1. 안전 스위치 누름
   - 시스템이 시동전 상태로 전환: 추진 모터를 제외한 모든 액츄에이터 동작 가능(예: 보조익)
   - 시스템 안전 장치 꺼짐: 시동 가능
1. 시동 명령 인가

   - 시스템에 시동이 걸림
   - 모든 모터와 액츄에이터를 움직일 수 있음

### COM_PREARM_MODE = Disabled and Safety Switch

When prearm mode is _Disabled_, engaging the safety switch does not unlock the "safe" actuators, though it does allow you to then arm the vehicle. 이는 [COM_PREARM_MODE = 0](#COM_PREARM_MODE) (비활성화) 및 [CBRK_IO_SAFETY = 0](#CBRK_IO_SAFETY) (I/O 안전 회로 차단기 비활성화)에 해당합니다.

시작 절차는 다음과 같습니다:

1. 전원 인가
   - 모든 액츄에이터를 시동 해제 상태로 잠금
   - 시동 걸기 불가능
1. 안전 스위치 누름
   - _모든 액츄에이터가 시동 해제 상태로 잠김 (시동 해제 상태와 동일)._
   - 시스템 안전 장치 꺼짐: 시동 가능
1. 시동 명령 인가

   - 시스템에 시동이 걸림
   - 모든 모터와 액츄에이터를 움직일 수 있음

### COM_PREARM_MODE = Always and Safety Switch

When prearm mode is _Always_, prearm mode is enabled from power up. 시동 걸기 위하여 여전히 안전 스위치가 필요합니다. 이는 [COM_PREARM_MODE = 2](#COM_PREARM_MODE) (항상) 및 [CBRK_IO_SAFETY = 0](#CBRK_IO_SAFETY) (I/O 안전 회로 차단기 비활성화 됨)에 해당합니다.

시작 절차는 다음과 같습니다:

1. 전원 인가
   - 시스템이 시동전 상태로 전환: 추진 모터를 제외한 모든 액츄에이터 동작 가능(예: 보조익)
   - 시동 걸기 불가능
1. 안전 스위치 누름
   - 시스템 안전 장치 꺼짐: 시동 가능
1. 시동 명령 인가
   - 시스템에 시동이 걸림
   - 모든 모터와 액츄에이터를 움직일 수 있음

### COM_PREARM_MODE = Safety or Disabled and No Safety Switch

With no safety switch, when `COM_PREARM_MODE` is set to _Safety_ or _Disabled_ prearm mode cannot be enabled (same as disarmed). 이는 [COM_PREARM_MODE = 0 또는 1](#COM_PREARM_MODE) (비활성화/안전 스위치) 및 [CBRK_IO_SAFETY = 22027](#CBRK_IO_SAFETY) (I/O 안전 회로 차단기 사용)에 해당합니다.

시작 절차는 다음과 같습니다:

1. 전원 인가
   - 모든 액츄에이터를 시동 해제 상태로 잠금
   - 시스템 안전 장치 꺼짐: 시동 가능
1. 시동 명령 인가
   - 시스템에 시동이 걸림
   - 모든 모터와 액츄에이터를 움직일 수 있음

### COM_PREARM_MODE = Always and No Safety Switch

When prearm mode is _Always_, prearm mode is enabled from power up. 이는 [COM_PREARM_MODE = 2](#COM_PREARM_MODE) (항상) 및 [CBRK_IO_SAFETY = 22027](#CBRK_IO_SAFETY) (I/O 안전 회로 차단기 사용)에 해당합니다.

시작 절차는 다음과 같습니다:

1. 전원 인가
   - 시스템이 시동전 상태로 전환: 추진 모터를 제외한 모든 액츄에이터 동작 가능(예: 보조익)
   - 시스템 안전 장치 꺼짐: 시동 가능
1. 시동 명령 인가
   - 시스템에 시동이 걸림
   - 모든 모터와 액츄에이터를 움직일 수 있음

### 매개변수

| 매개변수                                                                                                    | 설명                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_PREARM_MODE"></a>[COM_PREARM_MODE](../advanced_config/parameter_reference.md#COM_PREARM_MODE) | 시동전 모드로 진입하는 상태입니다. `0`: 비활성, `1`: 안전 스위치(안전 스위치로 시동 전 모드 활성 가능, 스위치가 없으면 이 옵션을 사용할 수 없습니다), `2`: 항상(전원 인가 후 시동 전 모드를 켭니다). 기본값: `1` (안전 단추). |
| <a id="CBRK_IO_SAFETY"></a>[CBRK_IO_SAFETY](../advanced_config/parameter_reference.md#CBRK_IO_SAFETY)   | 입출력 안전을 위한 회로 차단.                                                                                                                             |


<!-- Discussion:
https://github.com/PX4/PX4-Autopilot/pull/12806#discussion_r318337567
https://github.com/PX4/PX4-user_guide/issues/567#issue-486653048
-->
