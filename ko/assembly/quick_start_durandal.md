# Durandal 배선 개요

<Badge type="tip" text="PX4 v1.11" />

:::warning
PX4에서는 이 자동 항법 장치를 제조하지 않습니다.
소형화를 위하여 가진 IO가 적습니다.
:::

This quick start guide shows how to power the Holybro [Durandal](../flight_controller/durandal.md)<sup>&reg;</sup> flight controller and connect its most important peripherals.

![Durandal](../../assets/flight_controller/durandal/durandal_hero.jpg)

## 포장 개봉

Durandal is sold bundled with a number of different combinations of accessories, including power modules: _PM02 V3_ and _PM07_, and the _Pixhawk 4 GPS/Compass_ ( u-blox NEO-M8N).

The content of the box with the _PM02 V3_ power module is shown below (the box also includes a pinout guide and power module instructions).

![Durandal Box](../../assets/flight_controller/durandal/durandal_unboxing_schematics.jpg)

## 배선 개요

아래의 이미지는 주요 센서와 주변 장치(모터 및 서보 출력 제외)들의 연결 방법을 설명합니다. 다음 섹션에서 각 장치에 대하여 자세히 설명합니다.

![Durandal Wiring Overview](../../assets/flight_controller/durandal/durandal_wiring_overview.jpg)

:::tip
More information about available ports can be found here: [Durandal > Pinouts](../flight_controller/durandal.md#pinouts).
:::

## 콘트롤러 장착 및 장착 방향

_Durandal_ should be mounted on the frame positioned as close to your vehicle’s center of gravity as possible, oriented top-side up with the arrow pointing towards the front of the vehicle.

![장착 및 방향](../../assets/flight_controller/durandal/orientation.jpg)

If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).

