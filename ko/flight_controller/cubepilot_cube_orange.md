---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/cubepilot_cube_orange
---

# CubePilot Cube Orange Flight Controller

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://cubepilot.org/#/home)에 문의하십시오.
:::

The [Cube Orange](https://www.cubepilot.com/#/cube/features) flight controller is a flexible autopilot intended primarily for manufacturers of commercial systems.

![Cube Orange](../../assets/flight_controller/cube/orange/cube_orange_hero.jpg)

배선을 줄이고 신뢰성을 높이며 조립을 쉽게하기 위해 도메인별 캐리어 보드와 함께 사용하도록 설계되었습니다. 예를 들어, 상용 검사 기체 캐리어보드에는 보조 컴퓨터용 연결이 포함될 수 있는 반면, 레이서 용 캐리어보드는 기체 프레임을 형성하는 ESC를 포함할 수 있습니다.

The ADS-B carrier board includes a customized 1090MHz ADSB-In receiver from uAvionix. This provides attitude and location of commercial manned aircraft within the range of Cube. This is automatically configured and enabled in the default PX4 firmware.

Cube에는 2 개의 IMU에 진동 차단이 포함되어 있으며, 세 번째 고정 IMU는 참조 백업용으로 사용됩니다.

:::note
제조업체 [Cube 문서](https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview)에는 [큐브 색상 간의 차이점](https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview#differences-between-cube-colours) 뿐만 아니라 자세한 정보를 제공합니다.
:::

## 주요 특징

- 32bit STM32H753VI (32bit [ARM Cortex M7](https://en.wikipedia.org/wiki/ARM_Cortex-M#Cortex-M7), 400 MHz, Flash 2MB, RAM 1MB).
- 32 비트 STM32F103 failsafe 코 프로세서
- 14 개 PWM/서보 출력(페일세이프 및 수동 오버라이드 포함 8 개, 보조, 고전력 호환 6 개)
- 추가 주변 장치(UART, I2C, CAN) 다양한 연결 옵션
- 전용 프로세서와 독립형 전원 공급 장치(고정익 적용)로 비행중 복구 기능과 수동 오버라이드 통합 백업 시스템
- Backup system integrates mixing, providing consistent autopilot and manual override mixing modes (fixed-wing use)
- 중복 전원공급장치 및 자동 장애 조치
- 외부 안전 스위치
- 다색 LED 주시각 표시기
- 고전력 멀티톤 피에조 오디오 표시기
- 장기간 고속 로깅용 microSD 카드

<a id="stores"></a>

## 구매처

- [Reseller list](https://www.cubepilot.com/#/reseller/list)

## 조립

[Cube 배선 퀵 스타트](../assembly/quick_start_cube.md)

## 사양

- **프로세서:**
  - STM32H753VI (32bit [ARM Cortex M7](https://en.wikipedia.org/wiki/ARM_Cortex-M#Cortex-M7))
  - 400 MHz
  - 1 MB RAM
  - 2MB 플래시 \(완전 액세스 가능\)
- **장애복구 co-processor:** <!-- inconsistent info on failsafe processor: 32 bit STM32F103 failsafe co-processor http://www.proficnc.com/all-products/191-pixhawk2-suite.html -->
  - STM32F103 (32bit _ARM Cortex-M3_)
  - 24 MHz
  - 8 KB SRAM
- **센서:** (모두 SPI를 통해 연결됨)
  - **가속도계:** (3) ICM20948, ICM20649, ICM20602
  - **자이로스코프:** (3) ICM20948, ICM20649, ICM20602
  - **나침반:** (1) ICM20948
  - **기압계:** (2) MS5611
- **작동 조건:**
  - **작동 온도:** -10C ~ 55C
  - **IP 등급/방수:** 방수 아님
  - **서보 레일 입력 전압:** 3.3V / 5V
  - **USB 포트 입력:**
    - 전압: 4V - 5.7V
    - 정격 전류: 250 mA
  - **전원:**
    - 입력 전압: 4.1V - 5.7V
    - 정격 입력 전류: 2.5A
    - 정격 입/출력 전력: 14W
- **크기:**
  - **Cube:** 38.25mm x 38.25mm x 22.3mm
  - **캐리어:** 94.5mm x 44.3mm x 17.3mm
- **인터페이스**
  - IO 포트: 14 개의 PWM 서보 출력(IO에서 8 개, FMU에서 6 개)
  - UART (직렬 포트) 5개, 1 개의 고전력 지원, 2x (HW 흐름 제어 포함)
  - CAN 2개(하나는 내부 3.3V 트랜시버, 하나는 확장 커넥터에 있음)
  - **RC 입력:**
    - Spektrum DSM/DSM2/DSM-X® Satellite 호환 입력
    - Futaba S.BUS® 호환 입력 및 출력
    - PPM 합계 신호 입력
  - RSSI(PWM 또는 전압) 입력
  - I2C
  - SPI
  - 3.3v ADC 입력
  - 내부 microUSB 포트 및 외부 microUSB 포트 확장

## 포트

### 위쪽(GPS, TELEM 등)

![큐브 포트-상단 (GPS, TELEM 등) 및 메인/AUX](../../assets/flight_controller/cube/cube_ports_top_main.jpg)

## Pinouts

#### TELEM1, TELEM2 ports

| Pin     | Signal    | Volt  |
| ------- | --------- | ----- |
| 1 (red) | VCC       | +5V   |
| 2 (blk) | TX (OUT)  | +3.3V |
| 3 (blk) | RX (IN)   | +3.3V |
| 4 (blk) | CTS (IN)  | +3.3V |
| 5 (blk) | RTS (OUT) | +3.3V |
| 6 (blk) | GND       | GND   |

#### GPS1 port

| Pin     | Signal        | Volt  |
| ------- | ------------- | ----- |
| 1 (red) | VCC           | +5V   |
| 2 (blk) | TX (OUT)      | +3.3V |
| 3 (blk) | RX (IN)       | +3.3V |
| 4 (blk) | SCL I2C2      | +3.3V |
| 5 (blk) | SDA I2C2      | +3.3V |
| 6 (blk) | Safety Button | GND   |
| 7 (blk) | Button LED    | GND   |
| 8 (blk) | GND           | GND   |

<!-- check is i2c2 -->

#### GPS2 port

| Pin     | Signal   | Volt  |
| ------- | -------- | ----- |
| 1 (red) | VCC      | +5V   |
| 2 (blk) | TX (OUT) | +3.3V |
| 3 (blk) | RX (IN)  | +3.3V |
| 4 (blk) | SCL I2C1 | +3.3V |
| 5 (blk) | SDA I2C1 | +3.3V |
| 6 (blk) | GND      | GND   |

#### ADC

| Pin     | Signal | Volt        |
| ------- | ------ | ----------- |
| 1 (red) | VCC    | +5V         |
| 2 (blk) | ADC IN | up to +6.6V |
| 3 (blk) | GND    | GND         |

#### I2C

| Pin     | Signal | Volt           |
| ------- | ------ | -------------- |
| 1 (red) | VCC    | +5V            |
| 2 (blk) | SCL    | +3.3 (pullups) |
| 3 (blk) | SDA    | +3.3 (pullups) |
| 4 (blk) | GND    | GND            |

#### CAN1 & CAN2

| Pin     | Signal | Volt |
| ------- | ------ | ---- |
| 1 (red) | VCC    | +5V  |
| 2 (blk) | CAN_H  | +12V |
| 3 (blk) | CAN_L  | +12V |
| 4 (blk) | GND    | GND  |

#### POWER1 & POWER2

| Pin     | Signal          | Volt  |
| ------- | --------------- | ----- |
| 1 (red) | VCC             | +5V   |
| 2 (red) | VCC             | +5V   |
| 3 (blk) | CURRENT sensing | +3.3V |
| 4 (blk) | VOLTAGE sensing | +3.3V |
| 5 (blk) | GND             | GND   |
| 6 (blk) | GND             | GND   |

#### USB

| Pin     | Signal        | Volt            |
| ------- | ------------- | --------------- |
| 1 (red) | VCC           | +5V             |
| 2 (blk) | OTG_DP1       | +3.3V           |
| 3 (blk) | OTG_DM1       | +3.3V           |
| 4 (blk) | GND           | GND             |
| 5 (blk) | BUZZER        | Battery voltage |
| 6 (blk) | FMU Error LED |                 |

#### SPKT

| Pin     | Signal | Volt  |
| ------- | ------ | ----- |
| 1 (blk) | IN     |       |
| 2 (blk) | GND    | GND   |
| 3 (red) | OUT    | +3.3V |

#### TELEM1, TELEM2

| Pin     | Signal    | Volt        |
| ------- | --------- | ----------- |
| 1 (red) | VCC       | +5V         |
| 2 (blk) | TX (OUT)  | +3.3V to 5V |
| 3 (blk) | RX (IN)   | +3.3V to 5V |
| 4 (blk) | CTS (OUT) | +3.3V to 5V |
| 5 (blk) | RTS (IN)  | +3.3V to 5V |
| 6 (blk) | GND       | GND         |

## 시리얼 포트 매핑

| UART   | 장치         | 포트              |
| ------ | ---------- | --------------- |
| USART2 | /dev/ttyS0 | TELEM1 (흐름 제어)  |
| USART3 | /dev/ttyS1 | TELEM2 (흐름 제어)  |
| UART4  | /dev/ttyS2 | GPS1            |
| USART6 | /dev/ttyS3 | PX4IO           |
| UART7  | /dev/ttyS4 | CONSOLE/ADSB-IN |
| UART8  | /dev/ttyS5 | GPS2            |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->
<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.14/boards/cubepilot/cubeorange/default.px4board -->
<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.14/boards/cubepilot/cubeorange/nuttx-config/nsh/defconfig#L188-L197 -->

### USB/SDCard 포트

![큐브 USB/SDCard 포트 ](../../assets/flight_controller/cube/cube_ports_usb_sdcard.jpg)

## 펌웨어 빌드

::::tip 대부분의 사용자들은 펌웨어를 빌드할 필요는 없습니다. It is pre-built and automatically installed by _QGroundControl_ when appropriate hardware is connected.
:::

이 대상에 대해 [PX4를 빌드](../dev_setup/building_px4.md)하려면 터미널을 열고 다음을 입력하십시오.

```
make cubepilot_cubeorange
```

## Schematics

보드 설계도와 문서는 [The Cube Project](https://github.com/proficnc/The-Cube)를 참고하십시오.

## 추가 정보 및 문서

- [Cube 배선 퀵 스타트](../assembly/quick_start_cube.md)
- Cube 문서 (제조사) :
  - [큐브 모듈 개요](https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview)
  - [큐브 사용 설명서](https://docs.cubepilot.org/user-guides/autopilot/the-cube-user-manual)
  - [미니 캐리어 보드](https://docs.cubepilot.org/user-guides/carrier-boards/mini-carrier-board)
