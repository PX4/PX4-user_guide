# Betaflight 系统烧写 Bootloader

本页介绍了如何将 PX4 bootloader 烧写到使用 Betaflight固件（例如[ OmnibusF4 SD ](../flight_controller/omnibus_f4_sd.md) 或 [ Kakute F7 ](../flight_controller/kakutef7.md)）的飞控板的 flash 中。

There are two options for flashing the bootloader: via *Betaflight Configurator* (easier), or building from source.

<a id="betaflight_configurator"></a>

### 使用 Betaflight 配置器 更新 Bootloader

To install the PX4 bootloader using the *Betaflight Configurator*:
1. 您应该已经下载了已编译过的 bootloader 二进制文件（二进制文件针对特定的飞控板编译生成）。
1. 下载适用于您平台的[ Betaflight 配置器](https://github.com/betaflight/betaflight-configurator/releases)。 :::tip If using the *Chrome* web browser, a simple cross-platform alternative is to install the configurator as an [extension from here](https://chrome.google.com/webstore/detail/betaflight-configurator/kdaghagfopacdngbohiknlhcocjccjao). 飞控板上电后可以放开该按钮。
1. 将飞控板连接到 PC 并启动 Betaflight 配置器。
1. Press the **Load Firmware [Local]** button ![Betaflight 配置器-本地固件](../../assets/flight_controller/omnibus_f4_sd/betaflight_configurator.jpg)
1. 从文件系统中选择 bootloader 二进制文件，然后烧写进飞控板的 flash。

现在，您应当可以在飞控板上安装 PX4 固件了。

### 使用源代码进行 Bootloader 更新

#### 下载 Bootloader 源

Flight controllers that have bootloader PX4-Autopilot `make` targets, can build the bootloader from the PX4-Autopilot source. The list of controllers for which this applies can be obtained by running the following `make` command, and noting the make targets that end in `_bootloader`

```
$make list_config_targets

...
cuav_nora_bootloader
cuav_x7pro_bootloader
cubepilot_cubeorange_bootloader
holybro_durandal-v1_bootloader
holybro_kakuteh7_bootloader
matek_h743-mini_bootloader
matek_h743-slim_bootloader
modalai_fc-v2_bootloader
mro_ctrl-zero-classic_bootloader
mro_ctrl-zero-h7_bootloader
mro_ctrl-zero-h7-oem_bootloader
mro_pixracerpro_bootloader
px4_fmu-v6u_bootloader
px4_fmu-v6x_bootloader
```

To build for these flight controllers, download and build the [PX4-Autopilot source](https://github.com/PX4/PX4-Autopilot), and then make the target using the following commands:

```bash
git clone --recursive  https://github.com/PX4/PX4-Autopilot.git
cd PX4-Autopilot
make <target> # For example: holybro_kakuteh7mini_bootloader
```

For other flight controllers download and build the [Bootloader source](https://github.com/PX4/Bootloader) and then make using the appropriate targets:

```
git clone --recursive  https://github.com/PX4/Bootloader.git
cd Bootloader
make <target> # For example: omnibusf4sd_bl or kakutef7_bl
```

#### 烧写 Bootloader

您可以使用 Windows 上的[ dfu-util ](http://dfu-util.sourceforge.net/) 或图形化的[ dfuse ](https://www.st.com/en/development-tools/stsw-stm32080.html) 工具烧写 PX4 bootloader。

无需担心，使用以下任何一种方法进行烧写即可。

:::note STM32 不会变成砖。 DFU 不会被烧写覆盖，并且总是允许安装新固件，即便烧写失败。 飞控板上电后可以放开该按钮。

##### 进入 DFU 模式

两种方法都要求飞控板处于 DFU 模式。 要进入 DFU 模式， 当将 USB 连接到电脑时按住启动按钮。 飞控板上电后可以释放该按钮。

##### dfu-util

:::note
The [Holybro Kakute H7 v2](../flight_controller/kakuteh7v2.md) and mini flight controllers may require that you first run an additional command to erase flash parameters (in order to fix problems with parameter saving):

```
dfu-util -a 0 --dfuse-address 0x08000000:force:mass-erase:leave -D build/<target>/<target>.bin
```

The command may generate an error which can be ignored. Once completed, enter DFU mode again to complete the regular flashing. 飞控板上电后可以放开该按钮。

To flash the bootloader onto the flight controller:

```
dfu-util -a 0 --dfuse-address 0x08000000 -D  build/<target>/<target>.bin
```

重新启动飞控板，并且不要按下启动按钮。

##### dfuse

在此处查看 dfuse 手册: https://www.st.com/resource/en/user_manual/cd00155676.pdf

Flash the **<target>.bin** file.


<span id="reinstall_betaflight"></span>
## 重新安装 Beatflight 固件

In order to switch back to *Betaflight*:
- 备份 PX4 参数，例如通过[导出](../advanced/parameters_and_configurations.md#exporting-and-loading-parameters)将其导出到 SD 卡中。
- Keep the **bootloader** button pressed while attaching the USB cable
- Then flash *Betaflight* as usual with the *Betaflight-configurator*

