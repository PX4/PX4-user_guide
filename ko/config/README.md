# 기본 설정

*QGroundControl*은 PX4 Controller에 [펌웨어](../config/firmware.md)를 설치하고 [기체](../config/airframe.md)를 설정합니다. 이는 PX4 기기에 반드시 있어야 하는 주요 센서를(GPS, 나침반, 자이로 등) 구성하는데 사용됩니다.

:::tip
이 섹션을 시작하기 전에 [QGroundControl을 다운로드 ](http://qgroundcontrol.com/downloads/)하여 **PC**에 설치하여야 합니다 (모바일 *QGroundControl *에서는 설정 기능은 제공되지 않습니다. 비행은 가능.).
:::

이 절에서는 *필수* 설정에 관하여 설명합니다.

* [펌웨어](../config/firmware.md)
* [기체](../config/airframe.md)
* [센서 방향](../config/flight_controller_orientation.md)
* [나침반](../config/compass.md)
* [자이로스코프](../config/gyroscope.md)
* [가속도 센서](../config/accelerometer.md)
* [Airspeed](../config/airspeed.md) (fixed-wing/VTOL)
* [Level Horizon Calibration](../config/level_horizon_calibration.md)
* [Radio Setup](../config/radio.md)
* [Joystick Setup](../config/joystick.md)
* [Flight Modes](../config/flight_mode.md) (Optional)
* [Battery](../config/battery.md) (optional)
* [Safety](../config/safety.md) (optional)
* [Motors/Servos](../config/motors.md)

:::note
For a [supported airframe](../config/airframe.md) only this basic configuration is required. If you're creating a new airframe you will additionally need to perform vehicle tuning (see [Advanced Configuration](../advanced_config/README.md)).
:::

## 영상 가이드

The video below shows the calibration process in detail.

@[youtube](https://youtu.be/91VGmdSlbo4)

## 지원

If you need help with the configuration you can ask for help on the [QGroundControl Support forum](http://discuss.px4.io/c/qgroundcontrol/qgroundcontrol-usage).

## 추가 정보

* [QGroundControl > 설정](https://docs.qgroundcontrol.com/en/SetupView/SetupView.html)
* [Advanced Configuration](../advanced_config/README.md) (세부적인 설정 방법: 기타 센서 및 주변기기 연동, 튜닝 방법).