# 任务

## 规划任务

手动规划任务非常简单:

- 切换到任务视图
- 在左上选择 ** 添加航点 ** ("加号") 图标。 
- 点击地图添加航点。
- 使用右侧的航点列表修改航点参数和类型。底部的高度指示器提供每个航点的相对高度。
- 完成后, 单击 ** 上传 ** 按钮 (右上), 将任务发送到飞行器。

您也可以使用 <0图案</em> 工具自动创建测绘网络。

:::tip
有关更多信息，请参阅[QGroundControl 用户指南](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html)
:::

![planning-mission](../../assets/flying/planning_mission.jpg)

### 设置无人机航向

设置后，多旋翼无人机航向将会朝向配置的**航向**值（对应[MAV_CMD_NAV_WAYPOINT.param4](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT)）。

如果目标航点 ( )明确设置**航向**(`param4=NaN`)，无人机的偏航将朝向参数[MPC_YAW_MODE](../advanced_config/parameter_reference.md#MPC_YAW_MODE)中指定的方向。 默认情况下，是指向下一个航点。

不能独立控制偏航和行驶方向的车辆类型将忽略偏航设置（例如固定翼）。

### Setting Acceptance/Turning Radius

The *acceptance radius* defines the circle around a waypoint within which a vehicle considers it has reached the waypoint, and will immediately switch to (and start turning towards) the next waypoint.

For a multi-rotor drones, the acceptance radius is tuned using the parameter [NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD). By default, the radius is small to ensure that multirotors pass above the waypoints, but it can be increased to create a smoother path such that the drone starts to turn before reaching the waypoint.

The image below shows the same mission flown with different acceptance radius parameters:

![acceptance radius comparison](../../assets/flying/acceptance_radius_comparison.jpg)

The speed in the turn is automatically computed based on the acceptance radius (= turning radius) and the maximum allowed acceleration and jerk (see [Jerk-limited Type Trajectory for Multicopters](../config_mc/mc_jerk_limited_type_trajectory.md#auto-mode)).

:::tip
For more information about the impact of the acceptance radius around the waypoint see: [Mission Mode > Inter-waypoint Trajectory](../flight_modes/mission.md#rounded-turns-inter-waypoint-trajectory).
:::

## 执行飞行任务

Once the mission is uploaded, switch to the flight view. The mission is displayed in a way that makes it easy to track progress (it cannot be modified in this view).

![flying-mission](../../assets/flying/flying_mission.jpg)