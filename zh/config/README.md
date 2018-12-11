# Basic Configuration

本节包含*必要*配置主题, 包括如何在飞行控制器硬件上安装固件、选择机身以及配置PX4需要在每辆车上存在的核心传感器 (指南针、gps、陀螺仪等)

The configuration process is executed using QGroundConrol and consists of these major steps:

* Selecting the airframe on which the autopilot is installed (plane, multicopter, VTOL, etc.)
* Specifying the autopilot/sensor orientation and calibrating the vehicle's sensors.
* Optional: Calibrating the radio control (PX4 can be flown without a radio control using *QGroundControl* on a desktop of mobile ground station).
* Optional: Selecting which switches of the radio control should switch the system between different [flight modes](../config/flight_mode.md).

Configuration & calibration instructions are linked from the sidebar and/or you can follow the [video guide](#video-guide) below.

> **Tip** Before starting this section you should [Download QGroundControl](http://qgroundcontrol.com/downloads/) and install it on your **desktop** computer (*QGroundControl* does not support vehicle configuration on mobile platforms).

<span></span>

> **Note** For a [supported airframe](../config/airframe.md) only this basic configuration is required. If you're creating a new airframe you will additionally need to perform vehicle tuning (see [Advanced Configuration](../advanced_config/README.md)).

## Video Guide

The video below shows the calibration process in detail.

{% youtube %} https://www.youtube.com/watch?v=91VGmdSlbo4 {% endyoutube %}

## Support

If you need help with the configuration you can ask for help on the [QGroundControl Support forum](http://discuss.px4.io/c/qgroundcontrol/qgroundcontrol-usage).

## 更多信息：

* [QGroundControl > Setup](https://docs.qgroundcontrol.com/en/SetupView/SetupView.html)
* [Advanced Configuration](../advanced_config/README.md) (more advanced topics, related to lesser-used sensors and peripherals, and to vehicle/parameter tuning).