# GeoFence

GeoFence는 기체의 비행 영역을 정의하는 가상 경계입니다. GeoFence는 기체가 RC 무선 조종기의 영향권을 벗어나서 안전하지 않거나 제한된 공역의 비행하는 것을 방지합니다.

PX4는 두 가지 방법으로 GeoFence를 지정합니다.
- 간단한 실린더를 정의하는 기본 "사고방지" 지오펜스.
- GeoFence 계획(*QGroundControl*)을 사용하여 더 복잡한 지오메트리를 정의할 수 있습니다.

:::note
GeoFence는 미션 모드와 수동 비행 모드에 모두 적용됩니다.
:::

## 사고 방지 GeoFence

[사고 방지 GeoFence](../config/safety.md#geofence-failsafe)는 지정된 최대 반경과 고도로 홈 위치를 중심으로 하는 실린더를 정의합니다.

또한 펜스가 위반되는 경우 "사고 방지 액션" 설정이 포함됩니다. 단순히 알람 경고로 설정할 수도 있지만, 일반적으로 기체를 즉시 안전한 위치로 [복귀 ](../flight_modes/return.md) 시킵니다.

자세한 내용은 [안전 > 사고 장비 GeoFence](../config/safety.md#geofence-failsafe)를 참조하십시오.

## GeoFence 계획

PX4는 포함 (내부 비행) 또는 제외 (외부 비행) 영역으로 정의되는 여러개의 원형 및 다각형으로 구성된 복잡한 GeoFence 경계를 지원합니다.

GeoFence는 미션 및 랠리 포인트와 함께 *QGroundControl*에서 계획됩니다.

![GeoFence Plan](../../assets/qgc/plan_geofence/geofence_overview.jpg)

GeoFence 계획은 [Plan View > GeoFence](https://docs.qgroundcontrol.com/en/PlanView/PlanGeoFence.html) (QGroundControl 사용자 가이드)에 자세하게 문서화되어 있습니다.

요약
1. *QGroundControl > 평면도 *를 오픈합니다.
1. *계획 유형* 라디오 버튼 : **울타리**를 선택합니다. 그러면 *GeoFence 편집기*가 표시됩니다. ![GeoFence Plan](../../assets/qgc/plan_geofence/geofence_editor.jpg)
1. **다각형 울타리** 또는 **원형 울타리** 버튼을 선택하여 원하는 유형의 *기본 * 울타리를 지도에 추가합니다. 편집기에서 울타리 유형을 추가합니다.
1. 지도를 사용하여 울타리의 모양과 위치를 구성하십시오.
   - 펜스 중앙 마커를 사용하여 펜스를 올바른 위치로 이동할 수 있습니다.
   - 원형 울타리 테두리의 마커를 사용하여 반경을 변경할 수 있습니다.
   - 모서리 (정점)의 마커를 사용하여 다각형의 형상을 변경할 수 있습니다. Additional vertices are created by clicking halfway along the lines between existing markers.
1. Use the *GeoFence Editor* to set a fence as an inclusion or exclusion, and to select a fence to edit (**Edit** radio button) or Delete (**Del** button).
1. Add as many fences as you like.
1. Once finished, click on the **Upload** button (top right) to send the fence (along with rally points and mission) to the vehicle.
1. Set the breach action in the [GeoFence Failsafe](../config/safety.md#geofence-failsafe).

:::note PX4 implements the MAVLink [Mission Microservice](https://mavlink.io/en/services/mission.html), which includes support for GeoFences.
:::
