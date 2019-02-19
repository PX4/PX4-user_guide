# 加载固件

*QGroundControl* **桌面** 版本可用于在 [Pixhawk-系列](../getting_started/flight_controller_selection.md) 飞控板上安装 PX4 固件。

> **Caution** **在开始安装固件前** 到您的飞行器的所有USB连接必须是*断开* 的 (直接或通过遥测无线电)。 飞行器必须 *不能* 由电池供电。

安装最新固件更新:

1. 首先在顶部工具栏中选择 **齿轮** 图标 (*Vehicle Setup*) ，然后在侧边栏中选择 **Firmware** 。
    
    ![固件未连接](../../assets/qgc/setup/firmware/firmware_disconnected.jpg)

2. 通过 USB 将飞行控制器直接连接到您的计算机。
    
    > **Note** 直接连接到计算机上的 USB 端口 (不要通过 USB 集线器连接)。

3. 一旦连接到控制器，您就可以选择要加载的固件( *QGroundControl* 根据连接的硬件显示合理的选项)。

* 选择 **PX4 Flight Stack XXX Release** 选项， *为您的硬件* (自动检测) 安装最新稳定版本的 PX4 。
    
    ![默认安装 PX4](../../assets/qgc/setup/firmware/firmware_connected_default_px4.jpg)
    
    > **Tip** 要安装不同版本的 PX4，请查看 **Advanced settings** 并从下拉列表中选择版本。
    > 
    > ![安装 PX4 版本](../../assets/qgc/setup/firmware/qgc_choose_firmware.jpg)
    > 
    > * 如果选择 **Custom firmware file** ，则需要在下一步中从文件系统中选择自定义固件。

1. 点击 **OK** 按钮开始更新固件。
    
    然后，固件将进行一系列升级步骤 (下载新固件，删除旧固件等)。 每个步骤都打印到屏幕上，整个进度显示在进度条上。
    
    ![固件升级完成](../../assets/qgc/setup/firmware/firmware_upgrade_complete.jpg)
    
    一旦固件完成加载，设备/飞行器将重新启动和重新连接。

接下来，您需要指定 [飞行器机架](../config/airframe.md) (然后是传感器、无线电等等)。

> **Tip** 如果 *QGroundControl* 安装 FMUv2 目标(请参阅安装期间的控制台)，并且你有一个更新的飞控板，则可能需要更新 bootloader，以访问飞行控制器上的所有内存。 有关更多信息，请参见[Bootloader更新](../advanced_config/bootloader_update.md)。

## 更多信息：

* [QGroundControl 用户指南>固件](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html)。
* [PX4 设置视频](https://youtu.be/91VGmdSlbo4) (Youtube)