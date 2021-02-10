# 펌웨어 설치 및 업데이트

*QGroundControl* **데스크톱** 버전을 사용하여 [Pixhawk 시리즈](../getting_started/flight_controller_selection.md) 비행 컨트롤러에 PX4 펌웨어를 설치할 수 있습니다.

:::caution
**펌웨어 설치 시작전에** 차량의 모든 USB* 연결을 해제 *하여야 합니다 (직접 또는 원격 측정 라디오를 통해). 기체에 배터리 전원 연결을 *중지*하여야 합니다.
:::

## PX4 안정 버전 설치

가장 최근에 출시 된 PX4 버전은 알려진 버그의 수정되었고 최신 기능을 지원합니다.

:::tip
안정 버전은 기본적으로 설치되는 버전입니다.
:::

PX4 설치

1. 상단 툴바에서 **기어** 아이콘 (기체 설정) 을 선택한 다음 사이드 바에서 **펌웨어**를 선택하십시오.
    
    ![펌웨어가 분리됨](../../assets/qgc/setup/firmware/firmware_disconnected.jpg)

2. USB를 통해 비행 컨트롤러를 컴퓨터에 직접 연결합니다.
    
:::note
주컴퓨터에서 전원이 공급되는 USB 포트에 직접 연결합니다(USB 허브를 통해 연결하지 마십시오).
:::

3. **PX4 Flight Stack X.x.x Release ** 옵션을 선택하여 하드웨어 </em>에 대한 최신 안정 PX4 * 버전을 설치합니다(자동 감지됨).</p> 
    
    ![Install PX4 default](../../assets/qgc/setup/firmware/firmware_connected_default_px4.jpg)</li> 
    
    * 업데이트를 시작하려면 **OK** 버튼을 클릭하십시오.
        
        펌웨어가 업그레이드(펌웨어 다운로드, 이전 펌웨어 삭제 등)를 진행합니다. 각 단계 화면을 표출하고, 전체 진행률을 표시줄에 출력합니다.
        
        ![Firmware upgrade complete](../../assets/qgc/setup/firmware/firmware_upgrade_complete.jpg)
        
        펌웨어의 업로드가 완료되면 장치가 재부팅되고 다시 연결됩니다.
        
:::tip
*QGroundControl* FMUv2 대상 설치(설치 하는 동안 콘솔 참조) 하고 새로운 보드, 비행 컨트롤러에서 모든 메모리를 액세스 하려면 [부트 로더를 업데이트](#bootloader) 하여야 합니다. :::</ol> 
    
    다음으로 [기체 프레임](../config/airframe.md)을 지정해야 합니다(그리고 센서, 라디오 등).
    
    

<span id="custom"></span>

    
    ## PX4 마스터, 베타 또는 사용자 지정 펌웨어 설치
    
    다른 버전의 PX4 설치
    
    1. 위와 같이 기체를 연결하고 **PX4 Flight Stack vX.x.x Stable Release**를 선택합니다. ![Install PX4 version](../../assets/qgc/setup/firmware/qgc_choose_firmware.jpg)
    2. **고급 설정**을 선택하고 드롭 다운 목록에서 설치할 버전을 선택합니다. 
        * **표준 버전 (안정) :** 기본 버전 (즉, 설치를 위해 고급 설정을 사용할 필요가 없습니다!)
        * **베타 테스트 (베타):** 베타/후보 버전입니다. 신규 버전 출시 이전에 테스트 할 경우에만 사용할 수 있습니다.
        * **개발자 빌드 (마스터) :** PX4 / PX4-Autopilot의 최신 빌드입니다.
        * **사용자 지정 펌웨어 파일 ... :** 사용자 지정 펌웨어 파일 (예 : 로컬에서 빌드 한 파일). 사용자 정의 펌웨어 파일을 선택한 경우 다음 단계에서 파일 시스템에서 사용자 정의 펌웨어를 선택하여야 합니다.
    
    그러면 펌웨어 업데이트가 이전과 같이 계속됩니다.
    
    

<span id="bootloader"></span>

    
    ## FMUv2 부트로더 업데이트
    
    If *QGroundControl* installs the FMUv2 target (see console during installation), and you have a newer board, you may need to update the bootloader in order to access all the memory on your flight controller.
    
:::note
Early FMUv2 [Pixhawk-series](../flight_controller/pixhawk_series.md#fmu_versions) flight controllers had a [hardware issue](../flight_controller/silicon_errata.md#fmuv2--pixhawk-silicon-errata) that restricted them to using 1MB of flash memory. The problem is fixed on newer boards, but you may need to update the factory-provided bootloader in order to install FMUv3 Firmware and access all 2MB available memory.
:::
    
    To update the bootloader:
    
    1. Insert an SD card (enables boot logging to debug any problems).
    2. [Update the Firmware](../config/firmware.md) to PX4 *master* version (when updating the firmware, check **Advanced settings** and then select **Developer Build (master)** from the dropdown list). *QGroundControl* will automatically detect that the hardware supports FMUv2 and install the appropriate Firmware.
        
        ![FMUv2 update](../../assets/qgc/setup/firmware/bootloader_update.jpg)
        
        Wait for the vehicle to reboot.
    
    3. [Find and enable](../advanced_config/parameters.md) the parameter [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).
    
    4. Reboot (disconnect/reconnect the board). The bootloader update will only take a few seconds.
    5. Then [Update the Firmware](../config/firmware.md) again. This time *QGroundControl* should autodetect the hardware as FMUv3 and update the Firmware appropriately.
        
        ![FMUv3 update](../../assets/qgc/setup/firmware/bootloader_fmu_v3_update.jpg)
        
:::note
If the hardware has the *Silicon Errata* it will still be detected as FMUv2 and you will see that FMUv2 was re-installed (in console). In this case you will not be able to install FMUv3 hardware.
:::
    
:::tip
For more information see [Bootloader Update](../advanced_config/bootloader_update.md).
:::
    
    ## Further Information
    
    * [QGroundControl User Guide > Firmware](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html).
    * [PX4 Setup Video](https://youtu.be/91VGmdSlbo4) (Youtube)