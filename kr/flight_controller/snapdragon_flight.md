# Snapdragon Flight Autopilot

Snapdragon Flight 플랫폼은 하이엔드 autopilot / 온보드 컴퓨터로 PX4 Flight Stack을 QuRT 실시간 운영체제가 돌아가는 DSP에서 실행됩니다. 이때 POSIX 호환을 위해서 [DSPAL API](https://github.com/ATLFlight/dspal)을 사용합니다. [Pixhawk](../flight_controller/pixhawk.md)와 비교하면 카메라와 WiFi 그리고 하이엔드 프로세싱 파워, IO가 다릅니다.

Snapdragon Flight 플랫폼에 관한 보다 상세한 정보는 [Snapdragon-Flight-Details](https://www.intrinsyc.com/qualcomm-snapdragon-flight-details/)을 참고하세요.

![](../../assets/hardware/hardware-snapdragon.jpg)

## 간략 요약

  * System-on-Chip: [Snapdragon 801](https://www.qualcomm.com/products/snapdragon/processors/801)
    * CPU: Quad-core 2.26 GHz Krait
    * DSP: Hexagon DSP (QDSP6 V5A) – 801 MHz+256KL2 (flight 코드 실행)
    * GPU: Qualcomm® Adreno™ 330 GPU
    * RAM: 2GB LPDDR3 PoP @931 MHz
  * Storage: 32GB eMMC Flash
  * Video: Sony IMX135 on Liteon Module 12P1BAD11
    * 4k@30fps 3840×2160 video capture to SD card with H.264 @ 100Mbits (1080p/60 with parallel FPV), 720p FPV
  * Optic Flow: Omnivision OV7251 on Sunny Module MD102A-200
    * 640x480 @ 30/60/90 fps
  * Wifi: Qualcomm® VIVE™ 1-stream 802.11n/ac with MU-MIMO † Integrated digital core
  * BT/WiFi: BT 4.0 and 2G/5G WiFi via QCA6234
    * 802.11n, 2×2 MIMO with 2 uCOAX connectors on-board for connection to external antenna
  * GPS: Telit Jupiter SE868 V2 module (use of an external u-Blox module is recommended by PX4 instead)
    * uCOAX connector on-board for connection to external GPS patch antenna
    * CSR SiRFstarV @ 5Hz via UART
  * Accelerometer / Gyro / Mag: Invensense MPU-9250 9-Axis Sensor, 3x3mm QFN, on bus SPI1
  * Baro: Bosch BMP280 barometric pressure sensor, on bus I2C3
  * Power: 5VDC via external 2S-6S battery regulated down to 5V via APM adapter
  * 구입: [Intrinsyc Store](http://shop.intrinsyc.com/products/snapdragon-flight-dev-kit)

## 추천 셋업

다음 셋업으로 Snapdragon Flight 사용합니다.

![](../../assets/hardware/snapdragon-setup_1.JPG)
![](../../assets/hardware/snapdragon-setup_4.JPG)

#### 컴포넌트
* [Quantum Falcon 250](https://hobbyking.com/en_us/quanum-falcon-billet-block-fpv-racing-frame.html?___store=en_us)
* 3DR PIXHAWK MINI GPS
* Trone range finder
* Spektrum DXe and FPV Racing Serial Receiver (3.3V Autobind)

상세한 배선은 아래와 같습니다.

Snapdragon Flight에 마운트하기 위해서 커스텀 보드와 카메라 마운트를 사용할 수 있습니다.(optical flow camera mount는 최신 보드에 사용할 수 없습니다):
* [보드 마운팅 판, for  5mm dampers](https://drive.google.com/open?id=0B2piootk_fIKZ3YyRXQzR1A0ejQ)
* [보드 마운팅 판, for  7mm dampers](https://drive.google.com/open?id=0B2piootk_fIKUUYzMEd6WWxmNnM)
* [Hires 카메라 마운트, 파트 1](https://drive.google.com/open?id=0B2piootk_fIKdTlkX2c5c2IyNGM)
* [Hires 카메라 마운트, 파트 2](https://drive.google.com/open?id=0B2piootk_fIKbkcxZndrQjFrc0E)
* [Optical flow 카메라 마운트](https://drive.google.com/open?id=0B2piootk_fIKcXJRRW9ZT3hDTlk)

hires 카메라 마운트를 조립하기 위해서, 추가로 나사를(M2x6나 M1.6x6) 사용해야만 합니다.

특별히 셋업에서 [these](https://hobbyking.com/en_us/vibration-damping-ball-50gram-8-pcs-bag.html)와 유사한 지름 7mm 마운팅 진동 댐퍼를 사용합니다.
추가로 다음과 같은 것들이 필요합니다:
* Screws, M3x12
* O-rings, 3mm 내부 지름
* M3 washers, ~9mm 내부용
* M3 washers, ~12mm 외부용

![](../../assets/hardware/snapdragon-setup_5.JPG)
![](../../assets/hardware/snapdragon-setup_3.JPG)


## Connectivity

  * 1개 USB 3.0 OTG 포트 (micro-A/B)
  * Micro SD 카드 슬롯
  * 짐벌 커넥터 (PWB/GND/BLSP)
  * ESC 커넥터 (2W UART)
  * I2C
  * 60-pin 고속 Samtec QSH-030-01-L-D-A-K 확장 커넥터
    * 2x BLSP ([BAM 저속 주변장치](http://www.inforcecomputing.com/public_docs/BLSPs_on_Inforce_6540_6501_Snapdragon_805.pdf))
    * USB

## Pinouts

> **Warning** 비록 Snapdragon은 DF13 커넥터를 사용하짐나 pinout은 Pixhawk와 다릅니다.

상세 pinout 정보는 여기 참고 : [Qualcomm Developer Network](https://developer.qualcomm.com/hardware/snapdragon-flight/board-pin-outs).

### WiFi

  * WLAN0, WLAN1 (+BT 4.0): U.FL 커넥터: [Taoglas adhesive antenna (DigiKey)](http://www.digikey.com/product-detail/en/FXP840.07.0055B/931-1222-ND/3877414)


### 커넥터

시리얼 포트의 기본 매핑은 다음과 같습니다. :

| Device           | Description                           |
| ---------------- | ------------------------------------- |
| ```/dev/tty-1``` | J15 (next to USB)                     |
| ```/dev/tty-2``` | J13 (next to power module connector)  |
| ```/dev/tty-3``` | J12 (next to J13)                     |
| ```/dev/tty-4``` | J9 (next to J15)                      |

BAM 매핑에 대한 커스텀 UART은 "blsp.config"라는 파일을 생성하고 adb로 ```/usr/share/data/adsp```에 넣습니다. 예로 기본 매핑을 유지하려면 여러분의 "blsp.config"은 다음과 같게 할 수도 있습니다. :

tty-1 bam-9 2-wire  
tty-2 bam-6 2-wire  
tty-3 bam-8 2-wire  
tty-4 bam-2 2-wire  

아래 테이블에서 지정한 TX와 RX pin만 UART가 사용도록 하고 싶으면 각 라인의 끝에 "2-wire" 문자를 포함하면 됩니다. 만약 2-wire를 지정하지 않으면(혹은 파일에 타겟에 없는 경우) UART는 기본적으로 4-wire 모드를 사용하고 RTS/CTS flow control을 위해서 추가로 2핀을 필요로 합니다. 이렇게 하면 동일한 커넥터 상에 있는 다른 I/O의 타입에도 문제가 발생할 수 있습니다. 만약 J9(아래 설명)가 UART가 I2C 장치 양쪽모두 연결되면, pin 4와 pin 6에 있는 I2C 신호는 I2C SDA와 SCL 신호를 사용하지 않고 RTS와 CTS 신호로 설정될 수 있습니다.

#### J9 / GPS

| Pin | 2-wire UART + I2C | 4-wire UART | SPI | Comment |
| -- | -- | -- | -- | -- |
| 1 | 3.3V | 3.3V | 3.3V | |
| 2 | UART2_TX | UART2_TX | SPI2_MOSI | Output (3.3V) |
| 3 | UART2_RX | UART2_RX | SPI2_MISO | Input (3.3V) |
| 4 | I2C2_SDA | UART2_RTS | SPI2_CS | (3.3V) |
| 5 | GND | GND | GND | |
| 6 | I2C2_SCL | UART2_CTS | SPI2_CLK | (3.3V) |

#### J12 / Gimbal bus

| Pin | 2-wire UART + GPIO | 4-wire UART | SPI | Comment |
| -- | -- | -- | -- | -- |
| 1 | 3.3V | 3.3V | 3.3V | |
| 2 | UART8_TX | UART8_TX | SPI8_MOSI | Output (3.3V) |
| 3 | UART8_RX | UART8_RX | SPI8_MISO | Input (3.3V) |
| 4 | APQ_GPIO_47 | UART8_RTS | SPI8_CS | (3.3V) |
| 5 | GND | GND | GND | |
| 6 | APQ_GPIO_48 | UART8_CTS | SPI8_CLK | (3.3V) |

#### J13 / ESC bus

| Pin | 2-wire UART + GPIO | 4-wire UART | SPI | Comment |
| -- | -- | -- | -- | -- |
| 1 | 5V | 5V | 5V | |
| 2 | UART6_TX | UART6_TX | SPI6_MOSI | Output (5V) |
| 3 | UART6_RX | UART6_RX | SPI6_MISO |Input (5V) |
| 4 | APQ_GPIO_29 | UART6_RTS | SPI6_CS | (5V) |
| 5 | GND | GND | GND | |
| 6 | APQ_GPIO_30 | UART6_CTS | SPI6_CLK | (5V) |

#### J14 / Power

| Pin | Signal | Comment |
| -- | -- | -- |
| 1 | 5V DC | Power input |
| 2 | GND | |
| 3 | I2C3_SCL | (5V) |
| 4 | I2C3_SDA | (5V) |

#### J15 / Radio Receiver / Sensors

| Pin | 2-wire UART + I2C | 4-wire UART | SPI | Comment |
| -- | -- | -- | -- | -- |
| 1 | 3.3V | 3.3V | 3.3V | |
| 2 | UART9_TX | UART9_TX | SPI9_MOSI | Output |
| 3 | UART9_RX | UART9_RX | SPI9_MISO | Input |
| 4 | I2C9_SDA | UART9_RTS | SPI9_CS | |
| 5 | GND | GND | GND | |
| 6 | I2C9_SCL | UART9_CTS | SPI9_CLK | |

## 주변장치

### GPS 배선

비록 3DR GPS가 5v 입력을 받는다고 되어 있지만, 3.3V로도 잘 동작하는 걸로 보입니다. (빌트인 레귤레이터 MIC5205의 최소 동작 전압은 2.5v입니다.)

| Snapdragon J9 Pin | Signal   | Comment       | 3DR GPS 6pin/4pin  | Pixfalcon GPS pin | 3DR PIXHAWK MINI GPS |
| ----------------- | ---------| ------------- | ------------------ | ----------------- | -------------------  |
| 1                 | 3.3V     | (3.3V)        | 1                  | 4                 |3 (5V)                |
| 2                 | UART2_TX | Output (3.3V) | 2/-                | 3                 |4                     |
| 3                 | UART2_RX | Input (3.3V)  | 3/-                | 2                 |5                     |
| 4                 | I2C2_SDA | (3.3V)        | -/3                | 5                 |2                     |
| 5                 | GND      |               | 6/-                | 1                 |6                     |
| 6                 | I2C2_SCL | (3.3V)        | -/2                | 6                 |1                     |

### PWM ESC 배선

모터 제어를 위해서 PWM ESC를 사용할 수 있습니다. J13 커넥터(파워 모듈 커넥터 옆)를 사용해서 배선합니다. ESC 넘버는 [여기](../airframes/airframe_reference.md#quadrotor-x)를 참조하세요.

| Snapdragon J13 Pin | ESC | Comment                   |
| ------------------ | --- | ------------------------  |
| 1                  | -   | They already have voltage |
| 2                  | 1   | Signal (orange)           |
| 3                  | 2   | Signal (orange)           |
| 4                  | 3   | Signal (orange)           |
| 5                  | GND | GND from all ESCs         |
| 6                  | 4   | Signal (orange)           |

### RC 배선

| Snapdragon J12 Pin | Spektrum receiver (3 pins) |
| ------------------ | -------------------------- |
| 1                  | 3.3 V                      |
| 2                  | -                          |
| 3                  | Signal                     |
| 4                  | -                          |
| 5                  | GND                        |
| 6                  | -                          |

### Trone Range Finder 배선

| Snapdragon J15 Pin | Trone (4 pins) |
| ------------------ | -------------- |
| 1                  | 1              |
| 2                  | -              |
| 3                  | -              |
| 4                  | 3              |
| 5                  | 4              |
| 6                  | 2              |

상세 내용은 [여기](../flight_controller/snapdragon_flight_camera.md)를 참고하세요.

### UART to Pixracer / Pixfalcon Wiring

여기서 인터페이스는 Pixracer / Pixfalcon을 I/O 인터페이스 보드로 사용합니다. `TELEM1` Pixfalcon에 연결하고 `TELEM2` Pixracer에 연결합니다.

| Snapdragon J13 Pin | Signal | Comment | Pixfalcon / Pixracer Pin |
| -- | -- | -- | -- |
| 1 | 5V | Power for autopilot | 5V |
| 2 | UART6_TX | Output (5V) TX -> RX | 3 |
| 3 | UART6_RX | Input (5V) RX -> TX | 2 |
| 4 | APQ_GPIO_29 | (5V) | Not connected |
| 5 | GND | | 6 |
| 6 | APQ_GPIO_30 | (5V) | Not connected |

## Dimensions

![](../../assets/hardware/hardware-snapdragon-dimensions.png)
