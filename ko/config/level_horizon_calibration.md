---
canonicalUrl: https://docs.px4.io/main/ko/config/level_horizon_calibration
---

# 수평 보정

You can use *Level Horizon Calibration* to compensate for small misalignments in controller orientation and to level the horizon in the *QGroundControl* flight view (blue on top and green on bottom).

:::tip
Performing this calibration step is only recommended if the autopilot's orientation is visibly misaligned with the specified orientation, or if there is a constant drift during flight in not position-controlled flight modes.
:::

## 보정 작업

수평 보정

1. *QGroundControl*을 실행후, 기체를 연결합니다.
1. 상단 도구 모음에서 **톱니바퀴** 아이콘(기체 설정)을 선택한 다음 가장자리 표시줄에서 **센서**를 선택합니다.
1. **수평 보정** 버튼을 클릭합니다. ![Level Horizon calibration](../../assets/qgc/setup/sensor/sensor_level_horizon.jpg) :::note 미리
비행 방향</ 1>이 설정되어 있어야 합니다.  미리 설정하지 않았다면, 여기에서 설정하십시오. :::</p></li> 
   
   1 기체를 방향을 유지한 채로 평평한 바닥에 두십시오:
  
    * 고정익의 경우 이 자세가 수평 비행 자세입니다 (비행기는 날개가 약간 올라가는 경향이 있습니다!).
  * 헬리콥터의 경우 이 자세가 부양 자세입니다.
1 보정 작업을 시작하려면 **확인**을 클릭합니다.
1 보정 작업이 끝날 때까지 기다리십시오.</ol> 




## 검증 

Check that the artificial horizon displayed in the flight view has the indicator in the middle when the vehicle is placed on a level surface.




## 추가 정보

* [고급 방향 보정](../advanced_config/advanced_flight_controller_orientation_leveling.md) (고급 사용자용).
* [QGroundControl 사용자 안내서 > 센서](https://docs.qgroundcontrol.com/master/en/SetupView/sensors_px4.html#level-horizon)
* [PX4 설치 동영상 "각가속 센서"- @ 1분 14초](https://youtu.be/91VGmdSlbo4?t=1m14s)(유튜브)
