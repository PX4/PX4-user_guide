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
- [Flying](flying/README.md) teaches flight essentials, including where and how to fly safely, and how to debug arming and flight issues. It also provides detailed information about flight modes.

**I want to build a drone with PX4 from scratch:**

> **Tip** The "supported" vehicles are listed in the [Airframes Reference](airframes/airframe_reference.md). These are vehicles that have tested and tuned configurations that you can download using *QGroundControl*.

If you want to build a vehicle from scratch:

- Choose a frame - [Airframe Builds](airframes/README.md) lists the supported frames and provides detailed instructions for how to construct a subset of vehicles.
- Choose a flight controller - see [Getting Started > Flight Controllers](getting_started/flight_controller_selection.md) and [Autopilot Hardware](flight_controller/README.md).
- [Assembly](assembly/README.md) explains how to wire up the important peripherals to your autopilot.
- [Basic Configuration](config/README.md) shows how to update your firmware and configure it with settings appropriate for your airframe. This section also explains how to calibrate the main sensors (compass, gyro/IMU, airspeed etc.), and setup your remote control and safety features.

Once you are ready to fly your vehicle, visit the [Flying](flying/README.md) section.

**I am modifying a supported vehicle:**

Modifications of the flight controller and basic sensors are covered above. In order to use new sensors, or if you have made changes that significantly affect flight characteristics:

- [Peripheral Hardware](peripherals/README.md) provides additional information about using external sensors.
- [Basic Configuration](config/README.md) explains how to calibrate the main sensors.
- [Advanced Configuration](advanced_config/README.md) should be used to re/fine-tune the airframe.

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
