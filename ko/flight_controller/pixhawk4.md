# Pixhawk 4

*Pixhawk 4*<sup>&reg;</sup> 는 PX4팀과 Holybro<sup>&reg;</sup> 가 함께 협력하여 설계하고 만든 진보된 오토파일럿입니다. It is optimized to run PX4 v1.7 and later, and is suitable for academic and commercial developers.

[Pixhawk-project](https://pixhawk.org/) **FMUv5**을 기반으로 오픈 하드웨어로서 설계 되었으며 [NuttX](http://nuttx.org) OS에서 PX4 를 작동 합니다.

<img src="../../assets/flight_controller/pixhawk4/pixhawk4_hero_upright.jpg" width="200px" title="Pixhawk4 Upright 이미지" /> <img src="../../assets/flight_controller/pixhawk4/pixhawk4_logo_view.jpg" width="420px" title="Pixhawk4 이미지" />

> **Tip** This autopilot is [supported](../flight_controller/autopilot_pixhawk_standard.md) by the PX4 maintenance and test teams.

## 빠른 요약

* 메인 FMU 프로세서: STM32F765 
  * 32 Bit Arm® Cortex®-M7, 216MHz, 2MB memory, 512KB RAM
* IO 프로세서: STM32F100 
  * 32 Bit Arm® Cortex®-M3, 24MHz, 8KB SRAM
* 내장 센서: 
  * 가속도/자이로: ICM-20689
  * 가속/자이로: BMI055
  * 지자계: IST8310
  * 기압계: MS5611
* GPS: ublox Neo-M8N GPS/GLONASS 수신기; IST8310 지자계 센서가 통합된
* 인터페이스: 
  * PWM 출력 8-16개 (IO에서 8개, FMU에서 8개)
  * FMU의 전용 PWM/캡처 입력 3 개
  * CPPM 전용 R/C 입력
  * 아날로그 / PWM RSSI 입력이있는 Spektrum / DSM 및 S.Bus 전용 R / C 입력
  * 전용 S.Bus 서보 출력
  * 범용 serial 포트 5개
  * I2C 포트 3개
  * SPI 버스 4개
  * 직렬 ESC를 사용하는 듀얼 CAN에 최대 2 개의 CAN 버스
  * 배터리 2 개의 전압 / 전류를위한 아날로그 입력
* 전원시스템 
  * 전원 모듈 출력: 4.9~5.5V
  * USB 전원 입력: 4.75~5.25V
  * 서보 전원 입력: 0~36V
* 무게와 치수 
  * 무게: 15.8g
  * 치수: 44x84x12mm
* 기타 특성: 
  * 작동 온도: -40 ~ 85°c

추가적인 정보는 [Pixhawk 4 Technical Data Sheet](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf)에서 찾을 수 있습니다.

## 구입처

[Holybro](https://shop.holybro.com/pixhawk-4beta-launch_p1089.html)에서 주문 가능 합니다.

## 커넥터 Connectors

![Pixhawk 4 커넥터들](../../assets/flight_controller/pixhawk4/pixhawk4-connectors.jpg)

> **Warning** The **DSM/SBUS RC** and **PPM RC** ports are for RC receivers only. These are powered! NEVER connect any servos, power supplies or batteries (or to any connected receiver).

## 핀아웃 Pinouts

*Pixhawk 4* pinouts은 [여기](http://www.holybro.com/manual/Pixhawk4-Pinouts.pdf)서 다운로드 합니다.

> **Note** Connector pin assignments are left to right (i.e. Pin 1 is the left-most pin). The exception is the [debug port(s)](#debug_port) (pin 1 is the right-most, as shown below).

## Serial Port Mapping

| UART   | Device     | Port                  |
| ------ | ---------- | --------------------- |
| UART1  | /dev/ttyS0 | GPS                   |
| USART2 | /dev/ttyS1 | TELEM1 (flow control) |
| USART3 | /dev/ttyS2 | TELEM2 (flow control) |
| UART4  | /dev/ttyS3 | TELEM4                |
| USART6 | /dev/ttyS4 | RC SBUS               |
| UART7  | /dev/ttyS5 | Debug Console         |
| UART8  | /dev/ttyS6 | PX4IO                 |

## Dimensions

![Pixhawk 4 치수](../../assets/flight_controller/pixhawk4/pixhawk4_dimensions.jpg)

## Voltage Ratings

만약 세개의 파워소스가 공급된다면 *Pixhawk 4*는 전원 공급기에서 3개의 파워레일을 중복 시킬 수 있습니다. 이 세개의 파워 레일은: **POWER1**, **POWER2** 그리고 **USB** 입니다.

> **Note** The output power rails **FMU PWM OUT** and **I/O PWM OUT** (0V to 36V) do not power the flight controller board (and are not powered by it). You must supply power to one of **POWER1**, **POWER2** or **USB** or the board will be unpowered.

**정상 작동 최대 전압 등급**

아래 조건의 공급 전원은 시스템에 전원을 공급하기 위해 순서대로 사용됩니다.

1. **POWER1** 과 **POWER2** 에 (4.9V to 5.5V) 를 입력
2. **USB** 에 (4.75V to 5.25V) 입력

**절대 최대 전압**

아래 조건에서 시스템은 전원을 공급하지 않지만 (작동하지 않음) 그대로 유지는 됩니다.

1. **POWER1** 과 **POWER2** 입력 (작동 범위 4.1V ~ 5.7V, 비손상 범위0V ~ 10V)
2. **USB** 입력 (작동 범위 4.1V to 5.7V, 비손상 범위 0V to 6V)
3. 서보 입력: **FMU PWM OUT** 과 **I/O PWM OUT**의 VDD_SERVO 핀 (0V to 42V undamaged)

## Assembly/Setup

[Pixhawk 4 Wiring Quick Start](../assembly/quick_start_pixhawk4.md)는 GPS와 전원관리보드 등을 포함한 필요/중요 주변기기를 어떻게 조립하는지 지침을 제공한다.

## Building Firmware

> **Tip** Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

이 타켓에 맞게 [PX4 빌드](https://dev.px4.io/master/en/setup/building_px4.html)하기

    make px4_fmu-v5_default
    

## Debug Port {#debug_port}

The [PX4 System Console](https://dev.px4.io/master/en/debug/system_console.html) and [SWD interface](http://dev.px4.io/master/en/debug/swd_debug.html) run on the **FMU Debug** port, while the I/O console and SWD interface can be accessed via **I/O Debug** port. 이러한 포트를 접근하기 위해, 사용자는 *Pixhawk 4* 케이스를 제거해야만 합니다.

![Pixhawk 4 Debug Ports](../../assets/flight_controller/pixhawk4/pixhawk4_debug_port.jpg)

The pinout uses the standard [Pixhawk debug connector pinout](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug). For wiring information see:

* [System Console > Pixhawk Debug Port](https://dev.px4.io/master/en/debug/system_console.html#pixhawk_debug_port) (PX4 Developer Guide)

## Peripherals

* [Digital Airspeed Sensor](https://drotek.com/shop/en/home/848-sdp3x-airspeed-sensor-kit-sdp33.html)
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