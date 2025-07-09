---
canonicalUrl: https://docs.px4.io/main/ko/hardware/porting_guide
---

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
* PX4 미들웨어 구성은 [src/boards](https://github.com/PX4/PX4-Autopilot/tree/master/boards)에 있습니다. <!-- NEED px4_version --> TODO: ADD BUS CONFIG


## RC UART 배선 권장 사항

일반적으로 별도의 RX 및 TX 핀을 통해 RC를 마이크로 콘트롤러에 연결하는 것이 좋습니다. 그러나 RX와 TX가 함께 연결된 경우에는 UART의 경합 방지를 위하여, 단일 와이어 모드로 전환되어야 합니다. 이것은 보드 설정과 매니페스트 파일을 통하여 수행됩니다. 한 가지 예는 [px4fmu-v5](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/src/manifest.c)입니다. <!-- NEED px4_version -->


## 공식 지원 하드웨어

PX4 프로젝트는 [FMU 표준 참조 하드웨어](../hardware/reference_design.md)와 호환되는 모든 보드를 지원 및 유지 관리합니다. 여기에는 [Pixhawk 시리즈](../flight_controller/pixhawk_series.md)가 포함됩니다([공식적으로 지원되는 하드웨어의 전체 목록](../flight_controller/README.md)은 사용자 가이드를 참조).

공식 지원 보드의 이점은 다음과 같습니다.
* PX4 저장소에서 PX4 포트 사용 가능
* *QGroundControl*에서 액세스할 수 있는 자동 펌웨어 빌드
* 나머지 생태계와의 호환성
* CI를 통한 자동 검사 - 이 커뮤니티에서 가장 중요한 것은 안전입니다.
* [비행 테스트](../test_and_ci/test_flights.md)

보드 제조업체는 완벽한 [FMU 사양](https://pixhawk.org/) 호환성을 목표로 하는 것이 좋습니다. 완전한 호환성을 통하여 PX4의 지속적인 일일 개발의 이점을 얻을 수 있지만, 사양에서 벗어난 지원으로 인한 유지 관리 비용은 없습니다.

:::tip
제조업체는 사양에서 벗어나기 전에, 유지 관리 비용을 신중하게 고려해야 합니다(제조업체 비용은 차이에 비례합니다).
:::

[행동 강령](https://github.com/PX4/PX4-Autopilot/blob/master/CODE_OF_CONDUCT.md)을 준수할 의향이 있는 경우 지원되는 하드웨어에 포함할 포트를 제출하는 개인이나 회사를 환영합니다. Dev 팀과 협력하여 고객에게 안전하고 만족스러운 PX4 기술을 제공하십시오.

또한 PX4 개발 팀은 안전한 소프트웨어를 출시할 책임이 있으므로, 모든 보드 제조업체는 포트를 최신 상태 유지에 필요한 리소스를 투입하여야 합니다.

보드를 PX4에서 공식적으로 지원하려면:
* 하드웨어는 시장에서 제한없이 구매할 수 있어야 합니다.
* PX4 개발 팀이 포트를 확인할 수 있도록 하드웨어를 사용할 수 있어야 합니다(테스트를 위해 하드웨어를 배송할 위치에 대한 지침은 [lorenz@px4.io](mailto:lorenz@px4.io)에 문의).
* 보드는 [단위 테스트](../test_and_ci/README.md)와 [비행 테스트](../test_and_ci/test_flights.md)를 통과하여야 합니다.

**PX4 프로젝트는 설정한 요구 사항을 충족하지 못하는 경우에는 새 포트 수락을 거부하거나 현재 포트를 제거할 권리가 있습니다.**

[공식 지원 채널](../contribute/support.md)에서 핵심 개발자 팀과 커뮤니티에 연락할 수 있습니다.


## 관련 정보

* [장치 드라이버](../middleware/drivers.md) - 새로운 주변장치(장치 드라이버)를 지원하는 방법
* [코드 빌드](../dev_setup/building_px4.md) - 소스 빌드 및 펌웨어 업로드 방법
* 지원 비행 콘트롤러:
  * [자동조종장치 하드웨어](../flight_controller/README.md)
  * [지원 보드 목록](https://github.com/PX4/PX4-Autopilot/#supported-hardware)(Github) - PX4-Autopilot에 특정 코드가 있는 보드
* [지원 주변기기](../peripherals/README.md)
