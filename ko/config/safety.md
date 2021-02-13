# 안전장치 설정(사고 방지)

PX4에는 문제 발생시 기체를 보호와 복구에 관련된 여러가지 안전 기능들이 있습니다.

* *안전장치* 기능을 통하여 안전 비행 지역, 사고 방지 조건 및 사고방지 기능 작동시 수행할 [작업](#failsafe_actions)(예: 착륙, 현 위치 유지)을 지정할 수 있습니다. 가장 중요한 안전장치는 *QGroundControl*의 [안전 설정](#qgc_safety_setup) 화면에서 설정합니다. 기타는 [매개 변수](#failsafe_other)를 통하여 설정합니다.
* 리모콘의 [안전 스위치](#safety_switch)를 사용하여 문제 발생시 즉시 모터를 중지하거나 기체를 원위치로 복귀시킬 수 있습니다.

<span id="failsafe_actions"></span>

## 안전장치 기능

안전장치 기능들은 여러가지 동작들로 조합됩니다. 일반적인 안전장치 기능들은 아래와 같습니다.<span id="action_flight_termination"></span>비행 종료</ 0></td> 

</tr> 

</tbody> </table> 

:::note
모드를 전환하여 오류 방지 조치 (원인이 수정 된 경우)에서 복구 할 수 있습니다. 예를 들어, RC 손실 안전 장치로 인해 차량이 *복귀 모드*로 들어가는 경우 RC가 복구되면, *위치 모드*로 변경하여 비행을 계속할 수 있습니다.
:::

:::note
차량이 다른 안전 장치에 응답하는 동안 안전 장치가 발생하면 (예 : RC 손실로 인해 반환 모드에있는 동안 배터리 부족), 두 번째 트리거에 대해 지정된 안전 장치 동작이 무시됩니다. 대신 작업은 별도의 시스템 수준과 기체별 코드에 의해 결정됩니다. 이로 인하여 기체 비행은 수동 모드로 변경되어 사용자가 직접 복구할 수 있습니다.
:::

<span id="qgc_safety_setup"></span>

## QGroundControl 안전 설정

*QGroundControl*의 안전 설정 페이지는 *QGroundControl* **기어** 아이콘 (차량 설정 - 상단 도구 모음)을 클릭한 다음 사이드바의 **안전**을 클릭하여 오픈합니다.). 여기에는 가장 중요한 안전장치 설정 (배터리, RC 손실 등)과 귀환 작업(*귀환* 및 *착륙 *)에 관한 설정이 포함됩니다.

![Safety Setup (QGC)](../../assets/qgc/setup/safety/safety_setup.png)

### 배터리 부족 안전장치

배터리 용량이 하나 (또는 그 이상의 경고) 레벨값 아래로 떨어지면 배터리 부족 안전 장치가 작동합니다.

![Safety - Battery (QGC)](../../assets/qgc/setup/safety/safety_battery.png)

가장 일반적인 설정은 위와 같이 값과 작업을 설정하는 것입니다 (`경고 > 페일 세이프 > 긴급` 사용). 이 구성을 사용하면 안전 장치가 경고를 표시한 다음 원위치로 귀환하며, 용량이 일정 수준 아래로 떨어지면 최종적으로 착륙합니다.

[배터리 페일 세이프 레벨](#BAT_CRIT_THR) 안전장치 동작 레벨에 도달하면 경고, 귀환 또는 착륙하도록 *안전장치 조치*를 설정할 수 있습니다.

설정과 기본 매개 변수는 다음과 같습니다.

| 설정                                   | 매개변수                                                                           | 설명                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| 안전장치 기능                              | [COM_LOW_BAT_ACT](../advanced_config/parameter_reference.md#COM_LOW_BAT_ACT) | 용량이 [배터리 안전장치 동작 수준](#BAT_CRIT_THR) 아래로 내려가면 경고, 귀환 또는 착륙, 또는 경고, 귀환, 아래의 각 수준 설정에 따라 착륙합니다. |
| 배터리 경고 수준                            | [BAT_LOW_THR](../advanced_config/parameter_reference.md#BAT_LOW_THR)         | 경고 (또는 기타 조치)에 대한 백분율 용량입니다.                                                                 |
| <span id="BAT_CRIT_THR"></span>배터리 안정장치 수준 | [BAT_CRIT_THR](../advanced_config/parameter_reference.md#BAT_CRIT_THR)       | 귀환 조치 (또는 단일 조치가 선택된 경우 다른 조치)에 대한 용량 백분율.                                                   |
| 배터리 비상 수준                            | [BAT_EMERGEN_THR](../advanced_config/parameter_reference.md#BAT_EMERGEN_THR) | 즉시 착륙시의 용량의 백분율.                                                                             |

<span id="rc_loss_failsafe"></span>

### RC 연결불안정 안전장치

RC 연결불량 안전장치는 RC 송신기 링크가 *수동 모드*에서 무선 조종기의 신호 연결이 약할 경우에 동작합니다.(RC 연결불량 안전장치는 자동 모드 (예 : 임무 중)에는 동작하지 않습니다.).

![Safety - RC Loss (QGC)](../../assets/qgc/setup/safety/safety_rc_loss.png)

:::note
*RC 연결불량 감지*를 위해 PX4와 수신기를 구성해야 할 수도 있습니다. [라디오 설정 > RC 손실 감지](../config/radio.md#rc_loss_detection).
:::

설정과 기본 매개 변수는 다음과 같습니다.

| 설정            | 매개변수                                                                       | 설명                                   |
| ------------- | -------------------------------------------------------------------------- | ------------------------------------ |
| RC 연결불량 시간 초과 | [COM_RC_LOSS_T](../advanced_config/parameter_reference.md#COM_RC_LOSS_T) | RC 연결이 끊어진 후 안전 장치가 동작하기 전까지의 시간입니다. |
| 안전장치 동작       | [NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)     | 비활성화, 배회, 귀환, 착륙, 종료, 봉쇄.            |

### 데이터 연결불량 안전장치

데이터 연결불량 안전 장치는 [미션](../flying/missions.md) 비행시, 원격 측정 링크 (지상국에 연결)가 끊어지면 동작합니다.

![Safety - Data Link Loss (QGC)](../../assets/qgc/setup/safety/safety_data_link_loss.png)

설정과 기본 매개 변수는 다음과 같습니다.

| 설정             | 매개변수                                                                       | 설명                                    |
| -------------- | -------------------------------------------------------------------------- | ------------------------------------- |
| 데이터 연결불량 시간 초과 | [COM_DL_LOSS_T](../advanced_config/parameter_reference.md#COM_DL_LOSS_T) | 데이터 연결이 끊어진 후 안전 장치가 동작하기 전까지의 시간입니다. |
| 안전장치 동작        | [NAV_DLL_ACT](../advanced_config/parameter_reference.md#NAV_DLL_ACT)     | 비활성화, 배회 모드, 귀환 모드, 착륙 모드, 종료, 봉쇄.    |

### Geofence 안전장치

*Geofence 안전장치*는 홈 위치가 중심 좌표인 "가상" 실린더입니다. 차량이 반경을 벗어나거나 고도 이상으로 이동하면 지정된 *안전장치 조치*가 동작합니다.

![Safety - Geofence (QGC)](../../assets/qgc/setup/safety/safety_geofence.png)

:::tip PX4는 여러 임의의 다각형 및 원형 포함 및 제외 영역 ([Flying > GeoFence](../flying/geofence.md))이 있는 GeoFence를 지원합니다.
:::

설정 및 기본 [지오 펜스 매개 변수](../advanced_config/parameter_reference.md#geofence)는 다음과 같습니다.

| 설정     | 매개변수                                                                           | 설명                                     |
| ------ | ------------------------------------------------------------------------------ | -------------------------------------- |
| 위반시 조치 | [GF_ACTION](../advanced_config/parameter_reference.md#GF_ACTION)               | 없음, 경고, 보류 모드, 반환 모드, 종료, 착륙.          |
| 최대 반경  | [GF_MAX_HOR_DIST](../advanced_config/parameter_reference.md#GF_MAX_HOR_DIST) | 지오펜스 실린더의 수평 반경. 0 인 경우 지오펜스가 비활성화됩니다. |
| 최대 고도  | [GF_MAX_VER_DIST](../advanced_config/parameter_reference.md#GF_MAX_VER_DIST) | 지오펜스 실린더의 높이. 0 인 경우 지오펜스가 비활성화됩니다.    |

:::note
`GF_ACTION`을 종료하도록 설정하면 지오펜스 위반시 기체의 동작이 정지하게 됩니다. 이 기능은 위험성이 높으므로 [CBRK_FLIGHTTERM](#CBRK_FLIGHTTERM)을 사용하여 비활성화되며, 시스템을 실제로 종료하려면 0으로 재설정해야합니다.
:::

다음 설정도가능하지만 QGC UI에 표시되지 않습니다.

| 설정                                      | 매개변수                                                                         | 설명                                               |
| --------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| 지오펜스 고도 모드                              | [GF_ALTMODE](../advanced_config/parameter_reference.md#GF_ALTMODE)           | 사용 된 고도 기준: 0 = WGS84, 1 = AMSL.                 |
| 지오펜스 카운터 제한                             | [GF_COUNT](../advanced_config/parameter_reference.md#GF_COUNT)               | 지오펜스 위반이 트리거되기 전에 펜스 외부에서 필요한 후속 위치 측정 수를 설정합니다. |
| 지오펜스 소스                                 | [GF_SOURCE](../advanced_config/parameter_reference.md#GF_SOURCE)             | 위치 소스가 글로벌 위치인지 또는 GPS 장치에서 직접 가져 오는 지를 설정합니다.   |
| <span id="CBRK_FLIGHTTERM"></span>비행 종료용 회로 차단기 | [CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | 비행 종료 작업을 활성화/비활성화합니다 (기본적으로 비활성화 됨).            |

<span id="return_settings"></span>

### 귀환 설정

*귀환*는 [귀환 모드](../flight_modes/return.md)를 사용하여 차량을 홈 위치로 돌아오게하는 [안전장치](#failsafe_actions)입니다. 이 섹션에서는 귀환 후 착륙/배회 동작을 설정법을 설명합니다.

![Safety - Return Home Settings (QGC)](../../assets/qgc/setup/safety/safety_return_home.png)

설정과 기본 매개 변수는 다음과 같습니다:

| 설정      | 매개변수                                                                           | 설명                                        |
| ------- | ------------------------------------------------------------------------------ | ----------------------------------------- |
| 고도 상승   | [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)   | 기체은 귀환을 위해이 최소 높이 (아래에있는 경우)까지 상승합니다.     |
| 기본 동작   |                                                                                | *귀환*의 선택 목록 : 착륙, 배회, 미착륙 또는 배회, 일정시간후 착륙 |
| 정지비행 고도 | [RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | 귀환시 배회를 선택하면 차량이 유지하는 고도를 지정할 수 있습니다.     |
| 정지비행 시간 | [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)   | 배회후 착륙이 선택하면 기체의 정지 비행 시간을 설정합니다.         |

:::note
귀환 동작은 [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)에 의해 정의됩니다. 음수이면 즉시 착륙합니다. 더 자세한 정보는 [귀환 모드](../flight_modes/return.md)를 참고하십시오.
:::

### 착륙모드 설정

*현재 위치의 착륙*는 [착륙 모드](../flight_modes/land.md)를 실행하는 일반적인 [안전 조치](#failsafe_actions)입니다. 이 섹션에서는 착륙 후 차량이 자동으로 시동을 꺼는 방법과 시점을 설정법을 설명합니다. Multicopters에서만 하강 속도를 추가로 설정 가능합니다.

![Safety - Land Mode Settings (QGC)](../../assets/qgc/setup/safety/safety_land_mode.png)

설정과 기본 매개 변수는 다음과 같습니다:

| 설정        | 매개변수                                                                           | 설명                                                       |
| --------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| 착륙후 시동 꺼기 | [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 착륙 후 시동을 끄려면 확인란을 선택합니다. 값은 0 이상으로 1초 미만의 값도 설정할 수 있습니다. |
| 착륙 하강률    | [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 착륙 하강율(멀티콥더에만 적용됨).                                      |

<span id="failsafe_other"></span>

## 기타 안전장치 설정

이 섹션에는 *QGroundControl*의 [안전 설정](#qgc_safety_setup) 페이지에서 설정할 수 없는 안전장치 설정에 관하여 설명합니다.

### 위치 (GPS) 손실 안전장치

*위치 손실 안전장치*는 위치 추정이 필요한 모드에서 PX4 위치 추정 품질이 일정 수준(GPS 손실로 인해 발생할 수 있음) 이하가 되면 작동합니다.

실패 동작은 RC 제어가 사용 가능한지 여부 (및 고도 정보)에 따라 [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)에 의해 제어됩니다.

* `0` : 원격 제어 가능. 고도 추정치를 사용할 수 있으면 *고도 모드*로 전환하고, 그렇지 않으면 *안정 모드*로 전환됩니다.
* `1` : 원격 제어 *불가*. 고도값을 사용할 수있는 경우 *착륙 모드*로 전환하고, 그렇지 않으면 비행 종료를 입력합니다.

고정익에는 위치 손실시 착륙이전의 선회 비행 시간을 정의하는 매개 변수가 [NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT) 있습니다.

아래 표시된 모든 차량에 대한 관련 매개 변수 ([GPS 장애 내비게이션 매개 변수](../advanced_config/parameter_reference.md#gps-failure-navigation) 참조) :

| 매개변수                                                                             | 설명                                                   |
| -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [COM_POS_FS_DELAY](../advanced_config/parameter_reference.md#COM_POS_FS_DELAY) | 위치 손실 후 안전 장치 동작 지연 여부 설정                            |
| [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)   | 임무 중 위치 제어 탐색 손실 응답. 값 : 0 - RC 사용 가정, 1 - RC 없음 가정. |
| [CBRK_VELPOSERR](../advanced_config/parameter_reference.md#CBRK_VELPOSERR)       | 위치 오류 검사를위한 회로 차단기 (모든 모드에서 오류 검사 비활성화).             |

고정익 전용 매개 변수:

| 매개변수                                                                   | 설명                                                 |
| ---------------------------------------------------------------------- | -------------------------------------------------- |
| [NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT) | 선회 비행 시간 (비행 종료 전 GPS 복구 대기). 비활성화 하려면 0으로 설정하십시오. |
| [NAV_GPSF_P](../advanced_config/parameter_reference.md#NAV_GPSF_P)   | 선회 비행시 고정 피치 각도.                                   |
| [NAV_GPSF_R](../advanced_config/parameter_reference.md#NAV_GPSF_R)   | 선회 비행시 고정 롤/뱅크 각도.                                 |
| [NAV_GPSF_TR](../advanced_config/parameter_reference.md#NAV_GPSF_TR) | 선회 비행 추력                                           |

### 오프 보드 안전장치

오프 보드 제어시에 오프 보드 링크가 손실되면 *오프 보드 안전장치</ 0>가 동작합니다. RC 연결을 사용할 수 있는지 여부에 따라 다른 안전장치 동작을 지정할 수 있습니다.</p> 

관련 매개 변수는 다음과 같습니다.

| 매개변수                                                                         | 설명                                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | 오프 보드 단락이후 안전장치 동작 지연 여부 설정.                                       |
| [COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)       | RC를 사용할 수 없는 경우 비상 안전조치 : 착륙 모드, 대기 모드, 귀환 모드.                     |
| [COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | RC를 사용할 수있는 경우 비상 안전조치 : 위치 모드, 고도 모드, 수동 모드, 귀환 모드, 착륙 모드, 대기 모드. |

### 임수 실패 안전 장치

임무 실패 안전 장치는 설정된 미션이 새로운 이륙 위치에서 시작되거나 웨이포인트 거리가 너무 큰 경우를 방지합니다. 안전조치는 임무가 실행되지 않는 것입니다.

관련 매개 변수는 다음과 같습니다.

| 매개변수                                                                     | 설명                                                            |
| ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [MIS_DIST_1WP](../advanced_config/parameter_reference.md#MIS_DIST_1WP) | 현재 웨이포인트가 홈 위치에서 멀리 떨어진 경우 임무가 시작되지 않습니다. 값이 0 이하이면 비활성화 됩니다. |
| [MIS_DIST_WPS](../advanced_config/parameter_reference.md#MIS_DIST_WPS) | 두 개의 웨이포인트 사이의 거리가 크면 임무가 시작되지 않습니다.                          |

### 교통 회피 안전장치

교통 회피 안전장치를 사용하면 PX4가 미션 중에 transponders 데이터 (예 : [ADSB transponder](../advanced_features/traffic_avoidance_adsb.md)에서)에 응답할 수 있습니다.

관련 매개 변수는 다음과 같습니다.

| 매개변수                                                                           | 설명                                       |
| ------------------------------------------------------------------------------ | ---------------------------------------- |
| [NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | 비상 안전조치를 설정합니다 : 비활성화, 경고, 귀환 모드, 착륙 모드. |

### 적응형 QuadChute 안전장치

푸셔 모터 (또는 대기 속도 센서)가 고장나거나, 고정익이 더 이상 고정익 모드에서 원하는 고도 설정 값에 도달할 수 없는 경우를위한 안전 장치입니다. 동작시에 수직이착륙기는 멀티 콥터 모드로 전환되고 안전 장치는 [반환 모드](../flight_modes/return.md)로 설정됩니다.

:::note
필요한 경우 *귀환 모드*를 일시 중지하고 고정익 비행으로 전환할 수 있습니다. 안전장치가 동작할 조건이 되면, 다시 작동하게 됩니다.
:::

관련 매개 변수는 다음과 같습니다.

| 매개변수                                                                       | 설명                                                                               |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [VT_FW_ALT_ERR](../advanced_config/parameter_reference.md#VT_FW_ALT_ERR) | 고정익 비행에 대한 고도 오류 음수의 최대 절대값 고도가 설정치 이하가 되면, 기체는 MC 모드로 다시 전환되고 안전 장치 RTL로 전환됩니다. |

<span id="failure_detector"></span>

## 고장 감지기

고장 감지기를 사용하면 차량이 예기치 않게 뒤집히거나 외부 고장 감지 시스템에서 알림을받은 경우 보호 조치를 취할 수 있습니다.

**비행**중에 실패 감지기를 사용하여 실패 조건이 충족되면 [비행 종료](../advanced_config/flight_termination.md)를 작동시켜서, [낙하산](../peripherals/parachute.md)을 펼치는 등의 작업을 수행할 수 있습니다.

:::note
비행 중 실패 감지는 기본적으로 비활성화되어 있습니다 (매개 변수 : [CBRK_FLIGHTTERM=0](#CBRK_FLIGHTTERM)을 설정하여 활성화).
:::

**이륙**중에 차량이 뒤집히면 고장 감지기 [자세 트리거](#attitude_trigger)가 [잠금 동작](#action_lockdown)을 호출합니다(잠금은 모터를 정지시키지만, 비행 종료와 달리 낙하산을 펼치거나 기타 실패 조치 수행하지 않음). 이 확인은 `CBRK_FLIGHTTERM` 매개 변수에 관계없이 *이륙시 항상 사용*합니다.

The failure detector is active in all vehicle types and modes, except for those where the vehicle is *expected* to do flips (i.e. [Acro mode (MC)](../flight_modes/altitude_mc.md), [Acro mode (FW)](../flight_modes/altitude_fw.md), [Rattitude](../flight_modes/rattitude_mc.md) and [Manual (FW)](../flight_modes/manual_fw.md)).

<span id="attitude_trigger"></span>

### Attitude Trigger

The failure detector can be configured to trigger if the vehicle attitude exceeds predefined pitch and roll values for longer than a specified time.

The relevant parameters are shown below:

| Parameter                                                                                              | Description                                                                                                                      |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| <span id="CBRK_FLIGHTTERM"></span>[CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | Flight termination circuit breaker. Unset from 121212 (default) to enable flight termination due to FailureDetector or FMU loss. |
| <span id="FD_FAIL_P"></span>[FD_FAIL_P](../advanced_config/parameter_reference.md#FD_FAIL_P)           | Maximum allowed pitch (in degrees).                                                                                              |
| <span id="FD_FAIL_R"></span>[FD_FAIL_R](../advanced_config/parameter_reference.md#FD_FAIL_R)           | Maximum allowed roll (in degrees).                                                                                               |
| <span id="FD_FAIL_P_TTRI"></span>[FD_FAIL_P_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_P_TTRI) | Time to exceed [FD_FAIL_P](#FD_FAIL_P) for failure detection (default 0.3s).                                                   |
| <span id="FD_FAIL_R_TTRI"></span>[FD_FAIL_R_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_R_TTRI) | Time to exceed [FD_FAIL_R](#FD_FAIL_R) for failure detection (default 0.3s).                                                   |

<span id="external_ats"></span>

### External Automatic Trigger System (ATS)

The [failure detector](#failure_detector), if [enabled](#CBRK_FLIGHTTERM), can also be triggered by an external ATS system. The external trigger system must be connected to flight controller port AUX5 (or MAIN5 on boards that do not have AUX ports), and is configured using the parameters below.

:::note
External ATS is required by [ASTM F3322-18](https://webstore.ansi.org/Standards/ASTM/ASTMF332218). One example of an ATS device is the [FruityChutes Sentinel Automatic Trigger System](https://fruitychutes.com/uav_rpv_drone_recovery_parachutes/sentinel-automatic-trigger-system.htm).
:::

| Parameter                                                                                                | Description                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span id="FD_EXT_ATS_EN"></span>[FD_EXT_ATS_EN](../advanced_config/parameter_reference.md#FD_EXT_ATS_EN)     | Enable PWM input on AUX5 or MAIN5 (depending on board) for engaging failsafe from an external automatic trigger system (ATS). Default: Disabled. |
| <span id="FD_EXT_ATS_TRIG"></span>[FD_EXT_ATS_TRIG](../advanced_config/parameter_reference.md#FD_EXT_ATS_TRIG) | The PWM threshold from external automatic trigger system for engaging failsafe. Default: 1900 ms.                                                |

<span id="safety_switch"></span>

## Emergency Switches

Remote control switches can be configured (as part of *QGroundControl* [Flight Mode Setup](../config/flight_mode.md)) to allow you to take rapid corrective action in the event of a problem or emergency; for example, to stop all motors, or activate [Return mode](#return_switch).

This section lists the available emergency switches.

<span id="kill_switch"></span>

### Kill Switch

A kill switch immediately stops all motor outputs (and if flying, the vehicle will start to fall)! The motors will restart if the switch is reverted within 5 seconds. After 5 seconds the vehicle will automatically disarm; you will need to arm it again in order to start the motors.

<span id="arming_switch"></span>

### Arm/Disarm Switch

The arm/disarm switch is a *direct replacement* for the default stick-based arming/disarming mechanism (and serves the same purpose: making sure there is an intentional step involved before the motors start/stop). It might be used in preference to the default mechanism because:

* Of a preference of a switch over a stick motion.
* It avoids accidentally triggering arming/disarming in-air with a certain stick motion.
* There is no delay (it reacts immediately).

The arm/disarm switch immediately disarms (stop) motors for those [flight modes](../getting_started/flight_modes.md) that *support disarming in flight*. This includes:

* *Manual mode*
* *Acro mode*
* *Stabilized*
* *Rattitude*

For modes that do not support disarming in flight, the switch is ignored during flight, but may be used after landing is detected. This includes *Position mode* and autonomous modes (e.g. *Mission*, *Land* etc.).

:::note
[Auto disarm timeouts](#auto-disarming-timeouts) (e.g. via [COM_DISARM_LAND](#COM_DISARM_LAND)) are independent of the arm/disarm switch - ie even if the switch is armed the timeouts will still work.
:::

<!--
**Note** This can also be done by [manually setting](../advanced_config/parameters.md) the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter to the corresponding switch RC channel.
  If the switch positions are reversed, change the sign of the parameter [RC_ARMSWITCH_TH](../advanced_config/parameter_reference.md#RC_ARMSWITCH_TH) (or also change its value to alter the threshold value).
-->

<span id="return_switch"></span>

### Return Switch

A return switch can be used to immediately engage [Return mode](../flight_modes/return.md).

## Other Safety Settings

<span id="auto-disarming-timeouts"></span>

### Auto-disarming Timeouts

You can set timeouts to automatically disarm a vehicle if it is too slow to takeoff, and/or after landing (disarming the vehicle removes power to the motors, so the propellers won't spin).

The [relevant parameters](../advanced_config/parameters.md) are shown below:

| Parameter                                                                                                  | Description                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | Timeout for auto-disarm after landing.                     |
| <span id="COM_DISARM_PRFLT"></span>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | Timeout for auto disarm if vehicle is too slow to takeoff. |

## Further Information

* [QGroundControl User Guide > Safety Setup](https://docs.qgroundcontrol.com/en/SetupView/Safety.html)