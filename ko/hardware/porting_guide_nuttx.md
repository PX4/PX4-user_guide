# NuttX 보드 포팅 가이드

NuttX의 PX4를 포팅하려면, 하드웨어가 NuttX를 지원하여야 합니다. NuttX 프로젝트는 NuttX를 새로운 플랫폼으로 포팅하기 위한 [포팅 가이드](https://cwiki.apache.org/confluence/display/NUTTX/Porting+Guide)를 제공합니다.

다음 가이드에서는 기존 지원 하드웨어를 사용하거나, NuttX([PX4 기본 레이어](https://github.com/PX4/PX4-Autopilot/tree/master/platforms/nuttx/src/px4) 포함)를 이미 포팅하였다고 가정합니다.

링커 스크립트와 기타 필수 설정을 포함한 모든 보드의 설정 파일은 공급업체의 보드별 디렉토리의 [/boards](https://github.com/PX4/PX4-Autopilot/tree/master/boards/) 아래에 있습니다(예: **boards/_VENDOR</2 >/_MODEL_</strong>)).</p>

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

For fresh installs of PX4 onto Ubuntu using [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) <!-- NEED px4_version --> you will also need to install *kconfig* tools from [NuttX tools](https://bitbucket.org/nuttx/tools/src/master/).

:::note
The following steps are not required if using the [px4-dev-nuttx](https://hub.docker.com/r/px4io/px4-dev-nuttx/) docker container or have installed to macOS using our normal instructions (as these include`kconfig-mconf`).
:::

Run the following commands from any directory:
```sh
git clone https://bitbucket.org/nuttx/tools.git
cd tools/kconfig-frontends
sudo apt install gperf
./configure --enable-mconf --disable-nconf --disable-gconf --enable-qconf --prefix=/usr
make
sudo make install
```

The `--prefix=/usr` determines the specific installation location (which must be in the `PATH` environment variable). The `--enable-mconf` and `--enable-qconf` options will enable the `menuconfig` and `qconfig` options respectively.

To run `qconfig` you may need to install additional Qt dependencies.

### Bootloader

First you will need a bootloader, which depends on the hardware target:
- STM32H7: the bootloader is based on NuttX, and is included in the PX4 Firmware. See [here](https://github.com/PX4/PX4-Autopilot/tree/master/boards/holybro/durandal-v1/nuttx-config/bootloader) for an example.
- For all other targets, https://github.com/PX4/Bootloader is used. See [here](https://github.com/PX4/Bootloader/pull/155/files) for an example how to add a new target. Then checkout the [buiding and flashing instructions](../software_update/stm32_bootloader.md).

### Firmware Porting Steps

1. Make sure you have a working [development setup](../dev_setup/dev_env.md) and installed the NuttX menuconfig tool (see above).
1. Download the source code and make sure you can build an existing target:
   ```bash
   git clone --recursive https://github.com/PX4/PX4-Autopilot.git
   cd PX4-Autopilot
   make px4_fmu-v5
   ```
1. Find an existing target that uses the same (or a closely related) CPU type and copy it. For example for STM32F7:
   ```bash
   mkdir boards/manufacturer
   cp -r boards/px4/fmu-v5 boards/manufacturer/my-target-v1
   ```
   Change **manufacturer** to the manufacturer name and **my-target-v1** to your board name.

Next you need to go through all files under **boards/manufacturer/my-target-v1** and update them according to your board.
1. **firmware.prototype**: update the board ID and name
1. **default.cmake**: update the **VENDOR** and **MODEL** to match the directory names (**my-target-v1**). Configure the serial ports.
1. Configure NuttX (**defconfig**) via `make manufacturer_my-target-v1 menuconfig`: Adjust the CPU and chip, configure the peripherals (UART's, SPI, I2C, ADC).
1. **nuttx-config/include/board.h**: Configure the NuttX pins. For all peripherals with multiple pin options, NuttX needs to know the pin. They are defined in the chip-specific pinmap header file, for example [stm32f74xx75xx_pinmap.h](https://github.com/PX4/NuttX/blob/px4_firmware_nuttx-8.2/arch/arm/src/stm32f7/hardware/stm32f74xx75xx_pinmap.h).
1. **src**: go through all files under **src** and update them as needed, in particular **board_config.h**.
1. **init/rc.board_sensors**: start the sensors that are attached to the board.

