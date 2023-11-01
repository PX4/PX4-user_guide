# Durandal 배선 개요

:::warning PX4에서는 이 자동 항법 장치를 제조하지 않습니다. Contact the [manufacturer](https://holybro.com/) for hardware support or compliance issues.
:::

[Drundal](../flight_controller/durandal.md)<sup>&reg;</sup> 비행 콘트롤러의 전원공급 방법과 주요 주변장치 연결 방법을 설명합니다.

![Durandal](../../assets/flight_controller/durandal/durandal_hero.jpg)

## 포장 개봉

Durandal is sold bundled with a number of different combinations of accessories, including power modules: _PM02 V3_ and _PM07_, and the _Pixhawk 4 GPS/Compass_ ( u-blox NEO-M8N).

The content of the box with the _PM02 V3_ power module is shown below (the box also includes a pinout guide and power module instructions).

![Durandal 상자](../../assets/flight_controller/durandal/durandal_unboxing_schematics.jpg)

## 배선 개요

아래의 이미지는 주요 센서와 주변 장치(모터 및 서보 출력 제외)의 연결 방법을 설명합니다. 다음 섹션에서 각 장치들에 대하여 자세히 설명합니다.

![큐브 - 배선 개요](../../assets/flight_controller/durandal/durandal_wiring_overview.jpg)

:::tip
사용 가능한 포트에 대한 자세한 내용은 [Durandal &gt; 핀배열](../flight_controller/durandal.md#pinouts)을 참고하십시오.
:::

## 콘트롤러 장착 및 장착 방향

_Durandal_ should be mounted on the frame positioned as close to your vehicle’s center of gravity as possible, oriented top-side up with the arrow pointing towards the front of the vehicle.

![장착 및 방향](../../assets/flight_controller/durandal/orientation.jpg)

If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).

:::tip
이 보드에는 내부진동 차단 기능을 제공합니다.
콘트롤러 진동 차단 스티로폼을 사용하여 장착하시 마십시오. 일반인 양면 테이프로 장착하여도 충분합니다.
:::

## GPS + 나침반 + 부저 + 안전 스위치 + LED

Durandal is designed to work well with the _Pixhawk 4 GPS module_, which has an integrated compass, safety switch, buzzer and LED. 10 핀 케이블을 사용하여 [GPS 포트](../flight_controller/durandal.md#gps)에 연결합니다.

GPS/나침반은 차량 전방 표식을 사용하여 가능한 전자 장치들에서 멀리 떨어진 프레임에 장착하는 것이 좋습니다. 나침반은 다른 전자 장치와 멀어 질수록 간섭이 현격하게 감소합니다.

![Durandal에 나침반 / GPS 연결](../../assets/flight_controller/durandal/connection_gps_compass.jpg)

:::note
The GPS module's integrated safety switch is enabled _by default_ (when enabled, PX4 will not let you arm the vehicle). 안전 스위치를 1초간 길게 누르면 비활성화됩니다. 안전 스위치를 다시 눌러 활성화하여 기체 시동이 가능합니다. 조종기나 지상국 프로그램에서 기체 시동을 끌 수 없는 경우에 유용합니다.
:::

## 전원

전원 모듈 또는 배전 보드를 사용하여 모터와 서보에 전원을 공급하고 소비 전력을 측정할 수 있습니다. 권장되는 전원 모듈은 아래와 같습니다.

<a id="pm02_v3"></a>

### PM02 v3 전원 모듈

The [Power Module (PM02 v3)](../power_module/holybro_pm02.md) can be bundled with _Durandal_. 비행 콘트롤러에 배터리의 전력을 공급합니다.

Connect the output of the _Power Module_ as shown.

![Durandal PM02v3 전원 연결](../../assets/flight_controller/durandal/connection_power.jpg)

- PM 전압/전류 포트 : 제공된 6선 GH 케이블을 사용하여 [POWER1](../flight_controller/durandal.md#power) 포트나 `POWER2` 포트에 연결합니다.
- PM 입력 (XT60 수 커넥터) : LiPo 배터리(2 ~ 12S)에 연결합니다.
- PM 전원 출력 (XT60 암 커넥터) : 모든 모터 ESC에 케이블을 연결합니다.

:::tip
이 전원 모듈에는 배전 배선이 포함되어 있지 않으므로, 모든 ESC를 전원 모듈 출력에 병렬로 연결합니다(제공된 전압 레벨에 적합한 ESC를 사용).
:::

:::tip
**MAIN/AUX**의 8 핀 전원 (+) 레일은 비행 콘트롤러에 대한 전원 모듈 공급으로 전원이 공급되지 않습니다. 방향타, 엘레본 등의 서보를 구동하기 위해 별도로 전원을 공급해야하는 경우에는 파워 레일을 BEC 장착 ESC 또는 독립형 5V BEC나 2S LiPo 배터리에 연결합니다. 사용하는 서보의 전압이 적절한 지 확인하십시오.
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

The [Pixhawk 4 Power Module (PM07)](https://holybro.com/collections/power-modules-pdbs/products/pixhawk-4-power-module-pm07) can be bundled/used with _Durandal_. 전원 모듈 및 배전 보드 역할을 수행하여 배터리의 조정된 전력을 비행 콘트롤러와 ESC에 제공합니다.

이것은 [ Pixhawk 4 빠른 시작 &gt; 전원](../assembly/quick_start_pixhawk4.md#power)에 설명된 것과 동일 방식으로 연결합니다.

전원 모듈에는 다음과 같은 특성과 제약 사항이 있습니다.

- PCB 전류 : 총 120A 출력 (최대)
- UBEC 5V 출력 전류 : 3A
- UBEC 입력 전압 : 7 ~ 51v (2 ~ 12s LiPo)
- 크기 : 68 *50* 8 mm
- Mounting Holes: 45\*45mm
- 중량: 36g
- 패키지 내용물 :
  - PM07 보드 (1 개)
  - 80mm XT60 커넥터 와이어 (1 개)

:::note
See also [PM07 Quick Start Guide](https://docs.holybro.com/power-module-and-pdb/power-module/pm07-quick-start-guide) (Holybro).
:::

### 배터리 설정

배터리 전원 설정은 [전원설정](../config/battery.md)에서 설정합니다. For either Power Module you will need to configure the _Number of Cells_.

You will not need to update the _voltage divider_ unless you are using some other power module (e.g. the one from the Pixracer).

## Radio Control

A remote control (RC) radio system is required if you want to _manually_ control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then _bind_ them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers to _Durandal_:

- Spektrum/DSM 수신기는 [DSM RC](../flight_controller/durandal.md#dsm-rc-port) 입력에 연결합니다.

  ![Durandal - DSM](../../assets/flight_controller/durandal/dsm.jpg)

- PPM과 S.Bus 방식 수신기는 [SBUS_IN / PPM_IN](../flight_controller/durandal.md#rc-in) 입력 포트 (MAIN/AUX 입력 옆에 RC IN으로 표시됨)에 연결합니다.

  ![Durandal - 백 핀아웃 (개략도)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

- PPM and PWM receivers that have an _individual wire for each channel_ must connect to the **PPM RC** port _via a PPM encoder_ [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

For more information about selecting a radio system, receiver compatibility, and binding your transmitter/receiver pair, see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).

## Telemetry Radios (Optional)

무선 텔레메트리는 지상국 프로그램에서 비행 차량의 통신/제어에 사용합니다(예 : UAV를 특정 위치로 지시하거나 새 임무를 업로드 할 수 있음).

차량 기반 무선 장치는 6핀 커넥터 중 하나를 사용하여 아래와 같이 [TELEM1](../flight_controller/durandal.md#telem1_2_3) 포트에 연결합니다 (이 포트에 연결된 경우 추가 설정이 필요하지 않음). 다른 라디오는 지상국 컴퓨터 또는 모바일 장치에 USB를 통하여 연결합니다.

![Durandal - 무선 텔레메트리](../../assets/flight_controller/durandal/holybro_telemetry_radio.jpg)

## SD 카드 (선택 사항)

SD 카드는 [비행 세부 정보를 기록 및 분석](../getting_started/flight_reporting.md)하고, 임무를 수행하고, UAVCAN 버스 하드웨어를 사용하는 데 필요하므로 사용하는 것이 좋습니다. Insert an SD card into the _Durandal_ where indicated below.

![Durandal - SD 카드](../../assets/flight_controller/durandal/durandal_sd_slot.jpg)

:::tip
For more information see [Basic Concepts > SD Cards (Removable Memory)](../getting_started/px4_basic_concepts.md#sd-cards-removable-memory).
:::

## 모터

모터 서보 제어 신호는 **I / O PWM OUT** (**MAIN OUT**) 및 **FMU PWM OUT** (**AUX**)에 연결됩니다. ) 포트는 [기체 정의서](../airframes/airframe_reference.md)에서 차량에 지정된 순서로 지정됩니다.

![Durandal - 백 핀아웃 (개략도)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

모터는 별도 [전원을 공급](#power)하여야 합니다.

:::note
프레임이 기체 참조 정의서에 없으면, 적절한 유형의 "일반"기체를 사용하십시오.
:::

:::tip
_Durandal_ has 5 AUX ports, so cannot be used with airframes that map AUX6, AUX7, AUX8 to motors or other critical flight controls.
:::

## 기타 주변 장치

주변 장치 배선 및 설정에 관한 선택 사항은 개별 [주변 장치](../peripherals/README.md)를 참고하십시오.

## 핀 배열

[Durandal &gt; 핀아웃](../flight_controller/durandal.md#pinouts)

<a id="configuration"></a>

## PX4 설정

First you will need to install [PX4 "Master" Firmware](../config/firmware.md#custom) onto the controller using _QGroundControl_.

:::note
Durandal support will be in the _stable_ PX4 release that follows PX4 v1.10.
:::

더 자세한 일반 설정 정보는 [자동항법장치 설정](../config/README.md)을 참고하십시오.

QuadPlane에 대한 자세한 설정은 [QuadPlane VTOL 설정](../config_vtol/vtol_quad_configuration.md)을 참고하십시오.

## 추가 정보

- [Durandal 개요](../flight_controller/durandal.md)
- [Durandal Technical Data Sheet](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Durandal_technical_data_sheet_90f8875d-8035-4632-a936-a0d178062077.pdf) (Holybro)
- [Durandal Pinouts](https://holybro.com/collections/autopilot-flight-controllers/products/Durandal-Pinouts) (Holybro)
- [Durandal_MB_H743sch.pdf](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/durandal/Durandal_MB_H743sch.pdf) (Durandal 회로도)
- [STM32H743IIK_pinout.pdf](https://github.com/PX4/PX4-user_guide/raw/master/assets/flight_controller/durandal/STM32H743IIK_pinout.pdf) (Durandal Pinmap)
