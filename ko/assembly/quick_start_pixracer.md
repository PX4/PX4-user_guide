# Pixracer 배선 퀵 스타트

> **Warning** PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://store.mrobotics.io/) for hardware support or compliance issues.

<span></span>

> **Warning** Under construction.

This quick start guide shows how to power the [Pixracer](../flight_controller/pixracer.md) flight controller and connect its most important peripherals.

<img src="../../assets/flight_controller/pixracer/pixracer_hero_grey.jpg" width="300px" title="pixracer + 8266 grey" />

## 배선 설명서

![Grau pixracer double](../../assets/flight_controller/pixracer/grau_pixracer_double.jpg)

### 기본 설정

![Grau setup pixracer top](../../assets/flight_controller/pixracer/grau_setup_pixracer_top.jpg)

![Grau setup pixracer bottom](../../assets/flight_controller/pixracer/grau_setup_pixracer_bottom.jpg)

### 무선/원격 컨트롤

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers:

- FrSky 수신기는 표시된 포트를 통해 연결되며 제공된 I/O 커넥터를 사용할 수 있습니다.
    
    ![Grau b Pixracer FrSkyS.Port 연결](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)
    
    ![Pixracer FrSkyS.Port 연결](../../assets/flight_controller/pixracer/pixracer_FrSkyTelemetry.jpg)

- PPM-SUM과 S.버스 수신기는 **RCIN** 포트에 연결합니다.
    
    ![무선 연결](../../assets/flight_controller/pixracer/grau_setup_pixracer_radio.jpg)

- *각각의 채널이 독립적으로 배선된* PPM/PWM 수신기는 반드시 **RCIN**포트에 *PPM 인코더를 통해* [아래와 같이](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)연결해야 합니다 (PPM-Sum 수신기는 모든 채널에 하나의 전선만 사용합니다).

### 전원 모듈 (ACSP4)

![Grau ACSP4 2 roh](../../assets/flight_controller/pixracer/grau_acsp4_2_roh.jpg)