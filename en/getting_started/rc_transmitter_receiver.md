# Remote Control Transmitters & Receivers

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes). This topic explains a little about how RC works, and how to choose an appropriate radio system for your vehicle. 


## How do Radio Systems Work?

An RC radio system consists of a *compatible* transmitter and receiver that are bound together — set up so that they only communicate with each other. The transmitter is held by the vehicle operator while the receiver is mounted on the remote vehicle. The receiver is connected to the flight controller, which is in turn connected to the vehicle motors and actuators.

<!-- image showing the different parts here would be nice -->

> **Note** Despite their names, the transmitter and receiver may support bi-directional communication. This allows the transmitter to receive and display information about the vehicle battery and other state.

The transmitter and receiver communicate using radio frequencies. The transmitter encodes a number of separate discrete *channels* within the radio signal, each which can be used to send the value of a single switch, dial, control stick position in one axis, etc. 

Transmitters/receivers support different numbers of channels, depending on the model. At least 2 channels are required for controlling ground vehicle movement (steering + throttle), and at least 4 for aircraft (roll, pitch, yaw, thrust). An 8 or 16 channel transmitter provides additional channels that you can use to control other mechanisms or activate different [flight mode](../flying/flight_mode_selection.md)/functionality provided by the autopilot. 


## Transmitters for Aircraft

The most popular form of transmitter for UAVs is shown below. It has separate control sticks for controlling roll/pitch and for throttle/yaw as shown (ie. aircraft need at least 4 channels). 

![RC Basic Commands](../../images/rc_basic_commands.png)

There are numerous possible layouts for the transmitter's control sticks, switches, etc. The more common layouts have been given specific "Mode" numbers. *Mode 1* and *Mode 2* transmitters (shown below) differ only in the placement of the throttle. 

![Mode1-Mode2](../../images/mode1_mode2.png)

> **Note** The choice of transmitter mode is largely one of taste, and must be made before you buy the transmitter.
  

## Transmitters for Ground Vehicles

An Unmanned Ground Vehicle (UVG)/car minimally requires a 2 channel transmitter in order to send the values for steering and speed. Commonly transmitters set these values using a wheel and trigger, two single-axis control sticks, or a single dual-axis control stick.

There is nothing to stop you using more channels/control mechanisms, and these can be very useful for engaging additional actuators and autopilot modes.


## Choosing Transmitter/Receivers

You will need to select a transmitter and receiver that are compatible with each other. Compatible radio systems are often sold together. For example, this [Taranis X9D and FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us) is a popular combination.

> **Note** Before you can use the radio system you will need to *bind* them so that they communicate. Follow the binding instructions that come with your specific transmitter/receiver!

In addition, receivers have to be be compatible with PX4 and the flight controller hardware. The sections below list some of the receivers that have been validated for use with Flight Controller boards and PX4


### Receivers

Different receivers connect to the flight controller using different protocols/connectors. 

Pixhawk supports many different radio receiver models. *PX4* and *Pixhawk* have been validated with:

- All Spektrum DSM RC receivers
- All Futaba S.BUS and S.BUS2 RC receivers
- All FrSky PPM and S.Bus models
- Graupner HoTT
- All PPM models from other manufacturers

The appropriate connection for each type of receiver is described below:

- PPM and S.BUS receivers must connect to the **RC** ground, power and signal pins as shown.
  ![Pixhawk - Radio port for PPM/S.BUS receivers](../../images/pixhawk_3dr_receiver_ppm_sbus.jpg)
- PWM receivers must connect to the RCIN channel *via* a PPM encoder 
  [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM receivers use a single signal wire for all channels, while PWM receivers have an individual wire for each channe).
- Spektrum and DSM receivers must connect to the **SPKT/DSM** input.
  ![Pixhawk - Radio port for Spektrum receivers](../../images/pixhawk_3dr_receiver_spektrum.jpg)


### Transmitters

One of the most popular radio systems is the open source *FrSky Taranis PPM-Sum Compatible Transmitter*. This is compatible with many high quality FrSky PPM-Sum compatible receivers.

![Taranis X9D Transmitter](../../images/frsky_taranis_x9d_transmitter.jpg)

Other popular transmitter/receiver combinations include:

* Turnigy transmitters (with the FrSky Transmitter Module) and compatible PPM-Sum receivers.
* Futaba Transmitters and compatible Futaba S-Bus receivers.
