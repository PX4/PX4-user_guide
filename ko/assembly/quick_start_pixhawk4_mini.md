---
canonicalUrl: https://docs.px4.io/main/ko/assembly/quick_start_pixhawk4_mini
---

# Pixhawk 4 Mini 배선 퀵스타트

:::warning PX4에서는 이런 종류의 자동 항법 장치를 제조하지는 않습니다. 하드웨어 지원 또는 호환 문제는 [제조사](https://shop.holybro.com/)와 상담하십시오.
:::

이 설명서는 [*Pixhawk 4<sup>&reg;</sup> Mini*](../flight_controller/pixhawk4_mini.md) 비행 컨트롤러의 전원을 공급방법과 주변 장치를 연결하는 방법을 설명합니다.

![Pixhawk 4 mini](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_iso_1.png)

## 배선 개요

아래의 이미지는 가장 중요한 센서 및 주변 장치 (모터 및 서보 출력 제외)를 연결하는 방법을 나타냅니다.

![*Pixhawk 4 Mini* 배선 개요](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_wiring_overview.png)

:::tip
사용 가능한 포트에 대한 자세한 내용은 [*Pixhawk 4 Mini * > 인터페이스](../flight_controller/pixhawk4_mini.md#interfaces)에서 찾을 수 있습니다.
:::

## 콘트롤러 장착 및 장착 방향

*Pixhawk 4 Mini*는 진동 방지 폼 패드(키트에 포함)를 프레임에 장착해야 합니다. 차량의 무게 중심에 최대한 가깝게 배치 된 프레임에 장착해야하며 화살표가 차량의 앞쪽과 위쪽을 향하도록 하여야 합니다.

![*Pixhawk 4 Mini* 방향](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_orientation.png)

:::note
컨트롤러를 권장/기본 방향으로 장착하기 어려운 경우에는 (예 : 공간 제약으로 인해) 실제 장착한 방향을 소프트웨어에 설정하여야 합니다 ( [기체 콘트롤러 방향 ](../config/flight_controller_orientation.md) 참고).
:::

## GPS + 나침반 + 부저 + 안전 스위치 + LED

나침반, 안전 스위치, 부저 및 LED 통합 GPS를 **GPS MODULE** 포트에 연결합니다. GPS/나침반은 차량 전명 방향 표시를 사용하여 가능한 한 다른 전자 장치에서 멀리 떨어진 프레임에 장착해야합니다 (나침반을 다른 전자 장치와 분리하면 간섭이 줄어듦).

![Pixhawk 4에 나침반/GPS 연결](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_gps.png)

:::note GPS
모듈의 통합 안전 스위치는 *기본적으로* 활성화되어 있습니다 (활성화되면 PX4는 차량 시동을 걸 수 없습니다). 비활성화하려면 안전 스위치를 1초간 길게 누르십시오. 안전 스위치를 다시 눌러 안전 장치를 활성화하고 기체 시동을 끌 수 있습니다 (어떤 이유로든 조종기나 지상국 프로그램이 기체 시동을 끌 수 없을 때 유용합니다).
:::

## 전원

PMB (Power Management Board)는 배전 보드뿐만 아니라 전원 모듈의 용도로 사용됩니다. *Pixhawk 4 Mini* 및 ESC에 조정 된 전력을 제공하는 것 외에도 배터리의 전압 및 전류 소모에 대한 정보를 자동 조종 장치로 보냅니다.

6 선 케이블을 사용하여 키트와 함께 제공되는 PMB의 출력을 *Pixhawk 4 Mini*의 **POWER** 포트에 연결합니다. ESC 및 서보에 대한 전원 공급 및 신호 연결을 포함한 전원 관리 보드의 연결 방법은 아래의 이미지에 설명되어 있습니다.

![Pixhawk 4 - 전원 관리 보드](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_power_management.png)

:::note
위의 이미지는 단일 ESC와 단일 서보의 연결만을 보여줍니다. 나머지 ESC와 서보를 비슷하게 연결합니다.
:::

| 핀 또는 커넥터 | 기능                                                        |
| -------- | --------------------------------------------------------- |
| B+       | ESC에 전원을 공급하기 위해 ESC B +에 연결                              |
| GND      | ESC 접지에 연결                                                |
| PWR      | JST-GH 6 핀 커넥터, 5V 3A 출력   
을 *Pixhawk 4 Min * 전원에 연결</0> |
| BAT      | 전원 입력, 2 ~ 12S LiPo 배터리에 연결                               |


*Pixhawk 4 Mini* **POWER** 포트의 핀아웃은 아래와 같습니다. 전류 신호는 기본적으로 0-120A에 대하여 0-3.3V의 아날로그 전압을 전달하여야 합니다. 전압 신호는 기본적으로 0-60V에 대하여 0-3.3V의 아날로그 전압을 전달하여야 합니다. VCC 라인은 최소 3A 연속을 제공해야하며 기본적으로 5.1V로 설정되어야 합니다. 5V 보다 낮은 전압은 허용되지만 권장되지는 않습니다.

| 핀        | 신호      | 전압    |
| -------- | ------- | ----- |
| 1(red)   | VCC     | +5V   |
| 2(black) | VCC     | +5V   |
| 3(black) | CURRENT | +3.3V |
| 4(black) | VOLTAGE | +3.3V |
| 5(black) | GND     | 접지    |
| 6(black) | GND     | 접지    |


:::note
고정익 또는 자동차로 사용하는 경우 **MAIN-OUT**의 8 핀 전원 (+) 레일에 러더, 엘레 본 등의 서보를 구동하려면 별도로 전원을 공급하여야 합니다. 전원 레일을 BEC가 장착 된 ESC 또는 독립형 5V BEC 또는 2S LiPo 배터리에 연결하여야 합니다. 서보 전압에 주의하십시오.
:::

<!--In the future, when Pixhawk 4 kit is available, add wiring images/videos for different airframes.-->

:::note
키트와 함께 제공되는 전원 모듈을 사용하면 [전원 설정](https://docs.qgroundcontrol.com/en/SetupView/Power.html)에서 *셀 수*를 구성해야하지만 *전압 분배기를 보정 할 필요가 없습니다. *. 다른 전원 모듈 (예 : Pixracer의 모듈)을 사용하는 경우 *전압 분배기*를 업데이트하여야 합니다.
:::

## 무선 조종

리모트 컨트롤(RC) 라디오 시스템은 기체를 *수동*으로 제어할 때 필요합니다 (PX4에는 자율 비행 모드를 위한 라디오 시스템이 필요하지 않습니다).

기체와 조종자가 서로 통신하기 위해 [호환되는 송신기/수신기를 선택하고](../getting_started/rc_transmitter_receiver.md), 송신기와 수신기를 *바인드*해야 합니다 (송신기와 수신기에 포함된 지시사항을 읽으십시오).

아래 지침은 다양한 유형의 수신기의 * Pixhawk 4 Mini* 연결법을 설명합니다.

- Spektrum/DSM 수신기는 **DSM/SBUS RC** 입력에 연결됩니다.
    
    ![Pixhawk 4 Mini - Spektrum 수신기용 라디오 포트](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_rc_dsmsbus.png)

- PPM 수신기는 **PPM RC** 입력 포트에 연결됩니다.
    
    ![Pixhawk 4 Mini - PPM 수신기용 라디오 포트](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_rc_ppm.png)

- *각각의 채널이 독립적으로 배선된* PPM/PWM 수신기는 반드시 **PPM RC**포트에 *PPM 인코더를 통해* [아래와 같이](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)연결해야 합니다 (PPM-Sum 수신기는 모든 채널에 하나의 전선만 사용합니다).

무선 시스템 선택, 수신기 호환성 및 송신기 / 수신기 쌍 바인딩에 대한 자세한 내용은 다음을 참조하십시오. [ 원격 제어 송신기 & amp; 수신자 ](../getting_started/rc_transmitter_receiver.md).

## 무선 텔레메트리(선택 사항)

무선 텔레메트리는 지상국 프로그램에서 비행중인 차량의 통신/제어에 사용할 수 있습니다 (예 : UAV를 특정 위치로 지시하거나 새 임무를 업로드 할 수 있음).

기체의 텔레메트리를 **TELEM1** 포트에 연결해야 합니다 (이 포트에 연결된 경우 추가 구성이 필요하지 않음). 다른 텔레메트리는 일반적으로 지상국 컴퓨터나 모바일 장치에 (USB를 통해) 연결됩니다.

![Pixhawk 4 Mini 텔레메트리](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_telemetry.png)

## micro SD 카드 (선택 사항)

SD 카드는 [비행 세부 정보를 기록 및 분석](../getting_started/flight_reporting.md)하고, 임무를 수행하고, UAVCAN 버스 하드웨어를 사용하는 데 필요하므로 가능하면 사용하는 것이 좋습니다. 아래 그림과 같이 카드(키트에 포함됨)를 *Pixhawk 4 Mini*에 삽입합니다.

![Pixhawk 4 Mini SD 카드](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_sdcard.png)

:::tip
자세한 내용은 [기본 개념> SD 카드 (휴대용 메모리)](../getting_started/px4_basic_concepts.md#sd_cards)를 참조하십시오.
:::

## 모터

모터/서보는 **MAIN**과 **AUX**포트에 [기체 프레임 정의](../airframes/airframe_reference.md)에 기체별로 정의된 순서대로 연결하여야 합니다. 자세한 내용은 [*Pixhawk 4 Mini* > 지원되는 플랫폼 ](../flight_controller/pixhawk4_mini.md#supported-platforms)을 참조하세요.

:::note
이 참고사항은 모든 지원되는 기체/기기 프레임의 출력 포트의 모터/서보 연결 리스트입니다 (만약 프레임이 참고사항에 기재되어 있지 않다면, 올바른 유형의 "일반" 프레임을 사용하십시오).
:::

:::caution
매핑이 프레임간에 일관 되지 않습니다 (예 : 모든 평면 프레임에 대해 동일한 출력에있는 스로틀에 의존 할 수 없음). 가지고 있는 기체의 프레임에 대해 올바르게 모터를 제대로 연결하였는지 다시 한 번 확인하십시오.
:::

## 기타 주변 장치

많이 사용하지 않는 옵션 부품들의 배선 및 조립법은 개별 [주변 장치](../peripherals/README.md)에서 설명합니다.

## 설정

더 자세한 일반 구성 정보는 [Autopilot 구성](../config/README.md)에서 다룹니다.

QuadPlane에 대한 자세한 설정은 [QuadPlane VTOL 설정](../config_vtol/vtol_quad_configuration.md)에서 다룹니다.

<!-- Nice to have detailed wiring infographic and instructions for different vehicle types. -->

## 추가 정보

- [*Pixhawk 4 Mini*](../flight_controller/pixhawk4_mini.md)