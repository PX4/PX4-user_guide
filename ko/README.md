<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 로고" width="180px" /></a></div>

# PX4 오토파일럿 사용자 설명서 ({{ book.px4_version }})

[![릴리즈](https://img.shields.io/badge/release-{{ book.px4_version }}-blue.svg)](https://github.com/PX4/Firmware/releases) [![논의](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4는 *전문가용 오토파일럿*입니다. 산업계 및 학계의 세계적 수준의 개발자에 의해 개발되고 활발한 전세계 커뮤니티에 의해 지원되며, 레이싱 및 카고 드론에서 지상 기체 및 잠수정에 이르기까지 모든 종류의 기체에 적용됩니다.

> **팁** 이 설명서에는 PX4 기반의 기체를 조립, 구성 및 안전하게 비행하는 데 필요한 모든 것이 포함되어 있습니다.

<span></span>

> **참고** 이 설명서는 아직 작업 중입니다! 아직 PX4의 모두 다루지는 않습니다.

## 시작하려면 어떻게 해야 합니까?

[시작하기](getting_started/README.md)는 모든 사용자가 읽어야 합니다! 비행 스택(비행 모드 및 안전 기능을 일컬음) 과 지원되는 하드웨어 (비행 컨트롤러, 기체, 항공기, 원격 측정 시스템, RC 제어 시스템) 를 통해 제공되는 기능을 포함하여 PX4에 대한 개요를 제공합니다.

달성하려는 목표에 따라, 다음의 팁을 통해 이 설명서를 탐색하는데 도움이 됩니다.

**이미 무인 항공기를 가지고 있으며 단지 비행하기를 원하는 경우:**

PX4를 지원하는 Ready To Fly (RTF) 기체가 있는 경우:

- [기본 구성](config/README.md)에서는 펌웨어를 최신 버전으로 업데이트하고, 기본 센서(나침반, 자이로/IMU, 대기 속도 등) 를 캘리브레이션하고 원격 제어 및 안전 기능을 설정하는 방법에 대해 설명합니다.
- [ Flying](flying/README.md)은 안전하게 비행 할 수 있는 장소와 방법 그리고 아밍 및 비행 문제를 디버깅하는 방법을 포함하여 비행 요령을 가르칩니다. 또한 비행 모드에 대한 자세한 정보를 제공합니다.

**처음부터 사전 지식 없이 PX4로 드론을 만들고 싶은 경우:**

> ** Tip ** "지원되는" 기체는 [기체 프레임 참고문헌](airframes/airframe_reference.md)에 나열되어 있습니다. 이 프레임들은 * QGroundControl*을 사용하여 다운로드 할 수 있는 구성을 테스트하고 조정한 기체입니다.

사전 지식 없이 처음부터 기체를 제작하려는 경우:

- 프레임 선택 - [기체프레임 제작](airframes/README.md)은 지원되는 프레임을 나열하고 기체의 하위 요소를 구성하는 방법에 대한 자세한 지침을 제공합니다.
- 비행 컨트롤러를 선택하십시오 - [시작하기 > 비행 컨트롤러](getting_started/flight_controller_selection.md)와 [ 자동 조종 장치 하드웨어](flight_controller/README.md)를 보십시오.
- [조립](assembly/README.md)은 중요한 주변 장치를 자동 조종 장치에 연결하는 방법을 설명합니다.
- [기초 설정](config/README.md)은 펌웨어를 업데이트하고 기체프레임에 적합한 설정으로 펌웨어를 구성하는 방법을 보여줍니다. 또한 이 섹션에서는 주요 센서(나침반, 자이로/IMU, 대기 속도 등)를 캘리브레이션하고 리모콘 및 안전 기능을 설정하는 방법에 대해서도 설명합니다.

기체를 날릴 준비가되면 [비행](flying/README.md) 섹션을 방문하십시오.

**지원되는 기체를 수정하려는 경우:**

비행 컨트롤러 및 기본 센서의 수정은 위에 설명되어 있습니다. 새로운 센서를 사용하거나 비행 특성에 중대한 영향을 주는 변경을 한 경우:

- [ 주변 장치 하드웨어](peripherals/README.md)는 외부 센서 사용에 대한 추가 정보를 제공합니다.
- [ 기본 설정](config/README.md)은 기본 센서를 캘리브레이션하는 방법을 설명합니다.
- [ 고급 설정](advanced_config/README.md)을 사용하여 기체의 재조정/미세 조정을 해야합니다.

**새 하드웨어에서 PX4를 실행하고 플랫폼을 확장하고 싶은 경우:**

- [ PX4 개발자 설명서](http://dev.px4.io/)에서는 비행 알고리즘 수정, 새 모드 추가, 새 하드웨어 통합, 비행 컨트롤러 외부에서 PX4와의 통신 및 PX4에 기여하는 방법에 대해 설명합니다.

## 포럼 및 채팅 {#support}

핵심 개발 팀과 커뮤니티는 다음 포럼 및 채팅 채널에서 활발하게 활동합니다.

- [ PX4 토론](http://discuss.px4.io/)(*권장 *)
- [Slack](http://slack.px4.io)(등록)

## 버그와 문제점 보고

PX4를 사용하는 데 문제가 있으면 먼저 [위의 지원 채널](#support)에 게시하십시오 (기체 설정으로 인해 발생할 수 있습니다).

개발 팀에 의해 발생되었다면 여기 [Github](https://github.com/PX4/Firmware/issues)에서 코드 문제를 제기할 수 있습니다. 가능한 경우, 문제 템플릿에 [비행 기록](getting_started/flight_reporting.md)과 기타 정보를 제공해 주십시오.

## 기여하기

코드 및 설명서에 기여하는 방법에 대한 정보는 개발자 설명서에서 확인할 수 있습니다.

- [코드](https://dev.px4.io/master/en/contribute/)
- [문서](https://dev.px4.io/master/en/contribute/docs.html)
- [번역](https://dev.px4.io/master/en/contribute/docs.html)

## 라이센스

PX4 코드는 자유롭게 사용하고 [ BSD 3절의 라이센스](https://opensource.org/licenses/BSD-3-Clause) 조건에 따라 수정할 수 있습니다. 본 문서는 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)에 따라 사용이 허가되었습니다. 자세한 내용은 [PX4 개발 설명서 > 라이센스](https://dev.px4.io/master/en/contribute/licenses.html)를 참조하십시오.

### 아이콘

이 라이브러리에서 사용되는 다음 아이콘은 별도로 라이센스가 부여됩니다(아래 그림 참조).

<img src="../assets/site/position_fixed.svg" title="요청된 위치 고정(예, GPS)" width="30px" /> *자리 표시 자 * 아이콘은 <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>에서 만들었으며, <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>에 의해 사용이 허가되었습니다.

<img src="../assets/site/automatic_mode.svg" title="자동 모드" width="30px" /> *카메라 자동 모드* 아이콘은 <a href="http://www.freepik.com" title="Freepik">Freepik</a>의 <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>에서 만들었으며, <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0</a>에 의해 사용이 허가되었습니다.

## 관리

PX4 비행 스택은 [드론코드 프로젝트](https://www.dronecode.org/) 주관으로 관리됩니다.

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="드론코드 로고" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="리눅스 재단 로고" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
