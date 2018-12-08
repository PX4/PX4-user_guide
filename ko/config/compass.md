# 보정

The compass calibration process configures all connected internal and external [magnetometers](../gps_compass/README.md). *QGroundControl* will guide you to position the vehicle in a number of set orientations and rotate the vehicle about the specified axis.

> **Note** If you are using an external magnetometer/compass (e.g. a compass integrated into a GPS module) make sure you mount the external compass on your vehicle properly and connect it to the autopilot hardware. GPS+내포장을 연결하는 방법은 특정 오토파일럿 하드웨어의 [ 기본 어셈블리 ](../assembly/README.md)에서 확인할 수 있습니다. Once connected, QGroundControl will automatically detect the external magnetometer.

## 보정 수행

보정 단계는 다음과 같습니다:

1. *QGroundControl *을 시작하고 차량을 연결합니다.
2. 상단 툴바에서 ** 기어 </ 0> 아이콘 (차량 설정) 을 선택한 다음 사이드 바에서 ** 센서 </ 0>를 선택하십시오.</li> 
    
    * **Compass** 센서 버튼을 클릭합니다.
        
        ![Compass calibration PX4를 선택합니다.](../../images/qgc/setup/sensor_compass_select_px4.jpg)
        
        > ** 참고 </ 0> 미리  자동 조종 방향 </ 1>을 설정해야합니다. 그렇지 않은 경우 여기에서 설정할 수도 있습니다.</p> </blockquote></li> 
        > 
        > * 보정을 시작하려면 ** 확인 </ 0>을 클릭하십시오.</p></li> 
        >     
        >     * 빨간색(불완전)으로 표시된 방향으로 차량을 배치하고 그대로 유지합니다. 메시지가 표시되면(방향 이미지가 노란색으로 변함) 차량을 지정된 축을 기준으로 한 방향으로 회전시킵니다. 현재 방향에 대해 보정이 완료되면 화면의 보정 관련 이미지가 녹색으로 바뀝니다.
        >         
        >         ![PX4에 대한 보정 단계 로드](../../images/qgc/setup/sensor_compass_calibrate_px4.jpg)
        >     
        >     * 차량의 모든 방향에 대해 보정 과정을 반복합니다.</ol> 
        >     
        >     * QGroundControl </ 0> 위치에 차량을 보정하면 * 보정 완료 </ 0>가 표시됩니다 (모든 방향 이미지가 녹색으로 표시되고 진행 표시 줄이 완전히 채워짐). 그리고 다음 센서로 이동할 수 있습니다.</p> 
        >     
        >     ## 추가 정보
        >     
        >     * [QGroundControl 사용 설명서 > 센서](https://docs.qgroundcontrol.com/en/SetupView/Sensors.html#px4-compass-calibration)
        >     * [PX4 설정 비디오 - @2m38s](https://youtu.be/91VGmdSlbo4?t=2m38s) (유튜브)