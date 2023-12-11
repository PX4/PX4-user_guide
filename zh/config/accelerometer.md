# 加速度计校准

您需要在首次使用时，或者如果飞行控制器方向改变时，校准您的加速计。 否则您不需要重新校正(除非可能在冬季， 如果你有一个飞行控制器，在工厂中没有 [的热校准](../advanced_config/sensor_thermal_calibration.md)

:::note
加速计校准效果不佳，通常通过飞行前检查和防护被拒绝的消息捕获(典型的QGC 警告提示“高加速计偏差”和“一致性检查失败”)。
:::

_QGroundControl_ will guide you to place and hold your vehicle in a number of orientations (you will be prompted when to move between positions).

:::tip
This is similar to [compass calibration](../config/compass.md) except that you hold the vehicle still (rather than rotate it) in each orientation.
:::

:::note
The calibration uses a least squares 'fit' algorithm that doesn't require you to have "perfect" 90 degree orientations.
Provided each axis is pointed mostly up and down at some time in the calibration sequence, and the vehicle is held stationary, the precise orientation doesn't matter.
:::

## 执行校准

The calibration steps are:

1. Start _QGroundControl_ and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
1. Click the **Accelerometer** sensor button.

   ![Accelerometer calibration](../../assets/qgc/setup/sensor/accelerometer.jpg)

:::note
You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). If not, you can also set it here.
:::

1. Click **OK** to start the calibration.
1. Position the vehicle as guided by the _images_ on the screen. Once prompted (the orientation-image turns yellow) hold the vehicle still. Once the calibration is complete for the current orientation the associated image on the screen will turn green.

![Accelerometer calibration](../../assets/qgc/setup/sensor/accelerometer_positions_px4.jpg)

1. Repeat the calibration process for all vehicle orientations.

Once you've calibrated the vehicle in all the positions _QGroundControl_ will display _Calibration complete_ (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.

## 更多信息：

- [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/master/en/SetupView/sensors_px4.html#accelerometer)
- [PX4 设置视频 - @1分46秒](https://youtu.be/91VGmdSlbo4?t=1m46s)（Youtube）
