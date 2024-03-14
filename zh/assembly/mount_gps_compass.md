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

## Position

In order to compensate for the relative motion between the receiver and the CoG, you should [configure](../advanced_config/parameters.md) the following parameters to set the offsets: [EKF2_GPS_POS_X](../advanced_config/parameter_reference.md#EKF2_GPS_POS_X), [EKF2_GPS_POS_Y](../advanced_config/parameter_reference.md#EKF2_GPS_POS_Y) and [EKF2_GPS_POS_Z](../advanced_config/parameter_reference.md#EKF2_GPS_POS_Z).

This is important because the body frame estimated by the EKF will converge on the location of the GNSS module and assume it to be at the CoG. If the GNSS module is significantly offset from the CoG, then rotation around the COG will be interpreted as an altitude change, which in some flight modes (such as position mode) will result in unnecessary corrections.

It is particularly important if using [RTK GNSS](../advanced/rtk_gps.md) which has centimeter-level accuracy, because if the offsets are not set then GNSS measurements will often be rejected as inconsistent with the current EFK estimate.

::: details
Explanation For example, if the GNSS module is 10cm above the CoG, and the IMU is located at the GoG, a pitch motion of 1 rad/s will create a GNSS velocity measurement of 10cm/s _even though the CoG isn't moving_. If the speed accuracy of the GNSS receiver is 1cm/s, the EKF might stop trusting the measurements because they appear inconsistent (wrong by 10x the accuracy). If the offsets are defined, the EKF will correct the measurements using the gyro data.
:::
