# Pixhawk 4 Wiring Quick Start

This quick start guide shows how to power the Pixhawk<sup>&reg;</sup> 4 flight controller and connect its most important peripherals.
  
![Pixhawk 4 Image](../../assets/flight_controller/pixhawk4/pixhawk4_logo_view.png)


## Wiring Chart Overview

<p style="margin-bottom:1cm;">The image below shows standard Pixhawk 4 connections (except the motor and servo outputs). We'll go through each main part in the following sections.</p>

![Pixhawk 4 Wiring Overview](../../assets/flight_controller/pixhawk4/pixhawk4_wiring_overview.png)


## Mount and Orient Controller

Pixhawk 4 should be mounted on the frame using vibration-damping foam pads (included in the kit). It should be positioned as close to your vehicle’s center of gravity as possible, oriented top-side up with the arrow pointing towards the front of the vehicle.

<img src="../../assets/flight_controller/pixhawk4/pixhawk4_mounting_and_foam.png" align="center"/>
<!--![Pixhawk 4 mounting and orientation](../../assets/flight_controller/pixhawk4/pixhawk4_mounting_and_foam.png)--> 

> **Note** If the controller cannot be mounted in the
  recommended/default orientation (e.g. due to space constraints) you will
  need to configure the autopilot software with the orientation that you
  actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).


## GPS + Compass + Buzzer + Safety Switch + LED

Attach the provided GPS with integrated compass, safety switch, buzzer and LED to the GPS port.

> **Note** The diagram shows a GPS with an integrated compass.  The GPS/Compass should be mounted on the frame as far away from 
  other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other 
  electronics will reduce interference).

![Connect compass/GPS to Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_compass_gps.png)

When GPS module with integrated safety switch is connected to Pixhawk 4, by default the safety is enabled. This means the autopilot will not let you arm the vehicle. To arm the vehicle, you have to press and hold the safety switch for 1 sec to disable safety. Similarly, if the vehicle is armed and something goes wrong such that you are unable to disarm the vehicle from QGC or RC, you can press the safety switch again to disarm, enabling safety.



## Power

Connect the output of the *Power Management Board* (PM board) that comes with the kit to one of the **POWER** bricks of Pixhawk 4 using a 6-wire cable. The PM input **2~12S** will be connected to your LiPo battery. The connections of Power Management Board, including power supply and signal connections to the ESCs and servos, are explained in the table below. Note that the PM board does not supply power to the servos via + and - pins of **FMU PWM-OUT**. 

The image below shows the power management board provided with Pixhawk 4.

![Pixhawk 4 - Power Management Board](../../assets/flight_controller/pixhawk4/pixhawk4_power_management_board.png)

> **Note** If using a plane or rover, the 8 pin power (+) rail of **FMU PWM-OUT** will need to be separately powered in order to drive 
  servos for rudders, elevons etc. To do this, the power rail needs to be connected to a BEC equipped ESC or a standalone 5V BEC or a
  2S LiPo battery. Be careful with the voltage of servo you are going to use here.

PIN&Connector | Function
--- | ---
I/O PWM-IN* | If using Copter, connect to I/O PWM OUT port of Pixhawk 4
M1 | I/O PWM OUT 1: connect signal wire to ESC of motor 1 here 
M2 | I/O PWM OUT 2: connect signal wire to ESC of motor 2 here
M3 | I/O PWM OUT 3: connect signal wire to ESC of motor 3 here
M4 | I/O PWM OUT 4: connect signal wire to ESC of motor 4 here
M5 | I/O PWM OUT 5: connect signal wire to ESC of motor 5 here
M6 | I/O PWM OUT 6: connect signal wire to ESC of motor 6 here
M7 | I/O PWM OUT 7: connect signal wire to ESC of motor 7 here
M8 | I/O PWM OUT 8: connect signal wire to ESC of motor 8 here
FMU PWM-IN* | If using Copter, connect to FMU PWM OUT port of Pixhawk 4. If using Plane or Rover, connect to I/O PWM OUT port of Pixhawk 4.
FMU PWM-OUT** | If FMU PWM-IN is connected to Pixhawk 4, connect signal wires to ESC or signal, +, - wires to servos here
CAP&ADC-OUT | connect to CAP & ADC IN port of Pixhawk 4
CAP&ADC-IN | CAP&ADC input
B+ | connect to ESC B+ to power the ESC
GND | connect to ESC Ground
PWR1 | 5v output 3A, connect to Pixhawk 4 POWER 1 
PWR2 | 5v output 3A, connect to Pixhawk 4 POWER 2 
2~12S | Power Input, connect to 12S LiPo Battery

