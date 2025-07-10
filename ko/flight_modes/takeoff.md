---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/takeoff
---

# 이륙 모드

[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*이륙* 비행 모드는 기체가 지정된 높이로 상승후, 추가 입력을 기다립니다.

:::note
* 이 모드는 정확한 위치 추정이 필요합니다(예: GPS에서).
* 이 모드를 사용하려면 기체의 시동을 걸어야합니다.
* 이 모드는 자동입니다. 기체를 제어하기 위해 사용자 개입이 *필요하지* 않습니다.
* RC 제어 스위치는 기체의 비행 모드를 변경할 수 있습니다.
* 멀티콥터 (또는 멀티콥터 모드의 VTOL)에서 RC 스틱을 움직이면 위험한 배터리 안전 장치를 처리하지 않는 한 [기본적으로](#COM_RC_OVERRIDE) 기체는 [위치 모드](../flight_modes/position_mc.md)로 변경됩니다.
* The [Failure Detector](../config/safety.md#failure-detector) will automatically stop the engines if there is a problem on takeoff. :::

각 기체 유형에 대한 구체적인 행동은 아래에 설명되어 있습니다.

## 멀티콥터(MC)

멀티 로터는 ` MIS_TAKEOFF_ALT`에 정의된 고도까지 상승하고 위치를 유지합니다.

RC 스틱을 움직이면 차량이 [위치 모드](../flight_modes/position_mc.md)([기본값](#COM_RC_OVERRIDE))로 변경됩니다.

이륙은 다음 매개 변수의 영향을받습니다.

| 매개 변수                                                                                                            | 설명                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_TAKEOFF_ALT"></span>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | 이륙 중 목표 고도 (기본값 : 2.5m)                                                                                                                                 |
| <span id="MPC_TKO_SPEED"></span>[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)       | 상승 속도 (기본값 : 1.5m/s)                                                                                                                                    |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 멀티콥터 (또는 MC 모드의 VTOL)에서 스틱 이동으로 인해 모드가 [위치 모드](../flight_modes/position_mc.md)로 변경 여부를 제어합니다. 자동 모드와 오프 보드 모드에 대해 별도로 활성화할 수 있으며, 기본적으로 자동 모드에서 활성화됩니다. |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | [위치 모드](../flight_modes/position_mc.md)로 전환하는 스틱 이동량 ([COM_RC_OVERRIDE](#COM_RC_OVERRIDE)이 활성화된 경우).                                                  |

<span id="fixed_wing"></span>
## 고정익(FW)

기체는 *투석기/발사 모드* 또는 *활주로 이륙 모드*를 사용하여 현재 방향으로 이륙합니다. 모드는 기본적으로 투석기/수발기가 되지만, [ RWTO_TKOFF](#RWTO_TKOFF)를 사용하여 활주로 이륙으로 설정할 수 있습니다. 두 경우 모두 RC 스틱 제어는 무시됩니다.

<span id="hand_launch"></span>
### 투석기/수동 발사 모드

*투석기/수동 발사 모드*에서 기체는 발사를 감지하기 위해 대기합니다 (가속 트리거 기준). 발사시 약 2초만에 최대 스로틀 ([RWTO_MAX_THR](#RWTO_MAX_THR))까지 상승한 다음 *최소* 10도 이륙 피치로 최대 스로틀 상승합니다. [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF)에 도달하면 [홀드 모드](../flight_modes/hold.md) 배회 비행합니다.

:::note
위에 논의된 동작외에도 일부 조건이 충족 될 때까지 시작 시퀀스가 ​​시작되지 않도록 차단하는 시작 탐지기가 있습니다.
투석기 발사의 경우 이는 약간의 가속 임계치입니다.
:::

<span id="runway_launch"></span>
### 활주로 이륙

*활주로 이륙 모드*에는 다음과 같은 상태가 있습니다.

1. **스로틀 램프** : 이륙을위한 최소 속도 ([FW_AIRSPD_MIN](#FW_AIRSPD_MIN) x [RWTO_AIRSPD_SCL](#RWTO_AIRSPD_SCL))에 도달 할 때까지 활주로에 고정 (피치 고정, )
1. ** 이륙 ** : 피치를 높이고 기체 고도> 항법 고도 ([RWTO_NAV_ALT](#RWTO_NAV_ALT))까지 계속 상승합니다.
1. **상승** :지면 고도 [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF)까지 상승합니다. 이 단계에서는 롤 및 방향 제한은 무시됩니다.


### 고정익 이륙 매개 변수

이륙은 다음 매개 변수의 영향을받습니다.

| 매개 변수                                                                                                            | 설명                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="RWTO_TKOFF"></span>[RWTO_TKOFF](../advanced_config/parameter_reference.md#RWTO_TKOFF)                  | 랜딩 기어가있는 활주로 이륙. 기본값 : 비활성화 됨                                                                                                                                                                                                                                  |
| <span id="RWTO_MAX_THR"></span>[RWTO_MAX_THR](../advanced_config/parameter_reference.md#RWTO_MAX_THR)          | 활주로 이륙 중 최대 스로틀.                                                                                                                                                                                                                                               |
| <span id="FW_CLMBOUT_DIFF"></span>[FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF) | 등반 고도 차이. 이륙 고도 설정값 없이 이륙하는 경우 목표 고도로 사용됩니다 (이륙 모드에는 설정값이 없지만 임무에는 있음).                                                                                                                                                                                        |
| <span id="FW_AIRSPD_MIN"></span>[FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)       | 최소 항속 속도. TECS 컨트롤러가 대기 속도를보다 적극적으로 높이려고 시도합니다.                                                                                                                                                                                                                |
| <span id="RWTO_AIRSPD_SCL"></span>[RWTO_AIRSPD_SCL](../advanced_config/parameter_reference.md#RWTO_AIRSPD_SCL) | 최소  이륙을위한 속도의 스케일링 계수.  피치는 대기 속도에 도달하면 증가합니다 : `FW_AIRSPD_MIN` * `RWTO_AIRSPD_SCL`                                                                                                                                                                            |
| <span id="RWTO_NAV_ALT"></span>[RWTO_NAV_ALT](../advanced_config/parameter_reference.md#RWTO_NAV_ALT)          | 지면 고도 (AGL). 약간의 굴림을 허용하는 충분한 지상고가 있습니다.  `RWTO_NAV_ALT`에 도달할 때까지 기체는 수평을 유지하고 비행 방향 유지를 위하여 방향타만을 사용됩니다 ([RWTO_HDG](../advanced_config/parameter_reference.md#RWTO_HDG) <span id="RWTO_HDG">참조</span>). `FW_CLMBOUT_DIFF` > 0이면 `FW_CLMBOUT_DIFF` 아래에 있어야합니다. |

:::note
기체는 이륙시 항상 일반 FW 최대/최소 스로틀 설정을 따릅니다 ([FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN), [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX)). :::

## 수직 이착륙기

VTOL은 부팅시 MC 모드로 기본 설정되며 일반적으로 [멀티 콥터 모드](#multi-copter-mc) (또한 더 안전함)에서 이륙하는 것을 가정합니다.

그러나, 이륙 전에 고정익으로 전환하면 [고정익](#fixed_wing) 모드로 이륙합니다.

<!-- this maps to AUTO_TAKEOFF in dev -->
