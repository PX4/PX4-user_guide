---
canonicalUrl: https://docs.px4.io/main/ko/config/accelerometer
---

# Accelerometer Calibration

PX4를 처음 사용하거나, 비행 콘트롤러의 방향이 변경된 경우에는 가속도계를 보정하여야 합니다. 기존 장비를 계속 사용하는 경우에는 보정 작업이 필요하지 않습니다. 온도가 낮은 겨울철이나, 제조단계에서 [별도의 교정을 받지 않은 경우](../advanced_config/sensor_thermal_calibration.md)에는 보정하는 것이 좋습니다.

:::note
잘못된 가속도계 보정은 사전비행 단계나 시동 거부 메시지로 확인될 수  있습니다. QGroundControl 경고 메시지는 일반적으로 "높은 가속도 값"이나 "일관성 검사 실패"를 의미합니다.
:::

*QGroundControl*은 차량을 여러 방향으로 배치하고 유지하도록 안내합니다 (위치간에 이동할 때 메시지가 표시됨).

:::tip
차량을 회전하지 않고 고정한다는 점외에는 [나침반 보정](../config/compass.md)작업과 유사합니다.
:::

:::note
The calibration uses a least squares 'fit' algorithm that doesn't require you to have "perfect" 90 degree orientations.
각 축이 보정 단계별로 어느 시점에 대부분 위아래를 가리키고, 차량이 고정되어 있으면 정확한 방향은 중요하지 않습니다.
:::

## 보정 절차

보정 절차는 다음과 같습니다:

1. *QGroundControl*에서 기체에 접속합니다.
1. 상단 툴바에서 **기어** 아이콘 (기체 설정) 을 선택한 다음, 사이드 바에서 **센서**를 선택합니다.
1. **가속도계** 버튼을 클릭합니다.

   ![가속도계 보정](../../assets/qgc/setup/sensor/accelerometer.jpg)

:::note
이 작업 이전에 [비행 콘트롤러 방향](../config/flight_controller_orientation.md)을 미리 설정하여야 합니다. 미리 설정하지 않았다면, 여기에서 설정하십시오.
:::

1. 보정을 시작하려면 **확인**을 클릭하십시오.
1. 화면에 표시된 *그림*과 같이 기체를 배치합니다. 기체를 움직이면 (드론의 방향과 일치하는 이미지가 노란색으로 바뀝니다) 드론을 그 상태로 유지합니다. 현재 방향에 대해 보정이 완료되면, 화면의 그림이 녹색으로 변경됩니다.

  ![가속도계 보정](../../assets/qgc/setup/sensor/accelerometer_positions_px4.jpg)

1. 기체의 모든 방향에 대해 보정 작업을 반복합니다.

모든 위치에서 기체를 보정하면 *QGroundControl *에서 *보정 완료 * 메시지를 표시합니다. 모든 방향의 그림들이 녹색으로 표시되고 진행 표시 줄이 완전히 채워집니다. 그런 다음 다음 다른 센서의 보정 작업을 진행합니다.


## 추가 정보

* [QGroundControl 사용 설명서 > 센서](https://docs.qgroundcontrol.com/master/en/SetupView/sensors_px4.html#accelerometer)
* [PX4 설치 비디오 - @1m46s](https://youtu.be/91VGmdSlbo4?t=1m46s) (Youtube)
