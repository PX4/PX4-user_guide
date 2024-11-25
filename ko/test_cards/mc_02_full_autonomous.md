# 시험 MC_02 - 완전 자동

## 임무 수립 및 업로드

❏ 임무 규정

&nbsp;&nbsp;&nbsp;&nbsp;❏ Auto take-off

&nbsp;&nbsp;&nbsp;&nbsp;❏ Changes in Altitude throughout the mission

&nbsp;&nbsp;&nbsp;&nbsp;❏ First waypoint set to Takeoff

&nbsp;&nbsp;&nbsp;&nbsp;❏ Enable Mission End RTL

&nbsp;&nbsp;&nbsp;&nbsp;❏ Duration of 5 to 6 minutes

❏ Upload mission to vehicle using _QGroundControl_

## 시동 및 이륙

❏ 임의의 수동 조종 상태에서 시동

❏ 이륙 개시 전 자동 모드 인가

❏ 경로 추적, 선회, 적절한 회귀 지점 착륙 동작

❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))

## 예상 결과

- 추력을 올릴 때 서서히 이륙한다
- 첫 시도시 임무 내용이 올라가야 함
- 자동 모드 인가시 기체는 자동으로 이륙해야 함
- 지면에 착륙시, 콥터가 지면에서 튀면 안됨

<!--
MC_002 - Full autonomous

-	Make sure the auto-disarm is enabled
-	QGC open test1_mission.plan and sync to the vehicle
-	Takeoff from QGC start mission slider
-	Check the vehicle completes the mission
-	Let the vehicle to auto land, take manual control if needed and explain the reason in log description.
-	Check the vehicle disarms by itself.
-->
