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
  - [Holybro DroneCAN M9N GPS](https://holybro.com/products/dronecan-m9n-gps)
  - [Holybro DroneCAN H-RTK F9P Rover](https://holybro.com/dronecan-h-rtk-f9p-rover)
  - [Holybro DroneCAN H-RTK F9P Helical](https://holybro.com/products/dronecan-h-rtk-f9p-helical)
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
- Compass
  - [Holybro RM3100 Professional Grade Compass](https://holybro.com/products/dronecan-rm3100-compass)
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

`2` or `3` are recommended, if DNA is supported.


### DroneCAN Sensor Subscriptions

DroneCAN sensors are not enabled by default.
To use a sensor you must subscribe to it using the associated sensor-specific [UAVCAN parameter](../advanced_config/parameter_reference.md#uavcan).
These can be recognised from the prefix `UAVCAN_SUB_`

The set of subscriptions (sensors) that you can enable is (in PX4 v1.14):

- [UAVCAN_SUB_ASPD](../advanced_config/parameter_reference.md#UAVCAN_SUB_ASPD): Airspeed
- [UAVCAN_SUB_BARO](../advanced_config/parameter_reference.md#UAVCAN_SUB_BARO): Barometer
- [UAVCAN_SUB_BAT](../advanced_config/parameter_reference.md#UAVCAN_SUB_BAT): Battery monitor/Power module
- [UAVCAN_SUB_BTN](../advanced_config/parameter_reference.md#UAVCAN_SUB_BTN): Button
- [UAVCAN_SUB_DPRES](../advanced_config/parameter_reference.md#UAVCAN_SUB_DPRES): Differential pressure
- [UAVCAN_SUB_FLOW](../advanced_config/parameter_reference.md#UAVCAN_SUB_FLOW): Optical flow
- [UAVCAN_SUB_GPS](../advanced_config/parameter_reference.md#UAVCAN_SUB_GPS): GPS 
- [UAVCAN_SUB_HYGRO](../advanced_config/parameter_reference.md#UAVCAN_SUB_HYGRO): Hygrometer
- [UAVCAN_SUB_ICE](../advanced_config/parameter_reference.md#UAVCAN_SUB_ICE): Internal combustion engine (ICE).
- [UAVCAN_SUB_IMU](../advanced_config/parameter_reference.md#UAVCAN_SUB_IMU): IMU
- [UAVCAN_SUB_MAG](../advanced_config/parameter_reference.md#UAVCAN_SUB_MAG): Magnetometer (compass)
- [UAVCAN_SUB_RNG](../advanced_config/parameter_reference.md#UAVCAN_SUB_RNG): Range finder (distance sensor).


#### GPS

DroneCAN parameters:

- Enable [UAVCAN_SUB_GPS](../advanced_config/parameter_reference.md#UAVCAN_SUB_GPS) (along with [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE)).
- Enable [UAVCAN_SUB_MAG](../advanced_config/parameter_reference.md#UAVCAN_SUB_MAG) if the GPS module has an inbuilt compass.
- Set [CANNODE_TERM](../advanced_config/parameter_reference.md#CANNODE_TERM) to `1` if this is that last node on the CAN bus.

Other Parameters:

- If the GPS is not positioned at the vehicle centre of gravity you can account for the offset using [EKF2_GPS_POS_X](../advanced_config/parameter_reference.md#EKF2_GPS_POS_X), [EKF2_GPS_POS_Y](../advanced_config/parameter_reference.md#EKF2_GPS_POS_Y) and [EKF2_GPS_POS_Z](../advanced_config/parameter_reference.md#EKF2_GPS_POS_Z).
- If the GPS module provides yaw information, you can enable GPS yaw fusion by setting bit 3 of [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL) to true.


#### Barometer

DroneCAN parameters:

- Enable [UAVCAN_SUB_BARO](../advanced_config/parameter_reference.md#UAVCAN_SUB_BARO) (along with [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE)).

#### Compass

DroneCAN parameters:

- Enable [UAVCAN_SUB_MAG](../advanced_config/parameter_reference.md#UAVCAN_SUB_MAG) (along with [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE)).

#### Distance Sensor/Range Finder 

DroneCAN parameters:

- Enable [UAVCAN_SUB_RNG](../advanced_config/parameter_reference.md#UAVCAN_SUB_RNG) (along with [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE)).
- Set [UAVCAN_RNG_MIN](../advanced_config/parameter_reference.md#UAVCAN_RNG_MIN) and [UAVCAN_RNG_MAX](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX), the minimum and maximum range of the distance sensors.

Other parameters:

- If the rangefinder is not positioned at the vehicle centre of gravity you can account for the offset using [EKF2_RNG_POS_X](../advanced_config/parameter_reference.md#EKF2_RNG_POS_X), [EKF2_RNG_POS_Y](../advanced_config/parameter_reference.md#EKF2_RNG_POS_Y) and [EKF2_RNG_POS_Z](../advanced_config/parameter_reference.md#EKF2_RNG_POS_Z).
- Other `EKF2_RNG_*` parameters may be relevant, in which case they should be documented with the specific rangefinder. 


#### Optical Flow Sensor

DroneCAN parameters:

- Enable [UAVCAN_SUB_FLOW](../advanced_config/parameter_reference.md#UAVCAN_SUB_FLOW) (along with [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE)).


Other parameters:

- Set [SENS_FLOW_MINHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MINHGT) and [SENS_FLOW_MAXHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MAXHGT), the minimum and maximum height of the flow sensor.
- Set [SENS_FLOW_MAXR](../advanced_config/parameter_reference.md#SENS_FLOW_MAXR) the maximum angular flow rate of the sensor.
- Enable optical flow fusion by setting [EKF2_OF_CTRL](../advanced_config/parameter_reference.md#EKF2_OF_CTRL).
- To disable GPS aiding (optional), set [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL) to `0`.
- If the optical flow unit is not positioned at the vehicle centre of gravity you can account for the offset using [EKF2_OF_POS_X](../advanced_config/parameter_reference.md#EKF2_OF_POS_X), [EKF2_OF_POS_Y](../advanced_config/parameter_reference.md#EKF2_OF_POS_Y) and [EKF2_OF_POS_Z](../advanced_config/parameter_reference.md#EKF2_OF_POS_Z).


Optical flow sensors require rangefinder data.
However the rangefinder need not be part of the same module, and if not, may not be connected via DroneCAN.
If the rangefinder is connected via DroneCAN (whether inbuilt or separate), you will also need to enable it as described in the [rangefinder section](#distance-sensor-range-finder) (above).



### ESC & Servos

[DroneCAN ESCs and servos](../dronecan/escs.md) require the [motor order and servo outputs](../config/actuators.md) to be configured.

### Further Setup

Most DroneCAN sensors require no further setup, unless specifically noted in their device-specific documentation.

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
