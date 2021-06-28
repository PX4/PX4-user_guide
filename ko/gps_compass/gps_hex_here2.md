# HEX/ProfiCNC Here2 GPS

[Here2 GPS 수신기](http://www.proficnc.com/all-products/152-gps-module.html)는 HEX의 Here GPS 모듈에 대한 업데이트입니다.

주요 특징은 다음과 같습니다.

- 최대 3 개의 GNSS(GPS, Galileo, GLOSNASS, BeiDou) 동시 수신
- 업계 최고의 - 167dBm 탐색 감도
- 보안 및 무결성 보호
- 모든 위성 증강 시스템 지원
- 고급 재밍 및 스푸핑 감지

![](../../assets/hardware/gps/here2_gps_module.jpg)

## 구매처

- [ProfiCNC](http://www.proficnc.com/all-products/152-gps-module.html) (오스트레일리아)
- [기타 리셀러](http://www.proficnc.com/stores)

## 설정

PX4의 설정과 사용법은 대부분 플러그앤플레이입니다.

:::note GPS가 *감지되지 않으면* [Here2 펌웨어를 업데이트](https://docs.cubepilot.org/user-guides/here-2/updating-here-2-firmware) 합니다.
:::

## 배선

Here2 GPS는 [Pixhawk 2](http://www.hex.aero/wp-content/uploads/2016/07/DRS_Pixhawk-2-17th-march-2016.pdf) GPS UART 포트에 직접 삽입할 수있는 8 핀 커넥터와 함께 제공됩니다.

Pixhawk 3 Pro와 Pixracer에는 6 핀 GPS 포트 커넥터가 있습니다. 이러한 컨트롤러에서는 GPS 케이블 (아래 그림 참조)을 수정하여 핀 6과 7을 제거할 수 있습니다.

<img src="../../assets/hardware/gps/rtk_here_plug_gps_to_6pin_connector.jpg" width="500px" />

핀 6과 7은 안전 버튼용이며 필요한 경우 부착 가능합니다.

### 핀배열

The Here2 GPS pinout is provided below. This can be used to help modify the connector for other autopilot boards.

| pin | Here2 GPS  | pin | Pixhawk 3 Pro GPS |
| --- | ---------- | --- | ----------------- |
| 1   | VCC_5V     | 1   | VCC               |
| 2   | GPS_RX     | 2   | GPS_TX            |
| 3   | GPS_TX     | 3   | GPS_RX            |
| 4   | SCL        | 4   | SCL               |
| 5   | SDA        | 5   | SDA               |
| 6   | BUTTON     | -   | -                 |
| 7   | BUTTON_LED | -   | -                 |
| 8   | GND        | 6   | GND               |

## Specification

- **Processor:** STM32F302
- **Sensor** 
  - **Compass, Gyro, Accelerometer:** ICM20948
  - **Barometer:** MS5611
- **Receiver Type:** 72-channel u-blox M8N engine, GPS/QZSS L2 C/A, GLONASS L10F, BeiDou B11, Galileo E1B/C, SBAS L1 C/A: WAAS, EGNOS, MSAS, GAGAN
- **Navigation Update Rate:** Max: 10 Hz
- **Positionaing Accuracy:** 3D Fix
- **Time to first fix:** 
  - **Cold start:** 26s
  - **Aided start:** 2s
  - **Reacquisition:** 1s
- **Sensitivity:** 
  - **Tracking & Navigation:** -167 dBm
  - **Hot start:** -148 dBm
  - **Cold start:** -157 dBm
- **Assisted GNSS** 
  - AssistNow GNSS Online
  - AssistNow GNSS Offline (up to 35 days)
  - AssistNow Autonomous (up to 6 days)
  - OMA SUPL& 3GPP compliant
- **Oscillator:** TCXO (NEO-8MN/Q)
- **RTC crystal:** Build in
- **ROM:** Flash (NEO-8MN)
- **Available Antennas:** Active Antenna & Passive Antenna
- **Signal Integrity:** Signature feature with SHA 256
- **Protocols & Interfaces:** 
  - **UART/I2C/CAN:** JST_GH Main interface, Switch internally.
  - **STM32 Main Programming Interface:** JST_SUR