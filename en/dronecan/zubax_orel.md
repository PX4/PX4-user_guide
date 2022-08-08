# Zubax Orel 20/21

The Zubax Orel 20 is an CAN ESC designed to run the open source [PX4 Sapog ESC Firmware](dronecan/sapog.md).

While it can be controlled using traditional PWM input, it is designed to operate over CAN bus using [DroneCAN](README.md). This has multiple benefits:
* CAN has been specifically designed to deliver robust and reliable connectivity over relatively large distances.
  It enables safe use of ESCs on bigger vehicles and communication redundancy.
- The bus is bi-directional, enabling health monitoring, diagnostics, and RPM telemetry.
- Wiring is less complicated as you can have a single bus for connecting all your ESCs and other DroneCAN peripherals.
- Setup is easier as you configure ESC numbering by manually spinning each motor.

## Where to Buy
[Zubax Orel](https://zubax.com/products/orel_20)

## Setup
Follow the [Sapog ESC Setup](dronecan/sapog.md) instructions.
