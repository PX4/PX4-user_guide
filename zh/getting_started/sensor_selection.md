---
canonicalUrl: https://docs.px4.io/main/zh/getting_started/sensor_selection
---

# 传感器

基于 PX4 的系统使用传感器来确定飞行器状态（自稳和启用自主控制所需）。 The vehicle states include: position/altitude, heading, speed, airspeed, orientation (attitude), rates of rotation in different directions, battery level, and so on.

PX4 *minimally requires* a gyroscope, accelerometer, magnetometer (compass) and barometer. 需要 GPS 或其他定位系统来启用所有自动[模式](../getting_started/flight_modes.md#categories)和一些辅助模式。 Fixed-wing and VTOL-vehicles should additionally include an airspeed sensor (highly recommended).

最小的传感器组合集成在 [Pixhawk 系列](../flight_controller/pixhawk_series.md) 飞控上（并且也能存在其他飞控平台上）。 附加/外部传感器可以连接到控制器。

Below we describe some of the external sensors.
<a id="gps_compass"></a>

## GPS&罗盘

PX4 supports a number of Global Navigation Satellite System (GNSS) receivers and compasses (magnetometers). It also supports Real Time Kinematic (RTK) GPS Receivers, which extend GPS systems to centimetre-level precision.

我们建议使用安装在尽可能远离 电机/电调 电源线的外部“组合” 罗盘 / GPS 模块 - 通常在支座或机翼（固定翼）上。

![GPS + Compass](../../assets/hardware/gps/gps_compass.jpg)

GPS/compass hardware options are listed in:
- [GPS/Compass](../gps_compass/README.md)
- [RTK GPS](../gps_compass/rtk_gps.md)

:::note
[Pixhawk-series](../flight_controller/pixhawk_series.md) controllers include an *internal* compass. Due to electromagnetic interference caused by power cables close to the flight controller, it is highly recommended to not rely on the internal compass for heading estimation and instead to mount an external one. :::

## 空速计

Airspeed sensors are *highly recommended* for fixed-wing and VTOL frames.

They are so important because the autopilot does not have other means to detect stall. 对于固定翼飞行来说，保证升力的是空速而不是地速。

![Digital airspeed sensor](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

有关更多信息和推荐的硬件，请参阅：[空速传感器](../sensor/airspeed.md)。

## 距离传感器

Distance sensors are used for smooth landings, object avoidance and terrain following.

PX4 支持许多实惠的距离传感器，使用不同的技术，并支持不同的范围和功能。 有关更多信息，请参阅：[距离传感器](../sensor/rangefinders.md)。

<img src="../../assets/hardware/sensors/lidar_lite/lidar_lite_1.png" title="lidar_lite_1" width="500px" />

## 光流

[Optical Flow sensors](../sensor/optical_flow.md) use a downward facing camera and a downward facing distance sensor for velocity estimation. PX4 将光流传感器输出与来自其他定位源（例如 GPS）的信息融合，以提供更准确的位置锁定。 该传感器可以用于没有 GPS 信号的室内。

![Image of ARK Flow optical flow sensor](../../assets/hardware/sensors/optical_flow/ark_flow.jpg)


## See Also

- [Peripheral Hardware](../peripherals/README.md) contains documentation for other sensors, such as [Battery/Power Monitors](../power_module/README.md)), [Air traffic warning systems](../peripherals/adsb_flarm.md), [Tachometers](../sensor/tachometers.md).
- [基本组件](../assembly/README.md)包含飞控快速入门指南。 These explain how to connect the core sensors to specific flight controller hardware.
- [飞控](../flight_controller/README.md) 主题通常包含接线信息。
