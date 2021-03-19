<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 로고" width="180px" /></a></div>

# PX4 자율 비행 프로그램 안내서 ({{ $themeConfig.px4_version }})

[![배포](https://img.shields.io/badge/release-master-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![토론](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![슬랙](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4는 *자율비행* 프로그램입니다. 세계적인 수준의 개발자들이 산업계와 학계에서 참여하여 개발하였으며, 여러 나라에서 활동중인 단체들의 지원을 받을 수 있습니다. 레이싱 드론, 운송용 드론, 자동차와 선박등의 다양한 운송체에 적용할 수 있습니다.

:::tip
이 안내서에는 PX4를 이용한 기체 조립, 설정 및 비행법에 관한 내용이 기술되어 있습니다. Interested in contributing? Check out the [Development](development/development.md) section.
:::

## 시작하기

[시작하기](getting_started/README.md)편을 먼저 읽으실 것을 추천드립니다. 비행 스택(비행 모드 및 안전 기능)과 지원 하드웨어(비행 제어장치, 기체, 기체 프레임, 텔레메트리 시스템, 원격 조종 제어 시스템)와 더불어 PX4의 전반적인 내용을 알려드립니다.

목적에 따라, 아래의 팁은 이 안내서를 보실 때 많은 도움이 될 수 있습니다.

**가지고 있는 드론을 날리고 싶을 경우**

PX4를 지원하는 기체가 준비되어 있는 경우:

* [기본 설정](config/README.md)편에서는 펌웨어를 최신 버전으로 업데이트하고, 기본 센서(나침반, 자이로/IMU, 대기 속도 등)를 캘리브레이션하고 원격 제어 및 안전 기능을 설정하는 방법에 대해 설명합니다. 
* [비행](flying/README.md)편은 안전하게 비행할 수 있는 방법과 장소, 그리고 시동 방법 및 비행 관련 문제 해결 방법 등에 대하여 설명합니다. 또한 비행 모드에 대한 자세한 정보를 제공합니다.

**처음부터 PX4로 무인 항공기를 만드는 경우**

:::tip
"지원" 기체의 목록은 [기체 프레임 정의서](airframes/airframe_reference.md)에 기술되어 있습니다. 이 목록의 기체들은 *QGroundControl*에서 시험을 마쳤으며 각 기체에 적합하게 튜닝되어 있습니다.
:::

처음부터 기체를 제작하려면

* 기체 선택하기 - [기체 제작](airframes/README.md)에서는 지원 기체 목록이 있으며, 기체 조립법을 자세하게 설명합니다. 
* 비행 컨트롤러 선택 - [시작하기 > 비행 컨트롤러](getting_started/flight_controller_selection.md)와 [자동 항법 장치 하드웨어](flight_controller/README.md)를 살펴보십시오.
* [조립](assembly/README.md)은 중요한 주변 장치를 자동 항법 장치에 연결하는 방법을 설명합니다.
* [기초 설정](config/README.md)은 펌웨어 업데이트 방법과 기체에 적합한 펌웨어 설정법을 설명합니다. 주요 센서(나침반, 자이로/IMU, 항속센서 등)를 보정법과 원격 조종법 및 안전 기능 설정 방법을 설명합니다.

기체를 날릴 준비가 되었다면 [비행](flying/README.md)편으로 넘어가십시오.

**페이로드 또는 카메라를 추가하는 경우**

페이로드 섹션에서는 카메라를 추가하는 방법 또는 패키지를 제공 할 수 있도록 PX4를 설정하는 방법을 설명합니다.

* [페이로드](payloads/README.md)에서는 페이로드를 통합하는 방법을 설명합니다.

**기체를 변경하는 경우**

비행 컨트롤러 및 기본 센서 수정은 위 항목에서 다룹니다. 새로운 센서를 추가하거나 중요한 비행 설정을 변경하는 경우

* [주변 장치](peripherals/README.md)에서는 외부 센서 사용에 대한 추가 정보를 제공합니다.
* [기본 설정](config/README.md)에서는 주요 센서를 보정법을 설명합니다.
* [고급 설정](advanced_config/README.md)에서는 기체의 재설정 및 튜닝 방법을 설명합니다.

**새 하드웨어에서 PX4를 실행하고 플랫폼을 확장하는 경우**

* [개발](development/development.md)에서는 신규 기체 사용 방법, 비행 알고리즘 수정, 신규 모드 추가, 신규 하드웨어 통합 및 비행 컨트롤러 외부에서 PX4와 통신하는 방법을 설명합니다.

## 도움 받기

[지원](contribute/support.md)페이지는 코어 개발 팀과 더 넓은 커뮤니티로부터 도움을 받는법에 대해 설명합니다.

특히 다음 내용을 다룹니다:

* [도움을 받을 수 있는 포럼 목록](contribute/support.md#forums-and-chat)
* [문제 진단](contribute/support.md#diagnosing-problems)
* [버그 보고 방법](contribute/support.md#issue-bug-reporting)
* [주간 온라인 개발자 회의](contribute/support.md#weekly-dev-call)

## 버그 및 문제점 보고

PX4 사용에 문제를 겪었다면, 먼저 [지원 포럼](contribute/support.md#forums-and-chat)에 내용을 게시하십시오 (기체 설정때문에 문제가 발생할 수 있음).

개발팀의 요청에 따라, [Github](https://github.com/PX4/PX4-Autopilot/issues)에 코드 문제(Code issue)를 제기할 수 있습니다. 가능한 경우 문제 양식(Issue template)에 [비행 기록](getting_started/flight_reporting.md)과 기타 정보를 제공해 주십시오.

## 기여하기

코드와 문서에 기여하는 방법은 [기여](contribute/README.md)편에서 찾을 수 있습니다.

* [코드](contribute/README.md)
* [문서](contribute/docs.md)
* [번역](contribute/translation.md)

## 번역

이 안내서의 다양한 [번역](contribute/translation.md)본이 있습니다. (우측 상단의) 언어 메뉴에서 원하시는 번역본을 선택할 수 있습니다:

![Language Selector](../assets/vuepress/language_selector.png)

## 라이센스

PX4 코드는 [BSD 3-clause 라이선스](https://opensource.org/licenses/BSD-3-Clause)에 따라 자유롭게 사용하고 수정할 수 있습니다. This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). For more information see: [Licences](contribute/licenses.md).

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
