---
canonicalUrl: https://docs.px4.io/main/ko/assembly/mount_gps_compass
---

# Mounting a GPS/Compass

GPS/Compasses should be mounted on the frame as far away from other electronics as possible, with the direction marker pointing towards the front of the vehicle. If mounted in this way you can immediately proceed to [compass calibration](../config/compass.md#performing-the-calibration).

아래 다이어그램은 Pixhawk 4와 나침반의 전방 마커를 나타냅니다.

![Pixhawk 4 -- 나침반/GPS 연결 ](../../assets/flight_controller/pixhawk4/pixhawk4_compass_gps.jpg)

## 나침반 방향

The compass can be mounted in any of the standard MAVLink orientations defined in [MAV_SENSOR_ORIENTATION](https://mavlink.io/en/messages/common.html#MAV_SENSOR_ORIENTATION). The orientation follows the same frame convention as when [orienting the flight controller](../config/flight_controller_orientation.md#calculating-orientation).

If you're using the normal [Compass Calibration](../config/compass.md) process (with parameter [SENS_MAG_AUTOROT](../advanced_config/parameter_reference.md#SENS_MAG_AUTOROT) enabled), the orientation should be detected automatically. Otherwise you can directly select the appropriate value in [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG1_ROT) for up to three compasses.

:::warning
지원되는 방향으로 나침반을 장착하여야 합니다!

지원되지 않는 방향(예: `Yaw 30`)에 나침반을 장착하면 PX4는 지원되는 가장 근사치를 감지합니다. 보정이 성공한 것처럼 보이더라도, 오류/경고가 표시될 수 있습니다.
:::
