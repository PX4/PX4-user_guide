# 수평 조정 캘리브레이션

*레벨 조정 캘리브레이션</ 0>을 사용하여 컨트롤러 방향 정렬의 미세한 어긋남을 보정하고 *QGroundControl* 비행 시야의 수평(파란색이 위로, 녹색이 아래로 가게)을 맞출 수 있습니다.</p> 

> **팁** 수평 조정은 크게 권장됩니다. 좋은 비행 성능을 가져올 수 있습니다. 만약 비행 중에 일정한 표류(drift)가 발생한다면 이 과정을 반복할 수 있습니다.

## 캘리브레이션 수행

수평을 조정하려면:

1. *QGroundControl *을 시작하고 기체를 연결합니다.
2. 상단 툴바에서 **톱니바퀴** 아이콘(기체 설정)을 선택한 다음 사이드 바에서 **센서**를 선택하십시오.
3. **수평 조정** 버튼을 클릭하십시오. ![Level Horizon calibration](../../assets/qgc/setup/sensor/sensor_level_horizon.jpg) > **Note** You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). 미리 설정하지 않았다면, 여기에서 설정할 수 있습니다. 
4. 기체를 평평한 바닥에 비행 컨트롤러 방향대로 수평을 유지하게 놓으십시오. 
    * 비행기의 경우 이 자세가 수평 비행 중의 자세입니다 (비행기는 날개가 약간 올라가는 경향이 있습니다!).
    * 헬리콥터의 경우 이 자세가 호버링 자세입니다.
5. 캘리브레이션 과정을 시작하려면 **확인**을 누르십시오.
6. 캘리브레이션 과정이 끝날 때까지 기다리십시오.

## 검증

비행 컨트롤러 방향 설정과 수평 조정 캘리브레이션이 완료되면 비행 HUD의 나침반이 기체가 북쪽을 향할 때 0에 가까운 값을 향하는 지, 수평선이 수평을 이루는지 (파란색 하늘이 상단에, 초록색 땅이 하단에 있습니다) 확인하십시오.

## 추가 정보

* [고급 방향 조정](../advanced_config/advanced_flight_controller_orientation_leveling.md) (고급 사용자)
* [QGroundControl 사용 설명서 > 센서](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#level-horizon)
* [PX4 설치 비디오 "자이로스코프 센서"- @ 1분 14초](https://youtu.be/91VGmdSlbo4?t=1m14s)(Youtube)