# ModalAI 플라이트 코어 v1

<Badge type="tip" text="PX4 v1.11" />

ModalAI [Flight Core v1](https://modalai.com/flight-core) ([데이터시트](https://docs.modalai.com/flight-core-datasheet))은 미국에서 제작된 PX4 용 비행 콘트롤러입니다. Flight Core는 장애물 회피와 GPS 거부 내비게이션을 위해 ModalAI [VOXL](https://modalai.com/voxl)([데이터시트](https://docs.modalai.com/voxl-datasheet/))과 페어링하거나 독립형 비행 콘트롤러로 독립적으로 사용할 수 있습니다.
:::

The ModalAI [Flight Core v1](https://modalai.com/flight-core) ([Datasheet](https://docs.modalai.com/flight-core-datasheet)) is a flight controller for PX4, made in the USA. The Flight Core can be paired with ModalAI [VOXL](https://modalai.com/voxl) ([Datasheet](https://docs.modalai.com/voxl-datasheet/)) for obstacle avoidance and GPS-denied navigation, or used independently as a standalone flight controller.

![FlightCoreV1](../../assets/flight_controller/modalai/fc_v1/main.jpg)

Flight Core is identical to the PX4 Flight Controller portion of [VOXL Flight](https://www.modalai.com/voxl-flight) ([Datasheet](https://docs.modalai.com/voxl-flight-datasheet/)) which integrates the VOXL Companion Computer and Flight Core into a single PCB.

:::note
자세한 하드웨어 문서는 [여기](https://docs.modalai.com/flight-core-datasheet/)를 참고하십시오.
:::

## 사양

| 기능         | 세부 정보                                            |
|:---------- |:------------------------------------------------ |
| 중량         | 6 g                                              |
| MCU        | 216MHz, 32-bit ARM M7 [STM32F765II][stm32f765ii] |
| 메모리        | 256Kb FRAM                                       |
|            | 2Mbit Flash                                      |
|            | 512Kbit SRAM                                     |
| 펌웨어        | [PX4][px4]                                       |
| 관성계        | [ICM-20602][icm-20602] (SPI1)                    |
|            | ICM-42688 (SPI2)                                 |
|            | [BMI088][bmi088] (SPI6)                          |
| 기압계        | [BMP388][bmp388] (I2C4)                          |
| 보안 요소      | [A71CH][a71ch] (I2C4)                            |
| microSD 카드 | [지원되는 카드 정보](../dev_log/logging.md#sd-cards)     |
| 입력         | GPS/자력계                                          |
|            | Spektrum                                         |
|            | 텔레메트리                                            |
|            | CAN 버스                                           |
|            | PPM                                              |
| 출력         | LED 6 개 (2xRGB)                                  |
|            | PWM 채널 8개                                        |
| 추가 인터페이스   | 시리얼포트 3개                                         |
|            | I2C                                              |
|            | GPIO                                             |

::: info More detailed hardware documentation can be found [here](https://docs.modalai.com/flight-core-datasheet/).
:::

<!-- reference links for table above (improve layout) -->
## 크기

![FlightCoreV1Dimensions](../../assets/flight_controller/modalai/fc_v1/dimensions.png)

## PX4 Firmware Compatibility

_Flight Core v1_ is fully compatible with the official PX4 Firmware from PX4 v1.11.

ModalAI maintains a [branched PX4 version](https://github.com/modalai/px4-firmware/tree/modalai-1.11) for PX4 v1.11. This includes UART ESC support and improvements in VIO and VOA that are planned to be upstreamed.

이 보드는 QGroundControl 4.0 이상에서 지원됩니다.

## QGroundControl 지원

아래 다이어그램은 PX4 v1.11(및 [ModalAI가 유지하는 PX4 v1.10 브랜치](https://github.com/modalai/px4-firmware/tree/modalai-1.10))부터 `ROTATION_NONE` 권장 방향을 나타냅니다.

## 구매처

- [Flight Core Complete Kit](https://modalai.com/flight-core)
- [단일 PCB에서 VOXL Companion Computer와 통합 Flight Core](https://modalai.com/flight-core)
- [VOXL 보조 컴퓨터 및 장애물 회피 카메라(VOXL Flight Deck)와 통합 플라이트 코어](https://modalai.com/flight-deck) ([데이터시트](https://docs.modalai.com/voxl-flight-deck-platform-datasheet/))
- [VOXL와 카메라로 조립된 Flight Core](https://shop.modalai.com/products/voxl-flight-deck-r1)

## 빠른 시작

### 방향

The diagram below shows the recommended orientation, which corresponds to `ROTATION_NONE` starting with PX4 v1.11.

![FlightCoreV1Orientation](../../assets/flight_controller/modalai/fc_v1/orientation.png)

### 커넥터

핀배열에 관련된 더 많은 정보는 [여기](https://docs.modalai.com/flight-core-datasheet-connectors)을 참고하십시오.

![FlightCoreV1 상단](../../assets/flight_controller/modalai/fc_v1/top.png)

| 커넥터 | 요약                            |
| --- | ----------------------------- |
| J1  | VOXL 통신 인터페이스 커넥터 (TELEM2)    |
| J2  | 프로그래밍 및 디버그 커넥터               |
| J3  | USB 커넥터                       |
| J4  | UART2, UART ESC (TELEM3)      |
| J5  | 텔레메트리 커넥터 (TELEM1)            |
| J6  | VOXL - 전원 관리 입력/확장            |
| J7  | 8 채널 PWM 출력 커넥터               |
| J8  | CAN 버스 커넥터                    |
| J9  | PPM RC 입력                     |
| J10 | 외부 GPS 및 자력계 커넥터              |
| J12 | RC 입력, Spektrum/SBus/UART 커넥터 |
| J13 | I2C 디스플레이(예비 센서 커넥터)/안전 버튼 입력 |

![FlightCoreV1 하단](../../assets/flight_controller/modalai/fc_v1/bottom.png)

### 사용자 가이드

전체 사용자 가이드는 [여기](https://docs.modalai.com/flight-core-manual/)를 참고하십시오.

### 빌드 방법

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) 방법:

```
make modalai_fc-v1
```

## 시리얼 포트 매핑

| UART   | 장치         | 포트                      |
| ------ | ---------- | ----------------------- |
| USART1 | /dev/ttyS0 | GPS1 (J10)              |
| USART2 | /dev/ttyS1 | TELEM3 (J4)             |
| USART3 | /dev/ttyS2 | 디버깅 콘솔(J2)              |
| UART4  | /dev/ttyS3 | 확장 UART (J6)            |
| UART5  | /dev/ttyS4 | TELEM2, 기본 VOXL 통신 (J1) |
| USART6 | /dev/ttyS5 | RC (J12)                |
| UART7  | /dev/ttyS6 | TELEM1 (J5)             |
| UART8  | /dev/ttyS7 | 해당없음                    |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

## 지원

자세한 내용은 [ModalAI 포럼](https://forum.modalai.com/category/10/flight-core)을 참고하십시오.

[stm32f765ii]: https://www.st.com/en/microcontrollers-microprocessors/stm32f765ii.html
[bmp388]: https://www.bosch-sensortec.com/products/environmental-sensors/pressure-sensors/bmp388/
[icm-20602]: https://www.invensense.com/products/motion-tracking/6-axis/icm-20602/
[bmi088]: https://www.bosch-sensortec.com/bst/products/all_products/bmi088_1
[px4]: https://github.com/PX4/PX4-Autopilot/tree/release/1.15/boards/modalai/fc-v1
[a71ch]: https://www.nxp.com/products/security-and-authentication/authentication/plug-and-trust-the-fast-easy-way-to-deploy-secure-iot-connections:A71CH
