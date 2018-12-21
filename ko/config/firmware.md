# 펌웨어 로드

*QGroundControl* **데스크톱** 버전 [Pixhawk 시리즈](../getting_started/flight_controller_selection.md) 비행 컨트롤러 보드 PX4 펌웨어 설치를 사용할 수 있습니다.

> **주의사항 ** </strong>펌웨어를 설치하기 전에 차량에 대한 모든 USB 연결은 * 연결 해제 *여야 합니다(직접 또는 원격 측정 라디오). 차량은 배터리로 전원을 공급받으면 안 된다.

최신 펌웨어 업데이트를 설치하려면:

1. 상단 툴바에서 ** 기어 </ 0> 아이콘 (차량 설정) 을 선택한 다음 사이드 바에서 ** 펌웨어 </ 0>를 선택하십시오.</p> 
    
    ![펌웨어가 분리됨](../../assets/qgc/setup/firmware/firmware_disconnected.jpg)</li> 
    
    * USB를 통해 비행 컨트롤러를 컴퓨터에 직접 연결합니다.
        
        > ** 주**컴퓨터에서 전원이 공급되는 USB 포트에 직접 연결합니다(USB 허브를 통해 연결하지 마십시오).
    
    * 컨트롤러가 연결되면 로드할 펌웨어를 선택할 수 있습니다(QGroundControl은 연결된 하드웨어를 기반으로 합리적인 옵션을 제공합니다).</ol> 
    
    * **PX4 Flight Stack XXX Release ** 옵션을 선택하여 하드웨어 </em>에 대한 최신 안정적인 PX4 * 버전을 설치합니다(자동 감지됨).</p> 
        
        ![PX4 설치 기본값](../../assets/qgc/setup/firmware/firmware_connected_default_px4.jpg)
        
        > 다른 버전의 PX4를 설치하려면 ** 고급 설정 **을 선택하고 드롭다운 목록에서 버전을 선택합니다.
        > 
        > ![PX4 버전 설치](../../assets/qgc/setup/firmware/qgc_choose_firmware.jpg)
        > 
        > * ** 사용자 정의 펌웨어 파일 **을 선택한 경우 다음 단계에서 파일 시스템에서 사용자 정의 펌웨어를 선택해야 합니다.</li> </ul> 
        
        1. 업데이트를 시작하려면 ** OK ** 버튼을 클릭하십시오.
            
            그러면 펌웨어가 여러 업그레이드 단계(새 펌웨어 다운로드, 이전 펌웨어 삭제 등)를 진행합니다. 각 단계 화면을 인쇄 하 고 전반적인 진행률은 진행률 표시줄에 표시 됩니다.
            
            ![펌웨어 업그레이드 완료](../../assets/qgc/setup/firmware/firmware_upgrade_complete.jpg)
            
            펌웨어의 로드가 완료되면 장치/차량이 재부팅되고 다시 연결됩니다.
        
        다음으로 [ 차량 에어프레임 ](../config/airframe.md)을 지정해야 합니다(그리고 센서, 라디오 등).
        
        > **팁** *QGroundControl* FMUv2 대상 설치 (설치 하는 동안 콘솔 참조) 하 고 새로운 보드, 비행 컨트롤러에서 모든 메모리를 액세스 하려면 부트 로더를 업데이트 해야 할 수 있습니다. 자세한 내용은 [부트 로더 업데이트](../advanced_config/bootloader_update.md)를 참조 하십시오.
        
        ## Further Information
        
        * [QGroundControl 사용 설명서 > 펌웨어](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html).
        * [PX4 설정 비디오 ](https://youtu.be/91VGmdSlbo4) (유튜브)