---
canonicalUrl: https://docs.px4.io/main/ko/config/airframe
---

# Vehicle (Frame) Selection

After installing firmware you need to select the [vehicle type and specific frame configuration](../airframes/airframe_reference.md) that best matches your vehicle frame. This applies appropriate default parameter values for the selected frame, such as the vehicle type, number of motors, relative motor position, and so on.

:::note
Choose the frame that matches your vehicle brand and model if one exists, and otherwise select the closest "Generic" frame option matching your vehicle.
:::

## Set the Frame

기체 프레임 설정하기:

1. *QGroundControl *을 시작하고 기체에 연결합니다.
1. *기체 설정*을 오픈하여 사이드바의 **"Q" icon > Vehicle Setup > 기체**을 선택하십시오.
1. 설정하는 기체 프레임과 일치하는 큰 범주의 그룹/유형을 선택하고, 그룹 내에서 드롭다운하여 기체와 가장 일치하는 기체 프레임을 선택하십시오.

   ![Selecting generic hexarotor X frame in QGroundControl](../../assets/qgc/setup/airframe/airframe_px4.jpg)

   위의 예는 *Hexarotor X* 그룹에서 선택된 *Generic Hexarotor X 프레임들*을 나타냅니다.

1. **적용하고 재시작**을 클릭하십시오. 그 다음 대화 상자에서 **적용**을 클릭하여 설정을 저장하고 기체을 다시 시작하십시오.

   <img src="../../assets/qgc/setup/airframe/airframe_px4_apply_prompt.jpg" width="300px" title="기체 프레임 선택 명령 적용" />

## Next Steps

[Actuator Configuration & Testing](../config/actuators.md) shows how to set the precise geometry of the vehicle motors and actuators, and their mapping to flight controller outputs. After mapping actuators to outputs you should perform [ESC Calibration](../advanced_config/esc_calibration.md) if using PWM or OneShot ESCs.

## 추가 정보

- [QGroundControl 사용자 설명서 > 기체 프레임](https://docs.qgroundcontrol.com/master/en/SetupView/Airframe.html)
- [PX4 Setup Video - @37s](https://youtu.be/91VGmdSlbo4?t=35s) (Youtube)
