# 고급 비행 콘트롤러 방향 설정

방향과 수평 평형은 센서 보드의 작은 정렬 불량이나 사소한 교정 오류를 수정하기 위하여 매개변수를 사용하여 수동으로 미세 조정 가능합니다.

:::note
이 지침은 일반 사용자에게는 권장되지 않습니다. 기본 설정은 아래의 지침을 참고하십시오.

- [비행 컨트롤러 방향 ](../config/flight_controller_orientation.md)
- [수평 보정](../config/level_horizon_calibration.md)
:::

기체가 계속 쏠린다면(멀티로터에서 종종 볼 수 있지만, 다른 기체에도 해당됨), RC 송신기의 트리머를 활용하기 보다는 오프셋 각도 매개변수를 미세 조정하여 트리밍하는 것이 좋습니다. 이 방법은 자율 비행시 항공기가 트리밍을 유지합니다.

## 방향 매개변수 설정

방향 매개변수를 변경하려면 :

1. QGroundControl에서 다음 메뉴를 오픈합니다: **설정 > 매개변수 > 센서 보정**.
2. 아래와 같이 매개변수 값을 변경합니다.![비행 제어장치 방향 QGC v2](../../assets/qgc/setup/sensor/fc_orientation_qgc_v2.png)

## 매개변수 정보

The **SENS_BOARD_ROT** parameter defines the rotation relative to the platform, while the X,Y and Z fine tuning offsets are fixed relative to the board itself. What happens is that the fine tuning offsets are added to the SENS_BOARD_ROT angle in order to get the total offset angles for the Yaw, Pitch and Roll orientation of the flight controller.

**SENS_BOARD_ROT**

This parameter defines the rotation of the FMU board relative to the platform. Possible values are:

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

Rotation, in degrees, around PX4FMU's X axis or Roll axis. Positive angles increase in CCW direction, negative angles increase in CW direction.

**SENS_BOARD_Y_OFF**

Rotation, in degrees, around PX4FMU's Y axis or Pitch axis. Positive angles increase in CCW direction, negative angles increase in CW direction.

**SENS_BOARD_Z_OFF**

Rotation, in degrees, around PX4FMU's Z axis Yaw axis. Positive angles increase in CCW direction, negative angles increase in CW direction.