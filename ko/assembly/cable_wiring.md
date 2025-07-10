---
canonicalUrl: https://docs.px4.io/main/ko/assembly/cable_wiring
---

# 배선 개요

케이블은 플라이웨이, "화장실 볼링" 및 일반적으로 열악한 비행을 비롯한 문제를 일으킬 수 있는 [전자기 간섭(EMI)](https://en.wikipedia.org/wiki/Electromagnetic_interference)의 일반적인 원인입니다. 이러한 문제는 UAV에서 적절한 케이블을 사용하여 피할 수 있습니다.

드론 케이블링을 설계할 때 다음 기본 개념을 염두에 두어야 합니다.
* 고전압 케이블과 신호 케이블은 최대한 분리합니다.
* 케이블 길이는 유선 구성 요소를 쉽게 처리할 수 있도록 최대한 짧게 합니다. 와이어 장력은 충돌 착륙 시에도 가능한 기체 변형을 견딜 수 있어야 합니다. 와이어가 먼저 끊어지지 않는 것이 좋습니다.
* 초과 길이를 줄이기 위한 케이블을 말지 않는 것이 좋습니다. 가능 하면 길이를 짧게 하십시오!
* 디지털 신호는 전송 속도를 줄여 소모 에너지를 줄이고, 데이터 전송의 견고성을 높일 수 있습니다. 이는 높은 데이터 전송률이 필요하지 않는 경우에는 더 긴 케이블을 사용할 수 있음을 의미합니다.

## 신호 배선

신호 전송 프로토콜들은 특성이 각기 다르므로 목적에 따라 사용되는 케이블의 사양이 달라집니다.

이 항목에서는 드론 하드웨어 공급업체들의 [색상 코딩](#cable-colour-coding)과 함께 신호 프로토콜별로 케이블 연결에 대한 구체적인 지침을 제공합니다.


### I²C 케이블

[I2C 버스](https://en.wikipedia.org/wiki/I%C2%B2C)는 센서 연결에 널리 사용됩니다. 여러 공급업체의 케이블 색상이 다음 표에 지정되어 있습니다.

| 신호  | Pixhawk 색상                                       | ThunderFly 색상                                     | CUAV 색상 (I2C/CAN)                                 |
| --- | ------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------- |
| +5V | ![빨강](../../assets/hardware/cables/red.png) 빨강   | ![빨강](../../assets/hardware/cables/red.png) 빨강    | ![빨강](../../assets/hardware/cables/red.png) 빨강    |
| SCL | ![검정](../../assets/hardware/cables/black.png) 검정 | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 | ![흰색](../../assets/hardware/cables/white.png) 흰색  |
| SDA | ![검정](../../assets/hardware/cables/black.png) 검정 | ![녹색](../../assets/hardware/cables/green.png) 녹색  | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 |
| GND | ![검정](../../assets/hardware/cables/black.png) 검정 | ![검정](../../assets/hardware/cables/black.png) 검정  | ![검정](../../assets/hardware/cables/black.png) 검정  |

[Dronecode 표준](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf)은 자동 조종 장치의 SDA 및 SCL 신호에 1.5k 옴 풀업 저항을 가정합니다.

#### 케이블 꼬기

I2C 버스 신호 혼선 및 전자기 호환성은 케이블 와이어를 적절하게 비틀면 크게 향상될 수 있습니다. [트위스트 페어](https://en.wikipedia.org/wiki/Twisted_pair)는 센서 배선에 특히 중요합니다.

- 30cm 케이블 길이당 각 쌍 SCL/+5V 및 SDA/GND에 대해 10회 회전합니다.![I²C JST-GH 케이블](../../assets/hardware/cables/i2c_jst-gh_cable.jpg)
- 케이블 길이 30cm당 두 쌍을 함께 4회 감습니다.![I²C JST-GH 커넥터 상세](../../assets/hardware/cables/i2c_jst-gh_connector.jpg)

적절한 트위스트 페어 케이블을 사용할 때 I²C 버스는 일반적으로 서브미터 규모 기체에 적합합니다. 대형 항공기의 경우 CAN 또는 기타 차동 신호 기반 인터페이스를 사용하는 것이 일반적으로 더 안정적입니다.

:::note
이 권수/케이블 길이 권장 사항은 [ThunderFly TFSLOT 속도 센서](../sensor/airspeed_tfslot.md) 및 [TFRPM01 회전 카운터](../sensor/thunderfly_tachometer.md)를 포함한 I2C 센서에 성공적으로 사용되었습니다. :::


#### 풀업 저항

풀업 저항은 I2C 버스의 모든 끝 부분에 필요합니다. 이것은 [신호 종료](https://en.wikipedia.org/wiki/Electrical_termination)와 버스 유휴 신호 생성기의 역할을 모두 합니다.

풀업 저항의 정확한 값을 확인하기 위해 오실로스코프 측정이 필요한 경우가 있습니다. I2C 버스의 신호는 명확하고 예리한 직사각형과 같은 가장자리와 몇 볼트의 진폭을 가져야 합니다. 신호의 진폭이 낮은 경우 풀업 저항 값이 너무 낮으므로 줄여야 합니다. 반올림된 신호의 경우 풀업 저항 값이 너무 높습니다.

### UAVCAN 케이블

| 신호    | Pixhawk                                          | ThunderFly                                        | Zubax                                             | CUAV (I2C/CAN)                                    |
| ----- | ------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| +5V   | ![빨강](../../assets/hardware/cables/red.png) 빨강   | ![빨강](../../assets/hardware/cables/red.png) 빨강    | ![빨강](../../assets/hardware/cables/red.png) 빨강    | ![빨강](../../assets/hardware/cables/red.png) 빨강    |
| CAN_H | ![검정](../../assets/hardware/cables/black.png) 검정 | ![흰색](../../assets/hardware/cables/white.png) 흰색  | ![흰색](../../assets/hardware/cables/white.png) 흰색  | ![흰색](../../assets/hardware/cables/white.png) 흰색  |
| CAN_L | ![검정](../../assets/hardware/cables/black.png) 검정 | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 |
| GND   | ![검정](../../assets/hardware/cables/black.png) 검정 | ![검정](../../assets/hardware/cables/black.png) 검정  | ![검정](../../assets/hardware/cables/black.png) 검정  | ![검정](../../assets/hardware/cables/black.png) 검정  |

#### 케이블 꼬기

I2C 케이블과 같은 이유로 CAN 케이블도 꼬는 것이 좋습니다. CAN의 경우 권장되는 비틀림은 다음과 같습니다.

- 30cm 케이블 길이당 각 쌍 GND/+5V 및 CAN_L/CAN_H에 대해 10회 회전합니다.![CAN JST-GH 케이블](../../assets/hardware/cables/can_jst-gh_cable.jpg)

- 케이블 길이 30cm당 두 쌍을 함께 4회 감습니다.


### SPI

[SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface)는 더 빠른 센서와 장치를 연결하는 데 사용되는 동기식 직렬 통신 인터페이스입니다. 이 프로토콜은 일반적으로 [광류](../sensor/optical_flow.md) 센서 또는 특수 텔레메트리 모뎀을 연결에 사용됩니다.

| 신호   | Pixhawk 색상                                       | ThunderFly 색상                                     |
| ---- | ------------------------------------------------ | ------------------------------------------------- |
| +5V  | ![빨강](../../assets/hardware/cables/red.png) 빨강   | ![빨강](../../assets/hardware/cables/red.png) 빨강    |
| SCK  | ![검정](../../assets/hardware/cables/black.png) 검정 | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 |
| MISO | ![검정](../../assets/hardware/cables/black.png) 검정 | ![청색](../../assets/hardware/cables/blue.png) 청색   |
| MOSI | ![검정](../../assets/hardware/cables/black.png) 검정 | ![녹색](../../assets/hardware/cables/green.png) 녹색  |
| CS!  | ![검정](../../assets/hardware/cables/black.png) 검정 | ![흰색](../../assets/hardware/cables/white.png) 흰색  |
| CS2  | ![검정](../../assets/hardware/cables/black.png) 검정 | ![청색](../../assets/hardware/cables/blue.png) 청색   |
| GND  | ![검정](../../assets/hardware/cables/black.png) 검정 | ![검정](../../assets/hardware/cables/black.png) 검정  |


### UART

UART는 주변 장치를 자동 조종 장치에 연결하는 데 사용됩니다. 기본적으로 UART는 네트웤을 지원하지 않으므로 두 장치를 직접 연결합니다. 자동 조종 장치와 [무선 모뎀](../telemetry/README.md)을 연결하는 데 자주 사용됩니다.

CTS 및 RTS는 데이터가 TX/RX 핀에서 전송되고 있음을 나타내는 데 사용되는 신호입니다. 이 핸드셰이크 메커니즘은 데이터 전송의 신뢰성을 높입니다. CTS 및 RTS는 장치에서 사용하지 않을 때 느슨한 상태로 남아 있을 수 있습니다.

연결 케이블은 교차되지 않습니다. 따라서, 이 직선 케이블로 자동 조종 장치와 주변 장치만 연결하면 됩니다. 장치는 RX/TX 및 RTS/CTS 핀을 교환하여 내부적으로 배선을 교차하여야 합니다.

| 신호  | Pixhawk 색상                                       | ThunderFly 색상                                     |
| --- | ------------------------------------------------ | ------------------------------------------------- |
| +5V | ![빨강](../../assets/hardware/cables/red.png) 빨강   | ![빨강](../../assets/hardware/cables/red.png) 빨강    |
| TX  | ![검정](../../assets/hardware/cables/black.png) 검정 | ![흰색](../../assets/hardware/cables/white.png) 흰색  |
| RX  | ![검정](../../assets/hardware/cables/black.png) 검정 | ![녹색](../../assets/hardware/cables/green.png) 녹색  |
| CTS | ![검정](../../assets/hardware/cables/black.png) 검정 | ![청색](../../assets/hardware/cables/blue.png) 청색   |
| RTS | ![검정](../../assets/hardware/cables/black.png) 검정 | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 |
| GND | ![검정](../../assets/hardware/cables/black.png) 검정 | ![검정](../../assets/hardware/cables/black.png) 검정  |

UART 신호는 저주파 EMI의 일반적인 소스이므로 케이블 길이를 최대한 최소화해야 합니다. UART 케이블은 꼬임이 필요하지 않습니다.


### GPS(UART) 와 안전

[GPS 수신기와 자력계](../gps_compass/README.md)는 일반적으로 EMI에 매우 민감합니다. 따라서, RF 소스(고출력 케이블, ESC, 무선 모뎀 및 안테나)에서 멀리 떨어진 곳에 장착하여야 합니다. 케이블링이 잘못 설계된 경우 오동작할 수 있습니다.


| 신호              | Pixhawk 색상                                       | ThunderFly 색상                                     |
| --------------- | ------------------------------------------------ | ------------------------------------------------- |
| +5V             | ![빨강](../../assets/hardware/cables/red.png) 빨강   | ![빨강](../../assets/hardware/cables/red.png) 빨강    |
| TX              | ![검정](../../assets/hardware/cables/black.png) 검정 | ![흰색](../../assets/hardware/cables/white.png) 흰색  |
| RX              | ![검정](../../assets/hardware/cables/black.png) 검정 | ![녹색](../../assets/hardware/cables/green.png) 녹색  |
| SCL             | ![검정](../../assets/hardware/cables/black.png) 검정 | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 |
| SDA             | ![검정](../../assets/hardware/cables/black.png) 검정 | ![녹색](../../assets/hardware/cables/green.png) 녹색  |
| SAFETY_SW       | ![검정](../../assets/hardware/cables/black.png) 검정 | ![흰색](../../assets/hardware/cables/white.png) 흰색  |
| SAFETY_SW_LED | ![검정](../../assets/hardware/cables/black.png) 검정 | ![청색](../../assets/hardware/cables/blue.png) 청색   |
| +3V3            | ![검정](../../assets/hardware/cables/black.png) 검정 | ![빨강](../../assets/hardware/cables/red.png) 빨강    |
| BUZZER          | ![검정](../../assets/hardware/cables/black.png) 검정 | ![청색](../../assets/hardware/cables/blue.png) 청색   |
| GND             | ![검정](../../assets/hardware/cables/black.png) 검정 | ![검정](../../assets/hardware/cables/black.png) 검정  |


### GPS

| 신호  | Pixhawk 색상                                       | ThunderFly 색상                                     |
| --- | ------------------------------------------------ | ------------------------------------------------- |
| +5V | ![빨강](../../assets/hardware/cables/red.png) 빨강   | ![빨강](../../assets/hardware/cables/red.png) 빨강    |
| TX  | ![검정](../../assets/hardware/cables/black.png) 검정 | ![흰색](../../assets/hardware/cables/white.png) 흰색  |
| RX  | ![검정](../../assets/hardware/cables/black.png) 검정 | ![녹색](../../assets/hardware/cables/green.png) 녹색  |
| SCL | ![검정](../../assets/hardware/cables/black.png) 검정 | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 |
| SDA | ![검정](../../assets/hardware/cables/black.png) 검정 | ![녹색](../../assets/hardware/cables/green.png) 녹색  |
| GND | ![검정](../../assets/hardware/cables/black.png) 검정 | ![검정](../../assets/hardware/cables/black.png) 검정  |

GPS 케이블은 UART 및 I2C 버스에 모두 연결됩니다. UART 배선은 꼬울 필요가 없으므로, 케이블의 길이는 짧을 수록 좋습니다.


### 아날로그 신호(전원 모듈)

| 신호      | Pixhawk 색상                                       | ThunderFly 색상                                     | CUAV 색상                                           |
| ------- | ------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------- |
| VCC     | ![빨강](../../assets/hardware/cables/red.png) 빨강   | ![빨강](../../assets/hardware/cables/red.png) 빨강    | ![빨강](../../assets/hardware/cables/red.png) 빨강    |
| VCC     | ![검정](../../assets/hardware/cables/black.png) 검정 | ![빨강](../../assets/hardware/cables/red.png) 빨강    | ![빨강](../../assets/hardware/cables/red.png) 빨강    |
| CURRENT | ![검정](../../assets/hardware/cables/black.png) 검정 | ![흰색](../../assets/hardware/cables/white.png) 흰색  | ![흰색](../../assets/hardware/cables/white.png) 흰색  |
| VOLTAGE | ![검정](../../assets/hardware/cables/black.png) 검정 | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 | ![노랑](../../assets/hardware/cables/yellow.png) 노랑 |
| GND     | ![검정](../../assets/hardware/cables/black.png) 검정 | ![검정](../../assets/hardware/cables/black.png) 검정  | ![검정](../../assets/hardware/cables/black.png) 검정  |
| GND     | ![검정](../../assets/hardware/cables/black.png) 검정 | ![검정](../../assets/hardware/cables/black.png) 검정  | ![검정](../../assets/hardware/cables/black.png) 검정  |

이 커넥터는 상대적으로 고전력 및 저전압 신호를 혼합한 예입니다. 아쉽게도 꼬임은 고전력 GND 및 VCC 전선에만 적용할 수 있습니다. 자동 조종 장치로 잡음이 많은 아날로그 신호를 송수신에는 별로 도움이 되지 않습니다.

### 안전

| 신호              | Pixhawk 색상                                       | ThunderFly 색상                                    |
| --------------- | ------------------------------------------------ | ------------------------------------------------ |
| SAFE_VCC        | ![빨강](../../assets/hardware/cables/red.png) 빨강   | ![빨강](../../assets/hardware/cables/red.png) 빨강   |
| SAFETY_SW_LED | ![검정](../../assets/hardware/cables/black.png) 검정 | ![청색](../../assets/hardware/cables/blue.png) 청색  |
| SAFETY_SW       | ![검정](../../assets/hardware/cables/black.png) 검정 | ![흰색](../../assets/hardware/cables/white.png) 흰색 |
| BUZZER          | ![검정](../../assets/hardware/cables/black.png) 검정 | ![청색](../../assets/hardware/cables/blue.png) 청색  |
| +5V             | ![검정](../../assets/hardware/cables/black.png) 검정 | ![빨강](../../assets/hardware/cables/red.png) 빨강   |
| GND             | ![검정](../../assets/hardware/cables/black.png) 검정 | ![검정](../../assets/hardware/cables/black.png) 검정 |


## 고전력 배선

고전력 배선의 경우 가장 중요한 설계 기준은 충분한 전류가 흐를 수 있는 전선 굵기입니다. 일반적인 단면적 요구 사항은 와이어 전류 8A당 1mm²의 면적입니다.

실용적이지 않지만, 양극과 음극 전선을 함께 꼬는 것이 좋습니다.

고전력 케이블의 EMI는 자력계에 상당한 영향을 미칩니다. 이러한 이유로 고전력 케이블과 항법 자력계 사이에는 거리를 두는 것이 좋습니다.


### 케이블 색상 코딩

대부분의 제조업체는 고압선에 빨간색을 사용하고 접지에 검정색을 사용합니다. 기타 색상은 제조사 재량입니다. [Pixhawk 커넥터 표준](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf)에서는 VCC(Voltage Common Collector) 핀/케이블이 빨간색이면 됩니다.

신호 와이어의 색상은 특정 케이블을 식별하는 데 도움이 되어 드론을 더 쉽게 조립할 수 있습니다.

쉬운 케이블 식별을 위해 설계된 색상 코딩 체계는 다음 규칙을 따를 수 있습니다.
- 빨간색과 검은색은 전원용으로 예약되어 있습니다.
- 동일한 신호 유형은 동일한 색상을 가져야 합니다.
- 신호의 색상은 서로 인접한 와이어의 커넥터에서 반복되지 않습니다.
- 핀 수가 동일한 배선 하니스는 고유한 색상 순서를 가져야 합니다. 이것은 케이블 유형을 결정합니다. (매뉴얼에 사용된 사진에 특히 유용합니다.)

이러한 규칙에 따라 설계된 케이블 색상의 예는 다음과 같습니다.

| 색상                                             | 이름 | 선호하는 사용법            |
| ---------------------------------------------- | -- | ------------------- |
| ![빨강](../../assets/hardware/cables/red.png)    | 빨강 | 전원 전압               |
| ![녹색](../../assets/hardware/cables/green.png)  | 녹색 | 범용 신호               |
| ![흰색](../../assets/hardware/cables/white.png)  | 흰색 | 범용 신호               |
| ![노랑](../../assets/hardware/cables/yellow.png) | 노랑 | 범용 신호               |
| ![청색](../../assets/hardware/cables/blue.png)   | 청색 | 전원 복귀, 오픈 컬렉터 제어 신호 |
| ![검정](../../assets/hardware/cables/black.png)  | 검정 | GND, 전원 반환 접지       |


<!-- references for the image source.
This approach just allows more compact markdown --> :::note 위의 규칙은 Thunderfly에서 제공하였으며 케이블 디자인에 사용됩니다.

Thunderfly 및 일부 다른 공급업체의 케이블 색상 코딩은 아래 섹션에 나와 있습니다. 핀 레이블은 자동 조종 장치 쪽의 핀 배치에 해당합니다. 모든 케이블은 직선(1:1)입니다. 크로스오버(예: UART)가 필요한 경우 장치의 내부 연결을 통해 해결하여야 합니다. :::
