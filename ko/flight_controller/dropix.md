---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/dropix
---

# DroPix 비행 컨트롤러

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://store.drotek.com/)에 문의하십시오.<br/> :::

Drotek<sup>&reg;</sup> *DroPix 자동조종장치*는 [Pixhawk<sup>&reg;</sup>-프로젝트](https://pixhawk.org/) **FMUv2** 개방형 하드웨어 디자인을 기반으로합니다.  PX4를 [NuttX](https://nuttx.apache.org/) OS에서 실행합니다.

DroPix 시스템에는 통합 멀티 스레딩, Unix/Linux와 유사한 프로그래밍 환경, 임무 및 비행 동작의 Lua 스크립팅과 같은 완전히 새로운 자동 조종 기능, 모든 프로세스에 걸쳐 타이트한 타이밍을 보장하는 맞춤형 PX4 드라이버 레이어가 포함됩니다.

![Dropix](../../assets/flight_controller/dropix/dropix_flight_controller_hero.jpg)

:::note
이 비행 컨트롤러는 [제조업체의 지원](../flight_controller/autopilot_manufacturer_supported.md)을 받을 수 있습니다. :::


## 주요 특징

* NuttX RTOS 실행 고급 32 비트 ARM Cortex® M4 프로세서
* 14 개 PWM/서보 출력(페일세이프 및 수동 오버라이드 포함 8 개, 보조, 고전력 호환 5 개)
* 추가 주변 장치(UART, I2C, CAN) 다양한 연결 옵션
* 전용 프로세서 및 독립형 전원 공급 장치로 비행중 복구 및 수동 오버라이드 통합 백업 시스템
* 백업 시스템은 믹싱을 통합하여 일관된 자동조종장치와 수동 오버라이드 믹싱 모드를 제공합니다.
* 중복 전원공급장치 및 자동 장애 조치
* 모터 간편 활성화를 위한 외부 안전 버튼
* 다색 LED 표시기
* 고전력 멀티톤 피에조 오디오 표시기
* 장기간 고속 로깅을 위한 microSD 카드
* 센서
  * ST Micro L3GD20 3축 16비트 자이로스코프
  * ST Micro LSM303D 3축 14비트 가속도계/자력계
  * Invensense<sup>&reg;</sup> MPU 6000 3축 가속도계/자이로스코프
  * MEAS MS5611 기압계
* 표준 MK 스타일 장착 구멍 45mm x 45mm (M3 구멍)
* 크기
  * 크기: 67*50* 6mm
  * 중량: 15g (커넥터 제외)

## 구매처

[DroPix Autopilots & Accessories](https://store.drotek.com/dropix-autopilots)


## 문서

[DroPix 사용 설명서](https://drotek.gitbook.io/dropix-user-guide/)

## 배선 가이드

아래의 다이어그램은 Dropix 커넥터 정보를 보여줍니다(자세한 내용은 [drotek 문서](https://drotek.gitbook.io/dropix-user-guide/) 참조).

<img src="../../assets/flight_controller/dropix/dropix_connectors_front.jpg" alt="전면 커넥터" width="500px" />

<img src="../../assets/flight_controller/dropix/dropix_connectors_side_and_back.jpg" alt="전면 커넥터" width="500px" />


## 펌웨어 빌드

::::tip 대부분의 사용자들은 펌웨어를 빌드할 필요는 없습니다. It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected. :::

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) 방법 :
```
make px4_fmu-v2_default
```

## 시리얼 포트 매핑

| UART   | 장치         | 포트             |
| ------ | ---------- | -------------- |
| UART1  | /dev/ttyS0 | IO 디버그         |
| USART2 | /dev/ttyS1 | TELEM1 (흐름 제어) |
| USART3 | /dev/ttyS2 | TELEM2 (흐름 제어) |
| UART4  |            |                |
| UART7  | 콘솔         |                |
| UART8  | SERIAL4    |                |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->