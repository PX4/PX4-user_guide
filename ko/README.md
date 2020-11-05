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

- [기본 설정](config/README.md)에서는 펌웨어를 최신 버전으로 업데이트하고, 기본 센서(나침반, 자이로/IMU, 대기 속도 등)를 캘리브레이션하고 원격 제어 및 안전 기능을 설정하는 방법에 대해 설명합니다.
- [비행하기](flying/README.md)는 안전하게 비행할 수 있는 방법과 장소, 그리고 아밍 및 비행 문제를 해결하는 방법을 포함한 비행 요소들에 대해 설명합니다. 또한 비행 모드에 대한 자세한 정보를 제공합니다.

**처음부터 PX4로 무인 항공기를 만들고 싶은 경우:**

> **Tip** "지원되는" 기체는 [기체 프레임 참고문헌](airframes/airframe_reference.md)에 나열되어 있습니다. 이 기체들은 사전 시험을 거쳤고 설정 튜닝을 마쳤으며, *QGroundControl*에서 다운로드 할 수 있습니다.

처음부터 기체를 제작하려는 경우:

- 프레임 선택하기 - [기체프레임 제작](airframes/README.md)은 지원되는 프레임을 나열하고 기체의 하위 요소를 구성하는 방법에 대한 자세한 지침을 제공합니다.
- 비행 컨트롤러를 선택하기 - [시작하기 > 비행 컨트롤러](getting_started/flight_controller_selection.md)와 [오토파일럿 하드웨어](flight_controller/README.md)를 보십시오.
- [조립](assembly/README.md)은 중요한 주변 장치를 오토파일럿에 연결하는 방법을 설명합니다.
- [기초 설정](config/README.md)은 펌웨어를 업데이트하고 기체프레임에 적합한 설정으로 펌웨어를 구성하는 방법을 보여줍니다. 이 섹션에서는 주요 센서(나침반, 자이로/IMU, 대기 속도 등)를 캘리브레이션하고 리모콘 및 안전 기능을 설정하는 방법에 대해서도 설명합니다.

기체를 날릴 준비가 되었다면 [비행](flying/README.md) 섹션으로 가십시오.

**지원되는 기체를 수정하려는 경우:**

비행 컨트롤러 및 기본적인 센서의 수정은 위 항목에서 다룹니다. 새로운 센서를 사용하거나 비행 특성에 중대한 영향을 주는 변경을 한 경우:

- [주변 장치 하드웨어](peripherals/README.md)는 외부 센서 사용에 대한 추가 정보를 제공합니다.
- [기본 설정](config/README.md)은 기본 센서를 캘리브레이션하는 방법을 설명합니다.
- [고급 설정](advanced_config/README.md)은 기체의 재조정 및 미세 조정에 사용됩니다.

**새 하드웨어에서 PX4를 실행하고 플랫폼을 확장하고 싶은 경우:**

- [PX4 개발자 설명서](http://dev.px4.io/)에서는 비행 알고리즘 수정, 새 모드 추가, 새 하드웨어 통합, 비행 컨트롤러 외부에서 PX4와의 통신 및 PX4에 기여하는 방법에 대해 설명합니다.

<span id="support"></span>

## Forums and Chat

The core development team and community are active on the following forums and chat channels:

- [PX4 토론](http://discuss.px4.io/) (*권장*)
- [Slack](http://slack.px4.io) (회원가입 필요)

## 버그&문제점 보고

If you have any problems using PX4 first post them on the [support channels above](#support) (as they may be caused by vehicle configuration).

If directed by the development team, code issues may be raised on [Github here](https://github.com/PX4/PX4-Autopilot/issues). Where possible provide [flight logs](getting_started/flight_reporting.md) and other information requested in the issue template.

## 기여하기

Information on how to contribute to code and documentation can be found in the Developer Guide:

- [코드](https://dev.px4.io/master/en/contribute/)
- [문서](https://dev.px4.io/master/en/contribute/docs.html)
- [번역](https://dev.px4.io/master/en/contribute/docs.html)

## 라이센스

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). For more information see: [PX4 Development Guide > Licences](https://dev.px4.io/master/en/contribute/licenses.html).

### 아이콘

The following icons used in this library are licensed separately (as shown below):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> *placeholder* icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> *camera-automatic-mode* icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## 관리

The PX4 flight stack is hosted under the governance of the [Dronecode Project](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
