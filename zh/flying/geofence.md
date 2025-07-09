---
canonicalUrl: https://docs.px4.io/main/zh/flying/geofence
---

# 地理围栏

围栏是一个虚拟边界，用于定义机体可以在哪些地方行驶。 围栏可用于防止机体飞出遥控器的范围，或进入不安全或受限制的空域。

PX4提供了两个独立的机制来指定围栏：
- 一个是基本的“故障保护”地理围栏，定义了一个简单的圆柱体。
- 可以使用围栏规划(*QGroundControl*)定义更复杂的几何图形。

地理围栏适用于所有模式，包括任务和手动飞行。
:::

## 故障保护地理围栏

故障保护围栏定义了一个圆心在home点的圆柱，它具有指定的最大半径和高度。

设置中还包括越界时的故障保护动作。 可能只是一个警告通知，但更常见的是机体会立即[返回](../flight_modes/return.md)一个安全位置。

For more information see: [Safety > GeoFence Failsafe](../config/safety.md#geofence-failsafe).

## 地理围栏规划

PX4 支持由多个圆形和多边形区域组成的复杂地理围栏边界，这些区域可以定义为包含（禁出）或排除（禁入）区域。

围栏被放置在*QGroundControl*与任务和集结并列。

![围栏规划](../../assets/qgc/plan_geofence/geofence_overview.jpg)

GeoFence planning is fully documented in [Plan View > GeoFence](https://docs.qgroundcontrol.com/master/en/PlanView/PlanGeoFence.html) (QGroundControl User Guide).

总结：
1. Open *QGroundControl > Plan View*.
1. 选择 *规划类型* 单选按钮： **围栏**。 这将显示 *地理围栏编辑器*。 ![地理围栏规划](../../assets/qgc/plan_geofence/geofence_editor.jpg)
1. 选择多边形围栏或圆形围栏按钮，可将添加所需基本类型的围栏到地图中。 这也在编辑器中增加了此类围栏的条目。
1. 在地图上调整围栏的形状和位置。
   - 围栏中心的圆点可以用来调整围栏的位置。
   - 边界上的圆点可以用来调整半径。
   - 角（顶点）上的圆点可以用来改变多边形的形状。 点击线段中间可以在两个顶点中添加新的顶点。
1. *围栏编辑器*可以设置围栏是包含还是排除，还可以通过（**编辑**单选按钮）选择一个围栏来编辑或者通过（**删除**按钮）来删除。
1. 可添加任意数量的围栏
1. 完成后，点击(右上角) **上传** 按钮向车辆发送围栏(连同集结和任务)。
1. 在围栏故障保护中设置越界动作。

:::note PX4 实现了 MAVLink [微服务](https://mavlink.io/en/services/mission.html), 其中包括支持围栏.
:::
