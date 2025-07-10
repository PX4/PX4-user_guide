---
canonicalUrl: https://docs.px4.io/main/zh/flying/missions
---

# 任务

## 规划任务

手动规划任务非常简单:
- 切换到任务视图
- Select the **Add Waypoint** ("plus") icon in the top left.
- 点击地图添加航点。
- 使用右侧的航点列表修改航点参数和类型。底部的高度指示器提供每个航点的相对高度。
- Once finished, click on the **Upload** button (top right) to send the mission to the vehicle.

You can also use the *Pattern* tool to automate creation of survey grids.

:::tip
有关更多信息，请参阅[QGroundControl 用户指南](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html)。 :::

![规划任务](../../assets/flying/planning_mission.jpg)

### 设置机体航向

If set, a multi-rotor vehicle will yaw to face the **Heading** value specified in the target waypoint (corresponding to [MAV_CMD_NAV_WAYPOINT.param4](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT)).

If **Heading** has not been explicitly set for the target waypoint (`param4=NaN`) then the vehicle will yaw towards a location specified in the parameter [MPC_YAW_MODE](../advanced_config/parameter_reference.md#MPC_YAW_MODE). 默认情况下，是指向下一个航点。

不能独立控制偏航和行驶方向的机体类型将忽略偏航设置（例如固定翼）。

### 设置航点/转弯半径

The *acceptance radius* defines the circle around a waypoint within which a vehicle considers it has reached the waypoint, and will immediately switch to (and start turning towards) the next waypoint.

对于多旋翼无人机，使用参数[NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD)调整航点半径。 默认情况下，半径设置的很小以确保多旋翼无人机通过航路点上方，但可以增加半径以创建更平滑的路径，这时无人机在到达航路点之前便开始转弯。

下图显示了相同任务以不同的航点半径参数飞行的轨迹：

![航点半径](../../assets/flying/acceptance_radius_comparison.jpg)

转弯速度是根据航点半径（=转弯半径）和最大允许速度和加加速度自动计算的。

:::tip
For more information about the impact of the acceptance radius around the waypoint see: [Mission Mode > Inter-waypoint Trajectory](../flight_modes/mission.md#rounded-turns-inter-waypoint-trajectory). :::

## 飞行任务

任务上传后，切换到飞行视图。 任务将显示为一条航线，这样可以方便跟踪（在此视图中无法修改）。

![飞行任务](../../assets/flying/flying_mission.jpg)

