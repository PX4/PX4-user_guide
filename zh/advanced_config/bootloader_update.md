# Bootloader 更新

[PX4 bootloader](https://github.com/PX4/Bootloader)用于为Pixhawk板(PX4FMU, PX4IO)和[PX4FLOW](../sensor/px4flow.md)加载固件。

此篇介绍了更新Pixhawk bootloader的几种常见方法。

> **Note** 硬件通常会预先安装匹配版本的引导程序。 如果需要给新版本的 Pixhawk 板安装FMUv2固件，应先更新Bootloader：[固件>FMUv2 Bootloader更新](../config/firmware.md#bootloader)

<span id="qgc_bootloader_update"></span>

## QGroundControl Bootloader 更新

最简单的方法是首先使用* QGroundControl *安装具有所需/最新 bootloader 的固件。 然后，可以通过设置参数[ SYS_BL_UPDATE ](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)来在下次重启时启动 bootloader 更新。

> **注意** 仅当固件（当前只有 FMUv2 和某些自定义固件）中存在参数[ SYS_BL_UPDATE ](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)时，才可以使用此方法。

步骤如下：

1. 插入 SD 卡（使能引导日志记录，便于调试任何可能的问题）。
2. 使用包含 最新的/所需的 bootloader 的映像 (原单词 Image ) 来[更新固件](../config/firmware.md#custom)。
    
    > **提示** 已经更新的 bootloader 可能以自定义固件形式提供（例如，来自开发团队），或者可能包含在最新的 master 分支中。
    
    ![FMUv2 更新](../../assets/qgc/setup/firmware/bootloader_update.jpg)

3. 等待飞控重启。

4. [找到并启用](../advanced_config/parameters.md) 参数 [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)。
5. 重新启动（断开/重新连接飞控板）。 Bootloader 更新只需要几秒钟即可完成。

通常，此时您可能想要使用 正确/新安装 的 bootloader 再次[更新固件](../config/firmware.md)。

<span id="dronecode_probe"></span>

### 使用 Dronecode Probe 更新 Bootloader (Dronecode Probe 是官方 JTAG/SWD+UART 调试器 )

以下步骤说明了如何使用 dronecode probe “手动” 更新 bootloader ：

1. 获取包含 bootloader 的二进制文件（从开发团队 或 自行编译获得）。
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
    
    > **注意** 为了能够将 Dronecode probe 连接到 FMU-DEBUG 端口，您可能需要卸下外壳（例如，在Pixhawk 4 上，可以使用 T6 Torx 螺丝刀进行操作）。

8. 使用以下命令扫描 Pixhawk 的 swd 调试端口并连接到它 ：
    
        (gdb) mon swdp_scan
        (gdb) attach 1
        

9. 将二进制文件加载到 Pixhawk 中 ： ```(gdb) load```

Bootloader 更新后，您可以使用* QGroundControl * 来 [加载 PX4 固件](../config/firmware.md)。

<span id="non-pixhawk"></span>

## 其他飞控板（非 Pixhawk）

不属于 [ Pixhawk 系列](../flight_controller/pixhawk_series.md)的板卡将具有自己的 Bootloader 更新机制。

For boards that are preflashed with Betaflight, see [Bootloader Flashing onto Betaflight Systems](bootloader_update_from_betaflight.md).