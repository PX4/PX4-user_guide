<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 로고" width="180px" /></a></div>

# PX4 자동 항법 장치 사용자 안내서 ({{ $themeConfig.px4_version }})

[![릴리즈](https://img.shields.io/badge/release-master-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![논의](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![슬랙](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4는 *전문 자동 항법 장치*입니다. 산업계 및 학계의 세계적 수준의 개발자가 개발하고, 활발하게 활동 중인 전세계 커뮤니티에서 지원하며, 경주, 화물 드론에서부터 지상 차량과 잠수정에 이르기까지 모든 종류의 기기에 적용합니다.

:::tip
이 안내서에서는 PX4 기반 기체의 조립, 설정, 안전 비행에 필요한 모든 내용이 들어있습니다.
:::

:::note
This guide is still a work in progress! 아직 PX4의 모든 내용을 다루지는 않습니다.
:::

## 어떻게 시작하나요?

[시작하기](getting_started/README.md)는 모든 사용자가 읽어야 합니다! 비행 스택(비행 모드 및 안전 기능)과 지원 하드웨어(비행 제어장치, 기체, 기체 프레임, 텔레메트리 시스템, 원격 조종 제어 시스템)로 제공하는 기능과 더불어 PX4의 전반적인 내용을 알려드립니다.

목적에 따라, 다음 팁은 이 안내서를 살펴볼 때 도움을 드립니다:

**이미 드론을 가지고 있고 드론을 날리고 싶을 경우:**

PX4를 지원하는 비행 준비(RTF) 기체가 있을 경우:

* [기본 설정](config/README.md)에서는 펌웨어를 최신 버전으로 업데이트하고, 기본 센서(나침반, 자이로/IMU, 대기 속도 등)를 캘리브레이션하고 원격 제어 및 안전 기능을 설정하는 방법에 대해 설명합니다.
* [비행하기](flying/README.md)는 안전하게 비행할 수 있는 방법과 장소, 그리고 아밍 및 비행 문제를 해결하는 방법을 포함한 비행 요소들에 대해 설명합니다. 또한 비행 모드에 대한 자세한 정보를 제공합니다.

**처음부터 PX4로 무인 항공기를 만들고 싶을 경우:**

:::tip
"지원" 기체는 [기체 프레임 참고](airframes/airframe_reference.md) 목록에 있습니다. 이 목록의 여러 기체는 *QGroundControl*에서 다운로드 할 수 있는 설정으로 시험을 마쳤으며 설정을 조정했습니다.
:::

처음부터 기체를 제작하려면:

* 프레임 선택하기 - [기체 프레임 제작](airframes/README.md)에서는 지원 프레임 목록이 있으며, 기체 하위 분류 항목을 구성하는 자세한 방법을 설명합니다.
* 비행 제어장치 선택 - [시작하기 > 비행 제어 장치](getting_started/flight_controller_selection.md)와 [자동 항법 장치 하드웨어](flight_controller/README.md)를 살펴보십시오.
* [조립](assembly/README.md)은 중요한 주변 장치를 자동 항법 장치에 연결하는 방법을 설명합니다.
* [기초 설정](config/README.md)은 펌웨어를 업데이트하고 기체 프레임에 적합한 설정으로 펌웨어를 구성하는 방법을 보여줍니다. 또한 이 절에서는 주요 센서(나침반, 자이로/IMU, 항속 등)를 보정하고 원격 조종 장치 및 안전 기능을 설정하는 방법도 설명합니다.

기체를 날릴 준비가 되었다면 [비행](flying/README.md) 절로 넘어가십시오.

**지원 기체를 뜯어 고치려는 경우:**

비행 제어 장치 및 기본 센서 수정은 위 항목에서 다룹니다. 새 센서를 사용하려 하거나 비행 특성에 중대한 영향을 주는 설정을 바꾼다면:

* [주변 장치 하드웨어](peripherals/README.md)에서는 외부 센서 사용에 대한 추가 정보를 제공합니다.
* [기본 설정](config/README.md)에서는 주요 센서를 보정하는 방법을 설명합니다.
* [고급 설정](advanced_config/README.md)에서는 기체의 재설정 및 미세 조정 내용을 설명합니다.

**새 하드웨어에서 PX4를 실행하고 플랫폼을 확장하고 싶은 경우:**

* [개발](development/development.md)에서는 새 기체, 비행 알고리즘 수정, 새 모드 추가, 새 하드웨어 통합, 비행 컨트롤러 외부와 PX4간의 통신 및 PX4에 기여하는 방법에 대해 설명합니다.

## 도움 받기

[지원](contribute/support.md)페이지는 핵심 개발 팀과 수많은 커뮤니티 구성원들에게 도움을 받는 방법을 알려드립니다.

특히 다음 내용을 다룹니다:

* [도움을 받을 수 있는 포럼 목록](contribute/support.md#forums-and-chat)
* [문제 진단](contribute/support.md#diagnosing-problems)
* [버그 보고 방법](contribute/support.md#issue-bug-reporting)
* [주간 유선 개발 미팅](contribute/support.md#weekly-dev-call)

## 버그 및 문제점 보고

PX4 사용에 문제를 겪었다면, 먼저 [지원 포럼](contribute/support.md#forums-and-chat)에 내용을 게시하십시오 (기체 설정때문에 문제가 발생할 수 있음).

개발 팀의 요청에 따라 [Github](https://github.com/PX4/PX4-Autopilot/issues)에 코드 문제를 제시할 수 있습니다. 가능한 경우, 문제 보고 양식에 [비행 기록](getting_started/flight_reporting.md)과 기타 정보를 제공해 주십시오.

## 기여하기

코드와 문서에 기여하는 방법은 [기여](contribute/README.md) 절에서 찾을 수 있습니다:

* [코드](contribute/README.md)
* [문서](contribute/docs.md)
* [번역](contribute/translation.md)

## 번역

이 안내서의 다양한 [번역](contribute/translation.md) 이 있습니다. (우측 상단의) 언어 메뉴에서 해당 번역을 선택할 수 있습니다:

![언어 선택](../assets/vuepress/language_selector.png)

## 라이센스

PX4 코드는 [BSD 3-clause 라이선스](https://opensource.org/licenses/BSD-3-Clause)의 조항에 따라 자유롭게 사용하고 수정할 수 있습니다. 이 문서는 [크리에이티브 커먼즈 저작자표시 4.0](https://creativecommons.org/licenses/by/4.0/) 라이선스를 따릅니다. 자세한 정보는 [라이선스](contribute/licenses.md)를 참고하십시오.

## 달력과 행사

*드론 코드 달력*에서는 플랫폼 개발자, 사용자를 위한 주요 일정을 보여줍니다. 여러분 거주지의 시간대에 맞춘 달력을 보려면 아래 링크를 선택하십시오(그리고 여러분 자신의 달력에 추가하십시오):

* [스위스 – 취리히](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
* [태평양 시간대 – 티후아나](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
* [오스트레일리아 – 멜버른/시드니/호바트](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
달력의 기본 시간대는 CET 입니다. ::: <iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no" mark="crwd-mark"></iframe> 

### 아이콘

이 라이브러리에서 사용하는 다음 아이콘은 별도의 라이선스를 적용합니다 (아래 그림 참조):

<img src="../assets/site/position_fixed.svg" title="필요한 위치 수정(예: GPS)" width="30px" /> [www.flaticon.com](https://www.flaticon.com/ "Flaticon") 사이트의 <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>가 만든 <em>placeholder</em> 아이콘은 <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">크리에이티브 커먼즈 저작자 표시 3.0</a> 라이선스를 따릅니다.

<img src="../assets/site/automatic_mode.svg" title="자동 모드" width="30px" /> [www.flaticon.com](https://www.flaticon.com/ "Flaticon") 사이트의 <a href="http://www.freepik.com" title="Freepik">Freepik</a>이 만든 <em>camera-automatic-mode</em> 아이콘은 <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">크리에이티브 커먼즈 저작자 표시 3.0</a> 라이선스를 따릅니다.

## 운영 방식

PX4 플라이트 기술 스택은 [드론코드 프로젝트](https://www.dronecode.org/)의 운영 기반으로 제공합니다.

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="드론코드 로고" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="리눅스 재단 로고" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
