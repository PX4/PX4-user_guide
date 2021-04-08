# 부트로더 업데이트

[PX4 부트로더](https://github.com/PX4/Bootloader)는 픽스호크 보드(PX4FMU, PX4IO)와 PX4FLOW에 펌웨어를 불러오는 데 사용됩니다.

이 절에서는 픽스호크 부트로더를 업데이트하는 여러가지 방법을 설명합니다.

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

1. SD카드를 삽입합니다 (발생할 수 있는 문제들의 디버그를 위한 부트 로그 기록을 가능하게 합니다.)
2. [Update the Firmware](../config/firmware.md#custom) with an image containing the new/desired bootloader. :::note The updated bootloader might be supplied in custom firmware (i.e. from the dev team), or it or may be included in the latest master.
:::
    
    ![FMUv2 업데이트](../../assets/qgc/setup/firmware/bootloader_update.jpg)

3. 기체가 재부팅 될 때까지 기다리십시오.

4. [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE) 파라미터를 [찾아서 활성화](../advanced_config/parameters.md) 하십시오.
5. 재부팅하십시오 (보드의 연결을 끊고 다시 연결하십시오.). 부트로더 업데이트는 수 초 안에 완료됩니다.

Generally at this point you may then want to [update the firmware](../config/firmware.md) again using the correct/newly installed bootloader.

<span id="dronecode_probe"></span>

### Dronecode Probe Bootloader Update

The following steps explain how you can "manually" update the bootloader using the dronecode probe:

1. 부트로더를 포함한 바이너리를 만드십시오 (개발자 팀에서 다운받거나, 직접 소스를 빌드하십시오).
2. USB로 컴퓨터와 Dronecode probe를 연결하십시오. 
3. 바이너리가 들어 있는 디렉토리에서 아래 커맨드를 터미널에 입력하십시오. 
        bash
        arm-none-eabi-gdb px4fmuv5_bl.elf

4. *gdb terminal*이 나타나고, 아래와 같은 결과를 출력합니다. 
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

5. **/dev/serial/by-id** 디렉토리에서 ls 커맨드를 입력해 `<dronecode-probe-id>`를 찾으십시오.
6. 아래 커맨드로 Dronecode probe에 연결하십시오: ```tar ext /dev/serial/by-id/<dronecode-probe-id>```
7. Pixhawk를 다른 USB 케이블로 전원을 넣고, FMU-DEBUG 포트로 Dronecode probe에 연결하십시오.
    
:::note
To be able to connect the Dronecode probe to the FMU-DEBUG port, you may need to remove the case (e.g. on Pixhawk 4 you would do this using a T6 Torx screwdriver).
:::

8. 아래 커맨드로 Pixhawk의 swd를 스캔하고 연결하십시오:
    
        (gdb) mon swdp_scan
        (gdb) attach 1
        

9. 이제 바이너리를 픽스호크에 로드하십시오: ```(gdb) load```

After the bootloader has updated you can [Load PX4 Firmware](../config/firmware.md) using *QGroundControl*.

## Other Boards (Non-Pixhawk)

Boards that are not part of the [Pixhawk Series](../flight_controller/pixhawk_series.md) will have their own mechanisms for bootloader update.

For boards that are preflashed with Betaflight, see [Bootloader Flashing onto Betaflight Systems](bootloader_update_from_betaflight.md).