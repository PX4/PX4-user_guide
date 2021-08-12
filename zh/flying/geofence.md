# 地理围栏

围栏是一个虚拟边界，用于定义车辆可以在哪些地方行驶。 围栏可用于防止车辆飞出遥控器的范围，或进入不安全或受限制的空域。

PX4提供了两个独立的机制来指定围栏：
- 一个是基本的“失控保护”地理围栏，定义了一个简单的圆柱体。
- 可以使用围栏规划 ( *QGroundControl *)定义更复杂的几何图形。

地理围栏适用于所有模式，包括任务和手动飞行。
:::

## 失控保护地理围栏

失控保护围栏定义了一个圆心在home点的圆柱，它具有指定的最大半径和高度。

设置中还包括越界时的失控保护动作。 可能只是一个警告通知，但更常见的是车辆会立即返回安全位置。

有关更多信息，请参阅：[安全 > 地理围栏失控保护。](../config/safety.md#geofence-failsafe)

## 地理围栏规划

PX4 支持由多个圆形和多边形区域组成的复杂地理围栏边界，这些区域可以定义为包含（禁出）或排除（禁入）区域。

围栏被放置位置在与任务和集结并列。

![GeoFence Plan](../../assets/qgc/plan_geofence/geofence_overview.jpg)

围栏规划在[规划视图 > 地理围栏](https://docs.qgroundcontrol.com/en/PlanView/PlanGeoFence.html)中有完整记录（QGroundControl 用户指南）

总结：
1. 打开*QGroundControl > 规划视图*。
1. 选择 *规划类型* 单选按钮： **围栏**。 这将显示 *地理围栏编辑器*。 ![GeoFence Plan](../../assets/qgc/plan_geofence/geofence_editor.jpg)
1. 选择多边形围栏或圆形围栏按钮，可将添加所需基本类型的围栏到地图中。 This also adds an entry for the type of fence in the editor.
1. Use the map to configure the shape and position of the fence.
   - The fence center marker can be used to move the fence to the correct position.
   - The marker on the border of a circular fence can be used to change the radius.
   - The markers on corners (vertices) can be used to change the geometry of a polygon. Additional vertices are created by clicking halfway along the lines between existing markers.
1. Use the *GeoFence Editor* to set a fence as an inclusion or exclusion, and to select a fence to edit (**Edit** radio button) or Delete (**Del** button).
1. Add as many fences as you like.
1. Once finished, click on the **Upload** button (top right) to send the fence (along with rally points and mission) to the vehicle.
1. Set the breach action in the [GeoFence Failsafe](../config/safety.md#geofence-failsafe).

:::note PX4 implements the MAVLink [Mission Microservice](https://mavlink.io/en/services/mission.html), which includes support for GeoFences.
:::
