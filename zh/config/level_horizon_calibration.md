# 水平平面校准

You can use *Level Horizon Calibration* to compensate for small miss-alignments in controller orientation and to level the horizon in the *QGroundControl* flight view (blue on top and green on bottom).

> **Tip** Leveling the horizon is highly recommended, and will result in the best flight performance. This process can also be repeated if you notice a constant drift during flight.

## 执行校准

To level the horizon:

1. 打开 *QGroundControl* 并连接上飞机。
2. 在工具栏选择 **齿轮** 图标 (机体设置)，然后在侧边栏选择 **传感器**。
3. Click the **Level Horizon** button. ![Level Horizon calibration](../../images/qgc/setup/sensor_level_horizon.jpg) > **Note** You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). 如果没有，也可以在这里设置。 
4. Place the vehicle in its level flight orientation on a level surface: 
    * For planes this is the position during level flight (planes tend to have their wings slightly pitched up!)
    * For copters this is the hover position.
5. Press **OK** to start the calibration process.
6. Wait until the calibration process is finished.

## Verification

After the orientation is set and level-horizon calibration is complete, check in the flight view that the heading in the compass shows a value around 0 when you point the vehicle towards north and that the horizon is level (blue on top and green on bottom).

## 更多信息

* [Advanced Orientation Tuning](../advanced_config/advanced_flight_controller_orientation_leveling.md) (advanced users only).
* [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#level-horizon)
* [PX4 Setup Video "Gyroscope" - @1m14s](https://youtu.be/91VGmdSlbo4?t=1m14s) (Youtube)