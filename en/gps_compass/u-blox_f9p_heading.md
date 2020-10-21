# GPS Heading with u-blox F9P

Two u-blox F9P devices mounted on a vehicle can be used to accurately compute a heading angle (i.e. an alternative to compass-based heading estimation).
The two GPS devices in this scenario are referred to as the *Moving Base* and *Rover*.

> **Note** RTK positioning using a fixed base station is possible in parallel with this feature.

The general setup is described  in: [ZED-F9P Moving base applications (Application note)](https://www.u-blox.com/sites/default/files/ZED-F9P-MovingBase_AppNote_%28UBX-19009093%29.pdf).

In overview:
- The UART2 of the GPS devices need to be connected together (TXD2 of the "Moving Base" to RXD2 of the "Rover")
- Connect UART1 on each of the GPS to (separate) unused UART's on the autopilot, and configure both of them as GPS with baudrate set to `Auto`.
  The mapping is as follows:
  - Main GPS = Rover
  - Secondary GPS = Moving Base
- Set [GPS_UBX_MODE](../advanced_config/parameter_reference.md#GPS_UBX_MODE) to `Heading` (1)
- Reboot and wait until both devices have GPS reception.
  `gps status` should then show the Main GPS going into RTK mode, which means the heading angle is available.

> **Note** If using RTK with a fixed base station the secondary GPS will show the RTK state w.r.t. the base station.

Ideally the two antennas should be identical, on the same level/horizontal plane and oriented the same way, and on an identical ground plane size and shape ([Application note](https://www.u-blox.com/sites/default/files/ZED-F9P-MovingBase_AppNote_%28UBX-19009093%29.pdf), section *System Level Considerations*)). 

Otherwise the antennas can be positioned as needed, but the [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) must be configured.
This offset is the angle made by the *baseline* (the line between the two GPS modules) relative to the vehicle x-axis (front/back axis, as shown [here](../config/flight_controller_orientation.md#calculating-orientation)).

> **Note** The application note does not state the minimal required separation between modules.
  50cm has been used in test vehicles running PX4.

To activate heading fusion for the attitude estimation, set the [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter to enable *GPS yaw fusion*.
