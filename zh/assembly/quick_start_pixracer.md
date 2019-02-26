# Pixracer接线指南

> **Warning** 建设中。

这个快速指南会告诉你如何给 [Pixracer](../flight_controller/pixracer.md) 飞控供电和连接跟它配合的组件。

<img src="../../assets/flight_controller/pixracer/pixracer_hero_grey.jpg" width="300px" title="pixracer + 8266 grey" />

## 接线指南

![Grau pixracer double](../../assets/flight_controller/pixracer/grau_pixracer_double.jpg)

### 主要设置

![Grau setup pixracer top](../../assets/flight_controller/pixracer/grau_setup_pixracer_top.jpg)

![Grau setup pixracer bottom](../../assets/flight_controller/pixracer/grau_setup_pixracer_bottom.jpg)

### 电台/远程 控制

如果你想*手动*控制你的飞机，你需要一个遥控器（PX4在自动飞行模式可以不需要遥控器）。

你需要[一个兼容的发射/接收机](../getting_started/rc_transmitter_receiver.md)，并*对好频*（对频方法参考说明书）。

下面介绍如何连接不同的接收机：

- Frsky 的接收机通过所示的端口连接, 并可以使用提供的 I/o 连接器。
    
    ![Grau b Pixracer FrSkyS接口连接](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)
    
    ![Pixracer FrSkyS接口连接](../../assets/flight_controller/pixracer/pixracer_FrSkyTelemetry.jpg)

- PPM-SUM 和 S.BUS 接收机连接到 **RCIN** 端口。
    
    ![电台连接](../../assets/flight_controller/pixracer/grau_setup_pixracer_radio.jpg)

- PPM 接收机通过一个 *PPM 编码器*将*每一个通道通过一根线*连接到** RCIN** 通道上[如这个所示](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)（PPM-Sum 接收机所有通道可以只需要一根信号线）。

### 电源模块 (ASCP4)

![Grau ACSP4 2 roh](../../assets/flight_controller/pixracer/grau_acsp4_2_roh.jpg)