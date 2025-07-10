---
canonicalUrl: https://docs.px4.io/main/ko/getting_started/flight_controller_selection
---

# 비행 콘트롤러 선정

기체의 물리적인 조건, 비행 목적과 비용에 적합한 하드웨어를 선정하여야 합니다.

다양한 비행 콘트롤러에서 PX4를 실행할 수 있습니다. [자동조종장치 하드웨어](../flight_controller/README.md)나 [Github의 ](https://github.com/PX4/PX4-Autopilot/#supported-hardware) 지원 보드 목록을 참고하십시오. 주요 목록은 아래와 같습니다.

## Pixhawk 시리즈

[Pixhawk시리즈](../flight_controller/pixhawk_series.md)는  NuttX OS 기반의 PX4 오픈 하드웨어 비행 콘트롤러입니다. 다양한 폼 팩터를 기반으로 다양한 적용 사례와 높은 시장 점유율을 자랑합니다.

아래의 [Pixhawk 표준 자동조종장치](../flight_controller/autopilot_pixhawk_standard.md)들은 PX4 지원팀의 테스트를 거친 제품들입니다. 그 외의 자동조종장치들은 [제조사에서 지원](../flight_controller/autopilot_manufacturer_supported.md) 하고 있습니다.

| 콘트롤러                                                            | 설명                                                                                                                                                                                                       |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Holybro Pixhawk 4](../flight_controller/pixhawk4.md)           | 픽스호크 4는 PX4 버전 1.7에 최적화 되어 있으며, 연구용 개발이나 상업용 개발들에 적합합니다. 이전 버전에 비하여, 뛰어난 컴퓨팅 성능, 2배의 RAM, 통합 및 확장을위한 추가 포트, 신규 센서 지원과 내장형 진동 차단 기능들을 제공합니다.                                                              |
| [Holybro Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md) | Pixhawk 4 미니는 *Pixhawk 4* 기능들을 소형 드론에 적용하는 엔지니어와 동호인들을 위하여 설계되었습니다. *Pixhawk 4 미니*는 *Pixhawk 4*의 FMU 프로세서와 메모리 리소스는 동일하며, 자주 사용되지 않는 인터페이스들을 제거하였습니다. 이를 통하여, * Pixhawk 4 미니*는 250mm 레이싱 드론에 최적화되었습니다. |
| [Drotek Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md)    | Pixracer를 기반으로 일부 기능들이 업그레이드 및 추가되었습니다.                                                                                                                                                                  |
| [mRo Pixracer](../flight_controller/pixracer.md)                | 조종사 시점(FPV) 레이싱에 최적화된 초소형 초경량 자동조종장치입니다. 6개 이하의 모터를 사용하는 소형 드론에 적합합니다. [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md)와 [MindRacer](../flight_controller/mindracer.md)도 비슷한 유형에 적합합니다.             |
| [Hex Cube Black](../flight_controller/pixhawk-2.md)             | 주로 상용 시스템 제조업체를위한 자동조종장치입니다. 배선을 줄이고 신뢰성을 높였으며, 손 쉬운 조립을 위하여 도메인 별 캐리어 보드를 사용할 수 있도록 설계하었습니다.                                                                                                            |
| [CUAV Pixhack v3](../flight_controller/pixhack_v3.md)           | SOLO Pixhawk <sup>&reg;</sup> 2 (PH2) 콘트롤러의 변형입니다. 개선된 인터페이스, 진동 감쇠 및 온도조절기능 등이 추가되었습니다.                                                                                                                 |
| [mRo Pixhawk 1](../flight_controller/mro_pixhawk.md)            | 인기있는 *범용* 비행 콘트롤러입니다. 단종된 3DR [Pixhawk 1](../flight_controller/pixhawk.md)의 FMUv3 버전입니다.                                                                                                                 |


## 고성능 컴퓨팅 성능의 자동비행장치

아래의 비행 콘트롤러와 개발 플랫폼은 운송체에 보조 컴퓨터를 장착하여 컴퓨터 비전 등의 고성은 연산 기능을 제공합니다.

| 콘트롤러                                                                       | 설명                                  |
| -------------------------------------------------------------------------- | ----------------------------------- |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)     | 라즈베리파이를 자동조종장치에 연결하여 보조 컴퓨터로 사용합니다. |
| [Raspberry Pi 2/3/4 PilotPi](../flight_controller/raspberry_pi_pilotpi.md) | 라즈베리파이를 비행 콘트롤러로 사용할 수 있습니다.        |


## PX4를 지원 상용 초소형 드론

PX4는 인기 있는 상업용 드론 제품들에서 사용되고 있습니다. 제품들은 PX4와 함께 제공되거나 PX4로 업데이트할 수 있습니다. PX4를 통하여 차량에 임무 계획이나 기타 비행 모드 적용이 가능합니다.

더 자세한 내용은 [완전품 드론](../complete_vehicles/README.md)편을 참고하십시오

