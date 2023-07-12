# Remote ID

:::warning Experimental
Remote ID support is experimental in PX4 v1.14.
:::

Remote ID is a government mandated technology for UAVs in Japan, the United States of America and the European Union, designed to enable safe sharing of airspace between UAVs and other aircraft.
The specification requires that UAVs broadcast data such as: real-time location/altitude, serial number, operator ID/location, status, etc.

PX4 integrates with Remote ID hardware that supports the [Open Drone ID](https://mavlink.io/en/services/opendroneid.html) MAVLink protocol (Open Drone ID is an open source implementation of Remote ID).

## Current Implementation

MAVLink-enabled Remote ID hardware must be connected to the autopilot.
This might be done via a wired serial link, internal WiFi network, or Ethernet network in the same way as other MAVLink components (see [MAVLink Peripherals](../peripherals/mavlink_peripherals.md) and [Ethernet Setup](../advanced_config/ethernet_setup.md)).

Enable Remote ID by [setting](../advanced_config/parameters.md#conditional-parameters) parameter [COM_ARM_ODID](../advanced_config/parameter_reference.md#COM_ARM_ODID) to `2` (it is `0 - disabled` by default).
The UAV will then require `HEARTBEAT` messages from the Remote ID as a precondition for arming the UAV.
You can also set the parameter to `1` to warn but still allow arming without the Remote ID. 

Once enabled, PX4 v1.14 streams these messages by default (in streaming modes: normal, onboard, usb, onboard low bandwidth):

- [OPEN_DRONE_ID_LOCATION](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_LOCATION) (1 Hz) - UAV location, altitude, direction, and speed.
- [OPEN_DRONE_ID_SYSTEM](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_SYSTEM) (1 Hz) Operator location/altitude, multiple aircraft information (group/swarm, if applicable), full timestamp and possible category/class information.
  - Implementation assumes operator is located at vehicle home position (does not yet support getting operator position from GCS).
    This is believed to be compliant for broadcast-only Remote IDs.
  
The following message can be streamed on request (using [MAV_CMD_SET_MESSAGE_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_MESSAGE_INTERVAL)):

- [OPEN_DRONE_ID_BASIC_ID](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_BASIC_ID) - UAV identity information (essentially a serial number)
  - PX4 v1.14 specifies a serial number ([MAV_ODID_ID_TYPE_SERIAL_NUMBER](https://mavlink.io/en/messages/common.html#MAV_ODID_ID_TYPE_SERIAL_NUMBER)) but does not use the specified format (ANSI/CTA-2063 format).

The following messages are not supported in PX4 v1.14 (to be added by [PX4#21647](https://github.com/PX4/PX4-Autopilot/pull/21647)):

- [OPEN_DRONE_ID_AUTHENTICATION](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_AUTHENTICATION) - Provides authentication data for the UAV.
- [OPEN_DRONE_ID_SELF_ID](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_SELF_ID) - Operator identity (plain text).
- [OPEN_DRONE_ID_OPERATOR_ID](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_OPERATOR_ID) - Operator identity.
- [OPEN_DRONE_ID_ARM_STATUS](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_ARM_STATUS) - Status of Remote ID hardware. Use as condition for vehicle arming, and for Remote ID health check.
- [OPEN_DRONE_ID_SYSTEM_UPDATE](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_SYSTEM_UPDATE) - Subset of `OPEN_DRONE_ID_SYSTEM` that can be sent with information at higher rate.

### Compliance

The specific areas where PX4 v1.14 is know to (possibly) be non compliant with various specifications are:

- Vehicles must arm conditional on receiving the Remote ID [OPEN_DRONE_ID_ARM_STATUS](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_ARM_STATUS) message, with a status that indicates the Remote ID hardware is ready to broadcast.
  - PX4 v1.14 does not process `OPEN_DRONE_ID_ARM_STATUS`, and arming is only conditional on the Remote ID device `HEARTBEAT`.
- Health of the Remote ID depends on both receiving a `HEARTBEAT` and the `OPEN_DRONE_ID_ARM_STATUS`.
  When flying, a non-armed status for the Remote ID must be published in [OPEN_DRONE_ID_LOCATION.status](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_LOCATION) as a Remote ID malfunction.
  - PX4 v1.14 does not yet receive `OPEN_DRONE_ID_ARM_STATUS`.
- `OPEN_DRONE_ID_ARM_STATUS` must be forwarded to the GCS, if present for additional error reporting.
- [OPEN_DRONE_ID_BASIC_ID](https://mavlink.io/en/messages/common.html#OPEN_DRONE_ID_BASIC_ID) specifies a serial number in an invalid format (not ANSI/CTA-2063 format).
The 
 - The ID is expected to be securely stored and tamper resistent.
   PX4's approach for this has yet be confirmed to be sufficient.

## Supported Remote ID Hardware

- [Cube ID](https://docs.cubepilot.org/user-guides/cube-id/cube-id) (CubePilot) - Displays basic ID in QGC.

Other devices may work, but there has been limited testing.