# mRo Pixracer

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://store.mrobotics.io/)에 문의하십시오.
:::

Pixhawk<sup>&reg;</sup> XRacer 보드 제품군은 소형 레이싱 쿼드와 비행기에 최적화되어 있습니다. [Pixfalcon](../flight_controller/pixfalcon.md)과 [Pixhawk](../flight_controller/pixhawk.md)와 달리 와이파이, 새로운 센서, 편리한 전체 서보 헤더, CAN 및 2M 플래시를 지원합니다.

<img src="../../assets/flight_controller/pixracer/pixracer_hero_grey.jpg" width="300px" title="pixracer + 8266 grey" />

:::tip
이 자동조종장치는 PX4 유지관리 및 테스트 팀에서 [지원](../flight_controller/autopilot_pixhawk_standard.md)합니다.
:::

## 주요 특징

* 메인 시스템 온 칩 : [STM32F427VIT6 rev.3](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789) 
  * CPU : 단정밀도 FPU의 180MHz ARM Cortexex<sup>&reg;</sup> M4
  * RAM : 256KB SRAM (L1)
* 표준 FPV 폼 팩터 : 36x36mm, 표준 30.5mm 구멍 패턴
* Invensense<sup>&reg;</sup> ICM-20608 가속 / 자이로 (4KHz) / MPU9250 가속 / 자이로 / 마그 (4KHz)
* 온도 보상 기능 HMC5983 자력계
* Measurement Specialties MS5611 기압계
* JST GH 커넥터
* microSD (로깅)
* Futaba S.BUS 및 S.BUS2 / Spektrum DSM2 및 DSMX / Graupner SUMD / PPM 입력 / Yuneec ST24
* FrSky<sup>&reg;</sup> 텔레메트리 포트
* OneShot PWM 출력 (구성 가능)
* 옵션 : 안전 스위치 및 부저

## 구매처

