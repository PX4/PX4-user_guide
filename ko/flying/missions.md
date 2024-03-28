# 임무

A mission is a predefined flight plan, which can be planned in QGroundControl and uploaded to the flight controller, and then executed autonomously in [Mission mode](../flight_modes_mc/mission.md).

Missions typically include items for controlling taking off, flying a sequence of waypoints, capturing images and/or video, deploying cargo, and landing. QGroundControl allows you to plan missions using a fully manual approach, or you can use its more advanced features to plan ground area surveys, corridor surveys, or structure surveys.

This topic provides an overview of how to plan and fly missions.



## 임무 계획하기

수동으로 임무를 계획하는 것은 비교적 간단합니다.

- 임무 보기로 전환합니다.
- Select the **Add Waypoint** ("plus") icon in the top left.
- 지도를 클릭하여 경유지를 추가합니다.
- 경유지 매개 변수와 유형을 수정하려면 오른쪽의 경유지 목록을 사용하십시오. 하단의 고도 표시기는 각 경유지의 상대 고도를 표시합니다.
- **업로드** 버튼 (오른쪽 상단)을 클릭하여 차량에 임무를 전송합니다.

You can also use the _Pattern_ tool to automate creation of survey grids.

:::tip
For more information see the [QGroundControl User Guide](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/plan_view/plan_view.html). :::

![임무 계획](../../assets/flying/planning_mission.jpg)

### Mission Feasibility Checks

PX4 runs some basic sanity checks to determine if a mission is feasible. For example, whether the mission is close enough to the vehicle, if the mission will conflict with a geofence, or if a mission landing pattern is required but is not present.

The checks are run when the mission is uploaded and immediately before it is run. If any of the checks fail, the user is notified and it is not possible to start the mission.

For more detail on the checks and possible actions, see: [Mission Mode (FW) > Mission Feasibility Checks](../flight_modes_fw/mission.md#mission-feasibility-checks) and [Mission Mode (MC) > Mission Feasibility Checks](../flight_modes_mc/mission.md#mission-feasibility-checks).

### 기체 요 각도 설정

요 각도가 설정된 경우 다중 로터는 목표 경유지에 지정된 **방향각** ([ MAV_CMD_NAV_WAYPOINT.param4 ](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT)에 해당)을 향하도록 요잉합니다.

경유지 (`param4 = NaN`)의 **방향각**이 명시적으로 설정되지 않은 경우 기체는 매개 변수 [MPC_YAW_MODE](../advanced_config/parameter_reference.md#MPC_YAW_MODE)에 지정된 위치를 향해 요잉합니다. 기본적으로 이것은 다음 경유지입니다.

Vehicle types that cannot independently control yaw and direction of travel will ignore yaw settings (e.g. Fixed-wing).

### 수용 회전 반경 설정

The _acceptance radius_ defines the circle around a waypoint within which a vehicle considers it has reached the waypoint, and will immediately switch to (and start turning towards) the next waypoint.

다중 로터의 허용 반경은 매개 변수 [NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD)를 사용하여 조정합니다. 기본적으로 반경은 멀티 로터가 웨이포인트 위로 지나갈 수 있도록 작지만 드론이 웨이포인트에 도달하기 전에 회전을 시작하도록 더 부드러운 경로를 만들기 위해 증가시킬 수 있습니다.

아래 이미지는 다른 수용 반경 매개 변수로 비행한 동일한 임무 비행를 나타냅니다.

![수용 반경 비교](../../assets/flying/acceptance_radius_comparison.jpg)

회전 속도는 수용 반경 (= 회전 반경)과 최대 허용 가속도 및 저크 ([멀티콥터에 대한 저크 제한 유형 궤적](../config_mc/mc_jerk_limited_type_trajectory.md#auto-mode) 참조)에 따라 자동으로 계산됩니다.

:::tip
웨이포인트 허용 반경에 대한 자세한 내용은 [미션 모드 > 웨이포인트간 궤적](../flight_modes/mission.md#rounded-turns-inter-waypoint-trajectory)을 참고하십시오. :::

### Package Delivery (Cargo) Missions

PX4 supports cargo delivery in missions using a gripper.

This kind of mission is planned in much the same as any other [waypoint mission](../flying/missions.md), with mission start, takeoff waypoint, various path waypoints, and possibly a return waypoint. The only difference is that a package delivery mission must include a mission items to indicate how the package is released and the deployment mechanism. For more information see: [Package Delivery Mission](../flying/package_delivery_mission.md).

## 임무 비행

임무가 업로드 되면 비행 보기로 전환합니다. 임무는 진행 상황을 쉽게 추적하도록 표시됩니다. 이보기에서 임무를 수정할 수 없습니다.

![임무 비행](../../assets/flying/flying_mission.jpg)
