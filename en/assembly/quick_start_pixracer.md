# Pixracer Wiring Quick Start

> **Warning** Under construction.

This quick start guide shows how to power the [Pixracer](../flight_controller/pixracer.md) flight controller and connect its most important peripherals.

<img src="../../assets/flight_controller/pixracer/pixracer_hero_grey.jpg" width="300px" title="pixracer + 8266 grey" />


## Wiring Guides

![Grau pixracer double](../../assets/flight_controller/pixracer/grau_pixracer_double.jpg)

### Main Setup 

![Grau setup pixracer top](../../assets/flight_controller/pixracer/grau_setup_pixracer_top.jpg)

![Grau setup pixracer bottom](../../assets/flight_controller/pixracer/grau_setup_pixracer_bottom.jpg)


### Radio/Remote Control

For general information about selecting a radio system, receiver compatibility, and binding see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).

- PPM and S.BUS receivers must connect to the **RCIN** port.

  ![Radio Connection](../../assets/flight_controller/pixracer/grau_setup_pixracer_radio.jpg)

- PWM receivers (with individual cables for each channel) must connect
  to the RCIN channel *via* a PPM encoder 
  [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html).

- FrSky receivers are supported via the port shown, and can use the provided I/O Connector.
  
  ![Grau b Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)

  ![Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/pixracer_FrSkyTelemetry.png)
  
### Power Module (ACSP4)

![Grau ACSP4 2 roh](../../assets/flight_controller/pixracer/grau_acsp4_2_roh.jpg)






