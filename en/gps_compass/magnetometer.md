# Magnetometer (Compass) Hardware & Setup

PX4 uses a magnetometer (compass) for determining the yaw and heading of the vehicle relative to the earth's magnetic field.

[Pixhawk series](../flight_controller/pixhawk_series.md) flight controllers, and many others include a compass by default.
Generally the performance of the flight controller magnetometer is very poor, because the flight controller is mounted close to power lines and other sources of electromagnetic interference.

In most cases you will prefer to use an external compass, [mounted as far away from other electronics as possible](../assembly/mount_gps_compass.md).
While it is possible to get a stand-alone compass it is far more common to use a [combined GPS/Compass module](../gps_compass/README.md#supported-gnss-and-or-compass).

Magnetometers support connection to either the I2C/SPI-bus (Pixhawk `GPS1` or `GPS2` ports) or to the CAN bus.
If a module doesn't include "CAN" in its product name then it is probably an I2C/SPI compass.

Up to 4 internal or external magnetometers can be connected, though only one will actually be used as a heading source.
The system automatically chooses the best available compass based on their _priority_ (external magnetometers have a higher priority than internal magnetometers).
If the primary compass fails in-flight, it will failover to the next one.
If it fails before flight, arming will be denied.

## Supported Compasses

PX4 can be used with many magnetometer parts, including: Bosch BMM 150 MEMS (via I2C bus), HMC5883 / HMC5983 (I2C or SPI), IST8310 (I2C), LIS3MDL (I2C or SPI), RM3100, and more 
Other supported magnetometer parts and their busses can be inferred from the drivers listed in [Modules Reference: Magnetometer (Driver)](../modules/modules_driver_magnetometer.md).

These parts are included in stand alone compass modules, combined compass/GNSS modules, and also in many flight controllers,

### Combined GNSS/Compass Modules

See [Global Navigation Satellite Systems (GNSS)](../gps_compass/README.md#supported-gnss-and-or-compass) for a list of appropriate modules.

::: note
If GNSS is required, then a combined GNSS/Compass module will be preferred over the stand-alone modules below.
:::

### Stand-Alone Compass Modules

This list contains stand-alone magnetometer modules (without GNSS).

| Device                                                                                                           | Compass | DroneCan |
| :--------------------------------------------------------------------------------------------------------------- | :-----: | :------: |
| [Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/) |    ?    |
| [Holybro DroneCAN RM3100 Compass/Magnetometer](https://holybro.com/products/dronecan-rm3100-compass)             | RM3100  | &check;  |

Note:

- &check; or a specific part number indicate that a features is supported, while &cross; or empty show that the feature is not supported.
  "?" indicates "unknown".
- A compass that is not "DroneCAN" can be assumed to be SPI or I2C.

## Mounting

[Mounting the Compass](../assembly/mount_gps_compass.md) explains how to mount a compass or GPS/Compass module.

## I2C/SPI Compass Setup

On [Pixhawk Series](../flight_controller/pixhawk_series.md) flight controllers you can connect to either the `GPS1` or `GPS2` ports (which have pins for I2C/SPI).
No further configuration is required.

<!-- On flight controllers that do not follow the Pixhawk connector standard, you will need to connect to an I2C/SPI port. -->

## CAN Compass Setup

[DroneCAN](../dronecan/README.md) covers the setup for DroneCAN peripherals, including compasses.

You will need to connect the compass to the [CAN bus](../can/README.md#wiring), enable DroneCAN, and specifically enable magnetometers (search for `UAVCAN_SUB_MAG`).

## Calibration

[Compass Calibration](../config/compass.md) explains how to calibrate all compasses on the vehicle.

The process is straightforward and will autodetect, [set default rotations](../advanced_config/parameter_reference.md#SENS_MAG_AUTOROT), calibrate, and prioritise, all connected magnetometers.

## See also

- [Compass Power Compensation](../advanced_config/compass_power_compensation.md)
