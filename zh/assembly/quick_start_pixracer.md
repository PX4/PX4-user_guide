---
canonicalUrl: https://docs.px4.io/main/zh/assembly/quick_start_pixracer
---

# Pixracer接线指南

:::warning PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://store.mrobotics.io/) for hardware support or compliance issues.
:::

:::warning
Under construction
:::

This quick start guide shows how to power the [Pixracer](../flight_controller/pixracer.md) flight controller and connect its most important peripherals.

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

- Frsky 的接收机通过所示的端口连接, 并可以使用提供的 I/o 连接器。
    
    ![Grau b Pixracer FrSkyS接口连接](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)
    
    ![Pixracer FrSkyS接口连接](../../assets/flight_controller/pixracer/pixracer_FrSkyTelemetry.jpg)

- PPM-SUM 和 S.BUS 接收机连接到 **RCIN** 端口。
    
    ![电台连接](../../assets/flight_controller/pixracer/grau_setup_pixracer_radio.jpg)

- PPM 接收机通过一个 *PPM 编码器*将*每一个通道通过一根线*连接到** RCIN** 通道上[如这个所示](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)（PPM-Sum 接收机所有通道可以只需要一根信号线）。

### 电源模块 (ASCP4)

![Grau ACSP4 2 roh](../../assets/flight_controller/pixracer/grau_acsp4_2_roh.jpg)