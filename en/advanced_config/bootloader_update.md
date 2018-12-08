# Bootloader Update

Early [Pixhawk-series](../flight_controller/pixhawk_series.md#fmu-versions) flight controllers based on FMUv2 had a hardware issue ([Silicon Errata](../flight_controller/silicon_errata.md#fmuv2--pixhawk-silicon-errata)) that restricted them to using 1MB of flash memory. 
The problem was fixed on newer hardware, so it can now (in theory) install FMUv3 Firmware and access all 2MB available memory.

Unfortunately some boards come from the factory with an old bootloader that is unable to detect whether or not the hardware issue is present. 
As a result, the memory-restricted FMUv2 Firmware must still be used.

This topic explains how you can update the bootloader to the latest version so that you can use FMUv3 Firmware on compatible boards.


### Main Steps

You can initiate bootloader update on next restart by setting the parameter: [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).

To update the bootloader:

1. Insert an SD card (enables boot logging to debug any problems.)
1. [Update the Firmware](../config/firmware.md) to PX4 *master* version (when updating the firmware, check **Advanced settings** and then select **Developer Build (master)** from the dropdown list).
   *QGroundControl* will automatically detect that the hardware supports FMUv2 and install the appropriate Firmware.
   
   ![FMUv2 update](../../assets/qgc/setup/firmware/bootloader_update.jpg)
   
   Wait for the vehicle to reboot.
1. [Find and enable](../advanced_config/parameters.md#parameter-configuration) the parameter [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).
1. Reboot (disconnect/reconnect the board). 
   The bootloader update will only take a few seconds.
1. Then [Update the Firmware](../config/firmware.md) again. 
   This time *QGroundControl* should autodetect the hardware as FMUv3 and update the Firmware appropriately.

   ![FMUv3 update](../../assets/qgc/setup/firmware/bootloader_fmu_v3_update.jpg)

   > **Note** If the hardware has the *Silicon Errata* it will still be detected as FMUv2 and you will see that FMUv2 was re-installed (in console). 
     In this case you will not be able to install FMUv3 hardware.
