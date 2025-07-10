---
canonicalUrl: https://docs.px4.io/main/ko/hardware/porting_guide_nuttx
---

# NuttX 보드 포팅 가이드

NuttX의 PX4를 포팅하려면, 하드웨어가 NuttX를 지원하여야 합니다. NuttX 프로젝트는 NuttX를 새로운 플랫폼으로 포팅하기 위한 [포팅 가이드](https://cwiki.apache.org/confluence/display/NUTTX/Porting+Guide)를 제공합니다.

다음 가이드에서는 기존 지원 하드웨어를 사용하거나, NuttX([PX4 기본 레이어](https://github.com/PX4/PX4-Autopilot/tree/master/platforms/nuttx/src/px4) 포함)를 이미 포팅하였다고 가정합니다.

링커 스크립트와 기타 필수 설정을 포함한 모든 보드의 설정 파일은 공급업체의 보드별 디렉토리의 [/boards](https://github.com/PX4/PX4-Autopilot/tree/master/boards/) 아래에 있습니다(예: **boards/_VENDOR</2>/_MODEL_</strong>)).

다음 예는 NuttX 비행 콘트롤러에 대한 최근 [참조 설정](../hardware/reference_design.md)인 FMUv5를 사용합니다.
* **PX4-Autopilot** 디렉토리에서 `make px4_fmu-v5_default`를 실행하면, FMUv5 설정이 빌드됩니다.
* 기본 FMUv5 설정 파일은 [/boards/px4/fmu-v5](https://github.com/PX4/PX4-Autopilot/tree/master/boards/px4/fmu-v5) 폴더에 있습니다.
  * 보드별 헤더(NuttX 핀 및 클록 구성): [/boards/px4/fmu-v5/nuttx-config/include/board.h](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/nuttx-config/include/board.h).
  * 보드별 헤더(PX4 구성): [/boards/px4/fmu-v5/src/board_config.h](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/src/board_config.h).
  * NuttX OS 설정(NuttX menuconfig로 생성): [/boards/px4/fmu-v5/nuttx-config/nsh/defconfig](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/nuttx-config/nsh/defconfig).
  * 빌드 설정: [boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake).

## NuttX 메뉴 구성 설정

NuttX OS 구성을 수정하려면, PX4 단축키를 사용하여 [menuconfig](https://bitbucket.org/patacongo/nuttx/src/master/)를 사용할 수 있습니다.
```sh
make px4_fmu-v5_default menuconfig
make px4_fmu-v5_default qconfig
```

[ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh)을 사용하여 Ubuntu에 PX4를 설치하려면, [NuttX 도구](https://bitbucket.org/nuttx/tools/src/master/)에서 *kconfig* 도구를 설치하여야 합니다. <!-- NEED px4_version --> you will also need to install *kconfig* tools from [NuttX tools](https://bitbucket.org/nuttx/tools/src/master/).

:::note
[px4-dev-nuttx](https://hub.docker.com/r/px4io/px4-dev-nuttx/) 도커 컨테이너를 사용하거나 일반 지침(`kconfig-mconf` 포함)을 사용하여 MacOS에 설치한 경우에는 다음 단계가 필요하지 않습니다.
:::

임의의 디렉터리에서 다음 명령어를 실행합니다.
```sh
git clone https://bitbucket.org/nuttx/tools.git
cd tools/kconfig-frontends
sudo apt install gperf
./configure --enable-mconf --disable-nconf --disable-gconf --enable-qconf --prefix=/usr
make
sudo make install
```

`--prefix=/usr`은 특정 설치 위치를 결정합니다(`PATH` 환경 변수에 있어야 함). `--enable-mconf`와 `--enable-qconf` 옵션은 각각 `menuconfig`와 `qconfig` 옵션을 활성화합니다.

`qconfig`를 실행하려면, 추가 Qt 종속성을 설치하여야 합니다.

### 부트로더

먼저 하드웨어 대상에 적합한 부트로더가 필요합니다.
- STM32H7: 부트로더는 NuttX를 기반으로 하며, PX4 펌웨어에 포함되어 있습니다. 예를 보려면 [여기](https://github.com/PX4/PX4-Autopilot/tree/master/boards/holybro/durandal-v1/nuttx-config/bootloader)를 참고하십시오.
- 다른 대상의 경우 https://github.com/PX4/Bootloader가 사용됩니다. 대상 추가 방법 예는 [여기](https://github.com/PX4/Bootloader/pull/155/files)를 참고하십시오. Then checkout the [building and flashing instructions](../software_update/stm32_bootloader.md).

### 펌웨어 포팅 단계

1. 작동 중인 [개발 설정](../dev_setup/dev_env.md) 여부와 NuttX menuconfig 도구를 설치여부를 확인하십시오(위 참조).
1. 소스 코드를 다운로드하고 기존 대상을 빌드할 수 있는 지 확인합니다.
   ```bash
   git clone --recursive https://github.com/PX4/PX4-Autopilot.git
   cd PX4-Autopilot
   make px4_fmu-v5
   ```
1. 동일한(또는 유사한) CPU 유형을 사용하는 기존 대상을 복사합니다. 예: STM32F7의 경우
   ```bash
   mkdir boards/manufacturer
   cp -r boards/px4/fmu-v5 boards/manufacturer/my-target-v1
   ```
   **manufacturer**를 제조업체 이름으로 변경하고, **my-target-v1**을 보드 이름으로 변경합니다.

다음으로 **boards/manufacturer/my-target-v1** 아래의 모든 파일을 살펴보고 보드에 따라 업데이트하여야 합니다.
1. **firmware.prototype**: 보드 ID 및 이름 업데이트
1. **default.cmake**: 디렉토리 이름(**my-target-v1**)과 일치하도록 **VENDOR**와 **MODEL**을 업데이트합니다. 직렬 포트를 설정합니다.
1. `make Manufacturer_my-target-v1 menuconfig`를 통한 NuttX(**defconfig**) 설정: CPU와 칩을 조정하고 주변 장치(UART, SPI, I2C, ADC)를 설정합니다.
1. **nuttx-config/include/board.h**: NuttX 핀을 설정합니다. 여러 가지 핀 옵션이 있는 주변 장치에서는 NuttX는 핀 정보을 알아야 합니다. 칩별 핀맵 헤더 파일에 정의되어 있습니다(예: [stm32f74xx75xx_pinmap.h](https://github.com/PX4/NuttX/blob/px4_firmware_nuttx-8.2/arch/arm/src/stm32f7/hardware/stm32f74xx75xx_pinmap.h)).
1. **src**: **src** 아래의 모든 파일을 살펴보고 필요에 따라 업데이트합니다(특히 **board_config.h**).
1. **init/rc.board_sensors**: 보드에 부착된 센서를 시작합니다.

