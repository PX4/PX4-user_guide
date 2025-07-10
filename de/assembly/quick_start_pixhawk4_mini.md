---
canonicalUrl: https://docs.px4.io/main/de/assembly/quick_start_pixhawk4_mini
---

# *Pixhawk 4 Mini* Wiring Quick Start

:::warning PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://shop.holybro.com/) for hardware support or compliance issues.
:::

This quick start guide shows how to power the [*Pixhawk<sup>&reg;</sup> 4 Mini*](../flight_controller/pixhawk4_mini.md) flight controller and connect its most important peripherals.

![Pixhawk4 mini](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_iso_1.png)

## Wiring Chart Overview

The image below shows where to connect the most important sensors and peripherals (except for motors and servos).

![*Pixhawk 4 Mini* Wiring Overview](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_wiring_overview.png)

:::tip
More information about available ports can be found here: [*Pixhawk 4 Mini* > Interfaces](../flight_controller/pixhawk4_mini.md#interfaces).
:::

## Mount and Orient Controller

*Pixhawk 4 Mini* should be mounted on your frame using vibration-damping foam pads (included in the kit). It should be positioned as close to your vehicle’s center of gravity as possible, oriented top-side up with the arrow pointing towards the front of the vehicle.

![*Pixhawk 4 Mini* Orientation](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_orientation.png)

:::note
If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).
:::

## GPS + Compass + Buzzer + Safety Switch + LED

Attach the provided GPS with integrated compass, safety switch, buzzer, and LED to the **GPS MODULE** port. The GPS/Compass should be [mounted on the frame](../assembly/mount_gps_compass.md) as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

![Connect compass/GPS to Pixhawk 4](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_gps.png)

:::note
The GPS module's integrated safety switch is enabled *by default* (when enabled, PX4 will not let you arm the vehicle). To disable the safety press and hold the safety switch for 1 second. You can press the safety switch again to enable safety and disarm the vehicle (this can be useful if, for whatever reason, you are unable to disarm the vehicle from your remote control or ground station).
:::


## Power

The Power Management Board (PMB) serves the purpose of a power module as well as a power distribution board. In addition to providing regulated power to *Pixhawk 4 Mini* and the ESCs, it sends information to the autopilot about the battery’s voltage and current draw.

Connect the output of the PMB that comes with the kit to the **POWER** port of the *Pixhawk 4 Mini* using a 6-wire cable. The connections of the PMB, including power supply and signal connections to the ESCs and servos, are explained in the image below.

![Pixhawk 4 - Power Management Board](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_power_management.png)

:::note
The image above only shows the connection of a single ESC and a single servo.
Connect the remaining ESCs and servos similarly.
:::

| Pin(s) or Connector | Function                                   |
| ------------------- | ------------------------------------------ |
| B+                  | Connect to ESC B+ to power the ESC         |
| GND                 | Connect to ESC Ground                      |
| PWR                 | JST-GH 6-pin Connector, 5V 3A output       |
| BAT                 | Power Input, connect to 2~12s LiPo Battery |

The pinout of the *Pixhawk 4 Mini* **POWER** port is shown below. The `CURRENT` signal should carry an analog voltage from 0-3.3V for 0-120A as default. The `VOLTAGE` signal should carry an analog voltage from 0-3.3V for 0-60V as default. The VCC lines have to offer at least 3A continuous and should default to 5.1V. A lower voltage of 5V is still acceptable, but discouraged.

| Pin      | Signal  | Volt  |
| -------- | ------- | ----- |
| 1(red)   | VCC     | +5V   |
| 2(black) | VCC     | +5V   |
| 3(black) | CURRENT | +3.3V |
| 4(black) | VOLTAGE | +3.3V |
| 5(black) | GND     | GND   |
| 6(black) | GND     | GND   |

:::note
If using a plane or rover, the 8 pin power (+) rail of **MAIN OUT** will need to be separately powered in order to drive servos for rudders, elevons, etc. To do this, the power rail needs to be connected to a BEC equipped ESC, a standalone 5V BEC, or a 2S LiPo battery. To do this, the power rail needs to be connected to a BEC equipped ESC, a standalone 5V BEC, or a 2S LiPo battery. Be careful with the voltage of servo you are going to use here.
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
For more information see [Basic Concepts > SD Cards (Removable Memory)](../getting_started/px4_basic_concepts.md#sd-cards-removable-memory).
:::

## Motors

Motors/servos are connected to the **MAIN OUT** ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md). See [*Pixhawk 4 Mini* > Supported Platforms](../flight_controller/pixhawk4_mini.md#supported-platforms) for more information.

:::note
This reference lists the output port to motor/servo mapping for all supported air and ground frames (if your frame is not listed in the reference then use a "generic" airframe of the correct type).
:::

:::caution
The mapping is not consistent across frames (e.g. you can't rely on the throttle being on the same output for all plane frames).
Make sure to use the correct mapping for your vehicle.
:::

## Other Peripherals

The wiring and configuration of optional/less common components is covered within the topics for individual [peripherals](../peripherals/README.md).


## Configuration

General configuration information is covered in: [Autopilot Configuration](../config/README.md).

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)

<!-- Nice to have detailed wiring infographic and instructions for different vehicle types. --> 

## Further information
- [*Pixhawk 4 Mini*](../flight_controller/pixhawk4_mini.md)
