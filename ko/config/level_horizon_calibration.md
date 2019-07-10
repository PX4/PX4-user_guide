# 수평 조정 캘리브레이션

*레벨 조정 캘리브레이션</ 0>을 사용하여 컨트롤러 방향 정렬의 미세한 어긋남을 보정하고 *QGroundControl* 비행 시야의 수평(파란색이 위로, 녹색이 아래로 가게)을 맞출 수 있습니다.</p> 

> **팁** 수평 조정은 크게 권장됩니다. 좋은 비행 성능을 가져올 수 있습니다. 만약 비행 중에 일정한 표류(drift)가 발생한다면 이 과정을 반복할 수 있습니다.

## 캘리브레이션 수행

수평을 조정하려면:

1. *QGroundControl *을 시작하고 기체를 연결합니다.
2. 상단 툴바에서 **톱니바퀴** 아이콘(기체 설정)을 선택한 다음 사이드 바에서 **센서**를 선택하십시오.
3. **수평 조정** 버튼을 클릭하십시오. ![Level Horizon calibration](../../images/qgc/setup/sensor_level_horizon.jpg) > **참고** 반드시 미리 [비행 컨트롤러 방향](../config/flight_controller_orientation.md)을 설정해야 합니다. 미리 설정하지 않았다면, 여기에서 설정할 수 있습니다. 
4. 기체를 평평한 바닥에 비행 컨트롤러 방향대로 수평을 유지하게 놓으십시오. 
    * 비행기의 경우 이 자세가 수평 비행 중의 자세입니다 (비행기는 날개가 약간 올라가는 경향이 있습니다!).
    * 헬리콥터의 경우 이 자세가 호버링 자세입니다.
5. 캘리브레이션 과정을 시작하려면 **확인**을 누르십시오.
6. 캘리브레이션 과정이 끝날 때까지 기다리십시오.

## 검증

방위가 설정되고 수평 - 수평선 캘리브레이션이 완료된 후, 나침반의 표제가 기체를 북쪽을 향하고 지평선이 수평 일 때 0 근처의 값을 보여 주는지 비행 조망에서 확인하십시오 (위쪽은 파란색, 아래쪽은 녹색입니다 ).

## Further Information

* [Advanced Orientation Tuning](../advanced_config/advanced_flight_controller_orientation_leveling.md) (advanced users only).
* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#level-horizon)
*  PX4 설치 비디오 "자이로 스코프"- @ 1m14s </ 0> (Youtube) </li> </ul>