:::tip
보드에는 내부 진동 차단 기능이 있습니다. 10 핀 케이블을 사용하여 [GPS 포트](../flight_controller/durandal.md#gps)에 연결합니다.
:::

## GPS + 나침반 + 부저 + 안전 스위치 + LED

Durandal is designed to work well with the _Pixhawk 4 GPS module_, which has an integrated compass, safety switch, buzzer and LED. It connects directly to the [GPS port](../flight_controller/durandal.md#gps) using the 10 pin cable.

GPS/나침반은 차량 전방 표식를 사용하여 가능하면 전자 장치들에서 멀리 떨어진 프레임에 장착하는 것이 좋습니다. 나침반은 다른 전자 장치와 떨어지면 간섭이 줄어듦니다.

![Connect compass/GPS to Durandal](../../assets/flight_controller/durandal/connection_gps_compass.jpg)

전원 모듈 또는 배전 보드를 사용하여 모터와 서보에 전원을 공급하고 소비 전력을 측정할 수 있습니다. 권장되는 전원 모듈은 아래와 같습니다. 안전 스위치를 다시 눌러 안전 장치를 활성화하고 기체 시동을 끌 수 있습니다. 조종기나 지상국 프로그램에서 기체 시동을 끌 수 없는 상황에서 유용합니다.
:::

## 전원

전원 모듈 또는 배전 보드를 사용하여 모터와 서보에 전원을 공급하고 소비 전력을 측정할 수 있습니다. 비행 콘트롤러에 배터리의 전력을 공급합니다.

<a id="pm02_v3"></a>

### PM02 v3 전원 모듈

The [Power Module (PM02 v3)](../power_module/holybro_pm02.md) can be bundled with _Durandal_. It provides regulated power to flight controller and sends battery voltage/current to the flight controller.

Connect the output of the _Power Module_ as shown.

![Durandal PM02v3 Power connections](../../assets/flight_controller/durandal/connection_power.jpg)

- PM 전압/전류 포트 : 제공된 6선 GH 케이블을 사용하여 [POWER1](../flight_controller/durandal.md#power) 포트나 `POWER2` 포트에 연결합니다.
- PM 입력 (XT60 수 커넥터) : LiPo 배터리(2 ~ 12S)에 연결합니다.
- PM 전원 출력 (XT60 암 커넥터) : 모든 모터 ESC에 케이블을 연결합니다.

:::tip
**MAIN/AUX**의 8 핀 전원 (+) 레일은 비행 콘트롤러에 대한 전원 모듈 공급으로 전원이 공급되지 않습니다. 방향타, 엘레본 등의 서보를 구동하기 위해 별도로 전원을 공급해야하는 경우에는 파워 레일을 BEC 장착 ESC 또는 독립형 5V BEC나 2S LiPo 배터리에 연결합니다.

:::tip
The 8 pin power (+) rail of **MAIN/AUX** is not powered by the power module supply to the flight controller. 방향타, 엘레본 등의 서보를 구동하기 위해 별도로 전원을 공급해야하는 경우에는 파워 레일을 BEC 장착 ESC 또는 독립형 5V BEC나 2S LiPo 배터리에 연결합니다. 사용하는 서보의 전압을 확인하십시오.
:::

전원 모듈에는 다음과 같은 특성과 제약 사항이 있습니다.

- 최대 입력 전압 : 60V
- 최대 전류 감지 : 120A 전압
- SV ADC 스위칭 레귤레이터 출력에 대해 설정된 전원은 최대 5.2V 및 3A를 출력합니다.
- 무게 : 20g
- 패키지 내용물 :
  - PM02 보드
  - 6 핀 MLX 케이블 (1 개)
  - 6 핀 GH 케이블 (1 개)

<a id="pm07"></a>

### Pixhawk 4 전원 모듈 (PM07)

The [Pixhawk 4 Power Module (PM07)](https://holybro.com/collections/power-modules-pdbs/products/pixhawk-4-power-module-pm07) can be bundled/used with _Durandal_. It acts as both a power module and power distribution board, providing regulated power to flight controller and the ESCs, and sending battery voltage/current to the flight controller.

전원 모듈에는 다음과 같은 특성과 제약 사항이 있습니다.

It has the following characteristics/limits:

- PCB 전류 : 총 120A 출력 (최대)
- UBEC 5V 출력 전류 : 3A
- UBEC 입력 전압 : 7 ~ 51v (2 ~ 12s LiPo)
- 크기 : 68 *50* 8 mm
- Mounting Holes: 45\*45mm
- 중량: 36g
- 패키지 내용물 :
  - PM07 보드 (1 개)
  - 80mm XT60 커넥터 와이어 (1 개)

배터리 전원 설정은 [전원설정](../config/battery.md)에서 설정합니다.
:::

### 배터리 설정

배터리 설정은 [전원 설정](../config/battery.md)에서 설정합니다. For either Power Module you will need to configure the _Number of Cells_.

You will not need to update the _voltage divider_ unless you are using some other power module (e.g. the one from the Pixracer).

## 무선 조종

A remote control (RC) radio system is required if you want to _manually_ control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then _bind_ them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers to _Durandal_:

- Spektrum/DSM 수신기는 [DSM RC](../flight_controller/durandal.md#dsm-rc-port) 입력에 연결합니다.

  ![Durandal - DSM](../../assets/flight_controller/durandal/dsm.jpg)

- PPM과 S.Bus 방식 수신기는 [SBUS_IN / PPM_IN](../flight_controller/durandal.md#rc-in) 입력 포트 (MAIN/AUX 입력 옆에 RC IN으로 표시됨)에 연결합니다.

  ![Durandal - 백 핀아웃 (개략도)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

- PPM and PWM receivers that have an _individual wire for each channel_ must connect to the **PPM RC** port _via a PPM encoder_ [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

무선 텔레메트리는 지상국 프로그램에서 비행 차량의 통신/제어에 사용합니다(예 : UAV를 특정 위치로 지시하거나 새 임무를 업로드 할 수 있음).

## 무선 텔레메트리(선택 사항)

무선 텔레메트리는 지상국 프로그램에서 비행 차량의 통신/제어에 사용합니다(예 : UAV를 특정 위치로 지시하거나 새 임무를 업로드 할 수 있음).

The vehicle-based radio should be connected to the [TELEM1](../flight_controller/durandal.md#telem1_2_3) port as shown below using one of the 6-pos connectors (if connected to this port, no further configuration is required). 다른 텔레메트리는 일반적으로 지상국 컴퓨터나 모바일 장치에 USB를 통하여 연결됩니다.

![Durandal/Telemetry Radio](../../assets/flight_controller/durandal/holybro_telemetry_radio.jpg)

## SD 카드 (선택 사항)

SD 카드는 [비행 세부 정보를 기록 및 분석](../getting_started/flight_reporting.md)하고, 임무를 수행하고, UAVCAN 버스 하드웨어를 사용하는 데 필요하므로 사용하는 것이 좋습니다. Insert an SD card into the _Durandal_ where indicated below.

![Durandal SD Card](../../assets/flight_controller/durandal/durandal_sd_slot.jpg)

:::tip
For more information see [Basic Concepts > SD Cards (Removable Memory)](../getting_started/px4_basic_concepts.md#sd-cards-removable-memory).
:::

## 모터

Motors/servos control signals are connected to the **I/O PWM OUT** (**MAIN OUT**) and **FMU PWM OUT** (**AUX**) ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md).

![Durandal - 백 핀아웃 (개략도)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

모터는 별도 [전원을 공급](#power)하여야 합니다.

:::note
프레임이 기체 참조 정의서에 없으면, 적절한 유형의 "일반"기체를 사용하십시오.
:::

:::tip
_Durandal_ has 5 AUX ports, so cannot be used with airframes that map AUX6, AUX7, AUX8 to motors or other critical flight controls.
:::

## 기타 주변 장치

자주 사용하지 않는 부품들의 배선과 조립 방법은 개별 [주변 장치](../peripherals/README.md)를 참고하십시오.

## 핀 배열

[Durandal > Pinouts](../flight_controller/durandal.md#pinouts)

<a id="configuration"></a>

## PX4 설정

First you will need to install [PX4 "Master" Firmware](../config/firmware.md#custom) onto the controller using _QGroundControl_.

::: info Durandal support will be in the _stable_ PX4 release that follows PX4 v1.10.
:::

QuadPlane에 대한 자세한 설정은 [QuadPlane VTOL 설정](../config_vtol/vtol_quad_configuration.md)을 참고하십시오.

QuadPlane에 대한 자세한 설정 방법은 [QuadPlane VTOL 설정](../config_vtol/vtol_quad_configuration.md)을 참고하십시오.

## 추가 정보

- [Durandal 개요](../flight_controller/durandal.md)
- [Durandal Technical Data Sheet](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Durandal_technical_data_sheet_90f8875d-8035-4632-a936-a0d178062077.pdf) (Holybro)
- [Durandal Pinouts](https://holybro.com/collections/autopilot-flight-controllers/products/Durandal-Pinouts) (Holybro)
- [Durandal_MB_H743sch.pdf](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/durandal/Durandal_MB_H743sch.pdf) (Durandal 회로도)
- [STM32H743IIK_pinout.pdf](https://github.com/PX4/PX4-user_guide/raw/master/assets/flight_controller/durandal/STM32H743IIK_pinout.pdf) (Durandal Pinmap)
