---
canonicalUrl: https://docs.px4.io/main/ko/test_cards/mc_01_manual_modes
---

# 시험 MC_01 - 수동 상태

## 시동 및 이륙

❏  Stabilize로 비행 모드를 설정하고 시동

❏ 추진력을 올려 이륙


## 비행

❏ 안정화 상태

&nbsp;&nbsp;&nbsp;&nbsp;❏ 상하/좌우/방위 회전각 응답 1:1

&nbsp;&nbsp;&nbsp;&nbsp;❏ 추진력 응답 1:1

❏ 고도

&nbsp;&nbsp;&nbsp;&nbsp;❏ 스틱을 가운데 두었을 때 현재 상태에서 수직 위치를 유지해야 함

&nbsp;&nbsp;&nbsp;&nbsp;❏ 상하/좌우/방위 회전각 응답 1:1

&nbsp;&nbsp;&nbsp;&nbsp;❏ 상승/하강 속도 설정시 추력부의 반응

❏ 위치

&nbsp;&nbsp;&nbsp;&nbsp;❏ 스틱을 가운데 두었을 때 현재 상태에서 수평 위치를 유지해야 함

&nbsp;&nbsp;&nbsp;&nbsp;❏ 스틱을 가운데 두었을 때 현재 상태에서 수직 위치를 유지해야 함

&nbsp;&nbsp;&nbsp;&nbsp;❏ 상승/하강 속도 설정시 추력부의 반응

&nbsp;&nbsp;&nbsp;&nbsp;❏ 상하/좌우/방위 회전각 응답으로 상하/좌우/방위 각 변화 속도 설정


## 착륙

❏ 40% 미만의 추력으로 위치 제어 모드 상태에서 착륙

❏ 콥터가 지면에 닿을 때, 2초 안에 제동해야 함(착륙 후 제동 시간은 [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)로 설정)


## 예상 결과

* 추력을 올릴 때 서서히 이륙한다
* 위에 언급한 어떤 비행 모드에서도 떨림이 나타나서는 안됨
* 지면에 착륙시, 콥터가 지면에서 튀면 안됨
