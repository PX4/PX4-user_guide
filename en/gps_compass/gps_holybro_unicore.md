# Holybro Unicore UM982 GPS

The [Holybro Unicore UM982 GPS](http://www.holybro.com/product/TODO/) is an multi-band high-precision [RTK GNSS System](../gps_compass/rtk_gps.md) series launched by Holybro.

The module is based on the [Unicore UM982 GNSS module](https://en.unicorecomm.com/products/detail/24) which supports RTK positioning as well as dual-antenna heading calculation.

One GNSS module comes with two antennas allowing for GPS heading using only one GPS connector/port.

## Where to Buy

* [H-RTK F9P (Holybro Website)](https://shop.holybro.com/TODO)

## Configuration

The Unicore module talks the NMEA protocol extended with some proprietary Unicore sentences. The serial baudrate is 230400.

In order to use it in PX4, the following parameters need to be set (parameters if connected to GPS 1):

- [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD) -> 230400
- [GPS_1_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL) -> 6: NMEA
- [GPS_1_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL) -> 6: NMEA

## Enable GPS heading/yaw

The Unicore module comes with two antennas, a primary (right connector) and a secondary (left connector) antenna.

- [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) -> Set bit 7 (128) to enable GPS yaw fusion, so to use the GPS heading
- [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) -> Set heading offset to 0 if the primary antenna is in the front. The angle increases clock-wise, so set the offset to 90 degrees if the primary antenna is on the right side of the vehicle (and the secondary on the left side).


## RTK corrections

:::note
The RTK functionality has not been tested and verified yet.
:::


## Wiring

The module comes with both GH 10-pin & 6-pin cables that are compatible with the GPS1 & GPS2 ports on flight controllers that use the Pixhawk Connector Standard, such as [Pixhawk 6x](../flight_controller/pixhawk6x.md) and [Pixhawk 6c](../flight_controller/pixhawk6c.md).

The module can be used with one antenna or both antennas. If it is used with one antenna only, the right/primary antenna connector needs to be connected.


## Accessories

TODO
