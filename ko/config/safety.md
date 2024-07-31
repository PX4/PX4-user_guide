# Safety (Failsafe) Configuration

PX4에는 문제 발생시에 기체를 보호하고 복구하는 다양한 안전장치들을 제공합니다.

- _Failsafes_ allow you to specify areas and conditions under which you can safely fly, and the [action](#failsafe-actions) that will be performed if a failsafe is triggered (for example, landing, holding position, or returning to a specified point). The most important failsafe settings are configured in the _QGroundControl_ [Safety Setup](#qgroundcontrol-safety-setup) page. Others must be configured via [parameters](#other-failsafe-settings).
- 리모콘의 [안전 스위치](#emergency-switches)를 사용하여 문제 발생시 즉시 모터를 중지하거나 기체를 원위치로 복귀시킬 수 있습니다.

## 안전장치 기능

When a failsafe is triggered, the default behavior (for most failsafes) is to enter Hold for [COM_FAIL_ACT_T](../advanced_config/parameter_reference.md#COM_FAIL_ACT_T) seconds before performing an associated failsafe action. This gives the user time to notice what is happening and override the failsafe if needed. In most cases this can be done by using RC or a GCS to switch modes (note that during the failsafe-hold, moving the RC sticks does not trigger an override).

The list below shows the set of all failsafe actions, ordered in increasing severity. Note that different types of failsafe may not support all of these actions.

| 동작                                                         | 설명                                                                                                                                                                                                                            |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="act_none"></a>없음/비활성화                           | No action. The failsafe will be ignored.                                                                                                                                                                                      |
| <a id="act_warn"></a>경고                                | A warning message will be sent (i.e. to _QGroundControl_).                                                                                                                                                                    |
| <a id="act_hold"></a>Hold mode                         | The vehicle will enter [Hold mode (MC)](../flight_modes_mc/hold.md) or [Hold mode (FW)](../flight_modes_fw/hold.md) and hover or circle, respectively. VTOL vehicles will hold according to their current mode (MC/FW).       |
| <a id="act_return"></a>[Return mode][return]             | The vehicle will enter _Return mode_. 복귀 경로는 [복귀 설정](#return-mode-settings)에서 자세히 설정할 수 있습니다.                                                                                                                                 |
| <a id="act_land"></a>Land mode                         | The vehicle will enter [Land mode (MC)](../flight_modes_mc/land.md) or [Land mode (FW)](../flight_modes_fw/land.md), and land. A VTOL will first transition to MC mode.                                                       |
| <a id="act_disarm"></a>Disarm                            | Stops the motors immediately.                                                                                                                                                                                                 |
| <a id="act_term"></a>[Flight termination][flight_term] | Turns off all controllers and sets all PWM outputs to their failsafe values (e.g. [PWM_MAIN_FAILn][pwm_main_failn], [PWM_AUX_FAILn][pwm_main_failn]). 안전장치 출력은 낙하산, 랜딩 기어를 배치하거나 다른 작업을 수행할 수 있습니다. 고정익은 안전하게 활공할 수 있습니다. |

If multiple failsafes are triggered, the more severe action is taken. For example if both RC and GPS are lost, and manual control loss is set to [Return mode](#act_return) and GCS link loss to [Land](#act_land), Land is executed.

:::tip
The exact behavior when different failsafes are triggered can be tested with the [Failsafe State Machine Simulation](safety_simulation.md).
:::

## QGroundControl 안전 설정

The _QGroundControl_ Safety Setup page is accessed by clicking the _QGroundControl_ icon, **Vehicle Setup**, and then **Safety** in the sidebar. This includes the most important failsafe settings (battery, RC loss etc.) and the settings for the triggered actions _Return_ and _Land_.

![Safety Setup(QGC)](../../assets/qgc/setup/safety/safety_setup.png)

### 배터리 부족 안전장치

하나 이상의 배터리의 용량이 레벨값 아래로 떨어지면 배터리 부족 안전 장치가 작동합니다.

![안전 - 배터리 (QGC)](../../assets/qgc/setup/safety/safety_battery.png)

가장 일반적인 설정은 위와 같이 값과 작업을 설정하는 것입니다 (`경고 > 페일 세이프 > 긴급` 사용). 이 설정을 사용하면 안전 장치가 경고를 표시한 다음 원위치로 귀환하며, 용량이 일정 수준 아래로 떨어지면 최종적으로 착륙합니다.

It is also possible to set the _Failsafe Action_ to warn, return, or land when the [Battery Failsafe Level](#BAT_CRIT_THR) failsafe level is reached.

설정에 관련된 기본 매개변수는 다음과 같습니다.

| 설정                                   | 매개변수                                                                           | 설명                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| 안전장치 동작                              | [COM_LOW_BAT_ACT](../advanced_config/parameter_reference.md#COM_LOW_BAT_ACT) | 용량이 [배터리 안전장치 동작 수준](#BAT_CRIT_THR) 아래로 내려가면 경고, 귀환 또는 착륙, 또는 경고, 귀환, 아래의 각 수준 설정에 따라 착륙합니다. |
| 배터리 경고 수준                            | [BAT_LOW_THR](../advanced_config/parameter_reference.md#BAT_LOW_THR)         | 경고 (또는 기타 조치)에 대한 용량을 백분율로 설정합니다.                                                            |
| <a id="BAT_CRIT_THR"></a>배터리 안정장치 수준 | [BAT_CRIT_THR](../advanced_config/parameter_reference.md#BAT_CRIT_THR)       | 귀환 조치 (또는 단일 조치가 선택된 경우 다른 조치)에 대한 용량에 대한 백분율.                                               |
| 배터리 비상 수준                            | [BAT_EMERGEN_THR](../advanced_config/parameter_reference.md#BAT_EMERGEN_THR) | 즉시 착륙시의 용량의 백분율.                                                                             |

::: tip
There is also a configuration parameter [COM_ARM_BAT_MIN](#COM_ARM_BAT_MIN) that allows you to prevents arming in the first place if the battery level is too low.
:::

### Manual Control Loss failsafe

The manual control loss failsafe may be triggered if the connection to the [RC transmitter](../getting_started/rc_transmitter_receiver.md) or [joystick](../config/joystick.md) is lost, and there is no fallback. If using an [RC transmitter](../getting_started/rc_transmitter_receiver.md) this is triggered if the RC [transmitter link is lost](../getting_started/rc_transmitter_receiver.md#set-signal-loss-behaviour). If using [joysticks](../config/joystick.md) connected over a MAVLink data link, this is triggered if the joysticks are disconnected or the data link is lost.

::: info PX4 and the receiver may also need to be configured in order to _detect RC loss_: [Radio Setup > RC Loss Detection](../config/radio.md#rc-loss-detection).
:::

![안전 - RC 손실 (QGC)](../../assets/qgc/setup/safety/safety_rc_loss.png)

The QGCroundControl Safety UI allows you to set the [failsafe action](#failsafe-actions) and [RC Loss timeout](#COM_RC_LOSS_T). Users that want to disable the RC loss failsafe in specific automatic modes (mission, hold, offboard) can do so using the parameter [COM_RCL_EXCEPT](#COM_RCL_EXCEPT).

Additional (and underlying) parameter settings are shown below.

| 매개변수                                                                                                   | 설정                          | 설명                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_RC_LOSS_T"></a>[COM_RC_LOSS_T](../advanced_config/parameter_reference.md#COM_RC_LOSS_T)    | Manual Control Loss Timeout | Time after last setpoint received from the selected manual control source after which manual control is considered lost. This must be kept short because the vehicle will continue to fly using the old manual control setpoint until the timeout triggers.                                                                                                                                              |
| <a id="COM_FAIL_ACT_T"></a>[COM_FAIL_ACT_T](../advanced_config/parameter_reference.md#COM_FAIL_ACT_T)  | Failsafe Reaction Delay     | Delay in seconds between failsafe condition being triggered (`COM_RC_LOSS_T`) and failsafe action (RTL, Land, Hold). In this state the vehicle waits in hold mode for the manual control source to reconnect. This might be set longer for long-range flights so that intermittent connection loss doesn't immediately invoke the failsafe. It can be to zero so that the failsafe triggers immediately. |
| <a id="NAV_RCL_ACT"></a>[NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)       | 안전장치 동작                     | Disabled, Loiter, Return, Land, Disarm, Terminate.                                                                                                                                                                                                                                                                                                                                                       |
| <a id="COM_RCL_EXCEPT"></a>[COM_RCL_EXCEPT](../advanced_config/parameter_reference.md#COM_RCL_EXCEPT) | RC 손실 예외                    | Set the modes in which manual control loss is ignored: Mission, Hold, Offboard.                                                                                                                                                                                                                                                                                                                          |

### 데이터 연결불량 안전장치

The Data Link Loss failsafe is triggered if a telemetry link (connection to ground station) is lost.

![안전 - 데이터 링크 손실 (QGC)](../../assets/qgc/setup/safety/safety_data_link_loss.png)

설정에 관련된 기본 매개변수는 다음과 같습니다.

| 설정             | 매개변수                                                                       | 설명                                                              |
| -------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 데이터 연결불량 시간 초과 | [COM_DL_LOSS_T](../advanced_config/parameter_reference.md#COM_DL_LOSS_T) | 데이터 연결이 끊어진 후 안전 장치가 동작하기 전까지의 시간입니다.                           |
| 안전장치 동작        | [NAV_DLL_ACT](../advanced_config/parameter_reference.md#NAV_DLL_ACT)     | Disabled, Hold mode, Return mode, Land mode, Disarm, Terminate. |

### Geofence 안전장치

The _Geofence Failsafe_ is triggered when the drone breaches a "virtual" perimeter. In its simplest form, the perimeter is set up as a cylinder centered around the home position. If the vehicle moves outside the radius or above the altitude the specified _Failsafe Action_ will trigger.

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

| 설정                                                       | 매개변수                                                                         | 설명                                                                                                                                                  |
| -------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="GF_SOURCE"></a>지오펜스 소스                        | [GF_SOURCE](../advanced_config/parameter_reference.md#GF_SOURCE)             | 위치 소스가 글로벌 위치인지 또는 GPS 장치에서 직접 가져오는 지를 설정합니다.                                                                                                       |
| <a id="GF_PREDICT"></a>Preemptive geofence triggering | [GF_PREDICT](../advanced_config/parameter_reference.md#GF_PREDICT)           | (Experimental) Trigger geofence if current motion of the vehicle is predicted to trigger the breach (rather than late triggering after the breach). |
| <a id="CBRK_FLIGHTTERM"></a>비행 종료용 회로 차단기                  | [CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | 비행 종료 작업을 활성화/비활성화합니다 (기본적으로 비활성화 됨).                                                                                                               |

### 복귀 설정

<!-- Propose replace section by a summary and links - return mode is complicated -->

_Return_ is a common [failsafe action](#failsafe-actions) that engages [Return mode](../flight_modes/return.md) to return the vehicle to the home position. 이 섹션에서는 귀환 후 착륙/배회 동작을 설정 방법에 대하여 설명합니다.

![안전 - 귀한 설정 (QGC)](../../assets/qgc/setup/safety/safety_return_home.png)

설정 기본 매개변수는 다음과 같습니다:

| 설정                                             | 매개변수                                                                           | 설명                                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| <a id="RTL_RETURN_ALT"></a>고도 상승                | [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)   | 기체은 귀환을 위해이 최소 높이 (아래에있는 경우)까지 상승합니다.                                                                  |
| 기본 동작                                          |                                                                                | Choice list of _Return then_: Land, Loiter and do not land, or Loiter and land after a specified time. |
| <a id="RTL_DESCEND_ALT"></a><nobr>정지비행 고도</nobr> | [RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | 귀환시 배회를 선택하면 기체의 유지 고도를 설정할 수 있습니다.                                                                    |
| <a id="RTL_LAND_DELAY"></a><nobr>정지비행 시간</nobr> | [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)   | 배회후 착륙이 선택하면 기체의 정지 비행 시간을 설정합니다.                                                                      |

::: info The return behaviour is defined by [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY). 음수이면 기체는 즉시 착륙합니다. 더 자세한 정보는 [복귀 모드](../flight_modes/return.md)를 참고하십시오.
:::

### 착륙 모드 설정

_Land at the current position_ is a common [failsafe action](#failsafe-actions) (in particular for multicopters), that engages [Land Mode](../flight_modes_mc/land.md). 이 섹션에서는 착륙후 기체의 자동 시동 방법과 시간 설정 방법을 설명합니다. 멀티콥터에서만 하강 속도를 추가로 설정할 수 있습니다.

![안전 - 착륙 모드 설정(QGC)](../../assets/qgc/setup/safety/safety_land_mode.png)

설정 기본 매개변수는 다음과 같습니다:

| 설정                             | 매개변수                                                                           | 설명                                                      |
| ------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------- |
| <nobr>착륙후 시동 꺼기</nobr>         | [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 착륙후 시동을 끄려면 확인란을 선택합니다. 값은 0 이상으로 1초 미만의 값도 설정할 수 있습니다. |
| Landing Descent Rate (MC only) | [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | Rate of descent.                                        |

## 기타 안전 장치 설정

This section contains information about failsafe settings that cannot be configured through the _QGroundControl_ [Safety Setup](#qgroundcontrol-safety-setup) page.

### 위치(GPS) 손실 안전 장치

The _Position Loss Failsafe_ is triggered if the quality of the PX4 position estimate falls below acceptable levels (this might be caused by GPS loss) while in a mode that requires an acceptable position estimate.

실패 동작은 RC 제어 여부 (및 고도 정보)에 따라 [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)에 의해 결정됩니다.

- `0` : 원격 제어 가능. Switch to _Altitude mode_ if a height estimate is available, otherwise _Stabilized mode_.
- `1`: Remote control _not_ available. Switch to _Descend mode_ if a height estimate is available, otherwise enter flight termination. _Descend mode_ is a landing mode that does not require a position estimate.

Fixed-wing vehicles and VTOLs in fixed-wing flight additionally have a parameter ([FW_GPSF_LT](../advanced_config/parameter_reference.md#FW_GPSF_LT)) that defines how long they will loiter (circle with a constant roll angle ([FW_GPSF_R](../advanced_config/parameter_reference.md#FW_GPSF_R)) at the current altitude) after losing position before attempting to land. If VTOLs have are configured to switch to hover for landing ([NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)) then they will first transition and then descend.

The relevant parameters for all vehicles shown below.

| 매개변수                                                                                                       | 설명                                                   |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| <a id="COM_POS_FS_DELAY"></a>[COM_POS_FS_DELAY](../advanced_config/parameter_reference.md#COM_POS_FS_DELAY) | 위치 손실 후 안전 장치 동작 지연 여부 설정                            |
| <a id="COM_POSCTL_NAVL"></a>[COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)   | 임무 중 위치 제어 탐색 손실 응답. 값 : 0 - RC 사용 가정, 1 - RC 없음 가정. |

Parameters that only affect Fixed-wing vehicles:

| 매개변수                                                                                           | 설명                                                                                                          |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <a id="FW_GPSF_LT"></a>[FW_GPSF_LT](../advanced_config/parameter_reference.md#FW_GPSF_LT) | Loiter time (waiting for GPS recovery before it goes into land or flight termination). 비활성화 하려면 0으로 설정하십시오. |
| <a id="FW_GPSF_R"></a>[FW_GPSF_R](../advanced_config/parameter_reference.md#FW_GPSF_R)   | 선회 비행시 고정 롤/뱅크 각도.                                                                                          |

### 오프 보드 안전 장치

The _Offboard Loss Failsafe_ is triggered if the offboard link is lost while under Offboard control. RC 연결을 사용 여부에 따라 다른 안전 장치의 작동을 지정할 수 있습니다.

관련된 매개 변수는 다음과 같습니다.

| 매개변수                                                                         | 설명                                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | 오프 보드 단락이후 안전장치 동작 지연 여부 설정.                                       |
| [COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | RC를 사용할 수있는 경우 비상 안전조치 : 위치 모드, 고도 모드, 수동 모드, 귀환 모드, 착륙 모드, 대기 모드. |

### Flight Time Failsafe

The maximum flight time failsafe ([COM_FLT_TIME_MAX](#COM_FLT_TIME_MAX)) allows you to set a maximum flight time after takeoff, at which the vehicle will automatically enter return mode (it will also "warn" at 90% of this time). This is disabled by default.

The "remaining flight time for safe return" failsafe ([COM_FLTT_LOW_ACT](#COM_FLTT_LOW_ACT)) is engaged when PX4 estimates that the vehicle has just enough flight time for a return mode landing. You can configure this to ignore the failsafe, warn, or engage Return mode.

| 매개변수                                                                                                       | 설명                                                                                                        |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <a id="COM_FLT_TIME_MAX"></a>[COM_FLT_TIME_MAX](../advanced_config/parameter_reference.md#COM_FLT_TIME_MAX) | Maximum allowed flight time before Return mode will be engaged, in seconds. `-1`: Disabled (default).     |
| <a id="COM_FLTT_LOW_ACT"></a>[COM_FLTT_LOW_ACT](../advanced_config/parameter_reference.md#COM_FLTT_LOW_ACT) | Remaining flight time for safe return mode failsafe. `0`: None, `1`: Warning, `3`: Return mode (default). |

### Mission Feasibility Checks

A number of checks are run to ensure that a mission can only be started if it is _feasible_. For example, the checks ensures that the first waypoint isn't too far away, and that the mission flight path doesn't conflict with any geofences.

As these are not strictly speaking "failsafes" they are documented in [Mission Mode (FW) > Mission Feasibility Checks](../flight_modes_fw/mission.md#mission-feasibility-checks) and [Mission Mode (MC) > Mission Feasibility Checks](../flight_modes_mc/mission.md#mission-feasibility-checks).

### 교통 회피 안전 장치

교통 회피 안전 장치를 사용하면 PX4가 미션 중에 transponders 데이터(예 : [ADSB transponder](../advanced_features/traffic_avoidance_adsb.md)에서)에 응답할 수 있습니다.

관련된 매개 변수는 다음과 같습니다.

| 매개변수                                                                           | 설명                                        |
| ------------------------------------------------------------------------------ | ----------------------------------------- |
| [NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | 비상 안전 장치를 설정합니다 : 비활성화, 경고, 귀환 모드, 착륙 모드. |

### Quad-chute Failsafe

Failsafe for when a VTOL vehicle can no longer fly in fixed-wing mode, perhaps due to the failure of a pusher motor, airspeed sensor, or control surface. If the failsafe is triggered, the vehicle will immediately switch to multicopter mode and execute the action defined in parameter [COM_QC_ACT](#COM_QC_ACT).

::: info The quad-chute can also be triggered by sending a MAVLINK [MAV_CMD_DO_VTOL_TRANSITION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_VTOL_TRANSITION) message with `param2` set to `1`.
:::

The parameters that control when the quad-chute will trigger are listed in the table below.

| 매개변수                                                                                                         | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_QC_ACT"></a>[COM_QC_ACT](../advanced_config/parameter_reference.md#COM_QC_ACT)               | Quad-chute action after switching to multicopter flight. Can be set to: [Warning](#act_warn), [Return](#act_return), [Land](#act_land), [Hold](#act_hold).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| <a id="VT_FW_QC_HMAX"></a>[VT_FW_QC_HMAX](../advanced_config/parameter_reference.md#VT_FW_QC_HMAX)         | Maximum quad-chute height, below which the quad-chute failsafe cannot trigger. This prevents high altitude quad-chute descent, which can drain the battery (and itself cause a crash). The height is relative to ground, home, or the local origin (in preference order, depending on what is available).                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <a id="VT_QC_ALT_LOSS"></a>[VT_QC_ALT_LOSS](../advanced_config/parameter_reference.md#VT_QC_ALT_LOSS)       | Uncommanded descent quad-chute altitude threshold.<br><br>In altitude controlled modes, such as [Hold mode](../flight_modes_fw/hold.md), [Position mode](../flight_modes_fw/position.md), [Altitude mode](../flight_modes_fw/altitude.md), or [Mission mode](../flight_modes_fw/mission.md), a vehicle should track its current "commanded" altitude setpoint. The quad chute failsafe is triggered if the vehicle falls too far below the commanded setpoint (by the amount defined in this parameter).<br><br>Note that the quad-chute is only triggered if the vehicle continuously loses altitude below the commanded setpoint; it is not triggered if the commanded altitude setpoint increases faster than the vehicle can follow. |
| <a id="VT_QC_T_ALT_LOSS"></a>[VT_QC_T_ALT_LOSS](../advanced_config/parameter_reference.md#VT_QC_T_ALT_LOSS) | Altitude loss threshold for quad-chute triggering during VTOL transition to fixed-wing flight. The quad-chute is triggered if the vehicle falls this far below its initial altitude before completing the transition.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <a id="VT_FW_MIN_ALT"></a>[VT_FW_MIN_ALT](../advanced_config/parameter_reference.md#VT_FW_MIN_ALT)         | Minimum altitude above Home for fixed-wing flight. When the altitude drops below this value in fixed-wing flight the vehicle a quad-chute is triggered.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| <a id="VT_FW_QC_R"></a>[VT_FW_QC_R](../advanced_config/parameter_reference.md#VT_FW_QC_R)               | Absolute roll threshold for quad-chute triggering in FW mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| <a id="VT_FW_QC_P"></a>[VT_FW_QC_P](../advanced_config/parameter_reference.md#VT_FW_QC_P)               | Absolute pitch threshold for quad-chute triggering in FW mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### High Wind Failsafe

The high wind failsafe can trigger a warning and/or other mode change when the wind speed exceeds the warning and maximum wind-speed threshhold values. The relevant parameters are listed in the table below.

| 매개변수                                                                                                       | 설명                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="COM_WIND_MAX"></a>[COM_WIND_MAX](../advanced_config/parameter_reference.md#COM_WIND_MAX)         | Wind speed threshold that triggers failsafe action, in m/s ([COM_WIND_MAX_ACT](#COM_WIND_MAX_ACT)).                                                                                                                                                  |
| <a id="COM_WIND_MAX_ACT"></a>[COM_WIND_MAX_ACT](../advanced_config/parameter_reference.md#COM_WIND_MAX_ACT) | High wind failsafe action (following [COM_WIND_MAX](#COM_WIND_MAX) trigger). Can be set to: `0`: None (Default), `1`: [Warning](#act_warn), `2`: [Hold](#act_hold), `3`: [Return](#act_return), `4`: [Terminate](#act_term), `5`: [Land](#act_land). |
| <a id="COM_WIND_WARN"></a>[COM_WIND_WARN](../advanced_config/parameter_reference.md#COM_WIND_WARN)       | Wind speed threshold that triggers periodic failsafe warning.                                                                                                                                                                                          |

## 고장 감지기

고장 감지기를 사용하여 차량의 예기치 않게 전복되거나 외부의 고장 감지 시스템에 따른 보호 조치를 할 수 있습니다.

**비행**중에 실패 감지기를 사용하여 실패 조건이 충족되면 [비행 종료](../advanced_config/flight_termination.md)를 작동시켜서, [낙하산](../peripherals/parachute.md)을 펼치는 등의 작업을 수행할 수 있습니다.

:::note
비행 중 고장 감지는 기본적으로 비활성화되어 있습니다 (매개 변수 : [CBRK_FLIGHTTERM=0](#CBRK_FLIGHTTERM)을 설정하여 활성화).
:::

During **takeoff** the failure detector [attitude trigger](#attitude-trigger) invokes the [disarm action](#act_disarm) if the vehicle flips (disarm kills the motors but, unlike flight termination, will not launch a parachute or perform other failure actions). Note that this check is _always enabled on takeoff_, irrespective of the `CBRK_FLIGHTTERM` parameter.

The failure detector is active in all vehicle types and modes, except for those where the vehicle is _expected_ to do flips (i.e. [Acro mode (MC)](../flight_modes_mc/altitude.md), [Acro mode (FW)](../flight_modes_fw/altitude.md), and [Manual (FW)](../flight_modes_fw/manual.md)).

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

| Parameter                                                                                                | Description                                                                                |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| <a id="FD_EXT_ATS_EN"></a>[FD_EXT_ATS_EN](../advanced_config/parameter_reference.md#FD_EXT_ATS_EN)     | AUX5 또는 MAIN5 (보드에 따라 다름)에서 PWM 입력을 활성화하여 외부 자동 작동 시스템 (ATS)에서 안전 장치를 연결합니다. 기본값 : 비활성화 됨. |
| <a id="FD_EXT_ATS_TRIG"></a>[FD_EXT_ATS_TRIG](../advanced_config/parameter_reference.md#FD_EXT_ATS_TRIG) | 안전장치 연결을 위한 외부 자동 작동 시스템의 PWM 임계치입니다. 기본값: 1900 ms.                                        |

## 비상 스위치

Remote control switches can be configured (as part of _QGroundControl_ [Flight Mode Setup](../config/flight_mode.md)) to allow you to take rapid corrective action in the event of a problem or emergency; for example, to stop all motors, or activate [Return mode](#return-switch).

이 섹션에는 사용 가능한 비상 스위치에 대하여 설명합니다.

### 중지 스위치

중지 스위치는 즉시 모든 모터 출력을 중지합니다 (비행시 기체는 추락하기 시작합니다)! 5초 이내에 스위치를 되돌리면 모터가 재동작합니다. 5초 후 기체의 시동은 꺼집니다. 모터를 재작동하려면 재시동하여야 합니다.

### 시동/비시동 스위치

The arm/disarm switch is a _direct replacement_ for the default stick-based arming/disarming mechanism (and serves the same purpose: making sure there is an intentional step involved before the motors start/stop). 다음과 같은 사유로 기본 메커니즘보다 우선적으로 사용될 수 있습니다.

- 스틱 동작보다 스위치를 선호합니다.
- 특정 스틱 동작으로 공중에서 실수로 시동/비시동 하는 것을 방지합니다.
- 지연 시간이 없습니다 (즉시 동작합니다).

The arm/disarm switch immediately disarms (stop) motors for those [flight modes](../flight_modes/index.md#flight-modes) that _support disarming in flight_. 여기에는 다음의 항목들이 포함됩니다.

- _수동 모드_
- _Acro 모드_
- _안정 모드_

비행중 비시동을 지원하지 않는 모드의 경우 비행 중 스위치가 무시되지만 착륙 후에 사용 가능합니다. This includes _Position mode_ and autonomous modes (e.g. _Mission_, _Land_ etc.).

:::note
[자동 비시동 시간 제한](#auto-disarming-timeouts)(예 : [COM_DISARM_LAND](#COM_DISARM_LAND)을 통해)은 설정/해제 스위치와 독립적입니다. 즉, 스위치가 설정되어 있어도 시간 제한이 작동합니다.
:::

<!--
**Note** This can also be done by [manually setting](../advanced_config/parameters.md) the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter to the corresponding switch RC channel.
  If the switch positions are reversed, change the sign of the parameter [RC_ARMSWITCH_TH](../advanced_config/parameter_reference.md#RC_ARMSWITCH_TH) (or also change its value to alter the threshold value).
-->

### 귀환 스위치

귀환 스위치를 사용하여 즉시 [귀환 모드](../flight_modes/return.md)로 전환합니다.

## Arming/Disarming Settings

The [commander module](../advanced_config/parameter_reference.md#commander) has a number of parameters prefixed with `COM_ARM` that configure whether the vehicle can arm at all, and under what conditions (note that some parameters named with the prefix `COM_ARM` are used to arm other systems). Parameters prefixed with `COM_DISARM_` affect disarming behaviour.

### Auto-Disarming Timeouts

이륙 속도가 너무 느리거나, 착륙 후 기체의 시동을 자동으로 꺼기 위하여 시간 제한을 설정할 수 있습니다(기체의 시동을 꺼면 모터의 전원이 제거되므로 프로펠러가 동작하지 않습니다).

[관련 매개변수](../advanced_config/parameters.md)는 다음과 같습니다.

| Parameter                                                                                                  | Description                     |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------- |
| <a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | 착륙후 자동 시동 꺼기 대기 시간              |
| <a id="COM_DISARM_PRFLT"></a>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | 기체가 이륙이 너무 더딘 경우 자동 시동 꺼기 대기 시간 |

### Arming Pre-Conditions

These parameters can be used to set conditions that prevent arming.

| Parameter                                                                                                  | Description                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="COM_ARMABLE"></a>[COM_ARMABLE](../advanced_config/parameter_reference.md#COM_ARMABLE)             | Enable arming (at all). `0`: Disabled, `1`: Enabled (default).                                                                                                                                             |
| <a id="COM_ARM_BAT_MIN"></a>[COM_ARM_BAT_MIN](../advanced_config/parameter_reference.md#COM_ARM_BAT_MIN)   | Minimum battery level for arming. `0`: Disabled (default). Values: `0`-`0.9`,                                                                                                                              |
| <a id="COM_ARM_WO_GPS"></a>[COM_ARM_WO_GPS](../advanced_config/parameter_reference.md#COM_ARM_WO_GPS)     | Enable arming without GPS. `0`: Disabled, `1`: Enabled (default).                                                                                                                                          |
| <a id="COM_ARM_MIS_REQ"></a>[COM_ARM_MIS_REQ](../advanced_config/parameter_reference.md#COM_ARM_MIS_REQ)   | Require valid mission to arm. `0`: Disabled (default), `1`: Enabled .                                                                                                                                      |
| <a id="COM_ARM_SDCARD"></a>[COM_ARM_SDCARD](../advanced_config/parameter_reference.md#COM_ARM_SDCARD)     | Require SD card to arm. `0`: Disabled (default), `1`: Warning, `2`: Enabled.                                                                                                                               |
| <a id="COM_ARM_AUTH_REQ"></a>[COM_ARM_AUTH_REQ](../advanced_config/parameter_reference.md#COM_ARM_AUTH_REQ) | Requires arm authorisation from an external (MAVLink) system. Flag to allow arming (at all). `1`: Enabled, `0`: Disabled (default). Associated configuration parameters are prefixed with `COM_ARM_AUTH_`. |
| <a id="COM_ARM_ODID"></a>[COM_ARM_ODID](../advanced_config/parameter_reference.md#COM_ARM_ODID)         | Require healthy Remote ID system to arm. `0`: Disabled (default), `1`: Warning, `2`: Enabled.                                                                                                              |

In addition there are a number of parameters that configure system and sensor limits that make prevent arming if exceeded: [COM_CPU_MAX](../advanced_config/parameter_reference.md#COM_CPU_MAX), [COM_ARM_IMU_ACC](../advanced_config/parameter_reference.md#COM_ARM_IMU_ACC), [COM_ARM_IMU_GYR](../advanced_config/parameter_reference.md#COM_ARM_IMU_GYR), [COM_ARM_MAG_ANG](../advanced_config/parameter_reference.md#COM_ARM_MAG_ANG), [COM_ARM_MAG_STR](../advanced_config/parameter_reference.md#COM_ARM_MAG_STR).

## 추가 정보

- [QGroundControl 사용 설명서 > 안전 설정](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/safety.html)

[flight_term]: ../advanced_config/flight_termination.md
[return]: ../flight_modes/return.md
[pwm_main_failn]: ../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1
[pwm_main_failn]: ../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1
