# 나침반 보정

나침반 보정은 연결된 모든 내부 및 외부 [나침반 센서](../gps_compass/README.md)를 설정합니다. *QGroundControl*에서 차량을 설정된 방향으로 배치하고 지정된 축을 기준으로 차량을 회전하도록 안내합니다.

:::note GPS
모듈에 통합된 나침반과 같은 외부 자석계/범위를 사용하는 경우 차량에 외부 나침반을 올바르게 장착하고 자동 조종 장치 하드웨어에 연결해야 합니다. GPS+내포장을 연결하는 방법은 특정 오토파일럿 하드웨어의 [조립 기초](../assembly/README.md)편에서 확인할 수 있습니다. 연결되면 *QGroundControl*에서 외부 자기장 센서를 자동으로 감지합니다.
:::

:::tip
처음 사용할 때 나침반을 보정해야하며, 차량이 매우 강한 자기장에 노출 된 적이 있거나 비정상적인 자기 특성이있는 지역에서 사용되는 경우 나침반을 다시 보정해야 할 수 있습니다. 나침반 보정이 잘못되었다는 표시로는 호버링 중 멀티 콥터 회전, 변기 볼링 (반경 증가 / 스파이럴 아웃, 일반적으로 일정한 고도에서 회전, 플라이 웨이로 이어지는) 또는 직선 비행을 시도 할 때 경로를 벗어나는 방향이 있습니다.
:::

## 보정 방법

보정 절차는 다음과 같습니다:

1. 큰 금속 물체나 자기장에서 멀리 떨어진 위치를 선택하십시오. :::tip 금속이 많은 장소는 보정 작업에 적당한 장소가 아입니다. 사무실 테이블 위에서나 (종종 금속 막대 포함) 또는 차량 옆에서 보정하지 마십시오. 철근이 고르지 않게 분포 된 콘크리트 슬래브 위에 서있는 경우에도 보정에 영향을 미칠 수 있습니다.
:::
2. *QGroundControl*을 시작하고 드론에 연결합니다.
3. 상단 도구 모음에서 **톱니 바퀴** 아이콘(기체 설정)을 선택한 다음 가장자리 표시줄에서 **센서**를 선택하십시오.
4. **Compass** 센서 버튼을 클릭합니다.
    
    ![Select Compass calibration PX4](../../assets/qgc/setup/sensor/sensor_compass_select_px4.jpg)
    
:::note
이 작업 이전에 [비행 컨트롤러 방향](../config/flight_controller_orientation.md)을 미리 설정하여야 합니다. 미리 설정하지 않았다면, 여기에서 설정할 수 있습니다.
:::

5. **확인**을 눌러 보정작업을 시작하십시오.

6. Place the vehicle in any of the orientations shown in red (incomplete) and hold it still. Once prompted (the orientation-image turns yellow) rotate the vehicle around the specified axis in either/both directions. Once the calibration is complete for the current orientation the associated image on the screen will turn green.
    
    ![Compass calibration steps on PX4](../../assets/qgc/setup/sensor/sensor_compass_calibrate_px4.jpg)

7. Repeat the calibration process for all vehicle orientations.

Once you've calibrated the vehicle in all the positions *QGroundControl* will display *Calibration complete* (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.

## Further Information

* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#compass)
* [PX4 설정 비디오 - @2m38s](https://youtu.be/91VGmdSlbo4?t=2m38s) (유튜브)
* [Compass Power Compensation](../advanced_config/compass_power_compensation.md) (Advanced Configuration)