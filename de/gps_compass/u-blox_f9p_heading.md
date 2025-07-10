---
canonicalUrl: https://docs.px4.io/main/de/gps_compass/u-blox_f9p_heading
---

# RTK GPS Heading with Dual u-blox F9P

Two u-blox F9P [RTK GPS](../gps_compass/rtk_gps.md) modules mounted on a vehicle can be used to accurately compute a heading angle (i.e. an alternative to compass-based heading estimation). The two GPS devices in this scenario are referred to as the *Moving Base* and *Rover*.

## Supported Devices

This feature works on F9P devices that expose the GPS UART2 port (access to the port is required for setup).

The following devices are supported for this use case:
* [SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136) (www.sparkfun.com)
* [SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-1010-sirius-rtk-gnss-rover-f9p.html#/158-sensor-no_magnetometer) (store-drotek.com)
* [mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/m10020d.htm) (store.mrobotics.io)

:::note
- [Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md) and [Holybro H-RTK F9P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md) cannot be used because they do not expose the UART2 port.
- Supported devices are also listed in [GPS/Compass > Supported GPS and/or Compass](../gps_compass/README.md#supported-gps-and-or-compass).
:::

## Setup

Ideally the two antennas should be identical, on the same level/horizontal plane and oriented the same way, and on an identical ground plane size and shape ([Application note](https://www.u-blox.com/sites/default/files/ZED-F9P-MovingBase_AppNote_%28UBX-19009093%29.pdf), section *System Level Considerations*).
- The application note does not state the minimal required separation between modules (50cm has been used in test vehicles running PX4).
- The antennas can be positioned as needed, but the [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) must be configured: [GPS > Configuration > GPS as Yaw/Heading Source](../gps_compass/README.md#configuring-gps-as-yaw-heading-source).

In overview:
- The UART2 of the GPS devices need to be connected together (TXD2 of the "Moving Base" to RXD2 of the "Rover")
- Connect UART1 on each of the GPS to (separate) unused UART's on the autopilot, and configure both of them as GPS with baudrate set to `Auto`. The mapping is as follows:
  - Main GPS = Rover
  - Secondary GPS = Moving Base
- Set [GPS_UBX_MODE](../advanced_config/parameter_reference.md#GPS_UBX_MODE) to `Heading` (1)
- [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter bit 7 must be set (see [GPS > Configuration > GPS as Yaw/Heading Source](../gps_compass/README.md#configuring-gps-as-yaw-heading-source)).
- [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) may need to be set (see [GPS > Configuration > GPS as Yaw/Heading Source](../gps_compass/README.md#configuring-gps-as-yaw-heading-source)).
- Reboot and wait until both devices have GPS reception. `gps status` should then show the Main GPS going into RTK mode, which means the heading angle is available.


:::note
If using RTK with a fixed base station the secondary GPS will show the RTK state w.r.t. the base station.
:::



## Further Informaiton

- [ZED-F9P Moving base applications (Application note)](https://www.u-blox.com/sites/default/files/ZED-F9P-MovingBase_AppNote_%28UBX-19009093%29.pdf) - General setup/instructions.
- [GPS > Configuration > GPS as Yaw/Heading Source](../gps_compass/README.md#configuring-gps-as-yaw-heading-source)