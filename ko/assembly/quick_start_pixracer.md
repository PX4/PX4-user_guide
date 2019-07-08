# Pixracer 배선 퀵 스타트

> **경고** 작성 중인 문서입니다.

이 빠른 시작 안내서에서는 [ Pixracer ](../flight_controller/pixracer.md) 비행 컨트롤러에 전원을 공급하고 가장 중요한 주변 장치를 연결하는 방법을 설명합니다.

<img src="../../assets/flight_controller/pixracer/pixracer_hero_grey.jpg" width="300px" title="픽사커 + 8266 회색" />

## 배선 가이드

![그라우 픽스크라커 더블](../../assets/flight_controller/pixracer/grau_pixracer_double.jpg)

### 기본 설정

![그래우 설정 픽사커 상단](../../assets/flight_controller/pixracer/grau_setup_pixracer_top.jpg)

![그래우 설정 픽사커 하단](../../assets/flight_controller/pixracer/grau_setup_pixracer_bottom.jpg)

### Radio/Remote Control

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

아래 지침은 다양한 유형의 수신기를 연결하는 방법을 보여 줍니다.

- FrSky 수신기는 표시된 포트를 통해 연결되며 제공된 I/O 커넥터를 사용할 수 있습니다.
    
    ![Grau b Pixracer FrSkyS.포트 연결](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)
    
    ![픽사커 프르스키스포트 연결](../../assets/flight_controller/pixracer/pixracer_FrSkyTelemetry.jpg)

- PPM-SUM과 S.버스 수신기는 **RCIN ** 포트에 연결합니다.
    
    ![무선 연결](../../assets/flight_controller/pixracer/grau_setup_pixracer_radio.jpg)

- 각 채널에 대해 "0"개의 개별 와이어가 있는 PPM 및 PWM 수신기는 이 PPM 인코더</em>를 통해 "1"RCIN </strong> 포트 *에 연결해야 합니다.</p></li> </ul> 
    
    ### 전원 모듈(ACSP4)
    
    ![그라우 ACSP4 2루](../../assets/flight_controller/pixracer/grau_acsp4_2_roh.jpg)