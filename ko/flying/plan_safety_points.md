# 안전 포인트 (랠리 포인트)

안전 지점은 [반환 모드](../flight_modes/return.md)의 목적지/착륙 지점을 대체하는 지점입니다. 활성화되면 기체는 홈 위치, 임무 착륙 패턴 또는 *안전 지점*중 *가장 가까운 반환 목적지*를 선택합니다.

![Safety Points](../../assets/qgc/plan/rally_point/rally_points.jpg)

## 안전 포인트 설정

Safety points are created in *QGroundControl* (which calls them "Rally Points").

At high level:
1. Open **QGroundControl > Plan View**
1. Select the **Rally** tab/button on the *Plan Editor* (right of screen).
1. Select the **Rally Point** button on the toolbar (left of screen).
1. Click anywhere on the map to add a rally/safety point.
   - The *Plan Editor* displays and lets you edit the current rally point (shown as a green **R** on the map).
   - You can select another rally point (shown as a more orange/yellow **R** on the map) to edit it instead.
1. Select the **Upload Required** button to upload the rally points (along with any [mission](../flying/missions.md) and [geofence](../flying/geofence.md)) to the vehicle.

:::tip
More complete documentation can be found in the *QGroundControl User Guide*: [Plan View - Rally Points](https://docs.qgroundcontrol.com/en/PlanView/PlanRallyPoints.html).
:::

## Using Safety Points

Safety points are not enabled by default (there are a number of different [Return Mode Types](../flight_modes/return.md#return_types)).

To enable safety points:
1. [Use the QGroundControl Parameter Editor](../advanced_config/parameters.md) to set parameter: [RTL_TYPE=3](../advanced_config/parameter_reference.md#RTL_TYPE).
