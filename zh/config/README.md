# 基本配置

*QGroundControl* is used to install [firmware](../config/firmware.md) onto the flight controller hardware, specify an [airframe](../config/airframe.md), and configure the core sensors that PX4 needs to be present on every vehicle (compass, GPS, gyro etc.).

> **Tip** 在开始本部分之前，您应该 [下载QGroundControl](http://qgroundcontrol.com/downloads/) 并将其安装在 **桌面** 计算机上（*QGroundControl* 不支持移动平台上的飞机配置）。

This section contains *essential* configuration topics:

* [Firmware](../config/firmware.md)
* [Airframe](../config/airframe.md)
* [Sensor Orientation](../config/flight_controller_orientation.md)
* [Compass](../config/compass.md)
* [Accelerometer](../config/accelerometer.md)
* [Airspeed](../config/airspeed.md) (fixed-wing/VTOL)
* [Level Horizon Calibration](../config/level_horizon_calibration.md)
* [Radio Setup](../config/radio.md)
* [Flight Modes](../config/flight_mode.md) (Optional)
* [Battery](../config/battery.md) (optional)
* [Safety](../config/safety.md) (optional)

> **Note** 对于 [支持的机架](../config/airframe.md) 只需要这种基本配置。 如果要创建新的机架，还需要执行调整 (请参阅 [高级配置](../advanced_config/README.md) )。

## 视频教程

The video below shows the calibration process in detail.

{% youtube %} https://www.youtube.com/watch?v=91VGmdSlbo4 {% endyoutube %}

## 支持

If you need help with the configuration you can ask for help on the [QGroundControl Support forum](http://discuss.px4.io/c/qgroundcontrol/qgroundcontrol-usage).

## 更多信息

* [QGroundControl配置许可证](https://docs.qgroundcontrol.com/en/SetupView/SetupView.html)
* [高级配置](../advanced_config/README.md) （更高级的话题，关于小众传感器和外设的使用以及飞机调试）。