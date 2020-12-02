# Bootloader 更新

[PX4 bootloader](https://github.com/PX4/Bootloader)用于为Pixhawk板(PX4FMU, PX4IO)和[PX4FLOW](../sensor/px4flow.md)加载固件。

此篇介绍了更新Pixhawk bootloader的几种常见方法。

:::note
Hardware usually comes with an appropriate bootloader version pre-installed. A case where you may need to update is newer Pixhawk boards that install FMUv2 firmware: [Firmware > FMUv2 Bootloader Update](../config/firmware.md#bootloader).
:::

<span id="qgc_bootloader_update"></span>

## QGroundControl Bootloader 更新

The easiest approach is to first use *QGroundControl* to install firmware with the desired/latest bootloader. You can then initiate bootloader update on next restart by setting the parameter: [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).

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

### 使用 Dronecode Probe 更新 Bootloader (Dronecode Probe 是官方 JTAG/SWD+UART 调试器 )

The following steps explain how you can "manually" update the bootloader using the dronecode probe:

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

After the bootloader has updated you can [Load PX4 Firmware](../config/firmware.md) using *QGroundControl*.

<span id="non-pixhawk"></span>

## 其他飞控板（非 Pixhawk）

Boards that are not part of the [Pixhawk Series](../flight_controller/pixhawk_series.md) will have their own mechanisms for bootloader update.

For boards that are preflashed with Betaflight, see [Bootloader Flashing onto Betaflight Systems](bootloader_update_from_betaflight.md).