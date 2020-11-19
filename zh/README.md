<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 徽标" width="180px" /></a></div>

# PX4 Autopilot User Guide ({{ $themeConfig.px4_version }})

[![版本发布](https://img.shields.io/badge/release-master-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![讨论](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4 是一款*专业级飞控*。 它由来自业界和学术界的世界级开发商开发，并得到活跃的全球社区的支持，为从竞速和物流无人机到地面车辆和潜水艇的各种载具提供动力。

> **Tip** 本指南包含了组装、配置和安全驾驶基于 PX4 的飞机所需的一切。

<span></span>

> **Note** 本指南将持续更新！ 尚未涵盖 PX4 的全部。

## 如何开始？

所有用户都应阅读 [入门指南](getting_started/README.md)！ 它概述了 PX4，包括飞行栈（飞行模式和安全功能）和支持的硬件（飞控板、飞机、机架、遥测系统、遥控系统）提供的功能。

根据您想要实现的目标，以下提示将帮助您浏览本指南：

**我已经有了一架飞机，我想让它飞起来：**

如果您有支持 PX4 的到手飞（RTF）的飞行器：

* [基本配置](config/README.md) 解释了如何将固件更新到最新版本，校准主传感器（罗盘、陀螺仪、空速等），以及如何设置遥控器和安全功能。
* [飞行](flying/README.md) 教授飞行要领，包括安全飞行的地点和方式，以及如何调试解锁和飞行问题。 同样提供了关于飞行模式的详细信息。

**我想从头开始组装一架使用 PX4 的飞机：**

> **Tip** 支持的飞行器列举在 [机架参考](airframes/airframe_reference.md)。 下载使用 *QGroundControl*，其中已经有很多测试过和调试好参数的机型。

如果你想自己从头开始组建一架飞机：

* 选择机架 - [Airframe Builds](airframes/README.md) 列举出了支持的机架，并且提供了详细的说明如何组装。
* 选择飞控板 - 请参阅 [入门指南 > 飞控板](getting_started/flight_controller_selection.md)和 [自驾仪硬件](flight_controller/README.md)。
* [装配](assembly/README.md) 解释了如何将重要的外围设备连接到自动驾驶仪上。
* [基本配置](config/README.md) 演示如何更新固件，并使用适合您的机身的设置对其进行配置。 本节还介绍了如何校准主传感器（罗盘、陀螺仪、空速等），并设置遥控器和安全功能。

一旦你准备好驾驶你的飞机，请访问 [飞行](flying/README.md) 部分。

**我正在修改支持的飞机：**

上面介绍了飞行控制器和基本传感器的修改。 为了使用新的传感器，或者如果您所做的更改会显著影响飞行特性：

* [外设硬件](peripherals/README.md) 提供了有关使用外部传感器的其他信息。
* [基本配置](config/README.md) 讲解了如何校准主传感器。
* 请使用 [高级配置](advanced_config/README.md) 对机身进行重新微调。

**我想在新硬件上运行 PX4 并扩展平台：**

* [Development](../development/development.md) explains how to support new airframes and types of vehicles, modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.

## 获取帮助

The[Support](contribute/support.md) page explains how to get help from the core dev team and the wider community.

Among other things it covers:

* [Forums where you can get help](contribute/support.md#forums-and-chat)
* [Diagnosing issues](contribute/support.md#diagnosing-problems)
* [How to report bugs](contribute/support.md#issue-bug-reporting)
* [Weekly dev call](contribute/support.md#weekly-dev-call)

## 报告Bug & 问题

如果您在使用 PX4 时遇到任何问题，请先将其发布在 [支持频道](#forums-and-chat) 上（因为它们可能是由飞机配置引起的）。

也有可能由开发团队指示，让你在 [Github](https://github.com/PX4/PX4-Autopilot/issues) 上提出代码问题。 在可能的情况下，提供问题模板中要求的 [飞行日志](getting_started/flight_reporting.md) 和其他信息。

## 参与贡献

Information on how to contribute to code and documentation can be found in the [Contributing](../contribute/README.md) section:

* [贡献代码](../contribute/README.md)
* [文档撰写](../contribute/docs.md)
* [参与翻译（中文翻译组长微信：253331754，QQ：76006963）](../contribute/translation.md)

## 翻译

本指南中有中文和韩文 [翻译](contribute/docs.md#translation)。 您可以通过单击语言切换器图标来访问这些内容：

![Gitbook 语言选择器](../assets/gitbook/gitbook_language_selector.png)

## 许可证

根据许可 [BSD 3 条款许可证](https://opensource.org/licenses/BSD-3-Clause) 的细则，PX4 代码可自由使用和修改。 本文档可在 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 下进行许可 。 有关详细信息，请参阅：[PX4 开发指南 > 许可证](../contribute/licenses.md)。

## 日历 & 活动

The *Dronecode Calendar* shows important community events for platform users and developers. Select the links below to display the calendar in your timezone (and to add it to your own calendar):

* [Switzerland – Zurich](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
* [太平洋时间 – Tijuana](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
* [Australia – Melbourne/Sydney/Hobart](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

> **Note:** 日历默认为 CET 时间。 <iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no" mark="crwd-mark"></iframe> 

### 图标

此库中使用的以下图标是单独授权的（如下所示）：

<img src="../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /> [www.flaticon.com](https://www.flaticon.com/ "Flaticon") 的 <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> 制作 <em>placeholder</em> 图标由 <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> 授权。

<img src="../assets/site/automatic_mode.svg" title="自动模式" width="30px" /> [www.flaticon.com](https://www.flaticon.com/ "Flaticon") 的 <a href="http://www.freepik.com" title="Freepik">Freepik</a> 制作的 <em>camera-automatic-mode</em> 图标由 <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> 授权。

## 治理

PX4飞行栈由 [Dronecode项目](https://www.dronecode.org/) 治理。

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode 徽标" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux 基金会徽标" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
