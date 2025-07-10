---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/cuav_v5_plus
---

# CUAV V5+ 자동조종장치

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://store.cuav.net/)에 문의하십시오.
:::

*V5+*<sup>&reg;</sup>는 CUAV<sup>&reg;</sup>에서 제조한 고급 자동조종장치입니다. CUAV<sup>&reg;</sup>와 PX4팀이 공동으로 설계하였습니다.

자동조종장치는 상용시스템 통합에 권장되지만, 학술 연구와 기타 용도에도 적합합니다.

![V5 + AutoPilot - 대표 이미지](../../assets/flight_controller/cuav_v5_plus/v5+_01.png)

주요 기능은 다음과 같습니다.
- [Pixhawk 프로젝트](https://pixhawk.org/) **FMUv5** 설계 표준과 호환되며, 외부 인터페이스에 [Pixhawk 커넥터 표준](https://pixhawk.org/pixhawk-connector-standard/)을 적용합니다.
- 더 안정적이고 신뢰할 수 있는 센서와 함께 FMU v3보다 고급 프로세서, RAM 및 플래시 메모리.
- PX4와 펌웨어 호환.
- 모듈식 설계를 통해 사용자는 자신의 캐리어 보드를 설정할 수 있습니다.
- 고성능 충격흡수 시스템을 갖춘 내장형 진동감쇠 시스템.
- 비행 안전 향상을 위한 다중 센서와 전원 시스템.

:::note
이 비행 컨트롤러는 [제조업체의 지원](../flight_controller/autopilot_manufacturer_supported.md)을 받을 수 있습니다.
:::


## 요약

* 메인 FMU 프로세서: STM32F765
  * 32 비트 Arm® Cortex®-M7, 216MHz, 2MB 메모리, 512KB RAM
* IO 프로세서: STM32F100
  * 32 비트 Arm® Cortex®-M3, 24MHz, 8KB SRAM
* 내장 센서 :
  * 가속도계/자이로스코프 : ICM-20689
  * 가속도계/자이로스코프 : BMI055
  * 자력계 : IST8310
  * 기압계: MS5611

* 인터페이스:
  * PWM 출력 8-14개(IO 6개, FMU 8개)
  * FMU의 전용 PWM/캡처 입력 3 개
  * CPPM 전용 RC 입력
  * 아날로그/PWM RSSI 입력이있는 Spektrum/DSM 및 S.Bus 전용 RC 입력
  * 아날로그/PWM RSSI 입력
  * PWM Servo 출력
  * 범용 시리얼 포트 5개
  * I2C 포트 4개
  * SPI 버스 4개
  * 직렬 ESC가 있는 CANBuse 2 개
  * 배터리 2 개의 전압 및 전류에 대한 아날로그 입력
* 전원 시스템 :
  * 전원: 4.3~5.4V
  * USB 입력: 4.75~5.25V
* 중량과 크기
  * 중량: 90g
  * 크기: 85.5*42*33mm
* 기타 특성:
  * 작동 온도: -20 ~ 80°c (측정치)

## 구매처<!-- \[CUAV Store\](https://store.cuav.net/index.php?id_product=95&id_product_attribute=0&rewrite=cuav-new-pixhack-v5-autopilot-m8n-gps-for-fpv-rc-drone-quadcopter-helicopter-flight-simulator-free-shipping-whole-sale&controller=product&id_lang=1) -->[CUAV 알리익스프레스](https://www.aliexpress.com/item/32890380056.html?spm=a2g0o.detail.1000060.1.7a7233e7mLTlVl&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.90158.0&scm_id=1007.13339.90158.0&scm-url=1007.13339.90158.0&pvid=d899bfab-a7ca-46e1-adf2-72ad1d649822)(국제 사용자)

[CUAV Taobao](https://item.taobao.com/item.htm?spm=a1z10.5-c.w4002-21303114052.37.a28f697aeYzQx9&id=594262853015) (중국 본토 사용자)

:::note
Neo GPS 모듈과 함께 자동조종장치를 구매할 수 있습니다.
:::

<span id="connection"></span>
## 배선

[CUAV V5+ 배선 개요](../assembly/quick_start_cuav_v5_plus.md)

## 핀배열

[여기](http://manual.cuav.net/V5-Plus.pdf)에서 **V5+** 핀배열을 다운로드하세요.

## 정격 전압

*V5 + AutoPilot*은 중복 전원공급장치를 지원합니다. 최대 3개의 전원를 사용할 수 있습니다 : `Power1`, `Power2` 및 `USB`. 이러한 소스중 하나 이상에 전원을 공급하여야합니다. 그렇지 않으면, 비행 컨트롤러에 전원이 공급되지 않습니다.

:::note PX4IO 모듈이 있는 FMUv5 기반 FMU(*V5+*의 경우)에서 서보파워레일은 FMU에 의해서만 모니터링됩니다. FMU에 의해 전원에 의해 공급받지도 않고, 공급되지도 않습니다. FMU에 의해 전원에 의해 공급받지도 않고, 공급되지도 않습니다.
:::

**정상 작동 최대 정격 전압**

이러한 조건에서 전원은 아래의 순서대로 시스템에 전원을 공급하여야합니다.
1. `Power1` 및 `Power2` 입력(4.3V ~ 5.4V)
1. `USB` 입력(4.75V ~ 5.25V)


## 과전류 보호

*V5+*은 5V 주변장치와 5V 이상의 고전력에 과전류 보호기능으로 전류를 2.5A로 제한합니다. *V5+*에는 단락보호 기능이 있습니다.

:::warning
핀 1로 나열된 커넥터에 최대 2.5A를 전달할 수 있습니다(단, 정격은 1A에 불과함).
:::

## 펌웨어 빌드

::::tip 대부분의 사용자들은 펌웨어를 빌드할 필요는 없습니다. 하드웨어가 연결되면 *QGroundControl*에 의해 사전 구축되고 자동으로 설치됩니다.
:::

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) 방법 :
```
make px4_fmu-v5_default
```

## 디버그 포트

[PX4 시스템 콘솔](../debug/system_console.md)과 [SWD 인터페이스](../debug/swd_debug.md)는 **FMU 디버그** 포트에서 실행됩니다. 보드에는 I/O 디버그 인터페이스가 없습니다.

![디버그 포트(DSU7)](../../assets/flight_controller/cuav_v5_plus/debug_port_dsu7.jpg)

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

![CUAV 디버그 케이블](../../assets/flight_controller/cuav_v5_plus/cuav_v5_debug_cable.jpg)


:::warning SWD
Vref 핀 (1)은 Vref로 5V를 사용하지만, CPU는 3.3V에서 실행됩니다!

일부 JTAG 어댑터 (SEGGER J-Link)는 Vref 전압을 사용하여 SWD 라인의 전압을 설정합니다. *Segger Jlink*에 직접 연결하려면 JTAG에 `Vtref`를 제공(즉, 3.3V 및 * NOT </> 5V 제공)하는 `DSM`/`SBUS`/`RSSI`로 표시된 커넥터의 핀 4에서 3.3 볼트를 사용하는 것이 좋습니다.

더 자세한 내용은 [하드웨어 디버깅에 JTAG 사용](#using-jtag-for-hardware-debugging)을 참조하십시오.
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
| UART8  | /dev/ttyS6 | PX4IO                      |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

<span id="optional-hardware"></span>
## 주변 장치

* [디지털 대기속도 센서](https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-16371268452.37.6d9f48afsFgGZI&id=9512463037)
* [텔레메트리 라디오 모듈](https://cuav.taobao.com/category-158480951.htm?spm=2013.1.w5002-16371268426.4.410b7a821qYbBq&search=y&catName=%CA%FD%B4%AB%B5%E7%CC%A8)
* [거리계/거리 센서](../sensor/rangefinders.md)

## 지원 플랫폼 및 기체

일반 RC 서보 또는 Futaba S-Bus 서보로 제어 가능한 모든 멀티콥터/비행기/로버 또는 보트. 지원되는 운송체의 설정은 [기체 정의서](../airframes/airframe_reference.md)를 참고하십시오.

## 참고

#### 다른 유형의 전원모듈용 커넥터에 디지털 또는 아날로그 전원모듈을 연결하지 마십시오.

아날로그 전원모듈을 디지털 전원모듈 커넥터에 연결하면 해당 버스의 모든 I2C 장치가 중지됩니다. 특히, 경합으로 인하여 GPS의 나침반이 중지되고, 장기적으로 FMU가 손상 될 수도 있습니다.

마찬가지로, 아날로그 커넥터에 연결된 디지털 전원모듈은 작동하지 않으며, 장기적으로 전원 모듈이 손상될 수 있습니다.

## 호환성

CUAV는 몇 가지 차별화된 디자인을 채택하고, 아래에서 설명하는 일부 하드웨어와 호환되지 않습니다.

<span id="compatibility_gps"></span>
#### 다른 장치와 호환되지 않는 GPS

*CUAV V5+*와 *CUAV V5 nano*와 함께 사용하도록 권장되는 *Neo v2.0 GPS*는 다른 Pixhawk 비행 컨트롤러(특히, 부저 부분이 호환되지 않으며 안전 스위치에 문제가 있을 수 있습니다.)

UAVCAN [NEO V2 PRO GNSS 수신기](http://doc.cuav.net/gps/neo-series-gnss/en/neo-v2-pro.html)도 사용할 수 있으며, 다른 비행 컨트롤러와 호환됩니다.

<span id="compatibility_jtag"></span>
#### 하드웨어 디버깅에 JTAG 사용

`DSU7` FMU 디버그 핀 1은 CPU의 3.3V가 아닌 5V입니다.

일부 JTAG는이 전압을 사용하여 타겟과 통신시 IO 레벨을 설정합니다.

*Segger Jlink*에 직접 연결하려면 디버그 커넥터(`Vtref`)의 핀 1로 3.3 볼트의 DSM/SBUS/RSSI 핀 4를 사용하는 것이 좋습니다.

## 알려진 문제

아래 문제는 처음 나타나는 *배치번호*를 나타냅니다. 배치번호는 V01 뒤의 4 자리 생산날짜이며 비행 컨트롤러 측면의 스티커에 표시되어 있습니다. 예를 들어, 일련 번호 Batch V011904((V01은 V5의 번호, 1904는 생산날짜, 즉 배치번호)입니다.

<span id="pin1_unfused"></span>
#### SBUS / DSM / RSSI 인터페이스 Pin1 언퓨즈

:::warning
이것은 안전에 관련된 문제입니다.
:::

SBUS/DSM/RSSI 인터페이스에 다른 장비(RC 수신기 제외)를 연결하지 마십시오. 장비가 손상될 수 있습니다.

- *발견됨:* Batches V01190904xxxx
- *수정됨:* Batches later than V01190904xxxx

## 추가 정보

- [CUAV V5+ 매뉴얼](http://manual.cuav.net/V5-Plus.pdf)
- [CUAV V5+ 문서](http://doc.cuav.net/flight-controller/v5-autopilot/en/v5+.html)
- [FMUv5 레퍼런스 디자인 핀배열](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165)
- [CUAV Github](https://github.com/cuav)
- [베이스 보드 설계 참조](https://github.com/cuav/hardware/tree/master/V5_Autopilot/V5%2B/V5%2BBASE)
- [CUAV V5+ 배선 개요](../assembly/quick_start_cuav_v5_plus.md)
- [DJI FlameWheel450에서 CUAV v5 +를 사용하는 기체 빌드 로그](../frames_multicopter/dji_f450_cuav_5plus.md)
