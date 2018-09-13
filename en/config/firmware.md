# Loading Firmware

*QGroundControl* **desktop** versions can be used to install PX4 firmware onto [Pixhawk-series](../getting_started/flight_controller_selection.md) flight-controller boards. 

> **Caution** **Before you start installing Firmware** all USB connections to you vehicle must be *disconnected* (both direct or through a telemetry radio). The vehicle must *not be* powered by a battery.

To install the latest firmware update:

1. First select the **Gear** icon (*Vehicle Setup*) in the top toolbar and then **Firmware** in the sidebar. 

  ![Firmware disconnected](../../assets/qgc/setup/firmware/firmware_disconnected.jpg)

1. Connect the flight controller directly to your computer via USB. 

   > **Note** Connect directly to a powered USB port on your machine (do not connect through a USB hub).

1. Once the controller is connected you can choose which firmware to load (*QGroundControl* presents sensible options based on the connected hardware). Select the **PX4 Flight Stack XXX Release** option to install the latest stable version of PX4.
   
   ![Install PX4 default](../../assets/qgc/setup/firmware/firmware_connected_default_px4.jpg)
   
   > **Tip** To install a different version of PX4, check **Advanced settings** and select the version from the dropdown list.
   >
   > ![Install PX4 version](../../assets/qgc/setup/firmware/qgc_choose_firmware.jpg)
   >
   >   * If you select **Custom firmware file** you will need to choose the custom firmware from the file system in the next step.

1. Click the **OK** button to start the update.

   The firmware will then proceed through a number of upgrade steps (downloading new firmware, erasing old firmware etc.). 
   Each step is printed to the screen and overall progress is displayed on a progress bar.
   
   ![Firmware upgrade complete](../../assets/qgc/setup/firmware/firmware_upgrade_complete.jpg)
   
   Once the firmware has completed loading, the device/vehicle will reboot and reconnect.

Next you will need to specify the [vehicle airframe](../config/airframe.md) (and then sensors, radio, etc.)



> **Tip** If *QGroundControl* installs the FMUv2 target (see console during installation) and you have a newer board, you may need to update the bootloader in order to access all the memory on your flight controller. See [Bootloader Update](../advanced_config/bootloader_update.md) for more information.


## Further Information

* [QGroundControl User Guide > Firmware](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html).
* [PX4 Setup Video](https://youtu.be/91VGmdSlbo4) (Youtube)

