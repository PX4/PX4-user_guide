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

### 设置航点/转弯半径

航点半径定义了一个以航点为圆心的圆，无人机到达半径内便认为到达航点，并且会立即前往（并开始转向）下一个航点。

对于多旋翼无人机，使用参数[NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD)调整航点半径。 默认情况下，半径设置的很小以确保多旋翼无人机通过航路点上方，但可以增加半径以创建更平滑的路径，这时无人机在到达航路点之前便开始转弯。

下图显示了相同任务以不同的航点半径参数飞行的轨迹：

![acceptance radius comparison](../../assets/flying/acceptance_radius_comparison.jpg)

转弯速度是根据航点半径（=转弯半径）和最大允许速度和加加速度自动计算的。

:::tip
关于航点半径的更多信息，见： [任务模式 > 航点间轨迹](../flight_modes/mission.md#rounded-turns-inter-waypoint-trajectory)。
:::

## 飞行任务

Once the mission is uploaded, switch to the flight view. The mission is displayed in a way that makes it easy to track progress (it cannot be modified in this view).

![flying-mission](../../assets/flying/flying_mission.jpg)