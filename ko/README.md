<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 로고" width="180px" /></a></div>

# PX4 자율 비행 프로그램 안내서 ({{ $themeConfig.px4_version }})

[![배포](https://img.shields.io/badge/release-master-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![토론](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![슬랙](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4는 *자율비행* 프로그램입니다. 세계적인 수준의 개발자들이 산업계와 학계에서 참여하여 개발하였으며, 여러 나라에서 활동중인 단체들의 지원을 받을 수 있습니다. 레이싱 드론, 운송용 드론, 자동차와 선박등의 다양한 운송체에 적용할 수 있습니다.

:::tip
이 안내서에는 PX4를 이용한 기체 조립, 설정 및 비행법에 관한 내용이 기술되어 있습니다. Interested in contributing? Check out the [Development](development/development.md) section.
:::

## 시작하기

[Getting Started](getting_started/README.md) should be read by all users! It provides an overview of PX4, including features provided by the flight stack (flight modes and safety features) and the supported hardware (flight controller, vehicles, airframes, telemetry systems, RC control systems).

Depending on what you want to achieve, the following tips will help you navigate through this guide:

**I already have a drone and I just want to fly:**

If you have a Ready To Fly (RTF) vehicle that supports PX4:

* [기본 설정](config/README.md)에서는 펌웨어를 최신 버전으로 업데이트하고, 기본 센서(나침반, 자이로/IMU, 대기 속도 등)를 캘리브레이션하고 원격 제어 및 안전 기능을 설정하는 방법에 대해 설명합니다. 
* [비행](flying/README.md)편은 안전하게 비행할 수 있는 방법과 장소, 그리고 시동 방법 및 비행 관련 문제 해결 방법 등에 대하여 설명합니다. 또한 비행 모드에 대한 자세한 정보를 제공합니다.

**I want to build a drone with PX4 from scratch:**

:::tip
The "supported" vehicles are listed in the [Airframes Reference](airframes/airframe_reference.md). These are vehicles that have tested and tuned configurations that you can download using *QGroundControl*.
:::

If you want to build a vehicle from scratch:

* 기체 선택하기 - [기체 제작](airframes/README.md)에서는 지원 기체 목록이 있으며, 기체 조립법을 자세하게 설명합니다.
* 비행 컨트롤러 선택 - [시작하기 > 비행 컨트롤러](getting_started/flight_controller_selection.md)와 [자동 항법 장치 하드웨어](flight_controller/README.md)를 살펴보십시오.
* [조립](assembly/README.md)은 중요한 주변 장치를 자동 항법 장치에 연결하는 방법을 설명합니다.
* [기초 설정](config/README.md)은 펌웨어 업데이트 방법과 기체에 적합한 펌웨어 설정법을 설명합니다. 주요 센서(나침반, 자이로/IMU, 항속센서 등)를 보정법과 원격 조종법 및 안전 기능 설정 방법을 설명합니다.

Once you are ready to fly your vehicle, visit the [Flying](flying/README.md) section.

**I want to add payload or a camera:**

The payloads section describes how to add a camera or how to configure PX4 to enable you to deliver packages.

* [Payloads](payloads/README.md) describes how to integrate payloads

**I am modifying a supported vehicle:**

Modifications of the flight controller and basic sensors are covered above. In order to use new sensors, or if you have made changes that significantly affect flight characteristics:

* [Peripheral Hardware](peripherals/README.md) provides additional information about using external sensors.
* [Basic Configuration](config/README.md) explains how to calibrate the main sensors.
* [Advanced Configuration](advanced_config/README.md) should be used to re/fine-tune the airframe.

**I want to run PX4 on new hardware and extend the platform:**

* [Development](development/development.md) explains how to support new airframes and types of vehicles, modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.

## 도움 받기

The [Support](contribute/support.md) page explains how to get help from the core dev team and the wider community.

Among other things it covers:

* [Forums where you can get help](contribute/support.md#forums-and-chat)
* [Diagnosing issues](contribute/support.md#diagnosing-problems)
* [How to report bugs](contribute/support.md#issue-bug-reporting)
* [Weekly dev call](contribute/support.md#weekly-dev-call)

## 버그 및 문제점 보고

If you have any problems using PX4 first post them on the [support forums](contribute/support.md#forums-and-chat) (as they may be caused by vehicle configuration).

If directed by the development team, code issues may be raised on [Github here](https://github.com/PX4/PX4-Autopilot/issues). Where possible provide [flight logs](getting_started/flight_reporting.md) and other information requested in the issue template.

## 기여하기

Information on how to contribute to code and documentation can be found in the [Contributing](contribute/README.md) section:

* [Code](contribute/README.md)
* [Documentation](contribute/docs.md)
* [Translation](contribute/translation.md)

## 번역

There are several [translations](contribute/translation.md) of this guide. You can access these from the Languages menu (top right):

![Language Selector](../assets/vuepress/language_selector.png)

## 라이센스

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). For more information see: [Licences](contribute/licenses.md).

## 주요 행사 및 일정

The *Dronecode Calendar* shows important community events for platform users and developers. Select the links below to display the calendar in your timezone (and to add it to your own calendar):

* [Switzerland – Zurich](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
* [Pacific Time – Tijuana](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
* [Australia – Melbourne/Sydney/Hobart](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
Calendar defaults to CET. ::: <iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no" mark="crwd-mark"></iframe> 

### 아이콘

The following icons used in this library are licensed separately (as shown below):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> *placeholder* icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> *camera-automatic-mode* icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## 운영 방식

The PX4 flight stack is hosted under the governance of the [Dronecode Project](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px" ><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
