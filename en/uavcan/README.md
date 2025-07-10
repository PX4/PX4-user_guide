---
canonicalUrl: https://docs.px4.io/main/en/uavcan/README
---

# UAVCAN

<img style="float:right; width: 200px ; padding: 10px;" src="../../assets/uavcan/uavcan_logo_transparent.png" alt="UAVCAN Logo" /> [UAVCAN](http://uavcan.org) is an onboard network which allows the autopilot to connect to avionics/peripherals.
It uses rugged, differential signalling, and supports firmware upgrades over the bus and status feedback from peripherals.

:::note
PX4 requires an SD card for UAVCAN node allocation and firmware upgrade.
It is not used during flight by UAVCAN.
:::

## Supported Hardware

It supports hardware like:

- [ESC/Motor controllers](../uavcan/escs.md)
- Airspeed sensors
  - [Thiemar airspeed sensor](https://github.com/thiemar/airspeed)
- GNSS receivers for GPS and GLONASS
  - [CubePilot Here3](https://www.cubepilot.org/#/here/here3)
  - [Zubax GNSS](https://zubax.com/products/gnss_2)
- Power monitors
  - [Pomegranate Systems Power Module](../uavcan/pomegranate_systems_pm.md)
  - [CUAV CAN PMU Power Module](../uavcan/cuav_can_pmu.md)
- Distance sensors
  - [Ark Flow](ark_flow.md)
  - [Avionics Anonymous Laser Altimeter UAVCAN Interface](../uavcan/avanon_laser_interface.md)
- Optical Flow
  - [Ark Flow](ark_flow.md)


:::note
PX4 does not support UAVCAN servos (at time of writing).
:::


## Wiring

All UAVCAN components share the same connection architecture/are wired the same way.
Connect all on-board UAVCAN devices into a chain and make sure the bus is terminated at the end nodes (the order in which the nodes are connected/chained does not matter).

The following diagram shows this for a flight controller connected to [UAVCAN motor controllers (ESCs)](../uavcan/escs.md) and a UAVCAN GNSS.

![UAVCAN Wiring](../../assets/uavcan/uavcan_wiring.png)

The diagram does not show any power wiring.
Refer to your manufacturer instructions to confirm whether components require separate power or can be powered from the CAN bus itself. 

For more information about proper bus connections see [UAVCAN Device Interconnection](https://kb.zubax.com/display/MAINKB/UAVCAN+device+interconnection) (Zubax KB).

:::note
- While the connections are the same, the _connectors_ may differ across devices.
- An second/redundant" CAN interface may be used, as shown above (CAN2).
  This is optional, but can increase the robustness of the connection.
:::


## PX4 Configuration

In order to use UAVCAN components with PX4 you will first need to enable the UAVCAN driver:

1. Power the vehicle using the battery (you must power the whole vehicle, not just the flight controller) and connect *QGroundControl*.
1. Navigate to the **Vehicle Setup > Parameters** screen.
1. [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) must be [set](../advanced_config/parameters.md) to one of the non-zero values.

   The values are:
   - `0`: UAVCAN driver disabled.
   - `1`: Sensors Manual Config.
   - `2`: Sensors Automatic Config.
   - `3`: Sensors and Actuators (ESCs) Automatic Config

   Use `1` if _none_ of the connected UAVCAN devices support automatic configuration (check the manual!), `2` or `3` if _some_ of them support automatic configuration, and `3` if you're using UAVCAN ESCs (this assigns motor controls to the UAVCAN bus rather than PWM).

:::note
You will need to manually allocate static ids for any nodes that don't support automatic configuration.
When using dynamic configuration, any manually allocated ids should be given a value greater than the number of UAVCAN devices (to avoid clashes).
:::

Most UAVCAN sensors require no further setup (they are plug'n'play, unless specifically noted in their documentation).

[UAVCAN motor controllers (ESCs)](../uavcan/escs.md) additionally require the motor order be set, and may require a few other parameters be set.
Whether this can be done using the simple QGroundControl setup UI depends on the type of ESC (see link for information).


## Troubleshooting

### UAVCAN devices dont get node ID/Firmware Update Fails

PX4 requires an SD card for UAVCAN node allocation and during firmware update (which happen during boot).
Check that there is a (working) SD card present and reboot.

### Motors not spinning when armed

If the PX4 Firmware arms but the motors do not start to rotate, check that parameter `UAVCAN_ENABLE=3` to use UAVCAN ESCs.
If the motors do not start spinning before thrust is increased, check `UAVCAN_ESC_IDLT=1`.

## Developer Information

- [UAVCAN Development](../uavcan/developer.md): Topics related to development and integration of new UAVCAN hardware into PX4.
