# 픽스32 v5 배선 빠른 시작

:::warning PX4에서는 이런 종류의 자동 항법 장치를 제조하지는 않습니다. 하드웨어 지원 또는 호환 문제는 [제조사](https://shop.holybro.com/)와 상담하십시오.
:::

이 퀵 스타트 설명서는 [ Holybro Pix32v5 ](../flight_controller/holybro_pix32_v5.md)<sup>&reg;</sup> 비행 컨트롤러에 전원을 공급하고 가장 중요한 주변 장치를 연결하는 방법을 설명합니다.

![Pix32 v5 With Base](../../assets/flight_controller/holybro_pix32_v5/IMG_3165.jpg)

## 포장 개봉

Pix32 v5는 * pix32 v5 베이스 보드 *, 전원 모듈 * PM02 V3 * 및 [ Pixhawk 4 GPS / Compass를 포함하여 다양한 액세서리 조합과 함께 번들로 판매됩니다. ](https://shop.holybro.com/pixhawk-4-gps-module_p1094.html) (UBLOX NEO-M8N).

* PM02 V3 * 전원 모듈 및 * Pixhawk 4 GPS / Compass *가있는 상자의 내용물은 다음과 같습니다. 상자에는 핀 배치 가이드 및 전원 모듈 지침과 베이스 보드 (아래 회로도에는 표시되지 않음)도 포함되어 있습니다.

![Pix32 v5 Box](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_unboxing_schematics.png)

## 배선 개요

아래의 이미지는 중요한 센서 및 주변 장치 (모터 및 서보 출력 제외)를 연결법을 나타냅니다. 다음 섹션에서 각각의 장치에 대해 자세히 설명합니다.

![Pix32 v5 Wiring Overview](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_wiring_overview.jpg)

:::tip
사용 가능한 포트에 대한 자세한 내용은 [여기](http://www.holybro.com/manual/Holybro_PIX32-V5_PINOUTS_V1.1.pdf)에서 찾을 수 있습니다.
:::

## 콘트롤러 장착 및 장착 방향

*Pix32 v5*은 차량의 무게 중심에 최대한 가깝게 배치 된 프레임에 장착해야하며 화살표가 차량의 앞쪽과 위쪽을 향하도록 하여야 합니다.

![Pix32 v5 With Orientation](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_orientation.png)

:::note
컨트롤러를 권장/기본 방향으로 장착 할 수 없는 경우 (예 : 공간 제약으로 인해) 실제로 사용한 방향으로 자동 조종 소프트웨어를 구성해야합니다 : [ Flight Controller Orientation ](../config/flight_controller_orientation.md).
:::

:::tip
보드에는 내부 진동 차단 기능이 있습니다. 컨트롤러를 장착시 진동 차단 스티로폼을 사용하지 마십시오 (일반적으로 양면 테이프로 충분 함).
:::

## GPS + 나침반 + 부저 + 안전 스위치 + LED

Pix32 v5은 나침반, 안전 스위치, 부저 및 LED가 통합된 [Pixhawk 4 GPS 모듈](https://shop.holybro.com/pixhawk-4-gps-module_p1094.html)에 최적화되도록 설계되었습니다. 10 핀 케이블을 사용하여 [GPS 포트](../flight_controller/holybro_pix32_v5.md#gps)에 직접 연결합니다.

GPS/나침반은 차량 전명 방향 표시를 사용하여 가능한 한 다른 전자 장치에서 멀리 떨어진 프레임에 장착해야합니다 (나침반을 다른 전자 장치와 분리하면 간섭이 줄어듦).

![Pix32 v5 with GPS](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_connection_gps_compass.jpg)

:::note GPS
모듈의 통합 안전 스위치는 *기본적으로* 활성화되어 있습니다 (활성화되면 PX4는 차량 시동을 걸 수 없습니다). 비활성화하려면 안전 스위치를 1초간 길게 누르십시오. 안전 스위치를 다시 눌러 안전 장치를 활성화하고 기체 시동을 끌 수 있습니다 (어떤 이유로든 조종기나 지상국 프로그램이 기체 시동을 끌 수 없을 때 유용합니다).
:::

## 전원

전원 모듈 또는 배전 보드를 사용하여 모터/서보에 전원을 공급하고 전력 소비를 측정 할 수 있습니다. 권장되는 전원 모듈은 다음과 같습니다.

<span id="pm02_v3"></span>
### PM02 v3 전원 모듈

[ 전원 모듈 (PM02 v3) ](https://shop.holybro.com/power-modulepm02-v3_p1185.html)은 * pix32 v5*과 함께 번들로 제공 될 수 있습니다. It provides regulated power to flight controller and sends battery voltage/current to the flight controller.

그림과 같이 * 전원 모듈 *의 출력을 연결합니다.

![Pix32 v5 With Power Module](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_connection_power.jpg)

- PM voltage/current port: connect to POWER1 port (or `POWER2`) using the 6-wire GH cable supplied.
- PM input (XT60 male connector): connect to the LiPo battery (2~12S).
- PM power output (XT60 female connector): wire out to any motor ESCs.

:::note
As this power module does not include power distribution wiring, you would normally just connect all the ESCs in parallel to the power module output (the ESC must be appropriate for the supplied voltage level).
:::

:::note
The 8 pin power (+) rail of **MAIN/AUX** is not powered by the power module supply to the flight controller. If it will need to be separately powered in order to drive servos for rudders, elevons etc., the power rail needs to be connected to a BEC equipped ESC or a standalone 5V BEC or a 2S LiPo battery. Ensure the voltage of servo you are going to use is appropriate.
:::

The power module has the following characteristics/limits:
- Max input voltage: 60V
- Max current sensing: 120A Voltage
- Current measurement configured for SV ADC Switching regulator outputs 5.2V and 3A max
- Weight: 20g
- Package includes:
  - PM02 board
  - 6pin MLX cable (1)
  - 6pin GH cable (1)

:::note
See also [PM02v3 Power Module Manual](http://www.holybro.com/manual/Holybro_PM02_v3_PowerModule_Manual.pdf) (Holybro).
:::

### Battery Configuration

The battery/power setup must be configured in [Power Settings](../config/battery.md). For either Power Module you will need to configure the *Number of Cells*.

You will not need to update the *voltage divider* unless you are using some other power module (e.g. the one from the Pixracer).

## Radio Control

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers to *Pix32 v5* with Baseboard:

- Spektrum/DSM receivers connect to the [DSM RC](../flight_controller/holybro_pix32_v5.md#dsm-rc-port) input.

  ![Pix32v5 rc receivers](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_receivers_connection.jpg)

- PPM and S.Bus receivers connect to the [SBUS_IN/PPM_IN](../flight_controller/holybro_pix32_v5.md#rc-in) input port (marked as RC IN)

  ![Pinouts](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_pinouts_back_label.png)


- PPM and PWM receivers that have an *individual wire for each channel* must connect to the **PPM RC** port *via a PPM encoder* [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

For more information about selecting a radio system, receiver compatibility, and binding your transmitter/receiver pair, see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).


## Telemetry Radios (Optional)

Telemetry radios may be used to communicate and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The vehicle-based radio should be connected to the **TELEM1** port as shown below (if connected to this port, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually by USB).

![Pix32 v5 With Telemetry Radios](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_telemetry_radio.jpg)

## SD Card (Optional)

SD cards are most commonly used to [log and analyse flight details](../getting_started/flight_reporting.md). A micro SD card should come preinstalled on the pix32 v5, if you have your own micro SD card, insert the card into *pix32 v5* as shown below.

![Pix32 v5 With SD Card](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_sd_card.jpg)

:::tip
The SanDisk Extreme U3 32GB is [highly recommended](../dev_log/logging.md#sd-cards).
:::

## Motors

Motors/servos control signals are connected to the **I/O PWM OUT** (**MAIN**) and **FMU PWM OUT** (**AUX**) ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md).

  ![Pix32 v5 - Back Pinouts (Schematic)](../../assets/flight_controller/holybro_pix32_v5/pix32_v5_pinouts_back_label.png)

The motors must be separately [powered](#power).

:::note
If your frame is not listed in the airframe reference then use a "generic" airframe of the correct type.
:::

## Other Peripherals

The wiring and configuration of optional/less common components is covered within the topics for individual [peripherals](../peripherals/README.md).

## Pinouts

[Pix32 v5 Pinouts](http://www.holybro.com/manual/Holybro_PIX32-V5_PINOUTS_V1.1.pdf) (Holybro)

## Configuration

General configuration information is covered in: [Autopilot Configuration](../config/README.md).

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)

<!-- Nice to have detailed wiring infographic and instructions for different vehicle types. --> 

## Further information

- [Pix32 v5 Overview](../flight_controller/holybro_pix32_v5.md) (Overview page)
- [Pix32 v5 Technical Data Sheet](http://www.holybro.com/manual/Holybro_PIX32-V5_technical_data_sheet_v1.1.pdf)
- [Pix32 v5 Pinouts](http://www.holybro.com/manual/Holybro_PIX32-V5_PINOUTS_V1.1.pdf)
- [Pix32 v5 Base Schematic Diagram](http://www.holybro.com/manual/Holybro_PIX32-V5-BASE-Schematic_diagram.pdf)
- [Pix32 v5 Base Components Layout](http://www.holybro.com/manual/Holybro_PIX32-V5-BASE-ComponentsLayout.pdf)
- [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).
