<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 Logo" width="180px" /></a></div>

# PX4 오토파일럿 사용자 가이드

[![Releases](https://img.shields.io/github/release/PX4/Firmware.svg)](https://github.com/PX4/Firmware/releases) [![Discuss](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4는 *전문가용 오토파일럿*입니다. 산업계 및 학계의 세계적 수준의 개발자에 의해 개발되고 활발한 전세계 커뮤니티에 의해 지원되며, 레이싱 및 카고 드론에서 지상 차량 및 잠수정에 이르기까지 모든 종류의 이동체에 적용됩니다.

> **팁** 이 가이드에는 PX4 기반의 이동체를 조립, 구성 및 안전하게 비행하는 데 필요한 모든 것이 포함되어 있습니다.

<span></span>

> **참고** 이 안내서는 아직 작업 중입니다! 아직 PX4의 모두 다루지는 않습니다.

## 시작하려면 어떻게 해야 합니까?

[시작하기](getting_started/README.md)는 모든 사용자가 읽어야 합니다! 비행 스택(비행 모드 및 안전 기능을 일컬음) 과 지원되는 하드웨어 (비행 컨트롤러, 이동체, 항공기, 원격 측정 시스템, RC 제어 시스템) 를 통해 제공되는 기능을 포함하여 PX4에 대한 개요를 제공합니다.

달성하려는 목표에 따라, 다음의 팁을 통해 이 가이드를 탐색하는데 도움이 됩니다.

**이미 무인 항공기를 가지고 있으며 단지 비행하기를 원하는 경우:**

PX4를 지원하는 Ready To Fly (RTF) 이동체가 있는 경우:

- [기본 구성](config/README.md)에서는 펌웨어를 최신 버전으로 업데이트하고, 기본 센서(나침반, 자이로/IMU, 대기 속도 등) 를 보정하고 원격 제어 및 안전 기능을 설정하는 방법에 대해 설명합니다.
- [ Flying](flying/README.md)은 안전하게 비행 할 수 있는 장소와 방법 그리고 아밍 및 비행 문제를 디버깅하는 방법을 포함하여 비행 요령을 가르칩니다. 또한 비행 모드에 대한 자세한 정보를 제공합니다.

**처음부터 사전 지식 없이 PX4로 드론을 만들고 싶은 경우:**

> ** Tip ** "지원되는" 기체는 [기체프레임 참조](airframes/airframe_reference.md)에 나열되어 있습니다. 이 프레임들은 * QGroundControl*을 사용하여 다운로드 할 수 있는 구성을 테스트하고 조정한 기체입니다.

사전 지식 없이 처음부터 기체를 제작하려는 경우:

- 프레임 선택 - [기체프레임 제작](airframes/README.md)은 지원되는 프레임을 나열하고 기체의 하위 요소를 구성하는 방법에 대한 자세한 지침을 제공합니다.
- 비행 컨트롤러를 선택하십시오 - [시작하기 > 비행 컨트롤러](getting_started/flight_controller_selection.md)와 [ 자동 조종 장치 하드웨어](flight_controller/README.md)를 보십시오.
- [조립](assembly/README.md)은 중요한 주변 장치를 자동 조종 장치에 연결하는 방법을 설명합니다.
- [기초 설정](config/README.md)은 펌웨어를 업데이트하고 기체프레임에 적합한 설정으로 펌웨어를 구성하는 방법을 보여줍니다. 또한 이 섹션에서는 주요 센서(나침반, 자이로/IMU, 대기 속도 등)를 보정하고 리모콘 및 안전 기능을 설정하는 방법에 대해서도 설명합니다.

기체를 날릴 준비가되면 [비행](flying/README.md) 섹션을 방문하십시오.

**지원되는 기체를 수정하려는 경우:**

비행 컨트롤러 및 기본 센서의 수정은 위에 설명되어 있습니다. 새로운 센서를 사용하거나 비행 특성에 중대한 영향을 주는 변경을 한 경우:

- [ 주변 장치 하드웨어](peripherals/README.md)는 외부 센서 사용에 대한 추가 정보를 제공합니다.
- [ 기본 설정](config/README.md)은 기본 센서를 보정하는 방법을 설명합니다.
- [ 고급 설정](advanced_config/README.md)을 사용하여 기체를 재조정/미세 조정을 해야합니다.

**I want to run PX4 on new hardware and extend the platform:**

- [PX4 Developer Guide](http://dev.px4.io/) explains how to modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.

## Forums and Chat {#support}

The core development team and community are active on the following forums and chat channels:

- [PX4 Discuss](http://discuss.px4.io/) (*recommended*)
- [Slack](http://slack.px4.io) (sign up)

## Reporting Bugs & Issues

If you have any problems using PX4 first post them on the [support channels above](#support) (as they may be caused by vehicle configuration).

If directed by the development team, code issues may be raised on [Github here](https://github.com/PX4/Firmware/issues). Where possible provide [flight logs](getting_started/flight_reporting.md) and other information requested in the issue template.

## Contributing

Information on how to contribute to code and documentation can be found in the Developer Guide:

- [Code](https://dev.px4.io/en/contribute/)
- [Documentation](https://dev.px4.io/en/contribute/docs.html)
- [Translation](https://dev.px4.io/en/contribute/docs.html)

## License

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). For more information see: [PX4 Development Guide > Licences](https://dev.px4.io/en/contribute/licenses.html).

### Icons

The following icons used in this library are licensed separately (as shown below):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> *placeholder* icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> *camera-automatic-mode* icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## Governance

The PX4 flight stack is hosted under the governance of the [Dronecode Project](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
