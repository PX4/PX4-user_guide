# 임무

## 임무 계획하기

수동으로 임무를 계획하는 것은 간단한 작업입니다.

- 임무 보기로 전환합니다.
- 왼쪽 상단에서 **경유지 추가** ( "더하기") 아이콘을 선택합니다. 
- 지도를 클릭하여 경유지를 추가합니다.
- 경유지 매개 변수와 유형을 수정하려면 오른쪽의 경유지 목록을 사용하십시오. 하단의 고도 표시기는 각 경유지의 상대 고도를 표시합니다.
- **업로드** 버튼 (오른쪽 상단)을 클릭하여 차량에 임무를 전송합니다.

*패턴* 도구를 사용하여 측량 그리드 생성을 자동화 할 수 있습니다.

:::tip
자세한 내용은 [QGroundControl 사용자 가이드](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html)를 참조하십시오.
:::

![임무 계획하기](../../assets/flying/planning_mission.jpg)

### 기체 요 각도 설정

요 각도가 설정된 경우 다중 로터는 목표 경유지에 지정된 **방향각** ([ MAV_CMD_NAV_WAYPOINT.param4 ](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT)에 해당)을 향하도록 요잉합니다.

경유지 (`param4 = NaN`)의 **방향각**이 명시적으로 설정되지 않은 경우 기체는 매개 변수 [MPC_YAW_MODE](../advanced_config/parameter_reference.md#MPC_YAW_MODE)에 지정된 위치를 향해 요잉합니다. 기본적으로 이것은 다음 경유지입니다.

고정익과 같이 요 및 이동 방향을 제어할 수 없는 기체는 요 설정을 무시합니다.

## 임무 비행

임무가 업로드되면 비행 보기로 전환합니다. 미션은 진행 상황을 쉽게 추적하도록 표시됩니다. 이보기에서 미션을 수정할 수 없습니다.

![임무 비행](../../assets/flying/flying_mission.jpg)