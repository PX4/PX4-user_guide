---
canonicalUrl: https://docs.px4.io/main/ko/flying/plan_safety_points
---

# 안전 지점 (랠리 포인트)

안전 지점은 [반환 모드](../flight_modes/return.md)의 목적지/착륙 지점을 대체하는 지점입니다. 활성화되면 기체는 홈 위치, 임무 착륙 패턴 또는 *안전 지점*중 *가장 가까운 반환 목적지*를 선택합니다.

![안전 지점](../../assets/qgc/plan/rally_point/rally_points.jpg)

## 안전 지점 설정

안전 지점은 *QGroundControl* ( "랠리 포인트"라고 함)에서 생성됩니다.

전체 개요:
1. **QGroundControl > 평면뷰 **를 오픈합니다
1. *계획 편집기* (화면 오른쪽)에서 **랠리** 탭/버튼을 선택합니다.
1. 도구 모음 (화면 왼쪽)에서 **랠리 포인트** 버튼을 선택합니다.
1. 랠리/안전 지점을 추가하려면 지도의 아무 곳이나 클릭하세요.
   - *계획 편집기*가 표시되고 현재 집결 지점을 편집 할 수 있습니다 (지도에 녹색 **R**으로 표시됨).
   - 대신 다른 집결 지점 (지도에서 주황색/노란색 **R**으로 표시됨)을 선택하여 편집할 수 있습니다.
1. **업로드 필요** 버튼을 선택하여 랠리 포인트 ([미션](../flying/missions.md) 및 [지오 펜스](../flying/geofence.md)와 함께)를 기체에 업로드합니다.

:::tip
자세한 문서는 *QGroundControl 사용자 가이드* : [계획보기-랠리 포인트](https://docs.qgroundcontrol.com/en/PlanView/PlanRallyPoints.html)를 참고하십시오.
:::

## 안전 지점 사용법

안전 지점은 기본적으로 활성화되어 있지 않습니다 (다양한 [반환 모드 유형](../flight_modes/return.md#return_types)이 있습니다).

안전 지점을 활성화하려면 :
1. [QGroundControl 매개 변수 편집기를 사용](../advanced_config/parameters.md)하여 매개 변수를 설정합니다 : [RTL_TYPE = 3](../advanced_config/parameter_reference.md#RTL_TYPE).
