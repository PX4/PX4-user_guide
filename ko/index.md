<div style="float:right; padding:10px; margin-right:20px;"><a href="https://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 로고" width="180px" /></a></div>

# PX4 Autopilot User Guide

[![배포](https://img.shields.io/badge/release-main-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![토론](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](https://discuss.px4.io//) [![Discord](https://discordapp.com/api/guilds/1022170275984457759/widget.png?style=shield)](https://discord.gg/dronecode)

PX4 is the _Professional Autopilot_. 세계적인 수준의 개발자들이 산업계와 학계에서 참여하여 개발하였으며, 세계 각국에서 활동중인 여러 단체들의 지원을 받을 수 있습니다. PX4는 레이싱 드론, 운송용 드론, 자동차와 선박 등의 다양한 운송체에 적용하여 사용할 수 있습니다.

:::tip
이 안내서는 PX4를 이용한 기체조립 방법, 설정 방법 및 비행 방법에 대하여 설명합니다. 이 프로젝트에 기여하시려면,  [개발](development/development.md)편을 참고하여 주십시오.

:::

:::warning
This guide is for the _development_ version of PX4 (`main` branch). Use the **Version** selector to find the current _stable_ version.

Documented changes since the stable release are captured in the evolving [release note](releases/main.md). :::

## 시작하기

[Basic Concepts](getting_started/px4_basic_concepts.md) should be read by all users! It provides an overview of PX4, including features provided by the flight stack (flight modes and safety features) and the supported hardware (flight controller, vehicle types, telemetry systems, RC control systems).

이 안내서를 위한 팁들은 아래과 같습니다.

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

## 도움 받기

[지원](contribute/support.md) 페이지에서는 핵심 개발 팀과 커뮤니티에서 도움 받는 방법을 설명합니다.

다음과 같은 내용을 다룹니다.

- [도움을 받을 수 있는 포럼 목록](contribute/support.md#forums-and-chat)
- [문제 진단](contribute/support.md#diagnosing-problems)
- [버그 보고 방법](contribute/support.md#issue-bug-reporting)
- [주간 온라인 개발 회의](contribute/support.md#weekly-dev-call)

## 버그 및 문제점 보고

PX4 사용에 문제가 있으시면, 먼저 [지원 포럼](contribute/support.md#forums-and-chat)에 내용을 올려주십시오.

개발팀의 지침에 따라, [Github](https://github.com/PX4/PX4-Autopilot/issues)에 코드 이슈를 제기할 수 있습니다. 가능하면, 문제 양식에 맞추어 [비행 기록](getting_started/flight_reporting.md)과 기타 정보를 제공하여 주십시오.

## 기여

코드와 문서에 기여하는 방법은 [기여](contribute/README.md)편을 참고하십시오.

- [코드](contribute/index.md)
- [문서](contribute/docs.md)
- [번역](contribute/translation.md)

## 번역

이 안내서에는 다양한 [번역](contribute/translation.md)본이 있습니다. 우상단의 언어 메뉴에서 원하시는 번역본을 선택할 수 있습니다:

![언어 선택](../assets/vuepress/language_selector.png)

<!--@include: _contributors.md-->

## 라이센스

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). 이 문서는 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 라이센스를 준수합니다. 자세한 정보는 [라이센스](contribute/licenses.md)를 참고하십시오.

## 중요 행사 및 일정

The _Dronecode Calendar_ shows important community events for platform users and developers. 사용자의 시간대와 맞는 달력을 보려면 아래 링크를 선택하십시오. 사용자 달력에 추가할 수 있습니다.

- [스위스 – 취리히](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
- [태평양 시간대 – 티후아나](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
- [오스트레일리아 – 멜버른/시드니/호바트](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
The calendar default timezone is Central European Time (CET).

:::

<iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

### 아이콘

이 라이브러리에서 사용하는 다음 아이콘들은 별도의 라이센스를 적용합니다. 아래 그림을 참고하십시오.

<img src="../assets/site/position_fixed.svg" title="요청된 위치 고정(예, GPS)" width="30px" /> _placeholder_ icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="자동 모드" width="30px" /> _camera-automatic-mode_ icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## 운영 방법

PX4는 [Dronecode 프로젝트](https://www.dronecode.org/) 주관으로 운영 관리됩니다.

<a href="https://www.dronecode.org/" style="padding:20px" ><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode 로고" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="리눅스 재단 로고" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
