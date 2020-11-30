# 机架参考

为了将基于 Nuttx 的 PX4 移植到新的硬件平台上，Nuttx 必须支持该硬件平台。 NuttX 项目中维护着一个出色的 [移植指南](https://cwiki.apache.org/confluence/display/NUTTX/Porting+Guide) 可以帮助你实现将 Nuttx 移植到一个新的计算平台上。

The following guide assumes you are using an already supported hardware target or have ported NuttX (including the [PX4 base layer](https://github.com/PX4/PX4-Autopilot/tree/master/platforms/nuttx/src/px4)) already.

所有飞控板的配置文件，包括链接脚本和其它必需的设置都位于 [/boards](https://github.com/PX4/PX4-Autopilot/tree/master/boards/) 文件夹下特定于供应商（vendor- specific）和飞控板种类（ board-specific）的目录下 (例如 **boards/_VENDOR_/_MODEL_/**)。

The following example uses FMUv5 as it is a recent [reference configuration](../hardware/reference_design.md) for NuttX based flight controllers:
* Running `make px4_fmu-v5_default` from the **PX4-Autopilot** directory will build the FMUv5 config
* 基准的 FMUv5 配置文件位于：[/boards/px4/fmu-v5](https://github.com/PX4/PX4-Autopilot/tree/master/boards/px4/fmu-v5)。
  * Board specific header (NuttX pins and clock configuration): [/boards/px4/fmu-v5/nuttx-config/include/board.h](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/nuttx-config/include/board.h).
  * Board specific header (PX4 configuration): [/boards/px4/fmu-v5/src/board_config.h](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/src/board_config.h).
  * NuttX OS config (created with NuttX menuconfig): [/boards/px4/fmu-v5/nuttx-config/nsh/defconfig](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/nuttx-config/nsh/defconfig).
  * Build configuration: [boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake).

## NuttX Menuconfig Setup

To modify the NuttX OS configuration, you can use [menuconfig](https://bitbucket.org/nuttx/nuttx) using the PX4 shortcuts:
```sh
make px4_fmu-v5_default menuconfig
make px4_fmu-v5_default qconfig
```

For fresh installs of PX4 onto Ubuntu using [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) <!-- NEED px4_version --> you will also need to install *kconfig* tools from [NuttX tools](https://bitbucket.org/nuttx/tools/src/master/).

> **Note** 如果使用的是 [px4-dev-nuttx](https://hub.docker.com/r/px4io/px4-dev-nuttx/) docker 容器作为开发环境或者根据我们的标准指南在 macOS 上安装的开发环境（这些情况下已经默认安装了 `kconfig-mconf` ），那么你并不需要执行下述步骤。

在任意目录运行以下命令：
```sh
git clone https://bitbucket.org/nuttx/tools.git
cd tools/kconfig-frontends
sudo apt install gperf
./configure --enable-mconf --disable-nconf --disable-gconf --enable-qconf --prefix=/usr
make
sudo make install
```

The `--prefix=/usr` determines the specific installation location (which must be in the `PATH` environment variable). `--enable-mconf` 和 `--enable-qconf` 选项将会分别启用 `menuconfig` 和 `qconfig` 这两个选项。

想运行 `qconfig` 的话你可能还需要安装额外的 Qt 依赖项。

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

