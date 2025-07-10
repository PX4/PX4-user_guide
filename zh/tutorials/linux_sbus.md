---
canonicalUrl: https://docs.px4.io/main/zh/tutorials/linux_sbus
---

# 用于 Linux 的 S.Bus 驱动

The *S.Bus Driver for Linux* allows a Linux-based autopilot to access up to 16 channels from a *Futaba S.Bus receiver* via a serial port. The driver should also work with other receivers that use the S.Bus protocol, including as FrSky, RadioLink, and even S.Bus encoders.

A signal inverter circuit is required (described below) to enable the device serial port to read data from the receiver.

:::note
For an S.Bus reciever (or encoder - e.g. from Futaba, RadioLink, etc.) you will usually need to connect the receiver and device via a [signal inverter circuit](#signal_inverter_circuit), but otherwise the setup is the same.
:::

Then [Start the PX4 RC Driver](#start_driver) on the device, as shown below.

<a id="start_driver"></a>

## Signal inverter circuit

To start the RC driver on a particular UART (e.g. in this case `/dev/ttyS2`):
```
linux_sbus start|stop|status -d <device> -c <channel>
```

S.Bus 是 *inverted* UART 通信信号。

<a id="signal_inverter_circuit"></a>

## 源代码

S.Bus is an *inverted* UART communication signal.

The command syntax is:

:::tip
This circuit is also required to read S.Bus remote control signals through the serial port or USB-to-TTY serial converter.
:::

This section shows how to create an appropriate circuit.

### Required components

* 1x NPN 晶体管（例如 NPN S9014 TO92）
* 1x 10K 电阻
* 1x 1K 电阻

:::note
Any type/model of transistor can be used because the current drain is very low.
:::

### Circuit diagram/Connections

Connect the components as described below (and shown in the circuit diagram):

* S.Bus 信号&rarr;1K 电阻&rarr;NPN 晶体管
* NPN晶体管发射&rarr;GND
* 3.3VCC＆&rarr; 10K电阻&rarr; NPN晶体管集合&rarr; USB-to-TTY rxd
* 5.0VCC&rarr;S.Bus VCC
* GND &rarr; S.Bus GND

![Signal inverter circuit diagram](../../assets/sbus/driver_sbus_signal_inverter_circuit_diagram.png)

The image below shows the connections on a breadboard.

![Signal inverter breadboard](../../assets/sbus/driver_sbus_signal_inverter_breadboard.png)
