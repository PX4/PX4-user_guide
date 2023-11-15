# Accelerometer Calibration

PX4를 처음 사용하거나, 비행 콘트롤러의 방향이 변경된 경우에는 가속도계를 보정하여야 합니다. 기존 장비를 계속 사용하는 경우에는 보정 작업이 필요하지 않습니다. 온도가 낮은 겨울철이나, 제조단계에서 [별도의 교정을 받지 않은 경우](../advanced_config/sensor_thermal_calibration.md)에는 보정하는 것이 좋습니다.

:::note
잘못된 가속도계 보정은 사전비행 단계나 시동 거부 메시지로 확인될 수  있습니다. QGroundControl 경고 메시지는 일반적으로 "높은 가속도 값"이나 "일관성 검사 실패"를 의미합니다.
:::

_QGroundControl_ will guide you to place and hold your vehicle in a number of orientations (you will be prompted when to move between positions).

:::tip
차량을 회전하지 않고 고정한다는 점외에는 [나침반 보정](../config/compass.md)작업과 유사합니다.
:::

:::note
The calibration uses a least squares 'fit' algorithm that doesn't require you to have "perfect" 90 degree orientations.
각 축이 보정 단계별로 어느 시점에 대부분 위아래를 가리키고, 차량이 고정되어 있으면 정확한 방향은 중요하지 않습니다.
:::

## 보정 절차

보정 절차는 다음과 같습니다:

1. Start _QGroundControl_ and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
1. Click the **Accelerometer** sensor button.

   ![Accelerometer calibration](../../assets/qgc/setup/sensor/accelerometer.jpg)

:::note
You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). If not, you can also set it here.
:::

1. Click **OK** to start the calibration.
1. Position the vehicle as guided by the _images_ on the screen. Once prompted (the orientation-image turns yellow) hold the vehicle still. Once the calibration is complete for the current orientation the associated image on the screen will turn green.

![Accelerometer calibration](../../assets/qgc/setup/sensor/accelerometer_positions_px4.jpg)

1. Repeat the calibration process for all vehicle orientations.

Once you've calibrated the vehicle in all the positions _QGroundControl_ will display _Calibration complete_ (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.

## 추가 정보

- [QGroundControl 사용 설명서 > 센서](https://docs.qgroundcontrol.com/master/en/SetupView/sensors_px4.html#accelerometer)
- [PX4 설치 비디오 - @1m46s](https://youtu.be/91VGmdSlbo4?t=1m46s) (Youtube)
