# 安装GPS/指南针

应尽可能将GPS/指南针安装在框架上远离其他电子设备的地方。 它的方向标记指向载具前面。 如果以这种方式安装，你可以立即着手 [指南针校准](../config/compass.md#performing-the-calibration)。

The diagram below shows the heading marker on the Pixhawk 4 and compass.

![Connect compass/GPS to Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_compass_gps.jpg)

## Compass Orientation

指南针可以安装在任何 [MAV_SENSOR_OR_ORIENTATION](https://mavlink.io/en/messages/common.html#MAV_SENSOR_ORIENTATION) 定义的标准的 MAVLink 方向中。 方向与 [设置飞行控制器方向](../config/flight_controller_orientation.md#orientation-definition) 时相同。

如果您正在使用普通的 [指南针校准](../config/compass.md) 进程（启用了 [CAL_MAG_ROT_AUTO](../advanced_config/parameter_reference.md#CAL_MAG_ROT_AUTO)参数)，方向应该会被自动检测。 否则您可以在 [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG1_ROT) 中为最多三个指南针直接选择适当的值。

:::warning
You must mount the compass in a supported orientation!

If you mount the compass at an orientation that isn't supported, for example `Yaw 30`, PX4 will detect the closest supported value. This will result in errors/warnings, even if the calibration appeared to succeed.
:::
