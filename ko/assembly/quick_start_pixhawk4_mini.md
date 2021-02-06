# Pixhawk 4 Mini 배선 퀵스타트

:::warning PX4에서는 이런 종류의 자동 항법 장치를 제조하지는 않습니다. 하드웨어 지원 또는 호환 문제는 [제조사](https://shop.holybro.com/)와 상담하십시오.
:::

이 설명서는 [*Pixhawk 4<sup>&reg;</sup> Mini*](../flight_controller/pixhawk4_mini.md) 비행 컨트롤러의 전원을 공급방법과 주변 장치를 연결하는 방법을 설명합니다.

![Pixhawk4 mini](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_iso_1.png)

## 배선 개요

아래의 이미지는 가장 중요한 센서 및 주변 장치 (모터 및 서보 출력 제외)를 연결하는 방법을 나타냅니다.

![*Pixhawk 4 Mini* Wiring Overview](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_wiring_overview.png)

:::tip
사용 가능한 포트에 대한 자세한 내용은 [*Pixhawk 4 Mini * > 인터페이스](../flight_controller/pixhawk4_mini.md#interfaces)에서 찾을 수 있습니다.
:::

## 콘트롤러 장착 및 장착 방향

*Pixhawk 4 Mini*는 진동 방지 폼 패드(키트에 포함)를 프레임에 장착해야 합니다. 차량의 무게 중심에 최대한 가깝게 배치 된 프레임에 장착해야하며 화살표가 차량의 앞쪽과 위쪽을 향하도록 하여야 합니다.

![*Pixhawk 4 Mini* Orientation](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_orientation.png)

:::note
컨트롤러를 권장/기본 방향으로 장착하기 어려운 경우에는 (예 : 공간 제약으로 인해) 실제 장착한 방향을 소프트웨어에 설정하여야 합니다 ( [기체 콘트롤러 방향 ](../config/flight_controller_orientation.md) 참고).
:::

## GPS + 나침반 + 부저 + 안전 스위치 + LED

나침반, 안전 스위치, 부저 및 LED 통합 GPS를 **GPS MODULE** 포트에 연결합니다. GPS/나침반은 차량 전명 방향 표시를 사용하여 가능한 한 다른 전자 장치에서 멀리 떨어진 프레임에 장착해야합니다 (나침반을 다른 전자 장치와 분리하면 간섭이 줄어듦).

![Connect compass/GPS to Pixhawk 4](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_gps.png)

:::note GPS
모듈의 통합 안전 스위치는 *기본적으로* 활성화되어 있습니다 (활성화되면 PX4는 차량 시동을 걸 수 없습니다). 비활성화하려면 안전 스위치를 1초간 길게 누르십시오. 안전 스위치를 다시 눌러 안전 장치를 활성화하고 기체 시동을 끌 수 있습니다 (어떤 이유로든 조종기나 지상국 프로그램이 기체 시동을 끌 수 없을 때 유용합니다).
:::

## 전원

PMB (Power Management Board)는 배전 보드뿐만 아니라 전원 모듈의 용도로 사용됩니다. *Pixhawk 4 Mini* 및 ESC에 조정 된 전력을 제공하는 것 외에도 배터리의 전압 및 전류 소모에 대한 정보를 자동 조종 장치로 보냅니다.

6 선 케이블을 사용하여 키트와 함께 제공되는 PMB의 출력을 *Pixhawk 4 Mini*의 **POWER** 포트에 연결합니다. ESC 및 서보에 대한 전원 공급 및 신호 연결을 포함한 전원 관리 보드의 연결 방법은 아래의 이미지에 설명되어 있습니다.

![Pixhawk 4 - Power Management Board](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_power_management.png)

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

| 핀        | 신호      | Volt  |
| -------- | ------- | ----- |
| 1(red)   | VCC     | +5V   |
| 2(black) | VCC     | +5V   |
| 3(black) | CURRENT | +3.3V |
| 4(black) | VOLTAGE | +3.3V |
| 5(black) | GND     | GND   |
| 6(black) | GND     | GND   |


:::note
If using a plane or rover, the 8 pin power (+) rail of **MAIN OUT** will need to be separately powered in order to drive servos for rudders, elevons, etc. To do this, the power rail needs to be connected to a BEC equipped ESC, a standalone 5V BEC, or a 2S LiPo battery. Be careful with the voltage of servo you are going to use here.
:::

<!--In the future, when Pixhawk 4 kit is available, add wiring images/videos for different airframes.-->

:::note
Using the Power Module that comes with the kit you will need to configure the *Number of Cells* in the [Power Settings](https://docs.qgroundcontrol.com/en/SetupView/Power.html) but you won't need to calibrate the *voltage divider*. You will have to update the *voltage divider* if you are using any other power module (e.g. the one from the Pixracer).
:::

## Radio Control

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers to *Pixhawk 4 Mini*:

- Spektrum/DSM or S.BUS receivers connect to the **DSM/SBUS RC** input.
    
    ![Pixhawk 4 Mini - Radio port for Spektrum receivers](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_rc_dsmsbus.png)

- PPM receivers connect to the **PPM RC** input port.
    
    ![Pixhawk 4 Mini - Radio port for PPM receivers](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_rc_ppm.png)

- PPM and PWM receivers that have an *individual wire for each channel* must connect to the **PPM RC** port *via a PPM encoder* [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

For more information about selecting a radio system, receiver compatibility, and binding your transmitter/receiver pair, see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).

## Telemetry Radio (Optional)

Telemetry radios may be used to communicate and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The vehicle-based radio should be connected to the **TELEM1** port as shown below (if connected to this port, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually by USB).

![Pixhawk 4 Mini Telemetry](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_telemetry.png)

## microSD Card (Optional)

SD cards are highly recommended as they are needed to [log and analyse flight details](../getting_started/flight_reporting.md), to run missions, and to use UAVCAN-bus hardware. Insert the card (included in the kit) into *Pixhawk 4 Mini* as shown below.

![Pixhawk 4 Mini SD Card](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_sdcard.png)

:::tip
For more information see [Basic Concepts > SD Cards (Removable Memory)](../getting_started/px4_basic_concepts.md#sd_cards).
:::

## Motors

Motors/servos are connected to the **MAIN OUT** ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md). See [*Pixhawk 4 Mini* > Supported Platforms](../flight_controller/pixhawk4_mini.md#supported-platforms) for more information.

:::note
This reference lists the output port to motor/servo mapping for all supported air and ground frames (if your frame is not listed in the reference then use a "generic" airframe of the correct type).
:::

:::caution
The mapping is not consistent across frames (e.g. you can't rely on the throttle being on the same output for all plane frames). Make sure to use the correct mapping for your vehicle.
:::

## Other Peripherals

The wiring and configuration of optional/less common components is covered within the topics for individual [peripherals](../peripherals/README.md).

## Configuration

General configuration information is covered in: [Autopilot Configuration](../config/README.md).

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)

<!-- Nice to have detailed wiring infographic and instructions for different vehicle types. -->

## Further information

- [*Pixhawk 4 Mini*](../flight_controller/pixhawk4_mini.md)