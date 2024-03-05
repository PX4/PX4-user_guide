# Підключення RC-приймача до автопілота на базі Linux PX4

Ця тема показує, як налаштувати автопілот на базі Linux PX4 для підключення та використання  [ підтримуваного RC-приймача](../getting_started/rc_transmitter_receiver.md)  на будь-якому серійному порту

Для типів RC, крім S.Bus, ви можете просто під'єднати приймач безпосередньо до серійних портів або до USB через USB до TTY серійного кабелю (наприклад, PL2302 USB в Serial TTL)

:::note
Для отримувача S.Bus (або кодера - наприклад, від Futaba, RadioLink тощо) вам зазвичай потрібно підключити приймач та пристрій через [схему інвертування сигналу](#signal_inverter_circuit), але в іншому випадку налаштування залишається таким же.
:::

Тоді [Запустіть PX4 RC драйвер](#start_driver) на пристрої, як показано нижче.

<a id="start_driver"></a>

## Запуск драйвера

Щоб запустити драйвер RC в певному UART (наприклад, в цьому випадку `/dev/ttyS2`):

```sh
rc_input start -d /dev/ttyS2
```

Для іншої інформації про використання драйвера дивися: [rc_input](../modules/modules_driver.md#rc-input).

<a id="signal_inverter_circuit"></a>

## Схема інвертування сигналу (лише для S.Bus)

S.Bus - це _інвертований_ сигнал комунікації UART.

Хоча деякі серійні порти / контролери польоту можуть читати інвертований сигнал UART, більшість вимагає схеми інвертування сигналу між приймачем та серійним портом для деінвертації сигналу.

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
