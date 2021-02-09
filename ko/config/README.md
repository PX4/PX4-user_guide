# 기본 설정

*QGroundControl*은 PX4 Controller에 [펌웨어](../config/firmware.md)를 설치 및 [기체](../config/airframe.md) 설정을 지원합니다. 이 작업은 PX4 필수 센서(GPS, 나침반, 자이로 등) 설정 기능을 제공합니다.

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
* [대기 속도 센서](../config/airspeed.md) (고정익/VTOL)
* [수평 보정](../config/level_horizon_calibration.md)
* [무선 설정](../config/radio.md)
* [조이스틱 설정](../config/joystick.md)
* [비행 모드](../config/flight_mode.md)(선택 사항)
* [배터리](../config/battery.md)(선택 사항)
* [안전](../config/safety.md)(선택 사항)
* [모터/서보](../config/motors.md)

:::note
[지원되는 기체](../config/airframe.md)에서는 이 기본 구성만 필요합니다. 새로운 기체를 개발하는 경우에는 튜닝 작업이 필요합니다([고급 설정](../advanced_config/README.md) 참고) .
:::

## 영상 가이드

아래 비디오는 보정법을 자세하게 설명합니다.

@[유투브](https://youtu.be/91VGmdSlbo4)

## 지원

구성에 대한 도움이 필요한 경우 [QGroundControl 지원 포럼 ](http://discuss.px4.io/c/qgroundcontrol/qgroundcontrol-usage)에서 도움을 요청할 수 있습니다

## 추가 정보

* [QGroundControl > 설정](https://docs.qgroundcontrol.com/en/SetupView/SetupView.html)
* [고급 설정](../advanced_config/README.md) (세부적인 설정 방법: 기타 센서 및 주변기기 연동, 튜닝 방법).