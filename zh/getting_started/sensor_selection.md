# 传感器

基于 PX4 的系统使用传感器来确定飞行器状态（稳定和实现自主控制所需）。 车辆状态包括：位置/高度，航向，速度，空速，方向（姿态），不同方向的旋转速率，电池电量等。

系统 *最低要求* 陀螺仪，加速度计，磁力计（罗盘）和气压计。 需要 GPS 或其他定位系统来启用所有自动[模式](../getting_started/flight_modes.md#categories)和一些辅助模式。 固定翼和 VTOL 飞行器还应包括空速传感器（特别推荐）。

最小的传感器组合集成在 [Pixhawk 系列](../flight_controller/pixhawk_series.md) 飞行控制器上（并且也能存在其他控制器平台中）。 附加/外部传感器可以连接到控制器。

下面我们介绍一些传感器。 At the end there are links to information about [sensor wiring](#wiring).

## GPS&罗盘 {#gps_compass}

PX4 支持许多全球导航卫星系统（GNSS）接收器和指南针（磁力计）。 它还支持 [实时动态（RTK）GPS接收器](../gps_compass/rtk_gps.md) ，它将 GPS 系统扩展到厘米级精度。

> **Tip** [ Pixhawk 系列](../flight_controller/pixhawk_series.md) 控制器包括 *内部* 指南针。 This *may* be useful on larger vehicles (e.g. VTOL) where it is possible to reduce electromagnetic interference by mounting the Pixhawk a long way from power supply lines. On small vehicles an external compass is almost always required.

We recommend the use of an external "combined" compass/GPS module mounted as far away from the motor/ESC power supply lines as possible - typically on a pedestal or wing (for fixed-wing).

Common GPS/compass hardware options are listed in: [GPS/Compass](../gps_compass/README.md).

![GPS + Compass](../../images/gps_compass.jpg)

## Airspeed

Airspeed sensors are *highly recommended* for fixed-wing and VTOL frames.

They are so important because the autopilot does not have other means to detect stall. For fixed-wing flight it is the airspeed that guarantees lift not ground speed!

![Digital airspeed sensor](../../images/digital_airspeed_sensor.jpg)

For more information and recommended hardware see: [Airspeed Sensors](../sensor/airspeed.md).

## Distance

Distance sensors are used for precision landing, object avoidance and terrain following.

PX4 supports many affordable distance sensors, using different technologies, and supporting different ranges and features. For more information see: [Distance Sensors](../sensor/rangefinders.md).

<img src="../../images/lidar_lite_1.png" title="lidar_lite_1" width="500px" />

## 光流

[PX4Flow](../sensor/px4flow.md) is an optical flow smart camera that can track motion, and has as integrated sonar sensor. PX4 blends the sensor output with information from other position sources (e.g. GPS) to provide a more accurate position lock. This sensor can be used indoors, when no GPS signal is available.

![px4flow-bottom](../../assets/hardware/sensors/px4flow/px4flow_bottom.jpg)

Some options include:

* [3DR PX4Flow Smart Camera (Optical Flow Sensor)](https://www.unmannedtechshop.co.uk/px4flow-smart-camera-optical-flow-sensor/) (unmannedtechshop)
* [HK Pilot32 Optical Flow Kit With Sonar](https://hobbyking.com/en_us/hk-pilot32-optical-flow-kit-with-sonar.html) (Hobbyking) - Software-compatible, but not connector-compatible.

## Sensor Wiring {#wiring}

Sensor wiring information is usually provided in manufacturer documentation for flight controllers and the sensors themselves.

In addition, see:

* [Basic Assembly](../assembly/README.md) contains flight controller quick start guides. These cover wiring of the core sensors to specific flight controller hardware.
* [Flight Controller](../flight_controller/README.md) topics often contain wiring information.
* [Peripheral Hardware](../peripherals/README.md) contains documentation for other sensors.