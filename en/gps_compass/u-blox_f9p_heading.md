# GPS Heading with u-blox F9P

Two u-blox F9P devices mounted on a vehicle can be used to accurately compute a heading angle (i.e. an alternative to compass-based heading estimation).

> **Note** RTK positioning using a fixed base station is possible in parallel with this feature.

The general setup is described [here](https://www.u-blox.com/sites/default/files/ZED-F9P-MovingBase_AppNote_%28UBX-19009093%29.pdf).

In overview:
- The UART2 of the GPS devices need to be connected together (TXD2 of the "Mobile Base" to RXD2 of the "Rover")
- Connect UART1 on each of the GPS to (separate) unused UART's on the autopilot, and configure both of them as GPS with baudrate set to `Auto`.
  The mapping is as following:
  - Main GPS = Rover
  - Secondary GPS = Moving Base
- Set [GPS_UBX_MODE](../advanced_config/parameter_reference.md#GPS_UBX_MODE) to `Heading` (1)
- Reboot and wait until both devices have GPS reception.
  `gps status` should then show the Main GPS going into RTK mode, which means the heading angle is available.

> **Note** If using RTK with a fixed base station the secondary GPS will show the RTK state w.r.t. the base station.

For heading estimation the two antennas need to be on the same level.
The direction that they are facing does not matter as it can be configured with the [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) parameter.

To activate heading fusion for the attitude estimation, set the [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter to enable *GPS yaw fusion*.
