---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/mission
---

# 임무 모드

[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*임무 모드*는 비행 제어기에 업로드하여 사전 정의된 자율 [임무](../flying/missions.md) (비행 계획)을 실행합니다. 임무는 일반적으로 [QGroundControl](https://docs.qgroundcontrol.com/en/) (QGC)과 같은 GCS (Ground Control Station) 애플리케이션으로 생성하여 업로드 됩니다.

:::note
* 이 모드에는 3D 위치 정보 (예 : GPS)가 필요합니다.
* 이 모드를 사용하려면 기체의 시동을 걸어야합니다.
* 이 모드는 자동이며, 기체 제어에 사용자 개입이 *필요하지* 않습니다.
* RC 무선 조종기 스위치는 기체의 비행 모드를 변경할 수 있습니다.
* 멀티콥터와 VTOL 멀티콥터 모드에서 RC 스틱을 움직이면 위험한 배터리 안전 장치를 처리하지 않는 한 [기본적으로](#COM_RC_OVERRIDE) 기체는 [위치 모드](../flight_modes/position_mc.md)로 변경됩니다. :::

## 설명

임무는 일반적으로 지상 관제소(예 :
QGroundControl</ 0>)에서 생성되고 발사전에 업로드됩니다. 개발자 API로 생성하거나 비행중에 업로드 할 수 있습니다. </p> 

개별 [미션 명령](#mission_commands)은 기체의 비행 특성에 적합한 방식으로 처리됩니다 (예를 들어 loiter는 헬리콥터의 경우 *hover*로 동작하고, 고정익에는 *circle *로 동작합니다.). VTOL 차량은 고정익모드에서는 고정익, 멀터콥터 모드에서는 헬리콥터의 동작과 매개 변수를 따릅니다.

:::note
임무는 자동조종장치를 부팅하기 **전에** 삽입한 SD 카드에 업로드 됩니다. :::

높은 수준에서 모든 기체 유형은 임무모드가 작동시 동일한 방식으로 작동합니다.

1. 임무가 저장되고 PX4가 비행 이면 현재 단계에서 [미션/비행 계획](../flying/missions.md)을 실행합니다. 
1. 미션이 저장되고 PX4가 착륙한 경우 : 
      * 헬리콥터에서 PX4는 [미션/비행 계획](../flying/missions.md)을 실행합니다. 임무에 `이륙` 명령이 없는 경우 PX4는 현재 단계에서 나머지 비행 계획을 실행하기 전에 기체를 최소 고도로 상승시킵니다.
   * 고정익 차량에서는 PX4가 자동으로 이륙하지 않습니다 (자동조종장치가 움직임 부족을 감지하고 스로틀을 0으로 설정합니다). 차량은 임누 모드에서 손이나 투석기를 발사하면 임무를 수행을 시작할 수 있습니다.
1. 저장된 임무가 없거나 PX4가 모든 임무 명령 실행을 완료한 경우 : 
      * 비행하면 기체는 배회합니다.
   * 착륙하면 기체는 "대기"합니다.
1. *QGroundControl*에서 선택하여 현재 임무 명령을 수동으로 변경할 수 있습니다.
   
:::note
미션에서 *항목으로 이동* 명령이있는 경우 다른 항목으로 이동해도 루프 카운터가 재설정되지 **않습니다**. 이것은 현재 임무 명령을 1로 변경하면 임무를 "완전히 다시 시작" 하지 않는 것입니다. :::

1. 임무는 기체의 시동이 꺼지거나 새 임무가 업로드된 경우에만 초기화됩니다.
   
:::tip
기체가 착륙 후 자동으로 시동이 꺼려면 *QGroundControl*에서 [차량 설정 > 안전](https://docs.qgroundcontrol.com/en/SetupView/Safety.html)에서 *착륙 모드 설정*한 다음 < 0>이후 해제</em>를 설정하십시오. 착륙 후 시동 꺼기 대기 시간을 입력하십시오. :::

[유지 모드](../flight_modes/hold.md)를 사용하여 임무를 일시 중지할 수 있습니다. 임무 비행 모드를 다시 활성화하면 미션이 현재 미션 명령에서 계속됩니다. 임누 모드에서 비행하는 동안 미션을 중단하고 다른 모드로 전환하기로 결정한 경우: 위치 모드에서 RC로 기체를 다른 곳으로 비행한 다음 미션 모드로 다시 전환하면 현재 위치에서 미션을 계속하고 아직 방문하지 않은 다음 미션 웨이포인트로 비행합니다.

:::warning
RC 모드로 전환 전에 스로틀 스틱이 0이 아닌지 확인하십시오 (그렇지 않으면 기체가 충돌합니다).
다른 모드로 전환하기 전에 조종 스틱을 중앙에 두는 것이 좋습니다.
::: 

임무 계획에 대한 자세한 내용은 다음을 참조하십시오.

* [임무 계획](../flying/missions.md)
* [계획보기](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html) (*QGroundControl* 사용자 가이드)




## QGroundControl 지원

*QGroundControl*은 추가 GCS 수준의 임무 처리 지원을 제공합니다 (비행 컨트롤러에서 제공하는 것 외에도). 더 자세한 정보는 다음을 참고하세요.

* [기체 착륙 후 임무 제거](https://docs.qgroundcontrol.com/en/releases/stable_v3.2_long.html#remove-mission-after-vehicle-lands)
* [귀환 모드 후 임무 재개](https://docs.qgroundcontrol.com/en/releases/stable_v3.2_long.html#resume-mission)




## 임무 매개변수

임무 동작은 여러 매개 변수의 영향을 받습니다. [매개 변수 참조 > 임무](../advanced_config/parameter_reference.md#mission)에 문서화되어 있습니다. 매우 작은 하위 집합이 아래에 나열되어 있습니다.

| 매개변수                                                                                                             | 설명                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="NAV_RCL_ACT"></span>[NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)             | RC 손실 안전 모드 (RC 연결이 끊어지면 기체가 수행할 작업) - 예 : 홀드 모드 진입, 복귀 모드, 종료 등                                                                                          |
| <span id="NAV_LOITER_RAD"></span>[NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_RCL_ACT)       | 고정익 선회 반경                                                                                                                                                 |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 멀티콥터(MC 모드에서는 VTOL)의 스틱 움직임이 [위치 모드](../flight_modes/position_mc.md)에서 조종사에게 제어권을 재부여 여부를 제어합니다. 자동 모드와 오프보드 모드에 대해 별도로 활성화할 수 있으며, 기본적으로 자동 모드에서 활성화됩니다. |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | [위치 모드](../flight_modes/position_mc.md)로 전환하는 스틱 이동량 ([COM_RC_OVERRIDE](#COM_RC_OVERRIDE)이 활성화된 경우).                                                    |

<span id="mission_commands"></span> 


## 지원되는 임무 명령

PX4는 미션 모드에서 다음 MAVLink 미션 명령을 "수락"합니다 (일부 *caveats* 포함). 달리 명시되지 않는 한 구현은 MAVLink 사양에 정의된 대로입니다.

* [MAV_CMD_NAV_WAYPOINT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT) 
    *  *Param3* (플라이 스루)는 무시됩니다. 플라이 스루는 *param 1* (time_inside)> 0 인 경우 항상 활성화됩니다.
* [MAV_CMD_NAV_LOITER_UNLIM](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LOITER_UNLIM)
* [MAV_CMD_NAV_LOITER_TIME](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LOITER_TIME)
* [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND)
* [MAV_CMD_NAV_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_TAKEOFF)
* [MAV_CMD_NAV_LOITER_TO_ALT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LOITER_TO_ALT)
* [MAV_CMD_NAV_VTOL_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_TAKEOFF)
  
    - `MAV_CMD_NAV_VTOL_TAKEOFF.param2 ` (전환 제목)은 무시됩니다. 대신 다음 웨이포인트로의 방향이 전환 방향으로 사용됩니다. <!-- at LEAST until PX4 v1.11: https://github.com/PX4/PX4-Autopilot/issues/12660 -->
* [MAV_CMD_NAV_VTOL_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_LAND)

* [MAV_CMD_NAV_FENCE_RETURN_POINT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_RETURN_POINT)
* [MAV_CMD_NAV_FENCE_POLYGON_VERTEX_INCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_POLYGON_VERTEX_INCLUSION)
* [MAV_CMD_NAV_FENCE_POLYGON_VERTEX_EXCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_POLYGON_VERTEX_EXCLUSION)
* [MAV_CMD_NAV_FENCE_CIRCLE_INCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_CIRCLE_INCLUSION)
* [MAV_CMD_NAV_FENCE_CIRCLE_EXCLUSION](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_FENCE_CIRCLE_EXCLUSION)
* [MAV_CMD_NAV_RALLY_POINT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_RALLY_POINT)
* [MAV_CMD_DO_JUMP](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_JUMP)
* [MAV_CMD_NAV_ROI](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_ROI)
* [MAV_CMD_DO_SET_ROI](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI)
* [MAV_CMD_DO_SET_ROI_LOCATION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI_LOCATION)
* [MAV_CMD_DO_SET_ROI_WPNEXT_OFFSET](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI_WPNEXT_OFFSET)
* [MAV_CMD_DO_SET_ROI_NONE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ROI_NONE)
* [MAV_CMD_DO_CHANGE_SPEED](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CHANGE_SPEED)
* [MAV_CMD_DO_SET_HOME](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_HOME)
* [MAV_CMD_DO_SET_SERVO](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_SERVO)
* [MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START)
* [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL)
* [MAV_CMD_DO_DIGICAM_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_DIGICAM_CONTROL)
* [MAV_CMD_DO_MOUNT_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONFIGURE)
* [MAV_CMD_DO_MOUNT_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONTROL)
* [MAV_CMD_IMAGE_START_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_START_CAPTURE)
* [MAV_CMD_IMAGE_STOP_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_STOP_CAPTURE)
* [MAV_CMD_VIDEO_START_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_VIDEO_START_CAPTURE)
* [MAV_CMD_VIDEO_STOP_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_VIDEO_STOP_CAPTURE)
* [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST)
* [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL)
* [MAV_CMD_SET_CAMERA_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_CAMERA_MODE)
* [MAV_CMD_DO_VTOL_TRANSITION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_VTOL_TRANSITION)
* [MAV_CMD_NAV_DELAY](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_DELAY)
* [MAV_CMD_NAV_RETURN_TO_LAUNCH](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_RETURN_TO_LAUNCH)
* [MAV_CMD_DO_CONTROL_VIDEO](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CONTROL_VIDEO)
* [MAV_CMD_DO_GIMBAL_MANAGER_PITCHYAW](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GIMBAL_MANAGER_PITCHYAW)
* [MAV_CMD_DO_GIMBAL_MANAGER_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GIMBAL_MANAGER_CONFIGURE)
* [MAV_CMD_OBLIQUE_SURVEY](https://mavlink.io/en/messages/common.html#MAV_CMD_OBLIQUE_SURVEY)
* [MAV_CMD_DO_SET_CAMERA_ZOOM](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAMERA_ZOOM)
* [MAV_CMD_DO_SET_CAMERA_FOCUS](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAMERA_FOCUS)

Note:

- PX4는 위의 메시지를 구문 분석하지만, 반드시 *동작* 할 필요는 없습니다. 예를 들어, 일부 메시지는 기체 유형에 따라 차이가 있습니다.
- PX4는 임무 명령에 대한 로컬 프레임을 지원하지 않습니다 (예 : [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED)).
- 모든 메시지와명령이 *QGroundControl*을 통해 노출되는 것은 아닙니다.
- 메시지가 추가되면 목록이 최신이 아닐 수 있습니다. 코드를 검사하여 현재 설정을 확인할 수 있습니다. 지원은 [/src/modules/mavlink/mavlink_mission.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_mission.cpp)의 `MavlinkMissionManager :: parse_mavlink_mission_item`입니다.
  
  :::note
누락되거나 잘못된 메시지를 찾으면 문제 보고서 또는 PR을 추가하십시오.
:::



## Rounded turns: Inter-Waypoint Trajectory

PX4는 이전 웨이포인트에서 현재 목표까지 직선을 따라갈 것으로 예상합니다 (웨이포인트 사이에 다른 종류의 경로를 계획하지 않습니다. 필요한 경우 추가 웨이포인트를 추가하여 시뮬레이션 할 수 있습니다).

멀티콥터는 [저크 제한](../config_mc/mc_jerk_limited_type_trajectory.md#auto-mode) 튜닝에 따라 웨이포인트에 접근하거나 이탈할 때 *속도*를 변경합니다. 기체는 허용 반경 ([NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD))에 의해 정의한 다음 웨이포인트 (정의된 경우)를 향해 부드러운 곡선으로 비행합니다. 아래의 다이어그램은 예상 가능한 경로들을 나타냅니다.

![acc-rad](../../assets/flying/acceptance_radius_mission.png)

기체는 허용 반경에 들어 오자마자 다음 웨이포인트로 전환합니다.

- 멀티콥터의 경우 이 반경은 [NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD)로 정의됩니다.
- 고정익의 경우 허용 반경은 "L1 거리"로 정의됩니다. 
    - L1 거리는 [FW_L1_DAMPING](../advanced_config/parameter_reference.md#FW_L1_DAMPING) 및 [FW_L1_PERIOD](../advanced_config/parameter_reference.md#FW_L1_PERIOD)의 두 매개 변수와 현재지면 속도에서 계산됩니다.
  - 기본적으로 약 70 미터입니다.
  - 방정식: $$L_{1_{distance}}=\frac{1}{\pi}L_{1_{damping}}L_{1_{period}}\left \| \vec{v}*{ {xy}*{ground} } \right \|$$

