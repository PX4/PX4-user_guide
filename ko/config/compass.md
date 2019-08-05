# 캘리브레이션

The compass calibration process configures all connected internal and external [magnetometers](../gps_compass/README.md). *QGroundControl* will guide you to position the vehicle in a number of set orientations and rotate the vehicle about the specified axis.

> **Note** If you are using an external magnetometer/compass (e.g. a compass integrated into a GPS module) make sure you mount the external compass on your vehicle properly and connect it to the autopilot hardware. GPS+내포장을 연결하는 방법은 특정 오토파일럿 하드웨어의 [ 기본 어셈블리 ](../assembly/README.md)에서 확인할 수 있습니다. Once connected, QGroundControl will automatically detect the external magnetometer.

## Performing the Calibration

The calibration steps are:

1. Start *QGroundControl* and connect the vehicle.
2. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
3. **Compass** 센서 버튼을 클릭합니다.
    
    ![Compass calibration PX4를 선택합니다.](../../images/qgc/setup/sensor_compass_select_px4.jpg)
    
    > **Note** You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). If not, you can also set it here.

4. Click **OK** to start the calibration.

5. 빨간색(불완전)으로 표시된 방향으로 기체를 배치하고 그대로 유지합니다. 메시지가 표시되면(방향 이미지가 노란색으로 변함) 기체를 지정된 축을 기준으로 한 방향으로 회전시킵니다. Once the calibration is complete for the current orientation the associated image on the screen will turn green.
    
    ![PX4에 대한 캘리브레이션 단계 로드](../../images/qgc/setup/sensor_compass_calibrate_px4.jpg)

6. Repeat the calibration process for all vehicle orientations.

Once you've calibrated the vehicle in all the positions *QGroundControl* will display *Calibration complete* (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.

## Further Information

* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#compass)
* [PX4 설정 비디오 - @2m38s](https://youtu.be/91VGmdSlbo4?t=2m38s) (유튜브)