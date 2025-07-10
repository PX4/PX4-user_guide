---
canonicalUrl: https://docs.px4.io/main/ko/config/README
---

# 기본 설정

PX4 차량의 표준 소프트웨어 설정 방법과 보정 방법에 대하여 설명합니다.

:::note
이 섹션을 시작하기 전에 [QGroundControl을 다운로드](http://qgroundcontrol.com/downloads/)하고 **데스크톱** 컴퓨터에 설치하여야 합니다. 모바일 플랫폼에서는 *QGroundControl*을 사용하여 차량 설정을 할 수 없습니다.

**차량 설정** 화면에 액세스하려면 QGC 애플리케이션 메뉴(왼쪽 상단의 "Q" 아이콘)를 연 다음 *선택 도구* 팝업에서 **차량 설정**을 선택하십시오.

  ![QGC 주 메뉴 팝업: 차량 설정 강조 표시](../../assets/qgc/setup/menu_setup.png) :::

하위 주제는 각 단계를 자세히 다룹니다. 먼저 PX4 펌웨어를 설치하고 차량 기체를 설정하십시오.
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
* [액츄에이터](../config/actuators.md)
* [자동 튜닝](../config/autotune.md)


## 영상 가이드

아래 비디오는 보정 프로세스를 자세히 설명합니다. *QGroundControl*의 버전은 차이가 나지만, 대부분의 프로세스는 유사합니다.

@[유투브](https://youtu.be/91VGmdSlbo4)


## 고급 설정

[선택한 기체 구성](../config/airframe.md)이 *특정 차량 모델*(예: [Holybro s500](../frames_multicopter/holybro_s500_v2_pixhawk4.md#install-configure-px4))인 경우 미세 조정이 가능하지만, 필수적이지는 않습니다.

새 기체, "일반" 기체를 사용하거나 기체를 많이 수정하거나 일반적이지 않은 센서를 사용하는 경우에는 다음을 참조하십시오.
* [고급 설정](../advanced_config/README.md): 차량별 조정, 미세 조정, 공장 수준 구성.
* [비행 콘트롤러 주변 장치](../peripherals/README.md) - 특정 하드웨어(특히 많이 사용되지 않는 센서)와 관련된 하드웨어 및 소프트웨어 설정입니다.

## 지원

설정에 대한 도움이 필요한 경우 [QGroundControl 지원 포럼 ](https://discuss.px4.io//c/qgroundcontrol/qgroundcontrol-usage)에서 도움을 요청할 수 있습니다

## 추가 정보

* [QGroundControl &gt; 설정](https://docs.qgroundcontrol.com/en/SetupView/SetupView.html)

