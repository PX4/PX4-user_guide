# Bootloader 更新

_PX4 启动加载器_ 用于加载 [Pixhawk 板](../flight_controller/pixhawk_series.md) (PX4FMU, PX4IO)。

Pixhawk控制器通常预安装了适当的引导程序。 但在某些情况下，当它不存在，或者有一个的旧版本需要更新。

此篇介绍了更新 Pixhawk bootloader 的几种常见方法。

:::note
你可能需要更新安装了FMUv2 版固件的Pixhawk板: [固件 > FMUv2 Bootloader 更新](../config/firmware.md#bootloader)
:::

## 构建PX4 启动加载器

从FMUv6X （STM32H7）的板子开始，使用代码树内的 PX4 bootloader。

这可以在 PX4-Autopilot 文件夹内构建，使用 `make` 命令和指定目标板的 `_bootloader` 后缀。 对于FMUv6X，命令是：

```sh
make px4_fmu-v6x_bootloader
```

这将构建 `build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf`格式的bootloader 二进制文件，它可以通过 SWD 或 DFU烧写。 如果你正准备构建 bootloader，你应该已经熟悉这些选项之一。

如果需要 HEX 文件而不是 ELF 文件，请使用 objcopy 参数：

```sh
arm-none-eabi-objcopy -O ihex build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf px4_fmu-v6x_bootloader.hex
```

## 构建旧的 PX4 启动加载器

在FMUv5X (在 STM32H7)之前的PX4 板， 使用旧的 [PX4 引导加载器](https://github.com/PX4/Bootloader) 仓库。

请参考README中的说明来学习如何使用它。

## QGC 引导加载器更新

最简单的方法是首先使用 _QGroundControl_ 来安装包含需要的/最新引导器的固件。 然后，可以通过设置参数[ SYS_BL_UPDATE ](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)来在下次重启时启动 bootloader 更新。

:::note
此方法只能在固件中存在 [SYS_BL_UpDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE) 时才能使用 (目前只是 FMUv2 和一些自定义固件)。
:::

步骤如下：

1. 插入 SD 卡（使能引导日志记录，便于调试任何可能的问题）。
1. 使用包含 最新的/所需的 bootloader 的 image 文件来[更新固件](../config/firmware.md#custom)。

   :::note
已经更新的 bootloader 可能在自定义固件中提供（例如，来自开发团队的固件），或者可能在最新的 master 分支中。
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

## Dronecode Probe 启动加载器更新

以下步骤说明了如何使用 dronecode probe “手动” 更新 bootloader ：

1. 获取包含 bootloader 的二进制文件（从开发团队或自行编译获得）。
1. 通过 USB 将 Dronecode Probe 连接到PC。
1. 进入包含二进制文件的目录，然后在终端中运行以下命令 ：

   ```sh
   
   ```

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

1. 在 **/dev/serial/by-id** 目录中运行ls 命令，找到您的 `<dronecode-probe-id>`
1. 现在，使用以下命令连接到 Dronecode probe：

   ```sh
   tar ext /dev/serial/by-id/<dronecode-probe-id>
   ```

1. 使用另一条 USB 线为 Pixhawk 供电，然后将 Dronecode probe 连接到 FMU-DEBUG 端口。

   为了能够将 Dronecode probe 连接到 FMU-DEBUG 端口，您可能需要卸下外壳（例如，在Pixhawk 4 上，可以使用 T6 Torx 螺丝刀进行操作）。
:::

1. 使用以下命令扫描 Pixhawk 的 swd 调试端口并连接到它 ：

   ```sh
   
   ```

1. 将二进制文件加载到 Pixhawk 中 ：

   ```sh
   (gdb) load
   ```

在引导程序更新后，您可以使用 _QGroundControl_ [加载 PX4 固件](../config/firmware.md)。

## 其他飞控板（非 Pixhawk）

不属于 [ Pixhawk 系列](../flight_controller/pixhawk_series.md)的板卡将具有自己的 bootloader 更新机制。

对于已预烧写 Betaflight 的板卡，请参见[ Betaflight System 烧写 Bootloader ](bootloader_update_from_betaflight.md)。