\* Depending on your airframe type, refer to [Airframe Reference](../airframes/airframe_reference.md) to connect **I/O PWM OUT** and **FMU PWM OUT** ports of Pixhawk 4 to PM board. **MAIN** outputs in PX4 firmware map to **I/O PWM OUT** port of Pixhawk 4 whereas **AUX outputs** map to **FMU PWM OUT** of Pixhawk 4. For example, **MAIN1** maps to IO_CH1 pin of **I/O PWM OUT**.

** FMU PWM-OUT is used to drive servos in a Plane, Rover or Copter, while M1-8 is used for motors.

The pinout of Pixhawk 4’s power ports is shown below. The CURRENT signal should carry an analog voltage from 0-3.3V for 0-120A as default. The VOLTAGE signal should carry an analog voltage from 0-3.3V for 0-60A as default. The VCC lines have to offer at least 3A continuous and should default to 5.1V. A lower voltage of 5V is still acceptable, but discouraged.


Pin | Signal | Volt
--- | --- | ---
1(red) | VCC | +5V
2(yellow) | VCC | +5V
3(blue) | CURRENT | +3.3V
4(white) | VOLTAGE | +3.3V
5(green) | GND | GND
6(black) | GND | GND


## Radio Control

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes). 

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver). 

The instructions below show how to connect the different types of receivers to Pixhawk 4:

- Spektrum/DSM or S.BUS receivers must connect to the **DSM/SBUS RC** input.
  
  ![Pixhawk 4 - Radio port for Spektrum receivers](../../assets/flight_controller/pixhawk4/pixhawk4_receiver_sbus.png)

- PPM must connect to the **PPM RC** input port.
  
 ![Pixhawk 4 - Radio port for PPM receivers](../../images/pixhawk_4_receiver_ppm.png)

- PWM receivers must connect to the **PPM RC** input port via a PPM encoder [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM receivers use a single signal wire for all channels, while PWM receivers have an individual wire for each channel).

For more information about selecting a radio system, receiver compatibility, and binding your transmitter/receiver pair, see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).


## Telemetry Radios (Optional)

Telemetry radios may be used to communicate and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission). One radio must be connected to your vehicle as shown below. The other is connected to your ground station computer or mobile device (usually by USB).

![Pixhawk 4/Telemetry Radio](../../assets/flight_controller/pixhawk4/pixhawk4_telemetry_radio.png)

<!-- what configuration is required once you've set up a radio) -->

## SD Card (Optional)

SD card is needed to upload missions and to log flight details which can be extracted after flight. Insert SD card in Pixhawk 4 as shown below.

![Pixhawk 4/SD Card](../../assets/flight_controller/pixhawk4/pixhawk4_sd_card.png)

<!-- what configuration is required once you've set up a radio) -->

## Motors

The mappings between I/O PWM OUT (referred as MAIN) / FMU PWM OUT (referred as AUX) output ports and motor/servos for all supported air and ground frames are listed in the [Airframe Reference](../airframes/airframe_reference.md).

> **Caution** The mapping is not consistent across frames (e.g. you can't rely on the throttle being on the same output for all plane frames). Make sure to use the correct mapping for your vehicle.

<span></span>
> **Tip** If your frame is not listed in the reference then use a "generic" airframe of the correct type.


## Other Peripherals

The wiring and configuration of other components is covered within the topics for individual [peripherals](../peripherals/README.md).


## Configuration

General configuration information is covered in: [Autopilot Configuration](../config/README.md).

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)

<!-- what about config of other vtol types and plane. Do the instructions in these ones above apply for tailsitters etc? -->

<!--## Detailed Wiring Infographic (Copter)

![QuadCopter Pixhawk Wiring Infographic](../../images/pixhawk_infographic2.jpg) -->

## Further information
<!-- - [Pixhawk 4 Quick Start Guide (Holybro)]() Add link-->
- [Pixhawk 4](../flight_controller/pixhawk4.md)
- [Pixhawk project](../flight_controller/pixhawk4_website.md) <!-- update with pixhawk.org pixhawk4 url-->
