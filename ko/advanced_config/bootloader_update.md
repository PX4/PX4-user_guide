# 부트로더 업데이트

[PX4 부트로더](https://github.com/PX4/Bootloader)는 픽스호크 보드(PX4FMU, PX4IO)와 PX4FLOW에 펌웨어를 불러오는 데 사용됩니다.

이 섹션에서는 픽스호크 부트로더를 업데이트하는 여러 방법에 대해 설명합니다.

> **Note** 하드웨어는 보통 적정 버전의 부트로더가 미리 설치되어 있습니다. FMUv2 펌웨어가 설치된 픽스호크 보드를 업데이트해야 하는 경우라면 다음과 같이 업데이트 할 수 있습니다: [펌웨어 > FMUv2 부트로더 업데이트](../config/firmware.md#bootloader)

## QGroundControl 부트로더 업데이트 {#qgc_bootloader_update}

*Qgroundcontrol*을 사용해 적절한/최신 버전의 펌웨어를 설치하는 방법이 가장 쉽습니다. [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE) 매개변수를 설정해 다음 재시작시 부트로더 업데이트를 시작할 수 있습니다.

> **Note** 이 방법은 펌웨어에 매개변수 [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)가 있을 때만 사용할 수 있습니다. 현재는 FMUv2와 커스텀 펌웨어 일부에서만 사용 가능합니다.

단계는 다음과 같습니다:

1. SD카드를 삽입합니다 (발생할 수 있는 문제들의 디버그를 위한 부트 로그 기록을 가능하게 합니다.)
2. 새로운/적절한 부트로더를 포함하는 이미지로 [부트로더를 업데이트](../config/firmware.md#custom)합니다.
    
    > **Tip** The updated bootloader might be supplied in custom firmware (i.e. from the dev team), or it or may be included in the latest master.
    
    ![FMUv2 업데이트](../../assets/qgc/setup/firmware/bootloader_update.jpg)

3. Wait for the vehicle to reboot.

4. [Find and enable](../advanced_config/parameters.md#parameter-configuration) the parameter [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).
5. Reboot (disconnect/reconnect the board). The bootloader update will only take a few seconds.

Generally at this point you may then want to [update the firmware](../config/firmware.md) again using the correct/newly installed bootloader.

### Dronecode Probe Bootloader Update {#dronecode_probe}

The following steps explain how you can "manually" update the bootloader using the dronecode probe:

1. Get a binary containing the bootloader (either from dev team or build it yourself).
2. Connect the Dronecode probe to your PC via USB. 
3. Go into the directory containing the binary and run the following command in the terminal: 
        cmd
        arm-none-eabi-gdb px4fmuv5_bl.elf

4. The *gdb terminal* appears and it should display the following output: 
        cmd
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
    
    > **Note** To be able to connect the Dronecode probe to the FMU-DEBUG port, you may need to remove the case (e.g. on Pixhawk 4 you would do this using a T6 Torx screwdriver).

8. Use the following command to scan for the Pixhawk’s swd and connect to it:
    
        (gdb) mon swdp_scan
        (gdb) attach 1
        

9. Load the binary into the Pixhawk: ```(gdb) load```

After the bootloader has updated you can [Load PX4 Firmware](../config/firmware.md) using *QGroundControl*.

## Other Boards (Non-Pixhawk) {#non-pixhawk}

Boards that are not part of the [Pixhawk Series](../flight_controller/pixhawk_series.md) will have their own mechanisms for bootloader update.

These will be documented (where relevant) with the board:

- [Omnibus F4 SD > PX4 Bootloader Update](../flight_controller/omnibus_f4_sd.md#upload)