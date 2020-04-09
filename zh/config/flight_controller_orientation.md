# 飞行控制器/传感器方向

默认的飞行器（如果具有外部罗盘）应该向上安装在机架上部，箭头朝向飞行器的前方。 如果板载或外部罗盘被安装在其他方向，您需要在固件中配置。

## 计算朝向

偏航、俯仰和滚转偏移按照相对前向垂直方向计算（分别围绕Z、Y、X轴顺时针方向旋转）。 这一框架被称为 *body frame* 默认的朝向是 `ROTATION_NONE`。

<img src="../../images/fc_orientation_1.png" style="width: 600px;" />

例如，下面显示的飞行器只有Z轴的旋转，对应`ROTATION_NONE`，`ROTATION_YAW_90`，`ROTATION_YAW_180`，`ROTATION_YAW_270`。

![Yaw 旋转](../../images/yaw_rotation.png)

## 设置朝向

设置朝向步骤如下：

1. 打开 *QGroundControl* 并连接上飞机。
2. 在工具栏选择 **齿轮** 图标 (机体设置)，然后在侧边栏选择 **传感器**。
3. 选择 **Set Orientations** 按钮。 <img src="../../images/qgc/setup/sensor_orientation_set_orientations.jpg" style="width: 600px;" />
4. 选择 **AutoPilot Orientation** (如 [calculated above](#calculating-orientation))。
    
    <img src="../../images/qgc/setup/sensor_orientation_selector_values.jpg" style="width: 200px;" />

5. 同样的选择 **External Compass Orientation**（只有当您的飞行器有外部罗盘时，才会显示此选项）。

6. 点击 **OK**。

## 微调

您可以使用 [校准地平（Level Horizon Calibration）](../config/level_horizon_calibration.md) 补偿飞行控制器方向中小误差并校平飞行视图中的地平线。

## 更多信息

* [Advanced Orientation Tuning](../advanced_config/advanced_flight_controller_orientation_leveling.md)（仅高级用户）。
* [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#flight_controller_orientation)