# PX4 개발

신규 기체 개발 및 변경 방법, 비행 알고리즘을 수정, 새 모드를 추가, 새 하드웨어를 통합, 및 비행 컨트롤러 외부에서 PX4와 통신하는 방법을 설명합니다.

::: tip
이 섹션은 소프트웨어 개발자와 (신규) 하드웨어 통합자를위한 것입니다. 기존 기체를 구축하거나 PX4 차량을 사용하여 비행하는 경우에는 필요하지 않습니다.
:::

다음 방법을 설명합니다.

* <0개발자 최소 설정</a>, [PX4 소스 코드 빌드](../dev_setup/building_px4.md), [다양한 오토파일럿](../flight_controller/README.md) 펌웨어 배포 방법을 배웁니다.
* [PX4 시스템 구조](../concept/architecture.md)와 핵심 개념을 이해합니다.
* 플라이트 스택과 미들웨어 수정 방법을 배웁니다:
  - Modify flight algorithms and add new [flight modes](../concept/flight_modes.md).
  - Support new [airframes](../dev_airframes/README.md).
* Learn how to integrate PX4 with new hardware:
  - Support new sensors and actuators, including cameras, rangefinders, etc.
  - Modify PX4 to run on new autopilot hardware.
* [Simulate](../simulation/README.md), [test](../test_and_ci/README.md) and [debug/log](../debug/README.md) PX4.
* Communicate/integrate with external robotics APIs.


## Key Developer Links

- [Support](contribute/support.md): Get help using the [discussion boards](http://discuss.px4.io/) and other support channels.
- [Weekly Dev Call](../contribute/dev_call.md): A great opportunity to meet the PX4 dev team and discuss platform technical details (including pull requests, major issues, general Q&A).
- [Licences](../contribute/licenses.md): What you can do with the code (free to use and modify under terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause)!)
- [Contributing](../contribute/README.md): How to work with our [source code](../contribute/code.md).
