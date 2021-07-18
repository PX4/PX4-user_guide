# 비행 콘트롤러 포팅 가이드

이 섹션은 *신규* 비행 콘트롤러에 PX4를 포팅하는 개발자를 위한 것입니다.

## PX4 아키텍쳐

PX4는 호스트 OS(NuttX, Linux 또는 Mac OS와 같은 기타 POSIX 플랫폼)의 상단의 [보드 지원 및 미들웨어](../middleware/README.md) 레이어와 애플리케이션([src/modules](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules)의 비행 스택)의 두 가지 주요 레이어로 구성됩니다.  자세한 내용은 [PX4 아키텍처 개요](../concept/architecture.md)를 참고하십시오.

애플리케이션/플라이트 스택이 모든 보드 대상에서 실행되므로, 이 가이드에서는 호스트 OS와 미들웨어에만 초점을 맞추어 설명합니다.

## 비행 콘트롤러 설정  파일 구조

보드 시작 및 설정 파일은 각 보드의 공급업체별 디렉토리(예: **boards/_VENDOR_/_MODEL_**)의 [boards](https://github.com/PX4/PX4-Autopilot/tree/master/boards/) 폴더에 있습니다.

예 FMUv5 :
* (전체) 보드별 파일: [/boards/px4/fmu-v5](https://github.com/PX4/PX4-Autopilot/tree/master/boards/px4/fmu-v5).<!-- NEED px4_version -->
* 빌드 설정: [/boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake).<!-- NEED px4_version -->
* 보드 초기화 파일: [/boards/px4/fmu-v5/init/rc.board_defaults](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/init/rc.board_defaults) <!-- NEED px4_version -->
  - 보드 초기화 파일은 **init/rc.board**의 보드 디렉토리 아래에 있는 경우에는 시작 스크립트에 자동으로 포함됩니다.
  - 이 파일은 특정 보드에만 존재하는 센서(및 기타 항목)를 시작하는 데 사용됩니다. 또한 보드의 기본 매개변수, UART 매핑 및 기타 특수한 경우를 설정하는 데 사용할 수 있습니다.
  - FMUv5은 시작되는 모든 Pixhawk 4 센서를 볼 수 있으며, 더 큰 LOGGER_BUF도 설정합니다.

## 호스트 운영 체제 설정

이 섹션에서는 지원되는 호스트 운영 체제에서 새 비행 콘트롤러 이식에 필요한 설정 파일의 목적과 위치에 대하여 설명합니다.

### NuttX

[NuttX 보드 이식 가이드](porting_guide_nuttx.md)를 참고하십시오.

### Linux

Linux 보드에는 OS와 커널 설정이 포함되어 있지 않습니다. Linux에는 이미 보드에 사용할 수 있는 Linux 이미지에 의해 제공됩니다(즉시 관성 센서를 지원해야 함).

* [boards/px4/raspberrypi/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/raspberrypi/default.cmake) - 라즈베리파이 교차 컴파일. <!-- NEED px4_version -->

## 미들웨어 구성 요소 및 설정

이 섹션에서는 다양한 미들웨어 구성 요소와 이를 새로운 비행 콘트롤러로 이식에 필요한 설정 파일 업데이트에 대하여 설명합니다.

### QuRT / Hexagon

* 시작 스크립트는 [posix-configs/](https://github.com/PX4/PX4-Autopilot/tree/master/posix-configs)에 있습니다. <!-- NEED px4_version -->
* OS 구성은 기본 Linux 이미지의 일부입니다(TODO: LINUX IMAGE 및 플래시 지침의 위치 제공).
* PX4 미들웨어 구성은 [src/boards](https://github.com/PX4/PX4-Autopilot/tree/master/boards)에 있습니다. TODO: ADD BUS CONFIG


## RC UART 배선 권장 사항

일반적으로 별도의 RX 및 TX 핀을 통해 RC를 마이크로 콘트롤러에 연결하는 것이 좋습니다. 그러나 RX와 TX가 함께 연결된 경우에는 UART의 경합 방지를 위하여, 단일 와이어 모드로 전환되어야 합니다. 이것은 보드 설정과 매니페스트 파일을 통하여 수행됩니다. 한 가지 예는 [px4fmu-v5](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/src/manifest.c)입니다. <!-- NEED px4_version --> ## 공식 지원 하드웨어

PX4 프로젝트는 [FMU 표준 참조 하드웨어](../hardware/reference_design.md)와 호환되는 모든 보드를 지원 및 유지 관리합니다. 여기에는 [Pixhawk 시리즈](../flight_controller/pixhawk_series.md)가 포함됩니다([공식적으로 지원되는 하드웨어의 전체 목록](../flight_controller/README.md)은 사용자 가이드를 참조).

공식 지원 보드의 이점은 다음과 같습니다.
* PX4 저장소에서 PX4 포트 사용 가능
* *QGroundControl*에서 액세스할 수 있는 자동 펌웨어 빌드
* 나머지 생태계와의 호환성
* CI를 통한 자동 검사 - 이 커뮤니티에서 가장 중요한 것은 안전입니다.
* [비행 테스트](../test_and_ci/test_flights.md)

We encourage board manufacturers to aim for full compatibility with the [FMU spec](https://pixhawk.org/). With full compatibility you benefit from the ongoing day-to-day development of PX4, but have none of the maintenance costs that come from supporting deviations from the specification.

:::tip
Manufacturers should carefully consider the cost of maintenance before deviating from the specification (the cost to the manufacturer is proportional to the level of divergence).
:::

We welcome any individual or company to submit their port for inclusion in our supported hardware, provided they are willing to follow our [Code of Conduct](https://github.com/PX4/PX4-Autopilot/blob/master/CODE_OF_CONDUCT.md) and work with the Dev Team to provide a safe and fulfilling PX4 experience to their customers.

It's also important to note that the PX4 dev team has a responsibility to release safe software, and as such we require any board manufacturer to commit any resources necessary to keep their port up-to-date, and in a working state.

If you want to have your board officially supported in PX4:
* The start script is located in [posix-configs/](https://github.com/PX4/Firmware/tree/master/posix-configs).
* Hardware must be made available to the PX4 Dev Team so that they can validate the port (contact <lorenz@px4.io> for guidance on where to ship hardware for testing).
* The board must pass full [test suite](../test_and_ci/README.md) and [flight testing](../test_and_ci/test_flights.md).

**The PX4 project reserves the right to refuse acceptance of new ports (or remove current ports) for failure to meet the requirements set by the project.**

You can reach out to the core developer team and community on the [official support channels](../contribute/support.md).


## Related Information

* [Device Drivers](../middleware/drivers.md) - How to support new peripheral hardware (device drivers)
* [Building the Code](../setup/building_px4.md) - How to build source and upload firmware
* Supported Flight Controllers:
  * [Autopilot Hardware](../flight_controller/README.md)
  * [Supported boards list](https://github.com/PX4/Firmware/#supported-hardware) (Github)
* [Supported Peripherals](../peripherals/README.md)
