---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/kakutef7
---

# Holybro  Kakute F7

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://shop.holybro.com/)에 문의하십시오.
:::

Holybro의 *Kakute F7*은 레이서를 위해 설계된 비행 컨트롤러입니다.

<img src="../../assets/flight_controller/kakutef7/board.jpg" width="400px" title="Kakute F7" />


:::note
이 비행 컨트롤러는 [제조업체의 지원](../flight_controller/autopilot_manufacturer_supported.md)을 받을 수 있습니다.
:::

## 주요 특징

* 메인 시스템 온칩: [STM32F745VGT6](https://www.st.com/en/microcontrollers-microprocessors/stm32f745vg.html)
  * CPU : 단정밀도 FPU의 216MHz ARM Cortex M7
  * RAM : 320KB SRAM
  * FLASH: 1 MB
* 표준 레이서 폼 팩터 : 36x36mm, 표준 30.5mm 구멍 패턴
* ICM20689 가속/자이로 (소프트 장착)
* BMP280 기압계
* microSD (로깅)
* 6개의 UART
* I2C 버스 1 개
* 6 PWM 출력
* 내장 OSD 칩(SPI를 통한 AB7456)


## 구매처

보드는 아래의 상점들에서 구매할 수 있습니다.
- [Holybro](https://shop.holybro.com/kakute-f7_p1104.html)
- [getfpv](https://www.getfpv.com/holybro-kakute-f7-tekko32-f3-metal-65a-4-in-1-esc-combo.html)

:::tip
*Kakute F7*은 *Tekko32* 4-in-1 ESC와 작동하도록 설계되었으며, 함께 구매할 수 있습니다.
:::

## 커넥터 및 핀

다음은 *Kakute F7*의 실크 스크린으로, 보드 상단을 보여줍니다.

![Kakute F7 실크스크린](../../assets/flight_controller/kakutef7/silk.png)


| 핀        | 기능                                                | 기본값          |
| -------- | ------------------------------------------------- | ------------ |
| B+       | 배터리 양극 전압 (2S-6S)                                 |              |
| 5V       | 5V 출력 (최대 2A)                                     |              |
| VO       | 비디오 송신기로 비디오 출력                                   |              |
| VI       | FPV 카메라의 비디오 입력                                   |              |
| G 또는 GND | 접지                                                |              |
| SDA, SCL | I2C 연결(주변장치용)                                     |              |
| R1, T1   | UART1 RX 및 TX                                     | TELEM1       |
| R2, T2   | UART2 RX 및 TX                                     | TELEM2       |
| R3, T3   | UART3 RX 및 TX                                     | NuttX 디버그 콘솔 |
| R4, T4   | UART4 RX 및 TX                                     | GPS1         |
| R6, T6   | UART6 RX 및 TX                                     | RC 포트        |
| R7, T7   | UART7 RX 및 TX(RX는 4-in-1 ESC와 함께 사용하기 위해 플러그에 있음) | DShot 텔레메트리  |
| LED      | WS2182 주소 지정이 가능한 LED 신호 와이어(테스트되지 않음)            |              |
| Buz-     | 피에조 부저 네거티브 레그(부저 포지티브 레그를 5V 패드에 연결)             |              |
| 3V3      | 3.3V 출력(최대 200mA)                                 |              |
| M1에서 M4  | 모터 신호 출력 (4-in-1 ESC에서 사용하기 위해 플러그에 위치)           |              |
| M5, M6   | 추가 모터 신호 출력(보드 측면에 위치)                            |              |
| RSI      | 수신기에서 아날로그 RSSI(0-3.3V) 입력                        |              |
| Boot     | 부트로더 버튼                                           |              |


<span id="bootloader"></span>
## 부트로더 업데이트

보드에는 [Betaflight](https://github.com/betaflight/betaflight/wiki)가 사전 설치되어 있습니다. PX4 펌웨어를 설치하기 전에 *PX4 부트 로더*를 플래시하여야 합니다. [kakutef7_bl.hex](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/kakutef7/kakutef7_bl_0b3fbe2da0.hex) 부트로더 바이너리를 다운로드하고 [이 페이지](../advanced_config/bootloader_update_from_betaflight.md)에서 플래시 방법을 참고하십시오.

## 펌웨어 빌드

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) 방법 :
```
make holybro_kakutef7_default
```

## 펌웨어 설치

펌웨어는 일반적인 방법으로 설치할 수 있습니다.
- 소스 빌드 및 업로드
  ```
  make holybro_kakutef7_default upload
  ```
- *QGroundControl*을 사용하여 [펌웨어를 로드](../config/firmware.md)합니다. 미리 빌드된 펌웨어나 사용자 지정 펌웨어를 사용할 수 있습니다.


## 설정

[기본 설정](../config/README.md) 외에도 아래의 매개변수가 중요합니다.

| 매개변수                                                                   | 설정                                                                            |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [SYS_HAS_MAG](../advanced_config/parameter_reference.md#SYS_HAS_MAG) | 보드에 내부 자력계가 없기 때문에 비활성화하여야 합니다. 외부 자력계를 연결하여 활성화 할 수 있습니다.                    |
| [MOT_ORDERING](../advanced_config/parameter_reference.md#MOT_ORDERING) | Betaflight/Cleanflight 모터 할당과 함께 4-in-1 ESC를 사용하는 경우 이 매개변수를 적절하게 설정할 수 있습니다. |


## 시리얼 포트 매핑

| UART   | 장치         | 포트               |
| ------ | ---------- | ---------------- |
| USART1 | /dev/ttyS0 | TELEM1           |
| USART2 | /dev/ttyS1 | TELEM2           |
| USART3 | /dev/ttyS2 | 디버그 콘솔           |
| UART4  | /dev/ttyS3 | GPS1             |
| USART6 | /dev/ttyS4 | RC SBUS          |
| UART7  | /dev/ttyS5 | ESC 텔레메트리(DShot) |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

## 디버그 포트

### 시스템 콘솔

UART3 RX와 TX는 [시스템 콘솔](../debug/system_console.md)을 사용하도록 설정됩니다.

### SWD

[SWD 인터페이스](../debug/swd_debug.md)(JTAG) 핀은 아래와 같습니다.
- `SWCLK`: 테스트 포인트 2(CPU의 핀 72)
- `SWDIO`: 테스트 포인트 3(CPU의 핀 76)
- `GND`: 보드에 표시됨.
- `VDD_3V3`: 보드에 표시됨.

이 내용을 아래의 그림으로 정리하였습니다.

![Kakute F7의 SWD 핀 - CLK SWO](../../assets/flight_controller/kakutef7/debug_swd_port.jpg) ![Kakute F7의 SWD 핀: GND 및 VDD_3V3](../../assets/flight_controller/kakutef7/debug_swd_port_gnd_vcc3_3.jpg)

