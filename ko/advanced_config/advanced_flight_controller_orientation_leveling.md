# 고급 비행 콘트롤러 방향 설정

방향과 수평 평형은 센서 보드의 작은 정렬 불량이나 사소한 교정 오류를 수정하기 위하여 매개변수를 사용하여 수동으로 미세 조정 가능합니다.

If there is a persistent drift bias (often seen in multirotors but not limited to them), it is a good strategy to trim it with the help of these fine-tuning offset angle parameters, instead of using the trimmers of your RC Transmitter. 기본 설정은 아래의 지침을 참고하십시오.

:::note
These instructions are "advanced", and not recommended for regular users (the broad tuning is generally sufficient).
:::

## 방향 매개변수 설정

기체가 계속 쏠린다면(멀티로터에서 종종 볼 수 있지만, 다른 기체에도 해당됨), RC 송신기의 트리머를 활용하기 보다는 오프셋 각도 매개변수를 미세 조정하여 트리밍하는 것이 좋습니다. 이 방법은 자율 비행시 항공기가 트리밍을 유지합니다.

방향 매개변수를 변경하려면 :

The other parameters can then be set in order to fine-tune the orientation of the IMU sensors relative to the board itself.

You can locate the parameters in QGroundControl as shown below:

1. QGroundControl에서 다음 메뉴를 오픈합니다: **설정 > 매개변수 > 센서 보정**.
1. The parameters as located in the section as shown below (or you can search for them):

   ![FC Orientation QGC v2](../../assets/qgc/setup/sensor/fc_orientation_qgc_v2.png)

## Parameter Summary

- [SENS_BOARD_ROT](../advanced_config/parameter_reference.md#SENS_BOARD_ROT): Rotation of the FMU board relative to the vehicle frame.
- [SENS_BOARD_X_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_X_OFF): Rotation, in degrees, around PX4FMU's X axis or Roll axis. Positive angles increase in CCW direction, negative angles increase in CW direction.
- [SENS_BOARD_Y_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_Y_OFF): Rotation, in degrees, around PX4FMU's Y axis or Pitch axis. Positive angles increase in CCW direction, negative angles increase in CW direction.
- [SENS_BOARD_Z_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_Z_OFF): Rotation, in degrees, around PX4FMU's Z axis Yaw axis. Positive angles increase in CCW direction, negative angles increase in CW direction.
