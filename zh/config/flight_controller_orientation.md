# 飞行控制器/传感器方向

默认的飞行器（如果具有外部罗盘）应该向上安装在机架上部，箭头朝向飞行器的前方。 If the board or an external compass are mounted in any other orientation then you will need configure this in the firmware.

## Calculating Orientation

YAW, PITCH and/or ROLL offsets are calculated relative to the forward-facing-upright orientation (clock-wise rotation around the Z, Y and X axis, respectively). This frame is referred to as the *body frame* and the default orientation as `ROTATION_NONE`.

<img src="../../images/fc_orientation_1.png" style="width: 600px;" />

For example, the vehicles shown below have rotations around the z-axis (only) corresponding to: `ROTATION_NONE`, `ROTATION_YAW_90`,`ROTATION_YAW_180`,`ROTATION_YAW_270`.

![Yaw Rotation](../../images/yaw_rotation.png)

## Setting the Orientation

To set the orientations:

1. 打开 *QGroundControl* 并连接上飞机。
2. 在工具栏选择 **齿轮** 图标 (机体设置)，然后在侧边栏选择 **传感器**。
3. Select the **Set Orientations** button. <img src="../../images/qgc/setup/sensor_orientation_set_orientations.jpg" style="width: 600px;" />
4. Select the **AutoPilot Orientation** (as [calculated above](#calculating-orientation)).
    
    <img src="../../images/qgc/setup/sensor_orientation_selector_values.jpg" style="width: 200px;" />

5. Select the **External Compass Orientation** in the same way (this option will only be displayed if your vehicle has an external compass).

6. Press **OK**.

## Fine Tuning

You can use [Level Horizon Calibration](../config/level_horizon_calibration.md) to compensate for small miss-alignments in controller orientation and to level the horizon in flight view.

## 更多信息

* [Advanced Orientation Tuning](../advanced_config/advanced_flight_controller_orientation_leveling.md) (advanced users only).
* [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#flight_controller_orientation)