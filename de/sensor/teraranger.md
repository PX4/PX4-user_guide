# TeraRanger Rangefinders

TeraRanger provide a number of lightweight distance measurement sensor based on infrared Time-of-Flight (ToF) technology. They are typically faster and have greater range than sonar, and smaller and lighter than laser-based systems.

PX4 supports:

* [TeraRanger One](https://www.terabee.com/shop/lidar-tof-range-finders/teraranger-one/) (0.2 - 14 m) (Requires an [I2C adapter](https://www.terabee.com/shop/accessories/i2c-adapter-for-teraranger-one/))
* [TeraRanger Evo 60m](https://www.terabee.com/shop/lidar-tof-range-finders/teraranger-evo-60m/) (0.5 – 60 m)
* [TeraRanger Evo 600Hz](https://www.terabee.com/shop/lidar-tof-range-finders/teraranger-evo-600hz/) (0.75 - 8 m)

> **Info** The *Terranger One* is used in the [Qualcomm Snapdragon Flight](../flight_controller/snapdragon_flight.md).

## Where to Buy

* TBD

## Pinouts

## Wiring

All TeraRanger sensors must be connected via the I2C bus.

While TeraRanger One requires an [I2C adapter](https://www.terabee.com/shop/accessories/i2c-adapter-for-teraranger-one/) any sensor from TeraRanger Evo series can be connected directly to the autopilot.

## Software Configuration

The sensors are enabled using the parameter [SENS_EN_TRANGER](../advanced_config/parameter_reference.md#SENS_EN_TRANGER) (you can set the type of sensor or that PX4 should auto-detect the type).

> **Note** If using auto-detect for Evo sensors the minimum and maximum values for the range are set to the lowest and highest possible readings across the Evo family (currently 0.5 - 60 m). In order to use the correct max/min values the appropriate model of the Evo sensor should be set in the parameter (instead of using autodetect).
> 
> **Tip** The driver for this rangefinder is usually present in firmware. If missing, you would also need to add the driver (`drivers/ll40ls`) to the board configuration.

## Further Information

* [Modules Reference: Distance Sensor (Driver) : teraranger](https://dev.px4.io/master/en/middleware/modules_driver_distance_sensor.html#teraranger) (PX4 Dev Guide)