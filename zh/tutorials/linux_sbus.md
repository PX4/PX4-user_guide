# 用于 Linux 的 S.Bus 驱动

The *S.Bus Driver for Linux* allows a Linux-based autopilot to access up to 16 channels from a *Futaba S.Bus receiver* via a serial port. The driver should also work with other receivers that use the S.Bus protocol, including as FrSky, RadioLink, and even S.Bus encoders.

A signal inverter circuit is required (described below) to enable the device serial port to read data from the receiver.

> **Note** The driver has been tested on Raspberry Pi running Rasbian Linux, when connected to the receiver through the onboard serial port or via a USB to TTY serial cable. It is expected to work on all Linux versions, and through all serial ports.

S.Bus is an *inverted* UART communication signal. As many serial ports/flight controllers cannot read an inverted UART signal, a signal inverter circuit is required between the receiver and serial port un-invert the signal. This section shows how to create an appropriate circuit.

<a id="start_driver"></a>

## Signal inverter circuit

To start the RC driver on a particular UART (e.g. in this case `/dev/ttyS2`):
```
linux_sbus start|stop|status -d <device> -c <channel>
```

For other driver usage information see: [rc_input](../middleware/modules_driver.md#rcinput).

<a id="signal_inverter_circuit"></a>

## 源代码

S.Bus is an *inverted* UART communication signal.

While some serial ports/flight controllers can read an inverted UART signal, most require a signal inverter circuit between the receiver and serial port to un-invert the signal.

> **Tip** This circuit is required for Raspberry Pi to read S.Bus remote control signals through the serial port or USB-to-TTY serial converter. It will also be required for many other flight controllers.

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
