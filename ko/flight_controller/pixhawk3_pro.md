# Pixhawk 3 프로

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://store-drotek.com/)에 문의하십시오.
:::

Pixhawk<sup>&reg;</sup> 3 Pro는 일부 업그레이드와 기능이 추가된 FMUv4 하드웨어 설계 (Pixracer)를 기반으로합니다. 이 보드는 [Drotek<sup>&reg;</sup>](https://drotek.com)과 PX4에 의해 설계되었습니다.

![Pixhawk 3 Pro hero image](../../assets/hardware/hardware-pixhawk3_pro.jpg)

:::note
주요 하드웨어 문서는 여기를 참고하십시오. https://drotek.gitbook.io/pixhawk-3-pro/hardware
:::

:::tip
이 자동조종장치는 PX4 유지관리 및 테스트 팀에서 [지원](../flight_controller/autopilot_pixhawk_standard.md)합니다.
:::

## 요약

- 마이크로컨트롤러 : **STM32F469**; 플래시 용량은 **2MiB**, RAM 용량은 **384KiB**입니다.
- **ICM-20608-G** 자이로 / 가속도계
- **MPU-9250** 자이로 / 가속도계 / 자력계
- **LIS3MDL** 나침반
- 2개의 SPI 버스를 통해 연결된 센서(고속 버스 1개와 저잡음 버스 1개)
- 2개의 I2C 버스
- CAN 버스 2 개
- 2 개의 전원 모듈에서 전압 / 배터리 판독
- FrSky<sup>&reg;</sup> 인버터
- 메인 8 개 + AUX PWM 출력 6개(개별 IO 칩, PX4IO)
- microSD (로깅)
- S.BUS / Spektrum / SUMD / PPM 입력
- JST GH 사용자 친화적 커넥터 : Pixracer와 동일한 커넥터와 핀배열

## 구매처

[Drotek 상점](https://store.drotek.com/)에서 구매 (EU) :

- [Pixhawk 3 프로 (패키지)](https://store.drotek.com/autopilots/844-pixhawk-3-pro-pack.html)
- [Pixhawk 3 프로](https://store.drotek.com/autopilots/821-pixhawk-pro-autopilot-8944595120557.html)

[readymaderc](https://www.readymaderc.com)에서 구매 (미국) :

- [Pixhawk 3 프로](https://www.readymaderc.com/products/details/pixhawk-3-pro-flight-controller)

## 펌웨어 빌드

::::tip 대부분의 사용자들은 펌웨어를 빌드할 필요는 없습니다. 하드웨어가 연결되면 *QGroundControl*에 의해 사전 구축되고 자동으로 설치됩니다.
:::

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) :

    make px4_fmu-v4pro_default
    

## 디버그 포트

보드에는 아래와 같은 FMU와 IO 디버그 포트가 있습니다.

![Debug Ports](../../assets/flight_controller/pixhawk3pro/pixhawk3_pro_debug_ports.jpg)

The pinouts and connector comply with the [Pixhawk Standard Debug Port](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug) (JST SM06B connector).

| Pin     | Signal           | Volt  |
| ------- | ---------------- | ----- |
| 1 (red) | VCC TARGET SHIFT | +3.3V |
| 2 (blk) | CONSOLE TX (OUT) | +3.3V |
| 3 (blk) | CONSOLE RX (IN)  | +3.3V |
| 4 (blk) | SWDIO            | +3.3V |
| 5 (blk) | SWCLK            | +3.3V |
| 6 (blk) | GND              | GND   |

For information about wiring and using this port see:

- [PX4 System Console](../debug/system_console.md#pixhawk_debug_port) (Note, the FMU console maps to UART7).
- [SWD (JTAG) Hardware Debugging Interface](../debug/swd_debug.md)

## Serial Port Mapping

| UART   | Device     | Port                  |
| ------ | ---------- | --------------------- |
| UART1  | /dev/ttyS0 | WiFi                  |
| USART2 | /dev/ttyS1 | TELEM1 (flow control) |
| USART3 | /dev/ttyS2 | TELEM2 (flow control) |
| UART4  |            |                       |
| UART7  | CONSOLE    |                       |
| UART8  | SERIAL4    |                       |

<!-- Note: Got ports using https://github.com/PX4/px4_user_guide/pull/672#issuecomment-598198434 -->