---
canonicalUrl: https://docs.px4.io/main/ko/gps_compass/rtk_gps_freefly
---

# Freefly Systems RTK GPS

[Freefly Systems RTK GPS 모듈](https://store.freeflysystems.com/products/rtk-gps-ground-station)은 매우 안정적인 내비게이션을 제공하는 Freefly Systems의 다중 대역 [RTK GPS 모듈](../gps_compass/rtk_gps.md)입니다. 모듈은 로버(항공기에 설치된 경우) 또는 기지국(컴퓨터에 연결된 경우)으로 작동할 수 있습니다.

주요 특징은 다음과 같습니다.
- Multiband (L1/L2) 수신기 (u-blox ZED-F9P)
- 최대 4 개의 GNSS(GPS, Galileo, GLONASS, BeiDou) 동시 수신
- 내장형 자력계(IST8310), 기압계(BMP388), RGB LED, 안전 스위치 및 안전 LED

:::note
이 모듈은 PX4 v1.9 이상에서 사용할 수 있습니다 (u-blox ZED-F9P에 대한 지원은 PX4 v1.9에서 추가됨).
:::

![FreeFly GPS 모듈](../../assets/hardware/gps/freefly_gps_module.jpg)


## Where to Buy

* [Freefly Store](https://store.freeflysystems.com/products/rtk-gps-ground-station)

## 키트 내용물

RTK GPS 키트에는 다음 내용물들이 포함됩니다.
- 안테나가 있는 GPS 모듈 2개
- 3m USB C to A 케이블
- 베이스 스테이션 모듈용 마그네틱 퀵 마운트 (삼각대 마운트용 1/ 4-20 스레드)
- Freefly AltaX에 장착하는 나사


## 설정

RTK setup and use on PX4 via *QGroundControl* is largely plug and play (see [RTK GPS](../gps_compass/rtk_gps.md) for more information).

기체의 경우 PX4가 전송속도 매개변수 [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD)를 115200 8N1로 설정하여야 합니다.

## 배선

Freefly RTK GPS는 PixHawk 자동조종장치에 연결할 수있는 8핀 JST-GH 커넥터와 함께 제공됩니다. 모듈에는 베이스 스테이션용  USB-C 커넥터가 있습니다.

### 핀배열

Freefly GPS 핀배열은 아래와 같습니다. [Hex Cube](../flight_controller/pixhawk-2.md) 및 [PixRacer](../flight_controller/pixracer.md)와 같은 자동조종장치의 경우에는 1-1 8핀 JST-GH 케이블만 있으면됩니다.

| 핀 | Freefly GPS |
| - | ----------- |
| 1 | VCC_5V      |
| 2 | GPS_RX      |
| 3 | GPS_TX      |
| 4 | I2C_SCL     |
| 5 | I2C_SDA     |
| 6 | BUTTON      |
| 7 | BUTTON_LED  |
| 8 | GND         |

## 사양

- u-blox ZED-F9P GPS 수신기
  - 빠른 (핫 스타트) 재시작을 위한 Ultracap 백업 전원
  - 향상된 EMI 내성을 위한 수신기를 통한 EMI 차폐
- IST8310 자력계
- 안전 스위치 및 안전 LED
- 상태표시용 RGB LED
  - NCP5623CMUTBG I2C 드라이버
- I2C 버스의 BMP388 기압계
- 외부 활성 안테나(Maxtena M7HCT)
  - SMA 커넥터
- 미래의 CAN 기반 통신을 위한 STM32 MCU
  - USB 커넥터를 통한 펨웨어 업데이트
- 연결성:
  - USB-C
  - MCU 및 F9P에 대한 양방향 USB 스위치
  - 활성 안테나용 SMA (최대 20mA)
  - 4핀 JST-GH CAN 버스(드론코드 준수)
  - 8핀 JST-GH UART/I2C -** Power:
  - 입력 (다이오드 OR'd) :
  - USB (5V)
  - CAN (4.7 ~ 25.2V)
  - (4.7 ~ 25.2V)
  - 전력 소모 1W 이하

## 추가 정보

자세한 정보는 [Freefly Wiki](https://freefly.gitbook.io/freefly-public/products/rtk-gps)를 참고하십시오.
  