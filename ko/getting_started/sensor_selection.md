---
canonicalUrl: https://docs.px4.io/main/ko/getting_started/sensor_selection
---

# 센서

PX4 시스템은 안정화나 자율제어를  위하여 센서를 사용하여 기체의 상태를 파악합니다. The vehicle states include: position/altitude, heading, speed, airspeed, orientation (attitude), rates of rotation in different directions, battery level, and so on.

PX4 *minimally requires* a gyroscope, accelerometer, magnetometer (compass) and barometer. 자동 [모드](../getting_started/flight_modes.md#categories)와  기타 모드에는 GPS나 이와 유사한 위치 확인 시스템이 요구됩니다. Fixed-wing and VTOL-vehicles should additionally include an airspeed sensor (highly recommended).

[Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 비행 콘트롤러에 최소한의 센서들이 내장되어 있습니다. 필요한 센서들을 콘트롤러에 추가할 수 있습니다.

Below we describe some of the external sensors.
<a id="gps_compass"></a>

## GPS와 나침반

PX4 supports a number of Global Navigation Satellite System (GNSS) receivers and compasses (magnetometers). It also supports Real Time Kinematic (RTK) GPS Receivers, which extend GPS systems to centimetre-level precision.

나침반이나 GPS 수신기는 모터나 ESC 전원에서 가능한 멀리 장착하여 사용하는 것이 좋습니다. 일반적으로 받침대나 고정 날개에 설치하는 것이 좋습니다.

![GPS/나침반](../../assets/hardware/gps/gps_compass.jpg)

GPS/compass hardware options are listed in:
- [GPS/Compass](../gps_compass/README.md)
- [RTK GPS](../gps_compass/rtk_gps.md)

:::note
[픽스호크 시리즈](../flight_controller/pixhawk_series.md) 콘트롤러에는 *내부* 나침반이 포함되어 있습니다. Due to electromagnetic interference caused by power cables close to the flight controller, it is highly recommended to not rely on the internal compass for heading estimation and instead to mount an external one. :::

## 대기속도  센서

Airspeed sensors are *highly recommended* for fixed-wing and VTOL frames.

They are so important because the autopilot does not have other means to detect stall. 고정익의 양력을 발생시키는 것은 대지속도가 아니라 대기속도입니다.

![디지털 대기 센서](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

더 자세한 정보와 권장 하드웨어는 [대기속도 센서](../sensor/airspeed.md)를 참고하십시오.

## 거리 센서

Distance sensors are used for smooth landings, object avoidance and terrain following.

여러가지 기술을 사용하여 다양한 범위와 기능을 지원하는 저렴한 거리 센서를 PX4에서 지원합니다. 더 자세한 정보는 [거리 센서](../sensor/rangefinders.md)를 참고하십시오.

<img src="../../assets/hardware/sensors/lidar_lite/lidar_lite_1.png" title="lidar_lite_1" width="500px" />

## 광류 센서

[Optical Flow sensors](../sensor/optical_flow.md) use a downward facing camera and a downward facing distance sensor for velocity estimation. PX4는 센서 데이터와 다른 위치 정보(예 : GPS)를 연계하여 정확한 위치를 측정합니다. 광류 센서는 GPS 신호가 잡히지 않는 실내에서도 사용할 수 있습니다.

![Image of ARK Flow optical flow sensor](../../assets/hardware/sensors/optical_flow/ark_flow.jpg)


## See Also

- [Peripheral Hardware](../peripherals/README.md) contains documentation for other sensors, such as [Battery/Power Monitors](../power_module/README.md)), [Air traffic warning systems](../peripherals/adsb_flarm.md), [Tachometers](../sensor/tachometers.md).
- [기초 초립법](../assembly/README.md)에는 비행 콘틀롤러에 관한 시작 가이드가 포함되어 있습니다. These explain how to connect the core sensors to specific flight controller hardware.
- [비행 콘트롤러](../flight_controller/README.md) 항목에서는 배선 정보를 설명합니다.
