---
canonicalUrl: https://docs.px4.io/main/ko/config/autotune
---

# 자동 튜닝

자동 튜닝은 안정적이고 반응성은 높은 비행에 탁월한 컨트롤러인 PX4의 속도와 자세를 자동으로 튜닝합니다(다른 튜닝은 "선택 사항"에 가깝습니다). It is currently enabled for multicopter, fixed-wing, and hybrid VTOL fixed-wing vehicles.

Tuning only needs to be done once, and is recommended unless you're using a vehicle that has already been tuned by the manufacturer (and not modified since).

:::warning
비행 중에 자동 튜닝이 수행됩니다. The airframe must fly well enough to handle moderate disturbances, and should be closely attended:
- 기체가 [자동 튜닝을 할 만큼 충분히 안정적인지](#pre-tuning-test) 테스트합니다.
- Be ready to abort the autotuning process. You can do this by changing flight modes or using an auto-tune enable/disable switch ([if configured](#enable-disable-autotune-switch-fixed-wing)).
- 튜닝 후 기체가 원활하게 비행하는 지 확인하십시오.
:::

@[유투브](https://youtu.be/5xswOhhqrIQ)


## 사전 튜닝 테스트

기체 자동 튜닝을 실행을 위하여 비행이 가능하도록 적절선에서 안정화 작업이 선행되어야 합니다. 이 테스트는 기체의 위치 제어 모드에서 안전 비행 여부를 확인합니다.

:::note
[기체 설정](../config/airframe.md) 중에 귀하의 기체와 가장 근접하게 일치하는 프레임을 미리 선택하합니다. This may fly well enough to run autotuning.
:::

기체 자동 튜닝 안정성 확인 방법:

1. 비행 구역이 깨끗하고 공간이 충분한 지 확인하기 위하여, 일반적인 비행 전 안전 점검을 실시합니다.
1. 이륙 및 시험 준비
   - **Multicopters:** Take off and hover at 1m above ground in [Altitude mode](../flight_modes_mc/altitude.md) or Stabilized mode.
   - **Fixed-wing:** Take off and fly at cruise speed in [Position mode](../flight_modes_mc/position.md) or [Altitude mode](../flight_modes_mc/altitude.md).
1. RC 송신기 롤 스틱을 사용하여 기체를 몇 도만 기울여 다음 기동을 수행하십시오. _좌회전 > 오른쪽 롤 > 중심_ (전체 기동은 약 3초가 소요됩니다). 기체는 2번의 진동 이내에서 안정화되어야 합니다.
1. 각각의 시도에서 더 큰 진폭으로 기울이면서 기동을 반복합니다. 기체가 ~20도에서 2번의 진동 내에서 안정화될 수 있으면 다음 단계로 이동합니다.
1. 피치 축에서 동일한 동작을 반복합니다. As above, start with small angles and confirm that the vehicle can stabilise itself within 2 oscillations before increasing the tilt.

드론이 2번의 진동 내에서 스스로 안정화될 수 있으면, 자동 튜닝을 위한 준비가 완료된 것입니다.

그렇지 않으면, 기체의 자동 튜닝에 필요한 최소한의 수동 튜닝을 설명하는 [문제 해결](#troubleshooting) 섹션을 참고하십시오.


### Auto-tuning Procedure

자동 튜닝은 **공간이 충분한 안전 지역**에서 진행하여야 합니다. 약 40초([19~68초](#how-long-does-autotuning-take)) 가량 걸립니다. 최상의 결과를 위하여, 날씨가 잔잔할 때 테스트를 실행하는 것이 좋습니다.

The recommended modes for autotuning are [Hold mode](../flight_modes_fw/hold.md) (fixed-wing) and [Altitude mode](../flight_modes_mc/altitude.md) (MC), but any other flight mode can be used. During auto tuning, the RC sticks can still be used to fly the vehicle.

:::note
The auto-tuning sequence can be aborted at any time by changing flight modes or using the [enable/disable Autotune switch](#enable-disable-autotune-switch-fixed-wing) (if configured).
:::

테스트 단계는 다음과 같습니다:

1. [사전 튜닝 테스트](#pre-tuning-test)를 수행합니다.
1. RC를 사용하여 이륙 및 테스트 준비합니다:
   - **Multicopters:** Takeoff using the remote controller in [Altitude mode](../flight_modes_mc/altitude.md). 안전한 거리와 지상에서 4~20m에서 기체를 호버링하십시오.
   - **Fixed-wing:** Once flying at cruise speed, activate [Hold mode](../flight_modes_mc/hold.md). 이렇게 하면 비행기가 일정한 고도와 속도로 원을 그리며 선회 비행합니다.
1. Enable autotune.

:::tip
If an [Enable/Disable Autotune Switch](#enable-disable-autotune-switch-fixed-wing) is configured you can just toggle the switch to the "enabled" position.
:::

   1. QGroundControl에서 메뉴(**차량 설정 > PID 조정**)를 클릭합니다.

      ![튜닝 설정 > 자동 튜닝 활성화](../../assets/qgc/setup/autotune/autotune.png)
   1. *Rate Controller* 또는 *Attitude Controller* 탭을 선택합니다.
   1. **자동 튜닝 활성화** 버튼이 활성화 여부를 확인합니다(이렇게 하면 **자동 튜닝** 버튼이 표시되고 수동 튜닝 선택기가 제거됨).
   1. 경고 팝업을 읽고 **확인**을 클릭하여 튜닝을 시작합니다.
1. 드론은 먼저 빠른 롤 동작을 수행한 후 피치 및 요 동작을 수행합니다. 진행률은 _자동 조정_ 버튼 옆의 진행률 표시줄에 표시됩니다.
1. 튜닝 적용:

   - **Fixed-Wing:** The tuning will be immediately/automatically be applied and tested in flight (by default). 그런 다음, PX4는 4초 테스트를 실행하고 문제가 감지되면 튜닝 작업의 이전 상태로 복원합니다.
   - **멀티콥터:** 새로운 조정 매개변수를 적용을 위하여 수동으로 착륙하고 시동을 해제합니다. 주의하여 이륙하고 차량이 안정성을 수동으로 테스트하십시오.
1. 강한 진동이 발생하면, 즉시 착륙하고 아래 [문제 해결](#troubleshooting) 섹션의 지침을 따르십시오.



추가 참고 사항:

- **VTOL:** Hybrid VTOL fixed-wing vehicles must be tuned twice, following multicopter instructions in MC mode and fixed-wing instructions in FW mode.
- **Multicopter:** The instructions above tune the vehicle in [Altitude mode](../flight_modes_mc/altitude.md). You can instead takeoff in [Takeoff mode](../flight_modes_mc/takeoff.md) and tune in [Position mode](../flight_modes_mc/position.md) if the vehicle is is _known_ to be stable in these modes.
- **Fixed-wing:** Autotuning can also be run in [Altitude mode](../flight_modes_fw/altitude.md) or [Position mode](../flight_modes_fw/position.md). 그러나 직선으로 비행하면서 테스트를 실행하면 더 큰 튜닝 안전 영역이 필요하며, 더 좋은 튜닝 결과를 보장하지 않습니다.
- Whether tuning is applied in-air or after landing can be [configured using parameters](#apply-parameters-when-in-air-landed).

## 문제 해결

#### 자동 튜닝 시작전에 테스트 기동시 드론이 진동합니다.

* 느린 진동(초당 1회 또는 더 느린 진동): 이는 종종 대형 플랫폼에서 발생하며 자세 루프가 속도 루프에 비해 너무 빠르기 때문입니다.
   - **Multicopter:** decrease [MC_ROLL_P](../advanced_config/parameter_reference.md#MC_ROLL_P) and [MC_PITCH_P](../advanced_config/parameter_reference.md#MC_PITCH_P) by steps of 1.0.
   - **Fixed-wing:** increase [FW_R_TC](../advanced_config/parameter_reference.md#FW_R_TC) and [FW_P_TC](../advanced_config/parameter_reference.md#FW_P_TC) by steps of 0.1.
* 빠른 진동(초당 1회 이상): 이는 속도 루프의 이득이 너무 높기 때문입니다.
   - **멀티콥터:** 0.02씩 `MC_[ROLL|PITCH|YAW]RATE_K` 감소
   - **Fixed-wing:** decrease [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P), [FW_PR_P](../advanced_config/parameter_reference.md#FW_PR_P), [FW_YR_P](../advanced_config/parameter_reference.md#FW_YR_P) by steps of 0.01.

#### 자동 튜닝 실패

자동 튜닝시 드론 움직임이 충분하지 않으면, 시스템 식별 알고리즘에 올바른 계수를 찾지 못할 수도 있습니다. [FW_AT_SYSID_AMP](../advanced_config/parameter_reference.md#FW_AT_SYSID_AMP), [MC_AT_SYSID_AMP](../advanced_config/parameter_reference.md#MC_AT_SYSID_AMP)를 1단계씩 증가시킨 후, 자동 튜닝을 다시 시작하십시오.

#### 드론이 자동 튜닝 후 진동합니다.

지연, 포화, 슬루율, 기체 유연성과 같은 수학적 모델에 포함되지 않은 효과로 인하여, 루프 이득이 너무 높을 수 있습니다. 이 문제를 해결하려면, [사전 튜닝 테스트에서 드론이 진동시 해결](#the-drone-oscillates-when-performing-the-testing-maneuvers-prior-to-the-auto-tuning)의 동일한 절차를 따라 해결하십시오.

#### 여전히 정상 작동하지 않는 경우:

적절한 가이드를 사용하여 수동 튜닝을 시도합니다.
- [Multicopter PID 튜닝 가이드](../config_mc/pid_tuning_guide_multicopter_basic.md)(수동/간단)
- [Multicopter PID 튜닝 가이드](../config_mc/pid_tuning_guide_multicopter.md)(고급/상세)
- [고정익 PID 튜닝 가이드](../config_fw/pid_tuning_guide_fixedwing.md)


## Optional Configuration

### Apply Parameters When In-Air/Landed

기본적으로, 멀티콥터는 매개변수 적용전에 착륙하는 반면에, 고정익은 매개변수를 공중에 적용후에 콘트롤러 정상 작동 여부를 테스트합니다. 이 동작은 각각 [MC_AT_APPLY](../advanced_config/parameter_reference.md#MC_AT_APPLY) 및 [FW_AT_APPLY](../advanced_config/parameter_reference.md#FW_AT_APPLY) 매개변수에서 설정합니다.

* `0`: 게인이 적용되지 않습니다. 자동 튜닝의 결과를 직접적으로 사용하지 않은 체로 검사하는 경우에 사용합니다.
* `1`: 무장 해제 후 게인을 적용합니다(멀티콥터의 경우 기본값). 이후, 조종자는 주의하여 이륙하면서 튜닝 결과를 테스트할 수 있습니다.
* `2`: 즉시 적용됩니다(고정익의 경우 기본값). 새로운 튜닝이 적용되고, 교란이 컨트롤러로 전송된 후, 다음 4초 동안 안정성이 모니터링됩니다. 제어 루프가 불안정한 경우, 제어 게인을 즉시 이전 값으로 복원합니다. 테스트를 통과하면, 조종자는 새로운 튜닝 결과를 사용할 수 있습니다.

### Enable/Disable Autotune Switch (Fixed-Wing)

A remote control switch can be configured to enable/disable autotune (in any mode) using an RC AUX channel.

To map a switch:

1. Select an RC channel on your controller to use for the autotune enable/disable switch.
1. Set [RC_MAP_AUX1](../advanced_config/parameter_reference.md#RC_MAP_AUX1) to match the RC channel for your switch (you can use any of `RC_MAP_AUX1` to `RC_MAP_AUX6`).
1. Set [FW_AT_MAN_AUX](../advanced_config/parameter_reference.md#FW_AT_MAN_AUX) to the selected channel (i.e. `1: Aux 1` if you mapped `RC_MAP_AUX1`).

The auto tuner will be disabled when the switch is below `0.5` (on the manual control setpoint range of of `[-1, 1]` and enabled when the switch channel is above `0.5`.

If using an RC AUX switch to enable autotuning, make sure to [select the tuning axes](#select-tuning-axis-fixed-wing) before flight.

### Select Tuning Axis (Fixed-Wing)

Fixed-wing vehicles (only) can select which axes are tuned using the [FW_AT_AXES](../advanced_config/parameter_reference.md#FW_AT_AXES) bitmask parameter:

* 비트 `0`: 롤(기본값)
* 비트 `1`: 피치(기본값)
* 비트 `2`: 요


## 개발자 SDK

자동 튜닝은 [MAV_CMD_DO_AUTOTUNE_ENABLE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_AUTOTUNE_ENABLE) MAVLink 명령을 사용하여 시작합니다.

작성시 메시지는 진행을 위하여 PX4를 폴링하기 위해 주기적으로 재전송됩니다. `COMMAND_ACK`에는 작업이 진행 중이라는 결과와 진행률이 백분율로 표시됩니다. 진행률이 100%이거나 차량이 착륙하고 시동 해제시에 작업이 완료됩니다.

:::note
이것은 [명령 프로토콜 장기 실행 명령](https://mavlink.io/en/services/command.html#long_running_commands)의 MAVLink 호환 구현이 아닙니다. 프로토콜이 폴링을 허용하지 않으므로, PX4는 진행 상황을 스트리밍하여야 합니다.
:::

이 기능은 아직 MAVSDK에서 지원되지 않습니다.

## 배경 및 세부 사항

PX4는 [PID 컨트롤러](../flight_stack/controller_diagrams.md)(속도, 자세, 속도 및 위치)를 사용하여 차량을 현재 예상 상태에서 원하는 설정값과 일치시키기 위하여 이동에 필요한 출력을 계산합니다. 기체의 최고 성능을 발휘하기위하여 최적의 콘트롤러 튜닝이 필요합니다. 특히, 속도 콘트롤러를 잘못 튜닝하면, 대부분의 모드에서 비행 안정성이 떨어지고, 교란 회복에 많은 시간이 걸리게 됩니다.

Generally if you use a [frame configuration](../config/airframe.md) that is similar to your vehicle then the vehicle will be able to fly. 그러나, 하드웨어 설정히 일치하지 않는 경우에는 속도 및 자세 콘트롤러를 튜닝하여야 합니다. 속도 및 위치 컨트롤러의 튜닝은 기체 역학의 영향을 덜 받고 유사한 기체에 대한 기본 튜닝 설정으로 충분하기 때문에 중요성이 떨어집니다.

자동 튜닝은 속도와 자세 콘트롤러의  자동 튜닝 메커니즘을 제공합니다. It can be used to tune fixed-wing and multicopter vehicles, and VTOL vehicles when flying as a multicopter or as a fixed-wing (transition between modes must be manually tuned). 이론상으로는 속도 콘트롤러가 있는 다른 기체 유형에서 작동하여야 하지만 현재는 위의 유형만 지원됩니다.

Automatic tuning works well for the multicopter and fixed-wing vehicle configurations supported by PX4, provided the frame is not too flexible (see [below for more information](#does-autotuning-work-for-all-supported-airframes)).

The vehicle must be flying in an altitude-stabilized mode (such as [Altitude mode](../flight_modes_mc/altitude.md), [Hold mode](../flight_modes_mc/hold.md), or [Position mode](../flight_modes_mc/position.md)). 비행 스택은 각 축에서 차량에 작은 교란을 적용후, 새 튜닝 매개변수 계산을 시도합니다. For fixed-wing vehicles the new tuning is applied in-air by default, after which the vehicle tests the new settings and reverts the tuning if the controllers are not stable. 멀티콥터는 착륙 및 무장 해제 후에 새 튜닝 매개변수를 적용합니다. 조종자는 주의를 기울여 이륙 및 튜닝을 테스트하여야 합니다.

튜닝 프로세스는 약 40초([19~68초](#how-long-does-autotuning-take))가 소요됩니다. The default behaviour can be configured using [parameters](#optional-configuration).


### 자주 묻는 질문

#### 어떤 기체 유형이 지원됩니까?

Autotuning is enabled for multicopter, fixed-wing, and hybrid VTOL fixed-wing vehicles.

아직은 다른 기체 유형에는 사용할 수 없지만, 이론상으로는 속도 콘트롤러를 사용하는 모든 기체에에 적용할 수 있습니다.

#### 지원되는 모든 기체에 대해 자동 튜닝이 작동됩니까?

무인 항공기 역학을 추정하기 위하여 자동 튜닝에 사용되는 수학적 모델은 축간 결합(SISO)이 없고 복잡성이 제한된(2개의 극과 2개의 0) 선형 시스템을 가정합니다. 실제 드론이 이러한 조건에서 상이한 경우에는 모델이 드론의 실제 역학을 표현할 수 없습니다.

In practise, autotuning generally works well for fixed-wing and multicopter, provided the frame is not too flexible.

#### 자동 튜닝은 얼마나 걸립니까?

조정은 축당 5초-20초가 소요됩니다(20초 내에 조정을 설정할 수 없는 경우 중단됨) + 각 축 사이의 2초 일시 중지 + 새로운 게인이 공중에서 적용되는 경우 테스트 4초.

멀티콥터는 세 축을 모두 조정해야 하며 기본적으로 새로운 게인을 공중에서 테스트하지 않습니다. 따라서 조정은 19초(`5 + 2 + 5 + 2 + 5`)에서 64초(`20x3 + 2x2`) 사이가 소요됩니다.

By default a fixed-wing vehicle tunes all three axes and then tests the new gains in-air. 따라서 범위는 25초(`5 + 2 + 5 + 2 + 5 + 2 + 4`)와 70초(`20x3 + 3x2 + 4`) 사이입니다.

그러나, 위의 설정은 기본값입니다. A multicopter can choose to run the tests in air, and a fixed-wing can choose not to. Further, a fixed-wing can choose to tune fewer axes.

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
