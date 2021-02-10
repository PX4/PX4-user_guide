# 가속도계 

처음 PX4 사용시나, PX4 콘트롤러 방향이 바뀐 경우에는 가속도계를 교정해야 합니다. 그렇지 않은 경우에는, 기존에 사용하고 있던 경우 보정하지 않아도 됩니다. (온도가 낮아지는 겨울철이나, 제조단계에서 [별도의 열 교정을 받지 않은 경우](../advanced_config/sensor_thermal_calibration.md)는 교정해야되는 상황이 생길 수 있습니다.)

:::note
잘못된 가속도 센서 캘리브레이션은 사전비행 단계 혹은 시동 거부 메시지에 의해 확인됩니다. (QGC 경고는 일반적으로 "높은 가속도 값"이나 "일관성 검사 실패"를 의미합니다.)
:::

*QGroundControl* will guide you to place and hold your vehicle in a number of orientations (you will be prompted when to move between positions).

:::tip
This is similar to [compass calibration](../config/compass.md) except that you hold the vehicle still (rather than rotate it) in each orientation.
:::

:::note
The calibration uses a least squares 'fit' algorithm that doesn't reaquire you to have "perfect" 90 degree orientations. Provided each axis is pointed mostly up and down at some time in the calibration sequence, and the vehicle is held stationary, the precise orientation doesn't matter.
:::

## 캘리브레이션 수행

The calibration steps are:

1. *QGroundControl*을 시작하고 드론에 연결합니다.
2. 상단 툴바에서 **기어** 아이콘 (기체 설정) 을 선택한 다음, 사이드 바에서 **센서**를 선택하십시오.
3. **가속도 센서** 버튼을 클릭하십시오.
    
    ![가속도 센서 캘리브레이션](../../assets/qgc/setup/sensor/accelerometer.jpg)
    
:::note
You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). If not, you can also set it here.
:::

4. 캘리브레이션을 시작하려면 **확인**을 클릭하십시오.

5. 화면에 표시된 *이미지대로* 드론을 배치하십시오. 드론을 움직이고 나면 (드론의 방향과 일치하는 이미지가 노란색으로 바뀝니다) 드론을 그 상태로 유지하십시오. 현재 방향에 대해 캘리브레이션이 완료되면 화면의 그림이 녹색으로 바뀝니다.
    
    ![가속도 센서 캘리브레이션](../../assets/qgc/setup/sensor/accelerometer_positions_px4.jpg)

6. 드론의 모든 방향에 대해 캘리브레이션 과정을 반복합니다. 

Once you've calibrated the vehicle in all the positions *QGroundControl* will display *Calibration complete* (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.

## 추가 정보

* [QGroundControl 사용 설명서 > 센서](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#accelerometer)
* [PX4 설치 비디오 - @1m46s](https://youtu.be/91VGmdSlbo4?t=1m46s) (Youtube)