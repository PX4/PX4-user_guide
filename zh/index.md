<div style="float:right; padding:10px; margin-right:20px;"><a href="https://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 徽标" width="180px" /></a></div>

# PX4 自动驾驶仪用户指南

[![版本发布](https://img.shields.io/badge/release-main-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![讨论](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](https://discuss.px4.io//) [![Discord](https://discordapp.com/api/guilds/1022170275984457759/widget.png?style=shield)](https://discord.gg/dronecode)

PX4 是一款_专业的自动驾驶仪_。 它由来自业界和学术界的世界级开发商开发，并得到活跃的全球社区的支持，为从竞速和物流无人机到地面车辆和潜水艇的各种载具提供动力。

:::tip
本指南包含了组装、配置和安全驾驶基于 PX4 的飞机所需的一切。 对贡献感兴趣吗 查看[开发](development/development.md)部分。

:::

:::warning
This guide is for the _development_ version of PX4 (`main` branch). Use the **Version** selector to find the current _stable_ version.

Documented changes since the stable release are captured in the evolving [release note](releases/main.md). :::

## 如何开始？

[Basic Concepts](getting_started/px4_basic_concepts.md) should be read by all users! It provides an overview of PX4, including features provided by the flight stack (flight modes and safety features) and the supported hardware (flight controller, vehicle types, telemetry systems, RC control systems).

根据您想要实现的目标，以下提示将帮助您浏览本指南：

### I want a vehicle that works with PX4

In the [Multicopter](frames_multicopter/index.md), [VTOL](frames_vtol/index.md), and [Plane (Fixed-Wing)](frames_plane/index.md) sections you'll find topics like the following (these links are for multicopter):

- [Complete Vehicles](complete_vehicles_mc/index.md) list "Ready to Fly" (RTF) pre-built vehicles
- [Kits](frames_multicopter/kits.md) lists drones that you have to build yourself from a set of preselected parts
- [DIY Builds](frames_multicopter/diy_builds.md) shows some examples of drones that have been built using parts that were sourced individually

Both kits and complete vehicles usually include everything you need except for a battery and RC System. Kits are usually not hard to build, provide a good introduction to how drones fit together, and are relatively inexpensive. We provide generic instructions for assembly, such as [Assembling a Multicopter](assembly/assembly_mc.md), and most kits come with specific instructions too.

If the kits and complete drones aren't quite right for you then you can build a vehicle from scratch, but this requires more knowledge. [Airframe Builds](airframes/index.md) lists the supported frame starting points to give you some idea of what is possible.

Once you have a vehicle that supports PX4 you will need to configure it and calibrate the sensors. Each vehicle type has its own configuration section that explains the main steps, such as [Multicopter Configuration/Tuning](config_mc/index.md).

### I want to add a payload/camera

The [Payloads](payloads/index.md) section describes how to add a camera and how to configure PX4 to enable you to deliver packages.

### I am modifying a supported vehicle

The [Hardware Selection & Setup](hardware/drone_parts.md) section provides both high level and product-specific information about hardware that you might use with PX4 and its configuration. This is the first place you should look if you want to modify a drone and add new components.

### I want to fly

Before you fly you should read [Operations](config/operations.md) to understand how to set up the safety features of your vehicle and the common behaviours of all frame types. Once you've done that you're ready to fly.

Basic instructions for flying each vehicle type are provided in the respective sections, such as [Basic Flying (Multicopter)](flying/basic_flying_mc.md).

### I want to run PX4 on a new Flight Controller and extend the platform

The [Development](development/development.md) section explains how to support new airframes and types of vehicles, modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.

## 获取帮助

[帮助](contribute/support.md)页面介绍了如何从核心开发团队和更广泛的社区获取帮助。

除此以外，它还包括了：

- [您可以得到帮助的论坛](contribute/support.md#forums-and-chat)
- [问题诊断](contribute/support.md#diagnosing-problems)
- [如何报告错误（bugs）](contribute/support.md#issue-bug-reporting)
- [每周开发通讯](contribute/support.md#weekly-dev-call)

## 报告Bug & 问题

如果您在使用PX4的过程中遇到任何问题，请先将他们发布到[支持论坛](contribute/support.md#forums-and-chat)上（即使他们可能是飞行器配置问题导致的）

如果代码的问题得到了开发团队的指导，这个问题可能会被上传到[Github here](https://github.com/PX4/PX4-Autopilot/issues)。 如果可能，请提供问题模板中所要求的[飞行日志](getting_started/flight_reporting.md)和其他信息。

## 参与贡献

有关如何贡献代码和文档的信息可以在[贡献](contribute/README.md)部分中找到：

- [代码](contribute/index.md)
- [文档](contribute/docs.md)
- [翻译](contribute/translation.md)

## 翻译

本指南有多版本的[翻译](contribute/translation.md)。 您可以从语言菜单中访问到它们（右上角）：

![选择语言](../assets/vuepress/language_selector.png)

<!--@include: _contributors.md-->

## 许可证

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). 文档在[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)中获得许可。 更多信息请参见：[许可证](contribute/licenses.md)。

## 日历 & 活动

The _Dronecode Calendar_ shows important community events for platform users and developers. 选择以下链接将其显示在您所在的时区日历中(并将其添加到您自己的日历中)：

- [瑞士 - 苏黎世州](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
- [太平洋时间—蒂华纳](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
- [澳大利亚 - 墨尔本/悉尼/霍巴特](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
The calendar default timezone is Central European Time (CET).

:::

<iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

### 图标

此库中使用的以下图标是单独授权的（如下所示）：

<img src="../assets/site/position_fixed.svg" title="需要定位（例如 GPS ）" width="30px" /> _placeholder_ icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="自动模式" width="30px" /> _camera-automatic-mode_ icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## 治理

PX4飞行控制栈由 [Dronecode项目](https://www.dronecode.org/) 治理。

<a href="https://www.dronecode.org/" style="padding:20px" ><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode 徽标" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux 基金会徽标" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
