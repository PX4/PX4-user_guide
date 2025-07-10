---
canonicalUrl: https://docs.px4.io/main/zh/getting_started/sensor_selection
---

# 传感器

基于 PX4 的系统使用传感器来确定飞行器状态（自稳和启用自主控制所需）。 飞行器状态包括：位置/高度，航向，速度，空速，方向（姿态），不同方向的旋转速率，电池电量等。

The system *minimally requires* a gyroscope, accelerometer, magnetometer (compass) and barometer. 需要 GPS 或其他定位系统来启用所有自动[模式](../getting_started/flight_modes.md#categories)和一些辅助模式。 固定翼和 VTOL 飞行器还应包括空速传感器（特别推荐）。

最小的传感器组合集成在 [Pixhawk 系列](../flight_controller/pixhawk_series.md) 飞控上（并且也能存在其他飞控平台上）。 附加/外部传感器可以连接到控制器。

下面我们介绍一些传感器。 最后有链接到关于 [传感器接线](#wiring) 的信息。


<span id="gps_compass"></span>
## GPS&罗盘

PX4 支持许多全球导航卫星系统（GNSS）接收器和罗盘（磁力计）。 它还支持 [实时动态（RTK）GPS接收器](../gps_compass/rtk_gps.md) ，它将 GPS 系统扩展到厘米级精度。

:::note
[Pixhawk-series](../flight_controller/pixhawk_series.md) controllers include an *internal* compass. This *may* be useful on larger vehicles (e.g. VTOL) where it is possible to reduce electromagnetic interference by mounting the Pixhawk a long way from power supply lines. 在小型飞行器上，几乎总是需要外置罗盘。 :::

我们建议使用安装在尽可能远离 电机/电调 电源线的外部“组合” 罗盘 / GPS 模块 - 通常在支座或机翼（固定翼）上。

常见的 GPS/罗盘硬件选项列于：[GPS/罗盘](../gps_compass/README.md)。

![GPS + Compass](../../assets/hardware/gps/gps_compass.jpg)


## 空速计

Airspeed sensors are *highly recommended* for fixed-wing and VTOL frames.

它们非常重要，因为自驾仪没有其他方法来检测失速。 对于固定翼飞行来说，保证升力的是空速而不是地速。

![Digital airspeed sensor](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

有关更多信息和推荐的硬件，请参阅：[空速传感器](../sensor/airspeed.md)。

## 转速计

Tachometers ([revolution-counter sensors](https://en.wikipedia.org/wiki/Tachometer#In_automobiles,_trucks,_tractors_and_aircraft)) are *highly recommended* for rotor-wing frames because they allow the autopilot to detect stall or another rotor failure (for rotor-wing flight it is the rotation of blades that guarantees lift not airspeed or ground speed).

![Digital RPM Sensor - TFRPM01A](../../assets/hardware/sensors/tfrpm/tfrpm01_electronics.jpg)

For more information and recommended hardware see: [Sensors > Tachometers](../sensor/tachometers.md).


## 距离传感器

距离传感器用于精准着陆，避障和地形跟随。

PX4 支持许多实惠的距离传感器，使用不同的技术，并支持不同的范围和功能。 有关更多信息，请参阅：[距离传感器](../sensor/rangefinders.md)。

<img src="../../assets/hardware/sensors/lidar_lite/lidar_lite_1.png" title="lidar_lite_1" width="500px" />

## 光流

[光流](../sensor/optical_flow.md) 传感器使用下视相机和向下的距离传感器进行速度估计。 PX4 将光流传感器输出与来自其他定位源（例如 GPS）的信息融合，以提供更准确的位置锁定。 该传感器可以用于没有 GPS 信号的室内。

![px4flow-bottom](../../assets/hardware/sensors/px4flow/px4flow_bottom.jpg)

一些选项包括：
- [PX4Flow](../sensor/px4flow.md)内置声纳测距传感器。
- [PMW3901](../sensor/pmw3901.md)  有着与光学鼠标非常相似的感应器.


<span id="wiring"></span>
## 传感器接线

传感器接线信息通常在飞控和传感器本身的制造商文档中提供。

另外，请参阅：
* [基本组件](../assembly/README.md)包含飞控快速入门指南。 其包括核心传感器到特定飞控硬件的接线。
* [飞控](../flight_controller/README.md) 主题通常包含接线信息。
* [外设硬件](../peripherals/README.md)包含其他传感器的文档。
