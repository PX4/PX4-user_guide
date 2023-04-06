# 안전 설정(사고 방지)

PX4에는 문제 발생시에 기체를 보호하고 복구하는 다양한 안전장치들을 제공합니다.

* *안전장치* 기능을 통하여 안전 비행 지역, 사고 방지 조건 및 사고방지 기능 작동시 수행할 [작업](#failsafe-actions)(예: 착륙, 현 위치 유지)을 지정할 수 있습니다. 가장 중요한 안전장치는 *QGroundControl*의 [안전 설정](#qgroundcontrol-safety-setup) 화면에서 설정합니다. 기타는 [매개 변수](#other-safety-settings)를 통하여 설정합니다.
* 리모콘의 [안전 스위치](#emergency-switches)를 사용하여 문제 발생시 즉시 모터를 중지하거나 기체를 원위치로 복귀시킬 수 있습니다.


## 안전장치 기능

When a failsafe is triggered, the default behavior (for most failsafes) is to enter Hold for [COM_FAIL_ACT_T](../advanced_config/parameter_reference.md#COM_FAIL_ACT_T) seconds before performing an associated failsafe action. This gives the user time to notice what is happening and override the failsafe if needed. In most cases this can be done by using RC or a GCS to switch modes (note that during the failsafe-hold, moving the RC sticks does not trigger an override).

The list below shows the set of all failsafe actions, ordered in increasing severity. Note that different types of failsafe may not support all of these actions.

| 동작                                                                         | 설명                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="action_none"></a>없음/비활성화                                           | No action. The failsafe will be ignored.                                                                                                                                                                                                                                  |
| <a id="action_warning"></a>경고                                                | A warning message will be sent (i.e. to *QGroundControl*).                                                                                                                                                                                                                |
| <a id="action_hold"></a>[대기 모드](../flight_modes/hold.md)                  | 기체는 *대기 모드*로 들어갑니다. 멀티콥터는 제자리에서 호버링을 하고, 고정익은 원주 선회 비행을 합니다.                                                                                                                                                                                                              |
| <a id="action_return"></a>[복귀 모드](../flight_modes/return.md)                | 기체는 *복귀 모드*로 들어갑니다. 복귀 경로는 [복귀 설정](#return-mode-settings)에서 자세히 설정할 수 있습니다.                                                                                                                                                                                               |
| <a id="action_land"></a>[착륙 모드](../flight_modes/land.md)                  | 차량은 *착륙 모드*로 전환하여 즉시 착륙합니다.                                                                                                                                                                                                                                               |
| <a id="action_disarm"></a>Disarm                                            | Stops the motors immediately.                                                                                                                                                                                                                                             |
| <a id="action_flight_termination"></a>[비행 종료](../advanced_config/flight_termination.md) | 모든 컨트롤러를 끄고 모든 PWM 출력을 안전 장치 값(예 : [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1), [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1))으로 설정합니다. 안전장치 출력은 낙하산, 랜딩 기어를 배치하거나 다른 작업을 수행할 수 있습니다. 고정익은 안전하게 활공할 수 있습니다. |

If multiple failsafes are triggered, the more severe action is taken. For example if both RC and GPS are lost, and manual control loss is set to [Return mode](#action_return) and GCS link loss to [Land](#action_land), Land is executed.

:::tip
The exact behavior when different failsafes are triggered can be tested with the [Failsafe State Machine Simulation](safety_simulation.md).
:::

## QGroundControl 안전 설정

The *QGroundControl* Safety Setup page is accessed by clicking the *QGroundControl* icon, **Vehicle Setup**, and then **Safety** in the sidebar). This includes the most important failsafe settings (battery, RC loss etc.) and the settings for the triggered actions *Return* and *Land*.

![Safety Setup(QGC)](../../assets/qgc/setup/safety/safety_setup.png)

### 배터리 부족 안전장치

하나 이상의 배터리의 용량이 레벨값 아래로 떨어지면 배터리 부족 안전 장치가 작동합니다.

![안전 - 배터리 (QGC)](../../assets/qgc/setup/safety/safety_battery.png)

가장 일반적인 설정은 위와 같이 값과 작업을 설정하는 것입니다 (`경고 > 페일 세이프 > 긴급` 사용). 이 설정을 사용하면 안전 장치가 경고를 표시한 다음 원위치로 귀환하며, 용량이 일정 수준 아래로 떨어지면 최종적으로 착륙합니다.

[배터리 페일 세이프 레벨](#BAT_CRIT_THR) 안전장치 동작 레벨에 도달하면 경고, 귀환 또는 착륙하도록 *안전장치 조치*를 설정할 수 있습니다.

설정에 관련된 기본 매개변수는 다음과 같습니다.

| 설정                                         | 매개변수                                                                           | 설명                                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| 안전장치 동작                                    | [COM_LOW_BAT_ACT](../advanced_config/parameter_reference.md#COM_LOW_BAT_ACT) | 용량이 [배터리 안전장치 동작 수준](#BAT_CRIT_THR) 아래로 내려가면 경고, 귀환 또는 착륙, 또는 경고, 귀환, 아래의 각 수준 설정에 따라 착륙합니다. |
| 배터리 경고 수준                                  | [BAT_LOW_THR](../advanced_config/parameter_reference.md#BAT_LOW_THR)         | 경고 (또는 기타 조치)에 대한 용량을 백분율로 설정합니다.                                                            |
| <span id="BAT_CRIT_THR"></span>배터리 안정장치 수준 | [BAT_CRIT_THR](../advanced_config/parameter_reference.md#BAT_CRIT_THR)       | 귀환 조치 (또는 단일 조치가 선택된 경우 다른 조치)에 대한 용량에 대한 백분율.                                               |
| 배터리 비상 수준                                  | [BAT_EMERGEN_THR](../advanced_config/parameter_reference.md#BAT_EMERGEN_THR) | 즉시 착륙시의 용량의 백분율.                                                                             |


### RC 손실 안전장치

The RC Loss failsafe may be triggered if the RC transmitter link is lost in manual modes (by default RC loss does not trigger the failsafe in missions, hold mode, or offboard mode).

![안전 - RC 손실 (QGC)](../../assets/qgc/setup/safety/safety_rc_loss.png)

Generally you will only want to set the _Failsafe_ action:

- The _RC Lost Timeout_ is the time after data stops updating before the link is considered lost. This must be kept short because the vehicle will continue to fly using the old RC data until the timeout triggers.
- You may need to modify the [COM_FAIL_ACT_T](#COM_FAIL_ACT_T) parameter. This is a delay after the link is lost and before the failsafe action is triggered in which the vehicle waits in hold mode for the RC system to reconnect. This might be longer for long-range flights so that intermittent connection loss doesn't immediately invoke the failsafe. It can be to zero so that the failsafe triggers immediately.

:::tip PX4는 여러 임의의 다각형 및 원형 포함 및 제외 영역 ([Flying > GeoFence](../flying/geofence.md))이 있는 GeoFence를 지원합니다.
:::

Additional (and underlying) parameter settings are shown below.

| 매개변수                                                                                                   | 설정                      | 설명                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="COM_RC_LOSS_T"></a>[COM_RC_LOSS_T](../advanced_config/parameter_reference.md#COM_RC_LOSS_T)    | RC 연결불량 시간 초과           | [COM_RC_LOSS_T](../advanced_config/parameter_reference.md#COM_RC_LOSS_T) | Time after RC stops updating supplied data that the RC link is considered lost. |
| <a id="COM_FAIL_ACT_T"></a>[COM_FAIL_ACT_T](../advanced_config/parameter_reference.md#COM_FAIL_ACT_T)  | Failsafe Reaction Delay | Delay in seconds between failsafe condition triggered and failsafe reaction (RTL, Land, Hold).                                                               |
| <a id="NAV_RCL_ACT"></a>[NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)        | 안전장치 동작                 | Disabled, Loiter, Return, Land, Disarm, Terminate.                                                                                                           |
| <a id="COM_RCL_EXCEPT"></a>[COM_RCL_EXCEPT](../advanced_config/parameter_reference.md#COM_RCL_EXCEPT) | RC 손실 예외                | RC 손실이 무시되는 모드를 설정합니다: 미션(기본값), 정지, 오프보드.                                                                                                                    |

### 데이터 연결불량 안전장치

데이터 연결불량 안전 장치는 [미션](../flying/missions.md) 수행시, 텔레메트리 통신(지상국에 연결)이 끊어지면 동작합니다.

![안전 - 데이터 링크 손실 (QGC)](../../assets/qgc/setup/safety/safety_data_link_loss.png)

설정에 관련된 기본 매개변수는 다음과 같습니다.

| 설정             | 매개변수                                                                       | 설명                                                              |
| -------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 데이터 연결불량 시간 초과 | [COM_DL_LOSS_T](../advanced_config/parameter_reference.md#COM_DL_LOSS_T) | 데이터 연결이 끊어진 후 안전 장치가 동작하기 전까지의 시간입니다.                           |
| 안전장치 동작        | [NAV_DLL_ACT](../advanced_config/parameter_reference.md#NAV_DLL_ACT)     | Disabled, Hold mode, Return mode, Land mode, Disarm, Terminate. |


### Geofence 안전장치

*Geofence 안전장치*는 홈 위치가 중심 좌표인 "가상" 실린더입니다. 차량이 반경을 벗어나거나 고도 이상으로 이동하면 지정된 *안전장치 조치*가 동작합니다.

![안전 - 지오펜스 (QGC)](../../assets/qgc/setup/safety/safety_geofence.png)

:::note
쿼드슈트는 `param2`가 `1`로 설정된 MAVLINK [MAV_CMD_DO_VTOL_TRANSITION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_VTOL_TRANSITION) 메시지를 전송하여 실행할 수 있습니다.
:::

설정 및 기본 [Geofence 매개변수](../advanced_config/parameter_reference.md#geofence)는 다음과 같습니다.

| 설정                  | 매개변수                                                                           | 설명                                     |
| ------------------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| <nobr>위반시 동작</nobr> | [GF_ACTION](../advanced_config/parameter_reference.md#GF_ACTION)               | 없음, 경고, 보류 모드, 반환 모드, 종료, 착륙.          |
| 최대 반경               | [GF_MAX_HOR_DIST](../advanced_config/parameter_reference.md#GF_MAX_HOR_DIST) | 지오펜스 실린더의 수평 반경. 0 인 경우 지오펜스가 비활성화됩니다. |
| 최대 고도               | [GF_MAX_VER_DIST](../advanced_config/parameter_reference.md#GF_MAX_VER_DIST) | 지오펜스 실린더의 높이. 0 인 경우 지오펜스가 비활성화됩니다.    |

:::note
`GF_ACTION`을 종료하도록 설정하면, 지오펜스 위반시 기체의 동작이 정지합니다. 이 기능은 위험성이 높으므로 [CBRK_FLIGHTTERM](#CBRK_FLIGHTTERM)을 사용하여 비활성화되며, 시스템을 실제로 종료하려면 0으로 재설정하여야 합니다.
:::

다음 설정도 가능하지만 QGC UI에 표시되지 않습니다.

| 설정                                              | 매개변수                                                                         | 설명                                               |
| ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| 지오펜스 고도 모드                                      | [GF_ALTMODE](../advanced_config/parameter_reference.md#GF_ALTMODE)           | 사용 고도 기준: 0 = WGS84, 1 = AMSL.                   |
| 지오펜스 카운터 제한                                     | [GF_COUNT](../advanced_config/parameter_reference.md#GF_COUNT)               | 지오펜스 위반이 트리거되기 전에 펜스 외부에서 필요한 후속 위치 측정 수를 설정합니다. |
| 지오펜스 소스                                         | [GF_SOURCE](../advanced_config/parameter_reference.md#GF_SOURCE)             | 위치 소스가 글로벌 위치인지 또는 GPS 장치에서 직접 가져오는 지를 설정합니다.    |
| <span id="CBRK_FLIGHTTERM"></span>비행 종료용 회로 차단기 | [CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | 비행 종료 작업을 활성화/비활성화합니다 (기본적으로 비활성화 됨).            |


### 복귀 설정

*귀환*는 [귀환 모드](../flight_modes/return.md)를 사용하여 차량을 홈 위치로 돌아오게하는 [안전장치](#failsafe-actions)입니다. 이 섹션에서는 귀환 후 착륙/배회 동작을 설정 방법에 대하여 설명합니다.

![안전 - 귀한 설정 (QGC)](../../assets/qgc/setup/safety/safety_return_home.png)

설정 기본 매개변수는 다음과 같습니다:

| 설정                   | 매개변수                                                                           | 설명                                        |
| -------------------- | ------------------------------------------------------------------------------ | ----------------------------------------- |
| 고도 상승                | [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)   | 기체은 귀환을 위해이 최소 높이 (아래에있는 경우)까지 상승합니다.     |
| 기본 동작                |                                                                                | *귀환*의 선택 목록 : 착륙, 배회, 미착륙 또는 배회, 일정시간후 착륙 |
| <nobr>정지비행 고도</nobr> | [RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | 귀환시 배회를 선택하면 기체의 유지 고도를 설정할 수 있습니다.       |
| <nobr>정지비행 시간</nobr> | [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)   | 배회후 착륙이 선택하면 기체의 정지 비행 시간을 설정합니다.         |

:::note
The return behaviour is defined by [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY). 음수이면 기체는 즉시 착륙합니다. 더 자세한 정보는 [복귀 모드](../flight_modes/return.md)를 참고하십시오.
:::

### 착륙 모드 설정

*현재 위치의 착륙*는 [착륙 모드](../flight_modes/land.md)를 실행하는 일반적인 [안전 조치](#failsafe-actions)입니다. 이 섹션에서는 착륙후 기체의 자동 시동 방법과 시간 설정 방법을 설명합니다. 멀티콥터에서만 하강 속도를 추가로 설정할 수 있습니다.

![안전 - 착륙 모드 설정(QGC)](../../assets/qgc/setup/safety/safety_land_mode.png)

설정 기본 매개변수는 다음과 같습니다:

| 설정                     | 매개변수                                                                           | 설명                                                      |
| ---------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------- |
| <nobr>착륙후 시동 꺼기</nobr> | [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 착륙후 시동을 끄려면 확인란을 선택합니다. 값은 0 이상으로 1초 미만의 값도 설정할 수 있습니다. |
| 착륙 하강률                 | [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 착륙 하강율(멀티콥더에만 적용됨).                                     |


## 기타 안전 장치 설정

이 섹션에는 *QGroundControl*의 [안전 설정](#qgroundcontrol-safety-setup) 페이지에서 설정할 수 없는 안전장치 설정에 관하여 설명합니다.

### 위치(GPS) 손실 안전 장치

*위치 손실 안전장치*는 위치 추정이 필요한 모드에서 PX4 위치 추정 품질이 일정 수준(GPS 손실로 인해 발생할 수 있음) 이하가 되면 작동합니다.

실패 동작은 RC 제어 여부 (및 고도 정보)에 따라 [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)에 의해 결정됩니다.
* `0` : 원격 제어 가능. 고도 추정치를 사용할 수 있으면 *고도 모드*로 전환하고, 그렇지 않으면 *안정 모드*로 전환됩니다.
* `1` : 원격 제어 *불가*. 고도값을 사용할 수있는 경우 *착륙 모드*로 전환하고, 그렇지 않으면 비행 종료를 입력합니다.

Fixed-wing vehicles and VTOLs in fixed-wing flight additionally have a parameter ([FW_GPSF_LT](../advanced_config/parameter_reference.md#FW_GPSF_LT)) that defines how long they will loiter (circle with a constant roll angle ([FW_GPSF_R](../advanced_config/parameter_reference.md#FW_GPSF_R)) at the current altitude) after losing position before attempting to land. If VTOLs have are configured to switch to hover for landing ([NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)) then they will first transition and then descend.

The relevant parameters for all vehicles shown below.

| 매개변수                                                                             | 설명                                                   |
| -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [COM_POS_FS_DELAY](../advanced_config/parameter_reference.md#COM_POS_FS_DELAY) | 위치 손실 후 안전 장치 동작 지연 여부 설정                            |
| [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)   | 임무 중 위치 제어 탐색 손실 응답. 값 : 0 - RC 사용 가정, 1 - RC 없음 가정. |


Parameters that only affect Fixed-wing vehicles:

| 매개변수                                                                 | 설명                                                                                                          |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [FW_GPSF_LT](../advanced_config/parameter_reference.md#FW_GPSF_LT) | Loiter time (waiting for GPS recovery before it goes into land or flight termination). 비활성화 하려면 0으로 설정하십시오. |
| [FW_GPSF_R](../advanced_config/parameter_reference.md#FW_GPSF_R)   | 선회 비행시 고정 롤/뱅크 각도.                                                                                          |


### 오프 보드 안전 장치

오프 보드 제어시에 오프 보드 링크가 손실되면 *오프 보드 안전장치*가 동작합니다. RC 연결을 사용 여부에 따라 다른 안전 장치의 작동을 지정할 수 있습니다.

관련된 매개 변수는 다음과 같습니다.

| 매개변수                                                                         | 설명                                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | 오프 보드 단락이후 안전장치 동작 지연 여부 설정.                                       |
| [COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | RC를 사용할 수있는 경우 비상 안전조치 : 위치 모드, 고도 모드, 수동 모드, 귀환 모드, 착륙 모드, 대기 모드. |

### Mission Feasibility Checks

A number of checks are run to ensure that a mission can only be started if it is _feasible_. For example, the checks ensures that the first waypoint isn't too far away, and that the mission flight path doesn't conflict with any geofences.

As these are not strictly speaking "failsafes" they are documented in [Mission Mode > Mission Feasibility Checks](../flight_modes/mission.md#mission-feasibility-checks).

### 교통 회피 안전 장치

교통 회피 안전 장치를 사용하면 PX4가 미션 중에 transponders 데이터(예 : [ADSB transponder](../advanced_features/traffic_avoidance_adsb.md)에서)에 응답할 수 있습니다.

관련된 매개 변수는 다음과 같습니다.

| 매개변수                                                                           | 설명                                        |
| ------------------------------------------------------------------------------ | ----------------------------------------- |
| [NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | 비상 안전 장치를 설정합니다 : 비활성화, 경고, 귀환 모드, 착륙 모드. |

### Quad-chute Failsafe

Failsafe for when a VTOL vehicle can no longer fly in fixed-wing mode, perhaps because a pusher motor, airspeed sensor, or control surface, failed. If triggered, the vehicle will immediately switch to multicopter mode and execute action defined in parameter [COM_QC_ACT](#COM_QC_ACT) .

:::note
The quad-chute can also be triggered by sending a MAVLINK [MAV_CMD_DO_VTOL_TRANSITION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_VTOL_TRANSITION) message with `param2` set to `1`.
:::

The parameters that control when the quad-chute will trigger are listed in the table below.

| 매개변수                                                                                                         | 설명                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_QC_ACT"></a>[COM_QC_ACT](../advanced_config/parameter_reference.md#COM_QC_ACT)               | Defines automatic action taken after a quad-chute. Can be set to: Warning only, Return, Land, Hold.                                                                                                                                                                                                                                                                                    |
| <a id="VT_FW_QC_HMAX"></a>[VT_FW_QC_HMAX](../advanced_config/parameter_reference.md#VT_FW_QC_HMAX)         | Maximum height above the ground (if available, otherwise above home if available, otherwise above the local origin) where triggering a quad-chute is possible. At high altitudes there is a big risk to deplete the battery and therefore crash if quad-chuting there.                                                                                                                 |
| <a id="VT_QC_HR_ERROR_I"></a>[VT_QC_HR_ERROR_I](../advanced_config/parameter_reference.md#VT_QC_HR_ERROR_I) | Quad-chute uncommanded descent threshold. This is the threshold for integrated height rate error to trigger a uncommanded-descent quad-chute. Only checked in altitude-controlled fixed-wing flight. Additional conditions that have to be met for uncommanded descent detection are a positive (climbing) height rate setpoint and a negative (sinking) current height rate estimate. |
| <a id="VT_QC_T_ALT_LOSS"></a>[VT_QC_T_ALT_LOSS](../advanced_config/parameter_reference.md#VT_QC_T_ALT_LOSS) | Altitude loss threshold for quad-chute triggering during VTOL transition to fixed-wing                                                                                                                                                                                                                                                                                                 |
 flight. Quad-chute triggers the current altitude is more than this value below the altitude at the beginning of the transition.
<a id="VT_FW_MIN_ALT"></a>[VT_FW_MIN_ALT](../advanced_config/parameter_reference.md#VT_FW_MIN_ALT) | Minimum altitude above Home for fixed-wing flight. When the altitude drops below this value in fixed-wing flight the vehicle a quad-chute is triggered.
<a id="VT_FW_QC_R"></a>[VT_FW_QC_R](../advanced_config/parameter_reference.md#VT_FW_QC_R) | Absolute roll threshold for quad-chute triggering in FW mode. 
<a id="VT_FW_QC_P"></a>[VT_FW_QC_P](../advanced_config/parameter_reference.md#VT_FW_QC_P) | Absolute pitch threshold for quad-chute triggering in FW mode.


## 고장 감지기

고장 감지기를 사용하여 차량의 예기치 않게 전복되거나 외부의 고장 감지 시스템에 따른 보호 조치를 할 수 있습니다.

**비행**중에 실패 감지기를 사용하여 실패 조건이 충족되면 [비행 종료](../advanced_config/flight_termination.md)를 작동시켜서, [낙하산](../peripherals/parachute.md)을 펼치는 등의 작업을 수행할 수 있습니다.

:::note
비행 중 고장 감지는 기본적으로 비활성화되어 있습니다 (매개 변수 : [CBRK_FLIGHTTERM=0](#CBRK_FLIGHTTERM)을 설정하여 활성화).
:::

During **takeoff** the failure detector [attitude trigger](#attitude-trigger) invokes the [disarm action](#action_disarm) if the vehicle flips (disarm kills the motors but, unlike flight termination, will not launch a parachute or perform other failure actions). 이 확인은 `CBRK_FLIGHTTERM` 매개 변수에 관계없이 *이륙시 항상 사용*합니다.

고장 감지기는 기체의 뒤집히는 것이 *예상*되는 경우를 제외하고, 모든 기체 유형 및 모드에서 활성화됩니다 (예 : [Acro 모드(MC), \[Acro 모드 (FW)\](../flight_modes/altitude_fw.md), \[Rattitude\](../flight_modes/manual_fw.md) 및 수동 (FW)](../flight_modes/altitude_mc.md)).


### 자세 감지기

기체의 자세가 지정된 시간보다 오랫동안 사전 정의 된 피치 및 롤 값을 초과하는 경우 동작하도록 고장 감지기를 설정할 수 있습니다.

관련된 매개 변수는 다음과 같습니다.

| 매개변수                                                                                                   | 설명                                                                          |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| <a id="CBRK_FLIGHTTERM"></a>[CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | 비행 종료 회로 차단기. 고장 감지기 또는 FMU 손실로 인한 비행 종료를 활성화하려면, 121212 (기본값)에서 설정을 해제합니다. |
| <a id="FD_FAIL_P"></a>[FD_FAIL_P](../advanced_config/parameter_reference.md#FD_FAIL_P)           | 최대 허용 피치 (도 단위).                                                            |
| <a id="FD_FAIL_R"></a>[FD_FAIL_R](../advanced_config/parameter_reference.md#FD_FAIL_R)           | 최대 허용 롤 (도 단위).                                                             |
| <a id="FD_FAIL_P_TTRI"></a>[FD_FAIL_P_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_P_TTRI) | 실패 감지를 위해 [FD_FAIL_P](#FD_FAIL_P)를 초과하는 시간 (기본값 0.3 초).                   |
| <a id="FD_FAIL_R_TTRI"></a>[FD_FAIL_R_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_R_TTRI) | 실패 감지를 위해 [FD_FAIL_R](#FD_FAIL_R)을 초과하는 시간 (기본값 0.3 초).                   |


### 외부 자동 작동 시스템 (ATS)

[활성화](#CBRK_FLIGHTTERM) 인 경우 [고장 감지기](#failure-detector)는 외부 ATS에 의해 작동할 수 있습니다. 외부 작동 시스템은 비행 컨트롤러 포트 AUX5 (또는 AUX 포트가없는 보드의 MAIN5)에 연결되어야 하며 아래의 매개 변수들을 사용하여 설정합니다.

:::note
외부 ATS는 [ASTM F3322-18](https://webstore.ansi.org/Standards/ASTM/ASTMF332218)에 필요합니다. ATS 장치의 한가지 예는 [FruityChutes Sentinel 자동 작동시스템](https://fruitychutes.com/uav_rpv_drone_recovery_parachutes/sentinel-automatic-trigger-system.htm)입니다.
:::

| 매개변수                                                                                                     | 설명                                                                                         |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| <a id="FD_EXT_ATS_EN"></a>[FD_EXT_ATS_EN](../advanced_config/parameter_reference.md#FD_EXT_ATS_EN)     | AUX5 또는 MAIN5 (보드에 따라 다름)에서 PWM 입력을 활성화하여 외부 자동 작동 시스템 (ATS)에서 안전 장치를 연결합니다. 기본값 : 비활성화 됨. |
| <a id="FD_EXT_ATS_TRIG"></a>[FD_EXT_ATS_TRIG](../advanced_config/parameter_reference.md#FD_EXT_ATS_TRIG) | 안전장치 연결을 위한 외부 자동 작동 시스템의 PWM 임계치입니다. 기본값: 1900 ms.                                        |


## 비상 스위치

리모콘의 [안전 스위치](#emergency-switches)를 사용하여 문제 발생시 즉시 모터를 중지하거나 기체를 원위치로 복귀시킬 수 있습니다.

이 섹션에는 사용 가능한 비상 스위치에 대하여 설명합니다.


### 중지 스위치

중지 스위치는 즉시 모든 모터 출력을 중지합니다 (비행시 기체는 추락하기 시작합니다)! 5초 이내에 스위치를 되돌리면 모터가 재동작합니다. 5초 후 기체의 시동은 꺼집니다. 모터를 재작동하려면 재시동하여야 합니다.

### 시동/비시동 스위치

시동/비소동 스위치는 기본 스틱 기반 무장/무장 해제 메커니즘의 *직접 교체*입니다 (동일한 목적 : 모터 시작/정지 전에 의도적 인 단계가 있는지 확인). 다음과 같은 사유로 기본 메커니즘보다 우선적으로 사용될 수 있습니다.
- 스틱 동작보다 스위치를 선호합니다.
- 특정 스틱 동작으로 공중에서 실수로 시동/비시동 하는 것을 방지합니다.
- 지연 시간이 없습니다 (즉시 동작합니다).

시동/비시동 스위치는 *비행중 비시동을 지원*하는 [비행 모드](../getting_started/flight_modes.md)의 모터를 즉시 해제 (정지)합니다. 여기에는 다음의 항목들이 포함됩니다.
- *수동 모드*
- *Acro 모드*
- *안정 모드*

비행중 비시동을 지원하지 않는 모드의 경우 비행 중 스위치가 무시되지만 착륙 후에 사용 가능합니다. 여기에는 *위치 모드* 및 자율 모드 (예 : *미션*, *착륙* 등)가 포함됩니다.

:::note
[자동 비시동 시간 제한](#auto-disarming-timeouts)(예 : [COM_DISARM_LAND](#COM_DISARM_LAND)을 통해)은 설정/해제 스위치와 독립적입니다. 즉, 스위치가 설정되어 있어도 시간 제한이 작동합니다.
:::


<!--
**Note** This can also be done by [manually setting](../advanced_config/parameters.md) the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter to the corresponding switch RC channel.
  If the switch positions are reversed, change the sign of the parameter [RC_ARMSWITCH_TH](../advanced_config/parameter_reference.md#RC_ARMSWITCH_TH) (or also change its value to alter the threshold value).
-->

### 귀환 스위치

귀환 스위치를 사용하여 즉시 [귀환 모드](../flight_modes/return.md)로 전환합니다.

## 기타 안전 설정

### 자동 비시동 제한 시간

이륙 속도가 너무 느리거나, 착륙 후 기체의 시동을 자동으로 꺼기 위하여 시간 제한을 설정할 수 있습니다(기체의 시동을 꺼면 모터의 전원이 제거되므로 프로펠러가 동작하지 않습니다).

[관련 매개변수](../advanced_config/parameters.md)는 다음과 같습니다.

| 매개변수                                                                                                       | 설명                              |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------- |
| <a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | 착륙후 자동 시동 꺼기 대기 시간              |
| <a id="COM_DISARM_PRFLT"></a>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | 기체가 이륙이 너무 더딘 경우 자동 시동 꺼기 대기 시간 |

## 추가 정보

* [QGroundControl 사용 설명서 > 안전 설정](https://docs.qgroundcontrol.com/master/en/SetupView/Safety.html)
