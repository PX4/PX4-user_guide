# 비행 콘트롤러와 센서 방향

기본적으로 비행 콘트롤러와 외장 나침반 센서는 윗면이 위를 향하고 화살표가 기체 정면을 향하도록 기체에 장착합니다. 보드나 외장 나침반 센서가 다른 방향으로 설치된 경우에는 펌웨어에서 해당 방향을 설정하여야 합니다.

## 방향 알아내기

비행 컨트롤러의 ROLL, PITCH  및 YAW 오프셋은 기체의 전진(x), 오른쪽(y), 아래(z) 축을 중심을 기준으로 계산됩니다.

![기체 전진 방향](../../assets/concepts/frame_heading.png)

회전 축은 한 회전 단계에서 다음 단계까지 동일하게 유지됩니다. 따라서 회전을 수행하는 프레임은 고정되어 있습니다. This is also known as _extrinsic rotation_.

![Vehicle orientation](../../assets/qgc/setup/sensor/fc_orientation_1.png)

예를 들어, 아래에 표시된 기체는 z축을 중심으로 각각 다음과 같이 회전합니다: `ROTATION_NONE`, `ROTATION_YAW_90`,`ROTATION_YAW_180`,`ROTATION_YAW_270`.

![Yaw 회전](../../assets/qgc/setup/sensor/yaw_rotation.png)

:::note VTOL
Tailsitter 기체의 경우 모든 센서 보정에 대한 멀티콥터 설정(차량에 대한 상대적 이륙, 이륙, 호버링, 착륙)에 따라 차량 방향을 설정합니다.

축은 일반적으로  전진 비행에 대하여는 차량의 방향에 상대적입니다. 자세한 정보는 [기본 개념](../getting_started/px4_basic_concepts.md#heading-and-directions)편을 참고하십시오.
:::

## 방향 설정

방향을 설정하려면:

1. Start _QGroundControl_ and connect the vehicle.
1. 상단 툴바에서 **톱니바퀴** 아이콘(기체 설정)을 선택한 다음 사이드 바에서 **센서**를 선택하십시오.
1. **방향 설정** 버튼을 클릭합니다.

   ![Set sensor orientations](../../assets/qgc/setup/sensor/sensor_orientation_set_orientations.jpg)

1. **비행 콘트롤러 방향**을 선택합니다([위에서 계산한 방법](#calculating-orientation)대로 선택하십시오).

   ![Orientation options](../../assets/qgc/setup/sensor/sensor_orientation_selector_values.jpg)

1. **확인**을 누릅니다.

:::note
You can use [Level Horizon Calibration](../config/level_horizon_calibration.md) to compensate for small miss-alignments in controller orientation and to level the horizon in flight view.
:::

## 미세 보정

PX4 will automatically detect the compass orientation as part of [compass calibration](../config/compass.md) ([by default](../advanced_config/parameter_reference.md#SENS_MAG_AUTOROT)) for any of the [standard MAVLink orientations](https://mavlink.io/en/messages/common.html#MAV_SENSOR_ORIENTATION) (upright and facing forward, or any multiple of 45° offset in any axis) .

:::note
You can confirm that auto detection worked by looking at the [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG0_ROT) parameters.
:::

If a non-standard orientation has been used you will need to set the [CAL_MAGx_ROLL](../advanced_config/parameter_reference.md#CAL_MAG0_ROLL), [CAL_MAGx_PITCH](../advanced_config/parameter_reference.md#CAL_MAG0_PITCH), and [CAL_MAGx_YAW](../advanced_config/parameter_reference.md#CAL_MAG0_YAW) parameters for each compass to the angles that were used.

This will automatically set [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG0_ROT) to "custom euler angle". Note that you will need to disable the [SENS_MAG_AUTOROT](../advanced_config/parameter_reference.md#SENS_MAG_AUTOROT) parameter before performing compass calibration, as this will map the angle to some multiple of 45° in all axes (so 30° would be detected as 0° or 45°).

## 추가 정보

- [고급 방향 보정](../advanced_config/advanced_flight_controller_orientation_leveling.md) (고급 사용자)
- [QGroundControl 사용 설명서 > 센서](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/sensors_px4.html#flight_controller_orientation)
