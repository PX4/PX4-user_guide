---
canonicalUrl: https://docs.px4.io/main/zh/config/flight_controller_orientation
---

# 飞行控制器/传感器方向

默认的飞行器（如果具有外部罗盘）应该向上安装在机架上部，箭头朝向飞行器的前方。 如果板载或外部罗盘被安装在其他方向，您需要在固件中配置。

## 计算朝向

ROLL, PITCH and/or YAW offsets of the flight controller are calculated relative to the vehicle around the forward (x), right (y), down (z) axes.

![机架航向](../../assets/concepts/frame_heading.png)

The axes to rotate around stay the same from one rotation step to the next one. So the frame to perform the rotation in stays fixed. This is also known as *extrinsic rotation*.

<img src="../../assets/qgc/setup/sensor/fc_orientation_1.png" style="width: 600px;" />

For example, the vehicles shown below have rotations around the z-axis (i.e. yaw only) corresponding to: `ROTATION_NONE`, `ROTATION_YAW_90`,`ROTATION_YAW_180`,`ROTATION_YAW_270`.

![Yaw 旋转](../../assets/qgc/setup/sensor/yaw_rotation.png)

:::note
For a VTOL Tailsitter airframe set the vehicle orientation according to its multirotor configuration (i.e. relative to the vehicle during, takeoff, hovering, landing) for all sensor calibrations.

The axis are normally relative to the orientation of the vehicle during steady forward flight. For more information see [Basic Concepts](../getting_started/px4_basic_concepts.md#heading-and-directions). :::

## 设置朝向

To set the orientations:

1. Start *QGroundControl* and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
1. Select the **Set Orientations** button.

   <img src="../../assets/qgc/setup/sensor/sensor_orientation_set_orientations.jpg" style="width: 600px;" />
1. Select the **AutoPilot Orientation** (as [calculated above](#calculating-orientation)).

   <img src="../../assets/qgc/setup/sensor/sensor_orientation_selector_values.jpg" style="width: 200px;" />
1. Select the **External Compass Orientation** in the same way (this option will only be displayed if your vehicle has an external compass).
1. Press **OK**.


## 优化调整

You can use [Level Horizon Calibration](../config/level_horizon_calibration.md) to compensate for small miss-alignments in controller orientation and to level the horizon in flight view.

## 更多信息

* [Advanced Orientation Tuning](../advanced_config/advanced_flight_controller_orientation_leveling.md)（仅高级用户）。
* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/master/en/SetupView/sensors_px4.html#flight_controller_orientation)
