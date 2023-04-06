# DroneCAN

[DroneCAN](https://dronecan.github.io/) is a open software communication protocol for flight controllers and other [CAN](../can/README.md) devices on a vehicle to communicate with each other.

:::note
PX4 requires an SD card to enable dynamic node allocation and for firmware update.
The SD card is not used in flight.
:::

:::note
DroneCAN was previously known as UAVCAN v0 (or just UAVCAN).
The name was changed in 2022.
:::

## Benefits of DroneCAN

Connecting peripherals over DroneCAN has many benefits:

- Many different sensors and actuators are already supported.
- CAN has been specifically designed to deliver robust and reliable connectivity over relatively large distances.
  It enables safe use of ESCs on bigger vehicles and communication redundancy.
- The bus is bi-directional, enabling health monitoring, diagnostics, and RPM telemetry.
- Wiring is less complicated as you can have a single bus for connecting all your ESCs and other DroneCAN peripherals.
- Setup is easier as you configure ESC numbering by manually spinning each motor.
- It allows users to configure and update the firmware of all CAN-connected devices centrally through PX4.


## Supported Hardware

Most common types of peripherals (sensors, ESCs, and servos) that are DroneCAN/UAVCAN v0 compliant are supported.

Supported hardware includes (this is not an exhaustive list):

- [ESC/Motor controllers](../dronecan/escs.md)
- Airspeed sensors
  - [Thiemar airspeed sensor](https://github.com/thiemar/airspeed)
- GNSS receivers for GPS and GLONASS
  - [Holybro DroneCAN M8N GPS](../dronecan/holybro_m8n_gps.md)
  - [ARK GPS](../dronecan/ark_gps.md)
  - [ARK RTK GPS](../dronecan/ark_rtk_gps.md)
  - [CubePilot Here3](https://www.cubepilot.org/#/here/here3)
  - [Zubax GNSS](https://zubax.com/products/gnss_2)
  - [CUAV NEO v2 Pro GNSS](https://doc.cuav.net/gps/neo-series-gnss/en/neo-v2-pro.html)
  - [CUAV NEO 3 Pro GNSS](https://doc.cuav.net/gps/neo-series-gnss/en/neo-3.html)
  - [CUAV C-RTK2 PPK/RTK GNSS](../gps_compass/rtk_gps_cuav_c-rtk2.md)
- Power monitors
  - [Pomegranate Systems Power Module](../dronecan/pomegranate_systems_pm.md)
  - [CUAV CAN PMU Power Module](../dronecan/cuav_can_pmu.md)
- Distance sensors
  - [ARK Flow](ark_flow.md)
  - [Avionics Anonymous Laser Altimeter UAVCAN Interface](../dronecan/avanon_laser_interface.md)
- Optical Flow
  - [Ark Flow](ark_flow.md)
- Generic CAN Node (enables use of I2C, SPI, UART sensors on the CAN bus).
  - [ARK CANnode](../dronecan/ark_cannode.md)

## Hardware Setup

DroneCAN operates over a CAN network.
DroneCAN hardware should be connected as described in [CAN > Wiring](../can/README.md#wiring).

## Node ID

Every DroneCAN device must be configured with a *node id* that is unique on the vehicle.

Most devices support dynamic node allocation (DNA) which allows PX4 to automatically configure the node ID of each detected peripheral on system startup.
Consult the manufacturer documentation for details on whether your device supports DNA and how to enable it. Many devices will automatically switch to DNA if the node id is set to 0.
PX4 will enable the built in allocation server if the [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) parameter is > 1 (set to 2 or 3).

:::note
PX4 has a node ID, which can be configured using the [UAVCAN_NODE_ID](../advanced_config/parameter_reference.md#UAVCAN_NODE_ID) parameter.
The parameter is set to 1 by default.
:::

Some devices don't support DNA.
Additionally, in certain mission-critical scenarios, you might prefer to manually configure node IDs beforehand instead of relying on the dynamic allocation server.
If you wish to disable the DNA completely, set `UAVCAN_ENABLE` to `1` and manually set each node ID to a unique value.
If the DNA is still running and certain devices need to be manually configured, give these devices a value greater than the total number of DroneCAN devices to avoid clashes.

:::warning
At time of writing, PX4 does not run the node allocation server on the CAN2 port.
This means that if you have a device that is *only* connected to CAN2 (not redundantly to CAN1 and CAN2), you will need to manually configure its node ID.
:::

## PX4 Configuration

### Enabling DroneCAN

To enable the DroneCAN driver, set the [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) parameter:

- `0`: DroneCAN driver disabled
- `1`: DroneCAN driver enabled for sensors, DNA server disabled
- `2`: DroneCAN driver enabled for sensors, DNA server enabled
- `3`: DroneCAN driver enabled for sensors and ESCs, DNA server enabled

### Further Setup

Most DroneCAN sensors require no further setup, unless specifically noted in their documentation.

[DroneCAN ESCs and servos](../dronecan/escs.md) require the [motor order and servo outputs](../config/actuators.md) to be configured.
If any other parameters must be set, these will be covered in device-specific documentation.

## Firmware Update

PX4 can upgrade device firmware over DroneCAN.
To upgrade the device, all you need to do is copy the firmware binary into the root directory of the flight controller's SD card and reboot.

Upon boot the flight controller will automatically transfer the firmware onto the device and upgrade it.
If successful, the firmware binary will be removed from the root directory and there will be a file named **XX.bin** in the **/ufw** directory of the SD card.

## Troubleshooting

**Q**: My DroneCAN devices aren't working.

**A**: Check that the `UAVCAN_ENABLE` parameter is set correctly. To see a list of devices/nodes that PX4 has detected on the CAN bus, open NSH (i.e. go to the QGroundControl MAVLink Console) and type `uavcan status`.

---

**Q**: The DNA server isn't giving out node IDs.

**A**: PX4 requires an SD card to perform dynamic node allocation. Make sure you have (a working) one inserted and reboot.

---

**Q**: The motors aren't spinning when armed.

**A**: Make sure `UAVCAN_ENABLE` is set to `3` to enable DroneCAN ESC output.

---

**Q**: The motors don't spin until throttle is increased.

**A**: Use [Acutator > Actuator Testing](../config/actuators.md#actuator-testing) to confirm that the motor outputs are set to the correct minimum values.

## Useful Links

- [Home Page](https://dronecan.github.io) (dronecan.github.io)
- [Protocol Specification](https://dronecan.github.io/Specification) (dronecan.github.io)
- [Implementations](https://dronecan.github.io/Implementations/) (dronecan.github.io)
- [Cyphal/CAN Device Interconnection](https://kb.zubax.com/pages/viewpage.action?pageId=2195476) (kb.zubax.com)
