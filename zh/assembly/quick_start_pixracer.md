# Pixracer接线指南

> **Warning**

这个快速指南会告诉你如何给[Pixracer](../flight_controller/pixracer.md)飞控供电和连接跟它配合的组件。

<img src="../../assets/flight_controller/pixracer/pixracer_hero_grey.jpg" width="300px" title="pixracer + 8266 grey" />

## 接线指南

![Grau pixracer double](../../assets/flight_controller/pixracer/grau_pixracer_double.jpg)

### 主要设置

![Grau setup pixracer top](../../assets/flight_controller/pixracer/grau_setup_pixracer_top.jpg)

![Grau setup pixracer bottom](../../assets/flight_controller/pixracer/grau_setup_pixracer_bottom.jpg)

### 电台/远程 控制

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers:

- FrSky receivers connect via the port shown, and can use the provided I/O Connector.
    
    ![Grau b Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)
    
    ![Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/pixracer_FrSkyTelemetry.png)

- PPM-SUM and S.BUS receivers connect to the **RCIN** port.
    
    ![Radio Connection](../../assets/flight_controller/pixracer/grau_setup_pixracer_radio.jpg)

- PPM and PWM receivers that have an *individual wire for each channel* must connect to the **RCIN** port *via a PPM encoder* [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

### Power Module (ACSP4)

![Grau ACSP4 2 roh](../../assets/flight_controller/pixracer/grau_acsp4_2_roh.jpg)