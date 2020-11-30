# 수평 균형 보정

*수평 균형 보정* 과정을 거쳐 제어 장치 방향의 미세한 어긋남을 보정하고 *QGroundControl* 비행 시야의 수평(파란색이 위로, 녹색이 아래로 가게)을 맞출 수 있습니다.

> **팁** 수평 균형 조정을 강력히 권장합니다. 최상의 비행 성능을 가져올 수 있습니다. 만약 비행 중에 일정한 쏠림이 발생한다면 이 과정을 반복할 수 있습니다.

## 보정 수행

수평 균형을 조정하려면:

1. *QGroundControl *을 시작하고 기체를 연결합니다.
2. 상단 도구 모음에서 **톱니바퀴** 아이콘(기체 설정)을 선택한 다음 가장자리 표시줄에서 **센서**를 선택하십시오.
3. **수평 조정** 단추를 누르십시오. ![Level Horizon calibration](../../assets/qgc/setup/sensor/sensor_level_horizon.jpg) > **참고** 반드시 미리 [자동 비행 장치 방향](../config/flight_controller_orientation.md)을 설정해야 합니다. 미리 설정하지 않았다면, 여기에서 설정할 수 있습니다. 
4. 기체를 방향을 유지한 채로 평평한 바닥에 두십시오: 
    * 비행기의 경우 이 자세가 수평 비행 자세입니다 (비행기는 날개가 약간 올라가는 경향이 있습니다!).
    * 헬리콥터의 경우 이 자세가 부양 자세입니다.
5. 보정 과정을 시작하려면 **확인**을 누르십시오.
6. 보정 과정이 끝날 때까지 기다리십시오.

## 검증

방향 설정과 수평 조정 보정이 끝나면 비행 HUD의 나침반이 기체가 북쪽을 향할 때 0에 가까운 값을 향하는지, 수평선이 수평을 이루는지 (파란색 하늘이 상단에, 초록색 땅이 하단에 있습니다) 확인하십시오.

## 추가 정보

* [고급 방향 조정](../advanced_config/advanced_flight_controller_orientation_leveling.md) (고급 사용자 전용).
* [QGroundControl 사용자 안내서 > 센서](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#level-horizon)
* [PX4 설치 동영상 "각가속 센서"- @ 1분 14초](https://youtu.be/91VGmdSlbo4?t=1m14s)(유튜브)