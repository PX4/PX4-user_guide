---
canonicalUrl: https://docs.px4.io/main/ko/getting_started/flight_controller_selection
---

# 비행 컨트롤러 선택

기체의 물리적인 조건, 비행 목적과 비용에 적합한 하드웨어를 선택해야 합니다.

PX4는 많은 수의 비행 제어기에서 실행가능합니다. [Autopilot Hardware](../flight_controller/README.md)나 [Github의 ](https://github.com/PX4/PX4-Autopilot/#supported-hardware) 지원 보드 목록을 참고하세요. 주요 목록은 아래와 같습니다.

## Pixhawk 시리즈

[Pixhawk시리즈](../flight_controller/pixhawk_series.md)는 NuttX OS 기반 PX4 오픈 하드웨어입니다. 다양한 폼 팩터를 기반의 다양한 적용 사례가 있으며, 높은 시장 점유율을 자랑합니다.

아래의 [Pixhawk 표준 자동조종장치](../flight_controller/autopilot_pixhawk_standard.md)들은 PX를 지원하고 있으며, PX4 지원팀의 테스트를 거친 제품들입니다. 기타 자동조종장치들은 [제조사들의 지원을](../flight_controller/autopilot_manufacturer_supported.md) 받고 있습니다.

| 제어기                                                             | 설명                                                                                                                                                                                                                      |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Holybro Pixhawk 4](../flight_controller/pixhawk4.md)           | 픽스호크 4는 PX4 버전 1.7을 실행하는데 최적화 되어 있으며 연구와 상업용 개발자들에게 적합합니다. 이전 버전 보다 더 많은 컴퓨팅 성능과 2 배의 RAM, 더 나은 통합 및 확장을위한 추가 포트, 새로운 센서 및 내장형 진동 차단 기능이 있습니다.                                                                          |
| [Holybro Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md) | Pixhawk 4 미니는 *Pixhawk 4*의 성능을 더 작은 드론으로 적용하기를 원하는 엔지니어와 동호인들을 위해 설계되었습니다. *Pixhawk 4 Mini*는 *Pixhawk 4*의 FMU 프로세서 및 메모리 리소스는 동일하며 자주 사용되지 않는 인터페이스들을 제거하였습니다. 이를 통해 * Pixhawk 4 Mini*는 250mm 레이서 드론에 들어갈 수있을 만큼 소형입니다. |
| [Drotek Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md)    | Pixracer를 기반으로 일부 업그레이드 및 기능이 추가되었습니다.                                                                                                                                                                                  |
| [mRo Pixracer](../flight_controller/pixracer.md)                | 운전자 시점(FPV) 레이싱에 최적화된 초소형/초경량 제어기 6개 이하의 모터가 필요한 소형 기체에 적합합니다. [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md)와 [MindRacer](../flight_controller/mindracer.md)도 비슷한 유형에 제어기 입니다.                                  |
| [Hex Cube Black](../flight_controller/pixhawk-2.md)             | 주로 상용 시스템 제조업체를위한 유연한 자동 조종 장치입니다. 배선을 줄이고 신뢰성을 높이며 조립을 쉽게하기 위해 도메인 별 캐리어 보드와 함께 사용하도록 설계되었습니다.                                                                                                                         |
| [CUAV Pixhack v3](../flight_controller/pixhack_v3.md)           | SOLO Pixhawk <sup> & reg; </sup> 2 (PH2) 컨트롤러의 변형으로, 더 나은 인터페이스 레이아웃과 진동 감쇠 및 온도 조절 시스템 추가 기능등이 개선되었습니다.                                                                                                                |
| [mRo Pixhawk 1](../flight_controller/mro_pixhawk.md)            | 인기있는 * 범용 * 비행 컨트롤러 (단종 된 3DR [ Pixhawk 1 ](../flight_controller/pixhawk.md)의 FMUv3 버전입니다).                                                                                                                             |

## 고성능 컴퓨팅 연산 능력의 자율비행장치

이래의 비행 컨트롤러와 개발 플랫폼은 운송체내에 "보조 컴퓨팅"을 제공하여 컴퓨터 비전 및 기타 계산 집약적인 작업이 가능합니다.

| 제어기                                                                        | 설명                                         |
| -------------------------------------------------------------------------- | ------------------------------------------ |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)     | 라즈베리파이를 자동 조종 장치에 연결하여 보조 컴퓨터로 사용할 수 있습니다. |
| [Raspberry Pi 2/3/4 PilotPi](../flight_controller/raspberry_pi_pilotpi.md) | Fly your Pi :)                             |

## PX4를 실행할 수있는 상용 초소형 드론

PX4는 함께 제공되는 일부 제품과 PX4로 업데이트 할 수있는 다른 제품 (미션 계획 및 기타 PX4 비행 모드를 차량에 추가 할 수 있음)을 포함하여 다수의 상업용 드론에서도 사용할 수 있습니다.

더 자세한 내용은 [완전 차량](../complete_vehicles/README.md)을 참조하십시오