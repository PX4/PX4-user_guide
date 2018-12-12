# Basic Configuration

本节包含*必要*配置主题, 包括如何在飞行控制器硬件上安装固件、选择机身以及配置PX4需要在每辆车上存在的核心传感器 (指南针、gps、陀螺仪等)

该配置过程需要运行QGroundConrol，包括如下主要步骤：

* 选择自驾仪已经装配的机架(固定翼、多旋翼、垂直起降等)
* 指定自动驾驶仪/传感器的方向并校准车辆的传感器。
* 可选: 校准无线电控制(px4可以使用*QGroundControl*移动地面站桌面上的无线电控制即可飞行。
* 可选: 选择无线电控制的哪些开关应在不同的[飞行模式](../config/flight_mode.md)之间切换系统。

配置&校准说明从侧边栏链接, 或者您可以按照下面的[视频指南](#video-guide)。

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