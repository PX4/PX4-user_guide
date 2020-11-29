# 고급 비행 제어장치 방향 조정

The orientation and horizon level may be fine-tuned manually with parameters to correct for sensor board small misalignment or minor calibration errors.

> **Note** These instructions are not recommended for regular users. For basic settings stick to the instructions linked below:

- [Flight Controller Orientation](../config/flight_controller_orientation.md)
- [Level Horizon Calibration](../config/level_horizon_calibration.md) 

If there is a persistent drift bias (often seen in multirotors but not limited to them), it is a good strategy to trim it with the help of this fine-tuning offset angle parameters instead of using the trimmers of your RC Transmitter. This way when in fully autonomous flight the aircraft will maintain the trimming.

## 방향 매개변수 설정

방향 매개변수를 변경하려면:

1. QGroundControl에서 다음의 메뉴를 엽니다: **설정> 매개 변수> 센서 캘리브레이션**.
2. 아래와 같이 매개 변수를 변경하십시오: ![비행 컨트롤러 방향 QGC v2](../../assets/qgc/setup/sensor/fc_orientation_qgc_v2.png)

## 매개변수 정보

**SENS_BOOD_ROT** 매개변수는 플랫폼에 상대적인 회전을 정의하고, X,Y,Z 미세 튜닝 오프셋은 보드 자체에 상대적으로 고정되어 있습니다. 비행 컨트롤러의 요, 피치 및 롤 방향에 대한 총 오프셋 각도를 얻기 위해 미세 조정 오프셋이 SENS_BOOD_ROT 각도에 추가됩니다.

**SENS_BOARD_ROT**

이 매개변수는 플랫폼을 기준으로 상대적인 FMU 보드의 회전을 정의합니다. 가능한 값은 다음과 같습니다.

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

PX4FMU의 X축 또는 롤 축을 중심으로 한 도(°) 단위의 회전 오프셋입니다. 각도는 양수일 떄 반시계(CCW) 방향으로 증가하고, 반대로 음수일 때 시계(CW) 방향으로 증가합니다.

**SENS_BOARD_Y_OFF**

PX4FMU의 Y축 또는 피치 축을 중심으로 한 도(°) 단위의 회전 오프셋입니다. 각도는 양수일 떄 반시계(CCW) 방향으로 증가하고, 반대로 음수일 때 시계(CW) 방향으로 증가합니다.

**SENS_BOARD_Z_OFF**

PX4FMU의 Z축 또는 Yaw 축을 중심으로 한 도(°) 단위의 회전 오프셋입니다. 각도는 양수일 떄 반시계(CCW) 방향으로 증가하고, 반대로 음수일 때 시계(CW) 방향으로 증가합니다.