# Підключення RC-приймача до автопілота на базі Linux PX4

Ця тема показує, як налаштувати автопілот на базі Linux PX4 для підключення та використання  [ підтримуваного RC-приймача](../getting_started/rc_transmitter_receiver.md)  на будь-якому серійному порту

Для типів RC, крім S.Bus, ви можете просто під'єднати приймач безпосередньо до серійних портів або до USB через USB до TTY серійного кабелю (наприклад, PL2302 USB в Serial TTL)

:::note
For an S.Bus receiver (or encoder - e.g. from Futaba, RadioLink, etc.) you will usually need to connect the receiver and device via a [signal inverter circuit](#signal_inverter_circuit), but otherwise the setup is the same.
:::

Then [Start the PX4 RC Driver](#start_driver) on the device, as shown below.

<a id="start_driver"></a>

## Starting the Driver

To start the RC driver on a particular UART (e.g. in this case `/dev/ttyS2`):

```sh
rc_input start -d /dev/ttyS2
```

For other driver usage information see: [rc_input](../modules/modules_driver.md#rc-input).

<a id="signal_inverter_circuit"></a>

## Signal Inverter Circuit (S.Bus only)

S.Bus is an _inverted_ UART communication signal.

While some serial ports/flight controllers can read an inverted UART signal, most require a signal inverter circuit between the receiver and serial port to un-invert the signal.

:::tip
This circuit is also required to read S.Bus remote control signals through the serial port or USB-to-TTY serial converter.
:::

This section shows how to create an appropriate circuit.

### Required Components

- 1x NPN transistor (e.g. NPN S9014 TO92)
- 1x 10K resistor
- 1x 1K resistor

:::note
Any type/model of transistor can be used because the current drain is very low.
:::

### Circuit Diagram/Connections

Connect the components as described below (and shown in the circuit diagram):

- S.Bus signal &rarr; 1K resistor &rarr; NPN transistor base
- NPN transistor emit &rarr; GND
- 3.3VCC &rarr; 10K resistor &rarr; NPN transistor collection &rarr; USB-to-TTY rxd
- 5.0VCC &rarr; S.Bus VCC
- GND &rarr; S.Bus GND

![Signal inverter circuit diagram](../../assets/sbus/driver_sbus_signal_inverter_circuit_diagram.png)

The image below shows the connections on a breadboard.

![Signal inverter breadboard](../../assets/sbus/driver_sbus_signal_inverter_breadboard.png)
