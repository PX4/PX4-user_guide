# Mounting the GPS/Compass

The GPS/Compass (or just the Compass) should be mounted on the frame as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

The diagram below shows the heading marker on the Pixhawk 4 and compass.

![Connect compass/GPS to Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_compass_gps.jpg)

## Compass Orientation

The compass can also be mounted in any other _supported_ orientation, where the supported orientations can be seen in [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG1_ROT), and have the same meaning as used for [orienting the flight controller](../config/flight_controller_orientation.md#calculating-orientation).

:::warning
You must mount the compass in a supported orientation!

If you mount the compass at an orientation that isn't supported, for example `Yaw 30`, the PX4 will detect the closest matching value.
This will result error and warnings, even if the calibration appeared to succeed.
:::

If you're using the normal [Compass Calibration](../config/compass.md) process the parameter [CAL_MAG_ROT_AUTO](../advanced_config/parameter_reference.md#CAL_MAG_ROT_AUTO) is enabled, and the orientation should be detected automatically.