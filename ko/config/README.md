# 기본 설정

*QGroundControl*은 PX4 Controller에 [firmware](../config/firmware.md)를 설치하고 [airframe](../config/airframe.md)을 설정합니다. 이는 PX4 기기에 반드시 있어야 하는 주요 센서를(GPS, 나침반, 자이로 등) 구성하는데 사용됩니다.

> **Tip** 시작하기 전에 [QGroundControl](http://qgroundcontrol.com/downloads/)을 다운받고, 해당 파일을 **Desktop** 컴퓨터에 설치하십시오. (*QGroundControl*은 모바일 플랫폼에서 설정을 지원하지 않습니다).

이 섹션에는 *필수적으로* 설정해줘야 하는 주제가 포함되어 있습니다.
 
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
 
> **Note** PX4에서 지원하는 [supported airframe](../config/airframe.md)의 경우 기본적인 설정만 해주면 됩니다. 만약 기기를 새롭게 개발한 경우 별도의 튜닝을 수행해야합니다.([Advanced Configuration](../advanced_config/README.md) 참고) 

## 영상 가이드
 
아래 링크에서 설정 과정을 영상으로 확인할 수 있습니다.
 
{% youtube %} https://www.youtube.com/watch?v=91VGmdSlbo4 {% endyoutube %}
 
## 질문
 
설정 과정에 도움이 필요하다면 [QGroundControl Support forum](http://discuss.px4.io/c/qgroundcontrol/qgroundcontrol-usage)에서 질문할 수 있습니다.
 
## 추가 정보

 * [QGroundControl> Setup](https://docs.qgroundcontrol.com/en/SetupView/SetupView.html)
 * [Advanced Configuration](../advanced_config/README.md) (세부적인 설정 방법: 기타 센서 및 주변기기 연동, 튜닝 방법).
