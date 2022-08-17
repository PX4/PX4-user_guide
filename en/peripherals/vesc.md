# VESC ESCs (DroneCAN)

The VESC project is a fully open source hardware and software design for advanced FOC motor controllers.
While it can be controlled using traditional PWM input, it also supports being connected over CAN bus using [DroneCAN](../dronecan/README.md).

This has multiple benefits:

- CAN has been specifically designed to deliver robust and reliable connectivity over relatively large di
stances.
  It enables safe use of ESCs on bigger vehicles and communication redundancy.
- The bus is bi-directional, enabling health monitoring, diagnostics, and RPM telemetry.
- Wiring is less complicated as you can have a single bus for connecting all your ESCs and other DroneCAN
 peripherals.


## PX4 Supported ESC

PX4 is compatible with any/all UAVCAN v0 ESCs.
At time of writing PX4 does not yet support UAVCAN v1.0.

UAVCAN is generally speaking a plug'n'play protocol.
The main difference between UAVCAN ESCs from a setup perspective is that the physical connectors and the software tools used to configure the motor order and direction may be different.

Some popular UAVCAN ESC firmware/products include:
- [Sapog](https://github.com/PX4/sapog#px4-sapog) firmware; an advanced open source sensorless PMSM/BLDC motor controller firmware designed for use in propulsion systems of electric unmanned vehicles.
  - [Zubax Orel 20](https://zubax.com/products/orel_20)
  - [Holybro Kotleta20](https://shop.holybro.com/kotleta20_p1156.html)
- [Zubax Myxa](https://zubax.com/products/myxa) - High-end PMSM/BLDC motor controller (FOC ESC) for light unmanned aircraft and watercraft.
  :::note
  ESC based on the Zubax Telega sensorless FOC motor control technology (e.g., Zubax Myxa, Mitochondrik, Komar, etc.) require non-trivial tuning of the propulsion system in order to deliver adequate performance and ensure robust operation.

  Users who lack the necessary tuning expertise are advised to either [purchase pre-tuned UAV propulsion kits](https://zubax.com/products/uav_propulsion_kits) or to use Zubax Robotic's professional tuning service.
  Questions on this matter should be addressed to: [support@zubax.com](mailto:support@zubax.com).
  :::
- [Zubax Mitochondrik](https://zubax.com/products/mitochondrik) - integrated sensorless PMSM/BLDC motor controller chip (used in ESCs and integrated drives)
  - [Zubax Sadulli Integrated Drive](https://shop.zubax.com/collections/integrated-drives/products/sadulli-integrated-drive-open-hardware-reference-design-for-mitochondrik?variant=27740841181283)
- [OlliW’s UC4H ESC-Actuator Node](http://www.olliw.eu/2017/uavcan-for-hobbyists/#chapterescactuator)
- A number of others are [listed here](https://forum.uavcan.org/t/uavcan-esc-options/452/3?u=pavel.kirienko)

:::note
This list is *not exhaustive/complete*.
If you know of another ESC, please add it to the list!
:::

## Hardware Setup

Connect all of the on-board CAN bus devices into a chain and make sure the bus is terminated at the end nodes. The order in which the ESCs are connected/chained does not matter.

VESCs do NOT use the Pixhawk standard JST GH 4 pin connectors. See [CAN Bus Wiring](../can/README.md#wiring) for more information.

## Firmware Setup

The preferred tool for motor enumeration is the [VESC tool](https://vesc-project.com/vesc_tool). In addition to the normal motor configuration that you will have to setup in the VESC tool, you will also need to properly setup the app configuration.
The recommended app setup is as follows:

Parameter | Option
--- | ---
App to use | `No App`
VESC ID | `1,2,...`
Can Status Message Mode | `CAN_STATUS_1_2_3_4_5`
CAN Baud Rate | `CAN_BAUD_500K`
CAN Mode | `UAVCAN`
UAVCAN ESC Index | `0,1,...`

VESC ID should have the same motor numbering as in PX4 convention, starting at `1` for top-right motor, `2` for bottom-left motor etc.
However the `UAVCAN ESC Index` starts from `0`, and as such it is always one index lower than the `VESC ID`.
For example, in a quadcopter the bottom left motor will have `VESC ID = 2` and `UAVCAN ESC Index = 1`.

Finally the `CAN Baud Rate` must match the value set in [UAVCAN_BITRATE](../advanced_config/parameter_reference.md#UAVCAN_BITRATE).

## Flight Controller Setup

### Enable DroneCAN

Connect the ESCs to the Pixhawk CAN bus. Power up the entire vehicle using a battery or power supply (not just the flight controller over USB) and enable the DroneCAN driver by setting the parameter [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) to '3' to enable both dynamic node ID allocation and DroneCAN ESC output.

### PX4 Configuration

(Optional) Set [UAVCAN_ESC_IDLT](../advanced_config/parameter_reference.md#UAVCAN_ESC_IDLT) to 1 in order to ensure that the motors are always running at least at the idle throttle while the system is armed.

:::note
Some systems will not benefit from this behavior, e.g. glider drones).
:::

## Troubleshooting

### Motors not spinning when armed

If PX4 arms but the motors do not start to rotate, check that parameter `UAVCAN_ENABLE=3` to use DroneCAN ESCs.
If the motors do not start spinning before thrust is increased, check `UAVCAN_ESC_IDLT=1`.

### DroneCAN devices dont get node ID/Firmware Update Fails

PX4 requires an SD card for DroneCAN dynamic node ID allocation and during firmware update (which happen during boot).
Check that there is a (working) SD card present and reboot.

## Further Information
* [VESC Project ESCs](https://vesc-project.com/)
* [Benjamin Vedder's blog](http://vedder.se) (project owner)
