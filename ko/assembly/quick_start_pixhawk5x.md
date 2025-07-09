---
canonicalUrl: https://docs.px4.io/main/ko/assembly/quick_start_pixhawk5x
---

# 홀리브로 픽스호크 5X 배선 개요

:::warning PX4에서는 이 자동항법장치를 제조하지 않습니다. Contact the [manufacturer](https://holybro.com/) for hardware support or compliance issues.
:::

[Pixhawk<sup>&reg;</sup> 5X](../flight_controller/pixhawk5x.md) 비행 콘트롤러의 전원 공급 방법과 주요 주변 장치 연결 방법에 대하여 설명합니다.


<img src="../../assets/flight_controller/pixhawk5x/pixhawk5x_standard_set.jpg" width="520px" title="Pixhawk 5X 표준 세트" />

Pixhawk 5 표준 세트

## 배선 개요

아래 그림은 주요 센서와 주변기기 연결 방법을 설명합니다.

![Pixhawk 5X 배선 개요](../../assets/flight_controller/pixhawk5x/pixhawk5x_wiring_diagram.jpg)


:::tip
사용 가능한 포트에 대한 자세한 설명은 [Pixhawk  5X &gt; 연결 방법](../flight_controller/pixhawk5x.md#connections)을 참고하십시오.
:::

## 콘트롤러 장착 및 장착 방향

*Pixhawk 5X*는 키트에 포함된 양면 테이프를 사용하여 프레임에 장착할 수 있습니다. 차량의 무게 중심에 최대한 가깝운 프레임에 장착하여야 하며, 화살표가 차량의 앞쪽과 위쪽을 향하도록 하여야 합니다.

<img src="../../assets/flight_controller/pixhawk5x/pixhawk5x_vehicle_front1.jpg" width="400px" title="Pixhawk 5X 표준 세트" />

:::note
If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).
:::

## GPS + 나침반 + 부저 + 안전 스위치 + LED

_Pixhawk5X 표준 세트_는 **GPS1** 포트에 연결하는 M8N 또는 M9N GPS(10핀 커넥터)와 함께 구입할 수 있습니다. 이 GNSS 모듈에는 나침반, 안전 스위치, 부저 및 LED가 통합되어 있습니다.

A secondary [M8N or M9N GPS](https://holybro.com/collections/gps) (6-pin connector) can be purchased separately and connected to the **GPS2** port.

The GPS/Compass should be [mounted on the frame](../assembly/mount_gps_compass.md) as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

<img src="../../assets/flight_controller/pixhawk5x/pixhawk5x_gps_front.jpg" width="200px" title="Pixhawk 5X 표준 세트" />


:::note GPS
모듈의 통합 안전 스위치는 *기본적으로* 활성화됩니다. 활성화된 상태에서 PX4의 차량 시동이 가능합니다. 비활성화하려면 안전 스위치를 1초간 길게 누르십시오. 안전 스위치를 다시 눌러 안전 장치를 활성화하고 기체 시동을 끌 수 있습니다. 조종기나 지상국 프로그램에서 기체 시동을 끌 수 없는 상황에서 유용합니다.
:::


## 전원

표준 세트와 함께 제공되는 *PM02D 전원 모듈*(PM 보드)의 출력을 6선 케이블을 사용하여 *Pixhawk 5X* **POWER** 포트 중 하나에 연결합니다. Pixhawk 5X의 PM02D 및 전원 포트는 6회로
2.00mm 피치 CLIK-Mate 전선 기판 간 PCB 리셉터클<0>과 [Housing](https://www.molex.com/molex/products/part-detail/crimp_housings/5024390600)을 사용합니다.</p> 

PM02D 전원 모듈은 **2~6S** 배터리를 지원하며, 보드의 입력을 LiPo 배터리에 연결합니다. 전원 보드는 **FMU PWM OUT**와 **I/O PWM OUT**의 + 및 - 핀에 전원을 공급하지 않습니다.

비행기나 로버를 사용하는 경우 방향타, 엘레본 등의 서보를 구동하려면 **FMU PWM-OUT**에 별도로 전원을 공급하여야 합니다. 이는 **FMU PWM-OUT**의 8핀 전원(+) 레일을 전압 조정기(예: BEC 장착 ESC 또는 독립형 5V BEC 또는 2S LiPo 배터리)에 연결하여 수행할 수 있습니다.

:::note
파워 레일 사용 중인 서보에 적절한 전압을 공급하여야 합니다.
:::

| 핀 & 커넥터     | 기능                             |
| ----------- | ------------------------------ |
| I/O PWM Out | 여기에 모터 신호와 GND 배선을 연결합니다.      |
| FMU PWM Out | 여기에 서보 신호, 양극 및 GND 전선을 연결합니다. |


:::note PX
펌웨어의 **MAIN** 출력은 *Pixhawk 5X*의 **I/O PWM OUT** 포트에 매핑되는 반면, **AUX 출력**은 *Pixhawk 5X*의 **FMU PWM OUT**에 매핑됩니다. 예를 들어 **MAIN1**은 **I/O PWM OUT**의 IO_CH1 핀에 매핑되고, **AUX1**은 **FMU PWM OUT**의 FMU_CH1 핀에 매핑됩니다.
:::

*Pixhawk 5X* 전원 포트의 핀배열은 다음과 같습니다. 전원 포트는 전압 및 전류 데이터를 위해 PM02D 전원 모듈에서 I2C 디지털 신호를 수신합니다. VCC 라인은 최소 3A 연속을 제공해야하며, 기본적으로 5.1V로 설정되어야 합니다. 5V 보다 낮은 전압은 권장되지 않습니다.

| 핀     | 신호  | 전압    |
| ----- | --- | ----- |
| 1 (적) | VCC | +5V   |
| 2 (흑) | VCC | +5V   |
| 3 (흑) | SCL | +3.3V |
| 4 (흑) | SDA | +3.3V |
| 5 (흑) | GND | GND   |
| 6 (흑) | GND | GND   |




## Radio Control

라디오 리모트 컨트롤(RC)은 기체를 *수동*으로 조작합니다. PX4 자율 비행 모드에는 RC는 필수 요구 사항은 아닙니다.

[호환되는 송신기/수신기를 선택](../getting_started/rc_transmitter_receiver.md)한 다음 통신을 위해 *바인딩*을 하여야 합니다(특정 송신기/수신기와 함께 제공되는 매뉴얼 참조).

- Spektrum/DSM 수신기는 **DSM/SBUS RC** 입력에 연결합니다.
- PPM/SBUS 수신기는 **RC IN** 입력 포트에 연결합니다.

*각각의 채널이 독립적으로 배선된* PPM/PWM 수신기는 반드시**RC IN**포트에 *PPM 인코더를 통하여* [아래와 같이](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)연결하여야 합니다. PPM-Sum 수신기는 모든 채널에 하나의 전선만 사용합니다.

For more information about selecting a radio system, receiver compatibility, and binding your transmitter/receiver pair, see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).




## Telemetry Radios (Optional)

[무선 텔레메트리](../telemetry/README.md)는 지상국 프로그램에서 비행 차량의 통신/제어에 사용합니다(예 : UAV를 특정 위치로 지시하거나 새 임무를 업로드 할 수 있음).

기체의 텔레메트리를 **TELEM1** 포트에 연결합니다. 이 포트에 연결된 경우에는 추가 설정이 필요하지 않습니다. 다른 텔레메트리는 일반적으로 지상국 컴퓨터나 모바일 장치에 USB를 통하여 연결됩니다.

Radios are also available for purchase on [Holybro's website](https://holybro.com/collections/telemetry-radios) .



## SD 카드 (선택 사항)

SD 카드는 [비행 세부 정보를 기록 및 분석](../getting_started/flight_reporting.md)하고, 임무를 수행하고, UAVCAN 버스 하드웨어를 사용하는 데 필요하므로 사용하는 것이 좋습니다. 아래 그림과 같이 SD 카드(Pixhawk  5X 키트에 포함됨)를 *Pixhawk 5X*에 삽입합니다.

<img src="../../assets/flight_controller/pixhawk5x/pixhawk5x_sd_slot.jpg" width="420px" title="Pixhawk5x standard set" />

:::tip
For more information see [Basic Concepts > SD Cards (Removable Memory)](../getting_started/px4_basic_concepts.md#sd-cards-removable-memory). 아래 그림과 같이 SD 카드(Pixhawk  5X 키트에 포함됨)를 *Pixhawk 5X*에 삽입합니다.



## 모터

모터/서보 신호는 **I/O PWM OUT** (**MAIN OUT**) 및 **FMU PWM OUT** (** AUX **)에 연결됩니다. ) 포트는 [기체 정의서](../airframes/airframe_reference.md)에서 순서가 지정되어 있습니다.

:::note
이 참고사항은 모든 지원되는 기체 프레임의 출력 포트의 모터/서보 연결 리스트입니다 (만약 프레임이 참고사항에 기재되어 있지 않다면, 올바른 유형의 "일반" 프레임을 사용하십시오).
:::

:::warning
The mapping is not consistent across frames (e.g. you can't rely on the throttle being on the same output for all plane frames). 해당 기체의 프레임의  정확한 모터 연결 여부를 확인하십시오.
:::



## 기타 주변 장치

많이 사용하지 않는 부품들의 배선과 조립 방법은 개별 [주변 장치](../peripherals/README.md)를 참고하십시오.



## 핀배열

![Pixhawk 5X Pinout1](../../assets/flight_controller/pixhawk5x/pixhawk5x_pinout.png)

You can also download *Pixhawk 5X* pinouts from [here](https://github.com/PX4/PX4-user_guide/blob/v1.14/assets/flight_controller/pixhawk5x/pixhawk5x_pinout.pdf) or [here](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Holybro_Pixhawk5X_Pinout.pdf).



## 설정

더 자세한 일반 설정 방법은 [자동항법장치 설정](../config/README.md)을 참고하십시오.

QuadPlane에 대한 자세한 설정 방법은 [QuadPlane VTOL 설정](../config_vtol/vtol_quad_configuration.md)을 참고하십시오.

<!-- Nice to have detailed wiring infographic and instructions for different vehicle types. -->

## 추가 정보

- [Pixhawk 5X](../flight_controller/pixhawk5x.md) (PX4 개요 페이지)
- [Pixhawk 5X Overview & Specification](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Holybro_Pixhawk5X_Spec_Overview.pdf) (Holybro)
- [Pixhawk 5X Pinouts](https://cdn.shopify.com/s/files/1/0604/5905/7341/files/Holybro_Pixhawk5X_Pinout.pdf) (Holybro)
- [FMUv5 참조 설계 핀배열](https://docs.google.com/spreadsheets/d/1Su7u8PHp-Y1AlLGVuH_I8ewkEEXt_bHHYBHglRuVH7E/edit#gid=562580340).
- [Pixhawk Autopilot FMUv5X 표준](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-011%20Pixhawk%20Autopilot%20v5X%20Standard.pdf).
- [Pixhawk Autopilot FMUv5X 버스 표준](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-010%20Pixhawk%20Autopilot%20Bus%20Standard.pdf).
- [Pixhawk 커넥터 표준](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf).
