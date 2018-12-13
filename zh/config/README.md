# 基本配置

本节包含 *必要* 配置主题，包括如何在飞行控制器硬件上安装固件、选择机身以及配置PX4需要在每架飞机上存在的核心传感器（指南针、GPS、陀螺仪等）。

该配置过程需要运行QGroundConrol，包括如下主要步骤：

* 选择自驾仪已经装配的机架（固定翼、多旋翼、垂直起降等）。
* 指定自动驾驶仪/传感器的方向并校准飞机的传感器。
* 可选: 校准无线电控制(px4可以使用*QGroundControl*移动地面站桌面上的无线电控制即可飞行。
* 可选: 选择无线电控制的哪些开关应在不同的[飞行模式](../config/flight_mode.md)之间切换系统。

配置&校准说明从侧边栏链接, 或者您可以按照下面的[视频指南](#video-guide)。

> **Tip**在开始本部分之前, 您应该[下载QGroundControl](http://qgroundcontrol.com/downloads/)并将其安装在**桌面**计算机上 (*QGroundControl* 不支持移动平台上的飞机配置)。

<span></span>

> **Note**对于[支持的机架](../config/airframe.md)只需要这种基本配置。 如果要创建新的机架,还需要执行调整 (请参阅[高级配置](../advanced_config/README.md))。

## 视频教程

下面的视频详细介绍了校准过程。

{% youtube %} https://www.youtube.com/watch?v=91VGmdSlbo4 {% endyoutube %}

## Support

如果您需要有关配置的帮助, 您可以在[QGroundControl支持论坛](http://discuss.px4.io/c/qgroundcontrol/qgroundcontrol-usage)上寻求帮助。

## 更多信息：

* [QGroundControl配置许可证](https://docs.qgroundcontrol.com/en/SetupView/SetupView.html)
* [高级配置](../advanced_config/README.md)(更高级的话题，关于小众传感器和外设的使用以及飞机调试)