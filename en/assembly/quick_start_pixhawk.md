# Pixhawk Wiring Quick Start

This quick start guide shows how power the *3DR Pixhawk* flight controller and connect its most important peripherals
(including output connections for [copter](#copter), [plane](#plane), and [VTOL](#vtol) vehicles).
  
![Pixhawk Image](../../images/pixhawk_logo_view.jpg) 

> **Note** The [3DR Pixhawk](https://dev.px4.io/hardware-pixhawk.html) is no longer available from 3DR. Other flight controllers based on the [Pixhawk FMUv2 architecture](../flight_controller/pixhawk_series.md) are available from other companies (these share the same connections, outputs, functions, etc. and are wired in a similar way).

## Wiring Chart Overview

The image below shows standard Pixhawk connections (excepting the motor and servo outputs). We'll go through each main part in the following sections.

![Pixhawk Wiring Overview](../../images/pixhawk_wiring_overview.jpg)
 
> **Note** More detailed wiring information is shown in this [QuadCopter Pixhawk Wiring Infographic](../../images/../../images/pixhawk_infographic2.jpg).


## Mount and Orient Controller

The *Pixhawk* should be mounted on the frame using vibration-damping foam pads (included in the kit). It should be
positioned as close to your vehicle’s center of gravity as possible, oriented top-side up 
with the arrow points towards the front of the vehicle.

![Pixhawk mounting and orientation](../../images/pixhawk_3dr_mounting_and_foam.jpg)

> **Note** If the controller cannot be mounted in the
  recommended/default orientation (e.g. due to space constraints) you will
  need to configure the autopilot software with the orientation that you
  actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).

## Buzzer and Safety Switch

Connect the included buzzer and safety switch as shown below (these are mandatory).

![Pixhawk mounting and orientation](../../images/pixhawk_3dr_buzzer_and_safety_switch.jpg)


## GPS + Compass

Attach a GPS (required) to the GPS port using the 6-wire cable supplied in the kit. Optionally attach a compass to the I2C port using a 4-wire cable (the Pixhawk has an internal compass, than can be used if necessary).

> **Note** The diagram shows a combined GPS and Compass.  The GPS/Compass should be mounted on the frame as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

![Connect compass/GPS to Pixhawk](../../images/pixhawk_3dr_compass_gps.jpg)


## Power

Connect the output of a *Power module* (PM) to the **POWER** port using a 6-wire cable as shown. The PM input will be connected to your LiPo batter, while the main output will supply vehicle ESCs/motors (possibly via a power distribution board).

The power module supplies the flight controller with power from the battery and also sends information about the analog current and voltage supplied via the module (including both power to the flight controller and to motors etc). 

![Pixhawk - Power Module](../../images/pixhawk_3dr_power_module.jpg)

> **Warning** The power module supplies the flight controller itself, but cannot power servos and other hardware connected to the controller's output ports (rail). For copter this does not matter because the motors are separately powered. 

For planes and VTOL the output rail will need to be separately powered in order to drive servos for rudders, elevons etc. Often the main pusher/puller motor uses an ESC with an integrated [BEC](https://en.wikipedia.org/wiki/Battery_eliminator_circuit) that can be connected to the AUX5 pin to power the Pixhawk output rail. If not, you will need to setup a 5V BEC to connect to one of the free Pixhawk ports (without power, the servos will not work).

<!-- It would be good to have real example of this powering --> 

## Radio Control

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes). 

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver). 

The instructions below show how to connect the different types of receivers to Pixhawk:

- PPM and S.BUS receivers must connect to the **RC** ground, power and signal pins as shown.
  ![Pixhawk - Radio port for PPM/S.BUS receivers](../../images/pixhawk_3dr_receiver_ppm_sbus.jpg)
- PWM receivers must connect to the RCIN channel *via* a PPM encoder 
  [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM receivers use a single signal wire for all channels, while PWM receivers have an individual wire for each channe).
- Spektrum and DSM receivers must connect to the **SPKT/DSM** input.
  ![Pixhawk - Radio port for Spektrum receivers](../../images/pixhawk_3dr_receiver_spektrum.jpg)

For more information about selecting a radio system and receiver compatibility see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).


## Telemetry Radios (Optional)

Telemetry radios may be used to communicate and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission). One radio must be connected to your vehicle as shown below. The other is connected to your ground station computer or mobile device (usually by USB).

![Pixhawk/Telemetry Radio](../../images/pixhawk_3dr_telemetry_radio.jpg)

<!-- what configuration is required once you've set up a radio) -->


## Motor/Actuator Outputs 

### Copter

There is a 1:1 mapping between pin-out and motor. The actual number of motors and how they are wired up depends on the type of multicopter. For more information see the [Copter Motor Map](../assembly/copter_motor_map.md).

Output | Connection
--- | ---
MAIN 1   | Motor 1
MAIN 2   | Motor 2
MAIN 3   | Motor 3
MAIN 4   | Motor 4
MAIN 5   | Motor 5
MAIN 6   | Motor 6 
MAIN 7   | Motor 7
MAIN 8   | Motor 8


### Plane

Output | Connection
--- | ---
MAIN 1   | Aileron (assuming a Y cable)
MAIN 2   | Elevator
MAIN 3   | Throttle
MAIN 4   | Rudder
MAIN 5   | 
MAIN 6   | 
MAIN 7   | 
MAIN 8   | 

> **Caution** The output rail must be separately powered, as discussed in the [Power](#power) section above.


### VTOL

#### QuadPlane

Output | Connection
--- | ---
MAIN 1   | Quad motor 1
MAIN 2   | Quad motor 2
MAIN 3   | Quad motor 3
MAIN 4   | Quad motor 4
AUX 1    | Left aileron
AUX 2    | Right aileron
AUX 3    | Elevator
AUX 4    | Rudder
AUX 5    | Throttle (motor)

> **Caution** The output rail must be separately powered, as discussed in the [Power](#power) section above.


#### Tiltrotor

Output | Connection
--- | --- 
MAIN 1 | Motor right
MAIN 2 | Motor left
MAIN 3 | Motor back
MAIN 4 | empty
MAIN 5 | Tilt servo right
MAIN 6 | Tilt servo left
MAIN 7 | Elevon right
MAIN 8 | Elevon left

> **Caution** The output rail must be separately powered, as discussed in the [Power](#power) section above.

#### Tailsitter

Output | Actuator
--- | --- 
MAIN1 | Left motor controller
MAIN2 | Right motor controller
MAIN3 | Empty
MAIN4 | Empty
MAIN5 | Left aileron servo
MAIN6 | Right aileron servo

> **Caution** The output rail must be separately powered, as discussed in the [Power](#power) section above.


## Configuration

General configuration information is covered in: [Autopilot Configuration](../config/autopilot_configuration.md)

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config/vtol_quad_configuration.md)

<!-- what about config of other vtol types and plane. Do the instructions in these ones above apply for tailsitters etc? -->


## Further information

- [Pixhawk Quick Start Guide (3DR)](https://3dr.com/wp-content/uploads/2014/03/pixhawk-manual-rev7.pdf)
- [Pixhawk Series](../flight_controller/pixhawk_series.md)
- [3DR Pixhawk](https://dev.px4.io/hardware-pixhawk.html) (PX4 DevGuide)
