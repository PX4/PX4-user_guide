---
canonicalUrl: https://docs.px4.io/main/ko/test_cards/mc_03_auto_manual_mix
---

# 시험 MC_03 - 자동 / 수동 혼합

## 임무 수립 및 업로드

❏ 임무 규정

&nbsp;&nbsp;&nbsp;&nbsp;❏ 임무를 통한 고도 변경

&nbsp;&nbsp;&nbsp;&nbsp;❏ 임무는 공중에 떠 있는 상태에서 끝나야 하며, 착륙하거나 회귀 지점 착륙 상태로 끝나면 안됨

&nbsp;&nbsp;&nbsp;&nbsp;❏ 3~4분간 수행

❏ *QGroundControl*을 통한 기체로의 임무 업로드

## 비행

❏ 위치 제어 모드에서 시동 및 이륙

❏ 자동 모드 인가

❏ 경로 추적, 선회 관찰

❏ 임무 완료 후 위치 제어 모드로 복귀

&nbsp;&nbsp;&nbsp;&nbsp;❏ 스틱을 가운데 두었을 때 현재 상태에서 수평 위치를 유지해야 함

&nbsp;&nbsp;&nbsp;&nbsp;❏ 스틱을 가운데 두었을 때 현재 상태에서 수직 위치를 유지해야 함

&nbsp;&nbsp;&nbsp;&nbsp;❏ 상승/하강 속도 설정시 추력부의 반응

&nbsp;&nbsp;&nbsp;&nbsp;❏ 상하/좌우/방위 회전각 응답으로 상하/좌우/방위 각 변화 속도 설정

❏ 회귀 지점 착륙 인가

❏ 콥터가 지면에 닿을 때, 2초 안에 제동해야 함(착륙 후 제동 시간은 [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)로 설정)


## 예상 결과

* 추력을 올릴 때 서서히 이륙한다
* 위에 언급한 어떤 비행 모드에서도 떨림이 나타나서는 안됨
* 지면에 착륙시, 콥터가 지면에서 튀면 안됨

