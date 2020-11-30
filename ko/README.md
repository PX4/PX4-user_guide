<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 로고" width="180px" /></a></div>

# PX4 자동 항법 장치 사용자 안내서 ({{ $themeConfig.px4_version }})

[![릴리즈](https://img.shields.io/badge/release-master-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![논의](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![슬랙](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4는 *전문 자동 항법 장치*입니다. 산업계 및 학계의 세계적 수준의 개발자가 개발하고, 활발하게 활동 중인 전세계 커뮤니티에서 지원하며, 경주, 화물 드론에서부터 지상 차량과 잠수정에 이르기까지 모든 종류의 기기에 적용합니다.

:::tip
이 안내서에서는 PX4 기반 기체의 조립, 설정, 안전 비행에 필요한 모든 내용이 들어있습니다.
:::

:::tip
Note This guide is still a work in progress! It does not yet cover all of PX4.
:::

## 어떻게 시작하나요?

[Getting Started](getting_started/README.md) should be read by all users! It provides an overview of PX4, including features provided by the flight stack (flight modes and safety features) and the supported hardware (flight controller, vehicles, airframes, telemetry systems, RC control systems).

Depending on what you want to achieve, the following tips will help you navigate through this guide:

**I already have a drone and I just want to fly:**

If you have a Ready To Fly (RTF) vehicle that supports PX4:

* [기본 설정](config/README.md)에서는 펌웨어를 최신 버전으로 업데이트하고, 기본 센서(나침반, 자이로/IMU, 대기 속도 등)를 캘리브레이션하고 원격 제어 및 안전 기능을 설정하는 방법에 대해 설명합니다.
* [비행하기](flying/README.md)는 안전하게 비행할 수 있는 방법과 장소, 그리고 아밍 및 비행 문제를 해결하는 방법을 포함한 비행 요소들에 대해 설명합니다. 또한 비행 모드에 대한 자세한 정보를 제공합니다.

**I want to build a drone with PX4 from scratch:**

:::tip
The "supported" vehicles are listed in the [Airframes Reference](airframes/airframe_reference.md). These are vehicles that have tested and tuned configurations that you can download using *QGroundControl*.
:::

If you want to build a vehicle from scratch:

* 프레임 선택하기 - [기체 프레임 제작](airframes/README.md)에서는 지원 프레임 목록이 있으며, 기체 하위 분류 항목을 구성하는 자세한 방법을 설명합니다.
* 비행 제어장치 선택 - [시작하기 > 비행 제어 장치](getting_started/flight_controller_selection.md)와 [자동 항법 장치 하드웨어](flight_controller/README.md)를 살펴보십시오.
* [조립](assembly/README.md)은 중요한 주변 장치를 자동 항법 장치에 연결하는 방법을 설명합니다.
* [기초 설정](config/README.md)은 펌웨어를 업데이트하고 기체 프레임에 적합한 설정으로 펌웨어를 구성하는 방법을 보여줍니다. 또한 이 절에서는 주요 센서(나침반, 자이로/IMU, 항속 등)를 보정하고 원격 조종 장치 및 안전 기능을 설정하는 방법도 설명합니다.

Once you are ready to fly your vehicle, visit the [Flying](flying/README.md) section.

**I am modifying a supported vehicle:**

Modifications of the flight controller and basic sensors are covered above. In order to use new sensors, or if you have made changes that significantly affect flight characteristics:

* [주변 장치 하드웨어](peripherals/README.md)에서는 외부 센서 사용에 대한 추가 정보를 제공합니다.
* [기본 설정](config/README.md)에서는 주요 센서를 보정하는 방법을 설명합니다.
* [고급 설정](advanced_config/README.md)에서는 기체의 재설정 및 미세 조정 내용을 설명합니다.

**I want to run PX4 on new hardware and extend the platform:**

* [개발](development/development.md)에서는 새 기체, 비행 알고리즘 수정, 새 모드 추가, 새 하드웨어 통합, 비행 컨트롤러 외부와 PX4간의 통신 및 PX4에 기여하는 방법에 대해 설명합니다.

## 도움 받기

The [Support](contribute/support.md) page explains how to get help from the core dev team and the wider community.

Among other things it covers:

* [도움을 받을 수 있는 포럼들](contribute/support.md#forums-and-chat)
* [문제 진단](contribute/support.md#diagnosing-problems)
* [버그 리포팅 방법](contribute/support.md#issue-bug-reporting)
* [주간 개발 미팅](contribute/support.md#weekly-dev-call)

## 버그 및 문제점 보고

If you have any problems using PX4 first post them on the [support forums](contribute/support.md#forums-and-chat) (as they may be caused by vehicle configuration).

If directed by the development team, code issues may be raised on [Github here](https://github.com/PX4/PX4-Autopilot/issues). Where possible provide [flight logs](getting_started/flight_reporting.md) and other information requested in the issue template.

## 기여하기

Information on how to contribute to code and documentation can be found in the [Contributing](contribute/README.md) section:

* [코드](contribute/README.md)
* [문서](contribute/docs.md)
* [번역](contribute/translation.md)

## 번역

There are several [translations](contribute/translation.md) of this guide. You can access these from the Languages menu (top right):

![Language Selector](../assets/vuepress/language_selector.png)

## 라이센스

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). For more information see: [Licences](contribute/licenses.md).

## 달력과 행사

The *Dronecode Calendar* shows important community events for platform users and developers. Select the links below to display the calendar in your timezone (and to add it to your own calendar):

* [스위스 – 취리히](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
* [태평양 시간대 – 티후아나](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
* [오스트레일리아 – 멜버른/시드니/호바트](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
Calendar defaults to CET. ::: <iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no" mark="crwd-mark"></iframe> 

### 아이콘

The following icons used in this library are licensed separately (as shown below):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> *placeholder* icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> *camera-automatic-mode* icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## 운영 방식

The PX4 flight stack is hosted under the governance of the [Dronecode Project](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
