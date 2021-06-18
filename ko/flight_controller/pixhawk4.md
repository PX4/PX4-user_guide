# Pixhawk 4

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://shop.holybro.com/)에 문의하십시오.
:::

*Pixhawk 4*<sup>&reg;</sup>는 Holybro<sup>&reg;</sup>와 PX4 팀이 협력하여 설계 및 제작한 고급 자동조종장치입니다. PX4 v1.7 이상의 버전 실행에 최적화되어 있으며, 학계와 업계 개발자에게 적합합니다.

[Pixhawk-project](https://pixhawk.org/) **FMUv5** 개방형 하드웨어 설계를 기반으로 [NuttX](https://nuttx.apache.org/) OS에서 PX4를 실행합니다.

<img src="../../assets/flight_controller/pixhawk4/pixhawk4_hero_upright.jpg" width="200px" title="Pixhawk4 Upright Image" /> <img src="../../assets/flight_controller/pixhawk4/pixhawk4_logo_view.jpg" width="420px" title="Pixhawk4 Image" />

:::tip
이 자동조종장치는 PX4 유지관리 및 테스트 팀에서 [지원](../flight_controller/autopilot_pixhawk_standard.md)합니다.
:::

## 요약

* 메인 FMU 프로세서: STM32F765 
  * 32 Bit Arm® Cortex®-M7, 216MHz, 2MB memory, 512KB RAM
* IO 프로세서: STM32F100 
  * 32 Bit Arm® Cortex®-M3, 24MHz, 8KB SRAM
* 온보드 센서 : 
  * 가속도/자이로: ICM-20689
  * 가속/자이로: BMI055
  * 자력계 : IST8310
  * 기압계: MS5611
* GPS : u-blox Neo-M8N GPS/GLONASS 수신기; 통합 자력계 IST8310
* 인터페이스: 
  * PWM 출력 8-16개(IO에서 8개, FMU에서 8개)
  * FMU의 전용 PWM / 캡처 입력 3 개
  * CPPM 전용 RC 입력
  * 아날로그/PWM RSSI 입력이있는 Spektrum/DSM 및 S.Bus 전용 RC 입력
  * 전용 S.Bus 서보 출력
  * 범용 시리얼 포트 5개
  * I2C 포트 3개
  * SPI 버스 4개
  * 직렬 ESC를 사용하는 듀얼 CAN에 최대 2 개의 CAN 버스
  * 배터리 2 개의 전압 / 전류에 대한 아날로그 입력
* 전원시스템 
  * 전원 모듈 출력: 4.9~5.5V
  * USB 전원 입력: 4.75~5.25V
  * 서보 전원 입력: 0~36V
* 중량 및 크기 
  * 무게: 15.8g
  * 크기: 44x84x12mm 
* 기타 특성: 
  * 작동 온도: -40 ~ 85°c

추가적인 정보는 [Pixhawk 4 Technical Data Sheet](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf)을 참고하십시오.

## 구매처

[Holybro](https://shop.holybro.com/pixhawk-4beta-launch_p1089.html)에서 주문 가능합니다.

## 커넥터

![Pixhawk 4 connectors](../../assets/flight_controller/pixhawk4/pixhawk4-connectors.jpg)

:::warning
**DSM/SBUS RC** 와 **PPM RC** 포트들은 RC 수신기 전용 입니다. 이것들은 전원이 공급됩니다! 서보를 전원공급장치나 배터리(또는 연결된 수신기)에 절대 연결하지 마십시오.
:::

## 핀배열

*Pixhawk 4* 핀배열은 [여기](http://www.holybro.com/manual/Pixhawk4-Pinouts.pdf)서 다운로드합니다.

:::note
커넥터 핀 할당은 왼쪽에서 오른쪽입니다(즉, 핀 1은 가장 왼쪽에있는 핀). 예외는 [디버그 포트](#debug_port)입니다 (아래에 표시된 것처럼 1번 핀이 맨 오른쪽에 있음).
:::

## 시리얼 포트 매핑

| UART   | 장치         | 포트             |
| ------ | ---------- | -------------- |
| UART1  | /dev/ttyS0 | GPS            |
| USART2 | /dev/ttyS1 | TELEM1 (흐름 제어) |
| USART3 | /dev/ttyS2 | TELEM2 (흐름 제어) |
| UART4  | /dev/ttyS3 | TELEM4         |
| USART6 | /dev/ttyS4 | RC SBUS        |
| UART7  | /dev/ttyS5 | 디버깅 콘솔         |
| UART8  | /dev/ttyS6 | PX4IO          |

## 크기

![Pixhawk 4 Dimensions](../../assets/flight_controller/pixhawk4/pixhawk4_dimensions.jpg)

## Voltage Ratings

*Pixhawk 4* can be triple-redundant on the power supply if three power sources are supplied. The three power rails are: **POWER1**, **POWER2** and **USB**.

:::note
The output power rails **FMU PWM OUT** and **I/O PWM OUT** (0V to 36V) do not power the flight controller board (and are not powered by it). You must supply power to one of **POWER1**, **POWER2** or **USB** or the board will be unpowered.
:::

**Normal Operation Maximum Ratings**

Under these conditions all power sources will be used in this order to power the system:

1. **POWER1** 과 **POWER2** 에 (4.9V to 5.5V) 를 입력
2. **USB** 에 (4.75V to 5.25V) 입력

**Absolute Maximum Ratings**

Under these conditions the system will not draw any power (will not be operational), but will remain intact.

1. **POWER1** 과 **POWER2** 입력 (작동 범위 4.1V ~ 5.7V, 비손상 범위0V ~ 10V)
2. **USB** 입력 (작동 범위 4.1V to 5.7V, 비손상 범위 0V to 6V)
3. 서보 입력: **FMU PWM OUT** 과 **I/O PWM OUT**의 VDD_SERVO 핀 (0V to 42V undamaged)

## Assembly/Setup

The [Pixhawk 4 Wiring Quick Start](../assembly/quick_start_pixhawk4.md) provides instructions on how to assemble required/important peripherals including GPS, Power Management Board etc.

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:

    make px4_fmu-v5_default
    

<span id="debug_port"></span>

## Debug Port

The [PX4 System Console](../debug/system_console.md) and [SWD interface](../debug/swd_debug.md) run on the **FMU Debug** port, while the I/O console and SWD interface can be accessed via **I/O Debug** port. In order to access these ports, the user must remove the *Pixhawk 4* casing.

![Pixhawk 4 Debug Ports](../../assets/flight_controller/pixhawk4/pixhawk4_debug_port.jpg)

The pinout uses the standard [Pixhawk debug connector pinout](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug). For wiring information see:

* [System Console > Pixhawk Debug Port](../debug/system_console.md#pixhawk_debug_port)

## Peripherals

* [Digital Airspeed Sensor](https://store-drotek.com/848-sdp3x-airspeed-sensor-kit-sdp33.html)
* [Telemetry Radio Modules](../telemetry/README.md)
* [Rangefinders/Distance sensors](../sensor/rangefinders.md)

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## Further info

* [Pixhawk 4 Technical Data Sheet](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf)
* [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).
* [Pixhawk 4 Wiring QuickStart](../assembly/quick_start_pixhawk4.md)
* [Pixhawk 4 Pinouts](http://www.holybro.com/manual/Pixhawk4-Pinouts.pdf) (Holybro)
* [Pixhawk 4 Quick Start Guide (Holybro)](http://www.holybro.com/manual/Pixhawk4-quickstartguide.pdf)