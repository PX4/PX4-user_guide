---
canonicalUrl: https://docs.px4.io/main/tr/gps_compass/gps_holybro_unicore
---

# Holybro Unicore UM982 GPS

:::warning
This product is not yet released (coming soon)!
:::

The [Holybro Unicore UM982 GPS](https://holybro.com/products/h-rtk-um982) is an multi-band high-precision [RTK GNSS System](../gps_compass/rtk_gps.md) series launched by Holybro.

The module is based on the [Unicore UM982 GNSS module](https://en.unicorecomm.com/products/detail/24) which supports RTK positioning as well as dual-antenna heading calculation.

One GNSS module comes with two antennas allowing for GPS heading using only one GPS connector/port.

## Where to Buy

* [Holybro Website](https://holybro.com/products/h-rtk-um982)

## Wiring

The module comes with both GH 10-pin & 6-pin cables that are compatible with the GPS1 & GPS2 ports on flight controllers that use the [Pixhawk Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf), such as [Pixhawk 6x](../flight_controller/pixhawk6x.md) and [Pixhawk 6c](../flight_controller/pixhawk6c.md).

The module can be used with one antenna or both antennas. If it is used with one antenna only, the right/primary antenna connector needs to be connected.

## PX4 Configuration

### Port Setup

The Unicore module talks the NMEA protocol extended with some proprietary Unicore sentences. The serial baudrate is 230400.

The following PX4 parameters [must be set](../advanced_config/parameters.md):

- [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD) -> 230400
- [GPS_1_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL) -> 6: NMEA

Note, the above parameters assume you are connected to `GPS 1`. If you are using another port you will have to use its parameters to configure the baud rate and protocol.

### Enable GPS Heading/Yaw

The Unicore module comes with two antennas, a primary (right connector) and a secondary (left connector) antenna, which can be used to get yaw from GPS. You will need to set the following parameters:

- [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL): Set bit 3 (8) to enable dual antenna heading into the yaw estimation.
- [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET): Set heading offset to 0 if the primary antenna is in the front. The angle increases clock-wise, so set the offset to 90 degrees if the primary antenna is on the right side of the vehicle (and the secondary on the left side).

### RTK Corrections

RTK works the same way as uBlox F9P modules. RTCMv3 corrections as sent by QGroundControl from an RTK GPS base station are consumed by the Unicore module, which should then change fix type to `RTK float` or `RTK fixed`.
