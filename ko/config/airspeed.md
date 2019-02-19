# 공기 속도 보정

오프셋을 결정하려면 속도 보정이 0의 안정적인 기준을 읽어야 합니다. 바람(실내 센서를 보정할 필요는 없음)을 막기 위해 피토 위에 손을 얹은 다음 입을 사용하여 튜브를 불어 보정 완료 신호를 보냅니다.

> ** 노트 ** 고정 윙 및 VTOL 차량에는 대개 속도 센서가 있습니다.

## Performing the Calibration

속도 센서를 보정하려면:

1. Start *QGroundControl* and connect the vehicle.
2. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
3. AirSpeed Calibration(공기 속도 보정) </strong> 센서 버튼을 클릭합니다.
    
    ![공기 속도 보정](../../images/qgc/setup/sensor_airspeed.jpg)

4. 센서를 바람으로부터 보호한다(즉, 손으로 컵으로 감는다). 구멍이 막히지 않도록 주의하십시오.

5. Click **OK** to start the calibration.
6. 피토 튜브 끝을 불어 보정이 종료되었음을 나타냅니다.
    
    > ** Tip** Tip </0> Tube 안으로 불어 넣는 것도 동적 및 정적 포트가 올바르게 장착되었는지 확인하는 기본적인 점검입니다. 센서가 교환되면 튜브에 바람을 불어넣을 때 센서가 큰 음의 차압을 판독하고 오류가 발생하여 보정이 중단됩니다.

7. 덮개를 제거하기 전에 2-3초간 기다립니다(몇 초 후 보정이 자동으로 완료됨).

## 시험

보정 후 빠른 테스트는 손가락을 피토 끝에 대고 잡는 것입니다. 시스템이 판독된 후 해제될 때까지 양의 비행 속도를 유지해야 합니다.

## Further Information

* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/en/SetupView/Sensors.html#airspeed)