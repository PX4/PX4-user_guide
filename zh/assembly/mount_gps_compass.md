---
canonicalUrl: https://docs.px4.io/main/zh/assembly/mount_gps_compass
---

# 安装GPS/指南针

应尽可能将GPS/指南针安装在框架上远离其他电子设备的地方。 它的方向标记指向载具前面。 如果以这种方式安装，你可以立即着手 [指南针校准](../config/compass.md#performing-the-calibration)。

The diagram below shows the heading marker on the Pixhawk 4 and compass.

![Connect compass/GPS to Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_compass_gps.jpg)

## Compass Orientation

指南针可以安装在任何 [MAV_SENSOR_OR_ORIENTATION](https://mavlink.io/en/messages/common.html#MAV_SENSOR_ORIENTATION) 定义的标准的 MAVLink 方向中。 The orientation follows the same frame convention as when [orienting the flight controller](../config/flight_controller_orientation.md#calculating-orientation).

If you're using the normal [Compass Calibration](../config/compass.md) process (with parameter [SENS_MAG_AUTOROT](../advanced_config/parameter_reference.md#SENS_MAG_AUTOROT) enabled), the orientation should be detected automatically. 否则您可以在 [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG1_ROT) 中为最多三个指南针直接选择适当的值。

:::warning
You must mount the compass in a supported orientation!

If you mount the compass at an orientation that isn't supported, for example `Yaw 30`, PX4 will detect the closest supported value. This will result in errors/warnings, even if the calibration appeared to succeed.
:::
