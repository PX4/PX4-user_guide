# 加载固件

*QGroundControl* **桌面** 版本可用于在 [Pixhawk-系列](../getting_started/flight_controller_selection.md) 飞控板上安装 PX4 固件。

:::warning
**Before you start installing Firmware** all USB connections to the vehicle must be *disconnected* (both direct or through a telemetry radio). The vehicle must *not be* powered by a battery.
:::

## 安装稳定的PX4版本

Generally you should use the most recent *released* version of PX4, in order to benefit from bug fixes and get the latest and greatest features.

:::tip
This is the version that is installed by default.
:::

To install PX4:

1. Start *QGroundControl* and connect the vehicle.
2. Select **"Q" icon > Vehicle Setup > Firmware** (sidebar) to open *Firmware Setup*.
    
    ![Firmware disconnected](../../assets/qgc/setup/firmware/firmware_disconnected.jpg)

3. Connect the flight controller directly to your computer via USB.
    
:::note
Connect directly to a powered USB port on your machine (do not connect through a USB hub).
:::

4. Select the **PX4 Flight Stack X.x.x Release** option to install the latest stable version of PX4 *for your hardware* (autodetected).
    
    ![Install PX4 default](../../assets/qgc/setup/firmware/firmware_connected_default_px4.jpg)

5. Click the **OK** button to start the update.
    
    The firmware will then proceed through a number of upgrade steps (downloading new firmware, erasing old firmware etc.). Each step is printed to the screen and overall progress is displayed on a progress bar.
    
    ![Firmware upgrade complete](../../assets/qgc/setup/firmware/firmware_upgrade_complete.jpg)
    
    Once the firmware has completed loading, the device/vehicle will reboot and reconnect.
    
:::tip
If *QGroundControl* installs the FMUv2 target (see console during installation) and you have a newer board, you may need to [update the bootloader](#bootloader) in order to access all the memory on your flight controller.
:::

Next you will need to specify the [vehicle airframe](../config/airframe.md) (and then sensors, radio, etc.)

<span id="custom"></span>

## 安装PX4 Master, Beta或自定义固件

To install a different version of PX4:

1. 如上所述连接飞行器，并选择 **PX4 飞行栈 vX.x.x Stagable Release** ![安装 PX4 版本](../../assets/qgc/setup/firmware/qgc_choose_firmware.jpg)
2. 检查 **高级设置** 并从下拉列表中选择版本： 
    * **标准版本 (稳定)** 默认版本 (即不需要使用高级设置来安装!)
    * **Beta 测试(beta)：** 测试/候选版本。 只有当新版本准备完毕时才可用。
    * **Developer Build (master):** The latest build of PX4/PX4-Autopilot.
    * **自定义固件文件..:** 自定义固件文件 (例如，您在本地构建)。 如果选择 Custom firmware file ，您需要在下一步中从文件系统中选择自定义固件。

Firmware update then continues as before.

<a id="bootloader"></a>

## FMUv2 Bootloader 更新

If *QGroundControl* installs the FMUv2 target (see console during installation), and you have a newer board, you may need to update the bootloader in order to access all the memory on your flight controller.

:::note
Early FMUv2 [Pixhawk-series](../flight_controller/pixhawk_series.md#fmu_versions) flight controllers had a [hardware issue](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata) that restricted them to using 1MB of flash memory. The problem is fixed on newer boards, but you may need to update the factory-provided bootloader in order to install FMUv3 Firmware and access all 2MB available memory.
:::

To update the bootloader:

1. 插入 SD 卡（启用引导日志记录，便于调试任何可能的问题。）
2. [更新固件](../config/firmware.md) 至PX4 *master* 版本（当更新固件时，查看 **高级设置** 并从下拉列表选择**Developer Build (master)** ）。 *QGroundControl* 会自动识别到硬件支持 FMUv2，并安装相应的固件。
    
    ![FMUv2 更新](../../assets/qgc/setup/firmware/bootloader_update.jpg)
    
    等待飞控重启。

3. [找到并启用](../advanced_config/parameters.md) 参数 [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)。

4. 重新启动（断开/重新连接飞控板）。 Bootloader更新只需要几秒钟即可完成。
5. 然后再重新 [更新固件](../config/firmware.md) 。 这一次 *QGroundControl* 会自动识别到硬件支持 FMUv3，并相应地安装固件。
    
    ![FMUv3 更新](../../assets/qgc/setup/firmware/bootloader_fmu_v3_update.jpg)
    
:::note
If the hardware has the *Silicon Errata* it will still be detected as FMUv2 and you will see that FMUv2 was re-installed (in console). In this case you will not be able to install FMUv3 hardware.
:::

:::tip
For more information see [Bootloader Update](../advanced_config/bootloader_update.md).
:::

## 更多信息

* [QGroundControl User Guide > Firmware](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html).
* [PX4 Setup Video](https://youtu.be/91VGmdSlbo4) (Youtube)