# Vehicle (Frame) Selection

After installing firmware you need to select a [vehicle type and frame configuration](../airframes/airframe_reference.md). This applies appropriate initial parameter values for the selected frame, such as the vehicle type, number of motors, relative motor position, and so on. These can later be customised for your vehicle in [Actuator Configuration & Testing](../config/actuators.md).

::: tip
Choose the frame that matches your vehicle brand and model if one exists, and otherwise select the closest "Generic" frame option matching your vehicle.
:::

## Set the Frame

기체 프레임 설정하기:

1. Start _QGroundControl_ and connect the vehicle.
1. Select **"Q" icon > Vehicle Setup > Airframe** (sidebar) to open _Airframe Setup_.
1. 설정하는 기체 프레임과 일치하는 큰 범주의 그룹/유형을 선택하고, 그룹 내에서 드롭다운하여 기체와 가장 일치하는 기체 프레임을 선택하십시오.

   ![Selecting generic hexarotor X frame in QGroundControl](../../assets/qgc/setup/airframe/airframe_px4.jpg)

   The example above shows _Generic Hexarotor X geometry_ selected from the _Hexarotor X_ group.

1. **적용하고 재시작**을 클릭하십시오. 그 다음 대화 상자에서 **적용**을 클릭하여 설정을 저장하고 기체을 다시 시작하십시오.

   <img src="../../assets/qgc/setup/airframe/airframe_px4_apply_prompt.jpg" width="300px" title="기체 프레임 선택 명령 적용" />

## Next Steps

[Actuator Configuration & Testing](../config/actuators.md) shows how to set the precise geometry of the vehicle motors and actuators, and their mapping to flight controller outputs. After mapping actuators to outputs you should perform [ESC Calibration](../advanced_config/esc_calibration.md) if using PWM or OneShot ESCs.

## 추가 정보

- [QGroundControl 사용자 설명서 > 기체 프레임](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/airframe.html)
- [PX4 Setup Video - @37s](https://youtu.be/91VGmdSlbo4?t=35s) (Youtube)
