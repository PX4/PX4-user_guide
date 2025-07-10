---
canonicalUrl: https://docs.px4.io/main/ko/config/autotune
---

# 자동 튜닝

자동 튜닝은 안정적이고 반응성이 뛰어난 비행을 위한 가장 중요한 컨트롤러인 PX4의 속도 및 자세 컨트롤러 튜닝 프로세스를 자동화합니다(다른 튜닝은 "선택 사항"에 가깝습니다). 현재 멀티콥터, 고정익 및 하이브리드 VTOL에 사용 가능합니다.

한 번 튜닝으로 충분하며, 제조업체에서 이미 튜닝한(그 이후로 수정하지 않은) 기체가 아닌 경우에는 튜팅을 권장합니다.

:::note QGroundControl Autotuning UI는 고정익 기체에 사용할 수 없습니다. [qgroundcontrol#10194](https://github.com/mavlink/qgroundcontrol/issues/10194)를 참조하세요(고정익 비행의 VTOL 기체에 해당). 매개변수 [FW_AT_START](../advanced_config/parameter_reference.md#FW_AT_START)를 설정하여 고정익 자동 튜닝을 시작할 수 있습니다.
:::

:::warning
비행 중에 자동 튜닝이 수행됩니다. 기체는 중간 정도의 교란을 처리할 수 있을 만큼 원할하게 비행해야 하며, 다음 사항에 주의를 기울여야 합니다.
- 기체가 [자동 튜닝을 할 만큼 충분히 안정적인지](#pre-tuning-test) 테스트합니다.
- 리모콘 스틱을 움직여 자동 튜닝 프로세스를 중단할 준비를 하십시오.
- 튜닝 후 기체가 잘 비행하는지 확인하십시오.
:::

@[유투브](https://youtu.be/5xswOhhqrIQ)


## 사전 튜닝 테스트

기체 자동 튜닝을 실행하기 전에 비행할 수 있고 적절하게 안정화되어야 합니다. 이 테스트는 기체의 위치 제어 모드에서 안전하게 비행할 수 있는 지 확인합니다.

:::note
[기체 설정](../config/airframe.md) 중에 귀하의 기체와 가장 근접하게 일치하는 프레임을 미리 선택하여야 합니다. 이것은 일반적으로 비행하기에 충분히 잘 조정되며 자동 조정을 실행하기에 충분히 잘 _조정될 수_ 있습니다.
:::

기체 자동 튜닝을 위해 충분히 안정적인지 확인하는 방법:

1. 비행 구역이 깨끗하고 충분한 공간이 있는지 확인하기 위하여 일반적인 비행 전 안전 체크리스트를 수행합니다.
1. 이륙 및 시험 준비
   - **멀티콥터:** [고도 모드](../flight_modes/altitude_mc.md) 또는 안정화 모드에서 이륙하여 지상 1m에서 호버링합니다.
   - **고정익:** [위치 모드](../flight_modes/position_mc.md) 또는 [고도 모드](../flight_modes/altitude_mc.md)에서 순항 속도로 이륙하고 비행합니다.
1. RC 송신기 롤 스틱을 사용하여 기체를 몇 도만 기울여 다음 기동을 수행하십시오. _좌회전 > 오른쪽 롤 > 중심_ (전체 기동은 약 3초가 소요됩니다). 차량은 2번의 진동 내에서 안정되어야 합니다.
1. 각 시도에서 더 큰 진폭으로 기울이면서 기동을 반복합니다. 기체가 ~20도에서 2번의 진동 내에서 안정화될 수 있으면 다음 단계로 이동합니다.
1. 피치 축에서 동일한 동작을 반복합니다. 위의 A에서 작은 각도로 시작하여  기체의 틸트를 증가시키기 전에 2개의 진동 내에서 스스로 움직일 수 있는지 확인하십시오.

드론이 2번의 진동 내에서 스스로 안정화될 수 있으면 자동 튜닝 절차를 위한 준비가 된 것입니다.

그렇지 않은 경우 자동 튜닝을 위해 기체를 준비하기 위한 최소한의 수동 튜닝을 설명하는 [문제 해결](#troubleshooting) 섹션으로 이동합니다.


### 자동 튜닝 단계

자동 튜닝은 **충분한 공간이 있는 안전한 지역**에서 진행하여야 합니다. 약 40초([19~68초](#how-long-does-autotuning-take)) 가량 걸립니다. 최상의 결과를 얻으려면 날씨가 잔잔할 때 테스트를 실행하는 것이 좋습니다.

:::note
조작자는 RC 컨트롤러의 롤/피치 스틱을 움직여 언제든지 시퀀스를 중단할 수 있습니다.
:::

테스트 단계는 다음과 같습니다:

1. [사전 튜닝 테스트](#pre-tuning-test)를 수행합니다.
1. RC를 사용하여 이륙하고 테스트 준비:
   - **멀티콥터:** [고도 모드](../flight_modes/altitude_mc.md)에서 조종기를 사용하여 이륙합니다. 안전한 거리와 지상에서 몇 미터(4~20m)에서 기체를 호버링하십시오.
   - **고정익:** 순항 속도로 비행하면 [유지 모드](../flight_modes/hold.md)를 활성화합니다. 이렇게 하면 비행기가 일정한 고도와 속도로 원을 그리며 비행합니다.
1. QGroundControl에서 메뉴(**차량 설정 > PID 조정**)를 클릭합니다.

   ![튜닝 설정 > 자동 튜닝 활성화됨](../../assets/qgc/setup/autotune/autotune.png)
1. *Rate Controller* 또는 *Attitude Controller* 탭을 선택합니다. **자동 튜닝 활성화** 버튼이 활성화되어 있는 지 확인합니다(이렇게 하면 **자동 튜닝** 버튼이 표시되고 수동 튜닝 선택기가 제거됨).
1. 조이스틱의 움직임을 멈추고 **자동 조정** 버튼을 클릭합니다. 경고 팝업을 읽고 **확인**을 클릭하여 튜닝을 시작합니다.
1. 드론은 먼저 빠른 롤 동작을 수행한 후 피치 및 요 동작을 수행합니다. 진행률은 _자동 조정_ 버튼 옆의 진행률 표시줄에 표시됩니다.
1. 조정 적용:
   - **고정익:** 조정이 즉시/자동으로 적용되고 비행 중에 테스트됩니다(기본값). 그런 다음, PX4는 4초 테스트를 실행하고 문제가 감지되면 새 튜닝 작업을 이전 상태로 되돌립니다.
   - **멀티콥터:** 새로운 조정 매개변수를 적용하기 위해 수동으로 착륙하고 시동을 해제합니다. 조심스럽게 이륙하고 차량이 안정적인지 수동으로 테스트하십시오.
1. 강한 진동이 발생하면 즉시 착지하고 아래 [문제 해결](#troubleshooting) 섹션의 지침을 따르세요.

<br/>

추가 참고 사항:
- **VTOL:** 하이브리드 VTOL 고정익은 MC 모드의 멀티콥터 지침과 FW 모드의 고정익 지침에 따라 두 번 튜닝하여야 합니다.
- **멀티콥터:** 위의 지침은 [고도 모드](../flight_modes/altitude_mc.md)에서 기체를 튜닝합니다. 대신 [이륙 모드](../flight_modes/takeoff.md)에서 이륙하고 기체가 이러한 모드에서 안정적인 것으로 _알려진 경우_ [위치 모드](../flight_modes/position_mc.md)에서 튜닝할 수 있습니다.
- **고정익:** 자동 튜닝은 [고도 모드](../flight_modes/altitude_mc.md) 또는 [위치 모드](../flight_modes/position_mc.md)에서도 실행할 수 있습니다. 그러나 직선으로 비행하면서 테스트를 실행하면 더 큰 튜닝 안전 영역이 필요하며, 더 좋은 튜닝 결과를 보장하지 않습니다.
- 튜닝이 공중에서 적용되는 지 또는 착지 후에 적용되는 지 여부는 [매개변수에서 설정](#parameters)할 수 있습니다.

## 문제 해결

#### 자동 튜닝 전에 테스트 기동을 수행할 때 드론이 진동합니다.

* 느린 진동(초당 1회 또는 더 느린 진동): 이는 종종 대형 플랫폼에서 발생하며 자세 루프가 속도 루프에 비해 너무 빠르다는 것을 의미합니다.
   - **멀티콥터:** [MC_ROLL_P](../advanced_config/parameter_reference.md#MC_ROLL_P) 및 [MC_PITCH_P](../advanced_config/parameter_reference.md#MC_PITCH_P)를 1.0씩 감소
   - **고정익:** 0.1단계씩 [FW_R_TC](../advanced_config/parameter_reference.md#FW_R_TC), [FW_P_TC](../advanced_config/parameter_reference.md#FW_P_TC), [FW_Y_TC](../advanced_config/parameter_reference.md#FW_Y_TC) 증가
* 빠른 진동(초당 1회 이상): 이는 속도 루프의 이득이 너무 높기 때문입니다.
   - **멀티콥터:** 0.02씩 `MC_[ROLL|PITCH|YAW]RATE_K` 감소
   - **고정익:** 0.01 단계씩 [FW_RR_R](../advanced_config/parameter_reference.md#FW_RR_R), [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P), [FW_RR_Y](../advanced_config/parameter_reference.md#FW_RR_Y) 감소

#### 자동 튜닝 실패

자동 튜닝 중에 드론이 충분히 움직이지 않으면, 시스템 식별 알고리즘에 올바른 계수를 찾는 데 문제가 있을 수 있습니다. [FW_AT_SYSID_AMP](../advanced_config/parameter_reference.md#FW_AT_SYSID_AMP), [MC_AT_SYSID_AMP](../advanced_config/parameter_reference.md#MC_AT_SYSID_AMP)를 1단계씩 증가시키고 자동 튜닝을 다시 시작하십시오.

#### 드론이 자동 튜닝 후 진동합니다.

지연, 포화, 슬루율, 기체 유연성과 같은 수학적 모델에 포함되지 않은 효과로 인하여, 루프 이득이 너무 높을 수 있습니다. 이 문제를 해결하려면 [사전 조정 테스트에서 드론이 진동할 때](#the-drone-oscillates-when-performing-the-testing-maneuvers-prior-to-the-auto-tuning)에 설명된 것과 동일한 단계를 따르세요.

#### 여전히 제대로 작동하지 않는 경우:

적절한 가이드를 사용하여 수동 튜닝을 시도합니다.
- [Multicopter PID 튜닝 가이드](../config_mc/pid_tuning_guide_multicopter_basic.md)(수동/간단)
- [Multicopter PID 튜닝 가이드](../config_mc/pid_tuning_guide_multicopter.md)(고급/상세)
- [고정익 PID 튜닝 가이드](../config_fw/pid_tuning_guide_fixedwing.md)


## 매개변수

기본적으로 멀티콥터는 매개변수가 적용되기 전에 착륙하는 반면 고정익은 매개변수를 공중에 적용한 다음 컨트롤러가 제대로 작동하는지 테스트합니다. 이 동작은 각각 [MC_AT_APPLY](../advanced_config/parameter_reference.md#MC_AT_APPLY) 및 [FW_AT_APPLY](../advanced_config/parameter_reference.md#FW_AT_APPLY) 매개변수로 설정할 수 있습니다.

* `0`: 게인이 적용되지 않습니다. 오토 튜닝 알고리즘의 결과를 직접 사용하지 않고 검사하고자 하는 경우 테스트용으로 사용합니다.
* `1`: 무장 해제 후 게인을 적용합니다(멀티콥터의 경우 기본값). 그런 다음 운전자는 조심스럽게 이륙하면서 새로운 튜닝을 테스트할 수 있습니다.
* `2`: 즉시 적용됩니다(고정익의 경우 기본값). 새로운 튜닝이 적용되고 교란이 컨트롤러로 전송되고 다음 4초 동안 안정성이 모니터링됩니다. 제어 루프가 불안정하면 제어 게인이 즉시 이전 값으로 되돌아갑니다. 테스트를 통과하면 조종사는 새로운 튜닝을 사용할 수 있습니다.


고정익(전용)은 [FW_AT_AXES](../advanced_config/parameter_reference.md#FW_AT_AXES) 비트마스크 매개변수로 조정할 축을 선택할 수 있습니다.

* 비트 `0`: 롤(기본값)
* 비트 `1`: 피치(기본값)
* 비트 `2`: 요


## 개발자 SDK

자동 튜닝은 [MAV_CMD_DO_AUTOTUNE_ENABLE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_AUTOTUNE_ENABLE) MAVLink 명령을 사용하여 시작됩니다.

작성시 메시지는 진행을 위해 PX4를 폴링하기 위해 정기적인 간격으로 재전송됩니다. `COMMAND_ACK`에는 작업이 진행 중이라는 결과와 진행률이 백분율로 표시됩니다. 진행률이 100%이거나 차량이 착륙하고 시동 해제하면 작업이 완료됩니다.

:::note
이것은 [명령 프로토콜 장기 실행 명령](https://mavlink.io/en/services/command.html#long_running_commands)의 MAVLink 호환 구현이 아닙니다. 프로토콜이 폴링을 허용하지 않으므로 PX4는 진행 상황을 스트리밍하여야 합니다.
:::

이 기능은 아직 MAVSDK에서 지원되지 않습니다.

## 배경/세부 사항

PX4는 [PID 컨트롤러](../flight_stack/controller_diagrams.md)(속도, 자세, 속도 및 위치)를 사용하여 차량을 현재 예상 상태에서 원하는 설정값과 일치시키기 위해 이동에 필요한 출력을 계산합니다. 기체의 최고 성능을 얻으려면 컨트롤러를 잘 튜닝하여야 합니다. 특히, 속도 컨트롤러를 잘못 튜닝하면 모든 모드에서 비행 안정성이 떨어지고, 교란 회복에 오랜 시간이 걸립니다.

일반적으로 기체와 유사한 [기체 설정](../config/airframe.md)을 사용하면 기체의 비행이 가능합니다. 그러나 설정이 하드웨어와 정확히 일치하지 않으면, 속도 및 자세 컨트롤러를 튜닝하여야 합니다. 속도 및 위치 컨트롤러를 튜닝하는 것은 기체 역학의 영향을 덜 받고 유사한 기체에 대한 기본 튜닝 설정으로 충분하기 때문에 덜 중요합니다.

자동 튜닝은 속도 및 자세 컨트롤러의  자동 튜닝 메커니즘을 제공합니다. 고정익 및 멀티콥터를 튜닝할 수 있으며 멀티콥터 또는 고정익으로 비행시 VTOL 기체를 튜닝할 수 있습니다(모드간 전환은 수동으로 튜닝하여야 함). 이론상으로는 속도 컨트롤러가 있는 다른 기체 유형에서 작동하여야 하지만 현재는 위 유형만 지원됩니다.

프레임이 너무 유연하지 않다면 자동 튜닝은 PX4에서 지원하는 멀티콥터 및 고정익 설정에 적합합니다([자세한 내용은 아래](#does-autotuning-work-for-all-supported-airframes) 참조).

기체는 고도 안정화 모드([고도 모드](../flight_modes/altitude_mc.md), [유지 모드](../flight_modes/hold.md) 또는 [위치 모드](../flight_modes/position_mc.md))에서 비행하여야 합니다. 비행 스택은 각 축에서 차량에 작은 교란을 적용한 다음 새 튜닝 매개변수를 계산하려고 시도합니다. 고정익은 새 튜닝은 기본적으로 공중에서 적용하며, 그 후 기체는 새 설정을 테스트하고 컨트롤러가 안정적이지 않으면 튜닝을 이전 값으로 되돌립니다. 멀티콥터의 경우 기체가 착륙하고 무장 해제 후 새 튜닝 매개변수를 적용합니다. 조종사는 조심스럽게 이륙하여 튜닝을 테스트하여야 합니다.

튜닝 프로세스는 약 40초([19~68초](#how-long-does-autotuning-take))가 소요됩니다. 기본 동작은 [매개변수](#parameters)를 사용하여 설정할 수 있습니다.


### 자주 묻는 질문

#### 어떤 기체 유형이 지원됩니까?

멀티콥터, 고정익 및 하이브리드 VTOL 고정익에 대하여 자동 튜닝이 활성화됩니다.

아직 다른 기체 유형에는 사용할 수 없지만, 이론상으로는 속도 컨트롤러를 사용하는 모든 기체에에 사용할 수 있습니다.

#### 지원되는 모든 기체에 대해 자동 튜닝이 작동합니까?

무인 항공기의 역학을 추정하기 위해 자동 튜닝에 의해 사용되는 수학적 모델은 이것이 축 사이의 결합(SISO)이 없고 복잡성이 제한된(2개의 극과 2개의 0) 선형 시스템이라고 가정합니다. 실제 드론이 이러한 조건에서 너무 멀리 떨어져 있으면, 모델이 드론의 실제 역학을 표현할 수 없습니다.

실제로 자동 튜닝은 기체 유형이 너무 유연하지 않다면, 일반적으로 고정익과 멀티콥터에 적합합니다.

#### 자동 튜닝은 얼마나 걸립니까?

조정은 축당 5초-20초가 소요됩니다(20초 내에 조정을 설정할 수 없는 경우 중단됨) + 각 축 사이의 2초 일시 중지 + 새로운 게인이 공중에서 적용되는 경우 테스트 4초.

멀티콥터는 세 축을 모두 조정해야 하며 기본적으로 새로운 게인을 공중에서 테스트하지 않습니다. 따라서 조정은 19초(`5 + 2 + 5 + 2 + 5`)에서 64초(`20x3 + 2x2`) 사이가 소요됩니다.

기본적으로 고정익은 3개의 축을 모두 조정한 다음, 새 게인을 공중에서 테스트합니다. 따라서 범위는 25초(`5 + 2 + 5 + 2 + 5 + 2 + 4`)와 70초(`20x3 + 3x2 + 4`) 사이입니다.

그러나 위의 설정은 기본값입니다. 멀티콥터는 공중에서 테스트를 실행하도록 선택할 수 있고, 고정익은 실행하지 않도록 선택할 수 있습니다. 또한 고정익은 더 적은 축을 조정하도록 선택할 수 있습니다.

일화에 따르면 두 기체 모두 보통 40초 정도 걸립니다.


<!-- 
#### How vigorous is the disturbance applied by tuning

This might be added later. I'd like to just point to a video.

If not, perhaps say "not very" but you should expect that the vehicle might deflect by as much as 20degrees and so should be able to cope with that deflection with default tuning.

-->


## 참고 항목:

- [Multicopter PID 튜닝 가이드](../config_mc/pid_tuning_guide_multicopter_basic.md)(수동/간단)
- [Multicopter PID 튜닝 가이드](../config_mc/pid_tuning_guide_multicopter.md)(고급/상세)
- [고정익 PID 튜닝 가이드](../config_fw/pid_tuning_guide_fixedwing.md)
