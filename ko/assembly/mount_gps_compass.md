# Mounting a GPS/Compass

GPS/Compasses should be mounted on the frame as far away from other electronics as possible, with the direction marker pointing towards the front of the vehicle. You should also configure PX4 to [set the position](#position) of the receiver relative to the centre-of-gravity (CoG).

아래 다이어그램은 Pixhawk 4와 나침반의 전방 마커를 나타냅니다.

![Pixhawk 4 -- 나침반/GPS 연결 ](../../assets/flight_controller/pixhawk4/pixhawk4_compass_gps.jpg)

## Compass Orientation

The compass can be mounted in any of the standard MAVLink orientations defined in [MAV_SENSOR_ORIENTATION](https://mavlink.io/en/messages/common.html#MAV_SENSOR_ORIENTATION). The orientation follows the same frame convention as when [orienting the flight controller](../config/flight_controller_orientation.md#calculating-orientation).

If you're using the normal [Compass Calibration](../config/compass.md) process (with parameter [SENS_MAG_AUTOROT](../advanced_config/parameter_reference.md#SENS_MAG_AUTOROT) enabled), the orientation should be detected automatically. Otherwise you can directly select the appropriate value in [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG1_ROT) for up to three compasses.

:::warning
지원되는 방향으로 나침반을 장착하여야 합니다!

지원되지 않는 방향(예: `Yaw 30`)에 나침반을 장착하면 PX4는 지원되는 가장 근사치를 감지합니다. 보정이 성공한 것처럼 보이더라도, 오류/경고가 표시될 수 있습니다.
:::

## Position

In order to compensate for the relative motion between the receiver and the CoG, you should [configure](../advanced_config/parameters.md) the following parameters to set the offsets: [EKF2_GPS_POS_X](../advanced_config/parameter_reference.md#EKF2_GPS_POS_X), [EKF2_GPS_POS_Y](../advanced_config/parameter_reference.md#EKF2_GPS_POS_Y) and [EKF2_GPS_POS_Z](../advanced_config/parameter_reference.md#EKF2_GPS_POS_Z).

This is important because the body frame estimated by the EKF will converge on the location of the GNSS module and assume it to be at the CoG. If the GNSS module is significantly offset from the CoG, then rotation around the COG will be interpreted as an altitude change, which in some flight modes (such as position mode) will result in unnecessary corrections.

It is particularly important if using [RTK GNSS](../advanced/rtk_gps.md) which has centimeter-level accuracy, because if the offsets are not set then GNSS measurements will often be rejected as inconsistent with the current EFK estimate.

::: details
Explanation For example, if the GNSS module is 10cm above the CoG, and the IMU is located at the GoG, a pitch motion of 1 rad/s will create a GNSS velocity measurement of 10cm/s _even though the CoG isn't moving_. If the speed accuracy of the GNSS receiver is 1cm/s, the EKF might stop trusting the measurements because they appear inconsistent (wrong by 10x the accuracy). If the offsets are defined, the EKF will correct the measurements using the gyro data.
:::
