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

The *Position Loss Failsafe* is triggered if the quality of the PX4 position estimate falls below acceptable levels (this might be caused by GPS loss) while in a mode that requires an acceptable position estimate.

The failure action is controlled by [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL), based on whether RC control is assumed to be available (and altitude information):

* `0`: Remote control available. Switch to *Altitude mode* if a height estimate is available, otherwise *Stabilized mode*.
* `1`: Remote control *not* available. Switch to *Land mode* if a height estimate is available, otherwise enter flight termination.

Fixed Wing vehicles additionally have a parameter ([NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT)) for defining how long they will loiter (circle) after losing position before attempting to land.

The relevant parameters for all vehicles shown below (also see [GPS Failure navigation parameters](../advanced_config/parameter_reference.md#gps-failure-navigation)):

| Parameter                                                                        | Description                                                                                               |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [COM_POS_FS_DELAY](../advanced_config/parameter_reference.md#COM_POS_FS_DELAY) | Delay after loss of position before the failsafe is triggered.                                            |
| [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)   | Position control navigation loss response during mission. Values: 0 - assume use of RC, 1 - Assume no RC. |
| [CBRK_VELPOSERR](../advanced_config/parameter_reference.md#CBRK_VELPOSERR)       | Circuit breaker for position error check (disables error checks in all modes).                            |

Parameters that only affect Fixed Wing vehicles:

| Parameter                                                              | Description                                                                                         |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT) | Loiter time (waiting for GPS recovery before it goes into flight termination). Set to 0 to disable. |
| [NAV_GPSF_P](../advanced_config/parameter_reference.md#NAV_GPSF_P)   | Fixed pitch angle while circling.                                                                   |
| [NAV_GPSF_R](../advanced_config/parameter_reference.md#NAV_GPSF_R)   | Fixed roll/bank angle while circling.                                                               |
| [NAV_GPSF_TR](../advanced_config/parameter_reference.md#NAV_GPSF_TR) | Thrust while circling.                                                                              |

### Offboard Loss Failsafe

The *Offboard Loss Failsafe* is triggered if the offboard link is lost while under Offboard control. Different failsafe behaviour can be specified based on whether or not there is also an RC connection available.

The relevant parameters are shown below:

| Parameter                                                                    | Description                                                                                                       |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | Delay after loss of offboard connection before the failsafe is triggered.                                         |
| [COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)       | Failsafe action if no RC is available: Land mode, Hold mode, Return mode.                                         |
| [COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | Failsafe action if RC is available: Position mode, Altitude mode, Manual mode, Return mode, Land mode, Hold mode. |

### Mission Failsafe

The Mission Failsafe checks prevent a previous mission being started at a new takeoff location or if it is too big (distance between waypoints is too great). The failsafe action is that the mission will not be run.

The relevant parameters are shown below:

| Parameter                                                                | Description                                                                                                                                     |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [MIS_DIST_1WP](../advanced_config/parameter_reference.md#MIS_DIST_1WP) | The mission will not be started if the current waypoint is more distant than this value from the home position. Disabled if value is 0 or less. |
| [MIS_DIST_WPS](../advanced_config/parameter_reference.md#MIS_DIST_WPS) | The mission will not be started if any distance between two subsequent waypoints is greater than this value.                                    |

### Traffic Avoidance Failsafe

The Traffic Avoidance Failsafe allows PX4 to respond to transponder data (e.g. from [ADSB transponders](../advanced_features/traffic_avoidance_adsb.md)) during missions.

The relevant parameters are shown below:

| Parameter                                                                      | Description                                                      |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | Set the failsafe action: Disabled, Warn, Return mode, Land mode. |

### Adaptive QuadChute Failsafe

Failsafe for when a pusher motor fails (or airspeed sensor) and a VTOL vehicle can no longer achieve a desired altitude setpoint in fixed-wing mode. If triggered, the vehicle will transition to multicopter mode and enter failsafe [Return mode](../flight_modes/return.md).

:::note
You can pause *Return mode* and transition back to fixed wing if desired. Note that if the condition that caused the failsafe still exists, it may trigger again!
:::

The relevant parameters are shown below:

| Parameter                                                                  | Description                                                                                                                                                                                       |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [VT_FW_ALT_ERR](../advanced_config/parameter_reference.md#VT_FW_ALT_ERR) | Maximum negative altitude error for fixed wing flight. If the altitude drops more than this value below the altitude setpoint the vehicle will transition back to MC mode and enter failsafe RTL. |

<span id="failure_detector"></span>

## Failure Detector

The failure detector allows a vehicle to take protective action(s) if it unexpectedly flips, or if it is notified by an external failure detection system.

During **flight**, the failure detector can be used to trigger [flight termination](../advanced_config/flight_termination.md) if failure conditions are met, which may then launch a [parachute](../peripherals/parachute.md) or perform some other action.

:::note
Failure detection during flight is deactivated by default (enable by setting the parameter: [CBRK_FLIGHTTERM=0](#CBRK_FLIGHTTERM)).
:::

During **takeoff** the failure detector [attitude trigger](#attitude_trigger) invokes the [lockdown action](#action_lockdown) if the vehicle flips (lockdown kills the motors but, unlike flight termination, will not launch a parachute or perform other failure actions). Note that this check is *always enabled on takeoff*, irrespective of the `CBRK_FLIGHTTERM` parameter.

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