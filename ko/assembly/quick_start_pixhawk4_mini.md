---
canonicalUrl: https://docs.px4.io/main/ko/assembly/quick_start_pixhawk4_mini
---

# Pixhawk 4 Mini 배선 퀵스타트

:::warning PX4에서는 이 자동 항법 장치를 제조하지 않습니다. Contact the [manufacturer](https://holybro.com/) for hardware support or compliance issues.
:::

[*Pixhawk 4<sup>&reg;</sup> Mini*](../flight_controller/pixhawk4_mini.md) 비행 콘트롤러 전원공급 방법과 주변장치 연결 방법을 설명합니다.

![Pixhawk 4 mini](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_iso_1.png)

## 배선 개요

아래의 이미지는 주요 센서와 주변 장치(모터 및 서보 출력 제외)의 연결 방법을 설명합니다.

![*Pixhawk 4 Mini* 배선 개요](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_wiring_overview.png)

:::tip
포트에 대한 자세한 내용은 [*Pixhawk 4 Mini * &gt; 인터페이스](../flight_controller/pixhawk4_mini.md#interfaces)를 참고하십시오.
:::

## 콘트롤러 장착 및 장착 방향

*Pixhawk 4 Mini*는 키트에 포함된 진동 방지 패드를 프레임에 장착하여야 합니다. 차량의 무게 중심에 최대한 가깝운 프레임에 장착하여야 하며, 화살표가 차량의 앞쪽과 위쪽을 향하도록 하여야 합니다.

![*Pixhawk 4 Mini* 방향](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_orientation.png)

:::note
If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).
:::

## GPS + 나침반 + 부저 + 안전 스위치 + LED

나침반, 안전 스위치, 부저 및 LED 통합 GPS를 **GPS MODULE** 포트에 연결합니다. The GPS/Compass should be [mounted on the frame](../assembly/mount_gps_compass.md) as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

![Pixhawk 4에 나침반/GPS 연결](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_gps.png)

:::note GPS
모듈의 통합 안전 스위치는 *기본적으로* 활성화됩니다. 활성화된 상태에서 PX4의 차량 시동이 가능합니다. 안전 스위치를 1초간 길게 누르면 비활성화됩니다. 안전 스위치를 다시 눌러 안전 장치를 활성화하고 기체 시동을 끌 수 있습니다. 조종기나 지상국 프로그램에서 기체 시동을 끌 수 없는 상황에서 유용합니다.
:::


## 전원

PMB(Power Management Board)는 배전 보드와 전원 모듈로 사용됩니다. *Pixhawk 4 Mini* 및 ESC에 조정 전력을 제공하고, 배터리의 전압과 전류 정보를 자동조종장치에 전송합니다.

6선 케이블을 사용하여 키트에 제공된 PMB의 출력을 *Pixhawk 4 Mini*의 **POWER** 포트에 연결합니다. ESC와 서보에 대한 전원 공급 및 신호 연결을 위한 전원관리보드의 연결 방법은 아래의 표에서 설명합니다.

![Pixhawk 4 - 전원 관리 보드](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_power_management.png)

:::note
위의 이미지는 단일 ESC와 단일 서보의 연결만을 나타냅니다.
나머지 ESC와 서보를 비슷하게 연결합니다.
:::

| 핀 또는 커넥터 | 기능                           |
| -------- | ---------------------------- |
| B+       | ESC에 전원을 공급하기 위해 ESC B +에 연결 |
| GND      | ESC 접지에 연결                   |
| PWR      | JST-GH 6 핀 커넥터, 5V 3A 출력     |
| BAT      | 전원 입력, 2 ~ 12S LiPo 배터리에 연결  |

*Pixhawk 4 Mini* **POWER** 포트의 핀배열은 아래와 같습니다. 전류 신호는 기본적으로 0~120A에 대하여 0~3.3V의 아날로그 전압을 제공하여야 합니다. 전압 신호는 기본적으로 0~60V에 대하여 0~3.3V의 아날로그 전압을 제공하여야 합니다. VCC 라인은 최소 3A 연속을 제공해야하며, 기본적으로 5.1V로 설정되어야 합니다. 5V 보다 낮은 전압은 권장되지 않습니다.

| 핀        | 신호      | 전압    |
| -------- | ------- | ----- |
| 1(red)   | VCC     | +5V   |
| 2(black) | VCC     | +5V   |
| 3(black) | CURRENT | +3.3V |
| 4(black) | VOLTAGE | +3.3V |
| 5(black) | GND     | 접지    |
| 6(black) | GND     | 접지    |

:::note
고정익 또는 자동차로 사용하는 경우 **MAIN-OUT**의 8 핀 전원 (+) 레일에 러더, 엘레 본 등의 서보를 구동을 위한 별도의 전원을 공급하여야 합니다. 전원 레일을 BEC가 장착된 ESC 또는 독립형 5V BEC 또는 2S LiPo 배터리에 연결하여야 합니다. 서보에 제공되는 전압이 적절한 지 체크하십시오.
:::

<!--In the future, when Pixhawk 4 kit is available, add wiring images/videos for different airframes.-->

:::note
Using the Power Module that comes with the kit you will need to configure the *Number of Cells* in the [Power Settings](https://docs.qgroundcontrol.com/master/en/SetupView/Power.html) but you won't need to calibrate the *voltage divider*. 다른 전원모듈(예 : Pixracer의 모듈)을 사용하는 경우에는 *전압 분배기*를 업데이트하여야 합니다.
:::

## Radio Control

무선 조종기(RC)는 기체를 *수동*으로 조작합니다. PX4 자율 비행 모드에는 RC는 필수 요구 사항은 아닙니다.

[호환되는 송신기/수신기를 선택](../getting_started/rc_transmitter_receiver.md)후 *바인딩*을 하여야 통신이 가능합니다. 송신기/수신기의 매뉴얼을 참고하십시오.

아래 지침은 여러 종류의 수신기를 *Pixhawk 4 Mini*에 연결한는 방법을 설명합니다.

- Spektrum/DSM 수신기는 **DSM/SBUS RC** 입력에 연결합니다.

  ![Pixhawk 4 Mini - Spektrum 수신기용 라디오 포트](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_rc_dsmsbus.png)

- PPM 수신기는 **PPM RC** 입력 포트에 연결합니다.

  ![Pixhawk 4 Mini - PPM 수신기용 라디오 포트](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_rc_ppm.png)

- *각각의 채널이 독립적으로 배선된* PPM/PWM 수신기는 반드시 **PPM RC**포트에 *PPM 인코더를 통해* [아래와 같이](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)연결합니다. PPM-Sum 수신기는 모든 채널에 하나의 케이블만 사용합니다.

For more information about selecting a radio system, receiver compatibility, and binding your transmitter/receiver pair, see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).


## Telemetry Radio (Optional)

무선 텔레메트리는 지상국 프로그램의 비행 차량 통신 제어용입니다(예 : UAV를 특정 위치로 지시하거나 새 임무를 업로드 할 수 있음).

기체의 텔레메트리를 **TELEM1** 포트에 연결합니다. 이 포트에 연결된 경우에는 추가 설정이 필요하지 않습니다. 다른 텔레메트리는 일반적으로 지상국 컴퓨터나 모바일 장치에 USB를 통하여 연결됩니다.

![Pixhawk 4 Mini - 텔레메트리](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_telemetry.png)

## micro SD 카드 (선택 사항)

SD 카드는 [비행 세부 정보를 기록 및 분석](../getting_started/flight_reporting.md)하고, 임무를 수행하고, UAVCAN 버스 하드웨어를 사용하는 데 필요하므로 가능하면 사용하는 것이 좋습니다. 아래 그림과 같이 카드(키트에 포함됨)를 *Pixhawk 4 Mini*에 삽입합니다.

![Pixhawk 4 Mini - SD 카드](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_sdcard.png)

:::tip
For more information see [Basic Concepts > SD Cards (Removable Memory)](../getting_started/px4_basic_concepts.md#sd-cards-removable-memory).
:::

## 모터

모터와 서보는 **MAIN**과 **AUX**포트에 [기체 정의서](../airframes/airframe_reference.md)에 정의된 순서대로 연결합니다. 자세한 내용은 [*Pixhawk 4 Mini* > 지원되는 플랫폼 ](../flight_controller/pixhawk4_mini.md#supported-platforms)을 참고하십시오.

:::note
이 참고사항은 모든 지원되는 기체 프레임의 출력 포트의 모터/서보 연결 리스트입니다 (만약 프레임이 참고사항에 기재되어 있지 않다면, 올바른 유형의 "일반" 프레임을 사용하십시오).
:::

:::warning
The mapping is not consistent across frames (e.g. you can't rely on the throttle being on the same output for all plane frames).
해당 기체의 프레임의  정확한 모터 연결 여부를 확인하십시오.
:::

## 기타 주변 장치

많이 사용하지 않는 부품들의 배선과 조립 방법은 개별 [주변 장치](../peripherals/README.md)를 참고하십시오.


## 설정

더 자세한 일반 설정 방법은 [자동항법장치 설정](../config/README.md)을 참고하십시오.

QuadPlane에 대한 자세한 설정은 [QuadPlane VTOL 설정](../config_vtol/vtol_quad_configuration.md)을 참고하십시오.

<!-- Nice to have detailed wiring infographic and instructions for different vehicle types. --> 

## 추가 정보
- [*Pixhawk 4 Mini*](../flight_controller/pixhawk4_mini.md)
