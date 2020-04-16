# 부트로더 업데이트

[PX4 부트로더](https://github.com/PX4/Bootloader)는 픽스호크 보드(PX4FMU, PX4IO)와 PX4FLOW에 펌웨어를 불러오는 데 사용됩니다.

이 섹션에서는 픽스호크 부트로더를 업데이트하는 여러 방법에 대해 설명합니다.

> **Note** 하드웨어에는 보통 적정 버전의 부트로더가 미리 설치되어 제공됩니다. FMUv2 펌웨어가 설치된 최신 버전의 픽스호크 보드를 업데이트해야 하는 경우에는 다음을 참고하십시오: [펌웨어 > FMUv2 부트로더 업데이트](../config/firmware.md#bootloader)

## QGroundControl 부트로더 업데이트 {#qgc_bootloader_update}

*Qgroundcontrol*을 사용해 적절한/최신 버전의 펌웨어를 설치하는 것이 가장 쉬운 방법입니다. [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE) 매개변수를 설정하여 다음 재시작시 부트로더 업데이트를 시작할 수 있습니다.

> **Note** 이 방법은 펌웨어에 매개변수 [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE)가 있을 때만 사용할 수 있습니다. ( 현재는 FMUv2와 일부 커스텀 펌웨어에서만 사용 가능합니다.)

단계는 다음과 같습니다:

1. SD카드를 삽입합니다 (발생할 수 있는 문제들의 디버그를 위한 부트 로그 기록을 가능하게 합니다.)
2. 적절한 부트로더를 포함하는 이미지를 사용하여 [펌웨어를 업데이트](../config/firmware.md#custom)합니다.
    
    > **팁** 업데이트된 부트로더는 커스텀 펌웨어 (예 - 개발 팀 펌웨어)나 최신 마스터 버전일 수 있습니다.
    
    ![FMUv2 업데이트](../../assets/qgc/setup/firmware/bootloader_update.jpg)

3. 기체가 재부팅 될 때까지 기다리십시오.

4. [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE) 파라미터를 [찾아서 활성화](../advanced_config/parameters.md) 하십시오.
5. 재부팅하십시오 (보드의 연결을 끊고 다시 연결하십시오.). 부트로더 업데이트는 수 초 안에 완료됩니다.

일반적으로 이 단계에서 올바른/새 부트로더를 사용하여 다시 [펌웨어를 업데이트](../config/firmware.md) 할 수 있습니다.

### Dronecode Probe 부트로더 업데이트 {#dronecode_probe}

아래 단계는 dronecode probe를 사용하여 수동으로 부트로더를 업데이트 하는 방법을 설명합니다:

1. 부트로더를 포함한 바이너리를 만드십시오 (개발자 팀에서 다운받거나, 직접 소스를 빌드하십시오).
2. USB로 컴퓨터와 Dronecode probe를 연결하십시오. 
3. 바이너리가 들어 있는 디렉토리에서 아래 커맨드를 터미널에 입력하십시오. 
        cmd
        arm-none-eabi-gdb px4fmuv5_bl.elf

4. *gdb terminal*이 나타나고, 아래와 같은 결과를 출력합니다. 
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

5. **/dev/serial/by-id** 디렉토리에서 ls 커맨드를 입력해 `<dronecode-probe-id>`를 찾으십시오.
6. 아래 커맨드로 Dronecode probe에 연결하십시오: ```tar ext /dev/serial/by-id/<dronecode-probe-id>```
7. Pixhawk를 다른 USB 케이블로 전원을 넣고, FMU-DEBUG 포트로 Dronecode probe에 연결하십시오.
    
    > **참고** FMU-DEBUG 포트로 Dronecode probe에 연결하려면, 하우징 케이스를 제거해야 할 수도 있습니다 (예. Pixhawk4의 경우 %t Torx 스크류 드라이버를 사용할 수 있습니다).

8. 아래 커맨드로 Pixhawk의 swd를 스캔하고 연결하십시오:
    
        (gdb) mon swdp_scan
        (gdb) attach 1
        

9. 이제 바이너리를 픽스호크에 로드하십시오: ```(gdb) load```

부트로더가 업데이트된 후 이제 *Qgroundcontrol*을 통해 [PX4 펌웨어를 불러올 수 있습니다](../config/firmware.md).

## 다른 보드 (Non-Pixhawk) {#non-pixhawk}

[Pixhawk Series](../flight_controller/pixhawk_series.md)에 포함되지 않은 보드들은 고유의 부트로더 업데이트 메커니즘을 가질 수 있습니다.

Betaflight 로 미리 플래쉬 되어 있는 보드의 경우, [Bootloader Flashing onto Betaflight Systems](bootloader_update_from_betaflight.md)을 확인하십시오.