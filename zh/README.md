<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 徽标" width="180px" /></a></div>

# PX4 Autopilot User Guide ({{ $themeConfig.px4_version }})

[![版本发布](https://img.shields.io/badge/release-master-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![讨论](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4 是一款*专业级飞控*。 它由来自业界和学术界的世界级开发商开发，并得到活跃的全球社区的支持，为从竞速和物流无人机到地面车辆和潜水艇的各种载具提供动力。

:::tip
本指南包含了组装、配置和安全驾驶基于 PX4 的飞机所需的一切。
:::

:::note
本指南将持续更新！ 尚未涵盖 PX4 的全部。
:::

## 如何开始？

所有用户都应阅读 [入门指南](getting_started/README.md)！ 它概述了 PX4，包括飞行栈提供的功能（飞行模式和安全功能）和支持的硬件（飞控板、飞机、机架、遥测系统、遥控系统）。

根据您想要实现的目标，以下提示将帮助您浏览本指南：

**我已经有了一架飞机，我想让它飞起来：**

如果您有支持 PX4 的到手飞（RTF）的飞行器：

* [基本配置](config/README.md) 解释了如何将固件更新到最新版本，校准主传感器（罗盘、陀螺仪、空速等），以及如何设置遥控器和安全功能。
* [飞行](flying/README.md) 教授飞行要领，包括安全飞行的地点和方式，以及如何调试解锁和飞行问题。 同样提供了关于飞行模式的详细信息。

**我想从头开始组装一架使用 PX4 的飞机：**

:::tip
支持的飞行器列举在 [机架参考](airframes/airframe_reference.md)。 其中已经有很多测试过和调试好参数的机型，可以使用 *QGroundControl*下载这些参数，。
:::

如果你想自己从头开始组建一架飞机：

* 选择机架 - [Airframe Builds](airframes/README.md) 列举出了支持的机架，并且提供了详细的说明如何组装。
* 选择飞控板 - 请参阅 [入门指南 > 飞控板](getting_started/flight_controller_selection.md)和 [自驾仪硬件](flight_controller/README.md)。
* [装配](assembly/README.md) 解释了如何将重要的外围设备连接到自动驾驶仪上。
* [基本配置](config/README.md) 演示如何更新固件，并使用适合您的机身的设置对其进行配置。 本节还介绍了如何校准主传感器（罗盘、陀螺仪、空速等），并设置遥控器和安全功能。

一旦你准备好驾驶你的飞机，请访问 [飞行](flying/README.md) 部分。

**我想修改支持的飞机：**

上面介绍了飞行控制器和基本传感器的修改。 为了使用新的传感器，或者如果您所做的更改会显著影响飞行特性：

* [外设硬件](peripherals/README.md) 提供了有关使用外部传感器的其他信息。
* [基本配置](config/README.md) 讲解了如何校准主传感器。
* 请使用 [高级配置](advanced_config/README.md) 对机身进行重新微调。

**我想在新硬件上运行 PX4 并扩展平台：**

* [开发指南](development/development.md) 解释了如何支持新的机架、机型，修改飞行算法、添加新模式、集成新硬件、从飞行控制器外部与 PX4 通信，以及如何为 PX4 做出贡献。

## 获取帮助

[支持](contribute/support.md) 页面解释了如何从核心开发团队和更广泛的社区获得帮助。

Among other things it covers:

* [Forums where you can get help](contribute/support.md#forums-and-chat)
* [Diagnosing issues](contribute/support.md#diagnosing-problems)
* [How to report bugs](contribute/support.md#issue-bug-reporting)
* [Weekly dev call](contribute/support.md#weekly-dev-call)

## 报告Bug & 问题

如果您在使用 PX4 时遇到任何问题，请先将其发布在 [支持频道](contribute/support.md#forums-and-chat) 上（因为它们可能是由飞机配置引起的）。

如果是由开发团队转过来的问题，可在[Github here](https://github.com/PX4/PX4-Autopilot/issues) 寻找。 在可能的情况下，提供问题模板中要求的 [飞行日志](getting_started/flight_reporting.md) 和其他信息。

## 参与贡献

如何贡献代码和文档的信息可以在 [贡献](contribute/README.md) 部分中找到：

* [贡献代码](contribute/README.md)
* [文档撰写](contribute/docs.md)
* [参与翻译（中文翻译组长微信：253331754，QQ：76006963）](contribute/translation.md)

## 翻译

本指南有多种语言 [翻译](contribute/translation.md)。 您可以从语言菜单中访问这些(右上角)：

![Language Selector](../assets/vuepress/language_selector.png)

## 许可证

根据许可 [BSD 3 条款许可证](https://opensource.org/licenses/BSD-3-Clause) 的细则，PX4 代码可自由使用和修改。 本文档可在 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 下进行许可 。 更多信息请参见：[许可证](contribute/licenses.md)。

## 日历 & 活动

*Dronecode 日历* 显示了平台用户和开发者的重要社区事件。 选择下面的链接以在显示您时区的日历(并将其添加到您自己的日历中)：

* [瑞士 - 苏黎世州](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
* [太平洋时间——蒂华纳](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
* [澳大利亚 - 墨尔本/悉尼/霍巴特](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
日历默认为CET。 ::: <iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no" mark="crwd-mark"></iframe> 

### 图标

此库中使用的以下图标是单独授权的（如下所示）：

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> [www.flaticon.com](https://www.flaticon.com/ "Flaticon") 的 <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> 制作 <em>placeholder</em> 图标由 <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> 授权。

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> [www.flaticon.com](https://www.flaticon.com/ "Flaticon") 的 <a href="http://www.freepik.com" title="Freepik">Freepik</a> 制作的 <em>camera-automatic-mode</em> 图标由 <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> 授权。

## 治理

PX4飞行栈受[Dronecode项目](https://www.dronecode.org/)管理。

<a href="https://www.dronecode.org/" style="padding:20px" ><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
