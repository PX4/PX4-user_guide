<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 Logo" width="180px" /></a></div>

# PX4 自动驾驶仪使用手册

[![Releases](https://img.shields.io/github/release/PX4/Firmware.svg)](https://github.com/PX4/Firmware/releases) [![Discuss](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

Px4是*专业飞控*. 它由来自业界和学术界的世界级开发商开发, 并得到活跃的全球社区的支持, 为从赛车和货运无人机到地面车辆和潜水器的各种车辆提供动力。

> **Tip**本指南包含了组装、配置和安全驾驶基于px4的车辆所需的一切。

<span></span>

> **Note**本指南将持续更新! 尚未涵盖所有的px4。

## 如何开始？

所有用户都应阅读[Getting开始](getting_started/README.md)! 它概述了px4,包括飞行堆栈(飞行模式和安全功能)和支持的硬件(飞行控制器、车辆、机身、遥测系统、远程遥控系统)提供的功能。

根据您想要实现的需求, 以下提示将帮助您浏览本指南:

**我已经有了一架飞机, 我只想飞:**

如果您有支持px4的一切就绪的飞行器(rtf):

- [Basic配置](config/README.md)解释了如何将固件更新到最新版本, 校准主传感器(罗盘、陀螺仪、空速等), 以及如何设置遥控器和安全功能.
- [Flying](flying/README.md)教授飞行要领, 包括安全飞行的地点和方式, 以及如何调试武装和飞行问题。 同样提供了关于飞行模式的详细信息。

**我想从头开始组建一架飞机：**

> **Tip**支持的飞行器列举在[机身参考](airframes/airframe_reference.md). These are vehicles that have tested and tuned configurations that you can download using *QGroundControl*.

If you want to build a vehicle from scratch:

- Choose a frame - [Airframe Builds](airframes/README.md) lists the supported frames and provides detailed instructions for how to construct a subset of vehicles.
- Choose a flight controller - see [Getting Started > Flight Controllers](getting_started/flight_controller_selection.md) and [Autopilot Hardware](flight_controller/README.md).
- [Assembly](assembly/README.md) explains how to wire up the important peripherals to your autopilot.
- [Basic Configuration](config/README.md) shows how to update your firmware and configure it with settings appropriate for your airframe. This section also explains how to calibrate the main sensors (compass, gyro/IMU, airspeed etc.), and setup your remote control and safety features.

Once you are ready to fly your vehicle, visit the [Flying](flying/README.md) section.

**I am modifying a supported vehicle:**

Modifications of the flight controller and basic sensors are covered above. In order to use new sensors, or if you have made changes that significantly affect flight characteristics:

- [Peripheral Hardware](peripherals/README.md) provides additional information about using external sensors.
- [Basic Configuration](config/README.md) explains how to calibrate the main sensors.
- [Advanced Configuration](advanced_config/README.md) should be used to re/fine-tune the airframe.

**I want to run PX4 on new hardware and extend the platform:**

- [PX4 Developer Guide](http://dev.px4.io/) explains how to modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.

## 论坛和交流 {#support}

The core development team and community are active on the following forums and chat channels:

- [PX4 Discuss](http://discuss.px4.io/) (*recommended*)
- [Slack](http://slack.px4.io) (sign up)

## Reporting Bugs & Issues

If you have any problems using PX4 first post them on the [support channels above](#support) (as they may be caused by vehicle configuration).

If directed by the development team, code issues may be raised on [Github here](https://github.com/PX4/Firmware/issues). Where possible provide [flight logs](getting_started/flight_reporting.md) and other information requested in the issue template.

## Contributing

Information on how to contribute to code and documentation can be found in the Developer Guide:

- [Code](https://dev.px4.io/en/contribute/)
- [Documentation](https://dev.px4.io/en/contribute/docs.html)
- [Translation](https://dev.px4.io/en/contribute/docs.html)

## License

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). For more information see: [PX4 Development Guide > Licences](https://dev.px4.io/en/contribute/licenses.html).

### Icons

The following icons used in this library are licensed separately (as shown below):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> *placeholder* icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> *camera-automatic-mode* icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## Governance

The PX4 flight stack is hosted under the governance of the [Dronecode Project](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
