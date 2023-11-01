# Pixracer 배선 개요

:::warning PX4에서는 이 자동 항법 장치를 제조하지 않습니다. 하드웨어 지원이나 호환 문제는 [제조사](https://store.mrobotics.io/)에 문의하십시오.
:::

:::warning
작성 중인 문서입니다
:::

[Pixracer](../flight_controller/pixracer.md) 비행 콘트롤러 전원 공급방법과 주변 장치 연결방법을 설명합니다.

<img src="../../assets/flight_controller/pixracer/pixracer_hero_grey.jpg" width="300px" title="pixracer + 8266 회색" />

## 무선 가이드/조립 방법

![Grau pixracer double](../../assets/flight_controller/pixracer/grau_pixracer_double.jpg)

### 기본 설정

![Grau setup pixracer 상단](../../assets/flight_controller/pixracer/grau_setup_pixracer_top.jpg)

![Grau setup pixracer 하단](../../assets/flight_controller/pixracer/grau_setup_pixracer_bottom.jpg)

### Radio/Remote Control

A remote control (RC) radio system is required if you want to _manually_ control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then _bind_ them so that they communicate (read the instructions that come with your specific transmitter/receiver).

아래의 지침은 다양한 유형의 수신기를 연결하는 방법을 설명합니다:

- FrSky 수신기는 표시된 포트를 통해 연결되며 제공된 I/O 커넥터를 사용할 수 있습니다.

  ![Grau b Pixracer FrSkyS.Port 연결](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)

  ![Pixracer FrSkyS.Port 연결](../../assets/flight_controller/pixracer/pixracer_FrSkyTelemetry.jpg)

- PPM-SUM과 S.버스 수신기는 **RCIN** 포트에 연결합니다.

  ![무선 연결](../../assets/flight_controller/pixracer/grau_setup_pixracer_radio.jpg)

- PPM and PWM receivers that have an _individual wire for each channel_ must connect to the **RCIN** port _via a PPM encoder_ [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

### 전원 모듈 (ACSP4)

![Grau ACSP4 2 roh](../../assets/flight_controller/pixracer/grau_acsp4_2_roh.jpg)

### 외부 텔레메트리

Pixracer에는 WiFi가 내장되어 있지만 `TELEM1` 또는 `TELEM2` 포트에 연결된 외부 Wi-Fi 또는 텔레메트리를 통한 원격 측정도 지원합니다. 무선 다이어그램은 아래의 그림과 같습니다.

![Pixracer external telemtry options](../../assets/flight_controller/pixracer/pixracer_top_telemetry.jpg)

:::note
`TELEM2` 포트는 [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG) 매개변수를 사용하여 두 번째 MAVLink로 구성하여야 합니다. :::note `TELEM2` 포트는 [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG) 매개변수를 사용하여 두 번째 MAVLink로 구성하여야 합니다.
:::
