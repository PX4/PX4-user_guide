<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 로고" width="180px" /></a></div>

# PX4 Autopilot User Guide ({{ $themeConfig.px4_version }})

[![릴리즈](https://img.shields.io/badge/release-master-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![논의](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4는 *전문 오토파일럿*입니다. 산업계 및 학계의 세계적 수준의 개발자에 의해 개발되고 활발하게 활동 중인 전세계 커뮤니티에 의해 지원되며, 레이싱 및 화물 드론에서부터 지상 차량과 잠수정에 이르기까지 모든 종류의 기기에 적용됩니다.

> **팁** 이 설명서에는 PX4 기반의 기체를 조립, 구성 및 안전하게 비행하는데 필요한 모든 것들을 포함합니다.

<span></span>

> **참고** 이 설명서는 아직 작업 중입니다! 아직 PX4의 모든 것을 다루지는 않습니다.

## 어떻게 시작하나요?

[시작하기](getting_started/README.md)는 모든 사용자가 읽어야 합니다! 비행 스택(비행 모드 및 안전 기능)과 지원하는 하드웨어(비행 컨트롤러, 기체, 항공기, 원격 측정 시스템, RC 제어 시스템)를 통해 제공되는 기능을 포함하여 PX4에 대한 개요를 제공합니다.

달성하려는 목표에 따라, 다음 팁은 이 설명서를 탐색하는데 도움이 됩니다.

**이미 드론을 가지고 있고 드론이 비행하기를 원하는 경우:**

PX4를 지원하는 Ready To Fly (RTF) 기체가 있는 경우:

* [기본 설정](config/README.md)에서는 펌웨어를 최신 버전으로 업데이트하고, 기본 센서(나침반, 자이로/IMU, 대기 속도 등)를 캘리브레이션하고 원격 제어 및 안전 기능을 설정하는 방법에 대해 설명합니다.
* [비행하기](flying/README.md)는 안전하게 비행할 수 있는 방법과 장소, 그리고 아밍 및 비행 문제를 해결하는 방법을 포함한 비행 요소들에 대해 설명합니다. 또한 비행 모드에 대한 자세한 정보를 제공합니다.

**처음부터 PX4로 무인 항공기를 만들고 싶은 경우:**

> **Tip** "지원되는" 기체는 [기체 프레임 참고문헌](airframes/airframe_reference.md)에 나열되어 있습니다. 이 기체들은 사전 시험을 거쳤고 설정 튜닝을 마쳤으며, *QGroundControl*에서 다운로드 할 수 있습니다.

처음부터 기체를 제작하려는 경우:

* 프레임 선택하기 - [기체프레임 제작](airframes/README.md)은 지원되는 프레임을 나열하고 기체의 하위 요소를 구성하는 방법에 대한 자세한 지침을 제공합니다.
* 비행 컨트롤러를 선택하기 - [시작하기 > 비행 컨트롤러](getting_started/flight_controller_selection.md)와 [오토파일럿 하드웨어](flight_controller/README.md)를 보십시오.
* [조립](assembly/README.md)은 중요한 주변 장치를 오토파일럿에 연결하는 방법을 설명합니다.
* [기초 설정](config/README.md)은 펌웨어를 업데이트하고 기체프레임에 적합한 설정으로 펌웨어를 구성하는 방법을 보여줍니다. 이 섹션에서는 주요 센서(나침반, 자이로/IMU, 대기 속도 등)를 캘리브레이션하고 리모콘 및 안전 기능을 설정하는 방법에 대해서도 설명합니다.

기체를 날릴 준비가 되었다면 [비행](flying/README.md) 섹션으로 가십시오.

**지원되는 기체를 수정하려는 경우:**

비행 컨트롤러 및 기본적인 센서의 수정은 위 항목에서 다룹니다. 새로운 센서를 사용하거나 비행 특성에 중대한 영향을 주는 변경을 한 경우:

* [주변 장치 하드웨어](peripherals/README.md)는 외부 센서 사용에 대한 추가 정보를 제공합니다.
* [기본 설정](config/README.md)은 기본 센서를 캘리브레이션하는 방법을 설명합니다.
* [고급 설정](advanced_config/README.md)은 기체의 재조정 및 미세 조정에 사용됩니다.

**새 하드웨어에서 PX4를 실행하고 플랫폼을 확장하고 싶은 경우:**

* [개발](../development/development.md)에서는 새 기체, 비행 알고리즘 수정, 새 모드 추가, 새 하드웨어 통합, 비행 컨트롤러 외부와 PX4간의 통신 및 PX4에 기여하는 방법에 대해 설명합니다.

## 도움 받기

[지원](contribute/support.md)페이지는 코어 개발 팀과 더 넓은 커뮤니티로부터 도움을 받는법에 대해 설명합니다.

특히 다음을 다룹니다:

* [도움을 받을 수 있는 포럼들](contribute/support.md#forums-and-chat)
* [문제(Issue) 진단](contribute/support.md#diagnosing-problems)
* [버그 리포팅 방법](contribute/support.md#issue-bug-reporting)
* [주간 개발 미팅(Weekly dev call)](contribute/support.md#weekly-dev-call)

## 버그&문제점 보고

PX4를 사용하는데 문제가 생긴다면, 먼저 [지원 채널](#forums-and-chat)에 게시하십시오 (기체 설정때문에 문제가 발생할 수 있기 때문입니다.)

개발팀의 요청에 따라, [Github](https://github.com/PX4/PX4-Autopilot/issues)에 코드 문제(Code issue)를 제기할 수 있습니다. 가능한 경우 문제 양식(Issue template)에 [비행 기록](getting_started/flight_reporting.md)과 기타 정보를 제공해 주십시오.

## 기여하기

코드와 문서에 기여하는 방법은 [기여](../contribute/README.md)섹션에서 찾을 수 있습니다.

* [코드](../contribute/README.md)
* [문서](../contribute/docs.md)
* [번역](../contribute/translation.md)

## 번역

이 안내서의 중국어와 한국어 [번역](contribute/docs.md#translation)이 있습니다. 언어 전환 아이콘을 누르면 해당 언어 페이지에 접근할 수 있습니다:

![Gitbook 언어 선택](../assets/gitbook/gitbook_language_selector.png)

## 라이센스

PX4 코드는 허용 조건에 따라 자유롭게 사용하고 수정할 수 있습니다 [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). 이 설명서는 [CC BY 4.0 ](https://creativecommons.org/licenses/by/4.0/)에 따른 라이센스가 부여됩니다. 자세한 내용은 [PX4 개발 설명서 > 라이센스](../contribute/licenses.md)를 참조하십시오.

## Calendar & Events

*드론 코드 달력*에서는 플랫폼 개발자, 사용자를 위한 주요 일정을 보여줍니다. 여러분 거주지의 시간대에 맞춘 달력을 보려면 아래 링크를 선택하십시오(그리고 여러분 자신의 달력에 추가하십시오):

* [스위스 – 취리히](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
* [태평양 시간대 – 티후아나](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
* [오스트레일리아 – 멜버른/시드니/호바트](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

> **참고:** 달력 기본 시간대는 CET입니다. <iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no" mark="crwd-mark"></iframe> 

### 아이콘

이 라이브러리에서 사용되는 다음 아이콘은 별도로 라이센스가 부여됩니다 (아래 그림 참조):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> *placeholder* 아이콘은 <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>에서 만들었으며, <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>라이센스가 부여됩니다.

<img src="../assets/site/automatic_mode.svg" title="자동 모드" width="30px" /> *camera-automatic-mode* 아이콘은 <a href="http://www.freepik.com" title="Freepik">Freepik</a>의 <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>에서 만들었으며, <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0</a>라이센스가 부여됩니다.

## 운영 방식

PX4 비행 스택은 [Dronecode Project](https://www.dronecode.org/)의 주관으로 관리됩니다.

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode 로고" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="리눅스 재단 로고" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
