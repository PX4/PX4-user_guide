---
canonicalUrl: https://docs.px4.io/main/ko/advanced_config/advanced_flight_controller_orientation_leveling
---

# 고급 비행 콘트롤러 방향 설정

방향과 수평 평형은 센서 보드의 작은 정렬 불량이나 사소한 교정 오류를 수정하기 위하여 매개변수를 사용하여 수동으로 미세 조정 가능합니다.

:::note
이 지침은 일반 사용자에게는 권장되지 않습니다. 기본 설정은 아래의 지침을 참고하십시오.
* [비행 컨트롤러 방향 ](../config/flight_controller_orientation.md)
* [수평 보정](../config/level_horizon_calibration.md) :::

기체가 계속 쏠린다면(멀티로터에서 종종 볼 수 있지만, 다른 기체에도 해당됨), RC 송신기의 트리머를 활용하기 보다는 오프셋 각도 매개변수를 미세 조정하여 트리밍하는 것이 좋습니다. 이 방법은 자율 비행시 항공기가 트리밍을 유지합니다.

## 방향 매개변수 설정

방향 매개변수를 변경하려면 :

1. QGroundControl에서 다음 메뉴를 오픈합니다: **설정 > 매개변수 > 센서 보정**.
2. 아래와 같이 매개변수 값을 변경합니다.![비행 제어장치 방향 QGC v2 ](../../assets/qgc/setup/sensor/fc_orientation_qgc_v2.png)


## 매개변수 정보

**SENS_BOARD_ROT** 매개변수는 플랫폼에 상대적인 회전을 정의며, X, Y, Z 미세 조정 오프셋 값은 보드 자체에 상대적 고정값으로 저장합니다. 비행 제어장치의 Yaw, Pitch 및 Roll 방향의 전체 오프셋 각도를 가져올 용도로 미세 조정 오프셋 값을 SENS_BOOD_ROT 각도 값에 더합니다.

**SENS_BOARD_ROT**

이 매개변수는 플랫폼에 대한 FMU 보드의 회전을 정의합니다. 가능한 값은 다음과 같습니다.

- 0 = 회전 없음
- 1 = Yaw 45°
- 2 = Yaw 90°
- 3 = Yaw 135°
- 4 = Yaw 180°
- 5 = Yaw 225°
- 6 = Yaw 270°
- 7 = Yaw 315°
- 8 = Roll 180°
- 9 = Roll 180°, Yaw 45°
- 10 = Roll 180°, Yaw 90°
- 11 = Roll 180°, Yaw 135°
- 12 = Pitch 180°
- 13 = Roll 180°, Yaw 225°
- 14 = Roll 180°, Yaw 270°
- 15 = Roll 180°, Yaw 315°
- 16 = Roll 90°
- 17 = Roll 90°, Yaw 45°
- 18 = Roll 90°, Yaw 90°
- 19 = Roll 90°, Yaw 135°
- 20 = Roll 270°
- 21 = Roll 270°, Yaw 45°
- 22 = Roll 270°, Yaw 90°
- 23 = Roll 270°, Yaw 135°
- 24 = Pitch 90°
- 25 = Pitch 270°


**SENS_BOARD_X_OFF**

PX4FMU의 X축 또는 Roll 축을 중심의 도(°) 단위의 회전 오프셋입니다. 양수 방향으로 증가하면 시계반대 방향으로, 음수 방향으로 증가하면 시계 방향으로 회전합니다.

**SENS_BOARD_Y_OFF**

PX4FMU의 Y축 또는 Pitch 축을 중심의 도(°) 단위의 회전 오프셋입니다. 양수 방향으로 증가하면 시계반대 방향으로, 음수 방향으로 증가하면 시계 방향으로 회전합니다.

**SENS_BOARD_Z_OFF**

PX4FMU의 Z축 또는 Yaw 축을 중심의 도(°) 단위의 회전 오프셋입니다. 양수 방향으로 증가하면 시계 반대방향으로, 음수 방향으로 증가하면 시계 방향으로 회전합니다.
