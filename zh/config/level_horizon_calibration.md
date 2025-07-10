---
canonicalUrl: https://docs.px4.io/main/zh/config/level_horizon_calibration
---

# 水平平面校准

You can use *Level Horizon Calibration* to compensate for small miss-alignments in controller orientation and to level the horizon in the *QGroundControl* flight view (blue on top and green on bottom).

:::tip
Leveling the horizon is highly recommended, and will result in the best flight performance.
This process can also be repeated if you notice a constant drift during flight.
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

After the orientation is set and level-horizon calibration is complete, check in the flight view that the heading in the compass shows a value around 0 when you point the vehicle towards north and that the horizon is level (blue on top and green on bottom).


## 更多信息

* [Advanced Orientation Tuning](../advanced_config/advanced_flight_controller_orientation_leveling.md)（仅高级用户）。
* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#level-horizon)
* [PX4 Setup Video - @1m14s](https://youtu.be/91VGmdSlbo4?t=1m14s) (Youtube)
