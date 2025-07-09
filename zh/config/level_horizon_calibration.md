---
canonicalUrl: https://docs.px4.io/main/zh/config/level_horizon_calibration
---

# 水平平面校准

You can use *Level Horizon Calibration* to compensate for small misalignments in controller orientation and to level the horizon in the *QGroundControl* flight view (blue on top and green on bottom).

:::tip
Performing this calibration step is only recommended if the autopilot's orientation is visibly misaligned with the specified orientation, or if there is a constant drift during flight in not position-controlled flight modes.
:::

## 执行校准

To level the horizon:

1. Start *QGroundControl* and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
1. Click the **Level Horizon** button. ![Level Horizon calibration](../../assets/qgc/setup/sensor/sensor_level_horizon.jpg) :::note You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). 如果没有，也可以在这里设置。 :::
1. 将飞行器放置于水平方向：
  * 这是飞行器在水平飞行时的位置（飞行器通常会向上轻微翘起！）
  * 对于旋翼机，这是悬停位置。
1. Press **OK** to start the calibration process.
1. 等待校准过程结束。


## 验证

Check that the artificial horizon displayed in the flight view has the indicator in the middle when the vehicle is placed on a level surface.


## 更多信息

* [Advanced Orientation Tuning](../advanced_config/advanced_flight_controller_orientation_leveling.md)（仅高级用户）。
* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/master/en/SetupView/sensors_px4.html#level-horizon)
* [PX4 Setup Video - @1m14s](https://youtu.be/91VGmdSlbo4?t=1m14s) (Youtube)
