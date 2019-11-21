# 가속도 센서

You will need to calibrate your accelerometer on first use or if the flight controller orientation is changed. Otherwise you should not need to recalibrate (except perhaps in winter, if you have a flight controller that was not [thermally calibrated](../advanced_config/sensor_thermal_calibration.md) in the factory).

> **Note** Poor accelerometer calibration is generally caught by preflight checks and arming-denied messages (QGC warnings typically refer to "high accelerometer bias" and "consistency check failures").

*QGroundControl* will guide you to place and hold your vehicle in a number of orientations (you will be prompted when to move between positions).

> **Tip** This is similar to [compass calibration](../config/compass.md) except that you hold the vehicle still (rather than rotate it) in each orientation.

<span></span>

> **Note** The calibration uses a least squares 'fit' algorithm that doesn't reaquire you to have "perfect" 90 degree orientations. Provided each axis is pointed mostly up and down at some time in the calibration sequence, and the vehicle is held stationary, the precise orientation doesn't matter.

## 캘리브레이션 수행

The calibration steps are:

1. *QGroundControl *을 시작하고 기체에 연결합니다.
2. 상단 툴바에서 ** 기어 </ 0> 아이콘 (기체 설정) 을 선택한 다음 사이드 바에서 ** 센서 </ 0>를 선택하십시오.</li> 
    
    * **가속도 센서** 버튼을 클릭하십시오.
        
        ![가속도 센서 캘리브레이션](../../assets/qgc/setup/sensor/accelerometer.jpg)
        
        > **참고** 미리 [비행 컨트롤러 방향](../config/flight_controller_orientation.md)을 설정해야합니다. 미리 설정하지 않았다면, 여기에서 설정할 수 있습니다.
    
    * 캘리브레이션을 시작하려면 **확인**을 클릭하십시오.
    
    * 화면에 표시된 *그림대로* 기체를 놓으십시오. 기체를 움직이고 나면 (기체의 방향과 일치하는 이미지가 노란색으로 바뀝니다) 기체를 그 상태로 유지하십시오. 현재 방향에 대해 캘리브레이션이 완료되면 화면의 캘리브레이션 그림이 녹색으로 바뀝니다.
        
        ![가속도 센서 캘리브레이션](../../assets/qgc/setup/sensor/accelerometer_positions_px4.jpg)
    
    * 기체의 모든 방향에 대해 캘리브레이션 과정을 반복합니다.</ol> 
    
    Once you've calibrated the vehicle in all the positions *QGroundControl* will display *Calibration complete* (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.
    
    ## 추가 정보
    
    * [QGroundControl 사용 설명서 > 센서](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#accelerometer)
    * [PX4 설치 비디오 - @1m46s](https://youtu.be/91VGmdSlbo4?t=1m46s) (Youtube)