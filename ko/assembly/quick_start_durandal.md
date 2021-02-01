# Durandal 배선 빠른 시작

:::warning PX4에서는 이런 종류의 자동 항법 장치를 제조하지는 않습니다. 하드웨어 지원 또는 호환 문제는 [제조사](https://shop.holybro.com/)와 상담하십시오.
:::

이 퀵 스타트 설명서는 [Drundal](../flight_controller/durandal.md)<sup>&reg;</sup> 비행 컨트롤러에 전원 공급 방법과 가장 중요한 주변 장치 연결법을 설명합니다.

![Durandal](../../assets/flight_controller/durandal/durandal_hero.jpg)

## 포장 개봉

Durandal은 전원 모듈 (* PM02 V3 *, * PM07 * 및 * Pixhawk 4 GPS / Compass *)을 포함한 다양한 액세서리 조합과 함께 번들로 판매됩니다. (유블럭스 NEO-M8N).

*PM02 V3* 전원 모듈이있는 상자의 내용물은 아래에 나와 있습니다 (상자에는 핀 배치 가이드 및 전원 모듈 지침도 포함되어 있음).

![Durandal Box](../../assets/flight_controller/durandal/durandal_unboxing_schematics.jpg)

## 배선 개요

아래의 이미지는 중요한 센서 및 주변 장치 (모터 및 서보 출력 제외)를 연결법을 나타냅니다. 다음 섹션에서 각각의 장치에 대해 자세히 설명합니다.

![Durandal Wiring Overview](../../assets/flight_controller/durandal/durandal_wiring_overview.jpg)

:::tip
사용 가능한 포트에 대한 자세한 내용은 [ Durandal> 핀아웃 ](../flight_controller/durandal.md#pinouts)에서 찾을 수 있습니다.
:::

## 콘트롤러 장착 및 장착 방향

*Duranda *은 차량의 무게 중심에 최대한 가깝게 배치 된 프레임에 장착해야하며 화살표가 차량의 앞쪽과 위쪽을 향하도록 하여야 합니다.

![Mounting/Orientation](../../assets/flight_controller/durandal/orientation.jpg)

컨트롤러를 공간의 제약등으로 인하여 권장하는 방향으로 장착 할 수없는 경우에는 실제 장착한 방향을 소프트웨어에서 설정하여야 합니다. : [비행 콘트롤러 방향 ](../config/flight_controller_orientation.md).

:::tip
보드에는 내부 진동 차단 기능이 있습니다. 컨트롤러를 장착시 진동 차단 스티로폼을 사용하지 마십시오 (일반적으로 양면 테이프로 충분 함).
:::

## GPS + 나침반 + 부저 + 안전 스위치 + LED

Durandal은 나침반, 안전 스위치, 부저 및 LED가 통합된 *Pixhawk 4 GPS 모듈*에 최적화되도록 설계되었습니다. 10 핀 케이블을 사용하여 [GPS 포트](../flight_controller/durandal.md#gps)에 직접 연결합니다.

GPS/나침반은 차량 전명 방향 표시를 사용하여 가능한 한 다른 전자 장치에서 멀리 떨어진 프레임에 장착해야합니다 (나침반을 다른 전자 장치와 분리하면 간섭이 줄어듦).

![Connect compass/GPS to Durandal](../../assets/flight_controller/durandal/connection_gps_compass.jpg)

:::note GPS
모듈의 통합 안전 스위치는 *기본적으로* 활성화되어 있습니다 (활성화되면 PX4는 차량 시동을 걸 수 없습니다). 비활성화하려면 안전 스위치를 1초간 길게 누르십시오. 안전 스위치를 다시 눌러 안전 장치를 활성화하고 기체 시동을 끌 수 있습니다 (어떤 이유로든 조종기나 지상국 프로그램이 기체 시동을 끌 수 없을 때 유용합니다).
:::

## 전원

전원 모듈 또는 배전 보드를 사용하여 모터/서보에 전원을 공급하고 전력 소비를 측정 할 수 있습니다. 권장되는 전원 모듈은 다음과 같습니다.

<span id="pm02_v3"></span>
### PM02 v3 전원 모듈

[ 전원 모듈 (PM02 v3) ](https://shop.holybro.com/power-modulepm02-v3_p1185.html)은 * Durandal *과 함께 번들로 제공 될 수 있습니다. 비행 컨트롤러에 전력을 공급하고 배터리 전압/전류를 비행 컨트롤러에 보냅니다.

그림과 같이 * 전원 모듈 *의 출력을 연결합니다.

![Durandal PM02v3 Power connections](../../assets/flight_controller/durandal/connection_power.jpg)


- PM 전압/전류 포트 : 제공된 6선 GH 케이블을 사용하여 [ POWER1 ](../flight_controller/durandal.md#power) 포트 (또는 ` POWER2 `)에 연결합니다.
- PM 입력 (XT60 수 커넥터) : LiPo 배터리 (2 ~ 12S)에 연결합니다.
- PM 전원 출력 (XT60 암 커넥터) : 모든 모터 ESC에 배선합니다.

:::tip
이 전원 모듈에는 배전 배선이 포함되어 있지 않으므로 일반적으로 모든 ESC를 전원 모듈 출력에 병렬로 연결합니다 (ESC는 제공된 전압 레벨에 적합해야 함).
:::

:::tip
** MAIN / AUX **의 8 핀 전원 (+) 레일은 비행 컨트롤러에 대한 전원 모듈 공급으로 전원이 공급되지 않습니다. 방향타, 엘레본 등의 서보를 구동하기 위해 별도로 전원을 공급해야하는 경우, 파워 레일을 BEC 장착 ESC 또는 독립형 5V BEC 또는 2S LiPo 배터리에 연결해야합니다. 사용하는 서보의 전압이 적절한 지 확인하십시오.
:::

전원 모듈에는 다음과 같은 특성/제한이 있습니다.
- 최대 입력 전압 : 60V
- 최대 전류 감지 : 120A 전압
- SV ADC 스위칭 레귤레이터 출력에 대해 구성된 전류 측정은 최대 5.2V 및 3A를 출력합니다.
- 무게 : 20g
- 패키지 내용물 :
  - PM02 보드
  - 6 핀 MLX 케이블 (1)
  - 6 핀 GH 케이블 (1)

:::note
[ PM02v3 전원 모듈 설명서 ](http://www.holybro.com/manual/Holybro_PM02_v3_PowerModule_Manual.pdf) (Holybro)도 참조하십시오.
:::

<span id="pm07"></span>
### Pixhawk 4 전원 모듈 (PM07)

[Pixhawk 4 전원 모듈 (PM07) ](https://shop.holybro.com/pixhawk-4-power-module-pm07_p1095.html)은 * Durandal *과 함께 번들로 제공되기도 합니다. 전원 모듈 및 배전 보드 역할을 모두 수행하여 조정 된 전원을 비행 컨트롤러와 ESC에 제공하고 배터리 전압/전류를 비행 컨트롤러에 보냅니다.

이것은 [ Pixhawk 4 빠른 시작> 전원 ](../assembly/quick_start_pixhawk4.md#power) 문서에 설명된 것과 같은 방식으로 연결됩니다.

전원 모듈에는 다음과 같은 특성과 제약 사항이 있습니다.
- PCB 전류 : 총 120A 출력 (최대)
- UBEC 5V 출력 전류 : 3A
- UBEC 입력 전압 : 7 ~ 51v (2 ~ 12s LiPo)
- Dimensions: 68*50*8 mm
- Mounting Holes: 45*45mm
- Weight: 36g
- Package includes:
  - PM07 board (1)
  - 80mm XT60 connector wire (1)

:::note
See also [PM07 Quick Start Guide](http://www.holybro.com/manual/PM07-Quick-Start-Guide.pdf) (Holybro).
:::

### Battery Configuration

The battery/power setup must be configured in [Power Settings](../config/battery.md). For either Power Module you will need to configure the *Number of Cells*.

You will not need to update the *voltage divider* unless you are using some other power module (e.g. the one from the Pixracer).


## Radio Control

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers to *Durandal*:


- Spektrum/DSM receivers connect to the [DSM RC](../flight_controller/durandal.md#dsm-rc-port) input.

  ![Durandal - DSM](../../assets/flight_controller/durandal/dsm.jpg)

- PPM and S.Bus receivers connect to the [SBUS_IN/PPM_IN](../flight_controller/durandal.md#rc-in) input port (marked as RC IN, next to the MAIN/AUX inputs).

  ![Durandal - Back Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

- PPM and PWM receivers that have an *individual wire for each channel* must connect to the **PPM RC** port *via a PPM encoder* [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

For more information about selecting a radio system, receiver compatibility, and binding your transmitter/receiver pair, see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).


## Telemetry Radios (Optional)

Telemetry radios may be used to communicate and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The vehicle-based radio should be connected to the [TELEM1](../flight_controller/durandal.md#telem1_2_3) port as shown below using one of the 6-pos connectors (if connected to this port, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually by USB).

![Durandal/Telemetry Radio](../../assets/flight_controller/durandal/holybro_telemetry_radio.jpg)


## SD Card (Optional)

SD cards are highly recommended as they are needed to [log and analyse flight details](../getting_started/flight_reporting.md), to run missions, and to use UAVCAN-bus hardware. Insert an SD card into the *Durandal* where indicated below.

![Durandal SD Card](../../assets/flight_controller/durandal/durandal_sd_slot.jpg)

:::tip
For more information see [Basic Concepts > SD Cards (Removable Memory)](../getting_started/px4_basic_concepts.md#sd_cards).
:::

## Motors

Motors/servos control signals are connected to the **I/O PWM OUT** (**MAIN OUT**) and **FMU PWM OUT** (**AUX**) ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md).

![Durandal - Back Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

The motors must be separately [powered](#power).

:::note
If your frame is not listed in the airframe reference then use a "generic" airframe of the correct type.
:::

:::tip
*Durandal* has 5 AUX ports, so cannot be used with airframes that map AUX6, AUX7, AUX8 to motors or other critical flight controls.
:::

## Other Peripherals

The wiring and configuration of optional/less common components is covered within the topics for individual [peripherals](../peripherals/README.md).

## Pinouts

[Durandal > Pinouts](../flight_controller/durandal.md#pinouts)

<span id="configuration"></span>
## PX4 Configuration

First you will need to install [PX4 "Master" Firmware](../config/firmware.md#custom) onto the controller using *QGroundControl*.

:::note
Durandal support will be in the *stable* PX4 release that follows PX4 v1.10.
:::

Further general configuration information is covered in: [Autopilot Configuration](../config/README.md).

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)


## Further information

- [Durandal Overview](../flight_controller/durandal.md)
- [Durandal Technical Data Sheet](http://www.holybro.com/manual/Durandal_technical_data_sheet.pdf) (Holybro)
- [Durandal Pinouts](http://www.holybro.com/manual/Durandal-Pinouts.pdf) (Holybro)
- [Durandal_MB_H743sch.pdf](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/durandal/Durandal_MB_H743sch.pdf) (Durandal Schematics)
- [STM32H743IIK_pinout.pdf](https://github.com/PX4/PX4-user_guide/raw/master/assets/flight_controller/durandal/STM32H743IIK_pinout.pdf) (Durandal Pinmap)
