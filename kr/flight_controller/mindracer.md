# MindRacer 하드웨어

MindRacer 시리즈는 AirMind에서 제작했습니다. 참고 : http://mindpx.net

![](../../assets/hardware/hardware-mindracer.png)

## 간략 요약

MindRacer는 소형 UAV용의 비행 플랫폼입니다. MindRacer는 MindPX를 기반으로 하였으며 모듈로 제공하는데 초점을 두어 폼팩터를 소형화시켰습니다. MindRacer는 flight controller이라기 보다는 일종의 플랫폼이라고 할 수 있습니다.
MindRacer는 SEP(soldering-elimination-port)와 WEP(wiring-elimination-protocol) 컨셉으로 만들었습니다. SEP와 WEP 이전 기술에서 납땜과 선연결은 항상 UAV를 생산하고 튜닝하는데 주요 문제점으로 지적되어 왔습니다.

> **Note** 주요 하드웨어 문서는 [여기](http://mindpx.net/assets/accessories/mindracer_spec_v1.2.pdf)을 참고하세요.

- Ultra mini size, weight ~6g
- High performance STM32F427 168MHz floating point processor, super fast throttle response
- Support OneShot ESC
- Support PPM/SBUS/DSM radio receivers, support D.Port/S.Port/Wifi telemetry
- On board flight data recorder
- Support IMU isolation
- DroneCode standard compliance connector

|Item|Description|
|:--:|:--:|
|Flight controller/Processor|F427VIT6|
|Weight|~6g|
|Dimension|35x35mm|
|PWM Outputs|maximum 6|
|IMU|10DOF|
|IMU isolation|YES/Optional|
|Radio Receiver|S.BUS/PPM/DSM/DSM2/DSMX/SUMD|
|Telemetry|FrSky D.Port, S.Port, Wifi, 3DR radio|
|On board TF card for flight data recording|YES|
|OneShot ESC Support|YES|
|Expansion Slots|2x7(pin)x2|
|On board Real time clock|YES|
|Connector|JST GH(compliance with DroneCode standard)|

## 바로 시작하기

### Pin out map

![](../../assets/hardware/hardware-mindracer-pinout.png)

### 빌드 방법

[Getting Started](../setup/getting_started.md)와 [Building the Code](../setup/building_px4.md)을 따라하세요.
그리고 MindRacer에 대한 target명령은 `nuttx_mindpx-v2_default`로 다음과 같습니다. (MindPX와 호환) :

`make nuttx_mindpx-v2_default`

### Companion PC 연결

MindRacer는 아답터 IO 보드가 장착되어 있습니다.

![](../../assets/hardware/hardware-mindracer-conn.png)

MindRacer는 빌트인 UART-to-USB 컨버터를 가지고 있습니다. companion computer를 연결하기 위해서 MindRacer를 인터페이스 보드 위에 올리고 companion computer를 인터페이스 보드에 있는 USB 포트에 연결합니다.

최대 BAUD rate는 px4 계열과 동일하며 921600까지 지원합니다.

### 사용자 가이드

> **Note** 사용자 가이드는 [여기](http://mindpx.net/assets/accessories/mindracer_user_guide_v1.2.pdf) 링크를 참고하세요.

## 구매하기

[AirMind Store](http://drupal.xitronet.com/?q=catalog)에서 구매할 수 있습니다. Amazon이나 eBay에서도 가능합니다.

## Support

보다 상세한 정보는 http://www.mindpx.org 에서 찾을 수 있습니다. 문의나 도움이 필요한 경우 [support@mindpx.net](mailto::/support@mindpx.net)로 전달해 주세요.
