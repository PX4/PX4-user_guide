# 加载固件

*QGroundControl* **桌面** 版本可用于在 [Pixhawk-系列](../getting_started/flight_controller_selection.md) 飞控板上安装 PX4 固件。

> **Caution** **在开始安装固件前** 飞行器的所有USB连接必须 *断开* （包括直接连接或通过数传连接）。 飞行器必须 *不能* 由电池供电。

## 安装稳定的PX4版本

通常您应该使用最新 *发布* PX4版本，以便修复错误并获得最新的功能。

> **Tip** 这是默认安装的版本。

如何安装PX4：

1. 首先在顶部工具栏中选择 **齿轮** 图标 (*Vehicle Setup*) ，然后在侧边栏中选择 **Firmware** 。
    
    ![固件断开连接](../../assets/qgc/setup/firmware/firmware_disconnected.jpg)

2. 通过 USB 将飞行控制器直接连接到您的计算机。
    
    > **Note** 直接连接到计算机上的 USB 端口 (不要通过 USB 集线器连接)。

3. 选择 **PX4 飞行栈 X.x.x Release** *为您的硬件*（自动检测）安装最新版的PX4。
    
    ![默认安装 PX4](../../assets/qgc/setup/firmware/firmware_connected_default_px4.jpg)

4. 点击 **OK** 按钮开始更新固件。
    
    然后，固件将进行一系列升级步骤 (下载新固件，删除旧固件等)。 每个步骤都打印到屏幕上，整个进度显示在进度条上。
    
    ![固件升级完成](../../assets/qgc/setup/firmware/firmware_upgrade_complete.jpg)
    
    一旦固件完成加载，设备/飞行器将重新启动和重新连接。
    
    > **Tip** 如果 *QGroundControl* 安装 FMUv2 固件（请参阅安装期间的控制台），并且您有一个更新的飞控板，则可能需要更新[ bootloader](#bootloader)，以访问飞行控制器上的所有内存。

接下来，您需要指定 [飞行器机架](../config/airframe.md) (然后是传感器、数传等)。

## 安装PX4 Master, Beta或自定义固件 {#custom}

安装不同版本的PX4：

1. 如上所述连接飞行器，并选择 **PX4 飞行栈 vX.x.x Stagable Release** ![安装 PX4 版本](../../assets/qgc/setup/firmware/qgc_choose_firmware.jpg)
2. 检查 **高级设置** 并从下拉列表中选择版本： 
    * **标准版本 (稳定)** 默认版本 (即不需要使用高级设置来安装!)
    * **Beta 测试(beta)：** 测试/候选版本。 只有当新版本准备完毕时才可用。
    * **开发者构建 (master)** 最新的PX4/固件。
    * **自定义固件文件..:** 自定义固件文件 (例如，您在本地构建)。 如果选择 Custom firmware file ，您需要在下一步中从文件系统中选择自定义固件。

固件更新和之前一样正常进行。

## FMUv2 Bootloader 更新 {#bootloader}

如果 *QGroundControl* 安装FMUv2 固件（请参阅安装过程中的控制台），并且您有一个更新的飞控板，则可能需要更新bootloader，以访问飞行控制器上的所有内存。

> **Note** Early FMUv2 [Pixhawk-series](../flight_controller/pixhawk_series.md#fmu_versions) flight controllers had a [hardware issue](../flight_controller/silicon_errata.md#fmuv2--pixhawk-silicon-errata) that restricted them to using 1MB of flash memory. 这一问题已在更新的板上修复，但是您可能需要更新工厂提供的bootloader，以便安装FMUv3 固件，并访问所有 2MB 内存。

要更新bootloader，请执行以下操作：

1. 插入 SD 卡（启用引导日志记录，便于调试任何可能的问题。）
2. [更新固件](../config/firmware.md) 至PX4 *master* 版本（当更新固件时，查看 **高级设置** 并从下拉列表选择**Developer Build (master)** ）。 *QGroundControl* 会自动识别到硬件支持 FMUv2，并安装相应的固件。
    
    ![FMUv2 更新](../../assets/qgc/setup/firmware/bootloader_update.jpg)
    
    等待飞控重启。

3. [Find and enable](../advanced_config/parameters.md) the parameter [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).

4. 重新启动（断开/重新连接飞控板）。 Bootloader更新只需要几秒钟即可完成。
5. 然后再重新 [更新固件](../config/firmware.md) 。 这一次 *QGroundControl* 会自动识别到硬件支持 FMUv3，并相应地安装固件。
    
    ![FMUv3 更新](../../assets/qgc/setup/firmware/bootloader_fmu_v3_update.jpg)
    
    > **Note** 如果硬件有 *芯片错误*，它仍将被检测为 FMUv2，你将会（在控制台）看到 FMUv2 被重新安装。 在这种情况下，你将不能安装 FMUv3 固件。

> **Tip** 更多信息见 [Bootloader Update](../advanced_config/bootloader_update.md)。

## 更多信息

* [QGroundControl User Guide > Firmware](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html).
* [PX4 Setup Video](https://youtu.be/91VGmdSlbo4) (Youtube)