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
  - For FMUv5 you can see all the Pixhawk 4 sensors being started, and it also sets a larger LOGGER_BUF, and in AUTOCNF section (fresh setups) it sets the [SYS_FMU_TASK](../advanced/parameter_reference.md#SYS_FMU_TASK) parameter.

## Host Operating System Configuration

This section describes the purpose and location of the configuration files required for each supported host operating system to port them to new flight controller hardware.

### NuttX

See [NuttX Board Porting Guide](porting_guide_nuttx.md).

### Linux

Linux boards do not include the OS and kernel configuration. These are already provided by the Linux image available for the board (which needs to support the inertial sensors out of the box).

* The boot file system (startup script) is located in: [ROMFS/px4fmu\_common](https://github.com/PX4/Firmware/tree/master/ROMFS/px4fmu_common) <!-- NEED px4_version -->

## Middleware Components and Configuration

This section describes the various middleware components, and the configuration file updates needed to port them to new flight controller hardware.

### QuRT / Hexagon

* Driver files are located in: [src/drivers](https://github.com/PX4/Firmware/tree/master/src/drivers). <!-- NEED px4_version -->
* The OS configuration is part of the default Linux image (TODO: Provide location of LINUX IMAGE and flash instructions).
* The PX4 middleware configuration is located in [src/drivers/boards](https://github.com/PX4/Firmware/tree/master/src/drivers/boards). TODO: ADD BUS CONFIG


## RC UART Wiring Recommendations

It is generally recommended to connect RC via separate RX and TX pins to the microcontroller. If however RX and TX are connected together, the UART has to be put into singlewire mode to prevent any contention. This is done via board config and manifest files. One example is [px4fmu-v5](https://github.com/PX4/Firmware/blob/master/src/drivers/boards/px4fmu-v5/manifest.c). <!-- NEED px4_version --> ## Officially Supported Hardware

The PX4 project supports and maintains the [FMU standard reference hardware](../debug/reference-design.md) and any boards that are compatible with the standard. This includes the [Pixhawk-series](https://docs.px4.io/en/flight_controller/pixhawk_series.html) (see the user guide for a [full list of officially supported hardware](https://docs.px4.io/en/flight_controller/)).

Every officially supported board benefits from:
* PX4 Port available in the PX4 repository
* Automatic firmware builds that are accessible from *QGroundControl*
* Compatibility with the rest of the ecosystem
* Automated checks via CI - safety remains paramount to this community
* [Flight testing](../test_and_ci/test_flights.md)

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
