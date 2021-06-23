# Holybro Pix32 v5

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://shop.holybro.com/)에 문의하십시오.
:::

[Pix32 v5](https://shop.holybro.com/pix32-v5_p1218.html)<sup>&reg;</sup>는 Holybro<sup>&reg;</sup>에서 설계 제작한 고급 비행 컨트롤러입니다. PX4 펌웨어 실행에 최적화 되어 있으며, 연구와 상업용 개발자들에게 적합합니다. [Pixhawk-project](https://pixhawk.org/) **FMUv5** 개방형 하드웨어 설계를 기반으로 [NuttX](https://nuttx.apache.org/) OS에서 PX4를 실행합니다. Pixhawk4의 변형 버전으로 간주할 수 있습니다.

Pix32 v5는 고출력, 유연하고 사용자 정의 가능한 비행제어 시스템을 위하여 설계되었습니다. 별도의 비행 컨트롤러와 캐리어 보드로 구성되며 100핀 커넥터로 연결됩니다. 이 디자인은 사용자가 Holybro에서 만든베이스 보드를 선택하거나 사용자가 정의할 수 있습니다.

![Pix32 v5 Family](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_family.jpg)

:::note
이 비행 컨트롤러는 [제조업체의 지원](../flight_controller/autopilot_manufacturer_supported.md)을 받을 수 있습니다.
:::

## 요약

* 메인 FMU 프로세서: STM32F765
  * 32 비트 Arm® Cortex®-M7, 216MHz, 2MB 메모리, 512KB RAM
* IO 프로세서: STM32F100
  * 32 비트 Arm® Cortex®-M3, 24MHz, 8KB SRAM
* 내장 센서 :
  * 가속도/자이로: ICM-20689
  * 가속/자이로: BMI055
  * 자력계 : IST8310
  * 기압계: MS5611
* GPS: u-blox Neo-M8N GPS/GLONASS 수신기; 통합 자력계 IST8310
* 인터페이스:
  * PWM 출력 8-16개(IO에서 8개, FMU에서 8개)
  * FMU의 전용 PWM/캡처 입력 3 개
  * CPPM 전용 RC 입력
  * Spektrum/DSM 및 S.Bus 전용 R/C 입력, 아날로그/PWM RSSI 입력
  * Dedicated S.Bus Servo 출력
  * 범용 시리얼 포트 5개
    * 전체 흐름 제어 2개
    * 1.5A 전류 제한이 있는 1 개
  * I2C 포트 3개
  * SPI 버스 4개
    * 4 개의 칩 선택 및 6 개의 DRDY가 있는 내부 고속 SPI 센서 버스 1 개
    * XXX 전용 내부 저잡음 SPI 버스 1 개
    * 2 개의 칩 선택이 있는 기압계, DRDY 없음
    * FRAM 전용 내부 SPI 버스 1 개
    * 센서 모듈에 위치한 전용 SPI 교정 EEPROM 지원
    * 외부 SPI 버스 1개
  * 직렬 ESC를 사용하는 듀얼 CAN에 최대 2 개의 CAN 버스
    * 각 CANBus에는 개별 무음 제어 또는 ESC RX-MUX 제어가 있습니다.
    * 배터리 2 개의 전압 및 전류에 대한 아날로그 입력
    * 추가 아날로그 입력 2개
* 전기 시스템 :
  * Power module output: 4.9~5.5V
  * Max input voltage: 6V
  * Max current sensing: 120A
  * USB Power Input: 4.75~5.25V
  * Servo Rail Input: 0~36V
* Weight and Dimensions:
  * Dimensions: 45x45x13.5mm
  * Weight: 33.0g
* Environmental Data, Quality & Reliability:
  * Operating temperature: -40 ~ 85°c
  * Storage temp. -40~85℃
  * CE
  * FCC
  * RoHS compliant (lead-free)

Additional information can be found in the [Pix32 V5 Technical Data Sheet](http://www.holybro.com/manual/Holybro_PIX32-V5_technical_data_sheet_v1.1.pdf).

## Purchase

Order from [Holybro website](https://shop.holybro.com/pix32-v5_p1218.html).

## Assembly/Setup

The [Pix32 v5 Wiring Quick Start](../assembly/quick_start_holybro_pix32_v5.md) provides instructions on how to assemble required/important peripherals including GPS, Power Management Board etc.

## Base Board Layouts
![Pix32 v5 Image](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_base_boards_layout.jpg)

## Pinouts

Download pinouts here:
- [*pix32 v5* baseboard](http://www.holybro.com/manual/Holybro_PIX32-V5_PINOUTS_V1.1.pdf)
- [*pix32 v5* mini baseboard](http://www.holybro.com/manual/Holybro_Pix32-V5-Base-Mini-Pinouts.pdf)

## Dimensions

![Pix32 v5 Image](../../assets/flight_controller/holybro_pix32_v5/Dimensions_no_border.jpg)

## Voltage Ratings

*Pix32 v5* can be triple-redundant on the power supply if three power sources are supplied. The three power rails are: **POWER1**, **POWER2** and **USB**.

:::note
The output power rails **FMU PWM OUT** and **I/O PWM OUT** (0V to 36V) do not power the flight controller board (and are not powered by it). You must supply power to one of **POWER1**, **POWER2** or **USB** or the board will be unpowered.
:::

**Normal Operation Maximum Ratings**

Under these conditions all power sources will be used in this order to power the system:
1. **POWER1** and **POWER2** inputs (4.9V to 5.5V)
1. **USB** input (4.75V to 5.25V)

**Absolute Maximum Ratings**

Under these conditions the system will not draw any power (will not be operational), but will remain intact.
1. **POWER1** and **POWER2** inputs (operational range 4.1V to 5.7V, 0V to 10V undamaged)
1. **USB** input (operational range 4.1V to 5.7V, 0V to 6V undamaged)
1. Servo input: VDD_SERVO pin of **FMU PWM OUT** and **I/O PWM OUT** (0V to 42V undamaged)

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:
```
make holybro_pix32v5_default
```

## Debug Port

The system's [serial console](../debug/system_console.md) and SWD interface runs on the **FMU Debug** port

<!--while the I/O console and SWD interface can be accessed via **I/O Debug** port.-->

![FMU debug port diagram](../../assets/flight_controller/holybro_pix32_v5/FMU_Debug_Port_Horizontal.jpg)

The pinout uses the standard [Pixhawk debug connector pinout](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug). For wiring information see:
- [System Console > Pixhawk Debug Port](../debug/system_console.md#pixhawk_debug_port).


## Peripherals

* [Digital Airspeed Sensor](../sensor/airspeed.md)
* [Telemetry Radio Modules](../telemetry/README.md)
* [Rangefinders/Distance sensors](../sensor/rangefinders.md)


## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).


## Additional Information

- [Pix32 v5 Technical Data Sheet](http://www.holybro.com/manual/Holybro_PIX32-V5_technical_data_sheet_v1.1.pdf)
- [Pix32 v5 Pinouts](http://www.holybro.com/manual/Holybro_PIX32-V5_PINOUTS_V1.1.pdf)
- [Pix32 v5 Base Board Schematic Diagram](http://www.holybro.com/manual/Holybro_PIX32-V5-BASE-Schematic_diagram.pdf)
- [Pix32 v5 Mini Base Board Schematic Diagram](http://www.holybro.com/manual/Holybro_PIX32-V5-Base-Mini-Board_Schematic_diagram.pdf)
- [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).
