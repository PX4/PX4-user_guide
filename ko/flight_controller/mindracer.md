# MindRacer 하드웨어

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](http://mindpx.net)에 문의하십시오.
:::

AirMind<sup>&reg;</sup> [MindRacer](http://mindpx.net) 시리즈는 미니어처 UAV를위한 완전 스택형 비행 *플랫폼*입니다. 현재 플랫폼에는 [MindRacer 210](../complete_vehicles/mindracer210.md)과 [NanoMind 110](../complete_vehicles/nanomind110.md)의 두 가지 RTF 기체가 있습니다.

![MindRacer](../../assets/hardware/hardware-mindracer.png)

:::note
이 비행 컨트롤러는 [제조업체의 지원](../flight_controller/autopilot_manufacturer_supported.md)을 받을 수 있습니다.
:::

## 요약

MindRacer는 소형 UAV를 위한 비행 플랫폼입니다. [MindPX](../flight_controller/mindpx.md)를 기반의 *MindRacer*는 모듈화에 중점을 두면서 폼팩터에서 추가로 축소합니다. MindRacer는 비행 컨트롤러가 아닌 *플랫폼*입니다.

MindRacer는 SEP(납땜 제거 포트) 및 WEP(배선 제거 프로토콜) 개념을 구현합니다. SEP 및 WEP 이전에는 납땜과 배선이 UAV 제조와 튜닝 과정에서 항상 어려움과 비효율성을 유발하였습니다.

:::note
주요 하드웨어 문서는 [여기](http://mindpx.net/assets/accessories/mindracer_spec_v1.2.pdf)를 참고하십시오.
:::

- 초소형 크기: 무게 ~ 6g
- 고성능 STM32F427 168MHz 부동 소수점 프로세서, 초고속 스로틀 응답
- OneShot ESC 지원
- PPM/SBUS/DSM 라디오 수신기와 D.Port/S.Port/Wifi 원격 텔레메트리를 지원합니다.
- 온보드 비행 데이터 기록 장치
- IMU 격리 지원
- DroneCode<sup>&reg;</sup> 표준 준수 커넥터

|         항목          |                          설명                           |
|:-------------------:|:-----------------------------------------------------:|
|    비행 컨트롤러/프로세서     |                       F427VIT6                        |
|         중량          |                         ~ 6g                          |
|         크기          |                        35x35mm                        |
|       PWM 출력        |                         최대 6                          |
|         IMU         |                         10DOF                         |
|       IMU 격리        |                       예 / 선택 사항                       |
|       라디오 수신기       |             S.BUS/PPM/DSM/DSM2/DSMX/SUMD              |
|        텔레메트리        | FrSky<sup>&reg;</sup> D.Port, S.Port, Wifi, 3DR radio |
| 비행 데이터 기록 온보드 TF 카드 |                           예                           |
|   OneShot ESC 지원    |                           예                           |
|        확장 슬롯        |                      2x7(pin)x2                       |
|     온보드 실시간 시계      |                           예                           |
|         커넥터         |                JST GH(DroneCode 표준 준수)                |

## 빠른 시작

### 핀배열 지도

![Mindracer pinout](../../assets/hardware/hardware-mindracer-pinout.png)

### 빌드 방법

::::tip 대부분의 사용자들은 펌웨어를 빌드할 필요는 없습니다. 하드웨어가 연결되면 *QGroundControl*에 의해 사전 구축되고 자동으로 설치됩니다.
:::

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) 방법 :
```
make airmind_mindpx-v2_default
```

### 보조 컴퓨터 PC 연결

MindRacer에는 Adapt IO 보드가 부착되어 있습니다.

![Attached Adapt IO board](../../assets/hardware/hardware-mindracer-conn.png)

MindRacer에는 UART-USB 변환기가 내장되어 있습니다. 보조 컴퓨터를 연결하려면 인터페이스 보드에 MindRacer를 쌓고 보조 컴퓨터를 인터페이스 보드의 USB 포트에 연결합니다.

And the max BAUD rate is the same with px4 family, which is up to 921600.

### User Guide

:::note
The user guide is [here](http://mindpx.net/assets/accessories/mindracer_user_guide_v1.2.pdf)
:::

## Where to Buy

MindRacer is available at [AirMind Store](http://drupal.xitronet.com/?q=catalog). You can also find MindRacer at Amazon<sup>&reg;</sup> or eBay<sup>&reg;</sup>.

## Support

Please visit http://www.mindpx.org for more information. Or you can send email to [support@mindpx.net](mailto::support@mindpx.net) for any inquiries or help.
