# Bootloader 更新

_PX4 启动加载器_ 用于加载 [Pixhawk 板](../flight_controller/pixhawk_series.md) (PX4FMU, PX4IO)。

Pixhawk控制器通常预安装了适当的引导程序。 但在某些情况下，当它不存在，或者有一个的旧版本需要更新。

此篇介绍了更新 Pixhawk bootloader 的几种常见方法。

:::note

- Most boards will need to use the [Debug Probe](#debug-probe-bootloader-update) to update the bootloader.
- On [FMUv6X-RT](../flight_controller/pixhawk6x-rt.md) you can [install bootloader/unbrick boards via USB](bootloader_update_v6xrt.md). This is useful if you don't have a debug probe.
- On FMUv2 and some custom firmware (only) you can use [QGC Bootloader Update](#qgc-bootloader-update).
:::

## 构建PX4 启动加载器

### PX4 Bootloader FMUv6X and later

从FMUv6X （STM32H7）的板子开始，使用代码树内的 PX4 bootloader。

This can be built from within the [PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) directory using the `make` command and the board-specific target with a `_bootloader` suffix.

对于FMUv6X，命令是：

```sh
make px4_fmu-v6x_bootloader
```

这将构建 `build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf`格式的bootloader 二进制文件，它可以通过 SWD 或 DFU烧写。 如果你正准备构建 bootloader，你应该已经熟悉这些选项之一。

如果需要 HEX 文件而不是 ELF 文件，请使用 objcopy 参数：

```sh
arm-none-eabi-objcopy -O ihex build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf px4_fmu-v6x_bootloader.hex
```

### PX4 Bootloader FMUv5X and earlier

请参考README中的说明来学习如何使用它。

The instructions in the repo README explain how to use it.

## 构建旧的 PX4 启动加载器

The following steps explain how you can "manually" update the bootloader using a [compatible Debug Probe](../debug/swd_debug.md#debug-probes-for-px4-hardware):

1. Get a binary containing the bootloader (either from dev team or [build it yourself](#building-the-px4-bootloader)).

1. Get a [Debug Probe](../debug/swd_debug.md#debug-probes-for-px4-hardware). Connect the probe your PC via USB and setup the `gdbserver`.

1. Go into the directory containing the binary and run the command for your target bootloader in the terminal:

   - FMUv6X

     ```sh
     arm-none-eabi-gdb px4_fmu-v6x_bootloader.elf
     ```

   - FMUv6X-RT

     ```sh
     arm-none-eabi-gdb px4_fmu-v6xrt_bootloader.elf
     ```

   - FMUv5

     ```sh
     
     ```

:::note
H7 Bootloaders from [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) are named with pattern `*._bootloader.elf`. Bootloaders from [PX4/PX4-Bootloader](https://github.com/PX4/PX4-Bootloader) are named with the pattern `*_bl.elf`.
:::

1. _gdb 终端_ 出现，它应该显示以下输出：

   ```sh
   GNU gdb (GNU Tools for Arm Embedded Processors 7-2017-q4-major) 8.0.50.20171128-git
   Copyright (C) 2017 Free Software Foundation, Inc.
   License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
   This is free software: you are free to change and redistribute it.
   There is NO WARRANTY, to the extent permitted by law.
   
   This GDB was configured as "--host=x86_64-linux-gnu --target=arm-none-eabi".
   Type "show configuration" for configuration details.
   
   
   For help, type "help".
   Type "apropos word" to search for commands related to "word"...
   Reading symbols from px4fmuv5_bl.elf...done.
   ```

1. Find your `<dronecode-probe-id>` by running an `ls` command in the **/dev/serial/by-id** directory.

1. Now connect to the debug probe with the following command:

   ```sh
   tar ext /dev/serial/by-id/<dronecode-probe-id>
   ```

1. Power on the Pixhawk with another USB cable and connect the probe to the `FMU-DEBUG` port.

:::note
If using a Dronecode probe you may need to remove the case in order to connect to the `FMU-DEBUG` port (e.g. on Pixhawk 4 you would do this using a T6 Torx screwdriver).
:::

1. Use the following command to scan for the Pixhawk`s SWD and connect to it:

   ```sh
   
   ```

1. 将二进制文件加载到 Pixhawk 中 ：

   ```sh
   (gdb) load
   ```

在引导程序更新后，您可以使用 _QGroundControl_ [加载 PX4 固件](../config/firmware.md)。

## QGC 引导加载器更新

最简单的方法是首先使用 _QGroundControl_ 来安装包含需要的/最新引导器的固件。 然后，可以通过设置参数[ SYS_BL_UPDATE ](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)来在下次重启时启动 bootloader 更新。

This approach can only be used if [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE) is present in firmware.

:::warning
Currently only FMUv2 and some custom firmware includes the desired bootloader.
:::

步骤如下：

1. 插入 SD 卡（使能引导日志记录，便于调试任何可能的问题）。
1. 使用包含 最新的/所需的 bootloader 的 image 文件来[更新固件](../config/firmware.md#custom)。

   :::note
The updated bootloader might be supplied in custom firmware (i.e. from the dev team), or it or may be included in the latest main branch.
:::

1. 等待飞控重启。
1. [找到并启用](../advanced_config/parameters.md) 参数 [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)。
1. 重新启动（断开/重新连接飞控板）。 Bootloader 更新只需要几秒钟即可完成。

通常，此时您可能想要使用 正确/新安装 的 bootloader 再次[更新固件](../config/firmware.md)。

以下是更新FMUv2引导程序的一个具体例子。

### FMUv2 引导加载器更新

如果 _QGroundControl_ 安装了 FMUv2 目标(见安装过程中的控制台) 而且你有一个新的板，你可能需要更新引导程序，以便访问你飞行控制器上的所有内存。

:::note
早期FMUv2 [Pixhawk系列](../flight_controller/pixhawk_series.md#fmu_versions) 飞行控制器有一个 [硬件问题](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata) 限制它们使用闪存内存的1MB。 这个问题已在新版面解决， 但您可能需要更新工厂提供的引导程序，以便安装 FMUv3 固件并访问所有 2MB 可用内存。
:::

要更新引导器：

1. 插入 SD 卡（使能引导日志记录，便于调试任何可能的问题）。
1. [更新固件](../config/firmware.md) 到 PX4 _主_ 版本 (当更新固件时) 勾选 **高级设置** 然后选择 **开发者(主)** 从下拉列表中选择)。 _QGroundControl_ 将自动检测硬件支持FMUv2并安装相应的Firmware。

   ![FMUv2 更新](../../assets/qgc/setup/firmware/bootloader_update.jpg)

   等待飞控重启。

1. [找到并启用](../advanced_config/parameters.md) 参数 [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)。
1. 重新启动（断开/重新连接飞控板）。 Bootloader 更新只需要几秒钟即可完成。
1. 然后 [再次更新固件](../config/firmware.md) 这一次， _QGroundControl_ 应该自动检测硬件为 FMUv3 并正确更新固件。

   ![FMUv3 update](../../assets/qgc/setup/firmware/bootloader_fmu_v3_update.jpg)

:::note
如果硬件有 [Silicon Errata](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata) 它仍将被检测为 FMUv2 ，你会看到FMUv2 再次重新安装(在控制台)。 在这种情况下，您将无法安装 FMUv3 硬件。
:::

## 其他飞控板（非 Pixhawk）

不属于 [ Pixhawk 系列](../flight_controller/pixhawk_series.md)的板卡将具有自己的 bootloader 更新机制。

对于已预烧写 Betaflight 的板卡，请参见[ Betaflight System 烧写 Bootloader ](bootloader_update_from_betaflight.md)。
