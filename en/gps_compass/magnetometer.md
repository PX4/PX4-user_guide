# Magnetometer (Compass) Hardware & Setup

PX4 uses a magnetometer (compass) for determining the yaw and heading of the vehicle relative to the earth's magnetic field.

[Pixhawk series](../flight_controller/pixhawk_series.md) flight controllers, and many others include a compass by default.
Generally the performance of the flight controller magnetometer is very poor, because the flight controller is mounted close to power lines and other sources of electromagnetic interference.

In most cases you will _need_ to use an external compass, [mounting as far away from other electronics as possible](../assembly/mount_gps_compass.md).
While it is possible to get a stand-alone compass it is far more common to use a combined GPS/Compass module.
This can usually work plug-and-play when connected to the Pixhawk GPS1 or GPS2 port.

Up to 4 internal or external magnetometers can be connected, though only one will actually be used as a heading source.
The system automatically chooses the best available compass based on their _priority_ (external magnetometers have a higher priority than internal magnetometers).
If the primary compass fails in-flight, it will failover to the next one.
If it fails before flight, arming will be denied.

## Supported Compasses

PX4 can be used with the many compass parts (magnetometers), including: Bosch BMM 150 MEMS (via I2C bus), HMC5883 / HMC5983 (I2C or SPI), IST8310 (I2C), LIS3MDL (I2C or SPI), RM3100, and more.
Other supported magnetometers and their busses can be inferred from the drivers listed in [Modules Reference: Magnetometer (Driver)](../modules/modules_driver_magnetometer.md).

:::warning
If a GNSS is required, then usually a combined GPS/Compass module will be preferred over the stand-alone modules below.
The [Global Navigation Satellite Systems (GNSS)](../gps_compass/README.md#supported-gnss-and-or-compass) topic contains a large list of these modules.
:::

This list contains stand-alone magnetometer modules (without GNSS).

| Device                                                                                                           | Compass | DroneCan |
| :--------------------------------------------------------------------------------------------------------------- | :-----: | :------: |
| [Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/) |    ?    |
| [Holybro DroneCAN RM3100 Compass/Magnetometer](https://holybro.com/products/dronecan-rm3100-compass)             | RM3100  | &check;  |

Note:

- &check; or a specific part number indicate that a features is supported, while &cross; or empty show that the feature is not supported.
  "?" indicates "unknown".

## Mounting

[Mounting the Compass](../assembly/mount_gps_compass.md) explains how to mount a compass or GPS/Compass module.

## Wiring

Depending on the particular model, external magnetometers can either be connected via I2C or SPI or both, and some can be connected using CAN.

Pixhawk series (and many other flight controllers) use the Pixhawk connector standard for the ports.
For these flight controllers you can connect I2C or SPI based compasses (or combined GPS/Compass modules) to the `GPS1` or `GPS2` ports (which include I2C/SPI pins).

## Compass Configuration

Compass calibration is covered in: [Compass Configuration](../config/compass.md).

The process is straightforward and will autodetect, [set default rotations](../advanced_config/parameter_reference.md#SENS_MAG_AUTOROT), calibrate, and prioritise, all connected magnetometers.

## See also

- [Compass Power Compensation](../advanced_config/compass_power_compensation.md)
