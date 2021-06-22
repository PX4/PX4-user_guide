# CUAV Nora 비행 컨트롤러

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://www.cuav.net)에 문의하십시오.
:::

[Nora](http://doc.cuav.net/flight-controller/x7/en/nora.html)<sup>&reg;</sup> 비행 컨트롤러는 고성능 자동조종장치입니다. 산업용 드론과 대형 대형 드론에 적합합니다. 주로 상업용 제조업체에 공급됩니다.

![CUAV x7](../../assets/flight_controller/cuav_nora/nora.png)

Nora는 CUAV X7의 변종입니다. 통합 마더 보드(소프트와 하드 보드)를 채택하여 비행 컨트롤러의 내부 커넥터를 줄이고 안정성을 높이며 모든 인터페이스를 측면에 배치하여 배선이 더 간결하여졌습니다.

:::note
이 비행 컨트롤러는 [제조업체의 지원](../flight_controller/autopilot_manufacturer_supported.md)을 받을 수 있습니다.
:::

## 특징

* 내부 충격 흡수
* 통합 프로세스는 인터페이스 손상으로 인한 오류를 줄입니다.
* USB_HS 지원, 로그 다운로드 속도 향상(PX4는 아직 지원되지 않음)
* 더 많은 dshot 출력 지원
* IMU 가열 지원, 센서 작동 개선
* 전용 uavcan 배터리 포트
* IMU 센서 3 세트
* 자동차 등급 RM3100 나침반
* 고성능 프로세서

:::tip
제조업체 [CUAV 문서](https://doc.cuav.net/x7/en/nora.html)는 Nora의 표준입니다. 가장 정확한 최신 정보를 포함하고 있습니다.
:::


## 요약

* 메인 FMU 프로세서: STM32H743
* 내장 센서 :
  * 가속도계/자이로스코프 : ICM-20689
  * 가속도계/자이로스코프 : ICM-20649
  * 가속도계/자이로스코프 : BMI088
  * 자력계 : RM3100
  * 기압계: MS5611*2

* 인터페이스:
   * PWM 출력 14개 (12개 Dshot 지원)
   * 다중 RC 입력 지원(SBU/CPPM/DSM)
   * 아날로그/PWM RSSI 입력
   * 2 개의 GPS 포트(GPS 및 UART4 포트)
   * i2c 버스 4 개(i2c 전용 포트 2 개)
   * CAN 버스 포트 2 개
   * 2개의 전원 포트(전원 A는 일반적인 adc 인터페이스, 전원 C는 uavcan 배터리 인터페이스)
   * 2개의 ADC 입력
   * USB 포트 1 개
* 전원시스템
  * 전원: 4.3~5.4V
  * USB 입력: 4.75~5.25V
  * 서보 레일 입력: 0~36V
* 중량 및 크기
  * 무게 : 101g
* 기타 특성:
  * 작동 온도: -20 ~ 80°c (측정 값)
  * 3개의 imus
  * 온도 보상 지원
  * 내부 충격 흡수

:::note PX4 펌웨어를 실행하면, 8개의 PWM 출력만 작동합니다. 나머지 6 개의 PWM 포트는 여전히 조정중입니다(따라서 작성시 VOLT와 호환되지 않음).
:::

## 구매처

- [CUAV 상점](https://store.cuav.net)<\br>
- [CUAV 알리익스프레스](https://www.aliexpress.com/item/4001042501927.html?gps-id=8041884&scm=1007.14677.110221.0&scm_id=1007.14677.110221.0&scm-url=1007.14677.110221.0&pvid=3dc0a3ba-fa82-43d2-b0b3-6280e4329cef&spm=a2g0o.store_home.promoteRecommendProducts_7913969.58)


## 배선

[CUAV nora Wiring Quickstart](http://doc.cuav.net/flight-controller/x7/en/quick-start/quick-start-nora.html)

## Size and Pinouts

![CUAV x7](../../assets/flight_controller/cuav_nora/nora-size.jpg)

![X7 pinouts](../../assets/flight_controller/cuav_nora/nora-pinouts.jpg)

:::warning
The `RCIN` port is limited to powering the rc receiver and cannot be connected to any power/load.
:::

## Voltage Ratings

Nora AutoPilot* can be triple-redundant on the power supply if three power sources are supplied. The two power rails are: **POWERA**, **POWERC** and **USB**.

:::note
The output power rails **PWM OUT** (0V to 36V) do not power the flight controller board (and are not powered by it). You must supply power to one of **POWERA**, **POWERC** or **USB** or the board will be unpowered.
:::

**Normal Operation Maximum Ratings**

Under these conditions all power sources will be used in this order to power the system:
1. **POWERA** and **POWERC** inputs (4.3V to 5.4V)
2. **USB** input (4.75V to 5.25V)

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:
```
make cuav_nora_default
```

## Over Current Protection

The *Nora* has over-current protection on the 5 Volt Peripheral and 5 Volt high power, which limits the current to 2.5A. The *Nora* has short circuit protection.

:::warning
Up to 2.5 A can be delivered to the connectors listed as pin 1 (although these are only rated at 1 A).
:::

## Debug Port

The system's serial console and SWD interface operate on the **DSU7** port. Simply connect the FTDI cable to the DSU7 connector (the product list contains the CUAV FTDI cable).

The [PX4 System Console](../debug/system_console.md) and [SWD interface](../debug/swd_debug.md) operate on the **FMU Debug** port (`DSU7`).

The debug port (`DSU7`) uses a [JST BM06B](https://www.digikey.com.au/product-detail/en/jst-sales-america-inc/BM06B-GHS-TBT-LF-SN-N/455-1582-1-ND/807850) connector and has the following pinout:

| Pin     | Signal         | Volt  |
| ------- | -------------- | ----- |
| 1 (red) | 5V+            | +5V   |
| 2 (blk) | DEBUG TX (OUT) | +3.3V |
| 3 (blk) | DEBUG RX (IN)  | +3.3V |
| 4 (blk) | FMU_SWDIO      | +3.3V |
| 5 (blk) | FMU_SWCLK      | +3.3V |
| 6 (blk) | GND            | GND   |

CUAV provides a dedicated debugging cable, which can be connected to the `DSU7` port. This splits out an FTDI cable for connecting the [PX4 System Console](../debug/system_console.md) to a computer USB port, and SWD pins used for SWD/JTAG debugging. The provided debug cable does not connect to the SWD port `Vref` pin (1).

![CUAV Debug cable](../../assets/flight_controller/cuav_v5_plus/cuav_v5_debug_cable.jpg)

:::warning
The SWD Vref pin (1) uses 5V as Vref but the CPU is run at 3.3V!

Some JTAG adapters (SEGGER J-Link) will use the Vref voltage to set the voltage on the SWD lines. For direct connection to *Segger Jlink* we recommended you use the 3.3 Volts from pin 4 of the connector marked `DSM`/`SBUS`/`RSSI` to provide `Vtref` to the JTAG (i.e. providing 3.3V and *NOT* 5V).
:::

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## Further info

* [Quick start](http://doc.cuav.net/flight-controller/x7/en/quick-start/quick-start-nora.html)
* [CUAV docs](http://doc.cuav.net)
* [nora schematic](https://github.com/cuav/hardware/tree/master/X7_Autopilot)
