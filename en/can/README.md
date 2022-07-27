# CAN

[CAN](https://en.wikipedia.org/CAN_bus), or Controller Area Network, is a robust network that allows vehicle devices, like a flight controller, ESCs, sensors, and other peripherals, to communicate with each other. Because it is designed to be democratic and uses differential signaling, it is very robust - especially over longer distances on large vehicles - and avoids a single point of failure (main bus controller). CAN also allows status feedback from peripherals and convenient firmware upgrades over the bus.

PX4 supports two software protocols for communicating with CAN devices: [DroneCAN](https://dronecan.github.io) and [Cyphal](https://opencyphal.org). DroneCAN is a more mature protocol with extensive peripheral support and years of testing, and is popular/recommended for most common setups. Cyphal is a much newer protocol which allows more flexibility and configuration, especially on larger and more complex vehicles. However, PX4 support is a work in progress and Cyphal hasn't seen as much adoption yet.

:::note
Before 2022, DroneCAN was known as UAVCAN v0 (or just UAVCAN). The introduction of UAVCAN v1 caused disagreement in the community, leading UAVCAN v0 to be renamed to DroneCAN and UAVCAN v1 to continue development as Cyphal.
:::

:::note
There are other CAN software protocols used on drones, such as KDECAN. At time of writing, these are NOT supported by PX4.
:::

## Wiring

No matter which software protocol is being used, the wiring for CAN is the same. Devices are connected in a chain (order does not matter). At either end of the chain, a 120Ω termination resistor should be connected between the two data lines. Flight controllers and some GNSS modules have built in termination resistors for convenience, thus should be placed at opposite ends of the chain. Otherwise, you can use a termination resistor such as [this one from Zubax Electronics](https://shop.zubax.com/products/uavcan-micro-termination-plug?variant=6007985111069), or solder one yourself if you have access to a JST-GH crimper.

The following diagram shows an example of a CAN bus connecting a flight controller to 4 CAN ESCs and a GNSS.

![CAN Wiring](../../assets/uavcan/uavcan_wiring.png)

The diagram does not show any power wiring. Refer to your manufacturer instructions to confirm whether components require separate power or can be powered from the CAN bus itself.

### Connectors
Pixhawk standard compatible CAN devices use 4 pin JST-GH connectors for CAN. Two connectors are used for input and output when wiring in a chain (except for flight controllers and some GNSS devices with builtin termination, which only have a single JST-GH connector).

Other (non-Pixhawk compatible) devices may not use these connectors. However, as long as the device firmware supports DroneCAN or Cyphal, it can be used.

### Redundancy
DroneCAN and Cyphal support using a second (redundant) CAN interface. This is completely optional but increases the robustness of the connection. All Pixhawk flight controllers come with 2 CAN interfaces; if your peripherals support 2 CAN interfaces as well, it is recommended to wire both up for increased safety.

## Firmware
Some CAN peripherals come with custom firmware written by the manufacturer. However, in addition to firmware for flight controllers, PX4 can be run as peripheral firmware itself on supported devices. See the [DroneCAN Support Table](../can/dronecan/support.md) for more information.

## Support and Configuration
[DroneCAN Setup and Configuration](../can/dronecan/README.md)

[DroneCAN Support Table](../can/dronecan/support.md)

## Videos

Intro to UAVCAN and practical example with setup in QGroundControl:

@[youtube](https://youtu.be/IZMTq9fTiOM)

----
UAVCAN for drones — PX4 Developer Summit Virtual 2020

@[youtube](https://youtu.be/6Bvtn_g8liU)

----

Getting started using UAVCAN v1 with PX4 on the NXP UAVCAN Board — PX4 Developer Summit Virtual 2020
@[youtube](https://youtu.be/MwdHwjaXYKs)

----
UAVCAN: a highly dependable publish-subscribe protocol for hard real-time intravehicular networking  — PX4 Developer Summit Virtual 2019

@[youtube](https://youtu.be/MBtROivYPik)
