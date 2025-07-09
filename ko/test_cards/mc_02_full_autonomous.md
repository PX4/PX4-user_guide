---
canonicalUrl: https://docs.px4.io/main/ko/test_cards/mc_02_full_autonomous
---

# 시험 MC_02 - 완전 자동화

## 임무 수립 및 업로드

❏ 임무 규정

&nbsp;&nbsp;&nbsp;&nbsp;❏ 자동 이륙

&nbsp;&nbsp;&nbsp;&nbsp;❏ 임무를 통한 고도 변경

&nbsp;&nbsp;&nbsp;&nbsp;❏ 이륙 후 첫 비행 지점 설정

&nbsp;&nbsp;&nbsp;&nbsp;❏ 임무 종료시 회귀 지점 착륙 활성화

&nbsp;&nbsp;&nbsp;&nbsp;❏ 5~6분간 수행

❏ *QGroundControl*을 통한 기체로의 임무 업로드


## 시동 및 이륙

❏ 임의의 수동 조종 상태에서 시동

❏ 이륙 개시 전 자동 모드 인가

❏ 경로 추적, 선회, 적절한 회귀 지점 착륙 동작

❏ 콥터가 지면에 닿을 때, 2초 안에 제동해야 함(착륙 후 제동 시간은 [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)로 설정)



## 예상 결과

* 추력을 올릴 때 서서히 이륙한다
* 첫 시도시 임무 내용이 올라가야 함
* 자동 모드 인가시 기체는 자동으로 이륙해야 함
* 지면에 착륙시, 콥터가 지면에서 튀면 안됨




<!-- 
MC_002 - Full autonomous

-   Make sure the auto-disarm is enabled
-   QGC open test1_mission.plan and sync to the vehicle
-   Takeoff from QGC start mission slider
-   Check the vehicle completes the mission
-   Let the vehicle to auto land, take manual control if needed and explain the reason in log description.
-   Check the vehicle disarms by itself.
-->
