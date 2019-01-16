# 加载固件

*QGroundControl* **桌面** 版本可用于在 [Pixhawk-系列](../getting_started/flight_controller_selection.md) 飞控板上安装 PX4 固件。

> **注意** **在开始安装固件前** 到您的飞行器的所有USB连接必须是*断开* 的 (直接或通过遥测无线电)。 飞行器必须 *不能* 由电池供电。

安装最新固件更新:

1. 首先在顶部工具栏中选择 **齿轮** 图标 (*Vehicle Setup*) ，然后在侧边栏中选择 **Firmware** 。
    
    ![Firmware disconnected](../../assets/qgc/setup/firmware/firmware_disconnected.jpg)

2. 通过 USB 将飞行控制器直接连接到您的计算机。
    
    > **Note** Connect directly to a powered USB port on your machine (do not connect through a USB hub).

3. Once the controller is connected you can choose which firmware to load (*QGroundControl* presents sensible options based on the connected hardware).

* Select the **PX4 Flight Stack XXX Release** option to install the latest stable version of PX4 *for your hardware* (autodetected).
    
    ![Install PX4 default](../../assets/qgc/setup/firmware/firmware_connected_default_px4.jpg)
    
    > **Tip** To install a different version of PX4, check **Advanced settings** and select the version from the dropdown list.
    > 
    > ![Install PX4 version](../../assets/qgc/setup/firmware/qgc_choose_firmware.jpg)
    > 
    > * If you select **Custom firmware file** you will need to choose the custom firmware from the file system in the next step.

1. Click the **OK** button to start the update.
    
    The firmware will then proceed through a number of upgrade steps (downloading new firmware, erasing old firmware etc.). Each step is printed to the screen and overall progress is displayed on a progress bar.
    
    ![Firmware upgrade complete](../../assets/qgc/setup/firmware/firmware_upgrade_complete.jpg)
    
    Once the firmware has completed loading, the device/vehicle will reboot and reconnect.

Next you will need to specify the [vehicle airframe](../config/airframe.md) (and then sensors, radio, etc.)

> **Tip** If *QGroundControl* installs the FMUv2 target (see console during installation) and you have a newer board, you may need to update the bootloader in order to access all the memory on your flight controller. See [Bootloader Update](../advanced_config/bootloader_update.md) for more information.

## 更多信息：

* [QGroundControl User Guide > Firmware](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html).
* [PX4 Setup Video](https://youtu.be/91VGmdSlbo4) (Youtube)