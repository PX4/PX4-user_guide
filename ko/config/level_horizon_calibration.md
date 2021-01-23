# 수평 균형 보정

*수평 균형 보정* 과정을 거쳐 제어 장치 방향의 미세한 어긋남을 보정하고 *QGroundControl* 비행 시야의 수평(파란색이 위로, 녹색이 아래로 가게)을 맞출 수 있습니다.

:::tip
Leveling the horizon is highly recommended, and will result in the best flight performance. This process can also be repeated if you notice a constant drift during flight.
:::

## 보정 수행

To level the horizon:

1. *QGroundControl *을 시작하고 기체를 연결합니다.
2. 상단 도구 모음에서 **톱니바퀴** 아이콘(기체 설정)을 선택한 다음 가장자리 표시줄에서 **센서**를 선택하십시오.
3. **수평 조정** 단추를 누르십시오. ![Level Horizon calibration](../../assets/qgc/setup/sensor/sensor_level_horizon.jpg) :::note You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). 미리 설정하지 않았다면, 여기에서 설정할 수 있습니다.
:::
4. 기체를 방향을 유지한 채로 평평한 바닥에 두십시오: 
    * 비행기의 경우 이 자세가 수평 비행 자세입니다 (비행기는 날개가 약간 올라가는 경향이 있습니다!).
    * 헬리콥터의 경우 이 자세가 부양 자세입니다.
5. 보정 과정을 시작하려면 **확인**을 누르십시오.
6. 보정 과정이 끝날 때까지 기다리십시오.

## 검증

After the orientation is set and level-horizon calibration is complete, check in the flight view that the heading in the compass shows a value around 0 when you point the vehicle towards north and that the horizon is level (blue on top and green on bottom).

## 추가 정보

* [고급 방향 조정](../advanced_config/advanced_flight_controller_orientation_leveling.md) (고급 사용자 전용).
* [QGroundControl 사용자 안내서 > 센서](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#level-horizon)
* [PX4 설치 동영상 "각가속 센서"- @ 1분 14초](https://youtu.be/91VGmdSlbo4?t=1m14s)(유튜브)