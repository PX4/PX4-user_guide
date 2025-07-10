---
canonicalUrl: https://docs.px4.io/main/tr/advanced_config/bootloader_update
---

# Bootloader Update

The [PX4 bootloader](https://github.com/PX4/Bootloader) is used to load firmware for Pixhawk boards (PX4FMU, PX4IO) and [PX4FLOW](../sensor/px4flow.md).

This topic explains several methods for updating the Pixhawk bootloader.

:::note
Hardware usually comes with an appropriate bootloader version pre-installed. A case where you may need to update is newer Pixhawk boards that install FMUv2 firmware: [Firmware > FMUv2 Bootloader Update](../config/firmware.md#bootloader).
:::

## Building the new PX4 bootloader yourself

Boards starting with FMUv6X (STM32H7) use the in-tree PX4 bootloader. Older boards use the bootloader from the legacy [PX4 bootloader](https://github.com/PX4/Bootloader) repository. Please refer to the instructions in the README to learn how to use it.

Build the new bootloader in the PX4-Autopilot folder with:

    make px4_fmu-v6x_bootloader
    

Which will build the bootloader binary as `build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf` which can be flashed via SWD or DFU. If you are building the bootloader you should be familiar with one of these options already.

If you need a HEX file instead of an ELF file, use objcopy:

    arm-none-eabi-objcopy -O ihex build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf px4_fmu-v6x_bootloader.hex
    

<span id="qgc_bootloader_update"></span>

## QGroundControl Bootloader Update

The easiest approach is to first use *QGroundControl* to install firmware with the desired/latest bootloader. You can then initiate bootloader update on next restart by setting the parameter: [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).

:::note
This approach can only be used if [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE) is present in firmware (currently just FMUv2 and some custom firmware).
:::

The steps are:

1. Insert an SD card (enables boot logging to debug any problems).
2. [Update the Firmware](../config/firmware.md#custom) with an image containing the new/desired bootloader. :::note The updated bootloader might be supplied in custom firmware (i.e. from the dev team), or it or may be included in the latest master.
:::
    
    ![FMUv2 update](../../assets/qgc/setup/firmware/bootloader_update.jpg)

3. Wait for the vehicle to reboot.

4. [Find and enable](../advanced_config/parameters.md) the parameter [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).
5. Reboot (disconnect/reconnect the board). The bootloader update will only take a few seconds.

Generally at this point you may then want to [update the firmware](../config/firmware.md) again using the correct/newly installed bootloader.

<span id="dronecode_probe"></span>

### Dronecode Probe Bootloader Update

The following steps explain how you can "manually" update the bootloader using the dronecode probe:

1. Get a binary containing the bootloader (either from dev team or build it yourself).
2. Connect the Dronecode probe to your PC via USB. 
3. Go into the directory containing the binary and run the following command in the terminal: 
        bash
        arm-none-eabi-gdb px4fmuv5_bl.elf

4. The *gdb terminal* appears and it should display the following output: 
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

5. Find your `<dronecode-probe-id>` by running an ls command in the **/dev/serial/by-id** directory.
6. Now connect to the Dronecode probe with the following command: ```tar ext /dev/serial/by-id/<dronecode-probe-id>```
7. Power on the Pixhawk with another USB cable and connect the Dronecode probe to the FMU-DEBUG port.
    
:::note
To be able to connect the Dronecode probe to the FMU-DEBUG port, you may need to remove the case (e.g. on Pixhawk 4 you would do this using a T6 Torx screwdriver).
:::

8. Use the following command to scan for the Pixhawk’s swd and connect to it:
    
        (gdb) mon swdp_scan
        (gdb) attach 1
        

9. Load the binary into the Pixhawk: ```(gdb) load```

After the bootloader has updated you can [Load PX4 Firmware](../config/firmware.md) using *QGroundControl*.

## Other Boards (Non-Pixhawk)

Boards that are not part of the [Pixhawk Series](../flight_controller/pixhawk_series.md) will have their own mechanisms for bootloader update.

For boards that are preflashed with Betaflight, see [Bootloader Flashing onto Betaflight Systems](bootloader_update_from_betaflight.md).