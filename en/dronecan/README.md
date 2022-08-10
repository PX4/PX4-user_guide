# DroneCAN

From the DroneCAN website:

> DroneCAN is the primary CAN protocol used by the ArduPilot and PX4 projects for communication with CAN peripherals.
> It is an open protocol with open communication, specification and multiple open implementations.

DroneCAN is a software standard for the flight controller and other CAN devices on a vehicle to communicate with each other.
It supports many different sensors and actuators connected over CAN.
Connecting peripherals over DroneCAN has many benefits, including simpler wiring, telemetry/feedback from servos and ESCs, wiring redundancy, and more reliable performance (especially over longer wires on large vehicles).
Additionally, it allows the user to configure and update the firmware of all CAN-connected devices centrally through PX4.

:::note
PX4 requires an SD card to enable dynamic node allocation and for firmware update. The SD card is not used in flight.
:::

## Support

Most common types of peripherals (sensors, ESCs, and servos) that are DroneCAN/UAVCAN v0 compliant are supported.
For more information, see [DroneCAN Support Table](dronecan/support.md).

## Hardware Setup

DroneCAN operates over CAN. Refer to the [CAN setup documentation](../can/README.md) before continuing with this article.

## Node ID

Every DroneCAN device must be configured with a *node id* that is unique on the vehicle.

Most devices support dynamic node allocation (DNA) which allows PX4 to automatically configure the node ID of each detected peripheral on system startup. Consult the manufacturer documentation for details on whether your device supports DNA and how to enable it. Many devices will automatically switch to DNA if the node id is set to 0. PX4 will enable the built in allocation server if the `UAVCAN_ENABLE` parameter is > 1 (set to 2 or 3).

:::note
PX4 has a node ID, which can be configured using the `UAVCAN_NODE_ID` parameter. The parameter is set to 1 by default.
:::

Some devices don't support DNA.
Additionally, in certain mission-critical scenarios, you might prefer to manually configure node IDs beforehand instead of relying on the dynamic allocation server.
If you wish to disable the DNA completely, set `UAVCAN_ENABLE` to 1 and manually set each node ID to a unique value.
If the DNA is still running and certain devices need to be manually configured, give these devices a value greater than the total number of DroneCAN devices to avoid clashes.

:::warning
At time of writing, PX4 does not run the node allocation server on the CAN2 port.
This means that if you have a device that is *only* connected to CAN2 (not redundantly to CAN1 and CAN2), you will need to manually configure its node ID.
:::

## Setup & Configuration

Most DroneCAN sensors require no further setup, unless specifically noted in their documentation.

[DroneCAN ESCs and servos](../dronecan/actuators.md) require the motor order to be set, and may require a few other parameters be set.

## Firmware Update

PX4 can upgrade device firmware over DroneCAN.
To upgrade the device, all you need to do is copy the firmware binary into the root directory of the flight controller's SD card and reboot.

Upon boot the flight controller will automatically transfer the firmware onto the device and upgrade it.
If successful, the firmware binary will be removed from the root directory and there will be a file named **XX.bin** in the **/ufw** directory of the SD card.

## Developer Information


## Useful Links

* [Home Page](https://dronecan.github.io) (dronecan.github.io)
* [Protocol Specification](https://dronecan.github.io/Specification) (dronecan.github.io)
* [Implementations](https://dronecan.github.io/Implementations/) (dronecan.github.io)
* [Cyphal/CAN Device Interconnection](https://kb.zubax.com/pages/viewpage.action?pageId=2195476) (kb.zubax.com)
