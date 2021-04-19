# Bootloader 更新

[PX4 bootloader](https://github.com/PX4/Bootloader)用于为 Pixhawk 板（PX4FMU, PX4IO）和[PX4FLOW](../sensor/px4flow.md)加载固件。

此篇介绍了更新 Pixhawk bootloader 的几种常见方法。

:::note
硬件通常预先安装了合适的引导程序版本。 您可能需要更新的一种情况是在较新的 Pixhawk 板子上安装 FMUv2 固件： [固件> FMUv2 Bootloader 更新](../config/firmware.md#bootloader)
:::

## 构建新的 PX4 bootloader

以 FMUv6X （STM32H7）开始的板子使用树内的 PX4 bootloader。 旧板子使用遗留的 [PX4 bootloader](https://github.com/PX4/Bootloader) 仓库中的 bootloader。 请参考README中的说明来学习如何使用它。

在 PX4-Autopilot 文件夹中构建新的 bootloader:

    make px4_fmu-v6x_bootloader
    

该命令构建出的 bootloader 二进制文件像这样 `build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf`， 可以通过 SWD 或者 DFU 烧写。 If you are building the bootloader you should be familiar with one of these options already.

如果需要 HEX 文件而不是 ELF 文件，请使用 objcopy 参数：

    arm-none-eabi-objcopy -O ihex build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf px4_fmu-v6x_bootloader.hex
    

<span id="qgc_bootloader_update"></span>

## 使用 QGroundControl 地面站更新 Bootloader

最简单的方法是首先使用* QGroundControl *安装具有所需/最新 bootloader 的固件。 You can then initiate bootloader update on next restart by setting the parameter: [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).

:::note
This approach can only be used if [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE) is present in firmware (currently just FMUv2 and some custom firmware).
:::

The steps are:

1. 插入 SD 卡（使能引导日志记录，便于调试任何可能的问题）。
2. [Update the Firmware](../config/firmware.md#custom) with an image containing the new/desired bootloader. :::note The updated bootloader might be supplied in custom firmware (i.e. from the dev team), or it or may be included in the latest master.
:::
    
    ![FMUv2 更新](../../assets/qgc/setup/firmware/bootloader_update.jpg)

3. 等待飞控重启。

4. [找到并启用](../advanced_config/parameters.md) 参数 [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)。
5. 重新启动（断开/重新连接飞控板）。 Bootloader 更新只需要几秒钟即可完成。

Generally at this point you may then want to [update the firmware](../config/firmware.md) again using the correct/newly installed bootloader.

<span id="dronecode_probe"></span>

### Dronecode Probe Bootloader 更新

以下步骤说明了如何使用 dronecode probe “手动” 更新 bootloader ：

1. 获取包含 bootloader 的二进制文件（从开发团队或自行编译获得）。
2. 通过 USB 将 Dronecode Probe 连接到PC。 
3. 进入包含二进制文件的目录，然后在终端中运行以下命令 ： 
        bash
        arm-none-eabi-gdb px4fmuv5_bl.elf

4. 出现* gdb 终端界面 *，它应该显示以下输出： 
        bash
        GNU gdb (GNU Tools for Arm Embedded Processors 7-2017-q4-major) 8.0.50.20171128-git
        Copyright (C) 2017 Free Software Foundation, Inc.
        License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
        This is free software: you are free to change and redistribute it.
        There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
        and "show warranty" for details.
        This GDB was configured as "--host=x86_64-linux-gnu --target=arm-none-eabi".
        Type "show configuration" for configuration details.
        For bug reporting instructions, please see:
        <http://www.gnu.org/software/gdb/bugs/>.
        Find the GDB manual and other documentation resources online at:
        <http://www.gnu.org/software/gdb/documentation/>.
        For help, type "help".
        Type "apropos word" to search for commands related to "word"...
        Reading symbols from px4fmuv5_bl.elf...done.

5. 通过在 **/dev/serial/by-id** 文件夹下中运行 ls 命令来找到 `<dronecode-probe-id>` dronecode-probe-id</0> 。
6. 现在，使用以下命令连接到 Dronecode probe： ```tar ext /dev/serial/by-id/<dronecode-probe-id>```
7. 使用另一条 USB 线为 Pixhawk 供电，然后将 Dronecode probe 连接到 FMU-DEBUG 端口。
    
:::note
To be able to connect the Dronecode probe to the FMU-DEBUG port, you may need to remove the case (e.g. on Pixhawk 4 you would do this using a T6 Torx screwdriver).
:::

8. 使用以下命令扫描 Pixhawk 的 swd 调试端口并连接到它 ：
    
        (gdb) mon swdp_scan
        (gdb) attach 1
        

9. 将二进制文件加载到 Pixhawk 中 ： ```(gdb) load```

After the bootloader has updated you can [Load PX4 Firmware](../config/firmware.md) using *QGroundControl*.

## 其他飞控板（非 Pixhawk）

Boards that are not part of the [Pixhawk Series](../flight_controller/pixhawk_series.md) will have their own mechanisms for bootloader update.

For boards that are preflashed with Betaflight, see [Bootloader Flashing onto Betaflight Systems](bootloader_update_from_betaflight.md).