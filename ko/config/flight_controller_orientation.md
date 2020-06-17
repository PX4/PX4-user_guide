# 비행 컨트롤러 및 센서 정렬

기본적으로 비행 컨트롤러(그리고 외부 나침반 센서)는 윗면이 위를 향하도록, 화살표가 기체 정면을 향하도록 프레임에 장착되어야 합니다. 보드나 외부 나침반 센서가 다른 방향으로 장착된 경우 펌웨어에서 이를 설정해야 합니다.

## 방향 계산

ROLL, PITCH and/or YAW offsets of the flight controller are calculated relative to the vehicle around the forward, right, down axes.

The axes to rotate around stay the same from one rotation step to the next one. So the frame to perform the rotation in stays fixed. This is also known as *extrinsic rotation*.

<img src="../../images/fc_orientation_1.png" style="width: 600px;" />

For example, the vehicles shown below have rotations around the z-axis (only) corresponding to: `ROTATION_NONE`, `ROTATION_YAW_90`,`ROTATION_YAW_180`,`ROTATION_YAW_270`.

![Yaw Rotation](../../images/yaw_rotation.png)

## 방향 설정

To set the orientations:

1. *QGroundControl *을 시작하고 기체를 연결합니다.
2. 상단 툴바에서 **톱니바퀴** 아이콘(기체 설정)을 선택한 다음 사이드 바에서 **센서**를 선택하십시오.
3. **방향 설정** 버튼을 클릭합니다. <img src="../../images/qgc/setup/sensor_orientation_set_orientations.jpg" style="width: 600px;" />
4. **비행 컨트롤러 방향**을 선택합니다([위에서 계산한 방법](#calculating-orientation)대로 선택하십시오).
    
    <img src="../../images/qgc/setup/sensor_orientation_selector_values.jpg" style="width: 200px;" />

5. 동일한 방법으로 **외부 나침반 방향 **을 선택합니다(이 선택 사항은 기체에 외부 나침반이 있을 때에만 표시됩니다).

6. **확인**을 누릅니다.

## 미세 조정

You can use [Level Horizon Calibration](../config/level_horizon_calibration.md) to compensate for small miss-alignments in controller orientation and to level the horizon in flight view.

## 추가 정보

* [고급 방향 조정](../advanced_config/advanced_flight_controller_orientation_leveling.md) (고급 사용자)
* [QGroundControl 사용 설명서 > 센서](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#flight_controller_orientation)