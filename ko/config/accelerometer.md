# 가속도 센서

*QGroundControl*은 기체를 다양한 방향으로 놓고 유지하도록 안내할 것입니다 (기체를 움직일 때 신호합니다).

> **팁** 기체를 각 방향에 놓고 유지한다는 점을 제외하면 [나침반 캘리브레이션](../config/compass.md)과 유사합니다.

## 캘리브레이션 수행

캘리브레이션 단계는 다음과 같습니다:

1. *QGroundControl *을 시작하고 기체에 연결합니다.
2. 상단 툴바에서 ** 기어 </ 0> 아이콘 (기체 설정) 을 선택한 다음 사이드 바에서 ** 센서 </ 0>를 선택하십시오.</li> 
    
    * **가속도 센서** 버튼을 클릭하십시오.
        
        ![가속도 센서 캘리브레이션](../../assets/qgc/setup/sensor/accelerometer.jpg)
        
        > **참고** 미리 [비행 컨트롤러 방향](../config/flight_controller_orientation.md)을 설정해야합니다. 미리 설정하지 않았다면, 여기에서 설정할 수 있습니다.
    
    * 캘리브레이션을 시작하려면 **확인**을 클릭하십시오.
    
    * 화면에 표시된 *그림대로* 기체를 놓으십시오. 기체를 움직이고 나면 (기체의 방향과 일치하는 이미지가 노란색으로 바뀝니다) 기체를 그 상태로 유지하십시오. 현재 방향에 대해 캘리브레이션이 완료되면 화면의 캘리브레이션 그림이 녹색으로 바뀝니다.
        
        ![가속도 센서 캘리브레이션](../../assets/qgc/setup/sensor/accelerometer_positions_px4.jpg)
    
    * 기체의 모든 방향에 대해 캘리브레이션 과정을 반복합니다.</ol> 
    
    모든 방향으로 기체 캘리브레이션을 했다면, *QgroundControl*에 *캘리브레이션 완료* 창이 나타납니다 (모든 방향 지시 그림이 초록색으로 표시되고, 진행 표시 줄이 완전히 채워집니다). 이제 다음 센서로 이동할 수 있습니다.
    
    ## 추가 정보
    
    * [QGroundControl 사용 설명서 > 센서](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#accelerometer)
    * [PX4 설치 비디오 - @1m46s](https://youtu.be/91VGmdSlbo4?t=1m46s) (Youtube)