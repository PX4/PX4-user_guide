# Bootloader Update

Early [Pixhawk-series](../flight_controller/pixhawk_series.md#fmu-versions) flight controllers based on FMUv2 had a hardware issue ([Silicon Errata](../flight_controller/silicon_errata.md#fmuv2--pixhawk-silicon-errata)) that restricted them to using 1MB of flash memory. 
The problem was fixed on newer hardware, so it can now (in theory) install FMUv3 Firmware and access all 2Mb available memory.

Unfortunately some boards come from the factory with an old bootloader that is unable to detect whether or not the hardware issue is present. 
As a result, the memory-restricted FMUv2 Firmware must still be used.

This topic explains how you can update the bootloader to the latest version so that you can use FMUv3 Firmware on compatible boards.


### Main Steps

You can initiate bootloader update on next restart by [setting the parameter](../advanced_config/parameters.md#parameter-configuration): [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).

To update the bootloader:

1. Insert an SD card (enables boot logging to debug any problems.)
1. Flash master of `fmu-v2 target` (e.g. through QGC)
   ![FMUv2 update](https://user-images.githubusercontent.com/13203106/45455962-cff71f80-b69d-11e8-8b90-cfce2be689b1.JPG)
1. Enable [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)
1. Reboot & Wait.
1. Then [Update the Firmware](../config/firmware.md) to FMU-V3. This time you should note that the Firmware is detected as FMUv3.

   ![7](https://user-images.githubusercontent.com/13203106/45455986-ee5d1b00-b69d-11e8-9ee0-75df46a7b432.JPG)

   > **Note** If the hardware has the *Silicon Errata* it will still be detected as FMUv2 (see console above) and you will not be able to install FMUv3 hardware.
