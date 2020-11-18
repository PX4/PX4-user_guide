# S.Bus Driver for Linux

This topic shows how to setup a PX4 Linux-based autopilot to connect and use a [supported RC receiver](https://docs.px4.io/master/en/getting_started/rc_transmitter_receiver.html) on any serial port.

A signal inverter circuit is required (described below) to enable the device serial port to read data from the receiver.

> **Note** For an S.Bus reciever (or encoder - e.g. from Futaba, RadioLink, etc.) you will usually need to connect the receiver and device via a [signal inverter circuit](#signal_inverter_circuit), but otherwise the setup is the same.

Then [Start the PX4 RC Driver](#start_driver) on the device, as shown below.

<a id="start_driver"></a>

## Signal inverter circuit

To start the RC driver on a particular UART (e.g. in this case `/dev/ttyS2`):
```
linux_sbus start|stop|status -d <device> -c <channel>
```

For other driver usage information see: [rc_input](../middleware/modules_driver.md#rcinput).

<a id="signal_inverter_circuit"></a>

## Source code

S.Bus is an *inverted* UART communication signal.

As many serial ports/flight controllers cannot read an inverted UART signal, a signal inverter circuit is required between the receiver and serial port un-invert the signal.

> **Tip** This circuit is required for Raspberry Pi to read S.Bus remote control signals through the serial port or USB-to-TTY serial converter.

The command syntax is:

### Required components

* 1x NPN transistor (e.g. NPN S9014 TO92)
* 1x 10K resistor
* 1x 1K resistor

> **Note** Any type/model of transistor can be used because the current drain is very low.


### Circuit diagram/Connections

Connect the components as described below (and shown in the circuit diagram):

* S.Bus signal &rarr; 1K resistor &rarr; NPN transistor base
* NPN transistor emit &rarr; GND
* 3.3VCC &rarr; 10K resistor &rarr; NPN transistor collection &rarr; USB-to-TTY rxd
* 5.0VCC &rarr; S.Bus VCC
* GND &rarr; S.Bus GND

![Signal inverter circuit diagram](../../assets/sbus/driver_sbus_signal_inverter_circuit_diagram.png)

The image below shows the connections on a breadboard.

![Signal inverter breadboard](../../assets/sbus/driver_sbus_signal_inverter_breadboard.png)
