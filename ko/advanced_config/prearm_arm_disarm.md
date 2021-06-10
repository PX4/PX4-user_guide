# 시동 전, 시동, 제동 구성

기체에는 움직이는 부품이 있으며, 그 중에는 특히 모터와 프로펠러와 같이 전원을 공급할 때 잠재적으로 위험합니다!

사고 위험을 줄이기 위하여, PX4에는 기체에 전원을 공급하는 상태들이 있습니다.

- **제동:** 모터와 액츄에이터에 전원을 인가하지 않음
- **시동 전:** 모터와 프로펠러를 잠궈두었으나 액츄에이터에는 위험하지 않은 수준의 전원을 인가함(예: 보조익, 플랩 등).
- **시동:** 기체 전체에 전원을 인가한 상태. 모터와 프로펠러가 동작할 수 있음(위험!)

:::tip
시동 전 기체 상태를 지상제어국에서 *disarmed*로 표시됩니다. 시동전의 기체는 기술적으로 타당하지는 않지만, "안전"한 상태입니다.
:::

사용자는 기체(선택)의 [안전 스위치](../getting_started/px4_basic_concepts.md#safety_switch) *그리고* [시동 스위치/단추](#arm_disarm_switch), [시동 움직임](#arm_disarm_gestures) 또는 지상 통제 장치의 *MAVLink 명령*으로 상태 진행을 제어할 수 있습니다:

- *안전 스위치*는 *기체*의 제어 장치로, 기체에 시동을 걸 수 있기 전 가동해야 하며, 시동 전에 시동이 멋대로 켜지는 일을 (설정에 따라) 막을 수 있어야 합니다. 보통 안전 스위치는 GPS 장치에 붙어있으나, 별도의 부품으로 공급되기도 합니다.
  
:::warning
일단 기체에 시동이 걸리면 위험합니다. 안전 스위치는 의도하지 않게 갑자기시동이 걸리는 것을 방지합니다.
:::

- *시동 스위치*는 기체에 시동을 걸고 모터를 시동하는 데 사용할 수 있는 *RC 컨트롤러*의 스위치 또는 버튼입니다 (안전 스위치로 시동을 방지하지 않는 경우).

- *시동 제스쳐*은 시동 스위치 대신 사용할 수있는 *RC 컨트롤러*의 스틱 이동입니다.
- MAVLink 명령은 지상국에서 기체의 시동을 걸거나 시동을 해제할 수 있습니다.

PX4는 시동 후 일정 시간 내에 이륙하지 않고, 착륙 후 수동으로 시동 해제하지 않으면, 기체의 시동은 자동으로 해제됩니다. 이것은 시동이 걸린 기체가 지상에서 안전사고를 유발할 수 있는 시간을 줄입니다.

PX4에서는 다음 섹션에 설명된 대로 매개변수([매개변수 편집기](../advanced_config/parameters.md)를 통하여 *QGroundControl*에서 편집할 수 있음)를 사용하여 사전 준비, 준비 및 해제의 작동 방식을 설정할 수 있습니다.

:::tip
시동/제동 매개변수는 [매개변수 참고 > 명령](../advanced_config/parameter_reference.md#commander) 에서 찾을 수 있습니다(`COM_ARM_*` 과 `COM_DISARM_*`으로 검색).
:::

<span id="arm_disarm_gestures"></span>

## 시동 제스쳐

기본적으로, 기체는 무선조종장치의 추진 제어 스틱과 방위 제어 스틱을 움직인 후 잠깐 동안 또는 1초 동안 상태를 유지하면 시동을 걸거나 시동을 해제할 수 있습니다.

- **시동:** 스로틀 최소, 요 최대
- **시동 해제 :** 스로틀 최소, 요 최소

무선조종장치는 [모드에 따라](../getting_started/rc_transmitter_receiver.md#types-of-remote-controls) 제어 방법이 다릅니다. 제어 모드는 추진 제어와 방위 제어에 사용하는 스틱이 달라집니다.

- **모드 2**: 
  - *시동:* 왼쪽 스틱을 우하단으로 위치시킵니다. 
  - *시동 해제:* 왼쪽 스틱을 좌하단에 위치시킵니다.
- **모드 1**: 
  - *시동:* 왼쪽 스틱은 오른쪽, 오른쪽 스틱은 아래쪽입니다.
  - *시동 해제:* 왼쪽 스틱은 왼쪽, 오른쪽 스틱은 아래쪽입니다.

필요한 보류 시간은 [COM_RC_ARM_HYST](#COM_RC_ARM_HYST)에서 설정합니다.

| 매개변수                                                                                                    | 설명                                                           |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| <span id="COM_RC_ARM_HYST"></span>[COM_RC_ARM_HYST](../advanced_config/parameter_reference.md#COM_RC_ARM_HYST) | 시동과 시동 해제가 발생하기 전에 RC 스틱이 시동/시동 해제 위치에 있어야하는 시간 (기본값 : 1 초). |

<span id="arm_disarm_switch"></span>

## 시동 스위치

*시동 버튼* 또는 "순간 스위치"는 [제스처 기반 무장](#arm_disarm_gestures) 대신 *시동/시동 해제*를 트리거하도록 설정할 수 있습니다. 시동 스위치를 설정하면 시동 해제 제스처를 사용할 수 없습니다. 시동 해제 (시동 해제시) 또는 시동 해제 (시동시)를 위하여([명목상](#COM_RC_ARM_HYST)) 1초 동안 버튼을 누르고 있어야 합니다.

두 위치 스위치는 준비/시동 해제에도 사용할 수 있으며, 여기서 각 시동/시동 해제 명령은 스위치 *전환*에서 전송됩니다.

:::tip
이중 위치 시동 스위치는 주로 레이싱 드론에 사용/권장됩니다.
:::

The switch or button is assigned (and enabled) using [RC_MAP_ARM_SW](#RC_MAP_ARM_SW), and the switch "type" is configured using [COM_ARM_SWISBTN](#COM_ARM_SWISBTN).

| 파라미터                                                                                                    | 설명                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="RC_MAP_ARM_SW"></span>[RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW)     | RC arm switch channel (default: 0 - unassigned). If defined, the specified RC channel (button/switch) is used for arming instead of a stick gesture.   
**Note:**  
- This setting *disables the stick gesture*!  
- This setting applies to RC controllers. It does not apply to Joystick controllers that are connected via *QGroundControl*. |
| <span id="COM_ARM_SWISBTN"></span>[COM_ARM_SWISBTN](../advanced_config/parameter_reference.md#COM_ARM_SWISBTN) | Arm switch is a momentary button.   
- `0`: Arm switch is a 2-position switch where arm/disarm commands are sent on switch transitions.  
-`1`: Arm switch is a button or momentary button where the arm/disarm command ae sent after holding down button for set time ([COM_RC_ARM_HYST](#COM_RC_ARM_HYST)).                                 |


:::note
The switch can also be set as part of *QGroundControl* [Flight Mode](../config/flight_mode.md) configuration.
:::

## 자동 제동

By default vehicles will automatically disarm on landing, or if you take too long to take off after arming. The feature is configured using the following timeouts.

| 파라미터                                                                                                      | 설명                                                                              |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | Time-out for auto disarm after landing. Default: 2s (-1 to disable).            |
| <span id="COM_DISARM_PRFLT"></span>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | Time-out for auto disarm if too slow to takeoff. Default: 10s (<=0 to disable). |


## 시동 절차: 시동 전 상태와 안전 단추

The arming sequence depends on whether or not there is a *safety switch*, and is controlled by the parameters [COM_PREARM_MODE](#COM_PREARM_MODE) (Prearm mode) and [CBRK_IO_SAFETY](#CBRK_IO_SAFETY) (I/O safety circuit breaker).

The [COM_PREARM_MODE](#COM_PREARM_MODE) parameter defines when/if pre-arm mode is enabled ("safe"/non-throttling actuators are able to move):

- *Disabled*: Pre-arm mode disabled (there is no stage where only "safe"/non-throttling actuators are enabled).
- *Safety Switch* (Default): The pre-arm mode is enabled by the safety switch. If there is no safety switch then pre-arm mode will not be enabled.
- *Always*: Prearm mode is enabled from power up. 

기본 설정에서는 시동 전에 안전 스위치를 사용하도록 설정합니다. 시동 전에 이 스위치를 켜고 나서 모든 모터와 액츄에이터를 가동할 목적으로 시동을 걸 수 있습니다.

기본 시동 절차는 다음과 같습니다:

### 기본값: COM_PREARM_MODE=안전 및 안전 스위치

The default configuration uses safety switch to prearm. From prearm you can then arm to engage all motors/actuators. It corresponds to: [COM_PREARM_MODE=1](#COM_PREARM_MODE) (safety switch) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

시작 절차는 다음과 같습니다:

1. 전원 인가 
   - 모든 액츄에이터를 제동 상태로 두어 잠금
   - 시동 걸기 불가능
2. 안전 스위치 누름 
   - 시스템이 시동 전 상태로 전환: 추진 모터를 제외한 모든 액츄에이터 동작 가능(예: 보조익)
   - 시스템 안전 장치 꺼짐: 시동 가능
3. 시동 명령 인가 
   - 시스템에 시동이 걸림
   - 모든 모터와 액츄에이터를 움직일 수 있음

### COM_PREARM_MODE=비활성 및 안전 스위치

When prearm mode is *Disabled*, engaging the safety switch does not unlock the "safe" actuators, though it does allow you to then arm the vehicle. This corresponds to [COM_PREARM_MODE=0](#COM_PREARM_MODE) (Disabled) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

시작 절차는 다음과 같습니다:

1. 전원 인가 
   - 모든 액츄에이터를 제동 상태로 두어 잠금
   - 시동 걸기 불가능
2. 안전 스위치 누름 
   - *모든 액츄에이터가 제동 상태로 잠김 (제동 상태와 동일).*
   - 시스템 안전 장치 꺼짐: 시동 가능
3. 시동 명령 인가 
   - 시스템에 시동이 걸림
   - 모든 모터와 액츄에이터를 움직일 수 있음

### COM_PREARM_MODE=Always and Safety Switch

When prearm mode is *Always*, prearm mode is enabled from power up. To arm, you still need the safety switch. This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

시작 절차는 다음과 같습니다:

1. 전원 인가 
   - 시스템이 시동 전 상태로 전환: 추진 모터를 제외한 모든 액츄에이터 동작 가능(예: 보조익)
   - 시동 걸기 불가능
2. 안전 스위치 누름 
   - 시스템 안전 장치 꺼짐: 시동 가능
3. 시동 명령 인가 
   - 시스템에 시동이 걸림
   - 모든 모터와 액츄에이터를 움직일 수 있음

### COM_PREARM_MODE=Safety or Disabled and No Safety Switch

With no safety switch, when `COM_PREARM_MODE` is set to *Safety* or *Disabled* prearm mode cannot be enabled (same as disarmed). This corresponds to [COM_PREARM_MODE=0 or 1](#COM_PREARM_MODE) (Disabled/Safety Switch) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

시작 절차는 다음과 같습니다:

1. 전원 인가 
   - 모든 액츄에이터를 제동 상태로 두어 잠금
   - 시스템 안전 장치 꺼짐: 시동 가능
2. 시동 명령 인가 
   - 시스템에 시동이 걸림
   - 모든 모터와 액츄에이터를 움직일 수 있음

### COM_PREARM_MODE=Always and No Safety Switch

When prearm mode is *Always*, prearm mode is enabled from power up. This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

The startup sequence is:

1. 전원 인가 
   - 시스템이 시동 전 상태로 전환: 추진 모터를 제외한 모든 액츄에이터 동작 가능(예: 보조익)
   - 시스템 안전 장치 꺼짐: 시동 가능
2. 시동 명령 인가 
   - 시스템에 시동이 걸림
   - 모든 모터와 액츄에이터를 움직일 수 있음

### 매개변수

| 매개변수                                                                                                    | 설명                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_PREARM_MODE"></span>[COM_PREARM_MODE](../advanced_config/parameter_reference.md#COM_PREARM_MODE) | 시동 전 모드로 진입하는 상태입니다. `0`: 비활성, `1`: 안전 스위치(안전 스위치로 시동 전 모드 활성 가능, 스위치가 없으면 이 옵션을 사용할 수 없습니다), `2`: 항상(전원 인가 후 시동 전 모드를 켭니다). 기본값: `1` (안전 단추). |
| <span id="CBRK_IO_SAFETY"></span>[CBRK_IO_SAFETY](../advanced_config/parameter_reference.md#CBRK_IO_SAFETY)   | 입출력 안전을 위한 회로 차단.                                                                                                                              |


<!-- Discussion:
https://github.com/PX4/PX4-Autopilot/pull/12806#discussion_r318337567 
https://github.com/PX4/px4_user_guide/issues/567#issue-486653048
-->