Pixracer는 [mRobotics.io](https://store.mrobotics.io/mRo-PixRacer-R15-Official-p/auav-pxrcr-r15-mr.htm)에서 사용할 수 있습니다.

액세서리에는 다음이 포함됩니다.

* [디지털 대기속도 센서](https://hobbyking.com/en_us/hkpilot-32-digital-air-speed-sensor-and-pitot-tube-set.html)
* [HK 텔레프레전스 세트 V2 (915Mhz - US 텔레메트리)](https://hobbyking.com/en_us/hkpilot-transceiver-telemetry-radio-set-v2-915mhz.html)
* [Hobbyking<sup>&reg;</sup> OSD + EU 텔레메트리 (433 MHz)](https://hobbyking.com/en_us/micro-hkpilot-telemetry-radio-module-with-on-screen-display-osd-unit-433mhz.html)

## 키트

Pixracer는 별도의 항공전자기기 전원공급장치를 사용하도록 설계되었습니다. 이는 모터 또는 ESC의 전류 서지가 비행 컨트롤러로 다시 흐르고 섬세한 센서를 방해하는 것을 방지하는 데 필요합니다.

* 전원 모듈(전압 및 전류 감지 포함)
* I2C 스플리터(AUAV, Hobbyking 및 3DR<sup>&reg;</sup> 주변 장치 지원)
* 모든 일반 주변기기용 케이블 키트

## Wi-Fi(USB 필요 없음)

One of the main features of the board is its ability to use Wifi for flashing new firmware, system setup and in-flight telemetry. This frees it of the need of any desktop system.

::note ToDo Setup and telemetry are already available, firmware upgrade is already supported by the default bootloader but not yet enabled
:::

* [ESP8266 Wifi](../telemetry/esp8266_wifi_module.md)
* [Custom ESP8266 MAVLink firmware](https://github.com/dogmaphobic/mavesp8266)

## Wiring Diagrams

![Grau setup pixracer top](../../assets/flight_controller/pixracer/grau_setup_pixracer_top.jpg)

![Grau setup pixracer bottom](../../assets/flight_controller/pixracer/grau_setup_pixracer_bottom.jpg)

![setup pixracer GPS](../../assets/flight_controller/pixracer/grau_setup_pixracer_gps.jpg)

![Grau b Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)

![Grau ACSP4 2 roh](../../assets/flight_controller/pixracer/grau_acsp4_2_roh.jpg)

![Grau ACSP5 roh](../../assets/flight_controller/pixracer/grau_acsp5_roh.jpg)

## Connectors

All connectors follow the [Pixhawk connector standard](https://pixhawk.org/pixhawk-connector-standard/). Unless noted otherwise all connectors are JST GH.

## Pinouts

![Pixracer top pinouts](../../assets/flight_controller/pixracer/pixracer_r09_top_pinouts.jpg)

![Pixracer bottom pinouts](../../assets/flight_controller/pixracer/pixracer_r09_bot_pinouts.jpg)

![Pixracer esp](../../assets/flight_controller/pixracer/pixracer_r09_esp_01.jpg)

#### TELEM1, TELEM2+OSD ports

| Pin     | Signal    | Volt  |
| ------- | --------- | ----- |
| 1 (red) | VCC       | +5V   |
| 2 (blk) | TX (OUT)  | +3.3V |
| 3 (blk) | RX (IN)   | +3.3V |
| 4 (blk) | CTS (IN)  | +3.3V |
| 5 (blk) | RTS (OUT) | +3.3V |
| 6 (blk) | GND       | GND   |

#### GPS port

| Pin     | Signal   | Volt  |
| ------- | -------- | ----- |
| 1 (red) | VCC      | +5V   |
| 2 (blk) | TX (OUT) | +3.3V |
| 3 (blk) | RX (IN)  | +3.3V |
| 4 (blk) | I2C1 SCL | +3.3V |
| 5 (blk) | I2C1 SDA | +3.3V |
| 6 (blk) | GND      | GND   |

#### FrSky Telemetry / SERIAL4

| Pin     | Signal   | Volt  |
| ------- | -------- | ----- |
| 1 (red) | VCC      | +5V   |
| 2 (blk) | TX (OUT) | +3.3V |
| 3 (blk) | RX (IN)  | +3.3V |
| 4 (blk) | GND      | GND   |

#### RC Input (accepts PPM / S.BUS / Spektrum / SUMD / ST24)

| Pin     | Signal  | Volt  |
| ------- | ------- | ----- |
| 1 (red) | VCC     | +5V   |
| 2 (blk) | RC IN   | +3.3V |
| 3 (blk) | RSSI IN | +3.3V |
| 4 (blk) | VDD 3V3 | +3.3V |
| 5 (blk) | GND     | GND   |

#### CAN

| Pin     | Signal | Volt |
| ------- | ------ | ---- |
| 1 (red) | VCC    | +5V  |
| 2 (blk) | CAN_H  | +12V |
| 3 (blk) | CAN_L  | +12V |
| 4 (blk) | GND    | GND  |

#### POWER

| Pin     | Signal  | Volt  |
| ------- | ------- | ----- |
| 1 (red) | VCC     | +5V   |
| 2 (blk) | VCC     | +5V   |
| 3 (blk) | CURRENT | +3.3V |
| 4 (blk) | VOLTAGE | +3.3V |
| 5 (blk) | GND     | GND   |
| 6 (blk) | GND     | GND   |

#### SWITCH

| Pin     | Signal           | Volt  |
| ------- | ---------------- | ----- |
| 1 (red) | SAFETY           | GND   |
| 2 (blk) | !IO_LED_SAFETY | GND   |
| 3 (blk) | VCC              | +3.3V |
| 4 (blk) | BUZZER-          | -     |
| 5 (blk) | BUZZER+          | -     |

#### Debug Port

This is a [Pixhawk Debug Port](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug) (JST SM06B connector).

| Pin     | Signal           | Volt  |
| ------- | ---------------- | ----- |
| 1 (red) | VCC TARGET SHIFT | +3.3V |
| 2 (blk) | CONSOLE TX (OUT) | +3.3V |
| 3 (blk) | CONSOLE RX (IN)  | +3.3V |
| 4 (blk) | SWDIO            | +3.3V |
| 5 (blk) | SWCLK            | +3.3V |
| 6 (blk) | GND              | GND   |

For information about wiring and using this port see:

* [PX4 System Console](../debug/system_console.md#pixhawk_debug_port) (Note, the FMU console maps to UART7).
* [SWD (JTAG) Hardware Debugging Interface](../debug/swd_debug.md#pixhawk_debug_port_6_pin_sh)

## Serial Port Mapping

| UART   | Device     | Port                  |
| ------ | ---------- | --------------------- |
| UART1  | /dev/ttyS0 | WiFi (ESP8266)        |
| USART2 | /dev/ttyS1 | TELEM1 (flow control) |
| USART3 | /dev/ttyS2 | TELEM2 (flow control) |
| UART4  |            |                       |
| UART7  | CONSOLE    |                       |
| UART8  | SERIAL4    |                       |

<!-- Note: Got ports using https://github.com/PX4/px4_user_guide/pull/672#issuecomment-598198434 -->

## Schematics

The reference is provided as: [Altium Design Files](https://github.com/AUAV-OpenSource/FMUv4-PixRacer)

The following PDF files are provided for *convenience only*:

* [pixracer-rc12-12-06-2015-1330.pdf](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixracer/pixracer-rc12-12-06-2015-1330.pdf)
* [pixracer-r14.pdf](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixracer/pixracer-r14.pdf) - R14 or RC14 is printed next to the SDCard socket

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:

    make px4_fmu-v4_default
    

## Credits

This design was created by Nick Arsov and Phillip Kocmoud and architected by Lorenz Meier, David Sidrane and Leonard Hall.