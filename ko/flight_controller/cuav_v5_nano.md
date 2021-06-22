# CUAV V5 nano 자동조종장치

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://store.cuav.net/)에 문의하십시오.
:::

**V5 nano**<sup>&reg;</sup>는 CUAV<sup>&reg;</sup>와 PX4 팀이 공동으로 설계한 공간 제약 애플리케이션용 자동조종장치입니다.

이 자동조종장치는 220mm 레이싱 드론에서 사용할 수 정도로 소형이지만, 대부분의 드론에도 충분히 사용할 수 있습니다.

![V5 nano - Hero image](../../assets/flight_controller/cuav_v5_nano/v5_nano_01.png)

:::note
V5 nano는 [CUAV V5+](../flight_controller/cuav_v5_plus.md)와 유사하지만 올인원 폼 팩터가 있고 PWM 포트가 더 적으며(AUX 포트를 사용하는 [기체](../airframes/airframe_reference.md)에는 사용할 수 없음), 내부 댐핑이 없습니다.
:::

주요 기능은 다음과 같습니다.

- [Pixhawk 프로젝트](https://pixhawk.org/) **FMUv5** 설계 표준과 호환되며, 외부 인터페이스에 [Pixhawk 커넥터 표준](https://pixhawk.org/pixhawk-connector-standard/)을 적용합니다.
- 더 안정적이고 신뢰할 수 있는 센서와 함께 FMU v3보다 고급 프로세서, RAM 및 플래시 메모리.
- PX4와 펌웨어 호환.
- I/O 핀을 위한 넉넉한 2.6mm 간격으로 모든 인터페이스를 더 쉽게 사용할 수 있습니다.

:::note
이 비행 컨트롤러는 [제조업체의 지원](../flight_controller/autopilot_manufacturer_supported.md)을 받을 수 있습니다.
:::

### 요약

메인 FMU 프로세서: STM32F765◦32 비트 Arm® Cortex®-M7, 216MHz, 2MB 메모리, 512KB RAM

* 내장 센서 :
  
  * 가속도/자이로: ICM-20689
  * 가속도/자이로: ICM-20602
  * 가속/자이로: BMI055
  * 자력계 : IST8310
  * 기압계: MS5611
* 인터페이스 : 8개의 PWM 출력
  
  * FMU의 전용 PWM/캡처 입력 3 개
  * CPPM 전용 RC 입력
  * Spektrum/DSM 및 S.Bus 전용 R/C 입력
  * 아날로그/PWM RSSI 입력
  * 범용 시리얼 포트 4개
  * I2C 포트 3개
  * SPI 버스 4개
  * 2개의 CAN 버스 
  * 배터리 전압/전류에 대한 아날로그 입력
  * 2개의 추가 아날로그 입력
  * nARMED 지원
* 전원 시스템: 파워 브릭 입력: 4.75 ~ 5.5V

* USB 전원 입력: 4.75~5.25V

* 중량 및 크기
  
  * 크기: 60*40*14mm
* 기타 특성: 
  * 작동 온도: -20 ~ 85°c (측정치)

## 구매처

<!-- [CUAV Store](https://store.cuav.net/index.php?id_product=95&id_product_attribute=0&rewrite=cuav-new-pixhack-v5-autopilot-m8n-gps-for-fpv-rc-drone-quadcopter-helicopter-flight-simulator-free-shipping-whole-sale&controller=product&id_lang=1) -->

[CUAV 알리익스프레스](https://www.aliexpress.com/item/33050770314.html?storeId=3257035&spm=2114.12010612.8148356.9.dbe6790bjW2hpH)(국제 사용자)

[CUAV Taobao](https://item.taobao.com/item.htm?spm=a230r.1.14.8.26ab5258veQJRu&id=569404317857&ns=1&abbucket=13#detail) (중국 본토 사용자)

:::note
Neo GPS 모듈과 함께 자동조종장치를 구매할 수 있습니다.
:::

<span id="connection"></span>

## 배선

[V5 nano 배선 개요](../assembly/quick_start_cuav_v5_nano.md)

## 핀배열

[여기](http://manual.cuav.net/V5-Plus.pdf)에서 **V5 nano** 핀아웃을 다운로드하세요.

## 펌웨어 빌드

::::tip 대부분의 사용자들은 펌웨어를 빌드할 필요는 없습니다. 하드웨어가 연결되면 *QGroundControl*에 의해 사전 구축되고 자동으로 설치됩니다.
:::

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) 방법 :

    make px4_fmu-v5_default
    

<span id="debug_port"></span>

## 디버그 포트

[PX4 시스템 콘솔](../debug/system_console.md)과 [SWD 인터페이스](../debug/swd_debug.md)는 **FMU 디버그** 포트에서 실행됩니다. 보드에는 I/O 디버그 인터페이스가 없습니다.

![Debug port (DSU7)](../../assets/flight_controller/cuav_v5_nano/debug_port_dsu7.jpg)

디버그 포트(`DSU7`)는 [JST BM06B](https://www.digikey.com.au/product-detail/en/jst-sales-america-inc/BM06B-GHS-TBT-LF-SN-N/455-1582-1-ND/807850) 커넥터를 사용하며 다음과 같은 핀배열을 가집니다.

| 핀     | 신호           | 전압    |
| ----- | ------------ | ----- |
| 1 (적) | 5V+          | +5V   |
| 2 (흑) | DEBUG TX(출력) | +3.3V |
| 3 (흑) | DEBUG TX(입력) | +3.3V |
| 4 (흑) | FMU_SWDIO    | +3.3V |
| 5 (흑) | FMU_SWCLK    | +3.3V |
| 6 (흑) | GND          | GND   |


제품 패키지에는 `DSU7` 포트에 연결할 수 있는 편리한 디버그 케이블이 포함되어 있습니다. 이렇게 하면, [PX4 시스템 콘솔](../debug/system_console.md)을 컴퓨터 USB 포트에 연결하기 위한 FTDI 케이블과 SWD/JTAG 디버깅에 사용되는 SWD 핀이 분리됩니다. 제공된 디버그 케이블이 SWD 포트 `Vref` 핀 (1)에 연결되지 않습니다.

![CUAV Debug cable](../../assets/flight_controller/cuav_v5_nano/cuav_nano_debug_cable.jpg)

:::warning SWD
Vref 핀 (1)은 Vref로 5V를 사용하지만, CPU는 3.3V에서 실행됩니다!

일부 JTAG 어댑터(SEGGER J-Link)는 Vref 전압을 사용하여 SWD 라인의 전압을 설정합니다. *Segger Jlink*에 직접 연결하려면 JTAG에 `Vtref`를 제공(즉, 3.3V 및 * NOT </ 0> 5V 제공)하는 `DSM`/`SBUS`/`RSSI`로 표시된 커넥터의 핀 4에서 3.3 볼트를 사용하는 것이 좋습니다.</p> 

더 자세한 내용은 [하드웨어 디버깅에 JTAG 사용](#using-jtag-for-hardware-debugging)을 참고하십시오.
:::

## 시리얼 포트 매핑

| UART   | 장치         | 포트                         |
| ------ | ---------- | -------------------------- |
| UART1  | /dev/ttyS0 | GPS                        |
| USART2 | /dev/ttyS1 | TELEM1 (흐름 제어)             |
| USART3 | /dev/ttyS2 | TELEM2 (흐름 제어)             |
| UART4  | /dev/ttyS3 | TELEM4                     |
| USART6 | /dev/ttyS4 | TX는 SBUS_RC 커넥터의 RC 입력입니다. |
| UART7  | /dev/ttyS5 | 디버깅 콘솔                     |
| UART8  | /dev/ttyS6 | 연결되지 않음 (PX4IO 없음)         |


<!-- Note: Got ports using https://github.com/PX4/px4_user_guide/pull/672#issuecomment-598198434 -->

## 정격 전압

*V5 nano* must be powered from the `Power` connector during flight, and may also/alternatively be powered from `USB` for bench testing.

:::note
The `PM2` connector cannot not be used for powering the *V5 nano* (see [this issue](#compatibility_pm2)).
:::

:::note
The Servo Power Rail is neither powered by, nor provides power to the FMU. However, the pins marked **+** are all common, and a BEC may be connected to any of the servo pin sets to power the servo power rail.
:::

## Over Current Protection

The *V5 nano* has no over current protection.

<span id="Optional-hardware"></span>

## Peripherals

* [Digital Airspeed Sensor](https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-16371268452.37.6d9f48afsFgGZI&id=9512463037)
* [Telemetry Radio Modules](https://cuav.taobao.com/category-158480951.htm?spm=2013.1.w5002-16371268426.4.410b7a821qYbBq&search=y&catName=%CA%FD%B4%AB%B5%E7%CC%A8)
* [Rangefinders/Distance sensors](../sensor/rangefinders.md)

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## Compatibility

CUAV adopts some differentiated designs and is incompatible with some hardware, which will be described below.

<span id="compatibility_gps"></span>

#### Neo v2.0 GPS not compatible with other devices

The *Neo v2.0 GPS* that is recommended for use with *CUAV V5+* and *CUAV V5 nano* is not fully compatible with other Pixhawk flight controllers (specifically, the buzzer part is not compatible and there may be issues with the safety switch).

The UAVCAN [NEO V2 PRO GNSS receiver](http://doc.cuav.net/gps/neo-series-gnss/en/neo-v2-pro.html) can also be used, and is compatible with other flight controllers.

<span id="compatibility_jtag"></span>

#### Using JTAG for hardware debugging

`DSU7` FMU Debug Pin 1 is 5 volts - not the 3.3 volts of the CPU.

Some JTAG probes use this voltage to set the IO levels when communicating to the target.

For direct connection to *Segger Jlink* we recommended you use the 3.3 Volts of DSM/SBUS/RSSI pin 4 as Pin 1 on the debug connector (`Vtref`).

<span id="compatibility_pm2"></span>

#### PM2 cannot power the flight controller

`PM2` can only measure battery voltage and current, but **not** power the flight controller.

:::warning PX4 does not support this interface.
:::

## Known Issues

The issues below refer to the *batch number* in which they first appear. The batch number is the four-digit production date behind V01 and is displayed on a sticker on the side of the flight controller. For example, the serial number Batch V011904((V01 is the number of V5, 1904 is the production date, that is, the batch number).

<span id="pin1_unfused"></span>

#### SBUS / DSM / RSSI interface Pin1 unfused

:::warning
This is a safety issue.
:::

Please do not connect other equipment (except RC receiver) on SBUS / DSM / RSSI interface - this can lead to equipment damage!

- *Found:* Batches V01190904xxxx
- *Fixed:* Batches later than V01190904xxxx

## Further Information

* [V5 nano manual](http://manual.cuav.net/V5-nano.pdf) (CUAV)
* [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165) (CUAV)
* [CUAV Github](https://github.com/cuav) (CUAV)
* [Airframe build-log using CUAV v5 nano on a DJI FlameWheel450](../frames_multicopter/dji_f450_cuav_5nano.md)