---
canonicalUrl: https://docs.px4.io/main/zh/flying/missions
---

# 任务

## 规划任务

手动规划任务非常简单:
- 切换到任务视图
- 在左上角选择**添加航点**（“加号”）图标。
- 点击地图添加航点。
- 使用右侧的航点列表修改航点参数和类型。底部的高度指示器提供每个航点的相对高度。
- 完成后，单机**上传**按钮（右上角）发送任务到飞行器。

您也可以使用*图案*工具自动创建测绘网络。

:::tip
有关更多信息，请参阅[QGroundControl 用户指南](https://docs.qgroundcontrol.com/master/en/PlanView/PlanView.html)。 :::

![规划任务](../../assets/flying/planning_mission.jpg)

### 任务可行性检查

PX4进行了一些基本的健全性检查确定任务是否可行。 For example, whether the mission is close enough to the vehicle, if the mission will conflict with a geofence, or if a mission landing pattern is required but is not present.

检查是在任务上传上传或者任务运行之前立即运行。 如果检查失败，将通知用户不能启动任务。


关于检查和运行的更多详情，请参阅：[任务模式>任务可行性检查](../flight_modes/mission.md#mission-feasibility-checks)。

### 设置机体航向

设置后，多旋翼机体航向将会朝向配置的**航向**值（对应[MAV_CMD_NAV_WAYPOINT.param4](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT)）。

如果**航向**没有明确设置目标航点（`参数4=NaN`）那么机体将要朝着参数[MPC_YAW_MODE](../advanced_config/parameter_reference.md#MPC_YAW_MODE)中指定的位置飞去。 默认情况下，是指向下一个航点。

Vehicle types that cannot independently control yaw and direction of travel will ignore yaw settings (e.g. Fixed-wing).

### 设置航点/转弯半径

*航点半径*定义了一个以航点为圆心的圆，如果无人机叨叨半径内便认为到达航点，并且会立即前往（并开始转向）下一个航点。

对于多旋翼无人机，使用参数[NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD)调整航点半径。 默认情况下，半径设置的很小以确保多旋翼无人机通过航路点上方，但可以增加半径以创建更平滑的路径，这时无人机在到达航路点之前便开始转弯。

下图显示了相同任务以不同的航点半径参数飞行的轨迹：

![航点半径](../../assets/flying/acceptance_radius_comparison.jpg)

转弯速度是根据航点半径（=转弯半径）和最大允许速度和加加速度自动计算的。

:::tip
关于航点半径的更多信息，见： [任务模式 > 航点间的轨迹](../flight_modes/mission.md#rounded-turns-inter-waypoint-trajectory)。 :::

## 飞行任务

任务上传后，切换到飞行视图。 任务将显示为一条航线，这样可以方便跟踪（在此视图中无法修改）。

![飞行任务](../../assets/flying/flying_mission.jpg)

