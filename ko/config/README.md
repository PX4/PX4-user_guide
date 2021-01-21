# 기본 설정

*QGroundControl*은 PX4 Controller에 [firmware](../config/firmware.md)를 설치하고 [airframe]](../config/airframe.md)을 설정합니다. 이는 PX4 기기에 반드시 있어야 하는 주요 센서를(GPS, 나침반, 자이로 등) 구성하는데 사용됩니다.

:::tip
Before starting this section you should [Download QGroundControl](http://qgroundcontrol.com/downloads/) and install it on your **desktop** computer (*QGroundControl* does not support vehicle configuration on mobile platforms).
:::

This section contains *essential* configuration topics:

* [Firmware](../config/firmware.md)
* [Airframe](../config/airframe.md)
* [Sensor Orientation](../config/flight_controller_orientation.md)
* [Compass](../config/compass.md)
* [Gyroscope](../config/gyroscope.md)
* [Accelerometer](../config/accelerometer.md)
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