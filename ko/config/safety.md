# 안전장치 설정(사고 방지)

PX4에는 문제 발생시 기체를 보호와 복구에 관련된 여러가지 안전 기능들이 있습니다.

* *Failsafes* allow you to specify areas and conditions under which you can safely fly, and the [action](#failsafe-actions) that will be performed if a failsafe is triggered (for example, landing, holding position, or returning to a specified point). The most important failsafe settings are configured in the *QGroundControl* [Safety Setup](#qgroundcontrol-safety-setup) page. Others must be configured via [parameters](#other-safety-settings).
* [Safety switches](#emergency-switches) on the remote control can be used to immediately stop motors or return the vehicle in the event of a problem.

## 안전장치 기능

Each failsafe defines its own set of actions. Some of the more common failsafe actions are:

| 동작                                                                         | 설명                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="action_none"></a>없음/비활성화                                           | 조치 없음(안전 장치는 무시됩니다).                                                                                                                                                                                                                                                             |
| <a id="action_warning"></a>경고                                                | 경고 메시지가 *QGroundControl*으로 전송됩니다.                                                                                                                                                                                                                                                |
| <a id="action_hold"></a>[대기 모드](../flight_modes/hold.md)                  | 기체는 *대기 모드*로 들어갑니다. 멀티콥터는 제자리에서 호버링을 하고, 고정익은 원주 선회 비행을 하게 됩니다.                                                                                                                                                                                                                  |
| <a id="action_return"></a>[복귀 모드](../flight_modes/return.md)                | 기체는 *복귀 모드*로 들어갑니다. Return behaviour can be set in the [Return Home Settings](#return-mode-settings) (below).                                                                                                                                                                    |
| <a id="action_land"></a>[착륙 모드](../flight_modes/land.md)                  | 차량은 *착륙 모드*로 전환하여 즉시 착륙합니다.                                                                                                                                                                                                                                                      |
| <a id="action_flight_termination"></a>[비행 종료](../advanced_config/flight_termination.md) | 모든 컨트롤러를 끄고 모든 PWM 출력을 안전 장치 값(예 : [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1), [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1))으로 설정합니다. 안전장치 출력은 낙하산, 랜딩 기어를 배치하거나 다른 작업을 수행하는 데 사용할 수 있습니다. 고정익은 안전하게 활공할 수 있습니다. |
| <a id="action_lockdown"></a>Lockdown                                          | 모터를 정지합니다(시동을 껍니다). This is the same as using the [kill switch](#kill-switch).                                                                                                                                                                                                   |

:::note
It is possible to recover from a failsafe action (if the cause is fixed) by switching modes. For example, in the case where RC Loss failsafe causes the vehicle to enter *Return mode*, if RC is recovered you can change to *Position mode* and continue flying.
:::

:::note
If a failsafe occurs while the vehicle is responding to another failsafe (e.g. Low battery while in Return mode due to RC Loss), the specified failsafe action for the second trigger is ignored. Instead the action is determined by separate system level and vehicle specific code. This might result in the vehicle being changed to a manual mode so the user can directly manage recovery.
:::

## QGroundControl 안전 설정

The *QGroundControl* Safety Setup page is accessed by clicking the *QGroundControl* **Gear** icon (Vehicle Setup - top toolbar) and then **Safety** in the sidebar). This includes the most important failsafe settings (battery, RC loss etc.) and the settings for the return actions *Return* and *Land*.

![Safety Setup (QGC)](../../assets/qgc/setup/safety/safety_setup.png)

### 배터리 부족 안전장치

The low battery failsafe is triggered when the battery capacity drops below one (or more warning) level values.

![Safety - Battery (QGC)](../../assets/qgc/setup/safety/safety_battery.png)

The most common configuration is to set the values and action as above (with `Warn > Failsafe > Emergency`). With this configuration the failsafe will trigger warning, then return, and finally landing if capacity drops below the respective levels.

It is also possible to set the *Failsafe Action* to warn, return, or land when the [Battery Failsafe Level](#BAT_CRIT_THR) failsafe level is reached.

The settings and underlying parameters are shown below.

| 설정                                   | 매개변수                                                                           | 설명                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| 안전장치 기능                              | [COM_LOW_BAT_ACT](../advanced_config/parameter_reference.md#COM_LOW_BAT_ACT) | 용량이 [배터리 안전장치 동작 수준](#BAT_CRIT_THR) 아래로 내려가면 경고, 귀환 또는 착륙, 또는 경고, 귀환, 아래의 각 수준 설정에 따라 착륙합니다. |
| 배터리 경고 수준                            | [BAT_LOW_THR](../advanced_config/parameter_reference.md#BAT_LOW_THR)         | 경고 (또는 기타 조치)에 대한 백분율 용량입니다.                                                                 |
| <span id="BAT_CRIT_THR"></span>배터리 안정장치 수준 | [BAT_CRIT_THR](../advanced_config/parameter_reference.md#BAT_CRIT_THR)       | 귀환 조치 (또는 단일 조치가 선택된 경우 다른 조치)에 대한 용량 백분율.                                                   |
| 배터리 비상 수준                            | [BAT_EMERGEN_THR](../advanced_config/parameter_reference.md#BAT_EMERGEN_THR) | 즉시 착륙시의 용량의 백분율.                                                                             |

### RC 연결불안정 안전장치

The RC Loss failsafe is triggered if the RC transmitter link is lost in manual modes (by default RC loss does not trigger the failsafe in missions).

![Safety - RC Loss (QGC)](../../assets/qgc/setup/safety/safety_rc_loss.png)

:::note PX4 and the receiver may also need to be configured in order to *detect RC loss*: [Radio Setup > RC Loss Detection](../config/radio.md#rc-loss-detection).
:::

The settings and underlying parameters are shown below.

| 설정                 | 매개변수                                                                         | 설명                                                                            |
| ------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| RC 연결불량 시간 초과      | [COM_RC_LOSS_T](../advanced_config/parameter_reference.md#COM_RC_LOSS_T)   | RC 연결이 끊어진 후 안전 장치가 동작하기 전까지의 시간입니다.                                          |
| 안전장치 동작            | [NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)       | 비활성화, 배회, 귀환, 착륙, 종료, 봉쇄.                                                     |
| RC Loss Exceptions | [COM_RCL_EXCEPT](../advanced_config/parameter_reference.md#COM_RCL_EXCEPT) | Set the modes in which RC loss is ignored: Mission (default), Hold, Offboard. |

### 데이터 연결불량 안전장치

The Data Link Loss failsafe is triggered if a telemetry link (connection to ground station) is lost when flying a [mission](../flying/missions.md).

![Safety - Data Link Loss (QGC)](../../assets/qgc/setup/safety/safety_data_link_loss.png)

설정과 기본 매개 변수는 다음과 같습니다.

| 설정             | 매개변수                                                                       | 설명                                    |
| -------------- | -------------------------------------------------------------------------- | ------------------------------------- |
| 데이터 연결불량 시간 초과 | [COM_DL_LOSS_T](../advanced_config/parameter_reference.md#COM_DL_LOSS_T) | 데이터 연결이 끊어진 후 안전 장치가 동작하기 전까지의 시간입니다. |
| 안전장치 동작        | [NAV_DLL_ACT](../advanced_config/parameter_reference.md#NAV_DLL_ACT)     | 비활성화, 배회 모드, 귀환 모드, 착륙 모드, 종료, 봉쇄.    |

### Geofence 안전장치

The *Geofence Failsafe* is a "virtual" cylinder centered around the home position. If the vehicle moves outside the radius or above the altitude the specified *Failsafe Action* will trigger.

![Safety - Geofence (QGC)](../../assets/qgc/setup/safety/safety_geofence.png)

:::tip PX4 separately supports more complicated GeoFence geometries with multiple arbitrary polygonal and circular inclusion and exclusion areas: [Flying > GeoFence](../flying/geofence.md).
:::

The settings and underlying [geofence parameters](../advanced_config/parameter_reference.md#geofence) are shown below.

| 설정                  | 매개변수                                                                           | 설명                                     |
| ------------------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| <nobr>위반시 조치</nobr> | [GF_ACTION](../advanced_config/parameter_reference.md#GF_ACTION)               | 없음, 경고, 보류 모드, 반환 모드, 종료, 착륙.          |
| 최대 반경               | [GF_MAX_HOR_DIST](../advanced_config/parameter_reference.md#GF_MAX_HOR_DIST) | 지오펜스 실린더의 수평 반경. 0 인 경우 지오펜스가 비활성화됩니다. |
| 최대 고도               | [GF_MAX_VER_DIST](../advanced_config/parameter_reference.md#GF_MAX_VER_DIST) | 지오펜스 실린더의 높이. 0 인 경우 지오펜스가 비활성화됩니다.    |

:::note
Setting `GF_ACTION` to terminate will kill the vehicle on violation of the fence. Due to the inherent danger of this, this function is disabled using [CBRK_FLIGHTTERM](#CBRK_FLIGHTTERM), which needs to be reset to 0 to really shut down the system.
:::

The following settings also apply, but are not displayed in the QGC UI.

| 설정                                     | 매개변수                                                                         | 설명                                               |
| -------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| 지오펜스 고도 모드                             | [GF_ALTMODE](../advanced_config/parameter_reference.md#GF_ALTMODE)           | 사용 된 고도 기준: 0 = WGS84, 1 = AMSL.                 |
| 지오펜스 카운터 제한                            | [GF_COUNT](../advanced_config/parameter_reference.md#GF_COUNT)               | 지오펜스 위반이 트리거되기 전에 펜스 외부에서 필요한 후속 위치 측정 수를 설정합니다. |
| 지오펜스 소스                                | [GF_SOURCE](../advanced_config/parameter_reference.md#GF_SOURCE)             | 위치 소스가 글로벌 위치인지 또는 GPS 장치에서 직접 가져 오는 지를 설정합니다.   |
| <span id="CBRK_FLIGHTTERM"></span>비행 종료용 회로 차단기 | [CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | 비행 종료 작업을 활성화/비활성화합니다 (기본적으로 비활성화 됨).            |

### 귀환 설정

*Return* is a common [failsafe action](#failsafe-actions) that engages [Return mode](../flight_modes/return.md) to return the vehicle to the home position. This section shows how to set the land/loiter behaviour after returning.

![Safety - Return Home Settings (QGC)](../../assets/qgc/setup/safety/safety_return_home.png)

The settings and underlying parameters are shown below:

| 설정                   | 매개변수                                                                           | 설명                                        |
| -------------------- | ------------------------------------------------------------------------------ | ----------------------------------------- |
| 고도 상승                | [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)   | 기체은 귀환을 위해이 최소 높이 (아래에있는 경우)까지 상승합니다.     |
| 기본 동작                |                                                                                | *귀환*의 선택 목록 : 착륙, 배회, 미착륙 또는 배회, 일정시간후 착륙 |
| <nobr>정지비행 고도</nobr> | [RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | 귀환시 배회를 선택하면 차량이 유지하는 고도를 지정할 수 있습니다.     |
| <nobr>정지비행 시간</nobr> | [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)   | 배회후 착륙이 선택하면 기체의 정지 비행 시간을 설정합니다.         |

:::note
The return behavour is defined by [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY). If negative the vehicle will land immediately. Additional information can be found in [Return mode](../flight_modes/return.md).
:::

### 착륙모드 설정

*Land at the current position* is a common [failsafe action](#failsafe-actions) that engages [Land Mode](../flight_modes/land.md). This section shows how to control when and if the vehicle automatically disarms after landing. For Multicopters (only) you can additionally set the descent rate.

![Safety - Land Mode Settings (QGC)](../../assets/qgc/setup/safety/safety_land_mode.png)

설정과 기본 매개 변수는 다음과 같습니다:

| 설정                     | 매개변수                                                                           | 설명                                                       |
| ---------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| <nobr>착륙후 시동 꺼기</nobr> | [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 착륙 후 시동을 끄려면 확인란을 선택합니다. 값은 0 이상으로 1초 미만의 값도 설정할 수 있습니다. |
| 착륙 하강률                 | [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 착륙 하강율(멀티콥더에만 적용됨).                                      |

## 기타 안전장치 설정

This section contains information about failsafe settings that cannot be configured through the *QGroundControl* [Safety Setup](#qgroundcontrol-safety-setup) page.

### 위치(GPS) 손실 안전장치

The *Position Loss Failsafe* is triggered if the quality of the PX4 position estimate falls below acceptable levels (this might be caused by GPS loss) while in a mode that requires an acceptable position estimate.

The failure action is controlled by [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL), based on whether RC control is assumed to be available (and altitude information):

* `0` : 원격 제어 가능. 고도 추정치를 사용할 수 있으면 *고도 모드*로 전환하고, 그렇지 않으면 *안정 모드*로 전환됩니다.
* `1` : 원격 제어 *불가*. 고도값을 사용할 수있는 경우 *착륙 모드*로 전환하고, 그렇지 않으면 비행 종료를 입력합니다.

Fixed Wing vehicles additionally have a parameter ([NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT)) for defining how long they will loiter (circle) after losing position before attempting to land.

The relevant parameters for all vehicles shown below (also see [GPS Failure navigation parameters](../advanced_config/parameter_reference.md#gps-failure-navigation)):

| 매개변수                                                                             | 설명                                                   |
| -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [COM_POS_FS_DELAY](../advanced_config/parameter_reference.md#COM_POS_FS_DELAY) | 위치 손실 후 안전 장치 동작 지연 여부 설정                            |
| [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)   | 임무 중 위치 제어 탐색 손실 응답. 값 : 0 - RC 사용 가정, 1 - RC 없음 가정. |
| [CBRK_VELPOSERR](../advanced_config/parameter_reference.md#CBRK_VELPOSERR)       | 위치 오류 검사를위한 회로 차단기 (모든 모드에서 오류 검사 비활성화).             |

Parameters that only affect Fixed Wing vehicles:

| 매개변수                                                                   | 설명                                                   |
| ---------------------------------------------------------------------- | ---------------------------------------------------- |
| [NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT) | 선회 비행 시간 (비행 종료 전 GPS 복구 대기).  
비활성화 하려면 0으로 설정하십시오. |
| [NAV_GPSF_P](../advanced_config/parameter_reference.md#NAV_GPSF_P)   | 선회 비행시 고정 피치 각도.                                     |
| [NAV_GPSF_R](../advanced_config/parameter_reference.md#NAV_GPSF_R)   | 선회 비행시 고정 롤/뱅크 각도.                                   |
| [NAV_GPSF_TR](../advanced_config/parameter_reference.md#NAV_GPSF_TR) | 선회 비행 추력                                             |

### 오프 보드 안전장치

The *Offboard Loss Failsafe* is triggered if the offboard link is lost while under Offboard control. Different failsafe behaviour can be specified based on whether or not there is also an RC connection available.

The relevant parameters are shown below:

| 매개변수                                                                         | 설명                                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | 오프 보드 단락이후 안전장치 동작 지연 여부 설정.                                       |
| [COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)       | RC를 사용할 수 없는 경우 비상 안전조치 : 착륙 모드, 대기 모드, 귀환 모드.                     |
| [COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | RC를 사용할 수있는 경우 비상 안전조치 : 위치 모드, 고도 모드, 수동 모드, 귀환 모드, 착륙 모드, 대기 모드. |

### 임수 실패 안전 장치

The Mission Failsafe checks prevent a previous mission being started at a new takeoff location or if it is too big (distance between waypoints is too great). The failsafe action is that the mission will not be run.

The relevant parameters are shown below:

| 매개변수                                                                     | 설명                                                            |
| ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [MIS_DIST_1WP](../advanced_config/parameter_reference.md#MIS_DIST_1WP) | 현재 웨이포인트가 홈 위치에서 멀리 떨어진 경우 임무가 시작되지 않습니다. 값이 0 이하이면 비활성화 됩니다. |
| [MIS_DIST_WPS](../advanced_config/parameter_reference.md#MIS_DIST_WPS) | 두 개의 웨이포인트 사이의 거리가 크면 임무가 시작되지 않습니다.                          |

### 교통 회피 안전장치

The Traffic Avoidance Failsafe allows PX4 to respond to transponder data (e.g. from [ADSB transponders](../advanced_features/traffic_avoidance_adsb.md)) during missions.

The relevant parameters are shown below:

| 매개변수                                                                           | 설명                                       |
| ------------------------------------------------------------------------------ | ---------------------------------------- |
| [NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | 비상 안전조치를 설정합니다 : 비활성화, 경고, 귀환 모드, 착륙 모드. |

### QuadChute Failsafe

Failsafe for when a VTOL vehicle can no longer fly in fixed-wing mode, perhaps because a pusher motor, airspeed sensor or control surface failed. If triggered, the vehicle will immediately switch to multicopter mode. If the vehicle was in [Mission mode](../flight_modes/mission.md) it enters failsafe [Return mode](../flight_modes/return.md).

:::note
The quadchute can also be triggered by sending a MAVLINK [MAV_CMD_DO_VTOL_TRANSITION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_VTOL_TRANSITION) message with `param2` set to `1`.
:::

The parameters that control when the quadchute will trigger are listed in the table below.

| 매개변수                                                                       | 설명                                                                                                                                                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [VT_FW_ALT_ERR](../advanced_config/parameter_reference.md#VT_FW_ALT_ERR) | 고정익 비행에 대한 고도 오류 음수의 최대 절대값 고도가 설정치 이하가 되면, 기체는 MC 모드로 다시 전환되고 안전 장치 RTL로 전환됩니다.                                                                                          |
| [VT_FW_MIN_ALT](../advanced_config/parameter_reference.md#VT_FW_MIN_ALT) | Minimum altitude for fixed wing flight. When the altitude drops below this value in fixed wing flight the vehicle will transition back to MC mode and enter failsafe RTL. |
| [VT_FW_QC_P](../advanced_config/parameter_reference.md#VT_FW_QC_P)       | Maximum pitch angle before QuadChute engages. Above this the vehicle will transition back to MC mode and enter failsafe RTL.                                              |
| [VT_FW_QC_R](../advanced_config/parameter_reference.md#VT_FW_QC_R)       | Maximum roll angle before QuadChute engages. Above this the vehicle will transition back to MC mode and enter failsafe RTL.                                               |

## 고장 감지기

The failure detector allows a vehicle to take protective action(s) if it unexpectedly flips, or if it is notified by an external failure detection system.

During **flight**, the failure detector can be used to trigger [flight termination](../advanced_config/flight_termination.md) if failure conditions are met, which may then launch a [parachute](../peripherals/parachute.md) or perform some other action.

:::note
Failure detection during flight is deactivated by default (enable by setting the parameter: [CBRK_FLIGHTTERM=0](#CBRK_FLIGHTTERM)).
:::

During **takeoff** the failure detector [attitude trigger](#attitude-trigger) invokes the [lockdown action](#action_lockdown) if the vehicle flips (lockdown kills the motors but, unlike flight termination, will not launch a parachute or perform other failure actions). Note that this check is *always enabled on takeoff*, irrespective of the `CBRK_FLIGHTTERM` parameter.

The failure detector is active in all vehicle types and modes, except for those where the vehicle is *expected* to do flips (i.e. [Acro mode (MC)](../flight_modes/altitude_mc.md), [Acro mode (FW)](../flight_modes/altitude_fw.md), and [Manual (FW)](../flight_modes/manual_fw.md)).

### 자세 감지기

The failure detector can be configured to trigger if the vehicle attitude exceeds predefined pitch and roll values for longer than a specified time.

The relevant parameters are shown below:

| 매개변수                                                                                                   | 설명                                                                       |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| <a id="CBRK_FLIGHTTERM"></a>[CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM)  | 비행 종료 회로 차단기. 실패감지기 또는 FMU 손실로 인한 비행 종료를 활성화하려면 121212 (기본값)에서 설정 해제합니다. |
| <a id="FD_FAIL_P"></a>[FD_FAIL_P](../advanced_config/parameter_reference.md#FD_FAIL_P)           | 최대 허용 피치 (도 단위).                                                         |
| <a id="FD_FAIL_R"></a>[FD_FAIL_R](../advanced_config/parameter_reference.md#FD_FAIL_R)           | 최대 허용 롤 (도 단위).                                                          |
| <a id="FD_FAIL_P_TTRI"></a>[FD_FAIL_P_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_P_TTRI) | 실패 감지를 위해 [FD_FAIL_P](#FD_FAIL_P)를 초과하는 시간 (기본값 0.3 초).                |
| <a id="FD_FAIL_R_TTRI"></a>[FD_FAIL_R_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_R_TTRI) | 실패 감지를 위해 [FD_FAIL_R](#FD_FAIL_R)을 초과하는 시간 (기본값 0.3 초).                |

### 외부 자동 동작 시스템 (ATS)

The [failure detector](#failure-detector), if [enabled](#CBRK_FLIGHTTERM), can also be triggered by an external ATS system. The external trigger system must be connected to flight controller port AUX5 (or MAIN5 on boards that do not have AUX ports), and is configured using the parameters below.

:::note
External ATS is required by [ASTM F3322-18](https://webstore.ansi.org/Standards/ASTM/ASTMF332218). One example of an ATS device is the [FruityChutes Sentinel Automatic Trigger System](https://fruitychutes.com/uav_rpv_drone_recovery_parachutes/sentinel-automatic-trigger-system.htm).
:::

| 매개변수                                                                                                     | 설명                                                                                          |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| <a id="FD_EXT_ATS_EN"></a>[FD_EXT_ATS_EN](../advanced_config/parameter_reference.md#FD_EXT_ATS_EN)     | AUX5 또는 MAIN5 (보드에 따라 다름)에서 PWM 입력을 활성화하여 외부 자동 트리거 시스템 (ATS)에서 안전 장치를 연결합니다. 기본값 : 비활성화 됨. |
| <a id="FD_EXT_ATS_TRIG"></a>[FD_EXT_ATS_TRIG](../advanced_config/parameter_reference.md#FD_EXT_ATS_TRIG) | 안전장치 연결을 위한 외부 자동 동작 시스템의 PWM 임계치입니다. 기본값: 1900 ms.                                         |

## 비상 스위치

Remote control switches can be configured (as part of *QGroundControl* [Flight Mode Setup](../config/flight_mode.md)) to allow you to take rapid corrective action in the event of a problem or emergency; for example, to stop all motors, or activate [Return mode](#return-switch).

This section lists the available emergency switches.

### 중지 스위치

A kill switch immediately stops all motor outputs (and if flying, the vehicle will start to fall)! The motors will restart if the switch is reverted within 5 seconds. After 5 seconds the vehicle will automatically disarm; you will need to arm it again in order to start the motors.

### 시동/비시동 스위치

The arm/disarm switch is a *direct replacement* for the default stick-based arming/disarming mechanism (and serves the same purpose: making sure there is an intentional step involved before the motors start/stop). It might be used in preference to the default mechanism because:

* 스틱 동작보다 스위치를 선호합니다.
* 특정 스틱 동작으로 공중에서 실수로 시동/비시동 하는 것을 방지합니다.
* 지연 시간이 없습니다 (즉시 동작합니다).

The arm/disarm switch immediately disarms (stop) motors for those [flight modes](../getting_started/flight_modes.md) that *support disarming in flight*. This includes:

* *수동 모드*
* *Acro 모드*
* *안정 모드*

For modes that do not support disarming in flight, the switch is ignored during flight, but may be used after landing is detected. This includes *Position mode* and autonomous modes (e.g. *Mission*, *Land* etc.).

:::note
[Auto disarm timeouts](#auto-disarming-timeouts) (e.g. via [COM_DISARM_LAND](#COM_DISARM_LAND)) are independent of the arm/disarm switch - ie even if the switch is armed the timeouts will still work.
:::

<!--
**Note** This can also be done by [manually setting](../advanced_config/parameters.md) the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter to the corresponding switch RC channel.
  If the switch positions are reversed, change the sign of the parameter [RC_ARMSWITCH_TH](../advanced_config/parameter_reference.md#RC_ARMSWITCH_TH) (or also change its value to alter the threshold value).
-->

### 귀환 스위치

A return switch can be used to immediately engage [Return mode](../flight_modes/return.md).

## 기타 안전 설정

### 자동 비시동 제한 시간

You can set timeouts to automatically disarm a vehicle if it is too slow to takeoff, and/or after landing (disarming the vehicle removes power to the motors, so the propellers won't spin).

The [relevant parameters](../advanced_config/parameters.md) are shown below:

| 매개변수                                                                                                       | 설명                               |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------- |
| <a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | 착륙후 자동 시동 꺼기를 위한 대기 시간           |
| <a id="COM_DISARM_PRFLT"></a>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | 기체가 이륙하기에 너무 느린 경우 자동 시동꺼리 대기 시간 |

## 추가 정보

* [QGroundControl 사용 설명서 > 안전 설정](https://docs.qgroundcontrol.com/en/SetupView/Safety.html)