# I2C Bus Peripherals

[I2C](https://en.wikipedia.org/wiki/I2C) is a serial communication protocol that is commonly used (at least on smaller drones), for connecting peripheral components like rangefinders, LEDs, Compass, etc.

It is recommended for:
* Connecting off board components that require higher data rates than provided by a strict serial UART, such as rangefinders.
* Compatibility with peripheral devices that only support I2C.
* Allowing multiple devices to attach to a single bus, which is useful for conserving ports.

I2C allows multiple master devices to connect to multiple slave devices using only 2 wires per connection (SDA, SCL).
in theory a bus can support 128 devices, each accessed via its unique address.

> **Note** UAVCAN would normally be preferred where higher data rates are required, and on larger vehicles where sensors are be mounted further from the flight controller.


## Wiring

I2C uses a pair of wires: SDA (serial data) and SCL (serial clock).
The bus is of open-drain type, meaning that devices ground the data line.
It uses a pullup resistor to push it to `log.1` (idle state) - every wire has it usually located on the bus terminating devices.
One bus can connect to multiple I2C devices.
The individual devices are connected without any crossing.

For connection (according to dronecode standard) 4-wire cables equipped with JST-GH connectors are used.
To ensure reliable communication and to reduce crosstalk it is advised to apply recommendations concerning [cable twisting](../assembly/cable_wiring.md#i2c-cables) and pullup resistors placement.

![Cable twisting](../../assets/hardware/cables/i2c_jst-gh_cable.jpg)

## Common problems

### Insufficient Capacity

The capacity available for each individual device decreases as more devices are added.
If too many devices are added, it can cause transmission errors and network unreliability.

The problem can be analyzed using an oscilloscope, where we see that the edges of SDA/SCL signals are no longer sharp.

There are several ways to reduce the problem:
* Dividing the devices into groups, each with approximately the same number of devices and connecting each group to one autopilot port
* Using the shortest and the highest quality I2C cables possible
* Separating the devices with a weak open-drain driver to smaller bus with lower capacity
* [I2C Bus Accelerators](#i2c-bus-accelerators)


### Address Clashes

If two I2C devices on a bus have the same ID there will be a clash, and neither device will not work properly (or at all).
This usually occurs because a user needs to attach two sensors of the same type to the bus, but may also happen if devices use duplicate addresses by default.

Particular I2C may allow you to select a new address for one of the devices to avoid the clash.
Some devices do not support this option, or do not have broad options for the addresses that can be used (i.e. cannot be used to avoid a clash).

If you can't change the addresses, one option is to use an [I2C Address Translator](#i2c-address-translators).


## I2C Bus Accelerators

I2C bus accelerators are separate circuits that can be used to support more devices on the same I2C bus.
They work by physically dividing an I2C network into 2 parts and using their own transistors to amplify I2C signals.

Available accelerators include:
- [Thunderfly TFI2CEXT01](https://github.com/ThunderFly-aerospace/TFI2CEXT01):
  ![I2C bus extender](../../assets/peripherals/i2c_tfi2cext/tfi2cext01a_bottom.jpg)
  - This has Dronecode connectors and is hence very easy to add to a Pixhawk I2C setup.
  - The module has no settings (it works out of the box).


## I2C Address Translators

I2C Address Translators can be used to prevent I2C address clashes in systems where there is no other way to assign unique addresses.
The work by listening for I2C communication and tranforming the address when a slave device is called (according to a preset algorithm).

Supported I2C Address Translators include:
- [TFI2CADT01](i2c_address_translator.md#TFI2CADT)



## Checking the Bus and Device Status

A useful tool for bus analysis is [i2cdetect](../modules/modules_command.md#i2cdetect).
This lists available I2C devices by their addresses.
It can be used to find out if a device on the bus is available and if the autopilot can communicate with it.

The tool can be run in the PX4 terminal with the following command:

```
i2cdetect -b 1
```
where the bus number is specified after `-b` parameter

## I2C Development

Software development for I2C devices is described in [I2C Bus (Development Overview)](../sensor_bus/i2c_development.md).

## Further Information

* [I2C](https://en.wikipedia.org/wiki/I%C2%B2C) (Wikipedia)
* [I2C Comparative Overview](https://learn.sparkfun.com/tutorials/i2c) (learn.sparkfun.com)
* [Driver Framework](../middleware/drivers.md)
