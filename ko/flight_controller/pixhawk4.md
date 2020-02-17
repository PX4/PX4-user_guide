# Pixhawk 4

*Pixhawk 4*<sup>&reg;</sup> 는 PX4팀과 Holybro<sup>&reg;</sup> 가 함께 협력하여 설계하고 만든 진보된 오토파일럿입니다. PX4 버전 1.7을 실행하는데 최적화 되어 있으며 연구와 상업용 개발자들에게 적합합니다.

[Pixhawk-project](https://pixhawk.org/) **FMUv5**을 기반으로 오픈 하드웨어로서 설계 되었으며 [NuttX](http://nuttx.org) OS에서 PX4 를 작동 합니다.

<img src="../../assets/flight_controller/pixhawk4/pixhawk4_hero_upright.jpg" width="200px" title="Pixhawk4 Upright Image" /> <img src="../../assets/flight_controller/pixhawk4/pixhawk4_logo_view.jpg" width="420px" title="Pixhawk4 Image" />

## 빠른 요약

* 메인 FMU 프로세서: STM32F765 
  * 32 Bit Arm® Cortex®-M7, 216MHz, 2MB memory, 512KB RAM
* IO 프로세서: STM32F100 
  * 32 Bit Arm® Cortex®-M3, 24MHz, 8KB SRAM
* 내장 센서: 
  * 가속도/자이로: ICM-20689
  * 가속/자이로: BMI055
  * 지자계: IST8310
  * 기압계: MS5611
* GPS: ublox Neo-M8N GPS/GLONASS 수신기; IST8310 지자계 센서가 통합된
* 인터페이스: 
  * PWM 출력 8-16개 (IO에서 8개, FMU에서 8개)
  * FMU의 전용 PWM/캡처 입력 3 개
  * CPPM 전용 R/C 입력
  * 아날로그 / PWM RSSI 입력이있는 Spektrum / DSM 및 S.Bus 전용 R / C 입력
  * 전용 S.Bus 서보 출력
  * 범용 serial 포트 5개
  * I2C 포트 3개
  * SPI 버스 4개
  * 직렬 ESC를 사용하는 듀얼 CAN에 최대 2 개의 CAN 버스
  * 배터리 2 개의 전압 / 전류를위한 아날로그 입력
* 전원시스템 
  * 전원 모듈 출력: 4.9~5.5V
  * USB 전원 입력: 4.75~5.25V
  * 서보 전원 입력: 0~36V
* 무게와 치수 
  * 무게: 15.8g
  * 치수: 44x84x12mm
* 기타 특성: 
  * 작동 온도: -40 ~ 85°c

추가적인 정보는 [Pixhawk 4 Technical Data Sheet](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf)에서 찾을 수 있습니다.

## 구입처

[Holybro](https://shop.holybro.com/pixhawk-4beta-launch_p1089.html)에서 주문 가능 합니다.

## 커넥터 Connectors

![Pixhawk 4 connectors](../../assets/flight_controller/pixhawk4/pixhawk4-connectors.jpg)

> **경고** **DSM/SBUS RC** 와 **PPM RC** 포트들은 RC 수신기 전용 입니다. 이 포트들은 전원이 공급되고 있습니다. 절대 서보나 전원공급기나 기타 배터리 (또는 다른 수신기) 들과 연결하면 안됩니다.

## 핀아웃 Pinouts

*Pixhawk 4* pinouts은 [여기](http://www.holybro.com/manual/Pixhawk4-Pinouts.pdf)서 다운로드 합니다.

## 치수

![Pixhawk 4 Dimensions](../../assets/flight_controller/pixhawk4/pixhawk4_dimensions.jpg)

## 정격 전압

만약 세개의 파워소스가 공급된다면 *Pixhawk 4*는 전원 공급기에서 3개의 파워레일을 중복 시킬 수 있습니다. 이 세개의 파워 레일은: **POWER1**, **POWER2** 그리고 **USB** 입니다.

> **노트** 출력 전원 레일인 **FMU PWM OUT** 과 **I/O PWM OUT** (0V to 36V) 은 비행 제어 보드에 전원을 공급 하지 않습니다.(공급 받지도 않습니다). 당신은 **POWER1**, **POWER2** 또는 **USB**중 하나를 이용하여 통해 전원을 공급해야 합니다.

**정상 작동 최대 전압 등급**

아래 조건의 공급 전원은 시스템에 전원을 공급하기 위해 순서대로 사용됩니다.

1. **POWER1** 과 **POWER2** 에 (4.9V to 5.5V) 를 입력
2. **USB** 에 (4.75V to 5.25V) 입력

**절대 최대 전압**

아래 조건에서 시스템은 전원을 공급하지 않지만 (작동하지 않음) 그대로 유지는 됩니다.

1. **POWER1** 과 **POWER2** 입력 (작동 범위 4.1V ~ 5.7V, 비손상 범위0V ~ 10V)
2. **USB** 입력 (작동 범위 4.1V to 5.7V, 비손상 범위 0V to 6V)
3. 서보 입력: **FMU PWM OUT** 과 **I/O PWM OUT**의 VDD_SERVO 핀 (0V to 42V undamaged)

## 조립/설정

[Pixhawk 4 Wiring Quick Start](../assembly/quick_start_pixhawk4.md)는 GPS와 전원관리보드 등을 포함한 필요/중요 주변기기를 어떻게 조립하는지 지침을 제공한다.

## 펌웨어 빌드

> **Tip** 대부분의 사용자들은 이 펌웨어를 빌드할 필요가 가 없습니다. 이미 사전에 빌드 되어 있으며 *QGroundControl*가 설치되어 있다면 하드웨어가 적절히 연결되면 자동으로 설치됩니다.

이 타켓에 맞게 [PX4 빌드](https://dev.px4.io/master/en/setup/building_px4.html)하기

    make px4_fmu-v5_default
    

## 디버그 포트

시스템 시리얼 콘솔과 SWD인터페이스는 **FMU Debug** 포트에서 작동하며 I/O콘솔과 SWD인터페이스는 ** I/O 디버그 포트** 를 통해 접근할 수 있습니다. 이러한 포트를 접근하기 위해, 사용자는 *Pixhawk 4* 케이스를 제거해야만 합니다.

이런 포트 모두 표준 시리얼 핀아웃을 가지고 있고 표준 FTDI 케이블 (3.3V, but it's 5V tolerant) 또는 [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation)를 사용하여 연결할 수 있습니다. 핀아웃은 표준 Dronecode debug connector 핀아웃을 사용합니다. 이 포트에 배선하는 방법은 [wiring](https://dev.px4.io/master/en/debug/system_console.html)를 참고합니다.

## 주변기기

* [디지털 풍속 센서](https://drotek.com/shop/en/home/848-sdp3x-airspeed-sensor-kit-sdp33.html)
* [텔레메트리 무선 모듈](../telemetry/README.md)
* [레인지파인더/거리 센서](../sensor/rangefinders.md)

## 지원되는 플랫폼/에어프레임

멀티콥터/비행기/로버 또는 배 등 일반적인 RC 서보와 Futaba S-Bus servos로 제어되는 기체. [Airframes Reference](../airframes/airframe_reference.md)에서 완전히 지원하는 설정 세트를 볼 수 있습니다.

## 추가정보

* [Pixhawk 4 기술 데이터 시트](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf)
* [FMUv5 레퍼런스 디자인 핀아웃](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).
* [Pixhawk 4 Wiring QuickStart](../assembly/quick_start_pixhawk4.md)
* [Pixhawk 4 핀아웃](http://www.holybro.com/manual/Pixhawk4-Pinouts.pdf) (Holybro)
* [Pixhawk 4 빠른 시작 가이드 (Holybro)](http://www.holybro.com/manual/Pixhawk4-quickstartguide.pdf)