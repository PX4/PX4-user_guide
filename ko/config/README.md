---
canonicalUrl: https://docs.px4.io/main/ko/config/README
---

# 기본 설정

*QGroundControl*을 사용하여 PX4 Controller의 [펌웨어](../config/firmware.md) 설치와 [기체](../config/airframe.md) 설정 작업을 할 수 있습니다. 이 작업은 PX4의 필수 센서인 GPS, 나침반 및 자이로 등을 설정합니다.

:::tip
이 섹션을 시작하기 전에 [QGroundControl을 다운로드](http://qgroundcontrol.com/downloads/)하여 **PC**에 설치하여야 합니다. 모바일 *QGroundControl *에서는 설정 기능은 제공하지 않으며, 비행 제어만 가능합니다.
:::

이 절에서는 *필수* 설정에 관하여 설명합니다.

* [펌웨어](../config/firmware.md)
* [기체](../config/airframe.md)
* [센서 방향](../config/flight_controller_orientation.md)
* [나침반](../config/compass.md)
* [자이로스코프](../config/gyroscope.md)
* [가속도 센서](../config/accelerometer.md)
* [대기 속도 센서](../config/airspeed.md) (고정익/VTOL)
* [수평 보정](../config/level_horizon_calibration.md)
* [무선 조종기 설정](../config/radio.md)
* [조이스틱 설정](../config/joystick.md)
* [비행 모드](../config/flight_mode.md)(선택 사항)
* [배터리](../config/battery.md)(선택 사항)
* [안전 설정](../config/safety.md)(선택 사항)
* [모터/서보](../config/motors.md)

:::note
[지원되는 기체](../config/airframe.md)에서는 이 기본 구성만 필요합니다. 새로운 기체를 개발하는 경우에는 튜닝 작업이 필요합니다([고급 설정](../advanced_config/README.md) 참고) .
:::

## 영상 가이드

아래 비디오는 보정법을 자세하게 설명합니다.

@[유투브](https://youtu.be/91VGmdSlbo4)

## 지원

If you need help with the configuration you can ask for help on the [QGroundControl Support forum](https://discuss.px4.io//c/qgroundcontrol/qgroundcontrol-usage).

## 추가 정보

* [QGroundControl > 설정](https://docs.qgroundcontrol.com/en/SetupView/SetupView.html)
* [고급 설정](../advanced_config/README.md) (세부적인 설정 방법: 기타 센서 및 주변기기 연동, 튜닝 방법).