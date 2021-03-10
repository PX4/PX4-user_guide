# UAVCAN

<img style="float:right; width: 200px ; padding: 10px;" src="../../assets/uavcan/uavcan_logo_transparent.png" alt="UAVCAN Logo" /> [UAVCAN](http://uavcan.org) is an onboard network which allows the autopilot to connect to avionics/peripherals.
It uses rugged, differential signalling, and supports firmware upgrades over the bus and status feedback from peripherals.

:::note
PX4 requires an SD card for UAVCAN node allocation and firmware upgrade.
It is not used during flight by UAVCAN.
:::

## Supported Hardware

It supports hardware like:

* [Motor controllers](../uavcan/escs.html)
* Airspeed sensors
  * [Thiemar airspeed sensor](https://github.com/thiemar/airspeed)
* GNSS receivers for GPS and GLONASS
  * [Zubax GNSS](https://zubax.com/products/gnss_2)
* Power monitors
  * [Pomegranate Systems Power Module](../uavcan/pomegranate_systems_pm.md)
  * [CUAV CAN PMU Power Module](../uavcan/cuav_can_pmu.md)
* Distance sensors
  - [Avionics Anonymous Laser Altimeter UAVCAN Interface](../uavcan/avanon_laser_interface.md)

:::note
PX4 does not support UAVCAN servos (at time of writing).
:::


## Wiring

All UAVCAN components share the same connection architecture/are wired the same way.
Connect all on-board UAVCAN devices into a chain and make sure the bus is terminated at the end nodes (the order in which the nodes are connected/chained does not matter).

The following diagram shows this for a flight controller connected to UAVCAN motor controllers (ESCs) and a UAVCAN GNSS.

![UAVCAN Wiring](../../assets/uavcan/uavcan_wiring.png)

The diagram does not show any power wiring.
Refer to your manufacturer instructions to confirm whether components require separate power or can be powered from the CAN bus itself. 

For more information about proper bus connections see [UAVCAN Device Interconnection](https://kb.zubax.com/display/MAINKB/UAVCAN+device+interconnection) (Zubax KB).

:::note
- While the connections are the same, the connectors themselvs may differ across devices.
- An second/redundant" CAN interface may be used, as shown above (CAN2).
  This is optional, but can increase the robustness of the connection.
:::


## Firmware Setup

Next, follow the instructions in [UAVCAN Configuration](../uavcan/node_enumeration.md) to activate the UAVCAN functionalities in the firmware.
Disconnect your power supply and reconnect it.
After the power cycle all UAVCAN devices should be detected which is confirmed by a beeping motor on the Orel 20 ESCs.
You can now continue with the general setup and calibration.

Depending on the used hardware, it can be reasonable to perform an update of the firmware on the UAVCAN devices.
This can be done via the UAVCAN itself and the PX4 firmware.
For more details please refer to the instructions in [UAVCAN Firmware](../uavcan/node_firmware.md).

## Upgrading Node Firmware

PX4 will automatically upgrade firmware on UAVCAN nodes if the matching firmware is supplied.
The process and requirements are described on the [UAVCAN Firmware](../uavcan/node_firmware.md) page.

## Enumerating and Configuring Motor Controllers

The ID and rotational direction of each motor controller can be assigned after installation in a simple setup routine: [UAVCAN Node Enumeration](../uavcan/node_enumeration.md).
The routine can be started by the user through QGroundControl.


## Troubleshooting

### Motors not spinning when armed

If the PX4 Firmware arms but the motors do not start to rotate, check that parameter `UAVCAN_ENABLE=3` to use UAVCAN ESCs.
If the motors do not start spinning before thrust is increased, check `UAVCAN_ESC_IDLT=1`.

### UAVCAN devices dont get node ID/Firmware Update Fails

PX4 requires an SD card for UAVCAN node allocation and during firmware update (which happen during boot).
Check that there is a (working) SD card present and reboot.



