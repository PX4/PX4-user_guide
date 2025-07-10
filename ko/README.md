---
canonicalUrl: https://docs.px4.io/main/ko/README
---

<div style="float:right; padding:10px; margin-right:20px;"><a href="https://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 로고" width="180px" /></a></div>

# PX4 자율 비행 프로그램 안내서 ({{ $themeConfig.px4_version }})

[![배포](https://img.shields.io/badge/release-master-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![토론](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](https://discuss.px4.io//) [![슬랙](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4는 *전문적인 자율비행 프로그램* 입니다. 세계적인 수준의 개발자들이 산업계와 학계에서 참여하여 개발하였으며, 여러 나라에서 활동중인 단체의 지원을 받을 수 있습니다. 레이싱 드론, 운송용 드론, 자동차와 선박 등의 다양한 운송체에 적용할 수 있습니다.

:::tip
이 안내서는 PX4를 이용한 기체 조립, 설정과 비행 방법 등을 설명합니다. 기여하는 방법은 [개발](development/development.md)편을 참고하여 주십시오.
:::

## 시작하기

[시작](getting_started/README.md)편을 먼저 읽으실 것을 추천합니다. 비행 스택(비행 모드 및 안전 기능)과 지원 하드웨어(비행 제어장치, 기체, 기체 프레임, 텔레메트리 시스템, 원격 조종 제어 시스템)와 더불어 PX4의 전반적인 내용을 설명합니다.

이 안내서를 위한 팁들은 아래과 같습니다.

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

[지원](contribute/support.md) 페이지는 코어 개발 팀과 더 넓은 커뮤니티로부터 도움을 받는법에 대해 설명합니다.

다음과 같은 내용을 다루고 있습니다.

* [도움을 받을 수 있는 포럼 목록](contribute/support.md#forums-and-chat)
* [문제 진단](contribute/support.md#diagnosing-problems)
* [버그 보고 방법](contribute/support.md#issue-bug-reporting)
* [주간 온라인 개발자 회의](contribute/support.md#weekly-dev-call)

## 버그 및 문제점 보고

PX4 사용에 문제를 겪었다면, 먼저 [지원 포럼](contribute/support.md#forums-and-chat)에 내용을 올려주십시오.

개발팀의 지침에 따라, [Github](https://github.com/PX4/PX4-Autopilot/issues)에 코드 이슈를 제기할 수 있습니다. 가능한 경우 문제 양식(Issue template)에 [비행 기록](getting_started/flight_reporting.md)과 기타 정보를 제공해 주십시오.

## 기여 

코드와 문서에 기여하는 방법은 [기여](contribute/README.md)편을 참고하십시오.

* [코드](contribute/README.md)
* [문서](contribute/docs.md)
* [번역](contribute/translation.md)

## 번역

이 안내서에는 다양한 [번역](contribute/translation.md)본이 있습니다. (우측 상단의) 언어 메뉴에서 원하시는 번역본을 선택할 수 있습니다:

![언어 선택](../assets/vuepress/language_selector.png)

## 라이센스

PX4 코드는 [BSD 3-clause 라이센스](https://opensource.org/licenses/BSD-3-Clause)에 따라 자유롭게 사용하고 수정할 수 있습니다. 이 문서는 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 라이센스를 준수합니다. 자세한 정보는 [라이센스](contribute/licenses.md)를 참고하십시오.

## 주요 행사 및 일정 

드론 코드 달력에서는 플랫폼 개발자와 사용자를 위한 중요한 일정이 표시되어 있습니다. 사용자의 시간대와 맞는 달력을 보려면 아래 링크를 선택하십시오. 사용자의 달력에 추가할 수도 있습니다.

* [스위스 – 취리히](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
* [태평양 시간대 – 티후아나](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
* [오스트레일리아 – 멜버른/시드니/호바트](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
달력의 기본 시간대는 유럽중앙시간대(CET)입니다. ::: <iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no" mark="crwd-mark"></iframe> 

### 아이콘

이 라이브러리에서 사용하는 다음 아이콘들은 별도의 라이센스를 적용합니다. 아래 그림을 참고하십시오.

<img src="../assets/site/position_fixed.svg" title="요청된 위치 고정(예, GPS)" width="30px" /> *placeholder* 아이콘은 [www.flaticon.com](https://www.flaticon.com/ "Flaticon")의 <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>에서 만들었으며, <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> 라이센스를 적용합니다.

<img src="../assets/site/automatic_mode.svg" title="자동 모드" width="30px" /> *카메라 자동 모드* 아이콘은 [www.flaticon.com](https://www.flaticon.com/ "Flaticon")의 <a href="https://www.freepik.com" title="Freepik">Freepik</a>에서 만들었으며, <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0</a> 라이센스가 적용합니다.

## 운영 방법

PX4는 [Dronecode 프로젝트](https://www.dronecode.org/) 주관으로 운영 관리됩니다. 

<a href="https://www.dronecode.org/" style="padding:20px" ><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode 로고" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="리눅스 재단 로고" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
