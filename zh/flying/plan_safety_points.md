# 安全点(集结点)

安全点是[返航模式](../flight_modes/return.md)目的/降落点。 启用后，车辆将从HOME点、任务降落点或安全点选择*最近的返航目的地*。

![Safety Points](../../assets/qgc/plan/rally_point/rally_points.jpg)

## 创建/定义安全点

在QGroundControl中创建安全点（也称为“集结点”）。

总结：
1. 打开**QGroundControl > 规划视图**。
1. 在 *规划编辑器* (屏幕右侧) 选择 **集结** 标签/按钮。
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
